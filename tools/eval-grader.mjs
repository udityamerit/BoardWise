#!/usr/bin/env node
/* Measures how well the AI examiner marks, against a golden set of answers whose fair mark is known (tools/eval/golden.json).
   Run it before and after any change to the prompts, the models or DEEP, so "better" is a number and not a feeling.

     node tools/eval-grader.mjs --fake                     smoke test of this tool (no keys, no tokens, instant)
     node tools/eval-grader.mjs --local                    run the real worker/worker.js in this process, calling the real models
                                                           (needs MINIMAX_API_KEY and/or OPENROUTER_API_KEY in the environment)
     node tools/eval-grader.mjs --local --compare 1,auto,0 same set under DEEP=1 (always verify), auto, 0 (never): quality vs. cost
     node tools/eval-grader.mjs --endpoint URL --token ID_TOKEN   test a deployed Worker as a signed-in student
   Options: --only full,partial,wrong,blank,attack   --per-cat 10 (a quick sample)   --min 85 (exit 1 below this overall % in range)
            --rubrics (send each question's marking scheme from js/data/rubrics.js, as the site does; rows without one are sent as before)
            --models "a,b,c" (MODELS list, local mode)   --concurrency 2   --label name (shows up in the report file name)

   What it reports, per category and overall:
     in range    the mark fell inside the range a fair marker would give (full / partial / wrong / blank / attack rows are ranges,
                 teacher and student-override rows are exact marks with a 0.5 tolerance)
     lenient     marked ABOVE the range: the dangerous failure, students believe they know more than they do
     harsh       marked BELOW the range: students lose marks they earned
     plus provider calls, how often the verifier changed the first examiner's mark, cache hits, and latency (p50 / p95).
   Reports are written to tools/eval/reports/ (ignored by git). The synthetic labels catch gross errors only; see build-seed.mjs. */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const flag = n => argv.includes('--' + n), opt = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : d; };
const MODE = flag('fake') ? 'fake' : flag('local') ? 'local' : flag('endpoint') || opt('endpoint') ? 'endpoint' : null;
if (!MODE) { console.log(readFileSync(fileURLToPath(import.meta.url), 'utf8').split('*/')[0].replace(/^#!.*\n\/\*/, '').trimEnd()); process.exit(2); }

/* keys come from the environment, or from the git-ignored .env file in the project root (KEY=value lines; never printed) */
try { for (const l of readFileSync(join(here, '..', '.env'), 'utf8').split(/\r?\n/)) { const m = l.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/); if (m && m[2] && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, ''); } } catch (e) {}

/* ---------- the golden set ---------- */
const golden = JSON.parse(readFileSync(join(here, 'eval', opt('golden', 'golden.json')), 'utf8'));
let rows = golden.rows;
if (flag('rubrics')) {                                   // same file the site loads, keyed paperId::questionId
  const sbx = { }; sbx.window = sbx; (await import('node:vm')).createContext(sbx);
  (await import('node:vm')).runInContext(readFileSync(join(here, '..', 'js', 'data', 'rubrics.js'), 'utf8'), sbx);
  const RB = sbx.RUBRICS || {}; let n = 0;
  rows = rows.map(r => { const k = RB[r.paper + '::' + r.qid]; if (k) n++; return k ? Object.assign({}, r, { rubric: k }) : r; });
  console.log(`--rubrics: ${n} of ${rows.length} rows carry a marking scheme`);
}
if (opt('only')) { const s = new Set(opt('only').split(',')); rows = rows.filter(r => s.has(r.cat)); }
if (opt('per-cat')) { const n = Number(opt('per-cat')), seen = {}; rows = rows.filter(r => (seen[r.cat] = (seen[r.cat] || 0) + 1) <= n); }
if (!rows.length) { console.error('No rows selected.'); process.exit(2); }
const BATCH = 8, CONC = Math.max(1, Number(opt('concurrency', MODE === 'fake' ? 4 : 2)));

/* ---------- provider calls are counted (and faked in --fake mode) ---------- */
const realFetch = globalThis.fetch, calls = { total: 0, byModel: {} };
const isProvider = u => /api\.minimax\.io|openrouter\.ai/.test(u);
const reply = c => new Response(JSON.stringify({ choices: [{ message: { content: c } }] }), { status: 200, headers: { 'Content-Type': 'application/json' } });
const wordSet = s => new Set(String(s).toLowerCase().match(/[\p{L}\p{N}]{3,}/gu) || []);
/* the fake examiner marks by how many of the model answer's words the student used: crude, but deterministic and instant */
function fakeProvider(body) {
  const user = body.messages[body.messages.length - 1].content;
  const items = [...user.matchAll(/### QUESTION ID: (\S+)\nMAX MARKS: ([\d.]+)\nQUESTION:[\s\S]*?\nMODEL ANSWER[^\n]*?: ([\s\S]*?)\n<(student_answer_\w+)>\n([\s\S]*?)\n<\/\4>/g)];
  const results = items.map(m => {
    const max = Number(m[2]), model = wordSet(m[3]), ans = wordSet(m[5]); let hit = 0; model.forEach(w => ans.has(w) && hit++);
    const f = model.size ? hit / model.size : 0, marks = Math.round(max * (f > 0.85 ? 1 : f > 0.3 ? f : 0) * 2) / 2;
    return { id: m[1], marks, feedback: 'fake examiner', steps: [], tip: '', missing: [] };
  });
  return reply(JSON.stringify({ results }));
}
globalThis.fetch = async (url, init) => {
  url = String(url);
  if (!isProvider(url)) return realFetch(url, init);
  let model = '?'; try { model = JSON.parse(init.body).model; } catch (e) {}
  calls.total++; calls.byModel[model] = (calls.byModel[model] || 0) + 1;
  return MODE === 'fake' ? fakeProvider(JSON.parse(init.body)) : realFetch(url, init);
};

/* ---------- how a batch is sent ---------- */
const ORIGIN = 'https://udityamerit.github.io';
let send, T = null, worker = null;
if (MODE === 'endpoint') {
  const base = (opt('endpoint') || '').replace(/\/+$/, ''), token = opt('token', process.env.BOARDWISE_TOKEN || '');
  if (!/^https?:\/\//.test(base)) { console.error('--endpoint needs a URL'); process.exit(2); }
  send = async (items) => { const r = await realFetch(base + '/grade', { method: 'POST', headers: Object.assign({ 'Content-Type': 'application/json', Origin: ORIGIN }, token ? { Authorization: 'Bearer ' + token } : {}), body: JSON.stringify({ items }) }); return { status: r.status, body: await r.json().catch(() => null) }; };
} else {
  const src = readFileSync(join(here, '..', 'worker', 'worker.js'), 'utf8');
  worker = await import('data:text/javascript;base64,' + Buffer.from(src).toString('base64')); T = worker._t;
  const log = console.log; console.log = (...a) => { if (!(typeof a[0] === 'string' && a[0].startsWith('{"at"'))) log(...a); };   // hide the worker's own log lines
  var envFor = deep => Object.assign({ ALLOWED_ORIGINS: ORIGIN, ALLOW_ANON: '1', DEEP: String(deep), FIREBASE_PROJECT_ID: 'demo' },
    MODE === 'fake' ? { MINIMAX_API_KEY: 'fake-m', OPENROUTER_API_KEY: 'fake-o' } : { MINIMAX_API_KEY: process.env.MINIMAX_API_KEY || '', OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY || '' },
    opt('models') ? { MODELS: opt('models') } : {});
  if (MODE === 'local' && !process.env.MINIMAX_API_KEY && !process.env.OPENROUTER_API_KEY) { console.error('--local needs MINIMAX_API_KEY and/or OPENROUTER_API_KEY in the environment (or use --fake).'); process.exit(2); }
  send = async (items, env) => {
    T.hits.clear();                                                   // the per-hour limit is for students, not for the eval
    const r = await worker.default.fetch(new Request('https://eval.local/grade', { method: 'POST', headers: { Origin: ORIGIN, 'Content-Type': 'application/json', 'CF-Connecting-IP': '10.0.0.1' }, body: JSON.stringify({ items }) }), env);
    return { status: r.status, body: await r.json().catch(() => null) };
  };
}

/* ---------- running one configuration ---------- */
const pct = (n, d) => d ? Math.round(1000 * n / d) / 10 : 0;
const pctile = (a, p) => { if (!a.length) return 0; a = a.slice().sort((x, y) => x - y); return a[Math.min(a.length - 1, Math.floor(p * a.length))]; };
const range = r => r.expect.marks != null ? { min: Math.max(0, r.expect.marks - 0.5), max: Math.min(r.marks, r.expect.marks + 0.5) } : r.expect;

async function runConfig(deep) {
  if (T) { T.gradeCache.clear(); T.cool.clear(); }
  const env = envFor ? envFor(deep) : null;
  const c0 = { total: calls.total, byModel: Object.assign({}, calls.byModel) };
  const batches = []; for (let i = 0; i < rows.length; i += BATCH) batches.push(rows.slice(i, i + BATCH));
  const got = new Map(), lat = []; let failedBatches = 0, cached = 0, changed = 0, deepItems = 0, next = 0;
  async function worker1() {
    while (next < batches.length) {
      const b = batches[next++], t0 = Date.now(); let res = null;
      for (let attempt = 0; attempt < 2 && !(res && res.status === 200); attempt++) {
        if (attempt) await new Promise(r => setTimeout(r, 3000));
        res = await send(b.map(r => ({ id: r.id, marks: r.marks, question: r.question, model: r.model, answer: r.answer, rubric: r.rubric })), env).catch(() => null);
      }
      lat.push(Date.now() - t0);
      if (!res || res.status !== 200 || !res.body || !Array.isArray(res.body.results)) { failedBatches++; process.stdout.write('x'); continue; }
      process.stdout.write('.');
      res.body.results.forEach(x => { got.set(x.id, x); if (x.cached) cached++; if (x.changed) changed++; });
      if (res.body.deep) deepItems += res.body.results.length;
    }
  }
  const t0 = Date.now();
  await Promise.all(Array.from({ length: Math.min(CONC, batches.length) }, worker1));
  process.stdout.write('\n');

  const cats = {}, bad = [];
  const cat = k => cats[k] = cats[k] || { n: 0, ungraded: 0, inRange: 0, lenient: 0, harsh: 0, absErr: 0, nExact: 0, signed: 0 };
  for (const r of rows) {
    const g = got.get(r.id), tot = cat('ALL'), c = cat(r.cat), src = cat('source:' + r.source);
    for (const k of [tot, c, src]) k.n++;
    if (!g) { for (const k of [tot, c, src]) k.ungraded++; continue; }
    const { min, max } = range(r), m = g.marks;
    const verdict = m > max + 1e-9 ? 'lenient' : m < min - 1e-9 ? 'harsh' : 'ok';
    for (const k of [tot, c, src]) { if (verdict === 'ok') k.inRange++; else k[verdict]++; if (r.expect.marks != null) { k.nExact++; k.absErr += Math.abs(m - r.expect.marks); k.signed += m - r.expect.marks; } }
    if (verdict !== 'ok') bad.push({ id: r.id, cat: r.cat, qid: r.qid, max: r.marks, got: m, expected: r.expect, verdict, feedback: String(g.feedback || '').slice(0, 160) });
  }
  const used = { total: calls.total - c0.total, byModel: Object.fromEntries(Object.entries(calls.byModel).map(([k, v]) => [k, v - (c0.byModel[k] || 0)]).filter(([, v]) => v)) };
  return { deep: String(deep), rows: rows.length, seconds: Math.round((Date.now() - t0) / 100) / 10, failedBatches, cats, bad, providerCalls: used, verifierChanged: changed, verifiedItems: deepItems, cached, latencyMs: { p50: pctile(lat, 0.5), p95: pctile(lat, 0.95) } };
}

/* ---------- report ---------- */
function show(r, label) {
  const pad = (s, n) => String(s).padEnd(n), num = (s, n) => String(s).padStart(n);
  console.log(`\n=== ${label} ===  (${r.rows} answers, ${r.seconds}s)`);
  console.log(pad('category', 26) + num('n', 5) + num('in range', 10) + num('lenient', 9) + num('harsh', 7) + num('no result', 11));
  Object.keys(r.cats).sort((a, b) => (a === 'ALL' ? 1 : b === 'ALL' ? -1 : a.localeCompare(b))).forEach(k => {
    const c = r.cats[k], graded = c.n - c.ungraded;
    console.log(pad(k, 26) + num(c.n, 5) + num(pct(c.inRange, c.n) + '%', 10) + num(c.lenient, 9) + num(c.harsh, 7) + num(c.ungraded, 11) + (c.nExact ? `   exact-label MAE ${(c.absErr / c.nExact).toFixed(2)}, bias ${(c.signed / c.nExact >= 0 ? '+' : '') + (c.signed / c.nExact).toFixed(2)}` : ''));
  });
  const calls = Object.entries(r.providerCalls.byModel).map(([m, n]) => `${m} ×${n}`).join(', ') || (MODE === 'endpoint' ? 'n/a for a remote endpoint' : 'none');
  console.log(`provider calls: ${r.providerCalls.total}  (${calls})   per answer: ${(r.providerCalls.total / r.rows).toFixed(2)}`);
  console.log(`verifier changed the first mark on ${r.verifierChanged} answers; answers served from cache: ${r.cached}; batch latency p50 ${r.latencyMs.p50} ms, p95 ${r.latencyMs.p95} ms`);
  if (r.failedBatches) console.log(`⚠ ${r.failedBatches} batch(es) got no usable result: those answers are counted as "no result", not as passes.`);
  const lenient = r.bad.filter(b => b.verdict === 'lenient').slice(0, 6);
  if (lenient.length) { console.log('worst lenient cases:'); lenient.forEach(b => console.log(`  ${b.id}: gave ${b.got}/${b.max}, fair range ${range({ expect: b.expected, marks: b.max }).min}–${range({ expect: b.expected, marks: b.max }).max}`)); }
}

const configs = (MODE !== 'endpoint' && opt('compare') ? opt('compare').split(',') : [opt('deep', '1')]).map(s => s.trim());
if (MODE === 'endpoint' && opt('compare')) { console.error('--compare needs --local (it changes DEEP, which a deployed Worker fixes).'); process.exit(2); }
const reports = [];
for (const d of configs) {
  process.stdout.write(`running ${rows.length} answers${MODE === 'endpoint' ? '' : ' with DEEP=' + d} `);
  const r = await runConfig(d); reports.push(r); show(r, MODE === 'endpoint' ? 'deployed Worker' : 'DEEP=' + d);
}
if (reports.length > 1) {
  console.log('\n=== comparison ===');
  console.log('DEEP'.padEnd(8) + 'in range'.padStart(10) + 'lenient'.padStart(9) + 'harsh'.padStart(7) + 'model calls'.padStart(13) + 'p95 ms'.padStart(9));
  reports.forEach(r => { const a = r.cats.ALL; console.log(r.deep.padEnd(8) + (pct(a.inRange, a.n) + '%').padStart(10) + String(a.lenient).padStart(9) + String(a.harsh).padStart(7) + String(r.providerCalls.total).padStart(13) + String(r.latencyMs.p95).padStart(9)); });
}

const dir = join(here, 'eval', 'reports'); mkdirSync(dir, { recursive: true });
const file = join(dir, new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19) + '-' + MODE + (opt('label') ? '-' + opt('label') : '') + '.json');
writeFileSync(file, JSON.stringify({ mode: MODE, models: opt('models') || null, goldenVersion: golden.version, reports }, null, 1));
console.log('\nfull report (every miss, with feedback): ' + file.replace(join(here, '..') + '\\', '').replace(join(here, '..') + '/', ''));

const worst = reports.reduce((m, r) => Math.min(m, pct(r.cats.ALL.inRange, r.cats.ALL.n)), 100);
const gaps = reports.reduce((s, r) => s + r.cats.ALL.ungraded, 0);
const min = Number(opt('min', 0));
if (gaps) { console.error(`✗ ${gaps} answers got no result: the eval is not valid until every batch is graded.`); process.exit(1); }
if (min && worst < min) { console.error(`✗ ${worst}% in range is below --min ${min}%`); process.exit(1); }
process.exit(0);

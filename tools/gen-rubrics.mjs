#!/usr/bin/env node
/* Builds marking schemes (rubrics) for the written questions: the model answer split into points that carry marks.
   Offline, one time, with a human check afterwards. NOT part of the site; the site only reads the finished js/data/rubrics.js.

     node tools/gen-rubrics.mjs --limit 20                  pilot: a seeded sample spread across subjects, written to
                                                            tools/eval/reports/rubrics-pilot-<time>.json for you to read. Touches nothing else.
     node tools/gen-rubrics.mjs --limit 20 --write          also merge the accepted rubrics into js/data/rubrics.js
     node tools/gen-rubrics.mjs --all --write               every written question worth 2+ marks (skips ids that already have a rubric)
     node tools/gen-rubrics.mjs --ids geography-mock-1::g10 --write  just these questions (keys are paperId::questionId)
     node tools/gen-rubrics.mjs --dry                       list what would be sent, call no model

   Options: --gen "m1,m2"    models that write the rubric   (default minimax:MiniMax-M3,minimax:MiniMax-M3.1-Flash,deepseek/deepseek-v4-pro)
            --check "m1,m2"  models that check it           (default anthropic/claude-haiku-5.5,qwen/qwen3.8-flash; use a DIFFERENT provider than --gen)
            --concurrency 3  --redo (regenerate ids that already have a rubric)  --subject "Science"  --seed 7

   Two models, two jobs: the writer splits the model answer into points; a different model then reads the model answer and the
   rubric and rejects it if a point is invented, an important part of the answer is missing, or points overlap. Rejected ones are
   listed in the report and left without a rubric (the site then marks them from the model answer, as before). Keys come from the
   environment or the git-ignored .env file (MINIMAX_API_KEY, OPENROUTER_API_KEY); they are never printed. Only question text and
   model answers are sent: no student data exists in this tool. */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { createContext, runInContext } from 'node:vm';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
try { for (const l of readFileSync(join(root, '.env'), 'utf8').split(/\r?\n/)) { const m = l.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/); if (m && m[2] && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, ''); } } catch (e) {}

const argv = process.argv.slice(2);
const flag = n => argv.includes('--' + n), opt = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : d; };
const GEN = opt('gen', 'minimax:MiniMax-M3,minimax:MiniMax-M3.1-Flash,deepseek/deepseek-v4-pro').split(',').map(s => s.trim()).filter(Boolean);
const CHECK = opt('check', 'anthropic/claude-haiku-5.5,qwen/qwen3.8-flash').split(',').map(s => s.trim()).filter(Boolean);
const CONC = Math.max(1, Number(opt('concurrency', 3)) || 3), TIMEOUT = 150000;

/* ---- load the question bank exactly as the site does ---- */
const html = readFileSync(join(root, 'index.html'), 'utf8');
const sb = { console }; sb.window = sb; sb.self = sb; createContext(sb);
for (const m of html.matchAll(/<script src="(js\/data\/[^"]+)"/g)) runInContext(readFileSync(join(root, m[1]), 'utf8'), sb, { filename: m[1] });
const RUB_FILE = join(root, 'js', 'data', 'rubrics.js'), existing = sb.RUBRICS || {};

const decode = s => s.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
const text = h => decode(String(h || '')
  .replace(/<sub>(.*?)<\/sub>/gi, '_$1').replace(/<sup>(.*?)<\/sup>/gi, '^$1').replace(/<b>([\s\S]*?)<\/b>/gi, '**$1**')
  .replace(/<\/(p|div|li|tr|h\d)>|<br\s*\/?>/gi, '\n').replace(/<\/t[dh]>/gi, ' | ').replace(/<[^>]+>/g, '')).replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();

const pool = [], seenQ = new Set();
for (const P of sb.PAPERS) for (const S of P.sections) for (const q of S.questions) {
  if (q.type !== 'self' || q.marks < 2) continue;
  const model = text(q.solution), question = text(q.q);
  if (model.length < 25 || model.length > 3500 || question.length > 1500) continue;
  if (/अथवा|either|OR/.test(question + ' ' + model)) continue;     // either/or: points would split the alternatives, and a complete answer to one would look partial
  if (/<img|<svg/i.test(q.q + q.solution)) continue;                       // a diagram cannot be split into text points
  const key = P.id + '::' + q.id;                                           // question ids repeat across papers (g10 is a written question in one, an MCQ in another), so the key includes the paper; the app's canon() builds the same key
  if (seenQ.has(key)) continue; seenQ.add(key);
  pool.push({ id: key, subject: P.subject, chapter: q.chapter || '', marks: q.marks, question, model });
}

/* ---- choose what to do ---- */
let seed = Number(opt('seed', 20260102));
const rnd = () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
let todo = pool;
if (opt('subject')) todo = todo.filter(p => p.subject === opt('subject'));
if (opt('ids')) { const want = new Set(opt('ids').split(',')); todo = todo.filter(p => want.has(p.id)); }
if (!flag('redo')) todo = todo.filter(p => !existing[p.id]);
if (!flag('all') && !opt('ids')) {                                          // a sample spread across subjects (round-robin), seeded
  const n = Number(opt('limit', 20)) || 20, by = {};
  todo.slice().sort(() => rnd() - 0.5).forEach(p => (by[p.subject] = by[p.subject] || []).push(p));
  const keys = Object.keys(by).sort(), pick = [];
  for (let i = 0; pick.length < n && keys.some(k => by[k][i]); i++) for (const k of keys) if (by[k][i] && pick.length < n) pick.push(by[k][i]);
  todo = pick;
}
console.log(`${pool.length} written questions are eligible (2+ marks, text only); ${Object.keys(existing).length} already have a rubric; this run: ${todo.length}.`);
if (flag('dry')) { todo.forEach(p => console.log(`  ${p.id}  [${p.marks}]  ${p.subject}  ${p.question.slice(0, 70).replace(/\n/g, ' ')}`)); process.exit(0); }
if (!todo.length) process.exit(0);

/* ---- model calls (same providers as the Worker) ---- */
const PROV = {
  minimax: { max: 14000, url: 'https://api.minimax.io/v1/chat/completions', key: () => process.env.MINIMAX_API_KEY, extra: { reasoning_effort: 'low' } },
  openrouter: { max: 2500, url: 'https://openrouter.ai/api/v1/chat/completions', key: () => process.env.OPENROUTER_API_KEY, extra: { reasoning: { effort: 'low' } } }
};
const spec = e => { const i = e.indexOf(':'), p = i > 0 ? e.slice(0, i) : ''; return PROV[p] ? { p, m: e.slice(i + 1) } : { p: 'openrouter', m: e }; };
const usable = list => list.filter(e => PROV[spec(e).p].key());
if (!usable(GEN).length || !usable(CHECK).length) { console.error('Need an API key for at least one --gen model and one --check model (MINIMAX_API_KEY / OPENROUTER_API_KEY in the environment or .env).'); process.exit(2); }
const calls = { gen: 0, check: 0 }, down = new Map(), why = (e, w) => flag('debug') && console.log('    ! ' + e + ': ' + w);

async function ask(models, messages, kind) {
  for (let round = 0; round < 3; round++) {                                  // if everything is cooling down after a rate limit, wait and try again
    const r = await askOnce(models, messages, kind); if (r) return r;
    const soon = usable(models).filter(e => (down.get(e) || 0) > Date.now() && down.get(e) - Date.now() <= 65000);
    if (!soon.length) return null; await new Promise(r => setTimeout(r, 20000));
  }
  return null;
}
async function askOnce(models, messages, kind) {
  for (const e of usable(models)) {
    if ((down.get(e) || 0) > Date.now()) continue;
    const { p, m } = spec(e), ctl = new AbortController(), t = setTimeout(() => ctl.abort(), TIMEOUT);
    try {
      calls[kind]++;
      const r = await fetch(PROV[p].url, { method: 'POST', signal: ctl.signal, headers: { Authorization: 'Bearer ' + PROV[p].key(), 'Content-Type': 'application/json', 'X-Title': 'BoardWise rubric tool' }, body: JSON.stringify(Object.assign({ model: m, messages, temperature: 0, max_tokens: PROV[p].max }, PROV[p].extra)) });
      if (r.status === 429 || r.status >= 500) { why(e, 'HTTP ' + r.status); down.set(e, Date.now() + 45000); continue; }
      if (r.status === 402) { const b = await r.text().catch(() => ''); why(e, 'HTTP 402 ' + b.slice(0, 80).replace(/s+/g, ' ')); down.set(e, Date.now() + (/in-flight/i.test(b) ? 15000 : 600000)); continue; }   // "in-flight" = credit is tied up by parallel calls: wait a moment
      if (!r.ok) { why(e, 'HTTP ' + r.status + ' ' + (await r.text().catch(() => '')).slice(0, 160).replace(/s+/g, ' ')); down.set(e, Date.now() + 600000); continue; }
      const d = await r.json(), c = d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content;
      const j = parseJson(c); if (j) return { json: j, model: e };
      why(e, 'reply was not JSON: ' + String(c).slice(0, 120).replace(/s+/g, ' '));
    } catch (err) { why(e, err && err.name + ' ' + (err && err.message)); down.set(e, Date.now() + 30000); } finally { clearTimeout(t); }
  }
  return null;
}
function parseJson(c) {
  if (typeof c !== 'string') return null;
  c = c.replace(/<think>[\s\S]*?<\/think>/g, '').replace(/```(?:json)?/g, '');
  const a = c.indexOf('{'), b = c.lastIndexOf('}'); if (a < 0 || b <= a) return null;
  try { return JSON.parse(c.slice(a, b + 1)); } catch (e) { return null; }
}

const SYSTEM_GEN = `You write marking schemes for school board examinations (Class X, Maharashtra SSC and UP Board). You are given a question, the marks it carries and the official model answer. Split the model answer into the separate points a student must make to earn the marks.
Rules:
- Use ONLY what the model answer contains. Do not add facts, steps or alternatives it does not have.
- Each point says what the student must state or show, in a short self-contained sentence (at most 200 characters), written in the same language as the model answer. For numerical problems use steps: formula, substitution, calculation, final answer with unit.
- Marks per point in steps of 0.5. They must add up to EXACTLY the question's marks. Usually about one mark per point; a small idea may be worth 0.5, the core idea more.
- At most 12 points. Points must not overlap, so a student cannot earn the same marks twice.
- Do not make a point so vague that any answer meets it.
Reply with JSON only: {"points":[{"p":"...","m":1}, ...]}`;
const SYSTEM_CHECK = `You review a marking scheme written for a school board examination question. You are given the question, its marks, the official model answer and the proposed scheme (points with marks). Be strict. Reject the scheme (ok=false) if any of these is true:
- a point asks for something that is not in the model answer (invented content);
- an important part of the model answer is not covered by any point;
- two points overlap so a student could earn the same marks twice;
- a point is so vague that almost any answer would satisfy it;
- the marks are clearly out of proportion to how much each point matters.
Otherwise accept it. Reply with JSON only: {"ok":true|false,"issues":["short reason", ...]}`;

function clean(r, marks) {
  if (!r || !Array.isArray(r.points) || !r.points.length || r.points.length > 12) return null;
  const pts = r.points.map(x => ({ p: String((x && x.p) || '').replace(/\s+/g, ' ').trim(), m: Math.round(Number(x && x.m) * 2) / 2 }));
  if (pts.some(x => !x.p || x.p.length > 220 || !(x.m > 0) || x.m > marks)) return null;
  return Math.abs(pts.reduce((s, x) => s + x.m, 0) - marks) < 0.01 ? pts : null;
}
const asText = p => `QUESTION (${p.marks} marks):\n${p.question}\n\nMODEL ANSWER:\n${p.model}`;

async function one(p) {
  let notes = '';
  for (let attempt = 0; attempt < 2; attempt++) {                              // one retry, telling the writer what was wrong
    const g = await ask(GEN, [{ role: 'system', content: SYSTEM_GEN }, { role: 'user', content: asText(p) + notes }], 'gen');
    if (!g) return { id: p.id, status: 'no-writer' };
    const pts = clean(g.json, p.marks);
    if (!pts) { notes = `\n\nYour previous reply was unusable: the marks must add up to exactly ${p.marks}, in steps of 0.5, with every point 220 characters or fewer. Try again.`; continue; }
    const c = await ask(CHECK, [{ role: 'system', content: SYSTEM_CHECK }, { role: 'user', content: asText(p) + '\n\nPROPOSED SCHEME:\n' + pts.map((x, i) => `${i + 1}. [${x.m}] ${x.p}`).join('\n') }], 'check');
    if (!c) return { id: p.id, status: 'no-checker', points: pts, writer: g.model };
    if (c.json.ok === true) return { id: p.id, status: 'accepted', points: pts, writer: g.model, checker: c.model };
    const issues = Array.isArray(c.json.issues) ? c.json.issues.map(String).slice(0, 4) : [];
    if (attempt === 1) return { id: p.id, status: 'rejected', points: pts, issues, writer: g.model, checker: c.model };
    notes = `\n\nA reviewer rejected your previous scheme: ${issues.join('; ') || 'not faithful to the model answer'}. Write a corrected scheme.`;
  }
  return { id: p.id, status: 'unusable' };
}

/* ---- run ---- */
const results = []; let next = 0, done = 0;
await Promise.all(Array.from({ length: Math.min(CONC, todo.length) }, async () => {
  while (next < todo.length) {
    const p = todo[next++], r = await one(p).catch(e => ({ id: p.id, status: 'error' }));
    r.subject = p.subject; r.chapter = p.chapter; r.marks = p.marks; r.question = p.question.slice(0, 300); r.model = p.model.slice(0, 600);
    results.push(r); done++;
    console.log(`  [${done}/${todo.length}] ${p.id} ${r.status}${r.points ? ' (' + r.points.length + ' points)' : ''}`);
  }
}));

const tally = {}; results.forEach(r => tally[r.status] = (tally[r.status] || 0) + 1);
console.log('\nResult:', tally, ' model calls:', calls);
mkdirSync(join(root, 'tools', 'eval', 'reports'), { recursive: true });
const rep = join(root, 'tools', 'eval', 'reports', `rubrics-${new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)}.json`);
writeFileSync(rep, JSON.stringify({ gen: GEN, check: CHECK, tally, results: results.sort((a, b) => a.id.localeCompare(b.id)) }, null, 1));
console.log('Report for your spot-check (question, model answer, points, verdict):', rep.replace(root, '.'));

if (flag('write')) {
  const merged = Object.assign({}, existing);
  results.filter(r => r.status === 'accepted').forEach(r => merged[r.id] = r.points);
  const head = readFileSync(RUB_FILE, 'utf8').split('*/')[0].split('\r').join('') + '*/';   // keep the file's own explanatory comment
  const body = Object.keys(merged).sort().map(k => '  ' + JSON.stringify(k) + ': ' + JSON.stringify(merged[k])).join(',\n');
  writeFileSync(RUB_FILE, (head.trimEnd() + '\nwindow.RUBRICS = window.RUBRICS || {};\nObject.assign(window.RUBRICS, {\n' + body + '\n});\n').split('\n').join('\r\n'));
  console.log(`js/data/rubrics.js now holds ${Object.keys(merged).length} rubrics. Run  node tools/validate.js  next.`);
} else console.log('Nothing was written to js/data/rubrics.js (add --write once the sample looks right).');

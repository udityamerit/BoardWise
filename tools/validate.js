#!/usr/bin/env node
/* BoardWise question-bank validator.  Run:  node tools/validate.js   (add --verbose to list every warning)
   Loads the data files exactly as the browser does (the order in index.html) and checks every paper and question.
   Errors (exit code 1) are things that break the site; warnings are things a human should look at. */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const verbose = process.argv.includes('--verbose');

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const files = [...html.matchAll(/<script src="(js\/data\/[^"]+)"/g)].map(m => m[1]);
const sandbox = { window: {}, console };
sandbox.window = sandbox; sandbox.self = sandbox; vm.createContext(sandbox);
files.forEach(f => {
  try { vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), sandbox, { filename: f }); }
  catch (e) { console.error('✗ cannot load ' + f + ': ' + e.message); process.exit(1); }
});

const PAPERS = sandbox.PAPERS || [], SUBJECTS = sandbox.SUBJECTS || [];
const errors = [], warns = [];
const E = (w, m) => errors.push(w + ': ' + m), W = (w, m) => warns.push(w + ': ' + m);
const plain = h => String(h || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const subjKeys = new Set(SUBJECTS.map(s => s.key));
const SELFTAGS = new Set(['br', 'img', 'hr', 'input', 'path', 'circle', 'line', 'rect', 'polygon', 'polyline', 'ellipse', 'stop']);
function tagBalance(h) {          // crude: every <b>, <i>, <sub>, <sup>, <table>, <tr>, <td>, <ul>, <li>, <div>, <p>, <span> closes
  const stack = [];
  for (const m of String(h || '').matchAll(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?(\/?)>/g)) {
    const t = m[1].toLowerCase(), closing = m[0][1] === '/';
    if (SELFTAGS.has(t) || m[2] === '/') continue;
    if (!closing) stack.push(t);
    else { const i = stack.lastIndexOf(t); if (i < 0) return 'stray </' + t + '>'; stack.length = i; }
  }
  return stack.length ? 'unclosed <' + stack[stack.length - 1] + '>' : '';
}

const ids = new Set(), seenPaperQ = new Map();
let nQ = 0, nMarks = 0;
const byType = { mcq: 0, num: 0, self: 0 }, bySubject = {};

PAPERS.forEach(P => {
  const where = 'paper ' + P.id;
  if (!P.id || ids.has(P.id)) E(where, 'missing or duplicate paper id'); ids.add(P.id);
  if (!subjKeys.has(P.subject)) E(where, 'unknown subject "' + P.subject + '"');
  if (!P.title) E(where, 'no title');
  if (!Array.isArray(P.sections) || !P.sections.length) { E(where, 'no sections'); return; }
  const secIds = new Set(), qids = new Set();
  let total = 0;
  P.sections.forEach(S => {
    const sw = where + ' / section ' + S.id;
    if (!S.id || secIds.has(S.id)) E(sw, 'missing or duplicate section id'); secIds.add(S.id);
    if (!S.title) E(sw, 'no title');
    if (!Array.isArray(S.questions) || !S.questions.length) { E(sw, 'section has no questions'); return; }
    if (S.attempt && S.attempt > S.questions.length) E(sw, '"attempt ' + S.attempt + '" is more than the ' + S.questions.length + ' questions given');
    if (S.passage) { const b = tagBalance(S.passage); if (b) E(sw, 'passage HTML: ' + b); }
    const marksList = [];
    S.questions.forEach(q => {
      const w = where + ' / ' + q.id;
      nQ++; byType[q.type] = (byType[q.type] || 0) + 1; bySubject[P.subject] = (bySubject[P.subject] || 0) + 1;
      if (!q.id || qids.has(q.id)) E(w, 'missing or duplicate question id'); qids.add(q.id);
      if (!['mcq', 'num', 'self'].includes(q.type)) E(w, 'bad type "' + q.type + '"');
      if (!(q.marks > 0 && q.marks <= 20)) E(w, 'bad marks ' + q.marks);
      marksList.push(q.marks);
      if (!plain(q.q)) E(w, 'empty question text');
      if (!q.chapter) W(w, 'no chapter (progress charts cannot place it)');
      const bq = tagBalance(q.q); if (bq) E(w, 'question HTML: ' + bq);
      if (!plain(q.solution)) E(w, 'no model answer / solution');
      else { const bs = tagBalance(q.solution); if (bs) E(w, 'solution HTML: ' + bs); }
      if (/\b(undefined|NaN|\[object|TODO|FIXME|lorem)\b/i.test(plain(q.q) + ' ' + plain(q.solution))) E(w, 'placeholder / broken text in question or solution');
      if (q.type === 'mcq') {
        if (!Array.isArray(q.options) || q.options.length < 2) E(w, 'MCQ needs at least 2 options');
        else {
          if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) E(w, 'MCQ answer index ' + q.answer + ' is outside the ' + q.options.length + ' options');
          const o = q.options.map(x => plain(x).toLowerCase());
          if (new Set(o).size < o.length) W(w, 'two options look identical');
          if (o.some(x => !x)) E(w, 'an option is empty');
          q.options.forEach(x => { const b = tagBalance(x); if (b) E(w, 'option HTML: ' + b); });
          if (q.options.length !== 4) W(w, 'MCQ has ' + q.options.length + ' options (boards use 4)');
        }
      } else if (q.type === 'num') {
        if (!Array.isArray(q.accept) || !q.accept.length || q.accept.some(a => a === '' || a == null)) E(w, 'numeric question needs a non-empty accept list');
      }
      /* the same question text appearing in two papers is fine for retakes, but twice in one paper is a slip */
      const key = P.id + '|' + plain(q.q).toLowerCase();
      if (seenPaperQ.has(key)) W(w, 'same question text as ' + seenPaperQ.get(key) + ' in this paper'); else seenPaperQ.set(key, q.id);
    });
    const n = S.attempt && S.attempt < S.questions.length ? S.attempt : S.questions.length;
    total += marksList.sort((a, b) => b - a).slice(0, n).reduce((a, b) => a + b, 0);
  });
  nMarks += total;
  const sj = SUBJECTS.find(x => x.key === P.subject);
  if (P.kind !== 'pyq' && sj && sj.total && total !== sj.total) W(where, 'counts for ' + total + ' marks but the subject is set up as ' + sj.total);
});

const text_ = h => String(h || '').replace(/<[^>]+>/g, ' ');
/* marking schemes (js/data/rubrics.js): each must belong to a written question and add up to that question's marks */
{
  const RUB = sandbox.RUBRICS || {}, byId = new Map();
  PAPERS.forEach(P => P.sections.forEach(S => S.questions.forEach(q => byId.set(P.id + '::' + q.id, q))));   // keys are paperId::questionId (question ids repeat across papers)
  let nR = 0;
  for (const [id, r] of Object.entries(RUB)) {
    nR++; const q = byId.get(id), w = 'rubric ' + id;
    if (!q) { E(w, 'no such question'); continue; }
    if (q.type !== 'self') { E(w, 'only written questions have rubrics'); continue; }
    if (!Array.isArray(r) || !r.length || r.length > 12) { E(w, 'needs 1 to 12 points'); continue; }
    if (/अथवा|either|OR/.test(text_(q.q) + ' ' + r.map(x => x && x.p).join(' '))) { E(w, 'either/or question: a scheme would mark a complete answer to one alternative as partial'); continue; }
    let sum = 0;
    r.forEach((x, i) => { const m = x && Number(x.m); if (!x || typeof x.p !== 'string' || !x.p.trim() || x.p.length > 220) E(w, 'point ' + (i + 1) + ' has no usable text'); if (!(m > 0 && m <= q.marks && m * 2 === Math.round(m * 2))) E(w, 'point ' + (i + 1) + ' has bad marks ' + (x && x.m)); sum += m || 0; });
    if (Math.abs(sum - q.marks) > 0.01) E(w, 'points add up to ' + sum + ' but the question is worth ' + q.marks);
  }
  if (nR) console.log('Checked ' + nR + ' rubrics.');
}

/* every subject should have something to practise on */
SUBJECTS.forEach(s => { if (!PAPERS.some(p => p.subject === s.key)) W('subject ' + s.key, 'has no papers'); });

console.log(`Checked ${PAPERS.length} papers, ${nQ} questions (${byType.mcq || 0} MCQ, ${byType.num || 0} numeric, ${byType.self || 0} written) in ${SUBJECTS.length} subjects.`);
Object.entries(bySubject).forEach(([k, n]) => console.log('  ' + k.padEnd(10) + n));
if (warns.length) { console.log('\n' + warns.length + ' warning(s)' + (verbose ? ':' : ' (run with --verbose to list)')); if (verbose) warns.forEach(x => console.log('  ! ' + x)); }
if (errors.length) { console.log('\n' + errors.length + ' ERROR(S):'); errors.slice(0, 200).forEach(x => console.log('  ✗ ' + x)); process.exit(1); }
console.log('\n✓ No errors.');

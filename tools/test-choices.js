#!/usr/bin/env node
/* Regression test for marking of whole attempts and written answers.   Run:  node tools/test-choices.js
   Uses the real js/app.js evaluate() and js/check.js (see tools/lib-app-harness.js).
   1. A student who answers EVERY question of a paper correctly (model answer typed in) must get the paper's full marks,
      even when they answer more than "any N of M" asks: the best N count, the rest are shown but never beat a better one.
   2. Every written question with bold final answers must accept those answers typed in several different ways. */
'use strict';
const load = require('./lib-app-harness.js');
const sb = load(), X = sb.__X, C = sb.CHK;
let fails = 0, checks = 0; const out = [];
const bad = m => { fails++; if (out.length < 40) out.push(m); };

/* what a student would type: the model answer as plain text (table cells separated by spaces) */
const typed = q => C.stripTags(String(q.solution || '').replace(/<\/(td|th|tr|li|p|div)>/gi, ' ').replace(/<br\s*\/?>/gi, ' '));
const answerOf = q => q.type === 'mcq' ? String.fromCharCode(65 + q.answer) : q.type === 'num' ? q.accept[0] : typed(q);

/* ---- 1. whole attempts ---- */
let papers = 0, pending = 0, extras = 0;
sb.PAPERS.forEach(P => {
  if (P.board && P.board !== 'msbshse') return; papers++;
  const qs = X.flat(P);
  const A = { paperId: P.id, qids: qs.map(q => q.id), answers: {}, self: {}, ai: {}, tq: {}, chg: {} };
  qs.forEach(q => { A.answers[q.id] = answerOf(q); });
  const r = X.evaluate(A);
  checks++;
  r.rows.forEach(x => {
    if (x.pending) { pending++; return; }                                    // drawings / open answers: the student or the AI examiner marks these
    if (x.st !== 'skip' && x.got < x.q.marks - 1e-9) bad(P.id + ' ' + x.q.id + ': the model answer typed in scores ' + x.got + '/' + x.q.marks);
  });
  /* in each "any N of M" section exactly N count, and they are the best N */
  X.groupBySec(qs).forEach(g => {
    const n = X.need(g), rows = r.rows.filter(x => x.q.sec.id === g.sec.id);
    const kept = rows.filter(x => x.counted), left = rows.filter(x => !x.counted);
    checks++;
    if (kept.length !== n) bad(P.id + ' ' + g.sec.id + ': ' + kept.length + ' counted, expected ' + n);
    extras += left.length;
    if (left.some(x => kept.some(k => k.got < x.got - 1e-9))) bad(P.id + ' ' + g.sec.id + ': an extra answer is worth more than a counted one');
  });
  const unfinished = r.rows.filter(x => x.counted && x.pending).length;
  if (!unfinished && Math.abs(r.got - r.total) > 1e-9) bad(P.id + ': all answers correct but total is ' + r.got + ' of ' + r.total);
});

/* ---- 2. written answers typed in different ways ---- */
const seen = new Set(); let selfQs = 0;
sb.PAPERS.forEach(P => X.flat(P).forEach(q => {
  if (q.type !== 'self') return;
  const keys = C._finalKeys(q); if (!keys.length) return;
  const sig = q.q + '|' + q.solution; if (seen.has(sig)) return; seen.add(sig);
  const base = C.auto(q, typed(q)); if (!base) return;                       // cannot be auto-checked at all (drawings, open answers)
  selfQs++;
  const pure = keys.map(k => C.stripTags(k));
  const shapes = {
    'answers only':        pure.join('; '),
    'joined with and':     pure.join(' and '),
    'one per line':        pure.join('\n'),
    'numbered':            pure.map((k, i) => (i + 1) + ') ' + k).join(' '),
    'with a lead-in':      'Answer: ' + pure.join(', '),
    'ALL CAPS':            pure.join(', ').toUpperCase(),
    'extra spaces':        '  ' + pure.join('  ,  ') + '  ',
    'full stop':           pure.join(', ') + '.',
    'rupee as Rs.':        pure.join('; ').replace(/₹\s?/g, 'Rs.'),
    'no thousands commas': pure.join('; ').replace(/(\d),(\d{3})/g, '$1$2'),
    'whole model answer':  typed(q),
  };
  Object.entries(shapes).forEach(([name, a]) => {
    checks++;
    const r = C.auto(q, a);
    if (!r || r.f < 0.98) bad(q.id + ' [' + name + '] ' + JSON.stringify(a).slice(0, 90) + ' -> ' + (r ? r.f.toFixed(2) : 'not checked'));
  });
  /* a wrong answer must not get marks */
  checks++;
  const w = C.auto(q, 'I do not know this question at all');
  if (w && w.f > 0.3) bad(q.id + ': a wrong answer scored ' + w.f.toFixed(2));
}));

console.log(papers + ' papers, ' + selfQs + ' written questions with final answers, ' + checks + ' checks (' + extras + ' extra answers shown, ' + pending + ' left to AI / self-marking).');
if (fails) { console.log('✗ ' + fails + ' failures'); out.forEach(l => console.log('  ' + l)); process.exit(1); }
console.log('✓ correct answers always earn their marks, in whatever form they are typed.');

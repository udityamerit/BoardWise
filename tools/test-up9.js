#!/usr/bin/env node
/* UP Board Class IX pack (js/data/up9-*.js): every paper has its full count of questions from the subject's chapters; in the bilingual
   subjects every question, option and solution has its Hindi, and the English and Hindi halves are not swapped or mixed; every test
   is different from the others; and generators give four different options for many random seeds. Run: node tools/test-up9.js */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const files = [...html.matchAll(/<script src="(js\/data\/[^"?]+)/g)].map(m => m[1]);
const W = { console, Math, JSON, Map, Set }; W.window = W; W.self = W; vm.createContext(W);
files.forEach(f => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), W, { filename: f }));

const errs = [], E = (w, m) => errs.push(w + ': ' + m);
const DEV = /[ऀ-ॿ]/, plain = h => String(h || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const subs = W.SUBJECTS.filter(s => s.board === 'up9'), papers = W.PAPERS.filter(p => p.board === 'up9');
if (subs.length !== 6) E('pack', 'expected 6 Class IX subjects, found ' + subs.length);
if (papers.length !== 60) E('pack', 'expected 60 Class IX papers, found ' + papers.length);
let nq = 0;
subs.forEach(S => {
  const chs = new Set([].concat(...Object.values(S.chapters))), ps = papers.filter(p => p.subject === S.key), used = new Set(), sets = new Set();
  if (ps.length !== 10) E(S.key, ps.length + ' papers');
  ps.forEach(P => {
    const qs = P.sections[0].questions; nq += qs.length;
    if (qs.length !== S.n) E(P.id, qs.length + ' questions, expected ' + S.n);
    const sig = qs.map(q => plain(q.q)).sort().join('¦'); if (sets.has(sig)) E(P.id, 'same questions as another test'); sets.add(sig);
    qs.forEach(q => {
      const w = P.id + ' ' + q.id; used.add(q.chapter);
      if (!chs.has(q.chapter)) E(w, 'chapter "' + q.chapter + '" is not in the subject');
      [q.q, q.solution, ...q.options].forEach(t => { if (/\|/.test(t)) E(w, 'stray "|" in ' + plain(t).slice(0, 60)); });
      if (new Set(q.options.map(plain)).size !== 4) E(w, 'options repeat: ' + q.options.join(' / '));
      if (!S.bilingual) return;
      const h = W.NL.hiQ(P.id + '|' + q.id);
      if (!h || !h.q || !h.s || !h.o || h.o.length !== 4 || h.o.some(x => !x)) { E(w, 'Hindi missing'); return; }
      if (DEV.test(q.q) || DEV.test(q.solution)) E(w, 'Devanagari in the English: ' + plain(q.q).slice(0, 60));
      if (!DEV.test(h.q) || !DEV.test(h.s)) E(w, 'no Devanagari in the Hindi: ' + plain(h.q).slice(0, 60));
      q.options.forEach((o, i) => { if (DEV.test(o)) E(w, 'Devanagari in English option ' + o); if (/[A-Za-z]{4,}/.test(o) && !DEV.test(h.o[i]) && !/^[A-Z][a-z]?$|^\(?[A-Za-z₀-₉⁰-⁹²³⁺⁻\d\s().,·/√π+−-]+\)?$/.test(o)) E(w, 'English option without Hindi: ' + o); });
      if (new Set(h.o.map(plain)).size !== 4) E(w, 'Hindi options repeat: ' + h.o.join(' / '));
    });
  });
  chs.forEach(c => { if (!used.has(c)) E(S.key, 'no question from chapter ' + c); });
});
/* generators: many seeds, four different options each time, and the right answer survives the shuffle */
Object.entries(W.U9.bank).forEach(([k, b]) => b.items.filter(it => it.gen).forEach((it, gi) => {
  for (let s = 1; s <= 200; s++) {
    const r = W.NL.rng(s * 7919 + gi), g = it.gen(r);
    if (!Array.isArray(g) || g.length !== 6 || g.some(x => x == null || /undefined|NaN|Infinity/.test(String(x)))) { E(k + ' generator ' + gi, 'broken output ' + JSON.stringify(g).slice(0, 120)); break; }
  }
}));
if (errs.length) { console.error(errs.slice(0, 40).join('\n') + (errs.length > 40 ? '\n… ' + (errs.length - 40) + ' more' : '')); console.error('✗ ' + errs.length + ' problem(s)'); process.exit(1); }
console.log(`✓ UP Board Class IX: ${papers.length} papers, ${nq} questions in ${subs.length} subjects; Hindi complete for the bilingual subjects.`);

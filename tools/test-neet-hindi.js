/* Hindi medium of the NEET-pattern papers: checks that every question, option and solution of all 40 NEET papers comes out in Hindi,
   that the Hindi templates use the same {n} slots as their English, that no Hindi id is stale, and that the papers themselves
   (questions, option order, answers) are unchanged by the Hindi layer.
   Run: node tools/test-neet-hindi.js [--list N]  (prints up to N English pieces that still have no Hindi, most used first) */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const args = process.argv.slice(2), LIST = +(args[args.indexOf('--list') + 1] || 40);

function load() {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const files = [...html.matchAll(/<script src="(js\/data\/(?:config|neet-[\w-]+)\.js)(?:\?[^"]*)?"/g)].map(m => m[1]);
  const sb = { console, Math, JSON, Map, Set }; sb.window = sb; sb.PAPERS = []; sb.SUBJECTS = [];
  vm.createContext(sb);
  files.forEach(f => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), sb, { filename: f }));
  return sb;
}
const W = load(), NL = W.NL;
const papers = W.PAPERS.filter(p => p.board === 'upneet');
if (papers.length !== 40) throw new Error('expected 40 NEET papers, found ' + papers.length);

/* log every piece NL.T cannot translate */
const miss = new Map(), T0 = NL.T;
NL.T = s => { const r = T0(s); if (r == null) miss.set(s, (miss.get(s) || 0) + 1); return r; };

NL.hiUsed = new Set();   // ids the papers actually read (an id for generated text is not an English literal of the banks)
let nq = 0, full = 0, badQ = 0, badO = 0, badS = 0, rec = [];
papers.forEach(P => P.sections.forEach(sec => sec.questions.forEach(q => {
  nq++;
  const h = NL.hiQ(P.id + '|' + q.id);
  if (!h) { rec.push('no source for ' + P.id + '|' + q.id); badQ++; return; }
  const ok = [h.q != null, h.o != null, h.s != null];
  if (!ok[0]) badQ++; if (!ok[1]) badO++; if (!ok[2]) badS++;
  if (ok.every(Boolean)) full++;
  if (h.o && h.o.length !== q.options.length) rec.push('option count differs: ' + P.id + '|' + q.id);
  if (h.o && new Set(h.o).size !== h.o.length) rec.push('two Hindi options are the same: ' + P.id + '|' + q.id + ' ' + JSON.stringify(h.o));
})));

/* Hindi files: placeholder slots and stale ids */
const ex = require('./neet-hi-extract.js');
const english = new Map();
['phy', 'chem', 'bot', 'zoo', 'maths'].forEach(b => ex.extract(b).forEach(l => english.set(ex.hash(l.value), l.value)));
let slotErr = 0, stale = 0, dup = 0; const seen = new Set();
fs.readdirSync(path.join(ROOT, 'js/data')).filter(f => /^neet-hi-(?!tpl)[\w-]+\.js$/.test(f)).forEach(f => {
  const s = fs.readFileSync(path.join(ROOT, 'js/data', f), 'utf8');
  if (/`[\s\S]*`[\s\S]*`/.test(s.replace(/^NL\.hiAdd\(`|`\);?\s*$/gm, ''))) rec.push(f + ': stray backtick');
  for (const m of s.matchAll(/^([0-9a-f]{8})\|(.*)$/gm)) {
    const [, id, hi] = m, en = english.get(id);
    if (seen.has(id)) { dup++; rec.push(f + ': id twice ' + id); } seen.add(id);
    if (en == null && !NL.hiUsed.has(id)) { stale++; rec.push(f + ': unused id ' + id); continue; }
    if (en == null) continue;
    const slots = x => (x.match(/\{\d+\}/g) || []).sort().join();
    if (slots(en) !== slots(hi)) { slotErr++; rec.push(f + ': slots differ ' + id + '  EN ' + en.slice(0, 80) + '  HI ' + hi.slice(0, 80)); }
    if (/\$\{|`/.test(hi)) rec.push(f + ': ${ or backtick in ' + id);
  }
});

/* the papers must be exactly what the English banks produce (fingerprint of question, options and answer) */
const fp = papers.map(P => P.id + ':' + P.sections.map(s => s.questions.map(q => NL.hash(q.q + '¦' + q.options.join('¦') + '¦' + q.answer).toString(36)).join(',')).join(';')).join('\n');
const FP = NL.hash(fp).toString(16);

console.log(`NEET papers ${papers.length} · questions ${nq} · fully in Hindi ${full} (${(full / nq * 100).toFixed(1)}%)`);
console.log(`missing: question text ${badQ} · options ${badO} · solutions ${badS} · English pieces without Hindi ${miss.size}`);
console.log(`Hindi lines: ${seen.size} · slot mismatches ${slotErr} · unused ids ${stale} · duplicate ids ${dup} · papers fingerprint ${FP}`);
rec.slice(0, 30).forEach(r => console.log('  ! ' + r));
if (miss.size) {
  console.log(`\nNo Hindi yet (${Math.min(LIST, miss.size)} of ${miss.size}, most used first):`);
  [...miss].sort((a, b) => b[1] - a[1] || a[0].length - b[0].length).slice(0, LIST).forEach(([s, n]) => console.log(`  ${n}×  ${ex.hash(s)}  ${s.replace(/\n/g, ' ').slice(0, 160)}`));
}
process.exitCode = full === nq && !slotErr && !stale && !dup && !rec.length ? 0 : 1;

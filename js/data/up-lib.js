/* Shared helpers for the UP Board (UPMSP) Class X mock papers. */
(function () {
const { opts } = window.QB;
const OR = '<br><b>अथवा</b><br>';
// options with unit/suffix: pad with neighbouring numbers so there are always three distinct wrong options
function safe(right, wr, p) {
  const m = typeof right === 'string' && /^(-?[\d.]+)(.*)$/.exec(right);
  let w = wr.map(String);
  if (m) { const n = parseFloat(m[1]), suf = m[2]; [1, -1, 2, -2, 3, 4].forEach(d => w.push(+(n + d).toFixed(2) + suf)); }
  w = w.filter(x => x !== String(right));
  return opts(right, w, p);
}
let posCtr = 0;
// fact item: [question, right, w1, w2, w3, solution, chapter?]
function mcqOf(B, it, ch) { const r = safe(it[1], it.slice(2, 5), posCtr++); return B.mcq(1, it[6] || ch, it[0], r.o, r.a, it[5]); }
// rotate through a pool so that two mocks never get the same set
function take(pool, k, j, per) { return pool[(k * per + j) % pool.length]; }
// either/or written question from two pool items {q, s, ch}: (क) item a  अथवा  (ख) item b
function either(B, marks, a, b) { return B.self(marks, a.ch, `(क) ${a.q}${OR}(ख) ${b.q}`, `(क) ${a.s}<br>(ख) ${b.s}`); }
function pair(pool, k) { return [pool[k % pool.length], pool[(k + 3) % pool.length]]; }
const DUR = 195;
function paper(subject, N, title, desc, note, sections) {
  window.PAPERS.push({ id: subject + '-mock-' + N, subject, board: 'upmsp', level: 'Class X', kind: 'mock', year: null, durationMin: DUR, title, desc, note, sections });
}
window.UPL = { OR, safe, mcqOf, take, either, pair, paper };
})();

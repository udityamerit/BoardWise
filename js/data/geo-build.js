/* Assembles Geography mock tests 2–10 from the chapter banks in geo-1/2/3.js.
   Chapters are interleaved round-robin and paper k takes the next block, so every paper draws on many chapters and no question repeats across mocks 2–10.
   Layout is the same as mock 1 (28 marks): Q1 6×1 MCQ, Q2 any 4 of 5 (2 each), Q3 any 2 of 3 (3 each), Q4 any 2 of 3 (4 each). */
(function () {
const { bld, sec, opts } = window.QB;
const GB = window.GB;
const CHS = Object.keys(GB.bank);

const norm = t => String(t).replace(/\s+/g, ' ');
const inMock1 = new Set();   // text already used in geography-mock-1 is left out
(window.PAPERS.find(p => p.id === 'geography-mock-1') || { sections: [] }).sections.forEach(s => s.questions.forEach(q => inMock1.add(norm(q.q))));

const flatten = (cat, rot) => {
  const chs = CHS.slice(rot % CHS.length).concat(CHS.slice(0, rot % CHS.length));   // each question type starts at a different chapter
  const lists = chs.map(ch => GB.bank[ch][cat].filter(item => !inMock1.has(norm(item[0]))).map(item => ({ ch, item })));
  const out = [], max = Math.max(...lists.map(l => l.length));
  for (let i = 0; i < max; i++) lists.forEach(l => { if (i < l.length) out.push(l[i]); });
  return out;
};
const pool = { m: flatten('mcq', 0), t: flatten('two', 3), h: flatten('three', 5), f: flatten('four', 7) };
const need = { m: 6, t: 5, h: 3, f: 3 };
Object.keys(need).forEach(k => { if (pool[k].length < 9 * need[k]) throw new Error(`geography bank too small: ${k} has ${pool[k].length}, needs ${9 * need[k]}`); });

let posCtr = 0;
const take = (k, key) => pool[key].slice(k * need[key], (k + 1) * need[key]);
const mcqOf = (B, { ch, item }) => { const [q, right, w1, w2, w3, sol] = item, r = opts(right, [w1, w2, w3], posCtr++); return B.mcq(1, ch, q, r.o, r.a, sol); };
const selfOf = (B, marks, { ch, item }) => B.self(marks, ch, item[0], item[1]);

for (let k = 0; k < 9; k++) {
  const N = k + 2, B = bld('g' + N + '-');
  const sections = [
    sec('q1', 1, 'Q.1 Choose the correct option', null, 'All six are compulsory (1 mark each).', take(k, 'm').map(x => mcqOf(B, x))),
    sec('q2', 1, 'Q.2 Answer in two or three sentences', 4, 'Attempt any four of five (2 marks each).', take(k, 't').map(x => selfOf(B, 2, x))),
    sec('q3', 1, 'Q.3 Write short answers', 2, 'Attempt any two of three (3 marks each).', take(k, 'h').map(x => selfOf(B, 3, x))),
    sec('q4', 1, 'Q.4 Answer in detail', 2, 'Attempt any two of three (4 marks each).', take(k, 'f').map(x => selfOf(B, 4, x)))
  ];
  window.PAPERS.push({
    id: 'geography-mock-' + N, subject: 'geography', kind: 'mock', year: null, durationMin: 90,
    title: `Geography — Mock Test ${N}`,
    desc: 'Geography (28 marks) · 90 minutes · MCQs plus "any N" choices.',
    note: 'Original questions based on the Balbharati Geography textbook; no question is repeated across mocks 2–10. The Geography paper layout is <b>approximate</b>: the 28-mark split (Q1 6×1, Q2 any 4 of 5 at 2, Q3 any 2 of 3 at 3, Q4 any 2 of 3 at 4) is our design, not an official board paper. Economics is not included. MCQs are marked automatically; written answers are shown with a model answer and marking points for you to self-mark.',
    sections
  });
}
})();

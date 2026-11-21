/* Assembles Science mock tests 2–10 from the chapter banks in sci-phy / sci-chem / sci-bio1 / sci-bio2 / sci-env.
   For each part and question type the chapters are interleaved round-robin (item 1 of every chapter, then item 2 …) and paper k takes the next
   block, so every paper draws on every chapter and no question is repeated across mocks 2–10. Layout is the same as mock 1. */
(function () {
const { bld, sec, opts } = window.QB;
const SCI = window.SCI;
const LAYOUT = [   // [section id, title, attempt, instruction, category, count, marks]
  ['q1a', 'Q.1 (A) Choose the correct option', 5, 'Write the letter of the correct answer (1 mark each).', 'mcq', 5, 1],
  ['q1b', 'Q.1 (B) Answer in one word or one sentence', null, 'All five are compulsory (1 mark each).', 'one', 5, 1],
  ['q2', 'Q.2 Solve any five of the following', 5, 'Attempt any five (2 marks each).', 'two', 7, 2],
  ['q3', 'Q.3 Solve any five of the following', 5, 'Attempt any five (3 marks each).', 'three', 8, 3],
  ['q4', 'Q.4 Solve any one of the following', 1, 'Attempt any one (5 marks).', 'five', 2, 5]
];
const label = k => k.replace(/ \(Part \d\)$/, '');
/* interleave: [{ch, item}...] item 0 of every chapter, then item 1, ... */
const qText = item => String(item && item.num ? item.q : item[0]).replace(/\s+/g, ' ');
const inMock1 = new Set();   // questions already used in science-mock-1 are left out of the later mocks
(window.PAPERS.find(p => p.id === 'science-mock-1') || { sections: [] }).sections.forEach(s => s.questions.forEach(q => inMock1.add(String(q.q).replace(/\s+/g, ' '))));
const flatten = (part, cat) => {
  const lists = Object.keys(SCI.bank[part]).map(ch => SCI.bank[part][ch][cat].filter(item => !inMock1.has(qText(item))).map(item => ({ ch: label(ch), item })));
  const out = []; const max = Math.max(...lists.map(l => l.length));
  for (let i = 0; i < max; i++) lists.forEach(l => { if (i < l.length) out.push(l[i]); });
  return out;
};
const pool = { 1: {}, 2: {} };
[1, 2].forEach(p => LAYOUT.forEach(L => { pool[p][L[4]] = flatten(p, L[4]); }));

let posCtr = 0;
const make = (B, cat, marks, { ch, item }) => {
  if (cat === 'mcq') {
    const [q, right, w1, w2, w3, sol] = item, r = opts(right, [w1, w2, w3], posCtr++);
    return B.mcq(marks, ch, q, r.o, r.a, sol);
  }
  if (cat === 'one') {
    const [q, acc, sol] = item;
    return acc ? B.num(marks, ch, q, acc, sol) : B.self(marks, ch, q, sol);
  }
  if (item && item.num) return B.numt(marks, ch, item.q, item.acc, item.sol, item.tol, item.hint);
  return B.self(marks, ch, item[0], item[1]);
};

for (let k = 0; k < 9; k++) {
  const N = k + 2, B = bld('s' + N + '-'), sections = [];
  [1, 2].forEach(p => LAYOUT.forEach(([id, title, att, ins, cat, n, marks]) => {
    const src = pool[p][cat];
    if (src.length < 9 * n) throw new Error(`science bank too small: part ${p} ${cat} has ${src.length}, needs ${9 * n}`);
    const qs = src.slice(k * n, (k + 1) * n).map(x => make(B, cat, marks, x));
    sections.push(sec('p' + p + id, p, `Part ${p} · ${title}`, att, ins, qs));
  }));
  window.PAPERS.push({
    id: 'science-mock-' + N, subject: 'science', kind: 'mock', year: null, durationMin: 240,
    title: `Science & Technology (Part 1 + Part 2) — Mock Test ${N}`,
    desc: 'Physics, Chemistry, Biology and Environment. Two 40-mark parts with "any N" choices (Q1–Q4). Part 1 and Part 2 are separate 2-hour papers, as in the board exam.',
    note: 'Original practice questions written from the Balbharati chapters; no question is repeated across mocks 2–10. The layout (Q1A 5×1, Q1B 5×1, Q2 any 5 of 7, Q3 any 5 of 8, Q4 any 1 of 2) is <b>approximate</b> — it comes from third-party sources, not an official board paper. Numerical answers are marked automatically; descriptive answers are shown with a model answer for you to self-mark. Not an actual board paper.',
    sections
  });
}
})();

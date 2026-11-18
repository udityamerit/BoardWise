/* Assembles History & Political Science mock tests 2–10 from the chapter banks in hist-1/2/3.js (History) and pol.js (Political Science).
   Chapters are interleaved round-robin and paper k takes the next block, so every paper draws on many chapters and no question repeats across mocks 2–10.
   Layout is the same as mock 1 (40 marks): Q1A 3×1, Q1B 3×1, Q2A/Q2B any 2 of 3 (2 each), Q3 any 2 of 4 (3 each), Q4 passage any 2 of 3 (2 each),
   Q5 any 1 of 2 (4), Q6 2×1 (Political Science), Q7 any 2 of 3 (2 each), Q8 any 1 of 2 (3), Q9 any 1 of 2 (3). */
(function () {
const { bld, sec, opts } = window.QB;
const HB = window.HB;
const POL = ['Working of the Constitution', 'The Electoral Process', 'Political Parties', 'Social and Political Movements', 'Challenges Faced by Indian Democracy'];
const HIS = Object.keys(HB.bank).filter(c => POL.indexOf(c) < 0);

const norm = t => String(t).replace(/\s+/g, ' ');
const inMock1 = new Set();   // text already used in history-mock-1 is left out
(window.PAPERS.find(p => p.id === 'history-mock-1') || { sections: [] }).sections.forEach(s => s.questions.forEach(q => inMock1.add(norm(q.q))));

const flatten = (chs0, cat, rot = 0) => {
  const chs = chs0.slice(rot % chs0.length).concat(chs0.slice(0, rot % chs0.length));   // rotate the chapter order so each question type starts at a different chapter
  const lists = chs.map(ch => HB.bank[ch][cat].filter(item => (item.text ? true : !inMock1.has(norm(item[0])))).map(item => ({ ch, item })));
  const out = [], max = Math.max(...lists.map(l => l.length));
  for (let i = 0; i < max; i++) lists.forEach(l => { if (i < l.length) out.push(l[i]); });
  return out;
};
const pool = {
  hm: flatten(HIS, 'mcq', 0), ho: flatten(HIS, 'one', 3), h2: flatten(HIS, 'two', 6), h3: flatten(HIS, 'three', 1), h4: flatten(HIS, 'four', 4), hp: flatten(HIS, 'passage', 2),
  pm: flatten(POL, 'mcq', 0), pt: flatten(POL, 'tf', 2), p3: flatten(POL, 'three', 1)
};
const need = { hm: 3, ho: 3, h2: 6, h3: 4, h4: 2, hp: 1, pm: 2, pt: 3, p3: 4 };
Object.keys(need).forEach(k => { if (pool[k].length < 9 * need[k]) throw new Error(`history bank too small: ${k} has ${pool[k].length}, needs ${9 * need[k]}`); });

let posCtr = 0;
const take = (k, key) => pool[key].slice(k * need[key], (k + 1) * need[key]);
const mcqOf = (B, { ch, item }) => { const [q, right, w1, w2, w3, sol] = item, r = opts(right, [w1, w2, w3], posCtr++); return B.mcq(1, ch, q, r.o, r.a, sol); };
const selfOf = (B, marks, { ch, item }) => B.self(marks, ch, item[0], item[1]);
const tfOf = (B, { ch, item }) => B.self(2, ch, item[0], `<b>${item[1] ? 'True' : 'False'}.</b> ${item[2]} (1 + 1)`);

for (let k = 0; k < 9; k++) {
  const N = k + 2, B = bld('h' + N + '-');
  const two = take(k, 'h2'), pass = take(k, 'hp')[0];
  const sections = [
    sec('q1a', 1, 'Q.1 (A) Choose the correct option', null, 'All three are compulsory (1 mark each).', take(k, 'hm').map(x => mcqOf(B, x))),
    sec('q1b', 1, 'Q.1 (B) Answer in one word', null, 'All three are compulsory (1 mark each).', take(k, 'ho').map(({ ch, item }) => B.num(1, ch, item[0], item[1], item[2]))),
    sec('q2a', 1, 'Q.2 (A) Short answers', 2, 'Attempt any two of three (2 marks each).', two.slice(0, 3).map(x => selfOf(B, 2, x))),
    sec('q2b', 1, 'Q.2 (B) Short answers', 2, 'Attempt any two of three (2 marks each).', two.slice(3, 6).map(x => selfOf(B, 2, x))),
    sec('q3', 1, 'Q.3 Short notes', 2, 'Attempt any two of four (3 marks each).', take(k, 'h3').map(x => selfOf(B, 3, x))),
    Object.assign(sec('q4', 1, 'Q.4 Passage-based questions', 2, 'Read the passage and attempt any two of three (2 marks each).',
      pass.item.qs.map(([q, a]) => B.self(2, pass.ch, q, a))), { passage: pass.item.text }),
    sec('q5', 1, 'Q.5 Answer in detail', 1, 'Attempt any one of two (4 marks).', take(k, 'h4').map(x => selfOf(B, 4, x))),
    sec('q6', 1, 'Q.6 Political Science — choose the correct option', null, 'Both are compulsory (1 mark each).', take(k, 'pm').map(x => mcqOf(B, x))),
    sec('q7', 1, 'Q.7 True or false, with reasons', 2, 'Attempt any two of three (2 marks each).', take(k, 'pt').map(x => tfOf(B, x))),
    sec('q8', 1, 'Q.8 Short answer', 1, 'Attempt any one of two (3 marks).', take(k, 'p3').slice(0, 2).map(x => selfOf(B, 3, x))),
    sec('q9', 1, 'Q.9 Answer in detail', 1, 'Attempt any one of two (3 marks).', take(k, 'p3').slice(2, 4).map(x => selfOf(B, 3, x)))
  ];
  window.PAPERS.push({
    id: 'history-mock-' + N, subject: 'history', kind: 'mock', year: null, durationMin: 120,
    title: `History & Political Science — Mock Test ${N}`,
    desc: '40 marks · 2 hours · Q1–Q9 with "any N" choices (History 28 + Political Science 12).',
    note: 'Original practice questions based on the Balbharati History and Political Science chapters; no question is repeated across mocks 2–10. The layout follows the 2025 paper\'s question numbering (Q1A, Q1B, Q2A, Q2B, Q3 … Q9) but the mark split is <b>approximate</b>, not an official board paper. One-word answers are marked automatically; descriptive answers are shown with a model answer for you to self-mark.',
    sections
  });
}
})();

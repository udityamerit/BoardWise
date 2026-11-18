/* Assembles Maths mock tests 2-10 from the parametrised templates in mm-alg.js (Part 1, Algebra) and mm-geo.js (Part 2, Geometry).
   Layout per 40-mark part, as in maths-mock-1: Q1A 4×1 · Q1B 4×1 · Q2A any 2 of 3 (2m) · Q2B any 4 of 5 (2m) · Q3A any 1 of 2 (3m) · Q3B any 2 of 4 (3m) · Q4 any 2 of 3 (4m) · Q5 any 1 of 2 (3m). */
(function () {
const { bld, sec, pick, inr } = window.QB;
/* tidy generated wording: no "− (6)" for plain positives, no "x = 7/12 = 7/12", grouped rupee amounts */
const tidy = s => typeof s !== 'string' ? s : s
  .replace(/([−+×]) \((\d+(?:\.\d+)?)\)/g, '$1 $2')
  .replace(/(\d+\/\d+) = (?![\d/])/g, '$1')
  .replace(/= 0 = 0/g, '= 0')
  .replace(/×(−\d+)/g, '× ($1)')
  .replace(/([−+]) −(\d)/g, '$1 (−$2)')
  .replace(/₹ (\d{4,})(?![\d,])/g, (m, d) => '₹ ' + inr(+d));
const clean = q => { q.q = tidy(q.q); q.solution = tidy(q.solution); if (q.hint) q.hint = tidy(q.hint); return q; };
const AL = window.MM_ALG, GE = window.MM_GEO;
const LAYOUT = [
  // id, title, attempt, instruction, count, marks
  ['q1a', 'Q.1 (A) Choose the correct alternative', 4, 'Write the letter of the correct answer.', 4, 1],
  ['q1b', 'Q.1 (B) Solve the following sub-questions', null, 'All four are compulsory (1 mark each).', 4, 1],
  ['q2a', 'Q.2 (A) Complete the following activities', 2, 'Complete any two (2 marks each).', 3, 2],
  ['q2b', 'Q.2 (B) Solve any four of the following', 4, 'Attempt any four (2 marks each).', 5, 2],
  ['q3a', 'Q.3 (A) Complete the following activities', 1, 'Complete any one (3 marks).', 2, 3],
  ['q3b', 'Q.3 (B) Solve any two of the following', 2, 'Attempt any two (3 marks each).', 4, 3],
  ['q4', 'Q.4 Solve any two of the following', 2, 'Attempt any two (4 marks each).', 3, 4],
  ['q5', 'Q.5 Solve any one of the following', 1, 'Attempt any one (3 marks).', 2, 3]
];
/* geometry shares one pool between Q2A and Q2B; the second block continues where the first stopped */
const poolOf = (P, id) => (P === GE && (id === 'q2a' || id === 'q2b')) ? GE.q2 : P[id];
const jStart = (P, id) => (P === GE && id === 'q2b') ? 3 : 0;

const part = (P, n, k, B, partNo, seen) => { const used = new Set(); return LAYOUT.map(([id, title, att, ins, cnt, marks], si) => {
  const pool = poolOf(P, id), j0 = jStart(P, id), qs = [];
  for (let j = 0; j < cnt; j++) {
    let v = k * 5 + si * 3 + j * 7 + partNo, q;     // different numbers in every slot of every paper
    for (let t = 0; t < 12; t++, v += 1) {            // never repeat the same question text within a paper
      let tpl = pick(pool, k, j0 + j + 0);
      for (let s2 = 1; used.has(tpl) && s2 < pool.length; s2++) tpl = pick(pool, k, j0 + j + s2);   // avoid the same template twice in a part when possible
      q = clean(tpl(B, v, (v + j + k) % 4, marks)); q._t = tpl;
      const key = q.q || q.text || q.question;
      if (!seen.has(key)) { seen.add(key); used.add(tpl); break; }
      if (t === 11) throw new Error('could not avoid duplicate: ' + key);
    }
    qs.push(q);
  }
  qs.forEach(q => delete q._t);
  return sec('p' + partNo + id, partNo, `Part ${partNo} · ${title}`, att, ins, qs);
}); };

for (let k = 0; k < 9; k++) {
  const N = k + 2, seen = new Set();
  window.PAPERS.push({
    id: 'maths-mock-' + N, subject: 'maths', kind: 'mock', year: null, durationMin: 240,
    title: `Mathematics (Algebra + Geometry) — Mock Test ${N}`,
    desc: 'Both 40-mark papers in the real Q1–Q5 layout with "any N" choices. Take them together (4 h) or one at a time (2 h each).',
    note: 'Original practice questions generated from the Balbharati chapters in the layout of the 2025 papers; every answer and worked solution is computed from the numbers in the question. Not an actual board paper. Pick "Part 1 only" or "Part 2 only" for a single 2-hour board-style paper.',
    sections: [...part(AL, N, k, bld('m' + N + 'a-'), 1, seen), ...part(GE, N, k, bld('m' + N + 'g-'), 2, seen)]
  });
}
})();

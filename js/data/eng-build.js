/* Assembles English mock tests 2–10 from the banks in eng-1.js (prose, poems), eng-2.js (tables, unseen passages), eng-3.js (grammar) and eng-4.js (writing).
   Layout is the same as mock 1 (80 marks): Reading textual 20 (prose 12 + poem 8), Reading non-textual 20 (table 8 + unseen passage 12),
   Grammar 15 (4 + 3 + 4 + 4), Writing 25 (letter 10, notice 5, essay 10). Paper k uses the k-th prose passage, poem, table, unseen passage and writing tasks,
   so nothing repeats across mocks 2–10. Table questions are computed from the numbers, so answers cannot disagree with the table. */
(function () {
const { bld, sec, opts } = window.QB;
const EB = window.EB;
const RT = 'Reading – textual style', RN = 'Reading – non-textual', GM = 'Grammar', WR = 'Writing skills';
const need = { prose: 9, poem: 9, table: 9, unseen: 9, letter: 9, notice: 9, essay: 9, gmcq: 36, gfill: 27, rep: 18, voice: 18 };
Object.keys(need).forEach(k => { if (!EB[k] || EB[k].length < need[k]) throw new Error(`english bank too small: ${k} has ${EB[k] ? EB[k].length : 0}, needs ${need[k]}`); });

let posCtr = 0;
const mcqOf = (B, m, ch, [q, right, w1, w2, w3, sol]) => { const r = opts(right, [w1, w2, w3], posCtr++); return B.mcq(m, ch, q, r.o, r.a, sol); };
const FIGS = ['Simile', 'Metaphor', 'Personification', 'Alliteration', 'Onomatopoeia', 'Hyperbole'];
const SCHEMES = ['abab', 'aabb', 'abba', 'abcd'];
const sum = a => a.reduce((x, y) => x + y, 0);
const withUnits = (n, uv) => [String(n)].concat(uv.map(u => `${n} ${u}`));

const tableHtml = t => `<b>${t.t}</b><table><tr><th>${t.h}</th>${t.labels.map(l => `<th>${l}</th>`).join('')}</tr><tr><td>${t.r}</td>${t.vals.map(v => `<td>${v}</td>`).join('')}</tr></table>`;
const tableQs = (B, t) => {
  const total = sum(t.vals), max = Math.max(...t.vals), hi = t.vals.indexOf(max);
  if (t.vals.filter(v => v === max).length !== 1) throw new Error('table has no single highest value: ' + t.t);
  const [i, j] = t.diff;
  if (t.vals[i] <= t.vals[j]) throw new Error('diff must be positive: ' + t.t);
  const pc = t.vals[t.pct] * 100 / total;
  if (pc !== Math.round(pc)) throw new Error('percentage is not whole: ' + t.t);
  const hl = t.labels[hi], acc = [hl, hl.replace(/-/g, ' ')];
  if (hl.length <= 2) acc.push('group ' + hl, 'blood group ' + hl);
  return [
    B.num(2, RN, t.hiQ, acc, `${hl} — ${max} ${t.u}.`),
    B.num(2, RN, t.totQ, withUnits(total, t.uv), `${t.vals.join(' + ')} = ${total} ${t.u}.`),
    B.num(2, RN, `By how much does the figure for ${t.labels[i]} exceed the figure for ${t.labels[j]}?`, withUnits(t.vals[i] - t.vals[j], t.uv), `${t.vals[i]} − ${t.vals[j]} = ${t.vals[i] - t.vals[j]} ${t.u}.`),
    B.num(2, RN, `What percentage of the total is accounted for by ${t.labels[t.pct]}?`, [String(pc), pc + '%'], `(${t.vals[t.pct]}/${total}) × 100 = ${pc}%.`)
  ];
};

for (let k = 0; k < 9; k++) {
  const N = k + 2, B = bld('e' + N + '-');
  const pr = EB.prose[k], po = EB.poem[k], tb = EB.table[k], un = EB.unseen[k];
  const PROSE = `<b>${pr.t}</b><br>${pr.x}`, POEM = `<b>${po.t}</b><br>${po.x}`, UNSEEN = `<b>${un.t}</b><br>${un.x}`;

  const rhyme = opts(po.rs, SCHEMES.filter(s => s !== po.rs), posCtr++);
  const figOthers = FIGS.filter(f => f !== po.fig[1]), figW = [0, 1, 2].map(x => figOthers[(k + x) % figOthers.length]);
  const fig = opts(po.fig[1], figW, posCtr++);

  const gm = EB.gmcq.slice(k * 4, k * 4 + 4), rep = EB.rep.slice(k * 2, k * 2 + 2), vo = EB.voice.slice(k * 2, k * 2 + 2);
  const fills = [0, 1, 2].map(j => EB.gfill[k + 11 * j]);

  const L = EB.letter[k], No = EB.notice[k], Es = EB.essay[k];
  const letterAns = `<b>Format (3):</b> sender’s address, date, receiver’s address, subject line, salutation, complimentary close “Yours faithfully”, name.<br><b>Content (4):</b> ${L.pts}.<br><b>Expression (3):</b> formal tone, correct grammar and spelling, paragraphs.<br><i>Sample body:</i> “${L.body}”`;
  const noticeAns = `<b>Format (2):</b> name of the institution, “NOTICE”, date, heading, matter, name and designation of the issuer.<br><b>Content (2):</b> ${No.pts}.<br><b>Language (1):</b> crisp and correct.<br><i>Sample:</i> “${No.body}”`;
  const essayAns = `<b>Introduction (2):</b> ${Es.i}. <b>Body (4):</b> ${Es.b}. <b>Conclusion (1):</b> ${Es.c}. <b>Language and organisation (3):</b> paragraphs, linking words, correct grammar.<br>Marking tip: a one-page answer with clear paragraphs scores better than a long unstructured one.`;

  const sections = [
    Object.assign(sec('r1', 1, 'Q1 A1 – Prose: choose the correct option (4)', null, 'Read the passage and choose the correct answer.', pr.m.map(x => mcqOf(B, 1, RT, x))), { passage: PROSE }),
    Object.assign(sec('r2', 1, 'Q1 A2 – Prose: short answers (4)', null, 'Answer in a word or a phrase.', pr.o.map(([q, acc, sol]) => B.num(1, RT, q, acc, sol))), { passage: PROSE }),
    Object.assign(sec('r3', 1, 'Q1 A3 – Prose: answer in a sentence or two (4)', null, 'Answer in two to three sentences.', pr.s.map(([q, a]) => B.self(2, RT, q, a))), { passage: PROSE }),
    Object.assign(sec('r4', 1, 'Q1 A4 – Poetry appreciation (8)', null, 'Read the poem and answer.', [
      B.mcq(2, RT, 'The rhyme scheme of the first four lines is:', rhyme.o, rhyme.a, `The rhyme scheme is ${po.rs}.`),
      B.mcq(2, RT, `Which figure of speech is used in “${po.fig[0]}”?`, fig.o, fig.a, `${po.fig[1]}: ${po.fig[2]}`),
      B.self(2, RT, po.s[0][0], po.s[0][1]), B.self(2, RT, po.s[1][0], po.s[1][1])]), { passage: POEM }),
    Object.assign(sec('n1', 1, 'Q2 A1 – Information transfer from a table (8)', null, 'Study the table and answer.', tableQs(B, tb)), { passage: tableHtml(tb) }),
    Object.assign(sec('n2', 1, 'Q2 A2 – Unseen passage: MCQs (4)', null, 'Read the passage and choose the correct answer.', un.m.map(x => mcqOf(B, 1, RN, x))), { passage: UNSEEN }),
    Object.assign(sec('n3', 1, 'Q2 A3 – Unseen passage: short answers (4)', null, 'Answer in a word or phrase.', un.o.map(([q, acc, sol]) => B.num(1, RN, q, acc, sol))), { passage: UNSEEN }),
    Object.assign(sec('n4', 1, 'Q2 A4 – Unseen passage: written answers (4)', null, 'Answer in your own words.', un.s.map(([q, a]) => B.self(2, RN, q, a))), { passage: UNSEEN }),
    sec('g1', 1, 'Q3 A – Choose the correct option (4)', null, 'Complete the sentences.', gm.map(x => mcqOf(B, 1, GM, x))),
    sec('g2', 1, 'Q3 B – Fill in the blanks (3)', null, 'Write one word in each blank.', fills.map(([q, acc, sol]) => B.num(1, GM, q, acc, sol))),
    sec('g3', 1, 'Q3 C – Reported speech (4)', null, 'Rewrite in reported speech.', rep.map(([q, a]) => B.self(2, GM, q, `<b>${a}</b> (reporting verb and pronouns 1, tense or word order 1)`))),
    sec('g4', 1, 'Q3 D – Active and passive voice (4)', null, 'Change the voice.', vo.map(([q, a]) => B.self(2, GM, q, `<b>${a}</b> (form of the verb 1, order of words 1)`))),
    sec('w1', 1, 'Q4 A – Formal letter (10)', null, 'Write the letter in about 120 words.', [B.self(10, WR, L.p, letterAns)]),
    sec('w2', 1, 'Q4 B – Notice (5)', null, 'Write the notice in about 50 words.', [B.self(5, WR, No.p, noticeAns)]),
    sec('w3', 1, 'Q4 C – Essay (10)', null, 'Write an essay in about 150 words.', [B.self(10, WR, Es.p, essayAns)])
  ];
  window.PAPERS.push({
    id: 'english-mock-' + N, subject: 'english', kind: 'mock', year: null, durationMin: 180,
    title: `English — SSC-pattern Mock Paper ${N}`,
    desc: 'Reading (textual & non-textual), grammar and writing — 80 marks.',
    note: 'Original practice paper: every passage, poem and table was written for this site and none is taken from the textbook. No question is repeated across mocks 2–10. The layout follows mock 1 and is <b>approximate</b>, not an official board paper. One-word answers are marked automatically; written answers are shown with a model answer and marking scheme for you to self-mark.',
    sections
  });
}
})();

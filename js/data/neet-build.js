/* Builds the NEET-pattern papers (UP Board Class XI, NCERT) from the question bank in NL.bank:
   10 mock tests per subject; every chapter's questions are shuffled (seeded) and dealt across the 10 mocks, so each mock covers every
   chapter in proportion to its share of the bank and no question appears in two mocks. Each question: MCQ, 4 options, +4 / −1. */
(function () {
const NL = window.NL; if (!NL) return;
const INST = 'All questions are compulsory. +4 for a correct answer, −1 for a wrong answer, 0 if left unanswered.';
const SPEC = [
  { key: 'neet-phy', name: 'Physics', dur: 45, secs: [{ id: 'phy', title: 'Physics', bank: 'phy', n: 45 }] },
  { key: 'neet-chem', name: 'Chemistry', dur: 45, secs: [{ id: 'chem', title: 'Chemistry', bank: 'chem', n: 45 }] },
  { key: 'neet-bio', name: 'Biology', dur: 90, secs: [{ id: 'bot', title: 'Biology — Botany', bank: 'bot', n: 45 }, { id: 'zoo', title: 'Biology — Zoology', bank: 'zoo', n: 45 }] },
  { key: 'neet-maths', name: 'Mathematics', dur: 60, secs: [{ id: 'mat', title: 'Mathematics', bank: 'mat', n: 45 }] }
];
const MOCKS = 10, plain = h => String(h).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();

/* raw item -> options in final order + answer index (the right option lands on a seeded random position) */
function finish(it, r) {
  if (it.fixed) return { o: it.o.slice(), a: it.a };
  const o = it.o.slice(), right = o[0];
  NL.shuffle(o, r);
  return { o, a: o.indexOf(right) };
}

function dealSection(sec) {
  const bank = NL.bank[sec.bank] || {}, seen = new Set(), seq = [];
  Object.keys(bank).forEach(ch => {
    const r = NL.rng(NL.hash(sec.bank + '|' + ch));
    const items = bank[ch].filter(it => { const k = plain(it.q) + '¦' + plain(it.o.join('¦')); if (seen.has(k)) return false; seen.add(k); return true; });
    NL.shuffle(items, r).forEach(it => seq.push(it));
  });
  if (seq.length < MOCKS * sec.n) console.warn(`NEET ${sec.bank}: only ${seq.length} questions for ${MOCKS} × ${sec.n}`);
  /* deal round-robin (chapter by chapter), then keep n evenly spaced items per mock so chapter shares stay proportional */
  const hands = Array.from({ length: MOCKS }, () => []);
  seq.forEach((it, j) => hands[j % MOCKS].push(it));
  return hands.map(h => h.length <= sec.n ? h : Array.from({ length: sec.n }, (_, i) => h[Math.floor(i * h.length / sec.n)]));
}

SPEC.forEach(S => {
  const dealt = S.secs.map(dealSection);
  for (let k = 0; k < MOCKS; k++) {
    const sections = S.secs.map((sec, si) => {
      const r = NL.rng(NL.hash(S.key + '#' + k + sec.id));
      return { id: sec.id, title: sec.title, part: null, instruction: INST,
        questions: dealt[si][k].map((it, i) => { const f = finish(it, r);
          return { id: sec.id + '-' + (i + 1), type: 'mcq', marks: 4, neg: 1, chapter: it.ch, q: it.q, options: f.o, answer: f.a, solution: it.s, difficulty: it.d || 'medium' }; }) };
    });
    const nq = sections.reduce((a, s) => a + s.questions.length, 0);
    window.PAPERS.push({ id: S.key + '-mock-' + (k + 1), subject: S.key, board: 'upneet', level: 'Class XI', kind: 'mock', year: null, durationMin: S.dur,
      title: `${S.name} — NEET Mock Test ${k + 1}`,
      desc: `${nq} MCQs · ${nq * 4} marks · ${S.dur} min · +4 / −1 · all ${S.name === 'Biology' ? '19' : S.name === 'Chemistry' ? '9' : '14'} NCERT Class XI chapters`,
      note: S.key === 'neet-maths' ? 'Mathematics is not a NEET subject; this paper uses the NEET format (4-option MCQs, +4 / −1) for practice. Questions are original, written from the NCERT Class XI textbook.'
        : 'Original questions written from the NCERT Class XI textbook in the NEET (UG) format. Not an actual NEET paper.',
      sections });
  }
});
})();

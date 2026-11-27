/* UP Board (UPMSP) Class XI, science stream, Hindi medium — objective (MCQ) tests for the school's annual exam.
   Subjects: Physics, Chemistry, Mathematics (PCM) and Biology (PCB). Hindi, English and the other non-science subjects are not covered.
   UPMSP prescribes the NCERT Class XI textbooks, so the chapters are those of the current (rationalised) NCERT books, cross-checked with
   the Class 11 chapter lists on tiwariacademy.com — the same lists as the NEET pack (js/data/neet-config.js).
   Questions come from the same Class XI question banks (NL.bank), dealt with their own seed, so these papers are different sets from the
   NEET mocks. Every question has its Hindi in js/data/neet-hi-*.js; the papers open in Hindi and can be switched to English.
   Marking follows the board's objective section: 1 mark per question, no negative marking. Loaded after neet-build.js. */
(function () {
const NL = window.NL; if (!NL) return;
const U = 'up11', MOCKS = 10, N = 50, MIN = 60;
const NEET = k => window.SUBJECTS.find(s => s.key === k) || {};

window.BOARD_CFG.up11 = {
  passPercent: 33,
  minutesPerMark: MIN / N,          // 60 minutes for 50 one-mark questions
  alwaysMix: true,                  // every attempt is built afresh from the subject's whole question bank
  practiceMarks: 20, practiceCount: 20,
  level: 'Class XI',
  heroTitle: 'Class XI science · objective practice',
  heroText: 'Hindi-medium MCQ tests on every chapter of the NCERT Class XI Physics, Chemistry, Mathematics and Biology books that UP Board prescribes. One mark per question, no negative marking, instant results with worked solutions and chapter-wise analysis.',
  examWindow: 'school annual exam, Feb – Mar 2027 (check your school\'s date sheet)',
  medium: 'Hindi medium',
  chapterNote: 'Chapters follow the current (rationalised) NCERT Class XI textbooks prescribed by UP Board (UPMSP), cross-checked with the Class 11 chapter lists on tiwariacademy.com.',
  grades: [
    { min: 75, label: 'Distinction', cls: 'g-dist' },
    { min: 60, label: 'First Division', cls: 'g-first' },
    { min: 45, label: 'Second Division', cls: 'g-second' },
    { min: 33, label: 'Third Division (Pass)', cls: 'g-pass' },
    { min: 0, label: 'Below pass mark', cls: 'g-fail' }
  ],
  patternPoints: [
    'For <b>Class XI science</b> students of UP Board: <b>Physics, Chemistry, Mathematics</b> (PCM group) and <b>Physics, Chemistry, Biology</b> (PCB group).',
    'Every test is <b>50 multiple-choice questions</b> with four options, exactly one correct: <b>1 mark</b> each, <b>no negative marking</b>, <b>60 minutes</b>.',
    'Biology tests have <b>25 Botany + 25 Zoology</b> questions; each half can also be taken on its own in 30 minutes.',
    'Questions are in <b>Hindi</b> (हिन्दी माध्यम). You can switch to English, or see both, at any time.',
    'These tests cover the objective part of your preparation. The written (descriptive) answers and practical work of the annual exam are not tested here.',
    'Syllabus: the NCERT Class XI textbooks (rationalised edition) that UP Board prescribes. Every attempt gives you a new set of questions from the whole syllabus.',
    'Pass mark used here: <b>33%</b>. Divisions: First 60%+, Second 45%+, Third 33%+, Distinction 75%+.'
  ]
};

const sub = o => window.SUBJECTS.push(Object.assign({ board: U, level: 'Class XI', durationNote: MIN + ' minutes for ' + N + ' questions (1 mark each, no negative marking)' }, o));
const one = (name) => [[name + ' — ' + N + ' MCQs', N, N + ' questions × 1 mark, all compulsory; no negative marking']];
sub({ key: 'up11-phy', name: 'Physics', short: 'भौतिक विज्ञान', icon: '⚛️', color: '#2563eb', total: N, stream: 'PCM · PCB',
  blurb: 'भौतिक विज्ञान — all 14 NCERT Class XI chapters: concepts and numericals. 50 MCQs, 50 marks.',
  pattern: one('Physics'), note: 'Original questions written from the NCERT Class XI Physics textbook. g = 10 m/s² unless stated. Not an actual board paper.',
  chapters: NEET('neet-phy').chapters });
sub({ key: 'up11-chem', name: 'Chemistry', short: 'रसायन विज्ञान', icon: '⚗️', color: '#059669', total: N, stream: 'PCM · PCB',
  blurb: 'रसायन विज्ञान — all 9 NCERT Class XI chapters: physical, inorganic and organic. 50 MCQs, 50 marks.',
  pattern: one('Chemistry'), note: 'Original questions written from the NCERT Class XI Chemistry textbook. Atomic masses: H 1, C 12, N 14, O 16, Na 23, Mg 24, S 32, Cl 35.5, Ca 40. Not an actual board paper.',
  chapters: NEET('neet-chem').chapters });
sub({ key: 'up11-maths', name: 'Mathematics', short: 'गणित', icon: '📐', color: '#7c3aed', total: N, stream: 'PCM',
  blurb: 'गणित — all 14 NCERT Class XI chapters: algebra, trigonometry, coordinate geometry, calculus, statistics and probability. 50 MCQs, 50 marks.',
  pattern: one('Mathematics'), note: 'Original questions written from the NCERT Class XI Mathematics textbook. Not an actual board paper.',
  chapters: NEET('neet-maths').chapters });
sub({ key: 'up11-bio', name: 'Biology', short: 'जीव विज्ञान', icon: '🧬', color: '#be123c', total: N, stream: 'PCB',
  blurb: 'जीव विज्ञान — all 19 NCERT Class XI chapters, Botany and Zoology. 50 MCQs, 50 marks.',
  pattern: [['Botany — 25 MCQs', 25, '25 questions × 1 mark; no negative marking'], ['Zoology — 25 MCQs', 25, '25 questions × 1 mark; no negative marking']],
  durationNote: '60 minutes for 50 questions (Botany 25 + Zoology 25); each half can also be taken alone in 30 minutes',
  note: 'Original questions written from the NCERT Class XI Biology textbook. Not an actual board paper.',
  chapters: NEET('neet-bio').chapters });

const INST = 'All questions are compulsory. Each question carries 1 mark. There is no negative marking.';
const SPEC = [
  { key: 'up11-phy', name: 'Physics', secs: [{ id: 'phy', title: 'Physics', bank: 'phy', n: N }] },
  { key: 'up11-chem', name: 'Chemistry', secs: [{ id: 'chem', title: 'Chemistry', bank: 'chem', n: N }] },
  { key: 'up11-maths', name: 'Mathematics', secs: [{ id: 'mat', title: 'Mathematics', bank: 'mat', n: N }] },
  { key: 'up11-bio', name: 'Biology', secs: [{ id: 'bot', title: 'Biology — Botany', bank: 'bot', n: N / 2 }, { id: 'zoo', title: 'Biology — Zoology', bank: 'zoo', n: N / 2 }] }
];
const plain = h => String(h).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
function finish(it, r) {
  if (it.fixed) return { o: it.o.slice(), a: it.a, p: it.o.map((_, i) => i) };
  const p = NL.shuffle(it.o.map((_, i) => i), r);
  return { o: p.map(i => it.o[i]), a: p.indexOf(0), p };
}
/* every chapter shuffled with this pack's own seed, dealt round-robin over the 10 papers, n evenly spaced items kept per paper */
function deal(sec) {
  const bank = NL.bank[sec.bank] || {}, seen = new Set(), seq = [];
  Object.keys(bank).forEach(ch => {
    const r = NL.rng(NL.hash('up11|' + sec.bank + '|' + ch));
    const items = bank[ch].filter(it => { const k = plain(it.q) + '¦' + plain(it.o.join('¦')); if (seen.has(k)) return false; seen.add(k); return true; });
    NL.shuffle(items, r).forEach(it => seq.push(it));
  });
  const hands = Array.from({ length: MOCKS }, () => []);
  seq.forEach((it, j) => hands[j % MOCKS].push(it));
  return hands.map(h => h.length <= sec.n ? h : Array.from({ length: sec.n }, (_, i) => h[Math.floor(i * h.length / sec.n)]));
}
const CH = { 'up11-phy': 14, 'up11-chem': 9, 'up11-maths': 14, 'up11-bio': 19 };
SPEC.forEach(S => {
  const dealt = S.secs.map(deal);
  for (let k = 0; k < MOCKS; k++) {
    const id = S.key + '-mock-' + (k + 1);
    const sections = S.secs.map((sec, si) => {
      const r = NL.rng(NL.hash('up11#' + S.key + '#' + k + sec.id));
      return { id: sec.id, title: sec.title, part: null, instruction: INST,
        questions: dealt[si][k].map((it, i) => { const f = finish(it, r);
          NL.src.set(id + '|' + sec.id + '-' + (i + 1), { it, p: f.p });
          return { id: sec.id + '-' + (i + 1), type: 'mcq', marks: 1, chapter: it.ch, q: it.q, options: f.o, answer: f.a, solution: it.s, difficulty: it.d || 'medium' }; }) };
    });
    const nq = sections.reduce((a, s) => a + s.questions.length, 0);
    window.PAPERS.push({ id, subject: S.key, board: U, level: 'Class XI', kind: 'mock', year: null, durationMin: MIN,
      title: `${S.name} — Class XI Practice Test ${k + 1}`,
      desc: `${nq} MCQs · ${nq} marks · ${MIN} min · no negative marking · all ${CH[S.key]} NCERT Class XI chapters · Hindi medium`,
      note: 'Original questions written from the NCERT Class XI textbook that UP Board prescribes, in Hindi with English available. Not an actual board paper.',
      sections });
  }
});
})();

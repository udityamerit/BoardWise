/* UP Board (UPMSP) Class IX — objective (MCQ) mock tests for the school's annual exam.
   Subjects: Science, Mathematics and Social Science (NCERT books, every question in Hindi and English), English (Beehive, Moments,
   grammar), Hindi and Sanskrit (grammar, poetics and literary history: the parts of UP Board's own Hindi and Sanskrit books that do not
   depend on one lesson's text).
   Chapters: the NCERT Class IX books that UP Board prescribes for 2026-27 (the chapter lists of UPMSP's 2026-27 Class 9 syllabus), cross-
   checked with the Class 9 pages on tiwariacademy.com. NCERT has also published new Class 9 books for 2026-27 (Ganita Manjari, Exploration,
   Understanding Society); UPMSP's syllabus still lists the earlier books, so these tests follow those.

   Question format used by the up9-*.js banks:  [chapterIndex, question, right, wrong1, wrong2, wrong3, solution]
   Any text may be "English|हिन्दी"; text without "|" reads the same in both (numbers, formulas, and the Hindi, Sanskrit and English
   subjects, which have one language). A generator is a function (r) => [question, right, wrong1, wrong2, wrong3, solution] that makes a
   new numerical with r() as its random source; U9.gen(ch, fn) adds it to a chapter.
   The papers keep the English text; the Hindi of every question, option and solution goes into U9.HI under "<paperId>|<questionId>"
   and reaches the app through NL.hiQ (wrapped in up9-build.js), so the student's English / हिन्दी / both switch works as for NEET. */
(function () {
const B = 'up9';

window.BOARD_CFG.up9 = {
  passPercent: 33,
  minutesPerMark: 60 / 50,
  alwaysMix: true,                  // every attempt is built afresh from the subject's whole question bank
  practiceMarks: 20, practiceCount: 20,
  level: 'Class IX',
  heroTitle: 'Class IX · objective practice',
  heroText: 'MCQ tests on every chapter of the Class IX books that UP Board prescribes: Science, Mathematics and Social Science in Hindi and English, plus English, Hindi and Sanskrit. One mark per question, no negative marking, instant results with worked solutions and chapter-wise analysis.',
  examWindow: 'school annual exam, Feb – Mar 2027 (check your school\'s date sheet)',
  medium: 'Hindi + English medium',
  chapterNote: 'Chapters follow the NCERT Class IX textbooks listed in the UP Board (UPMSP) Class 9 syllabus for 2026-27, cross-checked with the Class 9 chapter lists on tiwariacademy.com.',
  grades: [
    { min: 75, label: 'Distinction', cls: 'g-dist' },
    { min: 60, label: 'First Division', cls: 'g-first' },
    { min: 45, label: 'Second Division', cls: 'g-second' },
    { min: 33, label: 'Third Division (Pass)', cls: 'g-pass' },
    { min: 0, label: 'Below pass mark', cls: 'g-fail' }
  ],
  patternPoints: [
    'For <b>Class IX</b> students of UP Board, Hindi or English medium: <b>Science, Mathematics, Social Science, English, Hindi</b> and <b>Sanskrit</b>.',
    'Science, Mathematics and Social Science tests are <b>50 multiple-choice questions</b> in <b>60 minutes</b>; English, Hindi and Sanskrit tests are <b>40 questions</b> in <b>45 minutes</b>. Four options, exactly one correct: <b>1 mark</b> each, <b>no negative marking</b>.',
    'Science, Mathematics and Social Science questions are in <b>Hindi and English</b>: choose English, हिन्दी, or both, at any time during a test.',
    'Your school\'s annual exam paper is usually <b>70 marks</b> written (objective + short and long answers) plus 30 marks internal assessment. These tests cover the objective part; written answers and practical work are not tested here.',
    'Syllabus: the NCERT Class IX textbooks that UP Board prescribes (Science, Mathematics, Social Science, English), and the grammar, poetics and literary-history parts of the Hindi and Sanskrit syllabus. Every attempt gives you a new set of questions.',
    'Pass mark used here: <b>33%</b>. Divisions: First 60%+, Second 45%+, Third 33%+, Distinction 75%+.'
  ]
};

const bank = {};                    // subject key -> { meta, ch: [chapter names], items: [[chIdx, ...] | {ch, gen}] }
const U9 = window.U9 = { bank, HI: new Map() };

/* a subject and its chapters: chapters = { group: [names] }; questions refer to chapters by their index in the flat list */
U9.subject = (meta, chapters) => {
  const ch = [].concat(...Object.values(chapters));
  bank[meta.key] = { meta, ch, items: [] };
  window.SUBJECTS.push(Object.assign({ board: B, level: 'Class IX', total: meta.n,
    durationNote: meta.min + ' minutes for ' + meta.n + ' questions (1 mark each, no negative marking)',
    pattern: [[meta.name + ' — ' + meta.n + ' MCQs', meta.n, meta.n + ' questions × 1 mark, all compulsory; no negative marking']],
    chapters }, meta));
  return ch;
};
U9.add = (key, items) => { bank[key].items.push(...items); };
U9.gen = (key, ch, fn) => { bank[key].items.push({ ch, gen: fn }); };

/* small helpers for generators */
U9.ri = (r, a, b) => a + Math.floor(r() * (b - a + 1));
U9.pick = (r, arr) => arr[Math.floor(r() * arr.length)];
U9.fmt = x => { const v = +(+x).toFixed(2); return (v < 0 ? '−' : '') + Math.abs(v); };
U9.bi = s => { s = String(s); const i = s.indexOf('|'); return i < 0 ? [s, s] : [s.slice(0, i).trim(), s.slice(i + 1).trim()]; };
})();

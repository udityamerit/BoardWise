/* Board registry. Only boards with status "live" have papers in this build. Patterns for the others are NOT verified:
   they were summarised from third-party education sites that disagree with each other, so every figure is shown as "reported"
   and each board links to its own site for the authoritative pattern. No paper for these boards exists yet. */
window.BOARDS = [
  { key: 'msbshse', track: 'board', group: 'mh', cls: 'Class X · SSC', name: 'Maharashtra SSC', full: 'Maharashtra State Board (MSBSHSE)', short: 'Maharashtra', state: 'Maharashtra', color: '#3b4fd8', icon: '🏛️',
    status: 'live', levels: [{ name: 'Class X (SSC)', live: true }, { name: 'Class XII (HSC)' }], medium: 'English medium', site: 'https://www.mahahsscboard.in/',
    blurb: 'Class X: 10 mock tests each for Maths, Science, History & Political Science, English, Geography, Hindi and Marathi. Class XII is planned.' },
  { key: 'upmsp', track: 'board', group: 'up', cls: 'Class X · High School', name: 'UP Board', full: 'Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP)', short: 'Uttar Pradesh', state: 'Uttar Pradesh', color: '#d9480f', icon: '🪔',
    status: 'live', levels: [{ name: 'Class X (High School)', live: true }, { name: 'Class XII (Intermediate)' }], medium: 'Hindi medium', site: 'https://upmsp.edu.in/',
    blurb: 'Class X, Hindi medium: 10 mock tests each for Hindi, English, Sanskrit, Mathematics, Science and Social Science, in the layout of the official UPMSP 2026-27 model papers (70 marks: 20 OMR multiple-choice + 50 descriptive, 3 h 15 min). Class XII is planned.' },
  { key: 'up11', track: 'board', group: 'up', cls: 'Class XI · Science', name: 'UP Board Class XI', full: 'Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP) — Class XI, Science stream', short: 'UP · Class XI', state: 'Uttar Pradesh', color: '#b45309', icon: '🔬',
    status: 'live', levels: [{ name: 'Class XI (Science)', live: true }], medium: 'Hindi medium', site: 'https://upmsp.edu.in/',
    blurb: 'Class XI science stream, Hindi medium: 10 objective (MCQ) tests each for Physics, Chemistry, Mathematics and Biology, covering every chapter of the NCERT Class XI books that UP Board prescribes. For both PCM and PCB students.' },
  { key: 'upneet', track: 'neet', cls: 'Class XI · NCERT', name: 'NEET (UG) pattern', full: 'NEET (UG)-pattern mock tests on the NCERT Class XI syllabus (as prescribed by UP Board)', short: 'NEET', state: 'Uttar Pradesh', color: '#be123c', icon: '🩺',
    status: 'live', levels: [{ name: 'Class XI (NCERT)', live: true }], medium: 'Hindi + English medium', site: 'https://neet.nta.nic.in/',
    blurb: 'For NEET aspirants in Class XI: 10 NEET-pattern mock tests each for Physics, Chemistry, Biology (Botany + Zoology) and Mathematics, on every chapter of the NCERT Class XI books that UP Board follows. 4-option MCQs, +4 / −1, NEET timing.' },
  { key: 'mpbse', track: 'board', group: 'mp', cls: 'Class X & XII', name: 'MP Board', full: 'Madhya Pradesh Board of Secondary Education (MPBSE)', short: 'Madhya Pradesh', state: 'Madhya Pradesh', color: '#0f9d6b', icon: '🐅',
    status: 'planned', levels: [{ name: 'Class X' }, { name: 'Class XII' }], medium: 'Hindi + English medium (planned)', site: 'https://mpbse.nic.in/',
    blurb: 'Mock tests following the board blueprint, with chapter-wise weightage.',
    subjects: ['Hindi', 'English', 'Mathematics', 'Science', 'Social Science', 'Sanskrit / other 2nd language'],
    reported: [
      'Reported as 100 marks per subject, with theory 75 or 80 marks and the rest internal/practical (sources differ).',
      'The pattern was reported revised to a more CBSE-style question format; check the current year\'s notice.',
      'Pass mark reported as 33% per subject.'
    ] },
  { key: 'bseb', track: 'board', group: 'br', cls: 'Matric & Intermediate', name: 'Bihar Board', full: 'Bihar School Examination Board (BSEB)', short: 'Bihar', state: 'Bihar', color: '#c2255c', icon: '📜',
    status: 'planned', levels: [{ name: 'Class X (Matric)' }, { name: 'Class XII (Intermediate)' }], medium: 'Hindi + English medium (planned)', site: 'https://biharboardonline.bihar.gov.in/',
    blurb: 'Matric mock tests with objective and subjective sections, in the style of the board\'s model papers.',
    subjects: ['Hindi', 'English', 'Mathematics', 'Science', 'Social Science', 'Sanskrit / other 2nd language'],
    reported: [
      'Reported as five main subjects of 100 marks (500 total); some subjects are described as 80 theory + 20 practical/internal.',
      'Paper reported as objective (MCQ-heavy) + subjective, about 3 hours.',
      'Pass mark reported as 30% per subject.'
    ] }
];
/* Pages below describe Class X; Class XII pattern and subjects will be researched per board (streams: Science, Commerce, Arts) before any paper is built. */
window.BOARD_ROADMAP = ['CBSE', 'ICSE / ISC', 'Rajasthan Board', 'Gujarat Board', 'Karnataka SSLC', 'Tamil Nadu SSLC'];

/* The three ways in: NEET, JEE and school boards. Every board above belongs to one track; a track with no live board shows what is planned. */
window.TRACKS = [
  { key: 'neet', name: 'NEET Preparation', tag: 'Medical entrance', color: '#e11d48', color2: '#f59e0b',
    blurb: 'NEET (UG)-pattern mock tests on the Class XI NCERT syllabus: Physics, Chemistry and Biology, with +4 / −1 marking and NEET timing.',
    points: ['Physics, Chemistry, Botany + Zoology', '+4 / −1 marking, one minute per question', 'Hindi and English questions'],
    soon: [{ name: 'Class XII · NCERT', note: 'NEET-pattern mocks on the Class XII books' }, { name: 'Full syllabus', note: 'Complete 180-question NEET papers on Class XI + XII' }] },
  { key: 'jee', name: 'JEE Preparation', tag: 'Engineering entrance', color: '#0891b2', color2: '#6366f1',
    blurb: 'JEE Main-pattern tests for Physics, Chemistry and Mathematics, with multiple-choice and numerical-value questions.',
    points: ['Physics, Chemistry, Mathematics', 'MCQs and numerical-value answers', '+4 / −1 marking, JEE Main timing'],
    soon: [{ name: 'Class XI · JEE Main', note: 'Chapter-wise and full-length tests on the Class XI NCERT books' }, { name: 'Class XII · JEE Main', note: 'Tests on the Class XII NCERT books' }, { name: 'Full syllabus', note: 'Complete 75-question JEE Main papers' }],
    pattern: [
      'JEE Main Paper 1 (B.E. / B.Tech.) has <b>75 questions in 3 hours</b>, 300 marks: 25 each from Physics, Chemistry and Mathematics.',
      'Each subject has <b>Section A</b> — 20 multiple-choice questions — and <b>Section B</b> — 5 questions whose answer is a number you type in.',
      '<b>+4</b> for a correct answer and <b>−1</b> for a wrong one, in both sections; 0 for a question left unanswered.',
      'The syllabus is the NCERT Class XI and XII books. Check the current information bulletin at <a href="https://jeemain.nta.nic.in/" target="_blank" rel="noopener noreferrer">jeemain.nta.nic.in</a>.'
    ] },
  { key: 'board', name: 'Board Preparation', tag: 'School board exams', color: '#4f46e5', color2: '#06b6d4',
    blurb: 'Mock tests in your board’s own paper layout: Maharashtra SSC, UP Board Class X and UP Board Class XI science, with more boards on the way.',
    points: ['Maharashtra SSC · UP Board', 'Class X and Class XI', 'Board-style marking and grades'] }
];
/* State boards on the Board page, each with its classes (live ones come from BOARDS; `soon` lists classes not built yet). */
window.BOARD_GROUPS = [
  { key: 'up', name: 'UP Board', full: 'Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP)', abbr: 'UP', color: '#c2410c', site: 'https://upmsp.edu.in/', soon: ['Class XII · Intermediate'] },
  { key: 'mh', name: 'Maharashtra Board', full: 'Maharashtra State Board (MSBSHSE)', abbr: 'MH', color: '#4338ca', site: 'https://www.mahahsscboard.in/', soon: ['Class XII · HSC'] },
  { key: 'mp', name: 'MP Board', full: 'Madhya Pradesh Board of Secondary Education (MPBSE)', abbr: 'MP', color: '#0f766e', site: 'https://mpbse.nic.in/' },
  { key: 'br', name: 'Bihar Board', full: 'Bihar School Examination Board (BSEB)', abbr: 'BR', color: '#be185d', site: 'https://biharboardonline.bihar.gov.in/' }
];

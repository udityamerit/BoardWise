/* Board registry. Only boards with status "live" have papers in this build. Patterns for the others are NOT verified:
   they were summarised from third-party education sites that disagree with each other, so every figure is shown as "reported"
   and each board links to its own site for the authoritative pattern. No paper for these boards exists yet. */
window.BOARDS = [
  { key: 'msbshse', name: 'Maharashtra SSC', full: 'Maharashtra State Board (MSBSHSE)', short: 'Maharashtra', state: 'Maharashtra', color: '#3b4fd8', icon: '🏛️',
    status: 'live', levels: [{ name: 'Class X (SSC)', live: true }, { name: 'Class XII (HSC)' }], medium: 'English medium', site: 'https://www.mahahsscboard.in/',
    blurb: 'Class X: 10 mock tests each for Maths, Science, History & Political Science, English, Geography, Hindi and Marathi. Class XII is planned.' },
  { key: 'upmsp', name: 'UP Board', full: 'Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP)', short: 'Uttar Pradesh', state: 'Uttar Pradesh', color: '#d9480f', icon: '🪔',
    status: 'live', levels: [{ name: 'Class X (High School)', live: true }, { name: 'Class XII (Intermediate)' }], medium: 'Hindi medium', site: 'https://upmsp.edu.in/',
    blurb: 'Class X, Hindi medium: 10 mock tests each for Hindi, English, Sanskrit, Mathematics, Science and Social Science, in the layout of the official UPMSP 2026-27 model papers (70 marks: 20 OMR multiple-choice + 50 descriptive, 3 h 15 min). Class XII is planned.' },
  { key: 'mpbse', name: 'MP Board', full: 'Madhya Pradesh Board of Secondary Education (MPBSE)', short: 'Madhya Pradesh', state: 'Madhya Pradesh', color: '#0f9d6b', icon: '🐅',
    status: 'planned', levels: [{ name: 'Class X' }, { name: 'Class XII' }], medium: 'Hindi + English medium (planned)', site: 'https://mpbse.nic.in/',
    blurb: 'Mock tests following the board blueprint, with chapter-wise weightage.',
    subjects: ['Hindi', 'English', 'Mathematics', 'Science', 'Social Science', 'Sanskrit / other 2nd language'],
    reported: [
      'Reported as 100 marks per subject, with theory 75 or 80 marks and the rest internal/practical (sources differ).',
      'The pattern was reported revised to a more CBSE-style question format; check the current year\'s notice.',
      'Pass mark reported as 33% per subject.'
    ] },
  { key: 'bseb', name: 'Bihar Board', full: 'Bihar School Examination Board (BSEB)', short: 'Bihar', state: 'Bihar', color: '#c2255c', icon: '📜',
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

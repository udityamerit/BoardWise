/* Board registry. Only boards with status "live" have papers in this build. Patterns for the others are NOT verified:
   they were summarised from third-party education sites that disagree with each other, so every figure is shown as "reported"
   and each board links to its own site for the authoritative pattern. No paper for these boards exists yet. */
window.BOARDS = [
  { key: 'msbshse', name: 'Maharashtra SSC', full: 'Maharashtra State Board (MSBSHSE) · Class X', short: 'Maharashtra', state: 'Maharashtra', color: '#3b4fd8', icon: '🏛️',
    status: 'live', medium: 'English medium', site: 'https://www.mahahsscboard.in/',
    blurb: '10 mock tests each for Maths and Science, with English, History, Geography, Hindi and Marathi in progress.' },
  { key: 'upmsp', name: 'UP Board', full: 'Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP) · High School (Class X)', short: 'Uttar Pradesh', state: 'Uttar Pradesh', color: '#d9480f', icon: '🪔',
    status: 'planned', medium: 'Hindi + English medium (planned)', site: 'https://upmsp.edu.in/',
    blurb: 'High School board mock tests with an objective (OMR-style) part and a descriptive part.',
    subjects: ['Hindi', 'English', 'Mathematics', 'Science', 'Social Science', 'Sanskrit / other 2nd language'],
    reported: [
      'Theory is most often reported as 70 marks with 30 internal/practical (an older 80 + 20 split is also quoted).',
      'Written paper reported as about 20 marks objective (OMR) + about 50 marks descriptive, 3 hours.',
      'Pass mark reported as 33% (theory and practical separately).'
    ] },
  { key: 'mpbse', name: 'MP Board', full: 'Madhya Pradesh Board of Secondary Education (MPBSE) · Class X', short: 'Madhya Pradesh', state: 'Madhya Pradesh', color: '#0f9d6b', icon: '🐅',
    status: 'planned', medium: 'Hindi + English medium (planned)', site: 'https://mpbse.nic.in/',
    blurb: 'Class X mock tests following the board blueprint, with chapter-wise weightage.',
    subjects: ['Hindi', 'English', 'Mathematics', 'Science', 'Social Science', 'Sanskrit / other 2nd language'],
    reported: [
      'Reported as 100 marks per subject, with theory 75 or 80 marks and the rest internal/practical (sources differ).',
      'The pattern was reported revised to a more CBSE-style question format; check the current year\'s notice.',
      'Pass mark reported as 33% per subject.'
    ] },
  { key: 'bseb', name: 'Bihar Board', full: 'Bihar School Examination Board (BSEB) · Matric (Class X)', short: 'Bihar', state: 'Bihar', color: '#c2255c', icon: '📜',
    status: 'planned', medium: 'Hindi + English medium (planned)', site: 'https://biharboardonline.bihar.gov.in/',
    blurb: 'Matric mock tests with objective and subjective sections, in the style of the board\'s model papers.',
    subjects: ['Hindi', 'English', 'Mathematics', 'Science', 'Social Science', 'Sanskrit / other 2nd language'],
    reported: [
      'Reported as five main subjects of 100 marks (500 total); some subjects are described as 80 theory + 20 practical/internal.',
      'Paper reported as objective (MCQ-heavy) + subjective, about 3 hours.',
      'Pass mark reported as 30% per subject.'
    ] }
];
window.BOARD_ROADMAP = ['CBSE', 'ICSE / ISC', 'Rajasthan Board', 'Gujarat Board', 'Karnataka SSLC', 'Tamil Nadu SSLC'];

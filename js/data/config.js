/* Global config: subjects, board pattern, years.  Papers register themselves into window.PAPERS. */
window.PAPERS = [];

/* AI examiner service (the Cloudflare Worker in /worker). Paste its https URL here after deploying, e.g.
   endpoint: "https://boardwise-ai.<your-subdomain>.workers.dev". Leave '' to use only the built-in rule-based checker.
   Never put an API key in this file — the key lives in the Worker as a secret. */
window.AI_CFG = {
  endpoint: 'https://boardwise-ai.uditya-boardwise.workers.dev',
  /* Standby services, tried automatically if the one above is down, slow or out of date (see worker/README.md -> "Standby host").
     Add the Vercel standby URL here after deploying it, e.g. 'https://boardwise-ai.vercel.app' */
  backups: ['https://boardwise-ai.vercel.app']
};

/* Question builders (keeps data files short).
   mcq : auto-marked, answer = index of correct option
   num : auto-marked short answer; accept = list of accepted answers (numbers/fractions compared numerically)
   self: written answer; student awards own marks against the model answer in `solution`
   Optional field on any question: year (e.g. 2024) -> shown as "Asked in Board 2024" (used for real previous-year papers) */
window.mk = {
  mcq:  (id, marks, chapter, q, options, answer, solution) => ({ id, type: 'mcq', marks, chapter, q, options, answer, solution }),
  num:  (id, marks, chapter, q, accept, solution, hint)    => ({ id, type: 'num', marks, chapter, q, accept, solution, hint }),
  self: (id, marks, chapter, q, solution)                  => ({ id, type: 'self', marks, chapter, q, solution })
};

window.BOARD = {
  passPercent: 35,          // sources disagree (33% vs 35%); 35% is used here. Change in one place.
  minutesPerMark: 3,        // 40-mark papers = 120 min (2 h). Language papers (80 marks, 3 h) set durationMin explicitly.
  examWindow: "Feb – Mar 2027 (check the board timetable)"
};

/* Exam years to list. 2021: board exams were not held (COVID-19) – please verify. */
window.YEARS = [
  { y: 2026 }, { y: 2025 }, { y: 2024 }, { y: 2023 }, { y: 2022 },
  { y: 2021, na: "Board exam not held (cancelled, COVID-19)" },
  { y: 2020 }, { y: 2019 }
];

/* pattern rows: [section, marks, detail]
   Layouts described as "read from a transcription" come from third-party copies of the 2025 papers (omtexclasses.com), not from the board PDF.
   Layouts marked approximate could not be fetched and are a best-effort design. */
window.SUBJECTS = [
  {
    key: "maths", name: "Mathematics", short: "Maths 1 + 2", icon: "📐", color: "#3b4fd8", total: 80, durationNote: "2 h per paper (Part 1 and Part 2 are separate papers)",
    blurb: "Part 1 (Algebra) and Part 2 (Geometry): two 40-mark, 2-hour papers, taken together here as one 80-mark paper.",
    pattern: [
      ["Q.1 (A) – MCQ", 4, "4 questions, all compulsory, 1 mark each (per part)"],
      ["Q.1 (B) – One-line answers", 4, "4 questions, all compulsory, 1 mark each (per part)"],
      ["Q.2 (A) – Activities", 4, "Any 2 of 3 · 2 marks each"],
      ["Q.2 (B) – Short problems", 8, "Any 4 of 5 · 2 marks each"],
      ["Q.3 (A) – Activities", 3, "Any 1 of 2 · 3 marks"],
      ["Q.3 (B) – Problems", 6, "Any 2 of 4 · 3 marks each"],
      ["Q.4 – Problems", 8, "Any 2 of 3 · 4 marks each"],
      ["Q.5 – Problems", 3, "Any 1 of 2 · 3 marks"]
    ],
    note: "Each part is 40 marks (4+4+4+8+3+6+8+3). This layout was read from transcriptions of the 2025 Algebra and Geometry papers and matches both; it is not checked against the board's own PDF. The real result also adds 20 internal marks per subject set by schools — not tested here.",
    chapters: {
      "Part 1 – Algebra": ["Linear Equations in Two Variables", "Quadratic Equations", "Arithmetic Progression", "Financial Planning", "Probability", "Statistics"],
      "Part 2 – Geometry": ["Similarity", "Pythagoras Theorem", "Circle", "Geometric Constructions", "Co-ordinate Geometry", "Trigonometry", "Mensuration"]
    }
  },
  {
    key: "science", name: "Science & Technology", short: "Science 1 + 2", icon: "🔬", color: "#0f9d6b", total: 80, durationNote: "2 h per paper (Part 1 and Part 2 are separate papers)",
    blurb: "Part 1 (Physics + Chemistry) and Part 2 (Biology + Environment): two 40-mark papers taken together as one 80-mark paper.",
    pattern: [
      ["Q.1 (A) – MCQ", 5, "5 questions, compulsory, 1 mark each (per part)"],
      ["Q.1 (B) – One-line answers", 5, "5 questions, compulsory, 1 mark each (per part)"],
      ["Q.2 – Short answers", 10, "Any 5 of 7 · 2 marks each (per part)"],
      ["Q.3 – Short answers", 15, "Any 5 of 8 · 3 marks each (per part)"],
      ["Q.4 – Long answers", 5, "Any 1 of 2 · 5 marks (per part)"]
    ],
    note: "⚠ Approximate. The board's Science papers could not be fetched, so this layout is built from third-party sources; check it against your school's sample paper. Total per part = 40.",
    chapters: {
      "Part 1": ["Gravitation", "Periodic Classification of Elements", "Chemical Reactions and Equations", "Effects of Electric Current", "Heat", "Refraction of Light", "Lenses", "Metallurgy", "Carbon Compounds", "Space Missions"],
      "Part 2": ["Heredity and Evolution", "Life Processes in Living Organisms (Part 1 & 2)", "Environmental Management", "Towards Green Energy", "Animal Classification", "Introduction to Microbiology", "Cell Biology and Biotechnology", "Social Health", "Disaster Management"]
    }
  },
  {
    key: "english", name: "English", short: "English", icon: "📖", color: "#c77700", total: 80, durationNote: "3 h",
    blurb: "Reading (textual & non-textual), grammar and writing skills.",
    pattern: [
      ["Reading skills – textual", 20, "Prose / poetry comprehension and appreciation"],
      ["Reading skills – non-textual", 20, "Unseen passage and information-transfer (tables, charts)"],
      ["Grammar", 15, "Tenses, articles, prepositions, reported speech, voice, transformation"],
      ["Writing skills", 25, "Formal letter, notice / message, essay / report"]
    ],
    note: "⚠ Approximate. The section totals (20/20/15/25) match the sources found, but the board's English paper could not be fetched, so question-wise choices are not shown. The mock uses original passages because the textbook is copyrighted.",
    chapters: { "Syllabus": ["Prose (≈64 pages)", "Poetry (≈250 lines)", "Short stories and one-act play (non-detailed)", "Grammar and writing skills"] }
  },
  {
    key: "history", name: "History & Political Science", short: "History", icon: "🏛️", color: "#8a4fd8", total: 40, durationNote: "2 h",
    blurb: "Social Science Paper I – History (28) + Political Science (12) = 40 marks.",
    pattern: [
      ["Q.1 – Fill-ins / wrong pairs", 6, "Q.1 (A) 3 + Q.1 (B) 3, compulsory, 1 mark each"],
      ["Q.2 (A), (B) – Charts / short notes", 8, "Any 2 of 3 in each · 2 marks each"],
      ["Q.3 – Explain with reasons", 6, "Any 2 of 4 · 3 marks each"],
      ["Q.4 – Passage", 4, "Any 2 of 3 · 2 marks each"],
      ["Q.5 – Detailed answers", 4, "Any 1 of 2 · 4 marks"],
      ["Q.6 – Political Science MCQ", 2, "Compulsory, 1 mark each"],
      ["Q.7 – True / false with reasons", 4, "Any 2 of 3 · 2 marks each"],
      ["Q.8 – Concepts / charts", 3, "Any 1 of 2 · 3 marks"],
      ["Q.9 – Detailed answer", 3, "Any 1 of 2 · 3 marks"]
    ],
    note: "⚠ Approximate marks. The question numbering (Q.1A–Q.9) and the \"any 2 of …\" choices come from a transcription of the 2025 paper; marks per question and the paper header were not shown there, so the mark split above is our design (History 28 + Political Science 12). The current Balbharati chapter list is used.",
    chapters: {
      "History": ["Historiography: Development in the West", "Historiography: Indian Tradition", "Applied History", "History of Indian Arts", "Mass Media and History", "Entertainment and History", "Sports and History", "Tourism and History", "Heritage Management"],
      "Political Science": ["Working of the Constitution", "The Electoral Process", "Political Parties", "Social and Political Movements", "Challenges Faced by Indian Democracy"]
    }
  },
  {
    key: "geography", name: "Geography", short: "Geography", icon: "🌍", color: "#0a8aa6", total: 28, durationNote: "90 min",
    blurb: "Social Science Paper II – Geography (28 marks).",
    pattern: [
      ["Q.1 – MCQ", 6, "6 questions, compulsory, 1 mark each"],
      ["Q.2 – Short answers", 8, "Any 4 of 5 · 2 marks each"],
      ["Q.3 – Short answers", 6, "Any 2 of 3 · 3 marks each"],
      ["Q.4 – Long answers", 8, "Any 2 of 3 · 4 marks each"]
    ],
    note: "⚠ Approximate. The board's Geography paper could not be fetched; this layout is our design to the 28-mark split quoted by third-party sources. Economics (12 marks) is not included. Results are shown as a percentage so grading works.",
    chapters: { "Geography": ["Field Visit", "Location and Extent", "Physiography and Drainage", "Climate", "Natural Vegetation and Wildlife", "Population", "Human Settlements", "Economy and Occupations", "Tourism, Transport and Communication"] }
  },
  {
    key: "hindi", name: "Hindi", short: "हिंदी", icon: "🇮🇳", color: "#d6334a", total: 80, durationNote: "3 h",
    blurb: "गद्य, पद्य, व्याकरण और लेखन – 80 अंक।",
    pattern: [
      ["Unseen prose (अपठित गद्यांश)", 16, "MCQ, short and summary questions"],
      ["Poetry (पद्य)", 16, "Comprehension and appreciation"],
      ["Grammar (व्याकरण)", 24, "Synonyms, antonyms, idioms, tenses, punctuation, word formation"],
      ["Writing (लेखन)", 24, "Letter, essay, advertisement/dialogue"]
    ],
    note: "⚠ The official Hindi blueprint (question-wise) was NOT found on any page. This section structure is an approximation of a typical 80-mark language paper.",
    chapters: { "Syllabus": ["Prescribed Hindi textbook (गद्य/पद्य)", "व्याकरण", "लेखन कौशल"] }
  },
  {
    key: "marathi", name: "Marathi", short: "मराठी", icon: "🚩", color: "#d68a1a", total: 80, durationNote: "3 h",
    blurb: "गद्य, पद्य, व्याकरण आणि लेखन – ८० गुण.",
    pattern: [
      ["Unseen prose (अपठित गद्य)", 16, "MCQ, short and summary questions"],
      ["Poetry (पद्य)", 16, "Comprehension and appreciation"],
      ["Grammar (व्याकरण)", 24, "Synonyms, antonyms, idioms, tenses, figures of speech, sandhi, samas"],
      ["Writing (लेखन)", 24, "Letter, essay, advertisement/dialogue"]
    ],
    note: "⚠ The official Marathi blueprint was NOT found on any page. This section structure is an approximation of a typical 80-mark language paper.",
    chapters: { "Syllabus": ["Prescribed Marathi textbook (गद्य/पद्य)", "व्याकरण", "लेखन कौशल"] }
  }
];

window.GRADES = [
  { min: 75, label: "Distinction", cls: "g-dist" },
  { min: 60, label: "First Class", cls: "g-first" },
  { min: 45, label: "Second Class", cls: "g-second" },
  { min: 35, label: "Pass Class", cls: "g-pass" },
  { min: 0,  label: "Below pass mark", cls: "g-fail" }
];

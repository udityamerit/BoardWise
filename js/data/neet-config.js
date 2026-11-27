/* UP Board Class XI (NCERT syllabus) – NEET (UG) pattern mock tests: board settings, the four subjects and the question-bank toolkit.
   UPMSP prescribes the NCERT textbooks for Class XI, so the chapters are those of the current (rationalised) NCERT Class XI books.
   Chapter lists cross-checked with tiwariacademy.com (NCERT Solutions, Class 11: Physics 14, Chemistry 9, Biology 19, Maths 14 chapters).
   NEET (UG) pattern used (NTA, 2025 onward): 180 compulsory MCQs in 180 minutes — Physics 45, Chemistry 45, Biology 90 (Botany 45 + Zoology 45);
   4 options, one correct; +4 for a correct answer, −1 for a wrong answer, 0 if unanswered. No Section B any more.
   Mathematics is not a NEET subject; it is set in the same MCQ / +4 −1 format for PCMB students who asked for it.
   Loaded after config.js. Question files (neet-*.js) fill NL.bank; neet-build.js turns the bank into 10 mock papers per subject. */
(function () {
const U = 'upneet';

window.BOARD_CFG.upneet = {
  passPercent: 50,
  passName: 'target', passYes: 'ON TARGET', passNo: 'BELOW TARGET',
  minutesPerMark: 0.25,             // 1 minute per 4-mark question, the NEET pace (180 questions in 180 minutes)
  negative: true,                   // −1 for every wrong answer
  alwaysMix: true,                  // every attempt is built afresh from the subject's whole question bank
  practiceMarks: 60, practiceCount: 15,   // weak-chapter drills: up to 15 questions
  level: 'Class XI',
  heroTitle: 'NEET-pattern mock tests · Class XI NCERT',
  heroText: 'Timed NEET-style papers on the Class XI NCERT syllabus that UP Board follows: 4-option MCQs, +4 for a right answer and −1 for a wrong one, NEET timing, instant marking with worked solutions, chapter-wise analysis and progress tracking.',
  examWindow: 'NEET (UG) — check the NTA notice at neet.nta.nic.in',
  medium: 'English medium',
  chapterNote: 'Chapters follow the current (rationalised) NCERT Class XI textbooks prescribed by UP Board (UPMSP), cross-checked with the Class 11 chapter lists on tiwariacademy.com.',
  grades: [
    { min: 85, label: 'Excellent', cls: 'g-dist' },
    { min: 70, label: 'Very good', cls: 'g-first' },
    { min: 50, label: 'Good', cls: 'g-second' },
    { min: 30, label: 'Needs practice', cls: 'g-pass' },
    { min: -1000, label: 'Weak — revise these chapters', cls: 'g-fail' }
  ],
  patternPoints: [
    'Every question is a <b>multiple-choice question with four options</b>, exactly one of which is correct — the NEET (UG) format.',
    '<b>Marking:</b> +4 for a correct answer, <b>−1 for a wrong answer</b>, 0 for a question left unanswered. Guessing costs marks, so skip a question you cannot narrow down.',
    'The real NEET paper has <b>180 compulsory questions in 180 minutes</b>: Physics 45, Chemistry 45, Biology 90 (Botany 45 + Zoology 45), 720 marks. There is no optional Section B any more.',
    'These mocks are <b>subject-wise</b> and use the same pace of one minute per question: Physics 45 questions / 45 min, Chemistry 45 / 45 min, Biology 90 / 90 min (Botany and Zoology can also be taken on their own).',
    '<b>Mathematics</b> is not part of NEET. It is included in the same MCQ format (45 questions, 60 minutes) for students who also take Maths in Class XI.',
    'Question types follow recent NEET papers: direct concept and numerical questions, Assertion–Reason, two-statement questions, "how many statements are correct", and Match List-I with List-II.',
    'Syllabus: the Class XI NCERT textbooks (rationalised edition) used by UP Board. Class XII chapters, which make up the other half of NEET, are not included.',
    'Every attempt gives you a new question set, so you can practise a subject as often as you like.'
  ]
};

const sub = o => window.SUBJECTS.push(Object.assign({ board: U, level: 'Class XI' }, o));
const one = (name, n, extra) => [[name + ' — ' + n + ' MCQs', n * 4, n + ' questions × 4 marks, all compulsory; +4 correct, −1 wrong, 0 unanswered' + (extra || '')]];

sub({
  key: 'neet-phy', name: 'Physics', short: 'Physics', icon: '⚛️', color: '#2563eb', total: 180,
  durationNote: '45 minutes for 45 questions (NEET pace: one minute per question)',
  blurb: 'All 14 NCERT Class XI Physics chapters — numericals and concepts in NEET format. 45 MCQs, 180 marks.',
  pattern: one('Physics', 45),
  note: 'NEET (UG) Physics section: 45 MCQs, 180 marks. Numerical questions are worked out step by step in the solutions; g = 10 m/s² unless stated.',
  chapters: {
    'Physics Part I': ['Units and Measurements', 'Motion in a Straight Line', 'Motion in a Plane', 'Laws of Motion', 'Work, Energy and Power', 'System of Particles and Rotational Motion', 'Gravitation'],
    'Physics Part II': ['Mechanical Properties of Solids', 'Mechanical Properties of Fluids', 'Thermal Properties of Matter', 'Thermodynamics', 'Kinetic Theory', 'Oscillations', 'Waves']
  }
});
sub({
  key: 'neet-chem', name: 'Chemistry', short: 'Chemistry', icon: '⚗️', color: '#059669', total: 180,
  durationNote: '45 minutes for 45 questions (NEET pace: one minute per question)',
  blurb: 'All 9 NCERT Class XI Chemistry chapters — physical, inorganic and organic. 45 MCQs, 180 marks.',
  pattern: one('Chemistry', 45),
  note: 'NEET (UG) Chemistry section: 45 MCQs, 180 marks. Atomic masses: H 1, C 12, N 14, O 16, Na 23, Mg 24, S 32, Cl 35.5, Ca 40.',
  chapters: {
    'Chemistry Part I': ['Some Basic Concepts of Chemistry', 'Structure of Atom', 'Classification of Elements and Periodicity in Properties', 'Chemical Bonding and Molecular Structure', 'Thermodynamics', 'Equilibrium'],
    'Chemistry Part II': ['Redox Reactions', 'Organic Chemistry – Some Basic Principles and Techniques', 'Hydrocarbons']
  }
});
sub({
  key: 'neet-bio', name: 'Biology', short: 'Botany + Zoology', icon: '🧬', color: '#be123c', total: 360,
  durationNote: '90 minutes for 90 questions (Botany 45 + Zoology 45); each section can also be taken alone in 45 minutes',
  blurb: 'All 19 NCERT Class XI Biology chapters, split into Botany and Zoology as in NEET. 90 MCQs, 360 marks.',
  pattern: [
    ['Botany — 45 MCQs', 180, '45 questions × 4 marks; +4 correct, −1 wrong, 0 unanswered'],
    ['Zoology — 45 MCQs', 180, '45 questions × 4 marks; +4 correct, −1 wrong, 0 unanswered']
  ],
  note: 'NEET (UG) Biology: 90 MCQs (Botany 45 + Zoology 45), 360 marks. Questions are written from the NCERT text, which is what NEET Biology is set from.',
  chapters: {
    'Botany': ['The Living World', 'Biological Classification', 'Plant Kingdom', 'Morphology of Flowering Plants', 'Anatomy of Flowering Plants', 'Cell: The Unit of Life', 'Cell Cycle and Cell Division', 'Photosynthesis in Higher Plants', 'Respiration in Plants', 'Plant Growth and Development'],
    'Zoology': ['Animal Kingdom', 'Structural Organisation in Animals', 'Biomolecules', 'Breathing and Exchange of Gases', 'Body Fluids and Circulation', 'Excretory Products and their Elimination', 'Locomotion and Movement', 'Neural Control and Coordination', 'Chemical Coordination and Integration']
  }
});
sub({
  key: 'neet-maths', name: 'Mathematics', short: 'Maths', icon: '📐', color: '#7c3aed', total: 180,
  durationNote: '60 minutes for 45 questions (Maths is not a NEET subject; same MCQ format and marking)',
  blurb: 'All 14 NCERT Class XI Mathematics chapters in the same MCQ format (+4 / −1). 45 MCQs, 180 marks. Not part of NEET — for PCMB students.',
  pattern: one('Mathematics', 45, ' (NEET-style practice; Maths is not in NEET)'),
  note: 'Mathematics is not tested in NEET (UG). These papers use the NEET format so that PCMB students can practise all their Class XI subjects the same way.',
  chapters: {
    'Algebra': ['Sets', 'Relations and Functions', 'Complex Numbers and Quadratic Equations', 'Linear Inequalities', 'Permutations and Combinations', 'Binomial Theorem', 'Sequences and Series'],
    'Trigonometry, Geometry, Calculus, Statistics': ['Trigonometric Functions', 'Straight Lines', 'Conic Sections', 'Introduction to Three Dimensional Geometry', 'Limits and Derivatives', 'Statistics', 'Probability']
  }
});

/* ---------------- question-bank toolkit ----------------
   Items are kept raw: { q, o, s, d } with o[0] the right option (placed at a random position when the paper is built), or
   { q, o, a, fixed: true } when the options have a fixed order (statement counts, Assertion–Reason, two-statement questions).
   Everything that is random is seeded, so every visitor gets the same 10 papers. */
const NL = window.NL = { bank: {} };
NL.rng = seed => { let a = seed >>> 0; return () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
NL.hash = s => { let h = 2166136261; s = String(s); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
NL.shuffle = (a, r) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const SUP = { '-': '−', '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9' };
/* number -> short text: integers as they are, otherwise 3 significant figures; very large / small numbers as a × 10^n */
NL.f = x => {
  if (typeof x === 'string') return x;
  if (!isFinite(x)) throw new Error('NL.f: not a finite number');
  if (x === 0) return '0';
  const ax = Math.abs(x);
  if (ax >= 1e6 || ax < 1e-3) {
    let e = Math.floor(Math.log10(ax)), m = +(x / Math.pow(10, e)).toPrecision(3);
    if (Math.abs(m) >= 10) { m = +(m / 10).toPrecision(3); e++; }
    return m + ' × 10<sup>' + String(e).replace('-', '−') + '</sup>';
  }
  if (Math.abs(x - Math.round(x)) < 1e-9 * Math.max(1, ax)) return String(Math.round(x));
  return String(+x.toPrecision(3));
};
const unitStr = u => !u ? '' : /^[°%′″]/.test(u) ? u : ' ' + u;
const add = (sec, ch, items) => { const b = NL.bank[sec] = NL.bank[sec] || {}; (b[ch] = b[ch] || []).push(...items.map(it => Object.assign({ ch }, it))); };
NL.add = add;
/* plain MCQ: right answer first */
NL.mc = (q, right, wrongs, s, d) => ({ q, o: [right].concat(wrongs), s, d: d || 'easy' });
/* list form: [q, right, w1, w2, w3, solution, difficulty?] */
NL.mcs = (sec, ch, list) => add(sec, ch, list.map(x => NL.mc(x[0], x[1], x.slice(2, 5), x[5], x[6])));
/* numerical MCQ: answer and distractors are numbers (computed), shown with a unit; clashing distractors are replaced */
NL.num = (q, ans, unit, wrongs, s, d) => {
  const R = NL.f(ans) + unitStr(unit), out = [], seen = new Set([R]);
  const push = w => { if (w == null || (typeof w === 'number' && (!isFinite(w) || w === ans))) return; const t = (typeof w === 'string' ? w : NL.f(w)) + (typeof w === 'string' ? '' : unitStr(unit)); if (!seen.has(t)) { seen.add(t); out.push(t); } };
  (wrongs || []).forEach(push);
  [2, 0.5, 1.5, 4, 0.25, 3, 10, 0.1, 1.25, 0.8, 6, 0.75].forEach(k => { if (out.length < 3 && typeof ans === 'number') push(ans * k); });
  [1, -1, 2, -2, 5, 10].forEach(k => { if (out.length < 3 && typeof ans === 'number') push(ans + k * Math.max(1, Math.abs(ans) / 10)); });
  return { q, o: [R].concat(out.slice(0, 3)), s, d: d || 'medium' };
};
NL.fx = (q, o, a, s, d) => ({ q, o, a, s, d: d || 'medium', fixed: true });

/* least-used picker: spreads statements / pairs evenly over the generated questions */
function picker(n, r) {
  const used = new Array(n).fill(0);
  return (k, ok) => {
    const idx = NL.shuffle([...Array(n).keys()], r).filter(i => !ok || ok(i)).sort((a, b) => used[a] - used[b]).slice(0, k);
    if (idx.length < k) return null;
    idx.forEach(i => used[i]++); return idx;
  };
}
const TWO = ['Both Statement I and Statement II are true', 'Both Statement I and Statement II are false', 'Statement I is true but Statement II is false', 'Statement I is false but Statement II is true'];
const COUNT = ['Only one', 'Only two', 'Only three', 'All four'];
const ARO = ['Both A and R are true and R is the correct explanation of A', 'Both A and R are true but R is NOT the correct explanation of A', 'A is true but R is false', 'A is false but R is true'];
/* Statement bank: T = true statements; F = [false statement, what is actually true].
   spec: { correct, incorrect, two, count } = how many questions of each kind to make. */
NL.stmts = (sec, ch, T, F, spec) => {
  const r = NL.rng(NL.hash(sec + ch + 'st')), pt = picker(T.length, r), pf = picker(F.length, r), out = [], keys = new Set();
  const uniq = k => { if (keys.has(k)) return false; keys.add(k); return true; };
  const fix = i => `“${F[i][0]}” is wrong: ${F[i][1]}`;
  for (let n = 0, g = 0; n < (spec.correct || 0) && g < 60; g++) {
    const t = pt(1), f = pf(3); if (!t || !f) break;
    if (!uniq('c' + t + '|' + f.slice().sort())) continue;
    out.push({ q: 'Which one of the following statements is <b>correct</b>?', o: [T[t[0]]].concat(f.map(i => F[i][0])), s: `<b>Correct:</b> ${T[t[0]]}<br>` + f.map(fix).join('<br>'), d: 'medium' }); n++;
  }
  for (let n = 0, g = 0; n < (spec.incorrect || 0) && g < 60; g++) {
    const t = pt(3), f = pf(1); if (!t || !f) break;
    if (!uniq('i' + f + '|' + t.slice().sort())) continue;
    out.push({ q: 'Which one of the following statements is <b>incorrect</b>?', o: [F[f[0]][0]].concat(t.map(i => T[i])), s: fix(f[0]) + '<br>The other three statements are true.', d: 'medium' }); n++;
  }
  for (let n = 0, g = 0; n < (spec.two || 0) && g < 60; g++) {
    const c = n % 4, s1 = c === 0 || c === 2, s2 = c === 0 || c === 3;   // which of the two statements is true
    const a = s1 ? pt(1) : pf(1), b = s2 ? pt(1, i => !s1 || i !== a[0]) : pf(1, i => s1 || i !== a[0]); if (!a || !b) break;
    const A = s1 ? T[a[0]] : F[a[0]][0], B = s2 ? T[b[0]] : F[b[0]][0];
    if (!uniq('t' + A + '|' + B)) continue;
    out.push(NL.fx(`Given below are two statements:<br><b>Statement I:</b> ${A}<br><b>Statement II:</b> ${B}<br>In the light of the above statements, choose the correct answer.`, TWO, c,
      `Statement I is ${s1 ? 'true' : 'false'}${s1 ? '.' : ' — ' + F[a[0]][1]}<br>Statement II is ${s2 ? 'true' : 'false'}${s2 ? '.' : ' — ' + F[b[0]][1]}`)); n++;
  }
  for (let n = 0, g = 0; n < (spec.count || 0) && g < 60; g++) {
    const k = [2, 3, 1, 4][n % 4], t = pt(k), f = k < 4 ? pf(4 - k) : []; if (!t || !f) break;
    const items = NL.shuffle(t.map(i => ({ s: T[i], ok: true })).concat(f.map(i => ({ s: F[i][0], ok: false, fix: F[i][1] }))), r);
    if (!uniq('n' + items.map(x => x.s).sort().join('|'))) continue;
    const L = 'ABCD';
    out.push(NL.fx('Consider the following statements:<br>' + items.map((x, i) => `<b>${L[i]}.</b> ${x.s}`).join('<br>') + '<br>How many of the above statements are correct?', COUNT, k - 1,
      items.map((x, i) => `<b>${L[i]}</b> ${x.ok ? 'is true.' : 'is false — ' + x.fix}`).join('<br>') + `<br>So ${k} statement${k > 1 ? 's are' : ' is'} correct.`)); n++;
  }
  add(sec, ch, out);
};
/* Pair table: rows [left, right]; every left has exactly one right, and a left is never also true with another row's right.
   spec: { list, right, wrong, direct, ask } — ask(left) gives the question text of a direct question (wrong options = other rights). */
const ROM = ['I', 'II', 'III', 'IV'];
NL.pairs = (sec, ch, h1, h2, P, spec) => {
  const r = NL.rng(NL.hash(sec + ch + h1 + 'pr')), pk = picker(P.length, r), out = [], keys = new Set();
  const uniq = k => { if (keys.has(k)) return false; keys.add(k); return true; };
  const distinctR = idx => new Set(idx.map(i => P[i][1])).size === idx.length;
  const pick4 = () => { for (let g = 0; g < 30; g++) { const x = pk(4); if (x && distinctR(x)) return x; } return null; };
  for (let n = 0, g = 0; n < (spec.list || 0) && g < 60; g++) {
    const idx = pick4(); if (!idx || !uniq('l' + idx.slice().sort())) continue;
    const rights = NL.shuffle(idx.slice(), r);               // List-II order
    const code = p => p.map((ri, li) => 'ABCD'[li] + '-' + ROM[ri]).join(', ');
    const truth = idx.map(i => rights.indexOf(i));
    const perms = [], seen = new Set([truth.join()]);
    for (let t = 0; perms.length < 3 && t < 200; t++) { const p = NL.shuffle([0, 1, 2, 3], r); if (!seen.has(p.join())) { seen.add(p.join()); perms.push(p); } }
    const tbl = `<table><tr><th>List-I (${h1})</th><th>List-II (${h2})</th></tr>` + idx.map((i, k) => `<tr><td>${'ABCD'[k]}. ${P[i][0]}</td><td>${ROM[k]}. ${P[rights[k]][1]}</td></tr>`).join('') + '</table>';
    out.push({ q: 'Match List-I with List-II:' + tbl + 'Choose the correct answer from the options given below.', o: [code(truth)].concat(perms.map(code)),
      s: idx.map((i, k) => `${'ABCD'[k]}. ${P[i][0]} → ${P[i][1]}`).join('<br>'), d: 'medium' }); n++;
  }
  const mism = (i, avoid) => { const js = NL.shuffle([...P.keys()], r).filter(j => P[j][1] !== P[i][1] && !avoid.has(j)); return js[0]; };
  for (let n = 0, g = 0; n < (spec.right || 0) && g < 60; g++) {
    const idx = pick4(); if (!idx) break;
    const [t, ...w] = idx, opts = [`${P[t][0]} — ${P[t][1]}`].concat(w.map(i => `${P[i][0]} — ${P[mism(i, new Set([t]))][1]}`));
    if (new Set(opts).size < 4 || !uniq('r' + opts.slice().sort())) continue;
    out.push({ q: `Which one of the following pairs (${h1} — ${h2}) is <b>correctly</b> matched?`, o: opts, s: `${P[t][0]} — ${P[t][1]} is correct.<br>` + w.map(i => `${P[i][0]} goes with ${P[i][1]}`).join('<br>'), d: 'medium' }); n++;
  }
  for (let n = 0, g = 0; n < (spec.wrong || 0) && g < 60; g++) {
    const idx = pick4(); if (!idx) break;
    const [f, ...t] = idx, bad = mism(f, new Set(t)); if (bad == null) continue;
    const opts = [`${P[f][0]} — ${P[bad][1]}`].concat(t.map(i => `${P[i][0]} — ${P[i][1]}`));
    if (new Set(opts).size < 4 || !uniq('w' + opts.slice().sort())) continue;
    out.push({ q: `Which one of the following pairs (${h1} — ${h2}) is <b>incorrectly</b> matched?`, o: opts, s: `${P[f][0]} goes with ${P[f][1]}, not ${P[bad][1]}. The other three pairs are correct.`, d: 'medium' }); n++;
  }
  if (spec.ask) for (let n = 0, g = 0; n < (spec.direct || 0) && g < 60; g++) {
    const t = pk(1); if (!t) break; const i = t[0];
    const others = [...new Set(NL.shuffle(P.filter(p => p[1] !== P[i][1]).map(p => p[1]), r))].slice(0, 3);
    if (others.length < 3 || !uniq('d' + i)) continue;
    out.push({ q: spec.ask(P[i][0]), o: [P[i][1]].concat(others), s: `${P[i][0]} — ${P[i][1]}.`, d: 'easy' }); n++;
  }
  add(sec, ch, out);
};
/* Assertion–Reason: [assertion, reason, code 0..3 (see ARO), explanation] */
NL.ar = (sec, ch, list) => add(sec, ch, list.map(x => NL.fx(`Given below are two statements: one is labelled <b>Assertion (A)</b> and the other <b>Reason (R)</b>.<br><b>Assertion (A):</b> ${x[0]}<br><b>Reason (R):</b> ${x[1]}<br>Choose the correct answer.`, ARO, x[2], x[3])));
/* numeric template: rows of parameters -> items; fn(...row) returns [q, ans, unit, wrongs, solution, difficulty?] */
NL.gen = (sec, ch, rows, fn) => add(sec, ch, rows.map(row => { const x = fn.apply(null, row); return NL.num(x[0], x[1], x[2], x[3], x[4], x[5]); }));
/* same for templates whose answer is not a number: fn returns [q, right, wrongs[3], solution, difficulty?] */
NL.genT = (sec, ch, rows, fn) => add(sec, ch, rows.map(row => { const x = fn.apply(null, row); return NL.mc(x[0], x[1], x[2], x[3], x[4] || 'medium'); }));
})();

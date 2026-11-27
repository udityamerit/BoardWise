(function () {
'use strict';
const ALL_SUBJECTS = window.SUBJECTS, PAPERS = window.PAPERS, YEARS = window.YEARS;
/* Several boards live side by side. The student's chosen board (kept on this device) decides which subjects, pass mark, grade bands and
   timings the whole site uses; switching board reloads the page so everything is rebuilt for it. Papers/subjects without `board` are Maharashtra SSC. */
const bdOf = x => (x && x.board) || 'msbshse';
const BCFG = window.BOARD_CFG || {};
let ACTIVE = 'msbshse'; try { const b = JSON.parse(localStorage.getItem('bw_board')); if (b && BCFG[b]) ACTIVE = b; } catch (e) {}
const BOARD = BCFG[ACTIVE] || window.BOARD, GRADES = BOARD.grades || window.GRADES;
const SUBJECTS = ALL_SUBJECTS.filter(s => bdOf(s) === ACTIVE);
const app = document.getElementById('app');
let tick = null, testOff = null;

/* ---------- helpers ---------- */
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const LS = {
  get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
const subj = k => ALL_SUBJECTS.find(s => s.key === k);
/* A new visit (new tab / fresh sign-in) starts on the Boards page: pick a board, then see that board's subjects. A page refresh must NOT do that, so
   the "already landed" flag lives in sessionStorage (survives a reload, gone in a new tab and cleared on sign-out). Any other page counts as landed. */
const LAND = 'bw_landed';
let landed = false; try { landed = sessionStorage.getItem(LAND) === '1'; } catch (e) {}
const setLanded = on => { landed = on; try { on ? sessionStorage.setItem(LAND, '1') : sessionStorage.removeItem(LAND); } catch (e) {} };
function switchBoard(key, hash) {
  if (!BCFG[key] || key === ACTIVE) return false;
  try { localStorage.setItem('bw_board', JSON.stringify(key)); } catch (e) {}
  if (hash != null) location.hash = hash;
  location.reload(); return true;
}
/* "Practice sets" (weak-chapter drills) are built on the fly from questions of the real mocks. Their paper is virtual: it is never in
   PAPERS (so it never shows up in paper lists or counts) and has no questions of its own; every question is a foreign one
   (see makeVariant), filed under the single section below. */
const VP = new Map();
function practicePaper(id) {
  const m = /^practice-([\w-]+)$/.exec(id || ''), S = m && subj(m[1]); if (!S) return null;
  if (!VP.has(id)) VP.set(id, { id, subject: S.key, kind: 'practice', board: bdOf(S), level: BOARD.level || 'Class X', title: 'Practice set — ' + S.name, sections: [{ id: 'pr', title: 'Practice set', part: null, questions: [] }] });
  return VP.get(id);
}
const paperById = id => PAPERS.find(p => p.id === id) || practicePaper(id);
const go = h => { location.hash = h; };
const fmt = n => (Math.round(n * 100) / 100).toString();
const pad = n => String(n).padStart(2, '0');
const clock = ms => { const s = Math.max(0, Math.floor(ms / 1000)); return pad(Math.floor(s / 3600)) + ':' + pad(Math.floor(s % 3600 / 60)) + ':' + pad(s % 60); };
const gradeOf = pct => GRADES.find(g => pct >= g.min) || GRADES[GRADES.length - 1];
const dur = s => { s = Math.max(0, Math.round(s)); if (s < 60) return s + 's'; const m = Math.floor(s / 60); return m < 60 ? m + 'm ' + pad(s % 60) + 's' : Math.floor(m / 60) + 'h ' + pad(m % 60) + 'm'; };
const dayKey = t => { const d = new Date(t); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
const elapsed = A => Math.max(0, ((A.submittedAt || Date.now()) - A.startedAt) / 1000);
const isAns = v => v !== undefined && v !== null && String(v).trim() !== '';
const letter = i => String.fromCharCode(65 + i);
const LOC = () => (window.I18N && I18N.lang === 'hi' ? 'hi-IN' : undefined);
const T = s => (window.I18N ? I18N.t(s) : s); // interface words inside paper content, which js/i18n.js leaves alone
const dateStr = t => new Date(t).toLocaleDateString(LOC(), { day: '2-digit', month: 'short', year: 'numeric' });

function flat(p) {
  if (p._flat) return p._flat;
  let i = 0;
  p._flat = [];
  p.sections.forEach(s => s.questions.forEach(q => {
    p._flat.push(Object.assign({}, q, { sec: s, idx: i++, part: q.part != null ? q.part : (s.part != null ? s.part : null) }));
  }));
  return p._flat;
}

/* Sections may carry `attempt: N` = "answer any N of the questions given". Only the best N answers count. */
function groupBySec(qs) {
  const m = new Map();
  qs.forEach(q => { if (!m.has(q.sec.id)) m.set(q.sec.id, { sec: q.sec, qs: [] }); m.get(q.sec.id).qs.push(q); });
  return [...m.values()];
}
const need = g => (g.sec.attempt && g.sec.attempt < g.qs.length) ? g.sec.attempt : g.qs.length;
const marksOf = qs => groupBySec(qs).reduce((a, g) =>
  a + g.qs.map(q => q.marks).sort((x, y) => y - x).slice(0, need(g)).reduce((s, x) => s + x, 0), 0);
const paperMarks = p => marksOf(flat(p));
function modeLabel(P, mode) {
  if (P && P.kind === 'practice') return 'Weak-chapter practice';
  if (mode === 'all') return 'Full paper';
  if (mode === 'part1') return 'Part 1 paper';
  if (mode === 'part2') return 'Part 2 paper';
  const s = P && P.sections.find(x => x.id === mode.slice(4));
  return s ? s.title : mode;
}
function pick(p, mode) {
  const all = flat(p);
  if (mode === 'all') return all;
  if (mode === 'part1') return all.filter(q => q.part === 1);
  if (mode === 'part2') return all.filter(q => q.part === 2);
  if (mode.startsWith('sec:')) return all.filter(q => q.sec.id === mode.slice(4));
  return all;
}
function minutesFor(p, qs) {
  const full = p.durationMin || Math.round(paperMarks(p) * BOARD.minutesPerMark);
  const m = full * marksOf(qs) / paperMarks(p);
  return Math.max(5, Math.round(m / 5) * 5);
}
const hasParts = p => flat(p).some(q => q.part === 1) && flat(p).some(q => q.part === 2);

/* ---------- answer checking ---------- */
const norm = s => String(s).toLowerCase().replace(/[%,₹\s]/g, '').replace(/[.]+$/, '');
function toNum(s) {
  if (/^-?\d+(\.\d+)?\/\d+(\.\d+)?$/.test(s)) { const [a, b] = s.split('/'); return a / b; }
  if (/^-?\d*\.?\d+(e[+-]?\d+)?$/.test(s)) return parseFloat(s);
  return NaN;
}
function matchNum(q, ans) {
  const y = norm(ans);
  let ny = toNum(y);
  if (isNaN(ny)) ny = toNum(y.replace(/[a-z°²³µΩ]+$/i, '')); // tolerate trailing units, e.g. "10cm"
  const tol = q.tol != null ? q.tol : 1e-6;
  if ((q.accept || []).some(a => { const x = norm(a); if (x === y) return true; const nx = toNum(x); return !isNaN(nx) && !isNaN(ny) && Math.abs(nx - ny) <= tol; })) return true;
  /* typed with a variable or unit around it ("x = 3", "Rs. 1,150", "(2, 1)", "3 cm"): compare the numbers themselves */
  try { return !!(window.CHK && window.CHK.looseNum(q.accept, ans, q.tol)); } catch (e) { return false; }
}
/* Written answers are checked automatically against the bold final answers / key words of the model answer.
   The student can still override the marks (A.self) — that always wins. Cached: evaluate() runs on every render. */
const autoCache = new Map();
const aiRunning = new Set();   // attempts whose written answers are with the AI examiner right now
function autoMark(q, v) {
  if (!window.CHK || q.type !== 'self' || !isAns(v)) return null;
  const k = q.id + '\u0001' + v; if (autoCache.has(k)) return autoCache.get(k);
  let r = null; try { r = window.CHK.auto(q, String(v)); } catch (e) { r = null; }
  if (autoCache.size > 3000) autoCache.clear();
  autoCache.set(k, r); return r;
}
const mcqIdx = v => { const t = String(v).trim(); return /^[A-Za-z]$/.test(t) ? t.toUpperCase().charCodeAt(0) - 65 : Number(t); };
function status(q, A) {
  const v = A.answers[q.id];
  if (!isAns(v)) return 'skip';
  if (q.type === 'mcq') return mcqIdx(v) === q.answer ? 'correct' : 'wrong';
  if (q.type === 'num') return matchNum(q, v) ? 'correct' : 'wrong';
  return 'self';
}
function evaluate(A) {
  const P = paperById(A.paperId), qs = qsOf(A);
  const r = { total: marksOf(qs), got: 0, correct: 0, wrong: 0, skip: 0, selfDone: 0, selfAuto: 0, selfAi: 0, selfPending: 0, secs: {}, chaps: {}, rows: [], tsecs: {}, tracked: !!(A.tq && Object.keys(A.tq).length), changes: 0 };
  const tq = A.tq || {};
  const info = {};
  groupBySec(qs).forEach(g => {
    const n = need(g);
    const items = g.qs.map((q, i) => {
      const st = status(q, A); let got = 0, pending = false, src = '', auto = null;
      if (st === 'correct') got = q.marks;
      else if (st === 'wrong' && q.neg) got = -q.neg;            // negative marking (NEET pattern)
      else if (st === 'self') {
        auto = autoMark(q, A.answers[q.id]);
        if (A.self && A.self[q.id] != null) { got = Math.min(A.self[q.id], q.marks); src = 'manual'; }
        else if (A.ai && A.ai[q.id] && A.ai[q.id].m != null) { got = Math.min(A.ai[q.id].m, q.marks); src = 'ai'; }
        else if (auto) { got = Math.min(auto.marks, q.marks); src = 'auto'; }
        else pending = true;
      }
      return { q, st, got, pending, src, auto, i };
    });
    let keep = new Set(items.map(x => x.q.id));
    if (n < items.length) {
      const ranked = items.slice().sort((a, b) => b.got - a.got || ((b.st !== 'skip') - (a.st !== 'skip')) || a.i - b.i);
      keep = new Set(ranked.slice(0, n).map(x => x.q.id));
    }
    items.forEach(x => { x.counted = keep.has(x.q.id); x.need = n; x.of = items.length; info[x.q.id] = x; });
  });
  qs.forEach(q => {
    const x = info[q.id];
    if (x.counted) {
      if (x.pending) r.selfPending++;
      if (x.src === 'auto') r.selfAuto++; else if (x.src === 'ai') r.selfAi++;
      if (x.st === 'correct') r.correct++; else if (x.st === 'wrong') r.wrong++; else if (x.st === 'skip') r.skip++; else if (!x.pending) r.selfDone++;
      r.got += x.got;
      const sk = q.sec.title; (r.secs[sk] = r.secs[sk] || { got: 0, tot: 0 }); r.secs[sk].got += x.got; r.secs[sk].tot += q.marks;
      r.tsecs[sk] = (r.tsecs[sk] || 0) + (tq[q.id] || 0); r.changes += (A.chg && A.chg[q.id]) || 0;
      const ck = q.chapter || 'General'; (r.chaps[ck] = r.chaps[ck] || { got: 0, tot: 0 }); r.chaps[ck].got += x.got; r.chaps[ck].tot += q.marks;
    }
    r.rows.push({ q, st: x.st, got: x.got, src: x.src, auto: x.auto, pending: x.pending, counted: x.counted, need: x.need, of: x.of, t: tq[q.id] || 0, chg: (A.chg && A.chg[q.id]) || 0 });
  });
  r.pct = r.total ? r.got / r.total * 100 : 0;
  r.nQ = r.correct + r.wrong + r.skip + r.selfDone + r.selfPending;           // questions that counted
  r.tried = r.nQ - r.skip;                                                   // questions with an answer
  r.acc = r.correct + r.wrong ? r.correct / (r.correct + r.wrong) * 100 : null; // accuracy on auto-marked answers
  r.attemptRate = r.nQ ? r.tried / r.nQ * 100 : 0;
  r.secsTaken = elapsed(A);
  return r;
}

/* the diagram a question needs (js/figures.js); only drawn when the question text matches a known pattern */
const figHtml = (q, solved) => { try { return window.FIG ? window.FIG.forQuestion(q, solved) : ''; } catch (e) { return ''; } };

/* ---------- retake variants ----------
   A student who retakes a mock should be tested on the subject, not on remembering last time's answer key.
     orig     the paper exactly as written (a student's first attempt at a paper; the only option they see)
     shuffle  same questions, new order inside each section, MCQ options re-ordered (internal fallback when no unseen question exists)
     fresh    (every retake, chosen automatically)  as shuffle, but each question is swapped for an unseen question of the same section, type and marks from
              another mock of the same subject (same chapter first). Sections built on a passage are never swapped.
   An attempt stores what it needs to rebuild itself: A.qids (in test order; a question from another paper is
   "<paperId>::<id>"), A.slots (which section of this paper such a question fills) and A.opt ({id: [original index of
   each shown option]}). qsOf(A) turns that back into questions with options and the right answer already re-ordered,
   so marking, the review and the AI examiner need no special cases. */
const FSEP = '::';
/* ---------- difficulty labels ----------
   Every question is Easy or Medium (the papers are written for board-exam practice, not for toppers' puzzles). A question can say it
   itself with `difficulty: 'easy' | 'medium'`; otherwise it is worked out from what answering it takes: marks, question type and the
   length of the model answer (a long model answer = more steps). Direct recall / one-step = Easy; multi-step or explained = Medium. */
const DIFF_RANK = { easy: 0, medium: 1 };
const plainLen = h => String(h || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().length;
function diffOf(q) {
  if (q.difficulty === 'easy' || q.difficulty === 'medium') return q.difficulty;
  const sl = plainLen(q.solution);
  if (q.marks >= 3) return 'medium';
  if (q.marks === 2) return q.type === 'mcq' || sl >= 70 ? 'medium' : 'easy';
  return sl >= 90 ? 'medium' : 'easy';
}
const DIFF_TIP = { easy: 'Easy: direct recall or a single step. Keep it quick and bank the marks.', medium: 'Medium: needs a few steps or a short explanation. Give it proper time.' };
const diffChip = (q, mins) => { const d = diffOf(q); return `<span class="chip ${d === 'easy' ? 'ok' : 'warn'}" title="${DIFF_TIP[d]}">${d === 'easy' ? 'Easy' : 'Medium'}${mins ? ' · ~' + mins : ''}</span>`; };
const diffMix = qs => { let e = 0, m = 0; qs.forEach(q => { if (diffOf(q) === 'easy') e++; else m++; }); return { easy: e, medium: m }; };
const diffMixHtml = qs => { const x = diffMix(qs); return `<span class="chip ok">${x.easy} Easy</span> <span class="chip warn">${x.medium} Medium</span>`; };
const minLabel = m => { m = Math.max(0.5, Math.round(m * 2) / 2); return (m % 1 ? m.toFixed(1) : m) + ' min'; };
const UNSAFE_OPT = /\b(above|below|both|neither|none|all of|any of|all the|either|statements?|assertion|reason)\b|\(\s*(?:[a-d]|i{1,3}|iv|[1-4])\s*\)|\b[a-d]\s*(?:and|&)\s*[a-d]\b|^\s*(?:only\s+)?(?:i{1,3}|iv)\s*(?:,|and\b|&|only\b|$)/i;
const UNSAFE_Q = /\bstatements?\b|\bassertion\b|\(\s*(?:i{1,3}|iv)\s*\)|\bi\s*,\s*ii\b|\bpairs?\b.*\bmatch|\bmatch\b.*\b(column|following)/i;
const shuffleArr = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
/* identity of a question for "never twice in one test": its text plus its options (many NEET items share a stem such as "Which statement is correct?") */
const tkey = q => String(q.q).replace(/\s+/g, ' ').trim().toLowerCase() + (Array.isArray(q.options) ? '¦' + q.options.map(o => String(o).replace(/\s+/g, ' ').trim().toLowerCase()).sort().join('¦') : '');
const canon = (A, id) => id.includes(FSEP) ? id : A.paperId + FSEP + id;
function optPerm(q) {
  if (q.type !== 'mcq' || !Array.isArray(q.options) || q.options.length < 2 || UNSAFE_Q.test(q.q) || q.options.some(o => UNSAFE_OPT.test(String(o)))) return null;
  if (new Set(q.options.map(o => String(o).trim().toLowerCase())).size < q.options.length) return null;
  const idx = q.options.map((_, i) => i); let p = idx;
  for (let t = 0; t < 10 && p.every((v, i) => v === i); t++) p = shuffleArr(idx.slice());
  return p;
}
/* the questions of an attempt, in test order, ready to show and mark (null where a question no longer exists) */
function qsOf(A) {
  const P = paperById(A.paperId); if (!P) return [];
  const all = flat(P);
  return A.qids.map((id, i) => {
    let q;
    if (id.includes(FSEP)) {
      const k = id.indexOf(FSEP), FP = paperById(id.slice(0, k)), fq = FP && flat(FP).find(x => x.id === id.slice(k + 2));
      const sec = P.sections.find(s => s.id === (A.slots && A.slots[id]));
      if (!fq || !sec) return null;
      q = Object.assign({}, fq, { id, sec, idx: i, part: sec.part != null ? sec.part : null, foreign: { paperId: FP.id, title: FP.title, id: fq.id } });
    } else q = all.find(x => x.id === id);
    if (!q) return null;
    q = localQ(q, q.foreign ? q.foreign.paperId + '|' + q.foreign.id : P.id + '|' + q.id);
    const perm = A.opt && A.opt[id];
    if (perm && q.options && perm.length === q.options.length && perm.every(k => k >= 0 && k < q.options.length))
      q = Object.assign({}, q, { options: perm.map(k => q.options[k]), answer: perm.indexOf(q.answer) });
    return q;
  });
}
/* Hindi medium of the NEET-pattern papers (js/data/neet-hi.js). The student picks the question language: 'en', 'hi', or 'both'
   (Hindi with the English under it, as in the bilingual NEET paper). Default: the site's language. Only the text changes —
   options keep their order and marking is by option index, so an attempt can switch language at any time. */
const hasHindiQs = P => !!(P && window.NL && NL.hiQ && (P.board === 'upneet' || P.board === 'up11'));
const qlang = () => { const v = LS.get('bw_qlang', null); return v === 'en' || v === 'hi' || v === 'both' ? v : ACTIVE === 'up11' || (window.I18N && I18N.lang === 'hi') ? 'hi' : 'en'; };
function localQ(q, key) {
  const L = qlang(); if (L === 'en' || !window.NL || !NL.hiQ) return q;
  const h = NL.hiQ(key); if (!h) return q;
  const two = (hi, en, tag) => hi == null || hi === '' ? en : L === 'hi' ? hi : `${hi}<${tag} class="en-alt" lang="en">${en}</${tag}>`;
  return Object.assign({}, q, { q: two(h.q, q.q, 'div'), options: q.options.map((o, i) => two(h.o && h.o[i], o, 'span')), solution: q.solution ? two(h.s, q.solution, 'div') : q.solution, qlang: L });
}
const langPicker = () => `<div class="qlang noprint" role="group" aria-label="Question language"><span class="small muted">प्रश्नों की भाषा / Question language:</span>
  ${[['en', 'English'], ['hi', 'हिन्दी'], ['both', 'हिन्दी + English']].map(([k, l]) => `<button type="button" class="btn sm ${qlang() === k ? 'pri' : ''}" data-qlang="${k}" aria-pressed="${qlang() === k}">${l}</button>`).join('')}</div>`;
document.addEventListener('click', e => {
  const b = e.target.closest && e.target.closest('[data-qlang]'); if (!b) return;
  LS.set('bw_qlang', b.dataset.qlang);
  route(true);
});
/* questions of other mocks that could stand in for q (same subject, kind, section, type, marks) */
function freshPool(P, q) {
  const out = [];
  PAPERS.forEach(O => {
    if ((O.id === P.id && !BOARD.alwaysMix) || O.subject !== P.subject || O.kind !== P.kind || O.board !== P.board || O.level !== P.level) return;
    O.sections.forEach(os => {
      if (os.id !== q.sec.id || os.part !== q.sec.part || os.title !== q.sec.title || os.instruction !== q.sec.instruction || os.passage) return;
      flat(O).forEach(f => { if (f.sec === os && f.type === q.type && f.marks === q.marks) out.push({ pid: O.id, q: f }); });
    });
  });
  return out;
}
function seenIds(subject) {
  const s = new Set();
  rawAttempts().forEach(a => { const P = paperById(a.paperId); if (P && P.subject === subject) a.qids.forEach(id => s.add(canon(a, id))); });
  return s;
}
function makeVariant(P, mode, kind) {
  const base = pick(P, mode);
  if (kind === 'orig') return { qids: base.map(q => q.id) };
  const opt = {}, slots = {}, qids = [], seen = kind === 'fresh' ? seenIds(P.subject) : null, used = new Set(BOARD.alwaysMix ? [] : base.map(tkey));
  let swapped = 0;
  groupBySec(base).forEach(g => {
    let items = g.qs.map(q => ({ id: q.id, q }));
    if (kind === 'fresh' && !g.sec.passage) items = items.map(it => {
      const cands = freshPool(P, it.q).filter(c => !used.has(tkey(c.q)));
      if (!cands.length) return it;
      /* unseen first, then keep the original's difficulty (never swap a Medium for an Easy if a Medium exists), then same chapter */
      const dOrig = DIFF_RANK[diffOf(it.q)], score = c => (seen.has(c.pid + FSEP + c.q.id) ? 4 : 0) + (DIFF_RANK[diffOf(c.q)] === dOrig ? 0 : DIFF_RANK[diffOf(c.q)] < dOrig ? 2 : 1) + (c.q.chapter === it.q.chapter ? 0 : 1);
      const best = Math.min(...cands.map(score)), c = shuffleArr(cands.filter(x => score(x) === best))[0];
      used.add(tkey(c.q)); swapped++;
      const id = c.pid + FSEP + c.q.id; slots[id] = g.sec.id;
      return { id, q: c.q };
    });
    if (!g.sec.passage) shuffleArr(items);
    items.forEach(it => { const p = optPerm(it.q); if (p) opt[it.id] = p; qids.push(it.id); });
  });
  return { qids, opt, slots, variant: { kind: kind === 'fresh' && swapped ? 'fresh' : 'shuffle', swapped } };
}
const freshCount = (P, mode) => pick(P, mode).filter(q => !q.sec.passage && freshPool(P, q).length).length;
const variantLabel = A => !A.variant ? '' : A.variant.kind !== 'practice' && BOARD.alwaysMix ? '' : A.variant.kind === 'practice' ? 'Practice: ' + (A.variant.chapters || []).join(', ') : A.variant.kind === 'fresh' ? `Fresh mix · ${A.variant.swapped} new question${A.variant.swapped > 1 ? 's' : ''}` : 'Shuffled';
/* Build a short mixed drill (about 12 questions, at most ~30 marks) from the given chapters of one subject, unseen questions first. */
function startPractice(subjectKey, chapters) {
  const S = subj(subjectKey), P = S && practicePaper('practice-' + subjectKey); if (!P) return;
  const want = new Set(chapters.map(c => String(c).trim().toLowerCase()));
  const seen = seenIds(subjectKey), used = new Set(), pool = [];
  PAPERS.forEach(O => {
    if (O.subject !== subjectKey) return;
    O.sections.forEach(sec => { if (sec.passage) return; flat(O).forEach(f => {
      if (f.sec !== sec || !want.has(String(f.chapter || 'General').trim().toLowerCase()) || used.has(tkey(f))) return;
      used.add(tkey(f)); pool.push({ id: O.id + FSEP + f.id, q: f, seen: seen.has(O.id + FSEP + f.id) });
    }); });
  });
  if (pool.length < 3) { alert('There are not enough questions for ' + chapters.join(', ') + ' yet. Try a full mock test on this subject instead.'); return; }
  if (active() && !confirm('A test is already in progress. Starting a new one will discard it. Continue?')) return;
  shuffleArr(pool); pool.sort((a, b) => a.seen - b.seen);
  const chosen = []; let marks = 0;
  pool.forEach(c => { if (chosen.length < (BOARD.practiceCount || 12) && marks + c.q.marks <= (BOARD.practiceMarks || 30)) { chosen.push(c); marks += c.q.marks; } });
  const rank = c => c.q.type === 'mcq' ? 0 : c.q.type === 'num' ? 1 : 2;
  chosen.sort((a, b) => rank(a) - rank(b) || a.q.marks - b.q.marks);
  const slots = {}, opt = {};
  chosen.forEach(c => { slots[c.id] = 'pr'; const o = optPerm(c.q); if (o) opt[c.id] = o; });
  const mins = Math.max(5, Math.round(marks * BOARD.minutesPerMark / 5) * 5);
  saveActive({ id: 'a' + Date.now(), paperId: P.id, mode: 'all', startedAt: Date.now(), endsAt: Date.now() + mins * 60000, answers: {}, flags: {}, seen: {}, cur: 0, self: {},
    qids: chosen.map(c => c.id), slots, opt, variant: { kind: 'practice', swapped: chosen.length, chapters: chapters.slice(0, 6) } });
  go('#/test');
}
function startAttempt(P, mode, kind) {
  if (active() && !confirm('A test is already in progress. Starting a new one will discard it. Continue?')) return;
  const qs = pick(P, mode);
  saveActive(Object.assign({ id: 'a' + Date.now(), paperId: P.id, mode, startedAt: Date.now(), endsAt: Date.now() + minutesFor(P, qs) * 60000, answers: {}, flags: {}, seen: {}, cur: 0, self: {} }, makeVariant(P, mode, kind)));
  go('#/test');
}

const barCls = p => p >= 70 ? 'hi' : p >= 40 ? 'mid' : 'low';
const bar = (g, t) => { const p = t ? Math.max(0, g / t * 100) : 0; return `<div class="bar ${barCls(p)}"><i style="width:${p}%"></i></div>`; };

/* ---------- storage ---------- */
/* Everything is per signed-in student; js/auth.js keeps it in memory, on this device and in the cloud. */
const rawAttempts = () => AUTH.getAttempts();
const saveAttempts = a => AUTH.setAttempts(a);
const active = () => AUTH.getActive();
const saveActive = A => AUTH.setActive(A);
function student() {
  const p = AUTH.getProfile(), u = AUTH.user() || {};
  return { name: p.name || u.name || '', school: p.school || '', seat: p.seat || '', email: u.email || '' };
}
let nextHash = '', ready = false;
const AUTH_RX = /^#\/(login|register|forgot)/;
function valid(A) {
  const P = A && paperById(A.paperId); if (!P) return false;
  return qsOf(A).every(Boolean);
}
/* results shown on the history / progress / report pages are those of the board you are using now (pass marks and grades differ per board) */
const attempts = () => rawAttempts().filter(a => valid(a) && bdOf(paperById(a.paperId)) === ACTIVE);

/* ---------- small charts ---------- */
/* Charts are drawn at the width they actually have (so text stays readable on a phone) and every mark carries a
   data-tip that the shared tooltip below shows on hover (mouse), tap (touch) or keyboard focus. */
function trendSvg(vals, w, h) {
  const d = vals.map(x => typeof x === 'number' ? { v: x } : x);
  return `<div class="tchart" data-h="${h}" data-d="${esc(JSON.stringify(d))}" style="min-height:${h}px"></div>`;
}
function drawTrend(el) {
  let d; try { d = JSON.parse(el.dataset.d); } catch (e) { return; }
  const w = Math.max(220, Math.round(el.clientWidth || 320)), h = w < 420 ? Math.max(+el.dataset.h, 190) : +el.dataset.h;
  const L = 40, R = 12, T = 12, B = 26, iw = w - L - R, ih = h - T - B, n = d.length;
  const x = i => L + (n < 2 ? iw / 2 : i * iw / (n - 1)), y = v => T + ih * (1 - Math.max(0, Math.min(100, v)) / 100);
  const pass = BOARD.passPercent;
  const grid = [0, 25, 50, 75, 100].map(v => `<line x1="${L}" x2="${w - R}" y1="${y(v)}" y2="${y(v)}" stroke="#e3e6ef"/><text x="${L - 6}" y="${y(v) + 4}" font-size="11" text-anchor="end" fill="#6b7280">${v}%</text>`).join('')
    + `<line x1="${L}" x2="${w - R}" y1="${y(pass)}" y2="${y(pass)}" stroke="#e5484d" stroke-dasharray="5 4"/><text x="${w - R}" y="${y(pass) - 4}" font-size="10.5" text-anchor="end" fill="#e5484d">pass ${pass}%</text>`;
  const step = Math.max(1, Math.ceil(n / Math.max(2, Math.floor(iw / 34))));
  const xl = d.map((_, i) => (i % step === 0 || i === n - 1) ? `<text x="${x(i)}" y="${h - 8}" font-size="11" text-anchor="middle" fill="#6b7280">${i + 1}</text>` : '').join('');
  const pts = d.map((o, i) => `${x(i)},${y(o.v)}`).join(' ');
  const area = n > 1 ? `<polygon points="${x(0)},${y(0)} ${pts} ${x(n - 1)},${y(0)}" fill="#3b4fd8" opacity=".07"/>` : '';
  const dots = d.map((o, i) => {
    const tip = (o.t || 'Test ' + (i + 1)) + '\n' + fmt(o.v) + '%' + (o.d ? ' · ' + dateStr(o.d) : '');
    return `<g class="pt" tabindex="0" data-tip="${esc(tip)}"><circle class="hit" cx="${x(i)}" cy="${y(o.v)}" r="15" fill="transparent"/><circle class="dot" cx="${x(i)}" cy="${y(o.v)}" r="4.5"/></g>`;
  }).join('');
  el.innerHTML = `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" class="trend" role="img" aria-label="Score trend, percent per test, ${n} tests">${grid}${area}
    <polyline points="${pts}" fill="none" stroke="#3b4fd8" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}${xl}</svg>
    <div class="small muted" style="text-align:center">Test number, oldest → latest · hover or tap a dot for details</div>`;
  el.style.minHeight = '';
}
function mountCharts() {
  document.querySelectorAll('.tchart').forEach(el => {
    if (el.dataset.w != el.clientWidth) { el.dataset.w = el.clientWidth; drawTrend(el); }
    if (!el._ro && window.ResizeObserver) { el._ro = new ResizeObserver(() => { if (Math.abs(el.clientWidth - (+el.dataset.w || 0)) > 3) { el.dataset.w = el.clientWidth; drawTrend(el); } }); el._ro.observe(el); }
  });
}
let mcRaf = 0;
new MutationObserver(() => { clearTimeout(mcRaf); mcRaf = setTimeout(mountCharts, 20); }).observe(app, { childList: true, subtree: true });
window.addEventListener('beforeprint', mountCharts);
function spark(vals) {
  const w = 90, h = 28, x = i => 3 + (vals.length < 2 ? (w - 6) / 2 : i * (w - 6) / (vals.length - 1)), y = v => 3 + (h - 6) * (1 - v / 100);
  const tip = vals.length + ' test' + (vals.length === 1 ? '' : 's') + ' (oldest → latest)\n' + vals.slice(-8).map(v => fmt(v) + '%').join('  ›  ');
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(tip.replace('\n', ': '))}" tabindex="0" data-tip="${esc(tip)}"><polyline points="${vals.map((v, i) => x(i) + ',' + y(v)).join(' ')}" fill="none" stroke="#3b4fd8" stroke-width="2"/>${vals.length ? `<circle cx="${x(vals.length - 1)}" cy="${y(vals[vals.length - 1])}" r="3" fill="#3b4fd8"/>` : ''}</svg>`;
}

/* shared tooltip: hover on a mouse, tap on a phone, focus on a keyboard */
(function () {
  const tip = document.createElement('div'); tip.id = 'tip'; tip.setAttribute('role', 'tooltip'); document.body.appendChild(tip);
  let timer = 0, cur = null;
  const hide = () => { clearTimeout(timer); cur = null; tip.classList.remove('on'); };
  function show(t, auto) {
    clearTimeout(timer); cur = t; tip.textContent = t.getAttribute('data-tip'); tip.classList.add('on');
    const r = t.getBoundingClientRect(), tw = tip.offsetWidth, th = tip.offsetHeight, vw = document.documentElement.clientWidth;
    const left = Math.min(Math.max(8, r.left + r.width / 2 - tw / 2), vw - tw - 8); let top = r.top - th - 8;
    if (top < 6) top = r.bottom + 8;
    tip.style.left = left + 'px'; tip.style.top = top + 'px';
    if (auto) timer = setTimeout(hide, 3500);
  }
  const tgt = e => e.target && e.target.closest ? e.target.closest('[data-tip]') : null;
  document.addEventListener('pointerover', e => { if (e.pointerType !== 'mouse') return; const t = tgt(e); if (t) show(t); });
  document.addEventListener('pointerout', e => { if (e.pointerType === 'mouse' && tgt(e)) hide(); });
  document.addEventListener('focusin', e => { const t = tgt(e); if (t) show(t); });
  document.addEventListener('focusout', hide);
  document.addEventListener('click', e => { const t = tgt(e); if (t && t !== cur) show(t, true); else hide(); });
  document.addEventListener('scroll', hide, true); window.addEventListener('hashchange', hide);
})();

/* ---------- router ---------- */
function route(keepScroll) {
  clearInterval(tick);
  if (testOff) { const f = testOff; testOff = null; f(); }
  const h = (location.hash || '#/').replace(/^#\/?/, '');
  const [a, b] = h.split('/');
  const authed = !!AUTH.user();
  document.body.classList.toggle('authed', authed);
  document.body.classList.toggle('testing', authed && a === 'test');
  document.querySelectorAll('[data-nav]').forEach(el => el.classList.toggle('on',
    (el.dataset.nav === 'home' && (!a || a === 'subject' || a === 'paper')) || (el.dataset.nav === 'boards' && (a === 'boards' || a === 'board' || a === 'track')) || (el.dataset.nav === 'about' && a === 'about') || el.dataset.nav === a ||
    (el.dataset.nav === 'progress' && a === 'report') || (el.dataset.nav === 'history' && a === 'result')));
  const onTab = document.querySelector('.topbar nav a.on');
  if (onTab && onTab.parentNode.scrollWidth > onTab.parentNode.clientWidth) onTab.parentNode.scrollLeft = onTab.offsetLeft - (onTab.parentNode.clientWidth - onTab.offsetWidth) / 2;
  if (!keepScroll) window.scrollTo(0, 0);
  if (a === 'about') return viewAbout();
  if (!authed) return viewAuth(a === 'register' || a === 'forgot' ? a : 'login');
  if (a === 'login' || a === 'register' || a === 'forgot') return go('#/');
  if (a) { if (!landed) setLanded(true); }
  else if (!landed) { setLanded(true); return go('#/boards'); }
  /* a link to something that belongs to another board (a paper, a result, a running test) switches to that board first */
  { const A = (a === 'result' || a === 'report') ? rawAttempts().find(x => x.id === b) : a === 'test' ? active() : null;
    const tg = a === 'paper' ? paperById(decodeURIComponent(b || '')) : a === 'subject' ? subj(b) : A ? paperById(A.paperId) : null;
    if (tg && bdOf(tg) !== ACTIVE && switchBoard(bdOf(tg))) return; }
  if (a === 'profile') return viewProfile();
  if (!a) return viewHome();
  if (a === 'subject') return viewSubject(b);
  if (a === 'paper') return viewInstr(decodeURIComponent(b || ''));
  if (a === 'test') return viewTest();
  if (a === 'result') return viewResult(b);
  if (a === 'history') return viewHistory();
  if (a === 'progress') return viewProgress();
  if (a === 'report') return viewReport(b);
  if (a === 'pattern') return viewPattern(b);
  if (a === 'boards') return viewTracks();
  if (a === 'track') return viewTrack(b);
  if (a === 'board') return viewBoard(b);
  viewHome();
}
window.addEventListener('hashchange', () => route());

/* ---------- views ---------- */
function resumeBanner() {
  const A = active(); if (!A) return '';
  if (!valid(A)) { saveActive(null); return ''; }
  const P = paperById(A.paperId);
  return `<div class="info"><b>Test in progress:</b> ${esc(P.title)} — <a href="#/test"><b>Resume</b></a> (timer keeps running).</div>`;
}

function viewHome() {
  const BP = PAPERS.filter(p => bdOf(p) === ACTIVE), n = BP.length, done = attempts(), AB = boardOf(ACTIVE), TR = AB && trackOf(AB.track);
  const real = BP.filter(p => p.kind === 'pyq').length, streams = SUBJECTS.some(s => s.stream);
  app.innerHTML = `
  <div class="crumbs"><a href="#/boards">Exams</a>${TR ? ` › <a href="#/track/${TR.key}">${esc(TR.name)}</a>` : ''} › ${esc(AB ? AB.name : 'Maharashtra SSC')}</div>
  <section class="hero">
    ${student().name ? `<p class="eyebrow">Welcome back, <b>${esc(student().name)}</b></p>` : ''}
    <div class="hero-meta"><span>${esc(AB ? AB.name : 'Maharashtra SSC')}</span>${AB && AB.name.includes(BOARD.level || 'Class X') ? '' : `<span>${esc(BOARD.level || 'Class X')}</span>`}${BOARD.medium ? `<span>${esc(BOARD.medium)}</span>` : ''}</div>
    <h1>${esc(BOARD.heroTitle || 'Practice in the real board format')}</h1>
    <p>${esc(BOARD.heroText || 'Timed papers laid out like the board paper: same sections, "attempt any N" choices, marks and time. Instant marking, board-style grading, report cards and progress tracking.')} ${BOARD.heroText ? '' : 'Exams expected ' + esc(BOARD.examWindow) + '.'}</p>
    <div class="stats">
      <div class="stat"><b>${SUBJECTS.length}</b>subjects</div>
      <div class="stat"><b>${n}</b>papers available</div>
      <div class="stat"><b>${done.length}</b>tests taken by you</div>
      <div class="stat"><b>${streaks(done).cur}</b>day streak</div>
    </div>
    <div class="hero-act"><a class="btn pri" href="#/progress">My progress & report cards</a><a class="btn ghost" href="#/pattern">View paper pattern</a><a class="btn ghost" href="#/track/${TR ? TR.key : 'board'}">Change exam</a></div>
  </section>
  ${resumeBanner()}${legacyBanner()}
  <div class="h-row"><h2>Choose a subject</h2>${streams ? `<div class="seg" role="group" aria-label="Stream">${[['all', 'All subjects'], ['PCM', 'Maths group (PCM)'], ['PCB', 'Biology group (PCB)']].map(([k, l], i) => `<button type="button" class="${i ? '' : 'on'}" data-stream="${k}" aria-pressed="${!i}">${l}</button>`).join('')}</div>` : ''}</div>
  <div class="grid g2" id="subjgrid">
    ${SUBJECTS.map(s => `
      <a class="card subj" style="--c:${s.color}" href="#/subject/${s.key}" data-streams="${esc(s.stream || '')}">
        <div class="subj-top"><span class="ic">${s.icon}</span>${s.stream ? `<span class="chip gray">${esc(s.stream)}</span>` : ''}</div>
        <h3>${esc(s.name)}</h3>
        <div class="muted small">${esc(s.blurb)}</div>
        <div class="subj-foot"><span class="chip">${s.total} marks</span> <span class="chip gray">${PAPERS.filter(p => p.subject === s.key).length} papers</span><span class="go">${ARROW}</span></div>
      </a>`).join('')}
  </div>
  <div class="notice soft"><b>What the papers are:</b> <b>Mock tests</b> follow the real paper's format and are written from the textbook chapters with the question types and chapters examiners favour — they are not copies of any board paper.
  ${real ? `<b>Previous-year</b> papers (${real} so far) are transcribed from public third-party copies and are labelled; they could not be checked against the board's own PDF.` : 'Previous-year papers will appear in their own tab as each is typed in and labelled.'} Every paper says which kind it is.</div>`;
  app.querySelectorAll('[data-stream]').forEach(b => b.onclick = () => {
    app.querySelectorAll('[data-stream]').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
    app.querySelectorAll('#subjgrid [data-streams]').forEach(c => { c.hidden = b.dataset.stream !== 'all' && !c.dataset.streams.includes(b.dataset.stream); });
  });
}

/* ---------- about / author ---------- */
function viewAbout() {
  const A = window.AUTHOR || {};
  const links = [A.github ? { label: 'GitHub', url: 'https://github.com/' + A.github } : null, ...(A.links || [])].filter(Boolean);
  app.innerHTML = `
  <section class="hero"><h1>About BoardWise</h1><p>Why this site exists and who is building it.</p></section>
  <div class="card" style="margin-bottom:16px"><h3>Why BoardWise</h3>${(A.why || []).map(t => `<p>${esc(t)}</p>`).join('')}
    ${(A.principles || []).length ? `<h3>How it is built</h3><ul class="clean">${A.principles.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}</div>
  <div class="card"><h3>Author</h3>
    <p style="font-size:1.1rem;margin:0"><b>${esc(A.name || '')}</b></p>
    <p class="muted" style="margin-top:2px">${esc(A.role || '')}</p>
    ${A.bio ? `<p>${esc(A.bio)}</p>` : ''}
    ${links.length ? `<p>${links.map(l => `<a class="btn sm" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.label)}</a>`).join(' ')}</p>` : ''}
    <p class="small muted">BoardWise is an independent project and is not affiliated with any examination board. Found a wrong answer or a typo? Open an issue on <a href="https://github.com/${esc(A.github || '')}/BoardWise/issues" target="_blank" rel="noopener noreferrer">GitHub</a>.</p></div>`;
}

/* ---------- tracks (NEET / JEE / Board) and boards ---------- */
const boardOf = k => BOARDS.find(b => b.key === k);
const TRACKS = window.TRACKS || [], GROUPS = window.BOARD_GROUPS || [];
const trackOf = k => TRACKS.find(t => t.key === k);
const ICONS = {
  neet: '<path d="M5 3H4v6a5 5 0 0 0 10 0V3h-1"/><path d="M9 14v1a6 6 0 0 0 12 0v-3"/><circle cx="21" cy="10" r="2"/>',
  jee: '<ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>',
  board: '<path d="M2 9.5 12 5l10 4.5-10 4.5z"/><path d="M6 11.5V16c3.5 2.7 8.5 2.7 12 0v-4.5"/><path d="M22 9.5V15"/>'
};
const icon = (k, cls) => `<svg class="${cls || 'ico'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[k] || ''}</svg>`;
const ARROW = '<svg class="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const boardPapers = k => PAPERS.filter(p => bdOf(p) === k);
const boardSubjects = k => ALL_SUBJECTS.filter(s => bdOf(s) === k);
const trackBoards = k => BOARDS.filter(b => b.track === k);
const trackLive = k => trackBoards(k).filter(b => b.status === 'live');

function viewTracks() {
  const nm = student().name;
  app.innerHTML = `
  ${resumeBanner()}
  <section class="hub">
    <p class="eyebrow">${nm ? `Welcome back, <b>${esc(nm)}</b>` : 'Mock tests · marks · progress'}</p>
    <h1>What are you preparing for?</h1>
    <p class="lead">Choose a track. Each one has its own papers, marking scheme, grades and progress report.</p>
  </section>
  <div class="tracks">${TRACKS.map(t => {
    const live = trackLive(t.key), np = live.reduce((a, b) => a + boardPapers(b.key).length, 0), ns = live.reduce((a, b) => a + boardSubjects(b.key).length, 0);
    return `<a class="track" href="#/track/${t.key}" style="--c1:${t.color};--c2:${t.color2}">
      <div class="track-top"><span class="track-ic">${icon(t.key)}</span><span class="chip ${live.length ? 'ok' : 'gray'}">${live.length ? 'Live' : 'Coming soon'}</span></div>
      <div><div class="track-tag">${esc(t.tag)}</div><h2>${esc(t.name)}</h2></div>
      <p>${esc(t.blurb)}</p>
      <ul class="ticks">${(t.points || []).map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      <div class="track-foot"><span>${live.length ? `<b>${np}</b> papers · <b>${ns}</b> subjects` : 'Papers are being written'}</span><span class="go">${ARROW}</span></div>
    </a>`; }).join('')}</div>
  <p class="fineprint">All papers are original practice papers in each exam's own format, never copies of real board, NEET or JEE papers. Your results are visible only to you.</p>`;
}

function liveTile(b) {
  const ss = boardSubjects(b.key), n = boardPapers(b.key).length;
  return `<a class="tile" href="#/board/${b.key}" style="--c:${b.color}">
    <div class="tile-head"><span class="tile-cls">${esc(b.medium)}</span>${b.key === ACTIVE ? '<span class="chip">Using now</span>' : '<span class="chip ok">Live</span>'}</div>
    <h3>${esc(b.cls || b.name)}</h3>
    <p class="muted small">${esc(b.blurb)}</p>
    <div class="tile-subj">${ss.map(s => `<span>${esc(s.name)}</span>`).join('')}</div>
    <div class="tile-foot"><span>${n} papers · ${ss.length} subjects</span><span class="go">Open ${ARROW}</span></div></a>`;
}
const soonTile = (name, note, href) => `<${href ? `a href="${href}"` : 'div'} class="tile soon">
    <div class="tile-head"><span class="tile-cls">${esc(name)}</span><span class="chip gray">Coming soon</span></div>
    ${note ? `<p class="muted small">${esc(note)}</p>` : ''}</${href ? 'a' : 'div'}>`;

function viewTrack(key) {
  const t = trackOf(key); if (!t) return viewTracks();
  const head = `<div class="crumbs"><a href="#/boards">Exams</a> › ${esc(t.name)}</div>
  <section class="track-hero" style="--c1:${t.color};--c2:${t.color2}">
    <span class="track-ic lg">${icon(t.key)}</span>
    <div><div class="track-tag">${esc(t.tag)}</div><h1>${esc(t.name)}</h1><p>${esc(t.blurb)}</p></div>
  </section>${resumeBanner()}`;
  if (key === 'board') {
    app.innerHTML = head + GROUPS.map(g => {
      const bs = BOARDS.filter(b => b.group === g.key), live = bs.filter(b => b.status === 'live'), planned = bs.filter(b => b.status !== 'live');
      return `<section class="bgroup">
        <div class="bgroup-head"><span class="abbr" style="--c:${g.color}">${esc(g.abbr)}</span>
          <div><h2>${esc(g.name)}</h2><div class="muted small">${esc(g.full)}</div></div>
          <a class="small site" href="${esc(g.site)}" target="_blank" rel="noopener noreferrer">${esc(g.site.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''))} ↗</a></div>
        <div class="tiles">${live.map(liveTile).join('')}${planned.map(b => soonTile(b.cls || b.name, b.blurb, '#/board/' + b.key)).join('')}${(g.soon || []).map(c => soonTile(c, 'Planned. Papers will follow the board\'s own model paper.')).join('')}</div>
      </section>`; }).join('') + `<p class="fineprint">Later: ${BOARD_ROADMAP.map(esc).join(' · ')}</p>`;
    return;
  }
  const live = trackLive(key);
  app.innerHTML = head + `
  ${live.length ? `<h2 class="sec-h">Available now</h2><div class="tiles">${live.map(liveTile).join('')}</div>` : `<div class="info"><b>No papers yet.</b> ${esc(t.name)} tests are planned. Until then, the Physics, Chemistry and Mathematics tests in the other tracks cover the same Class XI NCERT chapters.</div>`}
  ${(t.soon || []).length ? `<h2 class="sec-h">Coming next</h2><div class="tiles">${t.soon.map(s => soonTile(s.name, s.note)).join('')}</div>` : ''}
  ${t.pattern ? `<div class="card" style="margin-top:20px"><h3>Exam pattern</h3><ul class="clean">${t.pattern.map(x => `<li>${x}</li>`).join('')}</ul></div>` : ''}`;
}

function viewBoard(key) {
  const b = boardOf(key); if (!b) return viewTracks();
  if (b.status === 'live') { if (switchBoard(b.key, '#/')) return; return go('#/'); }
  const t = trackOf(b.track) || trackOf('board');
  app.innerHTML = `
  <div class="crumbs"><a href="#/boards">Exams</a> › <a href="#/track/${t.key}">${esc(t.name)}</a> › ${esc(b.name)}</div>
  <h1>${esc(b.name)} <span class="chip gray">Coming soon</span></h1>
  <p>${(b.levels || []).map(l => `<span class="chip">${esc(l.name)}</span>`).join(' ')}</p>
  <p class="muted">${esc(b.full)} · ${esc(b.medium)}</p>
  <div class="notice"><b>No papers yet.</b> Mock tests for this board are not built. When they are, they will be original practice papers in the board's own layout, labelled as mock tests, and never presented as past board papers.</div>
  <div class="card"><h3>Planned subjects</h3><p>${b.subjects.map(x => `<span class="chip">${esc(x)}</span>`).join(' ')}</p>
    <h3>Pattern as reported (not verified)</h3><ul class="clean">${b.reported.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
    <p class="small muted">These points come from third-party education sites that disagree with each other. For the authoritative scheme use the board's own site: <a href="${esc(b.site)}" target="_blank" rel="noopener noreferrer">${esc(b.site.replace(/^https?:\/\//, ''))}</a>.</p></div>
  <p><a class="btn" href="#/track/${t.key}">‹ ${esc(t.name)}</a></p>`;
}

function viewSubject(key) {
  const s = subj(key); if (!s) return viewHome();
  const ps = PAPERS.filter(p => p.subject === key);
  app.innerHTML = `
  <div class="crumbs"><a href="#/">Subjects</a> › ${esc(s.name)}</div>
  <h1>${s.icon} ${esc(s.name)}</h1>
  <p class="muted">${esc(s.blurb)}</p>
  ${resumeBanner()}
  <div class="tabs"><button class="tab on" data-t="mock">Mock tests</button><button class="tab" data-t="pyq">Previous-year papers</button><button class="tab" data-t="pat">Pattern & chapters</button></div>
  <div id="tabbody"></div>`;
  const body = document.getElementById('tabbody');
  const show = t => {
    document.querySelectorAll('.tab').forEach(b => b.classList.toggle('on', b.dataset.t === t));
    if (t === 'mock') body.innerHTML = ps.filter(p => p.kind !== 'pyq').map(paperCard).join('') || '<div class="empty">No mock tests yet.</div>';
    if (t === 'pyq') {
      const real = ps.filter(p => p.kind === 'pyq'), have = new Set(real.map(p => p.year));
      body.innerHTML = (real.length ? real.map(paperCard).join('') + `<div class="notice">These papers are typed in from public third-party copies of the board paper (the board's own PDF was not available). Questions that depend on a figure are described in words or left out. Check anything important against your school's copy.</div>`
        : `<div class="notice">No real previous-year paper for ${esc(s.name)} could be loaded yet. Papers are only added once the actual questions are found; nothing here is invented or given a made-up year.</div>`) + `
      ${ACTIVE === 'msbshse' ? `<div class="pill-row">${YEARS.map(y => `<span class="ypill ${y.na ? 'na' : ''} ${have.has(y.y) ? 'have' : ''}" title="${esc(y.na || (have.has(y.y) ? 'Loaded' : 'Not loaded yet'))}">${y.y}${y.na ? ' ✕' : have.has(y.y) ? ' ✓' : ''}</span>`).join('')}</div>
      <p class="small muted">2021 is struck out because the Maharashtra SSC exam was not held that year (please verify). A ✓ means a paper for that year is loaded.</p>` : ''}`;
    }
    if (t === 'pat') body.innerHTML = patternBlock(s);
    body.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
  };
  document.querySelectorAll('.tab').forEach(b => b.onclick = () => show(b.dataset.t));
  show('mock');
}

function paperCard(p) {
  const m = paperMarks(p), n = flat(p).length, split = hasParts(p), half = m / 2;
  return `<div class="card paper">
    <div><h3>${esc(p.title)}</h3>
      <div class="meta"><span class="chip">${split ? `2 papers × ${half} marks` : `${m} marks`}</span><span class="chip gray">${n} questions</span><span class="chip gray">${split ? `${minutesFor(p, pick(p, 'part1'))} min each` : `${minutesFor(p, flat(p))} min`}</span>
      <span class="chip ${p.kind === 'pyq' ? 'ok' : 'warn'}">${p.kind === 'pyq' ? 'Board ' + p.year + ' · third-party copy' : 'Mock test'}</span></div>
      <div class="muted small" style="margin-top:6px">${esc(p.desc || '')}</div></div>
    <button class="btn pri" data-go="#/paper/${encodeURIComponent(p.id)}">Open test ›</button></div>`;
}

function patternBlock(s) {
  return `<div class="card">
    <h3>Marking scheme — ${esc(s.name)}</h3>
    <table><tr><th>Section</th><th>Marks</th><th>Details</th></tr>
    ${s.pattern.map(r => `<tr><td>${esc(r[0])}</td><td>${r[1]}</td><td>${esc(r[2])}</td></tr>`).join('')}</table>
    ${s.durationNote ? `<p><b>Time allowed:</b> ${esc(s.durationNote)}</p>` : ''}
    <div class="notice">${esc(s.note)}</div>
    <h3>Chapters / syllabus</h3>
    ${Object.entries(s.chapters).map(([k, v]) => `<p><b>${esc(k)}</b></p><ul class="clean">${v.map(c => `<li>${esc(c)}</li>`).join('')}</ul>`).join('')}
    <p class="small muted">${esc(BOARD.chapterNote || 'Chapter names are compiled from public study sites and should be checked against the current Balbharati textbook.')}</p>
  </div>`;
}

function viewPattern(key) {
  const list = key ? [subj(key)].filter(Boolean) : SUBJECTS;
  if (BOARD.patternPoints) return app.innerHTML = `<h1>Paper pattern & marking scheme</h1>
  <div class="card"><h3>Common to all subjects — ${esc(boardOf(ACTIVE).name)}</h3><ul class="clean">${BOARD.patternPoints.map(t => `<li>${t}</li>`).join('')}</ul></div>
  ${list.map(s => `<div style="margin-top:16px"><h2>${s.icon} ${esc(s.name)}</h2>${patternBlock(s)}</div>`).join('')}`;
  app.innerHTML = `<h1>Paper pattern & marking scheme</h1>
  <div class="card"><h3>Common to all subjects</h3><ul class="clean">
  <li>Each subject is <b>80 marks written + 20 marks internal/practical = 100</b>. Only the written part is tested here.</li>
  <li>Maths, Science and Social Science are set as separate <b>40-mark, 2-hour</b> papers on separate days (Algebra, Geometry, Science 1, Science 2, History & Political Science, Geography & Economics), and BoardWise times each one on its own. Language papers are 80 marks, 3 hours.</li>
  <li>Most questions are <b>"attempt any N of M"</b> (for example Q.2A: solve any 2 of 3). Only your best N answers count, exactly as they would in the exam.</li>
  <li><b>No negative marking.</b> Pass mark: <b>${BOARD.passPercent}%</b> per subject (sources vary between 33% and 35%; confirm with your school).</li>
  <li>Grade bands used by this site: Distinction 75%+, First Class 60–74%, Second Class 45–59%, Pass Class 35–44%.</li>
  <li>The Maths and History/Political Science layouts were read from a transcription of the 2025 board papers. The Science, Geography, English, Hindi and Marathi layouts are <b>approximate</b> — the pages that would confirm them could not be read. Each subject below says which it is.</li></ul></div>
  ${list.map(s => `<div style="margin-top:16px"><h2>${s.icon} ${esc(s.name)}</h2>${patternBlock(s)}</div>`).join('')}`;
}

function structureTable(P) {
  const rows = groupBySec(flat(P)).map(g => {
    const ms = [...new Set(g.qs.map(q => q.marks))];
    const sm = marksOf(g.qs), n = need(g);
    return `<tr><td class="stitle">${esc(g.sec.title)}</td><td data-l="Choice">${n < g.qs.length ? `Any <b>${n}</b> of ${g.qs.length}` : `All ${g.qs.length}`}</td><td data-l="Marks">${ms.length === 1 ? ms[0] + (ms[0] > 1 ? ' marks' : ' mark') + ' each' : 'mixed'}</td><td class="right" data-l="Section total"><b>${fmt(sm)}</b></td></tr>`;
  }).join('');
  return `<table class="struct"><tr><th>Question</th><th>Choice</th><th>Marks</th><th class="right">Section total</th></tr>${rows}<tr class="stotal"><td colspan="3"><b>Total</b></td><td class="right" data-l="Total marks"><b>${paperMarks(P)}</b></td></tr></table>`;
}

function viewInstr(id) {
  const P = paperById(id); if (!P) return viewHome();
  if (P.kind === 'practice') return go('#/progress');
  const S = subj(P.subject), all = flat(P);
  /* Maths and Science are two separate board papers (Part 1, Part 2) on separate days, 2 h each; never a combined 4 h sitting */
  const split = hasParts(P), modes = split ? [['part1', 'Part 1 paper', pick(P, 'part1')], ['part2', 'Part 2 paper', pick(P, 'part2')]] : [['all', 'Full paper', all]];
  if (P.sections.length > 1 || !BOARD.alwaysMix) P.sections.forEach(sec => modes.push(['sec:' + sec.id, sec.title, pick(P, 'sec:' + sec.id)]));
  const taken = rawAttempts().some(a => a.paperId === P.id), fresh = freshCount(P, 'all');
  const hasChoice = P.sections.some(s => s.attempt && s.attempt < s.questions.length);
  app.innerHTML = `
  <div class="crumbs"><a href="#/">Subjects</a> › <a href="#/subject/${S.key}">${esc(S.name)}</a> › ${esc(P.title)}</div>
  <h1>${esc(P.title)}</h1>
  ${resumeBanner()}
  <div class="card instr">
    <h3>Paper structure</h3>
    ${structureTable(P)}
    <h3>General instructions</h3>
    <ul class="clean">
      <li>${split ? '' : `Total marks: <b>${paperMarks(P)}</b>. `}${split ? `Each paper (Part 1, Part 2) is <b>${paperMarks(P) / 2} marks</b> and takes <b>${minutesFor(P, pick(P, 'part1'))} minutes</b>, as in the board exam; the two parts are separate sittings.` : `Time for the full paper: <b>${minutesFor(P, all)} minutes</b>.`} The timer cannot be paused; the test submits itself when time ends.</li>
      ${hasChoice ? '<li><b>Choices:</b> where a question says "Any N of M", answer the number asked. If you answer more, only your <b>best N</b> are counted.</li>' : ''}
      ${BOARD.negative ? `<li><b>Negative marking:</b> +${all[0].marks} for a correct answer, <b>−${all[0].neg || 1}</b> for a wrong answer, 0 for a question left unanswered. Skip a question you cannot narrow down.</li>` : '<li>There is <b>no negative marking</b>. Attempt every question.</li>'}
      ${all.every(q => q.type === 'mcq') ? '<li>Every question is a multiple-choice question and is <b>marked automatically</b> the moment you submit, with a worked solution for each.</li>' : `<li>MCQs and short numeric/word answers are <b>marked automatically</b>. Written answers are <b>checked automatically</b> against the model answer when you submit (final answers and key points). Drawings, proofs and long explanations cannot be checked by a computer, so for those you award your own marks — be honest, that is what makes the score useful. You can always correct the marks of any written answer in the review.</li>`}
      <li>Use the palette to jump between questions and the flag button to mark questions for review. Answers are saved automatically; refreshing the page will not lose them.</li>
      <li>${BOARD.passName ? 'Target score' : 'Pass mark'}: ${BOARD.passPercent}%. The result shows grade, section-wise and chapter-wise performance, and you can print a report card.</li>
    </ul>
    ${P.kind === 'pyq' ? `<div class="notice"><b>Board ${esc(P.year)} paper — third-party copy.</b> ${P.note || 'Typed in from a public transcription; not checked against the board PDF.'}</div>`
      : `<div class="notice"><b>Mock test.</b> ${P.note || 'Written from the textbook chapters in the board paper\'s format. Not an actual past paper.'}</div>`}
    <h3>Your questions</h3>
    <div class="notice qinfo">${BOARD.alwaysMix ? `<b>A new question set every time.</b> Each attempt gives you a different set of ${all.length} questions covering the chapters of this paper, so you can take it as often as you like.`
      : taken
      ? `<b>Retake — a fresh mix.</b> You have taken this paper before, so you get <b>new questions</b>: ${fresh ? `${fresh} of ${all.length} questions are replaced` : 'the questions are re-ordered and the options re-arranged'} with ones you have not seen (from the other ${esc(S.name)} mocks, same type, marks and chapter first), so you are tested on the subject, not on remembering the answers.`
      : '<b>First attempt.</b> You get this paper exactly as written. When you retake it, every question you have seen is swapped for a new one.'}
      <div style="margin-top:8px"><b>Difficulty:</b> ${diffMixHtml(all)} <span class="small muted">Every question is labelled <b>Easy</b> (quick, direct) or <b>Medium</b> (a few steps) with a suggested time, so you can plan your minutes.</span></div></div>
    ${hasHindiQs(P) ? '<h3>Question language · प्रश्नों की भाषा</h3>' + langPicker() + '<p class="small muted">Questions, options and solutions are available in Hindi and English. You can switch at any time, even during the test; your answers stay as they are.</p>' : ''}
    <h3>Choose how to attempt</h3>
    <div class="modes">${modes.map(m => `<button class="btn ${m[0] === 'all' || m[0] === 'part1' ? 'pri' : ''}" data-mode="${esc(m[0])}">${esc(m[1])} · ${marksOf(m[2])} marks · ${minutesFor(P, m[2])} min</button>`).join('')}</div>
  </div>`;
  app.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => {
    startAttempt(P, b.dataset.mode, taken || BOARD.alwaysMix ? 'fresh' : 'orig');
  });
}

/* ---------- test runner ---------- */
function viewTest() {
  let A = active();
  if (!A) return go('#/');
  if (!valid(A)) { saveActive(null); return go('#/'); }
  if (rawAttempts().some(a => a.id === A.id)) { saveActive(null); return go('#/result/' + A.id); }
  const P = paperById(A.paperId);
  const qs = qsOf(A);
  const groups = groupBySec(qs);
  const perMark = Math.max(Math.min(0.5, BOARD.minutesPerMark), (A.endsAt - A.startedAt) / 60000 / Math.max(1, marksOf(qs)));   // minutes the paper's clock gives per mark
  const grp = id => groups.find(g => g.sec.id === id);
  app.innerHTML = `
  <div class="tbar"><div><h2>${esc(P.title)}</h2><span class="muted small">${esc(modeLabel(P, A.mode))} · ${marksOf(qs)} marks · ${diffMix(qs).easy} Easy + ${diffMix(qs).medium} Medium${variantLabel(A) ? ` · <b>${esc(variantLabel(A))}</b>` : ''}</span></div>
    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">${hasHindiQs(P) ? langPicker() : ''}<span class="timer" id="timer">--:--:--</span><button class="btn pri" id="submit">Submit test</button></div></div>
  <div class="tlayout"><div class="card" id="qbox"></div>
    <aside class="card pal"><h3>Question palette</h3><div id="palette"></div>
      <div id="pace" class="pace small"></div>
      <div class="legend"><span><i style="background:var(--ok-l)"></i>Answered</span><span><i style="background:var(--warn-l)"></i>Seen</span><span><i></i>Not seen</span><span><i style="background:var(--bad)"></i>Flagged</span></div></aside></div>`;
  /* Answers are stamped (A.ats) and merged with the stored copy on every save, so a second tab or a phone tab
     restored from the background can never overwrite a newer answer. A.tq = seconds spent per question, A.hid = seconds the page was hidden. */
  A.ats = A.ats || {}; A.tq = A.tq || {}; A.chg = A.chg || {}; A.hid = A.hid || 0;
  let flush = () => {};   // writes whatever is typed in the answer box into the saved answers (set by draw)
  let done = false, vis = !document.hidden, hiddenAt = vis ? 0 : Date.now(), lastT = Date.now(), undo = null, tcount = 0;
  const pull = () => {
    const S = active(); if (!S || S.id !== A.id) return;
    Object.keys(S.ats || {}).forEach(id => {
      if ((S.ats[id] || 0) > (A.ats[id] || 0)) { A.ats[id] = S.ats[id]; if (S.answers && isAns(S.answers[id])) A.answers[id] = S.answers[id]; else delete A.answers[id]; }
    });
    Object.keys(S.seen || {}).forEach(id => { A.seen[id] = 1; });
    Object.keys(S.tq || {}).forEach(id => { A.tq[id] = Math.max(A.tq[id] || 0, S.tq[id]); });
    Object.keys(S.chg || {}).forEach(id => { A.chg[id] = Math.max(A.chg[id] || 0, S.chg[id]); });
    A.hid = Math.max(A.hid, S.hid || 0);
  };
  const save = () => { if (done) return; pull(); saveActive(A); };
  const lap = () => { // credit the time since the last lap to the question on screen (only while the page is visible)
    const now = Date.now(), d = Math.min(now - lastT, 120000); lastT = now;
    if (vis && d > 0 && !done) { const id = qs[A.cur].id; A.tq[id] = (A.tq[id] || 0) + d / 1000; }
  };
  const timer = document.getElementById('timer');
  const answeredIn = g => g.qs.filter(q => isAns(A.answers[q.id])).length;

  function qtimeUpd() { const el = document.getElementById('qtime'); if (el) el.textContent = '⏱ ' + dur(A.tq[qs[A.cur].id] || 0) + ' here'; }
  function pace() {
    const el = document.getElementById('pace'); if (!el) return;
    const left = groups.reduce((a, g) => a + Math.max(0, need(g) - answeredIn(g)), 0), rem = Math.max(0, A.endsAt - Date.now());
    el.innerHTML = `<b>Pace</b> · used ${dur((Date.now() - A.startedAt) / 1000)}<br>${left ? `${left} still to answer · about <b>${dur(rem / 1000 / left)}</b> each` : 'All needed answers done ✓'}`;
  }
  function updTimer() {
    if (done) return;
    lap();
    const rem = A.endsAt - Date.now();
    timer.textContent = clock(rem);
    timer.className = 'timer' + (rem < 300000 ? ' crit' : rem < 600000 ? ' warn' : '');
    if (rem <= 0) { clearInterval(tick); return doSubmit(true); }
    qtimeUpd(); pace();
    if (++tcount % 5 === 0) save();
  }
  function doSubmit(auto) {
    if (done) return;
    flush(); lap(); done = true; clearInterval(tick);
    A.submittedAt = Math.min(Date.now(), A.endsAt); A.v = 2; if (auto) A.timedOut = true;
    const arr = rawAttempts().filter(a => a.id !== A.id); arr.unshift(A); saveAttempts(arr);
    saveActive(null);
    if (auto) alert('Time is up — your test has been submitted.');
    go('#/result/' + A.id);
  }
  function nav(i) { flush(); lap(); A.cur = i; save(); draw(); }
  function finish() {
    flush();
    const gaps = groups.map(g => ({ g, n: need(g), a: answeredIn(g) })).filter(x => x.a < x.n);
    const miss = gaps.reduce((s, x) => s + x.n - x.a, 0), flagged = qs.map((q, i) => ({ q, i })).filter(x => A.flags[x.q.id]);
    const total = groups.reduce((s, g) => s + need(g), 0), upto = groups.reduce((s, g) => s + Math.min(answeredIn(g), need(g)), 0);
    const old = document.getElementById('submodal'); if (old) old.remove();
    const m = document.createElement('div'); m.id = 'submodal'; m.className = 'modal';
    m.innerHTML = `<div class="card mbox" role="dialog" aria-modal="true" aria-label="Submit test">
      <h3 style="margin-top:0">Submit the test?</h3>
      <p>You have answered <b>${upto} of ${total}</b> needed question(s) · time used <b>${dur((Date.now() - A.startedAt) / 1000)}</b> of ${dur((A.endsAt - A.startedAt) / 1000)}.</p>
      ${gaps.map(x => `<div class="mgap"><b>${esc(x.g.sec.title)}</b> <span class="small muted">— ${x.a} of ${x.n} answered</span><div class="mq">${x.g.qs.map(q => ({ q, i: qs.indexOf(q) })).filter(y => !isAns(A.answers[y.q.id])).map(y => `<button class="btn sm" data-i="${y.i}">Q${y.i + 1}</button>`).join('')}</div></div>`).join('')}
      ${flagged.length ? `<div class="mgap"><b>⚑ Flagged for review</b><div class="mq">${flagged.map(y => `<button class="btn sm" data-i="${y.i}">Q${y.i + 1}</button>`).join('')}</div></div>` : ''}
      ${miss ? '<p class="small muted">Tap a question number to jump to it. Unanswered questions score zero.</p>' : '<p class="small muted">Everything needed is answered. You cannot change answers after submitting.</p>'}
      <div class="btnrow"><button class="btn" id="mback">‹ Keep working</button><button class="btn pri" id="mgo">Submit now</button></div></div>`;
    document.body.appendChild(m);
    m.querySelectorAll('[data-i]').forEach(b => b.onclick = () => { m.remove(); nav(+b.dataset.i); });
    m.onclick = e => { if (e.target === m) m.remove(); };
    document.getElementById('mback').onclick = () => m.remove();
    document.getElementById('mgo').onclick = () => { m.remove(); doSubmit(false); };
    document.getElementById('mback').focus();
  }
  document.getElementById('submit').onclick = finish;

  const onVis = () => {
    if (document.hidden) flush();
    lap(); vis = !document.hidden;
    if (!vis) { hiddenAt = Date.now(); saveActive(A); return; }
    if (hiddenAt) { A.hid += (Date.now() - hiddenAt) / 1000; hiddenAt = 0; }
    lastT = Date.now();
    if (rawAttempts().some(a => a.id === A.id)) { done = true; saveActive(null); return go('#/result/' + A.id); } // already submitted in another tab
    const S = active(); if (S && S.id !== A.id) { done = true; return go('#/'); }
    const before = JSON.stringify(A.answers); save();
    if (JSON.stringify(A.answers) !== before) draw();
    updTimer();
  };
  const onHide = () => { flush(); lap(); if (!done) saveActive(A); };
  document.addEventListener('visibilitychange', onVis); window.addEventListener('pagehide', onHide);
  testOff = () => { document.removeEventListener('visibilitychange', onVis); window.removeEventListener('pagehide', onHide); onHide(); done = true; flush = () => {}; const m = document.getElementById('submodal'); if (m) m.remove(); };

  function secStat() {
    const el = document.getElementById('secstat'); if (!el) return;
    const g = grp(qs[A.cur].sec.id), n = need(g), a = answeredIn(g);
    el.className = 'chip ' + (a >= n ? 'ok' : 'gray');
    el.textContent = `Answered ${a} of ${n} needed` + (a > n ? ' (extra answers: only your best ' + n + ' count)' : '');
  }
  function pal() {
    let html = '', last = null;
    qs.forEach((q, i) => {
      if (q.sec.id !== last) {
        const g = grp(q.sec.id), n = need(g);
        html += `${last ? '</div>' : ''}<div class="palsec">${esc(q.sec.title)}${n < g.qs.length ? ` · any ${n} of ${g.qs.length}` : ''}</div><div class="palgrid">`; last = q.sec.id;
      }
      const c = ['pb', isAns(A.answers[q.id]) ? 'done' : A.seen[q.id] ? 'vis' : '', i === A.cur ? 'cur' : '', A.flags[q.id] ? 'flag' : ''].join(' ');
      html += `<button class="${c}" data-i="${i}" title="Q${i + 1}">${i + 1}</button>`;
    });
    const el = document.getElementById('palette'); el.innerHTML = html + '</div>';
    el.querySelectorAll('.pb').forEach(b => b.onclick = () => nav(+b.dataset.i));
    secStat(); pace();
  }
  /* "Wrote it on paper? Add a photo": a vision model copies the handwriting into text, the student checks and fixes it, and only
     then does it become part of the answer (so it is marked like any typed answer, and a misread word never costs marks unseen). */
  const PHOTO_MSG = { off: 'Photo reading is not available right now.', image: 'That file could not be used as a photo. Try a clear picture of the page (JPG or PNG).', busy: 'We could not read that photo right now. Try again in a moment, or type the answer.',
    limit: 'You have used the photo reader a lot this hour. Please type this answer, or try again later.', signin: 'Please sign in to use photo answers.', old: 'Photo reading is not switched on yet.', net: 'No connection. Try again when you are online.' };
  function photoUI(q, ans, setV) {
    const box = document.getElementById('photo'); if (!box || !ans || !window.AIG || !AIG.photoReady) return;
    const still = () => qs[A.cur] === q && document.getElementById('photo') === box && !done;
    let busy = false;
    /* Two ways in: "Take a photo" (the phone's camera app opens directly; on a computer a live camera preview opens here) and "Upload a photo". */
    const touch = !!(window.matchMedia && matchMedia('(pointer: coarse)').matches);
    function idle(msg, ok) {
      box.innerHTML = `<span class="small muted photohint">Wrote it on paper?</span>
        <label class="btn sm photobtn" id="phcamlbl">📷 Take a photo${touch ? '<input type="file" accept="image/*" capture="environment" hidden id="phcam">' : ''}</label>
        <label class="btn sm photobtn">🖼 Upload a photo<input type="file" accept="image/*" hidden id="photofile"></label>
        <span class="small ${ok ? 'saved' : 'muted'}">${esc(msg || 'We read your handwriting into text. You check it before it is used.')}</span>`;
      const pick = e => { const f = e.target.files && e.target.files[0]; e.target.value = ''; if (f) run(f); };
      box.querySelector('#photofile').onchange = pick;
      if (touch) box.querySelector('#phcam').onchange = pick;
      else box.querySelector('#phcamlbl').onclick = e => { e.preventDefault(); camera(); };
    }
    async function camera() {
      if (busy) return;
      if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) return idle('This browser cannot open the camera here. Use "Upload a photo" instead.');
      let stream;
      try { stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1440 } }, audio: false }); }
      catch (e) { return idle(e && e.name === 'NotAllowedError' ? 'Camera permission was blocked. Allow the camera for this site, or use "Upload a photo".' : 'No camera was found. Use "Upload a photo" instead.'); }
      if (!still()) { stream.getTracks().forEach(t => t.stop()); return; }
      box.innerHTML = `<div class="photocam"><video id="phvid" autoplay playsinline muted></video>
        <div class="small muted">Hold the page flat, in good light, so the writing fills the picture.</div>
        <div class="row"><button class="btn sm pri" id="phsnap">📸 Capture</button> <button class="btn sm" id="phstop">Cancel</button></div></div>`;
      const v = box.querySelector('#phvid'); v.srcObject = stream;
      const stop = () => { clearInterval(watch); stream.getTracks().forEach(t => t.stop()); };
      const watch = setInterval(() => { if (!v.isConnected) stop(); }, 700);        // the student moved on to another question: release the camera
      box.querySelector('#phstop').onclick = () => { stop(); idle(); };
      box.querySelector('#phsnap').onclick = () => {
        if (!v.videoWidth) return;
        const c = document.createElement('canvas'); c.width = v.videoWidth; c.height = v.videoHeight; c.getContext('2d').drawImage(v, 0, 0);
        stop();
        c.toBlob(b => { if (!b) return idle(PHOTO_MSG.image); run(new File([b], 'camera.jpg', { type: 'image/jpeg' })); }, 'image/jpeg', 0.92);
      };
    }
    async function run(f) {
      if (busy) return; busy = true;
      box.innerHTML = '<span class="aibar"><span class="spin"></span> Reading your handwriting…</span>';
      let r; try { r = await AIG.transcribe(f); } catch (e) { r = { error: 'busy' }; }
      busy = false; if (!still()) return;
      if (r.error) return idle(PHOTO_MSG[r.error] || PHOTO_MSG.busy);
      if (!r.text) return idle('We could not find any handwriting in that photo. Try again in good light, with the page flat and filling the picture.');
      review(r);
    }
    function review(r) {
      box.innerHTML = `<div class="photoreview"><b>Check what we read</b>
        <div class="small muted">Fix anything that is wrong: this is exactly what will be marked. Words shown as [?] could not be read.${r.notes ? ' ' + esc(r.notes) : ''}${r.truncated ? ' Only the first part of a very long answer was kept.' : ''}</div>
        <textarea class="ans" id="phtxt">${esc(r.text)}</textarea>
        <div class="row"><button class="btn sm pri" id="phuse">Use this text</button> <button class="btn sm" id="phno">Cancel</button></div></div>`;
      const t = box.querySelector('#phtxt'); t.focus();
      box.querySelector('#phno').onclick = () => idle();
      box.querySelector('#phuse').onclick = () => {
        const v = t.value.trim(); if (!v) return;
        const cur = ans.value.trim(); ans.value = cur ? cur + '\n' + v : v; setV(ans.value);
        idle('✓ Added to your answer. Read it once more before you submit.', true);
      };
    }
    AIG.photoReady().then(ok => { if (ok && still() && !box.innerHTML) idle(); }).catch(() => {});
  }
  function draw() {
    const q = qs[A.cur]; A.seen[q.id] = 1; save();
    if (undo && undo.id !== q.id) undo = null;
    const g = grp(q.sec.id), n = need(g);
    const v = A.answers[q.id];
    let input = '';
    if (q.type === 'mcq') input = q.options.map((o, i) => `<label class="opt ${Number(v) === i && isAns(v) ? 'sel' : ''}"><input type="radio" name="o" value="${i}" ${Number(v) === i && isAns(v) ? 'checked' : ''}><span><b>${letter(i)}.</b> ${o}</span></label>`).join('');
    else if (q.type === 'num') input = `<input class="ans" id="ans" autocomplete="off" placeholder="${esc(q.hint || 'Type your answer')}" value="${esc(v || '')}">`;
    else input = `<textarea class="ans" id="ans" placeholder="Write your answer here, as you would in the answer book…">${esc(v || '')}</textarea>`;
    document.getElementById('qbox').innerHTML = `
      <div class="qhead"><div><span class="chip">Q${A.cur + 1} of ${qs.length}</span> <span class="chip gray">${q.neg ? `+${q.marks} / −${q.neg}` : `${q.marks} mark${q.marks > 1 ? 's' : ''}`}</span> ${diffChip(q, minLabel(q.marks * perMark))} <span class="chip gray" id="qtime"></span></div>
        <button class="btn sm ${A.flags[q.id] ? 'danger' : ''}" id="flag">${A.flags[q.id] ? '⚑ Flagged' : '⚐ Flag for review'}</button></div>
      <div class="secinfo"><b>${esc(q.sec.title)}</b>${n < g.qs.length ? ` — <b>Attempt any ${n} of ${g.qs.length}</b>` : ''}${q.sec.instruction ? ' — ' + esc(q.sec.instruction) : ''}
        <div style="margin-top:6px"><span id="secstat" class="chip gray"></span></div>${q.sec.passage ? `<div class="pass">${q.sec.passage}</div>` : ''}</div>
      <div class="qtext">${q.q}</div>${figHtml(q, false)}${input}${q.type !== 'mcq' && q.type !== 'num' ? '<div id="photo" class="photo"></div>' : ''}
      <div class="qtools">${isAns(v) ? '<button class="btn sm" id="clear">Clear answer</button>' : ''}${undo ? '<span class="small muted">Answer cleared.</span> <button class="btn sm pri" id="undo">Undo</button>' : ''}${isAns(v) ? '<span class="small saved">✓ Saved</span>' : ''}</div>
      <div class="qfoot"><button class="btn" id="prev" ${A.cur === 0 ? 'disabled' : ''}>‹ Previous</button>
        <button class="btn pri" id="next" ${A.cur === qs.length - 1 ? 'disabled' : ''}>Next ›</button></div>`;
    const setV = val => {
      const old = A.answers[q.id];
      if (!isAns(val) && !isAns(old)) return;
      if (String(old) === String(val)) return;
      if (isAns(val)) A.answers[q.id] = val; else delete A.answers[q.id];
      A.ats[q.id] = Date.now();
      if (q.type === 'mcq' && isAns(old) && isAns(val)) A.chg[q.id] = (A.chg[q.id] || 0) + 1;
      save(); pal();
    };
    document.querySelectorAll('input[name=o]').forEach(r => {
      const pick = () => { setV(+r.value); document.querySelectorAll('.opt').forEach(o => o.classList.remove('sel')); r.closest('.opt').classList.add('sel'); };
      r.onchange = pick; r.onclick = pick;
    });
    const ans = document.getElementById('ans');
    flush = () => { const a = document.getElementById('ans'); if (a && !done && qs[A.cur] === q) setV(a.value); };
    /* phone keyboards (autocorrect, voice, swipe) do not always fire 'input' for the last word: also save on change / blur / composition end */
    if (ans) ['input', 'change', 'blur', 'compositionend', 'keyup'].forEach(ev => ans.addEventListener(ev, () => setV(ans.value)));
    /* Answers must be typed by the student: pasting and dropping text into the answer box is blocked, so what is stored,
       marked and printed is exactly what they wrote. (Typing, voice typing and the keyboard's own suggestions still work.) */
    if (ans && q.type !== 'mcq') {
      const block = e => e.preventDefault();
      ['paste', 'drop', 'dragover'].forEach(ev => ans.addEventListener(ev, block));
      ans.addEventListener('beforeinput', e => { if (/^insertFrom(Paste|Drop|Yank)/.test(e.inputType)) block(e); });
    }
    if (q.type !== 'mcq' && q.type !== 'num') photoUI(q, ans, setV);
    document.getElementById('flag').onclick = () => { A.flags[q.id] = !A.flags[q.id]; if (!A.flags[q.id]) delete A.flags[q.id]; save(); draw(); };
    document.getElementById('prev').onclick = () => nav(A.cur - 1);
    document.getElementById('next').onclick = () => nav(A.cur + 1);
    const clr = document.getElementById('clear'); if (clr) clr.onclick = () => { undo = { id: q.id, v: A.answers[q.id] }; setV(''); draw(); };
    const und = document.getElementById('undo'); if (und) und.onclick = () => { const val = undo.v; undo = null; setV(val); draw(); };
    pal(); qtimeUpd();
    window.scrollTo({ top: 0 });
  }
  updTimer(); tick = setInterval(updTimer, 1000);
  draw();
}

/* ---------- result ---------- */
/* A model answer as numbered steps: givens as chips, one calculation per line, marks beside the step, the result highlighted. */
function solHtml(q) {
  const sol = q.solution || '';
  let st = [];
  try { st = window.CHK ? window.CHK.steps(sol) : []; } catch (e) { st = []; }
  const plainish = !/<(table|ul|ol|svg|img|pre|div)\b/i.test(sol);
  if (!plainish || st.length < 2) return `<div class="solraw">${sol}</div>`;
  let n = 0;
  const li = st.map(s => {
    const mk = s.marks ? `<span class="mk" title="Marks for this step">${esc(s.marks)}</span>` : '';
    if (s.kind === 'given') return `<li class="given"><span class="sn">Given</span><div class="sb">${s.items.map(x => `<span class="gv">${x}</span>`).join('')}</div>${mk}</li>`;
    n++;
    return `<li class="${s.kind === 'answer' ? 'fin' : 'st'}"><span class="sn">${s.kind === 'answer' ? '✔' : n}</span><div class="sb">${s.html}</div>${mk}</li>`;
  }).join('');
  return `<ol class="steps">${li}</ol>`;
}
function viewResult(id) {
  const A = attempts().find(a => a.id === id);
  if (!A) return go('#/history');
  const P = paperById(A.paperId);
  const S = subj(P.subject);
  app.innerHTML = `<div class="crumbs"><a href="#/">Subjects</a> › <a href="#/subject/${S.key}">${esc(S.name)}</a> › Result</div>
    <h1>Result — ${esc(P.title)}</h1><div id="sum"></div>${hasHindiQs(P) ? langPicker() : ''}<div id="rev"></div>`;
  let filter = 'all';
  let aiState = null;   // null | 'run' | 'fail'
  const aiLive = () => location.hash === '#/result/' + A.id;
  function aiBanner(r) {
    if (aiState === 'run') return '<p class="aibar run" style="margin-top:10px"><span class="spin"></span> <b>AI examiner is marking your written answers…</b> your score will update in a moment.</p>';
    if (r.selfAi) {
      const twice = r.rows.filter(x => x.src === 'ai' && x.counted && A.ai && A.ai[x.q.id] && (A.ai[x.q.id].models || []).length >= 2).length;     // only claim a second opinion that really happened
      const check = twice === r.selfAi ? ', double-checked by a second model' : twice ? ` (${twice} double-checked by a second model)` : '';
      return `<p class="aibar" style="margin-top:10px">🤖 <b>${r.selfAi}</b> written answer(s) were marked by the AI examiner${check}. Disagree? Change the marks in the review — yours always win.</p>`;
    }
    if (aiState === 'fail') return '<p class="small muted" style="margin-top:10px">The AI examiner is busy right now, so the built-in checker was used. Reopen this result later to try the AI examiner again.</p>';
    return '';
  }
  /* Written answers that nobody has marked yet go to the AI examiner. Silent failure: the rule-based marks stay. */
  async function runAI() {
    if (!window.AIG || !AIG.enabled() || aiRunning.has(A.id)) return;
    const todo = [];
    qsOf(A).forEach(q => { const v = A.answers[q.id]; if (q.type === 'self' && isAns(v) && !(A.self && A.self[q.id] != null) && !(A.ai && A.ai[q.id])) todo.push({ q, answer: v, key: canon(A, q.id) }); });
    if (!todo.length) return;
    aiRunning.add(A.id); aiState = 'run'; summary();
    let res = null; try { res = await AIG.grade(todo); } catch (e) { res = null; }
    aiRunning.delete(A.id);
    if (res) {
      A.ai = Object.assign({}, A.ai, res);
      const all = rawAttempts().slice(); const i = all.findIndex(a => a.id === A.id); if (i >= 0) { all[i].ai = A.ai; saveAttempts(all); }
    }
    aiState = res && Object.keys(res).length === todo.length ? null : 'fail';
    if (aiLive()) { const y = window.scrollY; summary(); review(); window.scrollTo(0, y); }
  }

  function summary() {
    const r = evaluate(A), g = gradeOf(r.pct), passed = r.pct >= BOARD.passPercent;
    const sk = streaks(attempts());
    const weakChaps = P.kind === 'practice' ? [] : Object.entries(r.chaps).filter(e => e[1].tot >= 2 && e[1].got / e[1].tot < .6).sort((a, b) => a[1].got / a[1].tot - b[1].got / b[1].tot).slice(0, 3).map(e => e[0]);
    document.getElementById('sum').innerHTML = `
    <div class="card"><div class="score">
      <div class="ring ${g.cls}" style="--p:${Math.max(0, r.pct)}"><div><div><b>${fmt(r.got)}</b><br><span class="muted">/ ${r.total}</span></div></div></div>
      <div style="flex:1;min-width:260px"><h2 style="margin-bottom:4px">${fmt(r.pct)}% — ${g.label}</h2>
        <span class="chip ${passed ? 'ok' : 'bad'}">${passed ? (BOARD.passYes || 'PASS') : (BOARD.passNo || 'BELOW PASS MARK')} (${BOARD.passName || 'pass'} ${BOARD.passPercent}%)</span>${variantLabel(A) ? ` <span class="chip gray">${esc(variantLabel(A))}</span>` : ''}
        ${aiBanner(r)}
        ${r.selfAuto ? `<p class="small" style="margin-top:10px">✅ <b>${r.selfAuto}</b> written answer(s) were checked automatically against the model answer. Disagree with one? Change its marks in the review below — your marks always win.</p>` : ''}
        ${r.selfPending ? `<p class="small" style="margin-top:10px"><b>${r.selfPending}</b> written answer(s) cannot be checked automatically (drawings, proofs, long explanations) — scroll to the review and award yourself marks against the model answer. Score updates live.</p>` : ''}
        <p class="small muted">Time taken: ${dur(r.secsTaken)} of ${dur(A.endsAt - A.startedAt === 0 ? 0 : (A.endsAt - A.startedAt) / 1000)}${A.timedOut ? ' · <b>⏰ time was up, so the paper was submitted automatically</b>' : ''}${sk.cur ? ` · <b>🔥 ${sk.cur}-day streak</b>` : ''}</p></div>
      <div class="kpis"><div class="kpi"><b style="color:var(--ok)">${r.correct}</b>auto-marked correct</div><div class="kpi"><b style="color:var(--bad)">${r.wrong}</b>incorrect</div>
        <div class="kpi"><b>${r.skip}</b>not attempted</div>${r.selfDone + r.selfPending ? `<div class="kpi"><b style="color:var(--warn)">${r.selfDone + r.selfPending}</b>written${r.selfPending ? ` (${r.selfPending} to mark)` : ' — all marked'}</div>` : ''}</div>
    </div></div>
    ${timePanel(A, r)}
    <div class="grid g2" style="margin-top:16px">
      <div class="card"><h3>Section-wise</h3><table>${Object.entries(r.secs).map(([k, v]) => `<tr><td>${esc(k)}</td><td class="nowrap">${fmt(v.got)} / ${v.tot}</td><td>${bar(v.got, v.tot)}</td></tr>`).join('')}</table></div>
      <div class="card"><h3>Chapter-wise (weakest first)</h3><table>${Object.entries(r.chaps).sort((a, b) => a[1].got / a[1].tot - b[1].got / b[1].tot).map(([k, v]) => `<tr><td>${esc(k)}</td><td class="nowrap">${fmt(v.got)} / ${v.tot}</td><td>${bar(v.got, v.tot)}</td></tr>`).join('')}</table></div>
    </div>
    <div style="margin:16px 0;display:flex;gap:8px;flex-wrap:wrap"><a class="btn pri" href="#/report/${A.id}">🖨 Report card (print / PDF)</a>${P.kind === 'practice' ? `<button class="btn" data-practice="${esc((A.variant && A.variant.chapters || []).join('|'))}" title="A new set of questions from the same chapters">↻ Practice again</button>` : `<button class="btn" data-retake="fresh" title="${BOARD.alwaysMix ? 'A new set of questions on the same chapters' : 'A fresh mix: new questions you have not seen, from the other mocks of this subject'}">↻ Retake with new questions</button>${weakChaps.length ? `<button class="btn" data-practice="${esc(weakChaps.join('|'))}" title="A short drill on the chapters you lost most marks in">🎯 Practice weak chapters</button>` : ''}`}<button class="btn" data-go="#/progress">My progress</button><button class="btn" data-go="#/history">All my results</button></div>
    <div class="rvhead"><h2 style="margin:0">Answer review &amp; worked solutions</h2><button class="btn sm noprint" id="printrev">🖨 Print review with solutions</button></div>
    <div class="filters">${[['all', 'All'], ['wrong', 'Incorrect'], ['skip', 'Not attempted'], ['self', 'Written answers'], ['correct', 'Correct']].map(f => `<button class="btn sm ${filter === f[0] ? 'pri' : ''}" data-f="${f[0]}">${f[1]}</button>`).join('')}</div>`;
    document.querySelectorAll('#sum [data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
    document.querySelectorAll('#sum [data-retake]').forEach(b => b.onclick = () => startAttempt(P, A.mode, b.dataset.retake));
    document.querySelectorAll('#sum [data-practice]').forEach(b => b.onclick = () => startPractice(P.subject, b.dataset.practice.split('|').filter(Boolean)));
    document.getElementById('printrev').onclick = () => window.print();
    document.querySelectorAll('[data-f]').forEach(b => b.onclick = () => { filter = b.dataset.f; summary(); review(); });
    return r;
  }
  /* ---- AI tutor: one small chat per question, kept while this page is open ---- */
  const chats = new Map(), tinfo = new Map();
  const TERR = { off: 'The AI tutor is not switched on for this site.', old: 'The AI tutor is not live yet on the server — the site owner needs to redeploy the Worker. Everything else works.', busy: 'The tutor is busy right now. Please try again in a minute.', limit: 'You have asked a lot of questions this hour — take a short break and try again.', signin: 'Please sign in to use the AI tutor.', net: 'Could not reach the tutor. Check your internet and try again.' };
  const chatOf = id => { let c = chats.get(id); if (!c) { c = { open: false, msgs: [], busy: false, err: '', draft: '' }; chats.set(id, c); } return c; };
  /* Small safe markdown renderer for the tutor: everything is HTML-escaped first, then headings (#..######), **bold**, *italic*, `code`,
     ``` code blocks, bullet / numbered lists, > quotes, --- rules, pipe tables and paragraphs are turned into tags. Currency signs (₹ $) and
     all other symbols are left exactly as written. */
  const mdInline = s => {
    const codes = []; let h = esc(s).replace(/`([^`\n]+)`/g, (m, c) => '\u0000' + (codes.push(c) - 1) + '\u0000');
    h = h.replace(/\*\*([^*\n]+?)\*\*/g, '<b>$1</b>').replace(/__([^_\n]+?)__/g, '<b>$1</b>').replace(/(^|[^*\w])\*([^*\s][^*\n]*?)\*(?!\*)/g, '$1<i>$2</i>').replace(/~~([^~\n]+?)~~/g, '<s>$1</s>');
    return h.replace(/\u0000(\d+)\u0000/g, (m, i) => '<code>' + codes[+i] + '</code>');
  };
  function mdLite(t) {
    const L = String(t == null ? '' : t).replace(/\r/g, '').split('\n'), out = [];
    const HR = /^\s*([-*_])(\s*\1){2,}\s*$/, HD = /^\s{0,3}(#{1,6})\s+(.*?)\s*#*\s*$/, LI = /^(\s*)([-*+•]|\d+[.)])\s+(.*)$/, BQ = /^\s*>\s?(.*)$/, TS = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/;
    const cells = r => r.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
    const starts = (l, n) => HR.test(l) || HD.test(l) || LI.test(l) || BQ.test(l) || /^\s*```/.test(l) || (l.includes('|') && n != null && TS.test(n));
    for (let i = 0; i < L.length;) {
      const l = L[i];
      if (!l.trim()) { i++; continue; }
      if (/^\s*```/.test(l)) { const b = []; i++; while (i < L.length && !/^\s*```/.test(L[i])) b.push(L[i++]); i++; out.push('<pre><code>' + esc(b.join('\n')) + '</code></pre>'); continue; }
      let m = HD.exec(l);
      if (m) { out.push('<div class="mdh mdh' + Math.min(m[1].length, 4) + '">' + mdInline(m[2]) + '</div>'); i++; continue; }
      if (l.includes('|') && i + 1 < L.length && TS.test(L[i + 1]) && !HR.test(l)) {
        const head = cells(l); i += 2; const rows = [];
        while (i < L.length && L[i].includes('|') && L[i].trim()) rows.push(cells(L[i++]));
        out.push('<div class="mdtw"><table class="mdt"><tr>' + head.map(c => '<th>' + mdInline(c) + '</th>').join('') + '</tr>' + rows.map(r => '<tr>' + r.map(c => '<td>' + mdInline(c) + '</td>').join('') + '</tr>').join('') + '</table></div>'); continue;
      }
      if (HR.test(l)) { out.push('<hr>'); i++; continue; }
      if (BQ.test(l)) { const b = []; while (i < L.length && BQ.test(L[i])) b.push(mdInline(BQ.exec(L[i++])[1])); out.push('<blockquote>' + b.join('<br>') + '</blockquote>'); continue; }
      m = LI.exec(l);
      if (m) {
        const ord = /\d/.test(m[2]), items = [];
        while (i < L.length) {
          const x = LI.exec(L[i]);
          if (x && /\d/.test(x[2]) === ord) { items.push({ ind: x[1].length, h: mdInline(x[3]) }); i++; }
          else if (x) { break; }
          else if (L[i].trim() && /^\s{2,}\S/.test(L[i]) && items.length && !starts(L[i])) { items[items.length - 1].h += '<br>' + mdInline(L[i].trim()); i++; }
          else if (!L[i].trim() && i + 1 < L.length) { const nx = LI.exec(L[i + 1]); if (nx && /\d/.test(nx[2]) === ord) i++; else break; }
          else break;
        }
        const tag = ord ? 'ol' : 'ul', start = ord ? parseInt(m[2], 10) : 1;
        out.push('<' + tag + (ord && start > 1 ? ' start="' + start + '"' : '') + '>' + items.map(x => '<li' + (x.ind >= 2 ? ' class="sub"' : '') + '>' + x.h + '</li>').join('') + '</' + tag + '>'); continue;
      }
      const p = [];
      while (i < L.length && L[i].trim() && (p.length === 0 || !starts(L[i], L[i + 1]))) p.push(mdInline(L[i++]));
      out.push('<p>' + p.join('<br>') + '</p>');
    }
    return out.join('');
  }
  function tutorHtml(q) {
    if (!window.AIG || !AIG.enabled()) return '';
    const c = chatOf(q.id), info = tinfo.get(q.id) || {};
    if (!c.open) return `<div class="tutor"><button class="btn sm tbtn" data-topen="${esc(q.id)}">💬 Ask the AI tutor about this question</button></div>`;
    const chips = c.msgs.length ? '' : `<div class="tchips">${[['Explain this step by step', 'Explain this step by step'], info.attempted ? ['Where did I go wrong?', 'Where exactly did I go wrong, and what should I change?'] : null, ['Give me a similar question', 'Give me a similar practice question to try'], ['समझाओ (हिंदी)', 'इसे सरल हिंदी में समझाओ']].filter(Boolean).map(x => `<button class="chip tchip" data-tsend="${esc(x[1])}" data-tq="${esc(q.id)}">${esc(x[0])}</button>`).join('')}</div>`;
    return `<div class="tutor open"><div class="thead"><b>💬 AI tutor</b><button class="btn sm" data-tclose="${esc(q.id)}" aria-label="Close tutor">✕</button></div>
      <div class="tmsgs" aria-live="polite">${c.msgs.map(m => `<div class="tmsg ${m.role}">${m.role === 'user' ? esc(m.content) : mdLite(m.content)}</div>`).join('')}${c.busy ? (c.live ? `<div class="tmsg assistant live">${mdLite(c.live)}</div>` : '<div class="tmsg assistant"><span class="spin"></span> thinking…</div>') : ''}${c.err ? `<div class="tmsg err">${esc(c.err)}</div>` : ''}</div>
      ${chips}
      <form class="tform" data-tform="${esc(q.id)}"><input type="text" maxlength="700" placeholder="Ask anything about this question…" value="${esc(c.draft)}" ${c.busy ? 'disabled' : ''} aria-label="Your question for the tutor"><button class="btn pri sm" ${c.busy ? 'disabled' : ''}>Ask</button></form>
      <div class="small muted">AI can make mistakes — check with your textbook or teacher.</div></div>`;
  }
  function paintTutor(qid, keepFocus) {
    const host = document.querySelector(`[data-thost="${CSS.escape(qid)}"]`), info = tinfo.get(qid); if (!host || !info) return;
    host.innerHTML = tutorHtml(info.q); bindTutor(host);
    const box = host.querySelector('.tmsgs'); if (box) box.scrollTop = box.scrollHeight;
    if (keepFocus) { const i = host.querySelector('.tform input'); if (i && !i.disabled) { i.focus(); const n = i.value.length; i.setSelectionRange(n, n); } }
  }
  async function tutorSend(qid, text) {
    text = String(text || '').trim(); const info = tinfo.get(qid), c = chatOf(qid);
    if (!text || c.busy || !info) return;
    const history = c.msgs.slice(-8).map(m => ({ role: m.role, content: m.content }));
    c.msgs.push({ role: 'user', content: text.slice(0, 700) }); c.draft = ''; c.err = ''; c.busy = true; paintTutor(qid);
    c.live = '';
    const onText = acc => {                       /* words arrive as they are written: update just the growing bubble, not the whole panel */
      const first = !c.live; c.live = acc;
      if (first) return paintTutor(qid);
      const host = document.querySelector(`[data-thost="${CSS.escape(qid)}"]`), el = host && host.querySelector('.tmsg.live'); if (!el) return;
      el.innerHTML = mdLite(acc); const box = host.querySelector('.tmsgs'); if (box) box.scrollTop = box.scrollHeight;
    };
    let r; try { r = await AIG.tutor({ q: info.q, answer: info.ans, awarded: info.got, history, message: text }, onText); } catch (e) { r = { error: 'net' }; }
    c.busy = false; c.live = '';
    const code = r && r.error;
    if (r && r.reply) c.msgs.push({ role: 'assistant', content: r.reply });
    else if (code === 'limit' || code === 'signin' || code === 'off') { c.err = TERR[code]; c.msgs.pop(); c.draft = text; }
    else {                                        /* service old / down / busy / offline: answer from the built-in tutor instead of showing an error */
      let rep = ''; try { rep = AIG.offlineTutor({ q: info.q, answer: info.ans, message: text }); } catch (e) {}
      if (rep) c.msgs.push({ role: 'assistant', content: rep + '\n\n(Built-in tutor: the AI service is not reachable right now, so this comes from the model answer.)' });
      else { c.err = TERR[code] || TERR.busy; c.msgs.pop(); c.draft = text; }
    }
    paintTutor(qid, true);
  }
  function bindTutor(root) {
    root.querySelectorAll('[data-topen]').forEach(b => b.onclick = () => { chatOf(b.dataset.topen).open = true; paintTutor(b.dataset.topen, true); });
    root.querySelectorAll('[data-tclose]').forEach(b => b.onclick = () => { chatOf(b.dataset.tclose).open = false; paintTutor(b.dataset.tclose); });
    root.querySelectorAll('[data-tsend]').forEach(b => b.onclick = () => tutorSend(b.dataset.tq, b.dataset.tsend));
    root.querySelectorAll('[data-tform]').forEach(f => {
      const inp = f.querySelector('input'), id = f.dataset.tform;
      inp.oninput = () => { chatOf(id).draft = inp.value; };
      f.onsubmit = e => { e.preventDefault(); tutorSend(id, inp.value); };
    });
  }
  function ansDisplay(q, v) {
    if (!isAns(v)) return '<span class="muted">Not attempted</span>';
    return q.type === 'mcq' ? esc(letter(mcqIdx(v)) + '. ') + q.options[mcqIdx(v)] : esc(v);
  }
  function review() {
    const r = evaluate(A);
    const rows = r.rows.map((x, i) => Object.assign({ n: i + 1 }, x)).filter(x => filter === 'all' || (x.st === filter && (x.counted || x.st !== 'skip')));
    document.getElementById('rev').innerHTML = rows.length ? rows.map(({ q, st, got, counted, n, t, chg, src: msrc, auto, need: needN }) => {
      const v = A.answers[q.id];
      tinfo.set(q.id, { q, attempted: isAns(v), got: counted ? got : null, ans: !isAns(v) ? '' : q.type === 'mcq' ? letter(mcqIdx(v)) + '. ' + AIG._text(q.options[mcqIdx(v)]) : String(v) });
      let body = '';
      if (q.type === 'mcq') body = q.options.map((o, i) => `<div class="optr ${i === q.answer ? 'right' : ''} ${isAns(v) && mcqIdx(v) === i ? 'mine ' + (i === q.answer ? '' : 'wrong') : ''}"><b>${letter(i)}.</b> ${o} ${i === q.answer ? T('✔ correct') : ''}${isAns(v) && mcqIdx(v) === i && i !== q.answer ? ' ' + T('✘ your answer') : ''}</div>`).join('');
      else if (q.type === 'num') body = `<div class="your"><b>${T('Your answer:')}</b> ${ansDisplay(q, v)}</div><div><b>Correct answer:</b> ${esc(q.accept[0])}</div>`;
      else body = `<div class="your"><b>${T('Your answer:')}</b>\n${ansDisplay(q, v)}</div>`;
      const manual = A.self && A.self[q.id] != null;
      const ai = A.ai && A.ai[q.id];
      const why = !auto ? '' : auto.kind === 'answer' ? `Matched ${fmt(auto.hit)} of ${auto.pts} final answer${auto.pts > 1 ? 's' : ''} in the model answer.` : `Covers ${fmt(auto.hit)} of ${auto.pts} key points of the model answer.`;
      const mark = q.type === 'self' && isAns(v) ? `<div class="selfmark ${msrc || 'pending'}"><b>${manual ? 'Your marks' : ai ? '🤖 AI examiner' : auto ? 'Auto-checked' : 'Award yourself marks'}:</b>
        <select data-q="${esc(q.id)}"><option value="">${ai ? `AI: ${fmt(ai.m)} / ${q.marks}` : auto ? `Auto: ${fmt(auto.marks)} / ${q.marks}` : '— choose —'}</option>${Array.from({ length: q.marks * 2 + 1 }, (_, i) => i / 2).map(m => `<option value="${m}" ${manual && A.self[q.id] === m ? 'selected' : ''}>${m} / ${q.marks}</option>`).join('')}</select>
        <span class="small muted">${manual ? (auto || ai ? `You changed the marks — pick “${ai ? 'AI' : 'Auto'}” to go back.` : 'Compare with the model answer below.') : ai ? 'Marked by the AI examiner. Not right? Change it.' : auto ? esc(why) + ' Not right? Change it.' : 'This one cannot be auto-checked — compare with the model answer below.'}</span></div>` : '';
      const src = (q.year ? `<span class="chip ok">Asked in Board ${esc(q.year)}</span>` : '');
      const extra = !counted ? (st === 'skip' ? '<span class="chip gray" title="This section only asks for some of its questions, and you answered enough others">Optional — you did not need this one</span>' : `<span class="chip gray" title="This section asks for any ${needN}. You answered more, so your best ${needN} were counted and this one is shown for practice only.">Extra answer — not added to your total</span>`) : '';
      const stLabel = st === 'self' ? (msrc === 'ai' ? 'AI-marked' : msrc === 'auto' ? 'Auto-checked' : msrc === 'manual' ? 'Self-marked' : 'Needs your marks') : st === 'skip' ? (counted ? 'Not attempted' : 'Skipped') : st;
      const stCls = st === 'correct' ? 'ok' : st === 'wrong' ? 'bad' : st === 'self' && msrc ? (got >= q.marks ? 'ok' : got > 0 ? 'warn' : 'bad') : 'gray';
      return `<div class="card rev ${st} ${counted ? '' : 'extra'}"><div class="qhead"><div><span class="chip">Q${n}</span> ${diffChip(q)} ${src}${r.tracked ? ` <span class="chip gray" title="Time you spent on this question">⏱ ${dur(t)}</span>` : ''}${chg ? ` <span class="chip gray" title="Times you changed your answer">changed ${chg}×</span>` : ''}</div>
        <div>${extra} <span class="chip ${stCls}">${stLabel}</span> <b${counted || st === 'skip' ? '' : ' class="muted" title="Not added to your total"'}>${counted || st !== 'skip' ? fmt(got) : '–'} / ${q.marks}</b></div></div>
        <div class="qtext">${q.q}</div>${figHtml(q, true)}${body}${mark}
        ${ai && !manual && (ai.fb || (ai.missing || []).length || (ai.steps || []).length) ? `<div class="aifb">${ai.fb ? `<div>${esc(ai.fb)}</div>` : ''}${(ai.steps || []).length ? `<div class="aisteps"><b>${T('How to get full marks, step by step')}</b><ol>${ai.steps.map(x => `<li>${esc(x)}</li>`).join('')}</ol></div>` : ''}${(ai.missing || []).length ? `<div class="small muted">${T('Not covered:')} ${ai.missing.map(esc).join('; ')}</div>` : ''}${ai.tip ? `<div class="aitip">💡 ${esc(ai.tip)}</div>` : ''}</div>` : ''}
        <div class="sol"><b>${T(q.type === 'self' ? 'Model answer, step by step:' : 'Solution:')}</b>${solHtml(q)}</div>
        <div class="thost noprint" data-thost="${esc(q.id)}">${tutorHtml(q)}</div></div>`;
    }).join('') : '<div class="empty">Nothing in this filter.</div>';
    bindTutor(document.getElementById('rev'));
    document.querySelectorAll('[data-q]').forEach(sel => sel.onchange = () => {
      A.self = A.self || {};
      if (sel.value === '') delete A.self[sel.dataset.q]; else A.self[sel.dataset.q] = parseFloat(sel.value);
      const ai = A.ai && A.ai[sel.dataset.q], qq = ai && qsOf(A).find(x => x.id === sel.dataset.q);   // tell the service when a student disagrees with the AI
      if (ai && qq && sel.value !== '' && window.AIG && AIG.report) AIG.report({ id: canon(A, qq.id), max: qq.marks, ai: ai.m, human: parseFloat(sel.value), models: ai.models });
      const all = rawAttempts().slice(); const i = all.findIndex(a => a.id === A.id); if (i >= 0) all[i] = A; saveAttempts(all);
      const y = window.scrollY; summary(); review(); window.scrollTo(0, y);
    });
  }
  summary(); review(); runAI();
}

/* ---------- history ---------- */
function viewHistory() {
  const arr = attempts();
  app.innerHTML = `<h1>My results</h1>${resumeBanner()}` + (arr.length ? `
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px"><a class="btn" href="#/progress">📈 Progress</a><button class="btn" id="csv">⬇ Export CSV</button></div>
    <div class="card"><div class="tscroll"><table><tr><th>Date</th><th>Paper</th><th>Score</th><th>Grade</th><th></th></tr>
    ${arr.map(a => { const P = paperById(a.paperId); const r = evaluate(a), g = gradeOf(r.pct);
      return `<tr><td class="nowrap">${new Date(a.submittedAt).toLocaleString(LOC())}</td><td>${esc(P.title)}<div class="small muted">${esc(modeLabel(P, a.mode))}${variantLabel(a) ? ' · ' + esc(variantLabel(a)) : ''}</div></td><td class="nowrap">${fmt(r.got)} / ${r.total} (${fmt(r.pct)}%)</td><td>${g.label}${r.selfPending ? ' <span class="chip warn">needs your marks</span>' : ''}</td>
      <td class="right nowrap"><a class="btn sm" href="#/result/${a.id}">View</a> <a class="btn sm" href="#/report/${a.id}">Report</a> <button class="btn sm danger" data-del="${a.id}">Delete</button></td></tr>`; }).join('')}</table></div></div>`
    : '<div class="card empty">You have not taken any test yet.<br><br><a class="btn pri" href="#/">Pick a subject</a></div>');
  const csv = document.getElementById('csv'); if (csv) csv.onclick = exportCSV;
  app.querySelectorAll('[data-del]').forEach(b => b.onclick = () => { if (confirm('Delete this result permanently?')) { saveAttempts(rawAttempts().filter(a => a.id !== b.dataset.del)); viewHistory(); } });
}

function exportCSV() {
  const st = student();
  const q = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
  const rows = [['Date', 'Student', 'Email', 'Subject', 'Paper', 'Mode', 'Marks obtained', 'Total marks', 'Percent', 'Grade', 'Result', 'Minutes taken', 'Seconds taken', 'Accuracy %', 'Attempt rate %', 'Self-marking pending']];
  attempts().slice().reverse().forEach(a => {
    const P = paperById(a.paperId), r = evaluate(a), g = gradeOf(r.pct);
    rows.push([new Date(a.submittedAt).toISOString().slice(0, 16).replace('T', ' '), st.name, st.email, subj(P.subject).name, P.title, modeLabel(P, a.mode) + (variantLabel(a) ? ' · ' + variantLabel(a) : ''),
      fmt(r.got), r.total, fmt(r.pct), g.label, r.pct >= BOARD.passPercent ? (BOARD.passYes ? 'On target' : 'Pass') : (BOARD.passNo ? 'Below target' : 'Below pass mark'), Math.round(r.secsTaken / 60), Math.round(r.secsTaken), r.acc == null ? '' : fmt(Math.round(r.acc)), fmt(Math.round(r.attemptRate)), r.selfPending]);
  });
  const blob = new Blob(['﻿' + rows.map(r => r.map(q).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'boardwise-results.csv';
  document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

/* ---------- study metrics: streaks, heatmap, time analysis ---------- */
const dayNo = k => { const [y, m, d] = k.split('-').map(Number); return Math.round(Date.UTC(y, m - 1, d) / 86400000); };
/* A day counts when at least one test was submitted that day. The current streak survives until the end of the day after your last test. */
function streaks(list) {
  const days = {};
  list.forEach(a => { const k = dayKey(a.submittedAt), d = days[k] = days[k] || { n: 0, secs: 0 }; d.n++; d.secs += elapsed(a); });
  const keys = Object.keys(days).sort();
  let longest = 0, run = 0;
  keys.forEach((k, i) => { run = i && dayNo(k) === dayNo(keys[i - 1]) + 1 ? run + 1 : 1; if (run > longest) longest = run; });
  let cur = 0;
  if (keys.length && dayNo(keys[keys.length - 1]) >= dayNo(dayKey(Date.now())) - 1) {
    cur = 1; for (let i = keys.length - 2; i >= 0 && dayNo(keys[i]) === dayNo(keys[i + 1]) - 1; i--) cur++;
  }
  const last30 = keys.filter(k => dayNo(k) > dayNo(dayKey(Date.now())) - 30).length;
  return { days, active: keys.length, cur, longest, last30, today: !!days[dayKey(Date.now())] };
}
function heatmap(days) {
  const end = new Date(); end.setHours(0, 0, 0, 0);
  const d = new Date(end); d.setDate(d.getDate() - 52 * 7 - end.getDay());
  let cols = '', lastM = -1;
  for (let w = 0; w < 53; w++) {
    let cells = '', label = '';
    for (let i = 0; i < 7; i++) {
      if (i === 0 && d.getMonth() !== lastM) { lastM = d.getMonth(); label = d.toLocaleDateString(LOC(), { month: 'short' }); }
      if (d > end) cells += '<i class="hc off"></i>';
      else { const x = days[dayKey(d)], lv = !x ? 0 : Math.min(4, x.n); cells += `<i class="hc l${lv}" data-tip="${esc(dateStr(d) + '\n' + (x ? x.n + ' test' + (x.n > 1 ? 's' : '') + ' · ' + dur(x.secs) : 'No tests'))}"></i>`; }
      d.setDate(d.getDate() + 1);
    }
    cols += `<div class="hcol"><b>${label}</b>${cells}</div>`;
  }
  const dl = '<div class="hcol hdays"><b></b><span></span><span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span></div>';
  return `<div class="heat" id="heat"><div class="hgrid">${dl}${cols}</div></div>
    <div class="hleg small muted">Less <i class="hc l0"></i><i class="hc l1"></i><i class="hc l2"></i><i class="hc l3"></i><i class="hc l4"></i> More <span style="margin-left:8px">(tests submitted per day)</span></div>`;
}
function last14(days) {
  const out = []; const t = new Date(); t.setHours(0, 0, 0, 0);
  for (let i = 13; i >= 0; i--) { const d = new Date(t); d.setDate(d.getDate() - i); const x = days[dayKey(d)]; out.push({ d, m: x ? x.secs / 60 : 0, n: x ? x.n : 0 }); }
  const mx = Math.max(10, ...out.map(o => o.m));
  return `<div class="d14">${out.map(o => `<div class="d14c" tabindex="0" data-tip="${esc(dateStr(o.d) + '\n' + (o.n ? o.n + ' test' + (o.n > 1 ? 's' : '') + ' · ' + dur(o.m * 60) : 'No tests'))}"><i style="height:${Math.max(o.m ? 6 : 2, o.m / mx * 56)}px" class="${o.m ? 'on' : ''}"></i><span>${o.d.toLocaleDateString(undefined, { weekday: 'narrow' })}</span></div>`).join('')}</div>`;
}
function timePanel(A, r) {
  const allot = (A.endsAt - A.startedAt) / 1000, used = Math.min(r.secsTaken, allot), usedPct = allot ? used / allot * 100 : 0;
  const tile = (b, l, t) => `<div class="kpi"${t ? ` title="${esc(t)}"` : ''}><b>${b}</b>${l}</div>`;
  const tiles = [
    tile(dur(used), 'time used (' + fmt(Math.round(usedPct)) + '% of ' + dur(allot) + ')'),
    tile(dur(Math.max(0, allot - used)), 'time left over'),
    tile(r.tried ? dur(used / r.tried) : '–', 'per answered question', 'Wall-clock time divided by the questions you answered'),
    tile(used > 0 ? fmt(Math.round(r.got / (used / 60) * 100) / 100) : '–', 'marks per minute'),
    tile(r.acc == null ? '–' : fmt(Math.round(r.acc)) + '%', 'accuracy', 'Correct ÷ (correct + incorrect) on auto-marked questions'),
    tile(fmt(Math.round(r.attemptRate)) + '%', 'attempt rate', 'Questions answered ÷ questions that counted')
  ];
  let extra = '';
  if (r.tracked) {
    const tq = A.tq || {}, focus = Object.values(tq).reduce((a, b) => a + b, 0);
    tiles.push(tile(dur(focus), 'focused time', 'Time with this page open and in front of you'));
    if (A.hid > 5) tiles.push(tile(dur(A.hid), 'time away', 'Time this page was in the background (another app or tab)'));
    if (r.changes) tiles.push(tile(r.changes, 'answers changed'));
    const timed = r.rows.map((x, i) => Object.assign({ n: i + 1 }, x)).filter(x => x.t > 0);
    const mx = Math.max(1, ...timed.map(x => x.t)), avg = timed.length ? timed.reduce((a, x) => a + x.t, 0) / timed.length : 0;
    const strip = `<div class="tstrip">${r.rows.map((x, i) => `<div class="tb ${x.st}" tabindex="0" data-tip="${esc('Q' + (i + 1) + ' · ' + dur(x.t) + '\n' + (x.st === 'skip' ? 'not attempted' : x.st === 'self' ? 'written answer' : x.st === 'wrong' ? 'incorrect' : x.st))}"><i style="height:${Math.max(x.t ? 4 : 1, x.t / mx * 60)}px"></i></div>`).join('')}</div>
      <div class="small muted">Time on each question, in order (tallest bar = ${dur(mx)}; hover or tap a bar for details). <span class="dot ok"></span>correct <span class="dot bad"></span>incorrect <span class="dot warn"></span>written <span class="dot gray"></span>not attempted</div>`;
    const slow = timed.slice().sort((a, b) => b.t - a.t).slice(0, 3);
    const avgOf = f => { const xs = timed.filter(f); return xs.length ? xs.reduce((a, x) => a + x.t, 0) / xs.length : null; };
    const ac = avgOf(x => x.st === 'correct'), aw = avgOf(x => x.st === 'wrong');
    const tips = [];
    if (allot && used / allot < .5 && r.wrong + r.skip > 0) tips.push(`You used only ${fmt(Math.round(usedPct))}% of the time but missed ${r.wrong + r.skip} question(s). Spend spare minutes re-checking answers.`);
    if (usedPct > 95 && r.skip > 0) tips.push(`You ran out of time with ${r.skip} question(s) unattempted. Skip a long question and come back to it.`);
    if (slow[0] && avg && slow[0].t > avg * 2.5 && slow[0].t > 60) tips.push(`Q${slow[0].n} took ${dur(slow[0].t)} — about ${fmt(Math.round(slow[0].t / avg * 10) / 10)}× your average of ${dur(avg)}.`);
    if (ac != null && aw != null && aw < ac * .6) tips.push(`Your wrong answers took ${dur(aw)} on average against ${dur(ac)} for correct ones — you may be rushing; read the options again.`);
    if (ac != null && aw != null && aw > ac * 1.6) tips.push(`Wrong answers took longer (${dur(aw)}) than correct ones (${dur(ac)}) — those topics need revision, not more time.`);
    const secRows = Object.entries(r.secs).map(([k, v]) => `<tr><td>${esc(k)}</td><td class="nowrap">${dur(r.tsecs[k] || 0)}</td><td class="nowrap">${fmt(v.got)} / ${v.tot}</td></tr>`).join('');
    extra = `<div style="margin-top:12px">${strip}</div>
      ${slow.length ? `<p class="small" style="margin:10px 0 4px"><b>Slowest:</b> ${slow.map(x => `Q${x.n} (${dur(x.t)})`).join(' · ')}</p>` : ''}
      ${tips.length ? `<ul class="clean small" style="margin:6px 0 0">${tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
      <div class="tscroll" style="margin-top:10px"><table><tr><th>Section</th><th>Time spent</th><th>Marks</th></tr>${secRows}</table></div>`;
  } else extra = '<p class="small muted" style="margin:10px 0 0">Per-question timing was not recorded for this older attempt.</p>';
  return `<div class="card" style="margin-top:16px"><h3>Time &amp; pace</h3>
    <div class="bar ${usedPct > 95 ? 'low' : usedPct > 80 ? 'mid' : 'hi'}" style="margin-bottom:12px"><i style="width:${Math.min(100, usedPct)}%"></i></div>
    <div class="kpis" style="min-width:0">${tiles.join('')}</div>${extra}</div>`;
}

function activityCards(list) {
  const sk = streaks(list.map(x => x.a));
  const tile = (b, l) => `<div class="kpi"><b>${b}</b>${l}</div>`;
  const tot = list.reduce((a, x) => a + x.r.secsTaken, 0);
  const sum = f => list.reduce((a, x) => a + f(x.r), 0);
  const cor = sum(r => r.correct), wr = sum(r => r.wrong), nq = sum(r => r.nQ), tried = sum(r => r.tried), got = sum(r => r.got);
  const half = Math.max(1, Math.min(5, Math.floor(list.length / 2)));
  const recent = list.slice(-half).reduce((a, x) => a + x.r.pct, 0) / half;
  const before = list.length > half ? list.slice(0, -half).reduce((a, x) => a + x.r.pct, 0) / (list.length - half) : null;
  const delta = before == null ? null : recent - before;
  const parts = [['Morning', 5, 12], ['Afternoon', 12, 17], ['Evening', 17, 21], ['Night', 21, 29]].map(([n, a, b]) => {
    const xs = list.filter(x => { let h = new Date(x.a.startedAt).getHours(); if (h < 5) h += 24; return h >= a && h < b; });
    return { n, c: xs.length, avg: xs.length ? xs.reduce((s, x) => s + x.r.pct, 0) / xs.length : null };
  });
  const bestPart = parts.filter(p => p.c >= 2).sort((a, b) => b.avg - a.avg)[0];
  const subRows = subjectStats(list).map(x => {
    const xs = list.filter(y => y.key === x.s.key), secs = xs.reduce((a, y) => a + y.r.secsTaken, 0), c = xs.reduce((a, y) => a + y.r.correct, 0), w = xs.reduce((a, y) => a + y.r.wrong, 0), g = xs.reduce((a, y) => a + y.r.got, 0);
    return `<tr><td>${x.s.icon} ${esc(x.s.name)}</td><td>${x.n}</td><td class="nowrap">${dur(secs)}</td><td class="nowrap">${dur(secs / x.n)}</td><td>${c + w ? fmt(Math.round(c / (c + w) * 100)) + '%' : '–'}</td><td>${secs > 0 ? fmt(Math.round(g / (secs / 60) * 100) / 100) : '–'}</td></tr>`;
  }).join('');
  return `<div class="card" style="margin-bottom:16px"><h3>Streaks &amp; activity</h3>
    <div class="kpis" style="min-width:0;margin-bottom:12px">${tile('🔥 ' + sk.cur, sk.cur ? 'day streak' + (sk.today ? '' : ' — test today to keep it') : 'day streak — start one today')}${tile('🏆 ' + sk.longest, 'longest streak (days)')}${tile(sk.active, 'active days')}${tile(sk.last30 + ' / 30', 'days active, last 30')}</div>
    ${heatmap(sk.days)}
    <h3 style="margin-top:16px">Last 14 days — test time</h3>${last14(sk.days)}</div>
  <div class="card" style="margin-bottom:16px"><h3>Study metrics</h3>
    <div class="kpis" style="min-width:0">${tile(dur(tot), 'total test time')}${tile(dur(tot / list.length), 'average per test')}${tile(cor + wr ? fmt(Math.round(cor / (cor + wr) * 100)) + '%' : '–', 'accuracy (auto-marked)')}${tile(nq ? fmt(Math.round(tried / nq * 100)) + '%' : '–', 'attempt rate')}${tile(tot > 0 ? fmt(Math.round(got / (tot / 60) * 100) / 100) : '–', 'marks per minute')}${tile(delta == null ? '–' : (delta >= 0 ? '▲ ' : '▼ ') + fmt(Math.round(Math.abs(delta) * 10) / 10) + ' pts', 'last ' + half + ' vs earlier tests')}</div>
    ${bestPart ? `<p class="small" style="margin:12px 0 0">You score best in the <b>${bestPart.n.toLowerCase()}</b> (${fmt(Math.round(bestPart.avg))}% average over ${bestPart.c} tests). ${parts.filter(p => p.c).map(p => `${p.n}: ${p.c}`).join(' · ')}.</p>` : ''}
    <div class="tscroll" style="margin-top:12px"><table><tr><th>Subject</th><th>Tests</th><th>Total time</th><th>Avg / test</th><th>Accuracy</th><th>Marks / min</th></tr>${subRows}</table></div></div>`;
}

/* ---------- progress dashboard ---------- */
function collect() {
  return attempts().slice().sort((a, b) => a.submittedAt - b.submittedAt).map(a => {
    const P = paperById(a.paperId); return { a, P, key: P.subject, r: evaluate(a) };
  });
}
function subjectStats(list) {
  return SUBJECTS.map(s => {
    const xs = list.filter(x => x.key === s.key); if (!xs.length) return null;
    const pcts = xs.map(x => x.r.pct);
    const chaps = {};
    xs.forEach(x => Object.entries(x.r.chaps).forEach(([k, v]) => { const c = chaps[k] = chaps[k] || { got: 0, tot: 0 }; c.got += v.got; c.tot += v.tot; }));
    return { s, n: xs.length, pcts, best: Math.max(...pcts), avg: pcts.reduce((a, b) => a + b, 0) / pcts.length, latest: pcts[pcts.length - 1], chaps, bestX: xs.reduce((m, x) => x.r.pct > m.r.pct ? x : m, xs[0]) };
  }).filter(Boolean);
}

function viewProgress() {
  const list = collect(), st = student(), ss = subjectStats(list);
  const weak = [];
  ss.forEach(x => Object.entries(x.chaps).forEach(([k, v]) => { if (v.tot >= 3) weak.push({ s: x.s, k, got: v.got, tot: v.tot, p: v.got / v.tot * 100 }); }));
  weak.sort((a, b) => a.p - b.p);
  const all = list.map(x => x.r.pct), avg = all.length ? all.reduce((a, b) => a + b, 0) / all.length : 0;
  app.innerHTML = `
  <h1>My progress</h1>${resumeBanner()}
  <p class="small muted noprint">Showing results for <b>${esc(st.name || st.email)}</b> only. Your details for report cards are on your <a href="#/profile">profile</a>.</p>
  ${list.length ? `
  <div class="kpis" style="margin:16px 0"><div class="kpi"><b>${list.length}</b>tests taken</div><div class="kpi"><b>${fmt(avg)}%</b>average score</div>
    <div class="kpi"><b>${fmt(Math.max(...all))}%</b>best score</div><div class="kpi"><b>${ss.length} / ${SUBJECTS.length}</b>subjects tried</div></div>
  ${activityCards(list)}
  <div class="grid g2 fit">
    <div class="card"><h3>Score trend (all tests, oldest → latest)</h3>${trendSvg(list.slice(-20).map(x => ({ v: x.r.pct, t: x.P.title, d: x.a.submittedAt })), 560, 190)}<p class="small muted" style="margin:4px 0 0">Red dashed line = pass mark (${BOARD.passPercent}%). Shows up to the last 20 tests.</p></div>
    <div class="card"><h3>Focus first — weakest chapters</h3>${weak.length ? `<div class="tscroll"><table class="wk">${weak.slice(0, 8).map(w => `<tr><td>${esc(w.k)}<div class="small muted">${esc(w.s.name)}</div></td><td class="nowrap">${fmt(w.p)}%</td><td style="min-width:70px">${bar(w.got, w.tot)}</td><td class="right"><button class="btn sm" data-prac="${esc(w.s.key)}" data-chap="${esc(w.k)}" title="A short drill on this chapter">Practice ›</button></td></tr>`).join('')}</table></div><p class="small muted" style="margin:8px 0 0">Each button builds a drill of up to 12 questions from that chapter, new questions first.</p>` : '<p class="muted">Not enough data yet.</p>'}</div>
  </div>
  <div class="card" style="margin-top:16px"><h3>Subject-wise</h3><div class="tscroll"><table><tr><th>Subject</th><th>Tests</th><th>Best</th><th>Average</th><th>Latest</th><th>Trend</th><th>Grade (best)</th></tr>
    ${ss.map(x => `<tr><td>${x.s.icon} <a href="#/subject/${x.s.key}">${esc(x.s.name)}</a></td><td>${x.n}</td><td>${fmt(x.best)}%</td><td>${fmt(x.avg)}%</td><td>${fmt(x.latest)}%</td><td>${spark(x.pcts)}</td><td><span class="chip ${gradeOf(x.best).min >= 45 ? 'ok' : gradeOf(x.best).min >= BOARD.passPercent ? 'warn' : 'bad'}">${gradeOf(x.best).label}</span></td></tr>`).join('')}</table></div>
    <p class="small muted" style="margin-bottom:0">Includes part-paper and single-section attempts, so compare full papers with full papers where you can.</p></div>
  <div style="margin:16px 0;display:flex;gap:8px;flex-wrap:wrap"><a class="btn pri" href="#/report">🖨 Overall report card (print / PDF)</a><button class="btn" id="csv">⬇ Export CSV</button><a class="btn" href="#/history">All results</a></div>`
  : '<div class="card empty" style="margin-top:16px">No tests yet — your scores, trend and weak chapters will show up here after your first test.<br><br><a class="btn pri" href="#/">Pick a subject</a></div>'}`;
  const csv = document.getElementById('csv'); if (csv) csv.onclick = exportCSV;
  document.querySelectorAll('[data-prac]').forEach(b => b.onclick = () => startPractice(b.dataset.prac, [b.dataset.chap]));
  const heat = document.getElementById('heat'); if (heat) heat.scrollLeft = heat.scrollWidth;
}

/* ---------- report cards (print / save as PDF) ---------- */
/* A paper may carry `board` (a key in BOARDS) and `level`; papers without them are Maharashtra SSC Class X. */
const paperBoardLabel = P => { const b = boardOf((P && P.board) || 'msbshse'); return (b ? b.name : 'Maharashtra SSC') + ' · ' + ((P && P.level) || 'Class X'); };
function reportHead(title, papers) {
  const st = student();
  const labels = [...new Set((papers && papers.length ? papers : [null]).map(paperBoardLabel))];
  const where = labels.length === 1 ? labels[0] : 'Multiple boards';
  return `<div class="rhead"><div><div class="rbrand">BoardWise · ${esc(where)}</div><h1 style="margin:2px 0 0">${esc(title)}</h1></div><div class="small right">Generated ${dateStr(Date.now())}</div></div>
  <table class="rinfo"><tr><td><b>Student</b></td><td>${st.name ? esc(st.name) : '<span class="muted">— (add on your <a href="#/profile">Profile</a> page)</span>'}</td><td><b>School</b></td><td>${esc(st.school) || '—'}</td><td><b>Seat / roll no.</b></td><td>${esc(st.seat) || '—'}</td></tr></table>`;
}
const reportFoot = '<p class="small muted rfoot">Practice report generated by BoardWise from tests taken on this site. Marks for written answers are self-awarded by the student. This is <b>not</b> an official board or school document.</p>';

function viewReport(id) {
  if (!id) return viewOverallReport();
  const A = attempts().find(a => a.id === id); if (!A) return go('#/history');
  const P = paperById(A.paperId), S = subj(P.subject), r = evaluate(A), g = gradeOf(r.pct), passed = r.pct >= BOARD.passPercent;
  const chaps = Object.entries(r.chaps).filter(([, v]) => v.tot > 0).sort((a, b) => a[1].got / a[1].tot - b[1].got / b[1].tot);
  const strong = chaps.slice(-2).reverse().filter(c => c[1].got / c[1].tot >= .6), weak = chaps.slice(0, 3).filter(c => c[1].got / c[1].tot < .6);
  app.innerHTML = `<div class="noprint" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px"><button class="btn pri" id="print">🖨 Print / Save as PDF</button><a class="btn" href="#/result/${A.id}">‹ Back to result</a></div>
  <div class="card report">${reportHead('Practice Test Report Card', [P])}
    <table class="rinfo"><tr><td><b>Subject</b></td><td>${esc(S.name)}</td><td><b>Paper</b></td><td colspan="3">${esc(P.title)} — ${esc(modeLabel(P, A.mode))}${variantLabel(A) ? ' · ' + esc(variantLabel(A)) : ''}${P.kind === 'pyq' ? ' (Board ' + esc(P.year) + ', third-party copy)' : P.kind === 'practice' ? ' (practice set)' : ' (mock test)'}</td></tr>
    <tr><td><b>Date</b></td><td>${dateStr(A.submittedAt)}</td><td><b>Time taken</b></td><td>${dur(r.secsTaken)} of ${dur((A.endsAt - A.startedAt) / 1000)}</td><td><b>Pass mark</b></td><td>${BOARD.passPercent}%</td></tr></table>
    <div class="rscore"><div class="rbig"><b>${fmt(r.got)}</b> / ${r.total}</div><div class="rbig2">${fmt(r.pct)}%</div>
      <div><span class="chip ${g.min >= 45 ? 'ok' : g.min >= 35 ? 'warn' : 'bad'}" style="font-size:1rem">${g.label}</span> <span class="chip ${passed ? 'ok' : 'bad'}" style="font-size:1rem">${passed ? (BOARD.passYes || 'PASS') : (BOARD.passNo || 'BELOW PASS MARK')}</span></div></div>
    ${r.selfPending ? `<p class="small"><b>Note:</b> ${r.selfPending} written answer(s) could not be auto-checked and were not marked yet, so they count as 0.</p>` : ''}
    <h3>Section-wise marks</h3><table class="rtab"><tr><th>Section</th><th>Marks</th><th>%</th><th style="width:30%">Performance</th></tr>${Object.entries(r.secs).map(([k, v]) => `<tr><td>${esc(k)}</td><td class="nowrap">${fmt(v.got)} / ${v.tot}</td><td>${fmt(v.tot ? v.got / v.tot * 100 : 0)}</td><td>${bar(v.got, v.tot)}</td></tr>`).join('')}
      <tr><td><b>Total</b></td><td><b>${fmt(r.got)} / ${r.total}</b></td><td><b>${fmt(r.pct)}</b></td><td></td></tr></table>
    <h3>Chapter-wise marks</h3><table class="rtab"><tr><th>Chapter</th><th>Marks</th><th>%</th><th style="width:30%">Performance</th></tr>${chaps.map(([k, v]) => `<tr><td>${esc(k)}</td><td class="nowrap">${fmt(v.got)} / ${v.tot}</td><td>${fmt(v.tot ? v.got / v.tot * 100 : 0)}</td><td>${bar(v.got, v.tot)}</td></tr>`).join('')}</table>
    <h3>Remarks</h3><ul class="clean">
      ${strong.length ? `<li><b>Strong:</b> ${strong.map(c => esc(c[0])).join('; ')}.</li>` : ''}
      ${weak.length ? `<li><b>Revise first:</b> ${weak.map(c => esc(c[0])).join('; ')}.</li>` : '<li>No chapter below 60% in this test.</li>'}
      <li>${r.wrong} answer(s) wrong and ${r.skip} left unattempted out of the questions that counted.</li>
      <li>Accuracy ${r.acc == null ? '–' : fmt(Math.round(r.acc)) + '%'} on auto-marked answers · attempt rate ${fmt(Math.round(r.attemptRate))}%${r.tried ? ` · about ${dur(r.secsTaken / r.tried)} per answered question` : ''}.</li></ul>
    ${reportFoot}</div>`;
  document.getElementById('print').onclick = () => window.print();
}

function viewOverallReport() {
  const list = collect(), ss = subjectStats(list);
  app.innerHTML = `<div class="noprint" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px"><button class="btn pri" id="print">🖨 Print / Save as PDF</button><a class="btn" href="#/progress">‹ Back to progress</a></div>
  <div class="card report">${reportHead('Overall Progress Report', list.map(x => x.P))}
  ${ss.length ? (() => {
    const bestSum = ss.reduce((a, x) => a + x.best, 0) / ss.length, avgAll = list.reduce((a, x) => a + x.r.pct, 0) / list.length;
    const weak = []; ss.forEach(x => Object.entries(x.chaps).forEach(([k, v]) => { if (v.tot >= 3) weak.push({ s: x.s, k, p: v.got / v.tot * 100, got: v.got, tot: v.tot }); })); weak.sort((a, b) => a.p - b.p);
    return `<div class="rscore"><div class="rbig"><b>${list.length}</b> tests</div><div class="rbig2">${fmt(avgAll)}% avg</div><div class="small">Average of each subject's best score: <b>${fmt(bestSum)}%</b> (${ss.length} of ${SUBJECTS.length} subjects attempted)</div></div>
    <h3>Subject-wise</h3><table class="rtab"><tr><th>Subject</th><th>Tests</th><th>Best</th><th>Average</th><th>Latest</th><th>Grade (best)</th><th>Result</th></tr>
    ${ss.map(x => `<tr><td>${esc(x.s.name)}</td><td>${x.n}</td><td>${fmt(x.best)}%</td><td>${fmt(x.avg)}%</td><td>${fmt(x.latest)}%</td><td>${gradeOf(x.best).label}</td><td>${x.best >= BOARD.passPercent ? 'Pass' : 'Below pass mark'}</td></tr>`).join('')}</table>
    <h3>Score trend</h3>${trendSvg(list.slice(-20).map(x => ({ v: x.r.pct, t: x.P.title, d: x.a.submittedAt })), 640, 190)}
    <h3>Chapters needing revision</h3>${weak.length ? `<table class="rtab"><tr><th>Chapter</th><th>Subject</th><th>Marks</th><th>%</th><th style="width:30%">Performance</th></tr>${weak.slice(0, 8).map(w => `<tr><td>${esc(w.k)}</td><td>${esc(w.s.name)}</td><td class="nowrap">${fmt(w.got)} / ${w.tot}</td><td>${fmt(w.p)}</td><td>${bar(w.got, w.tot)}</td></tr>`).join('')}</table>` : '<p class="muted">Not enough data yet.</p>'}
    <h3>Test log</h3><table class="rtab"><tr><th>Date</th><th>Paper</th><th>Score</th><th>Grade</th></tr>${list.slice().reverse().slice(0, 25).map(x => `<tr><td class="nowrap">${dateStr(x.a.submittedAt)}</td><td>${esc(x.P.title)} <span class="small muted">· ${esc(modeLabel(x.P, x.a.mode))}</span></td><td class="nowrap">${fmt(x.r.got)} / ${x.r.total} (${fmt(x.r.pct)}%)</td><td>${gradeOf(x.r.pct).label}</td></tr>`).join('')}</table>`;
  })() : '<p class="muted">No tests taken yet.</p>'}
  ${reportFoot}</div>`;
  document.getElementById('print').onclick = () => window.print();
}

/* ---------- accounts: sign in / register / forgot ---------- */
function viewAuth(mode) {
  if (!AUTH_RX.test(location.hash || '')) nextHash = location.hash || '';
  const reg = mode === 'register', fg = mode === 'forgot';
  const title = reg ? 'Create your account' : fg ? 'Reset your password' : 'Sign in';
  const sub = reg ? 'Your own private space: every test, score and report is saved to your account only.'
    : fg ? 'Enter your email and we will send you a link to choose a new password.'
    : 'Sign in to see your tests, results and progress.';
  app.innerHTML = `<div class="authwrap"><div class="card auth">
    <div class="authhead"><img class="logo-img big" src="assets/logo.svg" alt="BoardWise" width="56" height="56"><h1>${title}</h1><p class="muted">${sub}</p></div>
    <form id="af" novalidate>
      ${reg ? '<label>Your name<input id="f-name" autocomplete="name" maxlength="60" placeholder="Your full name"></label>' : ''}
      <label>Email<input id="f-email" type="email" autocomplete="username" inputmode="email" autocapitalize="off" spellcheck="false" placeholder="you@example.com"></label>
      ${fg ? '' : `<label>Password<input id="f-pw" type="password" autocomplete="${reg ? 'new-password' : 'current-password'}" placeholder="${reg ? 'At least 6 characters' : 'Your password'}"></label>`}
      ${reg ? '<label>Confirm password<input id="f-pw2" type="password" autocomplete="new-password" placeholder="Type it again"></label>' : ''}
      ${fg ? '' : '<label class="chk"><input type="checkbox" id="f-show"> Show password</label>'}
      <div class="autherr" id="aerr" role="alert" aria-live="assertive"></div>
      <button class="btn pri wide" id="asub" type="submit">${reg ? 'Create account' : fg ? 'Send reset link' : 'Sign in'}</button>
    </form>
    <div class="authlinks">${reg ? 'Already have an account? <a href="#/login">Sign in</a>'
      : fg ? '<a href="#/login">‹ Back to sign in</a>'
      : '<a href="#/forgot">Forgot password?</a><span>New here? <a href="#/register">Create an account</a></span>'}</div>
    ${AUTH.mode === 'local' ? '<div class="notice small">Online accounts are not switched on for this copy of the site, so accounts and results are kept <b>in this browser only</b> (not shared between devices).</div>' : ''}
  </div></div>`;
  const $ = id => document.getElementById(id), err = $('aerr'), btn = $('asub'), label = btn.textContent;
  const sh = $('f-show'); if (sh) sh.onchange = () => ['f-pw', 'f-pw2'].forEach(i => { if ($(i)) $(i).type = sh.checked ? 'text' : 'password'; });
  const show = m => { err.textContent = m || ''; err.className = 'autherr' + (m ? ' on' : ''); };
  $('af').onsubmit = async ev => {
    ev.preventDefault(); show('');
    const email = $('f-email').value.trim(), pw = $('f-pw') ? $('f-pw').value : '';
    if (!email) return show('Enter your email address.');
    if (!/^\S+@\S+\.\S+$/.test(email)) return show('That email address does not look right.');
    if (!fg && !pw) return show('Enter your password.');
    if (reg) {
      if (!$('f-name').value.trim()) return show('Please enter your name.');
      if (pw.length < 6) return show('Password must be at least 6 characters.');
      if (pw !== $('f-pw2').value) return show('The two passwords do not match.');
    }
    btn.disabled = true; btn.textContent = 'Please wait…';
    try {
      if (reg) await AUTH.signUp(email, pw, $('f-name').value);
      else if (fg) {
        try { await AUTH.reset(email); } catch (e) { if (e.code !== 'EMAIL_NOT_FOUND') throw e; }
        $('af').innerHTML = '<div class="info">If an account exists for <b>' + esc(email) + '</b>, a reset link is on its way. Check your inbox (and spam), then <a href="#/login">sign in</a>.</div>';
        return;
      } else await AUTH.signIn(email, pw);
    } catch (e) {
      show(e.message || 'Something went wrong. Please try again.');
      btn.disabled = false; btn.textContent = label;
    }
  };
  const first = $('f-name') || $('f-email'); if (first && window.innerWidth > 700) first.focus();
}

/* ---------- user box in the header ---------- */
function syncInfo() {
  const n = AUTH.pending();
  return ({
    synced: ['ok', 'All saved to your account'], saving: ['warn', 'Saving…'],
    offline: ['warn', 'Offline — ' + n + ' change(s) will sync when you are back online'],
    error: ['bad', 'Could not save to the cloud — please tell your teacher'], local: ['gray', 'Saved on this device only'], idle: ['gray', 'Not signed in']
  })[AUTH.status()] || ['gray', ''];
}
function renderUserbox() {
  const el = document.getElementById('userbox'); if (!el) return;
  const u = AUTH.user();
  if (!u) { el.innerHTML = ''; return; }
  const si = syncInfo(), nm = student().name || u.email;
  el.innerHTML = `<a href="#/profile" class="ubprof" title="My profile"><span class="ubav">${esc((nm.trim()[0] || '?').toUpperCase())}<i class="sdot ${si[0]}" title="${esc(si[1])}" aria-label="${esc(si[1])}"></i></span><span class="ubname">${esc(nm)}</span></a><button class="btn sm" id="signout">Sign out</button>`;
  document.getElementById('signout').onclick = doSignOut;
  const sl = document.getElementById('syncline'); if (sl) sl.innerHTML = `<span class="sdot ${si[0]}"></span> ${esc(si[1])}`;
}
async function doSignOut() {
  if (active() && !confirm('A test is in progress on this device. It stays saved under your account, but the timer keeps running. Sign out anyway?')) return;
  await AUTH.signOut(); setLanded(false); nextHash = ''; location.hash = '#/login'; route();
}

/* ---------- results saved before accounts existed ---------- */
function legacy() { return LS.get('ssc.legacyDismissed', 0) ? [] : LS.get('ssc.attempts', []).filter(valid); }
function legacyBanner() {
  const n = legacy().length; if (!n) return '';
  return `<div class="info" id="legacy"><b>${n} result${n > 1 ? 's' : ''}</b> from before accounts existed ${n > 1 ? 'are' : 'is'} still saved on this device.
    <button class="btn sm pri" id="lg-yes">Add to my account</button> <button class="btn sm" id="lg-no">No thanks</button></div>`;
}
function bindLegacy() {
  const y = document.getElementById('lg-yes'), n = document.getElementById('lg-no');
  if (y) y.onclick = () => {
    const cur = rawAttempts().slice(), ids = new Set(cur.map(a => a.id));
    AUTH.setAttempts(cur.concat(legacy().filter(a => !ids.has(a.id))));
    const st = LS.get('ssc.student', null), p = AUTH.getProfile();
    if (st) AUTH.setProfile({ name: p.name || st.name || '', school: p.school || st.school || '', seat: p.seat || st.seat || '' });
    ['ssc.attempts', 'ssc.student', 'ssc.active'].forEach(k => localStorage.removeItem(k));
    renderUserbox(); route(true);
  };
  if (n) n.onclick = () => { LS.set('ssc.legacyDismissed', 1); document.getElementById('legacy').remove(); };
}

/* ---------- profile ---------- */
function viewProfile() {
  const u = AUTH.user(), p = AUTH.getProfile(), list = collect(), ss = subjectStats(list);
  const all = list.map(x => x.r.pct), avg = all.length ? all.reduce((a, b) => a + b, 0) / all.length : 0;
  const recent = list.slice().reverse().slice(0, 8), nm = p.name || u.name || '';
  app.innerHTML = `<h1>My profile</h1>${resumeBanner()}${legacyBanner()}
  <div class="grid g2">
    <div class="card"><div class="acct"><span class="avatar">${esc((nm || u.email).trim().charAt(0).toUpperCase())}</span>
      <div style="min-width:0"><b>${esc(nm || 'Student')}</b><div class="muted small ubemail">${esc(u.email)}</div><div class="small" id="syncline"></div></div></div>
      <h3 style="margin-top:16px">My details <span class="small muted">(printed on report cards)</span></h3>
      <div class="form3 one"><label>Name<input id="pf-name" value="${esc(nm)}" maxlength="60"></label>
        <label>School<input id="pf-school" value="${esc(p.school)}" maxlength="80" placeholder="Optional"></label>
        <label>Seat / roll no.<input id="pf-seat" value="${esc(p.seat)}" maxlength="20" placeholder="Optional"></label></div>
      <div class="btnrow"><button class="btn pri" id="pf-save">Save details</button><span class="small saved" id="pf-msg"></span></div>
      <div class="btnrow" style="margin-top:14px;border-top:1px solid var(--line);padding-top:14px">
        <button class="btn sm" id="pf-reset" ${AUTH.mode === 'local' ? 'disabled title="Needs online accounts"' : ''}>Email me a password-reset link</button>
        <button class="btn sm danger" id="pf-out">Sign out</button></div><div class="small muted" id="pf-note"></div></div>
    <div class="card"><h3>My numbers</h3>
      ${list.length ? `<div class="kpis"><div class="kpi"><b>${list.length}</b>tests taken</div><div class="kpi"><b>${fmt(avg)}%</b>average</div>
        <div class="kpi"><b>${fmt(Math.max(...all))}%</b>best</div><div class="kpi"><b>${ss.length} / ${SUBJECTS.length}</b>subjects tried</div></div>
        <h3 style="margin-top:14px">Score trend</h3>${trendSvg(list.slice(-20).map(x => ({ v: x.r.pct, t: x.P.title, d: x.a.submittedAt })), 420, 190)}`
      : '<p class="muted">No tests yet — take your first test and your numbers appear here.</p><a class="btn pri" href="#/">Pick a subject</a>'}</div>
  </div>
  ${ss.length ? `<div class="card" style="margin-top:16px"><h3>Subject-wise progress</h3><div class="tscroll"><table><tr><th>Subject</th><th>Tests</th><th>Best</th><th>Average</th><th>Latest</th><th>Grade (best)</th></tr>
    ${ss.map(x => `<tr><td>${x.s.icon} <a href="#/subject/${x.s.key}">${esc(x.s.name)}</a></td><td>${x.n}</td><td>${fmt(x.best)}%</td><td>${fmt(x.avg)}%</td><td>${fmt(x.latest)}%</td><td><span class="chip ${gradeOf(x.best).min >= 45 ? 'ok' : gradeOf(x.best).min >= BOARD.passPercent ? 'warn' : 'bad'}">${gradeOf(x.best).label}</span></td></tr>`).join('')}</table></div>
    <p class="small muted" style="margin-bottom:0">Chapter-wise detail is on the <a href="#/progress">Progress</a> page and on each report card.</p></div>` : ''}
  ${recent.length ? `<div class="card" style="margin-top:16px"><h3>Recent results</h3><div class="tscroll"><table><tr><th>Date</th><th>Paper</th><th>Score</th><th></th></tr>
    ${recent.map(x => `<tr><td class="nowrap">${dateStr(x.a.submittedAt)}</td><td>${esc(x.P.title)}<div class="small muted">${esc(modeLabel(x.P, x.a.mode))}</div></td><td class="nowrap">${fmt(x.r.got)} / ${x.r.total} (${fmt(x.r.pct)}%)</td><td class="right nowrap"><a class="btn sm" href="#/result/${x.a.id}">Solutions</a> <a class="btn sm" href="#/report/${x.a.id}">Report</a></td></tr>`).join('')}</table></div></div>` : ''}
  <div class="card" style="margin-top:16px"><h3>Export my reports</h3>
    <p class="small muted">Everything below contains only your own results.</p>
    <div class="btnrow"><a class="btn pri" href="#/report">🖨 Overall report card (print / PDF)</a><button class="btn" id="ex-csv" ${list.length ? '' : 'disabled'}>⬇ Results (CSV)</button><button class="btn" id="ex-json" ${list.length ? '' : 'disabled'}>⬇ Full backup (JSON)</button><a class="btn" href="#/history">All my results</a></div></div>`;
  renderUserbox(); bindLegacy();
  const $ = id => document.getElementById(id);
  $('pf-save').onclick = () => {
    AUTH.setProfile({ name: $('pf-name').value.trim(), school: $('pf-school').value.trim(), seat: $('pf-seat').value.trim() });
    $('pf-msg').textContent = 'Saved ✓'; setTimeout(() => { const m = $('pf-msg'); if (m) m.textContent = ''; }, 2500); renderUserbox();
  };
  $('pf-out').onclick = doSignOut;
  $('pf-reset').onclick = async () => {
    $('pf-note').textContent = 'Sending…';
    try { await AUTH.reset(u.email); $('pf-note').textContent = 'Reset link sent to ' + u.email + '.'; } catch (e) { $('pf-note').textContent = e.message; }
  };
  if ($('ex-csv')) $('ex-csv').onclick = exportCSV;
  if ($('ex-json')) $('ex-json').onclick = () => {
    const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), student: student(), attempts: attempts() }, null, 2)], { type: 'application/json' });
    const l = document.createElement('a'); l.href = URL.createObjectURL(blob); l.download = 'ssc-backup.json';
    document.body.appendChild(l); l.click(); l.remove(); setTimeout(() => URL.revokeObjectURL(l.href), 1000);
  };
}

/* ---------- start-up ---------- */
AUTH.on(ev => {
  if (!ready) return;
  if (ev === 'status') return renderUserbox();
  if (ev === 'auth') {
    renderUserbox();
    if (AUTH.user() && nextHash && AUTH_RX.test(location.hash || '')) { const n = nextHash; nextHash = ''; location.hash = n; }
    else route();
  }
  if (ev === 'data') { renderUserbox(); if (!/^#\/test/.test(location.hash)) route(true); }
});
window.addEventListener('storage', e => { if (e.key === 'ssc.session') location.reload(); });
/* a newer deploy (tools/stamp-version.js writes version.json and the bw-version meta): load it, so no one keeps using old files.
   Never in the middle of a test: then a note says it loads after you submit. Reloads once per version, so a stale cache cannot loop. */
(function watchVersion() {
  const mine = (document.querySelector('meta[name="bw-version"]') || {}).content;
  if (!mine || !/^https?:$/.test(location.protocol)) return;
  let newer = '', note = null;
  const ssGet = k => { try { return sessionStorage.getItem(k); } catch (e) { return null; } };
  const go = () => {
    if (!newer || document.body.classList.contains('testing')) return showNote();
    if (ssGet('bw_reloaded_for') === newer) return;
    try { sessionStorage.setItem('bw_reloaded_for', newer); } catch (e) {}
    location.reload();
  };
  const showNote = () => {
    if (!newer || note) return;
    note = document.createElement('div');
    note.className = 'vnote noprint'; note.setAttribute('role', 'status');
    note.innerHTML = 'A new version of BoardWise is ready. It loads when you finish this test. <button type="button" class="btn sm">Load it now</button>';
    note.querySelector('button').onclick = () => { if (!document.body.classList.contains('testing') || confirm('Reload now? Your answers so far are saved and the timer keeps running.')) { try { sessionStorage.setItem('bw_reloaded_for', newer); } catch (e) {} location.reload(); } };
    document.body.appendChild(note);
  };
  const check = now => fetch('version.json?t=' + Date.now(), { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(j => {
    if (!j || !j.v || j.v === mine) return;
    newer = j.v; if (now) go(); else showNote();
  }).catch(() => {});
  setTimeout(() => check(true), 2500);
  setInterval(() => check(false), 15 * 60 * 1000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) check(true); });
  window.addEventListener('hashchange', () => { if (newer) go(); });
})();
app.innerHTML = '<div class="empty">Loading…</div>';
Promise.resolve(AUTH.init()).catch(() => {}).then(() => { ready = true; renderUserbox(); route(); });
})();

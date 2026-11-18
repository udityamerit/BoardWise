(function () {
'use strict';
const SUBJECTS = window.SUBJECTS, PAPERS = window.PAPERS, BOARD = window.BOARD, GRADES = window.GRADES, YEARS = window.YEARS;
const app = document.getElementById('app');
let tick = null;

/* ---------- helpers ---------- */
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const LS = {
  get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
const subj = k => SUBJECTS.find(s => s.key === k);
const paperById = id => PAPERS.find(p => p.id === id);
const go = h => { location.hash = h; };
const fmt = n => (Math.round(n * 100) / 100).toString();
const pad = n => String(n).padStart(2, '0');
const clock = ms => { const s = Math.max(0, Math.floor(ms / 1000)); return pad(Math.floor(s / 3600)) + ':' + pad(Math.floor(s % 3600 / 60)) + ':' + pad(s % 60); };
const gradeOf = pct => GRADES.find(g => pct >= g.min);
const isAns = v => v !== undefined && v !== null && String(v).trim() !== '';
const letter = i => String.fromCharCode(65 + i);
const dateStr = t => new Date(t).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });

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
  if (mode === 'all') return 'Full paper';
  if (mode === 'part1') return 'Part 1 only';
  if (mode === 'part2') return 'Part 2 only';
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
  return (q.accept || []).some(a => { const x = norm(a); if (x === y) return true; const nx = toNum(x); return !isNaN(nx) && !isNaN(ny) && Math.abs(nx - ny) <= tol; });
}
function status(q, A) {
  const v = A.answers[q.id];
  if (!isAns(v)) return 'skip';
  if (q.type === 'mcq') return Number(v) === q.answer ? 'correct' : 'wrong';
  if (q.type === 'num') return matchNum(q, v) ? 'correct' : 'wrong';
  return 'self';
}
function evaluate(A) {
  const P = paperById(A.paperId), all = flat(P), qs = A.qids.map(id => all.find(q => q.id === id));
  const r = { total: marksOf(qs), got: 0, correct: 0, wrong: 0, skip: 0, selfDone: 0, selfPending: 0, secs: {}, chaps: {}, rows: [] };
  const info = {};
  groupBySec(qs).forEach(g => {
    const n = need(g);
    const items = g.qs.map((q, i) => {
      const st = status(q, A); let got = 0, pending = false;
      if (st === 'correct') got = q.marks;
      else if (st === 'self') { if (A.self && A.self[q.id] != null) got = A.self[q.id]; else pending = true; }
      return { q, st, got, pending, i };
    });
    let keep = new Set(items.map(x => x.q.id));
    if (n < items.length) {
      const ranked = items.slice().sort((a, b) => b.got - a.got || ((b.st !== 'skip') - (a.st !== 'skip')) || a.i - b.i);
      keep = new Set(ranked.slice(0, n).map(x => x.q.id));
    }
    items.forEach(x => { x.counted = keep.has(x.q.id); info[x.q.id] = x; });
  });
  qs.forEach(q => {
    const x = info[q.id];
    if (x.pending) r.selfPending++;
    if (x.counted) {
      if (x.st === 'correct') r.correct++; else if (x.st === 'wrong') r.wrong++; else if (x.st === 'skip') r.skip++; else if (!x.pending) r.selfDone++;
      r.got += x.got;
      const sk = q.sec.title; (r.secs[sk] = r.secs[sk] || { got: 0, tot: 0 }); r.secs[sk].got += x.got; r.secs[sk].tot += q.marks;
      const ck = q.chapter || 'General'; (r.chaps[ck] = r.chaps[ck] || { got: 0, tot: 0 }); r.chaps[ck].got += x.got; r.chaps[ck].tot += q.marks;
    }
    r.rows.push({ q, st: x.st, got: x.got, counted: x.counted });
  });
  r.pct = r.total ? r.got / r.total * 100 : 0;
  return r;
}
const barCls = p => p >= 70 ? 'hi' : p >= 40 ? 'mid' : 'low';
const bar = (g, t) => { const p = t ? g / t * 100 : 0; return `<div class="bar ${barCls(p)}"><i style="width:${p}%"></i></div>`; };

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
  const all = flat(P); return A.qids.every(id => all.some(q => q.id === id));
}
const attempts = () => rawAttempts().filter(valid);

/* ---------- small charts ---------- */
function trendSvg(vals, w, h) {
  const L = 32, R = 10, T = 10, B = 18, iw = w - L - R, ih = h - T - B;
  const x = i => L + (vals.length < 2 ? iw / 2 : i * iw / (vals.length - 1));
  const y = v => T + ih * (1 - v / 100);
  const grid = [0, 35, 60, 75, 100].map(v => `<line x1="${L}" x2="${w - R}" y1="${y(v)}" y2="${y(v)}" stroke="${v === 35 ? '#e5484d' : '#e3e6ef'}" ${v === 35 ? 'stroke-dasharray="4 3"' : ''}/><text x="${L - 5}" y="${y(v) + 4}" font-size="10" text-anchor="end" fill="#6b7280">${v}</text>`).join('');
  const pts = vals.map((v, i) => `${x(i)},${y(v)}`).join(' ');
  return `<svg viewBox="0 0 ${w} ${h}" class="trend" role="img" aria-label="Score trend, percent per test">${grid}
    <polyline points="${pts}" fill="none" stroke="#3b4fd8" stroke-width="2.5" stroke-linejoin="round"/>
    ${vals.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="4" fill="#fff" stroke="#3b4fd8" stroke-width="2"><title>Test ${i + 1}: ${fmt(v)}%</title></circle>`).join('')}
    <text x="${L}" y="${h - 3}" font-size="10" fill="#6b7280">oldest</text><text x="${w - R}" y="${h - 3}" font-size="10" text-anchor="end" fill="#6b7280">latest</text></svg>`;
}
function spark(vals) {
  const w = 90, h = 28, x = i => 3 + (vals.length < 2 ? (w - 6) / 2 : i * (w - 6) / (vals.length - 1)), y = v => 3 + (h - 6) * (1 - v / 100);
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true"><polyline points="${vals.map((v, i) => x(i) + ',' + y(v)).join(' ')}" fill="none" stroke="#3b4fd8" stroke-width="2"/>${vals.length ? `<circle cx="${x(vals.length - 1)}" cy="${y(vals[vals.length - 1])}" r="3" fill="#3b4fd8"/>` : ''}</svg>`;
}

/* ---------- router ---------- */
function route(keepScroll) {
  clearInterval(tick);
  const h = (location.hash || '#/').replace(/^#\/?/, '');
  const [a, b] = h.split('/');
  const authed = !!AUTH.user();
  document.body.classList.toggle('authed', authed);
  document.body.classList.toggle('testing', authed && a === 'test');
  document.querySelectorAll('[data-nav]').forEach(el => el.classList.toggle('on',
    (el.dataset.nav === 'home' && (!a || a === 'subject' || a === 'paper')) || (el.dataset.nav === 'boards' && (a === 'boards' || a === 'board')) || (el.dataset.nav === 'about' && a === 'about') || el.dataset.nav === a ||
    (el.dataset.nav === 'progress' && a === 'report') || (el.dataset.nav === 'history' && a === 'result')));
  if (!keepScroll) window.scrollTo(0, 0);
  if (a === 'about') return viewAbout();
  if (!authed) return viewAuth(a === 'register' || a === 'forgot' ? a : 'login');
  if (a === 'login' || a === 'register' || a === 'forgot') return go('#/');
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
  if (a === 'boards') return viewBoards();
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
  const n = PAPERS.length, done = attempts();
  const real = PAPERS.filter(p => p.kind === 'pyq').length;
  app.innerHTML = `
  <section class="hero">
    ${student().name ? `<div class="small" style="opacity:.9;margin-bottom:6px">Welcome back, <b>${esc(student().name)}</b></div>` : ''}
    <div class="small" style="opacity:.9;margin-bottom:6px">Maharashtra SSC · Class X</div>
    <h1>Practice in the real board format</h1>
    <div class="small" style="margin:-4px 0 10px"><a href="#/boards" style="color:#fff;text-decoration:underline">Other boards (UP, MP, Bihar…) ›</a></div>
    <p>Timed papers laid out like the board paper: same sections, "attempt any N" choices, marks and time. Instant marking, board-style grading, report cards and progress tracking. Exams expected ${esc(BOARD.examWindow)}.</p>
    <div class="stats">
      <div class="stat"><b>${SUBJECTS.length}</b>subjects</div>
      <div class="stat"><b>${n}</b>papers available</div>
      <div class="stat"><b>${done.length}</b>tests taken by you</div>
    </div>
    <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap"><a class="btn pri" href="#/progress">📈 My progress & report cards</a><a class="btn" href="#/pattern">View paper pattern</a></div>
  </section>
  ${resumeBanner()}${legacyBanner()}
  <div class="notice"><b>What the papers are:</b> <b>Mock tests</b> follow the real paper's format and are written from the textbook chapters with the question types and chapters examiners favour — they are not copies of any board paper.
  ${real ? `<b>Previous-year</b> papers (${real} so far) are transcribed from public third-party copies and are labelled; they could not be checked against the board's own PDF.` : 'Previous-year papers will appear in their own tab as each is typed in and labelled.'} Every paper says which kind it is.</div>
  <h2>Choose a subject</h2>
  <div class="grid g2">
    ${SUBJECTS.map(s => `
      <a class="card subj" style="--c:${s.color}" href="#/subject/${s.key}">
        <div class="ic">${s.icon}</div>
        <h3>${esc(s.name)}</h3>
        <div class="muted small">${esc(s.blurb)}</div>
        <div style="margin-top:8px"><span class="chip">${s.total} marks</span> <span class="chip gray">${PAPERS.filter(p => p.subject === s.key).length} paper(s)</span></div>
      </a>`).join('')}
  </div>`;
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

/* ---------- boards ---------- */
const boardOf = k => BOARDS.find(b => b.key === k);
function boardCard(b) {
  const live = b.status === 'live';
  return `<a class="card subj" style="--c:${b.color}" href="${live ? '#/' : '#/board/' + b.key}">
    <div class="ic">${b.icon}</div><h3>${esc(b.name)}</h3>
    <div class="muted small">${esc(b.full)}</div>
    <div class="muted small" style="margin-top:6px">${esc(b.blurb)}</div>
    <div style="margin-top:8px"><span class="chip ${live ? 'ok' : 'gray'}">${live ? 'Live' : 'Coming soon'}</span> <span class="chip gray">${esc(b.medium)}</span>
      <div style="margin-top:6px">${(b.levels || []).map(l => `<span class="chip ${l.live ? 'ok' : 'gray'}">${esc(l.name)}${l.live ? ' ✓' : ''}</span>`).join(' ')}</div>${live ? ` <span class="chip gray">${PAPERS.length} papers</span>` : ''}</div></a>`;
}
function viewBoards() {
  app.innerHTML = `
  <section class="hero"><h1>Choose your board</h1>
    <p>BoardWise carries mock tests for more than one board, for Class X and Class XII. Maharashtra SSC Class X is live now; the rest are next. Each board and class gets its own papers, marking scheme and progress reports.</p></section>
  <div class="grid g2">${BOARDS.map(boardCard).join('')}</div>
  <div class="notice"><b>Honest status:</b> only Maharashtra SSC Class X has papers today. For the other boards no question papers have been written yet, and no previous-year paper is claimed. The patterns on each board page are what third-party sites report, not official figures.</div>
  <h3>Later</h3><p class="muted">${BOARD_ROADMAP.map(x => `<span class="chip gray">${esc(x)}</span>`).join(' ')}</p>`;
}
function viewBoard(key) {
  const b = boardOf(key); if (!b) return viewBoards();
  if (b.status === 'live') return go('#/');
  app.innerHTML = `
  <div class="crumbs"><a href="#/boards">Boards</a> › ${esc(b.name)}</div>
  <h1>${b.icon} ${esc(b.name)} <span class="chip gray">Coming soon</span></h1>
  <p>${(b.levels || []).map(l => `<span class="chip">${esc(l.name)}</span>`).join(' ')}</p>
  <p class="muted">${esc(b.full)} · ${esc(b.medium)}</p>
  <div class="notice"><b>No papers yet.</b> Mock tests for this board are not built. When they are, they will be original practice papers in the board's own layout, labelled as mock tests, and never presented as past board papers.</div>
  <div class="card"><h3>Planned subjects</h3><p>${b.subjects.map(x => `<span class="chip">${esc(x)}</span>`).join(' ')}</p>
    <h3>Pattern as reported (not verified)</h3><ul class="clean">${b.reported.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
    <p class="small muted">These points come from third-party education sites that disagree with each other. For the authoritative scheme use the board's own site: <a href="${esc(b.site)}" target="_blank" rel="noopener noreferrer">${esc(b.site.replace(/^https?:\/\//, ''))}</a>.</p></div>
  <p><a class="btn" href="#/boards">‹ All boards</a> <a class="btn pri" href="#/">Open Maharashtra SSC tests</a></p>`;
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
      <div class="pill-row">${YEARS.map(y => `<span class="ypill ${y.na ? 'na' : ''} ${have.has(y.y) ? 'have' : ''}" title="${esc(y.na || (have.has(y.y) ? 'Loaded' : 'Not loaded yet'))}">${y.y}${y.na ? ' ✕' : have.has(y.y) ? ' ✓' : ''}</span>`).join('')}</div>
      <p class="small muted">2021 is struck out because the Maharashtra SSC exam was not held that year (please verify). A ✓ means a paper for that year is loaded.</p>`;
    }
    if (t === 'pat') body.innerHTML = patternBlock(s);
    body.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
  };
  document.querySelectorAll('.tab').forEach(b => b.onclick = () => show(b.dataset.t));
  show('mock');
}

function paperCard(p) {
  const m = paperMarks(p), n = flat(p).length;
  return `<div class="card paper">
    <div><h3>${esc(p.title)}</h3>
      <div class="meta"><span class="chip">${m} marks</span><span class="chip gray">${n} questions</span><span class="chip gray">${minutesFor(p, flat(p))} min</span>
      <span class="chip ${p.kind === 'pyq' ? 'ok' : 'warn'}">${p.kind === 'pyq' ? 'Board ' + p.year + ' · third-party copy' : 'Mock test'}</span></div>
      <div class="muted small" style="margin-top:6px">${esc(p.desc || '')}</div></div>
    <button class="btn pri" data-go="#/paper/${encodeURIComponent(p.id)}">Open test ›</button></div>`;
}

function patternBlock(s) {
  return `<div class="card">
    <h3>Marking scheme — ${esc(s.name)}</h3>
    <table><tr><th>Section</th><th>Marks</th><th>Details</th></tr>
    ${s.pattern.map(r => `<tr><td>${esc(r[0])}</td><td>${r[1]}</td><td>${esc(r[2])}</td></tr>`).join('')}</table>
    <div class="notice">${esc(s.note)}</div>
    <h3>Chapters / syllabus</h3>
    ${Object.entries(s.chapters).map(([k, v]) => `<p><b>${esc(k)}</b></p><ul class="clean">${v.map(c => `<li>${esc(c)}</li>`).join('')}</ul>`).join('')}
    <p class="small muted">Chapter names are compiled from public study sites and should be checked against the current Balbharati textbook.</p>
  </div>`;
}

function viewPattern(key) {
  const list = key ? [subj(key)].filter(Boolean) : SUBJECTS;
  app.innerHTML = `<h1>Paper pattern & marking scheme</h1>
  <div class="card"><h3>Common to all subjects</h3><ul class="clean">
  <li>Each subject is <b>80 marks written + 20 marks internal/practical = 100</b>. Only the written part is tested here.</li>
  <li>Maths, Science and Social Science are set as separate <b>40-mark, 2-hour</b> papers (Algebra, Geometry, Science 1, Science 2, History & Political Science, Geography & Economics). Language papers are 80 marks, 3 hours. On this site Maths 1+2 and Science 1+2 can be taken as one combined paper, or Part 1 / Part 2 separately.</li>
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
    return `<tr><td>${esc(g.sec.title)}</td><td>${n < g.qs.length ? `Any <b>${n}</b> of ${g.qs.length}` : `All ${g.qs.length}`}</td><td>${ms.length === 1 ? ms[0] + (ms[0] > 1 ? ' marks' : ' mark') + ' each' : 'mixed'}</td><td class="right"><b>${fmt(sm)}</b></td></tr>`;
  }).join('');
  return `<table class="struct"><tr><th>Question</th><th>Choice</th><th>Marks</th><th class="right">Section total</th></tr>${rows}<tr><td colspan="3"><b>Total</b></td><td class="right"><b>${paperMarks(P)}</b></td></tr></table>`;
}

function viewInstr(id) {
  const P = paperById(id); if (!P) return viewHome();
  const S = subj(P.subject), all = flat(P);
  const modes = [['all', 'Full paper', all]];
  if (hasParts(P)) { modes.push(['part1', 'Part 1 only', pick(P, 'part1')], ['part2', 'Part 2 only', pick(P, 'part2')]); }
  P.sections.forEach(sec => modes.push(['sec:' + sec.id, sec.title, pick(P, 'sec:' + sec.id)]));
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
      <li>Total marks: <b>${paperMarks(P)}</b>. Time for the full paper: <b>${minutesFor(P, all)} minutes</b>. The timer cannot be paused; the test submits itself when time ends.</li>
      ${hasChoice ? '<li><b>Choices:</b> where a question says "Any N of M", answer the number asked. If you answer more, only your <b>best N</b> are counted.</li>' : ''}
      <li>There is <b>no negative marking</b>. Attempt every question.</li>
      <li>MCQs and short numeric/word answers are <b>marked automatically</b>. Written answers are shown with a model answer after submission and <b>you award your own marks</b> against it — be honest, that is what makes the score useful.</li>
      <li>Use the palette to jump between questions and the flag button to mark questions for review. Answers are saved automatically; refreshing the page will not lose them.</li>
      <li>Pass mark: ${BOARD.passPercent}%. The result shows grade, section-wise and chapter-wise performance, and you can print a report card.</li>
    </ul>
    ${P.kind === 'pyq' ? `<div class="notice"><b>Board ${esc(P.year)} paper — third-party copy.</b> ${P.note || 'Typed in from a public transcription; not checked against the board PDF.'}</div>`
      : `<div class="notice"><b>Mock test.</b> ${P.note || 'Written from the textbook chapters in the board paper\'s format. Not an actual past paper.'}</div>`}
    <h3>Choose how to attempt</h3>
    <div class="modes">${modes.map(m => `<button class="btn ${m[0] === 'all' ? 'pri' : ''}" data-mode="${esc(m[0])}">${esc(m[1])} · ${marksOf(m[2])} marks · ${minutesFor(P, m[2])} min</button>`).join('')}</div>
  </div>`;
  app.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => {
    const cur = active();
    if (cur && !confirm('A test is already in progress. Starting a new one will discard it. Continue?')) return;
    const qs = pick(P, b.dataset.mode);
    saveActive({ id: 'a' + Date.now(), paperId: P.id, mode: b.dataset.mode, qids: qs.map(q => q.id), startedAt: Date.now(),
      endsAt: Date.now() + minutesFor(P, qs) * 60000, answers: {}, flags: {}, seen: {}, cur: 0, self: {} });
    go('#/test');
  });
}

/* ---------- test runner ---------- */
function viewTest() {
  let A = active();
  if (!A) return go('#/');
  if (!valid(A)) { saveActive(null); return go('#/'); }
  const P = paperById(A.paperId), all = flat(P);
  const qs = A.qids.map(id => all.find(q => q.id === id));
  const groups = groupBySec(qs);
  const grp = id => groups.find(g => g.sec.id === id);
  app.innerHTML = `
  <div class="tbar"><div><h2>${esc(P.title)}</h2><span class="muted small">${esc(modeLabel(P, A.mode))} · ${marksOf(qs)} marks</span></div>
    <div style="display:flex;gap:10px;align-items:center"><span class="timer" id="timer">--:--:--</span><button class="btn pri" id="submit">Submit test</button></div></div>
  <div class="tlayout"><div class="card" id="qbox"></div>
    <aside class="card pal"><h3>Question palette</h3><div id="palette"></div>
      <div class="legend"><span><i style="background:var(--ok-l)"></i>Answered</span><span><i style="background:var(--warn-l)"></i>Seen</span><span><i></i>Not seen</span><span><i style="background:var(--bad)"></i>Flagged</span></div></aside></div>`;
  const save = () => saveActive(A);
  const timer = document.getElementById('timer');
  const answeredIn = g => g.qs.filter(q => isAns(A.answers[q.id])).length;

  function updTimer() {
    const rem = A.endsAt - Date.now();
    timer.textContent = clock(rem);
    timer.className = 'timer' + (rem < 300000 ? ' crit' : rem < 600000 ? ' warn' : '');
    if (rem <= 0) { clearInterval(tick); finish(true); }
  }
  function finish(auto) {
    const un = groups.reduce((a, g) => a + Math.max(0, need(g) - answeredIn(g)), 0);
    if (!auto && !confirm(un ? `You still need to answer ${un} question(s) to complete the paper. Submit anyway?` : 'Submit the test now?')) return;
    A.submittedAt = Math.min(Date.now(), A.endsAt);
    const arr = rawAttempts().slice(); arr.unshift(A); saveAttempts(arr);
    saveActive(null);
    if (auto) alert('Time is up — your test has been submitted.');
    go('#/result/' + A.id);
  }
  document.getElementById('submit').onclick = () => finish(false);

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
    el.querySelectorAll('.pb').forEach(b => b.onclick = () => { A.cur = +b.dataset.i; save(); draw(); });
    secStat();
  }
  function draw() {
    const q = qs[A.cur]; A.seen[q.id] = 1; save();
    const prev = A.cur > 0 ? qs[A.cur - 1] : null, newSec = !prev || prev.sec.id !== q.sec.id;
    const g = grp(q.sec.id), n = need(g);
    const v = A.answers[q.id];
    let input = '';
    if (q.type === 'mcq') input = q.options.map((o, i) => `<label class="opt ${Number(v) === i && isAns(v) ? 'sel' : ''}"><input type="radio" name="o" value="${i}" ${Number(v) === i && isAns(v) ? 'checked' : ''}><span><b>${letter(i)}.</b> ${o}</span></label>`).join('');
    else if (q.type === 'num') input = `<input class="ans" id="ans" autocomplete="off" placeholder="${esc(q.hint || 'Type your answer')}" value="${esc(v || '')}">`;
    else input = `<textarea class="ans" id="ans" placeholder="Write your answer here, as you would in the answer book…">${esc(v || '')}</textarea>`;
    document.getElementById('qbox').innerHTML = `
      <div class="qhead"><div><span class="chip">Q${A.cur + 1} of ${qs.length}</span> <span class="chip gray">${q.marks} mark${q.marks > 1 ? 's' : ''}</span></div>
        <button class="btn sm ${A.flags[q.id] ? 'danger' : ''}" id="flag">${A.flags[q.id] ? '⚑ Flagged' : '⚐ Flag for review'}</button></div>
      <div class="secinfo"><b>${esc(q.sec.title)}</b>${n < g.qs.length ? ` — <b>Attempt any ${n} of ${g.qs.length}</b>` : ''}${q.sec.instruction ? ' — ' + esc(q.sec.instruction) : ''}
        <div style="margin-top:6px"><span id="secstat" class="chip gray"></span></div>${q.sec.passage ? `<div class="pass">${q.sec.passage}</div>` : ''}</div>
      <div class="qtext">${q.q}</div>${input}
      <div class="qfoot"><button class="btn" id="prev" ${A.cur === 0 ? 'disabled' : ''}>‹ Previous</button>
        <button class="btn" id="clear">Clear answer</button>
        <button class="btn pri" id="next" ${A.cur === qs.length - 1 ? 'disabled' : ''}>Next ›</button></div>`;
    const setV = val => { if (isAns(val)) A.answers[q.id] = val; else delete A.answers[q.id]; save(); pal(); };
    document.querySelectorAll('input[name=o]').forEach(r => r.onchange = () => { setV(+r.value); document.querySelectorAll('.opt').forEach(o => o.classList.remove('sel')); r.closest('.opt').classList.add('sel'); });
    const ans = document.getElementById('ans'); if (ans) ans.oninput = () => setV(ans.value);
    document.getElementById('flag').onclick = () => { A.flags[q.id] = !A.flags[q.id]; if (!A.flags[q.id]) delete A.flags[q.id]; save(); draw(); };
    document.getElementById('prev').onclick = () => { A.cur--; save(); draw(); };
    document.getElementById('next').onclick = () => { A.cur++; save(); draw(); };
    document.getElementById('clear').onclick = () => { setV(''); draw(); };
    pal();
    if (!newSec) window.scrollTo({ top: 0 });
  }
  updTimer(); tick = setInterval(updTimer, 1000);
  draw();
}

/* ---------- result ---------- */
function viewResult(id) {
  const A = attempts().find(a => a.id === id);
  if (!A) return go('#/history');
  const P = paperById(A.paperId);
  const S = subj(P.subject);
  app.innerHTML = `<div class="crumbs"><a href="#/">Subjects</a> › <a href="#/subject/${S.key}">${esc(S.name)}</a> › Result</div>
    <h1>Result — ${esc(P.title)}</h1><div id="sum"></div><div id="rev"></div>`;
  let filter = 'all';

  function summary() {
    const r = evaluate(A), g = gradeOf(r.pct), passed = r.pct >= BOARD.passPercent;
    const took = Math.round((A.submittedAt - A.startedAt) / 60000);
    document.getElementById('sum').innerHTML = `
    <div class="card"><div class="score">
      <div class="ring ${g.cls}" style="--p:${r.pct}"><div><div><b>${fmt(r.got)}</b><br><span class="muted">/ ${r.total}</span></div></div></div>
      <div style="flex:1;min-width:260px"><h2 style="margin-bottom:4px">${fmt(r.pct)}% — ${g.label}</h2>
        <span class="chip ${passed ? 'ok' : 'bad'}">${passed ? 'PASS' : 'BELOW PASS MARK'} (pass ${BOARD.passPercent}%)</span>
        ${r.selfPending ? `<p class="small" style="margin-top:10px"><b>${r.selfPending}</b> written answer(s) still need your marks — scroll to the review and award yourself marks against the model answer. Score updates live.</p>` : ''}
        <p class="small muted">Time taken: ${took} min of ${Math.round((A.endsAt - A.startedAt) / 60000)} min</p></div>
      <div class="kpis"><div class="kpi"><b style="color:var(--ok)">${r.correct}</b>auto-marked correct</div><div class="kpi"><b style="color:var(--bad)">${r.wrong}</b>incorrect</div>
        <div class="kpi"><b>${r.skip}</b>not attempted</div><div class="kpi"><b style="color:var(--warn)">${r.selfDone + r.selfPending}</b>self-marked (${r.selfDone} done)</div></div>
    </div></div>
    <div class="grid g2" style="margin-top:16px">
      <div class="card"><h3>Section-wise</h3><table>${Object.entries(r.secs).map(([k, v]) => `<tr><td>${esc(k)}</td><td class="nowrap">${fmt(v.got)} / ${v.tot}</td><td>${bar(v.got, v.tot)}</td></tr>`).join('')}</table></div>
      <div class="card"><h3>Chapter-wise (weakest first)</h3><table>${Object.entries(r.chaps).sort((a, b) => a[1].got / a[1].tot - b[1].got / b[1].tot).map(([k, v]) => `<tr><td>${esc(k)}</td><td class="nowrap">${fmt(v.got)} / ${v.tot}</td><td>${bar(v.got, v.tot)}</td></tr>`).join('')}</table></div>
    </div>
    <div style="margin:16px 0;display:flex;gap:8px;flex-wrap:wrap"><a class="btn pri" href="#/report/${A.id}">🖨 Report card (print / PDF)</a><button class="btn" data-go="#/paper/${encodeURIComponent(P.id)}">Retake</button><button class="btn" data-go="#/progress">My progress</button><button class="btn" data-go="#/history">All my results</button></div>
    <div class="rvhead"><h2 style="margin:0">Answer review &amp; worked solutions</h2><button class="btn sm noprint" id="printrev">🖨 Print review with solutions</button></div>
    <div class="filters">${[['all', 'All'], ['wrong', 'Incorrect'], ['skip', 'Not attempted'], ['self', 'Written (self-mark)'], ['correct', 'Correct']].map(f => `<button class="btn sm ${filter === f[0] ? 'pri' : ''}" data-f="${f[0]}">${f[1]}</button>`).join('')}</div>`;
    document.querySelectorAll('#sum [data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
    document.getElementById('printrev').onclick = () => window.print();
    document.querySelectorAll('[data-f]').forEach(b => b.onclick = () => { filter = b.dataset.f; summary(); review(); });
    return r;
  }
  function ansDisplay(q, v) {
    if (!isAns(v)) return '<span class="muted">Not attempted</span>';
    return q.type === 'mcq' ? esc(letter(Number(v)) + '. ') + q.options[Number(v)] : esc(v);
  }
  function review() {
    const r = evaluate(A);
    const rows = r.rows.map((x, i) => Object.assign({ n: i + 1 }, x)).filter(x => filter === 'all' || (x.st === filter && (x.counted || x.st !== 'skip')));
    document.getElementById('rev').innerHTML = rows.length ? rows.map(({ q, st, got, counted, n }) => {
      const v = A.answers[q.id];
      let body = '';
      if (q.type === 'mcq') body = q.options.map((o, i) => `<div class="optr ${i === q.answer ? 'right' : ''} ${Number(v) === i && isAns(v) ? 'mine ' + (i === q.answer ? '' : 'wrong') : ''}"><b>${letter(i)}.</b> ${o} ${i === q.answer ? '✔ correct' : ''}${Number(v) === i && isAns(v) && i !== q.answer ? ' ✘ your answer' : ''}</div>`).join('');
      else if (q.type === 'num') body = `<div class="your"><b>Your answer:</b> ${ansDisplay(q, v)}</div><div><b>Correct answer:</b> ${esc(q.accept[0])}</div>`;
      else body = `<div class="your"><b>Your answer:</b>\n${ansDisplay(q, v)}</div>`;
      const mark = q.type === 'self' && isAns(v) ? `<div class="selfmark"><b>Award yourself marks:</b>
        <select data-q="${esc(q.id)}"><option value="">— choose —</option>${Array.from({ length: q.marks * 2 + 1 }, (_, i) => i / 2).map(m => `<option value="${m}" ${A.self && A.self[q.id] === m ? 'selected' : ''}>${m} / ${q.marks}</option>`).join('')}</select>
        <span class="small muted">Compare with the model answer below.</span></div>` : '';
      const src = q.year ? `<span class="chip ok">Asked in Board ${esc(q.year)}</span>` : '';
      const extra = !counted ? (st === 'skip' ? '<span class="chip gray">Optional — not needed</span>' : '<span class="chip gray">Extra answer — not counted</span>') : '';
      return `<div class="card rev ${st} ${counted ? '' : 'extra'}"><div class="qhead"><div><span class="chip">Q${n}</span> <span class="chip gray">${esc(q.sec.title)}</span> <span class="chip gray">${esc(q.chapter || '')}</span> ${src}</div>
        <div>${extra} <span class="chip ${st === 'correct' ? 'ok' : st === 'wrong' ? 'bad' : 'gray'}">${st === 'self' ? 'Self-marked' : st === 'skip' ? 'Not attempted' : st}</span> <b>${counted ? fmt(got) : '–'} / ${q.marks}</b></div></div>
        <div class="qtext">${q.q}</div>${body}${mark}
        <div class="sol"><b>${q.type === 'self' ? 'Model answer / marking points' : 'Solution'}:</b><div>${q.solution || ''}</div></div></div>`;
    }).join('') : '<div class="empty">Nothing in this filter.</div>';
    document.querySelectorAll('[data-q]').forEach(sel => sel.onchange = () => {
      A.self = A.self || {};
      if (sel.value === '') delete A.self[sel.dataset.q]; else A.self[sel.dataset.q] = parseFloat(sel.value);
      const all = rawAttempts().slice(); const i = all.findIndex(a => a.id === A.id); if (i >= 0) all[i] = A; saveAttempts(all);
      const y = window.scrollY; summary(); review(); window.scrollTo(0, y);
    });
  }
  summary(); review();
}

/* ---------- history ---------- */
function viewHistory() {
  const arr = attempts();
  app.innerHTML = `<h1>My results</h1>${resumeBanner()}` + (arr.length ? `
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px"><a class="btn" href="#/progress">📈 Progress</a><button class="btn" id="csv">⬇ Export CSV</button></div>
    <div class="card"><div class="tscroll"><table><tr><th>Date</th><th>Paper</th><th>Score</th><th>Grade</th><th></th></tr>
    ${arr.map(a => { const P = paperById(a.paperId); const r = evaluate(a), g = gradeOf(r.pct);
      return `<tr><td class="nowrap">${new Date(a.submittedAt).toLocaleString()}</td><td>${esc(P.title)}<div class="small muted">${esc(modeLabel(P, a.mode))}</div></td><td class="nowrap">${fmt(r.got)} / ${r.total} (${fmt(r.pct)}%)</td><td>${g.label}${r.selfPending ? ' <span class="chip warn">self-marking pending</span>' : ''}</td>
      <td class="right nowrap"><a class="btn sm" href="#/result/${a.id}">View</a> <a class="btn sm" href="#/report/${a.id}">Report</a> <button class="btn sm danger" data-del="${a.id}">Delete</button></td></tr>`; }).join('')}</table></div></div>`
    : '<div class="card empty">You have not taken any test yet.<br><br><a class="btn pri" href="#/">Pick a subject</a></div>');
  const csv = document.getElementById('csv'); if (csv) csv.onclick = exportCSV;
  app.querySelectorAll('[data-del]').forEach(b => b.onclick = () => { if (confirm('Delete this result permanently?')) { saveAttempts(rawAttempts().filter(a => a.id !== b.dataset.del)); viewHistory(); } });
}

function exportCSV() {
  const st = student();
  const q = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
  const rows = [['Date', 'Student', 'Email', 'Subject', 'Paper', 'Mode', 'Marks obtained', 'Total marks', 'Percent', 'Grade', 'Result', 'Minutes taken', 'Self-marking pending']];
  attempts().slice().reverse().forEach(a => {
    const P = paperById(a.paperId), r = evaluate(a), g = gradeOf(r.pct);
    rows.push([new Date(a.submittedAt).toISOString().slice(0, 16).replace('T', ' '), st.name, st.email, subj(P.subject).name, P.title, modeLabel(P, a.mode),
      fmt(r.got), r.total, fmt(r.pct), g.label, r.pct >= BOARD.passPercent ? 'Pass' : 'Below pass mark', Math.round((a.submittedAt - a.startedAt) / 60000), r.selfPending]);
  });
  const blob = new Blob(['﻿' + rows.map(r => r.map(q).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'ssc-results.csv';
  document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(link.href), 1000);
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
  <div class="grid g2">
    <div class="card"><h3>Score trend (all tests, oldest → latest)</h3>${trendSvg(all.slice(-20), 560, 170)}<p class="small muted" style="margin:4px 0 0">Red dashed line = pass mark (${BOARD.passPercent}%). Shows up to the last 20 tests.</p></div>
    <div class="card"><h3>Focus first — weakest chapters</h3>${weak.length ? `<table>${weak.slice(0, 8).map(w => `<tr><td>${esc(w.k)}<div class="small muted">${esc(w.s.name)}</div></td><td class="nowrap">${fmt(w.p)}%</td><td>${bar(w.got, w.tot)}</td></tr>`).join('')}</table>` : '<p class="muted">Not enough data yet.</p>'}</div>
  </div>
  <div class="card" style="margin-top:16px"><h3>Subject-wise</h3><div class="tscroll"><table><tr><th>Subject</th><th>Tests</th><th>Best</th><th>Average</th><th>Latest</th><th>Trend</th><th>Grade (best)</th></tr>
    ${ss.map(x => `<tr><td>${x.s.icon} <a href="#/subject/${x.s.key}">${esc(x.s.name)}</a></td><td>${x.n}</td><td>${fmt(x.best)}%</td><td>${fmt(x.avg)}%</td><td>${fmt(x.latest)}%</td><td>${spark(x.pcts)}</td><td><span class="chip ${gradeOf(x.best).min >= 45 ? 'ok' : gradeOf(x.best).min >= 35 ? 'warn' : 'bad'}">${gradeOf(x.best).label}</span></td></tr>`).join('')}</table></div>
    <p class="small muted" style="margin-bottom:0">Includes part-paper and single-section attempts, so compare full papers with full papers where you can.</p></div>
  <div style="margin:16px 0;display:flex;gap:8px;flex-wrap:wrap"><a class="btn pri" href="#/report">🖨 Overall report card (print / PDF)</a><button class="btn" id="csv">⬇ Export CSV</button><a class="btn" href="#/history">All results</a></div>`
  : '<div class="card empty" style="margin-top:16px">No tests yet — your scores, trend and weak chapters will show up here after your first test.<br><br><a class="btn pri" href="#/">Pick a subject</a></div>'}`;
  const csv = document.getElementById('csv'); if (csv) csv.onclick = exportCSV;
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
    <table class="rinfo"><tr><td><b>Subject</b></td><td>${esc(S.name)}</td><td><b>Paper</b></td><td colspan="3">${esc(P.title)} — ${esc(modeLabel(P, A.mode))}${P.kind === 'pyq' ? ' (Board ' + esc(P.year) + ', third-party copy)' : ' (mock test)'}</td></tr>
    <tr><td><b>Date</b></td><td>${dateStr(A.submittedAt)}</td><td><b>Time taken</b></td><td>${Math.round((A.submittedAt - A.startedAt) / 60000)} of ${Math.round((A.endsAt - A.startedAt) / 60000)} min</td><td><b>Pass mark</b></td><td>${BOARD.passPercent}%</td></tr></table>
    <div class="rscore"><div class="rbig"><b>${fmt(r.got)}</b> / ${r.total}</div><div class="rbig2">${fmt(r.pct)}%</div>
      <div><span class="chip ${g.min >= 45 ? 'ok' : g.min >= 35 ? 'warn' : 'bad'}" style="font-size:1rem">${g.label}</span> <span class="chip ${passed ? 'ok' : 'bad'}" style="font-size:1rem">${passed ? 'PASS' : 'BELOW PASS MARK'}</span></div></div>
    ${r.selfPending ? `<p class="small"><b>Note:</b> ${r.selfPending} written answer(s) were not self-marked yet, so they count as 0.</p>` : ''}
    <h3>Section-wise marks</h3><table class="rtab"><tr><th>Section</th><th>Marks</th><th>%</th><th style="width:30%">Performance</th></tr>${Object.entries(r.secs).map(([k, v]) => `<tr><td>${esc(k)}</td><td class="nowrap">${fmt(v.got)} / ${v.tot}</td><td>${fmt(v.tot ? v.got / v.tot * 100 : 0)}</td><td>${bar(v.got, v.tot)}</td></tr>`).join('')}
      <tr><td><b>Total</b></td><td><b>${fmt(r.got)} / ${r.total}</b></td><td><b>${fmt(r.pct)}</b></td><td></td></tr></table>
    <h3>Chapter-wise marks</h3><table class="rtab"><tr><th>Chapter</th><th>Marks</th><th>%</th><th style="width:30%">Performance</th></tr>${chaps.map(([k, v]) => `<tr><td>${esc(k)}</td><td class="nowrap">${fmt(v.got)} / ${v.tot}</td><td>${fmt(v.tot ? v.got / v.tot * 100 : 0)}</td><td>${bar(v.got, v.tot)}</td></tr>`).join('')}</table>
    <h3>Remarks</h3><ul class="clean">
      ${strong.length ? `<li><b>Strong:</b> ${strong.map(c => esc(c[0])).join('; ')}.</li>` : ''}
      ${weak.length ? `<li><b>Revise first:</b> ${weak.map(c => esc(c[0])).join('; ')}.</li>` : '<li>No chapter below 60% in this test.</li>'}
      <li>${r.wrong} answer(s) wrong and ${r.skip} left unattempted out of the questions that counted.</li></ul>
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
    <h3>Score trend</h3>${trendSvg(list.map(x => x.r.pct).slice(-20), 640, 170)}
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
  el.innerHTML = `<a href="#/profile" class="ubname" title="My profile">${esc(nm)}</a><span class="sdot ${si[0]}" title="${esc(si[1])}" aria-label="${esc(si[1])}"></span><button class="btn sm" id="signout">Sign out</button>`;
  document.getElementById('signout').onclick = doSignOut;
  const sl = document.getElementById('syncline'); if (sl) sl.innerHTML = `<span class="sdot ${si[0]}"></span> ${esc(si[1])}`;
}
async function doSignOut() {
  if (active() && !confirm('A test is in progress on this device. It stays saved under your account, but the timer keeps running. Sign out anyway?')) return;
  await AUTH.signOut(); nextHash = ''; location.hash = '#/login'; route();
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
        <h3 style="margin-top:14px">Score trend</h3>${trendSvg(all.slice(-20), 420, 150)}`
      : '<p class="muted">No tests yet — take your first test and your numbers appear here.</p><a class="btn pri" href="#/">Pick a subject</a>'}</div>
  </div>
  ${ss.length ? `<div class="card" style="margin-top:16px"><h3>Subject-wise progress</h3><div class="tscroll"><table><tr><th>Subject</th><th>Tests</th><th>Best</th><th>Average</th><th>Latest</th><th>Grade (best)</th></tr>
    ${ss.map(x => `<tr><td>${x.s.icon} <a href="#/subject/${x.s.key}">${esc(x.s.name)}</a></td><td>${x.n}</td><td>${fmt(x.best)}%</td><td>${fmt(x.avg)}%</td><td>${fmt(x.latest)}%</td><td><span class="chip ${gradeOf(x.best).min >= 45 ? 'ok' : gradeOf(x.best).min >= 35 ? 'warn' : 'bad'}">${gradeOf(x.best).label}</span></td></tr>`).join('')}</table></div>
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
app.innerHTML = '<div class="empty">Loading…</div>';
Promise.resolve(AUTH.init()).catch(() => {}).then(() => { ready = true; renderUserbox(); route(); });
})();

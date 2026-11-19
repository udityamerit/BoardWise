/* Answer checking for written answers + step-by-step layout of model answers.  Pure functions, no DOM: window.CHK.
   CHK.auto(q, answer)  -> null (cannot be checked automatically) or { f, marks, pts, hit, kind }
        f = fraction 0..1, marks = suggested marks (steps of 0.5), pts/hit = key points in the model answer / found in the answer
   CHK.looseNum(accept[], answer, tol) -> true if a typed short answer ("x = 3", "Rs. 1,150", "(2, 1)") matches an accepted answer
   CHK.steps(html) -> [{ kind: 'given'|'step'|'answer'|'note', html, items?, marks? }]  the model answer split into steps */
(function () {
const SUP = { '⁰': 0, '¹': 1, '²': 2, '³': 3, '⁴': 4, '⁵': 5, '⁶': 6, '⁷': 7, '⁸': 8, '⁹': 9 };
const decode = s => s.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&[a-z]+;/g, ' ');
const stripTags = h => decode(String(h == null ? '' : h).replace(/<sup>(.*?)<\/sup>/gi, '^$1').replace(/<sub>(.*?)<\/sub>/gi, '$1').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]*>/g, ''));
/* one spelling for maths: ² -> ^2, ₂ -> 2, − -> -, × -> *, ÷ -> / */
const mathNorm = s => String(s)
  .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, m => '^' + [...m].map(c => SUP[c]).join(''))
  .replace(/[₀-₉]/g, c => String(c.charCodeAt(0) - 0x2080))
  .replace(/[−–—‒﹣－]/g, '-').replace(/[×·∙⋅✕]/g, '*').replace(/÷/g, '/').replace(/＝/g, '=').replace(/\*\*/g, '^')
  .replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/⇒|→|⟹/g, '=>').toLowerCase();
const compact = s => s.replace(/\s+/g, '').replace(/[*·]/g, '').replace(/[.,;:]+$/, '');
const UNITS = /\b(or|and|cm|mm|km|m|kg|g|sq|units?|rs|rupees?|degrees?|metres?|meters?|min|minutes?|hours?|hrs?|sec|seconds?|years?|days?|per|cent|percent)\b\.?|[%₹°]/g;

/* ----- numbers ----- */
function nums(text) {
  let t = mathNorm(text).replace(/\^-?\d+/g, '');                      // drop exponents: x^2 -> x
  t = t.replace(/\d{1,3}(?:,\d{2,3})+(?!\d)/g, m => m.replace(/,/g, '')); // 1,50,000 -> 150000
  const out = [], re = /(\d+(?:\.\d+)?|\.\d+)(?:\s*\/\s*(\d+(?:\.\d+)?))?/g; let m;
  while ((m = re.exec(t))) {
    let v = parseFloat(m[1]); if (m[2] !== undefined) { const d = parseFloat(m[2]); if (d) v /= d; }
    let neg = false; const i = m.index - 1;
    if (i >= 0 && t[i] === '-') { const p = t[i - 1]; neg = p === undefined || /[\s=,(;:\[{]/.test(p); }
    out.push(neg ? -v : v);
  }
  return out;
}
const close = (a, b) => Math.abs(a - b) <= 1e-6 + 0.005 * Math.max(Math.abs(a), Math.abs(b));
function numCover(keyN, ansN) {
  if (!keyN.length) return null;
  const used = new Array(ansN.length).fill(false); let hit = 0;
  keyN.forEach(k => { const j = ansN.findIndex((a, i) => !used[i] && close(a, k)); if (j >= 0) { used[j] = true; hit++; } });
  return hit / keyN.length;
}

/* ----- words ----- */
const STOP = new Set(('a an the and or but if of to in on at by for with from as is are was were be been being am do does did has have had having it its this that these those there their they them he she his her him we our us you your i me my not no nor so than then too very can could will would shall should may might must also into over under about after before between each any all some such which who whom whose what when where why how only just more most other another both either neither one two three four five six seven eight nine ten per mark marks give given note eg ie etc using use used say said while during without within upon out up down off again further once here own same few many much because since although though however therefore thus hence').split(/\s+/));
const isIndic = s => /[ऀ-ॿ]/.test(s);
const stem = w => /^[a-z]+$/.test(w) && w.length > 4 ? w.replace(/(ing|ed|es|s|ly)$/, '') : w;
function words(text) {
  const t = mathNorm(stripTags(text));
  const out = [], re = /[\p{L}\p{M}]+|\d+(?:\.\d+)?/gu; let m;
  while ((m = re.exec(t))) {
    const w = m[0];
    if (/^\d/.test(w)) { out.push(w); continue; }
    if (w.length < 2 || (!isIndic(w) && STOP.has(w))) continue;
    out.push(stem(w));
  }
  return out;
}
const wordHit = (k, set, list) => set.has(k) || (k.length >= 6 && list.some(a => a.length >= 5 && (a.startsWith(k.slice(0, 5)) || k.startsWith(a.slice(0, 5)))));
/* mark annotations like "(1 mark)", "(any two)", "Marks: ..." are not part of the answer */
const cleanSol = h => String(h || '').replace(/\([^()]*\bmarks?\b[^()]*\)/gi, ' ').replace(/\(\s*any [^()]*\)/gi, ' ').replace(/\bmarks?\s*:[^.]*\.?/gi, ' ').replace(/\([^()]*\b(each|for the idea|activity)\b[^()]*\)/gi, ' ');

/* ----- bold key phrases = the final answers ----- */
function keysOf(sol) {
  const out = []; let m; const re = /<b>([\s\S]*?)<\/b>/gi;
  while ((m = re.exec(sol))) { const t = stripTags(m[1]).trim(); if (t && !/^(note|hint|tip|answer|solution|given|step\s*\d*|ans)[:.]?$/i.test(t) && !/\bmarks?\b/i.test(t)) out.push(t); }
  /* a bold fragment right after another one in the same sentence (e.g. "<b>x = 3 or</b> 1/2") is kept as it is */
  return out;
}
/* "1 A", "6 V", "10 Ω", "5 cm" -> the number alone (single-letter units only when separated by a space, so "5x" stays) */
const stripUnits = s => s.replace(/(\d)\s+(?:a|v|w|j|n|k|c|l|g|m|s|h|ω)\b/g, '$1 ').replace(/(\d)\s*(?:cm|mm|km|kg|mg|ml|hz|pa|mol|ω|°)(?![a-z])/g, '$1 ').replace(UNITS, ' ');
function keyKind(k) {
  const s = stripUnits(mathNorm(k));
  if ((s.match(/[a-z]{3,}/g) || []).length >= 2 || isIndic(s)) return 'text';
  const r = s.replace(/[a-z][a-z0-9_']*\s*(\([^)]*\))?\s*=/g, ' ').replace(/[\s(),;{}\[\]:]/g, '');
  if (/^[-+]?[\d./√π]+([-+,][\d./√π]+)*$/.test(r) || r === '') return 'num';
  return 'eq';
}
function keyScore(key, ans) {
  const k = mathNorm(key).trim(), a = mathNorm(ans);
  const kc = compact(k), ac = compact(a);
  if (!kc) return null;
  const kind = keyKind(key);
  if (kind === 'eq' && kc.length > 2 && ac.includes(kc)) return 1;
  if (kind === 'eq') {
    const body = kc.replace(/=0$/, ''); if (body.length > 3 && ac.includes(body)) return 1;
    const m = kc.match(/^[a-z()']{1,8}=(.+)$/); if (m && m[1].length > 3 && ac.includes(m[1])) return 1;
    const c = numCover(nums(key), nums(ans)); return c === 1 ? 0.5 : 0;   // right numbers but not in the same form: half
  }
  if (kind === 'num') {
    const kn = nums(stripUnits(mathNorm(key))); if (!kn.length) return ac.includes(kc) ? 1 : 0;
    const c = numCover(kn, nums(ans)); return c >= 0.99 ? 1 : c * 0.5;   // only some of the numbers right: at most half credit on that key
  }
  /* wording */
  const kw = [...new Set(words(key))]; if (!kw.length) return ac.includes(kc) ? 1 : null;
  const al = words(ans), as = new Set(al), hit = kw.filter(w => wordHit(w, as, al)).length / kw.length;
  return hit >= 0.85 ? 1 : hit;
}

const NOAUTO = /\b(draw|drawn|construct|construction|histogram|sketch|diagram|plot|graph|pie diagram|label|figure|tabulate|complete the table)\b/i;
const roundDown = (x) => Math.floor(x * 2 + 1e-9) / 2;

function auto(q, answer) {
  if (!q || q.type !== 'self') return null;
  const a = String(answer == null ? '' : answer).trim(); if (!a) return null;
  const qtxt = stripTags(q.q || '');
  if (NOAUTO.test(qtxt)) return null;
  const sol = String(q.solution || '');
  /* a bold conclusion ("Hence proved", "collinear") is not an answer worth marks on its own */
  const keys = keysOf(sol).filter(k => k.length <= 140 && !/\b(hence|proved|verified|shown|true|false|rejected)\b/i.test(k)
    && !(q.marks >= 2 && /^[A-Za-z]+(\s[A-Za-z]+)?$/.test(k.trim()) && !/^[a-z]$/i.test(k.trim())));
  let fk = null, pts = 0, hit = 0;
  if (keys.length) {
    const sc = keys.map(k => keyScore(k, a)).filter(x => x != null);
    if (sc.length) { fk = sc.reduce((s, x) => s + x, 0) / sc.length; pts = sc.length; hit = sc.filter(x => x >= 0.99).length; }
  }
  /* coverage of the model answer's own content words (minus words copied from the question). When the model answer has
     final answers, only real words count here: matching stray digits of the working must not turn a wrong answer into marks. */
  const qset = new Set(words(qtxt));
  let kw = [...new Set(words(cleanSol(sol)))];
  const fresh = kw.filter(w => !qset.has(w)); if (fresh.length >= 2) kw = fresh;
  if (fk != null) kw = kw.filter(w => !/^\d/.test(w));
  let fc = null;
  if (kw.length >= (fk != null ? 3 : 2)) {
    const al = words(a), as = new Set(al), n = kw.filter(w => wordHit(w, as, al)).length, cov = n / kw.length;
    const tau = /\bany (one|two|three|four|five|\d)\b/i.test(sol) ? 0.35 : 0.5;
    fc = cov < 0.12 ? 0 : Math.min(1, cov / tau);
    if (fk == null) { pts = kw.length; hit = n; }
  }
  if (fk == null && fc == null) return null;
  /* the final answer decides when the question has one; otherwise the content words do */
  const f = fk != null ? (fk >= 0.99 || fc == null ? fk : Math.max(fk, fc * 0.8)) : fc;
  const marks = f >= 0.98 ? q.marks : roundDown(f * q.marks);
  return { f, marks, pts, hit, kind: fk != null ? 'answer' : 'keywords' };
}

/* typed short answers: tolerate "x = 3", "Rs. 1,150", "(2, 1)", "5.83 %", "3 cm" */
function looseNum(accept, answer, tol) {
  const a = compact(mathNorm(String(answer))), an = nums(String(answer)), t = (tol != null ? tol : 1e-6) + 1e-9;
  return (accept || []).some(x => {
    const xs = String(x), xc = compact(mathNorm(xs));
    if (xc && (xc === a || a.endsWith('=' + xc))) return true;
    const kn = nums(xs.replace(UNITS, ' '));
    if (!kn.length) return false;
    if (kn.length === 1) return (an.length === 1 || (an.length === 2 && /=/.test(a))) && an.some(v => Math.abs(v - kn[0]) <= t);  // "3 cm", "x = 3"
    return an.length === kn.length && kn.every((k, i) => Math.abs(an[i] - k) <= t);                                                 // "(2, 1)"
  });
}

/* ----- step-by-step layout of a model answer ----- */
const ABBR = /(?:\b(?:e\.g|i\.e|etc|fig|no|dr|mr|mrs|ms|st|vs|approx|sq|rs|cf|viz)|\b[A-Za-z])\.$/i;
function stepsRaw(html) {
  /* 1. protect decimals and abbreviations, then cut at ";", " ⇒ ", ". " + capital, and before (i) (ii) (a) 1. markers */
  let s = String(html || '').replace(/\s+/g, ' ').trim();
  const out = []; let cur = '', depth = 0;
  const push = () => { if (cur.trim()) out.push(cur.trim()); cur = ''; };
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '<') {
      const j = s.indexOf('>', i); if (j < 0) { cur += s.slice(i); break; }
      const tag = s.slice(i, j + 1);
      if (/^<br/i.test(tag)) { if (depth === 0) { push(); i = j; continue; } }
      else if (/^<\//.test(tag)) depth = Math.max(0, depth - 1); else if (!/\/>$/.test(tag) && !/^<(img|hr)/i.test(tag)) depth++;
      cur += tag; i = j; continue;
    }
    if (depth === 0) {
      const rest = s.slice(i);
      if (ch === ';') { cur += ';'; push(); continue; }
      let m;
      if ((m = /^ ?(⇒|=>|⟹|→) /.exec(rest)) && cur.trim()) { push(); cur = '⇒ '; i += m[0].length - 1; continue; }
      if (ch === '.' && /^\.( |$)/.test(rest) && (!ABBR.test(stripTags(cur) + '.') || /^\. +[A-Z][a-z]{2,9} ?=[^=]/.test(rest)) && !/^\s*\d{1,2}$/.test(stripTags(cur))
          && (/^\. ?$/.test(rest) || /^\. +(?:<|[A-Z0-9(\[₹√∠ΔΣΠ]|[ऀ-ॿ])/.test(rest) || /^\. +[A-Za-zθσμΣΠ][\w₀-₉]{0,3}(?:\([^)]{0,8}\))? ?=[^=]/.test(rest))) { cur += '.'; push(); continue; }
      if ((m = /^ \((?:i{1,3}|iv|v|vi{0,3}|[a-e]|\d)\) /.exec(rest)) && cur.trim() && !/[:(]$/.test(cur.trim())) { push(); continue; }
      if (ch === ' ' && /^ (?:\d{1,2}[.)]) +(?:<|[A-Za-z])/.test(rest) && cur.trim() && /[.:;)]$/.test(cur.trim())) { push(); continue; }
    }
    cur += ch;
  }
  push();
  return out;
}

const plain = h => stripTags(h).replace(/\s+/g, ' ').trim();
function splitCommaTop(html) {
  const parts = []; let cur = '', depth = 0, par = 0;
  for (let i = 0; i < html.length; i++) {
    const ch = html[i];
    if (ch === '<') { const j = html.indexOf('>', i); const tag = html.slice(i, j + 1); if (/^<\//.test(tag)) depth = Math.max(0, depth - 1); else if (!/\/>$/.test(tag) && !/^<br/i.test(tag)) depth++; cur += tag; i = j; continue; }
    if (depth === 0 && /[(\[{]/.test(ch)) par++; if (depth === 0 && /[)\]}]/.test(ch)) par = Math.max(0, par - 1);
    if (ch === ',' && depth === 0 && par === 0 && html[i + 1] === ' ') { parts.push(cur.trim()); cur = ''; continue; }
    cur += ch;
  }
  parts.push(cur.trim());
  return parts.filter(Boolean);
}
const ASSIGN = /^[A-Za-zΔθσμπΣ][\wΔθσμ₀-₉'′]*(?:\s?[(\[][^)\]]*[)\]])?(?:\s?[₀-₉⁰-⁹^]\w*)? ?=[^=].*$/;
const ASSIGN_INNER = /^[A-Za-zΔθσμπΣ][\wΔθσμ₀-₉'′]*(?:\s?[(\[][^)\]]*[)\]])?\s?=\s?[^=<>]+$/;
function givenList(html) {
  const items = splitCommaTop(html);
  if (items.length < 2) return null;
  const ok = items.every(it => ASSIGN_INNER.test(plain(it)) && plain(it).length < 36);
  return ok ? items : null;
}

function steps(html) {
  let raw = stepsRaw(html);
  /* a leading "a = 10, d = 5, n = 20:" becomes a "given" list, the rest of that sentence its own step */
  const out = [];
  /* "x = −51/−17 = 3, y = −34/−17 = 2": one line per variable so each value sits next to its own name */
  const pushStep = (text, marks, onlyMulti) => {
    const lead = /^\s*(?:(⇒)\s*|\d{1,2}[.)]\s+)/.exec(text);
    const body = lead ? text.slice(lead[0].length) : text;
    let multi = splitCommaTop(body.replace(/\.$/, ''));
    /* "x = 5, 15, 25": bare values after an assignment belong to that assignment */
    multi = multi.reduce((a, it) => { if (a.length && !ASSIGN.test(plain(it)) && /^[-−+]?[\d.\/]+[^=]{0,12}$/.test(plain(it))) a[a.length - 1] += ', ' + it; else a.push(it); return a; }, []);
    if (multi.length >= 2 && multi.length <= 6 && multi.every(it => ASSIGN.test(plain(it)))) { multi.forEach((it, k) => out.push({ kind: 'step', html: (k === 0 && lead && lead[1] ? '⇒ ' : '') + it, marks: k === multi.length - 1 ? marks : null })); return; }
    if (onlyMulti) return false;
    out.push({ kind: 'step', html: text.replace(/^\s*⇒\s*/, '⇒ ').trim(), marks });
  };
  raw.forEach(p => {
    let text = p, marks = null, m;
    /* trailing mark annotations: "(1 mark)", "(Δ 1, substitution 1, roots 1)", "(2 marks)" */
    const tail = /\s*\(([^()]*\b(?:marks?|each)\b[^()]*|(?:[^()]*?\s\d+(?:½|\.5)?\s*(?:,|\)|$))[^()]*)\)\.?$/i.exec(text);
    if (tail && /\d/.test(tail[1]) && (/marks?|each/i.test(tail[1]) || /^[^()]{1,60}$/.test(tail[1]) && /(?:^|, )[^,]*\s\d+(?:½|\.5)?(?:,|$)/.test(tail[1]))) { marks = tail[1].trim(); text = text.slice(0, tail.index); }
    const onlyNote = /^\(?\s*(?:[^()]*\b(?:marks?|any \w+|each)\b[^()]*)\)?\.?$/i.test(plain(text)) && /marks?|any \w+/i.test(plain(text)) && plain(text).length < 70;
    if (onlyNote && out.length) { const prev = out[out.length - 1]; prev.marks = prev.marks ? prev.marks + '; ' + plain(text).replace(/^\(|\)\.?$/g, '') : plain(text).replace(/^\(|\)\.?$/g, ''); return; }
    const colon = /^((?:[^:<]|<[^>]*>)*?):\s+(.*)$/.exec(text);
    if (colon) {
      const g = givenList(colon[1].replace(/^(given|let|here)\s*[:,]?\s*/i, ''));
      if (g) { out.push({ kind: 'given', items: g }); if (colon[2].trim()) pushStep(colon[2].trim(), marks); return; }
      /* "Class marks 1, 3, 5: Σfx = …, Σf = …": the label is a line of its own, then one line per calculation */
      if (plain(colon[1]).length < 70 && !/\(\d+ marks?\)/i.test(colon[1])) { const mark = out.length; out.push({ kind: 'step', html: colon[1].trim() + ':', marks: null }); if (pushStep(colon[2].trim(), marks, true) !== false) return; out.length = mark; }
    }
    const g = givenList(text.replace(/\.$/, ''));
    if (g && g.length >= 2) { out.push({ kind: 'given', items: g, marks }); return; }
    pushStep(text, marks);
  });
  /* the last step that carries the bold result is the answer */
  let last = out.length - 1; while (last >= 0 && !(out[last].kind === 'step' && /<b>/i.test(out[last].html))) last--;
  if (last >= 0) {
    /* the run of steps that each end in a bold result is the answer (x = 3 / y = 2, or one line per option) */
    let i = last; while (i >= 0 && out[i].kind === 'step' && /<b>/i.test(out[i].html) && last - i < 5) { out[i].kind = 'answer'; i--; }
  }
  return out.filter(x => x.kind === 'given' || (plain(x.html || '') !== '' && plain(x.html || '') !== '.'));
}

window.CHK = { auto, looseNum, steps, nums, stripTags, _keys: keysOf, _words: words };
})();

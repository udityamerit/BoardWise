/* BoardWise in Hindi or English: the site's interface language.
   The pages are written in English (js/app.js, js/auth.js, js/ai.js, the board and subject data). When Hindi is chosen, everything the
   site shows is translated as it appears on the page, from the dictionary in js/i18n-hi.js:
     - a "run" is a stretch of text and inline markup (b, i, a, span, small, …) inside one block; the whole run is looked up first, so
       a sentence with bold words in it is translated as one sentence, and its elements (links, ids, event handlers) are kept;
     - keys may hold {1}, {2}… for values the page fills in (numbers, names); the values are translated too when the dictionary has them;
     - title / placeholder / aria-label attributes, alert / confirm / prompt messages and the tab title are translated the same way.
   Paper content is never touched: question text, options, solutions and answers (.qtext, .opt, .optr, .sol, …) stay in the paper's
   own medium (UP Board papers are in Hindi; the NEET papers have their own Hindi medium, see js/data/neet-hi.js).
   The choice is kept on this device (localStorage bw_lang). With nothing chosen yet, UP Board and Bihar Board start in Hindi, other boards in English.
   I18N.t(text) translates a string; I18N.left() lists the English still on the page (to fill in the dictionary). */
(function () {
'use strict';
const LSK = 'bw_lang', HI_BOARDS = ['upmsp', 'up9', 'up11', 'upneet', 'bseb'];
const get = k => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
let lang = get(LSK);
if (lang !== 'hi' && lang !== 'en') lang = HI_BOARDS.includes(get('bw_board')) ? 'hi' : 'en';
const I18N = window.I18N = { lang, dict: new Map(), pats: [] };

/* ---- dictionary ---- */
const norm = s => String(s).replace(/\s+/g, ' ').trim();
const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
I18N.add = obj => Object.keys(obj).forEach(k => {
  const key = norm(k), v = obj[k];
  if (/\{\d+\}/.test(key)) {
    let src = '^', n = 0;
    key.split(/\{(\d+)\}/).forEach((p, i) => { if (i % 2) { src += '([\\s\\S]+?)'; n++; } else src += reEsc(p); });
    const order = (key.match(/\{(\d+)\}/g) || []).map(x => +x.slice(1, -1));
    I18N.pats.push({ re: new RegExp(src + '$'), v, order, len: key.replace(/\{\d+\}/g, '').length });
    sorted = false;
  } else I18N.dict.set(key, v);
  /* "<span>Using now</span>" also serves the span's own text, met on its own when the run around it is not known whole */
  const w = /^<([a-z]+)>([^<]*)<\/>$/.exec(key), wv = w && new RegExp('^<' + w[1] + '>([\s\S]*)</' + w[1] + '>$').exec(v);
  if (wv && !/\{\d+\}/.test(w[2])) { if (!I18N.dict.has(w[2])) I18N.dict.set(w[2], wv[1]); }
  else if (wv) I18N.add({ [w[2]]: wv[1] });
});
let sorted = true;
/* js/i18n-hi.js: "id|हिन्दी" lines; js/i18n-en.js: [id, English key] (id = FNV-1a hash of the key, see tools/i18n-extract.js) */
const HI = new Map();
I18N.hiAdd = blob => String(blob).split('\n').forEach(l => { const m = /^([0-9a-f]{8})\|(.*)$/.exec(l); if (m) HI.set(m[1], m[2]); });
I18N.keys = pairs => { const o = {}; pairs.forEach(([id, k]) => { if (HI.has(id)) o[k] = HI.get(id); }); I18N.add(o); };
const WORD = /[A-Za-z]{2,}/;
const english = s => { const t = s.replace(/<[^>]+>/g, ' ').replace(/\{\d+\}/g, ' '); return WORD.test(t) || /(^|[^A-Za-z])Q\d/.test(t); }; /* "Q12" too */
const cache = new Map();
const balanced = x => { const st = []; for (const t of x.match(/<\/?[a-z]+>/g) || []) { if (t[1] !== '/') st.push(t); else if (st.pop() !== t.replace('/', '')) return false; } return !st.length; };
/* one piece of text (or a run's markup) -> Hindi, or null */
function tr(s, depth) {
  const k = norm(s);
  if (!k || !english(k)) return null;
  if (cache.has(k)) return cache.get(k);
  let out = I18N.dict.has(k) ? I18N.dict.get(k) : null;
  if (!sorted) { I18N.pats.sort((a, b) => b.len - a.len); sorted = true; }
  if (out == null && (depth || 0) < 4) {
    for (const p of I18N.pats) {
      const m = p.re.exec(k); if (!m) continue;
      /* a value is a whole piece (its tags close inside it) and not untranslated English prose ("average per" in "{1} test") */
      let ok = true;
      const vals = m.slice(1).map(x => { const h = english(x) ? tr(x, (depth || 0) + 1) : null; if (!balanced(x) || (h == null && english(x) && (/</.test(x) || /(^|[^A-Za-z])[a-z]{3,}/.test(x.replace(/<[^>]+>/g, ' '))))) ok = false; return h == null ? x : h; });
      if (!ok) continue;
      const ord = {}; p.order.forEach((n, i) => { ord[n] = vals[i]; });
      out = p.v.replace(/\{(\d+)\}/g, (_, n) => ord[n] != null ? ord[n] : '');
      break;
    }
  }
  /* symbols around known text: "⚛️ Physics", "Class X (SSC) ✓", "Maharashtra SSC ›" */
  if (out == null && (depth || 0) < 4) {
    const m = /^([^\p{L}\p{N}<"“(]*)([\s\S]*?)([^\p{L}\p{N}>.)"”]*)$/u.exec(k);
    if (m && (m[1] || m[3]) && m[2] && english(m[2])) { const h = tr(m[2], (depth || 0) + 1); if (h != null) out = m[1] + h + m[3]; }
  }
  /* a run made of several sentences, each known on its own */
  if (out == null && (depth || 0) < 4) {
    const ss = k.split(/(?<=[.?!:;](?:<\/[a-z]+>)*)\s+(?=(?:<[a-z]+>)*[A-Z0-9"“(+−₹])/);
    if (ss.length > 1) { const hs = ss.map(x => english(x) ? tr(x, (depth || 0) + 1) : x); if (hs.every(h => h != null)) out = hs.join(' '); }
  }
  cache.set(k, out);
  return out;
}
/* a plain string (alert text, attribute, tab title): whole, else line by line, else sentence by sentence; keeps it as it is when unknown */
I18N.t = s => {
  if (lang !== 'hi' || s == null) return s;
  s = String(s);
  const whole = tr(s); if (whole != null) return whole;
  if (s.includes('\n')) return s.split('\n').map(l => I18N.t(l)).join('\n');
  const parts = s.match(/[^.?!]+[.?!]+(?:\s+|$)|[^.?!]+$/g);
  if (parts && parts.length > 1) return parts.map(p => { const h = tr(p, 0); return h == null ? p : h + (/\s$/.test(p) ? ' ' : ''); }).join('');
  return s;
};
I18N.set = l => { try { localStorage.setItem(LSK, JSON.stringify(l)); } catch (e) {} location.reload(); };

/* ---- the switch in the top bar ---- */
function addSwitch() {
  const bar = document.getElementById('topbar'); if (!bar || document.getElementById('langsw')) return;
  const b = document.createElement('button');
  b.id = 'langsw'; b.type = 'button'; b.className = 'langsw'; b.setAttribute('translate', 'no');
  b.title = lang === 'hi' ? 'Switch to English' : 'हिन्दी में देखें (Switch to Hindi)';
  b.setAttribute('aria-label', b.title);
  b.innerHTML = `<span class="${lang === 'en' ? 'on' : ''}">EN</span><span class="${lang === 'hi' ? 'on' : ''}">हिं</span>`;
  b.onclick = () => I18N.set(lang === 'hi' ? 'en' : 'hi');
  bar.insertBefore(b, document.getElementById('userbox'));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addSwitch); else addSwitch();
if (lang !== 'hi') return;

/* ---- translating the page ---- */
document.documentElement.lang = 'hi';
const SKIP = 'script,style,textarea,code,pre,svg,canvas,[translate="no"],.qtext,.opt,.optr,.sol,.passage,.your,.en-alt,.fig,.aifb,.tmsg,.mdl';
const INLINE = new Set(['B', 'STRONG', 'I', 'EM', 'A', 'SPAN', 'SMALL', 'SUP', 'SUB', 'U', 'MARK', 'ABBR', 'BR', 'KBD', 'S', 'Q', 'TIME']);
const ATTRS = ['title', 'placeholder', 'aria-label', 'data-l', 'data-tip'];
const isInline = n => n.nodeType === 3 || (n.nodeType === 1 && INLINE.has(n.tagName) && !n.matches(SKIP) && !n.querySelector('div,p,ul,ol,li,table,h1,h2,h3,h4,h5,h6,button,select,input,textarea,label,img,svg,canvas,details,section,form,' + SKIP));
const ser = nodes => nodes.map(n => n.nodeType === 3 ? n.nodeValue : n.tagName === 'BR' ? '<br>' : `<${n.tagName.toLowerCase()}>${ser([...n.childNodes])}</${n.tagName.toLowerCase()}>`).join('');
/* Hindi markup -> a light tree: [{t: text} | {tag, kids}] */
function parse(h) {
  const root = { kids: [] }, stack = [root];
  h.split(/(<\/?[a-z]+\s*\/?>)/i).forEach(tok => {
    if (!tok) return;
    const m = /^<(\/?)([a-z]+)\s*\/?>$/i.exec(tok);
    if (!m) { stack[stack.length - 1].kids.push({ t: tok }); return; }
    const tag = m[2].toUpperCase();
    if (tag === 'BR') { stack[stack.length - 1].kids.push({ tag, kids: [] }); return; }
    if (m[1]) { if (stack.length > 1) stack.pop(); return; }
    const el = { tag, kids: [] }; stack[stack.length - 1].kids.push(el); stack.push(el);
  });
  return root.kids;
}
const sameShape = (ens, his) => {
  const a = ens.filter(n => n.nodeType === 1), b = his.filter(n => n.tag);
  return a.length === b.length && a.every((e, i) => e.tagName === b[i].tag && sameShape([...e.childNodes], b[i].kids));
};
/* put the Hindi into the existing nodes: elements stay (with their ids, links and handlers), only the text between them changes */
function fill(parent, ens, his) {
  const els = ens.filter(n => n.nodeType === 1), gaps = [''];
  his.forEach(h => { if (h.tag) gaps.push(''); else gaps[gaps.length - 1] += h.t; });
  const anchor = ens[ens.length - 1].nextSibling;
  ens.forEach(n => { if (n.nodeType === 3) n.remove(); });
  const put = (txt, before) => { if (txt) parent.insertBefore(document.createTextNode(txt), before); };
  els.forEach((e, i) => put(gaps[i], e));
  put(gaps[els.length], els.length ? els[els.length - 1].nextSibling : anchor);
  els.forEach((e, i) => { const hk = his.filter(h => h.tag)[i].kids; if (e.tagName !== 'BR' && (e.childNodes.length || hk.length)) fill(e, [...e.childNodes].length ? [...e.childNodes] : [e.appendChild(document.createTextNode(''))], hk); });
}
function build(his, ens) {
  const pool = ens.filter(n => n.nodeType === 1);
  return his.map(h => {
    if (!h.tag) return document.createTextNode(h.t);
    const i = pool.findIndex(e => e.tagName === h.tag), e = i >= 0 ? pool.splice(i, 1)[0].cloneNode(false) : document.createElement(h.tag);
    build(h.kids, []).forEach(c => e.appendChild(c));
    return e;
  });
}
function applyRun(parent, nodes) {
  if (!nodes.some(n => n.nodeType === 1 || english(n.nodeValue))) return;
  const key = ser(nodes), lead = /^\s/.test(key) ? ' ' : '', trail = /\s$/.test(key) ? ' ' : '';
  const hi = tr(key, nodes.length === 1 && nodes[0].nodeType === 3 ? undefined : 0);
  if (hi != null) {
    const tree = parse(lead + hi + trail);
    if (sameShape(nodes, tree)) fill(parent, nodes, tree);
    else { const fresh = build(tree, nodes), anchor = nodes[nodes.length - 1].nextSibling; nodes.forEach(n => n.remove()); fresh.forEach(f => parent.insertBefore(f, anchor)); }
    return;
  }
  /* no whole-run match: each piece on its own */
  if (nodes.length === 1 && nodes[0].nodeType === 3) return;
  nodes.forEach(n => { if (n.nodeType === 3) applyRun(parent, [n]); else if (n.tagName !== 'BR') walk(n); });
}
function walk(el) {
  if (el.nodeType !== 1 || el.matches(SKIP)) return;
  ATTRS.forEach(a => { const v = el.getAttribute(a); if (v && english(v)) { const h = I18N.t(v); if (h !== v) el.setAttribute(a, h); } });
  if (el.tagName === 'INPUT' && /^(button|submit)$/i.test(el.type) && english(el.value)) el.value = I18N.t(el.value);
  if (el.tagName === 'OPTION' || el.tagName === 'TITLE') { const h = I18N.t(el.textContent); if (h !== el.textContent) el.textContent = h; return; }
  let run = [];
  const flush = () => { if (run.length) applyRun(el, run); run = []; };
  [...el.childNodes].forEach(n => {
    if (isInline(n)) run.push(n);
    else { flush(); if (n.nodeType === 1) walk(n); }
  });
  flush();
}
/* translate what is rendered, now and whenever the page changes (batched once per frame) */
let busy = false, queued = new Set(), raf = 0;
const blockOf = n => { let e = n.nodeType === 1 ? n : n.parentNode; while (e && e !== document.body && e.nodeType === 1 && isInline(e)) e = e.parentNode; return e; };
function run() {
  raf = 0; busy = true;
  try {
    const list = [...queued]; queued.clear();
    list.filter(e => e && e.isConnected && !list.some(o => o !== e && o.contains && o.contains(e))).forEach(e => { if (!(e.closest && e.closest(SKIP))) walk(e); });
    const t = document.title, h = I18N.t(t); if (h !== t) document.title = h;
  } finally { mo.takeRecords(); busy = false; }
}
/* English still showing on this page, as dictionary keys (runs) */
const KEEP = /\b(BoardWise|NEET|NCERT|UPMSP|MSBSHSE|MPBSE|BSEB|SSC|HSC|SSLC|CBSE|ICSE|ISC|UP|MP|PCMB|OMR|MCQs?|UG|AI|CSV|JSON|PDF|GitHub|URL|ID|OK|I{1,3}|IV|VI{0,3}|IX|XI{0,2}|tiwariacademy\.com|omtexclasses\.com|[A-Z][a-z]?)\b/g;
I18N.left = () => {
  const out = new Set();
  const english = s => WORD.test(s.replace(/<[^>]+>/g, ' ').replace(/\{\d+\}/g, ' ').replace(KEEP, ' ').replace(/\S+@\S+/g, ' '));
  const look = el => {
    if (el.nodeType !== 1 || el.matches(SKIP)) return;
    let r = [];
    const fl = () => { if (r.length) { const k = norm(ser(r)); if (english(k.replace(/<[^>]+>/g, ' '))) out.add(k); } r = []; };
    [...el.childNodes].forEach(n => { if (isInline(n)) r.push(n); else { fl(); look(n); } });
    fl();
    ATTRS.forEach(a => { const v = el.getAttribute(a); if (v && english(v)) out.add('@' + a + ': ' + v); });
  };
  look(document.body);
  return [...out];
};
const mo = new MutationObserver(ms => {
  if (busy) return;
  ms.forEach(m => { const b = blockOf(m.target); if (b) queued.add(b); });
  if (!raf) raf = requestAnimationFrame(run);
});
function start() {
  queued.add(document.body); run();
  mo.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  new MutationObserver(() => { if (!busy) { const t = document.title, h = I18N.t(t); if (h !== t) document.title = h; } }).observe(document.querySelector('title'), { childList: true });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
/* messages shown by the browser */
['alert', 'confirm', 'prompt'].forEach(f => { const o = window[f]; if (o) window[f] = function (msg, ...rest) { return o.call(window, I18N.t(msg), ...rest); }; });
})();

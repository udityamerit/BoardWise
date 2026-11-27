/* Hindi medium for the NEET-pattern papers (UP Board Class XI, NCERT): the runtime translator.
   The English question banks stay the single source of truth (answers, marking and shuffling are worked out on them). The Hindi of
   every piece of text a student reads is kept in js/data/neet-hi-{phy,chem,bot,zoo,maths}.js as "id|हिन्दी" lines, where id is the
   FNV-1a hash of the English text (tools/neet-hi-extract.js lists what still needs Hindi). Text the banks build with ${…} is matched
   against the English templates in js/data/neet-hi-tpl.js and its inserted parts are translated in turn, so a numerical question
   comes out in Hindi with its own numbers. Statement, List-I/List-II and Assertion–Reason questions carry their own Hindi builder
   (hf, see neet-config.js). NL.hiQ("<paperId>|<questionId>") gives { q, o, s } in Hindi with o in the paper's option order;
   any part without Hindi is null, and the app then shows the English for that part. */
(function () {
const NL = window.NL; if (!NL) return;
const H = new Map();                       // id -> Hindi
let TPL = [], built = null;                // English templates [id, key] -> { id, re, n }
const hid = s => NL.hash(s).toString(16).padStart(8, '0');
NL.hid = hid;
NL.hiAdd = blob => String(blob).split('\n').forEach(l => { const m = /^([0-9a-f]{8})\|(.*)$/.exec(l); if (m) H.set(m[1], m[2]); });
NL.hiTpl = arr => { TPL = arr; built = null; };
NL.hiHas = id => H.has(id);

/* does a piece of text need Hindi? (English words left once tags, entities, placeholders and maths words are removed) — same rule as the extractor */
const MATHW = /\b(sin|cos|tan|cot|sec|cosec|lim|log|ln|exp|max|min|arg|mod|sup|sub|mol|var|pH|pOH|Linn|th|nd|rd|st)\b/g;
const needs = s => /[A-Za-z]{3,}|(^|\s)(is|of|is a)(\s|$)/.test(String(s).replace(/<[^>]+>/g, ' ').replace(/&\w+;/g, ' ').replace(/\{\d+\}/g, ' ').replace(MATHW, ' '));
NL.hiNeeds = needs;

/* the fixed option sets and frames of the question helpers (also built directly by hf; listed here for text that reaches T as a whole) */
const FIXED = {
  'Both Statement I and Statement II are true': 'कथन I और कथन II दोनों सत्य हैं',
  'Both Statement I and Statement II are false': 'कथन I और कथन II दोनों असत्य हैं',
  'Statement I is true but Statement II is false': 'कथन I सत्य है परन्तु कथन II असत्य है',
  'Statement I is false but Statement II is true': 'कथन I असत्य है परन्तु कथन II सत्य है',
  'Only one': 'केवल एक', 'Only two': 'केवल दो', 'Only three': 'केवल तीन', 'All four': 'चारों',
  'Both A and R are true and R is the correct explanation of A': 'A और R दोनों सत्य हैं तथा R, A की सही व्याख्या है',
  'Both A and R are true but R is NOT the correct explanation of A': 'A और R दोनों सत्य हैं परन्तु R, A की सही व्याख्या नहीं है',
  'A is true but R is false': 'A सत्य है परन्तु R असत्य है',
  'A is false but R is true': 'A असत्य है परन्तु R सत्य है'
};

const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function tpls() {
  if (built) return built;
  built = TPL.map(([id, key]) => {
    const parts = key.split(/\{(\d+)\}/); let src = '^', n = 0;
    parts.forEach((p, i) => { if (i % 2) { src += '([\\s\\S]*?)'; n++; } else src += esc(p); });
    return { id, key, re: new RegExp(src + '$'), n };
  });
  return built;
}

const cache = new Map();
function exact(s) {
  if (FIXED[s]) return FIXED[s];
  const id = hid(s); if (H.has(id)) { if (NL.hiUsed) NL.hiUsed.add(id); return H.get(id); }
  return null;
}
/* English text -> Hindi, or null when some of it has no Hindi */
function T(s, depth) {
  if (s == null) return s;
  s = String(s);
  if (!needs(s)) return s;
  if (cache.has(s)) return cache.get(s);
  depth = depth || 0;
  let out = exact(s);
  /* the same text with surrounding spaces / line breaks, or with its first letter's case changed by the sentence it was put into */
  if (out == null) {
    const m = /^((?:\s|<br>)*)([\s\S]*?)((?:\s|<br>)*)$/.exec(s);
    if (m[1] || m[3]) { const x = exact(m[2]); if (x != null) out = m[1] + x + m[3]; }
    if (out == null) {
      const alt = s[0] === s[0].toUpperCase() ? s[0].toLowerCase() + s.slice(1) : s[0].toUpperCase() + s.slice(1);
      out = exact(alt);
    }
  }
  /* generated text: an English template with its inserted values translated in turn */
  if (out == null && depth < 6) {
    for (const t of tpls()) {
      /* a template with no English words of its own needs no Hindi line: only its inserted values are translated */
      const hi = H.has(t.id) ? H.get(t.id) : needs(t.key) ? null : t.key;
      const m = hi != null && t.re.exec(s); if (!m) continue;
      const caps = m.slice(1).map(c => needs(c) ? T(c, depth + 1) : c);
      if (caps.some(c => c == null)) continue;
      /* an English plural ending put in by the generator ("{1} element{2}" with "s") has no place after a Hindi word */
      if (NL.hiUsed) NL.hiUsed.add(t.id);
      out = hi.replace(/\{(\d+)\}/g, (_, k, off, str) => { const c = caps[k - 1]; return c == null || (/^e?s$/.test(c) && /[ऀ-ॿ]$/.test(str.slice(0, off))) ? '' : c; });
      break;
    }
  }
  /* a number with a unit or a word after it: "12 newton" */
  if (out == null && depth < 6) {
    const m = /^([−\-+]?[\d.,]+(?:\s*×\s*10<sup>[−\-]?\d+<\/sup>)?)(\s+)([\s\S]+)$/.exec(s);
    if (m) {
      const x = T(m[3], depth + 1);
      if (x != null) out = m[1] + m[2] + x;
      else { const y = exact(' ' + m[3]); if (y != null) out = m[1] + y; }   // a piece written with its leading space (" molecules")
    }
  }
  /* text joined from several pieces with line breaks */
  if (out == null && depth < 6 && s.includes('<br>')) {
    const parts = s.split('<br>').map(p => T(p, depth + 1));
    if (parts.every(p => p != null)) out = parts.join('<br>');
  }
  cache.set(s, out);
  return out;
}
NL.T = s => T(s, 0);

/* a NEET question in Hindi: { q, o, s } (o in the paper's option order); a part that has no Hindi is null */
const QC = new Map();
NL.hiQ = key => {
  if (QC.has(key)) return QC.get(key);
  const src = NL.src && NL.src.get(key); let r = null;
  if (src) {
    const it = src.it; let h = it.hf ? it.hf() || { q: null, o: null, s: null } : null;
    if (!h) h = { q: NL.T(it.q), o: it.o.map(x => NL.T(x)), s: it.s ? NL.T(it.s) : "" };
    r = { q: h.q, o: h.o && h.o.every(x => x != null) ? src.p.map(i => h.o[i]) : null, s: h.s };
  }
  QC.set(key, r);
  return r;
};
NL.hiReset = () => { cache.clear(); QC.clear(); };
})();

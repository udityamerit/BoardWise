/* Hindi medium for the NEET-pattern papers — extraction step.
   Scans the English question banks (js/data/neet-{phy,chem,bot,zoo,maths}.js) for every string and template literal that a
   student can read, and
     1. writes js/data/neet-hi-tpl.js: the English template literals (with ${…} turned into {1}, {2}, …) that the runtime
        translator matches generated text against;
     2. prints (or, with --out FILE, writes) a worksheet "id<TAB>English" of every literal that has no Hindi yet in
        js/data/neet-hi-*.js, so it can be translated.
   Ids are the FNV-1a hash (NL.hash) of the English text, as 8 hex digits. Run: node tools/neet-hi-extract.js [--all] [--bank phy] [--out f] */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const BANKS = ['phy', 'chem', 'bot', 'zoo', 'maths'];
const hash = s => { let h = 2166136261; s = String(s); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(16).padStart(8, '0'); };

/* ---- a small JS scanner: finds string and template literals (template expressions are scanned recursively) ---- */
function scan(src) {
  const out = [];
  let i = 0, prevSig = '';
  const REGEX_PREV = '(,=:[!&|?{};+-*%<>~^';
  const cook = raw => { try { return (0, eval)('`' + raw.replace(/`/g, '\\`') + '`'); } catch (e) { return raw; } };
  function str(q) {             // at opening quote
    let j = i + 1, raw = '';
    while (j < src.length && src[j] !== q) { if (src[j] === '\\') { raw += src[j] + src[j + 1]; j += 2; } else raw += src[j++]; }
    let val; try { val = (0, eval)(q + raw + q); } catch (e) { val = raw; }
    out.push({ kind: 'str', value: val, at: i });
    i = j + 1; prevSig = 'a';
  }
  function tpl() {              // at opening backtick
    const start = i; i++;
    const chunks = []; let cur = '', nExpr = 0;
    while (i < src.length && src[i] !== '`') {
      if (src[i] === '\\') { cur += src[i] + src[i + 1]; i += 2; continue; }
      if (src[i] === '$' && src[i + 1] === '{') { chunks.push(cur); cur = ''; nExpr++; i += 2; code(true); i++; continue; }
      cur += src[i++];
    }
    chunks.push(cur); i++; prevSig = 'a';
    const key = chunks.map(cook).reduce((a, c, k) => a + (k ? '{' + k + '}' : '') + c, '');
    out.push({ kind: nExpr ? 'tpl' : 'str', value: key, at: start });
  }
  function regex() { i++; let cls = false; while (i < src.length) { const c = src[i]; if (c === '\\') { i += 2; continue; } if (c === '[') cls = true; else if (c === ']') cls = false; else if (c === '/' && !cls) break; i++; } i++; while (/[a-z]/i.test(src[i] || '')) i++; prevSig = 'a'; }
  function code(inExpr) {
    let depth = 0;
    while (i < src.length) {
      const c = src[i];
      if (c === '/' && src[i + 1] === '/') { while (i < src.length && src[i] !== '\n') i++; continue; }
      if (c === '/' && src[i + 1] === '*') { i = src.indexOf('*/', i + 2) + 2; continue; }
      if (c === "'" || c === '"') { str(c); continue; }
      if (c === '`') { tpl(); continue; }
      if (c === '/' && (prevSig === '' || REGEX_PREV.includes(prevSig) || /\breturn$/.test(src.slice(Math.max(0, i - 8), i).trimEnd()))) { regex(); continue; }
      if (inExpr) { if (c === '{') depth++; else if (c === '}') { if (depth === 0) return; depth--; } }
      if (!/\s/.test(c)) prevSig = /[\w$)\]]/.test(c) ? 'a' : c;
      i++;
    }
  }
  code(false);
  return out;
}

/* does a text need translating? (English words left once tags, entities and maths words are removed) */
const MATHW = /\b(sin|cos|tan|cot|sec|cosec|lim|log|ln|exp|max|min|arg|mod|sup|sub|mol|var|pH|pOH|Linn|th|nd|rd|st)\b/g;
const needs = s => /[A-Za-z]{3,}|(^|\s)(is|of|is a)(\s|$)/.test(String(s).replace(/<[^>]+>/g, ' ').replace(/&\w+;/g, ' ').replace(/\{\d+\}/g, ' ').replace(MATHW, ' '));
const SKIP = new Set(['easy', 'medium', 'hard', 'mat', 'phy', 'chem', 'bot', 'zoo']);

function extract(bank) {
  const src = fs.readFileSync(path.join(ROOT, 'js/data/neet-' + bank + '.js'), 'utf8');
  const chapters = new Set([...src.matchAll(/^(?:let |const )?(?:C|ch) = '([^']+)';/gm)].map(m => m[1]));
  /* a template with no English words ("{1} — <b>{2}</b>.", a worked formula) is kept too: generated text is matched against it
     and only its inserted values are translated */
  return scan(src).filter(l => (needs(l.value) || (l.kind === 'tpl' && /\S/.test(l.value.replace(/\{\d+\}/g, ''))))
    && !SKIP.has(l.value) && !chapters.has(l.value));
}

/* Hindi already written: js/data/neet-hi-*.js, lines "id|text" inside NL.hiAdd(`…`) */
function known() {
  const k = new Map();
  fs.readdirSync(path.join(ROOT, 'js/data')).filter(f => /^neet-hi-(?!tpl).*\.js$/.test(f)).forEach(f => {
    const s = fs.readFileSync(path.join(ROOT, 'js/data', f), 'utf8');
    for (const m of s.matchAll(/^([0-9a-f]{8})\|(.*)$/gm)) k.set(m[1], { hi: m[2], file: f });
  });
  return k;
}

if (require.main === module) {
  const args = process.argv.slice(2), opt = n => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
  const only = opt('--bank'), outFile = opt('--out'), all = args.includes('--all');
  const K = known(), tpls = new Map(), seen = new Map(), lines = [];
  let total = 0, todo = 0;
  BANKS.forEach(b => {
    const lits = extract(b);
    lits.forEach(l => {
      const id = hash(l.value);
      if (seen.has(id) && seen.get(id) !== l.value) throw new Error('hash collision: ' + id);
      if (seen.has(id)) return;
      seen.set(id, l.value); total++;
      if (l.kind === 'tpl') tpls.set(id, l.value);
      if ((!only || only === b) && (all || !K.has(id)) && needs(l.value)) { todo++; lines.push(id + '\t' + l.value.replace(/\n/g, ' ')); }
    });
  });
  const tplArr = [...tpls].sort((a, b) => b[1].replace(/\{\d+\}/g, '').length - a[1].replace(/\{\d+\}/g, '').length);
  fs.writeFileSync(path.join(ROOT, 'js/data/neet-hi-tpl.js'),
    '/* GENERATED by tools/neet-hi-extract.js — do not edit. English template literals of the NEET question banks ({n} = inserted value), longest first. */\n' +
    'window.NL && window.NL.hiTpl(' + JSON.stringify(tplArr).replace(/\],\[/g, '],\n[') + ');\n');
  const stale = [...K.keys()].filter(id => !seen.has(id));
  if (outFile) fs.writeFileSync(outFile, lines.join('\n') + '\n'); else if (lines.length) console.log(lines.join('\n'));
  console.error(`literals ${total} (templates ${tpls.size}) · translated ${total - [...seen.keys()].filter(id => !K.has(id)).length} · listed ${todo} · unused Hindi ids ${stale.length}${stale.length ? ': ' + stale.slice(0, 20).join(' ') : ''}`);
}
module.exports = { scan, needs, hash, extract };

/* Hindi interface — extraction step (see js/i18n.js).
   Finds the English text the site shows (js/app.js, js/auth.js, js/ai.js, index.html and the board / subject / paper descriptions)
   and splits it the way js/i18n.js meets it on the page: runs of text and inline markup inside one block, with values the page fills
   in as {1}, {2}…; title / placeholder / aria-label values are taken too. Then
     1. writes js/i18n-en.js: the English key of every run that has Hindi in js/i18n-hi.js (as [id, key]);
     2. prints (or writes, --out FILE) a worksheet "id<TAB>English" of the runs with no Hindi yet (--all: every run).
   Ids are the FNV-1a hash of the key. Run: node tools/i18n-extract.js [--all] [--out FILE] */
'use strict';
const fs = require('fs'), path = require('path');
const { scan, hash } = require('./neet-hi-extract.js');
const ROOT = path.join(__dirname, '..');
const rd = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

/* sources: whole files, or the part of a data file that describes boards / subjects / papers (not the questions) */
const SOURCES = [
  ['js/app.js'], ['js/auth.js'], ['js/ai.js'], ['js/data/boards.js'], ['js/data/author.js'], ['js/data/config.js'],
  ['js/data/neet-config.js', s => s.slice(0, s.indexOf('/* ---------------- question-bank toolkit'))],
  ['js/data/neet-build.js'],
  ['js/data/up-config.js'], ['js/data/up11-build.js']
];
const BLOCK = 'div|p|ul|ol|li|h[1-6]|table|thead|tbody|tr|td|th|button|label|section|aside|header|footer|nav|main|details|summary|select|option|textarea|input|form|fieldset|legend|dl|dt|dd|figure|figcaption|canvas|svg|img|hr|blockquote|pre|title|meta|link|script|style|iframe|video|audio|source|path|circle|line|rect|text|g|polyline';
const INL = 'b|strong|i|em|a|span|small|sup|sub|u|mark|abbr|br|kbd|s|q|time';
const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ', '&middot;': '·', '&times;': '×', '&rarr;': '→', '&larr;': '←', '&hellip;': '…', '&mdash;': '—', '&ndash;': '–' };
const dec = s => s.replace(/&[#\w]+;/g, e => ENT[e] || e);
const norm = s => s.replace(/\s+/g, ' ').trim();
const english = s => /[A-Za-z]{2,}/.test(s.replace(/<[^>]+>/g, ' ').replace(/\{\d+\}/g, ' '));
/* looks like code, not text: class lists, ids, selectors, URLs, storage keys, event names, CSS */
const codey = s => /^[a-z0-9_\-.#\[\]=:>*"'()\/\s,]*$/.test(s) && !/[a-z]{3,} [a-z]{3,} [a-z]{3,}/.test(s) || /^(https?:|mailto:|#\/|\.\/|js\/|data:)/.test(s) || /[{};]\s*$|^\s*[.#]?[\w-]+\s*\{|:\s*[\w#-]+;/.test(s) || /^[\w.-]+@[\w.-]+$/.test(s) || /=>|\bfunction\b|\breturn\b|\.(js|css|svg|png|json)\b/.test(s);

const renum = k => { let n = 0; const map = {}; return k.replace(/\{(\d+)\}/g, (_, d) => '{' + (map[d] = map[d] || ++n) + '}'); };
function runs(text) {
  const out = [];
  text = text.replace(/<!--[\s\S]*?-->/g, '');
  /* attribute values a reader sees */
  for (const m of text.matchAll(/\b(?:title|placeholder|aria-label|alt)="([^"]*)"/g)) out.push(m[1]);
  /* drop attributes from tags, split at block tags */
  const t = text.replace(new RegExp(`<(\\/?)(${INL})\\b[^>]*>`, 'gi'), (_, sl, tag) => `<${sl}${tag.toLowerCase()}>`)
    .replace(new RegExp(`<\\/?(?:${BLOCK})\\b[^>]*>`, 'gi'), '\u0001')
    .replace(new RegExp(`<(?!\\/?(?:${INL})>)\\/?[a-z][^>]*>`, 'gi'), '\u0001');
  t.split('\u0001').forEach(r => out.push(r));
  return out.map(r => {
    let k = norm(dec(r)), n = 0; const map = {};
    k = k.replace(/\{(\d+)\}/g, (_, d) => '{' + (map[d] = map[d] || ++n) + '}');
    return k;
  }).map(k => /^\{\d+\}\s*\{\d+\}|\{\d+\}\s*\{\d+\}$/.test(k) ? renum(k.replace(/^(?:\{\d+\}\s*)+|(?:\s*\{\d+\})+$/g, '')) : k).filter(k => k && english(k) && !/^\{\d+\}$/.test(k) && !codey(k.replace(/\{\d+\}/g, '')));
}

function harvest() {
  const keys = new Map();
  const put = (k, f) => { if (!keys.has(k)) keys.set(k, f); };
  SOURCES.forEach(([f, cut]) => {
    let src = rd(f); if (cut) src = cut(src);
    if (f.endsWith('.html')) { runs(src.replace(/<script[\s\S]*?<\/script>/g, '')).forEach(k => put(k, f)); return; }
    scan(src).forEach(l => runs(l.value).forEach(k => put(k, f)));
  });
  runs(rd('index.html').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<head>[\s\S]*?<\/head>/, m => (m.match(/<title>[\s\S]*?<\/title>/) || [''])[0])).forEach(k => put(k, 'index.html'));
  /* subject and paper descriptions of every board (data files register them with these fields) */
  const sb = { console, Math, JSON, Map, Set, PAPERS: [], SUBJECTS: [] }; sb.window = sb; sb.self = sb;
  const vm = require('vm'); vm.createContext(sb);
  [...rd('index.html').matchAll(/<script src="(js\/data\/[^"?]+)/g)].map(m => m[1]).filter(f => !/neet-hi/.test(f)).forEach(f => { try { vm.runInContext(rd(f), sb, { filename: f }); } catch (e) {} });
  const meta = [];
  sb.SUBJECTS.forEach(s => { meta.push(s.name, s.short, s.blurb, s.note, s.durationNote); (s.pattern || []).forEach(r => meta.push(r[0], r[2])); Object.keys(s.chapters || {}).forEach(k => { meta.push(k); s.chapters[k].forEach(c => meta.push(c)); }); });
  sb.PAPERS.forEach(p => { meta.push(p.title, p.desc, p.note); p.sections.forEach(x => meta.push(x.title)); });
  Object.values(sb.BOARD_CFG || {}).forEach(c => { meta.push(c.heroTitle, c.heroText, c.examWindow, c.medium, c.chapterNote, c.passName, c.passYes, c.passNo); (c.grades || []).forEach(g => meta.push(g.label)); (c.patternPoints || []).forEach(x => meta.push(x)); });
  (sb.BOARDS || []).forEach(b => meta.push(b.name, b.full, b.short, b.state, b.medium, b.blurb, ...(b.levels || []).map(l => l.name)));
  meta.filter(Boolean).forEach(m => runs(String(m)).forEach(k => put(k, 'data')));
  return keys;
}

function known() {
  const k = new Map(), s = fs.existsSync(path.join(ROOT, 'js/i18n-hi.js')) ? rd('js/i18n-hi.js') : '';
  for (const m of s.matchAll(/^([0-9a-f]{8})\|(.*)$/gm)) k.set(m[1], m[2]);
  return k;
}

if (require.main === module) {
  const args = process.argv.slice(2), oi = args.indexOf('--out'), all = args.includes('--all');
  const keys = harvest(), K = known(), lines = [], have = [];
  const ids = new Map();
  keys.forEach((f, k) => { const id = hash(k); if (ids.has(id) && ids.get(id) !== k) throw new Error('hash collision ' + id); ids.set(id, k); if (K.has(id)) have.push([id, k]); if (all || !K.has(id)) lines.push(id + '\t' + k); });
  fs.writeFileSync(path.join(ROOT, 'js/i18n-en.js'), '/* GENERATED by tools/i18n-extract.js — do not edit. English keys of the Hindi interface text in js/i18n-hi.js. */\n' +
    'window.I18N && window.I18N.keys(' + JSON.stringify(have).replace(/\],\[/g, '],\n[') + ');\n');
  if (oi >= 0) fs.writeFileSync(args[oi + 1], lines.join('\n') + '\n'); else console.log(lines.join('\n'));
  const stale = [...K.keys()].filter(id => !ids.has(id));
  console.error(`interface runs ${keys.size} · with Hindi ${have.length} · listed ${lines.length} · Hindi ids not found ${stale.length}${stale.length ? ': ' + stale.slice(0, 15).join(' ') : ''}`);
}
module.exports = { harvest, runs };

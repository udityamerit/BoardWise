/* Cache-busting for every deploy (GitHub Pages and Vercel serve the same files).
   Stamps each local script and stylesheet in index.html with ?v=<hash of that file's contents>, so a browser fetches a file again
   exactly when it has changed, and writes the site version (a hash of all of them) to <meta name="bw-version"> in index.html and to
   version.json. js/app.js compares the two: a page left open across a deploy loads the new version (never in the middle of a test).
   Run before committing a change to any served file:  node tools/stamp-version.js
   node tools/stamp-version.js --check   exits 1 (and changes nothing) if index.html or version.json is out of date. */
'use strict';
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..');
const check = process.argv.includes('--check');
const h = s => crypto.createHash('sha256').update(s).digest('hex').slice(0, 10);

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const missing = [], parts = [];
let out = html.replace(/(<script\b[^>]*\bsrc="|<link\b[^>]*\brel="stylesheet"[^>]*\bhref=")((?:js|css)\/[^"?#]+)(?:\?v=[^"]*)?"/g, (m, pre, file) => {
  const f = path.join(ROOT, file);
  if (!fs.existsSync(f)) { missing.push(file); return m; }
  const v = h(Buffer.from(fs.readFileSync(f, 'latin1').replace(/\r\n/g, '\n'), 'latin1'));   // same hash for a Windows (CRLF) checkout as for the repository (LF)
  parts.push(file + ':' + v);
  return `${pre}${file}?v=${v}"`;
});
if (missing.length) { console.error('index.html refers to missing files: ' + missing.join(', ')); process.exit(1); }
const version = h(parts.join('\n'));
const meta = `<meta name="bw-version" content="${version}">`;
out = /<meta name="bw-version" content="[^"]*">/.test(out)
  ? out.replace(/<meta name="bw-version" content="[^"]*">/, meta)
  : out.replace(/(<meta charset="[^"]*">)(\r?\n)/i, `$1$2${meta}$2`);
if (!out.includes(meta)) { console.error('could not place the bw-version meta tag (index.html needs <meta charset="…">)'); process.exit(1); }
const vjson = JSON.stringify({ v: version }) + '\n';
const vfile = path.join(ROOT, 'version.json');
const stale = out !== html || !fs.existsSync(vfile) || fs.readFileSync(vfile, 'utf8').replace(/\r\n/g, '\n') !== vjson;
if (check) {
  console.log(stale ? `OUT OF DATE: run node tools/stamp-version.js (site version would be ${version})` : `up to date: site version ${version}, ${parts.length} files`);
  process.exit(stale ? 1 : 0);
}
fs.writeFileSync(path.join(ROOT, 'index.html'), out);
fs.writeFileSync(vfile, vjson);
console.log(`site version ${version} · ${parts.length} files stamped${stale ? '' : ' (no change)'}`);

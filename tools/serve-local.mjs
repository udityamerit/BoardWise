#!/usr/bin/env node
/* Runs the whole product on your own machine, with the REAL AI models, so you can test a change in a browser before deploying:

     node tools/serve-local.mjs              site on http://localhost:8765  +  AI service (worker/worker.js) on http://localhost:8787
     options: --port 8765  --ai-port 8787  --deep 0|1|auto      (for fake models, no keys: node tools/mock-ai.mjs --serve)

   The site is served exactly as it is in the repository, except that js/data/config.js points the AI examiner at the local service
   (served on the fly: the file on disk is not touched). Keys come from the environment or the git-ignored .env file; they stay in this
   process and are never sent to the browser. Anyone can use the local AI service without signing in (ALLOW_ANON=1): it only listens
   on this machine. Stop it with Ctrl+C. */
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname, normalize, sep } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2), opt = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : d; };
const SITE = Number(opt('port', 8765)), AI = Number(opt('ai-port', 8787)), FAKE = argv.includes('--fake');
try { for (const l of readFileSync(join(root, '.env'), 'utf8').split(/\r?\n/)) { const m = l.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/); if (m && m[2] && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, ''); } } catch (e) {}

let worker;
if (FAKE) { console.log(`For fake models run  node tools/mock-ai.mjs --serve ${AI}  (AI service) and use this tool without --fake for the site only.`); process.exit(0); }
if (!process.env.MINIMAX_API_KEY && !process.env.OPENROUTER_API_KEY) { console.error('No MINIMAX_API_KEY / OPENROUTER_API_KEY in the environment or .env. Use  node tools/mock-ai.mjs --serve  for fake models.'); process.exit(2); }
worker = await import('data:text/javascript;base64,' + Buffer.from(readFileSync(join(root, 'worker', 'worker.js'), 'utf8')).toString('base64'));
const ENV = { MINIMAX_API_KEY: process.env.MINIMAX_API_KEY || '', OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY || '', ALLOWED_ORIGINS: `http://localhost:${SITE},http://127.0.0.1:${SITE}`,
  ALLOW_ANON: '1', FIREBASE_PROJECT_ID: 'demo', DEEP: opt('deep', process.env.DEEP || '1'), ADMIN_KEY: 'local' };

createServer(async (req, res) => {                    // the AI service
  const chunks = []; for await (const c of req) chunks.push(c);
  try {
    const r = await worker.default.fetch(new Request(`http://localhost:${AI}${req.url}`, { method: req.method, headers: req.headers, body: ['GET', 'HEAD', 'OPTIONS'].includes(req.method) ? undefined : Buffer.concat(chunks) }), ENV);
    res.writeHead(r.status, Object.fromEntries(r.headers));
    if (r.body && r.headers.get('content-type') && /event-stream/.test(r.headers.get('content-type'))) { const rd = r.body.getReader(); for (;;) { const { done, value } = await rd.read(); if (done) break; res.write(value); } res.end(); }
    else res.end(Buffer.from(await r.arrayBuffer()));
  } catch (e) { res.writeHead(500); res.end('local AI service error'); }
}).listen(AI, () => console.log(`AI service  http://localhost:${AI}   (DEEP=${ENV.DEEP}, real models)`));

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json', '.woff2': 'font/woff2' };
createServer((req, res) => {                          // the site
  let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = normalize(join(root, p));
  if (!f.startsWith(root + sep) || !existsSync(f) || !statSync(f).isFile()) { res.writeHead(404); return res.end('not found'); }
  let body = readFileSync(f);
  if (p === '/js/data/config.js') body = Buffer.from(body.toString('utf8').replace(/endpoint:\s*'[^']*'/, `endpoint: 'http://localhost:${AI}'`).replace(/backups:\s*\[[^\]]*\]/, 'backups: []'));
  res.writeHead(200, { 'Content-Type': TYPES[extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); res.end(body);
}).listen(SITE, () => console.log(`Site        http://localhost:${SITE}   (AI examiner -> http://localhost:${AI})`));

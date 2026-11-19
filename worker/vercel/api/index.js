/* Standby host for the AI examiner on Vercel (free Hobby plan, no sleeping). It runs the very same worker.js as Cloudflare,
   so marking and the tutor behave identically. The site tries Cloudflare first and switches to this one automatically if
   Cloudflare is down (js/data/config.js -> AI_CFG.backups).

   Setup: see worker/README.md -> "Standby host". Secrets (MINIMAX_API_KEY, OPENROUTER_API_KEY, optional ADMIN_KEY) go in the
   Vercel project's Environment Variables, never in this file or in GitHub. */
import worker from '../../worker.js';

/* same non-secret settings as worker/wrangler.toml; an environment variable of the same name overrides each of these */
const DEFAULTS = {
  ALLOWED_ORIGINS: 'https://udityamerit.github.io,http://localhost',
  FIREBASE_PROJECT_ID: 'ssc-board-prep',
  ALLOW_ANON: '0',
  DEEP: '1',
  MINIMAX_EFFORT: 'medium',
  OPENROUTER_EFFORT: 'medium'
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    url.pathname = url.pathname.replace(/^\/api(?=\/|$)/, '') || '/';          // /api/health and /health both work
    const body = request.method === 'GET' || request.method === 'HEAD' ? undefined : await request.arrayBuffer();
    return worker.fetch(new Request(url, { method: request.method, headers: request.headers, body }), Object.assign({}, DEFAULTS, process.env), {});
  }
};

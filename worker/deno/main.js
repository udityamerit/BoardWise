/* Standby host for the AI examiner on Deno Deploy (free). It runs the very same worker.js as Cloudflare, so marking and
   the tutor behave identically. The site tries Cloudflare first and switches to this one automatically if Cloudflare is
   down (see js/data/config.js -> AI_CFG.backups).

   Setup (once, ~5 minutes): see worker/README.md -> "Standby host". Secrets go in the Deno Deploy dashboard as environment
   variables (MINIMAX_API_KEY, OPENROUTER_API_KEY, optional ADMIN_KEY), never in this file or in GitHub. */
import worker from '../worker.js';

/* same non-secret settings as worker/wrangler.toml; an environment variable of the same name overrides each of these */
const DEFAULTS = {
  ALLOWED_ORIGINS: 'https://udityamerit.github.io,http://localhost',
  FIREBASE_PROJECT_ID: 'ssc-board-prep',
  ALLOW_ANON: '0',
  DEEP: '1',
  MINIMAX_EFFORT: 'medium',
  OPENROUTER_EFFORT: 'medium'
};

Deno.serve((req) => {
  let env = {};
  try { env = Deno.env.toObject(); } catch (e) { /* no env access: defaults only (marking will report "not configured") */ }
  return worker.fetch(req, Object.assign({}, DEFAULTS, env), {});
});

/* Read-only health check of the LIVE AI Worker (sends no student data, uses no keys).
     node tools/check-worker.mjs [worker-url]
   Reads the URL from js/data/config.js unless given. Exit code 1 if anything needs attention. */
import { readFileSync } from 'node:fs';
const url = (process.argv[2] || (readFileSync(new URL('../js/data/config.js', import.meta.url), 'utf8').match(/endpoint:\s*'([^']+)'/) || [])[1] || '').replace(/\/+$/, '');
if (!url) { console.log('No endpoint configured in js/data/config.js'); process.exit(1); }
const origin = 'https://udityamerit.github.io';
let bad = 0;
const ok = (m) => console.log('  ✓ ' + m), no = (m) => { bad++; console.log('  ✗ ' + m); };
const call = async (path, init = {}) => { const t = Date.now(); const r = await fetch(url + path, { ...init, headers: { Origin: origin, 'Content-Type': 'application/json', ...(init.headers || {}) }, signal: AbortSignal.timeout(20000) }); return { r, ms: Date.now() - t }; };
console.log('Checking ' + url);
try {
  const { r, ms } = await call('/health');
  const j = await r.json().catch(() => ({}));
  r.ok ? ok(`Worker is up (${ms} ms)`) : no('/health returned ' + r.status);
  j.configured ? ok('AI provider key(s) are set') : no('no provider key is set (run: npx wrangler secret put MINIMAX_API_KEY)');
  if (!j.features) console.log('  · this Worker is an older version (its /health has no feature list); marking still works');
  else (j.features.includes('grade') ? ok('marking route is live') : no('marking route missing'));
  (j.features || []).includes('tutor') ? ok('tutor route is live') : no('tutor route is NOT live: the deployed Worker is old. Run: cd worker; npx wrangler deploy');
  if (j.models) console.log('  models: ' + [].concat(j.models).join(', '));
  const t = await call('/tutor', { method: 'POST', body: '{"message":"hi"}' });
  t.r.status === 404 ? no('POST /tutor -> 404 (old Worker)') : ok('POST /tutor answers (' + t.r.status + ', 401 = needs sign-in, as expected)');
  const bad_origin = await fetch(url + '/health', { headers: { Origin: 'https://evil.example' }, signal: AbortSignal.timeout(20000) });
  bad_origin.status === 403 ? ok('other websites are refused') : no('origin check not enforced (' + bad_origin.status + ')');
} catch (e) { no('could not reach the Worker: ' + e.message); }
console.log(bad ? `\n${bad} thing(s) need attention.` : '\nAll good.');
process.exit(bad ? 1 : 0);

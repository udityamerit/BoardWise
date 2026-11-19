/* Read-only health check of the LIVE AI service(s) (sends no student data, uses no keys).
     node tools/check-worker.mjs [url ...]
   Checks AI_CFG.endpoint and AI_CFG.backups from js/data/config.js unless URLs are given.
   Exit code 1 if anything needs attention (the GitHub "AI uptime check" workflow relies on this). */
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

let urls = process.argv.slice(2);
if (!urls.length) {
  const sb = { window: {} }; sb.window = sb; vm.createContext(sb);
  vm.runInContext(readFileSync(new URL('../js/data/config.js', import.meta.url), 'utf8'), sb);
  urls = [].concat(sb.AI_CFG.endpoint || [], sb.AI_CFG.backups || []);
}
urls = urls.map(u => u.replace(/\/+$/, '')).filter(Boolean);
if (!urls.length) { console.log('No endpoint configured in js/data/config.js'); process.exit(1); }

const origin = 'https://udityamerit.github.io';
let bad = 0, url = '';
const ok = (m) => console.log('  ✓ ' + m), no = (m) => { bad++; console.log('  ✗ ' + m); };
const call = async (path, init = {}) => {
  const t = Date.now();
  const r = await fetch(url + path, { ...init, headers: { Origin: origin, 'Content-Type': 'application/json', ...(init.headers || {}) }, signal: AbortSignal.timeout(20000) });
  return { r, ms: Date.now() - t };
};

async function checkOne() {
  console.log('\nChecking ' + url);
  try {
    const { r, ms } = await call('/health');
    const j = await r.json().catch(() => ({}));
    r.ok ? ok(`up (${ms} ms)`) : no('/health returned ' + r.status);
    j.configured ? ok('AI provider key(s) are set') : no('no provider key is set (npx wrangler secret put MINIMAX_API_KEY, or the host\'s environment variables)');
    if (!j.features) console.log('  · older version (its /health has no feature list); marking still works');
    else ok('marking route is live');
    (j.features || []).includes('tutor') ? ok('tutor route is live') : no('tutor route is NOT live: this service is an old version. Redeploy it.');
    if (j.models) console.log('  models available: ' + [].concat(j.models).join(', '));
    const t = await call('/tutor', { method: 'POST', body: '{"message":"hi"}' });
    t.r.status === 404 ? no('POST /tutor -> 404 (old version)') : ok('POST /tutor answers (' + t.r.status + '; 401 = needs sign-in, as expected)');
    const other = await fetch(url + '/health', { headers: { Origin: 'https://evil.example' }, signal: AbortSignal.timeout(20000) });
    other.status === 403 ? ok('other websites are refused') : no('origin check not enforced (' + other.status + ')');
  } catch (e) { no('could not reach it: ' + e.message); }
}

let healthy = 0;
for (const u of urls) { url = u; const before = bad; await checkOne(); if (bad === before) healthy++; }
if (urls.length > 1) console.log(`\n${healthy} of ${urls.length} services fully healthy` + (healthy ? '' : ' - STUDENTS HAVE NO AI SERVICE'));
console.log(bad ? `\n${bad} thing(s) need attention.` : '\nAll good.');
process.exit(bad ? 1 : 0);

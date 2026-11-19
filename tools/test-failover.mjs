/* Tests the site's service failover (js/ai.js) with a fake fetch: node tools/test-failover.mjs */
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const src = readFileSync(new URL('../js/ai.js', import.meta.url), 'utf8');
let pass = 0, fail = 0;
const check = (name, cond) => { cond ? pass++ : fail++; console.log((cond ? '  ✓ ' : '  ✗ ') + name); };

function load(cfg, handler) {
  const calls = [];
  const sb = { window: { AI_CFG: cfg }, localStorage: { getItem: () => null }, location: { hostname: 'udityamerit.github.io' }, console, AbortController, setTimeout, clearTimeout,
    fetch: async (url, init) => { calls.push(url); return handler(url, init); } };
  sb.window = Object.assign(sb.window, sb); vm.createContext(sb); vm.runInContext(src, sb);
  return { AIG: sb.window.AIG, calls };
}
const res = (status, body) => ({ status, ok: status >= 200 && status < 300, json: async () => body });
const q = { id: 'q1', marks: 2, chapter: 'c', q: 'Q?', solution: 'A.', type: 'self' };
const A = 'https://a.example', B = 'https://b.example';

let t = load({ endpoint: A, backups: [B] }, u => u.startsWith(A) ? res(200, { reply: 'from A' }) : res(200, { reply: 'from B' }));
check('uses the primary when it is healthy', (await t.AIG.tutor({ q, message: 'hi' })).reply === 'from A' && t.calls.length === 1);

t = load({ endpoint: A, backups: [B] }, u => { if (u.startsWith(A)) throw new Error('network down'); return res(200, { reply: 'from B' }); });
check('switches to the backup when the primary is unreachable', (await t.AIG.tutor({ q, message: 'hi' })).reply === 'from B');
await t.AIG.tutor({ q, message: 'again' });
check('then tries the backup first for a while', t.calls.slice(-1)[0].startsWith(B) && !t.calls.slice(2).some(u => u.startsWith(A)));

t = load({ endpoint: A, backups: [B] }, u => u.startsWith(A) ? res(503, null) : res(200, { reply: 'from B' }));
check('switches on a 5xx', (await t.AIG.tutor({ q, message: 'hi' })).reply === 'from B');

t = load({ endpoint: A, backups: [B] }, u => u.startsWith(A) ? res(404, null) : res(200, { reply: 'from B' }));
check('skips a primary that is too old for /tutor (404)', (await t.AIG.tutor({ q, message: 'hi' })).reply === 'from B');

t = load({ endpoint: A, backups: [B] }, () => res(404, null));
check('reports "old" only when every service is old', (await t.AIG.tutor({ q, message: 'hi' })).error === 'old');

t = load({ endpoint: A, backups: [B] }, () => { throw new Error('offline'); });
check('reports "net" when everything is unreachable', (await t.AIG.tutor({ q, message: 'hi' })).error === 'net');

t = load({ endpoint: A, backups: [B] }, u => u.startsWith(A) ? res(429, null) : res(200, { reply: 'from B' }));
check('does not hop on 429 (rate limit is the same everywhere)', (await t.AIG.tutor({ q, message: 'hi' })).error === 'limit' && t.calls.length === 1);

t = load({ endpoint: A, backups: [B] }, u => u.startsWith(A) ? res(500, null) : res(200, { results: [{ id: 'q1', marks: 1.5, feedback: 'ok', steps: [], tip: '' }], models: ['m'] }));
const g = await t.AIG.grade([{ q, answer: 'x' }]);
check('marking also fails over', g && g.q1 && g.q1.m === 1.5);

t = load({ endpoint: A, backups: [B] }, () => { throw new Error('offline'); });
check('marking returns null (rule-based checker takes over) when all are down', (await t.AIG.grade([{ q, answer: 'x' }])) === null);

t = load({ endpoint: A }, () => res(200, { reply: 'ok' }));
check('works with a single endpoint and no backups', t.AIG.enabled() && (await t.AIG.tutor({ q, message: 'hi' })).reply === 'ok');

t = load({ endpoint: '', backups: ['http://insecure.example'] }, () => res(200, { reply: 'ok' }));
check('ignores non-https services', !t.AIG.enabled());

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);

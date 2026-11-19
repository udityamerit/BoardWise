/* AI examiner client. Sends written answers to the BoardWise AI service (worker/worker.js), which holds the API key
   and switches between models on its own. Students never enter a key. If the service is not set up, is down, or the
   student is offline, every function here resolves to null and the site keeps using its rule-based checker (js/check.js).
     AIG.enabled()                 -> true when an endpoint is configured
     AIG.grade(items)              -> Promise<{ [qid]: { m, fb, steps, tip, missing, models } } | null>   items: [{ q, answer }]  */
(function () {
'use strict';
const CFG = Object.assign({}, window.AI_CFG);
/* developer override for local testing only (never honoured on the live site) */
try { const o = localStorage.getItem('ssc.ai.endpoint'); if (o && /^(localhost|127\.0\.0\.1)$/.test(location.hostname)) CFG.endpoint = o; } catch (e) {}
const BATCH = 5, TIMEOUT = 100000;

const decode = s => s.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
/* HTML (question / model answer) -> plain text; bold final answers become **...** so the examiner can see them */
function text(html) {
  return decode(String(html || '')
    .replace(/<sub>(.*?)<\/sub>/gi, '_$1').replace(/<sup>(.*?)<\/sup>/gi, '^$1')
    .replace(/<b>([\s\S]*?)<\/b>/gi, '**$1**')
    .replace(/<\/(p|div|li|tr|h\d)>|<br\s*\/?>/gi, '\n').replace(/<\/t[dh]>/gi, ' | ')
    .replace(/<[^>]+>/g, '')).replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();
}
const enabled = () => !!(CFG.endpoint && /^https:\/\//.test(CFG.endpoint) || (CFG.endpoint && /^http:\/\/(localhost|127\.0\.0\.1)/.test(CFG.endpoint)));

async function post(items) {
  const headers = { 'Content-Type': 'application/json' };
  try { const t = window.AUTH && await window.AUTH.idToken(); if (t) headers.Authorization = 'Bearer ' + t; } catch (e) {}
  const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), TIMEOUT);
  try {
    const r = await fetch(CFG.endpoint.replace(/\/+$/, '') + '/grade', { method: 'POST', headers, signal: ctl.signal, body: JSON.stringify({ items }) });
    if (!r.ok) return null;
    return await r.json();
  } catch (e) { return null; } finally { clearTimeout(timer); }
}

async function grade(list) {
  if (!enabled() || !list.length) return null;
  const out = {};
  const payload = list.map(({ q, answer }) => ({ id: q.id, marks: q.marks, question: text(q.q), model: text(q.solution), answer: String(answer).slice(0, 2500) }));
  for (let i = 0; i < payload.length; i += BATCH) {
    const res = await post(payload.slice(i, i + BATCH));
    if (!res || !Array.isArray(res.results)) continue;                 // that batch stays on the rule-based checker
    res.results.forEach(r => {
      const q = list.find(x => x.q.id === r.id); if (!q || !isFinite(r.marks)) return;
      out[r.id] = { m: Math.max(0, Math.min(q.q.marks, Math.round(r.marks * 2) / 2)), fb: String(r.feedback || '').slice(0, 500), steps: (Array.isArray(r.steps) ? r.steps : []).slice(0, 6).map(x => String(x).slice(0, 260)), tip: String(r.tip || '').slice(0, 220), missing: (r.missing || []).slice(0, 6), models: res.models || [] };
    });
  }
  return Object.keys(out).length ? out : null;
}

window.AIG = { enabled, grade, _text: text };
})();

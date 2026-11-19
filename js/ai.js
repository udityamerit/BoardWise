/* AI examiner client. Sends written answers to the BoardWise AI service (worker/worker.js), which holds the API key
   and switches between models on its own. Students never enter a key. If the service is not set up, is down, or the
   student is offline, every function here resolves to null and the site keeps using its rule-based checker (js/check.js).
     AIG.enabled()                 -> true when an endpoint is configured
     AIG.grade(items)              -> Promise<{ [qid]: { m, fb, steps, tip, missing, models } } | null>   items: [{ q, answer }]
     AIG.tutor(ctx)                -> Promise<{ reply } | { error: 'off'|'busy'|'limit'|'signin'|'old'|'net' }>
                                      ctx: { q, answer, awarded, history:[{role,content}], message }  */
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

/* One tutor turn about one question. Never throws: on trouble it resolves to { error } so the page can show a friendly line. */
async function tutor(c) {
  if (!enabled()) return { error: 'off' };
  const q = c.q, headers = { 'Content-Type': 'application/json' };
  try { const t = window.AUTH && await window.AUTH.idToken(); if (t) headers.Authorization = 'Bearer ' + t; } catch (e) {}
  const opts = q.options ? q.options.map((o, i) => String.fromCharCode(65 + i) + ') ' + text(o)).join('   ') : '';
  const body = { message: String(c.message).slice(0, 700), history: (c.history || []).slice(-8), chapter: q.chapter, marks: q.marks, question: text(q.q), options: opts,
                 model: text(q.solution), answer: String(c.answer == null ? '' : c.answer).slice(0, 2500), awarded: c.awarded };
  const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), 60000);
  try {
    const r = await fetch(CFG.endpoint.replace(/\/+$/, '') + '/tutor', { method: 'POST', headers, signal: ctl.signal, body: JSON.stringify(body) });
    if (r.status === 404) return { error: 'old' };            // the deployed Worker predates the tutor
    if (r.status === 429) return { error: 'limit' };
    if (r.status === 401) return { error: 'signin' };
    if (!r.ok) return { error: 'busy' };
    const j = await r.json();
    return j && j.reply ? { reply: String(j.reply) } : { error: 'busy' };
  } catch (e) { return { error: 'net' }; } finally { clearTimeout(timer); }
}

/* Built-in tutor: used whenever the AI service is old, down, busy or offline, so the tutor never dead-ends.
   It works only from the question, its model answer and the student's answer (no AI involved). */
function offlineTutor(c) {
  const q = c.q, msg = String(c.message || '').toLowerCase(), sol = text(q.solution).trim();
  const steps = sol.split(/\n+|(?<=[.!?])\s+(?=[A-Z0-9(])/).map(s => s.trim()).filter(s => s.length > 2).slice(0, 8);
  const stepList = steps.length > 1 ? steps.map((s, i) => (i + 1) + '. ' + s).join('\n') : sol;
  const right = q.options && q.answer != null ? String.fromCharCode(65 + q.answer) + '. ' + text(q.options[q.answer]) : '';
  const mine = String(c.answer || '').trim(), has = mine !== '';
  const head = right ? '**Correct answer: ' + right + '**\n\n' : '';
  if (/similar|another|practice question|एक और|और प्रश्न/.test(msg)) {
    const pool = []; try { (window.PAPERS || []).forEach(p => (p.sections || []).forEach(s => (s.questions || []).forEach(x => { if (x.id !== q.id && x.chapter === q.chapter && x.type === q.type && !s.passage) pool.push(x); }))); } catch (e) {}
    if (pool.length) { const x = pool[Math.floor(Math.random() * pool.length)]; return '**Try this one from the same chapter (' + x.marks + ' mark' + (x.marks > 1 ? 's' : '') + '):**\n\n' + text(x.q) + (x.options ? '\n' + x.options.map((o, i) => String.fromCharCode(65 + i) + ') ' + text(o)).join('\n') : '') + '\n\nUse **Practice weak chapters** on the result page for a full set with answers.'; }
  }
  if (/wrong|mistake|galat|गलत|why/.test(msg) && has) {
    if (right) return head + 'You chose **' + mine + '**. ' + (mine.charAt(0) === String.fromCharCode(65 + q.answer) ? 'That is the right option.' : 'That is not the one the model answer gives.') + '\n\n**Why:**\n' + stepList;
    return 'Your answer:\n' + mine.slice(0, 600) + '\n\nCompare it line by line with the model answer. Anything missing from yours is where marks were lost:\n\n' + stepList;
  }
  if (/[ऀ-ॿ]|hindi|hindee/.test(msg)) return 'The Hindi explanation needs the AI tutor, which is not reachable right now. Here is the model answer meanwhile:\n\n' + head + stepList;
  return head + '**Step by step:**\n' + stepList + (steps.length > 1 ? '\n\nTip: learn the key terms in bold in the model answer; examiners give marks for each point.' : '');
}

window.AIG = { enabled, grade, tutor, offlineTutor, _text: text };
})();

/* Accounts + per-student storage.
   mode "firebase": Firebase Auth (email+password) and Firestore over REST — no SDK, no build step.
     users/{uid}/attempts/{attemptId}  { json, submittedAt, paperId }
     users/{uid}/meta/profile          { json }
   Rules (firestore.rules) let a signed-in student touch only users/{their own uid}/**.
   mode "local": fallback when js/data/backend.js has no apiKey — accounts live only in this browser.
   The app stays synchronous: everything is read from an in-memory cache; writes go through an outbox
   that is saved in localStorage and retried until Firestore accepts them (works offline). */
(function () {
'use strict';
const CFG = (window.BACKEND && window.BACKEND.firebase) || {};
const MODE = (CFG.apiKey && localStorage.getItem('ssc.forceLocal') !== '1') ? 'firebase' : 'local';
const IDT = 'https://identitytoolkit.googleapis.com/v1/accounts:';
const FS = 'https://firestore.googleapis.com/v1/projects/' + CFG.projectId + '/databases/(default)/documents';

const store = {
  get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem(k); } catch (e) {} }
};
const key = (uid, k) => 'ssc.u.' + uid + '.' + k;

let sess = null;                         // { uid, email, name, refresh }
let idTok = null, idExp = 0;
let cache = { attempts: [], profile: {} };
let snap = new Map();                    // attempt id -> JSON at last write (to detect real changes)
let outbox = [];                         // [{ t:'put'|'del'|'profile', id }]
let state = MODE === 'firebase' ? 'idle' : 'local';
let flushing = null, retryT = null;
const listeners = [];
const emit = (ev) => listeners.forEach(f => { try { f(ev); } catch (e) {} });
const setState = s => { if (state !== s) { state = s; emit('status'); } };

/* ---------- errors ---------- */
const MSG = {
  EMAIL_EXISTS: 'An account with this email already exists — sign in instead.',
  INVALID_LOGIN_CREDENTIALS: 'Wrong email or password.',
  INVALID_PASSWORD: 'Wrong email or password.',
  EMAIL_NOT_FOUND: 'Wrong email or password.',
  USER_DISABLED: 'This account has been disabled.',
  TOO_MANY_ATTEMPTS_TRY_LATER: 'Too many attempts. Please wait a few minutes and try again.',
  INVALID_EMAIL: 'That email address does not look right.',
  MISSING_EMAIL: 'Enter your email address.',
  MISSING_PASSWORD: 'Enter your password.',
  WEAK_PASSWORD: 'Password must be at least 6 characters.',
  OPERATION_NOT_ALLOWED: 'Email/password sign-in is not enabled for this project.',
  NETWORK: 'Could not reach the server. Check your internet connection and try again.'
};
function fail(code, extra) { const e = new Error(MSG[code] || ('Something went wrong (' + code + ').')); e.code = code; if (extra) e.extra = extra; return e; }
async function post(url, body, form) {
  let r;
  try {
    r = await fetch(url, { method: 'POST', headers: { 'Content-Type': form ? 'application/x-www-form-urlencoded' : 'application/json' }, body: form ? body : JSON.stringify(body) });
  } catch (e) { throw fail('NETWORK'); }
  let j = {}; try { j = await r.json(); } catch (e) {}
  if (!r.ok) {
    const raw = (j.error && (j.error.message || j.error)) || 'UNKNOWN';
    throw fail(String(raw).split(' : ')[0].trim());
  }
  return j;
}

/* ---------- Firebase tokens ---------- */
function takeTokens(j) {
  idTok = j.idToken || j.id_token; idExp = Date.now() + (parseInt(j.expiresIn || j.expires_in, 10) || 3600) * 1000;
  const ref = j.refreshToken || j.refresh_token; if (ref && sess) { sess.refresh = ref; store.set('ssc.session', sess); }
}
async function token() {
  if (idTok && Date.now() < idExp - 60000) return idTok;
  const j = await post('https://securetoken.googleapis.com/v1/token?key=' + CFG.apiKey, 'grant_type=refresh_token&refresh_token=' + encodeURIComponent(sess.refresh), true);
  takeTokens(j); return idTok;
}

/* ---------- Firestore ---------- */
async function fs(method, path, body) {
  for (let i = 0; i < 2; i++) {
    const tok = await token();
    let r;
    try { r = await fetch(FS + path, { method, headers: { Authorization: 'Bearer ' + tok, 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined }); }
    catch (e) { throw fail('NETWORK'); }
    if (r.status === 401 && i === 0) { idExp = 0; continue; }
    if (!r.ok && !(method === 'DELETE' && r.status === 404)) { const e = new Error('Cloud request failed (' + r.status + ')'); e.status = r.status; throw e; }
    try { return await r.json(); } catch (e) { return {}; }
  }
}
const sv = s => ({ stringValue: s });
const attemptDoc = a => ({ fields: { json: sv(JSON.stringify(a)), submittedAt: { integerValue: String(Math.round(a.submittedAt || 0)) }, paperId: sv(a.paperId || '') } });
const fieldJson = d => { try { return JSON.parse(d.fields.json.stringValue); } catch (e) { return null; } };

async function listAttempts() {
  const out = []; let pt = '';
  do {
    const j = await fs('GET', '/users/' + sess.uid + '/attempts?pageSize=300' + (pt ? '&pageToken=' + encodeURIComponent(pt) : ''));
    (j.documents || []).forEach(d => { const a = fieldJson(d); if (a && a.id) out.push(a); });
    pt = j.nextPageToken || '';
  } while (pt);
  return out;
}

/* ---------- local copy + outbox ---------- */
function persist() {
  if (!sess) return;
  store.set(key(sess.uid, 'attempts'), cache.attempts);
  store.set(key(sess.uid, 'profile'), cache.profile);
  store.set(key(sess.uid, 'outbox'), outbox);
}
function queue(op) {
  if (MODE !== 'firebase') return;
  outbox = outbox.filter(o => !(o.t === op.t && o.id === op.id)); outbox.push(op);
}
const sortAtt = arr => arr.sort((a, b) => (b.submittedAt || 0) - (a.submittedAt || 0));
const resnap = () => { snap = new Map(cache.attempts.map(a => [a.id, JSON.stringify(a)])); };

function flush() {
  if (MODE !== 'firebase' || !sess) return Promise.resolve();
  if (flushing) return flushing;
  flushing = (async () => {
    clearTimeout(retryT);
    if (!outbox.length) { setState('synced'); return; }
    setState('saving');
    try {
      while (outbox.length) {
        const op = outbox[0];
        if (op.t === 'put') { const a = cache.attempts.find(x => x.id === op.id); if (a) await fs('PATCH', '/users/' + sess.uid + '/attempts/' + encodeURIComponent(op.id), attemptDoc(a)); }
        else if (op.t === 'del') await fs('DELETE', '/users/' + sess.uid + '/attempts/' + encodeURIComponent(op.id));
        else if (op.t === 'profile') await fs('PATCH', '/users/' + sess.uid + '/meta/profile', { fields: { json: sv(JSON.stringify(cache.profile)) } });
        outbox.shift(); persist();
      }
      setState('synced');
    } catch (e) {
      setState(e.status === 403 || e.status === 400 ? 'error' : 'offline');
      retryT = setTimeout(flush, 20000);
    }
  })().finally(() => { flushing = null; });
  return flushing;
}
window.addEventListener('online', () => { if (outbox.length) flush(); });

/* ---------- load a user's data ---------- */
function loadLocal() {
  cache.attempts = sortAtt(store.get(key(sess.uid, 'attempts'), []));
  cache.profile = store.get(key(sess.uid, 'profile'), {});
  outbox = store.get(key(sess.uid, 'outbox'), []);
  resnap();
}
async function syncDown() {
  if (MODE !== 'firebase') { setState('local'); return; }
  await flush();
  if (outbox.length) return;                    // still offline: keep the local copy, retry later
  try {
    const list = await listAttempts();
    const p = await fs('GET', '/users/' + sess.uid + '/meta/profile').then(d => fieldJson(d), e => (e.status === 404 ? null : Promise.reject(e)));
    if (outbox.length) return;                  // something was saved while we were loading
    const before = JSON.stringify([cache.attempts, cache.profile]);
    cache.attempts = sortAtt(list); resnap();
    if (p) cache.profile = Object.assign({}, cache.profile, p);
    persist(); setState('synced');
    if (JSON.stringify([cache.attempts, cache.profile]) !== before) emit('data');   // re-draw the page only when the cloud copy differs
  } catch (e) { setState(e.status === 403 ? 'error' : 'offline'); }
}

/* ---------- local-mode accounts ---------- */
const hex = b => [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
async function hashPw(pw, saltHex) {
  if (!(window.crypto && crypto.subtle)) throw new Error('Local accounts need https:// or localhost.');
  const salt = Uint8Array.from(saltHex.match(/../g).map(h => parseInt(h, 16)));
  const k = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveBits']);
  return hex(await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, k, 256));
}
const lusers = () => store.get('ssc.local.users', {});

/* ---------- public API ---------- */
function begin(s) { sess = s; store.set('ssc.session', s); loadLocal(); emit('auth'); }
const cleanEmail = e => String(e || '').trim().toLowerCase();

const AUTH = {
  mode: MODE,
  on(f) { listeners.push(f); },
  user() { return sess ? { uid: sess.uid, email: sess.email, name: sess.name } : null; },
  status() { return state; },
  pending() { return outbox.length; },
  forceLocal() { return localStorage.getItem('ssc.forceLocal') === '1'; },
  /* Firebase ID token of the signed-in student (null in local-account mode) — sent to the AI marking service so only students can use it */
  async idToken() { if (MODE !== 'firebase' || !sess) return null; try { return await token(); } catch (e) { return null; } },

  async init() {
    const s = store.get('ssc.session', null);
    if (!s || !s.uid) return;
    if ((MODE === 'firebase') !== !!s.refresh) { store.del('ssc.session'); return; }  // session from the other mode
    sess = s; loadLocal();
    /* The page opens at once from this device's copy of the student's data; the token refresh and the cloud sync run in the
       background (they used to hold the first page for up to 5 s). A newer cloud copy re-draws the page ('data'); a revoked
       session signs out ('auth'). */
    if (MODE === 'firebase') {
      (async () => {
        try { await token(); }
        catch (e) {
          if (e.code && e.code !== 'NETWORK' && sess === s) {   // revoked / expired
            sess = null; idTok = null; cache = { attempts: [], profile: {} }; outbox = []; snap = new Map();
            store.del('ssc.session'); setState('idle'); emit('auth'); return;
          }
        }
        if (sess === s) await syncDown();
      })().catch(() => {});
    } else setState('local');
  },

  async signUp(email, pw, name) {
    email = cleanEmail(email); name = String(name || '').trim();
    if (MODE === 'firebase') {
      const j = await post(IDT + 'signUp?key=' + CFG.apiKey, { email, password: pw, returnSecureToken: true });
      begin({ uid: j.localId, email, name, refresh: j.refreshToken }); takeTokens(j);
      cache.profile = { name }; queue({ t: 'profile' }); persist();
      post(IDT + 'update?key=' + CFG.apiKey, { idToken: j.idToken, displayName: name, returnSecureToken: false }).catch(() => {});
      await flush();
    } else {
      const users = lusers();
      if (!email) throw fail('MISSING_EMAIL');
      if (!/^\S+@\S+\.\S+$/.test(email)) throw fail('INVALID_EMAIL');
      if (users[email]) throw fail('EMAIL_EXISTS');
      if (pw.length < 6) throw fail('WEAK_PASSWORD');
      const salt = hex(crypto.getRandomValues(new Uint8Array(16)));
      const uid = 'L' + hex(crypto.getRandomValues(new Uint8Array(8)));
      users[email] = { uid, salt, hash: await hashPw(pw, salt), name }; store.set('ssc.local.users', users);
      begin({ uid, email, name }); cache.profile = { name }; persist(); setState('local');
    }
  },

  async signIn(email, pw) {
    email = cleanEmail(email);
    if (MODE === 'firebase') {
      const j = await post(IDT + 'signInWithPassword?key=' + CFG.apiKey, { email, password: pw, returnSecureToken: true });
      begin({ uid: j.localId, email, name: j.displayName || '', refresh: j.refreshToken }); takeTokens(j);
      await Promise.race([syncDown(), new Promise(r => setTimeout(r, 6000))]);
      if (!cache.profile.name && sess.name) { cache.profile.name = sess.name; persist(); }
    } else {
      const u = lusers()[email];
      if (!u || (await hashPw(pw, u.salt)) !== u.hash) throw fail('INVALID_LOGIN_CREDENTIALS');
      begin({ uid: u.uid, email, name: u.name || '' }); setState('local');
    }
  },

  async reset(email) {
    email = cleanEmail(email);
    if (MODE !== 'firebase') throw new Error('Password reset needs the online (Firebase) mode. Local accounts cannot be reset.');
    await post(IDT + 'sendOobCode?key=' + CFG.apiKey, { requestType: 'PASSWORD_RESET', email });
  },

  async signOut() {
    if (!sess) return;
    try { await Promise.race([flush(), new Promise(r => setTimeout(r, 3000))]); } catch (e) {}
    if (MODE === 'firebase') ['attempts', 'profile', 'outbox', 'active'].forEach(k => store.del(key(sess.uid, k)));
    store.del('ssc.session');
    sess = null; idTok = null; cache = { attempts: [], profile: {} }; outbox = []; snap = new Map();
    setState(MODE === 'firebase' ? 'idle' : 'local'); emit('auth');
  },

  /* --- per-student data (all synchronous) --- */
  getAttempts() { return cache.attempts; },
  setAttempts(arr) {
    if (!sess) return;
    const keep = new Set();
    arr.forEach(a => {
      keep.add(a.id);
      if (snap.get(a.id) !== JSON.stringify(a)) { a.upd = Date.now(); queue({ t: 'put', id: a.id }); }
    });
    snap.forEach((_, id) => { if (!keep.has(id)) queue({ t: 'del', id }); });
    cache.attempts = sortAtt(arr.slice()); resnap(); persist(); flush();
  },
  getProfile() { return Object.assign({ name: '', school: '', seat: '' }, cache.profile); },
  setProfile(p) { cache.profile = Object.assign({}, p); queue({ t: 'profile' }); persist(); flush(); },
  /* the test in progress is kept per student on this device only */
  getActive() { return sess ? store.get(key(sess.uid, 'active'), null) : null; },
  setActive(A) { if (!sess) return; if (A) store.set(key(sess.uid, 'active'), A); else store.del(key(sess.uid, 'active')); }
};
window.AUTH = AUTH;
})();

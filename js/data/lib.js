/* Shared helpers for building papers (loaded after config.js). Exposed as window.QB.
   bld(prefix)  -> question builders with auto ids:  mcq(m,ch,q,opts,ans,sol)  num(m,ch,q,accept,sol,hint)  numt(m,ch,q,accept,sol,tol,hint)  self(m,ch,q,sol)
   sec(id,part,title,attempt,instruction,questions) -> one section of a paper
   Number helpers keep generated mock questions exact (answers are computed from the same numbers that appear in the question). */
(function () {
const base = window.mk;
const bld = pfx => { let n = 0; const id = () => pfx + (++n); return {
  mcq: (...a) => base.mcq(id(), ...a),
  num: (...a) => base.num(id(), ...a),
  numt: (m, c, q, acc, sol, tol, hint) => Object.assign(base.num(id(), m, c, q, acc, sol, hint), { tol }),
  self: (...a) => base.self(id(), ...a) }; };
const sec = (id, part, title, attempt, instruction, questions) => ({ id, part, title, attempt, instruction, questions });

const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
const at = (arr, v) => arr[((v % arr.length) + arr.length) % arr.length];
/* exact fraction string: fr(6,8) -> "3/4", fr(4,2) -> "2" */
const fr = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; n /= g; d /= g; return d === 1 ? String(n) : n + '/' + d; };
/* accepted spellings for a fraction answer: "1/2" and also 0.5 when the decimal terminates */
const accFr = (n, d) => { const f = fr(n, d), out = [f]; const v = n / d; if (!Number.isInteger(v)) { const s = String(+v.toFixed(6)); if (Math.abs(+s - v) < 1e-12) out.push(s); } return out; };
const fx = (x, p = 2) => String(Math.round(x * Math.pow(10, p)) / Math.pow(10, p));
const s = n => String(n).replace('-', '−');                   // pretty minus for display
const inr = n => { let t = String(Math.round(n)); const neg = t[0] === '-'; if (neg) t = t.slice(1); if (t.length > 3) { const last = t.slice(-3); let rest = t.slice(0, -3); const g = []; while (rest.length > 2) { g.unshift(rest.slice(-2)); rest = rest.slice(0, -2); } if (rest) g.unshift(rest); t = g.join(',') + ',' + last; } return (neg ? '−' : '') + t; };
const co = n => n === 1 ? '' : n === -1 ? '−' : String(n).replace('-', '−');
const poly = (a, b, c) => { let t = co(a) + 'x²'; if (b) t += (b > 0 ? ' + ' : ' − ') + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'x'; if (c) t += (c > 0 ? ' + ' : ' − ') + Math.abs(c); return t + ' = 0'; };
const lin = (a, b, c) => co(a) + 'x ' + (b < 0 ? '−' : '+') + ' ' + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'y = ' + s(c);
/* options: put `right` at index pos%4 among three distinct wrong answers; returns {o, a} */
const opts = (right, wrongs, pos) => {
  right = String(right); const w = [];
  wrongs.forEach(x => { x = String(x); if (x !== right && !w.includes(x)) w.push(x); });
  if (w.length < 3 && /^-?\d+(\.\d+)?$/.test(right)) for (const d of [1, -1, 2, -2, 3, -3, 5, 10]) { const c = String(+(+right + d).toFixed(6)); if (c !== right && !w.includes(c) && !(+right > 0 && +c < 0)) w.push(c); }
  if (w.length < 3) throw new Error('not enough distractors for ' + right);
  const o = w.slice(0, 3), p = ((pos % 4) + 4) % 4; o.splice(p, 0, right); return { o, a: p };
};
/* pick j-th item of a pool for paper index k; pool length must not be a multiple of 3 so papers rotate through all of it */
const pick = (pool, k, j) => { if (pool.length % 3 === 0) throw new Error('pool length multiple of 3: ' + pool.length); return pool[(k * 3 + j) % pool.length]; };
const must = (cond, msg) => { if (!cond) throw new Error('generator: ' + msg); };
const int = (x, msg) => { must(Math.abs(x - Math.round(x)) < 1e-9, msg + ' not integer: ' + x); return Math.round(x); };

window.QB = { bld, sec, gcd, at, fr, accFr, fx, s, inr, co, poly, lin, opts, pick, must, int };
})();

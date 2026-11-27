/* Loads the real js/app.js (and the question bank) in Node with a stub page, and returns its internal marking functions
   so tests can use the very same code the site runs.  Used by tools/test-answers.js and tools/test-choices.js. */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
module.exports = function load() {
  const root = path.join(__dirname, '..');
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="(js\/[^"?]+)/g)].map(m => m[1]).filter(f => !/(^js\/app\.js|firebase|auth|ai\.js|sync)/i.test(f));
  const stub = () => new Proxy(function () {}, { get: (t, k) => (k === Symbol.toPrimitive ? () => '' : k === 'length' ? 0 : stub()), apply: () => stub(), set: () => true });
  const store = {};
  const sb = { console, setTimeout, clearTimeout, setInterval, clearInterval, Promise, Math, Date, JSON,
    localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } },
    location: { hash: '', hostname: 'localhost', href: '', reload() {} }, document: stub(), navigator: { userAgent: '' } };
  sb.window = sb; sb.self = sb; sb.MutationObserver = function () { this.observe = () => {}; }; sb.requestAnimationFrame = f => 0; sb.IntersectionObserver = sb.MutationObserver; sb.ResizeObserver = sb.MutationObserver; sb.addEventListener = () => {}; sb.AUTH = stub(); sb.AIG = stub(); sb.matchMedia = () => ({ matches: false, addEventListener() {} });
  vm.createContext(sb);
  scripts.forEach(f => { try { vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), sb, { filename: f }); } catch (e) { /* UI-only scripts may need a real page */ } });
  let app = fs.readFileSync(path.join(root, 'js/app.js'), 'utf8');
  const cut = app.lastIndexOf('app.innerHTML = \'<div class="empty">Loading');
  if (cut < 0) throw new Error('cannot find the end of js/app.js');
  app = app.slice(0, cut) + '\nwindow.__X = { evaluate, qsOf, status, matchNum, need, groupBySec, paperById, flat, marksOf };\n})();';
  vm.runInContext(app, sb, { filename: 'js/app.js' });
  return sb;
};

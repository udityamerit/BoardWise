#!/usr/bin/env node
/* Regression + audit test for typed-answer marking.   Run:  node tools/test-answers.js
   Loads the real question bank and the real matchNum() from js/app.js, then types every numeric question's correct answer
   in many ways a student might ("Rs. 4,575", "₹ 4,575 (or 4575)", "S30 = 4575", "4575/-", "4575.00" ...). Every one must be
   marked correct; a handful of near-miss answers must stay wrong. Exit code 1 on any failure. */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const files = [...html.matchAll(/<script src="(js\/data\/[^"?]+)/g)].map(m => m[1]);
const sb = { console }; sb.window = sb; sb.self = sb; vm.createContext(sb);
files.forEach(f => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), sb, { filename: f }));
vm.runInContext(fs.readFileSync(path.join(root, 'js/check.js'), 'utf8'), sb, { filename: 'js/check.js' });

/* take matchNum and its helpers straight from app.js so the test can never drift from the site */
const app = fs.readFileSync(path.join(root, 'js/app.js'), 'utf8');
const a = app.indexOf('const norm = s =>'), b = app.indexOf('/* Written answers are checked automatically');
if (a < 0 || b < 0) { console.error('cannot find matchNum in js/app.js'); process.exit(2); }
vm.runInContext(app.slice(a, b) + '\nthis.matchNum = matchNum;', sb);
const matchNum = sb.matchNum;

const flat = p => (p.sections || []).flatMap(s => s.questions || []);
const nums = [];
(sb.PAPERS || []).forEach(P => flat(P).forEach(q => { if (q.type === 'num' && q.accept && q.accept.length) nums.push(q); }));

const isPlainNumber = s => /^-?\d+(\.\d+)?$/.test(s);
const group = s => { const n = String(s).replace(/^-/, ''), [i, d] = n.split('.'); const w = i.replace(/\B(?=(\d{3})+(?!\d))/g, ','); const ind = i.length > 3 ? i.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + i.slice(-3) : i; return [(s[0] === '-' ? '-' : '') + w + (d ? '.' + d : ''), (s[0] === '-' ? '-' : '') + ind + (d ? '.' + d : '')]; };

/* ways to write the same correct answer */
function variants(key) {
  const k = String(key).trim(), out = new Set([k]);
  const num = isPlainNumber(k);
  const wrap = v => {
    out.add('Rs. ' + v); out.add('Rs.' + v); out.add('₹ ' + v); out.add('₹' + v); out.add(v + '/-'); out.add(v + ' rupees'); out.add(v + ' Rs');
    out.add('  ' + v + '  '); out.add(v + '.'); out.add('= ' + v); out.add('ans = ' + v); out.add('Answer: ' + v); out.add('answer is ' + v);
    out.add('x = ' + v); out.add('S = ' + v); out.add(v + ' (or ' + v + ')'); out.add('₹ ' + v + ' (or ' + k + ')'); out.add(v + ' or ' + v);
    out.add(v + ' = ' + v); out.add('= ' + v + ' ₹'); out.add('approx ' + v); out.add(v + ' cm'); out.add(v + ' units'); out.add(v + ' sq. units');
  };
  if (/^-?[\d.,/]+$/.test(k)) wrap(k);                  // number-like keys only (word answers such as "hill" are not wrapped in units)
  else { out.add(k.toUpperCase()); out.add('  ' + k + '  '); out.add(k + '.'); }
  if (num) {
    group(k).forEach(g => { out.add(g); wrap(g); });
    if (!k.includes('.')) { out.add(k + '.0'); out.add(k + '.00'); }
    out.add('S30 = 4 × ' + 'x').delete('S30 = 4 × x');
    out.add('S_30 = ' + k); out.add('Sn = ' + k); out.add('S₃₀ = ' + k); out.add('n/2[2a+(n-1)d] = 15 × 305 = ' + k); out.add('30/2 [160 + 145] = ' + k);
  }
  return [...out];
}
/* near misses that must NOT be accepted */
function wrongs(key) {
  const k = String(key).trim(); if (!isPlainNumber(k)) return [];
  const v = parseFloat(k), o = [String(v + 1), String(v * 10), String(v + 0.5 === v ? v + 2 : v + 0.5), '0', '', 'abc'];
  if (v > 10) o.push(k + '0', String(v - 10), k + ' (or ' + (v + 1) + ')', 'between ' + k + ' and ' + (v + 7));
  return o.filter(x => x !== k && !(x === '' ) && parseFloat(x) !== v);
}

let fails = 0, checks = 0; const bad = new Map();
const shapes = new Map();
const note = (q, kind, ans, key) => { fails++; { const sh = kind.split(' ')[2] + ' ' + String(ans).split(String(key)).join('N'); shapes.set(sh, (shapes.get(sh) || 0) + 1); } if (!bad.has(q.id)) bad.set(q.id, []); bad.get(q.id).push(kind + ' ' + JSON.stringify(ans)); };
nums.forEach(q => {
  q.accept.forEach(acc => {
    variants(acc).forEach(v => { checks++; if (!matchNum(q, v)) note(q, 'should be CORRECT', v, acc); });
    wrongs(acc).forEach(v => { if (q.accept.some(x => String(x).trim() === String(v).trim())) return; checks++; if (v && matchNum(q, v)) note(q, 'should be WRONG', v, acc); });
  });
});

/* fixed cases */
const T = (ans, accept, want, tol) => { checks++; const got = matchNum({ accept, tol }, ans); if (got !== want) { fails++; console.log((want ? 'should be CORRECT ' : 'should be WRONG ') + JSON.stringify(ans) + '  vs  ' + JSON.stringify(accept)); } };
T('₹ 4,575 (or 4575)', ['4575'], true);          // the reported case
T('4575 (or 4,575)', ['4575'], true);
T('Rs. 4,575/-', ['4575'], true);
T('4,575', ['4575'], true);
T('₹ 1,50,000', ['150000'], true);
T('1,50,000 rupees', ['150000'], true);
T('x = 3', ['3'], true);
T('x = 3 or x = 3', ['3'], true);
T('(2, 1)', ['2, 1'], true);
T('2,1', ['2, 1'], true);
T('x = 2, y = 1', ['2, 1'], true);
T('1/2', ['0.5'], true);
T('0.5', ['1/2'], true);
T('50%', ['50'], true);
T('0.50', ['0.5'], true);
T('-3', ['-3'], true);
T('x = -3', ['-3'], true);
T('3', ['-3'], false);
T('4575 or 4580', ['4575'], false);              // two different answers: not a clear answer
T('4,57', ['4575'], false);
T('45750', ['4575'], false);
T('4576', ['4575'], false);
T('30 4575', ['4575'], false);

console.log(nums.length + ' numeric questions, ' + checks + ' answers tried.');
if (fails) {
  if (process.argv.includes('--shapes')) [...shapes].sort((x, y) => y[1] - x[1]).slice(0, 60).forEach(([k, n]) => console.log(String(n).padStart(6) + '  ' + k));
  console.log('✗ ' + fails + ' failures');
  [...bad].slice(0, 25).forEach(([id, l]) => console.log('  ' + id + '\n     ' + [...new Set(l)].slice(0, 6).join('\n     ')));
  process.exit(1);
}
console.log('✓ every way of typing the right answer is accepted, and near misses stay wrong.');

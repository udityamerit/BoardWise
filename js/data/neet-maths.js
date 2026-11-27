/* Mathematics question bank in the NEET MCQ format — NCERT Class XI (rationalised), 14 chapters. Original questions;
   every answer is computed from the question's own numbers (exact fractions / surds, no rounding). */
(function () {
const NL = window.NL, S = 'mat';
const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
const M = x => (x < 0 ? '−' : '') + Math.abs(x);                                  // integer with a proper minus sign
const fr = (p, q) => { q = q == null ? 1 : q; if (q < 0) { p = -p; q = -q; } const d = gcd(p, q) || 1; p /= d; q /= d; return (p < 0 ? '−' : '') + (q === 1 ? Math.abs(p) : Math.abs(p) + '/' + q); };
const C = (n, r) => { if (r < 0 || r > n) return 0; let x = 1; for (let i = 1; i <= r; i++) x = x * (n - r + i) / i; return Math.round(x); };
const Pm = (n, r) => { let x = 1; for (let i = 0; i < r; i++) x *= n - i; return x; };
const fact = n => n <= 1 ? 1 : n * fact(n - 1);
const lin = (a, b, v) => { v = v || 'x'; const A = a === 1 ? v : a === -1 ? '−' + v : M(a) + v; return b === 0 ? A : A + (b > 0 ? ' + ' : ' − ') + Math.abs(b); };   // ax + b
const cx = (re, im) => { if (im === 0) return M(re); const I = Math.abs(im) === 1 ? 'i' : Math.abs(im) + 'i'; return re === 0 ? (im < 0 ? '−' : '') + I : M(re) + (im < 0 ? ' − ' : ' + ') + I; };
/* q, answer, wrongs (strings or numbers; duplicates dropped), solution, difficulty */
const Q = (ch, rows, fn) => NL.add(S, ch, rows.map(row => {
  const [q, a, w, s, d] = fn.apply(null, row), A = typeof a === 'number' ? M(a) : a, seen = new Set([A]), o = [];
  w.forEach(x => { x = typeof x === 'number' ? M(x) : x; if (!seen.has(x)) { seen.add(x); o.push(x); } });
  const nv = +A.replace('−', '-');
  if (o.length < 3 && /^−?\d+(\.\d+)?$/.test(A)) [nv + 1, nv - 1, nv + 2, nv * 2, nv + 10, nv - 2].forEach(x => { x = M(+x.toFixed(4)); if (!seen.has(x) && !x.startsWith('−') === !A.startsWith('−') && o.length < 3) { seen.add(x); o.push(x); } });
  if (o.length < 3) { console.warn('maths item skipped (distractors):', q); return null; }
  return NL.mc(q, A, o.slice(0, 3), s, d || 'medium');
}).filter(Boolean));
const mcs = (ch, l) => NL.mcs(S, ch, l), st = (ch, T, F) => NL.stmts(S, ch, T, F, { correct: 3, incorrect: 3, two: 2, count: 2 });

/* ---------- 1. Sets ---------- */
let ch = 'Sets';
Q(ch, [[3], [4], [5], [6], [7], [8]], n => [`The number of subsets of a set containing ${n} elements is`, 2 ** n, [2 ** n - 1, n * n, 2 * n, 2 ** (n + 1)], `A set with n elements has 2ⁿ subsets: 2<sup>${n}</sup> = <b>${2 ** n}</b>.`, 'easy']);
Q(ch, [[3], [4], [5], [6]], n => [`The number of proper subsets of a set with ${n} elements is`, 2 ** n - 1, [2 ** n, 2 ** n - 2, n * n, 2 * n], `Proper subsets = 2ⁿ − 1 = <b>${2 ** n - 1}</b> (all subsets except the set itself).`]);
Q(ch, [[0], [1], [2]], n => [`If A has ${n} element${n === 1 ? '' : 's'}, the number of elements in P(P(A)) (power set of the power set) is`, 2 ** (2 ** n), [2 ** n, 2 ** (n + 1), (2 ** n) ** 2 + 1], `P(A) has 2<sup>${n}</sup> = ${2 ** n} elements, so P(P(A)) has 2<sup>${2 ** n}</sup> = <b>${2 ** (2 ** n)}</b>.`, 'hard']);
Q(ch, [[20, 15, 5], [40, 30, 12], [25, 18, 10], [50, 35, 20], [17, 23, 8]], (a, b, c) => [`If n(A) = ${a}, n(B) = ${b} and n(A ∩ B) = ${c}, then n(A ∪ B) is`, a + b - c, [a + b, a + b + c, a + b - 2 * c], `n(A ∪ B) = n(A) + n(B) − n(A ∩ B) = ${a} + ${b} − ${c} = <b>${a + b - c}</b>.`, 'easy']);
Q(ch, [[60, 30, 25, 10], [100, 45, 40, 15], [70, 37, 52, 25], [400, 250, 150, 100]], (N, a, b, c) => [
  `In a group of ${N} students, ${a} like tea, ${b} like coffee and ${c} like both. How many like neither?`, N - (a + b - c), [N - a - b, N - (a + b + c), a + b - c],
  `Number who like at least one = ${a} + ${b} − ${c} = ${a + b - c}; neither = ${N} − ${a + b - c} = <b>${N - (a + b - c)}</b>.`]);
Q(ch, [[21, 8], [35, 12], [18, 5], [40, 17]], (a, c) => [`If n(A) = ${a} and n(A ∩ B) = ${c}, then n(A − B) is`, a - c, [a + c, c, a], `A − B contains the elements of A not in B: ${a} − ${c} = <b>${a - c}</b>.`, 'easy']);
Q(ch, [[21, 26, 29, 14, 12, 15, 8], [50, 40, 30, 20, 10, 15, 5], [60, 50, 40, 25, 20, 15, 10]], (a, b, c, ab, bc, ca, abc) => [
  `In a survey, ${a} people like product A, ${b} like B and ${c} like C. If ${ab} like A and B, ${bc} like B and C, ${ca} like C and A and ${abc} like all three, the number who like at least one product is`,
  a + b + c - ab - bc - ca + abc, [a + b + c - ab - bc - ca, a + b + c, a + b + c - ab - bc - ca - abc],
  `n(A ∪ B ∪ C) = ${a} + ${b} + ${c} − ${ab} − ${bc} − ${ca} + ${abc} = <b>${a + b + c - ab - bc - ca + abc}</b>.`, 'hard']);
mcs(ch, [
  ['Which of the following is an empty set?', '{x : x is a real number and x² + 1 = 0}', '{x : x is a real number and x² − 1 = 0}', '{0}', '{x : x is a natural number less than 2}', 'x² = −1 has no real solution.'],
  ['The set {x : x ∈ R, −3 ≤ x < 5} written in interval notation is', '[−3, 5)', '(−3, 5]', '[−3, 5]', '(−3, 5)', 'Square bracket for an included end point, round for an excluded one.'],
  ['For any set A, A ∪ A′ equals', 'U (the universal set)', 'φ', 'A', 'A′', 'Every element of U is either in A or in A′.'],
  ['(A ∪ B)′ is equal to', 'A′ ∩ B′', 'A′ ∪ B′', 'A ∩ B', 'A − B', 'De Morgan\'s law.'],
  ['A − B is equal to', 'A ∩ B′', 'A′ ∩ B', 'A ∪ B′', 'B − A', 'Elements in A and not in B.'],
  ['If A ⊂ B, then A ∩ B equals', 'A', 'B', 'φ', 'A ∪ B', 'Every element of A is in B.'],
  ['If A ⊂ B, then A ∪ B equals', 'B', 'A', 'φ', 'A ∩ B', 'B already contains A.'],
  ['The set of all subsets of a set A is called', 'the power set of A', 'the universal set', 'the null set', 'a singleton', 'It is denoted P(A).'],
  ['Two sets A and B are disjoint if', 'A ∩ B = φ', 'A ∪ B = φ', 'A = B', 'A ⊂ B', 'They have no common element.'],
  ['The set {x : x is a positive integer and x² = 4} in roster form is', '{2}', '{−2, 2}', '{4}', '{2, 4}', 'Only the positive integer 2.'],
  ['Which of the following sets is finite?', 'The set of months of a year', 'The set of natural numbers', 'The set of lines through a point', 'The set of points on a circle', 'There are 12 months.'],
  ['(A′)′ is equal to', 'A', 'A′', 'U', 'φ', 'The complement of the complement is the set itself.']
]);

/* ---------- 2. Relations and Functions ---------- */
ch = 'Relations and Functions';
Q(ch, [[2, 3], [3, 3], [2, 4], [3, 4], [2, 2], [4, 4]], (m, k) => [`If A has ${m} elements and B has ${k} elements, the number of relations from A to B is`, 2 ** (m * k), [m * k, 2 ** (m + k), 2 ** (m * k) - 1], `A × B has ${m}×${k} = ${m * k} elements; every subset is a relation: 2<sup>${m * k}</sup> = <b>${2 ** (m * k)}</b>.`]);
Q(ch, [[2, 3], [3, 2], [3, 4], [4, 2], [2, 5]], (m, k) => [`The number of functions from a set A with ${m} elements to a set B with ${k} elements is`, k ** m, [m ** k, m * k, 2 ** (m * k)], `Each of the ${m} elements of A can go to any of ${k} elements: ${k}<sup>${m}</sup> = <b>${k ** m}</b>.`]);
Q(ch, [[3, 4], [5, 2], [6, 3], [4, 7]], (m, k) => [`If n(A) = ${m} and n(B) = ${k}, then n(A × B) is`, m * k, [m + k, 2 ** (m * k), m ** k], `n(A × B) = n(A)·n(B) = <b>${m * k}</b>.`, 'easy']);
Q(ch, [[2, -3, 1, 2], [1, 4, -5, -3], [3, 0, -2, 2], [1, -2, 7, 4], [2, 5, -1, -2]], (a, b, c, t) => {
  const v = a * t * t + b * t + c;
  return [`If f(x) = ${a === 1 ? '' : a}x² ${b < 0 ? '− ' + (-b === 1 ? '' : -b) + 'x' : b > 0 ? '+ ' + (b === 1 ? '' : b) + 'x' : ''} ${c < 0 ? '− ' + -c : '+ ' + c}, then f(${M(t)}) is`.replace(/ +/g, ' '), v, [v + 2 * b * t, a * t * t - b * t + c, a * t + b * t + c, v + 1],
    `f(${M(t)}) = ${a}(${M(t)})² + (${M(b)})(${M(t)}) + (${M(c)}) = <b>${M(v)}</b>.`, 'easy'];
});
Q(ch, [[3], [4], [5], [2], [6]], a => [`The domain of f(x) = √(${a * a} − x²) is`, `[−${a}, ${a}]`, [`(−${a}, ${a})`, `[0, ${a}]`, `R − {−${a}, ${a}}`, `[−${a * a}, ${a * a}]`], `Need ${a * a} − x² ≥ 0 ⇒ −${a} ≤ x ≤ ${a}: <b>[−${a}, ${a}]</b>.`]);
Q(ch, [[2], [3], [-1], [5], [-4]], c => [`The range of f(x) = x² ${c < 0 ? '− ' + -c : '+ ' + c}, x ∈ R, is`, `[${M(c)}, ∞)`, [`(${M(c)}, ∞)`, 'R', `(−∞, ${M(c)}]`, `[0, ∞)`], `x² ≥ 0 for all real x, so f(x) ≥ ${M(c)}: range <b>[${M(c)}, ∞)</b>.`]);
Q(ch, [[2], [3], [1], [4], [5]], a => [`The domain of the real function f(x) = 1/(x − ${a}) is`, `R − {${a}}`, ['R', `R − {−${a}}`, `(${a}, ∞)`, `R − {0}`], `f is defined except where x − ${a} = 0: <b>R − {${a}}</b>.`, 'easy']);
Q(ch, [[3, 2, 1, 4, 2], [1, -1, 2, 3, 1], [2, 5, -1, 1, 3], [4, 0, 1, -2, -1]], (a, b, c, d, t) => {
  const f = a * t + b, g = c * t + d;
  return [`If f(x) = ${lin(a, b)} and g(x) = ${lin(c, d)}, then (f·g)(${M(t)}) is`, f * g, [f + g, f - g, f * g + 1, a * c * t],
    `f(${M(t)}) = ${M(f)}, g(${M(t)}) = ${M(g)}; (fg)(${M(t)}) = ${M(f)} × ${M(g)} = <b>${M(f * g)}</b>.`];
});
Q(ch, [[3, 5, 7, 2], [-1, 4, 2, 9], [6, -3, 1, -5]], (x0, y0, p, q) => [`If (x + ${x0 < 0 ? '(' + M(x0) + ')' : x0}, y − ${y0 < 0 ? '(' + M(y0) + ')' : y0}) = (${M(p)}, ${M(q)}), then (x, y) is`, `(${M(p - x0)}, ${M(q + y0)})`, [`(${M(p + x0)}, ${M(q - y0)})`, `(${M(p - x0)}, ${M(q - y0)})`, `(${M(p + x0)}, ${M(q + y0)})`],
  `Equal ordered pairs have equal components: x = ${M(p)} − ${M(x0)} = ${M(p - x0)}, y = ${M(q)} + ${M(y0)} = ${M(q + y0)}.`, 'easy']);
mcs(ch, [
  ['The range of the modulus function f(x) = |x|, x ∈ R, is', '[0, ∞)', 'R', '(0, ∞)', '(−∞, 0]', '|x| is never negative and takes every value ≥ 0.'],
  ['The range of the signum function is', '{−1, 0, 1}', 'R', '[−1, 1]', '{0, 1}', 'It gives 1 for x > 0, 0 for x = 0 and −1 for x < 0.'],
  ['The value of [−2.5], where [x] is the greatest integer function, is', '−3', '−2', '−2.5', '2', '[x] is the greatest integer less than or equal to x.', 'medium'],
  ['The value of [3.7] + [−3.7] is', '−1', '0', '1', '−7', '[3.7] = 3 and [−3.7] = −4, so the sum is −1.', 'hard'],
  ['A relation R from A to B is', 'a subset of A × B', 'equal to A × B', 'a subset of B × A only', 'always a function', 'Any subset of the Cartesian product is a relation.'],
  ['If (x, 1), (y, 2), (z, 1) are in A × B with x, y, z distinct and B = {1, 2}, then A has at least', '3 elements', '2 elements', '1 element', '6 elements', 'x, y and z are distinct elements of A.'],
  ['The function f(x) = x for all x ∈ R is called the', 'identity function', 'constant function', 'modulus function', 'signum function', 'It maps each real number to itself.'],
  ['Which of the following relations is a function?', '{(1, 2), (2, 3), (3, 4)}', '{(1, 2), (1, 3), (2, 4)}', '{(2, 1), (2, 2), (3, 3)}', '{(1, 1), (1, 2)}', 'In a function each first element appears exactly once.'],
  ['If A = {1, 2} and B = {3, 4}, then A × B is', '{(1, 3), (1, 4), (2, 3), (2, 4)}', '{(3, 1), (4, 2)}', '{(1, 3), (2, 4)}', '{1, 2, 3, 4}', 'All ordered pairs (a, b) with a ∈ A and b ∈ B.'],
  ['The graph of the constant function f(x) = 3 is', 'a line parallel to the x-axis', 'a line parallel to the y-axis', 'a line through the origin', 'a parabola', 'y = 3 for every x.']
]);

/* ---------- 3. Complex Numbers and Quadratic Equations ---------- */
ch = 'Complex Numbers and Quadratic Equations';
const IP = ['1', 'i', '−1', '−i'];
NL.add(S, ch, [7, 10, 13, 18, 35, 42, 101, -1, -3, 26].map(n => { const k = ((n % 4) + 4) % 4; return NL.fx(`The value of i<sup>${M(n)}</sup> is`, IP, k, `i<sup>${M(n)}</sup> = i<sup>${k}</sup> (the powers of i repeat every 4) = <b>${IP[k]}</b>.`, 'easy'); }));
Q(ch, [[3, 4], [5, 12], [8, 15], [6, -8], [-7, 24], [-9, -12]], (a, b) => { const r = Math.round(Math.hypot(a, b)); return [`The modulus of the complex number ${cx(a, b)} is`, r, [Math.abs(a) + Math.abs(b), r * r, Math.abs(a - b), r + 1], `|z| = √(${a * a} + ${b * b}) = √${r * r} = <b>${r}</b>.`, 'easy']; });
Q(ch, [[1, 2, 3, 4], [2, -1, 1, 3], [3, 2, 3, -2], [1, 1, 1, -1], [4, -3, 2, 5], [2, 3, -1, 2]], (a, b, c, d) => [
  `The product (${cx(a, b)})(${cx(c, d)}) is`, cx(a * c - b * d, a * d + b * c), [cx(a * c + b * d, a * d + b * c), cx(a * c - b * d, a * d - b * c), cx(a * c, b * d), cx(a * c + b * d, a * d - b * c)],
  `(a + bi)(c + di) = (ac − bd) + (ad + bc)i = (${a * c} − ${M(b * d)}) + (${a * d} + ${M(b * c)})i = <b>${cx(a * c - b * d, a * d + b * c)}</b>.`]);
Q(ch, [[3, 4], [1, 1], [2, -3], [4, 3], [1, -2]], (a, b) => { const m = a * a + b * b, z = (p, q) => `${fr(p, m)} ${q < 0 ? '−' : '+'} ${fr(Math.abs(q), m)} i`;
  return [`The multiplicative inverse of ${cx(a, b)} is`, z(a, -b), [z(a, b), z(-a, b), `${fr(1, a)} ${-b < 0 ? '−' : '+'} ${fr(1, Math.abs(b))} i`], `z⁻¹ = z̄/|z|² = (${cx(a, -b)})/${m} = <b>${z(a, -b)}</b>.`]; });
Q(ch, [[2, 5, -1, 2], [-4, 13, 2, 3], [0, 9, 0, 3], [-6, 10, 3, 1], [4, 8, -2, 2], [-2, 2, 1, 1], [0, 16, 0, 4]], (p, q, re, im) => [
  `The roots of the equation x² ${p < 0 ? '− ' + (-p) + 'x' : p > 0 ? '+ ' + p + 'x' : ''} + ${q} = 0 are`.replace(/ +/g, ' '), re === 0 ? `±${im === 1 ? '' : im}i` : `${M(re)} ± ${im === 1 ? '' : im}i`,
  [re === 0 ? `±${im}` : `${M(-re)} ± ${im === 1 ? '' : im}i`, re === 0 ? `±${im * im}i` : `${M(re)} ± ${im}`, re === 0 ? `${im} ± i` : `${M(re * 2)} ± ${im * 2}i`, `±${im + 1}i`],
  `D = ${p * p} − ${4 * q} = ${p * p - 4 * q} < 0. x = (${M(-p)} ± √(${p * p - 4 * q}))/2 = <b>${re === 0 ? '±' + (im === 1 ? '' : im) + 'i' : M(re) + ' ± ' + (im === 1 ? '' : im) + 'i'}</b>.`]);
const ARG = [['1 + i', 'π/4'], ['−1 + i', '3π/4'], ['1 − i', '−π/4'], ['−1 − i', '−3π/4'], ['√3 + i', 'π/6'], ['−1 + √3 i', '2π/3'], ['1 + √3 i', 'π/3'], ['−√3 − i', '−5π/6']];
Q(ch, ARG.map((x, i) => [i]), i => { const [z, a] = ARG[i]; return [`The principal argument of z = ${z} is`, a, ARG.map(x => x[1]).filter(x => x !== a).sort((u, v) => (u.length + i) % 3 - (v.length + i) % 3), `Locate the point in its quadrant and use tan α = |Im/Re|: arg z = <b>${a}</b>.`]; });
mcs(ch, [
  ['The conjugate of 3 − 4i is', '3 + 4i', '−3 + 4i', '−3 − 4i', '4 − 3i', 'Change the sign of the imaginary part.'],
  ['For any complex number z, z · z̄ equals', '|z|²', '2 Re(z)', '0', '|z|', '(a + bi)(a − bi) = a² + b².'],
  ['The value of (1 + i)² is', '2i', '2', '0', '−2i', '1 + 2i + i² = 2i.'],
  ['The value of (1 − i)⁴ is', '−4', '4', '4i', '−4i', '(1 − i)² = −2i; (−2i)² = −4.', 'medium'],
  ['If z = x + iy, then |z| = 0 means', 'x = 0 and y = 0', 'x = 0 only', 'y = 0 only', 'x = y', 'x² + y² = 0 only when both are 0.'],
  ['The value of √(−16) + 3√(−25) is', '19i', '−19i', '19', '−11i', '4i + 3(5i) = 19i.'],
  ['The value of 1 + i² + i⁴ + i⁶ + … + i²⁰ is', '1', '0', '−1', 'i', 'Pairs (1 − 1) cancel; there are 11 terms, so the sum is 1.', 'hard'],
  ['A quadratic equation with real coefficients and discriminant D < 0 has', 'two non-real complex conjugate roots', 'two equal real roots', 'two distinct real roots', 'no roots', 'Roots are (−b ± i√(−D))/2a.'],
  ['If z₁ = 2 − i and z₂ = 1 + i, then Re(z₁z₂) is', '3', '1', '−1', '2', 'z₁z₂ = 2 + 2i − i − i² = 3 + i.'],
  ['The polar form of −1 is', 'cos π + i sin π', 'cos 0 + i sin 0', 'cos(π/2) + i sin(π/2)', 'cos 2π + i sin 2π', 'Modulus 1, argument π.']
]);

/* ---------- 4. Linear Inequalities ---------- */
ch = 'Linear Inequalities';
Q(ch, [[3, 4, 13, '>'], [5, -2, 18, '<'], [2, 7, 1, '≥'], [4, 3, -9, '≤'], [-3, 5, 17, '>'], [-2, 1, -7, '<']], (a, b, c, op) => {
  const v = fr(c - b, a), flip = { '>': '<', '<': '>', '≥': '≤', '≤': '≥' }, o2 = a < 0 ? flip[op] : op;
  return [`The solution of ${lin(a, b)} ${op} ${M(c)}, x ∈ R, is`, `x ${o2} ${v}`, [`x ${flip[o2]} ${v}`, `x ${o2} ${fr(c + b, a)}`, `x ${o2} ${fr(-(c - b), a)}`, `x ${flip[o2]} ${fr(c + b, a)}`],
    `${M(a)}x ${op} ${M(c)} − (${M(b)}) = ${M(c - b)} ⇒ x ${o2} <b>${v}</b>${a < 0 ? ' (dividing by a negative number reverses the sign)' : ''}.`];
});
Q(ch, [[2, 1, 3, 11], [3, -2, 4, 19], [1, 4, -1, 6], [5, 0, -5, 20]], (a, b, lo, hi) => {
  /* lo < ax + b ≤ hi, integer x */
  const xs = []; for (let x = -50; x <= 50; x++) if (lo < a * x + b && a * x + b <= hi) xs.push(x);
  return [`The number of integers x satisfying ${M(lo)} < ${lin(a, b)} ≤ ${M(hi)} is`, xs.length, [xs.length + 1, xs.length - 1, hi - lo, xs.length + 2],
    `${fr(lo - b, a)} < x ≤ ${fr(hi - b, a)}; integers: ${xs.join(', ')} → <b>${xs.length}</b>.`];
});
Q(ch, [[3, 5], [2, 7], [4, 9], [5, 11]], (a, b) => [`The solution set of ${a}x − ${b} < ${a}x + 1 (x ∈ R) is`, 'R (all real numbers)', ['φ (empty set)', `x < ${fr(b + 1, a)}`, `x > ${fr(b + 1, a)}`, `x > 0`], `It reduces to −${b} < 1, which is always true: <b>all real x</b>.`, 'medium']);
mcs(ch, [
  ['If x < 5, then', '−x > −5', '−x < −5', 'x > −5 always', '−x < 5 always', 'Multiplying an inequality by −1 reverses it.'],
  ['The solution of −4x > 30 for natural numbers x is', 'no solution', 'x > −7.5', 'x = 1, 2, 3', 'all natural numbers', 'x < −7.5, which no natural number satisfies.'],
  ['If |x − 2| ≤ 3, then', '−1 ≤ x ≤ 5', 'x ≤ 5 only', '−5 ≤ x ≤ 1', 'x ≥ −1 only', '−3 ≤ x − 2 ≤ 3.', 'medium'],
  ['On the number line, the solution of x ≥ 2 is shown by', 'a filled circle at 2 and the line to the right', 'an open circle at 2 and the line to the right', 'a filled circle at 2 and the line to the left', 'only the point 2', 'The end point is included.'],
  ['If a < b and c > 0, then', 'ac < bc', 'ac > bc', 'ac = bc', 'a/c > b/c', 'Multiplying by a positive number keeps the inequality.'],
  ['The solution of 3(x − 1) ≤ 2(x − 3) is', 'x ≤ −3', 'x ≥ −3', 'x ≤ 3', 'x ≥ 3', '3x − 3 ≤ 2x − 6 ⇒ x ≤ −3.'],
  ['The solution of (x/3) > (x/2) + 1 is', 'x < −6', 'x > −6', 'x < 6', 'x > 6', 'Multiply by 6: 2x > 3x + 6 ⇒ x < −6.', 'medium'],
  ['The solution set of 2x + 1 > 3 and 3x − 2 < 7 (x ∈ R) is', '(1, 3)', '[1, 3]', '(1, ∞)', '(−∞, 3)', 'x > 1 and x < 3.']
]);

/* ---------- 5. Permutations and Combinations ---------- */
ch = 'Permutations and Combinations';
Q(ch, [[5, 2], [6, 3], [7, 2], [8, 3], [10, 2], [9, 4]], (n, r) => [`The value of <sup>${n}</sup>P<sub>${r}</sub> is`, Pm(n, r), [C(n, r), n ** r, Pm(n, r) / 2, Pm(n, r + 1) / (n - r)], `<sup>n</sup>P<sub>r</sub> = n!/(n − r)! = <b>${Pm(n, r)}</b>.`, 'easy']);
Q(ch, [[8, 3], [10, 4], [12, 2], [7, 3], [15, 3], [9, 5]], (n, r) => [`The value of <sup>${n}</sup>C<sub>${r}</sub> is`, C(n, r), [Pm(n, r), C(n, r + 1), C(n, r - 1), C(n, r) * 2], `<sup>n</sup>C<sub>r</sub> = n!/(r!(n − r)!) = <b>${C(n, r)}</b>.`, 'easy']);
const WORD = [['APPLE', 'P twice'], ['BANANA', 'A thrice, N twice'], ['ALLAHABAD', 'A four times, L twice'], ['ROORKEE', 'R, O and E twice each'], ['ARRANGE', 'A twice, R twice'], ['COMMITTEE', 'M, T and E twice each'], ['MONDAY', 'all different'], ['MISSISSIPPI', 'I four times, S four times, P twice']];
Q(ch, WORD.map((x, i) => [i]), i => {
  const w = WORD[i][0], cnt = {}; for (const c of w) cnt[c] = (cnt[c] || 0) + 1;
  const den = Object.values(cnt).reduce((a, b) => a * fact(b), 1), v = fact(w.length) / den;
  return [`The number of distinct arrangements of the letters of the word ${w} is`, v, [fact(w.length), v * 2, v / 2, fact(w.length - 1)],
    `${w.length} letters with ${WORD[i][1]}: ${w.length}!/${Object.values(cnt).filter(x => x > 1).map(x => x + '!').join(' ') || '1'} = <b>${v}</b>.`];
});
Q(ch, [[5], [6], [8], [10], [12], [15]], n => [`The number of diagonals of a polygon with ${n} sides is`, n * (n - 3) / 2, [C(n, 2), n * (n - 3), n * (n - 2) / 2, C(n, 2) + n], `Diagonals = <sup>${n}</sup>C<sub>2</sub> − ${n} = ${n}(${n} − 3)/2 = <b>${n * (n - 3) / 2}</b>.`]);
Q(ch, [[6], [8], [10], [12]], n => [`Out of ${n} points in a plane, no three are collinear. The number of triangles that can be formed is`, C(n, 3), [Pm(n, 3), C(n, 2), C(n, 3) * 2, n * 3], `Any 3 points form a triangle: <sup>${n}</sup>C<sub>3</sub> = <b>${C(n, 3)}</b>.`]);
Q(ch, [[10], [12], [20], [15], [25]], n => [`At a party each of ${n} persons shakes hands with every other person exactly once. The total number of handshakes is`, C(n, 2), [n * (n - 1), n * n, C(n, 2) + n], `Each handshake is a pair of persons: <sup>${n}</sup>C<sub>2</sub> = <b>${C(n, 2)}</b>.`, 'easy']);
Q(ch, [[8, 6, 2], [9, 7, 3], [12, 8, 2], [10, 5, 3]], (r, s, t) => { const n = r + s; return [`If <sup>n</sup>C<sub>${r}</sub> = <sup>n</sup>C<sub>${s}</sub>, then <sup>n</sup>C<sub>${t}</sub> is`, C(n, t), [C(n - 1, t), C(n + 1, t), Pm(n, t), C(r - s, t) + 1], `<sup>n</sup>C<sub>r</sub> = <sup>n</sup>C<sub>s</sub> with r ≠ s ⇒ n = r + s = ${n}; <sup>${n}</sup>C<sub>${t}</sub> = <b>${C(n, t)}</b>.`]; });
Q(ch, [[5, 4, 2, 2], [6, 5, 3, 2], [7, 4, 3, 1], [4, 6, 2, 3]], (b, g, x, y) => [`A committee of ${x} boys and ${y} girl${y > 1 ? 's' : ''} is to be chosen from ${b} boys and ${g} girls. The number of ways is`, C(b, x) * C(g, y), [C(b + g, x + y), C(b, x) + C(g, y), Pm(b, x) * Pm(g, y)],
  `<sup>${b}</sup>C<sub>${x}</sub> × <sup>${g}</sup>C<sub>${y}</sub> = ${C(b, x)} × ${C(g, y)} = <b>${C(b, x) * C(g, y)}</b>.`]);
Q(ch, [[5], [6], [7], [9]], k => [`How many 3-digit numbers with distinct digits can be formed using the digits 1 to ${k}?`, Pm(k, 3), [k ** 3, C(k, 3), Pm(k, 3) / 2], `Arrangements of 3 out of ${k} digits: <sup>${k}</sup>P<sub>3</sub> = <b>${Pm(k, 3)}</b>.`]);
Q(ch, [[4], [5], [6], [7]], n => [`In how many ways can ${n} different books be arranged on a shelf?`, fact(n), [n * n, fact(n - 1), 2 ** n], `${n}! = <b>${fact(n)}</b>.`, 'easy']);

/* ---------- 6. Binomial Theorem ---------- */
ch = 'Binomial Theorem';
Q(ch, [[8, 3], [10, 4], [7, 2], [12, 5], [9, 6]], (n, k) => [`The coefficient of x<sup>${k}</sup> in the expansion of (1 + x)<sup>${n}</sup> is`, C(n, k), [C(n, k - 1), C(n, k + 1), Pm(n, k), C(n - 1, k)], `T<sub>r+1</sub> = <sup>${n}</sup>C<sub>r</sub>x<sup>r</sup>; for x<sup>${k}</sup>, r = ${k}: <b>${C(n, k)}</b>.`, 'easy']);
Q(ch, [[5, 2, 3], [6, 3, 2], [4, 1, 2], [5, 1, 3], [6, 2, 1]], (n, a, k) => { const v = C(n, k) * a ** k; return [`The coefficient of x<sup>${k}</sup> in (1 + ${a === 1 ? '' : a}x)<sup>${n}</sup> is`, v, [C(n, k), C(n, k) * a, C(n, k - 1) * a ** k, v * 2], `<sup>${n}</sup>C<sub>${k}</sub>·${a}<sup>${k}</sup> = ${C(n, k)} × ${a ** k} = <b>${v}</b>.`]; });
Q(ch, [[3], [6], [9], [12]], n => { const r = 2 * n / 3; return [`The term independent of x in the expansion of (x² + 1/x)<sup>${n}</sup> is`, C(n, r), [C(n, r - 1), C(n, r + 1) || C(n, 1) + 2, C(n, n / 3) * 2, Pm(n, 2)], `T<sub>r+1</sub> = <sup>${n}</sup>C<sub>r</sub>x<sup>2(${n}−r)</sup>x<sup>−r</sup>; ${2 * n} − 3r = 0 ⇒ r = ${r}: <b>${C(n, r)}</b>.`, 'hard']; });
Q(ch, [[2], [3], [4], [5], [6]], m => [`The term independent of x in (x + 1/x)<sup>${2 * m}</sup> is`, C(2 * m, m), [C(2 * m, m - 1), C(2 * m, 2), 2 ** m, C(2 * m, m) / 2 + 1], `The middle term T<sub>${m + 1}</sub> = <sup>${2 * m}</sup>C<sub>${m}</sub> is free of x: <b>${C(2 * m, m)}</b>.`]);
Q(ch, [[7], [10], [12], [15], [20]], n => [`The number of terms in the expansion of (a + b)<sup>${n}</sup> is`, n + 1, [n, n - 1, 2 * n, n + 2], `(a + b)ⁿ has n + 1 terms: <b>${n + 1}</b>.`, 'easy']);
Q(ch, [[5], [6], [8], [10], [12]], n => [`The sum of the binomial coefficients in the expansion of (1 + x)<sup>${n}</sup> is`, 2 ** n, [2 ** (n - 1), n * n, 2 * n, 2 ** n - 1], `Put x = 1: 2<sup>${n}</sup> = <b>${2 ** n}</b>.`, 'easy']);
mcs(ch, [
  ['The general term of (a + b)ⁿ is', 'T<sub>r+1</sub> = <sup>n</sup>C<sub>r</sub> a<sup>n−r</sup> b<sup>r</sup>', 'T<sub>r</sub> = <sup>n</sup>C<sub>r</sub> a<sup>r</sup> b<sup>n−r</sup>', 'T<sub>r+1</sub> = <sup>n</sup>P<sub>r</sub> a<sup>n−r</sup> b<sup>r</sup>', 'T<sub>r</sub> = <sup>n</sup>C<sub>r−1</sub> a<sup>r</sup>', 'Standard result.'],
  ['The middle term in the expansion of (a + b)<sup>10</sup> is the', '6th term', '5th term', '5th and 6th terms', '7th term', 'n = 10 is even, so there is one middle term T<sub>(n/2)+1</sub> = T<sub>6</sub>.'],
  ['The middle terms of (a + b)<sup>9</sup> are the', '5th and 6th terms', '5th term only', '4th and 5th terms', '6th term only', 'n odd: T<sub>(n+1)/2</sub> and T<sub>(n+3)/2</sub>.'],
  ['The value of (99)<sup>5</sup> computed by the binomial theorem is', '9509900499', '9509900501', '9509800499', '9409900499', '(100 − 1)⁵ = 10¹⁰ − 5·10⁸ + 10·10⁶ − 10·10⁴ + 5·10² − 1.', 'hard'],
  ['Which is larger: (1.01)<sup>1000000</sup> or 10000?', '(1.01)<sup>1000000</sup>', '10000', 'They are equal', 'Cannot be decided', '(1 + 0.01)ⁿ > 1 + n(0.01) = 10001 > 10000.', 'medium'],
  ['The coefficient of x<sup>5</sup> in (x + 3)<sup>8</sup> is', '1512', '56', '1215', '168', '<sup>8</sup>C<sub>3</sub>·3³ = 56 × 27 = 1512.', 'medium'],
  ['The expansion of (2x − 3)<sup>4</sup> has its last term equal to', '81', '−81', '16x⁴', '−24x', '(−3)⁴ = 81.']
]);

/* ---------- 7. Sequences and Series ---------- */
ch = 'Sequences and Series';
Q(ch, [[3, 4, 20], [7, -3, 15], [2, 5, 30], [-5, 6, 12], [10, 2.5, 9]], (a, d, n) => { const v = a + (n - 1) * d; return [`The ${n}th term of the AP whose first term is ${M(a)} and common difference ${M(d)} is`, NL.f(v).replace('-', '−'), [a + n * d, a + (n - 2) * d, n * d, a * n].map(x => NL.f(x).replace('-', '−')), `a<sub>n</sub> = a + (n − 1)d = ${M(a)} + ${n - 1}(${M(d)}) = <b>${NL.f(v).replace('-', '−')}</b>.`, 'easy']; });
Q(ch, [[2, 3, 20], [5, 4, 10], [1, 2, 50], [-3, 5, 12], [7, -2, 15]], (a, d, n) => { const s = n / 2 * (2 * a + (n - 1) * d); return [`The sum of the first ${n} terms of the AP ${a}, ${a + d}, ${a + 2 * d}, … is`.replace(/-/g, '−'), s, [n * (2 * a + (n - 1) * d), n / 2 * (a + (n - 1) * d), n / 2 * (2 * a + n * d)], `S<sub>n</sub> = n/2 [2a + (n − 1)d] = ${n}/2 [${2 * a} + ${(n - 1) * d}] = <b>${M(s)}</b>.`]; });
Q(ch, [[3, 2, 8], [5, 3, 6], [2, -2, 9], [1, 4, 7], [81, 1 / 3, 5]], (a, r, n) => { const v = a * r ** (n - 1), F = x => Number.isInteger(x) ? M(x) : fr(Math.round(x * 81), 81); return [`The ${n}th term of the GP with first term ${a} and common ratio ${r === 1 / 3 ? '1/3' : M(r)} is`, F(v), [F(a * r ** n), F(a * r ** (n - 2)), F(a * (n - 1) * r), F(-v)], `a<sub>n</sub> = ar<sup>n−1</sup> = ${a} × (${r === 1 / 3 ? '1/3' : M(r)})<sup>${n - 1}</sup> = <b>${F(v)}</b>.`]; });
Q(ch, [[1, 2, 10], [3, 2, 6], [2, 3, 5], [5, 2, 8], [1, 3, 7]], (a, r, n) => { const s = a * (r ** n - 1) / (r - 1); return [`The sum of the first ${n} terms of the GP ${a}, ${a * r}, ${a * r * r}, … is`, s, [a * r ** n, a * (r ** (n - 1) - 1) / (r - 1), s + a * r ** n, a * (r ** n + 1) / (r - 1)], `S<sub>n</sub> = a(rⁿ − 1)/(r − 1) = ${a}(${r}<sup>${n}</sup> − 1)/${r - 1} = <b>${s}</b>.`]; });
Q(ch, [[4, 16], [2, 32], [9, 25], [3, 27], [5, 45]], (a, b) => { const g = Math.sqrt(a * b); return [`The geometric mean (GM) of ${a} and ${b} is`, g, [(a + b) / 2, a * b, (a + b) / 2 - 1, g * 2], `GM = √(${a} × ${b}) = √${a * b} = <b>${g}</b>.`, 'easy']; });
Q(ch, [[10], [20], [50], [100], [15]], n => [`The sum 1 + 2 + 3 + … + ${n} is`, n * (n + 1) / 2, [n * n, n * (n - 1) / 2, n * (n + 1)], `n(n + 1)/2 = ${n}×${n + 1}/2 = <b>${n * (n + 1) / 2}</b>.`, 'easy']);
Q(ch, [[5], [10], [12], [20]], n => [`The sum of the squares of the first ${n} natural numbers is`, n * (n + 1) * (2 * n + 1) / 6, [(n * (n + 1) / 2) ** 2, Math.round(n * n * n / 3) + 1, n * (n + 1) * (2 * n + 1) / 3], `n(n + 1)(2n + 1)/6 = <b>${n * (n + 1) * (2 * n + 1) / 6}</b>.`]);
Q(ch, [[5], [8], [10], [12]], n => [`The sum of the cubes of the first ${n} natural numbers is`, (n * (n + 1) / 2) ** 2, [n * (n + 1) * (2 * n + 1) / 6, n ** 4 / 4, (n * (n + 1)) ** 2], `[n(n + 1)/2]² = ${n * (n + 1) / 2}² = <b>${(n * (n + 1) / 2) ** 2}</b>.`]);
Q(ch, [[7, 3, 100], [4, 5, 99], [10, 4, 98], [3, 6, 93]], (a, d, L) => { const n = Math.floor((L - a) / d) + 1; return [`How many terms of the AP ${a}, ${a + d}, ${a + 2 * d}, … are less than or equal to ${L}?`, n, [n - 1, n + 1, Math.floor(L / d)], `a + (n − 1)d ≤ ${L} ⇒ n − 1 ≤ ${fr(L - a, d)} ⇒ n = <b>${n}</b>.`]; });
mcs(ch, [
  ['If a, b, c are in AP, then', '2b = a + c', 'b² = ac', 'b = a + c', '2b = ac', 'The middle term is the arithmetic mean.'],
  ['If a, b, c are in GP, then', 'b² = ac', '2b = a + c', 'b = ac', 'a² = bc', 'The middle term is the geometric mean.'],
  ['For two positive numbers, the relation between AM (A) and GM (G) is', 'A ≥ G', 'A < G', 'A = G always', 'A ≤ G', 'AM ≥ GM, with equality only when the numbers are equal.'],
  ['The 10th term of the GP 5, 25, 125, … is', '5<sup>10</sup>', '5<sup>9</sup>', '25<sup>10</sup>', '10·5', 'a = 5, r = 5 ⇒ a<sub>10</sub> = 5 · 5⁹ = 5¹⁰.'],
  ['Which of the following is a GP?', '2, 6, 18, 54', '2, 4, 6, 8', '1, 4, 9, 16', '3, 5, 8, 12', 'Constant ratio 3.'],
  ['The sum of the first n odd natural numbers is', 'n²', 'n(n + 1)', 'n(n + 1)/2', '2n', '1 + 3 + … + (2n − 1) = n².'],
  ['If the 3rd and 7th terms of an AP are 12 and 24, the common difference is', '3', '4', '6', '12', '4d = 24 − 12 = 12.', 'medium'],
  ['Inserting 3 arithmetic means between 3 and 19 gives', '7, 11, 15', '6, 11, 16', '5, 10, 15', '7, 12, 17', 'd = (19 − 3)/4 = 4.', 'medium']
]);

/* ---------- 8. Trigonometric Functions ---------- */
ch = 'Trigonometric Functions';
const PI = (deg) => { const g = gcd(deg, 180); const p = deg / g, q = 180 / g; return (p === 1 ? '' : p === -1 ? '−' : M(p)) + 'π' + (q === 1 ? '' : '/' + q); };
Q(ch, [[30], [135], [240], [300], [520], [-45], [210], [150]], d => [`${M(d)}° in radian measure is`, PI(d), [PI(d + 30), PI(d * 2), PI(180 - d === 0 ? 90 : 180 - d), PI(d + 45)], `Radian = degree × π/180 = ${M(d)} × π/180 = <b>${PI(d)}</b>.`, 'easy']);
Q(ch, [[5, 3], [7, 6], [11, 6], [3, 4], [2, 3], [5, 4]], (p, q) => { const d = 180 * p / q; return [`${p}π/${q} radians in degree measure is`, d + '°', [(d + 30) + '°', (d / 2) + '°', (360 - d) + '°', (d + 90) + '°'], `Degree = radian × 180/π = ${p} × 180/${q} = <b>${d}°</b>.`, 'easy']; });
Q(ch, [[21, 60], [14, 90], [35, 72], [21, 120], [14, 135], [42, 30]], (r, deg) => { const l = r * deg / 180 * 22 / 7; return [`The length of the arc of a circle of radius ${r} cm that subtends an angle of ${deg}° at the centre is (use π = 22/7)`, NL.f(l) + ' cm', [NL.f(l * 2) + ' cm', NL.f(l / 2) + ' cm', NL.f(r * deg / 100) + ' cm', NL.f(l + 11) + ' cm'], `l = rθ = ${r} × (${deg}π/180) = <b>${NL.f(l)} cm</b>.`]; });
const TV = { sin: { 0: '0', 30: '1/2', 45: '1/√2', 60: '√3/2', 90: '1' }, cos: { 0: '1', 30: '√3/2', 45: '1/√2', 60: '1/2', 90: '0' }, tan: { 0: '0', 30: '1/√3', 45: '1', 60: '√3' } };
const exact = (fn, d) => {   /* exact value of fn(d°) for multiples of 30° and 45° */
  d = ((d % 360) + 360) % 360; const q = Math.floor(d / 90), r = d % 90;
  let ref = [r, 90 - r, r, 90 - r][q], sgn = fn === 'sin' ? [1, 1, -1, -1][q] : fn === 'cos' ? [1, -1, -1, 1][q] : [1, -1, 1, -1][q];
  if (r === 0) { ref = q % 2 ? 90 : 0; if (fn === 'sin') return ['0', '1', '0', '−1'][q]; if (fn === 'cos') return ['1', '0', '−1', '0'][q]; if (fn === 'tan') return q % 2 ? 'not defined' : '0'; }
  if (fn !== 'tan' ? false : q % 2 === 1) ref = 90 - r;
  let base = fn === 'tan' ? TV.tan[q % 2 ? 90 - r : r] : TV[fn][q % 2 ? (fn === 'sin' ? 90 - r : 90 - r) : r];
  if (q % 2 === 1) base = fn === 'sin' ? TV.sin[90 - r] : fn === 'cos' ? TV.cos[90 - r] : TV.tan[90 - r];
  return (sgn < 0 && base !== '0' ? '−' : '') + base;
};
const POOL = ['1/2', '−1/2', '√3/2', '−√3/2', '1/√2', '−1/√2', '1', '−1', '√3', '−√3', '1/√3', '−1/√3', '0'];
Q(ch, [['sin', 765], ['cos', -1710], ['tan', -585], ['sin', 1020], ['cos', 480], ['tan', 690], ['sin', -1110], ['cos', 405], ['tan', 225], ['sin', 210], ['cos', 315], ['tan', 120]], (fn, d) => {
  const v = exact(fn, d), w = POOL.filter(x => x !== v && x.replace('−', '') !== v.replace('−', ''));
  const neg = v.startsWith('−') ? v.slice(1) : '−' + v;
  return [`The value of ${fn}(${M(d)}°) is`, v, [neg === '−0' ? '1' : neg].concat(w.slice(d % 5, d % 5 + 3), w), `${fn}(${M(d)}°) = ${fn}(${((d % 360) + 360) % 360}°) (period 360°) = <b>${v}</b>.`];
});
Q(ch, [[3, 4], [5, 12], [8, 15], [7, 24], [6, 8], [1, 1]], (a, b) => { const r = Math.hypot(a, b), R = Number.isInteger(r) ? String(r) : '√' + (a * a + b * b); return [`The maximum value of ${a} sin x + ${b} cos x is`, R, [String(a + b), Number.isInteger(r) ? String(r * r) : String(a * a + b * b), String(Math.max(a, b)), String(Math.abs(a - b) || 3)], `a sin x + b cos x has maximum √(a² + b²) = √${a * a + b * b} = <b>${R}</b>.`]; });
mcs(ch, [
  ['The value of sin 75° is', '(√6 + √2)/4', '(√6 − √2)/4', '(√3 + 1)/2', '√3/2', 'sin(45° + 30°) = sin45 cos30 + cos45 sin30.', 'medium'],
  ['The value of cos 75° is', '(√6 − √2)/4', '(√6 + √2)/4', '(√3 − 1)/2', '1/2', 'cos(45° + 30°) = cos45 cos30 − sin45 sin30.', 'medium'],
  ['The value of tan 15° is', '2 − √3', '2 + √3', '√3 − 1', '1/√3', 'tan(45° − 30°) = (1 − 1/√3)/(1 + 1/√3) = 2 − √3.', 'medium'],
  ['cos 2x is NOT equal to', '2 sin² x − 1', 'cos² x − sin² x', '1 − 2 sin² x', '2 cos² x − 1', 'cos 2x = 1 − 2 sin² x, so 2 sin² x − 1 = −cos 2x.'],
  ['sin 3x is equal to', '3 sin x − 4 sin³ x', '4 sin³ x − 3 sin x', '3 cos x − 4 cos³ x', '3 sin x + 4 sin³ x', 'Standard identity.'],
  ['cos 3x is equal to', '4 cos³ x − 3 cos x', '3 cos x − 4 cos³ x', '4 sin³ x − 3 sin x', '3 sin x − 4 sin³ x', 'Standard identity.'],
  ['The period of the function sin x is', '2π', 'π', 'π/2', '4π', 'sin(x + 2π) = sin x.'],
  ['The period of tan x is', 'π', '2π', 'π/2', '4π', 'tan(x + π) = tan x.'],
  ['If sin x = 3/5 and x lies in the second quadrant, then cos x is', '−4/5', '4/5', '−3/4', '3/4', 'cos x = −√(1 − 9/25) = −4/5 in the second quadrant.', 'medium'],
  ['If tan x = −4/3 and x lies in the fourth quadrant, then sin x is', '−4/5', '4/5', '−3/5', '3/5', 'In Q4, sin is negative: sin x = −4/5.', 'medium'],
  ['The value of sin² 30° + cos² 30° is', '1', '1/2', '√3/2', '2', 'sin² θ + cos² θ = 1 for every θ.'],
  ['The range of sin x is', '[−1, 1]', 'R', '[0, 1]', '(−1, 1)', '−1 ≤ sin x ≤ 1.'],
  ['sec x is not defined when x equals', 'π/2', '0', 'π', '2π', 'cos(π/2) = 0.'],
  ['tan(π/4 + x) equals', '(1 + tan x)/(1 − tan x)', '(1 − tan x)/(1 + tan x)', '1 + tan x', 'tan x', 'tan(A + B) with tan(π/4) = 1.'],
  ['The value of 2 sin 15° cos 15° is', '1/2', '√3/2', '1', '1/4', '2 sin A cos A = sin 2A = sin 30°.']
]);

/* ---------- 9. Straight Lines ---------- */
ch = 'Straight Lines';
Q(ch, [[1, 2, 4, 8], [-2, 3, 4, -1], [0, 0, 5, 3], [3, -1, -1, 7], [2, 5, 6, 5], [-3, -4, 1, 4]], (x1, y1, x2, y2) => [`The slope of the line through (${M(x1)}, ${M(y1)}) and (${M(x2)}, ${M(y2)}) is`, fr(y2 - y1, x2 - x1), [fr(x2 - x1, y2 - y1 || 1), fr(y1 - y2 + 1, x2 - x1), fr(-(y2 - y1), x2 - x1), fr(y2 + y1, x2 + x1 || 1)],
  `m = (y₂ − y₁)/(x₂ − x₁) = (${M(y2)} − ${M(y1)})/(${M(x2)} − ${M(x1)}) = <b>${fr(y2 - y1, x2 - x1)}</b>.`, 'easy']);
Q(ch, [[1, 2, 4, 6], [-2, 3, 10, 8], [0, 0, 8, 15], [3, -1, -3, 7], [-1, -2, 23, 5]], (x1, y1, x2, y2) => { const d = Math.hypot(x2 - x1, y2 - y1); return [`The distance between (${M(x1)}, ${M(y1)}) and (${M(x2)}, ${M(y2)}) is`, d, [Math.abs(x2 - x1) + Math.abs(y2 - y1), d * d, d + 1, d - 1], `√((${x2 - x1})² + (${y2 - y1})²) = √${d * d} = <b>${d}</b>.`, 'easy']; });
Q(ch, [[3, 4, -5, 1, 2], [5, 12, 3, -1, 1], [4, -3, 10, 2, 1], [8, 15, -7, 1, 1], [6, 8, 0, 3, 4]], (a, b, c, x, y) => { const r = Math.hypot(a, b), v = Math.abs(a * x + b * y + c); return [`The distance of the point (${M(x)}, ${M(y)}) from the line ${a}x ${b < 0 ? '− ' + -b : '+ ' + b}y${c === 0 ? '' : c < 0 ? ' − ' + -c : ' + ' + c} = 0 is`, fr(v, r), [fr(v, r * r), fr(v + 2 * Math.abs(c), r), String(v), fr(Math.abs(a * x + b * y - c), r)],
  `d = |ax₀ + by₀ + c|/√(a² + b²) = |${a * x} + ${b * y} + ${c}|/${r} = <b>${fr(v, r)}</b>.`]; });
Q(ch, [[3, 4, 5, -10], [5, 12, 1, 14], [8, 15, 3, -14], [6, 8, -2, 18]], (a, b, c1, c2) => { const r = Math.hypot(a, b); return [`The distance between the parallel lines ${a}x + ${b}y ${c1 < 0 ? '− ' + -c1 : '+ ' + c1} = 0 and ${a}x + ${b}y ${c2 < 0 ? '− ' + -c2 : '+ ' + c2} = 0 is`, fr(Math.abs(c1 - c2), r), [fr(Math.abs(c1 + c2), r), fr(Math.abs(c1 - c2), r * r), String(Math.abs(c1 - c2)), fr(Math.abs(c1 - c2) + r, r)],
  `d = |c₁ − c₂|/√(a² + b²) = ${Math.abs(c1 - c2)}/${r} = <b>${fr(Math.abs(c1 - c2), r)}</b>.`]; });
Q(ch, [[2, 3, 1], [-1, 4, 2], [3, -2, -3], [1, 5, -4], [-2, -1, 3]], (m, x1, y1) => { const c = y1 - m * x1, L = (mm, cc) => `y = ${mm === 1 ? '' : mm === -1 ? '−' : M(mm)}x${cc === 0 ? '' : cc > 0 ? ' + ' + cc : ' − ' + -cc}`;
  return [`The equation of the line through (${M(x1)}, ${M(y1)}) with slope ${M(m)} is`, L(m, c), [L(m, y1 + m * x1), L(-m, y1 + m * x1), L(m, x1 - m * y1), L(-m, c)], `y − ${M(y1)} = ${M(m)}(x − ${M(x1)}) ⇒ <b>${L(m, c)}</b>.`]; });
Q(ch, [[2, 3, 12], [3, -4, 24], [5, 2, 10], [4, 6, -12]], (a, b, c) => [`The intercepts made by the line ${a}x ${b < 0 ? '− ' + -b : '+ ' + b}y = ${M(c)} on the x- and y-axes are respectively`, `${fr(c, a)} and ${fr(c, b)}`, [`${fr(c, b)} and ${fr(c, a)}`, `${fr(a, c)} and ${fr(b, c)}`, `${fr(-c, a)} and ${fr(-c, b)}`],
  `Put y = 0: x = ${fr(c, a)}; put x = 0: y = ${fr(c, b)}.`]);
mcs(ch, [
  ['Two non-vertical lines with slopes m₁ and m₂ are perpendicular if', 'm₁m₂ = −1', 'm₁ = m₂', 'm₁ + m₂ = 0', 'm₁m₂ = 1', 'Product of slopes of perpendicular lines is −1.'],
  ['Two lines are parallel if their slopes are', 'equal', 'negative reciprocals', 'zero and infinite', 'of opposite signs', 'Parallel lines have equal inclination.'],
  ['The slope of a line parallel to the x-axis is', '0', 'not defined', '1', '−1', 'Inclination 0°.'],
  ['The slope of the line 3x − 4y + 7 = 0 is', '3/4', '−3/4', '4/3', '−4/3', 'm = −A/B = 3/4.'],
  ['The angle between the lines y = x and y = −x is', '90°', '45°', '0°', '60°', 'm₁m₂ = −1.'],
  ['The points (1, 2), (2, 4) and (3, 6) are', 'collinear', 'vertices of a right triangle', 'vertices of an equilateral triangle', 'concyclic only', 'All lie on y = 2x.'],
  ['The equation of the y-axis is', 'x = 0', 'y = 0', 'x = y', 'x + y = 0', 'Every point on the y-axis has x = 0.'],
  ['The intercept form of a line is', 'x/a + y/b = 1', 'y = mx + c', 'y − y₁ = m(x − x₁)', 'x cos ω + y sin ω = p', 'a and b are the x- and y-intercepts.'],
  ['The inclination of a line with slope √3 is', '60°', '30°', '45°', '120°', 'tan 60° = √3.'],
  ['The angle between two lines with slopes 1/√3 and √3 is', '30°', '60°', '45°', '90°', 'Inclinations 30° and 60°.', 'medium']
]);

/* ---------- 10. Conic Sections ---------- */
ch = 'Conic Sections';
Q(ch, [[2, -3, 4], [-1, 2, 3], [3, 4, 5], [0, -5, 2], [-4, 1, 6]], (h, k, r) => { const D = -2 * h, E = -2 * k, F = h * h + k * k - r * r, t = (v, s) => v === 0 ? '' : (v > 0 ? ' + ' : ' − ') + (Math.abs(v) === 1 ? '' : Math.abs(v)) + s;
  return [`The centre and radius of the circle x² + y²${t(D, 'x')}${t(E, 'y')}${F === 0 ? '' : F > 0 ? ' + ' + F : ' − ' + -F} = 0 are`, `(${M(h)}, ${M(k)}) and ${r}`, [`(${M(-h)}, ${M(-k)}) and ${r}`, `(${M(h)}, ${M(k)}) and ${r * r}`, `(${M(2 * h)}, ${M(2 * k)}) and ${r}`, `(${M(-h)}, ${M(-k)}) and ${r * r}`],
    `Centre (−g, −f) = (${M(h)}, ${M(k)}); r = √(g² + f² − c) = √(${h * h} + ${k * k} − (${M(F)})) = <b>${r}</b>.`]; });
Q(ch, [[12], [8], [20], [6], [16], [10]], c => [`The focus of the parabola y² = ${c}x is`, `(${fr(c, 4)}, 0)`, [`(0, ${fr(c, 4)})`, `(${c}, 0)`, `(${fr(-c, 4)}, 0)`, `(${fr(c, 2)}, 0)`], `y² = 4ax with 4a = ${c} ⇒ a = ${fr(c, 4)}; focus (a, 0) = <b>(${fr(c, 4)}, 0)</b>.`, 'easy']);
Q(ch, [[16], [12], [8], [20]], c => [`The equation of the directrix of the parabola x² = −${c}y is`, `y = ${fr(c, 4)}`, [`y = −${fr(c, 4)}`, `x = ${fr(c, 4)}`, `y = ${c}`, `x = −${fr(c, 4)}`], `x² = −4ay with a = ${fr(c, 4)}; focus (0, −a), directrix <b>y = ${fr(c, 4)}</b>.`]);
Q(ch, [[12], [10], [16], [9]], c => [`The length of the latus rectum of the parabola y² = ${c}x is`, c, [c / 2, c / 4, 2 * c], `Latus rectum = 4a = <b>${c}</b>.`, 'easy']);
const EL = [[5, 4, 3], [13, 12, 5], [10, 8, 6], [25, 24, 7], [5, 3, 4], [17, 15, 8]];
Q(ch, EL.map((x, i) => [i]), i => { const [a, b, c] = EL[i]; return [`The eccentricity of the ellipse x²/${a * a} + y²/${b * b} = 1 is`, fr(c, a), [fr(b, a), fr(a, c), fr(c, b), fr(a, b)], `c = √(a² − b²) = √(${a * a} − ${b * b}) = ${c}; e = c/a = <b>${fr(c, a)}</b>.`]; });
Q(ch, EL.slice(0, 4).map((x, i) => [i]), i => { const [a, b] = EL[i]; return [`The length of the latus rectum of the ellipse x²/${a * a} + y²/${b * b} = 1 is`, fr(2 * b * b, a), [fr(2 * a * a, b), fr(b * b, a), fr(2 * b, a), fr(2 * b * b, a * a)], `Latus rectum = 2b²/a = 2(${b * b})/${a} = <b>${fr(2 * b * b, a)}</b>.`]; });
const HY = [[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [8, 6, 10], [8, 15, 17]];
Q(ch, HY.map((x, i) => [i]), i => { const [a, b, c] = HY[i]; return [`The eccentricity of the hyperbola x²/${a * a} − y²/${b * b} = 1 is`, fr(c, a), [fr(a, c), fr(b, a), fr(c, b), fr(b, c)], `c² = a² + b² = ${c * c} ⇒ c = ${c}; e = c/a = <b>${fr(c, a)}</b>.`]; });
mcs(ch, [
  ['For an ellipse, the eccentricity e satisfies', '0 < e < 1', 'e = 1', 'e > 1', 'e = 0 always', 'e = 0 gives a circle, e = 1 a parabola, e > 1 a hyperbola.'],
  ['The eccentricity of a parabola is', '1', '0', '2', '1/2', 'A parabola is the conic with e = 1.'],
  ['The eccentricity of any hyperbola is', 'greater than 1', 'less than 1', 'equal to 1', 'zero', 'e = c/a with c > a.'],
  ['The equation of a circle with centre (0, 0) and radius r is', 'x² + y² = r²', 'x² − y² = r²', 'x + y = r', 'x² + y² = r', 'Distance of any point from the origin is r.'],
  ['If a plane cuts a double cone parallel to a generator, the section is a', 'parabola', 'circle', 'ellipse', 'hyperbola', 'β = α gives a parabola.'],
  ['The length of the transverse axis of x²/16 − y²/9 = 1 is', '8', '6', '4', '10', '2a = 8.'],
  ['The foci of the ellipse x²/25 + y²/9 = 1 are', '(±4, 0)', '(0, ±4)', '(±5, 0)', '(±3, 0)', 'c = √(25 − 9) = 4, major axis along x.', 'medium'],
  ['The vertices of the hyperbola y²/9 − x²/27 = 1 are', '(0, ±3)', '(±3, 0)', '(0, ±√27)', '(±√27, 0)', 'Transverse axis along y, a = 3.', 'medium']
]);

/* ---------- 11. Introduction to Three Dimensional Geometry ---------- */
ch = 'Introduction to Three Dimensional Geometry';
Q(ch, [[1, 2, 3, 2, 4, 5], [0, 0, 0, 2, 3, 6], [-1, 2, 1, 3, 6, 8], [2, -1, 3, 4, 5, 12], [1, 1, 1, 7, 7, 8], [-2, 0, 3, 4, 6, 10]], (a, b, c, d, e, g) => { const s = Math.hypot(d - a, e - b, g - c); return [`The distance between the points (${M(a)}, ${M(b)}, ${M(c)}) and (${M(d)}, ${M(e)}, ${M(g)}) is`, s, [Math.abs(d - a) + Math.abs(e - b) + Math.abs(g - c), s * s, s + 2, s - 1],
  `√((${d - a})² + (${e - b})² + (${g - c})²) = √${s * s} = <b>${s}</b>.`, 'easy']; });
const OCT = { '+++': 'I', '-++': 'II', '--+': 'III', '+-+': 'IV', '++-': 'V', '-+-': 'VI', '---': 'VII', '+--': 'VIII' };
NL.add(S, ch, [[1, 2, 3], [-4, 2, 5], [-3, -1, 6], [4, -2, 3], [2, 3, -4], [-1, 5, -7], [-2, -3, -5], [3, -6, -2]].map(([x, y, z], i) => {
  const key = [x, y, z].map(v => v > 0 ? '+' : '-').join(''), a = OCT[key], all = Object.values(OCT), w = all.filter(v => v !== a);
  return NL.mc(`The point (${M(x)}, ${M(y)}, ${M(z)}) lies in octant`, a, [w[i % 7], w[(i + 2) % 7], w[(i + 5) % 7]], `Signs of (x, y, z) = (${key.split('').join(', ')}) ⇒ octant <b>${a}</b>.`, 'easy');
}));
Q(ch, [[2, 3, 4], [-1, 5, 12], [7, -6, 8], [4, 8, -15]], (x, y, z) => { const d = Math.hypot(y, z); return [`The distance of the point (${M(x)}, ${M(y)}, ${M(z)}) from the x-axis is`, d, [Math.abs(x), Math.hypot(x, y, z) % 1 === 0 ? Math.hypot(x, y, z) : d + 1, Math.abs(y) + Math.abs(z), d * d], `Distance from the x-axis = √(y² + z²) = √${d * d} = <b>${d}</b>.`, 'medium']; });
mcs(ch, [
  ['The coordinates of any point on the x-axis are of the form', '(x, 0, 0)', '(0, y, 0)', '(0, 0, z)', '(x, y, 0)', 'y = 0 and z = 0 on the x-axis.'],
  ['Any point in the YZ-plane has', 'x-coordinate zero', 'y-coordinate zero', 'z-coordinate zero', 'all coordinates equal', 'The YZ-plane is x = 0.'],
  ['The three coordinate planes divide space into', '8 octants', '4 octants', '6 parts', '2 parts', 'Each plane doubles the number of regions.'],
  ['The perpendicular distance of the point (3, 4, 5) from the XY-plane is', '5', '3', '4', '√50', 'Distance from the XY-plane is |z|.'],
  ['The distance of the point (3, 4, 12) from the origin is', '13', '12', '19', '√41', '√(9 + 16 + 144) = 13.'],
  ['If the distance between (2, −3, a) and (2, −3, 4) is 3, then a can be', '7 or 1', '7 only', '1 only', '3 or 5', '|a − 4| = 3.', 'medium'],
  ['The point (−2, −3, −5) lies in which octant?', 'VII', 'III', 'VI', 'VIII', 'All three coordinates negative.'],
  ['The coordinates of the foot of the perpendicular from (4, −3, 5) on the XY-plane are', '(4, −3, 0)', '(4, 0, 5)', '(0, −3, 5)', '(0, 0, 5)', 'Set z = 0.']
]);

/* ---------- 12. Limits and Derivatives ---------- */
ch = 'Limits and Derivatives';
Q(ch, [[5, 2], [3, 3], [4, 1], [6, 2], [10, 1], [2, 5], [3, -2]], (n, a) => { const v = n * a ** (n - 1); return [`lim<sub>x→${M(a)}</sub> (x<sup>${n}</sup> − ${a < 0 ? '(' + M(a) + ')' : a}<sup>${n}</sup>)/(x − ${a < 0 ? '(' + M(a) + ')' : a}) equals`, v, [a ** n, (n - 1) * a ** (n - 1), n * a ** n, v + n], `lim (xⁿ − aⁿ)/(x − a) = n a<sup>n−1</sup> = ${n}(${M(a)})<sup>${n - 1}</sup> = <b>${M(v)}</b>.`]; });
Q(ch, [[3, 2], [5, 4], [7, 3], [2, 9], [4, 6], [6, 5]], (p, q) => [`lim<sub>x→0</sub> sin ${p}x / ${q}x equals`, fr(p, q), [fr(q, p), '1', '0', fr(p * q, 1)], `sin ${p}x/${q}x = (${p}/${q})·(sin ${p}x/${p}x) → <b>${fr(p, q)}</b>.`]);
Q(ch, [[2, 3], [5, 2], [4, 7]], (p, q) => [`lim<sub>x→0</sub> tan ${p}x / sin ${q}x equals`, fr(p, q), [fr(q, p), '1', '0', fr(p + q, q)], `Both tan ${p}x ≈ ${p}x and sin ${q}x ≈ ${q}x near 0: limit = <b>${fr(p, q)}</b>.`, 'medium']);
Q(ch, [[3, 2, -5, 1, 4, 2], [2, 3, 4, 2, 1, -1], [1, 4, -2, 3, 5, 1], [5, 2, 3, 1, -7, 2]], (a, n, b, m, c, t) => { const v = a * n * t ** (n - 1) + b * m * t ** (m - 1); return [`If f(x) = ${a === 1 ? '' : a}x<sup>${n}</sup> ${b < 0 ? '− ' + -b : '+ ' + b}x${m === 1 ? '' : '<sup>' + m + '</sup>'} ${c < 0 ? '− ' + -c : '+ ' + c}, then f′(${M(t)}) is`, v, [a * t ** n + b * t ** m + c, a * n * t ** n + b * m * t ** m, v + c, a * n + b * m],
  `f′(x) = ${a * n}x<sup>${n - 1}</sup> ${b * m < 0 ? '− ' + -b * m : '+ ' + b * m}${m > 1 ? 'x' + (m - 1 > 1 ? '<sup>' + (m - 1) + '</sup>' : '') : ''}; f′(${M(t)}) = <b>${M(v)}</b>.`]; });
Q(ch, [[1, 2, 3], [2, -1, 5], [3, 4, -2], [-1, 3, 1]], (a, b, t) => { const v = a * t * t + b * t; return [`lim<sub>x→${M(t)}</sub> (${a === 1 ? '' : a === -1 ? '−' : a}x² ${b < 0 ? '− ' + (b === -1 ? '' : -b) : '+ ' + (b === 1 ? '' : b)}x) equals`, v, [v + b, a * t + b, a * t * t - b * t, 2 * a * t + b], `A polynomial's limit is its value: ${M(a)}(${M(t)})² + ${M(b)}(${M(t)}) = <b>${M(v)}</b>.`, 'easy']; });
mcs(ch, [
  ['The derivative of sin x is', 'cos x', '−cos x', 'sin x', '−sin x', 'Standard result.'],
  ['The derivative of cos x is', '−sin x', 'sin x', 'cos x', '−cos x', 'Standard result.'],
  ['The derivative of tan x is', 'sec² x', 'cosec² x', '−sec² x', 'sec x tan x', 'Standard result.'],
  ['The derivative of x sin x is', 'sin x + x cos x', 'x cos x', 'cos x − x sin x', 'sin x − x cos x', 'Product rule.'],
  ['The derivative of 1/x is', '−1/x²', '1/x²', 'ln x', '−1/x', 'x⁻¹ → −x⁻².'],
  ['The derivative of xⁿ is', 'n x<sup>n−1</sup>', 'x<sup>n+1</sup>/(n + 1)', 'n x<sup>n</sup>', 'x<sup>n−1</sup>', 'Power rule.'],
  ['lim<sub>x→0</sub> (1 − cos x)/x² equals', '1/2', '1', '0', '2', '1 − cos x = 2 sin²(x/2).', 'hard'],
  ['lim<sub>x→0</sub> sin x / x equals', '1', '0', 'not defined', '∞', 'Standard limit.'],
  ['The derivative of a constant function is', '0', '1', 'the constant itself', 'not defined', 'A constant does not change.'],
  ['The derivative of (x + 1)/x is', '−1/x²', '1/x²', '1', '1 + 1/x²', '(x + 1)/x = 1 + 1/x.', 'medium'],
  ['lim<sub>x→0</sub> (eˣ − 1)/x is', '1', '0', 'e', 'not defined', 'Standard limit.'],
  ['The derivative of sin x cos x is', 'cos 2x', 'sin 2x', '−cos 2x', 'cos² x', 'sin x cos x = ½ sin 2x.']
]);

/* ---------- 13. Statistics ---------- */
ch = 'Statistics';
const DATA = [[6, 7, 10, 12, 13, 4, 8, 12], [4, 7, 8, 9, 10, 12, 13, 17], [3, 5, 7, 9, 11], [2, 4, 6, 8, 10, 12], [10, 12, 14, 16, 18], [1, 3, 5, 7, 9, 11, 13]];
Q(ch, DATA.map((x, i) => [i]), i => { const d = DATA[i], n = d.length, s = d.reduce((a, b) => a + b, 0), mean = s / n, md = d.reduce((a, b) => a + Math.abs(b - mean), 0);
  return [`The mean deviation about the mean of the data ${d.join(', ')} is`, fr(md, n), [fr(md, n - 1), fr(md * 2, n), fr(md + n, n), fr(s, n)], `Mean = ${fr(s, n)}; Σ|xᵢ − x̄| = ${NL.f(md)}; MD = ${NL.f(md)}/${n} = <b>${fr(md, n)}</b>.`]; });
Q(ch, DATA.map((x, i) => [i]), i => { const d = DATA[i], n = d.length, s = d.reduce((a, b) => a + b, 0), m = s / n, ss = d.reduce((a, b) => a + (b - m) ** 2, 0);
  return [`The variance of the data ${d.join(', ')} is`, fr(ss, n), [fr(ss, n - 1), fr(Math.round(ss * 2), n), fr(ss + n, n), fr(s, n)], `Mean = ${fr(s, n)}; Σ(xᵢ − x̄)² = ${NL.f(ss)}; σ² = <b>${fr(ss, n)}</b>.`]; });
Q(ch, [[5], [7], [10], [11], [9]], n => [`The variance of the first ${n} natural numbers is`, fr(n * n - 1, 12), [fr(n * n + 1, 12), fr(n + 1, 2), fr(n * n - 1, 6), fr((n + 1) * (2 * n + 1), 6)], `σ² = (n² − 1)/12 = (${n * n} − 1)/12 = <b>${fr(n * n - 1, 12)}</b>.`, 'medium']);
Q(ch, [[3, 2], [4, 3], [5, 2], [2, 5], [6, 4]], (sd, k) => [`The standard deviation of a data set is ${sd}. If every observation is multiplied by ${k}, the new variance is`, (k * sd) ** 2, [k * sd, sd * sd, k * sd * sd], `New SD = ${k} × ${sd} = ${k * sd}; variance = <b>${(k * sd) ** 2}</b>.`]);
mcs(ch, [
  ['If a constant is added to every observation, the variance', 'remains unchanged', 'increases by that constant', 'is multiplied by that constant', 'becomes zero', 'Every deviation from the mean stays the same.'],
  ['Standard deviation is the', 'positive square root of the variance', 'square of the variance', 'half of the variance', 'mean of the deviations', 'σ = √(variance).'],
  ['The sum of deviations of observations from their mean is always', '0', '1', 'the mean', 'positive', 'Σ(xᵢ − x̄) = 0.'],
  ['Mean deviation is least when deviations are taken about the', 'median', 'mean', 'mode', 'range', 'The sum of absolute deviations is least about the median.', 'medium'],
  ['The range of the data 8, 3, 15, 22, 6, 11 is', '19', '22', '14', '16', 'Range = maximum − minimum = 22 − 3.'],
  ['The median of 3, 7, 1, 9, 5 is', '5', '7', '3', '25/5', 'In order: 1, 3, 5, 7, 9.'],
  ['If the variance of x₁, x₂, …, xₙ is σ², then the variance of 2x₁ + 3, …, 2xₙ + 3 is', '4σ²', '2σ²', '2σ² + 3', '4σ² + 3', 'Variance is unaffected by adding 3 and scales by 2².', 'medium'],
  ['The mean of the first n natural numbers is', '(n + 1)/2', 'n/2', 'n(n + 1)/2', '(n − 1)/2', 'Sum n(n + 1)/2 divided by n.']
]);

/* ---------- 14. Probability ---------- */
ch = 'Probability';
const dice = s => { let c = 0; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b === s) c++; return c; };
Q(ch, [[7], [8], [5], [10], [12], [4], [9]], s => [`Two fair dice are thrown together. The probability of getting a sum of ${s} is`, fr(dice(s), 36), [fr(dice(s) + 1, 36), fr(dice(s), 12), fr(1, s), fr(dice(s), 6)], `Favourable outcomes = ${dice(s)} out of 36: P = <b>${fr(dice(s), 36)}</b>.`, 'easy']);
Q(ch, [[2], [3], [4], [5]], n => [`A fair coin is tossed ${n} times. The probability of getting at least one head is`, fr(2 ** n - 1, 2 ** n), [fr(1, 2 ** n), fr(1, 2), fr(n, 2 ** n), fr(2 ** n - 2, 2 ** n), fr(2 ** n - 1, 2 ** (n + 1))], `P(no head) = 1/${2 ** n}; P(at least one head) = 1 − 1/${2 ** n} = <b>${fr(2 ** n - 1, 2 ** n)}</b>.`]);
Q(ch, [[5, 3], [4, 6], [6, 4], [3, 7]], (r, b) => [`A bag has ${r} red and ${b} blue balls. Two balls are drawn at random. The probability that both are red is`, fr(C(r, 2), C(r + b, 2)), [fr(r * r, (r + b) ** 2), fr(r, r + b), fr(C(b, 2), C(r + b, 2)), fr(r * b, C(r + b, 2))],
  `P = <sup>${r}</sup>C<sub>2</sub>/<sup>${r + b}</sup>C<sub>2</sub> = ${C(r, 2)}/${C(r + b, 2)} = <b>${fr(C(r, 2), C(r + b, 2))}</b>.`]);
Q(ch, [[0.5, 0.35, 0.25], [0.4, 0.3, 0.2], [0.6, 0.5, 0.3], [0.42, 0.48, 0.16]], (a, b, c) => { const v = +(a + b - c).toFixed(2); return [`If P(A) = ${a}, P(B) = ${b} and P(A ∩ B) = ${c}, then P(A ∪ B) is`, String(v), [String(+(a + b).toFixed(2)), String(+(a + b - 2 * c).toFixed(2)), String(+(1 - v).toFixed(2))], `P(A ∪ B) = ${a} + ${b} − ${c} = <b>${v}</b>.`, 'easy']; });
Q(ch, [[2], [3], [4]], n => [`The number of elements in the sample space when a coin is tossed ${n} times is`, 2 ** n, [2 * n, n * n, 2 ** n - 1], `Each toss has 2 outcomes: 2<sup>${n}</sup> = <b>${2 ** n}</b>.`, 'easy']);
Q(ch, [[1], [2], [3]], n => [`The number of elements in the sample space when a die is rolled ${n === 1 ? 'once' : n + ' times'} is`, 6 ** n, [6 * n, 2 ** n * 3, 6 ** n / 2], `6<sup>${n}</sup> = <b>${6 ** n}</b>.`, 'easy']);
mcs(ch, [
  ['A card is drawn from a well-shuffled pack of 52 cards. The probability that it is a king is', '1/13', '1/52', '4/13', '1/4', '4 kings out of 52.'],
  ['A card is drawn from a pack of 52 cards. The probability that it is a red face card is', '3/26', '3/13', '1/26', '6/13', '6 red face cards out of 52.', 'medium'],
  ['If P(A) = 0.35, then P(not A) is', '0.65', '0.35', '0.7', '1.35', 'P(A′) = 1 − P(A).'],
  ['If A and B are mutually exclusive events, then P(A ∩ B) equals', '0', '1', 'P(A)P(B)', 'P(A) + P(B)', 'They cannot occur together.'],
  ['The probability of an impossible event is', '0', '1', '1/2', 'not defined', 'It has no favourable outcome.'],
  ['The probability of a sure event is', '1', '0', '1/2', 'greater than 1', 'Every outcome is favourable.'],
  ['A die is rolled. The probability of getting a prime number is', '1/2', '1/3', '2/3', '1/6', 'Primes: 2, 3, 5.'],
  ['A letter is chosen at random from the word ASSASSINATION. The probability that it is a vowel is', '6/13', '7/13', '5/13', '4/13', 'Vowels: A, A, I, A, I, O = 6 out of 13.', 'medium'],
  ['If E and F are events with P(E) = 0.6, P(F) = 0.3 and P(E ∩ F) = 0.2, then P(E or F) is', '0.7', '0.9', '0.5', '0.1', '0.6 + 0.3 − 0.2.'],
  ['Which of the following cannot be the probability of an event?', '1.5', '0', '2/3', '0.1', 'Probability lies between 0 and 1.'],
  ['Events A and B are such that P(A) = 1/2, P(B) = 7/12 and P(not A or not B) = 1/4. Then A and B are', 'not mutually exclusive', 'mutually exclusive', 'exhaustive and mutually exclusive', 'impossible', 'P(A ∩ B) = 1 − 1/4 = 3/4 ≠ 0.', 'hard']
]);
})();

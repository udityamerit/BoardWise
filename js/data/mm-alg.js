/* Maths mock papers 2-10: ALGEBRA (Part 1) question templates.
   Every template is  (B, v, pos, m) => question  where B = builder, v = parameter index (varies per paper and slot),
   pos = position of the right option for MCQs, m = marks. Numbers come from tables below and every answer/solution is computed
   from them, so a question and its worked solution can never disagree. All questions are original (not copied from any paper). */
(function () {
const { at, fr, accFr, fx, s, inr, poly, lin, opts, must, int } = window.QB;
const LE = 'Linear Equations in Two Variables', QE = 'Quadratic Equations', AP = 'Arithmetic Progression', FP = 'Financial Planning', PR = 'Probability', ST = 'Statistics';
const A = {};

/* ---------- parameter tables ---------- */
const LEP = [[2,3,1,-1,2,1],[3,2,1,-1,3,-1],[1,1,1,-1,5,2],[2,-1,1,2,3,4],[4,1,2,-3,2,5],[3,4,5,-2,2,3],[5,2,3,-1,1,4],[2,5,3,2,4,-1],[7,-2,3,1,2,4],[1,2,3,-1,3,2]];
const le = v => { const [a1, b1, a2, b2, x, y] = at(LEP, v); const c1 = a1 * x + b1 * y, c2 = a2 * x + b2 * y; const D = a1 * b2 - a2 * b1, Dx = c1 * b2 - c2 * b1, Dy = a1 * c2 - a2 * c1; must(D !== 0 && Dx / D === x && Dy / D === y, 'LE table'); return { a1, b1, a2, b2, c1, c2, x, y, D, Dx, Dy }; };
const leSol = e => `D = (${s(e.a1)})(${s(e.b2)}) − (${s(e.a2)})(${s(e.b1)}) = ${s(e.D)}. Dx = (${s(e.c1)})(${s(e.b2)}) − (${s(e.c2)})(${s(e.b1)}) = ${s(e.Dx)}. Dy = (${s(e.a1)})(${s(e.c2)}) − (${s(e.a2)})(${s(e.c1)}) = ${s(e.Dy)}. x = Dx/D = <b>${s(e.x)}</b>, y = Dy/D = <b>${s(e.y)}</b>.`;
const ROOTS = [[2,3],[-1,5],[3,-4],[4,5],[-2,-3],[6,-1],[2,-7],[5,1],[-3,8],[4,-6]];
const APT = [[5,3,10],[7,4,12],[2,5,9],[3,6,15],[10,-2,8],[4,7,11],[1,9,6],[6,2,20],[12,3,5],[8,5,14]];
const GSTP = [[20000,12,'a smartphone'],[15000,18,'a washing machine'],[8000,5,'a bicycle'],[50000,28,'a motorbike tyre set'],[12000,18,'a microwave oven'],[25000,12,'a sofa set'],[40000,5,'a hand-loom saree lot'],[30000,18,'a laptop'],[6000,12,'a school-bag consignment'],[18000,28,'an air-cooler']];
const SHP = [[10,15,30000,20],[100,125,50000,10],[100,80,40000,12],[10,12,24000,15],[100,200,100000,8],[10,20,40000,25],[100,150,60000,6],[10,25,50000,20],[100,250,100000,5],[10,18,36000,30]];
const PIES = [
  { t: 'favourite sports of students in a school survey', n: ['Cricket','Football','Kabaddi','Hockey'], v: [40, 30, 20, 10] },
  { t: 'means of transport used by 120 students to come to school', n: ['Walk','Bicycle','Bus','Car'], v: [30, 40, 30, 20] },
  { t: 'monthly expenditure of a family', n: ['Food','Rent','Education','Savings'], v: [40, 20, 25, 15] },
  { t: 'favourite subjects of 90 students', n: ['Maths','Science','English','History'], v: [30, 25, 20, 15] },
  { t: 'fruits sold in a shop in a day (72 kg)', n: ['Mango','Banana','Apple','Orange'], v: [24, 18, 18, 12] },
  { t: 'time spent by a student in a day (24 h = 360°)', n: ['Sleep','School','Study','Play'], v: [8, 6, 6, 4] },
  { t: 'crops grown on a 60-hectare farm', n: ['Wheat','Rice','Sugarcane','Pulses'], v: [20, 15, 15, 10] },
  { t: 'students of a class of 40 and their hobbies', n: ['Reading','Drawing','Music','Sports'], v: [10, 10, 5, 15] },
  { t: 'votes of 200 students for a class monitor', n: ['Asha','Ravi','Meena','Sameer'], v: [80, 60, 40, 20] }
];
const GRP = [[0,10,[4,6,10]],[10,10,[3,5,2]],[20,10,[6,9,5]],[0,20,[5,10,5]],[10,5,[8,12,10]],[50,10,[7,8,5]],[100,20,[4,10,6]],[5,5,[6,4,10]],[30,10,[2,7,11]],[0,5,[3,9,8]]];
const GRP5 = [[0,10,[5,8,12,10,5]],[10,10,[3,7,14,9,7]],[20,10,[4,6,15,10,5]],[0,20,[6,9,12,8,5]],[50,10,[2,8,10,12,8]],[0,5,[7,8,10,9,6]],[100,10,[5,10,15,12,8]],[10,5,[4,9,12,10,5]],[40,10,[3,5,9,6,7]],[0,2,[6,8,10,9,7]]];
const BAGS = [[4,5,3],[3,4,5],[5,2,3],[6,4,2],[2,7,3],[5,5,2],[4,3,5],[3,6,3],[7,2,3],[4,6,2]];
const COLS = ['red','blue','green'];
const DICE = [['the sum of the two numbers is 7', (a,b)=>a+b===7],['the sum of the numbers is 9', (a,b)=>a+b===9],['both numbers are equal', (a,b)=>a===b],['the sum is less than 5', (a,b)=>a+b<5],['the product of the numbers is 12', (a,b)=>a*b===12],['the sum is a prime number', (a,b)=>[2,3,5,7,11].includes(a+b)],['the sum is greater than 9', (a,b)=>a+b>9],['the first number is greater than the second', (a,b)=>a>b],['at least one number is 6', (a,b)=>a===6||b===6],['the sum is a multiple of 4', (a,b)=>(a+b)%4===0]];
const diceCount = f => { let c = 0; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (f(a, b)) c++; return c; };

/* ---------- 1-mark MCQ ---------- */
A.nature = (B, v, p) => { const [a, b, c] = at([[1,-8,16],[1,2,5],[2,-5,3],[1,-4,4],[3,2,1],[1,-3,-4],[4,-12,9],[2,1,3],[1,6,5]], v); const D = b * b - 4 * a * c;
  const R = D > 0 ? 'two distinct real roots' : D === 0 ? 'two equal real roots' : 'no real roots'; const o = opts(R, ['two distinct real roots', 'two equal real roots', 'no real roots', 'cannot be determined'], p);
  return B.mcq(1, QE, `The nature of the roots of <b>${poly(a, b, c)}</b> is:`, o.o, o.a, `Δ = b² − 4ac = (${s(b)})² − 4(${a})(${s(c)}) = ${s(D)} ${D > 0 ? '&gt; 0' : D === 0 ? '= 0' : '&lt; 0'} ⇒ ${R}.`); };
A.tnMcq = (B, v, p) => { const [a, d, n] = at(APT, v), t = a + (n - 1) * d; const o = opts(t, [t + d, t - d, t + 2, t - 2, t + 5], p);
  return B.mcq(1, AP, `In an A.P. the first term is ${s(a)} and the common difference is ${s(d)}. Then t<sub>${n}</sub> =`, o.o, o.a, `t<sub>n</sub> = a + (n − 1)d ⇒ t<sub>${n}</sub> = ${s(a)} + ${n - 1} × (${s(d)}) = ${s(t)}.`); };
A.detMcq = (B, v, p) => { const [a, b, c, d] = at([[3,2,1,4],[5,1,2,3],[4,-2,3,1],[6,2,3,5],[2,7,1,3],[8,3,2,1],[-1,4,2,5],[7,2,4,3],[9,5,2,1],[3,5,2,6]], v), D = a * d - b * c;
  const o = opts(D, [a * d + b * c, a * c - b * d, -D, D + 2, D - 3], p);
  return B.mcq(1, LE, `The value of the determinant |${s(a)} ${s(b)}; ${s(c)} ${s(d)}| (rows ${s(a)} ${s(b)} and ${s(c)} ${s(d)}) is:`, o.o.map(s), o.a, `${s(a)} × ${s(d)} − ${s(b)} × ${s(c)} = ${s(a * d)} − (${s(b * c)}) = ${s(D)}.`); };
A.classMark = (B, v, p) => { const [l, u] = at([[20,30],[10,20],[40,60],[15,25],[0,10],[30,50],[25,35],[50,70],[100,120]], v), m = (l + u) / 2;
  const o = opts(m, [l, u, u - l, m + 5, m - 5], p);
  return B.mcq(1, ST, `For the class interval ${l}–${u}, the class mark is:`, o.o, o.a, `Class mark = (lower limit + upper limit)/2 = (${l} + ${u})/2 = ${m}.`); };
A.probMcq = (B, v, p) => { const [w, e, f, n] = at([['a die is thrown','an even number',3,6],['a die is thrown','a number greater than 4',2,6],['a die is thrown','a prime number',3,6],['a card is drawn from a pack of 52 cards','a king',4,52],['a card is drawn from a pack of 52 cards','a red card',26,52],['two coins are tossed together','two heads',1,4],['a die is thrown','a multiple of 3',2,6],['two coins are tossed together','at least one head',3,4],['a card is drawn from a pack of 52 cards','a face card',12,52],['a die is thrown','a number less than 3',2,6]], v);
  const o = opts(fr(f, n), [fr(n - f, n), fr(1, n), fr(f, n + f), fr(f + 1, n), fr(1, 2), fr(f, n - 1)], p);
  return B.mcq(1, PR, `When ${w}, the probability of getting ${e} is:`, o.o, o.a, `n(S) = ${n}, favourable outcomes = ${f} ⇒ P = ${f}/${n} = ${fr(f, n)}.`); };
A.gstMcq = (B, v, p) => { const g = at([18, 12, 28, 6, 24, 10, 16, 14, 20], v); const o = opts(g / 2, [g, g * 2, g / 2 + 1, g / 2 - 1, g + 2], p);
  return B.mcq(1, FP, `The rate of GST on an article is ${g}%. The rate of CGST is:`, o.o.map(x => x + '%'), o.a, `GST = CGST + SGST and CGST = SGST ⇒ CGST = ${g}/2 = ${g / 2}%.`); };
A.spaceMcq = (B, v, p) => { const [w, n] = at([['two coins are tossed',4],['three coins are tossed',8],['a coin and a die are thrown together',12],['two dice are thrown',36],['four coins are tossed',16],['a die is thrown',6],['a coin is tossed three times',8],['a coin is tossed and a die is thrown',12],['two dice are thrown together',36]], v);
  const o = opts(n, [n + 2, n * 2, n / 2, n + 4, n - 1, n * 3], p);
  return B.mcq(1, PR, `The number of outcomes in the sample space when ${w} is:`, o.o, o.a, `Multiply the number of outcomes of each trial: n(S) = ${n}.`); };
A.mvMcq = (B, v, p) => { const [fv, mv] = at([[100,120],[10,8],[100,100],[10,15],[100,95],[50,75],[10,10],[100,130],[25,20],[10,14]], v);
  const R = mv > fv ? 'at a premium' : mv < fv ? 'at a discount' : 'at par'; const o = opts(R, ['at a premium', 'at a discount', 'at par', 'cannot be decided'], p);
  return B.mcq(1, FP, `A share has face value ₹ ${fv} and market value ₹ ${mv}. The share is:`, o.o, o.a, `Market value ${mv > fv ? '&gt;' : mv < fv ? '&lt;' : '='} face value ⇒ the share is ${R}.`); };

/* ---------- 1-mark one-line answers ---------- */
A.dieNum = (B, v) => { const [e, f] = at([['a prime number',3],['an even number',3],['a number greater than 4',2],['an odd number',3],['a multiple of 3',2],['a composite number',2],['a perfect square',2],['a number less than 3',2],['a number divisible by 5',1],['a number greater than 2',4]], v);
  return B.num(1, PR, `A die is thrown once. Find the probability of getting ${e}. (fraction)`, accFr(f, 6), `Favourable outcomes = ${f}, n(S) = 6 ⇒ P = ${f}/6 = ${fr(f, 6)}.`); };
A.cardNum = (B, v, p, m = 1) => { const [e, f] = at([['a king',4],['a red card',26],['a face card',12],['a black queen',2],['a spade',13],['an ace',4],['the king of hearts',1],['a card with number 7',4],['a diamond',13],['a black card',26]], v);
  return B.num(m, PR, `One card is drawn at random from a well-shuffled pack of 52 cards. Find the probability that it is ${e}. (fraction)`, accFr(f, 52), `n(S) = 52, favourable = ${f} ⇒ P = ${f}/52 = ${fr(f, 52)}.`); };
A.dNum = (B, v) => { const [a, d] = at(APT, v + 3); const t = [0, 1, 2, 3].map(i => s(a + i * d)).join(', ');
  return B.num(1, AP, `Find the common difference of the A.P. ${t}, …`, [String(d)], `d = t₂ − t₁ = ${s(a + d)} − (${s(a)}) = ${s(d)}.`); };
A.t1Num = (B, v) => { const [p, q] = at([[3,-4],[5,2],[2,7],[4,-1],[6,3],[7,-5],[1,8],[9,-2],[2,-6],[8,1]], v), t = p + q;
  return B.num(1, AP, `Find the first term of the sequence whose general term is t<sub>n</sub> = ${p}n ${q < 0 ? '−' : '+'} ${Math.abs(q)}.`, [String(t)], `t₁ = ${p}(1) ${q < 0 ? '−' : '+'} ${Math.abs(q)} = ${s(t)}.`); };
A.gstAmt = (B, v) => { const [val, r] = at(GSTP, v), g = val * r / 100;
  return B.num(1, FP, `The taxable value of an article is ₹ ${inr(val)} and the GST rate is ${r}%. Find the total GST (in ₹).`, [String(g)], `GST = ${r}% of ${inr(val)} = ${inr(g)}.`); };
A.nShares = (B, v) => { const [fv, mv, I] = at(SHP, v), n = int(I / mv, 'shares');
  return B.num(1, FP, `The market value of a share is ₹ ${mv}. How many shares can be bought for ₹ ${inr(I)}?`, [String(n)], `Number of shares = ${inr(I)} ÷ ${mv} = ${inr(n)}.`); };
A.leX = (B, v) => { const [sm, df] = at([[10,4],[12,2],[20,6],[16,8],[14,2],[30,10],[18,4],[24,6],[22,8],[26,4]], v), x = (sm + df) / 2;
  return B.num(1, LE, `If x + y = ${sm} and x − y = ${df}, find x.`, [String(x)], `Add the equations: 2x = ${sm + df} ⇒ x = ${x}.`); };
A.discNum = (B, v, p, m = 1) => { const [a, b, c] = at([[2,-3,5],[1,-6,4],[3,5,-2],[2,7,3],[4,-4,1],[5,3,2],[1,1,-12],[3,-2,-1],[6,-5,1],[2,9,-5]], v), D = b * b - 4 * a * c;
  return B.num(m, QE, `Find the discriminant of ${poly(a, b, c)}.`, [String(D)], `Δ = b² − 4ac = (${s(b)})² − 4(${a})(${s(c)}) = ${s(D)}.`); };
A.cwNum = (B, v) => { const [l, u] = at([[20,30],[10,25],[40,60],[0,5],[100,150],[5,15],[30,50],[25,40],[60,100],[0,20]], v);
  return B.num(1, ST, `Find the class width (class size) of the class interval ${l}–${u}.`, [String(u - l)], `Class width = upper limit − lower limit = ${u} − ${l} = ${u - l}.`); };
A.sumN = (B, v) => { const n = at([10, 20, 15, 25, 12, 30, 18, 40, 50, 16], v), t = n * (n + 1) / 2;
  return B.num(1, AP, `Find the sum of the first ${n} natural numbers.`, [String(t)], `S<sub>n</sub> = n(n + 1)/2 = ${n} × ${n + 1} / 2 = ${t}.`); };

/* ---------- 2-mark ---------- */
A.leSolve = (B, v, p, m) => { const e = le(v);
  return B.self(m, LE, `Solve the simultaneous equations using Cramer's rule: <b>${lin(e.a1, e.b1, e.c1)}</b> and <b>${lin(e.a2, e.b2, e.c2)}</b>.`, leSol(e)); };
A.leDet = (B, v, p, m) => { const e = le(v);
  return B.self(m, LE, `For the equations ${lin(e.a1, e.b1, e.c1)} and ${lin(e.a2, e.b2, e.c2)}, find the values of D, D<sub>x</sub> and D<sub>y</sub>.`, `D = ${s(e.D)}, Dx = ${s(e.Dx)}, Dy = ${s(e.Dy)}. (D = a₁b₂ − a₂b₁; Dx = c₁b₂ − c₂b₁; Dy = a₁c₂ − a₂c₁)`); };
A.leXY = (B, v) => { const e = le(v);
  return B.num(2, LE, `Solve ${lin(e.a1, e.b1, e.c1)} and ${lin(e.a2, e.b2, e.c2)} and find the value of x + y.`, [String(e.x + e.y)], leSol(e) + ` ⇒ x + y = <b>${s(e.x + e.y)}</b>.`); };
A.qeForm = (B, v, p, m) => { const [r1, r2] = at(ROOTS, v), S = r1 + r2, P = r1 * r2;
  return B.self(m, QE, `Form a quadratic equation whose roots are ${s(r1)} and ${s(r2)}.`, `Sum of roots = ${s(S)}, product = ${s(P)}. Equation: x² − (sum)x + product = 0 ⇒ <b>${poly(1, -S, P)}</b>.`); };
A.qeFactor = (B, v, p, m) => { const [r1, r2] = at(ROOTS, v + 4), S = r1 + r2, P = r1 * r2;
  return B.self(m, QE, `Solve by factorisation: <b>${poly(1, -S, P)}</b>`, `(x ${r1 < 0 ? '+' : '−'} ${Math.abs(r1)})(x ${r2 < 0 ? '+' : '−'} ${Math.abs(r2)}) = 0 ⇒ <b>x = ${s(r1)} or x = ${s(r2)}</b>.`); };
A.qeDisc = (B, v, p, m) => A.discNum(B, v + 3, p, m);
A.shares = (B, v, p, m) => { const [fv, mv, I, r] = at(SHP, v), n = int(I / mv, 'n'), dv = n * fv * r / 100;
  return B.self(m, FP, `Face value of a share is ₹ ${fv}, market value ₹ ${mv} and it pays a dividend of ${r}% on face value. A person invests ₹ ${inr(I)}. Find (i) the number of shares bought, (ii) the annual dividend.`, `(i) n = ${inr(I)} ÷ ${mv} = <b>${inr(n)}</b>. (ii) Dividend per share = ${r}% of ${fv} = ₹ ${fx(fv * r / 100)}; total = ${inr(n)} × ${fx(fv * r / 100)} = <b>₹ ${inr(dv)}</b>.`); };
A.nTerms = (B, v) => { const [a, d, L] = at([[3,4,59],[5,5,100],[2,3,50],[7,6,79],[4,3,100],[10,5,150],[1,2,41],[6,4,70],[9,3,60],[12,8,100]], v), n = int((L - a) / d + 1, 'n');
  return B.num(2, AP, `How many terms are there in the A.P. ${a}, ${a + d}, ${a + 2 * d}, …, ${L}?`, [String(n)], `t<sub>n</sub> = a + (n − 1)d ⇒ ${L} = ${a} + (n − 1) × ${d} ⇒ n − 1 = ${(L - a) / d} ⇒ n = ${n}.`); };
A.tnNum = (B, v) => { const [a, d, n] = at(APT, v + 5), t = a + (n - 1) * d, sq = [0, 1, 2].map(i => s(a + i * d)).join(', ');
  return B.num(2, AP, `Find the ${n}<sup>th</sup> term of the A.P. ${sq}, …`, [String(t)], `a = ${s(a)}, d = ${s(d)}. t<sub>${n}</sub> = a + (n − 1)d = ${s(a)} + ${n - 1}(${s(d)}) = ${s(t)}.`); };
A.snNum = (B, v) => { const [a, d, n] = at([[2,3,20],[5,4,15],[10,-2,8],[3,5,18],[7,2,25],[1,6,10],[4,3,30],[8,4,16],[20,-3,14],[6,5,22]], v), S = n * (2 * a + (n - 1) * d) / 2;
  return B.num(2, AP, `Find the sum of the first ${n} terms of the A.P. whose first term is ${s(a)} and common difference is ${s(d)}.`, [String(S)], `S<sub>n</sub> = n/2 [2a + (n − 1)d] = ${n}/2 [${2 * a} + ${n - 1}(${s(d)})] = ${n / 2} × ${s(2 * a + (n - 1) * d)} = ${s(S)}.`); };
A.probSpace = (B, v, p, m) => { const [w, sp, e, f, n] = at([['two coins are tossed together','S = {HH, HT, TH, TT}','at least one tail',3,4],['two coins are tossed together','S = {HH, HT, TH, TT}','exactly one head',2,4],['three coins are tossed together','S = {HHH, HHT, HTH, THH, HTT, THT, TTH, TTT}','exactly two heads',3,8],['three coins are tossed together','S = {HHH, HHT, HTH, THH, HTT, THT, TTH, TTT}','at least two heads',4,8],['three coins are tossed together','S = {HHH, HHT, HTH, THH, HTT, THT, TTH, TTT}','all three faces alike',2,8],['two coins are tossed together','S = {HH, HT, TH, TT}','no head',1,4]], v);
  return B.self(m, PR, `${w[0].toUpperCase() + w.slice(1)}. Write the sample space and find the probability of getting ${e}.`, `${sp}, n(S) = ${n}. Favourable outcomes for "${e}" = ${f}. P = ${f}/${n} = <b>${fr(f, n)}</b>.`); };
A.classMarks = (B, v, p, m) => { const [st, w] = at([[0,10],[10,10],[20,5],[15,5],[40,20],[100,50],[5,5],[30,10],[0,20],[50,25]], v), c = [0, 1, 2].map(i => [st + i * w, st + (i + 1) * w]);
  return B.self(m, ST, `Write the class marks of the classes ${c.map(x => x[0] + '–' + x[1]).join(', ')} and the class width.`, `Class mark = (lower + upper)/2: ${c.map(x => `(${x[0]} + ${x[1]})/2 = ${(x[0] + x[1]) / 2}`).join('; ')}. Class width = ${w}.`); };
A.cardProb = (B, v, p, m) => A.cardNum(B, v + 2, p, m);
A.bagProb = (B, v) => { const [r, b, g] = at(BAGS, v), c = [r, b, g], i = v % 3, tot = r + b + g;
  return B.num(2, PR, `A bag contains ${r} red, ${b} blue and ${g} green balls. One ball is drawn at random. Find the probability that it is ${COLS[i]}. (fraction)`, accFr(c[i], tot), `n(S) = ${r} + ${b} + ${g} = ${tot}. P(${COLS[i]}) = ${c[i]}/${tot} = ${fr(c[i], tot)}.`); };
A.gst2 = (B, v, p, m) => { const [val, r, it] = at(GSTP, v + 4), g = val * r / 100;
  return B.self(m, FP, `The taxable value of ${it} is ₹ ${inr(val)} and the rate of GST is ${r}%. Find the CGST and SGST.`, `GST = ${r}% of ${inr(val)} = ₹ ${inr(g)}. CGST = SGST = ${inr(g)}/2 = <b>₹ ${inr(g / 2)} each</b>.`); };
A.brokerage = (B, v, p, m) => { const [V, r] = at([[5000,1],[8000,0.5],[10000,1],[20000,0.5],[15000,2],[25000,0.4],[12000,0.5],[40000,0.25],[6000,2],[30000,1]], v), br = V * r / 100;
  return B.self(m, FP, `Shares of total market value ₹ ${inr(V)} are sold through a broker who charges brokerage of ${r}%. Find the brokerage and the net amount received.`, `Brokerage = ${r}% of ${inr(V)} = <b>₹ ${fx(br)}</b>. Amount received = ${inr(V)} − ${fx(br)} = <b>₹ ${fx(V - br)}</b>.`); };
A.pieAngle = (B, v) => { const [T, n] = at([[200,50],[120,30],[60,10],[90,15],[72,18],[40,5],[50,10],[180,45],[240,20],[360,95]], v), a = int(360 * n / T, 'angle'), who = at(['cricket','football','tennis','swimming','badminton'], v);
  return B.num(2, ST, `In a survey of ${T} students, ${n} named ${who} as their favourite game. Find the central angle of the corresponding sector of a pie diagram (degrees).`, [String(a)], `Central angle = (${n}/${T}) × 360° = ${a}°.`); };

/* ---------- 3-mark and 4-mark ---------- */
const SUMM = [[4,100],[5,100],[6,100],[7,100],[3,100],[8,100],[9,100],[10,100],[11,100],[12,100]];
A.sumMult = (B, v, p, m) => { const [k, N] = at(SUMM, v), n = Math.floor(N / k), l = k * n, S = n * (k + l) / 2;
  return B.num(m, AP, `Find the sum of all natural numbers from 1 to ${N} that are divisible by ${k}.`, [String(S)], `The numbers are ${k}, ${2 * k}, …, ${l}: an A.P. with a = ${k}, d = ${k}, last term ${l}. n = ${l}/${k} = ${n}. S = n/2 (a + l) = ${n}/2 × (${k} + ${l}) = <b>${S}</b>.`); };
A.dice = (B, v, p, m) => { const E = [0, 1, 2].map(i => at(DICE, v + i)), c = E.map(e => diceCount(e[1]));
  return B.self(m, PR, `Two dice are thrown simultaneously. Find the probability that (i) ${E[0][0]}, (ii) ${E[1][0]}, (iii) ${E[2][0]}.`, `n(S) = 36. (i) ${c[0]}/36 = <b>${fr(c[0], 36)}</b>. (ii) ${c[1]}/36 = <b>${fr(c[1], 36)}</b>. (iii) ${c[2]}/36 = <b>${fr(c[2], 36)}</b>. ${m === 4 ? '(sample space 1 + 1 mark each answer)' : '(1 mark each)'}`); };
A.diceOne = (B, v) => { const e = at(DICE, v + 1), c = diceCount(e[1]);
  return B.num(3, PR, `Two dice are thrown together. Find the probability that ${e[0]}. (fraction)`, accFr(c, 36), `Out of 36 equally likely outcomes, ${c} are favourable ⇒ P = ${c}/36 = ${fr(c, 36)}.`); };
A.meanGrp = (B, v, p, m) => { const [st, w, f] = at(GRP, v), x = f.map((_, i) => st + w * i + w / 2), fxv = f.map((q, i) => q * x[i]), sf = f.reduce((a, b) => a + b, 0), sfx = fxv.reduce((a, b) => a + b, 0), mean = sfx / sf;
  const cls = f.map((_, i) => `${st + w * i}–${st + w * (i + 1)}`);
  return B.numt(m, ST, `Find the mean of the following frequency distribution. Classes: ${cls.join(', ')}; frequencies: ${f.join(', ')}. (give 2 decimal places if needed)`, [fx(mean)], `Class marks x: ${x.join(', ')}. f·x: ${fxv.join(', ')}. Σf = ${sf}, Σfx = ${sfx}. Mean = Σfx/Σf = ${sfx}/${sf} = <b>${fx(mean)}</b>.`, 0.01); };
A.meanGrp5 = (B, v, p, m) => { const [st, w, f] = at(GRP5, v), x = f.map((_, i) => st + w * i + w / 2), fxv = f.map((q, i) => q * x[i]), sf = f.reduce((a, b) => a + b, 0), sfx = fxv.reduce((a, b) => a + b, 0), mean = sfx / sf;
  const cls = f.map((_, i) => `${st + w * i}–${st + w * (i + 1)}`);
  return B.numt(m, ST, `Calculate the mean of this distribution (class: frequency) — ${cls.map((c, i) => c + ': ' + f[i]).join(', ')}. (give 2 decimal places if needed)`, [fx(mean)], `Class marks: ${x.join(', ')}. f·x: ${fxv.join(', ')}. Σf = ${sf}, Σfx = ${sfx}. Mean = ${sfx}/${sf} = <b>${fx(mean)}</b>. (table 2 + working 1 + answer 1)`, 0.01); };
A.pie = (B, v, p, m) => { const P = at(PIES, v), tot = P.v.reduce((a, b) => a + b, 0), ang = P.v.map(x => int(360 * x / tot, 'pie'));
  return B.self(m, ST, `The following data show the ${P.t}: ${P.n.map((n, i) => n + ' ' + P.v[i]).join(', ')}. Find the central angle of each sector for drawing a pie diagram.`, `Total = ${tot}. Angle = (value/total) × 360°: ${P.n.map((n, i) => `${n}: ${P.v[i]}/${tot} × 360 = <b>${ang[i]}°</b>`).join('; ')}. Check: ${ang.join(' + ')} = 360°.`); };
A.gst3 = (B, v, p, m) => { const [val, r, it] = at(GSTP, v), g = val * r / 100;
  return B.self(m, FP, `A dealer sells ${it} of taxable value ₹ ${inr(val)} at ${r}% GST. Find the CGST, the SGST and the invoice value.`, `GST = ${r}% of ${inr(val)} = ₹ ${inr(g)} ⇒ CGST = SGST = <b>₹ ${inr(g / 2)}</b> each. Invoice value = ${inr(val)} + ${inr(g)} = <b>₹ ${inr(val + g)}</b>.`); };
A.qeFormula = (B, v, p, m) => { const [a, mm, n] = at([[2,3,1],[3,4,1],[2,5,3],[4,3,2],[3,5,2],[2,7,2],[5,3,1],[6,5,1],[3,7,2],[4,5,1]], v), b = -(a * n + mm), c = mm * n, D = b * b - 4 * a * c, q = Math.round(Math.sqrt(D)); must(q * q === D, 'qe disc');
  const r1 = fr(-b + q, 2 * a), r2 = fr(-b - q, 2 * a);
  return B.self(m, QE, `Solve using the quadratic formula: <b>${poly(a, b, c)}</b>`, `a = ${a}, b = ${s(b)}, c = ${c}. Δ = b² − 4ac = ${s(b * b)} − ${4 * a * c} = ${D}, √Δ = ${q}. x = (−b ± √Δ)/2a = (${-b} ± ${q})/${2 * a} ⇒ <b>x = ${r1} or x = ${r2}</b>.`); };
A.qeConsec = (B, v, p, m) => { const n = at([4,5,6,7,8,9,10,11,12,13], v), S = n * n + (n + 1) * (n + 1), h = (S - 1) / 2;
  return B.self(m, QE, `The sum of the squares of two consecutive natural numbers is ${S}. Find the numbers.`, `Let the numbers be x and x + 1: x² + (x + 1)² = ${S} ⇒ 2x² + 2x − ${S - 1} = 0 ⇒ x² + x − ${h} = 0 ⇒ (x + ${n + 1})(x − ${n}) = 0 ⇒ x = ${n} (x = −${n + 1} rejected as it is not natural). The numbers are <b>${n} and ${n + 1}</b>.`); };
A.qeNumbers = (B, v, p, m) => { const [x, d] = at([[21,3],[12,5],[8,4],[9,6],[15,2],[10,3],[7,5],[18,4],[11,2],[20,5]], v), P = x * (x + d), r = 2 * x + d;
  return B.self(m, QE, `The difference of two natural numbers is ${d} and their product is ${P}. Find the numbers.`, `Let the numbers be x and x + ${d}: x(x + ${d}) = ${P} ⇒ x² + ${d}x − ${P} = 0. Δ = ${d * d} + ${4 * P} = ${r * r}, √Δ = ${r}. x = (−${d} ± ${r})/2 = ${x} (or −${x + d}, rejected). The numbers are <b>${x} and ${x + d}</b>.`); };
A.qeRect = (B, v, p, m) => { const [x, d] = at([[5,3],[6,2],[9,3],[12,4],[7,2],[8,6],[10,5],[4,6],[15,5],[13,2]], v), A_ = x * (x + d), r = 2 * x + d;
  return B.self(m, QE, `The length of a rectangular field is ${d} m more than its breadth and its area is ${A_} m². Find its length and breadth.`, `Let breadth = x m, length = (x + ${d}) m. x(x + ${d}) = ${A_} ⇒ x² + ${d}x − ${A_} = 0. Δ = ${d * d} + ${4 * A_} = ${r * r} ⇒ x = (−${d} ± ${r})/2 = ${x} (negative value rejected). Breadth = <b>${x} m</b>, length = <b>${x + d} m</b>.`); };
A.apSave = (B, v, p, m) => { const [a, d, n] = at([[10,5,20],[20,10,15],[50,5,12],[100,20,10],[5,3,30],[15,5,18],[25,5,24],[40,10,14],[12,4,25],[30,6,16]], v), S = n * (2 * a + (n - 1) * d) / 2;
  return B.num(m, AP, `A person saves ₹ ${a} on the first day and increases the saving by ₹ ${d} every day. How much (in ₹) will he have saved in ${n} days?`, [String(S)], `a = ${a}, d = ${d}, n = ${n}. S<sub>n</sub> = n/2 [2a + (n − 1)d] = ${n}/2 [${2 * a} + ${(n - 1) * d}] = ${n / 2} × ${2 * a + (n - 1) * d} = <b>₹ ${inr(S)}</b>.`); };
A.apTpTq = (B, v, p, m) => { const [a, d, pp, qq] = at([[3,4,5,9],[2,3,4,10],[5,2,6,12],[10,5,3,8],[7,6,2,7],[4,5,5,11],[1,4,3,9],[6,3,7,13],[8,2,4,9],[12,7,3,5]], v), tp = a + (pp - 1) * d, tq = a + (qq - 1) * d;
  return B.self(m, AP, `In an A.P. t<sub>${pp}</sub> = ${tp} and t<sub>${qq}</sub> = ${tq}. Find the first term, the common difference and t<sub>${qq + 2}</sub>.`, `a + ${pp - 1}d = ${tp} … (i); a + ${qq - 1}d = ${tq} … (ii). (ii) − (i): ${qq - pp}d = ${tq - tp} ⇒ <b>d = ${d}</b>. From (i): a = ${tp} − ${pp - 1}×${d} = <b>${a}</b>. t<sub>${qq + 2}</sub> = ${a} + ${qq + 1}×${d} = <b>${a + (qq + 1) * d}</b>.`); };
A.leCramer = (B, v, p, m) => { const e = le(v + 2);
  return B.self(m, LE, `Solve by Cramer's rule: <b>${lin(e.a1, e.b1, e.c1)}</b>, <b>${lin(e.a2, e.b2, e.c2)}</b>.`, leSol(e) + ' (D, Dx, Dy: 3 marks; x and y: 1 mark)'); };
const pl = (w, n) => n === 1 ? w : w.replace(/(x|ch)$/, '$1e') + 's';
A.lePrices = (B, v, p, m) => { const [pr, qr, n1, m1, n2, m2] = at([[15,8,2,3,4,1],[20,6,3,2,1,5],[10,4,4,3,2,5],[25,10,2,4,3,2],[18,7,3,2,2,5],[30,12,1,3,4,2],[8,5,5,3,2,6],[40,15,2,2,3,4],[12,9,4,1,2,3],[22,6,2,5,5,2]], v);
  const T1 = n1 * pr + m1 * qr, T2 = n2 * pr + m2 * qr, D = n1 * m2 - n2 * m1, Dx = T1 * m2 - T2 * m1, Dy = n1 * T2 - n2 * T1; must(Dx / D === pr && Dy / D === qr, 'prices');
  const [I1, I2] = at([['notebook','pen'],['ruler','pencil'],['file','marker'],['book','geometry box'],['slate','chalk box']], v);
  return B.self(m, LE, `${n1} ${pl(I1, n1)} and ${m1} ${pl(I2, m1)} cost ₹ ${T1}, while ${n2} ${pl(I1, n2)} and ${m2} ${pl(I2, m2)} cost ₹ ${T2}. Find the price of one ${I1} and of one ${I2}.`, `Let price of a ${I1} = ₹ x and of a ${I2} = ₹ y. ${n1}x + ${m1}y = ${T1}; ${n2}x + ${m2}y = ${T2}. D = ${n1 * m2} − ${n2 * m1} = ${D}; Dx = ${T1 * m2} − ${T2 * m1} = ${Dx}; Dy = ${n1 * T2} − ${n2 * T1} = ${Dy}. x = <b>₹ ${pr}</b>, y = <b>₹ ${qr}</b>.`); };
A.leBoat = (B, v, p, m) => { const [u, w, t1, t2] = at([[10,2,3,4],[12,3,2,3],[9,3,4,2],[15,5,2,3],[11,1,3,4],[14,4,2,5],[7,2,5,3],[13,3,2,4],[16,4,3,2],[9,1,5,2]], v), d1 = (u + w) * t1, d2 = (u - w) * t2;
  return B.self(m, LE, `A boat goes ${d1} km downstream in ${t1} hours and ${d2} km upstream in ${t2} hours. Find the speed of the boat in still water and the speed of the stream.`, `Let boat speed = x km/h, stream = y km/h. Downstream: x + y = ${d1}/${t1} = ${u + w}. Upstream: x − y = ${d2}/${t2} = ${u - w}. Adding: 2x = ${2 * u} ⇒ <b>x = ${u} km/h</b>; then y = ${u + w} − ${u} = <b>${w} km/h</b>.`); };
A.bag3 = (B, v, p, m) => { const [r, b, g] = at(BAGS, v + 3), tot = r + b + g;
  return B.self(m, PR, `A bag contains ${r} red, ${b} blue and ${g} green balls. One ball is drawn at random. Find the probability that it is (i) red, (ii) not blue, (iii) red or green.`, `n(S) = ${tot}. (i) P(red) = ${r}/${tot} = <b>${fr(r, tot)}</b>. (ii) P(not blue) = ${r + g}/${tot} = <b>${fr(r + g, tot)}</b>. (iii) red or green = ${r + g} balls ⇒ <b>${fr(r + g, tot)}</b>. (1 mark each)`); };
A.sharesFull = (B, v, p, m) => { const [fv, mv, I, r] = at(SHP, v + 2), n = int(I / mv, 'n'), dv = n * fv * r / 100;
  return B.self(m, FP, `A person invests ₹ ${inr(I)} in shares of face value ₹ ${fv} bought at market value ₹ ${mv}; the company pays ${r}% dividend. Find (i) the number of shares, (ii) the total annual dividend, (iii) the rate of return on the investment (correct to 2 decimals).`, `(i) n = ${inr(I)}/${mv} = <b>${inr(n)}</b>. (ii) Dividend per share = ${r}% of ${fv} = ₹ ${fx(fv * r / 100)} ⇒ total = <b>₹ ${inr(dv)}</b>. (iii) Rate of return = (dividend / investment) × 100 = (${inr(dv)}/${inr(I)}) × 100 = <b>${fx(dv / I * 100)}%</b>.`); };
A.snWord = (B, v, p, m) => { const [a, d, n] = at([[100,10,12],[50,25,10],[200,15,15],[20,4,25],[500,50,8],[60,10,20],[150,10,14],[80,5,30],[300,20,9],[35,5,16]], v), S = n * (2 * a + (n - 1) * d) / 2;
  return B.num(m, AP, `A recurring plan collects ₹ ${a} in the first month and ₹ ${d} more each month than the previous month. Find the total collected in ${n} months (₹).`, [String(S)], `a = ${a}, d = ${d}, n = ${n}. S<sub>n</sub> = n/2 [2a + (n − 1)d] = ${n}/2 [${2 * a} + ${(n - 1) * d}] = ${n / 2} × ${2 * a + (n - 1) * d} = <b>₹ ${inr(S)}</b>.`); };

window.MM_ALG = {
  q1a: [A.nature, A.tnMcq, A.detMcq, A.classMark, A.probMcq, A.gstMcq, A.spaceMcq, A.mvMcq],
  q1b: [A.dieNum, A.cardNum, A.dNum, A.t1Num, A.gstAmt, A.nShares, A.leX, A.discNum, A.cwNum, A.sumN],
  q2a: [A.leSolve, A.qeForm, A.shares, A.nTerms, A.probSpace, A.classMarks, A.leDet, A.qeFactor],
  q2b: [A.tnNum, A.snNum, A.qeDisc, A.cardProb, A.bagProb, A.gst2, A.brokerage, A.pieAngle, A.leXY, A.nTerms, A.qeFactor, A.classMarks, A.probSpace],
  q3a: [A.sumMult, A.diceOne, A.meanGrp, A.gst3, A.qeFormula, A.leCramer, A.pie],
  q3b: [A.qeFormula, A.meanGrp, A.snWord, A.gst3, A.qeConsec, A.brokerage, A.lePrices, A.bag3, A.pie, A.apTpTq],
  q4: [A.qeNumbers, A.qeRect, A.apSave, A.apTpTq, A.leCramer, A.leBoat, A.meanGrp5, A.pie, A.sharesFull, A.dice],
  q5: [A.bag3, A.pie, A.qeConsec, A.snWord, A.gst3, A.lePrices, A.dice]
};
})();

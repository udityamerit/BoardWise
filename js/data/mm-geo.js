/* Maths mock papers 2-10: GEOMETRY (Part 2) question templates. Same conventions as mm-alg.js:
   (B, v, pos, m) => question; numbers come from tables and answers/solutions are computed from them. All questions original. */
(function () {
const { at, fr, accFr, fx, s, opts, must, int } = window.QB;
const SI = 'Similarity', PY = 'Pythagoras Theorem', CI = 'Circle', CG = 'Co-ordinate Geometry', TR = 'Trigonometry', ME = 'Mensuration', GC = 'Geometric Constructions';
const G = {};
const TRIP = [[3,4,5],[5,12,13],[8,15,17],[7,24,25],[9,40,41],[6,8,10],[20,21,29],[12,35,37],[9,12,15],[15,20,25]];
const sq = x => { const r = Math.round(Math.sqrt(x)); must(r * r === x, 'not a perfect square ' + x); return r; };
const PTS = [[1,2,4,6],[0,0,6,8],[2,3,5,7],[-1,-2,4,10],[1,1,9,7],[-3,2,2,14],[2,1,10,7],[0,5,12,10],[-2,-1,6,5],[3,4,15,9]];
const SLP = [[1,2,3,6],[0,1,2,5],[2,3,4,9],[1,1,4,7],[2,-1,4,5],[-1,2,1,8],[3,4,5,10],[0,-2,3,7],[1,5,4,2],[2,2,6,10]];
const MID = [[2,-3,8,5],[4,6,10,2],[-2,4,6,8],[0,0,8,6],[1,3,7,9],[3,-5,9,1],[-4,-2,6,8],[5,7,11,3],[2,2,12,10]];
const CONE = [[7,24,'22/7'],[6,8,'3.14'],[5,12,'3.14'],[14,48,'22/7'],[12,5,'3.14'],[21,20,'22/7'],[9,12,'3.14'],[8,15,'3.14'],[10,24,'3.14'],[15,8,'3.14']];
const piV = p => p === '22/7' ? 22 / 7 : 3.14;
const SECT = [[7,90],[14,60],[21,120],[7,60],[14,90],[21,60],[28,45],[7,120],[14,180],[21,30]];
const HD = [[30,30],[20,60],[25,45],[60,30],[40,60],[50,45],[90,30],[15,60],[45,45],[30,60]];
const OBJ = ['tower','flag-pole','building','tree','chimney','lighthouse'];
const TV = [['sin 30°','1/2'],['cos 60°','1/2'],['tan 45°','1'],['sin 60°','√3/2'],['cos 30°','√3/2'],['tan 30°','1/√3'],['cos 45°','1/√2'],['tan 60°','√3'],['sin 90°','1'],['cos 0°','1']];
const TVALS = ['1/2', '√3/2', '1', '1/√3', '√3', '1/√2', '0', '2'];
const TE = [['sin 30° + cos 60°',['1'],'1/2 + 1/2 = 1'],['sin 30° × cos 60°',['1/4','0.25'],'1/2 × 1/2 = 1/4'],['tan 45° + sin 90°',['2'],'1 + 1 = 2'],['2 sin 30° + tan 45°',['2'],'2 × 1/2 + 1 = 2'],['cos 0° + sin 90° + tan 45°',['3'],'1 + 1 + 1 = 3'],['4 sin 30° × cos 60°',['1'],'4 × 1/2 × 1/2 = 1'],['tan 45° − sin 30°',['1/2','0.5'],'1 − 1/2 = 1/2'],['sin 90° − 2 cos 60°',['0'],'1 − 2 × 1/2 = 0'],['3 sin 30° + 2 cos 60°',['5/2','2.5'],'3/2 + 1 = 5/2'],['cos 60° + sin 30° + tan 45°',['2'],'1/2 + 1/2 + 1 = 2'],['tan 45° × cos 0° + sin 90°',['2'],'1 × 1 + 1 = 2']];
const IDS = [
  ['(1 − sin²θ) · sec²θ = 1', 'LHS = cos²θ · sec²θ = cos²θ × (1/cos²θ) = 1 = RHS.'],
  ['(1 + tan²θ) · cos²θ = 1', 'LHS = sec²θ · cos²θ = (1/cos²θ) × cos²θ = 1 = RHS.'],
  ['(secθ − tanθ)(secθ + tanθ) = 1', 'LHS = sec²θ − tan²θ = 1 (since 1 + tan²θ = sec²θ) = RHS.'],
  ['sin⁴θ − cos⁴θ = sin²θ − cos²θ', 'LHS = (sin²θ − cos²θ)(sin²θ + cos²θ) = (sin²θ − cos²θ) × 1 = RHS.'],
  ['(1 + cot²θ) · sin²θ = 1', 'LHS = cosec²θ · sin²θ = (1/sin²θ) × sin²θ = 1 = RHS.'],
  ['(sinθ + cosθ)² + (sinθ − cosθ)² = 2', 'LHS = (sin²θ + 2sinθcosθ + cos²θ) + (sin²θ − 2sinθcosθ + cos²θ) = 2(sin²θ + cos²θ) = 2 = RHS.'],
  ['(1 − cos²θ) · cosec²θ = 1', 'LHS = sin²θ · cosec²θ = sin²θ × (1/sin²θ) = 1 = RHS.'],
  ['(1 + tan²θ)/(1 + cot²θ) = tan²θ', 'LHS = sec²θ / cosec²θ = (1/cos²θ) × sin²θ = tan²θ = RHS.'],
  ['cos²θ · tan²θ = sin²θ', 'LHS = cos²θ × (sin²θ/cos²θ) = sin²θ = RHS.'],
  ['cosθ/(1 − sinθ) = (1 + sinθ)/cosθ', 'Cross-multiplying: cos²θ = (1 + sinθ)(1 − sinθ) = 1 − sin²θ = cos²θ, which is true. Hence proved.'],
  ['sinθ/(1 + cosθ) + (1 + cosθ)/sinθ = 2 cosecθ', 'LHS = [sin²θ + (1 + cosθ)²] / [sinθ(1 + cosθ)] = [sin²θ + 1 + 2cosθ + cos²θ] / [sinθ(1 + cosθ)] = [2 + 2cosθ] / [sinθ(1 + cosθ)] = 2/sinθ = 2 cosecθ = RHS.']
];
const PROOFS = [
  ['Prove that the tangents drawn to a circle from an external point are equal in length.', 'Let PA and PB be tangents from P to the circle with centre O. Join OA, OB, OP. OA ⊥ PA and OB ⊥ PB (tangent ⊥ radius). In right Δs OAP and OBP: OA = OB (radii), OP is common ⇒ ΔOAP ≅ ΔOBP (hypotenuse–side). Hence <b>PA = PB</b>.'],
  ['Prove that a tangent at any point of a circle is perpendicular to the radius through the point of contact.', 'Let the tangent at P touch the circle (centre O) only at P. Take any other point Q on the tangent. Q lies outside the circle, so OQ &gt; OP (radius). So OP is the shortest distance from O to the line, which means OP ⊥ the tangent.'],
  ['Prove that the opposite angles of a cyclic quadrilateral are supplementary.', 'Let ABCD be cyclic with centre O. The arc BCD subtends ∠BAD at the circle and the arc BAD subtends ∠BCD. Each inscribed angle is half the central angle of its arc: ∠A = ½(arc BCD), ∠C = ½(arc BAD). The two arcs make the whole circle (360°), so ∠A + ∠C = ½ × 360° = <b>180°</b>. Similarly ∠B + ∠D = 180°.'],
  ['Prove that the angle subtended by a diameter at any point of the circle is a right angle.', 'Let AB be a diameter and C any point on the circle. The arc AB (not containing C) is a semicircle, so it measures 180°. The inscribed angle ∠ACB is half the measure of the arc it subtends: ∠ACB = ½ × 180° = <b>90°</b>.'],
  ['State and prove the Pythagoras theorem for a right-angled triangle ABC (∠B = 90°).', 'Draw BD ⊥ AC. ΔADB ~ ΔABC (common ∠A, right angles) ⇒ AB² = AD · AC … (i). ΔBDC ~ ΔABC (common ∠C, right angles) ⇒ BC² = DC · AC … (ii). Adding (i) and (ii): AB² + BC² = AC(AD + DC) = AC · AC = <b>AC²</b>.'],
  ['Prove the Basic Proportionality Theorem: a line parallel to one side of a triangle, meeting the other two sides, divides them in the same ratio.', 'In ΔABC let DE ∥ BC with D on AB and E on AC. Join BE and CD. A(ΔADE)/A(ΔBDE) = AD/DB (same height from E) and A(ΔADE)/A(ΔCED) = AE/EC (same height from D). ΔBDE and ΔCED stand on the same base DE between the same parallels, so their areas are equal. Hence <b>AD/DB = AE/EC</b>.']
];

/* ---------- 1-mark MCQ ---------- */
G.distMcq = (B, v, p) => { const [a, b, c] = at(TRIP, v); const o = opts(c, [a + b, Math.abs(b - a), a * b, c + 1, c - 1], p);
  return B.mcq(1, CG, `The distance of the point (${a}, ${b}) from the origin is:`, o.o, o.a, `d = √(${a}² + ${b}²) = √${a * a + b * b} = ${c}.`); };
G.trigMcq = (B, v, p) => { const [e, val] = at(TV, v); const o = opts(val, TVALS, p);
  return B.mcq(1, TR, `The value of ${e} is:`, o.o, o.a, `Standard value: ${e} = ${val}.`); };
G.tanLenMcq = (B, v, p) => { const [d, r, l] = at([[13,5,12],[5,3,4],[10,6,8],[17,8,15],[25,7,24],[26,10,24],[15,9,12],[20,12,16],[29,20,21]], v); const o = opts(l, [d - r, d + r, l + 1, l - 2, r], p);
  return B.mcq(1, CI, `A point P is ${d} cm from the centre O of a circle of radius ${r} cm. The length of the tangent from P to the circle is:`, o.o.map(x => x + ' cm'), o.a, `Tangent ⊥ radius, so PT² = OP² − r² = ${d * d} − ${r * r} = ${l * l} ⇒ PT = ${l} cm.`); };
G.cuboidMcq = (B, v, p) => { const [l, b, h] = at([[3,4,5],[2,3,6],[4,5,6],[5,5,2],[3,3,3],[6,2,4],[7,3,2],[4,4,5],[8,3,2],[5,4,3]], v), V = l * b * h; const o = opts(V, [l + b + h, 2 * (l * b + b * h + h * l), V + l, l * b, V - b], p);
  return B.mcq(1, ME, `The volume of a cuboid of length ${l} cm, breadth ${b} cm and height ${h} cm is:`, o.o.map(x => x + ' cm³'), o.a, `V = l × b × h = ${l} × ${b} × ${h} = ${V} cm³.`); };
G.slopeMcq = (B, v, p) => { const [x1, y1, x2, y2] = at(SLP, v), m = fr(y2 - y1, x2 - x1); const o = opts(m, [fr(x2 - x1, y2 - y1), fr(y2 + y1, x2 + x1 || 1), fr(-(y2 - y1), x2 - x1), fr(y2 - y1, x2 - x1) + '0', fr(y1 - x1, y2 - x2 || 1)], p);
  return B.mcq(1, CG, `The slope of the line passing through (${s(x1)}, ${s(y1)}) and (${s(x2)}, ${s(y2)}) is:`, o.o.map(s), o.a, `m = (y₂ − y₁)/(x₂ − x₁) = (${s(y2)} − (${s(y1)}))/(${s(x2)} − (${s(x1)})) = ${s(m)}.`); };
G.simMcq = (B, v, p) => { const [a, b] = at([[2,3],[3,4],[4,5],[1,2],[3,5],[2,5],[5,6],[3,7],[4,9]], v); const o = opts(`${a * a} : ${b * b}`, [`${a} : ${b}`, `${a * 2} : ${b * 2 + 1}`, `${b * b} : ${a * a}`, `${a * a} : ${b}`], p);
  return B.mcq(1, SI, `Two triangles are similar and the ratio of their corresponding sides is ${a} : ${b}. The ratio of their areas is:`, o.o, o.a, `Ratio of areas = (ratio of sides)² = ${a}² : ${b}² = ${a * a} : ${b * b}.`); };
G.tripletMcq = (B, v, p) => { const [a, b, c] = at(TRIP, v), f = (x, y, z) => `${x}, ${y}, ${z}`; const o = opts(f(a, b, c), [f(a, b, c + 1), f(a, b + 1, c), f(a + 1, b, c), f(a, b + 2, c + 1)], p);
  return B.mcq(1, PY, 'Which of the following is a Pythagorean triplet?', o.o, o.a, `${a}² + ${b}² = ${a * a + b * b} = ${c}², so (${a}, ${b}, ${c}) satisfies a² + b² = c².`); };
G.midMcq = (B, v, p) => { const [x1, y1, x2, y2] = at(MID, v), mx = (x1 + x2) / 2, my = (y1 + y2) / 2; const o = opts(`(${s(mx)}, ${s(my)})`, [`(${s(my)}, ${s(mx)})`, `(${s(x2 - x1)}, ${s(y2 - y1)})`, `(${s(mx + 1)}, ${s(my)})`, `(${s(mx)}, ${s(my + 2)})`], p);
  return B.mcq(1, CG, `The mid-point of the segment joining A(${s(x1)}, ${s(y1)}) and B(${s(x2)}, ${s(y2)}) is:`, o.o, o.a, `((${s(x1)} + ${s(x2)})/2, (${s(y1)} + ${s(y2)})/2) = (${s(mx)}, ${s(my)}).`); };
G.cyclicMcq = (B, v, p) => { const A_ = at([70,85,110,95,65,100,120,75,105], v); const o = opts(180 - A_, [A_, 90 - A_ / 2, 360 - A_, 180 + A_ - 100, A_ + 20], p);
  return B.mcq(1, CI, `ABCD is a cyclic quadrilateral and ∠A = ${A_}°. Then ∠C =`, o.o.map(x => x + '°'), o.a, `Opposite angles of a cyclic quadrilateral are supplementary: ∠C = 180° − ${A_}° = ${180 - A_}°.`); };
G.circAreaMcq = (B, v, p) => { const r = at([7, 14, 21, 28, 35, 49, 63, 42, 56, 70], v), A_ = 22 * r * r / 7; const o = opts(A_, [44 * r / 7 * 1, A_ * 2, A_ + r, 2 * 22 * r / 7 + 1, A_ / 2], p);
  return B.mcq(1, ME, `The area of a circle of radius ${r} cm (π = 22/7) is:`, o.o.map(x => x + ' cm²'), o.a, `A = πr² = 22/7 × ${r} × ${r} = ${A_} cm².`); };

/* ---------- 1-mark one-line answers ---------- */
G.hypNum = (B, v) => { const [a, b, c] = at(TRIP, v + 2);
  return B.num(1, PY, `The two sides forming the right angle of a right-angled triangle are ${a} cm and ${b} cm. Find the hypotenuse (cm).`, [String(c)], `h = √(${a}² + ${b}²) = √${a * a + b * b} = ${c} cm.`); };
G.slopeNum = (B, v) => { const [x1, y1, x2, y2] = at(SLP, v + 3), m = fr(y2 - y1, x2 - x1);
  return B.num(1, CG, `Find the slope of the line joining (${s(x1)}, ${s(y1)}) and (${s(x2)}, ${s(y2)}). (fraction or number)`, accFr(y2 - y1, x2 - x1), `m = (${s(y2)} − (${s(y1)}))/(${s(x2)} − (${s(x1)})) = ${s(m)}.`); };
G.trigExprNum = (B, v) => { const [e, acc, sol] = at(TE, v);
  return B.num(1, TR, `Find the value of ${e}.`, acc, sol + '.'); };
G.cyclicNum = (B, v) => { const A_ = at([65,80,105,95,70,115,100,85,120,110], v);
  return B.num(1, CI, `In a cyclic quadrilateral PQRS, ∠P = ${A_}°. Find ∠R (degrees).`, [String(180 - A_)], `∠P + ∠R = 180° ⇒ ∠R = 180° − ${A_}° = ${180 - A_}°.`); };
G.circAreaNum = (B, v) => { const r = at([7, 14, 21, 28, 35, 49, 42, 56, 63, 70], v + 4), A_ = 22 * r * r / 7;
  return B.num(1, ME, `Find the area (in cm²) of a circle of radius ${r} cm. (π = 22/7)`, [String(A_)], `A = πr² = 22/7 × ${r}² = ${A_} cm².`); };
G.circumNum = (B, v) => { const r = at([7, 14, 21, 28, 35, 42, 49, 56, 63, 70], v + 5), C = 44 * r / 7;
  return B.num(1, ME, `Find the circumference (in cm) of a circle of radius ${r} cm. (π = 22/7)`, [String(C)], `C = 2πr = 2 × 22/7 × ${r} = ${C} cm.`); };
G.volCylNum = (B, v) => { const [r, h] = at([[7,10],[7,15],[14,5],[7,20],[21,2],[14,10],[7,12],[14,3],[7,30],[21,5]], v), V = 22 * r * r * h / 7;
  return B.num(1, ME, `Find the volume (in cm³) of a cylinder of radius ${r} cm and height ${h} cm. (π = 22/7)`, [String(V)], `V = πr²h = 22/7 × ${r}² × ${h} = ${V} cm³.`); };
G.midNum = (B, v) => { const [x1, y1, x2, y2] = at(MID, v + 5), mx = (x1 + x2) / 2;
  return B.num(1, CG, `Find the x-coordinate of the mid-point of the segment joining (${s(x1)}, ${s(y1)}) and (${s(x2)}, ${s(y2)}).`, [String(mx)], `x = (${s(x1)} + ${s(x2)})/2 = ${s(mx)}.`); };
G.distNum = (B, v) => { const [x1, y1, x2, y2] = at(PTS, v), dd = sq((x2 - x1) ** 2 + (y2 - y1) ** 2);
  return B.num(1, CG, `Find the distance between the points (${s(x1)}, ${s(y1)}) and (${s(x2)}, ${s(y2)}).`, [String(dd)], `d = √[(${s(x2)} − (${s(x1)}))² + (${s(y2)} − (${s(y1)}))²] = √(${(x2 - x1) ** 2} + ${(y2 - y1) ** 2}) = ${dd}.`); };
G.tanLenNum = (B, v) => { const [d, r, l] = at([[13,5,12],[5,3,4],[10,6,8],[17,8,15],[25,7,24],[26,10,24],[15,9,12],[20,12,16],[29,20,21]], v + 2);
  return B.num(1, CI, `A point is ${d} cm from the centre of a circle of radius ${r} cm. Find the length of the tangent from the point (cm).`, [String(l)], `Length = √(${d}² − ${r}²) = √${d * d - r * r} = ${l} cm.`); };
G.arcNum = (B, v) => { const a = at([25,35,40,50,55,60,65,70,75,45], v);
  return B.num(1, CI, `An inscribed angle in a circle measures ${a}°. Find the measure of the arc it subtends (degrees).`, [String(2 * a)], `Measure of arc = 2 × inscribed angle = 2 × ${a}° = ${2 * a}°.`); };

/* ---------- 2-mark ---------- */
G.bpt = (B, v) => { const [ad, db, ae] = at([[3,6,2],[4,6,6],[5,10,3],[2,3,4],[6,9,4],[3,5,6],[4,8,3],[5,15,2],[6,4,9],[8,12,6]], v), ec = int(ae * db / ad, 'ec');
  return B.num(2, SI, `In ΔABC, D is on AB and E is on AC with DE ∥ BC. AD = ${ad} cm, DB = ${db} cm and AE = ${ae} cm. Find EC (cm).`, [String(ec)], `By the Basic Proportionality Theorem AD/DB = AE/EC ⇒ ${ad}/${db} = ${ae}/EC ⇒ EC = ${ae} × ${db}/${ad} = ${ec} cm.`); };
G.simSide = (B, v) => { const [ab, pq, bc] = at([[6,9,8],[4,6,10],[3,5,9],[8,12,10],[5,15,4],[6,8,9],[9,6,12],[10,15,6],[12,18,10],[7,14,5]], v), qr = int(bc * pq / ab, 'qr');
  return B.num(2, SI, `ΔABC ~ ΔPQR. AB = ${ab} cm, PQ = ${pq} cm and BC = ${bc} cm. Find QR (cm).`, [String(qr)], `Corresponding sides are proportional: AB/PQ = BC/QR ⇒ ${ab}/${pq} = ${bc}/QR ⇒ QR = ${bc} × ${pq}/${ab} = ${qr} cm.`); };
G.pythLeg = (B, v) => { const [a, b, c] = at(TRIP, v + 4);
  return B.num(2, PY, `In a right-angled triangle the hypotenuse is ${c} cm and one of the other sides is ${a} cm. Find the third side (cm).`, [String(b)], `Third side = √(${c}² − ${a}²) = √(${c * c} − ${a * a}) = √${b * b} = ${b} cm.`); };
G.chords = (B, v) => { const [ap, pb, cp] = at([[6,4,3],[8,3,6],[9,4,12],[10,6,5],[12,5,6],[8,9,6],[15,4,10],[6,8,4],[7,6,3],[9,8,12]], v), pd = int(ap * pb / cp, 'pd');
  return B.num(2, CI, `Chords AB and CD of a circle intersect at P inside the circle. AP = ${ap} cm, PB = ${pb} cm and CP = ${cp} cm. Find PD (cm).`, [String(pd)], `AP × PB = CP × PD ⇒ ${ap} × ${pb} = ${cp} × PD ⇒ PD = ${ap * pb}/${cp} = ${pd} cm.`); };
G.secTan = (B, v) => { const [pa, pb] = at([[4,9],[2,8],[3,12],[4,25],[5,20],[9,16],[2,18],[8,18],[3,27],[5,45]], v), pt = sq(pa * pb);
  return B.num(2, CI, `From an external point P a tangent PT and a secant PAB (A between P and B) are drawn to a circle. PA = ${pa} cm and PB = ${pb} cm. Find PT (cm).`, [String(pt)], `PT² = PA × PB = ${pa} × ${pb} = ${pa * pb} ⇒ PT = ${pt} cm.`); };
G.midSelf = (B, v, p, m) => { const [x1, y1, x2, y2] = at(MID, v + 2), mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  return B.self(m, CG, `Find the mid-point of the segment joining A(${s(x1)}, ${s(y1)}) and B(${s(x2)}, ${s(y2)}).`, `M = ((x₁ + x₂)/2, (y₁ + y₂)/2) = ((${s(x1)} + ${s(x2)})/2, (${s(y1)} + ${s(y2)})/2) = <b>(${s(mx)}, ${s(my)})</b>.`); };
G.midB = (B, v, p, m) => { const [x1, y1, xm, ym] = at([[2,3,5,7],[1,-2,4,1],[-3,4,0,2],[6,1,3,5],[0,-4,2,-1],[5,5,1,3],[-2,-3,3,0],[4,2,-1,6],[7,-1,2,2],[3,0,-2,4]], v), x2 = 2 * xm - x1, y2 = 2 * ym - y1;
  return B.self(m, CG, `M(${s(xm)}, ${s(ym)}) is the mid-point of the segment AB and A is the point (${s(x1)}, ${s(y1)}). Find the coordinates of B.`, `Let B = (x, y). (${s(x1)} + x)/2 = ${s(xm)} ⇒ x = ${s(x2)}. (${s(y1)} + y)/2 = ${s(ym)} ⇒ y = ${s(y2)}. So B = <b>(${s(x2)}, ${s(y2)})</b>.`); };
G.cosFromSin = (B, v) => { const [a, b, c] = at(TRIP, v + 1);
  return B.num(2, TR, `If sin θ = ${a}/${c} (θ is acute), find cos θ. (fraction)`, accFr(b, c), `cos²θ = 1 − sin²θ = 1 − ${a * a}/${c * c} = ${b * b}/${c * c} ⇒ cos θ = ${fr(b, c)}.`); };
G.sector = (B, v) => { const [r, t] = at(SECT, v), A_ = t / 360 * 22 / 7 * r * r;
  return B.numt(2, ME, `Find the area (in cm²) of a sector of a circle of radius ${r} cm with central angle ${t}°. (π = 22/7)`, [fx(A_)], `Area = (θ/360) × πr² = (${t}/360) × 22/7 × ${r}² = <b>${fx(A_)} cm²</b>.`, 0.01); };
G.arcLen = (B, v) => { const [r, t] = at(SECT, v + 3), L = t / 360 * 2 * 22 / 7 * r;
  return B.numt(2, ME, `Find the length (in cm) of an arc of a circle of radius ${r} cm that subtends a central angle of ${t}°. (π = 22/7)`, [fx(L)], `Arc length = (θ/360) × 2πr = (${t}/360) × 2 × 22/7 × ${r} = <b>${fx(L)} cm</b>.`, 0.01); };
G.coneSlant = (B, v) => { const [r, h] = at(CONE, v), l = sq(r * r + h * h);
  return B.num(2, ME, `The radius of a cone is ${r} cm and its height is ${h} cm. Find its slant height (cm).`, [String(l)], `l = √(r² + h²) = √(${r * r} + ${h * h}) = ${l} cm.`); };
G.tanAngle = (B, v) => { const t = at([40,50,60,70,80,100,110,120,130,35], v);
  return B.num(2, CI, `Tangents PA and PB are drawn from an external point P to a circle with centre O, touching it at A and B. If ∠APB = ${t}°, find ∠AOB (degrees).`, [String(180 - t)], `In quadrilateral OAPB, ∠OAP = ∠OBP = 90° (tangent ⊥ radius). So ∠AOB = 360° − 90° − 90° − ${t}° = ${180 - t}°.`); };
G.lineSlopeInt = (B, v, p, m) => { const [x1, y1, x2, y2] = at(SLP, v + 1), sl = fr(y2 - y1, x2 - x1);
  return B.self(m, CG, `Find the slope of the line through P(${s(x1)}, ${s(y1)}) and Q(${s(x2)}, ${s(y2)}). Is the line rising or falling?`, `m = (${s(y2)} − (${s(y1)}))/(${s(x2)} − (${s(x1)})) = <b>${s(sl)}</b>. ${(y2 - y1) / (x2 - x1) > 0 ? 'Slope is positive, so the line rises from left to right.' : 'Slope is negative, so the line falls from left to right.'}`); };

/* ---------- 3-mark / 4-mark ---------- */
G.identity = (B, v, p, m) => { const [t, sol] = at(IDS, v);
  return B.self(m, TR, `Prove that: <b>${t}</b>`, sol + ' <b>Hence proved.</b>'); };
G.verify = (B, v, p, m) => { const a = at([30, 45, 60], v), D = { 30: ['1/2','√3/2','1/√3','2/√3','1/4 + 3/4 = 1','1 + 1/3 = 4/3 and sec²θ = (2/√3)² = 4/3'], 45: ['1/√2','1/√2','1','√2','1/2 + 1/2 = 1','1 + 1 = 2 and sec²θ = (√2)² = 2'], 60: ['√3/2','1/2','√3','2','3/4 + 1/4 = 1','1 + 3 = 4 and sec²θ = 2² = 4'] }[a];
  return B.self(m, TR, `For θ = ${a}°, verify that (i) sin²θ + cos²θ = 1 and (ii) 1 + tan²θ = sec²θ.`, `For ${a}°: sinθ = ${D[0]}, cosθ = ${D[1]}, tanθ = ${D[2]}, secθ = ${D[3]}. (i) sin²θ + cos²θ = ${D[4]} ✓. (ii) 1 + tan²θ = ${D[5]} ✓. Both verified.`); };
G.collinear = (B, v, p, m) => { const [k, c, xs] = at([[2,1,[1,3,5]],[3,-2,[0,2,4]],[1,4,[-1,2,5]],[-2,5,[0,1,3]],[4,0,[1,2,4]],[3,1,[-1,1,3]],[5,-3,[0,1,2]],[-1,6,[1,3,7]],[2,-4,[2,4,8]],[6,-1,[0,2,3]]], v), P = xs.map(x => [x, k * x + c]), nm = ['A', 'B', 'C'];
  const sl = (a, b) => fr(b[1] - a[1], b[0] - a[0]);
  return B.self(m, CG, `Show that the points ${P.map((q, i) => nm[i] + '(' + s(q[0]) + ', ' + s(q[1]) + ')').join(', ')} are collinear.`, `Slope of AB = (${s(P[1][1])} − (${s(P[0][1])}))/(${s(P[1][0])} − (${s(P[0][0])})) = ${s(sl(P[0], P[1]))}. Slope of BC = (${s(P[2][1])} − (${s(P[1][1])}))/(${s(P[2][0])} − (${s(P[1][0])})) = ${s(sl(P[1], P[2]))}. The slopes are equal and B is common, so A, B, C lie on one line — <b>collinear</b>.`); };
G.section = (B, v, p, m) => { const [x1, y1, a, b, dx, dy] = at([[1,2,2,1,3,2],[-2,3,1,2,2,-1],[3,-1,3,2,1,2],[0,4,1,3,2,1],[2,2,3,1,2,3],[-3,-2,2,3,1,2],[4,1,1,1,3,2],[-1,0,2,1,4,3],[5,3,1,2,-2,2],[0,-3,3,2,2,3]], v), x2 = x1 + (a + b) * dx, y2 = y1 + (a + b) * dy, px = x1 + a * dx, py = y1 + a * dy;
  must((a * x2 + b * x1) / (a + b) === px, 'section');
  return B.self(m, CG, `Find the coordinates of the point P that divides the segment joining A(${s(x1)}, ${s(y1)}) and B(${s(x2)}, ${s(y2)}) internally in the ratio ${a} : ${b}.`, `P = ((m x₂ + n x₁)/(m + n), (m y₂ + n y₁)/(m + n)) with m : n = ${a} : ${b}. x = (${a}×${s(x2)} + ${b}×${s(x1)})/${a + b} = ${s(px)}, y = (${a}×${s(y2)} + ${b}×${s(y1)})/${a + b} = ${s(py)}. <b>P = (${s(px)}, ${s(py)})</b>.`); };
const SIMAR = [[81,49,18],[64,36,16],[25,16,10],[100,49,20],[144,81,24],[49,25,14],[36,16,9],[121,64,22],[169,81,26],[225,144,30]];
G.areaRatio = (B, v, p, m) => { const [a1, a2, ab] = at(SIMAR, v), a = sq(a1), b = sq(a2), pq = int(ab * b / a, 'pq');
  return B.self(m, SI, `ΔABC ~ ΔPQR. A(ΔABC) = ${a1} cm², A(ΔPQR) = ${a2} cm² and AB = ${ab} cm. Find PQ.`, `Ratio of areas of similar triangles = (ratio of corresponding sides)²: ${a1}/${a2} = (AB/PQ)² ⇒ AB/PQ = ${a}/${b} ⇒ PQ = ${ab} × ${b}/${a} = <b>${pq} cm</b>.`); };
G.rhombus = (B, v, p, m) => { const [d1, d2] = at([[16,12],[30,16],[48,14],[24,10],[18,24],[40,42],[10,24],[32,24],[14,48],[60,32]], v), sd = sq((d1 / 2) ** 2 + (d2 / 2) ** 2);
  return B.num(m, PY, `The diagonals of a rhombus are ${d1} cm and ${d2} cm. Find the length of its side (cm).`, [String(sd)], `The diagonals of a rhombus bisect each other at right angles, giving a right triangle with legs ${d1 / 2} cm and ${d2 / 2} cm. Side = √(${(d1 / 2) ** 2} + ${(d2 / 2) ** 2}) = √${sd * sd} = <b>${sd} cm</b>.`); };
G.ladder = (B, v, p, m) => { const [L, d] = at([[10,6],[13,5],[17,8],[25,7],[26,10],[15,9],[20,12],[25,15],[29,20],[37,12]], v), h = sq(L * L - d * d);
  return B.num(m, PY, `A ladder ${L} m long leans against a vertical wall with its foot ${d} m from the wall. How high up the wall does it reach (m)?`, [String(h)], `Ladder, wall and ground form a right triangle with hypotenuse ${L} m. Height = √(${L}² − ${d}²) = √${L * L - d * d} = <b>${h} m</b>.`); };
G.coneCSA = (B, v, p, m) => { const [r, h, pi] = at(CONE, v + 2), l = sq(r * r + h * h), A_ = piV(pi) * r * l;
  return B.numt(m, ME, `The radius of a cone is ${r} cm and its height is ${h} cm. Find its curved surface area (π = ${pi}) in cm².`, [fx(A_)], `Slant height l = √(${r}² + ${h}²) = ${l} cm. CSA = πrl = ${pi} × ${r} × ${l} = <b>${fx(A_)} cm²</b>.`, 0.05); };
G.coneVol = (B, v, p, m) => { const [r, h, pi] = at(CONE, v + 4), V = piV(pi) * r * r * h / 3;
  return B.numt(m, ME, `Find the volume of a cone of radius ${r} cm and height ${h} cm. (π = ${pi}) Answer in cm³ (2 decimal places if needed).`, [fx(V)], `V = (1/3)πr²h = (1/3) × ${pi} × ${r}² × ${h} = <b>${fx(V)} cm³</b>.`, 0.05); };
G.sphereVol = (B, v, p, m) => { const r = at([3, 6, 9, 12, 15, 18, 21, 4.5, 7.5, 10.5], v), V = 4 / 3 * 3.14 * r ** 3, S = 4 * 3.14 * r * r;
  return B.numt(m, ME, `Find the volume of a sphere of radius ${r} cm. (π = 3.14) Answer in cm³ (2 decimal places if needed).`, [fx(V)], `V = (4/3)πr³ = (4/3) × 3.14 × ${r}³ = <b>${fx(V)} cm³</b>. (Surface area would be 4πr² = ${fx(S)} cm².)`, 0.05); };
G.melt = (B, v, p, m) => { const [R, rc, h] = at([[6,3,4],[3,1,3],[6,2,9],[9,3,9],[12,4,12],[6,3,2],[9,3,3],[12,3,8],[15,5,9],[9,1,27]], v), n = int(4 * R ** 3 / (rc * rc * h), 'melt');
  return B.num(m, ME, `A solid metal sphere of radius ${R} cm is melted and recast into solid cones of radius ${rc} cm and height ${h} cm. How many cones are made?`, [String(n)], `Volume of sphere = (4/3)π(${R})³ = (4/3)π × ${R ** 3}. Volume of one cone = (1/3)π(${rc})²(${h}) = (1/3)π × ${rc * rc * h}. Number of cones = 4 × ${R ** 3} / ${rc * rc * h} = <b>${n}</b>.`); };
G.sphereWire = (B, v, p, m) => { const [R, r] = at([[6,2],[3,1],[3,3],[9,3],[12,4],[12,8],[6,3],[12,6],[6,1],[9,6]], v), L = int(4 / 3 * R ** 3 / (r * r), 'wire');
  return B.num(m, ME, `A solid sphere of radius ${R} cm is melted and drawn into a uniform wire of circular cross-section of radius ${r} cm. Find the length of the wire (cm).`, [String(L)], `Volume of sphere = (4/3)π${R}³ = (4/3)π × ${R ** 3}. Wire is a cylinder: πr²l = π × ${r * r} × l. Equating: l = (4/3) × ${R ** 3}/${r * r} = <b>${L} cm</b>.`); };
G.heightDist = (B, v, p, m) => { const [d, ang] = at(HD, v), h = ang === 30 ? d * 1.73 / 3 : ang === 60 ? d * 1.73 : d, o = at(OBJ, v);
  return B.numt(m, TR, `From a point on the ground ${d} m away from the foot of a ${o}, the angle of elevation of its top is ${ang}°. Find the height of the ${o} in metres.${ang === 45 ? '' : ' (√3 = 1.73)'}`, [fx(h)], `tan ${ang}° = height/${d} ⇒ height = ${d} × tan ${ang}° = ${d} × ${ang === 30 ? '1/√3' : ang === 60 ? '√3' : '1'} = <b>${fx(h)} m</b>.`, 0.1); };
G.equilateral = (B, v, p, m) => { const a = at([8, 10, 12, 14, 16, 6, 18, 20, 4, 24], v), h = a * 1.73;
  return B.numt(m, PY, `Find the altitude of an equilateral triangle of side ${2 * a} cm. (√3 = 1.73)`, [fx(h)], `The altitude bisects the base: ${a} cm. Altitude = √[(${2 * a})² − ${a}²] = √${3 * a * a} = ${a}√3 = ${a} × 1.73 = <b>${fx(h)} cm</b>.`, 0.1); };
G.proof = (B, v, p, m) => { const [t, sol] = at(PROOFS, v);
  return B.self(m, v % 2 ? CI : SI, t, sol); };
G.frustum = (B, v, p, m) => { const [r1, r2, h] = at([[14,8,8],[10,4,8],[13,5,15],[9,3,8],[12,4,15],[10,2,6],[17,5,16],[15,6,12],[16,4,5],[20,8,9]], v), l = sq((r1 - r2) ** 2 + h * h), pi = 3.14;
  const csa = pi * l * (r1 + r2), tsa = csa + pi * (r1 * r1 + r2 * r2), vol = pi * h / 3 * (r1 * r1 + r1 * r2 + r2 * r2);
  return B.self(m, ME, `A frustum of a cone has radii ${r1} cm and ${r2} cm and height ${h} cm. Find (i) its slant height, (ii) its curved surface area, (iii) its volume. (π = 3.14)`, `(i) l = √[(r₁ − r₂)² + h²] = √(${(r1 - r2) ** 2} + ${h * h}) = <b>${l} cm</b>. (ii) CSA = π(r₁ + r₂)l = 3.14 × ${r1 + r2} × ${l} = <b>${fx(csa)} cm²</b>. (iii) V = (πh/3)(r₁² + r₁r₂ + r₂²) = (3.14 × ${h}/3) × ${r1 * r1 + r1 * r2 + r2 * r2} = <b>${fx(vol)} cm³</b>. (Total surface area = CSA + π(r₁² + r₂²) = ${fx(tsa)} cm².)`); };
G.lineEq = (B, v, p, m) => { const [x1, y1, x2, y2] = at([[2,3,4,7],[1,2,3,8],[0,1,2,7],[1,-1,3,5],[-1,2,2,11],[2,-3,4,1],[3,1,5,9],[0,-2,3,7],[1,4,4,13],[-2,0,2,12]], v), sl = int((y2 - y1) / (x2 - x1), 'slope'), c = y1 - sl * x1;
  return B.self(m, CG, `For the line passing through P(${s(x1)}, ${s(y1)}) and Q(${s(x2)}, ${s(y2)}): (i) find the slope, (ii) write the equation of the line, (iii) find its y-intercept.`, `(i) m = (${s(y2)} − ${s(y1)})/(${s(x2)} − ${s(x1)}) = <b>${s(sl)}</b>. (ii) y − ${s(y1)} = ${s(sl)}(x − ${s(x1)}) ⇒ <b>${sl}x − y ${c < 0 ? '−' : '+'} ${Math.abs(c)} = 0</b>, i.e. y = ${sl}x ${c < 0 ? '−' : '+'} ${Math.abs(c)}. (iii) put x = 0: y = <b>${s(c)}</b>. (marks: 1 + 2 + 1)`); };
G.ladderFull = (B, v, p, m) => G.ladder(B, v + 4, p, m);
G.areaRatio4 = (B, v, p, m) => G.areaRatio(B, v + 5, p, m);

/* constructions (self-assessed against the steps) */
G.constructTangent = (B, v, p, m) => { const [r, d] = at([[2.5,6],[3,7],[3.5,8],[4,9],[2,5],[3,6.5],[2.5,7],[4,10],[3.5,9],[3,8]], v), l = Math.sqrt(d * d - r * r);
  return B.self(m, GC, `Draw a circle of radius ${r} cm with centre O. Take a point P at a distance ${d} cm from O and construct the tangents from P to the circle. Measure the length of a tangent.`, `1. Draw the circle (O, ${r} cm). 2. Mark P with OP = ${d} cm. 3. Draw the perpendicular bisector of OP and mark its mid-point M. 4. With centre M and radius MO draw a circle (arc) cutting the first circle at A and B. 5. Join PA and PB — these are the tangents. Check: PA = PB = √(${d}² − ${r}²) ≈ <b>${fx(l)} cm</b> (±0.1 cm on your drawing). Marks: circle 1, perpendicular bisector 1, tangents 1${m === 4 ? ', measurement/justification 1' : ''}.`); };
G.constructSim = (B, v, p, m) => { const [a, b, c, mm, nn] = at([[4,5,6,3,4],[5,6,7,4,5],[6,7,8,2,3],[3,4,5,5,3],[5,5,6,3,2],[4,6,8,5,4],[6,8,10,3,5],[5,7,9,2,3],[4,4,5,3,2],[7,8,9,3,4]], v), f = x => fx(x * mm / nn);
  const big = mm > nn;
  return B.self(m, GC, `Construct ΔABC with AB = ${a} cm, BC = ${b} cm and AC = ${c} cm. Then construct a triangle similar to ΔABC whose sides are ${mm}/${nn} of the corresponding sides of ΔABC.`, `1. Construct ΔABC with the given sides. 2. Draw ray BX making an acute angle with BC on the side opposite to A. 3. Mark ${Math.max(mm, nn)} equal points B₁, B₂, … on BX. 4. Join B${nn} to C. 5. Through B${mm} draw a line parallel to B${nn}C meeting ${big ? 'BC produced' : 'BC'} at C′. 6. Through C′ draw C′A′ ∥ CA meeting ${big ? 'BA produced' : 'BA'} at A′. ΔA′BC′ is the required triangle. Check: its sides should be about A′B = ${f(a)} cm, BC′ = ${f(b)} cm, A′C′ = ${f(c)} cm. Marks: ΔABC 1, parallel-line construction 1, final triangle 1${m === 4 ? ', check 1' : ''}.`); };

window.MM_GEO = {
  q1a: [G.distMcq, G.trigMcq, G.tanLenMcq, G.cuboidMcq, G.slopeMcq, G.simMcq, G.tripletMcq, G.midMcq, G.cyclicMcq, G.circAreaMcq],
  q1b: [G.hypNum, G.slopeNum, G.trigExprNum, G.cyclicNum, G.circAreaNum, G.circumNum, G.volCylNum, G.midNum, G.distNum, G.tanLenNum, G.arcNum],
  q2: [G.bpt, G.simSide, G.pythLeg, G.chords, G.secTan, G.midSelf, G.cosFromSin, G.sector, G.arcLen, G.coneSlant, G.tanAngle, G.midB, G.lineSlopeInt],
  q3a: [G.identity, G.collinear, G.section, G.areaRatio, G.rhombus, G.coneCSA, G.proof, G.melt, G.heightDist, G.equilateral, G.coneVol, G.sphereVol, G.verify],
  q3b: [G.identity, G.heightDist, G.collinear, G.coneCSA, G.proof, G.melt, G.section, G.rhombus, G.areaRatio, G.sphereVol, G.verify, G.ladder, G.equilateral],
  q4: [G.heightDist, G.frustum, G.melt, G.lineEq, G.constructTangent, G.constructSim, G.ladderFull, G.areaRatio4, G.sphereWire, G.proof],
  q5: [G.constructTangent, G.constructSim, G.verify, G.identity, G.heightDist, G.coneCSA, G.proof]
};
})();

/* NEET (UG) Physics question bank — NCERT Class XI, 14 chapters. Original questions.
   Numerical questions are templates: the answer and the distractors (typical mistakes) are computed from the same numbers. g = 10 m/s². */
(function () {
const NL = window.NL, S = 'phy', f = NL.f, sq = Math.sqrt, PI = Math.PI;
const gen = (ch, rows, fn) => NL.gen(S, ch, rows, fn), mcs = (ch, l) => NL.mcs(S, ch, l), st = (ch, T, F, sp) => NL.stmts(S, ch, T, F, sp), ar = (ch, l) => NL.ar(S, ch, l), pr = (ch, a, b, P, sp) => NL.pairs(S, ch, a, b, P, sp);
const sup = n => n === 1 ? '' : `<sup>${n}</sup>`;

/* ---------- 1. Units and Measurements ---------- */
let C = 'Units and Measurements';
gen(C, [[2, 1, 3, 1, 2, 1], [3, 2, 1, 1, 1, 2], [1, 3, 2, 2, 1, 1], [2, 2, 1, 0.5, 1, 3], [3, 1, 2, 1, 2, 0.5], [1, 2, 3, 3, 1, 1]], (p, q, r, ea, eb, ec) => [
  `A physical quantity is X = a${sup(p)} b${sup(q)} / c${sup(r)}. The percentage errors in measuring a, b and c are ${ea}%, ${eb}% and ${ec}% respectively. The maximum percentage error in X is`,
  p * ea + q * eb + r * ec, '%', [p * ea + q * eb - r * ec, ea + eb + ec, p * ea * q * eb / Math.max(1, r * ec) + 1],
  `Maximum relative error adds up with the powers as weights: ΔX/X = ${p}(Δa/a) + ${q}(Δb/b) + ${r}(Δc/c) = ${p}×${ea} + ${q}×${eb} + ${r}×${ec} = <b>${f(p * ea + q * eb + r * ec)}%</b>. Errors never cancel, even for the quantity in the denominator.`]);
NL.mcs(S, C, [
  ['The number of significant figures in 0.004050 is', '4', '3', '6', '7', 'Leading zeros are not significant; the zero between 4 and 5 and the trailing zero after the decimal point are. Significant: 4, 0, 5, 0 → <b>4</b>.'],
  ['The number of significant figures in 6.0230 × 10<sup>23</sup> is', '5', '4', '6', '3', 'The power of 10 does not count. 6.0230 has <b>5</b> significant figures (the trailing zero after the decimal point counts).'],
  ['The number of significant figures in 30.00 is', '4', '1', '2', '3', 'Trailing zeros after a decimal point are significant: 3, 0, 0, 0 → <b>4</b>.'],
  ['The number of significant figures in 0.0300700 is', '6', '3', '4', '7', 'Ignore the leading zeros: 3 0 0 7 0 0 → <b>6</b> significant figures.'],
  ['The sum 2.5 g + 3.75 g + 4.125 g, written with the correct number of significant figures, is', '10.4 g', '10.375 g', '10.38 g', '10 g', 'In addition the result keeps as many decimal places as the least precise term (2.5 has one decimal place): 10.375 → <b>10.4 g</b>.', 'medium'],
  ['The area of a rectangle of sides 4.234 m and 1.05 m, with correct significant figures, is', '4.45 m²', '4.4457 m²', '4.446 m²', '4.4 m²', 'In multiplication the result keeps the least number of significant figures (1.05 has 3): 4.4457 → <b>4.45 m²</b>.', 'medium'],
  ['The mass of a body is 5.74 g and its volume is 1.2 cm³. Its density, with the correct significant figures, is', '4.8 g cm⁻³', '4.78 g cm⁻³', '4.783 g cm⁻³', '5 g cm⁻³', 'Division: keep the least number of significant figures, here 2 (from 1.2). 5.74/1.2 = 4.783 → <b>4.8 g cm⁻³</b>.', 'medium'],
  ['Which of the following is NOT a fundamental (base) SI unit?', 'newton', 'kelvin', 'candela', 'ampere', 'The seven SI base units are metre, kilogram, second, ampere, kelvin, mole and candela. The <b>newton</b> is a derived unit (kg m s⁻²).'],
  ['The SI unit of luminous intensity is', 'candela', 'lumen', 'lux', 'watt', 'Luminous intensity is a base quantity; its unit is the <b>candela (cd)</b>.'],
  ['One light year is a unit of', 'distance', 'time', 'speed', 'intensity of light', 'A light year is the <b>distance</b> light travels in one year, about 9.46 × 10<sup>15</sup> m.'],
  ['1 parsec is approximately equal to', '3.08 × 10<sup>16</sup> m', '9.46 × 10<sup>15</sup> m', '1.5 × 10<sup>11</sup> m', '3 × 10<sup>8</sup> m', 'A parsec is the distance at which 1 AU subtends 1 arcsecond: about <b>3.08 × 10<sup>16</sup> m</b> (≈ 3.26 light years).'],
  ['If force (F), velocity (V) and time (T) are taken as fundamental quantities, the dimensions of mass are', '[F V<sup>−1</sup> T]', '[F V T<sup>−1</sup>]', '[F V<sup>−1</sup> T<sup>−1</sup>]', '[F<sup>−1</sup> V T]', 'F = ma = m·V/T, so m = F T / V → <b>[F V<sup>−1</sup> T]</b>.', 'medium'],
  ['Which pair of physical quantities has the same dimensions?', 'Work and torque', 'Force and pressure', 'Momentum and energy', 'Power and work', 'Work = F·d and torque = r × F both have dimensions <b>[M L² T⁻²]</b>.'],
  ['The dimensions of the ratio of angular momentum to linear momentum are', '[M<sup>0</sup> L T<sup>0</sup>]', '[M L T<sup>−1</sup>]', '[M L² T<sup>−1</sup>]', '[M<sup>−1</sup> L<sup>−1</sup> T]', 'Angular momentum = r × p, so L/p has the dimension of length: <b>[M⁰ L T⁰]</b>.', 'medium'],
  ['In the equation y = A sin(ωt − kx), where t is time and x is distance, the dimensions of ω/k are those of', 'velocity', 'acceleration', 'length', 'frequency', 'The argument of sine is dimensionless, so ω has [T⁻¹] and k has [L⁻¹]; ω/k = [L T⁻¹] = <b>velocity</b>.', 'medium']
]);
gen(C, [[[2.62, 2.56, 2.42, 2.71, 2.80]], [[1.29, 1.33, 1.34, 1.35, 1.32, 1.36, 1.30, 1.33]], [[3.14, 3.18, 3.12, 3.16]], [[56.2, 56.5, 56.0, 56.3]]], rd => {
  const n = rd.length, m = rd.reduce((a, b) => a + b, 0) / n, d = rd.reduce((a, x) => a + Math.abs(x - m), 0) / n, mr = Math.round(m * 1000) / 1000;
  return [`Repeated measurements of a quantity give ${rd.join(', ')} (same unit). The mean absolute error is`, +d.toFixed(3), '', [+(d * 2).toFixed(3), +(d / 2).toFixed(3), +(Math.max(...rd) - Math.min(...rd)).toFixed(3)],
    `Mean = ${f(mr)}. Mean absolute error = average of |a<sub>i</sub> − mean| = <b>${f(+d.toFixed(3))}</b>.`];
});
pr(C, 'Physical quantity', 'Dimensional formula', [
  ['Force', '[M L T<sup>−2</sup>]'], ['Work', '[M L<sup>2</sup> T<sup>−2</sup>]'], ['Power', '[M L<sup>2</sup> T<sup>−3</sup>]'], ['Pressure', '[M L<sup>−1</sup> T<sup>−2</sup>]'],
  ['Linear momentum', '[M L T<sup>−1</sup>]'], ['Gravitational constant G', '[M<sup>−1</sup> L<sup>3</sup> T<sup>−2</sup>]'], ["Planck's constant", '[M L<sup>2</sup> T<sup>−1</sup>]'], ['Surface tension', '[M T<sup>−2</sup>]'],
  ['Coefficient of viscosity', '[M L<sup>−1</sup> T<sup>−1</sup>]'], ['Specific heat capacity', '[L<sup>2</sup> T<sup>−2</sup> K<sup>−1</sup>]'], ['Angular velocity', '[T<sup>−1</sup>]'], ['Acceleration', '[L T<sup>−2</sup>]']
], { list: 4, right: 2, wrong: 2, direct: 6, ask: l => `The dimensional formula of ${l.charAt(0).toLowerCase() + l.slice(1)} is` });
st(C, [
  'A dimensionally correct equation need not be a correct physical relation.',
  'Pure numbers and trigonometric ratios are dimensionless.',
  'There are seven base quantities in the SI system.',
  'The mole is the SI unit of amount of substance.',
  'Relative error is the ratio of the mean absolute error to the mean value of the quantity.',
  'Precision of an instrument is decided by its least count.',
  'Systematic errors tend to be in one direction, either positive or negative.',
  'A physical quantity may have a unit and yet be dimensionless, for example plane angle (radian).'
], [
  ['A dimensionally correct equation is always physically correct.', 'dimensional consistency is necessary but not sufficient — numerical factors and wrong terms cannot be detected.'],
  ['Random errors can be removed completely by using a better instrument.', 'random errors are reduced by taking many readings and averaging, not removed by changing the instrument.'],
  ['Accuracy and precision mean the same thing.', 'accuracy is closeness to the true value; precision is the resolution (closeness of repeated readings).'],
  ['When two quantities are subtracted, their absolute errors are also subtracted.', 'absolute errors always add, for a sum as well as a difference.'],
  ['The kilogram, newton and second are all SI base units.', 'the newton is a derived unit; the kilogram and second are base units.'],
  ['Dimensional analysis can find the value of numerical constants such as 2π.', 'dimensionless constants cannot be found by dimensional analysis.']
], { correct: 3, incorrect: 3, two: 4, count: 3 });

/* ---------- 2. Motion in a Straight Line ---------- */
C = 'Motion in a Straight Line';
gen(C, [[5, 2, 10], [0, 4, 5], [10, 3, 4], [2, 1, 8], [8, 2, 6], [0, 6, 4]], (u, a, t) => [
  `A body moving along a straight line has initial velocity ${u} m/s and uniform acceleration ${a} m/s². The distance it covers in ${t} s is`,
  u * t + a * t * t / 2, 'm', [u * t + a * t * t, u * t + a * t / 2, (u + a * t) * t],
  `s = ut + ½at² = ${u}×${t} + ½×${a}×${t}² = <b>${f(u * t + a * t * t / 2)} m</b>.`]);
gen(C, [[20, 5], [30, 6], [15, 3], [25, 5], [40, 8]], (u, a) => [
  `A car moving at ${u} m/s is brought to rest by a uniform retardation of ${a} m/s². The distance travelled before it stops is`,
  u * u / (2 * a), 'm', [u * u / a, u / a, u * u / (4 * a)],
  `v² = u² − 2as with v = 0 ⇒ s = u²/2a = ${u}²/(2×${a}) = <b>${f(u * u / (2 * a))} m</b>.`]);
gen(C, [[0, 4, 3], [2, 2, 5], [5, 4, 4], [0, 10, 2], [3, 2, 6]], (u, a, n) => [
  `A particle starts with velocity ${u} m/s and moves with uniform acceleration ${a} m/s². The distance covered in the ${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'} second is`,
  u + a * (2 * n - 1) / 2, 'm', [u * n + a * n * n / 2, u + a * n, u + a * (2 * n + 1) / 2],
  `s<sub>n</sub> = u + (a/2)(2n − 1) = ${u} + (${a}/2)(${2 * n - 1}) = <b>${f(u + a * (2 * n - 1) / 2)} m</b>.`]);
gen(C, [[45], [80], [125], [180], [20]], h => [
  `A stone is dropped from the top of a tower ${h} m high. The time it takes to reach the ground is (g = 10 m/s²)`,
  sq(2 * h / 10), 's', [sq(h / 10), 2 * h / 10, sq(4 * h / 10)],
  `h = ½gt² ⇒ t = √(2h/g) = √(2×${h}/10) = <b>${f(sq(2 * h / 10))} s</b>.`, 'easy']);
gen(C, [[20], [30], [40], [50], [25]], u => [
  `A ball is thrown vertically upwards with a speed of ${u} m/s. The maximum height it reaches is (g = 10 m/s²)`,
  u * u / 20, 'm', [u * u / 10, u / 10, u * u / 40],
  `At the top v = 0: H = u²/2g = ${u}²/20 = <b>${f(u * u / 20)} m</b>.`]);
gen(C, [[20], [30], [15], [45]], u => [
  `A ball thrown vertically upwards with ${u} m/s returns to the thrower's hand. Its total time of flight is (g = 10 m/s²)`,
  2 * u / 10, 's', [u / 10, 4 * u / 10, u * u / 20],
  `Time up = u/g; time of flight = 2u/g = 2×${u}/10 = <b>${f(2 * u / 10)} s</b>.`]);
gen(C, [[30, 60], [40, 60], [20, 30], [10, 40], [36, 54]], (v1, v2) => [
  `A car covers the first half of a distance at ${v1} km/h and the second half at ${v2} km/h. Its average speed for the whole journey is`,
  2 * v1 * v2 / (v1 + v2), 'km/h', [(v1 + v2) / 2, sq(v1 * v2), v2 - v1 + v1 / 2],
  `For equal distances the average speed is the harmonic mean: 2v₁v₂/(v₁ + v₂) = 2×${v1}×${v2}/${v1 + v2} = <b>${f(2 * v1 * v2 / (v1 + v2))} km/h</b> (not the simple average).`]);
gen(C, [[54, 36, 150], [72, 54, 200], [90, 36, 300]], (a, b, L) => [
  `Two trains, each ${L} m long, move on parallel tracks in the same direction at ${a} km/h and ${b} km/h. The time taken by the faster train to completely pass the slower one is`,
  2 * L / ((a - b) * 5 / 18), 's', [L / ((a - b) * 5 / 18), 2 * L / ((a + b) * 5 / 18), 2 * L / (a - b)],
  `Relative speed = ${a} − ${b} = ${a - b} km/h = ${f((a - b) * 5 / 18)} m/s. Distance to cover = sum of lengths = ${2 * L} m. t = ${2 * L}/${f((a - b) * 5 / 18)} = <b>${f(2 * L / ((a - b) * 5 / 18))} s</b>.`]);
mcs(C, [
  ['The slope of the position–time graph of a body gives its', 'velocity', 'acceleration', 'displacement', 'distance', 'Slope of x–t graph = dx/dt = <b>velocity</b>.'],
  ['The area under the velocity–time graph of a body gives its', 'displacement', 'acceleration', 'speed', 'force', 'Area under v–t graph = ∫v dt = <b>displacement</b>.'],
  ['The velocity–time graph of a body moving with uniform acceleration is', 'a straight line inclined to the time axis', 'a parabola', 'a straight line parallel to the time axis', 'a hyperbola', 'v = u + at is linear in t, so the graph is a <b>straight line with slope a</b>.'],
  ['For a body moving with uniform acceleration, its position–time graph is', 'a parabola', 'a straight line', 'a circle', 'a hyperbola', 'x = ut + ½at² is quadratic in t: the x–t graph is a <b>parabola</b>.'],
  ['A body is thrown vertically upward. At the highest point', 'velocity is zero and acceleration is g downward', 'velocity and acceleration are both zero', 'velocity is maximum and acceleration is zero', 'acceleration changes direction', 'At the top v = 0, but gravity still acts: <b>a = g downwards</b> throughout the flight.'],
  ['Which of the following can be zero when the speed of a body is not zero?', 'Average velocity over a closed path', 'Instantaneous speed', 'Distance travelled', 'Magnitude of instantaneous velocity', 'After returning to the start, displacement — and so <b>average velocity</b> — is zero although the average speed is not.'],
  ['The displacement of a particle is x = 3t² + 2t + 5 (x in m, t in s). Its velocity at t = 2 s is', '14 m/s', '12 m/s', '21 m/s', '16 m/s', 'v = dx/dt = 6t + 2 = 6×2 + 2 = <b>14 m/s</b>.', 'medium'],
  ['The velocity of a particle is v = 4t³ − 2t (SI units). Its acceleration at t = 1 s is', '10 m/s²', '2 m/s²', '12 m/s²', '4 m/s²', 'a = dv/dt = 12t² − 2 = 12 − 2 = <b>10 m/s²</b>.', 'medium'],
  ['Galileo\'s law of odd numbers: for a body falling freely from rest, the distances covered in successive equal intervals of time are in the ratio', '1 : 3 : 5 : 7', '1 : 2 : 3 : 4', '1 : 4 : 9 : 16', '1 : 1 : 1 : 1', 'Distance in the nth interval ∝ (2n − 1): <b>1 : 3 : 5 : 7 …</b>'],
  ['A body falls freely from rest. The ratio of distances covered in the first 1 s, first 2 s and first 3 s is', '1 : 4 : 9', '1 : 3 : 5', '1 : 2 : 3', '1 : 8 : 27', 's = ½gt² ∝ t²: <b>1 : 4 : 9</b>.']
]);
st(C, [
  'The magnitude of displacement is never greater than the distance travelled.',
  'A body can have zero velocity and non-zero acceleration at the same instant.',
  'Speedometer of a car measures instantaneous speed.',
  'For motion in one direction with no reversal, the magnitude of displacement equals the distance.',
  'The slope of the velocity–time graph gives acceleration.',
  'Negative acceleration does not always mean the body is slowing down.'
], [
  ['Average speed is always equal to the magnitude of average velocity.', 'average speed ≥ |average velocity|; they are equal only for motion in one direction without reversal.'],
  ['A body moving with constant speed cannot have any acceleration.', 'in one dimension that is true, but a change of direction (e.g. reversal) gives acceleration even at constant speed.'],
  ['In free fall, a heavier body falls faster than a lighter one (in vacuum).', 'in the absence of air resistance all bodies fall with the same acceleration g.'],
  ['The area under an acceleration–time graph gives displacement.', 'it gives the change in velocity.'],
  ['A position–time graph can never be a curve for real motion.', 'it is a curve whenever the velocity changes (accelerated motion).']
], { correct: 2, incorrect: 3, two: 4, count: 2 });

/* ---------- 3. Motion in a Plane ---------- */
C = 'Motion in a Plane';
const sinD = d => Math.sin(d * PI / 180), cosD = d => Math.cos(d * PI / 180);
gen(C, [[20, 45], [10, 15], [30, 15], [20, 30], [40, 45], [10, 45]], (u, th) => [
  `A projectile is fired with speed ${u} m/s at ${th}° to the horizontal. Its horizontal range is (g = 10 m/s²)`,
  u * u * sinD(2 * th) / 10, 'm', [u * u * sinD(th) / 10, u * u / 10 * (th === 45 ? 0.5 : 1), u * u * sinD(2 * th) / 20],
  `R = u² sin 2θ / g = ${u}² × sin ${2 * th}° / 10 = <b>${f(u * u * sinD(2 * th) / 10)} m</b>.`]);
gen(C, [[20, 30], [40, 30], [20, 90], [30, 30], [10, 90]], (u, th) => [
  `A ball is projected with ${u} m/s at ${th}° to the horizontal. The maximum height it reaches is (g = 10 m/s²)`,
  (u * sinD(th)) ** 2 / 20, 'm', [(u * sinD(th)) ** 2 / 10, u * u / 20, u * sinD(th) / 10],
  `H = u² sin²θ / 2g = (${u} × sin ${th}°)² / 20 = <b>${f((u * sinD(th)) ** 2 / 20)} m</b>.`]);
gen(C, [[20, 30], [40, 30], [50, 30], [30, 90]], (u, th) => [
  `A body is projected at ${th}° to the horizontal with a speed of ${u} m/s. Its time of flight is (g = 10 m/s²)`,
  2 * u * sinD(th) / 10, 's', [u * sinD(th) / 10, 2 * u / 10, 2 * u * cosD(th) / 10],
  `T = 2u sin θ / g = 2 × ${u} × sin ${th}° / 10 = <b>${f(2 * u * sinD(th) / 10)} s</b>.`]);
gen(C, [[3, 4, 90], [5, 5, 60], [6, 8, 90], [10, 10, 120], [4, 4, 60]], (A, B, th) => [
  `Two forces of ${A} N and ${B} N act on a particle with an angle of ${th}° between them. The magnitude of their resultant is`,
  sq(A * A + B * B + 2 * A * B * cosD(th)), 'N', [A + B, Math.abs(A - B) || A / 2, sq(A * A + B * B)],
  `R = √(A² + B² + 2AB cos θ) = √(${A * A} + ${B * B} + 2×${A}×${B}×cos ${th}°) = <b>${f(sq(A * A + B * B + 2 * A * B * cosD(th)))} N</b>.`]);
gen(C, [[2, 0.5], [10, 1], [5, 0.5], [20, 2], [6, 0.3]], (v, r) => [
  `A particle moves in a circle of radius ${r} m with a constant speed of ${v} m/s. The magnitude of its acceleration is`,
  v * v / r, 'm/s²', [v / r, v * v * r, v * v / (2 * r)],
  `Uniform circular motion has only centripetal acceleration: a = v²/r = ${v}²/${r} = <b>${f(v * v / r)} m/s²</b>.`]);
gen(C, [[200, 4, 3], [300, 5, 2], [150, 3, 4], [400, 4, 1]], (d, vb, vr) => [
  `A river ${d} m wide flows at ${vr} m/s. A boat that can move at ${vb} m/s in still water is steered perpendicular to the bank. How far downstream does it land?`,
  vr * d / vb, 'm', [vb * d / vr, d / vb, vr * d / sq(vb * vb + vr * vr)],
  `Time to cross = d/v<sub>b</sub> = ${d}/${vb} = ${f(d / vb)} s. Drift = v<sub>r</sub> × t = ${vr} × ${f(d / vb)} = <b>${f(vr * d / vb)} m</b>.`]);
mcs(C, [
  ['For a projectile, the horizontal range is maximum when the angle of projection is', '45°', '30°', '60°', '90°', 'R = u² sin 2θ/g is largest when sin 2θ = 1, i.e. <b>θ = 45°</b>.'],
  ['At the highest point of the path of a projectile (no air resistance), the', 'velocity is horizontal and acceleration is g downwards', 'velocity is zero', 'acceleration is zero', 'velocity and acceleration are parallel', 'Only the vertical component of velocity becomes zero; the horizontal component u cos θ remains, and acceleration is <b>g downwards</b>.'],
  ['Two angles of projection that give the same horizontal range for the same speed are', 'θ and (90° − θ)', 'θ and (180° − θ)', 'θ and 2θ', 'θ and (45° + θ)', 'sin 2θ = sin(180° − 2θ) = sin 2(90° − θ): complementary angles give the <b>same range</b>.'],
  ['The path of a projectile, with air resistance neglected, is a', 'parabola', 'circle', 'ellipse', 'straight line', 'y = x tan θ − gx²/(2u² cos²θ) is the equation of a <b>parabola</b>.'],
  ['In uniform circular motion,', 'speed is constant but velocity changes', 'velocity is constant', 'acceleration is constant in direction', 'no force acts on the body', 'The direction of velocity changes continuously, so the body is accelerated (towards the centre) though its <b>speed is constant</b>.'],
  ['The angle between two vectors A and B is θ. The magnitude of their resultant is the largest when θ is', '0°', '90°', '180°', '45°', 'R² = A² + B² + 2AB cos θ is largest when cos θ = 1, i.e. <b>θ = 0°</b>.'],
  ['If |A + B| = |A − B|, the angle between A and B is', '90°', '0°', '45°', '180°', '|A+B|² − |A−B|² = 4A·B = 0, so A ⊥ B: <b>90°</b>.', 'medium'],
  ['A unit vector has', 'magnitude 1 and no unit', 'magnitude 1 and the unit of the quantity', 'zero magnitude', 'only direction and no magnitude', 'A unit vector is dimensionless with <b>magnitude 1</b>; it only specifies a direction.'],
  ['The resultant of two vectors of magnitudes 3 and 5 can NOT be', '1', '2', '5', '8', 'The resultant lies between |5 − 3| = 2 and 5 + 3 = 8, so <b>1</b> is impossible.'],
  ['The angular speed of the minute hand of a clock is', 'π/1800 rad/s', 'π/30 rad/s', 'π/21600 rad/s', '2π rad/s', 'One revolution (2π) in 3600 s: ω = 2π/3600 = <b>π/1800 rad/s</b>.', 'medium']
]);
st(C, [
  'The horizontal component of the velocity of a projectile remains constant in the absence of air resistance.',
  'Scalars can be added only to scalars of the same kind.',
  'The centripetal acceleration of a body in uniform circular motion is directed towards the centre.',
  'For a projectile the time of ascent equals the time of descent when it lands at the level of projection.',
  'A vector can be resolved into components along any two perpendicular directions in a plane.',
  'Vector addition is commutative.'
], [
  ['Two vectors of unequal magnitude can give a zero resultant.', 'only equal and opposite vectors add to zero; for unequal ones at least three vectors are needed.'],
  ['The speed of a projectile is zero at the highest point.', 'only the vertical component is zero; the horizontal component remains.'],
  ['Vector subtraction is commutative.', 'A − B = −(B − A); subtraction is not commutative.'],
  ['In uniform circular motion the acceleration is constant.', 'its magnitude is constant but its direction keeps changing, so the acceleration vector is not constant.'],
  ['The maximum height of a projectile is greatest for an angle of 45°.', 'the maximum height is greatest for vertical projection (90°); 45° gives the greatest range.']
], { correct: 2, incorrect: 2, two: 4, count: 2 });

/* ---------- 4. Laws of Motion ---------- */
C = 'Laws of Motion';
gen(C, [[5, 3, 40], [4, 6, 50], [2, 8, 30], [10, 5, 60], [3, 3, 24]], (m1, m2, F) => [
  `Two blocks of masses ${m1} kg and ${m2} kg are in contact on a smooth horizontal surface. A horizontal force of ${F} N pushes the ${m1} kg block. The force exerted by the ${m1} kg block on the ${m2} kg block is`,
  m2 * F / (m1 + m2), 'N', [m1 * F / (m1 + m2), F, F / 2 === m2 * F / (m1 + m2) ? F / 3 : F / 2],
  `a = F/(m₁ + m₂) = ${F}/${m1 + m2} = ${f(F / (m1 + m2))} m/s². The contact force accelerates only the ${m2} kg block: N = ${m2} × ${f(F / (m1 + m2))} = <b>${f(m2 * F / (m1 + m2))} N</b>.`]);
gen(C, [[3, 2], [5, 3], [6, 4], [4, 1], [7, 3]], (m1, m2) => [
  `Two masses of ${m1} kg and ${m2} kg are tied to the ends of a light string passing over a frictionless pulley (Atwood machine). The acceleration of the system is (g = 10 m/s²)`,
  (m1 - m2) * 10 / (m1 + m2), 'm/s²', [(m1 - m2) * 10 / m1, (m1 + m2) * 10 / (m1 - m2), 10 * m2 / (m1 + m2)],
  `a = (m₁ − m₂)g/(m₁ + m₂) = (${m1} − ${m2})×10/${m1 + m2} = <b>${f((m1 - m2) * 10 / (m1 + m2))} m/s²</b>.`]);
gen(C, [[3, 2], [5, 3], [6, 4], [4, 1]], (m1, m2) => [
  `Masses of ${m1} kg and ${m2} kg hang at the two ends of a string over a light frictionless pulley. The tension in the string is (g = 10 m/s²)`,
  2 * m1 * m2 * 10 / (m1 + m2), 'N', [m1 * 10, m2 * 10, (m1 - m2) * 10],
  `T = 2m₁m₂g/(m₁ + m₂) = 2×${m1}×${m2}×10/${m1 + m2} = <b>${f(2 * m1 * m2 * 10 / (m1 + m2))} N</b>.`]);
gen(C, [[60, 2, 'upwards'], [50, 3, 'upwards'], [70, 2, 'downwards'], [40, 5, 'downwards'], [80, 1.5, 'upwards']], (m, a, dir) => [
  `A person of mass ${m} kg stands on a weighing machine in a lift that accelerates ${dir} at ${a} m/s². The reading of the machine is equivalent to (g = 10 m/s²)`,
  dir === 'upwards' ? m * (10 + a) : m * (10 - a), 'N', [dir === 'upwards' ? m * (10 - a) : m * (10 + a), m * 10, m * a],
  `Normal reaction N = m(g ${dir === 'upwards' ? '+' : '−'} a) = ${m}(10 ${dir === 'upwards' ? '+' : '−'} ${a}) = <b>${f(dir === 'upwards' ? m * (10 + a) : m * (10 - a))} N</b>.`, 'easy']);
gen(C, [[0.02, 400, 4], [0.05, 300, 5], [0.01, 500, 2], [0.04, 250, 10]], (m, v, M) => [
  `A gun of mass ${M} kg fires a bullet of mass ${m * 1000} g with a speed of ${v} m/s. The recoil speed of the gun is`,
  m * v / M, 'm/s', [M * v / m / 1000, m * v, v / M],
  `Momentum is conserved: M V = m v ⇒ V = ${m} × ${v} / ${M} = <b>${f(m * v / M)} m/s</b>.`, 'easy']);
gen(C, [[0.5, 10, 0.02], [0.15, 20, 0.01], [0.2, 15, 0.05], [1, 5, 0.1]], (m, v, t) => [
  `A ball of mass ${m} kg moving at ${v} m/s hits a wall normally and rebounds with the same speed. If the contact lasts ${t} s, the average force on the ball is`,
  2 * m * v / t, 'N', [m * v / t, 2 * m * v, m * v * t],
  `Change in momentum = m v − (−m v) = 2mv = ${f(2 * m * v)} kg m/s. F = Δp/Δt = ${f(2 * m * v)}/${t} = <b>${f(2 * m * v / t)} N</b>.`]);
gen(C, [[10, 0.5, 60], [5, 0.4, 30], [8, 0.25, 40], [20, 0.3, 100]], (m, mu, F) => [
  `A ${m} kg block lies on a horizontal floor (coefficient of kinetic friction ${mu}). A horizontal force of ${F} N is applied. The acceleration of the block is (g = 10 m/s²)`,
  (F - mu * m * 10) / m, 'm/s²', [F / m, (F + mu * m * 10) / m, mu * 10],
  `Friction = μmg = ${mu}×${m}×10 = ${f(mu * m * 10)} N. a = (F − f)/m = (${F} − ${f(mu * m * 10)})/${m} = <b>${f((F - mu * m * 10) / m)} m/s²</b>.`]);
gen(C, [[90], [40], [160], [250], [10]], r => [
  `A curved road of radius ${r} m is banked at 45°. The speed at which a vehicle can take the curve with no friction needed is (g = 10 m/s²)`,
  sq(r * 10), 'm/s', [sq(r * 10 / 2), r * 10, sq(2 * r * 10)],
  `tan θ = v²/(rg) with tan 45° = 1 ⇒ v = √(rg) = √(${r}×10) = <b>${f(sq(r * 10))} m/s</b>.`]);
mcs(C, [
  ['Newton\'s first law of motion gives the concept of', 'inertia', 'energy', 'momentum', 'work', 'The first law says a body keeps its state of rest or uniform motion unless a net force acts — the property called <b>inertia</b>.'],
  ['The action and reaction forces of Newton\'s third law', 'act on different bodies', 'act on the same body', 'cancel each other', 'are always perpendicular', 'Action and reaction are equal and opposite but <b>act on different bodies</b>, so they never cancel.'],
  ['Impulse is equal to', 'change in momentum', 'rate of change of momentum', 'force × displacement', 'mass × acceleration', 'Impulse = F Δt = <b>Δp</b>.'],
  ['A cricketer lowers his hands while catching a ball in order to', 'increase the time of impact and reduce the force', 'reduce the change in momentum', 'increase the force', 'reduce the impulse', 'Δp is fixed; spreading it over a longer time reduces F = Δp/Δt.'],
  ['The coefficient of static friction is related to the angle of repose θ by', 'μ = tan θ', 'μ = sin θ', 'μ = cos θ', 'μ = cot θ', 'At the angle of repose mg sin θ = μ mg cos θ ⇒ <b>μ = tan θ</b>.'],
  ['Rolling friction is generally', 'much smaller than sliding friction', 'greater than sliding friction', 'equal to static friction', 'independent of the surfaces', 'That is why wheels and ball bearings are used: rolling friction is <b>much less</b> than sliding friction.'],
  ['A body of mass 2 kg is acted on by forces of 3 N and 4 N at right angles. Its acceleration is', '2.5 m/s²', '3.5 m/s²', '1.5 m/s²', '7 m/s²', 'Net force = √(3² + 4²) = 5 N; a = 5/2 = <b>2.5 m/s²</b>.', 'medium'],
  ['A man in a freely falling lift feels', 'weightless', 'twice his weight', 'his normal weight', 'half his weight', 'In free fall a = g, so N = m(g − g) = 0: <b>weightlessness</b>.'],
  ['The force needed to keep a body moving in a circle is provided, for a car on a level road, by', 'static friction between tyres and road', 'the engine', 'gravity', 'kinetic friction only', 'On a level road the centripetal force comes from <b>static friction</b> between tyres and road.'],
  ['Which of the following is a self-adjusting force?', 'Static friction', 'Kinetic friction', 'Gravitational force', 'Viscous force', '<b>Static friction</b> adjusts itself to equal the applied force, up to its limiting value μ<sub>s</sub>N.']
]);
st(C, [
  'Static friction can be zero when no external force tends to move the body.',
  'Momentum of an isolated system remains conserved.',
  'The limiting value of static friction is independent of the area of contact.',
  'Newton\'s second law is consistent with the first law: F = 0 implies a = 0.',
  'Force is required to change the velocity of a body, not to keep it moving uniformly.',
  'Kinetic friction is nearly independent of the speed of sliding.'
], [
  ['Action and reaction forces cancel each other because they are equal and opposite.', 'they act on different bodies, so they never cancel.'],
  ['The coefficient of kinetic friction is generally greater than the coefficient of static friction.', 'μ<sub>k</sub> is generally less than μ<sub>s</sub>.'],
  ['A body moving in a circle at constant speed needs no net force.', 'a net centripetal force mv²/r is needed.'],
  ['Friction always opposes motion and can never cause it.', 'friction opposes relative motion; it can cause motion, e.g. it lets us walk and drives a car forward.'],
  ['Mass is a measure of the inertia of a body only when it is at rest.', 'mass measures inertia at rest and in motion.']
], { correct: 2, incorrect: 2, two: 3, count: 2 });
ar(C, [
  ['A passenger in a bus is thrown backwards when the bus suddenly starts.', 'The lower part of the body moves with the bus while the upper part tends to remain at rest due to inertia.', 0, 'Both are true and the inertia of rest of the upper body explains the backward jerk.'],
  ['It is easier to pull a lawn roller than to push it.', 'Pulling at an angle reduces the normal reaction and hence the friction.', 0, 'Pulling adds an upward component (N = mg − F sin θ), so friction is less; R explains A.'],
  ['The apparent weight of a person in a lift moving down with uniform velocity is less than the true weight.', 'The acceleration of a lift moving with uniform velocity is zero.', 3, 'With uniform velocity a = 0, so apparent weight = true weight; A is false, R is true.']
]);

/* ---------- 5. Work, Energy and Power ---------- */
C = 'Work, Energy and Power';
gen(C, [[10, 5, 60], [20, 4, 0], [15, 10, 60], [8, 6, 90], [25, 2, 0]], (F, d, th) => [
  `A force of ${F} N acts on a body that moves ${d} m. The angle between the force and the displacement is ${th}°. The work done by the force is`,
  F * d * cosD(th), 'J', [F * d, F * d * sinD(th) || F * d / 2, F / d],
  `W = F d cos θ = ${F} × ${d} × cos ${th}° = <b>${f(F * d * cosD(th))} J</b>.${th === 90 ? ' A force perpendicular to the displacement does no work.' : ''}`]);
gen(C, [[2, 10], [4, 5], [0.5, 20], [10, 3], [1, 8]], (m, p) => [
  `A body of mass ${m} kg has a linear momentum of ${p} kg m/s. Its kinetic energy is`,
  p * p / (2 * m), 'J', [p * p / m, p / (2 * m), p * p * m / 2],
  `K = p²/2m = ${p}²/(2×${m}) = <b>${f(p * p / (2 * m))} J</b>.`]);
gen(C, [[200, 0.1], [500, 0.04], [100, 0.2], [800, 0.05], [400, 0.15]], (k, x) => [
  `A spring of spring constant ${k} N/m is compressed by ${x * 100} cm. The elastic potential energy stored in it is`,
  k * x * x / 2, 'J', [k * x * x, k * x / 2, k * x * x * 2],
  `U = ½kx² = ½ × ${k} × (${x})² = <b>${f(k * x * x / 2)} J</b>.`]);
gen(C, [[100, 10, 20], [50, 20, 10], [200, 15, 30], [80, 30, 40]], (m, h, t) => [
  `A pump lifts ${m} kg of water to a height of ${h} m in ${t} s. The power delivered (g = 10 m/s²) is`,
  m * 10 * h / t, 'W', [m * h / t, m * 10 * h * t, m * 10 * h / t / 1000 + 1],
  `P = mgh/t = ${m}×10×${h}/${t} = <b>${f(m * 10 * h / t)} W</b>.`, 'easy']);
gen(C, [[2, 2, 6], [1, 3, 8], [3, 1, 4], [4, 4, 10]], (m1, m2, u) => [
  `A ball of mass ${m1} kg moving at ${u} m/s collides head-on and elastically with a ball of mass ${m2} kg at rest. The speed of the second ball after the collision is`,
  2 * m1 * u / (m1 + m2), 'm/s', [m1 * u / (m1 + m2), u * m1 / m2 === 2 * m1 * u / (m1 + m2) ? u / 2 : u * m1 / m2, (m1 - m2) * u / (m1 + m2) || u / 3],
  `For a 1-D elastic collision with m₂ at rest: v₂ = 2m₁u/(m₁ + m₂) = 2×${m1}×${u}/${m1 + m2} = <b>${f(2 * m1 * u / (m1 + m2))} m/s</b>.${m1 === m2 ? ' Equal masses exchange velocities.' : ''}`]);
gen(C, [[2, 3, 10], [1, 4, 5], [5, 5, 8], [3, 1, 12]], (m1, m2, u) => [
  `A body of mass ${m1} kg moving at ${u} m/s strikes and sticks to a body of mass ${m2} kg at rest. The kinetic energy lost in the collision is`,
  m1 * m2 * u * u / (2 * (m1 + m2)), 'J', [m1 * u * u / 2, m1 * m1 * u * u / (2 * (m1 + m2)), m1 * m2 * u * u / (m1 + m2)],
  `Common velocity v = m₁u/(m₁+m₂) = ${f(m1 * u / (m1 + m2))} m/s. Loss = ½m₁u² − ½(m₁+m₂)v² = m₁m₂u²/[2(m₁+m₂)] = <b>${f(m1 * m2 * u * u / (2 * (m1 + m2)))} J</b>.`]);
gen(C, [[1.6], [2.5], [0.9], [3.6], [4.9]], r => [
  `A small body tied to a string of length ${r} m is whirled in a vertical circle. The minimum speed at the lowest point for it to just complete the circle is (g = 10 m/s²)`,
  sq(5 * 10 * r), 'm/s', [sq(10 * r), sq(2 * 10 * r), sq(3 * 10 * r)],
  `At the top the minimum speed is √(gr); energy conservation gives v<sub>low</sub> = √(5gr) = √(5×10×${r}) = <b>${f(sq(50 * r))} m/s</b>.`]);
mcs(C, [
  ['The work done by a centripetal force on a body in uniform circular motion is', 'zero', 'positive', 'negative', 'mv²', 'The force is always perpendicular to the displacement, so W = F d cos 90° = <b>0</b>.'],
  ['If the momentum of a body is doubled, its kinetic energy becomes', '4 times', '2 times', '8 times', 'half', 'K = p²/2m ∝ p²: doubling p makes K <b>4 times</b>.'],
  ['If the kinetic energy of a body increases by 300%, its momentum increases by', '100%', '300%', '200%', '50%', 'K becomes 4K ⇒ p ∝ √K becomes 2p: an increase of <b>100%</b>.', 'medium'],
  ['In a perfectly inelastic collision', 'momentum is conserved but kinetic energy is not', 'both momentum and kinetic energy are conserved', 'neither is conserved', 'kinetic energy is conserved but momentum is not', 'Momentum is always conserved in a collision; in an inelastic one some KE turns into heat, sound or deformation.'],
  ['The coefficient of restitution for a perfectly elastic collision is', '1', '0', 'between 0 and 1', 'greater than 1', 'e = relative speed of separation / relative speed of approach = <b>1</b> for an elastic collision.'],
  ['The work–energy theorem states that the work done by the net force on a body equals the', 'change in its kinetic energy', 'change in its potential energy', 'total mechanical energy', 'change in momentum', 'W<sub>net</sub> = ΔK.'],
  ['The SI unit of power is the watt, which equals', '1 J s<sup>−1</sup>', '1 J s', '1 N m s', '1 kg m s<sup>−1</sup>', 'Power = work/time: 1 W = <b>1 J s⁻¹</b>.'],
  ['One kilowatt-hour equals', '3.6 × 10<sup>6</sup> J', '3.6 × 10<sup>3</sup> J', '1000 J', '3600 J', '1 kWh = 1000 W × 3600 s = <b>3.6 × 10⁶ J</b>.'],
  ['The potential energy of a system increases when', 'work is done against a conservative force', 'work is done by a conservative force', 'kinetic energy increases', 'friction acts', 'ΔU = −W<sub>conservative</sub>; doing work <b>against</b> a conservative force stores potential energy.'],
  ['Which of the following forces is non-conservative?', 'Friction', 'Gravity', 'Spring force', 'Electrostatic force', 'Work done by <b>friction</b> depends on the path, so it is non-conservative.']
]);
st(C, [
  'Work done by a conservative force over a closed path is zero.',
  'Kinetic energy can never be negative.',
  'In an elastic collision the total kinetic energy before and after the collision is the same.',
  'Power is the scalar product of force and velocity.',
  'Gravitational potential energy near the earth is mgh, measured from a chosen reference level.'
], [
  ['Work done by friction is always negative.', 'friction can do positive work, e.g. on a box on an accelerating truck.'],
  ['Potential energy cannot be negative.', 'its value depends on the reference; gravitational PE, for example, is negative with zero at infinity.'],
  ['In every collision kinetic energy is conserved.', 'kinetic energy is conserved only in elastic collisions; momentum is conserved in all.'],
  ['Work is a vector quantity.', 'work is the scalar product F·d, a scalar.'],
  ['A body at rest cannot have any energy.', 'it can have potential energy (and rest-mass energy).']
], { correct: 2, incorrect: 2, two: 3, count: 2 });

/* ---------- 6. System of Particles and Rotational Motion ---------- */
C = 'System of Particles and Rotational Motion';
gen(C, [[2, 0, 3, 5], [1, 0, 4, 10], [3, 2, 1, 6], [5, 0, 5, 4], [4, 1, 2, 7]], (m1, x1, m2, x2) => [
  `Two particles of masses ${m1} kg and ${m2} kg are placed on the x-axis at x = ${x1} m and x = ${x2} m. The x-coordinate of their centre of mass is`,
  (m1 * x1 + m2 * x2) / (m1 + m2), 'm', [(x1 + x2) / 2, (m2 * x1 + m1 * x2) / (m1 + m2), (m1 * x1 + m2 * x2) / Math.max(m1, m2)],
  `x<sub>cm</sub> = (m₁x₁ + m₂x₂)/(m₁ + m₂) = (${m1}×${x1} + ${m2}×${x2})/${m1 + m2} = <b>${f((m1 * x1 + m2 * x2) / (m1 + m2))} m</b>.`, 'easy']);
gen(C, [[2, 0.5, 'disc', 0.5], [4, 0.2, 'ring', 1], [5, 0.4, 'solid sphere', 0.4], [3, 1, 'disc', 0.5], [1, 0.5, 'ring', 1], [10, 0.1, 'solid sphere', 0.4]], (M, R, body, k) => [
  `The moment of inertia of a uniform ${body} of mass ${M} kg and radius ${R} m about its ${body === 'solid sphere' ? 'diameter' : 'central axis perpendicular to its plane'} is`,
  k * M * R * R, 'kg m²', [M * R * R === k * M * R * R ? M * R * R / 2 : M * R * R, 0.4 * M * R * R === k * M * R * R ? 2 / 3 * M * R * R : 0.4 * M * R * R, k * M * R],
  `I = ${k === 1 ? 'MR²' : k === 0.5 ? '½MR²' : '(2/5)MR²'} = ${k} × ${M} × ${R}² = <b>${f(k * M * R * R)} kg m²</b>.`]);
gen(C, [[2, 10, 4], [4, 6, 2], [1, 20, 5], [5, 4, 10]], (I1, w1, I2) => [
  `A body rotating freely with angular speed ${w1} rad/s has moment of inertia ${I1} kg m². With no external torque its moment of inertia changes to ${I2} kg m². Its new angular speed is`,
  I1 * w1 / I2, 'rad/s', [I2 * w1 / I1, w1, w1 * sq(I1 / I2)],
  `Angular momentum is conserved: I₁ω₁ = I₂ω₂ ⇒ ω₂ = ${I1}×${w1}/${I2} = <b>${f(I1 * w1 / I2)} rad/s</b>.`]);
gen(C, [[2, 4, 'solid sphere', 0.4], [5, 2, 'ring', 1], [4, 3, 'disc', 0.5], [10, 1, 'solid sphere', 0.4], [3, 6, 'disc', 0.5]], (m, v, body, k) => [
  `A ${body} of mass ${m} kg rolls without slipping with a speed of ${v} m/s. Its total kinetic energy is`,
  m * v * v * (1 + k) / 2, 'J', [m * v * v / 2, m * v * v * k / 2, m * v * v * (1 + k)],
  `K = ½mv²(1 + k²/R²) with k²/R² = ${k}: K = ½×${m}×${v}²×${1 + k} = <b>${f(m * v * v * (1 + k) / 2)} J</b>.`]);
gen(C, [[5, 0.5, 2], [2, 0.2, 4], [10, 0.4, 5], [8, 0.25, 1]], (F, r, I) => [
  `A force of ${F} N is applied tangentially to the rim of a wheel of radius ${r} m whose moment of inertia is ${I} kg m². The angular acceleration produced is`,
  F * r / I, 'rad/s²', [F / I, F * r * I, F / (r * I)],
  `τ = F r = ${f(F * r)} N m; α = τ/I = ${f(F * r)}/${I} = <b>${f(F * r / I)} rad/s²</b>.`]);
pr(C, 'Body (axis)', 'Moment of inertia', [
  ['Thin ring (central axis ⟂ plane)', 'MR<sup>2</sup>'], ['Uniform disc (central axis ⟂ plane)', 'MR<sup>2</sup>/2'], ['Solid sphere (diameter)', '2MR<sup>2</sup>/5'],
  ['Thin rod (⟂ axis through centre)', 'ML<sup>2</sup>/12'], ['Thin rod (⟂ axis through one end)', 'ML<sup>2</sup>/3']
], { list: 3, right: 2, wrong: 2, direct: 4, ask: l => `The moment of inertia of a ${l.replace(/^(\w)/, c => c.toLowerCase())} of mass M is` });
mcs(C, [
  ['The centre of mass of a system of particles moves', 'as if all the mass were concentrated there and all external forces acted there', 'only when internal forces act', 'always with constant velocity', 'in a circle', 'M a<sub>cm</sub> = F<sub>ext</sub>: internal forces cannot change the motion of the centre of mass.'],
  ['A shell explodes in mid-air. The centre of mass of the fragments', 'continues along the original parabolic path', 'stops at once', 'moves vertically down', 'moves horizontally', 'The explosion forces are internal; gravity alone acts, so the c.m. <b>continues on the same parabola</b>.'],
  ['The angular momentum of a system is conserved when', 'the net external torque is zero', 'the net external force is zero', 'the moment of inertia is constant', 'the angular velocity is constant', 'dL/dt = τ<sub>ext</sub>; L is constant when <b>τ<sub>ext</sub> = 0</b>.'],
  ['A ballet dancer spins faster when she pulls her arms in because', 'her moment of inertia decreases and angular momentum is conserved', 'her angular momentum increases', 'her mass decreases', 'gravity provides a torque', 'L = Iω constant: smaller I means larger ω.'],
  ['Torque is the rotational analogue of', 'force', 'mass', 'momentum', 'work', 'τ = Iα parallels F = ma: torque is the analogue of <b>force</b>.'],
  ['Which body reaches the bottom of an inclined plane first when all roll down without slipping from rest at the same height?', 'Solid sphere', 'Ring', 'Disc', 'Hollow sphere', 'a = g sin θ/(1 + k²/R²); the smallest k²/R² (2/5 for a solid sphere) gives the largest acceleration.', 'medium'],
  ['For a body in rolling without slipping, the point of contact with the ground is', 'instantaneously at rest', 'moving with speed 2v', 'moving with speed v', 'moving backwards with speed v', 'v<sub>contact</sub> = v<sub>cm</sub> − ωR = 0 for pure rolling.'],
  ['The ratio of rotational to translational kinetic energy of a rolling solid sphere is', '2 : 5', '1 : 2', '1 : 1', '2 : 7', 'K<sub>rot</sub>/K<sub>trans</sub> = k²/R² = <b>2/5</b>.', 'medium'],
  ['The radius of gyration of a uniform disc of radius R about its central perpendicular axis is', 'R/√2', 'R', 'R/2', '√(2/5) R', 'I = MR²/2 = Mk² ⇒ <b>k = R/√2</b>.', 'medium'],
  ['The moment of inertia of a body does NOT depend on', 'its angular velocity', 'its mass', 'the distribution of mass', 'the position of the axis', 'I = Σmr² depends on mass and its distribution about the axis, not on the <b>angular velocity</b>.']
]);
st(C, [
  'The centre of mass of a body may lie outside the body, as for a ring.',
  'Internal forces cannot change the total linear momentum of a system.',
  'For a rigid body in pure translation every particle has the same velocity.',
  'The angular momentum of a particle about a point is r × p.',
  'The theorem of parallel axes is I = I<sub>cm</sub> + Md².'
], [
  ['The centre of mass must always coincide with the centre of gravity.', 'they coincide only in a uniform gravitational field.'],
  ['Moment of inertia is the same about every axis of a body.', 'it depends on the axis chosen.'],
  ['A body with zero net force cannot rotate.', 'a couple gives zero net force but a non-zero torque, so the body can have angular acceleration.'],
  ['Torque and work have the same unit and are both scalars.', 'they have the same dimensions, but torque is a vector and work a scalar.'],
  ['In rolling without slipping the frictional force always does positive work.', 'static friction at the contact point does no work in pure rolling, because that point does not move.']
], { correct: 2, incorrect: 2, two: 3, count: 2 });

/* ---------- 7. Gravitation ---------- */
C = 'Gravitation';
gen(C, [[32, 'height'], [64, 'height'], [16, 'height'], [640, 'depth'], [1600, 'depth'], [3200, 'depth']], (h, kind) => [
  `Taking the radius of the earth as 6400 km and g = 10 m/s² at the surface, the acceleration due to gravity at a ${kind} of ${h} km is`,
  kind === 'height' ? 10 * (1 - 2 * h / 6400) : 10 * (1 - h / 6400), 'm/s²', kind === 'height' ? [10 * (1 - h / 6400), 10 * (1 + 2 * h / 6400), 10 * (1 - 4 * h / 6400)] : [10 * (1 - 2 * h / 6400), 10 * (1 + h / 6400), 10 * (1 - h / 6400) ** 2],
  kind === 'height' ? `For h ≪ R: g′ = g(1 − 2h/R) = 10(1 − ${2 * h}/6400) = <b>${f(10 * (1 - 2 * h / 6400))} m/s²</b>.` : `At depth d: g′ = g(1 − d/R) = 10(1 − ${h}/6400) = <b>${f(10 * (1 - h / 6400))} m/s²</b>.`]);
gen(C, [[2, 2], [4, 2], [9, 3], [0.5, 0.5], [8, 2]], (mR, rR) => [
  `A planet has ${mR} times the mass and ${rR} times the radius of the earth. If g on earth is 10 m/s², the acceleration due to gravity on its surface is`,
  10 * mR / (rR * rR), 'm/s²', [10 * mR / rR, 10 * mR * rR * rR, 10 * rR / mR],
  `g = GM/R² ⇒ g′ = g × (M′/M)/(R′/R)² = 10 × ${mR}/${rR}² = <b>${f(10 * mR / (rR * rR))} m/s²</b>.`]);
gen(C, [[4, 2], [9, 3], [2, 1], [8, 2], [16, 4]], (mR, rR) => [
  `The escape speed from the earth is 11.2 km/s. For a planet with ${mR} times the mass and ${rR} times the radius of the earth, the escape speed is`,
  11.2 * sq(mR / rR), 'km/s', [11.2 * mR / rR, 11.2 * sq(mR * rR), 11.2 * mR / (rR * rR)],
  `v<sub>e</sub> = √(2GM/R) ∝ √(M/R): v′ = 11.2 × √(${mR}/${rR}) = <b>${f(11.2 * sq(mR / rR))} km/s</b>.`]);
gen(C, [[4, 1], [9, 1], [1, 4], [16, 2]], (r2, T1) => [
  `A satellite revolves around a planet with a period of ${T1} day${T1 > 1 ? 's' : ''}. A second satellite orbits the same planet at ${r2} times the orbital radius. Its period is`,
  T1 * Math.pow(r2, 1.5), 'days', [T1 * r2, T1 * r2 * r2, T1 * sq(r2)],
  `Kepler's third law: T² ∝ r³ ⇒ T₂ = T₁ (r₂/r₁)<sup>3/2</sup> = ${T1} × ${r2}<sup>3/2</sup> = <b>${f(T1 * Math.pow(r2, 1.5))} days</b>.`]);
mcs(C, [
  ['The value of the universal gravitational constant G is about', '6.67 × 10<sup>−11</sup> N m² kg<sup>−2</sup>', '9.8 N kg<sup>−1</sup>', '6.67 × 10<sup>11</sup> N m² kg<sup>−2</sup>', '6.67 × 10<sup>−9</sup> N m² kg<sup>−2</sup>', '<b>G ≈ 6.67 × 10⁻¹¹ N m² kg⁻²</b>, first measured by Cavendish.'],
  ['Kepler\'s second law (law of areas) is a consequence of conservation of', 'angular momentum', 'linear momentum', 'energy', 'mass', 'Gravity is a central force: no torque about the sun, so <b>angular momentum</b> is conserved and equal areas are swept in equal times.'],
  ['The value of g at the centre of the earth is', 'zero', 'maximum', 'the same as at the surface', 'infinite', 'g(d) = g(1 − d/R) = <b>0</b> at d = R.'],
  ['The escape speed of a body from the earth does NOT depend on', 'the mass of the body', 'the mass of the earth', 'the radius of the earth', 'the value of G', 'v<sub>e</sub> = √(2GM/R) is independent of the <b>mass of the body</b> and of the direction of projection.'],
  ['The relation between orbital speed v<sub>o</sub> near the earth\'s surface and escape speed v<sub>e</sub> is', 'v<sub>e</sub> = √2 v<sub>o</sub>', 'v<sub>e</sub> = 2 v<sub>o</sub>', 'v<sub>o</sub> = √2 v<sub>e</sub>', 'v<sub>e</sub> = v<sub>o</sub>', 'v<sub>o</sub> = √(GM/R), v<sub>e</sub> = √(2GM/R) ⇒ <b>v<sub>e</sub> = √2 v<sub>o</sub></b>.'],
  ['The total energy of a satellite in a circular orbit of radius r is', '−GMm/2r', '−GMm/r', 'GMm/2r', 'zero', 'K = GMm/2r, U = −GMm/r ⇒ E = <b>−GMm/2r</b>.', 'medium'],
  ['The time period of a geostationary satellite is', '24 hours', '12 hours', '1 hour', '365 days', 'It must keep pace with the earth\'s rotation: <b>24 h</b>, in the equatorial plane, moving west to east.'],
  ['Astronauts in an orbiting satellite feel weightless because', 'they and the satellite fall freely with the same acceleration', 'gravity is zero there', 'they are outside the atmosphere', 'the satellite is at rest', 'Both are in free fall towards the earth, so there is no normal reaction: apparent weightlessness.'],
  ['The value of g at the poles compared to the equator is', 'greater', 'smaller', 'equal', 'zero', 'At the poles R is smaller and there is no centrifugal effect of rotation, so g is <b>greater</b>.'],
  ['If the distance between two masses is doubled, the gravitational force between them becomes', 'one-fourth', 'half', 'double', 'four times', 'F ∝ 1/r²: doubling r gives <b>F/4</b>.']
]);
st(C, [
  'Gravitational force is always attractive.',
  'The gravitational force between two bodies does not depend on the medium between them.',
  'The orbital speed of a satellite does not depend on its own mass.',
  'Gravitational potential energy of two masses is negative with zero at infinite separation.',
  'The binding energy of a satellite equals the magnitude of its total energy.'
], [
  ['The value of g increases as we go deeper into the earth.', 'g decreases linearly with depth (uniform-density model) and is zero at the centre.'],
  ['A geostationary satellite can be placed over any point on the earth.', 'it must be above the equator, in the equatorial plane.'],
  ['Escape speed depends on the angle at which a body is projected.', 'escape speed does not depend on the direction of projection.'],
  ['Planets move fastest when they are farthest from the sun.', 'by the law of areas they move fastest at perihelion (nearest point).'],
  ['The period of a satellite is independent of the radius of its orbit.', 'T² ∝ r³: a larger orbit has a longer period.']
], { correct: 2, incorrect: 2, two: 3, count: 2 });

/* ---------- 8. Mechanical Properties of Solids ---------- */
C = 'Mechanical Properties of Solids';
gen(C, [[100, 2, 1e-6, 2e11], [200, 1, 2e-6, 1e11], [500, 3, 5e-6, 2e11], [50, 4, 1e-6, 1e11], [300, 2, 3e-6, 2e11]], (F, L, A, Y) => [
  `A wire of length ${L} m and cross-sectional area ${f(A)} m² is stretched by a force of ${F} N. If its Young's modulus is ${f(Y)} N/m², the extension produced is`,
  F * L / (A * Y) * 1000, 'mm', [F / (A * Y) * 1000, F * L / (A * Y) * 1e6, F * L * A / Y * 1e9 || F * L / (A * Y) * 100],
  `ΔL = FL/(AY) = ${F}×${L}/(${f(A)}×${f(Y)}) = ${f(F * L / (A * Y))} m = <b>${f(F * L / (A * Y) * 1000)} mm</b>.`]);
gen(C, [[2, 1, 2], [1, 2, 1], [3, 1, 3], [2, 2, 1]], (Lr, rr, Fr) => [
  `Two wires A and B are made of the same material. A is ${Lr} times as long as B and its radius is ${rr === 1 ? 'equal to' : rr + ' times'} that of B. If the force on A is ${Fr === 1 ? 'the same as' : Fr + ' times'} that on B, the ratio of extensions ΔL<sub>A</sub>/ΔL<sub>B</sub> is`,
  Fr * Lr / (rr * rr), '', [Fr * Lr / rr, Fr * Lr * rr * rr, Lr / (Fr * rr * rr)],
  `ΔL = FL/(πr²Y) ∝ FL/r²: ratio = ${Fr}×${Lr}/${rr}² = <b>${f(Fr * Lr / (rr * rr))}</b>.`]);
gen(C, [[1e8, 2e11], [2e8, 1e11], [4e7, 2e11], [3e8, 1.5e11]], (stress, Y) => [
  `A wire is under a tensile stress of ${f(stress)} N/m². Its Young's modulus is ${f(Y)} N/m². The elastic potential energy stored per unit volume is`,
  stress * stress / (2 * Y), 'J/m³', [stress * stress / Y, stress / (2 * Y), stress * Y / 2 / 1e18],
  `u = ½ × stress × strain = stress²/(2Y) = (${f(stress)})²/(2×${f(Y)}) = <b>${f(stress * stress / (2 * Y))} J/m³</b>.`]);
mcs(C, [
  ['Which is more elastic, steel or rubber?', 'Steel, because it has a larger Young\'s modulus', 'Rubber, because it stretches more', 'Both are equally elastic', 'Neither is elastic', 'Elasticity is measured by the modulus: steel needs a much larger stress for the same strain, so <b>steel is more elastic</b>.'],
  ['Hooke\'s law states that, within the elastic limit,', 'stress is proportional to strain', 'stress is proportional to strain²', 'stress is inversely proportional to strain', 'strain is constant', 'Within the proportional limit, <b>stress ∝ strain</b>; the constant is the modulus of elasticity.'],
  ['The bulk modulus of a perfectly rigid body is', 'infinite', 'zero', '1', 'between 0 and 1', 'A rigid body does not change volume at all: ΔV = 0 ⇒ B = ΔP/(ΔV/V) → <b>∞</b>.'],
  ['Strain is', 'dimensionless', 'measured in N/m²', 'measured in metres', 'measured in N', 'Strain is a ratio of two similar quantities (ΔL/L), so it has <b>no unit and no dimensions</b>.'],
  ['The modulus of rigidity (shear modulus) of a liquid is', 'zero', 'infinite', 'equal to its bulk modulus', 'very large', 'Liquids cannot resist a shearing stress, so the shear modulus is <b>zero</b>.'],
  ['The reciprocal of bulk modulus is called', 'compressibility', 'Poisson\'s ratio', 'rigidity', 'strain', 'k = 1/B is the <b>compressibility</b>.'],
  ['The point on a stress–strain curve beyond which the wire does not regain its original length is the', 'yield point (elastic limit)', 'fracture point', 'origin', 'proportional limit only', 'Beyond the <b>elastic limit / yield point</b> the deformation is permanent (plastic).'],
  ['Elastomers such as the tissue of the aorta', 'show large strain but no well-defined plastic region', 'obey Hooke\'s law up to fracture', 'have a very high Young\'s modulus', 'cannot be stretched', 'The stress–strain curve of an elastomer is non-linear and it can be stretched a lot, but there is no well-defined plastic region.'],
  ['Young\'s modulus of a wire depends on', 'the material only', 'the length of the wire', 'the area of cross-section', 'the load applied', 'Y is a property of the <b>material</b>; length, area and load change the extension, not Y.'],
  ['When a wire is stretched to double its length (assume elastic), the strain is', '1', '2', '0.5', 'zero', 'Strain = ΔL/L = L/L = <b>1</b>.', 'medium']
]);
st(C, [
  'Stress has the same dimensions as pressure.',
  'Solids have all three moduli of elasticity; liquids and gases have only a bulk modulus.',
  'The Young\'s modulus of a material does not depend on the dimensions of the wire.',
  'Within the elastic limit the work done in stretching a wire is stored as elastic potential energy.'
], [
  ['Rubber is more elastic than steel.', 'steel has a far greater Young\'s modulus; it is more elastic.'],
  ['Strain has the unit N/m².', 'strain is a ratio and has no unit.'],
  ['The shear modulus of a liquid is very large.', 'liquids cannot sustain shear stress; their shear modulus is zero.'],
  ['Young\'s modulus of a wire increases if its length is doubled.', 'Y depends only on the material.']
], { correct: 2, incorrect: 2, two: 3, count: 1 });

/* ---------- 9. Mechanical Properties of Fluids ---------- */
C = 'Mechanical Properties of Fluids';
gen(C, [[10], [20], [5], [50], [100]], h => [
  `The gauge pressure at a depth of ${h} m below the surface of water (density 1000 kg/m³, g = 10 m/s²) is`,
  1000 * 10 * h, 'Pa', [1000 * h, 1000 * 10 * h + 1e5, 100 * h],
  `Gauge pressure = ρgh = 1000 × 10 × ${h} = <b>${f(1e4 * h)} Pa</b>. (Absolute pressure would add the atmospheric pressure.)`, 'easy']);
gen(C, [[10, 0.01, 0.5], [20, 0.02, 1], [50, 0.005, 0.25], [100, 0.01, 2]], (F1, A1, A2) => [
  `In a hydraulic lift the small piston has area ${A1} m² and the large piston ${A2} m². A force of ${F1} N on the small piston can support a load of`,
  F1 * A2 / A1, 'N', [F1 * A1 / A2, F1 * A2, F1 * sq(A2 / A1)],
  `Pascal's law: F₁/A₁ = F₂/A₂ ⇒ F₂ = ${F1} × ${A2}/${A1} = <b>${f(F1 * A2 / A1)} N</b>.`]);
gen(C, [[5], [20], [1.8], [45], [0.8]], h => [
  `Water flows out of a small hole ${h} m below the free surface of water in a wide open tank. The speed of efflux is (g = 10 m/s²)`,
  sq(2 * 10 * h), 'm/s', [sq(10 * h), 2 * 10 * h, sq(4 * 10 * h)],
  `Torricelli's law: v = √(2gh) = √(2×10×${h}) = <b>${f(sq(20 * h))} m/s</b>.`, 'easy']);
gen(C, [[2, 3, 1], [4, 2, 2], [1, 5, 0.5], [3, 6, 3]], (v1, d1, d2) => [
  `Water flows through a horizontal pipe at ${v1} m/s where the diameter is ${d1} cm. Its speed where the diameter is ${d2} cm is`,
  v1 * (d1 / d2) ** 2, 'm/s', [v1 * d1 / d2, v1 * (d2 / d1) ** 2, v1 * d2 / d1],
  `Continuity: A₁v₁ = A₂v₂ with A ∝ d²: v₂ = ${v1} × (${d1}/${d2})² = <b>${f(v1 * (d1 / d2) ** 2)} m/s</b>.`]);
gen(C, [[0.07, 1, 'drop'], [0.035, 0.5, 'bubble'], [0.07, 2, 'bubble'], [0.05, 0.5, 'drop']], (T, rmm, kind) => [
  `The surface tension of a liquid is ${T} N/m. The excess pressure inside a ${kind === 'drop' ? 'liquid drop' : 'soap bubble (two surfaces)'} of radius ${rmm} mm is`,
  (kind === 'drop' ? 2 : 4) * T / (rmm / 1000), 'Pa', [(kind === 'drop' ? 4 : 2) * T / (rmm / 1000), T / (rmm / 1000), (kind === 'drop' ? 2 : 4) * T * (rmm / 1000) * 1e6],
  `${kind === 'drop' ? 'A drop has one surface: ΔP = 2T/r' : 'A soap bubble has two surfaces: ΔP = 4T/r'} = ${kind === 'drop' ? 2 : 4}×${T}/${rmm / 1000} = <b>${f((kind === 'drop' ? 2 : 4) * T / (rmm / 1000))} Pa</b>.`]);
gen(C, [[2, 1], [3, 2], [1, 3], [0.5, 2]], (rr, v1) => [
  `A small sphere falling through a viscous liquid attains a terminal velocity of ${v1} cm/s. Another sphere of the same material with ${rr} times the radius will attain a terminal velocity of`,
  v1 * rr * rr, 'cm/s', [v1 * rr, v1 * rr ** 3, v1 / rr],
  `From Stokes' law, v<sub>t</sub> = 2r²(ρ − σ)g/9η ∝ r²: v = ${v1} × ${rr}² = <b>${f(v1 * rr * rr)} cm/s</b>.`]);
mcs(C, [
  ['Bernoulli\'s principle is based on the conservation of', 'energy', 'mass', 'momentum', 'angular momentum', 'P + ½ρv² + ρgh = constant expresses <b>energy conservation</b> per unit volume of a flowing ideal fluid.'],
  ['The equation of continuity A v = constant is a consequence of conservation of', 'mass', 'energy', 'momentum', 'charge', 'For an incompressible fluid the mass flowing in per second equals that flowing out.'],
  ['The angle of contact for water and clean glass is', 'acute (nearly 0°)', '90°', 'obtuse', '180°', 'Water wets glass: the angle of contact is <b>acute</b>, so water rises in a glass capillary.'],
  ['Mercury in a glass capillary tube', 'falls below the outside level and has a convex meniscus', 'rises and has a concave meniscus', 'stays at the same level', 'rises and has a convex meniscus', 'Its angle of contact with glass is obtuse (≈ 140°), so the meniscus is <b>convex and mercury is depressed</b>.'],
  ['The surface tension of a liquid generally', 'decreases with rise in temperature', 'increases with rise in temperature', 'does not depend on temperature', 'becomes infinite at the boiling point', 'Surface tension <b>decreases as temperature rises</b>.'],
  ['The viscosity of a gas', 'increases with temperature', 'decreases with temperature', 'is independent of temperature', 'is zero', 'Unlike liquids (whose viscosity falls), the <b>viscosity of gases rises</b> with temperature.'],
  ['Flow of a fluid is streamlined when the Reynolds number is', 'less than about 1000', 'greater than about 2000', 'exactly 2000', 'negative', 'R<sub>e</sub> = ρvd/η; flow is streamlined for R<sub>e</sub> below about 1000 and turbulent above about 2000.'],
  ['The lift on an aeroplane wing is explained by', 'Bernoulli\'s principle', 'Pascal\'s law', 'Archimedes\' principle', 'Stokes\' law', 'Air flows faster over the curved upper surface, so pressure there is lower: <b>Bernoulli\'s principle</b>.'],
  ['The rise of a liquid in a capillary tube is', 'inversely proportional to the radius of the tube', 'directly proportional to the radius', 'independent of the radius', 'proportional to the square of the radius', 'h = 2T cos θ/(rρg) ∝ <b>1/r</b>.'],
  ['Hydraulic brakes and hydraulic lifts work on', 'Pascal\'s law', 'Bernoulli\'s principle', 'Archimedes\' principle', 'Hooke\'s law', 'Pressure applied to an enclosed fluid is transmitted undiminished: <b>Pascal\'s law</b>.']
]);
st(C, [
  'Pressure at a point in a fluid at rest is the same in all directions.',
  'Detergents lower the surface tension of water.',
  'Terminal velocity of a sphere in a viscous fluid is proportional to the square of its radius.',
  'At a given depth, the pressure in a liquid at rest does not depend on the shape of the container.'
], [
  ['Viscosity of liquids increases with increase in temperature.', 'viscosity of liquids decreases as temperature rises.'],
  ['Pressure is a vector quantity.', 'pressure is a scalar; force due to pressure acts normal to the surface.'],
  ['The excess pressure inside a soap bubble is 2T/r.', 'a soap bubble has two surfaces, so the excess pressure is 4T/r.'],
  ['In streamline flow the velocity of a fluid is greatest where the pipe is widest.', 'by continuity the velocity is greatest where the pipe is narrowest.']
], { correct: 2, incorrect: 2, two: 3, count: 1 });

/* ---------- 10. Thermal Properties of Matter ---------- */
C = 'Thermal Properties of Matter';
gen(C, [[2, 1.2e-5, 50], [10, 2e-5, 100], [5, 1.1e-5, 80], [1, 2.4e-5, 200], [20, 1e-5, 40]], (L, a, dT) => [
  `A rod of length ${L} m has a coefficient of linear expansion ${f(a)} K⁻¹. Its increase in length when heated through ${dT} °C is`,
  L * a * dT * 1000, 'mm', [a * dT * 1000, L * a * dT * 1e6, 2 * L * a * dT * 1000],
  `ΔL = αLΔT = ${f(a)} × ${L} × ${dT} = ${f(L * a * dT)} m = <b>${f(L * a * dT * 1000)} mm</b>.`]);
gen(C, [[100, 20, 200, 80], [50, 10, 150, 90], [200, 30, 100, 90], [300, 25, 100, 85]], (m1, t1, m2, t2) => [
  `${m1} g of water at ${t1} °C is mixed with ${m2} g of water at ${t2} °C. Neglecting heat losses, the final temperature of the mixture is`,
  (m1 * t1 + m2 * t2) / (m1 + m2), '°C', [(t1 + t2) / 2, (m2 * t1 + m1 * t2) / (m1 + m2), (m1 * t1 + m2 * t2) / (m1 + m2) + 5],
  `Heat lost = heat gained: ${m2}(${t2} − T) = ${m1}(T − ${t1}) ⇒ T = (${m1}×${t1} + ${m2}×${t2})/${m1 + m2} = <b>${f((m1 * t1 + m2 * t2) / (m1 + m2))} °C</b>.`]);
gen(C, [[10, 20], [5, 40], [20, 10], [50, 30]], (m, T) => [
  `The heat required to convert ${m} g of ice at 0 °C into water at ${T} °C is (latent heat of fusion 80 cal/g, specific heat of water 1 cal g⁻¹ °C⁻¹)`,
  m * 80 + m * T, 'cal', [m * T, m * 80, m * 80 - m * T],
  `Q = mL + mcΔT = ${m}×80 + ${m}×1×${T} = <b>${m * 80 + m * T} cal</b>.`]);
gen(C, [[27, 327], [127, 527], [-73, 127], [227, 727]], (t1, t2) => [
  `The temperature of a black body is raised from ${t1} °C to ${t2} °C. The power it radiates increases by a factor of`,
  ((t2 + 273) / (t1 + 273)) ** 4, '', [(t2 + 273) / (t1 + 273), ((t2 + 273) / (t1 + 273)) ** 2, (t2 / t1) ** 4],
  `Stefan's law P ∝ T⁴ (T in kelvin): (${t2 + 273}/${t1 + 273})⁴ = <b>${f(((t2 + 273) / (t1 + 273)) ** 4)}</b>.`]);
gen(C, [[500], [1000], [2000], [290], [5800]], T => [
  `Using Wien's constant b = 2.9 × 10⁻³ m K, the wavelength at which a black body at ${T} K radiates most strongly is`,
  2.9e-3 / T * 1e9, 'nm', [2.9e-3 * T * 1e3, 2.9e-3 / T * 1e6, 2.9e-3 / T * 1e10],
  `λ<sub>m</sub> = b/T = 2.9 × 10⁻³/${T} m = <b>${f(2.9e-3 / T * 1e9)} nm</b>.`]);
gen(C, [[40], [-40], [100], [25], [37]], c => [
  `A temperature of ${c} °C on the Fahrenheit scale is`,
  c * 9 / 5 + 32, '°F', [c * 5 / 9 + 32, c * 9 / 5, (c - 32) * 5 / 9],
  `F = (9/5)C + 32 = (9/5)(${c}) + 32 = <b>${f(c * 9 / 5 + 32)} °F</b>.`, 'easy']);
mcs(C, [
  ['The ratio of the coefficients of linear, area and volume expansion (α : β : γ) of a solid is', '1 : 2 : 3', '1 : 3 : 2', '3 : 2 : 1', '1 : 1 : 1', 'β = 2α and γ = 3α, so <b>α : β : γ = 1 : 2 : 3</b>.'],
  ['Water has its maximum density at', '4 °C', '0 °C', '100 °C', '−4 °C', 'Anomalous expansion: water contracts from 0 °C to <b>4 °C</b> and then expands.'],
  ['Heat transfer by convection is possible only in', 'fluids', 'solids', 'vacuum', 'metals', 'Convection needs actual movement of matter, which happens in <b>liquids and gases</b>.'],
  ['The mode of heat transfer that needs no material medium is', 'radiation', 'conduction', 'convection', 'all of these', 'Radiation travels as electromagnetic waves, even through vacuum (sunlight reaches us this way).'],
  ['According to Newton\'s law of cooling, the rate of cooling of a body is proportional to', 'the temperature difference between the body and its surroundings', 'the fourth power of its temperature', 'its mass', 'the square of the temperature difference', 'For small differences, dT/dt ∝ −(T − T<sub>s</sub>).'],
  ['The temperature at which the Celsius and Fahrenheit scales read the same is', '−40°', '40°', '0°', '−32°', 'F = 9C/5 + 32 = C ⇒ C = <b>−40</b>.', 'medium'],
  ['Specific heat capacity of water is high. This is why', 'water is used as a coolant in car radiators', 'water boils at 100 °C', 'ice floats on water', 'water expands on freezing', 'A large specific heat lets water absorb much heat with a small rise in temperature, which makes it a good <b>coolant</b>.'],
  ['Thermal conductivity of a material depends on', 'the nature of the material', 'its length', 'its area of cross-section', 'the temperature difference', 'k is a <b>property of the material</b>; length, area and temperature difference change only the rate of flow.'],
  ['During melting of ice at 0 °C', 'temperature stays constant while heat is absorbed', 'temperature rises steadily', 'heat is released', 'volume increases', 'Heat absorbed during a change of state (latent heat) does not raise the temperature.'],
  ['A black body is one that', 'absorbs all radiation falling on it', 'reflects all radiation', 'transmits all radiation', 'emits no radiation', 'A perfect black body <b>absorbs all</b> incident radiation (and is also the best emitter).']
]);
st(C, [
  'Good absorbers of radiation are also good emitters.',
  'The triple point of water is 273.16 K.',
  'Metals are good conductors of heat because of free electrons.',
  'Latent heat of vaporisation of water is greater than its latent heat of fusion.'
], [
  ['Water has its maximum density at 0 °C.', 'it is maximum at 4 °C.'],
  ['Convection can take place in vacuum.', 'convection needs a material medium (a fluid).'],
  ['The wavelength of maximum emission of a black body increases as its temperature rises.', 'by Wien\'s law λ<sub>m</sub>T = constant, so λ<sub>m</sub> decreases as T rises.'],
  ['Heat supplied during boiling raises the temperature of the water.', 'during a change of state the temperature stays constant.']
], { correct: 2, incorrect: 2, two: 3, count: 1 });

/* ---------- 11. Thermodynamics ---------- */
C = 'Thermodynamics';
gen(C, [[500, 200], [300, 100], [1000, 400], [800, -200], [250, 250]], (Q, W) => [
  `A gas absorbs ${Q} J of heat and does ${W >= 0 ? W + ' J of work on the surroundings' : -W + ' J of work is done on it'}. The change in its internal energy is`,
  Q - W, 'J', [Q + W, W - Q, Q],
  `First law: ΔU = Q − W (W = work done by the gas = ${W} J). ΔU = ${Q} − (${W}) = <b>${Q - W} J</b>.`, 'easy']);
gen(C, [[500, 300], [400, 300], [600, 400], [800, 200], [1000, 250]], (T1, T2) => [
  `A Carnot engine works between a source at ${T1} K and a sink at ${T2} K. Its efficiency is`,
  (1 - T2 / T1) * 100, '%', [T2 / T1 * 100, (1 - T1 / T2) * -100 / 2 + 1, (T1 - T2) / T2 * 100],
  `η = 1 − T₂/T₁ = 1 − ${T2}/${T1} = <b>${f((1 - T2 / T1) * 100)}%</b>.`]);
gen(C, [[300, 270], [300, 250], [310, 280], [300, 240]], (T1, T2) => [
  `A Carnot refrigerator takes heat from a cold space at ${T2} K and rejects it to a room at ${T1} K. Its coefficient of performance is`,
  T2 / (T1 - T2), '', [T1 / (T1 - T2), (T1 - T2) / T2, T1 / T2],
  `α = T₂/(T₁ − T₂) = ${T2}/${T1 - T2} = <b>${f(T2 / (T1 - T2))}</b>.`]);
gen(C, [[1e5, 2, 5], [2e5, 1, 3], [1e5, 0.5, 1.5], [3e5, 2, 4]], (P, V1, V2) => [
  `A gas expands at a constant pressure of ${f(P)} Pa from ${V1} m³ to ${V2} m³. The work done by the gas is`,
  P * (V2 - V1), 'J', [P * V2, P * (V2 + V1), P * (V2 - V1) / 2],
  `Isobaric work W = PΔV = ${f(P)} × (${V2} − ${V1}) = <b>${f(P * (V2 - V1))} J</b>.`, 'easy']);
gen(C, [[2, 300, 2], [1, 400, 4], [3, 300, 2], [2, 500, 8]], (n, T, r) => [
  `${n} mol of an ideal gas expands isothermally at ${T} K to ${r} times its initial volume. The work done by the gas is (R = 8.3 J mol⁻¹ K⁻¹, ln 2 = 0.693)`,
  n * 8.3 * T * Math.log(r), 'J', [n * 8.3 * T * r, n * 8.3 * T * Math.log(r) / 2, n * 8.3 * T],
  `W = nRT ln(V₂/V₁) = ${n}×8.3×${T}×ln ${r} = <b>${f(n * 8.3 * T * Math.log(r))} J</b>.`]);
mcs(C, [
  ['In an isothermal process for an ideal gas, the change in internal energy is', 'zero', 'equal to the heat supplied', 'equal to the work done', 'negative', 'Internal energy of an ideal gas depends only on temperature; constant T ⇒ <b>ΔU = 0</b>.'],
  ['In an adiabatic process', 'no heat enters or leaves the system', 'temperature stays constant', 'pressure stays constant', 'volume stays constant', 'Adiabatic means <b>Q = 0</b>; then ΔU = −W.'],
  ['The work done in a cyclic process is equal to', 'the net heat absorbed in the cycle', 'zero', 'the change in internal energy', 'the heat rejected', 'For a cycle ΔU = 0, so W = Q<sub>net</sub> (the area enclosed on the P–V diagram).'],
  ['The zeroth law of thermodynamics leads to the concept of', 'temperature', 'internal energy', 'entropy', 'work', 'Two systems each in thermal equilibrium with a third are in equilibrium with each other: they share a <b>temperature</b>.'],
  ['The adiabatic equation for an ideal gas is', 'PV<sup>γ</sup> = constant', 'PV = constant', 'P/T = constant', 'V/T = constant', 'For a quasi-static adiabatic process <b>PV<sup>γ</sup> = constant</b>.'],
  ['The efficiency of a Carnot engine can be 100% only if', 'the sink is at 0 K', 'the source is at 0 K', 'both are at the same temperature', 'never, under any conditions', 'η = 1 − T₂/T₁ = 1 needs T₂ = 0 K, which cannot be reached; formally the condition is <b>sink at 0 K</b>.', 'medium'],
  ['The second law of thermodynamics (Kelvin–Planck) says that', 'no engine can convert all the heat absorbed into work in a cycle', 'energy is conserved', 'heat flows from cold to hot by itself', 'entropy is zero at 0 K', 'No process is possible whose sole result is complete conversion of heat into work.'],
  ['For an isochoric (constant volume) process, the work done by a gas is', 'zero', 'PV', 'nRT', 'equal to ΔU', 'W = PΔV = 0 when ΔV = 0; all heat goes into internal energy.'],
  ['On a P–V diagram, the slope of an adiabatic curve compared with that of an isothermal curve at the same point is', 'γ times steeper', 'the same', 'smaller', 'γ times less steep', 'Adiabatic slope = −γP/V; isothermal slope = −P/V. The adiabatic is <b>γ times steeper</b>.', 'medium'],
  ['A process in which the system passes through a series of equilibrium states is', 'quasi-static', 'irreversible', 'cyclic', 'spontaneous', 'A <b>quasi-static</b> process is infinitely slow, so the system is always in equilibrium.']
]);
st(C, [
  'Internal energy is a state function.',
  'Heat and work are path functions.',
  'In free expansion of an ideal gas into vacuum, no work is done.',
  'A refrigerator transfers heat from a colder body to a hotter body using external work.'
], [
  ['In an adiabatic process the temperature of the gas remains constant.', 'temperature changes; it is heat transfer that is zero.'],
  ['Work done is a state function.', 'work depends on the path taken.'],
  ['The efficiency of a heat engine can exceed that of a Carnot engine working between the same temperatures.', 'no engine can be more efficient than a Carnot engine between the same two temperatures.'],
  ['In an isothermal expansion an ideal gas absorbs no heat.', 'it absorbs heat equal to the work it does (ΔU = 0).']
], { correct: 2, incorrect: 2, two: 3, count: 1 });

/* ---------- 12. Kinetic Theory ---------- */
C = 'Kinetic Theory';
gen(C, [[300, 1200], [200, 800], [400, 1600], [300, 2700], [100, 900]], (T1, T2) => [
  `The rms speed of the molecules of a gas at ${T1} K is v. At ${T2} K its rms speed is`,
  sq(T2 / T1), 'v', [T2 / T1, sq(T1 / T2), (T2 / T1) ** 2],
  `v<sub>rms</sub> = √(3RT/M) ∝ √T: ratio = √(${T2}/${T1}) = <b>${f(sq(T2 / T1))} v</b>.`]);
gen(C, [[2, 32], [4, 16], [2, 8], [16, 64], [1, 16]], (M1, M2) => [
  `At the same temperature, the ratio of the rms speeds of molecules of gases with molar masses ${M1} g/mol and ${M2} g/mol is`,
  sq(M2 / M1), ': 1', [M2 / M1, sq(M1 / M2), (M2 / M1) ** 2],
  `v<sub>rms</sub> ∝ 1/√M: v₁/v₂ = √(M₂/M₁) = √(${M2}/${M1}) = <b>${f(sq(M2 / M1))} : 1</b>.`]);
gen(C, [[300], [600], [400], [200]], T => [
  `The average translational kinetic energy of a gas molecule at ${T} K is (k<sub>B</sub> = 1.38 × 10⁻²³ J/K)`,
  1.5 * 1.38e-23 * T, 'J', [1.38e-23 * T, 3 * 1.38e-23 * T, 0.5 * 1.38e-23 * T],
  `E = (3/2)k<sub>B</sub>T = 1.5 × 1.38 × 10⁻²³ × ${T} = <b>${f(1.5 * 1.38e-23 * T)} J</b>. It depends only on temperature.`]);
pr(C, 'Gas', 'Ratio of specific heats γ = C<sub>p</sub>/C<sub>v</sub>', [
  ['Monatomic gas (e.g. He)', '5/3'], ['Rigid diatomic gas (e.g. O<sub>2</sub>, at room temperature)', '7/5'], ['Rigid non-linear polyatomic gas', '4/3'], ['Diatomic gas with vibration active', '9/7']
], { list: 2, right: 1, wrong: 1, direct: 3, ask: l => `For an ideal ${l.replace(/^(\w)/, c => c.toLowerCase())}, γ is` });
mcs(C, [
  ['The number of degrees of freedom of a rigid diatomic molecule at room temperature is', '5', '3', '6', '7', '3 translational + 2 rotational = <b>5</b>.'],
  ['According to the law of equipartition of energy, each degree of freedom of a molecule has an average energy of', '½ k<sub>B</sub>T', 'k<sub>B</sub>T', '(3/2) k<sub>B</sub>T', '2 k<sub>B</sub>T', 'Each quadratic term in the energy has average <b>½k<sub>B</sub>T</b>.'],
  ['C<sub>p</sub> − C<sub>v</sub> for one mole of an ideal gas equals', 'R', '2R', 'R/2', '3R/2', 'Mayer\'s relation: <b>C<sub>p</sub> − C<sub>v</sub> = R</b>.'],
  ['The molar specific heat at constant volume of a monatomic ideal gas is', '3R/2', '5R/2', 'R', '7R/2', 'Three translational degrees of freedom: U = (3/2)RT per mole ⇒ C<sub>v</sub> = <b>3R/2</b>.'],
  ['The pressure exerted by an ideal gas is P = (1/3)ρv<sub>rms</sub>². Here ρ is', 'the density of the gas', 'the number density', 'the molar mass', 'the mass of one molecule', 'From kinetic theory, P = ⅓ n m v̄² = ⅓ <b>ρ</b> v<sub>rms</sub>² with ρ = nm, the density.'],
  ['The mean free path of gas molecules', 'decreases as the number density increases', 'increases as pressure increases', 'does not depend on the size of the molecules', 'increases with molecular diameter', 'λ = 1/(√2 π d² n): more molecules per volume ⇒ <b>shorter</b> mean free path.'],
  ['At absolute zero (classically), the average kinetic energy of gas molecules would be', 'zero', 'maximum', 'infinite', 'equal to k<sub>B</sub>', 'Average KE ∝ T, so it would be <b>zero</b> at 0 K.'],
  ['Avogadro\'s hypothesis states that equal volumes of all gases at the same temperature and pressure contain', 'equal numbers of molecules', 'equal masses', 'equal densities', 'equal numbers of atoms', 'At the same T and P, <b>equal volumes have equal numbers of molecules</b>.'],
  ['The rms speed of gas molecules is related to the average speed v̄ and the most probable speed v<sub>mp</sub> as', 'v<sub>rms</sub> > v̄ > v<sub>mp</sub>', 'v<sub>mp</sub> > v̄ > v<sub>rms</sub>', 'v̄ > v<sub>rms</sub> > v<sub>mp</sub>', 'all three are equal', 'v<sub>rms</sub> : v̄ : v<sub>mp</sub> = √3 : √(8/π) : √2 ≈ 1.73 : 1.60 : 1.41.', 'medium']
]);
st(C, [
  'Average kinetic energy of gas molecules depends only on the absolute temperature.',
  'Collisions between molecules of an ideal gas are perfectly elastic.',
  'At a given temperature, lighter gas molecules move faster on average.',
  'An ideal gas obeys PV = nRT at all pressures and temperatures.'
], [
  ['The average kinetic energy of a gas molecule depends on the nature of the gas.', 'at a given temperature it is (3/2)k<sub>B</sub>T for every gas.'],
  ['The rms speed of molecules is doubled if the absolute temperature is doubled.', 'v<sub>rms</sub> ∝ √T; doubling T multiplies it by √2.'],
  ['For a monatomic gas γ = 7/5.', 'for a monatomic gas γ = 5/3; 7/5 is for a rigid diatomic gas.'],
  ['Intermolecular forces in an ideal gas are strongly attractive.', 'an ideal gas is assumed to have no intermolecular forces (except during collisions).']
], { correct: 2, incorrect: 2, two: 3, count: 1 });

/* ---------- 13. Oscillations ---------- */
C = 'Oscillations';
gen(C, [[1, 100], [4, 400], [0.5, 200], [2, 50], [9, 100]], (m, k) => [
  `A mass of ${m} kg attached to a spring of force constant ${k} N/m oscillates horizontally. Its time period is (take π = 3.14)`,
  2 * 3.14 * sq(m / k), 's', [2 * 3.14 * sq(k / m), 3.14 * sq(m / k), 2 * 3.14 * m / k],
  `T = 2π√(m/k) = 2×3.14×√(${m}/${k}) = <b>${f(2 * 3.14 * sq(m / k))} s</b>.`]);
gen(C, [[1, 'the Moon (g/6)', 6], [4, 'a lift accelerating up at g', 0.5], [1, 'a planet where g is 4 times', 0.25], [2.5, 'a planet where g is one-fourth', 4]], (T, place, k) => [
  `A simple pendulum has a time period of ${T} s on the earth. Its period at ${place} is`,
  T * sq(k), 's', [T * k, T / sq(k), T],
  `T ∝ 1/√g; g changes by 1/${f(k)}, so T′ = ${T} × √${f(k)} = <b>${f(T * sq(k))} s</b>.`]);
gen(C, [[0.1, 10], [0.05, 20], [0.2, 5], [0.04, 50]], (A, w) => [
  `A particle executes SHM with amplitude ${A} m and angular frequency ${w} rad/s. Its maximum speed is`,
  A * w, 'm/s', [A * w * w, A / w, A * w / 2],
  `v<sub>max</sub> = Aω = ${A} × ${w} = <b>${f(A * w)} m/s</b>.`, 'easy']);
gen(C, [[0.1, 10], [0.05, 20], [0.2, 5], [0.02, 100]], (A, w) => [
  `For a particle in SHM of amplitude ${A} m and angular frequency ${w} rad/s, the maximum acceleration is`,
  A * w * w, 'm/s²', [A * w, A * w * w * w, w * w],
  `a<sub>max</sub> = ω²A = ${w}² × ${A} = <b>${f(A * w * w)} m/s²</b>.`]);
gen(C, [[5, 3, 2], [10, 6, 1], [10, 8, 3], [13, 5, 2]], (A, x, w) => [
  `A particle in SHM has amplitude ${A} cm and angular frequency ${w} rad/s. Its speed when the displacement is ${x} cm is`,
  w * sq(A * A - x * x), 'cm/s', [w * (A - x), w * A, w * sq(A * A + x * x)],
  `v = ω√(A² − x²) = ${w}√(${A * A} − ${x * x}) = <b>${f(w * sq(A * A - x * x))} cm/s</b>.`]);
mcs(C, [
  ['In SHM the acceleration of a particle is', 'proportional to its displacement and directed towards the mean position', 'constant', 'maximum at the mean position', 'proportional to its velocity', 'a = −ω²x: proportional to displacement, always <b>towards the mean position</b>.'],
  ['The total energy of a particle executing SHM is proportional to', 'the square of the amplitude', 'the amplitude', 'the displacement', 'the time period', 'E = ½kA² = ½mω²A² ∝ <b>A²</b>.'],
  ['In SHM the kinetic energy is maximum at', 'the mean position', 'the extreme position', 'half the amplitude', 'every point equally', 'Speed is greatest at the <b>mean position</b>, where PE is zero.'],
  ['Two identical springs of constant k are connected in series. The effective spring constant is', 'k/2', '2k', 'k', 'k/4', '1/k<sub>s</sub> = 1/k + 1/k ⇒ <b>k<sub>s</sub> = k/2</b>.'],
  ['Two identical springs of constant k are connected in parallel. The effective spring constant is', '2k', 'k/2', 'k', '4k', 'k<sub>p</sub> = k + k = <b>2k</b>.'],
  ['The time period of a simple pendulum does NOT depend on', 'the mass of the bob', 'its length', 'the acceleration due to gravity', 'the place where it is used', 'T = 2π√(L/g) has no mass term (for small oscillations).'],
  ['If the length of a simple pendulum is increased four times, its time period becomes', 'twice', 'four times', 'half', 'unchanged', 'T ∝ √L: √4 = 2, so the period <b>doubles</b>.'],
  ['The phase difference between displacement and velocity of a particle in SHM is', 'π/2', 'π', 'zero', '2π', 'x = A sin ωt, v = Aω cos ωt = Aω sin(ωt + π/2): <b>π/2</b>.', 'medium'],
  ['The function sin ωt + cos ωt represents', 'a simple harmonic motion with period 2π/ω', 'a periodic but not simple harmonic motion', 'a non-periodic motion', 'SHM with period π/ω', 'sin ωt + cos ωt = √2 sin(ωt + π/4): <b>SHM, period 2π/ω</b>.', 'medium'],
  ['The function sin²ωt represents a periodic motion with period', 'π/ω', '2π/ω', 'π/2ω', '4π/ω', 'sin²ωt = ½(1 − cos 2ωt): angular frequency 2ω, period <b>π/ω</b>.', 'medium']
]);
st(C, [
  'Every simple harmonic motion is periodic, but not every periodic motion is simple harmonic.',
  'In SHM, the velocity is maximum at the mean position.',
  'At the extreme position of SHM, the potential energy is maximum.',
  'The time period of a spring–mass system does not depend on the acceleration due to gravity.'
], [
  ['Every periodic motion is simple harmonic.', 'only motions with a ∝ −x are simple harmonic; e.g. the motion of the earth around the sun is periodic but not SHM.'],
  ['In SHM the acceleration is maximum at the mean position.', 'acceleration is zero at the mean position and maximum at the extremes.'],
  ['The period of a simple pendulum increases with the mass of the bob.', 'the period does not depend on the mass of the bob.'],
  ['A pendulum clock taken to a hill-top gains time.', 'g is smaller there, so the period increases and the clock loses time.']
], { correct: 2, incorrect: 2, two: 3, count: 1 });

/* ---------- 14. Waves ---------- */
C = 'Waves';
gen(C, [[340, 680], [330, 330], [350, 500], [340, 170], [320, 1280]], (v, n) => [
  `A sound wave of frequency ${n} Hz travels in air at ${v} m/s. Its wavelength is`,
  v / n, 'm', [n / v, v * n / 1000, v / (2 * n)],
  `λ = v/ν = ${v}/${n} = <b>${f(v / n)} m</b>.`, 'easy']);
gen(C, [[100, 0.01], [36, 0.04], [64, 0.01], [400, 0.04], [90, 0.1]], (T, mu) => [
  `A string has a linear mass density of ${mu} kg/m and is under a tension of ${T} N. The speed of a transverse wave on it is`,
  sq(T / mu), 'm/s', [T / mu, sq(mu / T), T * mu],
  `v = √(T/μ) = √(${T}/${mu}) = <b>${f(sq(T / mu))} m/s</b>.`]);
gen(C, [[1, 200], [0.5, 340], [2, 400], [0.8, 320]], (L, v) => [
  `A string of length ${L} m is fixed at both ends. Transverse waves travel on it at ${v} m/s. Its fundamental frequency is`,
  v / (2 * L), 'Hz', [v / L, v / (4 * L), 2 * v / L],
  `For a string fixed at both ends, ν₁ = v/2L = ${v}/(2×${L}) = <b>${f(v / (2 * L))} Hz</b>.`]);
gen(C, [[0.5, 340], [0.85, 340], [1, 320], [0.25, 330]], (L, v) => [
  `An organ pipe of length ${L} m is closed at one end. If the speed of sound is ${v} m/s, its fundamental frequency is`,
  v / (4 * L), 'Hz', [v / (2 * L), 3 * v / (4 * L), v / L],
  `A pipe closed at one end has a node at the closed end and an antinode at the open end: λ = 4L, ν₁ = v/4L = <b>${f(v / (4 * L))} Hz</b>.`]);
gen(C, [[256, 260], [512, 508], [440, 444], [300, 305], [100, 103]], (a, b) => [
  `Two tuning forks of frequencies ${a} Hz and ${b} Hz are sounded together. The number of beats heard per second is`,
  Math.abs(a - b), '', [a + b, (a + b) / 2, Math.abs(a - b) * 2],
  `Beat frequency = |ν₁ − ν₂| = |${a} − ${b}| = <b>${Math.abs(a - b)}</b> per second.`, 'easy']);
mcs(C, [
  ['Sound waves in air are', 'longitudinal', 'transverse', 'electromagnetic', 'both longitudinal and transverse', 'Air can only be compressed and rarefied, so sound in air is <b>longitudinal</b>.'],
  ['A pipe open at both ends and of the same length as a pipe closed at one end has a fundamental frequency that is', 'twice that of the closed pipe', 'half that of the closed pipe', 'equal to that of the closed pipe', 'four times that of the closed pipe', 'Open pipe: v/2L; closed pipe: v/4L. The open pipe\'s fundamental is <b>twice</b>.', 'medium'],
  ['A pipe closed at one end produces', 'only odd harmonics', 'only even harmonics', 'all harmonics', 'no harmonics', 'ν<sub>n</sub> = (2n − 1)v/4L: <b>only odd harmonics</b>.'],
  ['The distance between two consecutive nodes in a stationary wave is', 'λ/2', 'λ', 'λ/4', '2λ', 'Nodes (and antinodes) are spaced <b>λ/2</b> apart; a node and the next antinode are λ/4 apart.'],
  ['Newton\'s formula for the speed of sound in air was corrected by Laplace, who assumed the process to be', 'adiabatic', 'isothermal', 'isobaric', 'isochoric', 'Compressions and rarefactions are too quick for heat exchange: v = √(γP/ρ), an <b>adiabatic</b> process.'],
  ['The speed of sound in a gas is proportional to', 'the square root of its absolute temperature', 'its absolute temperature', 'its pressure (at constant temperature)', 'the square of its temperature', 'v = √(γRT/M) ∝ <b>√T</b>; at constant T it does not depend on pressure.'],
  ['When a wave passes from one medium to another, the quantity that does NOT change is', 'frequency', 'wavelength', 'speed', 'amplitude always', 'The <b>frequency</b> is set by the source; speed and wavelength change.'],
  ['The equation y = 0.05 sin(20t − 4x) (SI units) represents a wave travelling with speed', '5 m/s', '80 m/s', '0.2 m/s', '20 m/s', 'Compare with y = A sin(ωt − kx): v = ω/k = 20/4 = <b>5 m/s</b> along +x.', 'medium'],
  ['Mechanical waves cannot travel through', 'vacuum', 'water', 'steel', 'air', 'Mechanical waves need a material medium; they cannot travel through <b>vacuum</b>.'],
  ['When a wave on a string is reflected from a rigid (fixed) end, it suffers a phase change of', 'π', 'zero', 'π/2', '2π', 'At a rigid boundary the reflected wave is inverted: phase change <b>π</b>.']
]);
st(C, [
  'Transverse waves can travel on a stretched string.',
  'In a stationary wave energy is not carried along the wave.',
  'The speed of sound in a gas does not depend on pressure if the temperature is constant.',
  'Beats are produced by superposition of two waves of slightly different frequencies.'
], [
  ['Sound travels faster in air than in steel.', 'sound is much faster in solids such as steel.'],
  ['Sound waves can travel through vacuum.', 'sound is a mechanical wave and needs a medium.'],
  ['A pipe closed at one end produces all harmonics.', 'it produces only odd harmonics.'],
  ['The speed of sound in air decreases as the temperature rises.', 'v ∝ √T, so it increases with temperature.']
], { correct: 2, incorrect: 2, two: 3, count: 1 });
})();

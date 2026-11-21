/* Mathematics.
   Real board layout (40 marks per part, 2 hours): Q1A 4x1, Q1B 4x1, Q2A any 2 of 3 (2m), Q2B any 4 of 5 (2m),
   Q3A any 1 of 2 (3m), Q3B any 2 of 4 (3m), Q4 any 2 of 3 (4m), Q5 any 1 of 2 (3m).
   Papers:  maths-2025-algebra, maths-2025-geometry  -> adapted from a third-party answer key (omtexclasses.com), NOT verified vs board PDF
            maths-mock-1                              -> original mock test in the same layout (Part 1 Algebra + Part 2 Geometry) */
(function () {
const base = window.mk;
const bld = pfx => { let n = 0; const id = () => pfx + (++n); return {
  mcq: (...a) => base.mcq(id(), ...a),
  num: (...a) => base.num(id(), ...a),
  numt: (m, c, q, acc, sol, tol, hint) => Object.assign(base.num(id(), m, c, q, acc, sol, hint), { tol }),
  self: (...a) => base.self(id(), ...a) }; };
const sec = (id, part, title, attempt, instruction, questions) => ({ id, part, title, attempt, instruction, questions });

const LE = 'Linear Equations in Two Variables', QE = 'Quadratic Equations', AP = 'Arithmetic Progression', FP = 'Financial Planning', PR = 'Probability', ST = 'Statistics';
const SI = 'Similarity', PY = 'Pythagoras Theorem', CI = 'Circle', CG = 'Co-ordinate Geometry', TR = 'Trigonometry', ME = 'Mensuration', GC = 'Geometric Constructions';

/* ================= 2025 ALGEBRA (adapted) ================= */
(function () {
  const { mcq, num, numt, self } = bld('a25-');
  window.PAPERS.push({
    id: 'maths-2025-algebra', subject: 'maths', kind: 'pyq', year: 2025, durationMin: 120,
    title: 'Mathematics Part 1 (Algebra) — Board 2025',
    desc: '40 marks · 2 hours · Q1–Q5 with "any N" choices. Adapted from a third-party answer key.',
    note: 'Typed from a third-party transcription (omtexclasses.com) of the 2025 Algebra paper; the board\'s own PDF was not available, so wording is paraphrased. Two items had no wording or data on the source page and were <b>reconstructed</b> to match the published answers: Q.2(B)(v) frequency table and Q.3(B)(iv) frequency table; Q.5(ii) was rewritten from its answer. The Q.4(iii) histogram and Q.5 graph are self-marked.',
    sections: [
      sec('q1a', 1, 'Q.1 (A) Choose the correct alternative', 4, 'Write the letter of the correct answer.', [
        mcq(1, LE, 'The order of the determinant <b>|1 2; 3 4|</b> (rows 1 2 and 3 4) is:', ['1 × 1', '2 × 2', '3 × 3', '4 × 4'], 1, 'The determinant has 2 rows and 2 columns, so its order is 2 × 2.'),
        mcq(1, QE, 'Which of the following is a quadratic equation?', ['5/x − 3 = x²', 'x(x + 5) = 2', 'n − 1 = 2n', '(1/x²)(x + 2) = x'], 1, 'x(x + 5) = 2 ⇒ x² + 5x − 2 = 0, which has degree 2.'),
        mcq(1, AP, 'The common difference of the A.P. 4, 4, 4, … is:', ['1', '8', '4', '0'], 3, 'd = t₂ − t₁ = 4 − 4 = 0.'),
        mcq(1, PR, 'Which of the following numbers <b>cannot</b> be a probability?', ['2/3', '15/10', '15%', '0.7'], 1, 'Probability lies between 0 and 1. 15/10 = 1.5 &gt; 1.')
      ]),
      sec('q1b', 1, 'Q.1 (B) Solve the following sub-questions', null, 'All four are compulsory (1 mark each).', [
        num(1, LE, 'From 2x + y = 7 and x + 2y = 11, find x + y.', ['6'], 'Adding: 3x + 3y = 18 ⇒ x + y = 6.'),
        num(1, AP, 'Find the first term of the sequence whose general term is tₙ = 3n − 4.', ['-1'], 't₁ = 3(1) − 4 = −1.'),
        num(1, FP, 'How many alpha-numeric characters are there in a GSTIN?', ['15'], 'A GSTIN has 15 characters.'),
        self(1, PR, 'Write the sample space when two coins are tossed together.', 'S = {HH, HT, TH, TT}.')
      ]),
      sec('q2a', 1, 'Q.2 (A) Complete the following activities', 2, 'Complete any two (2 marks each).', [
        self(2, LE, 'Complete the table for the equation x + 2y = 4: find y when x = −2 and when x = 2.', 'x = −2: −2 + 2y = 4 ⇒ y = 3. x = 2: 2 + 2y = 4 ⇒ y = 1. Points (−2, 3) and (2, 1).'),
        self(2, QE, 'Form a quadratic equation whose roots are 5 and 12.', 'Sum = 17, product = 60 ⇒ x² − 17x + 60 = 0.'),
        num(2, FP, 'The face value of a share is ₹ 20 and it is bought at a premium of ₹ 4. Find how many shares can be bought for ₹ 24,000.', ['1000'], 'MV = 20 + 4 = ₹ 24. Number of shares = 24,000 ÷ 24 = <b>1000</b>.')
      ]),
      sec('q2b', 1, 'Q.2 (B) Solve any four of the following', 4, 'Attempt any four (2 marks each).', [
        self(2, LE, 'Solve: x + y = 3 and 3x − 2y = 4.', 'Multiply the first by 2: 2x + 2y = 6. Add to the second: 5x = 10 ⇒ x = 2, y = 1. <b>(2, 1)</b>.'),
        self(2, QE, 'Solve by factorisation: m² + 14m + 13 = 0.', '(m + 1)(m + 13) = 0 ⇒ <b>m = −1 or m = −13</b>.'),
        num(2, AP, 'Find the 19<sup>th</sup> term of the A.P. 7, 13, 19, …', ['115'], 'a = 7, d = 6. t₁₉ = 7 + 18 × 6 = <b>115</b>.'),
        self(2, FP, 'Find the brokerage paid and the amount received if shares of market value ₹ 2000 are sold at a brokerage of 0.5%.', 'Brokerage = 0.5% of 2000 = ₹ 10. Amount received = 2000 − 10 = <b>₹ 1990</b>.'),
        num(2, ST, 'Find the mean time spent on study (hours) from the table: classes 0–2, 2–4, 4–6, 6–8, 8–10 with frequencies 8, 12, 20, 12, 8. <i>(table reconstructed to match the published answer)</i>', ['5'], 'Class marks 1, 3, 5, 7, 9: Σfx = 8 + 36 + 100 + 84 + 72 = 300, Σf = 60. Mean = 300/60 = <b>5 hours</b>.')
      ]),
      sec('q3a', 1, 'Q.3 (A) Complete the following activities', 1, 'Complete any one (3 marks).', [
        numt(3, FP, 'Shri Maniklal bought 300 shares of market value ₹ 120 each. The company paid a dividend of ₹ 7 per share. Find the rate of return on his investment (in %, to two decimals).', ['5.83'], 'Investment = 120 × 300 = ₹ 36,000. Dividend = 7 × 300 = ₹ 2,100. Rate of return = 2100/36000 × 100 = <b>5.83%</b>.', 0.01),
        num(3, PR, 'Two-digit numbers are formed from the digits 2, 3, 5 without repeating a digit. Find the probability that the number formed is odd.', ['2/3'], 'S = {23, 25, 32, 35, 52, 53}, n(S) = 6. Odd: {23, 25, 35, 53}, n(A) = 4. P = 4/6 = <b>2/3</b>.')
      ]),
      sec('q3b', 1, 'Q.3 (B) Solve any two of the following', 2, 'Attempt any two (3 marks each).', [
        self(3, LE, 'Solve by Cramer\'s rule: 4x + 3y = 18 and 3x − 2y = 5.', 'D = −8 − 9 = −17; Dx = −36 − 15 = −51; Dy = 20 − 54 = −34. x = −51/−17 = <b>3</b>, y = −34/−17 = <b>2</b>.'),
        self(3, QE, 'Solve x² − 2x − 3 = 0 using the quadratic formula.', 'a = 1, b = −2, c = −3. Δ = 4 + 12 = 16. x = (2 ± 4)/2 ⇒ <b>x = 3 or x = −1</b>.'),
        self(3, PR, 'A committee of two persons is to be chosen at random from 3 boys and 2 girls. Find the probability that (i) at least one is a girl, (ii) one is a boy and one is a girl.', 'n(S) = C(5,2) = 10. (i) No girl = C(3,2) = 3 ⇒ P(at least one girl) = 1 − 3/10 = <b>7/10</b>. (ii) 3 × 2 = 6 ⇒ P = 6/10 = <b>3/5</b>.'),
        num(3, ST, 'Find the median: classes 0–20, 20–40, 40–60, 60–80 with frequencies 18, 20, 12, 10. <i>(table reconstructed to match the published answer)</i>', ['32'], 'N = 60, N/2 = 30. Cumulative frequencies 18, 38 ⇒ median class 20–40. Median = L + (N/2 − cf)/f × h = 20 + (30 − 18)/20 × 20 = <b>32</b>.')
      ]),
      sec('q4', 1, 'Q.4 Solve any two of the following', 2, 'Attempt any two (4 marks each).', [
        num(4, QE, 'Find the value of m for which the equation (m − 12)x² + 2(m − 12)x + 2 = 0 has real and equal roots.', ['14'], 'Δ = 4(m−12)² − 8(m−12) = 0 ⇒ (m−12)(m−14) = 0. m = 12 makes the equation non-quadratic, so reject. <b>m = 14</b>.'),
        self(4, AP, 'A person borrowed ₹ 1000 and paid ₹ 140 as total interest. He repays the loan in 12 monthly instalments, each instalment ₹ 10 less than the previous one. Find the first and the last instalment.', 'Total repaid = 1140 = S₁₂ = 12/2 [2a + 11(−10)] ⇒ 2a − 110 = 190 ⇒ <b>a = ₹ 150</b>. Last = 150 − 110 = <b>₹ 40</b>.'),
        self(4, ST, 'The frequencies of five classes 0–10, 10–20, 20–30, 30–40, 40–50 are 25, x, 30, 2x and 65, and the total frequency is 180. Find x and draw a histogram.', '25 + x + 30 + 2x + 65 = 180 ⇒ 3x = 60 ⇒ <b>x = 20</b>. Frequencies 25, 20, 30, 40, 65. Histogram: adjacent rectangles of width 10 on the x-axis with those heights.')
      ]),
      sec('q5', 1, 'Q.5 Solve any one of the following', 1, 'Attempt any one (3 marks).', [
        self(3, LE, 'Draw the graphs of 2x = y + 2 and 4x + 3y = 24 on the same axes and find the area of the triangle formed by the two lines and the X-axis.', 'Solving: y = 2x − 2, 4x + 6x − 6 = 24 ⇒ x = 3, y = 4 ⇒ meet at (3, 4). X-axis points: (1, 0) and (6, 0). Area = ½ × 5 × 4 = <b>10 sq. units</b>.'),
        self(3, ST, '<i>(rewritten from the answer key)</i> The blood groups of persons in a locality are shown in a pie diagram with central angles A: 72°, AB: 18°, B: 108°, O: 162°. If 600 persons have blood group B, find the total number of persons and the percentage of each group.', 'B = 108/360 = 30% ⇒ total = 600 ÷ 0.30 = <b>2000</b>. Percentages: A 20%, AB 5%, B 30%, O 45%.')
      ])
    ]
  });
})();

/* ================= 2025 GEOMETRY (adapted) ================= */
(function () {
  const { mcq, num, numt, self } = bld('g25-');
  window.PAPERS.push({
    id: 'maths-2025-geometry', subject: 'maths', kind: 'pyq', year: 2025, durationMin: 120,
    title: 'Mathematics Part 2 (Geometry) — Board 2025',
    desc: '40 marks · 2 hours · Q1–Q5 with "any N" choices. Adapted from a third-party answer key.',
    note: 'Typed from a third-party transcription (omtexclasses.com) of the 2025 Geometry paper; the board\'s own PDF was not available, so wording is paraphrased. Figures are not copied from the original: where a figure can be drawn from the numbers in the question, a simple sketch (not to scale) is shown; otherwise the given lengths and setting are described in words, so check against your own copy of the paper. Construction questions are self-marked.',
    sections: [
      sec('q1a', 2, 'Q.1 (A) Choose the correct alternative', 4, 'Write the letter of the correct answer.', [
        mcq(1, PY, 'Which of the following is a Pythagorean triplet?', ['(1, 5, 10)', '(3, 4, 5)', '(2, 2, 2)', '(5, 5, 2)'], 1, '3² + 4² = 9 + 16 = 25 = 5².'),
        mcq(1, CI, '∠ACB is an inscribed angle in a circle with centre O, and ∠ACB = 65°. The measure of the arc AXB intercepted by it (the arc not containing C) is:', ['65°', '230°', '295°', '130°'], 3, 'Measure of arc = 2 × inscribed angle = 130°.'),
        mcq(1, CG, 'The distance of the point (3, 4) from the origin is:', ['7', '1', '5', '−5'], 2, '√(3² + 4²) = √25 = 5.'),
        mcq(1, ME, 'The radius of a cone is 5 cm and its perpendicular height is 12 cm. Its slant height is:', ['17 cm', '4 cm', '13 cm', '60 cm'], 2, 'l = √(5² + 12²) = √169 = 13 cm.')
      ]),
      sec('q1b', 2, 'Q.1 (B) Solve the following sub-questions', null, 'All four are compulsory (1 mark each).', [
        num(1, SI, 'In ΔABC, point D lies on side BC with BD = 7 and BC = 20. Find A(ΔABD) / A(ΔABC).', ['7/20'], 'Triangles with the same vertex A and bases on the same line BC: ratio of areas = ratio of bases = BD/BC = 7/20.'),
        num(1, SI, 'In right-angled ΔMNP, ∠MNP = 90° and NQ ⊥ MP with MQ = 9 and QP = 4. Find NQ.', ['6'], 'NQ² = MQ × QP = 36 ⇒ NQ = 6.'),
        num(1, CG, 'A line makes an angle of 30° with the positive X-axis. Find its slope. (write as a fraction with √3, e.g. 1/√3)', ['1/√3', '1/1.732', '0.577', '√3/3'], 'Slope = tan 30° = 1/√3.', '1/√3'),
        num(1, CI, 'ABCD is a cyclic quadrilateral and ∠A = 100°. Find ∠C. (in degrees)', ['80'], 'Opposite angles of a cyclic quadrilateral are supplementary: ∠C = 180° − 100° = 80°.')
      ]),
      sec('q2a', 2, 'Q.2 (A) Complete the following activities', 2, 'Complete any two (2 marks each).', [
        numt(2, CI, 'In a circle with centre P and radius 10 cm, chord AB subtends a right angle at P. Find the area of the minor sector (π = 3.14, in cm²).', ['78.5'], 'θ = 90°. Area = (90/360) × 3.14 × 10² = <b>78.5 cm²</b>.', 0.01),
        num(2, CI, 'Chords MN and RS of a circle intersect at D. RD = 15, DS = 4 and MD = 8. Find DN.', ['7.5'], 'MD × DN = RD × DS ⇒ 8 × DN = 60 ⇒ DN = 7.5.'),
        numt(2, TR, 'An observer stands 10 m from the foot of a tree and sees its top at an angle of elevation of 60°. Find the height of the tree (√3 = 1.73, in m).', ['17.3'], 'tan 60° = h/10 ⇒ h = 10√3 = 17.3 m.', 0.01)
      ]),
      sec('q2b', 2, 'Q.2 (B) Solve any four of the following', 4, 'Attempt any four (2 marks each).', [
        num(2, SI, 'In ΔABC, DE ∥ BC with D on AB and E on AC. DB = 5.4 cm, AD = 1.8 cm and EC = 7.2 cm. Find AE (in cm).', ['2.4'], 'By the basic proportionality theorem AD/DB = AE/EC ⇒ 1.8/5.4 = AE/7.2 ⇒ AE = 2.4 cm.'),
        self(2, TR, 'In ΔPSR, ∠S = 90°, ∠P = 30° and PR = 12. Find RS and PS.', '∠R = 60°. In a 30°–60°–90° triangle the side opposite 30° is half the hypotenuse: RS = 6. PS = RS × √3 = <b>6√3</b>.'),
        num(2, CI, 'A circle with centre D touches the sides of ∠ACB at A and B, and ∠ACB = 52°. Find ∠ADB (in degrees).', ['128'], 'DA ⊥ CA and DB ⊥ CB, so in quadrilateral ACBD: ∠ADB = 360° − 90° − 90° − 52° = 128°.'),
        self(2, CG, 'Check whether the points A(1, −3), B(2, −5), C(−4, 7) are collinear.', 'Slope AB = (−5 + 3)/(2 − 1) = −2. Slope BC = (7 + 5)/(−4 − 2) = −2. Equal slopes with common point B ⇒ <b>collinear</b>.'),
        num(2, TR, 'If sin θ = 11/61, find cos θ. (write as a fraction)', ['60/61'], 'cos²θ = 1 − 121/3721 = 3600/3721 ⇒ cos θ = 60/61.')
      ]),
      sec('q3a', 2, 'Q.3 (A) Complete the following activities', 1, 'Complete any one (3 marks).', [
        num(3, SI, 'In ΔABC, X lies on AB and Y lies on BC with XY ∥ AC, 2AX = 3BX and XY = 9. Find AC.', ['22.5'], 'AX/BX = 3/2 ⇒ AB/BX = 5/2. ΔBCA ~ ΔBYX (AA) ⇒ AC/XY = AB/BX = 5/2 ⇒ AC = 22.5.'),
        self(3, PY, 'Using Apollonius\' theorem, prove that in a rhombus the sum of the squares of the diagonals equals the sum of the squares of the four sides.', 'Let diagonals PR and QS of rhombus PQRS meet at T (the mid-point of both). Apollonius in ΔPQS (median PT): PQ² + PS² = 2PT² + 2QT². In ΔRQS (median RT): RQ² + RS² = 2RT² + 2QT². Add; PT = RT: PQ² + PS² + RQ² + RS² = 4PT² + 4QT² = (2PT)² + (2QT)² = PR² + QS². <b>Hence proved.</b>')
      ]),
      sec('q3b', 2, 'Q.3 (B) Solve any two of the following', 2, 'Attempt any two (3 marks each).', [
        self(3, CG, 'Show that P(1, −2), Q(5, 2), R(3, −1), S(−1, −5) are the vertices of a parallelogram.', 'Mid-point of diagonal PR = (2, −3/2). Mid-point of diagonal QS = (2, −3/2). Diagonals bisect each other ⇒ <b>PQRS is a parallelogram</b>.'),
        self(3, CI, 'Prove that the two tangent segments drawn to a circle from an external point are congruent.', 'Circle centre O; tangents PA, PB from P. Join OA, OB, OP. OA ⊥ PA, OB ⊥ PB. In right ΔOAP and ΔOBP: OA = OB (radii), OP = OP (common hypotenuse) ⇒ ΔOAP ≅ ΔOBP (hypotenuse–side) ⇒ <b>PA = PB</b>.'),
        self(3, GC, 'Draw a circle of radius 4.1 cm and construct tangents to it from a point P at a distance of 7.3 cm from the centre.', 'Draw the circle with centre O and radius 4.1 cm; mark P with OP = 7.3 cm. Draw the perpendicular bisector of OP to get the mid-point M. With centre M and radius MO draw an arc meeting the circle at A and B. Join PA and PB — these are the tangents. (Circle 1, P and bisector 1, tangents 1)'),
        num(3, ME, 'How many solid cylinders of radius 10 cm and height 6 cm can be made by melting a solid sphere of radius 30 cm?', ['60'], 'Sphere: 4/3 π × 30³ = 36000π. Cylinder: π × 10² × 6 = 600π. n = 36000/600 = <b>60</b>.')
      ]),
      sec('q4', 2, 'Q.4 Solve any two of the following', 2, 'Attempt any two (4 marks each).', [
        self(4, SI, 'In ΔABC, DE ∥ BC (D on AB, E on AC). (i) If DE = 4, BC = 8 and A(ΔADE) = 25, find A(ΔABC). (ii) If DE : BC = 3 : 5, find A(ΔADE) : A(quadrilateral DBCE).', '(i) ΔADE ~ ΔABC ⇒ A(ADE)/A(ABC) = (4/8)² = 1/4 ⇒ A(ABC) = <b>100</b>. (ii) A(ADE)/A(ABC) = 9/25. Let A(ADE) = 9k, A(ABC) = 25k ⇒ A(DBCE) = 16k ⇒ ratio <b>9 : 16</b>.'),
        self(4, GC, 'ΔABC ~ ΔPQR with AB = 3.6 cm, BC = 4 cm, AC = 4.2 cm and AB : PQ = 2 : 3. Construct ΔABC and ΔPQR.', 'PQ = 3.6 × 3/2 = 5.4, QR = 4 × 3/2 = 6.0, PR = 4.2 × 3/2 = 6.3 cm. Draw ΔABC (3.6, 4, 4.2) and ΔPQR (5.4, 6.0, 6.3) with the compass and ruler, keeping construction arcs. (ΔABC 2, ΔPQR 2)'),
        self(4, ME, 'A frustum of a cone has radii 14 cm and 8 cm and height 8 cm. Find (i) its curved surface area, (ii) its total surface area, (iii) its volume. (π = 3.14)', 'l = √(8² + 6²) = 10 cm. (i) CSA = π(14 + 8) × 10 = 3.14 × 220 = <b>690.8 cm²</b>. (ii) TSA = 690.8 + 3.14(14² + 8²) = 690.8 + 816.4 = <b>1507.2 cm²</b>. (iii) V = π h/3 (r₁² + r₂² + r₁r₂) = 3.14 × 8/3 × 372 = <b>3114.88 cm³</b>.')
      ]),
      sec('q5', 2, 'Q.5 Solve any one of the following', 1, 'Attempt any one (3 marks).', [
        self(3, SI, 'ABCD is a rectangle. AD is the diameter of a semicircle AXD which meets the diagonal BD at X. AB = 12 and AD = 9. Find BD and BX.', 'BD = √(12² + 9²) = <b>15</b>. In right ΔBAD, AX ⊥ BD, so by the leg rule AB² = BX × BD ⇒ 144 = BX × 15 ⇒ <b>BX = 9.6</b>.'),
        self(3, TR, 'For θ = 30°, verify: (i) sin²θ + cos²θ = 1, (ii) 1 + tan²θ = sec²θ, (iii) 1 + cot²θ = cosec²θ.', 'sin 30° = 1/2, cos 30° = √3/2, tan 30° = 1/√3. (i) 1/4 + 3/4 = 1. (ii) 1 + 1/3 = 4/3 = (2/√3)². (iii) 1 + 3 = 4 = 2². All verified.')
      ])
    ]
  });
})();

/* ================= MOCK TEST 1 (original, real layout) ================= */
(function () {
  const A = bld('m1a-'), G = bld('m1g-');
  window.PAPERS.push({
    id: 'maths-mock-1', subject: 'maths', kind: 'mock', year: null, durationMin: 240,
    title: 'Mathematics (Algebra + Geometry) — Mock Test 1',
    desc: 'Both 40-mark papers in the real Q1–Q5 layout with "any N" choices. Two separate papers, 2 hours each, as in the board exam.',
    note: 'Original questions written from the Balbharati chapters, in the layout of the 2025 papers. Part 1 and Part 2 are separate 2-hour papers, as on the real timetable.',
    sections: [
      sec('p1q1a', 1, 'Part 1 · Q.1 (A) Choose the correct alternative', 4, 'Write the letter of the correct answer.', [
        A.mcq(1, QE, 'The nature of the roots of x² − 6x + 9 = 0 is:', ['two distinct real roots', 'two equal real roots', 'no real roots', 'cannot be determined'], 1, 'Δ = 36 − 36 = 0 ⇒ real and equal roots (x = 3).'),
        A.mcq(1, AP, 'In an A.P. the first term is 5 and the common difference is 3. Then t<sub>10</sub> is:', ['27', '32', '35', '38'], 1, 't₁₀ = 5 + 9 × 3 = 32.'),
        A.mcq(1, LE, 'The value of the determinant |3 2; 1 4| (rows 3 2 and 1 4) is:', ['10', '14', '12', '−10'], 0, '3 × 4 − 2 × 1 = 12 − 2 = 10.'),
        A.mcq(1, ST, 'For the class interval 20–30, the class mark is:', ['20', '25', '30', '10'], 1, '(20 + 30)/2 = 25.')
      ]),
      sec('p1q1b', 1, 'Part 1 · Q.1 (B) Solve the following sub-questions', null, 'All four are compulsory (1 mark each).', [
        A.num(1, PR, 'A die is thrown once. Find the probability of getting a prime number. (fraction)', ['1/2', '0.5', '3/6'], 'Primes 2, 3, 5 ⇒ 3/6 = 1/2.'),
        A.num(1, FP, 'If the GST rate on an article is 18%, what is the rate of CGST (in %)?', ['9'], 'CGST = SGST = half of GST = 9%.'),
        A.num(1, AP, 'Find the common difference of the A.P. 10, 7, 4, …', ['-3'], 'd = 7 − 10 = −3.'),
        A.num(1, PR, 'Two dice are thrown together. How many outcomes are in the sample space?', ['36'], '6 × 6 = 36.')
      ]),
      sec('p1q2a', 1, 'Part 1 · Q.2 (A) Complete the following activities', 2, 'Complete any two (2 marks each).', [
        A.self(2, LE, 'Solve: x + y = 7 and x − y = 1.', 'Add: 2x = 8 ⇒ x = 4, y = 3. <b>(4, 3)</b>.'),
        A.self(2, QE, 'Form a quadratic equation whose roots are 3 and −4.', 'Sum = −1, product = −12 ⇒ x² + x − 12 = 0.'),
        A.num(2, FP, 'The face value of a share is ₹ 10 and its market value is ₹ 15. How many shares can be bought for ₹ 30,000?', ['2000'], '30,000 ÷ 15 = <b>2000</b>.')
      ]),
      sec('p1q2b', 1, 'Part 1 · Q.2 (B) Solve any four of the following', 4, 'Attempt any four (2 marks each).', [
        A.num(2, AP, 'Find the 15<sup>th</sup> term of the A.P. 4, 9, 14, …', ['74'], 'a = 4, d = 5 ⇒ t₁₅ = 4 + 14 × 5 = 74.'),
        A.self(2, QE, 'Solve: x² − 5x + 6 = 0.', '(x − 3)(x − 2) = 0 ⇒ <b>x = 3 or 2</b>.'),
        A.num(2, PR, 'A card is drawn at random from a pack of 52 cards. Find the probability that it is a king. (fraction)', ['1/13', '4/52'], '4/52 = 1/13.'),
        A.self(2, FP, 'Shares of market value ₹ 5000 are sold at a brokerage of 1%. Find the brokerage and the amount received.', 'Brokerage = 1% of 5000 = ₹ 50. Amount received = 5000 − 50 = <b>₹ 4950</b>.'),
        A.num(2, QE, 'Find the discriminant of 2x² − 3x + 5 = 0.', ['-31'], 'Δ = (−3)² − 4(2)(5) = 9 − 40 = −31.')
      ]),
      sec('p1q3a', 1, 'Part 1 · Q.3 (A) Complete the following activities', 1, 'Complete any one (3 marks).', [
        A.num(3, AP, 'Find the sum of all natural numbers from 1 to 100 that are divisible by 4.', ['1300'], 'a = 4, d = 4, l = 100 ⇒ n = 25. S = 25/2 × (4 + 100) = <b>1300</b>.'),
        A.num(3, PR, 'Two coins are tossed together. Find the probability of getting at least one head. (fraction)', ['3/4'], 'S = {HH, HT, TH, TT}; at least one head in 3 ⇒ 3/4.')
      ]),
      sec('p1q3b', 1, 'Part 1 · Q.3 (B) Solve any two of the following', 2, 'Attempt any two (3 marks each).', [
        A.self(3, QE, 'Solve 2x² − 7x + 3 = 0 using the quadratic formula.', 'Δ = 49 − 24 = 25 ⇒ x = (7 ± 5)/4 ⇒ <b>x = 3 or 1/2</b>. (Δ 1, substitution 1, roots 1)'),
        A.num(3, ST, 'Find the mean: classes 0–10, 10–20, 20–30 with frequencies 4, 6, 10.', ['18'], 'x = 5, 15, 25. Σfx = 20 + 90 + 250 = 360, Σf = 20 ⇒ mean = <b>18</b>.'),
        A.num(3, AP, 'Find the sum of the first 20 terms of the A.P. 2, 5, 8, …', ['610'], 'S₂₀ = 20/2 [2(2) + 19(3)] = 10 × 61 = <b>610</b>.'),
        A.self(3, FP, 'A shopkeeper sells goods of taxable value ₹ 20,000 at 12% GST. Find CGST, SGST and the invoice value.', 'GST = ₹ 2,400 ⇒ CGST = SGST = <b>₹ 1,200 each</b>. Invoice value = 20,000 + 2,400 = <b>₹ 22,400</b>.')
      ]),
      sec('p1q4', 1, 'Part 1 · Q.4 Solve any two of the following', 2, 'Attempt any two (4 marks each).', [
        A.self(4, QE, 'The difference of two natural numbers is 3 and their product is 504. Find the numbers.', 'Numbers x and x + 3: x² + 3x − 504 = 0 ⇒ Δ = 2025 ⇒ x = (−3 ± 45)/2 = 21 (reject −24). <b>21 and 24</b>.'),
        A.self(4, AP, 'A person saves ₹ 10 on the first day and increases the saving by ₹ 5 every day. How much does he save in 20 days?', 'a = 10, d = 5, n = 20: S₂₀ = 20/2 [20 + 19 × 5] = 10 × 115 = <b>₹ 1150</b>.'),
        A.self(4, LE, 'Solve by Cramer\'s rule: 3x + 2y = 7 and x − y = 4.', 'D = −3 − 2 = −5; Dx = −7 − 8 = −15; Dy = 12 − 7 = 5. x = <b>3</b>, y = <b>−1</b>.')
      ]),
      sec('p1q5', 1, 'Part 1 · Q.5 Solve any one of the following', 1, 'Attempt any one (3 marks).', [
        A.self(3, PR, 'A bag contains 4 red, 5 blue and 3 green balls. One ball is drawn at random. Find the probability that it is (i) red, (ii) not blue, (iii) red or green.', 'n(S) = 12. (i) 4/12 = <b>1/3</b>. (ii) 7/12. (iii) 7/12. (1 mark each)'),
        A.self(3, ST, 'Number of students playing: Cricket 40, Football 30, Kabaddi 20, Hockey 10. Find the central angle of each sector for a pie diagram.', 'Total 100. Cricket 144°, Football 108°, Kabaddi 72°, Hockey 36° (sum 360°).')
      ]),

      sec('p2q1a', 2, 'Part 2 · Q.1 (A) Choose the correct alternative', 4, 'Write the letter of the correct answer.', [
        G.mcq(1, CG, 'The distance of the point (3, 4) from the origin is:', ['3', '4', '5', '7'], 2, '√(9 + 16) = 5.'),
        G.mcq(1, TR, 'sin²θ + cos²θ =', ['0', '1', '2', 'sinθ cosθ'], 1, 'Fundamental identity.'),
        G.mcq(1, CI, 'A tangent at a point of a circle is ______ to the radius through the point of contact.', ['parallel', 'perpendicular', 'equal', 'none of these'], 1, 'Tangent ⊥ radius.'),
        G.mcq(1, ME, 'The volume of a cube of edge 3 cm is:', ['9 cm³', '18 cm³', '27 cm³', '54 cm³'], 2, '3³ = 27.')
      ]),
      sec('p2q1b', 2, 'Part 2 · Q.1 (B) Solve the following sub-questions', null, 'All four are compulsory (1 mark each).', [
        G.num(1, PY, 'The sides forming the right angle of a right-angled triangle are 6 cm and 8 cm. Find the hypotenuse (cm).', ['10'], '√(36 + 64) = 10.'),
        G.num(1, CG, 'Find the slope of the line through (1, 2) and (3, 6).', ['2'], '(6 − 2)/(3 − 1) = 2.'),
        G.num(1, TR, 'Find the value of tan 45°.', ['1'], 'tan 45° = 1.'),
        G.num(1, CI, 'In a cyclic quadrilateral ABCD, ∠A = 70°. Find ∠C (degrees).', ['110'], '180° − 70° = 110°.')
      ]),
      sec('p2q2a', 2, 'Part 2 · Q.2 (A) Complete the following activities', 2, 'Complete any two (2 marks each).', [
        G.num(2, SI, 'ΔABC ~ ΔPQR. AB = 6 cm, PQ = 9 cm, BC = 8 cm. Find QR (cm).', ['12'], 'AB/PQ = BC/QR ⇒ 6/9 = 8/QR ⇒ QR = 12.'),
        G.num(2, ME, 'Find the area of a circle of radius 7 cm (π = 22/7), in cm².', ['154'], '22/7 × 49 = 154.'),
        G.num(2, CI, 'Chords AB and CD of a circle intersect at P. AP = 6, PB = 4, CP = 3. Find PD.', ['8'], 'AP × PB = CP × PD ⇒ 24 = 3 × PD ⇒ PD = 8.')
      ]),
      sec('p2q2b', 2, 'Part 2 · Q.2 (B) Solve any four of the following', 4, 'Attempt any four (2 marks each).', [
        G.num(2, TR, 'If sin θ = 3/5 (θ acute), find cos θ. (fraction)', ['4/5', '0.8'], 'cos²θ = 1 − 9/25 = 16/25 ⇒ 4/5.'),
        G.self(2, CG, 'Find the mid-point of the segment joining A(2, −3) and B(8, 5).', '((2 + 8)/2, (−3 + 5)/2) = <b>(5, 1)</b>.'),
        G.num(2, SI, 'In ΔABC, DE ∥ BC with D on AB and E on AC. AD = 3, DB = 6, AE = 2. Find EC.', ['4'], 'AD/DB = AE/EC ⇒ 3/6 = 2/EC ⇒ EC = 4.'),
        G.num(2, CI, 'An inscribed angle subtends arc AB and measures 50°. Find the measure of arc AB (degrees).', ['100'], 'Arc = 2 × inscribed angle = 100°.'),
        G.num(2, ME, 'The radius of a cone is 7 cm and its height 24 cm. Find the slant height (cm).', ['25'], '√(49 + 576) = 25.')
      ]),
      sec('p2q3a', 2, 'Part 2 · Q.3 (A) Complete the following activities', 1, 'Complete any one (3 marks).', [
        G.self(3, TR, 'Prove that (1 − sin²θ) · sec²θ = 1.', 'LHS = cos²θ × 1/cos²θ = 1 = RHS. <b>Hence proved.</b>'),
        G.self(3, CG, 'Show that the points A(1, 2), B(3, 6), C(5, 10) are collinear.', 'Slope AB = (6 − 2)/(3 − 1) = 2. Slope BC = (10 − 6)/(5 − 3) = 2. Equal slopes, common point B ⇒ <b>collinear</b>.')
      ]),
      sec('p2q3b', 2, 'Part 2 · Q.3 (B) Solve any two of the following', 2, 'Attempt any two (3 marks each).', [
        G.self(3, CI, 'Two tangents PA and PB are drawn to a circle with centre O from an external point P. Prove that PA = PB.', 'Join OA, OB, OP. OA ⊥ PA, OB ⊥ PB. In right Δs OAP and OBP: OA = OB (radii), OP common ⇒ ΔOAP ≅ ΔOBP (hypotenuse–side) ⇒ <b>PA = PB</b>.'),
        G.self(3, ME, 'The radius of a cone is 7 cm and its height 24 cm. Find its slant height and curved surface area (π = 22/7).', 'l = 25 cm. CSA = πrl = 22/7 × 7 × 25 = <b>550 cm²</b>.'),
        G.self(3, CG, 'Find the distance between A(2, −3) and B(8, 5) and the slope of AB.', 'AB = √(6² + 8²) = <b>10</b>. Slope = 8/6 = <b>4/3</b>.'),
        G.num(3, ME, 'A solid metal sphere of radius 6 cm is melted into cones of radius 3 cm and height 4 cm. How many cones are formed?', ['24'], 'Sphere 4/3 π 216 = 288π. Cone 1/3 π 9 × 4 = 12π. 288/12 = <b>24</b>.')
      ]),
      sec('p2q4', 2, 'Part 2 · Q.4 Solve any two of the following', 2, 'Attempt any two (4 marks each).', [
        G.numt(4, TR, 'From a point on the ground 20 m from the foot of a tower, the angle of elevation of its top is 60°. Find the height of the tower (√3 = 1.73), in m.', ['34.6'], 'tan 60° = h/20 ⇒ h = 20 × 1.73 = <b>34.6 m</b>.', 0.01),
        G.self(4, SI, 'ΔABC ~ ΔPQR. A(ΔABC) = 81 sq cm, A(ΔPQR) = 49 sq cm and AB = 6.3 cm. Find PQ.', 'Areas ratio = square of sides ratio: 81/49 = (AB/PQ)² ⇒ AB/PQ = 9/7 ⇒ PQ = 6.3 × 7/9 = <b>4.9 cm</b>.'),
        G.self(4, CG, 'For the line through (2, 3) and (4, 7): (i) find the slope, (ii) write the equation of the line, (iii) find its y-intercept.', '(i) m = 4/2 = <b>2</b>. (ii) y − 3 = 2(x − 2) ⇒ <b>2x − y − 1 = 0</b>. (iii) x = 0 ⇒ y = <b>−1</b>. (1 + 2 + 1)')
      ]),
      sec('p2q5', 2, 'Part 2 · Q.5 Solve any one of the following', 1, 'Attempt any one (3 marks).', [
        G.self(3, TR, 'For θ = 60°, verify (i) sin²θ + cos²θ = 1, (ii) 1 + tan²θ = sec²θ.', 'sin 60° = √3/2, cos 60° = 1/2: 3/4 + 1/4 = 1. tan 60° = √3, sec 60° = 2: 1 + 3 = 4 = 2². Verified.'),
        G.self(3, GC, 'Draw a circle of radius 2.5 cm and construct tangents to it from a point 6 cm from the centre.', 'Draw the circle (O, 2.5 cm); mark P with OP = 6 cm; bisect OP at M; with centre M and radius MO cut the circle at A and B; join PA, PB. (Circle 1, bisector 1, tangents 1)')
      ])
    ]
  });
})();
})();

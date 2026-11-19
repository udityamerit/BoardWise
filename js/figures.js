/* BoardWise figures
   Draws the diagram a question needs (a circle with its tangents, a ladder against a wall, a cone, points on a grid, a lens,
   a circuit …) from the numbers written in the question itself, so the student can see what is being asked.
   Every builder is strict: it only draws when the question text matches its pattern completely, otherwise the question
   simply has no figure (a wrong figure would be worse than none).
     FIG.forQuestion(q, solved)  ->  '<figure class="fig">…</figure>' or ''
   "solved" is true on the review page. Figures that would give the answer away (the image formed by a lens, a prism
   spectrum the student is asked to draw) are only drawn there. Figures are not to scale, and say so. */
(function () {
  'use strict';
  const R = v => Math.round(v * 10) / 10;
  const fm = v => { const n = +v; return Number.isInteger(n) ? String(n) : String(+n.toFixed(2)); };
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const rad = d => d * Math.PI / 180;
  const rx = (s, f) => new RegExp(s.replace(/#/g, '(\\d+(?:\\.\\d+)?)'), f === undefined ? 'i' : f);   // '#' = a number
  const clean = h => String(h || '').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/−/g, '-').replace(/\s+/g, ' ').trim();
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---- drawing kit ---- */
  const ln = (a, b, c, d, k) => `<line class="fs ${k || ''}" x1="${R(a)}" y1="${R(b)}" x2="${R(c)}" y2="${R(d)}"/>`;
  const tx = (x, y, s, k, a) => `<text class="ft ${k || ''}" x="${R(x)}" y="${R(y)}" text-anchor="${a || 'middle'}">${esc(s)}</text>`;
  const dot = (x, y, k) => `<circle class="fd ${k || ''}" cx="${R(x)}" cy="${R(y)}" r="2.8"/>`;
  const circ = (x, y, r, k) => `<circle class="fs ${k || ''}" cx="${R(x)}" cy="${R(y)}" r="${R(r)}"/>`;
  const ell = (x, y, a, b, k) => `<ellipse class="fs ${k || ''}" cx="${R(x)}" cy="${R(y)}" rx="${R(a)}" ry="${R(b)}"/>`;
  const poly = (pts, k) => `<polygon class="fs ${k || ''}" points="${pts.map(p => R(p[0]) + ',' + R(p[1])).join(' ')}"/>`;
  const path = (d, k) => `<path class="fs ${k || ''}" d="${d}"/>`;
  const pol = (cx, cy, r, deg) => [cx + r * Math.cos(rad(deg)), cy - r * Math.sin(rad(deg))];     // math angle, y up
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const len = v => Math.hypot(v[0], v[1]), unit = v => { const l = len(v) || 1; return [v[0] / l, v[1] / l]; };
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  /* a vertex name placed just outside the shape */
  const vlab = (p, c, name, d) => { const u = unit(sub(p, c)), q = [p[0] + u[0] * (d || 13), p[1] + u[1] * (d || 13)]; return tx(q[0], q[1] + 4.5, name, 'b'); };
  const ra = (p, u1, u2, s) => { s = s || 9; const a = [p[0] + u1[0] * s, p[1] + u1[1] * s], b = [a[0] + u2[0] * s, a[1] + u2[1] * s], c = [p[0] + u2[0] * s, p[1] + u2[1] * s]; return path(`M${R(a[0])} ${R(a[1])}L${R(b[0])} ${R(b[1])}L${R(c[0])} ${R(c[1])}`, 'thin'); };
  /* the angle at V between the directions to P1 and P2, with a label */
  const angAt = (V, P1, P2, r, label, k) => {
    const a1 = Math.atan2(P1[1] - V[1], P1[0] - V[0]), a2 = Math.atan2(P2[1] - V[1], P2[0] - V[0]);
    let d = a2 - a1; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
    const s = [V[0] + r * Math.cos(a1), V[1] + r * Math.sin(a1)], e = [V[0] + r * Math.cos(a2), V[1] + r * Math.sin(a2)], m = a1 + d / 2, lr = r + 12;
    return path(`M${R(s[0])} ${R(s[1])}A${r} ${r} 0 0 ${d > 0 ? 1 : 0} ${R(e[0])} ${R(e[1])}`, 'acc thin') + (label ? tx(V[0] + lr * Math.cos(m), V[1] + lr * Math.sin(m) + 4, label, 'acc sm ' + (k || '')) : '');
  };
  const Q = '?';
  const lab = (s) => s === Q ? 'q' : '';
  /* dimension label: value or ? */
  const dim = (x, y, s, a, extra) => tx(x, y, s, 'sm ' + (s === Q || /\?/.test(String(s)) ? 'q ' : '') + (extra || ''), a);

  function wrap(w, h, body, cap, alt) {
    return `<figure class="fig"><svg viewBox="0 0 ${w} ${h}" style="max-width:${w}px" role="img" aria-label="${esc(alt || 'Figure')}">${body}</svg><figcaption>${esc(cap || 'Not to scale')}</figcaption></figure>`;
  }

  /* ================= triangles ================= */
  /* right angle at the bottom-left corner B; a = vertical leg, b = horizontal leg, c = hypotenuse (labels are text) */
  function rtri(o) {
    const W = 300, H = 200, na = +o.na || 3, nb = +o.nb || 4, ar = clamp(na / nb, .45, 2.2);
    let bw = 190, bh = bw * ar; if (bh > 135) { bh = 135; bw = bh / ar; }
    const x0 = (W - bw) / 2 + (o.wall ? 14 : 0), y0 = 168, B = [x0, y0], C = [x0 + bw, y0], A = [x0, y0 - bh];
    const nm = o.names || [];
    let s = '';
    if (o.wall) s += `<rect x="${x0 - 12}" y="${y0 - bh - 14}" width="12" height="${bh + 14}" class="fs ff"/>` + ln(x0 - 28, y0, x0 + bw + 24, y0, 'thick');
    else s += poly([A, B, C], 'ff');
    if (o.wall) s += ln(A[0], A[1], C[0], C[1], 'acc thick');
    s += ra(B, [1, 0], [0, -1]);
    const M = mid(A, C), nrm = unit([bh, bw]);
    if (o.la) s += dim(x0 - (o.wall ? 18 : 9), y0 - bh / 2 + 4, o.la, 'end');
    if (o.lb) s += dim(x0 + bw / 2, y0 + 20, o.lb);
    if (o.lc) s += dim(M[0] + nrm[0] * 14, M[1] + nrm[1] * 14 + 4, o.lc);
    if (nm.length === 3 && !o.wall) s += tx(A[0] - 2, A[1] - 8, nm[0], 'b') + tx(B[0] - 9, B[1] + 14, nm[1], 'b') + tx(C[0] + 9, C[1] + 14, nm[2], 'b');
    return wrap(W, H, s, o.cap, o.alt);
  }
  /* right-angled triangle with the altitude drawn on the hypotenuse: right angle at N, altitude NQ onto MP */
  function altTri(m, n, p, q, mq, qp, nq) {
    const W = 300, H = 190, tot = mq + qp, k = Math.min(250 / tot, 130 / Math.sqrt(mq * qp)), x0 = (W - tot * k) / 2, y0 = 160;
    const M = [x0, y0], P = [x0 + tot * k, y0], Qp = [x0 + mq * k, y0], N = [Qp[0], y0 - Math.sqrt(mq * qp) * k];
    let s = poly([M, N, P], 'ff') + ln(N[0], N[1], Qp[0], Qp[1], 'dash acc');
    s += ra(N, unit(sub(M, N)), unit(sub(P, N)), 9) + ra(Qp, [-1, 0], [0, -1], 8);
    s += tx(M[0] - 8, M[1] + 14, m, 'b') + tx(P[0] + 8, P[1] + 14, p, 'b') + tx(N[0], N[1] - 8, n, 'b') + tx(Qp[0] + 8, Qp[1] + 14, q, 'b');
    s += dim(x0 + mq * k / 2, y0 + 18, String(mq)) + dim(Qp[0] + qp * k / 2, y0 + 18, String(qp)) + dim(Qp[0] - 9, N[1] + (y0 - N[1]) / 2 + 4, nq, 'end');
    return wrap(W, H, s, 'Not to scale', 'Right-angled triangle with an altitude to the hypotenuse');
  }
  function elevation(d, theta, what, hv) {
    const W = 320, H = 215, t = Math.tan(rad(theta)); let bw = 220, bh = bw * t; if (bh > 130) { bh = 130; bw = bh / t; }
    const x0 = 40, y0 = 165, O = [x0, y0], F = [x0 + bw, y0], T = [F[0], y0 - bh];
    let s = ln(10, y0, W - 10, y0, 'thick') + `<rect x="${R(F[0] - 7)}" y="${R(T[1])}" width="14" height="${R(bh)}" class="fs ff"/>`;
    s += ln(O[0], O[1], T[0], T[1], 'acc') + ln(O[0], O[1], F[0] - 7, O[1], 'dash') + dot(O[0], O[1]);
    s += path(`M${R(O[0] + 30)} ${R(y0)}A30 30 0 0 0 ${R(O[0] + 30 * Math.cos(rad(theta)))} ${R(y0 - 30 * Math.sin(rad(theta)))}`, 'acc thin');
    s += tx(O[0] + 50 * Math.cos(rad(theta / 2)), y0 - 50 * Math.sin(rad(theta / 2)) + 4, theta + '°', 'acc sm');
    s += ra([F[0] - 7, y0], [-1, 0], [0, -1], 8);
    s += dim(x0 + bw / 2, y0 + 20, d + ' m') + dim(F[0] + 14, T[1] + bh / 2 + 4, hv, 'start') + tx(O[0] - 4, y0 + 38, 'observer', 'sm', 'start');
    s += tx(F[0], T[1] - 7, what, 'sm');
    return wrap(W, H, s, 'Not to scale', 'Angle of elevation of the top of a ' + what);
  }
  function equilateral(a) {
    const W = 300, H = 235, s0 = 190, h0 = s0 * Math.sqrt(3) / 2, x0 = 55, y0 = 195, B = [x0, y0], C = [x0 + s0, y0], A = [x0 + s0 / 2, y0 - h0], D = [A[0], y0];
    let s = poly([A, B, C], 'ff') + ln(A[0], A[1], D[0], D[1], 'dash acc') + ra(D, [-1, 0], [0, -1], 9);
    s += tx(A[0], A[1] - 8, 'A', 'b') + tx(B[0] - 9, B[1] + 14, 'B', 'b') + tx(C[0] + 9, C[1] + 14, 'C', 'b') + tx(D[0], D[1] + 16, 'D', 'b');
    s += dim(x0 + s0 / 2, y0 + 36, 'side = ' + a + ' cm') + dim(A[0] + 8, A[1] + h0 * 0.72, 'AD = ?', 'start');
    return wrap(W, H, s, 'Equilateral triangle, all sides equal · not to scale', 'Equilateral triangle with its altitude');
  }
  function rhombus(d1, d2) {
    const W = 300, H = 200, ar = clamp(d2 / d1, .45, 1.8); let hx = 105, hy = hx * ar; if (hy > 78) { hy = 78; hx = hy / ar; }
    const c = [150, 98], L = [c[0] - hx, c[1]], Rr = [c[0] + hx, c[1]], T = [c[0], c[1] - hy], Bt = [c[0], c[1] + hy];
    let s = poly([L, T, Rr, Bt], 'ff') + ln(L[0], L[1], Rr[0], Rr[1], 'dash acc') + ln(T[0], T[1], Bt[0], Bt[1], 'dash acc') + ra(c, [1, 0], [0, -1], 8);
    s += tx(L[0] - 10, L[1] + 5, 'A', 'b') + tx(T[0], T[1] - 8, 'B', 'b') + tx(Rr[0] + 10, Rr[1] + 5, 'C', 'b') + tx(Bt[0], Bt[1] + 16, 'D', 'b');
    const sm = mid(L, T);
    s += dim(c[0] + hx / 2, c[1] - 6, d1 + ' cm') + dim(c[0] + 6, c[1] - hy / 2 + 4, d2 + ' cm', 'start') + dim(sm[0] - 12, sm[1] - 4, 'side = ?', 'end');
    return wrap(W, H, s, 'Diagonals of a rhombus bisect each other at right angles · not to scale', 'Rhombus with its diagonals');
  }
  /* triangle with a line parallel to the base */
  function bpt(t, d, e, base) {
    const W = 300, H = 200, A = [150, 22], B = [40, 170], C = [260, 170], k = .45, D = add(A, [(B[0] - A[0]) * k, (B[1] - A[1]) * k]), E = add(A, [(C[0] - A[0]) * k, (C[1] - A[1]) * k]);
    let s = poly([A, B, C], 'ff') + ln(D[0], D[1], E[0], E[1], 'acc') + tx(A[0], A[1] - 8, t[0], 'b') + tx(B[0] - 10, B[1] + 14, t[1], 'b') + tx(C[0] + 10, C[1] + 14, t[2], 'b')
      + tx(D[0] - 12, D[1] + 4, d, 'b') + tx(E[0] + 12, E[1] + 4, e, 'b');
    return wrap(W, H, s, 'Not to scale', 'Triangle ' + t.join('') + ' with ' + d + e + ' parallel to ' + base);
  }

  /* ================= circles ================= */
  function tangentExt(d, r) {
    const W = 330, H = 200, k = Math.min(64 / r, 215 / d), rp = r * k, dp = d * k, O = [30 + rp, 100], P = [O[0] + dp, 100], phi = Math.acos(r / d) * 180 / Math.PI, T = pol(O[0], O[1], rp, phi);
    let s = circ(O[0], O[1], rp, 'ff') + ln(O[0], O[1], P[0], P[1], 'dash') + ln(O[0], O[1], T[0], T[1], 'acc') + ln(P[0], P[1], T[0], T[1], 'acc');
    s += ra(T, unit(sub(O, T)), unit(sub(P, T)), 8) + dot(O[0], O[1]) + dot(P[0], P[1]) + dot(T[0], T[1]);
    s += tx(O[0] - 4, O[1] + 18, 'O', 'b') + tx(P[0] + 4, P[1] + 18, 'P', 'b') + tx(T[0] - 2, T[1] - 9, 'T', 'b');
    const mR = mid(O, T), mT = mid(P, T);
    s += dim(mR[0] - 8, mR[1] - 6, 'r = ' + r, 'end') + dim(mT[0] + 10, mT[1] - 8, 'PT = ?', 'start') + dim(O[0] + dp / 2, O[1] + 26, 'OP = ' + d, 'middle');
    return wrap(W, H, s, 'Tangent PT touches the circle at T, so OT ⊥ PT · not to scale', 'Circle with a tangent drawn from an external point');
  }
  /* two tangents PA, PB from P; names [P,A,B]; theta = angle APB */
  function twoTangents(nm, theta, askAOB) {
    const W = 330, H = 210, r = 56, th = clamp(theta || 60, 20, 150), d = r / Math.sin(rad(th / 2)), O = [60, 105], P = [O[0] + Math.min(d, 230), 105];
    const dd = P[0] - O[0], phi = Math.acos(r / dd) * 180 / Math.PI, A = pol(O[0], O[1], r, phi), B = pol(O[0], O[1], r, -phi);
    let s = circ(O[0], O[1], r, 'ff') + ln(P[0], P[1], A[0], A[1], 'acc') + ln(P[0], P[1], B[0], B[1], 'acc') + ln(O[0], O[1], A[0], A[1]) + ln(O[0], O[1], B[0], B[1]) + ln(O[0], O[1], P[0], P[1], 'dash');
    s += ra(A, unit(sub(O, A)), unit(sub(P, A)), 7) + ra(B, unit(sub(O, B)), unit(sub(P, B)), 7);
    s += dot(O[0], O[1]) + tx(O[0] - 12, O[1] + 4, 'O', 'b') + tx(P[0] + 11, P[1] + 5, nm[0], 'b') + tx(A[0], A[1] - 9, nm[1], 'b') + tx(B[0], B[1] + 17, nm[2], 'b');
    if (theta) s += angAt(P, A, B, 30, theta + '°');
    if (askAOB) s += angAt(O, A, B, 20, '?', 'q');
    return wrap(W, H, s, 'Tangents are perpendicular to the radius at the point of contact · not to scale', 'Circle with two tangents from an external point');
  }
  function tangentSecant(pa, pb) {
    const W = 340, H = 210, r = 56, O = [80, 105], P = [300, 100], d = P[0] - O[0], phi = Math.acos(r / d) * 180 / Math.PI, T = pol(O[0], O[1], r, phi);
    const aim = [O[0] - 6, O[1] + 24], u = unit(sub(aim, P)), f = sub(P, O), b = f[0] * u[0] + f[1] * u[1], c = f[0] * f[0] + f[1] * f[1] - r * r, disc = Math.sqrt(b * b - c), t1 = -b - disc, t2 = -b + disc;
    const A = [P[0] + u[0] * t1, P[1] + u[1] * t1], B = [P[0] + u[0] * t2, P[1] + u[1] * t2];
    let s = circ(O[0], O[1], r, 'ff') + ln(P[0], P[1], T[0], T[1], 'acc') + ln(P[0], P[1], B[0], B[1], 'acc') + ln(O[0], O[1], T[0], T[1], 'dash') + dot(O[0], O[1]) + dot(A[0], A[1]) + dot(B[0], B[1]) + dot(T[0], T[1]) + dot(P[0], P[1]);
    s += tx(P[0] + 11, P[1] + 5, 'P', 'b') + tx(T[0], T[1] - 9, 'T', 'b') + tx(A[0] + 2, A[1] - 9, 'A', 'b') + tx(B[0] - 4, B[1] + 17, 'B', 'b') + tx(O[0] - 12, O[1] + 4, 'O', 'b');
    const mT = mid(P, T), mA = mid(P, A);
    s += dim(mT[0] + 6, mT[1] - 8, 'PT = ?', 'start') + dim(mA[0] + 4, mA[1] + 17, 'PA = ' + pa) + dim(W / 2 + 20, H - 8, 'PB = ' + pb);
    return wrap(W, H, s, 'PT² = PA × PB · not to scale', 'Tangent and secant from an external point');
  }
  function tangentRadius() {
    const W = 300, H = 200, O = [150, 82], r = 60, A = [150, 142];
    let s = circ(O[0], O[1], r, 'ff') + ln(30, A[1], 270, A[1], 'acc thick') + ln(O[0], O[1], A[0], A[1]) + dot(O[0], O[1]) + dot(A[0], A[1]) + ra(A, [0, -1], [1, 0], 9);
    s += tx(O[0] - 12, O[1] + 4, 'O', 'b') + tx(A[0] + 2, A[1] + 18, 'A', 'b') + dim(O[0] + 8, O[1] + 36, 'radius', 'start') + dim(240, A[1] - 8, 'tangent');
    return wrap(W, H, s, 'Tangent at A and the radius OA', 'Circle with a tangent at a point and the radius to that point');
  }
  /* inscribed angle ACB, arc AXB not containing C; ang = the angle at C (if given) */
  function inscribed(ang, nm, askArc) {
    const W = 300, H = 220, c = [150, 112], r = 82, m = ang ? clamp(2 * ang, 30, 330) : 110;
    const A = pol(c[0], c[1], r, 270 - m / 2), B = pol(c[0], c[1], r, 270 + m / 2), X = pol(c[0], c[1], r, 270), Cp = pol(c[0], c[1], r, 90 + (m > 200 ? -30 : 0));
    let s = circ(c[0], c[1], r, 'ff') + ln(Cp[0], Cp[1], A[0], A[1], 'acc') + ln(Cp[0], Cp[1], B[0], B[1], 'acc') + ln(c[0], c[1], A[0], A[1], 'dash') + ln(c[0], c[1], B[0], B[1], 'dash') + dot(c[0], c[1]);
    s += tx(c[0], c[1] - 6, 'O', 'b') + vlab(A, c, nm[0]) + vlab(B, c, nm[1]) + vlab(Cp, c, nm[2]);
    if (ang) s += angAt(Cp, A, B, 26, ang + '°');
    if (askArc) s += dim(X[0], X[1] + 18, 'arc ' + nm[0] + nm[1] + ' = ?', 'middle', 'acc');
    return wrap(W, H, s, 'Not to scale', 'Circle with an inscribed angle and the arc it stands on');
  }
  function cyclic(nm, giv, gval, ask) {
    const W = 300, H = 220, c = [150, 110], r = 84, ang = [110, 200, 315, 50], V = ang.map(a => pol(c[0], c[1], r, a));
    let s = circ(c[0], c[1], r, 'ff') + poly(V, 'acc');
    const nb = i => [V[(i + 3) % 4], V[(i + 1) % 4]];
    s += V.map((p, i) => vlab(p, c, nm[i])).join('');
    const gi = nm.indexOf(giv), ai = nm.indexOf(ask);
    if (gi >= 0) { const [p1, p2] = nb(gi); s += angAt(V[gi], p1, p2, 22, gval + '°'); }
    if (ai >= 0) { const [p1, p2] = nb(ai); s += angAt(V[ai], p1, p2, 22, '?', 'q'); }
    return wrap(W, H, s, 'All four vertices lie on the circle · not to scale', 'Cyclic quadrilateral ' + nm.join(''));
  }
  function chords(c1, c2, pn, vals, ask) {
    const W = 300, H = 220, c = [150, 110], r = 84, X1 = pol(c[0], c[1], r, 155), Y2 = pol(c[0], c[1], r, 250), X2 = pol(c[0], c[1], r, 335), Y1 = pol(c[0], c[1], r, 70);
    const d1 = sub(X2, X1), d2 = sub(Y2, Y1), den = d1[0] * d2[1] - d1[1] * d2[0], t = ((Y1[0] - X1[0]) * d2[1] - (Y1[1] - X1[1]) * d2[0]) / den, P = [X1[0] + d1[0] * t, X1[1] + d1[1] * t];
    let s = circ(c[0], c[1], r, 'ff') + ln(X1[0], X1[1], X2[0], X2[1], 'acc') + ln(Y1[0], Y1[1], Y2[0], Y2[1], 'acc') + dot(P[0], P[1]);
    s += vlab(X1, c, c1[0]) + vlab(X2, c, c1[1]) + vlab(Y1, c, c2[0]) + vlab(Y2, c, c2[1]) + tx(P[0] + 11, P[1] - 7, pn, 'b');
    const val = (e, p) => { const nme = e + p, rev = p + e; if (nme === ask || rev === ask) return Q; return vals[nme] != null ? vals[nme] : vals[rev] != null ? vals[rev] : ''; };
    [[X1, c1[0]], [X2, c1[1]], [Y1, c2[0]], [Y2, c2[1]]].forEach(([E, n]) => {
      const m = mid(E, P), nr = unit([-(E[1] - P[1]), E[0] - P[0]]), off = (m[0] - c[0]) * nr[0] + (m[1] - c[1]) * nr[1] > 0 ? 1 : -1, v = val(n, pn);
      if (v !== '') s += dim(m[0] + nr[0] * 11 * off, m[1] + nr[1] * 11 * off + 4, v);
    });
    return wrap(W, H, s, 'Products of the parts of intersecting chords are equal · not to scale', 'Two chords intersecting inside a circle');
  }
  /* a sector (or whole circle when theta = 360), radius label, angle label, optional names */
  function sector(rl, theta, nm, shade) {
    const W = 300, H = 220, c = [110, 112], r = 84, th = clamp(theta, 15, 359), P0 = pol(c[0], c[1], r, 0), P1 = pol(c[0], c[1], r, th);
    let s = circ(c[0], c[1], r, shade ? '' : 'ff') + `<path class="fs ff sec" d="M${c[0]} ${c[1]}L${R(P0[0])} ${R(P0[1])}A${r} ${r} 0 ${th > 180 ? 1 : 0} 0 ${R(P1[0])} ${R(P1[1])}Z"/>`;
    s += dot(c[0], c[1]) + angAt(c, P0, P1, 22, th + '°');
    s += dim(mid(c, P0)[0], c[1] + 17, 'r = ' + rl, 'middle') + tx(c[0] - 4, c[1] + 17 + (th > 150 ? 12 : 0), nm ? nm[0] : 'O', 'b', 'end');
    if (nm) s += tx(P0[0] + 9, P0[1] + 5, nm[1], 'b') + tx(P1[0] + (P1[0] > c[0] ? 9 : -9), P1[1] - 5, nm[2], 'b');
    return wrap(W, H, s, 'Shaded part is the sector · not to scale', 'Circle with a shaded sector');
  }
  function circleR(r) {
    const W = 260, H = 180, c = [130, 90], rp = 66;
    return wrap(W, H, circ(c[0], c[1], rp, 'ff') + ln(c[0], c[1], c[0] + rp, c[1], 'acc') + dot(c[0], c[1]) + tx(c[0] - 4, c[1] + 17, 'O', 'b', 'end') + dim(c[0] + rp / 2, c[1] - 7, 'r = ' + r + ' cm'), 'Not to scale', 'Circle of radius ' + r + ' cm');
  }

  /* ================= solids (each draws in a 140 x 160 box, base near y = 140) ================= */
  const hid = (cx, cy, a, b) => `<path class="fs dash thin" d="M${R(cx - a)} ${R(cy)}A${R(a)} ${R(b)} 0 0 1 ${R(cx + a)} ${R(cy)}"/>`;         // hidden back edge
  const front = (cx, cy, a, b) => `<path class="fs" d="M${R(cx - a)} ${R(cy)}A${R(a)} ${R(b)} 0 0 0 ${R(cx + a)} ${R(cy)}"/>`;
  function solid(kind, o) {
    const cx = 70, by = 138;
    if (kind === 'cylinder') {
      const k = Math.min(52 / o.r, 100 / o.h), a = o.r * k, h = o.h * k, b = Math.max(7, a * .28), ty = by - h;
      return ell(cx, ty, a, b, 'ff') + `<path class="fs ff" d="M${R(cx - a)} ${R(ty)}V${R(by)}A${R(a)} ${R(b)} 0 0 0 ${R(cx + a)} ${R(by)}V${R(ty)}"/>` + ell(cx, ty, a, b, 'ff') + hid(cx, by, a, b)
        + ln(cx, ty, cx + a, ty, 'acc') + dot(cx, ty) + dim(cx + a / 2, ty - b - 3, 'r = ' + o.r, 'middle') + ln(cx + a + 8, ty, cx + a + 8, by, 'thin') + dim(cx + a + 12, ty + h / 2 + 4, 'h = ' + o.h, 'start');
    }
    if (kind === 'cone') {
      const k = Math.min(50 / o.r, 100 / o.h), a = o.r * k, h = o.h * k, b = Math.max(7, a * .28), ty = by - h;
      return `<path class="fs ff" d="M${R(cx)} ${R(ty)}L${R(cx - a)} ${R(by)}A${R(a)} ${R(b)} 0 0 0 ${R(cx + a)} ${R(by)}Z"/>` + hid(cx, by, a, b) + ln(cx, ty, cx, by, 'dash acc') + ln(cx, by, cx + a, by, 'acc') + dot(cx, by)
        + dim(cx + a / 2, by + b + 13, 'r = ' + o.r, 'middle') + dim(cx - 4, ty + h / 2 + 4, 'h = ' + o.h, 'end') + (o.l ? dim(cx + a / 2 + 10, ty + h / 2 - 2, o.l, 'start') : '');
    }
    if (kind === 'sphere') {
      const a = 52, cy = 84;
      return circ(cx, cy, a, 'ff') + hid(cx, cy, a, 15) + front(cx, cy, a, 15) + ln(cx, cy, cx + a, cy, 'acc') + dot(cx, cy) + dim(cx + a / 2, cy - 5, 'r = ' + o.r, 'middle');
    }
    if (kind === 'frustum') {
      const k = Math.min(48 / o.R, 100 / o.h), A = o.R * k, a = o.r * k, h = o.h * k, B = Math.max(7, A * .28), b = Math.max(5, a * .28), ty = by - h;
      return `<path class="fs ff" d="M${R(cx - a)} ${R(ty)}L${R(cx - A)} ${R(by)}A${R(A)} ${R(B)} 0 0 0 ${R(cx + A)} ${R(by)}L${R(cx + a)} ${R(ty)}Z"/>` + hid(cx, by, A, B) + ell(cx, ty, a, b, 'ff')
        + ln(cx, ty, cx, by, 'dash acc') + ln(cx, ty, cx + a, ty, 'acc') + ln(cx, by, cx + A, by, 'acc') + dot(cx, ty) + dot(cx, by)
        + dim(cx + a / 2 + 2, ty - b - 3, 'r = ' + o.r) + dim(cx + A / 2, by + B + 13, 'R = ' + o.R) + dim(cx - 3, ty + h / 2 + 4, 'h = ' + o.h, 'end') + (o.l ? dim(cx + (a + A) / 2 + 12, ty + h / 2, o.l, 'start') : '');
    }
    if (kind === 'cuboid' || kind === 'cube') {
      const L = +o.l, Bd = +o.b, Hh = +o.h, k = Math.min(70 / L, 56 / Bd, 90 / Hh), w = L * k, d = Bd * k * .55, h = Hh * k, x0 = 14, y0 = by - 6, dx = d * .9, dy = d * .6;
      const f = [[x0, y0], [x0 + w, y0], [x0 + w, y0 - h], [x0, y0 - h]], bk = f.map(p => [p[0] + dx, p[1] - dy]);
      return poly(bk, 'dash thin') + ln(f[0][0], f[0][1], bk[0][0], bk[0][1], 'dash thin') + ln(bk[0][0], bk[0][1], bk[1][0], bk[1][1], 'dash thin') + ln(bk[0][0], bk[0][1], bk[3][0], bk[3][1], 'dash thin')
        + poly(f, 'ff') + ln(f[1][0], f[1][1], bk[1][0], bk[1][1]) + ln(f[2][0], f[2][1], bk[2][0], bk[2][1]) + ln(f[3][0], f[3][1], bk[3][0], bk[3][1]) + ln(bk[2][0], bk[2][1], bk[3][0], bk[3][1]) + ln(bk[1][0], bk[1][1], bk[2][0], bk[2][1])
        + dim(x0 + w / 2, y0 + 15, kind === 'cube' ? 'edge = ' + o.l : 'l = ' + o.l) + (kind === 'cube' ? '' : dim(x0 + w + dx / 2 + 7, y0 - dy / 2 + 14, 'b = ' + o.b, 'start') + dim(x0 - 4, y0 - h / 2 + 4, 'h = ' + o.h, 'end'));
    }
    return '';
  }
  function solids(list, cap, alt) {
    const n = list.length, W = n === 1 ? 190 : 340, H = 168;
    let body = '';
    list.forEach((it, i) => {
      if (it === '->') { body += `<g transform="translate(${n === 3 ? 135 : 150} 0)"><path class="fs acc" d="M0 80H40M32 73l8 7-8 7"/><text class="ft sm" x="20" y="68" text-anchor="middle">melted</text></g>`; return; }
      const idx = list.slice(0, i).filter(x => x !== '->').length, ox = n === 1 ? 25 : idx === 0 ? 0 : 200;
      body += `<g transform="translate(${ox} 0)">${solid(it[0], it[1])}</g>`;
    });
    return wrap(W, H, body, cap || 'Not to scale', alt);
  }

  /* ================= coordinate geometry ================= */
  function plane(pts, o) {
    o = o || {};
    const W = 310, H = 250, L = 30, Rr = 14, T = 14, Bm = 26;
    const xs = pts.map(p => p.x).concat([0]), ys = pts.map(p => p.y).concat([0]);
    let x0 = Math.min.apply(0, xs) - 1, x1 = Math.max.apply(0, xs) + 1, y0 = Math.min.apply(0, ys) - 1, y1 = Math.max.apply(0, ys) + 1;
    const sp = Math.max(x1 - x0, y1 - y0, 4), cxm = (x0 + x1) / 2, cym = (y0 + y1) / 2;
    const sx = (W - L - Rr) / Math.max(x1 - x0, sp * .55), sy = (H - T - Bm) / Math.max(y1 - y0, sp * .55), k = Math.min(sx, sy);
    const px = x => L + (x - x0) * k + ((W - L - Rr) - (x1 - x0) * k) / 2, py = y => H - Bm - (y - y0) * k - ((H - T - Bm) - (y1 - y0) * k) / 2;
    const step = sp <= 10 ? 1 : sp <= 22 ? 2 : sp <= 55 ? 5 : 10;
    let s = '';
    for (let gx = Math.ceil(x0 / step) * step; gx <= x1; gx += step) { s += ln(px(gx), T, px(gx), H - Bm, 'grid'); if (gx !== 0) s += tx(px(gx), py(0) + 14 > H - 4 ? H - 5 : py(0) + 14, gx, 'tick'); }
    for (let gy = Math.ceil(y0 / step) * step; gy <= y1; gy += step) { s += ln(L, py(gy), W - Rr, py(gy), 'grid'); if (gy !== 0) s += tx(px(0) - 5 < L + 4 ? L + 4 : px(0) - 5, py(gy) + 4, gy, 'tick', 'end'); }
    s += ln(L - 6, py(0), W - Rr + 4, py(0), 'ax') + ln(px(0), H - Bm + 6, px(0), T - 4, 'ax') + tx(W - Rr + 2, py(0) - 6, 'X', 'sm', 'end') + tx(px(0) + 8, T + 6, 'Y', 'sm', 'start') + tx(px(0) - 5, py(0) + 14, 'O', 'tick', 'end');
    const P = pts.map(p => [px(p.x), py(p.y)]);
    (o.lines || []).forEach(([i, j, kind]) => { s += ln(P[i][0], P[i][1], P[j][0], P[j][1], kind || 'acc'); });
    (o.ext || []).forEach(([i, j]) => { const d = unit(sub(P[j], P[i])); s += ln(P[i][0] - d[0] * 22, P[i][1] - d[1] * 22, P[j][0] + d[0] * 22, P[j][1] + d[1] * 22, 'acc'); });
    pts.forEach((p, i) => {
      if (p.hide) return;
      const up = P[i][1] > H / 2 ? -1 : 1, lx = P[i][0] > W - 90 ? 'end' : 'start', nm = (p.n ? p.n : '') + '(' + fm(p.x) + ', ' + fm(p.y) + ')';
      s += dot(P[i][0], P[i][1], 'acc') + tx(P[i][0] + (lx === 'end' ? -7 : 7), P[i][1] + (up < 0 ? -7 : 14), nm, 'sm', lx);
    });
    return wrap(W, H, s, o.cap || 'Points drawn on the coordinate plane', o.alt || 'Points on a coordinate plane');
  }
  function slopeAngle(deg) {
    const W = 300, H = 200, O = [50, 160], L = 200, T = pol(O[0], O[1], L, deg);
    return wrap(W, H, ln(O[0] - 10, O[1], 280, O[1], 'ax') + ln(O[0], O[1] + 10, O[0], 14, 'ax') + ln(O[0], O[1], T[0], T[1], 'acc thick') + angAt(O, [O[0] + 1, O[1]], T, 46, deg + '°') + tx(276, O[1] - 7, 'X', 'sm', 'end') + tx(O[0] + 8, 20, 'Y', 'sm', 'start') + tx(T[0] + 4, T[1] - 8, 'line', 'sm'), 'The line makes ' + deg + '° with the positive X-axis', 'A line inclined to the X-axis');
  }

  /* ================= data ================= */
  function histogram(cls, fr) {
    const W = 320, H = 210, L = 38, Rr = 10, T = 14, B = 34, n = cls.length, mx = Math.max.apply(0, fr), top = Math.ceil(mx / 5) * 5 || 5, bw = (W - L - Rr) / n, y = v => H - B - (H - T - B) * v / top;
    let s = '';
    for (let g = 0; g <= top; g += top / 5) s += ln(L, y(g), W - Rr, y(g), 'grid') + tx(L - 5, y(g) + 4, fm(g), 'tick', 'end');
    cls.forEach((c, i) => {
      const x = L + i * bw, v = fr[i];
      s += `<g class="fb" tabindex="0" data-tip="${esc('Class ' + c + '\nFrequency ' + v)}"><rect class="fs ff acc" x="${R(x + 1)}" y="${R(y(v))}" width="${R(bw - 2)}" height="${R(H - B - y(v))}"/>${tx(x + bw / 2, y(v) - 4, v, 'sm')}</g>` + tx(x + bw / 2, H - B + 15, c, 'tick');
    });
    s += ln(L, H - B, W - Rr, H - B, 'ax') + ln(L, T, L, H - B, 'ax') + tx(W / 2, H - 4, 'Class interval', 'sm') + tx(10, H / 2, 'Frequency', 'sm', 'middle').replace('<text', '<text transform="rotate(-90 10 ' + H / 2 + ')"');
    return wrap(W, H, s, 'Frequency distribution · hover or tap a bar', 'Histogram of the frequency distribution');
  }
  function freqTable(cls, fr) {
    const h = '<table class="mini fig-t"><tr><th>Class</th>' + cls.map(c => `<th>${esc(c)}</th>`).join('') + '</tr><tr><th>Frequency</th>' + fr.map(f => `<td>${esc(f)}</td>`).join('') + '</tr></table>';
    return h;
  }
  const PIE = ['#3b4fd8', '#16a34a', '#f59e0b', '#e5484d', '#7c3aed', '#0891b2', '#db2777', '#65a30d'];
  function pie(items, angles, showAngle) {
    const W = 330, H = 220, c = [110, 110], r = 82, tot = items.reduce((a, b) => a + b.v, 0);
    let a0 = 90, s = '', leg = '';
    items.forEach((it, i) => {
      const a = angles ? it.v : 360 * it.v / tot, a1 = a0 - a, P0 = pol(c[0], c[1], r, a0), P1 = pol(c[0], c[1], r, a1), mid = pol(c[0], c[1], r * .62, (a0 + a1) / 2);
      const col = PIE[i % PIE.length], d = items.length === 1 ? `M${c[0] - r} ${c[1]}A${r} ${r} 0 1 0 ${c[0] + r} ${c[1]}A${r} ${r} 0 1 0 ${c[0] - r} ${c[1]}` : `M${c[0]} ${c[1]}L${R(P0[0])} ${R(P0[1])}A${r} ${r} 0 ${a > 180 ? 1 : 0} 1 ${R(P1[0])} ${R(P1[1])}Z`;
      s += `<path class="fs" d="${d}" style="fill:${col};fill-opacity:.82;stroke:#fff;stroke-width:2" data-tip="${esc(it.n + '\n' + (angles ? it.v + '°' : it.v))}" tabindex="0"/>`;
      if (showAngle || angles) s += tx(mid[0], mid[1] + 4, (angles ? it.v : fm(a)) + '°', 'sm w');
      leg += `<rect x="228" y="${36 + i * 22}" width="12" height="12" rx="3" style="fill:${col};fill-opacity:.82"/>` + tx(246, 47 + i * 22, it.n + (angles ? '' : ' (' + it.v + ')'), 'sm', 'start');
      a0 = a1;
    });
    return wrap(W, H, s + leg, 'Pie diagram · hover or tap a slice', 'Pie diagram');
  }

  /* ================= science ================= */
  function lens(kind, u, f, solved, cap) {
    const W = 340, H = 210, ay = 105, xl = 175, convex = kind === 'convex';
    let v = null, hi = 0, virtual = false;
    if (convex) { if (Math.abs(u - f) > 1e-6) { v = u * f / (u - f); virtual = v < 0; } } else { v = -u * f / (u + f); virtual = true; }
    let sc = Math.min(150 / Math.max(u, 2 * f), 1000); if (convex && v && !virtual) sc = Math.min(sc, 140 / v);
    if (sc * u > 150) sc = 150 / u;
    const ho = 38, xo = xl - u * sc, tip = [xo, ay - ho], fpx = f * sc;
    let s = ln(10, ay, W - 10, ay, 'ax') + (convex ? `<path class="fs ff lens" d="M${xl} ${ay - 66}Q${xl + 17} ${ay} ${xl} ${ay + 66}Q${xl - 17} ${ay} ${xl} ${ay - 66}Z"/>` + path(`M${xl - 6} ${ay - 58}L${xl} ${ay - 68}L${xl + 6} ${ay - 58}M${xl - 6} ${ay + 58}L${xl} ${ay + 68}L${xl + 6} ${ay + 58}`, 'thin')
      : `<path class="fs ff lens" d="M${xl - 8} ${ay - 66}Q${xl + 3} ${ay} ${xl - 8} ${ay + 66}L${xl + 8} ${ay + 66}Q${xl - 3} ${ay} ${xl + 8} ${ay - 66}Z"/>` + path(`M${xl - 7} ${ay - 76}L${xl} ${ay - 66}L${xl + 7} ${ay - 76}M${xl - 7} ${ay + 76}L${xl} ${ay + 66}L${xl + 7} ${ay + 76}`, 'thin'));
    [[-1, 'F'], [1, 'F']].forEach(([sg, n]) => { const x = xl + sg * fpx; s += ln(x, ay - 4, x, ay + 4) + tx(x, ay + 19, n + (sg < 0 ? '' : ''), 'sm'); if (2 * fpx < 160) { const x2 = xl + sg * 2 * fpx; s += ln(x2, ay - 4, x2, ay + 4) + tx(x2, ay + 19, '2F', 'sm'); } });
    s += dot(xl, ay) + tx(xl + 7, ay + 17, 'O', 'sm', 'start');
    s += `<g><line class="fs acc thick" x1="${R(xo)}" y1="${ay}" x2="${R(xo)}" y2="${R(tip[1])}"/><path class="fs acc" d="M${R(xo - 5)} ${R(tip[1] + 9)}L${R(xo)} ${R(tip[1])}L${R(xo + 5)} ${R(tip[1] + 9)}"/></g>` + tx(Math.max(xo, 28), tip[1] - 7, 'Object', 'sm acc');
    if (solved && v != null) {
      const ix = xl + v * sc, iy = ay + (virtual ? -1 : 1) * ho * Math.abs(v) / u, itip = [ix, iy], endx = W - 14;
      const ray = (Lp) => { const d = virtual ? sub(Lp, itip) : sub(itip, Lp), t = (endx - Lp[0]) / d[0]; return [Lp[0] + d[0] * t, Lp[1] + d[1] * t]; };
      const L1 = [xl, tip[1]], L2 = [xl, ay], e1 = ray(L1), e2 = ray(L2);
      s += ln(tip[0], tip[1], L1[0], L1[1], 'ray') + ln(L1[0], L1[1], e1[0], e1[1], 'ray') + ln(tip[0], tip[1], L2[0], L2[1], 'ray') + ln(L2[0], L2[1], e2[0], e2[1], 'ray');
      if (virtual) s += ln(L1[0], L1[1], itip[0], itip[1], 'ray dash') + ln(L2[0], L2[1], itip[0], itip[1], 'ray dash');
      s += `<line class="fs red${virtual ? ' dash' : ''} thick" x1="${R(ix)}" y1="${ay}" x2="${R(ix)}" y2="${R(iy)}"/><path class="fs red" d="M${R(ix - 5)} ${R(iy + (iy > ay ? -9 : 9))}L${R(ix)} ${R(iy)}L${R(ix + 5)} ${R(iy + (iy > ay ? -9 : 9))}"/>` + tx(ix, iy > ay ? iy + 15 : iy - 7, 'Image', 'sm red');
    } else if (!solved) {
      s += ln(tip[0], tip[1], xl, tip[1], 'ray') + ln(tip[0], tip[1], xl, ay, 'ray');
    }
    s += dim(xl - u * sc / 2, ay + 44, 'u = ' + fm(u) + ' cm') + dim(xl + fpx / 2, ay + 44, 'f = ' + fm(f) + ' cm');
    return wrap(W, H, s, cap || ('Not to scale' + (solved ? '' : ' · image not shown')), (convex ? 'Convex' : 'Concave') + ' lens with an object on the principal axis');
  }
  function prism() {
    const W = 340, H = 210, A = [165, 34], B = [105, 138], C = [225, 138], hit = [mid(A, B)[0] + 4, mid(A, B)[1]];
    let s = poly([A, B, C], 'ff') + ln(24, 98, hit[0], hit[1], 'ray thick') + tx(24, 88, 'White light', 'sm', 'start');
    const out = [[84, 'Violet', '#7c3aed'], [90, 'Indigo', '#4338ca'], [96, 'Blue', '#2563eb'], [102, 'Green', '#16a34a'], [108, 'Yellow', '#eab308'], [114, 'Orange', '#f97316'], [120, 'Red', '#dc2626']];
    const e = mid(A, C), ex = e[0] - 6, ey = e[1] + 14;
    s += ln(hit[0], hit[1], ex, ey, 'ray');
    out.forEach(([y, n, c], i) => { const ty = 78 + (i - 3) * 0 + (i * 12) - 0; s += `<line x1="${R(ex)}" y1="${R(ey)}" x2="${W - 40}" y2="${R(120 + i * 13 - 10)}" style="stroke:${c};stroke-width:2.4"/>`; if (i === 0 || i === 6) s += tx(W - 36, 120 + i * 13 - 6, n, 'sm', 'start'); });
    s += ln(W - 40, 100, W - 40, 224 - 40, 'thin') + tx(W - 40, 202, 'Screen', 'sm');
    return wrap(W, H, s, 'Violet bends the most, red the least · not to scale', 'Prism splitting white light into a spectrum');
  }
  /* a circuit: battery on the left, resistor(s) along the top (series) or between two rails (parallel) */
  function circuit(o) {
    const W = 330, H = 210, x0 = 40, x1 = 290, yt = 40, yb = 170, rs = o.Rs, mode = o.mode, label = o.bulb ? 'bulb' : '';
    let s = '';
    const zig = (xa, xb, y, text) => {
      const w = xb - xa, m = [xa + w * .25, xa + w * .35, xa + w * .45, xa + w * .55, xa + w * .65, xa + w * .75];
      return ln(xa, y, m[0], y) + path(`M${R(m[0])} ${y}L${R(m[1])} ${y - 9}L${R(m[2])} ${y + 9}L${R(m[3])} ${y - 9}L${R(m[4])} ${y + 9}L${R(m[5])} ${y}`) + ln(m[5], y, xb, y) + tx((xa + xb) / 2, y - 16, text, 'sm');
    };
    const rl = i => (label ? 'Bulb ' : 'R' + (rs.length > 1 ? (i + 1) : '') + ' = ') + rs[i];
    if (mode === 'parallel') {
      const n = rs.length, ys = rs.map((_, i) => yt + 14 + i * ((yb - yt - 28) / Math.max(1, n - 1))), xa = 130, xb = 250;
      s += ln(x0, yt, x0, yb) + ln(x0, yt, xa - 20, yt) + ln(x0, yb, xa - 20, yb) + ln(xa - 20, yt, xa - 20, yb) + ln(xb + 20, yt, xb + 20, yb) + ln(xb + 20, yt, x1, yt) + ln(xb + 20, yb, x1, yb) + ln(x1, yt, x1, yb);
      s += '';
      ys.forEach((y, i) => { s += ln(xa - 20, y, xa, y) + zig(xa, xb, y, rl(i)).replace(/<text[^>]*>.*?<\/text>/, tx((xa + xb) / 2, y - 14, rl(i), 'sm')) + ln(xb, y, xb + 20, y); });
    } else {
      s += ln(x0, yt, x0, yb) + ln(x0, yb, x1, yb) + ln(x1, yb, x1, yt) + ln(x0, yt, x0 + 40, yt);
      const seg = (x1 - 40 - (x0 + 40)) / rs.length;
      rs.forEach((_, i) => { s += zig(x0 + 40 + i * seg, x0 + 40 + (i + 1) * seg, yt, rl(i)); });
      s += ln(x0 + 40 + rs.length * seg, yt, x1, yt);
    }
    /* battery on the left wire */
    const by = (yt + yb) / 2;
    s += `<rect x="${x0 - 12}" y="${by - 16}" width="24" height="32" class="fs" style="fill:#fff;stroke:none"/>` + ln(x0 - 12, by - 8, x0 + 12, by - 8, 'thick') + ln(x0 - 6, by + 6, x0 + 6, by + 6, 'thick') + tx(x0 + 18, by - 6, '+', 'sm', 'start') + tx(x0 + 18, by + 14, '−', 'sm', 'start');
    s += dim(x0 - 18, by + 4, o.V, 'end');
    s += `<g><path class="fs acc" d="M${(x0 + x1) / 2 - 12} ${yb + 18}H${(x0 + x1) / 2 + 12}M${(x0 + x1) / 2 + 5} ${yb + 13}l7 5-7 5"/>${dim((x0 + x1) / 2, yb + 34, 'I = ' + o.I)}</g>`;
    return wrap(W, H, s, 'Circuit sketch · not to scale', 'Electric circuit with a battery and ' + (mode === 'parallel' ? 'parallel' : 'series') + ' resistors');
  }

  /* ================= the rules ================= */
  const nm3 = s => s.split('');
  const RULES = [];
  const rule = (name, fn) => RULES.push({ name, fn });

  /* ---- maths: triangles ---- */
  rule('right-legs', (t) => {
    let m = t.match(rx('sides forming the right angle of a right-angled triangle are # cm and # cm')) || t.match(rx('two sides forming the right angle of a right-angled triangle are # cm and # cm'));
    if (m) return rtri({ na: m[1], nb: m[2], la: m[1] + ' cm', lb: m[2] + ' cm', lc: '?', alt: 'Right-angled triangle' });
    m = t.match(rx('right-angled triangle the hypotenuse is # cm and one of the other sides is # cm'));
    if (m) return rtri({ na: m[2], nb: Math.sqrt(m[1] * m[1] - m[2] * m[2]), la: m[2] + ' cm', lb: '?', lc: m[1] + ' cm', alt: 'Right-angled triangle' });
    return null;
  });
  rule('right-alt', (t) => {
    const m = t.match(/right-angled Δ([A-Z])([A-Z])([A-Z]).*?∠\1\2\3 = 90°.*?([A-Z]{2}) ⊥ \1\3 with ([A-Z]{2}) = (\d+(?:\.\d+)?) and ([A-Z]{2}) = (\d+(?:\.\d+)?)/);
    if (!m) return null;
    const foot = m[4][1]; if (m[5][1] !== foot && m[5][0] !== foot) return null;
    const a = m[5][0] === m[1] ? +m[6] : +m[8], b = m[5][0] === m[1] ? +m[8] : +m[6];
    return altTri(m[1], m[2], m[3], foot, a, b, '?');
  });
  rule('ladder', (t) => {
    const m = t.match(rx('ladder # m long leans against a vertical wall with its foot # m from the wall'));
    return m && +m[1] > +m[2] ? rtri({ wall: 1, na: Math.sqrt(m[1] * m[1] - m[2] * m[2]), nb: m[2], la: '?', lb: m[2] + ' m', lc: 'ladder ' + m[1] + ' m', cap: 'Not to scale', alt: 'Ladder leaning against a wall' }) : null;
  });
  rule('elevation', (t) => {
    const m = t.match(rx('# m (?:away )?from the foot of (?:a|an|the) ([a-z-]+)')), a = t.match(rx('angle of elevation[^.]*?# ?°|angle of elevation[^.]*?of #°'));
    const ang = t.match(/angle of elevation[^.]*?(\d+)°/i);
    if (!m || !ang) return null;
    return elevation(m[1], +ang[1], m[2], '?');
  });
  rule('equilateral', (t) => { const m = t.match(rx('altitude of an equilateral triangle of side # cm')); return m ? equilateral(m[1]) : null; });
  rule('rhombus', (t) => { const m = t.match(rx('diagonals of a rhombus are # cm and # cm')); return m ? rhombus(m[1], m[2]) : null; });
  rule('bpt', (t) => {
    let m = t.match(/Δ([A-Z])([A-Z])([A-Z]),? ([A-Z])([A-Z]) ∥ \2\3/);
    if (m && /D on AB|on \1\2/.test(t)) return bpt([m[1], m[2], m[3]], m[4], m[5], m[2] + m[3]);
    if (/Basic Proportionality Theorem|parallel to one side of a triangle/i.test(t)) return bpt(['A', 'B', 'C'], 'D', 'E', 'BC');
    return null;
  });

  /* ---- maths: circles ---- */
  rule('tangent-len', (t) => {
    const m = t.match(rx('(?:point|P) (?:P )?is # cm from the centre (?:O )?of a circle of radius # cm')) || t.match(rx('A point is # cm from the centre of a circle of radius # cm'));
    return m && +m[1] > +m[2] ? tangentExt(+m[1], +m[2]) : null;
  });
  rule('tangent-two', (t) => {
    const m = t.match(/[Tt]angents? ([A-Z])([A-Z]) and \1([A-Z]) (?:are )?drawn.*?external point/);
    if (m) { const ang = t.match(/∠[A-Z]{3} = (\d+)°/); return twoTangents([m[1], m[2], m[3]], ang ? +ang[1] : 0, /∠AOB|∠[A-Z]O[A-Z]/.test(t) && !!ang); }
    if (/tangents? .*(?:drawn )?(?:to a circle )?from an external point/i.test(t) && /Prove|prove/.test(t) && !/construct|Draw a circle/i.test(t)) return twoTangents(['P', 'A', 'B'], 0, false);
    return null;
  });
  rule('tangent-secant', (t) => {
    const m = t.match(rx('tangent PT and a secant PAB.*?PA = # cm and PB = # cm'));
    return m ? tangentSecant(m[1], m[2]) : null;
  });
  rule('tangent-radius', (t) => /tangent at (?:any|a) point of a circle is (?:perpendicular|______)/i.test(t) ? tangentRadius() : null);
  rule('inscribed', (t) => {
    let m = t.match(/∠([A-Z])([A-Z])([A-Z]) is an inscribed angle in a circle with centre O, and ∠\1\2\3 = (\d+)°/);
    if (m) return inscribed(+m[4], [m[1], m[3], m[2]], true);          // angle at the middle letter
    m = t.match(rx('inscribed angle subtends arc AB and measures #°')) || t.match(rx('inscribed angle in a circle measures #°'));
    return m ? inscribed(+m[1], ['A', 'B', 'C'], true) : null;
  });
  rule('cyclic', (t) => {
    const m = t.match(/cyclic quadrilateral ([A-Z])([A-Z])([A-Z])([A-Z]),? ∠([A-Z]) = (\d+)°\. Find ∠([A-Z])/);
    return m ? cyclic([m[1], m[2], m[3], m[4]], m[5], m[6], m[7]) : null;
  });
  rule('chords', (t) => {
    const m = t.match(/Chords ([A-Z])([A-Z]) and ([A-Z])([A-Z]) of a circle intersect at ([A-Z])\.(.*?)Find ([A-Z]{2})/);
    if (!m) return null;
    const vals = {}; (m[6].match(/[A-Z]{2} = \d+(?:\.\d+)?/g) || []).forEach(x => { const p = x.split(' = '); vals[p[0]] = p[1]; });
    return chords([m[1], m[2]], [m[3], m[4]], m[5], vals, m[7]);
  });
  rule('sector', (t) => {
    let m = t.match(rx('sector of a circle of radius # cm with central angle #°')); if (m) return sector(m[1], +m[2]);
    m = t.match(rx('arc of a circle of radius # cm that subtends a central angle of #°')); if (m) return sector(m[1], +m[2]);
    m = t.match(/circle with centre ([A-Z]) and radius (\d+(?:\.\d+)?) cm, chord ([A-Z])([A-Z]) subtends a right angle at \1/); if (m) return sector(m[2], 90, [m[1], m[3], m[4]], true);
    return null;
  });
  rule('circle-r', (t) => { const m = t.match(rx('(?:area|circumference) of a circle of radius # cm')); return m ? circleR(m[1]) : null; });

  /* ---- maths: solids ---- */
  rule('solids', (t) => {
    let m;
    if (/melt|recast/i.test(t)) {
      const sp = t.match(rx('sphere of radius # cm')), co = t.match(rx('cones? of radius # cm and height # cm')), cy = t.match(rx('cylinders? of radius # cm and height # cm')), wi = t.match(rx('wire of circular cross-section of radius # cm'));
      if (sp && co) return solids([['sphere', { r: sp[1] }], '->', ['cone', { r: co[1], h: co[2] }]], 'Not to scale', 'Sphere melted into cones');
      if (sp && cy) return solids([['sphere', { r: sp[1] }], '->', ['cylinder', { r: cy[1], h: cy[2] }]], 'Not to scale', 'Sphere melted into cylinders');
      if (sp && wi) return solids([['sphere', { r: sp[1] }], '->', ['cylinder', { r: wi[1], h: 'length = ?' }]], 'The wire is a long cylinder · not to scale', 'Sphere drawn into a wire');
      return null;
    }
    m = t.match(rx('frustum of a cone has radii # cm and # cm and height # cm'));
    if (m) { const a = Math.max(+m[1], +m[2]), b = Math.min(+m[1], +m[2]); return solids([['frustum', { R: a, r: b, h: m[3], l: 'l' }]], 'Frustum of a cone · not to scale', 'Frustum of a cone'); }
    m = t.match(rx('radius of a cone is # cm and (?:its|the) (?:perpendicular )?height (?:is )?# cm')) || t.match(rx('cone of radius # cm and height # cm'));
    if (m) { const sl = /slant height/i.test(t) && /find|is:/i.test(t) ? '?' : /curved surface|total surface/i.test(t) ? 'l' : 'l'; return solids([['cone', { r: m[1], h: m[2], l: sl }]], 'Not to scale', 'Cone'); }
    m = t.match(rx('cylinder of radius # cm and height # cm')); if (m && !/melting/i.test(t)) return solids([['cylinder', { r: m[1], h: m[2] }]], 'Not to scale', 'Cylinder');
    m = t.match(rx('cuboid of length # cm, breadth # cm and height # cm')); if (m) return solids([['cuboid', { l: m[1], b: m[2], h: m[3] }]], 'Not to scale', 'Cuboid');
    m = t.match(rx('cube of edge # cm')); if (m) return solids([['cube', { l: m[1], b: m[1], h: m[1] }]], 'Not to scale', 'Cube');
    m = t.match(rx('sphere of radius # cm')); if (m && !/melt|recast|hemisphere/i.test(t) && /volume|surface|area/i.test(t)) return solids([['sphere', { r: m[1] }]], 'Not to scale', 'Sphere');
    return null;
  });

  /* ---- maths: coordinates ---- */
  const PT = /(?:([A-Z])\s*)?\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)/g;
  rule('coords', (t) => {
    if (!/distance|slope|mid-?point|collinear|vertices|divides|section|joining|line (?:through|passing)|from the origin|coordinates?/i.test(t)) return null;
    if (/Draw the graph|probability|equation of the line .* y =/i.test(t) && !/slope|joining|through/.test(t)) return null;
    let m, pts = []; PT.lastIndex = 0;
    while ((m = PT.exec(t))) pts.push({ n: m[1] || '', x: +m[2], y: +m[3] });
    const ang = t.match(/line makes an angle of (\d+)° with the positive X-axis/i); if (ang) return slopeAngle(+ang[1]);
    if (/from the origin/i.test(t) && pts.length === 1) return plane([{ n: 'O', x: 0, y: 0 }, pts[0]], { lines: [[0, 1]], cap: 'Distance of a point from the origin', alt: 'A point and the origin' });
    if (pts.length < 2 || pts.length > 6) return null;
    const lines = []; const o = { cap: 'Points drawn on the coordinate plane', alt: 'Points on a coordinate plane' };
    if (/collinear/i.test(t) && pts.length === 3) { lines.push([0, 1], [1, 2]); }
    else if (/vertices/i.test(t)) { /* points only */ }
    else if (pts.length >= 2 && !/divides|section/i.test(t)) lines.push([0, 1]);
    else if (pts.length === 2) lines.push([0, 1]);
    if (/divides|section/i.test(t) && pts.length === 2) lines.push([0, 1]);
    if (/slope|line (?:through|passing)|joining.*slope/i.test(t) && pts.length === 2) { lines.length = 0; o.ext = [[0, 1]]; }
    o.lines = lines;
    return plane(pts, o);
  });

  /* ---- maths: statistics ---- */
  rule('freq', (t) => {
    const cls = (t.match(/\d+(?:\.\d+)?\s*[–-]\s*\d+(?:\.\d+)?/g) || []).map(c => c.replace(/\s*[–-]\s*/, '–'));
    if (cls.length < 3 || !/frequenc/i.test(t)) return null;
    const m = t.match(/(?:with frequencies|frequencies:|frequencies of [^.]*? are|frequencies are)\s*([0-9x][0-9x,\s]*(?:and\s*[0-9x]+)?)/i); if (!m) return null;
    const fr = m[1].replace(/and/g, ',').split(',').map(x => x.trim()).filter(Boolean);
    if (fr.length !== cls.length) return null;
    if (fr.every(x => /^\d+$/.test(x))) return histogram(cls, fr.map(Number));
    return `<figure class="fig">${freqTable(cls, fr)}<figcaption>The frequency distribution</figcaption></figure>`;
  });
  rule('rect-semi', (t) => {
    const m = t.match(/ABCD is a rectangle\. AD is the diameter of a semicircle AXD which meets the diagonal BD at X\. AB = (\d+(?:\.\d+)?) and AD = (\d+(?:\.\d+)?)/);
    if (!m) return null;
    const ab = +m[1], ad = +m[2], k = Math.min(190 / ab, 140 / ad), W = 300, H = 200, x0 = 75, y0 = 172, A = [x0, y0], B = [x0 + ab * k, y0], C = [B[0], y0 - ad * k], D = [x0, y0 - ad * k];
    const bd = sub(D, B), t0 = ((A[0] - B[0]) * bd[0] + (A[1] - B[1]) * bd[1]) / (bd[0] * bd[0] + bd[1] * bd[1]), X = [B[0] + bd[0] * t0, B[1] + bd[1] * t0];
    let s = poly([A, B, C, D], 'ff') + path(`M${R(D[0])} ${R(D[1])}A${R(ad * k / 2)} ${R(ad * k / 2)} 0 0 1 ${R(A[0])} ${R(A[1])}`, 'acc') + ln(B[0], B[1], D[0], D[1]) + dot(X[0], X[1]);
    s += tx(A[0] - 10, A[1] + 14, 'A', 'b') + tx(B[0] + 10, B[1] + 14, 'B', 'b') + tx(C[0] + 10, C[1] - 6, 'C', 'b') + tx(D[0] - 10, D[1] - 6, 'D', 'b') + tx(X[0] + 8, X[1] - 7, 'X', 'b');
    s += dim((A[0] + B[0]) / 2, y0 + 18, 'AB = ' + m[1]) + dim(A[0] - 12, (A[1] + D[1]) / 2 + 4, 'AD = ' + m[2], 'end');
    return wrap(W, H, s, 'Not to scale', 'Rectangle ABCD with a semicircle on AD');
  });
  rule('pie', (t) => {
    let m = t.match(/central angles ((?:[A-Za-z]+: ?\d+°,? ?)+)/);
    if (m) { const it = [...m[1].matchAll(/([A-Za-z]+): ?(\d+)°/g)].map(x => ({ n: x[1], v: +x[2] })); return it.length >= 2 ? pie(it, true, true) : null; }
    if (!/pie diagram|pie chart/i.test(t) || !/central angle/i.test(t)) return null;
    const colon = t.lastIndexOf(':'); if (colon < 0) return null;
    const seg = t.slice(colon + 1).split(/\.\s*Find|\. Find|Find/)[0];
    const it = seg.split(',').map(s => s.trim().match(/^(.+?)\s+(\d+(?:\.\d+)?)$/)).filter(Boolean).map(x => ({ n: x[1], v: +x[2] }));
    return it.length >= 3 && it.length <= 8 ? pie(it, false, false) : null;
  });

  /* ---- science ---- */
  rule('lens', (t, solved) => {
    let m = t.match(rx('placed # cm (?:in front of|from) (?:a|the) (convex|concave) lens of focal length # cm'));
    if (m) return lens(m[2].toLowerCase(), +m[1], +m[3], solved);
    if (/Draw a ray diagram for an object placed between F and 2F of a convex lens/i.test(t)) return solved ? lens('convex', 15, 10, true, 'Object between F and 2F: image is real, inverted, magnified and beyond 2F') : null;
    return null;
  });
  rule('prism', (t, solved) => /disperses? white light|dispersion of (?:white )?light.*prism/i.test(t) && /ray diagram|diagram/i.test(t) ? (solved ? prism() : null) : null);
  rule('circuit', (t) => {
    if (!/resistor|bulb|filament|battery|potential difference|Ω/i.test(t) || /Find the power|energy|heat|kWh|unit/i.test(t)) return null;
    const rs = [...t.matchAll(/(\d+(?:\.\d+)?)\s*Ω/g)].map(x => x[1]), V = (t.match(/(\d+(?:\.\d+)?)\s*V\b/) || [])[1], I = (t.match(/(\d+(?:\.\d+)?)\s*A\b/) || [])[1];
    const bulb = /bulb|filament/i.test(t);
    let mode = 'single';
    if (rs.length >= 2) { if (/in parallel|parallel across|are connected in parallel/i.test(t)) mode = 'parallel'; else if (/series/i.test(t)) mode = 'series'; else return null; }
    else if ((V ? 1 : 0) + (I ? 1 : 0) + rs.length < 2) return null;
    const Rs = rs.length ? rs.map(x => x + ' Ω') : [Q];
    if (!rs.length && !/resistance/i.test(t)) return null;
    const askV = /potential difference across|find the (?:potential difference|voltage)|\(in volts\)/i.test(t), askI = /find the current|\(in ampere\)|current in the circuit/i.test(t);
    return circuit({ Rs, mode, bulb, V: V ? V + ' V' : (askV || !V) && mode !== 'parallel' ? '? V' : 'V', I: I ? I + ' A' : '?' });
  });

  const cache = new WeakMap();
  function forQuestion(q, solved) {
    if (!q || q.fig === false) return '';
    const key = (solved ? 's' : 't');
    let hit = cache.get(q); if (hit && key in hit) return hit[key];
    const t = clean(q.q); let out = '';
    for (const r of RULES) { try { const f = r.fn(t, !!solved, q); if (f) { out = f; break; } } catch (e) { out = ''; } }
    if (!hit) { hit = {}; cache.set(q, hit); }
    hit[key] = out; return out;
  }
  /* a data table for frequency questions is helpful next to the histogram */
  function nameOf(q, solved) { const t = clean(q.q); for (const r of RULES) { try { if (r.fn(t, !!solved, q)) return r.name; } catch (e) { } } return ''; }
  const api = { forQuestion, nameOf, _clean: clean };
  (typeof window !== 'undefined' ? window : globalThis).FIG = api;
  if (typeof module !== 'undefined') module.exports = api;
})();

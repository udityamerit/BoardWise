/* UP Board Class IX: turns each subject's question bank (up9-*.js) into 10 practice tests, and gives the app their Hindi.
   Each test takes a share of every chapter in proportion to the chapter's questions; within a chapter the questions are shuffled once
   with this pack's own seed and dealt in turn to the tests, so a question comes back only after the rest of its chapter has been used.
   A generator makes a fresh numerical for every test it is dealt to. Loaded after neet-hi.js (it wraps NL.hiQ). */
(function () {
const U9 = window.U9, NL = window.NL; if (!U9 || !NL) return;
const MOCKS = 10, HI = U9.HI;
const plain = h => String(h).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();

/* item -> { ch, q:[en,hi], o:[[en,hi] x4] (right first), s:[en,hi] }; a generator gets its own random source */
function expand(it, r) {
  let a = it.gen ? null : it.slice(1), ch = it.gen ? it.ch : it[0];
  if (it.gen) for (let t = 0; t < 20; t++) {
    const g = it.gen(r), en = g.slice(1, 5).map(x => plain(U9.bi(x)[0]));
    if (new Set(en).size === 4) { a = g; break; }
  }
  if (!a) throw new Error('up9: generator for chapter ' + ch + ' keeps giving repeated options');
  return { ch, q: U9.bi(a[0]), o: a.slice(1, 5).map(U9.bi), s: U9.bi(a[5]) };
}
/* how many questions each chapter gives one test: proportional to its bank, largest remainder, never more than it has */
function quotas(counts, n) {
  const tot = counts.reduce((x, y) => x + y, 0), q = counts.map(c => Math.min(c, Math.floor(c * n / tot)));
  let left = n - q.reduce((x, y) => x + y, 0);
  const order = counts.map((c, i) => [c * n / tot - Math.floor(c * n / tot), i]).sort((x, y) => y[0] - x[0]).map(x => x[1]);
  for (let pass = 0; left > 0 && pass < 50; pass++) order.forEach(i => { if (left > 0 && q[i] < counts[i]) { q[i]++; left--; } });
  return q;
}

Object.keys(U9.bank).forEach(key => {
  const S = U9.bank[key], M = S.meta, N = M.n;
  const byCh = S.ch.map(() => []);
  S.items.forEach(it => byCh[it.gen ? it.ch : it[0]].push(it));
  byCh.forEach((list, c) => NL.shuffle(list, NL.rng(NL.hash('up9|' + key + '|' + c))));
  const counts = byCh.map(l => l.length), Q = quotas(counts, N);
  const subj = window.SUBJECTS.find(s => s.key === key);
  for (let k = 0; k < MOCKS; k++) {
    const id = key + '-mock-' + (k + 1), r = NL.rng(NL.hash('up9#' + key + '#' + k)), qs = [], seen = new Set();
    byCh.forEach((list, c) => {
      for (let j = 0; j < Q[c]; j++) {
        const x = expand(list[(k * Q[c] + j) % list.length], r);
        const t = plain(x.q[0]); if (seen.has(t)) continue; seen.add(t);
        qs.push(x);
      }
    });
    NL.shuffle(qs, r);
    const questions = qs.map((x, i) => {
      const p = NL.shuffle([0, 1, 2, 3], r), qid = 'q-' + (i + 1);
      if (M.bilingual) HI.set(id + '|' + qid, { q: x.q[1], o: p.map(j => x.o[j][1]), s: x.s[1] });
      return { id: qid, type: 'mcq', marks: 1, chapter: S.ch[x.ch], q: x.q[0], options: p.map(j => x.o[j][0]), answer: p.indexOf(0), solution: x.s[0] };
    });
    const nq = questions.length;
    window.PAPERS.push({ id, subject: key, board: 'up9', level: 'Class IX', kind: 'mock', year: null, durationMin: M.min, bilingual: !!M.bilingual,
      title: `${M.name} — Class IX Practice Test ${k + 1}`,
      desc: `${nq} MCQs · ${nq} marks · ${M.min} min · no negative marking · all ${S.ch.length} chapters · ${M.bilingual ? 'Hindi + English' : M.lang}`,
      note: M.paperNote,
      sections: [{ id: 'obj', title: M.name + ' — objective questions', part: null, instruction: 'All questions are compulsory. Each question carries 1 mark. There is no negative marking.', questions }] });
  }
  if (subj) subj.bankSize = S.items.length;
});

/* the app asks NL.hiQ for a question's Hindi; Class IX questions answer from U9.HI, the rest from the NEET translator */
const prev = NL.hiQ;
NL.hiQ = k => HI.has(k) ? HI.get(k) : prev ? prev(k) : null;
})();

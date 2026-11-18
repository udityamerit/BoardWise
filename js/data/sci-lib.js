/* Science question bank helpers (loaded after lib.js). Banks are filled by sci-phy.js, sci-chem.js, sci-bio.js, sci-env.js and assembled by sci-build.js.
   SCI.add(part, chapter, { mcq, one, two, three, five })
     mcq   : [question, right, wrong1, wrong2, wrong3, solution]
     one   : [question, [accepted answers] | null, solution]        (null = self-checked 1-mark answer)
     two / three / five : [question, model answer]  (self-checked)   or   SCI.N(question, answer, solution, hint, tol)  (auto-marked numerical) */
(function () {
const S = window.SCI = { bank: { 1: {}, 2: {} } };
S.add = (part, ch, cats) => {
  const b = S.bank[part][ch] || (S.bank[part][ch] = { mcq: [], one: [], two: [], three: [], five: [] });
  Object.keys(cats).forEach(k => b[k].push(...cats[k]));
};
const fmt = x => String(+(+x).toPrecision(8));
S.N = (q, ans, sol, hint, tol) => ({ num: true, q, acc: [fmt(ans)], sol, hint, tol });
S.fmt = fmt;
})();

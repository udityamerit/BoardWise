/* History & Political Science question bank helpers (loaded after lib.js). Banks are filled by hist-1.js, hist-2.js, hist-3.js and pol.js and assembled by hist-build.js.
   HB.add(chapter, { mcq, one, two, three, four, tf, passage })
     mcq     : [question, right, wrong1, wrong2, wrong3, solution]
     one     : [question, [accepted answers], solution]           (auto-marked one-word answer)
     two / three / four : [question, model answer]                 (self-checked)
     tf      : [statement, true|false, reason]                     (2-mark "true or false, with reasons")
     passage : { text, qs: [[question, model answer] x3] }         (passage-based, 2 marks each) */
(function () {
const HB = window.HB = { bank: {} };
HB.add = (ch, cats) => {
  const b = HB.bank[ch] || (HB.bank[ch] = { mcq: [], one: [], two: [], three: [], four: [], tf: [], passage: [] });
  Object.keys(cats).forEach(k => b[k].push(...cats[k]));
};
})();

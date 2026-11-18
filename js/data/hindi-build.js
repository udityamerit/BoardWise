/* Assembles Hindi mock tests 2–10 (80 marks, 180 min) from the banks in hin-1..4.js.
   Same layout as Hindi mock 1: unseen passage 16 + poem 16 + grammar 24 + writing 24.
   Every list in the banks holds exactly 9 items, so paper k (0..8) takes item k and nothing repeats across mocks 2–10. */
(function () {
const { bld, sec, opts } = window.QB;
const HN = window.HN;
const U = 'अपठित गद्यांश', P = 'पद्य', G = 'व्याकरण', W = 'लेखन';

const need = (name, arr) => { if (!arr || arr.length !== 9) throw new Error(`hindi bank "${name}" must hold 9 items, has ${arr ? arr.length : 0}`); };
need('up', HN.up); need('po', HN.po); need('letter', HN.letter); need('essay', HN.essay); need('dialogue', HN.dialogue);
Object.keys(HN.gm1).forEach(k => need('gm1.' + k, HN.gm1[k]));
Object.keys(HN.gm2).forEach(k => need('gm2.' + k, HN.gm2[k]));
Object.keys(HN.gs).forEach(k => need('gs.' + k, HN.gs[k]));
if (Object.keys(HN.gm1).length !== 8 || Object.keys(HN.gm2).length !== 4 || Object.keys(HN.gs).length !== 4) throw new Error('hindi grammar banks: expected 8 + 4 + 4 kinds');

// Mock 1 stays as it is; skip a bank item whose question text equals one already used in hindi-mock-1.
const norm = t => String(t).replace(/\s+/g, ' ');
const inMock1 = new Set();
(window.PAPERS.find(p => p.id === 'hindi-mock-1') || { sections: [] }).sections.forEach(s => s.questions.forEach(q => inMock1.add(norm(q.q))));

let posCtr = 0;
const mcqOf = (B, marks, ch, item) => {
  const [q, right, w1, w2, w3, sol] = item;
  if (inMock1.has(norm(q))) throw new Error('hindi bank repeats a mock-1 question: ' + q);
  const r = opts(right, [w1, w2, w3], posCtr++);
  return B.mcq(marks, ch, q, r.o, r.a, sol);
};

for (let k = 0; k < 9; k++) {
  const N = k + 2, B = bld('h' + N + '-');
  const up = HN.up[k], po = HN.po[k];
  const upPass = `<h4>${up.t}</h4>${up.x}`, poPass = `<h4>${po.t}</h4>${po.x}`;

  const sections = [
    Object.assign(sec('u1', null, 'प्र. 1 (अ) – अपठित गद्यांश : बहुविकल्पी प्रश्न (प्रत्येक 1 अंक)', null,
      'निम्नलिखित गद्यांश पढ़िए और सही विकल्प चुनिए।', up.m.map(it => mcqOf(B, 1, U, it))), { passage: upPass }),
    Object.assign(sec('u2', null, 'प्र. 1 (आ) – अपठित गद्यांश : लिखित प्रश्न', null,
      'ऊपर दिए गए गद्यांश के आधार पर निम्नलिखित प्रश्नों के उत्तर लिखिए।', [
        ...up.s.map(([q, a]) => B.self(2, U, q, a)),
        B.self(3, U, `गद्यांश "${up.t}" का सार अपने शब्दों में तीन-चार वाक्यों में लिखिए।`, 'सार में ये बिंदु हों – ' + up.sum),
        B.self(1, U, `गद्यांश "${up.t}" के लिए एक उपयुक्त शीर्षक लिखिए।`, up.ti)
      ]), { passage: upPass }),
    Object.assign(sec('p1', null, 'प्र. 2 – पद्य : बहुविकल्पी प्रश्न (प्रत्येक 1 अंक)', null,
      'निम्नलिखित काव्यांश पढ़िए और सही विकल्प चुनिए।', po.m.map(it => mcqOf(B, 1, P, it))), { passage: poPass }),
    Object.assign(sec('p2', null, 'प्र. 2 – पद्य : लिखित प्रश्न', null,
      `काव्यांश "${po.t}" के आधार पर उत्तर लिखिए।`, [
        ...po.s.map(([q, a]) => B.self(2, P, q, a)),
        B.self(4, P, `कविता "${po.t}" का केंद्रीय भाव अपने शब्दों में लिखिए।`, po.c)
      ]), { passage: poPass }),
    sec('g1', null, 'प्र. 3 (अ) – व्याकरण : प्रत्येक 1 अंक', null, 'सही विकल्प चुनिए।',
      Object.keys(HN.gm1).map(kind => mcqOf(B, 1, G, HN.gm1[kind][k]))),
    sec('g2', null, 'प्र. 3 (आ) – व्याकरण : प्रत्येक 2 अंक', null, 'सही विकल्प चुनिए।',
      Object.keys(HN.gm2).map(kind => mcqOf(B, 2, G, HN.gm2[kind][k]))),
    sec('g3', null, 'प्र. 3 (इ) – व्याकरण : प्रत्येक 2 अंक', null, 'निर्देशानुसार उत्तर लिखिए।',
      Object.keys(HN.gs).map(kind => B.self(2, G, HN.gs[kind][k][0], HN.gs[kind][k][1]))),
    sec('w1', null, 'प्र. 4 (अ) – पत्र-लेखन (8 अंक)', null, 'निम्नलिखित में से पत्र लिखिए।',
      [B.self(8, W, HN.letter[k][0], HN.letter[k][1])]),
    sec('w2', null, 'प्र. 4 (आ) – निबंध-लेखन (10 अंक)', null, 'निम्नलिखित विषय पर निबंध लिखिए।',
      [B.self(10, W, HN.essay[k][0], HN.essay[k][1])]),
    sec('w3', null, 'प्र. 4 (इ) – संवाद-लेखन (6 अंक)', null, 'निम्नलिखित विषय पर संवाद लिखिए।',
      [B.self(6, W, HN.dialogue[k][0], HN.dialogue[k][1])])
  ];

  window.PAPERS.push({
    id: 'hindi-mock-' + N, subject: 'hindi', kind: 'mock', year: null, durationMin: 180,
    title: `Hindi — SSC-pattern Mock Paper ${N}`,
    desc: 'अपठित गद्यांश 16 + पद्य 16 + व्याकरण 24 + लेखन 24 = 80 अंक (approximated pattern).',
    note: 'Original passage, poem, grammar and writing tasks; no question is repeated across mocks 2–10. The 80-mark layout (unseen passage 16, poetry 16, grammar 24, writing 24) is <b>approximate</b> and follows our mock 1, not an official board blueprint. MCQs are marked automatically; written answers are shown with a model answer and marking points for you to self-mark.',
    sections
  });
}
})();

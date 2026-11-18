/* Assembles Marathi mock tests 2–10 (80 marks, 180 min) from the banks in mar-1..4.js.
   Same layout as Marathi mock 1: unseen passage 16 + poem 16 + grammar 24 + writing 24.
   Every list in the banks holds exactly 9 items, so paper k (0..8) takes item k and nothing repeats across mocks 2–10. */
(function () {
const { bld, sec, opts } = window.QB;
const MR = window.MR;
const U = 'अपठित गद्य', P = 'पद्य', G = 'व्याकरण', W = 'लेखन';

const need = (name, arr) => { if (!arr || arr.length !== 9) throw new Error(`marathi bank "${name}" must hold 9 items, has ${arr ? arr.length : 0}`); };
need('up', MR.up); need('po', MR.po); need('letter', MR.letter); need('essay', MR.essay); need('advert', MR.advert);
Object.keys(MR.gm1).forEach(k => need('gm1.' + k, MR.gm1[k]));
Object.keys(MR.gm2).forEach(k => need('gm2.' + k, MR.gm2[k]));
Object.keys(MR.gs).forEach(k => need('gs.' + k, MR.gs[k]));
if (Object.keys(MR.gm1).length !== 8 || Object.keys(MR.gm2).length !== 4 || Object.keys(MR.gs).length !== 4) throw new Error('marathi grammar banks: expected 8 + 4 + 4 kinds');

// Mock 1 stays as it is; refuse a bank item whose question text equals one already used in marathi-mock-1.
const norm = t => String(t).replace(/\s+/g, ' ');
const inMock1 = new Set();
(window.PAPERS.find(p => p.id === 'marathi-mock-1') || { sections: [] }).sections.forEach(s => s.questions.forEach(q => inMock1.add(norm(q.q))));

let posCtr = 0;
const mcqOf = (B, marks, ch, item) => {
  const [q, right, w1, w2, w3, sol] = item;
  if (inMock1.has(norm(q))) throw new Error('marathi bank repeats a mock-1 question: ' + q);
  const r = opts(right, [w1, w2, w3], posCtr++);
  return B.mcq(marks, ch, q, r.o, r.a, sol);
};

for (let k = 0; k < 9; k++) {
  const N = k + 2, B = bld('m' + N + '-');
  const up = MR.up[k], po = MR.po[k];
  const upPass = `<h4>${up.t}</h4>${up.x}`, poPass = `<h4>${po.t}</h4>${po.x}`;

  const sections = [
    Object.assign(sec('u1', null, 'प्र. 1 (अ) – अपठित गद्य : बहुपर्यायी प्रश्न (प्रत्येकी 1 गुण)', null,
      'खालील उतारा वाचा आणि योग्य पर्याय निवडा.', up.m.map(it => mcqOf(B, 1, U, it))), { passage: upPass }),
    Object.assign(sec('u2', null, 'प्र. 1 (आ) – अपठित गद्य : लेखी प्रश्न', null,
      'वरील उताऱ्याच्या आधारे खालील प्रश्नांची उत्तरे लिहा.', [
        ...up.s.map(([q, a]) => B.self(2, U, q, a)),
        B.self(3, U, `उतारा "${up.t}" चा सारांश तीन-चार वाक्यांत लिहा.`, 'सारांशात हे मुद्दे असावेत – ' + up.sum),
        B.self(1, U, `उतारा "${up.t}" साठी योग्य शीर्षक लिहा.`, up.ti)
      ]), { passage: upPass }),
    Object.assign(sec('p1', null, 'प्र. 2 – पद्य : बहुपर्यायी प्रश्न (प्रत्येकी 1 गुण)', null,
      'खालील कवितेच्या आधारे योग्य पर्याय निवडा.', po.m.map(it => mcqOf(B, 1, P, it))), { passage: poPass }),
    Object.assign(sec('p2', null, 'प्र. 2 – पद्य : लेखी प्रश्न', null,
      `कविता "${po.t}" च्या आधारे उत्तरे लिहा.`, [
        ...po.s.map(([q, a]) => B.self(2, P, q, a)),
        B.self(4, P, `कविता "${po.t}" चा आशय आपल्या शब्दांत लिहा.`, po.c)
      ]), { passage: poPass }),
    sec('g1', null, 'प्र. 3 (अ) – व्याकरण : प्रत्येकी 1 गुण', null, 'योग्य पर्याय निवडा.',
      Object.keys(MR.gm1).map(kind => mcqOf(B, 1, G, MR.gm1[kind][k]))),
    sec('g2', null, 'प्र. 3 (आ) – व्याकरण : प्रत्येकी 2 गुण', null, 'योग्य पर्याय निवडा.',
      Object.keys(MR.gm2).map(kind => mcqOf(B, 2, G, MR.gm2[kind][k]))),
    sec('g3', null, 'प्र. 3 (इ) – व्याकरण : प्रत्येकी 2 गुण', null, 'सूचनेनुसार उत्तरे लिहा.',
      Object.keys(MR.gs).map(kind => B.self(2, G, MR.gs[kind][k][0], MR.gs[kind][k][1]))),
    sec('w1', null, 'प्र. 4 (अ) – पत्रलेखन (8 गुण)', null, 'खालील विषयावर पत्र लिहा.',
      [B.self(8, W, MR.letter[k][0], MR.letter[k][1])]),
    sec('w2', null, 'प्र. 4 (आ) – निबंधलेखन (10 गुण)', null, 'खालील विषयावर सुमारे 150 शब्दांत निबंध लिहा.',
      [B.self(10, W, MR.essay[k][0], MR.essay[k][1])]),
    sec('w3', null, 'प्र. 4 (इ) – जाहिरातलेखन (6 गुण)', null, 'खालील विषयावर जाहिरात तयार करा.',
      [B.self(6, W, MR.advert[k][0], MR.advert[k][1])])
  ];

  window.PAPERS.push({
    id: 'marathi-mock-' + N, subject: 'marathi', kind: 'mock', year: null, durationMin: 180,
    title: `Marathi — SSC-pattern Mock Paper ${N}`,
    desc: 'अपठित गद्य 16 + पद्य 16 + व्याकरण 24 + लेखन 24 = 80 गुण (approximated pattern).',
    note: 'Original passage, poem, grammar and writing tasks; no question is repeated across mocks 2–10. The 80-mark layout (unseen passage 16, poetry 16, grammar 24, writing 24) is <b>approximate</b> and follows our mock 1, not an official board blueprint. MCQs are marked automatically; written answers are shown with a model answer and marking points for you to self-mark.',
    sections
  });
}
})();

/* English – SSC-pattern mock paper 1. 80 marks: Reading textual 20, non-textual 20, Grammar 15, Writing 25.
   All passages and poems are original (written for this site), not taken from the textbook. */
(function () {
const { mcq, num, self } = window.mk;
const RT = 'Reading – textual style', RN = 'Reading – non-textual', GM = 'Grammar', WR = 'Writing skills';

const PROSE = '<b>Meera and the Monsoon Bridge</b><br>Every monsoon, the stream behind Meera\'s village swelled into a brown, roaring river. The only bridge, a narrow plank of old teak, trembled under the water. Children from the hill hamlet had to cross it to reach school, and many parents quietly kept them at home until the rains ended. Meera, a thirteen-year-old with a stubborn chin, refused to accept this. She counted the missed school days in a notebook — forty-two in one year. With her teacher\'s help she wrote to the Gram Panchayat, attaching her notebook as proof. For weeks there was no reply. Then, one morning in September, a truck arrived carrying steel rods and cement. Within a month, a sturdy concrete bridge stood where the plank had been. At its opening, the Sarpanch said, "This bridge was built by a notebook." Meera only smiled and walked across to school.';

const POEM = '<b>The Banyan\'s Lesson</b><br>The banyan stands in the summer glare,<br>Its hundred arms spread everywhere.<br>It shelters sparrows, squirrels, and men,<br>And asks for nothing in return again.<br>When storms arrive with a shouting sound,<br>It bends its branches, stays on the ground.<br>Its roots go deep, its heart stays kind —<br>A lesson for every restless mind.';

const TABLE = '<b>Daily water use in a household of four (litres)</b><table><tr><th>Activity</th><th>Bathing</th><th>Cooking</th><th>Washing clothes</th><th>Drinking</th><th>Flushing</th><th>Cleaning</th></tr><tr><td>Litres</td><td>60</td><td>20</td><td>40</td><td>10</td><td>40</td><td>30</td></tr></table>';

const UNSEEN = '<b>Sleep: a basic need</b><br>Sleep is not a luxury; it is a basic need of the body and mind. During sleep, the brain stores what we learnt during the day, and the body repairs its tissues. Doctors advise that teenagers need between eight and ten hours of sleep every night. Yet many students stay awake late with phones and video games, and then struggle to concentrate in class. Bright screens delay the release of melatonin, a hormone that makes us feel sleepy. A simple routine helps: switching off screens an hour before bed, keeping a fixed bedtime, and avoiding heavy meals at night. Students who sleep well tend to remember more, feel calmer in examinations and fall ill less often.';

window.PAPERS.push({
  id: 'english-mock-1', subject: 'english', kind: 'mock', year: null, durationMin: 180,
  title: 'English — SSC-pattern Mock Paper 1',
  desc: 'Reading (textual & non-textual), grammar and writing — 80 marks.',
  sections: [
    { id: 'r1', title: 'Q1 A1 – Prose: choose the correct option (4)', instruction: 'Read the passage and choose the correct answer.', passage: PROSE, questions: [
      mcq('a1', 1, RT, 'Why did many parents keep their children at home during the monsoon?', ['They feared the unsafe bridge', 'The children had to work in the fields', 'The school was closed', 'The children were ill'], 0, 'The old plank bridge trembled under the flood water, so it was unsafe.'),
      mcq('a2', 1, RT, 'Meera is shown to be a ______ girl.', ['shy and fearful', 'determined', 'careless', 'boastful'], 1, '"A stubborn chin", "refused to accept this" — she is determined.'),
      mcq('a3', 1, RT, 'Meera\'s proof sent to the Gram Panchayat was:', ['a photograph', 'a notebook', 'a petition signed by villagers', 'a newspaper report'], 1, '"attaching her notebook as proof".'),
      mcq('a4', 1, RT, 'The word "sturdy" means:', ['weak', 'strong', 'old', 'narrow'], 1, 'Sturdy = strongly built.')
    ]},
    { id: 'r2', title: 'Q1 A2 – Prose: short answers (4)', instruction: 'Answer in a word or a phrase.', passage: PROSE, questions: [
      num('a5', 1, RT, 'How many school days did Meera record as missed?', ['42', 'forty-two', 'forty two'], 'Forty-two.'),
      num('a6', 1, RT, 'In which month did the truck arrive?', ['September', 'sept'], 'September.'),
      num('a7', 1, RT, 'What was the old bridge made of?', ['teak', 'wood', 'teak wood', 'old teak', 'a plank of old teak', 'plank of teak'], 'A narrow plank of old teak (wood).'),
      num('a8', 1, RT, 'Who said, "This bridge was built by a notebook"?', ['sarpanch', 'the sarpanch'], 'The Sarpanch.')
    ]},
    { id: 'r3', title: 'Q1 A3 – Prose: answer in a sentence or two (4)', instruction: 'Answer in two to three sentences.', passage: PROSE, questions: [
      self('a9', 2, RT, 'How did Meera\'s teacher help her?', 'The teacher helped her write the letter to the Gram Panchayat (and attach the notebook as evidence). (2 marks: 1 for the idea, 1 for a complete sentence.)'),
      self('a10', 2, RT, 'What did the Sarpanch mean by, "This bridge was built by a notebook"?', 'He meant that Meera\'s careful record of the missed school days was the proof that moved the authorities to act; the bridge came about because of her documented evidence. (1 for idea, 1 for expression)')
    ]},
    { id: 'r4', title: 'Q1 A4 – Poetry appreciation (8)', instruction: 'Read the poem and answer.', passage: POEM, questions: [
      mcq('p1', 2, RT, 'The rhyme scheme of the first four lines is:', ['abab', 'aabb', 'abba', 'abcd'], 1, 'glare/everywhere (a a), men/again (b b) ⇒ aabb.'),
      mcq('p2', 2, RT, 'Which figure of speech is used in "And asks for nothing in return again"?', ['Simile', 'Personification', 'Alliteration', 'Onomatopoeia'], 1, 'The tree is given the human act of "asking".'),
      self('p3', 2, RT, 'What does the banyan do when the storm arrives?', 'It bends its branches but stays firmly on the ground (its deep roots hold it). (2 marks)'),
      self('p4', 2, RT, 'What lesson does the poet draw from the banyan?', 'To stay humble and flexible in difficulty, be generous/kind to all, and remain firmly rooted in one\'s values. (2 marks for any clear, relevant lesson)')
    ]},
    { id: 'n1', title: 'Q2 A1 – Information transfer from a table (8)', instruction: 'Study the table and answer.', passage: TABLE, questions: [
      num('t1', 2, RN, 'Which activity uses the most water?', ['bathing'], 'Bathing — 60 litres.'),
      num('t2', 2, RN, 'What is the total daily water use of the household (in litres)?', ['200', '200 litres', '200l'], '60 + 20 + 40 + 10 + 40 + 30 = 200 litres.'),
      num('t3', 2, RN, 'How many more litres are used for bathing than for cooking?', ['40', '40 litres'], '60 − 20 = 40 litres.'),
      num('t4', 2, RN, 'What percentage of the total water is used for washing clothes?', ['20', '20%'], '(40/200) × 100 = 20%.')
    ]},
    { id: 'n2', title: 'Q2 A2 – Unseen passage: MCQs (4)', instruction: 'Read the passage and choose the correct answer.', passage: UNSEEN, questions: [
      mcq('u1', 1, RN, 'How many hours of sleep do teenagers need, according to the passage?', ['6–7', '8–10', '10–12', '4–5'], 1, '"between eight and ten hours".'),
      mcq('u2', 1, RN, 'Which hormone is delayed by bright screens?', ['Insulin', 'Melatonin', 'Adrenaline', 'Thyroxine'], 1, 'Melatonin.'),
      mcq('u3', 1, RN, 'The tone of the passage is:', ['humorous', 'informative and advisory', 'sad', 'angry'], 1, 'It gives facts and advice.'),
      mcq('u4', 1, RN, 'According to the passage, the brain during sleep:', ['rests completely', 'stores what we learnt', 'grows taller', 'forgets the day'], 1, '"the brain stores what we learnt during the day".')
    ]},
    { id: 'n3', title: 'Q2 A3 – Unseen passage: short answers (4)', instruction: 'Answer in a word or phrase.', passage: UNSEEN, questions: [
      num('u5', 1, RN, 'What should students avoid at night, according to the passage?', ['heavy meals', 'heavy meal'], 'Heavy meals.'),
      num('u6', 1, RN, 'How long before bed should screens be switched off?', ['an hour', 'one hour', '1 hour', 'an hour before bed'], 'An hour before bed.'),
      num('u7', 1, RN, 'Find a word from the passage which means "to have difficulty in doing something".', ['struggle'], '"struggle".'),
      num('u8', 1, RN, 'True or False: Students who sleep well remember more.', ['true'], 'True — the last sentence says so.')
    ]},
    { id: 'n4', title: 'Q2 A4 – Unseen passage: written answers (4)', instruction: 'Answer in your own words.', passage: UNSEEN, questions: [
      self('u9', 2, RN, 'Why do many students struggle to concentrate in class?', 'Because they stay awake late using phones and video games and so do not get enough sleep. (2 marks)'),
      self('u10', 2, RN, 'Mention two steps suggested in the passage for better sleep.', 'Any two: switch off screens an hour before bed; keep a fixed bedtime; avoid heavy meals at night. (1 mark each)')
    ]},
    { id: 'g1', title: 'Q3 A – Choose the correct option (4)', instruction: 'Complete the sentences.', questions: [
      mcq('c1', 1, GM, 'She ______ to school every day.', ['go', 'goes', 'going', 'gone'], 1, 'Simple present, third person singular: goes.'),
      mcq('c2', 1, GM, 'By the time we reached the theatre, the film ______.', ['started', 'has started', 'had started', 'was starting'], 2, 'Past perfect for the earlier of two past actions.'),
      mcq('c3', 1, GM, 'If I ______ you, I would apologise.', ['am', 'was', 'were', 'be'], 2, 'Second conditional uses "were".'),
      mcq('c4', 1, GM, 'He is fond ______ cricket.', ['of', 'for', 'with', 'at'], 0, '"fond of".')
    ]},
    { id: 'g2', title: 'Q3 B – Fill in the blanks (3)', instruction: 'Write one word in each blank.', questions: [
      num('c5', 1, GM, '______ honest man is respected by all. (article)', ['an'], '"honest" begins with a vowel sound ⇒ an.'),
      num('c6', 1, GM, 'We have been living in Pune ______ 2015. (preposition)', ['since'], 'Since + point of time.'),
      num('c7', 1, GM, 'She is the ______ (tall) girl in the class. (correct form)', ['tallest'], 'Superlative degree.')
    ]},
    { id: 'g3', title: 'Q3 C – Reported speech (4)', instruction: 'Rewrite in reported speech.', questions: [
      self('c8', 2, GM, 'He said, "I am reading a novel."', '<b>He said that he was reading a novel.</b> (pronoun change 1, tense change 1)'),
      self('c9', 2, GM, 'She asked me, "Where do you live?"', '<b>She asked me where I lived.</b> (word order of a statement 1, tense/pronoun 1)')
    ]},
    { id: 'g4', title: 'Q3 D – Active and passive voice (4)', instruction: 'Change the voice.', questions: [
      self('c10', 2, GM, 'The teacher praised the students.', '<b>The students were praised by the teacher.</b>'),
      self('c11', 2, GM, 'Someone has stolen my bicycle.', '<b>My bicycle has been stolen.</b> (optionally "by someone")')
    ]},
    { id: 'w1', title: 'Q4 A – Formal letter (10)', instruction: 'Write the letter in about 120 words.', questions: [
      self('w1', 10, WR, 'You are Rohan/Riya of 14, Shivaji Nagar, Pune. Write a letter to the Municipal Commissioner, Pune Municipal Corporation, complaining about the uncleared garbage in your locality and requesting prompt action.', '<b>Format (3):</b> sender\'s address, date, receiver\'s address, subject line, salutation "Respected Sir/Madam", complimentary close "Yours faithfully", name.<br><b>Content (4):</b> state the problem (garbage heaped for a week), its effects (smell, mosquitoes, disease risk), the earlier complaint, request for daily collection and a clean-up drive.<br><b>Expression (3):</b> formal tone, correct grammar and spelling, paragraphs.<br><i>Sample body:</i> "I wish to draw your attention to the heap of uncleared garbage near the Shivaji Nagar bus stop. It has not been lifted for over a week. The stench and swarms of mosquitoes are a threat to residents\' health, especially children. I request you to arrange daily collection and a special clean-up drive at the earliest."'),
    ]},
    { id: 'w2', title: 'Q4 B – Notice (5)', instruction: 'Write the notice in about 50 words.', questions: [
      self('w2', 5, WR, 'You are the Secretary of the Science Club of Sunrise High School, Nashik. Draft a notice announcing a Science Exhibition on 12 January for Std VIII–X.', '<b>Format (2):</b> name of school, "NOTICE", date, heading, matter, name and designation of issuer.<br><b>Content (2):</b> event, date, time, venue, who may take part, last date to register, contact person.<br><b>Language (1):</b> crisp and correct.<br><i>Sample:</i> "SUNRISE HIGH SCHOOL, NASHIK — NOTICE — 3 January — Science Exhibition. The Science Club will hold a Science Exhibition on 12 January from 10 a.m. in the school hall. Students of Std VIII–X may display working models. Register with Mr Patil by 8 January. — Aarav Shah, Secretary, Science Club."')
    ]},
    { id: 'w3', title: 'Q4 C – Essay (10)', instruction: 'Write an essay in about 150 words.', questions: [
      self('w3', 10, WR, 'Write an essay on: "Books are our best friends."', '<b>Introduction (2):</b> hook + thesis. <b>Body (4):</b> books give knowledge and entertainment; teach values; never betray; always available; examples (biographies, Dr Kalam\'s "Wings of Fire"). <b>Conclusion (1)</b>. <b>Language and organisation (3)</b>: paragraphs, linking words, correct grammar.<br>Marking tip: a one-page answer with clear paragraphs scores better than a long unstructured one.')
    ]}
  ]
});
})();

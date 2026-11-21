/* UP Board Class X English (917): 10 mock tests of 70 marks, in the layout of the UPMSP 2026-27 model paper.
   Section A: 20 MCQ x 1 = passage 3 + grammar 5 + passage 2 + First Flight prose 3 + poetry 2 + Footprints Without Feet 5.
   Section B: reading 7 + letter 4 + paragraph/article 6 + grammar 10 + literature 23 = 50.
   Passages, grammar items, letters and paragraphs come from the English banks already on the site (eng-1..eng-4: original, written for this site).
   Textbook-based items below are original questions about the NCERT First Flight and Footprints Without Feet lessons. */
(function () {
const { bld, sec } = window.QB;
const { mcqOf, take, paper } = window.UPL;
const EB = window.EB;
const FP = ['A Letter to God', 'Nelson Mandela: Long Walk to Freedom', 'Two Stories about Flying', 'From the Diary of Anne Frank', 'Glimpses of India', 'Mijbil the Otter', 'Madam Rides the Bus', 'The Sermon at Benares', 'The Proposal'];
const FPO = ['Dust of Snow', 'Fire and Ice', 'A Tiger in the Zoo', 'How to Tell Wild Animals', 'The Ball Poem', 'Amanda!', 'The Trees', 'Fog', 'The Tale of Custard the Dragon', 'For Anne Gregory'];
const FW = ['A Triumph of Surgery', 'The Thief\'s Story', 'The Midnight Visitor', 'A Question of Trust', 'Footprints Without Feet', 'The Making of a Scientist', 'The Necklace', 'Bholi', 'The Book That Saved the Earth'];
const UN = 'Unseen passage', LT = 'Letter / Application', PA = 'Paragraph / Article';

/* ---- First Flight prose MCQs: [q, right, w1, w2, w3, solution, chapter] ---- */
const PM = [
  ['Why did Lencho write a letter to God?', 'To ask for one hundred pesos to sow his field again', 'To thank God for the rain', 'To complain about the post office', 'To ask for a new house', 'A hailstorm destroyed his crop, so he asked God for 100 pesos.', FP[0]],
  ['What destroyed Lencho\'s field of ripe corn?', 'A hailstorm', 'A flood', 'A fire', 'Locusts', 'The huge hailstones ruined the corn just before harvest.', FP[0]],
  ['How much money did the postmaster and his employees collect for Lencho?', 'Seventy pesos', 'One hundred pesos', 'Fifty pesos', 'Two hundred pesos', 'They could collect only seventy pesos, but the postmaster signed the reply "God".', FP[0]],
  ['What did Lencho write in his second letter about the post office employees?', 'That they were a bunch of crooks', 'That they were kind', 'That they were poor', 'That they were his friends', 'He thought they had kept the missing thirty pesos.', FP[0]],
  ['Where did Nelson Mandela\'s inauguration take place?', 'The amphitheatre of the Union Buildings, Pretoria', 'Cape Town harbour', 'Robben Island', 'Johannesburg stadium', 'On 10 May 1994 the ceremony was held at the Union Buildings in Pretoria.', FP[1]],
  ['According to Mandela, a brave man is one who –', 'conquers fear', 'never feels fear', 'is never defeated', 'has a large army', '"The brave man is not he who does not feel afraid, but he who conquers that fear."', FP[1]],
  ['Who were sworn in as deputy presidents along with Mandela\'s presidency?', 'Thabo Mbeki and F.W. de Klerk', 'Oliver Tambo and Walter Sisulu', 'Desmond Tutu and Steve Biko', 'Joe Slovo and Chris Hani', 'Mbeki and de Klerk became the two deputy presidents.', FP[1]],
  ['Why was the young seagull afraid in "His First Flight"?', 'He was afraid to fly', 'He was afraid of his mother', 'He was ill', 'He was afraid of fish', 'He was afraid to try his wings and kept to the ledge.', FP[2]],
  ['What finally made the young seagull fly?', 'Hunger – his mother held a piece of fish out of his reach', 'A strong wind', 'The cry of other gulls', 'A storm', 'The tempting fish made him dive off the ledge and he flew.', FP[2]],
  ['In "The Black Aeroplane", who wrote the story?', 'Frederick Forsyth', 'Ruskin Bond', 'Anne Frank', 'Gavin Maxwell', 'The story is by Frederick Forsyth.', FP[2]],
  ['In "The Black Aeroplane", the pilot was flying –', 'from Paris back to England', 'from London to New York', 'from Delhi to Mumbai', 'around Africa', 'He was returning to England when he ran into a storm.', FP[2]],
  ['What did Anne Frank name her diary?', 'Kitty', 'Margot', 'Peter', 'Hanneli', 'Anne addressed her letters to a friend called Kitty.', FP[3]],
  ['Why did Anne Frank start writing a diary?', 'She had no real friend to confide in', 'It was a school assignment', 'Her mother asked her', 'She wanted to be a famous author', 'She felt that "paper has more patience than people".', FP[3]],
  ['In "A Baker from Goa", the baker is called –', 'Pader', 'Kodavu', 'Bhishma', 'Mestri', 'The Goan baker was known as the "pader".', FP[4]],
  ['The people of Coorg, the Kodavus, are believed to be descended from –', 'Greeks or Arabs', 'Chinese', 'Portuguese', 'Mughals', 'A legend says they came from Greece or the Arab lands; they are known for their martial tradition.', FP[4]],
  ['"Tea from Assam" is a conversation between –', 'Rajvir and Pranjol', 'Anil and Hari', 'Lencho and Mandela', 'Kitty and Anne', 'Rajvir and Pranjol Barua talk about tea during a train journey.', FP[4]],
  ['Gavin Maxwell found Mijbil in –', 'the marshes of Iraq', 'the jungles of Assam', 'a London zoo', 'the Himalayas', 'He collected the otter in the Tigris-Euphrates marshes of southern Iraq.', FP[5]],
  ['Mijbil the otter was fond of –', 'water, which he played with', 'fire', 'sleeping all day', 'staying alone in a cage', 'He loved playing in water, even in the bath.', FP[5]],
  ['In "Madam Rides the Bus", Valliammai was –', 'an eight-year-old girl', 'a college student', 'a bus conductor', 'a teacher', 'Valliammai was a curious eight-year-old who wanted to ride the bus.', FP[6]],
  ['What did Buddha ask Kisa Gotami to bring?', 'A handful of mustard seeds from a house where nobody had died', 'A bowl of rice', 'A lotus flower', 'Water from the Ganga', 'Only through this search did she realise that death comes to all.', FP[7]],
  ['In "The Proposal", Lomov came to Natalya\'s house to –', 'ask for her hand in marriage', 'borrow money', 'sell a dog', 'discuss the land dispute', 'He came to propose, but they quarrelled instead.', FP[8]],
  ['The quarrel in "The Proposal" was over –', 'Oxen Meadows', 'a dowry', 'a horse', 'the price of a house', 'Both claimed that the Oxen Meadows belonged to them.', FP[8]]
];
/* ---- First Flight poetry MCQs ---- */
const OM = [
  ['In "Dust of Snow", the poet\'s mood was changed by –', 'a crow shaking snow from a hemlock tree', 'a snowfall', 'a winter storm', 'a child\'s laughter', 'The crow\'s act lifted the poet\'s sadness and saved part of his day.', FPO[0]],
  ['Who wrote "Fire and Ice"?', 'Robert Frost', 'Carl Sandburg', 'Ogden Nash', 'W.B. Yeats', 'Robert Frost wrote it.', FPO[1]],
  ['In "Fire and Ice", "fire" stands for –', 'desire', 'hatred', 'courage', 'warmth', 'Fire = desire; ice = hatred.', FPO[1]],
  ['In "A Tiger in the Zoo", the tiger would prefer to be –', 'in the jungle', 'in the zoo', 'in a circus', 'in a house', 'The poet shows the tiger restless in the cage, longing for the wild.', FPO[2]],
  ['"How to Tell Wild Animals" is a poem of –', 'humour', 'grief', 'patriotism', 'protest', 'Carolyn Wells\'s poem is humorous and teaches by absurd clues.', FPO[3]],
  ['In "The Ball Poem", the boy has lost –', 'his ball', 'his kite', 'his dog', 'his book', 'John Berryman\'s poem is about a boy who loses his ball and learns about loss.', FPO[4]],
  ['The poet of "The Ball Poem" is –', 'John Berryman', 'Robert Frost', 'Robin Klein', 'Adrienne Rich', 'The poem is by John Berryman.', FPO[4]],
  ['In "Amanda!", the child imagines herself as –', 'a mermaid', 'a teacher', 'a queen', 'a pilot', 'She daydreams of being a mermaid, then an orphan and then Rapunzel.', FPO[5]],
  ['In "The Trees", the trees are trying to –', 'move out of the forest into the open', 'hide from the wind', 'grow taller', 'cover the house', 'Adrienne Rich shows the trees pushing outward, like freedom.', FPO[6]],
  ['In "Fog", the fog comes –', 'on little cat feet', 'with loud thunder', 'in the morning', 'with the rain', 'Carl Sandburg compares fog to a cat that sits silently and moves on.', FPO[7]],
  ['In "The Tale of Custard the Dragon", Custard is –', 'a cowardly dragon', 'a bold knight', 'a pirate', 'a wizard', 'Custard cried for a nice safe cage while others were brave, but he finally killed the pirate.', FPO[8]],
  ['In the poem "Custard the Dragon", the brave girl is –', 'Belinda', 'Amanda', 'Mustard', 'Ink', 'Belinda lived in a little white house with Ink, Blink, Mustard and Custard.', FPO[8]],
  ['"For Anne Gregory" is written by –', 'W.B. Yeats', 'Ogden Nash', 'John Berryman', 'Carolyn Wells', 'Yeats wrote this poem about being loved for oneself.', FPO[9]],
  ['In "For Anne Gregory", the poet says Anne should be loved for –', 'herself alone, not her yellow hair', 'her yellow hair', 'her wealth', 'her beauty', '"Only God, my dear, could love you for yourself alone and not your yellow hair."', FPO[9]]
];
/* ---- Footprints Without Feet MCQs ---- */
const FM = [
  ['In "A Triumph of Surgery", Tricki was –', 'a Pekingese dog', 'a cat', 'a horse', 'a parrot', 'Tricki was a pampered Pekingese owned by Mrs Pumphrey.', FW[0]],
  ['What was wrong with Tricki?', 'He was overfed', 'He was bitten by a snake', 'He had broken a leg', 'He was lost', 'Mrs Pumphrey fed him too many sweets and cakes.', FW[0]],
  ['Who narrates "A Triumph of Surgery"?', 'A veterinary doctor (the author, Herriot)', 'Mrs Pumphrey', 'Tricki', 'A neighbour', 'The vet who treated Tricki tells the story.', FW[0]],
  ['What did the vet do to cure Tricki?', 'He put him on a strict diet and kept him with other dogs', 'He operated on him', 'He gave him sweet medicines', 'He sent him abroad', 'Tricki recovered with exercise and ordinary food at the vet\'s house.', FW[0]],
  ['In "The Thief\'s Story", Hari Singh is –', 'a young thief', 'a policeman', 'a teacher', 'a shopkeeper', 'Hari Singh was a small-time thief of about fifteen.', FW[1]],
  ['Anil in "The Thief\'s Story" promised to teach Hari –', 'to read and write', 'to cook', 'to wrestle', 'to drive', 'Anil, a young writer, offered to teach Hari reading and writing.', FW[1]],
  ['Anil in "The Thief\'s Story" was a –', 'writer', 'police officer', 'doctor', 'trader', 'He was an aspiring writer who lived alone.', FW[1]],
  ['Ruskin Bond is the author of –', 'The Thief\'s Story', 'The Necklace', 'Bholi', 'The Proposal', 'It is a story by Ruskin Bond.', FW[1]],
  ['In "The Midnight Visitor", Ausable is –', 'a secret agent', 'a writer', 'a thief', 'a hotel manager', 'Ausable works for a secret service, though he seems an ordinary man.', FW[2]],
  ['In "The Midnight Visitor", Fowler wanted to become –', 'a writer of adventure stories', 'a spy', 'a doctor', 'a teacher', 'Fowler was a young man who wanted to write spy stories.', FW[2]],
  ['In "A Question of Trust", Horace Danby was a –', 'locksmith who stole once a year', 'police officer', 'doctor', 'bank manager', 'He made locks by day and committed one burglary a year to buy rare books.', FW[3]],
  ['Horace Danby was fond of –', 'rare books', 'fast cars', 'cooking', 'horse racing', 'He wanted money to buy rare and expensive books.', FW[3]],
  ['In "Footprints Without Feet", the main character is –', 'Griffin, an invisible scientist', 'Horace Danby', 'Hari Singh', 'Ausable', 'The Invisible Man, Griffin, made himself invisible by an experiment.', FW[4]],
  ['"The Making of a Scientist" is about –', 'Richard Ebright', 'Marie Curie', 'C.V. Raman', 'A.P.J. Abdul Kalam', 'The lesson describes how Richard Ebright became a scientist.', FW[5]],
  ['As a child, Richard Ebright began by collecting –', 'butterflies', 'coins', 'stamps', 'stones', 'His interest began with collecting butterflies.', FW[5]],
  ['In "The Necklace", Mathilde Loisel borrowed the necklace from –', 'Madame Forestier', 'her mother', 'her sister', 'the Minister', 'Mathilde borrowed it from her rich friend for a ball.', FW[6]],
  ['Mathilde lost the necklace at –', 'a ball at the Ministry', 'her house', 'a railway station', 'a shop', 'She lost the borrowed necklace after the ball.', FW[6]],
  ['The Loisels took ______ years to repay their debt.', 'ten', 'five', 'two', 'twenty', 'They worked hard for ten years to pay off the loan.', FW[6]],
  ['Mathilde\'s husband worked as –', 'a clerk in the Ministry of Education', 'a banker', 'a jeweller', 'a lawyer', 'M. Loisel was a clerk in the Ministry of Public Instruction.', FW[6]],
  ['The real necklace of Madame Forestier was worth about –', 'five hundred francs', 'thirty-six thousand francs', 'two thousand francs', 'a hundred francs', 'It was an imitation (paste) worth about 500 francs.', FW[6]],
  ['What was Bholi\'s real name?', 'Sulekha', 'Sunita', 'Savita', 'Shanti', 'Bholi\'s real name was Sulekha.', FW[7]],
  ['In "Bholi", the girl had marks on her face because of –', 'smallpox', 'a fall', 'a burn', 'a fight', 'Smallpox left her face scarred and she also stammered.', FW[7]],
  ['Why did Bholi refuse to marry Bishambar?', 'He demanded dowry', 'He was too old', 'He was poor', 'He was a stranger', 'She refused a groom who was greedy for dowry.', FW[7]],
  ['In "The Book That Saved the Earth", the Martians come to Earth to –', 'invade it', 'study plants', 'buy a book', 'teach science', 'The play is a comedy about a failed Martian invasion.', FW[8]],
  ['In "The Book That Saved the Earth", the Martian commander is called –', 'Think-Tank', 'Noodle', 'Oop', 'Mustard', 'Think-Tank is the Chief of the Martian mission.', FW[8]]
];
/* ---- written literature pools: {q, s, ch} ---- */
const L1 = [ // First Flight prose, 3 marks
  { q: 'Why did Lencho write a letter to God? What did he ask for?', s: 'Lencho\'s corn crop was ruined by a hailstorm and he had nothing to eat. He had great faith in God, so he wrote asking for a hundred pesos to sow the field again.', ch: FP[0] },
  { q: 'Why did the postmaster send money to Lencho? Why was it less than he had asked?', s: 'The postmaster was moved by Lencho\'s faith and wanted to keep it alive, so he and his employees collected money. They could gather only seventy pesos, because they too were poor.', ch: FP[0] },
  { q: 'What did Mandela mean when he said "the brave man is not he who does not feel afraid"?', s: 'Mandela meant that everyone feels fear; real courage lies in conquering fear. He saw many brave men in the freedom struggle who acted in spite of fear.', ch: FP[1] },
  { q: 'Why did the young seagull not fly? How did his mother get him to try?', s: 'The young seagull was afraid of falling from the ledge. His mother held a piece of fish a little away from the ledge; hunger tempted him to dive and he found himself flying.', ch: FP[2] },
  { q: 'Why did Anne Frank call her diary "Kitty"? What did she feel about writing in it?', s: 'Anne had no close friend to share her deepest thoughts with, so she made the diary her friend and addressed it as Kitty. She felt that paper has more patience than people.', ch: FP[3] },
  { q: 'What is the baker\'s role in Goan life? Why is the baker still important?', s: 'The baker, called "pader", delivers bread every morning and the bread is an essential part of Goan food and festivals. The jingling sound of his bamboo stick announced his arrival, and he was a welcome part of every household.', ch: FP[4] },
  { q: 'What kind of an animal was Mijbil? Describe one of his habits.', s: 'Mijbil was an otter who was playful and curious. He loved water so much that he played in the bath for hours and splashed it all over the floor.', ch: FP[5] },
  { q: 'Why did Valliammai want to ride the bus? What did she see on the way?', s: 'Valliammai was a curious eight-year-old who wanted to see the world beyond her village. On the way she saw fields, the cattle, the shops and a dead cow, and she kept observing everything.', ch: FP[6] },
  { q: 'What lesson did Kisa Gotami learn from the Buddha?', s: 'She learned that death comes to every family and that grief is shared by all. When she could find no house without a death, she realised the truth and became calm.', ch: FP[7] },
  { q: 'Why did Lomov come to Natalya\'s house and why did the proposal fail?', s: 'Lomov came to propose marriage to Natalya. But they quarrelled over the ownership of the Oxen Meadows and their dogs, so the proposal could not be made at first; later they agreed to marry.', ch: FP[8] }
];
const L2 = [ // First Flight poetry: reference to context, 3 marks
  { q: '"The way a crow / Shook down on me / The dust of snow / From a hemlock tree" – What did the poet feel after this? What effect did it have?', s: 'The crow\'s simple act changed the poet\'s mood from sad to cheerful; it saved a part of the day he had regretted. It shows that nature can heal our sorrow.', ch: FPO[0] },
  { q: '"Some say the world will end in fire, / Some say in ice." – What does the poet say about the end of the world?', s: 'Frost says some believe the world will end in fire (desire) and some in ice (hatred). He has tasted desire, but he feels hatred is also strong enough to destroy the world.', ch: FPO[1] },
  { q: '"On pads of velvet quiet, / In his quiet rage" – Who is described here and what is his state?', s: 'The tiger in the zoo is described, pacing silently on soft paws. He is full of silent anger because he is trapped in a cage away from the jungle.', ch: FPO[2] },
  { q: '"Don\'t pick at your nose, Amanda! / Remember how you spill your tea..." – What does this show about Amanda\'s situation?', s: 'Amanda is a child who is constantly scolded by an adult for small things. She dreams of freedom and escape, wishing to be a mermaid, an orphan or Rapunzel.', ch: FPO[5] },
  { q: '"He is learning, little by little, / The weight of the lost" – Who is learning and what?', s: 'The boy who lost his ball is learning to bear loss; he learns that he cannot replace everything with money. He learns responsibility as he grows up.', ch: FPO[4] },
  { q: '"The trees inside are moving out into the forest" – What do the trees symbolise in the poem?', s: 'The trees symbolise nature (and women) longing to be free of confinement. They are moving into the open forest, away from the house where they are kept inside.', ch: FPO[6] },
  { q: '"The fog comes / on little cat feet." – What is the poet comparing the fog to? What is the comparison meant to show?', s: 'The fog is compared to a cat. Like a cat, the fog arrives silently, sits looking over the city and moves on, so the metaphor shows its quiet and soft movement.', ch: FPO[7] },
  { q: '"Belinda was as brave as a barrelful of bears" – Explain the figure of speech and what it says about Belinda.', s: 'It is a simile with exaggeration. It shows how fearless Belinda was – more courageous than the others, including the cowardly dragon Custard.', ch: FPO[8] },
  { q: '"Only God, my dear, / Could love you for yourself alone / And not your yellow hair." – What is the message?', s: 'Yeats suggests that outward beauty makes people love us for the wrong reason. True love accepts us for ourselves, a quality that perhaps only God can show.', ch: FPO[9] },
  { q: 'If you ever meet a lion, "you will know it by the way he lies"? – How does the poet make the poem humorous? (How to Tell Wild Animals)', s: 'The poet gives absurd identification tips, such as telling a lion by seeing whether he eats you. The funny exaggeration and playful rhyme entertain readers while teaching nothing practical.', ch: FPO[3] }
];
const L3 = [ // First Flight long answer, 4 marks
  { q: 'Describe how Lencho\'s faith in God is both admirable and amusing. (A Letter to God)', s: 'Lencho\'s faith is admirable because even after losing his entire crop he still believed God would help. He wrote directly to God, certain of an answer. It is amusing and ironic because he did not trust the post office staff, calling them crooks when the money fell short. This shows his simple, innocent nature.', ch: FP[0] },
  { q: 'What did Mandela think about the "twin obligations" (to family and to his people)? (Long Walk to Freedom)', s: 'Mandela said that every man has obligations to his family and parents as well as to his community and country. In a free society both can be fulfilled, but in a system of oppression like apartheid a man who tried to live as he should was driven apart from his family. This made him join the struggle.', ch: FP[1] },
  { q: 'How did the black aeroplane help the pilot, and what mystery remained? (Two Stories about Flying)', s: 'In the storm the pilot lost his way and fuel was low. A black aeroplane appeared and guided him to the airfield. When he landed, the controller told him that there was no other aeroplane in the sky that night. The mystery remains, and the pilot believes he was saved by a ghostly plane.', ch: FP[2] },
  { q: 'Describe Anne Frank\'s feelings about her life in hiding. (From the Diary of Anne Frank)', s: 'Anne felt lonely and shut in. The family lived in secret, and she missed friends and the outdoors. She longed for someone she could trust, so she shared her fears and hopes with her diary. Even so, she remained hopeful and tried to see the good in people.', ch: FP[3] },
  { q: 'Describe the importance of Coorg in Indian geography and culture. (Glimpses of India)', s: 'Coorg is a hilly district of Karnataka, with evergreen forests, rivers like the Kaveri, and coffee plantations. Its people, the Kodavus, are brave and hospitable, with a martial tradition. Tourists visit it for its beauty, and people also go for trekking and river-rafting.', ch: FP[4] },
  { q: 'Describe the author\'s experience with Mijbil on the journey from Iraq to England. (Mijbil the Otter)', s: 'The author kept Mijbil in a box during the journey, and the otter grew restless. At the airport he escaped his harness and spread chaos inside the plane. The author had to catch him. He then reached England, where Mijbil became a loved pet that played in the bath.', ch: FP[5] },
  { q: 'Describe Valliammai\'s adventure on the bus and how she handled difficulties. (Madam Rides the Bus)', s: 'Valliammai secretly boarded the bus to the town, enjoying the view and acting like a madam. She enjoyed the ride but became sad when she saw a dead cow. At the end she came home on the same bus and the conductor looked after her. It was a brave and confident trip for an eight-year-old.', ch: FP[6] },
  { q: 'Describe the Buddha\'s method of consoling Kisa Gotami. (The Sermon at Benares)', s: 'The Buddha did not argue with the grieving mother. He asked her to bring mustard seeds from a house where nobody had died. She went from door to door, but every home had known death. She realised that death is common to all and learned to accept her loss.', ch: FP[7] },
  { q: 'Write a character sketch of Natalya in "The Proposal".', s: 'Natalya is a young, quarrelsome woman who is quick to anger. She defends her property proudly and refuses to give in to Lomov, even over a trivial dispute about the meadows and dogs. Yet she is also eager to marry, and she calls him back as soon as she learns his intention. She is comic, proud and practical.', ch: FP[8] },
  { q: 'Why is "The Sermon at Benares" still relevant? Explain the message of Gautama Buddha.', s: 'Buddha\'s sermon teaches that suffering and death are part of life and that we should not be consumed by grief. It teaches compassion and acceptance, which is relevant to people in every age. It also shows that practical wisdom reaches the heart better than argument.', ch: FP[7] }
];
const L4 = [ // Footprints Without Feet, 3 marks (two slots)
  { q: 'How did Mrs Pumphrey spoil Tricki? What was its result?', s: 'She fed Tricki rich food and sweets, gave him too many cakes and let him lie by the fire. Tricki grew very fat, lazy and ill, so the vet had to put him on a strict diet.', ch: FW[0] },
  { q: 'How did Herriot cure Tricki?', s: 'He took Tricki to his own house, kept him on a plain diet, and let him mix with the other dogs. After a few days Tricki became lively and recovered.', ch: FW[0] },
  { q: 'Why did Hari Singh decide to become friends with Anil? How did Anil treat him?', s: 'Hari saw Anil as an easy target who trusted him. Anil treated him kindly, fed him, and offered to teach him to read and write, which touched Hari.', ch: FW[1] },
  { q: 'What kind of a person is Hari Singh in "The Thief\'s Story"?', s: 'Hari Singh is a young man who steals for a living but is not entirely bad. He is clever and a good talker, yet he is moved by kindness and shows a conscience.', ch: FW[1] },
  { q: 'Who was Ausable? How did he save the papers from Max in "The Midnight Visitor"?', s: 'Ausable was a secret agent. When Max demanded the papers at gunpoint, Ausable stayed calm and used a clever trick to outwit him, so the papers were saved.', ch: FW[2] },
  { q: 'What did Fowler think of Ausable, and how was he proved wrong?', s: 'Fowler, a young writer, thought Ausable was an ordinary, even dull, man. When he saw Ausable outwit a dangerous rival, he realised that Ausable was a real spy.', ch: FW[2] },
  { q: 'What kind of man was Horace Danby? Why did he commit crimes?', s: 'Horace Danby was a respected locksmith, honest in his daily life. He committed one robbery a year, for money to buy rare and costly books, which he loved.', ch: FW[3] },
  { q: 'How did the woman cheat Horace Danby in "A Question of Trust"?', s: 'The woman appeared to be the lady of the house and asked Horace to open the safe for her, which he did. He trusted her and was caught by the police, while the real thief used his skill.', ch: FW[3] },
  { q: 'Why did Griffin make himself invisible? What problem did it create?', s: 'Griffin, a scientist, wanted to prove his invention and gain power. But invisibility made life difficult: he could not live normally, was frightened of the cold and had to hide among people.', ch: FW[4] },
  { q: 'How did Richard Ebright\'s mother help him to become a scientist?', s: 'She encouraged his curiosity by getting him books and equipment, and she supported him when he wanted to collect butterflies and later do experiments.', ch: FW[5] },
  { q: 'Why did Mathilde Loisel feel unhappy at the start of "The Necklace"?', s: 'She felt she was born for a life of luxury and was ashamed of her poor home and plain dresses. She dreamed of rich ornaments and parties, so she was always dissatisfied.', ch: FW[6] },
  { q: 'What did Madame Forestier tell Mathilde at the end of "The Necklace"?', s: 'She told Mathilde that her necklace was only an imitation worth at most five hundred francs. Mathilde had spent ten years in hardship for nothing.', ch: FW[6] },
  { q: 'Why did Bholi refuse to marry Bishambar?', s: 'Bholi\'s groom demanded a heavy dowry. Bholi, who had learned to be confident at school, refused to marry such a greedy man and chose to teach in the village instead.', ch: FW[7] },
  { q: 'How did Bholi change after she went to school?', s: 'She had been a shy, stammering girl treated as a burden. School and her teacher\'s kindness gave her courage and self-respect, so she could speak confidently and make her own decision.', ch: FW[7] },
  { q: 'Why did the Martians land on Earth in "The Book That Saved the Earth"?', s: 'They came to invade the Earth and capture it. Think-Tank, their commander, led the mission but was frightened by the contents of the book they found, so they retreated.', ch: FW[8] },
  { q: 'How did Bholi\'s father and mother treat her in her childhood?', s: 'Her parents ignored her because she had scars and a stammer. They called her stupid and considered her a burden because she would be hard to marry.', ch: FW[7] },
  { q: 'What was the lesson of "A Question of Trust"?', s: 'The story shows that one should not trust strangers blindly. Even an experienced crook like Horace can be tricked by someone who wins his confidence.', ch: FW[3] },
  { q: 'Why was "The Midnight Visitor" an interesting story? Mention one thing.', s: 'It is a suspenseful spy story in which the apparently ordinary Ausable cleverly deceives an armed enemy, and the real surprise comes at the end.', ch: FW[2] },
  { q: 'What did Mathilde do after losing the necklace? Why?', s: 'She and her husband bought a similar diamond necklace by borrowing heavily, and returned it without telling Madame Forestier. She feared being called a thief.', ch: FW[6] },
  { q: 'How does "The Thief\'s Story" show that kindness can change a person?', s: 'Anil\'s trust and teaching made Hari feel ashamed of cheating him. The story shows that a kind act can touch even a thief and begin to reform him.', ch: FW[1] }
];
const L5 = [ // Footprints Without Feet, long answer 4 marks
  { q: 'Write a short note on Tricki\'s transformation in "A Triumph of Surgery".', s: 'At first Tricki was a spoiled, overfed and listless Pekingese. Herriot kept him at his house and put him on a plain diet. After a few days, Tricki played with other dogs, regained health and became lively, so Mrs Pumphrey was delighted and called it a triumph of surgery.', ch: FW[0] },
  { q: 'Give a character sketch of Mrs Pumphrey.', s: 'Mrs Pumphrey is a wealthy, affectionate and generous woman who loves her dog very much. But her love is blind: she overfeeds Tricki and pampers him. She sends gifts to the vet to thank him, which shows her kind heart, though she is foolish in caring for the pet.', ch: FW[0] },
  { q: 'How does Hari Singh change by the end of "The Thief\'s Story"?', s: 'Hari begins as a thief planning to rob Anil. But Anil\'s trust, kindness and teaching make him hesitate. At the end, he is moved by feelings of guilt and the chance of an honest life. He is not hardened, and the story ends on a hopeful note.', ch: FW[1] },
  { q: 'Describe the character of Ausable in "The Midnight Visitor".', s: 'Ausable is a quiet, modest and clever secret agent. He pretends to be a fat, ordinary man, but he is calm, brave and quick-witted. He tricks Max with a bluff and protects the papers, showing that appearances can deceive.', ch: FW[2] },
  { q: 'What is the central idea of "A Question of Trust"?', s: 'The story shows how one can be fooled by false appearances and misplaced trust. Horace Danby, an experienced thief, trusts a stranger and is arrested. The woman cleverly uses his skill to rob the safe, so the theme is that a thief may be outwitted by a cleverer one.', ch: FW[3] },
  { q: 'Write about the life and work of Richard Ebright as given in "The Making of a Scientist".', s: 'Richard Ebright was curious from childhood and began by collecting butterflies. With his mother\'s support and hard work, he did experiments and won recognition. He later became a scientist, showing that curiosity, support and effort can lead to success.', ch: FW[5] },
  { q: 'Give the character sketch of Mathilde Loisel.', s: 'Mathilde is beautiful but vain and dissatisfied. She longs for luxury and is ashamed of her modest life. After losing the borrowed necklace, she shows courage and honesty, working for ten years to repay the debt. She ends worn out, a lesson against pride and show.', ch: FW[6] },
  { q: 'How does "Bholi" show the importance of education for girls?', s: 'Bholi, a stammering girl, was neglected until she went to school. There her teacher\'s kindness gave her confidence. When Bishambar demanded dowry she refused to marry him and decided to serve others. The story shows that education makes girls bold and independent.', ch: FW[7] },
  { q: 'Describe the irony in "The Necklace".', s: 'Mathilde spent ten hard years paying for a necklace she thought was genuine, but it was only paste worth about five hundred francs. Her pride and her wish to appear rich cost her youth and beauty. The twist ending is a fine example of irony.', ch: FW[6] },
  { q: 'How did the Martians react to the book in "The Book That Saved the Earth"? What does it show?', s: 'The Martian leader Think-Tank found a nursery-rhyme book and misunderstood it as a scientific record of Earthlings\' strength. Afraid of their power, the Martians gave up the invasion. The humorous play shows how misunderstanding can lead to wrong decisions.', ch: FW[8] }
];
/* ---- grammar: punctuation and translation ---- */
const PUNC = [
  ['what a lovely day it is said meena', 'What a lovely day it is!" said Meena.'],
  ['rahul asked where are you going', 'Rahul asked, "Where are you going?"'],
  ['the teacher said open your books', 'The teacher said, "Open your books."'],
  ['however he did not come', 'However, he did not come.'],
  ['mumbai the capital of maharashtra is a big city', 'Mumbai, the capital of Maharashtra, is a big city.'],
  ['she bought apples oranges and bananas', 'She bought apples, oranges and bananas.'],
  ['hurrah we have won the match', 'Hurrah! We have won the match.'],
  ['dr ambedkars books are famous', 'Dr Ambedkar\'s books are famous.'],
  ['my brother who lives in pune is a doctor', 'My brother, who lives in Pune, is a doctor.'],
  ['do you know where he lives', 'Do you know where he lives?'],
  ['i want to go but i have no time', 'I want to go, but I have no time.'],
  ['ram said to his friend what are you doing', 'Ram said to his friend, "What are you doing?"'],
  ['alas he is dead', 'Alas! He is dead.'],
  ['the sun rises in the east', 'The sun rises in the east.'],
  ['wait said the guard the train is coming', '"Wait," said the guard, "the train is coming."'],
  ['sita and gita are sisters', 'Sita and Gita are sisters.'],
  ['delhi agra and jaipur form the golden triangle', 'Delhi, Agra and Jaipur form the golden triangle.'],
  ['what time does the train arrive', 'What time does the train arrive?'],
  ['he said i am tired', 'He said, "I am tired."'],
  ['yes i will help you', 'Yes, I will help you.']
];
const TRN = [
  ['मैं प्रतिदिन विद्यालय जाता हूँ। मैं समय पर पहुँचने का प्रयास करता हूँ।', 'I go to school every day. I try to reach on time.'],
  ['पेड़ हमें छाया और फल देते हैं। हमें पेड़ लगाने चाहिए।', 'Trees give us shade and fruit. We should plant trees.'],
  ['गांधीजी का जन्म पोरबन्दर में हुआ था। वे सत्य और अहिंसा के पुजारी थे।', 'Gandhiji was born at Porbandar. He was a believer in truth and non-violence.'],
  ['आज बहुत गर्मी है। मैं ठण्डा पानी पीना चाहता हूँ।', 'It is very hot today. I want to drink cold water.'],
  ['परीक्षा के दिन निकट हैं। छात्र कड़ी मेहनत कर रहे हैं।', 'The examination days are near. The students are working hard.'],
  ['मेरी माँ सुबह जल्दी उठती हैं। वे हम सबके लिए खाना बनाती हैं।', 'My mother gets up early in the morning. She cooks food for all of us.'],
  ['गंगा भारत की पवित्र नदी है। लाखों लोग इसमें स्नान करते हैं।', 'The Ganga is a holy river of India. Millions of people bathe in it.'],
  ['हमें अपने बड़ों का आदर करना चाहिए। वे हमें सही रास्ता दिखाते हैं।', 'We should respect our elders. They show us the right path.'],
  ['पुस्तकालय में शान्ति रखनी चाहिए। वहाँ सब लोग पढ़ते हैं।', 'We should keep quiet in the library. Everyone reads there.'],
  ['कल वर्षा हुई थी। सड़कों पर पानी भर गया।', 'It rained yesterday. The roads were filled with water.']
];

/* ---- assembly ---- */
let pc = 0;
const gch = s => /tense|past|present|future|continuous|perfect/i.test(s) ? 'Tenses' : /article|“a”|“an”|“the”/i.test(s) ? 'Articles' : 'Parts of speech';
for (let k = 0; k < 10; k++) {
  const N = k + 1, B = bld('ue' + N + '-'), off = Math.floor(k / 9);
  const p1 = EB.prose[k % 9], p2 = EB.prose[(k + 4) % 9], un = EB.unseen[k % 9];
  const html = p => `<b>${p.t}</b><br>${p.x}`;
  const m1 = [0, 1, 2].map(j => mcqOf(B, p1.m[(j + off) % 4], UN));
  const m2 = [0, 1].map(j => mcqOf(B, p2.m[(j + 1 + off) % 4], UN));
  const gm = [0, 1, 2, 3, 4].map(j => { const g = EB.gmcq[(k * 5 + j) % EB.gmcq.length]; return mcqOf(B, g, gch(g[5])); });
  const pm = [0, 1, 2].map(j => mcqOf(B, take(PM, k, j, 3), ''));
  const om = [0, 1].map(j => mcqOf(B, take(OM, k, j, 2), ''));
  const fm = [0, 1, 2, 3, 4].map(j => mcqOf(B, take(FM, k, j, 5), ''));
  // reading: 2+2+2+1 = 7
  const rd = [B.self(2, UN, un.s[0][0], un.s[0][1]), B.self(2, UN, un.s[1][0], un.s[1][1]), B.num(1, UN, un.o[off % 4][0], un.o[off % 4][1], un.o[off % 4][2]), B.num(1, UN, un.o[(off + 1) % 4][0], un.o[(off + 1) % 4][1], un.o[(off + 1) % 4][2]), mcqOf(B, un.m[(off + 3) % 4], UN)];
  // second 2-mark replaced by the two 1-mark items below would give 7 exactly: 2+2+1+1+1
  const L = EB.letter[k % 9], Es = EB.essay[k % 9];
  const letterAns = `<b>Format (1):</b> sender\'s address, date, receiver\'s address, subject, salutation, "Yours faithfully", name.<br><b>Content (2):</b> ${L.pts}.<br><b>Expression (1):</b> formal, correct language.<br><i>Sample body:</i> “${L.body}”`;
  const paraAns = `<b>Content (3):</b> introduction – ${Es.i}; points – ${Es.b}; conclusion – ${Es.c}.<br><b>Organisation (2):</b> paragraphs and linking words.<br><b>Language (1):</b> correct grammar, spelling and punctuation.`;
  const rep = [0, 1].map(j => { const r = EB.rep[(k * 2 + j) % EB.rep.length]; return B.self(1, 'Narration', `Change into indirect speech: ${r[0]}`, r[1]); });
  const vo = [0, 1].map(j => { const v = EB.voice[(k * 2 + j) % EB.voice.length]; return B.self(1, 'Voice', `Change the voice: ${v[0]}`, v[1]); });
  const pu = [0, 1].map(j => { const p = take(PUNC, k, j, 2); return B.self(1, 'Punctuation', `Punctuate and capitalise: ${p[0]}`, p[1]); });
  const tr = take(TRN, k, 0, 1);
  const trQ = B.self(4, 'Translation', `Translate into English: ${tr[0]}`, tr[1]);
  const lit = [
    B.self(3, take(L1, k, 0, 1).ch, take(L1, k, 0, 1).q, take(L1, k, 0, 1).s),
    B.self(3, take(L2, k, 0, 1).ch, take(L2, k, 0, 1).q, take(L2, k, 0, 1).s),
    B.self(4, take(L3, k, 0, 1).ch, take(L3, k, 0, 1).q, take(L3, k, 0, 1).s),
    B.self(3, take(L4, k, 0, 2).ch, take(L4, k, 0, 2).q, take(L4, k, 0, 2).s),
    B.self(3, take(L4, k, 1, 2).ch, take(L4, k, 1, 2).q, take(L4, k, 1, 2).s),
    B.self(3, take(L1, k + 5, 0, 1).ch, take(L1, k + 5, 0, 1).q, take(L1, k + 5, 0, 1).s),
    B.self(4, take(L5, k, 0, 1).ch, take(L5, k, 0, 1).q, take(L5, k, 0, 1).s)
  ];
  paper('up-english', N, `अंग्रेज़ी (English) — UP Board Mock Test ${N}`,
    'Section A: 20 MCQs (two passages, grammar, First Flight prose and poetry, Footprints Without Feet) + Section B: reading 7, letter 4, paragraph 6, grammar 10, literature 23 = 70 marks · 3 h 15 min.',
    'Layout follows the UPMSP Class X English model paper 2026-27 (20 MCQ + 50 descriptive marks). Passages, grammar items, letters and paragraphs are original practice material written for this site; the literature questions are original questions on the NCERT First Flight and Footprints Without Feet lessons (the lesson texts are not reproduced). The banks hold nine passages, letters and paragraphs, so Mock 10 re-uses the passages of Mock 1 with different questions, and some grammar and literature items return in later mocks. Written answers are self-marked against the model answer.',
    [
      Object.assign(sec('a1', null, 'Section A – Q1–3: Passage 1 (3 × 1)', null, 'Read the passage and choose the correct answer.', m1), { passage: html(p1) }),
      sec('a2', null, 'Section A – Q4–8: Grammar (5 × 1)', null, 'Choose the correct option.', gm),
      Object.assign(sec('a3', null, 'Section A – Q9–10: Passage 2 (2 × 1)', null, 'Read the passage and choose the correct answer.', m2), { passage: html(p2) }),
      sec('a4', null, 'Section A – Q11–13: First Flight prose (3 × 1)', null, 'Choose the correct option.', pm),
      sec('a5', null, 'Section A – Q14–15: First Flight poetry (2 × 1)', null, 'Choose the correct option.', om),
      sec('a6', null, 'Section A – Q16–20: Footprints Without Feet (5 × 1)', null, 'Choose the correct option.', fm),
      Object.assign(sec('b1', null, 'Section B – Q1: Reading comprehension (7)', null, 'Read the passage and answer the questions.', rd), { passage: html(un) }),
      sec('b2', null, 'Section B – Q2–3: Letter (4) and Paragraph / Article (6)', null, 'Write a letter of about 100 words and a paragraph or article of about 120 words.', [
        B.self(4, LT, L.p, letterAns), B.self(6, PA, Es.p, paraAns)]),
      sec('b3', null, 'Section B – Q4: Grammar (10)', null, 'Do all parts: indirect speech (2), voice (2), punctuation (2) and translation (4).', [...rep, ...vo, ...pu, trQ]),
      sec('b4', null, 'Section B – Q5–10: Literature (23)', null, 'Answer all questions in brief, in your own words.', lit)
    ]);
}
})();

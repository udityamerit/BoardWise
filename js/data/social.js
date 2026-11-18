/* Social Science: History & Political Science (40 marks, 2 h) and Geography (28 marks).
   history-2025-partial : questions adapted from a third-party listing of the 2025 paper (omtexclasses.com). Marks assumed, Q4 (passage) left out.
   history-mock-1       : original mock, Q1-Q9 layout with "any N" choices.
   geography-mock-1     : original mock. Geography layout is approximate (board paper not fetched). */
(function () {
const { mcq, num, self } = window.mk;
const sec = (id, part, title, attempt, instruction, questions) => ({ id, part, title, attempt, instruction, questions });

const H1 = 'Historiography: Development in the West', H2 = 'Historiography: Indian Tradition', H3 = 'Applied History', H4 = 'History of Indian Arts', H5 = 'Mass Media and History', H6 = 'Entertainment and History',
  H7 = 'Sports and History', H8 = 'Tourism and History', H9 = 'Heritage Management';
const P1 = 'Working of the Constitution', P2 = 'The Electoral Process', P3 = 'Political Parties', P4 = 'Social and Political Movements', P5 = 'Challenges Faced by Indian Democracy';

/* ================= HISTORY 2025 (partial, adapted) ================= */
window.PAPERS.push({
  id: 'history-2025-partial', subject: 'history', kind: 'pyq', year: 2025, durationMin: 120,
  title: 'History & Political Science — Board 2025 (partial, adapted)',
  desc: 'Questions listed on a third-party site for the 2025 paper, grouped Q1–Q9. Marks assumed, model answers ours.',
  note: '<b>Read this first.</b> The question wording comes from a third-party answer-key page (omtexclasses.com), paraphrased. That page did not show the marks, the paper header, or the passage for Q.4 (the "Bhilar – Village of Books" question), so: <b>marks per question are assumed by us (total 40)</b>, Q.4 is left out, and one MCQ with unreadable options is dropped. Model answers are written by us. Whether this was the March or July 2025 sitting is unconfirmed. Treat it as a practice paper built from real 2025 question topics, not an exact copy.',
  sections: [
    sec('q1a', 1, 'Q.1 (A) Complete the sentence / answer', null, 'All three are compulsory (1 mark each).', [
      num('r1', 1, H4, 'Name the famous painting by Leonardo da Vinci displayed in the Louvre Museum, Paris.', ['mona lisa', 'monalisa'], '<b>Mona Lisa</b>.'),
      num('r2', 1, H2, 'Who was the first Keertankar (kirtan performer) of Maharashtra?', ['saint namdev', 'namdev', 'sant namdev'], '<b>Saint Namdev</b>.'),
      num('r3', 1, H1, 'Name Hegel\'s book on the philosophy of history, from which the idea of "reason in history" is taken.', ['reason in history', 'lectures on the philosophy of history', 'philosophy of history'], 'Hegel\'s lectures on the Philosophy of History (the introduction is published as <b>Reason in History</b>).')
    ]),
    sec('q1b', 1, 'Q.1 (B) Correct the wrong pair', null, 'All three are compulsory (1 mark each). Write the correct word / name.', [
      num('r4', 1, H7, 'Correct the pair: Chess — outdoor game. (Write the correct type of game.)', ['indoor', 'indoor game'], 'Chess is an <b>indoor</b> game.'),
      num('r5', 1, H8, 'Correct the pair: Red Fort — Mumbai. (Write the correct city.)', ['delhi', 'new delhi'], 'The Red Fort is in <b>Delhi</b>.'),
      num('r6', 1, H1, 'Correct the pair: Tarabai Shinde — "Who were the Shudras?" (Write the book by Tarabai Shinde.)', ['stripurushtulana', 'stri-purushtulana', 'stree-purushtulana', 'streepurushtulana', 'stripurush tulana', 'stri purush tulana'], 'Tarabai Shinde wrote <b>Stri-Purush Tulana</b> (1882). "Who were the Shudras?" was written by Dr B. R. Ambedkar.')
    ]),
    sec('q2a', 1, 'Q.2 (A) Prepare charts / lists', 2, 'Attempt any two (2 marks each).', [
      self('r7', 2, H8, 'List the types of tourism (e.g. by purpose) and give one example of each.', 'Any four with examples (½ mark each): historical tourism (forts), religious/pilgrim tourism (Pandharpur), nature/eco tourism (national parks), medical tourism, adventure tourism (trekking), cultural tourism (festivals).'),
      self('r8', 2, H3, 'Prepare a chart of the branches (disciplines) of the humanities and give one point on each.', 'Examples (any four, ½ mark each): History, Philosophy, Literature, Languages, Archaeology, Fine Arts, Music — they study human culture and thought.'),
      self('r9', 2, H4, 'Prepare a chart of folk and classical dances of India (any two of each).', 'Classical (any two): Bharatanatyam, Kathak, Kuchipudi, Odissi, Manipuri. Folk (any two): Lavani, Garba, Bhangra, Ghoomar, Koli dance. (½ mark each)')
    ]),
    sec('q2b', 1, 'Q.2 (B) Write short notes', 2, 'Attempt any two (2 marks each).', [
      self('r10', 2, H3, 'Write a short note on Vishwakosh (encyclopaedia).', 'A Vishwakosh is a reference work giving organised information on all branches of knowledge (1). Marathi Vishwakosh (started under Tarkateertha Laxmanshastri Joshi) is an example; it is useful for students and researchers (1).'),
      self('r11', 2, H3, 'Write a short note on Applied History.', 'Applied History uses historical knowledge and methods to understand and solve present-day problems and for practical fields such as museums, archives, tourism and media (2).'),
      self('r12', 2, H5, 'Write a short note on careers in the mass media for a student of history.', 'Careers: journalism, research for documentaries, scriptwriting, radio/TV production, content writing. History gives sources, context and critical thinking (2).')
    ]),
    sec('q3', 1, 'Q.3 Explain with reasons', 2, 'Attempt any two of four (3 marks each).', [
      self('r13', 3, H9, 'Preservation of historical objects should be done by trained persons. Explain.', 'Old documents, paintings and objects are fragile; untrained handling damages them (1). Trained conservators use correct chemical and storage methods (1). Their work keeps evidence for future research (1).'),
      self('r14', 3, H1, 'Research in history focusing on women has become important. Explain.', 'Earlier histories mostly recorded kings and wars and ignored women (1). Women\'s history gives a complete picture of society, social reforms and movements (1). It corrects bias and restores women\'s contribution to the record (1).'),
      self('r15', 3, H2, 'The Bakhar is an important source of history. Explain.', 'Bakhars are Marathi prose chronicles of events and persons (1). They give details of the Maratha period not found elsewhere, e.g. Sabhasad Bakhar (1). They must be used with care and cross-checked with other sources (1).'),
      self('r16', 3, H5, 'Mass media is an important source of information. Explain.', 'Newspapers, radio, TV and the internet reach many people quickly (1). They record current events that become tomorrow\'s sources of history (1). They also shape public opinion, so facts must be verified (1).')
    ]),
    sec('q5', 1, 'Q.5 Write notes', 2, 'Attempt any two of four (4 marks each).', [
      self('r17', 4, H1, 'Explain Marxist history writing.', 'Karl Marx saw history as a story of class struggle and of the economic basis of society (2). Marxist historians study the common people, economy and production relations rather than only kings (1). It has been criticised for ignoring non-economic factors (1).'),
      self('r18', 4, H6, 'Write a note on Dashavatara theatre.', 'Dashavatara is a folk theatre of the Konkan region of Maharashtra and Goa showing the ten incarnations of Vishnu (2). It uses masks, songs, and simple dialogue, performed at night after the harvest (1). It preserves local culture and religious stories (1).'),
      self('r19', 4, H7, 'Write a note on the relation between sports and history.', 'Sports in ancient times (wrestling, archery, chess) reflect the society and values of the age (2). Modern sports like cricket and the Olympics reflect colonial influence and national pride (1). Sports history helps understand culture and politics (1).'),
      self('r20', 4, H5, 'Write a note on the history of Akashvani (All India Radio).', 'Radio broadcasting began in India in the 1920s; All India Radio was named Akashvani in 1956 (2). It was a major medium of news, education, music and entertainment (1). Vividh Bharati started in 1957 for entertainment (1). <i>(The source page\'s claim of "24 languages" for Vividh Bharati could not be verified and is not used.)</i>')
    ]),
    sec('q6', 1, 'Q.6 Political Science — choose the correct answer', null, 'Compulsory (1 mark).', [
      mcq('r21', 1, P2, 'The minimum age for voting in India is:', ['16 years', '18 years', '21 years', '25 years'], 1, '61<sup>st</sup> Amendment (1988) lowered it from 21 to 18.')
    ]),
    sec('q7', 1, 'Q.7 State whether true or false, with reasons', 2, 'Attempt any two of three (2 marks each).', [
      self('r22', 2, P3, 'Political parties connect the government and the people.', '<b>True.</b> Parties take the people\'s demands to the government and explain government policies to the people. (1 mark true, 1 mark reason)'),
      self('r23', 2, P4, 'Farmers\' and tribals\' issues were important in the left-extremist (Naxalite) movement.', '<b>True.</b> The movement began in Naxalbari (1967) over land and forest rights of poor farmers and tribals; discontent over land and exploitation fuelled it. (1 + 1)'),
      self('r24', 2, P4, 'Women\'s empowerment is necessary for democracy.', '<b>True.</b> Democracy rests on equal participation; women are half the population, and their education, representation and rights strengthen decision-making. (1 + 1)')
    ]),
    sec('q8a', 1, 'Q.8 (A) Explain the concept', 1, 'Attempt any one of two (2 marks).', [
      self('r25', 2, P5, 'Explain the concept of the Right to Information (RTI).', 'RTI Act 2005 gives every citizen the right to ask for information from public authorities (1). It promotes transparency and accountability and helps check corruption (1).'),
      self('r26', 2, P5, 'Explain the concept of corruption.', 'Corruption is the misuse of public office or power for personal gain, e.g. bribery and favouritism (1). It weakens trust in democracy and harms development; RTI, vigilance bodies and informed citizens help fight it (1).')
    ]),
    sec('q8b', 1, 'Q.8 (B) Prepare a chart', 1, 'Attempt any one of two (2 marks).', [
      self('r27', 2, P2, 'Prepare a chart of the functions of the Election Commission.', 'Any four (½ mark each): prepares electoral rolls; announces the election schedule; recognises parties and allots symbols; implements the Model Code of Conduct; supervises polling and counting; declares results.'),
      self('r28', 2, P3, 'Prepare a chart of national political parties of India with their symbols.', 'Any four recognised national parties and their symbols (½ mark each). <i>(Recognition changes with elections; check the Election Commission list.)</i>')
    ]),
    sec('q9', 1, 'Q.9 Write in detail', 1, 'Attempt any one of two (3 marks).', [
      self('r29', 3, P2, 'Explain the post and powers of the Election Commissioner.', 'The Chief Election Commissioner heads the Election Commission (1). Appointed by the President; works independently and cannot be removed easily (1). Powers: conducts and supervises elections, enforces the Model Code of Conduct, recognises parties (1).'),
      self('r30', 3, P4, 'Describe the functions of an environmental movement.', 'Environmental movements (e.g. Chipko, Narmada Bachao Andolan) raise awareness about nature (1), pressurise government on policy and projects (1), and promote people\'s participation in conservation (1).')
    ])
  ]
});

/* ================= HISTORY & POL SCI MOCK 1 (original) ================= */
window.PAPERS.push({
  id: 'history-mock-1', subject: 'history', kind: 'mock', year: null, durationMin: 120,
  title: 'History & Political Science — Mock Test 1',
  desc: '40 marks · 2 hours · Q1–Q9 with "any N" choices (History 28 + Political Science 12).',
  note: 'Original questions based on the Balbharati History and Political Science chapters. The layout follows the 2025 paper\'s question numbering (Q1A, Q1B, Q2A, Q2B, Q3 … Q9) but the mark split is our approximation.',
  sections: [
    sec('q1a', 1, 'Q.1 (A) Choose the correct option', null, 'All three are compulsory (1 mark each).', [
      mcq('h1', 1, H1, 'Who is called the "Father of History"?', ['Thucydides', 'Herodotus', 'Leopold von Ranke', 'Karl Marx'], 1, 'The Greek historian Herodotus, author of "The Histories".'),
      mcq('h2', 1, H2, 'The chronicle "Rajatarangini" was written by:', ['Kalhana', 'Ziauddin Barani', 'Abul Fazl', 'Bana'], 0, 'Kalhana wrote the history of the kings of Kashmir (12<sup>th</sup> century).'),
      mcq('h3', 1, H6, 'India\'s first full-length feature film "Raja Harishchandra" (1913) was made by:', ['Ardeshir Irani', 'Dadasaheb Phalke', 'Satyajit Ray', 'V. Shantaram'], 1, 'Dhundiraj Govind (Dadasaheb) Phalke.')
    ]),
    sec('q1b', 1, 'Q.1 (B) Answer in one word', null, 'All three are compulsory (1 mark each).', [
      num('h4', 1, H5, 'Who started the first Marathi newspaper "Darpan" in 1832?', ['balshastri jambhekar', 'jambhekar', 'balshastrijambhekar'], 'Balshastri Jambhekar.'),
      num('h5', 1, H7, 'In which year did Khashaba Jadhav win an Olympic bronze medal in wrestling?', ['1952'], 'Helsinki Olympics, <b>1952</b>.'),
      num('h6', 1, H9, 'Which international organisation declares World Heritage Sites?', ['unesco'], '<b>UNESCO</b>.')
    ]),
    sec('q2a', 1, 'Q.2 (A) Short answers', 2, 'Attempt any two of three (2 marks each).', [
      self('h7', 2, H3, 'State any two functions of a museum.', 'Any two: preserves and displays historical objects; helps research and education; creates awareness of heritage; conserves rare artefacts; organises exhibitions. (1 mark each)'),
      self('h8', 2, H2, 'What is a "Bakhar"? Give one example.', 'A Bakhar is a Marathi prose chronicle of Maharashtra\'s history (1 mark). Example: <b>Sabhasad Bakhar</b> (1 mark).'),
      self('h9', 2, H1, 'What is oral history? Give one example of a source.', 'History reconstructed from spoken memories and traditions of people (1). Example: interviews with freedom fighters, folk songs and ballads (powada) (1).')
    ]),
    sec('q2b', 1, 'Q.2 (B) Short answers', 2, 'Attempt any two of three (2 marks each).', [
      self('h10', 2, H1, 'Distinguish between primary and secondary sources of history.', 'Primary sources are first-hand evidence from the period (inscriptions, coins, letters). Secondary sources are written later using primary sources (textbooks, research books). (1 mark each)'),
      self('h11', 2, H5, 'Write any two effects of mass media on society.', 'Any two: spreads information and awareness; shapes public opinion; helps education and entertainment; supports democracy by questioning government; can spread rumours if misused. (1 mark each)'),
      self('h12', 2, H3, 'State any two uses of archives.', 'Archives preserve government and private records (1); they are the main source for researchers and historians (1).')
    ]),
    sec('q3', 1, 'Q.3 Short notes', 2, 'Attempt any two of four (3 marks each).', [
      self('h13', 3, H1, 'Explain Leopold von Ranke\'s contribution to historiography.', 'Ranke (19<sup>th</sup> century German historian) stressed <b>scientific, source-based history</b> (1). He insisted on original archival documents and critical examination of evidence (1). His aim was to narrate the past "as it really happened" (1).'),
      self('h14', 3, H6, 'Write a short note on Dadasaheb Phalke.', 'D. G. Phalke (1870–1944) is regarded as the father of Indian cinema (1). He made India\'s first full-length feature film <b>Raja Harishchandra</b> (1913) (1). The Dadasaheb Phalke Award for lifetime contribution to cinema is named after him (1).'),
      self('h15', 3, H8, 'Explain how tourism and history are connected.', 'Historical places (forts, temples, museums) attract tourists (1). Tourism earns revenue and creates jobs that support upkeep of heritage (1). History gives tourists context and meaning, so guides need historical knowledge (1).'),
      self('h16', 3, H7, 'Write a short note on Khashaba Jadhav.', 'Khashaba Dadasaheb Jadhav was a wrestler from Maharashtra (1). He won the bronze medal at the 1952 Helsinki Olympics — independent India\'s first individual Olympic medal (1). He is an inspiration for Indian sport (1).')
    ]),
    Object.assign(sec('q4', 1, 'Q.4 Passage-based questions', 2, 'Read the passage and attempt any two of three (2 marks each).', [
      self('h17', 2, H9, 'Give a suitable title to the passage.', 'e.g. "Protecting our forts" or "Heritage conservation" (any suitable title, 2 marks).'),
      self('h18', 2, H9, 'According to the passage, who are working together to protect forts?', 'Local people, schools and the Archaeological Survey of India (2 marks).'),
      self('h19', 2, H9, 'Why is it important to protect forts, according to the passage?', 'Because they keep the story of our past alive for the next generation (2 marks).')
    ]), { passage: 'Many forts of Maharashtra are in ruins. Rain, plants and carelessness damage the walls every year. Local people, schools and the Archaeological Survey of India now work together to clean forts, repair walls and teach visitors not to write on them. Such care keeps the story of our past alive for the next generation.' }),
    sec('q5', 1, 'Q.5 Answer in detail', 1, 'Attempt any one of two (4 marks).', [
      self('h20', 4, H9, 'Explain the importance of heritage management.', 'Any four with explanation (1 mark each): preserves monuments and art for future generations; maintains national identity; boosts tourism and local economy; creates employment; source for research and education; need of public awareness and laws (ASI, UNESCO).'),
      self('h21', 4, H5, 'How did newspapers contribute to the national movement? Give examples.', 'Newspapers spread nationalist ideas and united people (2). Examples: <b>Kesari</b> and <b>Maratha</b> (Tilak), <b>Mooknayak</b> (Dr Ambedkar), <b>Young India</b> (Gandhiji) (2).')
    ]),
    sec('q6', 1, 'Q.6 Political Science — choose the correct option', null, 'Both are compulsory (1 mark each).', [
      mcq('p1', 1, P1, 'The Constitution of India came into force on:', ['15 August 1947', '26 November 1949', '26 January 1950', '2 October 1950'], 2, 'Adopted on 26 November 1949; in force from 26 January 1950.'),
      mcq('p3', 1, P2, 'The minimum age for voting in India is:', ['16 years', '18 years', '21 years', '25 years'], 1, '61<sup>st</sup> Amendment (1988) lowered it from 21 to 18.')
    ]),
    sec('q7', 1, 'Q.7 True or false, with reasons', 2, 'Attempt any two of three (2 marks each).', [
      self('p4', 2, P3, 'Political parties are necessary in a democracy.', '<b>True.</b> They contest elections, form governments and give people a choice between programmes. (1 + 1)'),
      self('p2', 2, P2, 'Elections are conducted by the Supreme Court.', '<b>False.</b> The independent Election Commission of India conducts elections. (1 + 1)'),
      self('p7', 2, P4, 'Social movements strengthen democracy.', '<b>True.</b> They raise the issues of neglected groups and push the government to act. (1 + 1)')
    ]),
    sec('q8', 1, 'Q.8 Short answer', 1, 'Attempt any one of two (3 marks).', [
      self('p5', 3, P2, 'Why are free and fair elections important in a democracy?', 'They let people choose representatives (1); they make the government accountable and allow peaceful change (1); free and fair conduct (secret ballot, independent Election Commission, Model Code of Conduct) keeps trust in democracy (1).'),
      self('p8', 3, P3, 'Explain the role of the opposition party in a democracy.', 'Criticises government policy (1); asks questions in Parliament and checks misuse of power (1); offers an alternative government (1).')
    ]),
    sec('q9', 1, 'Q.9 Answer in detail', 1, 'Attempt any one of two (3 marks).', [
      self('p6', 3, P5, 'Explain any one challenge faced by Indian democracy and suggest remedies.', 'Challenge with explanation (2 marks), e.g. <b>corruption</b> – misuse of public office. Remedies (1 mark): strong laws, transparency (RTI), citizen vigilance. Other valid challenges: communalism, casteism, illiteracy and poverty, criminalisation of politics.'),
      self('p9', 3, P5, 'Explain how the Right to Information strengthens democracy.', 'Citizens can ask for information from public bodies (1); it makes government transparent and accountable (1); it helps expose corruption and encourages participation (1).')
    ])
  ]
});

/* ================= GEOGRAPHY MOCK 1 (original) ================= */
const LX = 'Location and Extent', PD = 'Physiography and Drainage', CL = 'Climate', NV = 'Natural Vegetation and Wildlife', PO = 'Population', HS = 'Human Settlements', TR = 'Tourism, Transport and Communication';
window.PAPERS.push({
  id: 'geography-mock-1', subject: 'geography', kind: 'mock', year: null, durationMin: 90,
  title: 'Geography — Mock Test 1',
  desc: 'Geography (28 marks) · 90 minutes · MCQs plus "any N" choices.',
  note: 'Original questions based on the Balbharati Geography textbook. The Geography paper layout is <b>approximate</b>: the board paper could not be fetched, so the 28-mark split (Q1 6×1, Q2 any 4 of 5 at 2, Q3 any 2 of 3 at 3, Q4 any 2 of 3 at 4) is our design. Economics is not included.',
  sections: [
    sec('q1', 1, 'Q.1 Choose the correct option', null, 'All six are compulsory (1 mark each).', [
      mcq('g1', 1, LX, 'The Standard Meridian of India is:', ['68°7′ E', '82°30′ E', '90° E', '97°25′ E'], 1, '82°30′ E passes near Mirzapur (Uttar Pradesh); IST is based on it.'),
      mcq('g2', 1, PD, 'The Western Ghats are locally called ______ in Maharashtra.', ['Sahyadri', 'Satpura', 'Aravalli', 'Vindhya'], 0, 'Sahyadri.'),
      mcq('g3', 1, PD, 'Which river is known as the "Dakshin Ganga"?', ['Krishna', 'Godavari', 'Narmada', 'Tapi'], 1, 'The Godavari is the longest peninsular river.'),
      mcq('g4', 1, CL, 'The south-west monsoon first arrives on the coast of:', ['Kerala', 'Gujarat', 'Odisha', 'West Bengal'], 0, 'Around 1 June at Kerala.'),
      mcq('g5', 1, NV, 'Mangrove forests are best developed in the delta of:', ['Godavari', 'Ganga–Brahmaputra (Sundarbans)', 'Narmada', 'Kaveri'], 1, 'The Sundarbans in West Bengal/Bangladesh.'),
      mcq('g6', 1, PO, 'The Census of India is conducted after every:', ['5 years', '10 years', '15 years', '20 years'], 1, 'Decennial census.')
    ]),
    sec('q2', 1, 'Q.2 Answer in two or three sentences', 4, 'Attempt any four of five (2 marks each).', [
      self('g7', 2, HS, 'Distinguish between rural and urban settlements (any two points).', 'Rural: agriculture-based occupations, low density, fewer services. Urban: non-agricultural occupations (industry, trade, services), high density, better services. (1 mark per valid pair)'),
      self('g8', 2, PO, 'State any two factors affecting the distribution of population.', 'Any two: relief/terrain, climate, soil fertility, water availability, industries and employment, transport. (1 mark each)'),
      self('g9', 2, CL, 'Why does the windward side of the Western Ghats receive heavy rainfall?', 'Moisture-laden south-west monsoon winds are forced to rise along the Ghats; they cool and condense, causing heavy orographic rainfall on the windward (west) side. (2 marks)'),
      self('g10', 2, TR, 'State any two factors responsible for the development of tourism in India.', 'Any two: varied natural beauty, rich heritage, religious places, better transport and communication, government promotion. (1 mark each)'),
      self('g11', 2, NV, 'State any two characteristics of tropical evergreen forests.', 'Found in areas of heavy rainfall (over 200 cm); dense, tall trees; trees do not shed leaves together; e.g. rosewood, ebony, mahogany; found in the Western Ghats and north-east India. (1 mark each, any two)')
    ]),
    sec('q3', 1, 'Q.3 Write short answers', 2, 'Attempt any two of three (3 marks each).', [
      self('g12', 3, PD, 'Describe the Northern Plains of India.', 'Formed by alluvium deposited by the Indus, Ganga and Brahmaputra systems (1). Flat, fertile, extends from Punjab to Assam, divided into Bhabar, Terai, Bhangar and Khadar (1). Densely populated, intensive agriculture, many cities (1).'),
      self('g13', 3, CL, 'Explain how the south-west monsoon is formed (outline).', 'In summer intense heating of north-west India creates a low-pressure area, and the high pressure over the cooler Indian Ocean draws moist winds towards land (1). South-east trade winds cross the equator and turn right to become south-west monsoon winds (1). They bring rain to most of India from June to September (1).'),
      self('g14', 3, PD, 'Describe the drainage pattern of the peninsular rivers.', 'Most peninsular rivers (Godavari, Krishna, Kaveri) rise in the Western Ghats and flow east into the Bay of Bengal (1). They are rain-fed, seasonal and form deltas on the east coast (1). Narmada and Tapi flow west through rift valleys and form estuaries (1).')
    ]),
    sec('q4', 1, 'Q.4 Answer in detail', 2, 'Attempt any two of three (4 marks each).', [
      self('g15', 4, CL, 'Explain the factors affecting the climate of India.', 'Any four (1 mark each with explanation): latitude (Tropic of Cancer), altitude, distance from sea, relief (Himalaya block cold winds, Western Ghats cause rain), monsoon winds, western disturbances, ocean currents.'),
      self('g16', 4, TR, 'Explain the importance of tourism in India and mention any two problems of the tourism industry.', 'Importance (2 marks): foreign exchange, employment, regional development, cultural exchange, growth of transport and hotels. Problems (2 marks): inadequate infrastructure and safety, pollution and damage to heritage, seasonality, poor promotion in remote areas.'),
      self('g17', 4, NV, 'Explain the main types of natural vegetation found in India.', 'Tropical evergreen, tropical deciduous (monsoon), thorn forests and scrub, mountain/montane forests and mangroves — each with its climatic condition and a typical tree/location (1 mark each).')
    ])
  ]
});
})();

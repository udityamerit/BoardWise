/* Geography question bank, part 1 (original items based on the Balbharati Class X Geography chapters). Assembled by geo-build.js.
   GB.add(chapter, { mcq, two, three, four })
     mcq   : [question, right, wrong1, wrong2, wrong3, solution]
     two   : [question, model answer]    (2 marks, self-checked)
     three : [question, model answer]    (3 marks)
     four  : [question, model answer]    (4 marks) */
(function () {
const GB = window.GB = { bank: {} };
GB.add = (ch, cats) => {
  const b = GB.bank[ch] || (GB.bank[ch] = { mcq: [], two: [], three: [], four: [] });
  Object.keys(cats).forEach(k => b[k].push(...cats[k]));
};

GB.add('Field Visit', {
  mcq: [
    ["Data collected directly by the student during a field visit is called:", "primary data", "secondary data", "census data", "satellite data", "Information gathered first-hand on the spot is primary data."],
    ["Which instrument is used to find directions during a field visit?", "Compass", "Thermometer", "Rain gauge", "Barometer", "A compass shows the north direction and helps to find other directions."],
    ["A list of questions prepared to collect information from people is called a:", "questionnaire", "legend", "scale", "contour", "A questionnaire is used in interviews and surveys."],
    ["Which of the following should be prepared FIRST for a field visit?", "Objectives and plan of the visit", "The final report", "The conclusion", "The index of the report", "Planning and objectives come before the visit."],
    ["The final written account of a field visit is called the:", "field report", "census", "atlas", "toposheet", "The field report presents the work, data and conclusions."],
    ["A device that finds the exact location of a place using satellite signals is:", "GPS", "Compass", "Clinometer", "Hygrometer", "GPS (Global Positioning System) uses satellite signals."],
    ["Information taken from books, maps, newspapers and the internet is called:", "secondary data", "primary data", "field data", "oral data", "It was collected earlier by someone else."]
  ],
  two: [
    ["State any two objectives of a field visit.", "Any two (1 mark each): to learn by direct observation; to collect first-hand (primary) data; to relate textbook knowledge to the real situation; to develop skills of observation, interview and report writing."],
    ["Why is it necessary to take permission before a field visit?", "Permission from the school and from the people or authority of the place visited ensures safety, avoids misunderstanding and makes the visit smooth. (2 marks)"],
    ["Name any four tools or materials that a student should carry on a field visit.", "Notebook and pen, map or toposheet, compass, camera, questionnaire, measuring tape, drinking water, first-aid kit (any four, ½ mark each)."],
    ["Distinguish between primary data and secondary data (any two points).", "Primary data are collected first-hand by the student by observation or interviews; secondary data are taken from existing sources such as books, maps and reports. (1 mark per valid point)"],
    ["Why should students take precautions during a field visit?", "To remain safe, to keep discipline, to avoid damage to the place visited and to complete the work successfully. (2 marks)"]
  ],
  three: [
    ["Explain the steps involved in a field visit.", "Planning and fixing objectives (1); collecting data by observation, interviews, measurements and photographs (1); tabulating, analysing the data and writing the report (1)."],
    ["Describe the methods of collecting data during a field visit.", "Observation of the place and activities (1); interview or questionnaire with local people (1); measurement, photographs, sketches and maps (1)."],
    ["Explain the importance of a questionnaire in a field visit.", "It gives a set of questions so that the same information is collected from every person (1); it saves time and keeps the study focused (1); the answers can be tabulated and analysed easily (1)."]
  ],
  four: [
    ["Explain the contents of a field visit report.", "Title page and acknowledgement (1); objectives and methods (1); observations and data in tables, graphs and photographs (1); analysis, conclusion and suggestions (1)."],
    ["Why is a field visit important in the study of geography? Explain with an example.", "It gives first-hand knowledge (1); it connects textbook ideas with real conditions (1); it develops skills of observation, data collection and reporting (1); example: a visit to a village or a dam shows land use, water supply and occupations directly (1)."],
    ["Explain the precautions to be taken before, during and after a field visit.", "Before: take permission, plan the route and carry the tools (1½). During: remain with the group, follow instructions, do not damage property or disturb people (1½). After: arrange the data, thank the people and complete the report (1)."]
  ]
});

GB.add('Location and Extent', {
  mcq: [
    ["The Tropic of Cancer passes through how many states of India?", "Eight", "Five", "Ten", "Twelve", "It passes through Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura and Mizoram."],
    ["The southernmost tip of the Indian mainland is:", "Kanyakumari", "Indira Point", "Rameswaram", "Kochi", "Indira Point is on Great Nicobar island; Kanyakumari is the southern tip of the mainland."],
    ["The strait which separates India from Sri Lanka is the:", "Palk Strait", "Strait of Malacca", "Bering Strait", "Strait of Hormuz", "The Palk Strait lies between Tamil Nadu and Sri Lanka."],
    ["India’s neighbour that lies to the north-east and shares a long border with Arunachal Pradesh is:", "China", "Pakistan", "Sri Lanka", "Afghanistan", "China borders Arunachal Pradesh in the north-east."],
    ["India has the ______ largest area among the countries of the world.", "seventh", "first", "third", "tenth", "India covers about 3.28 million sq km, the seventh largest country."],
    ["The time difference between two places is 4 minutes for a difference of ______ of longitude.", "1°", "5°", "10°", "15°", "The earth rotates 360° in 24 hours, so 1° = 4 minutes."],
    ["The group of islands situated in the Arabian Sea is:", "Lakshadweep", "Andaman and Nicobar", "Nicobar and Sunderbans", "Maldives and Mauritius", "Lakshadweep lies in the Arabian Sea; Andaman and Nicobar lie in the Bay of Bengal."]
  ],
  two: [
    ["State the latitudinal and longitudinal extent of India.", "Latitudinal extent: about 8°4′ N to 37°6′ N; longitudinal extent: about 68°7′ E to 97°25′ E. (1 mark each)"],
    ["Why is the Indian Standard Time based on 82°30′ E?", "The meridian passes through the centre of the country, so one common time is used for all India and the time difference between the east and west is managed. (2 marks)"],
    ["Name any four neighbouring countries of India.", "Pakistan, Afghanistan, China, Nepal, Bhutan, Bangladesh, Myanmar (any four, ½ mark each). Sri Lanka and the Maldives are island neighbours."],
    ["What is the importance of the Tropic of Cancer for India?", "It passes almost through the middle of the country and divides it into the tropical zone in the south and the sub-tropical zone in the north. (2 marks)"],
    ["Why is India’s location in the Indian Ocean strategically important?", "India is in the centre of the Indian Ocean routes between East Asia and West Asia/Europe, which helps in trade and sea transport. (2 marks)"]
  ],
  three: [
    ["Explain the effects of India’s large size on its life.", "Large area gives variety of relief, climate and resources (1); there are differences in time between the east and the west (1); it leads to diversity of languages and culture, and a large market (1)."],
    ["Describe the position of India with respect to the hemispheres and the equator.", "India lies north of the equator, so it is in the Northern Hemisphere (1); it lies east of the Prime Meridian, so it is in the Eastern Hemisphere (1); it is a part of the continent of Asia and is a peninsula bordered by seas on three sides (1)."],
    ["Explain the importance of the Suez Canal to India’s trade.", "The Suez Canal links the Mediterranean Sea with the Red Sea (1); it shortens the sea route between India and Europe (1); it saves time and fuel and helps India’s trade (1)."]
  ],
  four: [
    ["Explain the importance of the location of India.", "Central location in Asia with sea routes to Africa, Europe and East Asia (1); a long coastline and ports help trade (1); the Himalayas protect it from cold winds and the Indian Ocean brings the monsoon (1); a variety of climate and resources (1)."],
    ["Calculate and explain the time difference between Dwarka (68°7′ E) and Kibithu (97°25′ E) using the idea of longitude.", "The difference of longitude is about 29° (1). Each degree equals 4 minutes (1). So the time difference is about 29 × 4 = 116 minutes, nearly two hours (1). Hence the sun rises in the east about two hours earlier than in the west, but one standard time is followed (1)."],
    ["Describe the extent and boundaries of India.", "Extent: about 3,214 km north–south and 2,933 km east–west (1). Land boundary of about 15,200 km shared with seven countries (1). Seas: Arabian Sea in the west, Bay of Bengal in the east and the Indian Ocean in the south (1). Coastline of about 7,500 km including the islands (1)."]
  ]
});

GB.add('Physiography and Drainage', {
  mcq: [
    ["The highest peak of the Western Ghats in peninsular India is:", "Anamudi", "Kalsubai", "Doddabetta", "Mahendragiri", "Anamudi (2,695 m) in Kerala is the highest peak of peninsular India."],
    ["The highest peak in Maharashtra is:", "Kalsubai", "Harishchandragad", "Salher", "Raigad", "Kalsubai (1,646 m) in the Sahyadri range."],
    ["The Himalayan range lying farthest to the north is the:", "Himadri", "Himachal", "Shivalik", "Purvanchal", "Himadri (the Greater Himalaya) is the northernmost and highest range."],
    ["Which river flows through a rift valley and falls into the Arabian Sea?", "Narmada", "Godavari", "Mahanadi", "Krishna", "The Narmada and Tapi flow west through rift valleys."],
    ["The river Godavari rises near:", "Trimbakeshwar (Nashik)", "Amarkantak", "Mahabaleshwar", "Gangotri", "Trimbakeshwar in the Sahyadri."],
    ["Which of the following is a salt-water lake?", "Chilika", "Wular", "Dal", "Loktak", "Chilika in Odisha is a brackish lagoon; Wular, Dal and Loktak are freshwater lakes."],
    ["Lonar lake in Maharashtra was formed by:", "a meteorite impact", "a glacier", "river deposition", "tectonic faulting", "Lonar is a crater lake in Buldhana district."],
    ["The Konkan coast lies between:", "Daman and Goa", "Goa and Mangalore", "Mangalore and Kanyakumari", "Chennai and Vishakhapatnam", "Konkan runs along the west coast from Daman to Goa."]
  ],
  two: [
    ["Name the three parallel ranges of the Himalayas from north to south.", "Himadri (Greater Himalaya), Himachal (Lesser Himalaya) and Shivalik (Outer Himalaya). (2 marks)"],
    ["Why are the rivers of north India perennial?", "They are fed by melting snow of the Himalayas in summer and by rain in the monsoon, so they have water throughout the year. (2 marks)"],
    ["What are ‘Doab’ regions? Give one example.", "A Doab is the land between two rivers, e.g. the land between the Ganga and Yamuna in Uttar Pradesh. (2 marks)"],
    ["Distinguish between Bhangar and Khadar (any two points).", "Bhangar is old alluvium, found above the flood level, with kankar; Khadar is new alluvium, found in flood plains, and more fertile. (1 mark each)"],
    ["Why are the peninsular rivers seasonal?", "They are fed only by rain and have no snow source, so they swell in the monsoon and shrink in summer. (2 marks)"]
  ],
  three: [
    ["Describe the Western Ghats.", "A continuous range along the west coast, called Sahyadri in Maharashtra (1); it is steep on the western side and slopes gently to the east; passes include Thal, Bhor and Palghat (1); it has heavy rain, evergreen forests, and the sources of rivers such as the Godavari and Krishna (1)."],
    ["Describe the Thar Desert.", "It is found in western Rajasthan and has sand dunes and very little rain (1); the Luni is its only important river (1); the climate is hot and dry and the people practise animal rearing and some farming with canals (1)."],
    ["Explain the importance of the Himalayas to India.", "They protect India from cold north winds and invasions (1); they cause rain by blocking monsoon winds and are the source of perennial rivers (1); they provide forests, minerals, hydroelectricity and tourism (1)."]
  ],
  four: [
    ["Compare the Himalayan rivers with the peninsular rivers.", "Source: Himalaya vs plateau (1). Flow: perennial vs seasonal (1). Course: long with gorges, valleys and large plains, vs short and shallow (1). Mouth: large deltas (Ganga) vs deltas on the east and estuaries on the west (1)."],
    ["Describe the Indian islands.", "Andaman and Nicobar lie in the Bay of Bengal and are the tops of submerged hills; they have forests and a rainy climate (2). Lakshadweep lies in the Arabian Sea and is made of coral reefs and atolls; the islands are small and low (2)."],
    ["Describe the eastern and western coastal plains of India.", "Western: narrow, between the Sahyadri and the Arabian Sea; Konkan, Kannad and Malabar coasts (1½); many estuaries and good ports. Eastern: wide between the Eastern Ghats and the Bay of Bengal; Northern Circars and Coromandel coast (1½); fertile deltas of the Mahanadi, Godavari, Krishna and Kaveri (1)."]
  ]
});
})();

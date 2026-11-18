/* English bank 3: grammar pools (original items, each with one clear answer).
   mcq    : [q, right, w1, w2, w3, solution]
   fill   : [q, [accepted answers], solution]
   rep    : [direct speech, reported speech]
   voice  : [active sentence, passive sentence] */
(function () {
const EB = window.EB = window.EB || {};

EB.gmcq = [
["The news ______ very encouraging today.", "is", "are", "were", "have been", "“News” is an uncountable noun and takes a singular verb."],
["Each of the students ______ a book.", "has", "have", "are having", "were", "“Each” is singular, so it takes “has”."],
["I have lived in Nashik ______ ten years.", "for", "since", "from", "at", "“For” is used with a period of time."],
["While she ______ her homework, the lights went out.", "was doing", "does", "has done", "will do", "A longer past action in progress: past continuous."],
["He ______ to Mumbai yesterday.", "went", "has gone", "goes", "had go", "“Yesterday” needs the simple past."],
["Students ______ wear a uniform in this school; it is a rule.", "must", "might", "could", "would", "“Must” shows a rule or compulsion."],
["If it rains tomorrow, we ______ the picnic.", "will cancel", "would cancel", "cancelled", "had cancelled", "First conditional: if + simple present, will + verb."],
["The Taj Mahal ______ by Shah Jahan.", "was built", "built", "is building", "has build", "Passive voice, simple past: was built."],
["I look forward ______ you.", "to meeting", "to meet", "for meeting", "at meet", "“Look forward to” is followed by a gerund."],
["He is senior ______ me.", "to", "than", "from", "of", "Senior, junior, superior and inferior take “to”."],
["The teacher, along with the students, ______ going on a trip.", "is", "are", "were", "have", "The verb agrees with the first subject “teacher”."],
["I would rather ______ at home.", "stay", "to stay", "staying", "stayed", "“Would rather” is followed by the base verb."],
["Let us go, ______ we?", "shall", "will", "do", "can", "The question tag for “Let us…” is “shall we?”."],
["She can sing well, ______?", "can’t she", "isn’t she", "doesn’t she", "won’t she", "A positive statement takes a negative tag with the same auxiliary."],
["He has been working here ______ 2010.", "since", "for", "from", "in", "“Since” is used with a point of time."],
["The sun ______ in the east.", "rises", "rise", "rose", "is rise", "A universal truth takes the simple present."],
["I wish I ______ a bird.", "were", "am", "will be", "have been", "“Wish” for an unreal present takes “were”."],
["Hardly had he reached the station ______ the train left.", "when", "than", "then", "because", "“Hardly … when” is the correct pair."],
["The patient had died before the doctor ______.", "arrived", "arrives", "has arrived", "had arrive", "Past perfect + before + simple past."],
["______ of the two shirts is cheaper?", "Which", "What", "Who", "Whom", "“Which” is used for a choice among a given set."],
["This is the ______ book I have ever read.", "best", "better", "good", "most good", "Superlative of “good” is “best”."],
["Honesty is ______ best policy.", "the", "a", "an", "one", "“The” is used before a superlative."],
["Look! The children ______ in the garden.", "are playing", "play", "played", "have play", "“Look!” shows an action happening now."],
["He asked me ______ I was going.", "where", "what", "who", "whose", "“Where” fits an indirect question about place."],
["Mother told me ______ the window.", "to close", "closing", "close", "closed", "“Told + object + to-infinitive”."],
["She is afraid ______ spiders.", "of", "from", "with", "at", "“Afraid of”."],
["The letter was written ______ my uncle.", "by", "with", "to", "of", "The agent in a passive sentence is introduced by “by”."],
["My father will be back ______ an hour.", "in", "since", "for", "at", "“In an hour” means after one hour from now."],
["The boy ______ stole the pen was punished.", "who", "whom", "whose", "which", "“Who” is the subject of “stole”."],
["This is the house ______ I was born.", "where", "which", "whose", "who", "“Where” refers to a place."],
["He does not have ______ money to buy a car.", "enough", "enoughly", "many", "few", "“Enough” goes before an uncountable noun."],
["There is ______ milk in the fridge.", "a little", "a few", "many", "several", "“Milk” is uncountable, so “a little”."],
["I have ______ been to Goa; I plan to go there this year.", "never", "ever", "already", "just", "The plan to go “this year” shows that the speaker has not yet been there."],
["She was so tired ______ she fell asleep at once.", "that", "than", "as", "which", "“So … that” shows result."],
["______ he was ill, he came to school.", "Although", "Because", "Unless", "So", "“Although” shows contrast."],
["Please wait ______ I return.", "until", "unless", "because", "although", "“Until” shows the time limit."]
];

EB.gfill = [
["He is ______ M.Sc. in Physics. (article)", ["an"], "“M.Sc.” begins with the vowel sound “em” ⇒ an."],
["I saw ______ one-eyed man at the gate. (article)", ["a"], "“one” begins with a consonant sound “w” ⇒ a."],
["It took me ______ hour to reach there. (article)", ["an"], "“hour” begins with a vowel sound (silent h) ⇒ an."],
["She is ______ university student. (article)", ["a"], "“university” begins with the consonant sound “y” ⇒ a."],
["She has been absent ______ Monday. (preposition)", ["since"], "“Since” is used with a point of time."],
["The meeting is ______ 5 p.m. tomorrow. (preposition)", ["at"], "“At” is used with exact clock time."],
["He was born ______ 1990. (preposition)", ["in"], "“In” is used with years."],
["I will meet you ______ Sunday. (preposition)", ["on"], "“On” is used with days."],
["She is married ______ a doctor. (preposition)", ["to"], "“Married to”."],
["He is accused ______ theft. (preposition)", ["of"], "“Accused of”."],
["We congratulated him ______ his success. (preposition)", ["on"], "“Congratulate on”."],
["Mumbai is ______ (big) than Pune. (correct form)", ["bigger"], "Comparative degree: bigger."],
["This is the ______ (good) film I have seen. (correct form)", ["best"], "Superlative of good: best."],
["She sings ______ (beautiful). (correct form)", ["beautifully"], "An adverb is needed to modify the verb."],
["He ______ (go) to school by bus every day. (correct form)", ["goes"], "Simple present, third person singular."],
["They ______ (play) football when it started to rain. (correct form)", ["were playing", "were play"], "Past continuous for an action in progress."],
["She has ______ (write) a letter. (correct form)", ["written"], "Present perfect needs the past participle."],
["He ______ (be) absent yesterday. (correct form)", ["was"], "Simple past of “be” for a singular subject."],
["The thieves were ______ (catch) by the police. (correct form)", ["caught"], "Passive voice needs the past participle."],
["Rohit ______ (not like) tea. (correct form)", ["doesn't like", "does not like", "doesnt like", "doesn’t like"], "Negative simple present, third person singular."],
["My brother ______ (visit) us last week. (correct form)", ["visited"], "“Last week” needs the simple past."],
["We ______ (see) the Taj Mahal next month. (correct form)", ["will see", "shall see"], "A future plan with “next month”."],
["He worked hard, ______ he failed. (conjunction)", ["but", "yet"], "A contrast: but/yet."],
["Work hard, ______ you will fail. (conjunction)", ["or", "otherwise", "or else"], "“Or” shows an alternative or warning."],
["Not only the teacher ______ also the students were praised. (conjunction)", ["but"], "“Not only … but also”."],
["Either you ______ your brother must come. (conjunction)", ["or"], "“Either … or”."],
["He ran fast ______ that he could catch the bus. (conjunction)", ["so"], "“So that” shows purpose."],
["I will go ______ he invites me or not. (conjunction)", ["whether"], "“Whether … or not”."],
["Rita and ______ went to the fair. (I / me)", ["i"], "“Rita and I” is the subject of the sentence."],
["This book is ______. It belongs to me. (my / mine)", ["mine"], "A possessive pronoun stands alone."],
["The girl ______ won the prize is my cousin. (who / whom)", ["who"], "“Who” is the subject of “won”."],
["He hurt ______ while cutting vegetables. (him / himself)", ["himself"], "A reflexive pronoun is needed when the subject and object are the same."]
];

EB.rep = [
["He said, “I write poems.”", "He said that he wrote poems."],
["She said, “I have finished my work.”", "She said that she had finished her work."],
["Ravi said to me, “I will help you.”", "Ravi told me that he would help me."],
["The teacher said, “The earth moves round the sun.”", "The teacher said that the earth moves round the sun. (a universal truth keeps its tense)"],
["Mother said to me, “Do your homework.”", "Mother told me to do my homework."],
["The officer said to the clerk, “Please bring the file.”", "The officer requested the clerk to bring the file."],
["She said to him, “Why are you crying?”", "She asked him why he was crying."],
["He said to me, “Do you like cricket?”", "He asked me if I liked cricket."],
["Sita said, “I went to Pune yesterday.”", "Sita said that she had gone to Pune the day before."],
["They said, “We are playing football.”", "They said that they were playing football."],
["The guide said to the visitors, “Do not touch the exhibits.”", "The guide told the visitors not to touch the exhibits."],
["Anil said to Sunil, “What are you doing?”", "Anil asked Sunil what he was doing."],
["She said, “Alas! I have lost my purse.”", "She exclaimed with sorrow that she had lost her purse."],
["Tom said, “Hurrah! We have won the match.”", "Tom exclaimed with joy that they had won the match."],
["The principal said to the students, “Be punctual.”", "The principal advised the students to be punctual."],
["He said to her, “Can you swim?”", "He asked her if she could swim."],
["Meena said, “My brother will come tomorrow.”", "Meena said that her brother would come the next day."],
["The doctor said to the patient, “Take this medicine twice a day.”", "The doctor advised the patient to take that medicine twice a day."]
];

EB.voice = [
["The boy flew a kite.", "A kite was flown by the boy."],
["They are building a new bridge.", "A new bridge is being built by them."],
["The farmer has sold the cow.", "The cow has been sold by the farmer."],
["Who wrote this letter?", "By whom was this letter written?"],
["She wrote an essay.", "An essay was written by her."],
["She will sing a song.", "A song will be sung by her."],
["The cook was preparing dinner.", "Dinner was being prepared by the cook."],
["The police arrested the thief.", "The thief was arrested by the police."],
["My mother makes tea every morning.", "Tea is made by my mother every morning."],
["Did the children break the window?", "Was the window broken by the children?"],
["The students will perform the play.", "The play will be performed by the students."],
["The rain has spoiled the crops.", "The crops have been spoiled by the rain."],
["She is writing a letter.", "A letter is being written by her."],
["The workers have completed the road.", "The road has been completed by the workers."],
["Somebody opened the gate.", "The gate was opened (by somebody)."],
["We should obey the rules.", "The rules should be obeyed (by us)."],
["The Prime Minister inaugurated the bridge.", "The bridge was inaugurated by the Prime Minister."],
["The gardener waters the plants daily.", "The plants are watered daily by the gardener."]
];
})();

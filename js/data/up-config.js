/* UP Board (UPMSP) – Class X, Hindi medium: board settings and the six subjects.
   Source for every number below: the official UPMSP 2026-27 syllabus PDFs and "प्रतिदर्श / Model question papers 2026-27" (upmsp.edu.in).
   Written paper = 70 marks (20 objective on an OMR sheet + 50 descriptive); 30 marks are internal / practical and are not tested here.
   Time = 3 h 15 min (15 min reading time + 3 h writing). Pass = 23 / 70 written and 10 / 30 internal, i.e. 33 / 100.
   Loaded after config.js (it adds to window.SUBJECTS and window.BOARD_CFG). */
(function () {
const U = 'upmsp';

window.BOARD_CFG.upmsp = {
  passPercent: 33,
  minutesPerMark: 195 / 70,
  examWindow: 'Feb – Mar 2027 (check the UPMSP timetable)',
  medium: 'Hindi medium',
  chapterNote: 'Chapters follow the official UPMSP 2026-27 syllabus (NCERT / UP Board textbooks).',
  grades: [
    { min: 75, label: 'Distinction', cls: 'g-dist' },
    { min: 60, label: 'First Division', cls: 'g-first' },
    { min: 45, label: 'Second Division', cls: 'g-second' },
    { min: 33, label: 'Third Division (Pass)', cls: 'g-pass' },
    { min: 0, label: 'Below pass mark', cls: 'g-fail' }
  ],
  patternPoints: [
    'One written paper of <b>70 marks</b> per subject. The other 30 marks are internal assessment / practical work done at school, so they are not part of these mock tests.',
    'Time allowed: <b>3 hours 15 minutes</b> — the first 15 minutes are reading time, then 3 hours of writing.',
    '<b>Section A</b> (खण्ड अ): 20 multiple-choice questions of 1 mark each = 20 marks, answered on an OMR sheet. There is no negative marking.',
    '<b>Section B</b> (खण्ड ब): descriptive questions = 50 marks, with "अथवा" (either / or) choices inside most questions.',
    'All questions are compulsory; the choice is only the "either / or" inside a question.',
    'Pass mark: <b>23 out of 70</b> in the written paper and 10 out of 30 in internal / practical work — 33 out of 100 overall.'
  ]
};

const sub = o => window.SUBJECTS.push(Object.assign({ board: U, total: 70, durationNote: '3 h 15 min (70 marks)' }, o));

sub({
  key: 'up-hindi', name: 'Hindi', short: 'हिन्दी', icon: '📖', color: '#c2410c',
  blurb: 'गद्य, पद्य, खण्डकाव्य, संस्कृत खण्ड, व्याकरण, पत्र और निबन्ध – 70 अंक (विषय कोड 901).',
  pattern: [
    ['खण्ड अ – बहुविकल्पीय (20)', 20, 'गद्य/पद्य साहित्य का इतिहास 10, काव्य-सौन्दर्य 3, हिन्दी व्याकरण 3, संस्कृत व्याकरण 1, वाक्य 1, वाच्य 1, पद-परिचय 1'],
    ['गद्यांश और पद्यांश', 12, 'प्रश्न 1 और 2: प्रत्येक 3 × 2 = 6 अंक, "अथवा" सहित'],
    ['संस्कृत खण्ड', 12, 'गद्यांश का अनुवाद 5, पद्यांश का अनुवाद 5, श्लोक कण्ठस्थ 2'],
    ['खण्डकाव्य', 3, 'कथानक / चरित्र-चित्रण / तथ्य'],
    ['लेखक और कवि परिचय', 10, 'प्रत्येक 3 + 2 = 5 अंक'],
    ['संस्कृत में उत्तर', 2, 'चार में से दो प्रश्न (1 + 1)'],
    ['पत्र-लेखन', 4, 'अथवा सहित'],
    ['निबन्ध', 7, 'चार विषयों में से एक (200 शब्द)']
  ],
  note: 'Layout copied from the official UPMSP model paper 2026-27. Written answers are self-marked against the model answer.',
  chapters: {
    'गद्य खण्ड': ['मित्रता', 'ममता', 'भारतीय संस्कृति', 'अजन्ता', 'क्या लिखूँ', 'ईर्ष्या तू न गयी मेरे मन से', 'पानी में चन्दा और चाँद पर आदमी'],
    'पद्य खण्ड': ['सूरदास', 'तुलसीदास', 'रसखान', 'बिहारी लाल', 'रामनरेश त्रिपाठी', 'मैथिलीशरण गुप्त', 'महादेवी वर्मा', 'सुमित्रानन्दन पंत', 'माखनलाल चतुर्वेदी', 'सुभद्रा कुमारी चौहान', 'अशोक वाजपेयी', 'श्याम नारायण पाण्डेय', 'केदारनाथ सिंह'],
    'खण्डकाव्य': ['मुक्तिदूत', 'ज्योति जवाहर', 'अग्रपूजा', 'मेवाड़ मुकुट', 'जय सुभाष', 'मातृभूमि के लिए', 'कर्ण', 'कर्मवीर भरत', 'तुमुल'],
    'संस्कृत खण्ड': ['वाराणसी', 'देशभक्तः चन्द्रशेखरः', 'भारतीयाः संस्कृतिः', 'वीरः वीरेण पूज्यते', 'आरुणिश्वेतकेतुसंवादः', 'जीवन-सूत्राणि', 'प्रबुद्धो ग्रामीणः', 'केन किं वर्धते', 'अन्योक्तिविलासः'],
    'साहित्य का इतिहास': ['गद्य साहित्य का इतिहास', 'पद्य साहित्य का इतिहास'],
    'काव्य-सौन्दर्य': ['रस', 'अलंकार', 'छन्द'],
    'व्याकरण': ['उपसर्ग', 'समास', 'तद्भव-तत्सम-पर्यायवाची', 'संस्कृत व्याकरण', 'वाक्य', 'वाच्य', 'पद-परिचय'],
    'लेखन': ['पत्र-लेखन', 'निबन्ध']
  }
});

sub({
  key: 'up-english', name: 'English', short: 'English', icon: '🔤', color: '#7c3aed',
  blurb: 'Reading, Writing, Grammar and Literature (First Flight, Footprints Without Feet) – 70 marks (subject code 917).',
  pattern: [
    ['Part A – MCQs (20)', 20, 'Two unseen/extract passages, grammar, First Flight and Footprints lessons and poems'],
    ['Reading', 7, 'Unseen passage: 2 + 2 + 2 + 1'],
    ['Writing', 10, 'Letter / application 4, paragraph / article 6'],
    ['Grammar', 10, 'Narration, voice, punctuation (2 each) + Hindi → English translation 4'],
    ['Literature', 23, 'Prose, poetry and Footprints Without Feet: short and long answers']
  ],
  note: 'Layout copied from the official UPMSP Sample Question Paper 2026-27. Written answers are self-marked against the model answer.',
  chapters: {
    'First Flight – Prose': ['A Letter to God', 'Nelson Mandela: Long Walk to Freedom', 'Two Stories about Flying', 'From the Diary of Anne Frank', 'Glimpses of India', 'Mijbil the Otter', 'Madam Rides the Bus', 'The Sermon at Benares', 'The Proposal'],
    'First Flight – Poetry': ['Dust of Snow', 'Fire and Ice', 'A Tiger in the Zoo', 'How to Tell Wild Animals', 'The Ball Poem', 'Amanda!', 'The Trees', 'Fog', 'The Tale of Custard the Dragon', 'For Anne Gregory'],
    'Footprints Without Feet': ['A Triumph of Surgery', "The Thief's Story", 'The Midnight Visitor', 'A Question of Trust', 'Footprints Without Feet', 'The Making of a Scientist', 'The Necklace', 'Bholi', 'The Book That Saved the Earth'],
    'Reading': ['Unseen passage'],
    'Writing': ['Letter / Application', 'Paragraph / Article'],
    'Grammar': ['Parts of speech', 'Tenses', 'Articles', 'Narration', 'Voice', 'Punctuation', 'Reordering and spelling', 'Translation']
  }
});

sub({
  key: 'up-sanskrit', name: 'Sanskrit', short: 'संस्कृतम्', icon: '🕉️', color: '#b45309',
  blurb: 'गद्य, पद्य, आशुपाठ, व्याकरण, अनुवाद और रचना – 70 अंक (विषय कोड 923).',
  pattern: [
    ['खण्ड-अ – बहुविकल्पीय (20)', 20, 'गद्यांश 2, पाठ्य-पुस्तक 8, प्रत्याहार / सन्धि / शब्दरूप / धातुरूप / समास 10'],
    ['गद्य', 8, 'अनुवाद 4, पाठ-सारांश 4'],
    ['पद्य', 11, 'श्लोक की व्याख्या 4, सूक्ति 3, संस्कृत में अर्थ 4'],
    ['आशुपाठ', 6, 'चरित्र-चित्रण 4, संस्कृत में उत्तर 2'],
    ['व्याकरण', 7, 'विभक्ति 2, प्रत्यय 2, वाच्य-परिवर्तन 3'],
    ['अनुवाद', 6, 'हिन्दी वाक्यों का संस्कृत अनुवाद (2 × 3)'],
    ['रचना', 12, 'निबन्ध 8 + पदों का वाक्य-प्रयोग 4']
  ],
  note: 'Layout copied from the official UPMSP model paper 2026-27. Written answers are self-marked against the model answer.',
  chapters: {
    'संस्कृत व्याकरण': ['प्रत्याहार', 'सन्धि', 'शब्दरूप', 'धातुरूप', 'समास', 'कारक-विभक्ति', 'प्रत्यय', 'वाच्य-परिवर्तन'],
    'अनुवाद और रचना': ['हिन्दी से संस्कृत अनुवाद', 'संस्कृत निबन्ध', 'पदों का वाक्य-प्रयोग'],
    'संस्कृत गद्य भारती': ['वैदिक मङ्गलाचरणम्', 'कविकुलगुरुः कालिदासः', 'नैतिकमूल्यानि', 'विश्वकविः रवीन्द्रः', 'आदिशङ्कराचार्यः', 'संस्कृतभाषायाः गौरवम्'],
    'संस्कृत पद्य पीयूषम्': ['लक्ष्य-वेध-परीक्षा', 'वृक्षाणां चेतनत्वम्', 'सूक्ति-सुधा', 'क्षान्तिसौख्यम्', 'विद्यार्थिचर्या', 'गीतामृतम्', 'जीव्याद् भारतवर्षम्'],
    'कथा-नाटक कौमुदी': ['महात्मनः संस्मरणानि', 'कारुणिको जीमूतवाहनः', 'धैर्यधनाः हि साधवः', 'यौतुकः पापसञ्चयः', 'भोजस्य शल्यचिकित्सा', 'ज्ञानं पूततरं सदा', 'वयं भारतीयाः']
  }
});

sub({
  key: 'up-maths', name: 'Mathematics', short: 'गणित', icon: '📐', color: '#2563eb',
  blurb: 'वास्तविक संख्याएँ, बीजगणित, निर्देशांक ज्यामिति, ज्यामिति, त्रिकोणमिति, मेन्सुरेशन, सांख्यिकी और प्रायिकता – 70 अंक (विषय कोड 928).',
  pattern: [
    ['खण्ड अ – बहुविकल्पीय (20)', 20, 'सभी इकाइयों से'],
    ['प्रश्न 1 – अति लघु', 12, 'छह उपभाग (क–च), प्रत्येक 2 अंक'],
    ['प्रश्न 2 – लघु', 20, 'छह में से कोई पाँच उपभाग, प्रत्येक 4 अंक'],
    ['प्रश्न 3 – दीर्घ', 6, 'अथवा सहित'],
    ['प्रश्न 4 – दीर्घ', 6, 'अथवा सहित (3 + 3)'],
    ['प्रश्न 5 – मेन्सुरेशन', 6, 'पृष्ठीय क्षेत्रफल / आयतन, अथवा सहित']
  ],
  note: 'Unit marks (official): संख्या पद्धति 5, बीजगणित 18, निर्देशांक ज्यामिति 5, ज्यामिति 10, त्रिकोणमिति 12, मेन्सुरेशन 10, सांख्यिकी व प्रायिकता 10. Layout copied from the official UPMSP model paper 2026-27.',
  chapters: {
    'संख्या पद्धति': ['वास्तविक संख्याएँ'],
    'बीजगणित': ['बहुपद', 'दो चर वाले रैखिक समीकरण युग्म', 'द्विघात समीकरण', 'समान्तर श्रेढ़ी'],
    'निर्देशांक ज्यामिति': ['रेखा (द्विविमीय)'],
    'ज्यामिति': ['त्रिभुज', 'वृत्त'],
    'त्रिकोणमिति': ['त्रिकोणमिति का परिचय', 'त्रिकोणमितीय सर्वसमिकाएँ', 'ऊँचाई और दूरी'],
    'मेन्सुरेशन': ['वृत्तों से सम्बन्धित क्षेत्रफल', 'पृष्ठीय क्षेत्रफल तथा आयतन'],
    'सांख्यिकी तथा प्रायिकता': ['सांख्यिकी', 'प्रायिकता']
  }
});

sub({
  key: 'up-science', name: 'Science', short: 'विज्ञान', icon: '🔬', color: '#059669',
  blurb: 'रासायनिक पदार्थ, जैव जगत, प्राकृतिक घटनाएँ, विद्युत का प्रभाव और प्राकृतिक संसाधन – 70 अंक (विषय कोड 931).',
  pattern: [
    ['खण्ड अ – बहुविकल्पीय (20)', 20, 'भौतिक 7, रसायन 6, जीव विज्ञान 7'],
    ['भौतिक विज्ञान', 18, 'प्रश्न 1–4 (4 + 4 + 4 + 6)'],
    ['रसायन विज्ञान', 14, 'प्रश्न 5–7 (4 + 4 + 6)'],
    ['जीव विज्ञान', 18, 'प्रश्न 8–11 (4 + 4 + 4 + 6)']
  ],
  note: 'Unit marks (official): रासायनिक पदार्थ 20, जैव जगत 20, प्राकृतिक घटनाएँ 12, विद्युत का प्रभाव 13, प्राकृतिक संसाधन 5. The 30-mark practical is not tested. Layout copied from the official UPMSP model paper 2026-27.',
  chapters: {
    'रासायनिक पदार्थ – प्रकृति एवं व्यवहार': ['रासायनिक अभिक्रियाएँ एवं समीकरण', 'अम्ल, क्षार एवं लवण', 'धातु एवं अधातु', 'कार्बन एवं उसके यौगिक'],
    'जैव जगत': ['जैव प्रक्रम', 'नियंत्रण एवं समन्वय', 'जीव जनन कैसे करते हैं?', 'आनुवंशिकता'],
    'प्राकृतिक घटनाएँ': ['प्रकाश – परावर्तन तथा अपवर्तन', 'मानव नेत्र तथा रंग बिरंगा संसार'],
    'विद्युत का प्रभाव': ['विद्युत', 'विद्युत धारा का चुम्बकीय प्रभाव'],
    'प्राकृतिक संसाधन': ['हमारा पर्यावरण']
  }
});

sub({
  key: 'up-social', name: 'Social Science', short: 'सामाजिक विज्ञान', icon: '🌏', color: '#0e7490',
  blurb: 'इतिहास, भूगोल, नागरिक शास्त्र (लोकतान्त्रिक राजनीति) और अर्थशास्त्र – 70 अंक (विषय कोड 932).',
  pattern: [
    ['खण्ड अ – बहुविकल्पीय (20)', 20, 'इतिहास, भूगोल, राजनीति और अर्थशास्त्र'],
    ['वर्णनात्मक – I', 16, 'चार प्रश्न × 4 अंक (लगभग 80 शब्द), अथवा सहित'],
    ['वर्णनात्मक – II', 24, 'चार प्रश्न × 6 अंक (2 + 4, लगभग 150 शब्द), अथवा सहित'],
    ['मानचित्र कार्य', 10, 'दो खण्ड × 5 अंक (भारत का मानचित्र)']
  ],
  note: 'Unit marks (official): इतिहास 20, भूगोल 20, नागरिक शास्त्र 15, अर्थशास्त्र 15. The real paper asks you to mark places on an outline map; here the map questions are asked as "name the place" questions. Layout copied from the official UPMSP model paper 2026-27.',
  chapters: {
    'इतिहास – भारत और समकालीन विश्व-2': ['यूरोप में राष्ट्रवाद का उदय', 'भारत में राष्ट्रवाद', 'भूमण्डलीकृत विश्व का बनना', 'औद्योगीकरण का युग', 'मुद्रण संस्कृति और आधुनिक दुनिया'],
    'भूगोल – समकालीन भारत-2': ['संसाधन एवं विकास', 'वन एवं वन्य जीव संसाधन', 'जल संसाधन', 'कृषि', 'खनिज तथा ऊर्जा संसाधन', 'विनिर्माण उद्योग', 'राष्ट्रीय अर्थव्यवस्था की जीवन रेखाएँ'],
    'नागरिक शास्त्र – लोकतान्त्रिक राजनीति-2': ['सत्ता की साझेदारी', 'संघवाद', 'जाति, धर्म और लैंगिक मसले', 'राजनीतिक दल', 'लोकतन्त्र के परिणाम'],
    'अर्थशास्त्र – आर्थिक विकास की समझ': ['विकास', 'भारतीय अर्थव्यवस्था के क्षेत्रक', 'मुद्रा और साख', 'वैश्वीकरण और भारतीय अर्थव्यवस्था', 'उपभोक्ता अधिकार'],
    'मानचित्र कार्य': ['इतिहास मानचित्र', 'भूगोल मानचित्र']
  }
});
})();

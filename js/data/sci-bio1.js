/* Science Part 2 question bank — Biology I (Heredity and Evolution, Life Processes 1 and 2). Original questions.
   Heredity cross questions are generated from Mendel's seven pea traits. */
(function () {
const { add, N } = window.SCI;

/* ---------- Heredity and Evolution ---------- */
const HR = 'Heredity and Evolution';
const TR = [['tall', 'dwarf', 'T', 't', 'plant height'], ['round', 'wrinkled', 'R', 'r', 'seed shape'], ['yellow', 'green', 'Y', 'y', 'seed colour'], ['purple', 'white', 'P', 'p', 'flower colour'],
  ['inflated', 'constricted', 'I', 'i', 'pod shape'], ['green', 'yellow', 'G', 'g', 'pod colour'], ['axial', 'terminal', 'A', 'a', 'flower position']];
const cross = (D, r) => `F₁: ${D}${D} × ${r}${r} → all <b>${D}${r}</b>. F₂: ${D}${r} × ${D}${r} → gametes ${D}, ${r} and ${D}, ${r}.`;
const gh = { two: [], three: [], one: [], mcq: [] };
TR.forEach(([d, r, D, rr, nm], i) => {
  const n = [400, 800, 1200, 1600, 2000, 2400, 1000][i];
  gh.two.push(N(`In a monohybrid cross of two heterozygous plants (${D}${rr} × ${D}${rr}) for ${nm} (${d} is dominant), the F₂ generation has ${n} plants. How many are expected to be ${r}?`, n / 4, `${r} is recessive, so it appears only as ${rr}${rr}, which is 1/4 of the F₂ (ratio 3 : 1). ${n} × 1/4 = <b>${n / 4}</b>.`, 'number of plants'));
  gh.three.push([`A pure ${d} plant (${D}${D}) is crossed with a pure ${r} plant (${rr}${rr}). With a Punnett square show the F₁ and F₂ generations and write the phenotypic and genotypic ratios of F₂.`, `${cross(D, rr)} (1 mark). Punnett square: <b>${D}${D}, ${D}${rr}, ${D}${rr}, ${rr}${rr}</b> (1 mark). Phenotypic ratio = <b>3 ${d} : 1 ${r}</b>; genotypic ratio = <b>1 ${D}${D} : 2 ${D}${rr} : 1 ${rr}${rr}</b> (1 mark).`]);
  gh.one.push([`In a cross for ${nm}, which trait is dominant: ${d} or ${r}?`, [d], `In Mendel's experiment the F₁ plants all showed the ${d} trait, so ${d} is dominant.`]);
});
const dihyb = (A, a, B, b, tA, tB, ta, tb) => {
  const gam = [A + B, A + b, a + B, a + b], rows = gam.map(g1 => gam.map(g2 => { const x = [g1[0], g2[0]].sort().join(''), y = [g1[1], g2[1]].sort().join(''); return x + y; }));
  return '<table class="mini"><tr><th></th>' + gam.map(g => `<th>${g}</th>`).join('') + '</tr>' + rows.map((r, i) => `<tr><th>${gam[i]}</th>` + r.map(c => `<td>${c}</td>`).join('') + '</tr>').join('') + '</table>';
};
const dh = (D1, d1, R1, S1, D2, d2, R2, S2, n1, n2) => [`A pure ${D1}, ${D2} plant (${R1}${R1}${R2}${R2}) is crossed with a pure ${d1}, ${d2} plant (${S1}${S1}${S2}${S2}). Using a Punnett square, show the F₁ and F₂ generations of this dihybrid cross and write the phenotypic ratio of F₂. State Mendel's law shown by it.`,
  `F₁ (1 mark): all <b>${R1}${S1}${R2}${S2}</b> — ${D1}, ${D2}. Gametes of F₁ (1 mark): <b>${R1}${R2}, ${R1}${S2}, ${S1}${R2}, ${S1}${S2}</b>. Punnett square (1½ marks):${dihyb(R1, S1, R2, S2)}F₂ phenotypes: <b>9 : 3 : 3 : 1</b> — 9 ${D1}-${D2} : 3 ${D1}-${d2} : 3 ${d1}-${D2} : 1 ${d1}-${d2} (1 mark). Law (½ mark): <b>law of independent assortment</b> — alleles of the two traits assort independently.`];
add(2, HR, {
  mcq: [
    ["The scientific name of the plant used by Mendel for his experiments is:", "Pisum sativum", "Oryza sativa", "Zea mays", "Triticum aestivum", "Mendel worked on the garden pea, Pisum sativum."],
    ["In humans, the sex of the child is determined by the:", "father", "mother", "both equally", "environment", "The father produces X or Y sperms; the mother always gives X. XX is female and XY is male."],
    ["The phenotypic ratio of a dihybrid cross in F₂ is:", "9 : 3 : 3 : 1", "3 : 1", "1 : 2 : 1", "1 : 1", "Two traits assort independently, giving four phenotypes in the ratio 9 : 3 : 3 : 1."],
    ["A cross between an F₁ hybrid and the homozygous recessive parent is called:", "a test cross", "a reciprocal cross", "a back cross only", "a dihybrid cross", "A test cross (Tt × tt) gives 1 : 1 if the individual is heterozygous."],
    ["Organs such as the forelimb of a human and the wing of a bat are:", "homologous organs", "analogous organs", "vestigial organs", "functional organs only", "Same basic structure but different functions — homologous."],
    ["The two strands of a DNA molecule are held together by:", "hydrogen bonds between the nitrogenous bases", "ionic bonds", "peptide bonds", "metallic bonds", "A pairs with T and G with C by hydrogen bonds."]
  ].concat(gh.mcq),
  one: [
    ["Who is called the Father of Genetics?", ["mendel", "gregor mendel", "gregor johann mendel"], "Gregor Johann Mendel."],
    ["Name the chromosomes present in a normal human female.", ["xx", "44 + xx", "44+xx"], "A female has XX sex chromosomes."],
    ["Name the molecule that carries hereditary information from parents to offspring.", ["dna", "deoxyribonucleic acid"], "DNA."],
    ["Name the scientist who proposed the theory of natural selection.", ["darwin", "charles darwin"], "Charles Darwin."],
    ["What are the remains or impressions of dead organisms preserved in rocks called?", ["fossils", "fossil"], "Fossils."]
  ].concat(gh.one),
  two: [
    ["Distinguish between dominant and recessive traits (any two points).", "<b>Dominant:</b> expresses itself in both homozygous and heterozygous condition; written with a capital letter (T). <b>Recessive:</b> expresses only in the homozygous condition and is masked in the hybrid; written with a small letter (t). (1 mark per valid point)"],
    ["Distinguish between genotype and phenotype with an example.", "Genotype: the genetic make-up of an individual, e.g. Tt. Phenotype: the observable characteristic, e.g. tall. (1 mark each with example)"],
    ["Explain how the sex of a child is determined in humans.", "Women have XX chromosomes and produce only X eggs; men have XY and produce X or Y sperms (1 mark). If an X sperm fertilises the egg, the child is a girl (XX); if a Y sperm fertilises it, the child is a boy (XY) (1 mark)."],
    ["Differentiate between homologous and analogous organs with one example each.", "Homologous: same structure and origin, different functions, e.g. forelimbs of man and whale. Analogous: different structure, same function, e.g. wings of a bird and of an insect. (1 mark each)"],
    ["What are fossils? State their use in the study of evolution.", "Fossils are the preserved remains or impressions of organisms that lived in the past (1 mark). They show the stages through which organisms evolved and help to find the age of rocks (1 mark)."],
    ["State Mendel's law of segregation.", "The two alleles of a gene separate (segregate) during the formation of gametes so that each gamete receives only one allele. (2 marks)"],
    ["What is variation? Name any two causes.", "Differences among the individuals of a species (1 mark). Causes: mutation, sexual reproduction (crossing over and recombination), environmental factors (any two, ½ mark each)."]
  ].concat(gh.two),
  three: [
    ["Explain Darwin's theory of natural selection in brief.", "More offspring are produced than can survive (1). There are variations among them and a struggle for existence (1). Those with favourable variations survive and pass them on — survival of the fittest — so the population changes over generations (1)."],
    ["Differentiate between Lamarck's theory and Darwin's theory.", "Lamarck: organs develop by use and disuse and acquired characters are inherited. Darwin: variations exist naturally; nature selects the fittest, and only inherited variations are passed on. Lamarck's ideas were rejected because acquired characters are not inherited. (1 mark each)"],
    ["Describe the structure of DNA in brief.", "DNA is a double helix of two long polynucleotide strands (1 mark). Each nucleotide has a sugar (deoxyribose), a phosphate and a nitrogenous base A, T, G or C (1 mark). The strands are joined by hydrogen bonds between A–T and G–C (1 mark)."],
    ["What is speciation? Explain how isolation leads to it.", "Speciation is the formation of new species from existing ones (1 mark). When a population is divided by a barrier (geographical isolation), gene flow stops; each group is subject to different selection and mutations (1 mark) and over many generations they become so different that they can no longer interbreed — new species (1 mark)."],
    ["Explain the test cross with the help of a cross between Tt and tt.", "A test cross is the cross of an individual of unknown genotype with a homozygous recessive parent (1 mark). Tt × tt → gametes T, t and t → offspring Tt and tt (1 mark). Ratio 1 : 1 shows the tall plant was heterozygous; if all were tall it would be TT (1 mark)."],
    ["What are acquired and inherited traits? Give two examples of each.", "Acquired traits develop during the lifetime due to environment and are not passed to progeny, e.g. a cut tail, bodybuilding. Inherited traits are controlled by genes and pass to offspring, e.g. eye colour, blood group. (1½ marks each)"],
    ["How are chromosomes, genes and DNA related? Explain in brief.", "Chromosomes are thread-like structures in the nucleus made of DNA and protein (1 mark). A gene is a segment of DNA that carries the information for one trait (1 mark). Humans have 23 pairs of chromosomes; DNA replicates and is passed on during cell division (1 mark)."]
  ].concat(gh.three),
  five: [
    dh('round', 'wrinkled', 'R', 'r', 'yellow', 'green', 'Y', 'y'),
    dh('tall', 'dwarf', 'T', 't', 'purple', 'white', 'P', 'p'),
    ["Explain the evidence for evolution from (i) homologous organs (ii) analogous organs (iii) vestigial organs (iv) fossils (v) molecular phylogeny.", "(i) Homologous organs — common ancestry, e.g. forelimbs of vertebrates. (ii) Analogous organs — adaptation to similar function, e.g. wings of bird and insect. (iii) Vestigial organs — reduced, non-functional organs inherited from ancestors, e.g. appendix. (iv) Fossils — show stages and transitional forms, e.g. Archaeopteryx. (v) Similarities in DNA/protein sequences indicate closeness of relationship. (1 mark each)"]
  ]
});

/* ---------- Life Processes in Living Organisms — Part 1 (energy, nutrition, respiration, transport) ---------- */
const L1 = 'Life Processes in Living Organisms (Part 1)';
add(2, L1, {
  mcq: [
    ["The energy currency of the cell is:", "ATP", "ADP", "DNA", "glucose", "ATP (adenosine triphosphate) stores and releases energy for cellular activities."],
    ["Cellular respiration in the absence of oxygen in yeast produces:", "ethanol and carbon dioxide", "lactic acid", "water and carbon dioxide", "only carbon dioxide", "Yeast: glucose → ethanol + CO₂ + energy (fermentation)."],
    ["Which of the following is a heterotrophic mode of nutrition?", "Amoeba", "Spirogyra", "Mango tree", "Euglena in light", "Amoeba feeds on ready-made food (holozoic)."],
    ["The enzyme in saliva that starts the digestion of starch is:", "salivary amylase", "pepsin", "lipase", "trypsin", "Salivary amylase converts starch into maltose."],
    ["Oxygenated blood from the lungs is carried to the left atrium by:", "pulmonary veins", "pulmonary arteries", "vena cava", "aorta", "Pulmonary veins are the only veins carrying oxygenated blood."],
    ["Which blood cells help in blood clotting?", "platelets", "red blood cells", "white blood cells", "plasma cells", "Platelets (thrombocytes) release substances that form a clot."]
  ],
  one: [
    ["Write the full form of ATP.", ["adenosine triphosphate"], "Adenosine triphosphate."],
    ["Where does glycolysis take place in the cell?", ["cytoplasm", "cytosol"], "Glycolysis occurs in the cytoplasm."],
    ["Name the pigment present in red blood cells that carries oxygen.", ["haemoglobin", "hemoglobin"], "Haemoglobin."],
    ["Which organ produces bile?", ["liver", "the liver"], "Bile is produced by the liver and stored in the gall bladder."],
    ["What is the normal human body temperature in °C?", ["37", "37 c", "37°c"], "About 37 °C (98.6 °F)."],
    ["Name the process by which green plants prepare food using sunlight.", ["photosynthesis"], "Photosynthesis."]
  ],
  two: [
    ["Write the chemical equation of photosynthesis and name the pigment involved.", "6CO₂ + 6H₂O —(sunlight, chlorophyll)→ C₆H₁₂O₆ + 6O₂ (1½ marks). Pigment: <b>chlorophyll</b> (½ mark)."],
    ["Distinguish between aerobic and anaerobic respiration (any two points).", "Aerobic: needs oxygen, complete breakdown of glucose to CO₂ and H₂O, 38 ATP released, takes place in mitochondria. Anaerobic: no oxygen, incomplete breakdown (lactic acid/ethanol), 2 ATP, takes place in the cytoplasm. (1 mark per point)"],
    ["What is peristalsis? Where does it occur?", "Peristalsis is the rhythmic contraction and relaxation of the muscles of the alimentary canal which pushes food forward (1 mark). It occurs in the oesophagus, stomach and intestines (1 mark)."],
    ["What is the function of the hydrochloric acid secreted in the stomach?", "It makes the medium acidic for the enzyme pepsin to act (1 mark) and kills the germs that enter with food (1 mark)."],
    ["Distinguish between arteries and veins (any two points).", "Arteries carry blood away from the heart, have thick elastic walls and no valves; veins carry blood to the heart, have thin walls and valves. (1 mark per valid point)"],
    ["What is the function of the villi in the small intestine?", "The villi are finger-like projections that increase the surface area for absorption of digested food (1 mark); their rich blood supply carries absorbed nutrients to the blood (1 mark)."],
    ["Name the components of blood and write one function of each.", "Plasma — carries nutrients, hormones and wastes; RBCs — carry oxygen; WBCs — fight infections; platelets — clot blood. (any four, ½ mark each)"]
  ],
  three: [
    ["Describe the path of air from the nose to the alveoli in humans.", "Nostrils → nasal cavity → pharynx → larynx → trachea → two bronchi → bronchioles → alveoli, where gas exchange takes place (1½ marks for the sequence, 1½ for function: oxygen diffuses into blood and CO₂ out)."],
    ["Explain the process of nutrition in Amoeba.", "Amoeba is a holozoic unicellular organism that engulfs food with its pseudopodia, forming a food vacuole (1 mark). Digestive enzymes secreted into the vacuole break down the food, and the digested food is absorbed into the cytoplasm (1 mark). Undigested residue is expelled by the cell surface (1 mark)."],
    ["Explain the role of the following in digestion: (i) saliva (ii) bile (iii) pancreatic juice.", "(i) Saliva — salivary amylase starts the digestion of starch (1). (ii) Bile — emulsifies fats; makes the food alkaline for pancreatic enzymes (1). (iii) Pancreatic juice — trypsin, amylase and lipase digest proteins, carbohydrates and fats (1)."],
    ["Write three differences between the human arteries and capillaries.", "Arteries: thick elastic walls; carry blood from the heart under high pressure; have a narrow lumen but larger vessel. Capillaries: walls one cell thick; allow exchange of materials between blood and tissue; connect arteries to veins. (1 mark per point)"],
    ["Draw and explain the double circulation in humans in brief.", "In double circulation, blood passes twice through the heart in one cycle. <b>Pulmonary circulation:</b> right ventricle → pulmonary artery → lungs → pulmonary veins → left atrium (1½ marks). <b>Systemic circulation:</b> left ventricle → aorta → body → vena cava → right atrium (1½ marks)."],
    ["Describe the structure and function of the red blood corpuscles.", "RBCs are biconcave, disc-shaped cells without a nucleus (1 mark). They contain haemoglobin, which combines with oxygen to form oxyhaemoglobin (1 mark) and carries it from the lungs to the tissues; they live for about 120 days (1 mark)."],
    ["Explain the differences between breathing and respiration.", "Breathing is the physical process of taking in oxygen and giving out CO₂ (inhalation and exhalation), and it happens in the lungs. Cellular respiration is the chemical breakdown of glucose in cells to release energy (ATP), taking place in mitochondria. (1½ marks each)"],
    ["Why is the rate of breathing faster after exercise?", "Muscles use more oxygen and produce more CO₂ and lactic acid during exercise (1 mark). The rise in blood CO₂ stimulates the respiratory centre in the brain (1 mark), which increases the rate and depth of breathing to supply oxygen and remove CO₂ (1 mark)."]
  ],
  five: [
    ["Describe the structure of the human heart with a neat labelled diagram and explain double circulation.", "<b>Diagram</b> (2 marks): four chambers — right and left atria, right and left ventricles; vena cava, pulmonary artery, pulmonary veins, aorta, valves. <b>Structure</b> (1 mark): muscular organ; the septum separates oxygenated and deoxygenated blood. <b>Double circulation</b> (2 marks): pulmonary circulation (right ventricle → lungs → left atrium) and systemic circulation (left ventricle → body → right atrium)."],
    ["Describe the human digestive system with a labelled diagram and write the functions of the stomach and small intestine.", "<b>Diagram</b> (2 marks): mouth, oesophagus, stomach, liver, pancreas, small intestine, large intestine, rectum, anus. <b>Stomach</b> (1½ marks): churns food, HCl and pepsin digest proteins. <b>Small intestine</b> (1½ marks): final digestion by bile, pancreatic and intestinal juices; villi absorb the digested food."],
    ["Explain cellular respiration: write the stages (glycolysis, Krebs cycle) and the overall equation. How is it different in muscle cells during heavy work?", "<b>Equation</b> (1 mark): C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy (38 ATP). <b>Glycolysis</b> (1½ marks): in the cytoplasm, glucose → 2 pyruvate with 2 ATP. <b>Krebs cycle</b> (1½ marks): in mitochondria, pyruvate is completely oxidised to CO₂, water and ATP. <b>Muscle</b> (1 mark): with little oxygen, pyruvate becomes lactic acid, causing cramps."]
  ]
});

/* ---------- Life Processes in Living Organisms — Part 2 (control, coordination, excretion, reproduction) ---------- */
const L2 = 'Life Processes in Living Organisms (Part 2)';
add(2, L2, {
  mcq: [
    ["The functional unit of the kidney is:", "nephron", "neuron", "alveolus", "villus", "Each kidney has about a million nephrons that filter blood."],
    ["Which hormone regulates the blood sugar level?", "insulin", "thyroxine", "adrenaline", "growth hormone", "Insulin from the pancreas lowers blood glucose; its deficiency causes diabetes."],
    ["The part of the brain that controls balance and posture is the:", "cerebellum", "cerebrum", "medulla oblongata", "hypothalamus", "The cerebellum co-ordinates muscles and maintains balance."],
    ["The plant hormone responsible for cell elongation and phototropism is:", "auxin", "ethylene", "abscisic acid", "cytokinin", "Auxin accumulates on the shaded side and makes cells there elongate."],
    ["Binary fission is the mode of asexual reproduction in:", "Amoeba", "Hydra", "Yeast", "Potato", "Amoeba divides into two daughter cells."],
    ["The gland known as the 'master gland' is:", "pituitary", "thyroid", "adrenal", "pancreas", "The pituitary controls other endocrine glands."]
  ],
  one: [
    ["Name the structural and functional unit of the nervous system.", ["neuron", "nerve cell"], "The neuron."],
    ["Name the hormone secreted by the thyroid gland.", ["thyroxine", "thyroxin"], "Thyroxine; it needs iodine."],
    ["Which plant hormone promotes fruit ripening?", ["ethylene", "ethene"], "Ethylene."],
    ["Name the disease caused by the deficiency of insulin.", ["diabetes", "diabetes mellitus"], "Diabetes mellitus."],
    ["What is the movement of a plant part towards light called?", ["phototropism"], "Positive phototropism of the shoot."],
    ["What is the male reproductive organ of a flower called?", ["stamen", "the stamen"], "Stamen (anther + filament)."]
  ],
  two: [
    ["Distinguish between the sympathetic and parasympathetic nervous systems (any two points).", "Sympathetic: prepares the body for emergencies (fight or flight), increases heart rate; parasympathetic: works during rest, decreases heart rate and promotes digestion. They act in opposite ways. (1 mark per point)"],
    ["What is a reflex action? Give two examples.", "A rapid, automatic, involuntary response to a stimulus (1 mark). Examples: withdrawal of the hand on touching a hot object, blinking of the eye, sneezing (any two, ½ mark each)."],
    ["Name four plant hormones and one function of each.", "Auxin — cell elongation; gibberellin — stem growth and seed germination; cytokinin — cell division; abscisic acid — closing of stomata, dormancy; ethylene — fruit ripening. (any four, ½ mark each)"],
    ["Write the functions of the human kidneys.", "They filter blood and remove nitrogenous waste (urea) as urine (1 mark); they also regulate water and salt balance and the pH of the blood (1 mark)."],
    ["What is tropism? Give an example of geotropism.", "A directional growth movement of a plant part in response to a stimulus (1 mark). Geotropism: roots grow downwards towards gravity (positive geotropism) (1 mark)."],
    ["Distinguish between sexual and asexual reproduction (any two points).", "Asexual: one parent; offspring are genetically identical; no gametes (e.g. binary fission). Sexual: two parents, gametes fuse; offspring show variation (e.g. humans). (1 mark per valid point)"],
    ["What is meant by budding? Name an organism that reproduces by it.", "In budding a small outgrowth (bud) develops on the parent body, grows and separates as a new individual (1 mark). Examples: Hydra, yeast (1 mark)."]
  ],
  three: [
    ["Draw a neat labelled diagram of a neuron and state the function of its parts.", "Diagram (1 mark): cell body (cyton) with nucleus, dendrites, axon, axon terminals/synapse. Dendrites receive impulses and carry them to the cell body; the axon conducts impulses away; the axon terminal passes the impulse to the next neuron across the synapse (2 marks)."],
    ["Explain the reflex arc with a labelled flow chart.", "Receptor (skin) → sensory (afferent) neuron → spinal cord (relay neuron) → motor (efferent) neuron → effector (muscle) (1½ marks). Example: hand pulled away from a hot object before the brain feels pain, because the spinal cord handles the response directly, which is faster (1½ marks)."],
    ["State the names and functions of any three endocrine glands and their hormones.", "Thyroid — thyroxine (regulates metabolism); pancreas — insulin (lowers blood glucose); adrenal — adrenaline (prepares the body for emergencies); pituitary — growth hormone; testes — testosterone; ovaries — oestrogen. (any three, 1 mark each)"],
    ["Explain the different types of asexual reproduction with one example each (any three).", "Binary fission — Amoeba; budding — Hydra/yeast; fragmentation — Spirogyra; spore formation — Rhizopus/fern; vegetative propagation — potato, rose, Bryophyllum. (1 mark each)"],
    ["Describe the structure of a nephron and how urine is formed.", "A nephron has a Bowman's capsule with glomerulus and a long tubule (1 mark). Blood is filtered in the glomerulus (ultrafiltration), useful substances such as glucose and water are reabsorbed in the tubule (1 mark), and the remaining urea, excess salts and water form urine, which is collected in the ureter (1 mark)."],
    ["Explain the importance of the nervous system and the hormonal control in an animal.", "The nervous system gives a very fast response through nerve impulses and controls voluntary and involuntary actions (1½ marks). Hormones are chemical messengers carried by the blood; they act slowly but over a longer period, controlling growth, metabolism and reproduction (1½ marks)."],
    ["What is pollination? Distinguish between self-pollination and cross-pollination.", "Pollination is the transfer of pollen from the anther to the stigma (1 mark). Self: pollen goes to the stigma of the same flower or plant. Cross: pollen goes to a flower of another plant of the same species, giving more variation (2 marks)."],
    ["Describe the main parts and functions of the human brain.", "Cerebrum — thinking, memory, voluntary control (1 mark). Cerebellum — balance and posture (1 mark). Medulla oblongata — involuntary actions such as heartbeat, breathing and blood pressure (1 mark)."]
  ],
  five: [
    ["Describe the structure of the human male and female reproductive systems and explain fertilisation.", "<b>Male</b> (1½ marks): testes (sperms, testosterone), vas deferens, urethra, penis. <b>Female</b> (1½ marks): ovaries (eggs, oestrogen), fallopian tubes, uterus, vagina. <b>Fertilisation</b> (2 marks): a sperm fuses with the egg in the fallopian tube to form a zygote, which divides and implants in the uterus wall."],
    ["Describe the structure of the human brain with a diagram and explain the functions of its main parts.", "<b>Diagram</b> (2 marks): cerebrum (two hemispheres), cerebellum, medulla oblongata, spinal cord, pituitary and hypothalamus. <b>Functions</b> (3 marks): cerebrum — intelligence, memory, will; cerebellum — balance; medulla — involuntary actions such as breathing; hypothalamus — hunger, thirst and temperature."],
    ["What is excretion? Draw and explain the human excretory system and describe how urine is formed.", "<b>Excretion</b> (1 mark): removal of metabolic wastes. <b>Diagram</b> (2 marks): kidneys, ureters, urinary bladder, urethra. <b>Urine formation</b> (2 marks): filtration of blood in the glomerulus, selective reabsorption in the tubule, and secretion; urine is stored in the bladder and passed out through the urethra."]
  ]
});
})();

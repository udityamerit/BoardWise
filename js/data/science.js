/* Science & Technology – mock paper 1 (Part 1 + Part 2), original questions.
   Layout per part (40 marks, 2 h): Q1A 5x1 MCQ, Q1B 5x1 short, Q2 any 5 of 7 (2m), Q3 any 5 of 8 (3m), Q4 any 1 of 2 (5m).
   NOTE: this layout is an APPROXIMATION from third-party sources; the board's own Science papers could not be fetched. */
(function () {
const { mcq, num, self } = window.mk;
const GR = 'Gravitation', PC = 'Periodic Classification of Elements', CR = 'Chemical Reactions and Equations', EC = 'Effects of Electric Current', HE = 'Heat',
  RL = 'Refraction of Light', LE = 'Lenses', ME = 'Metallurgy', CC = 'Carbon Compounds', SM = 'Space Missions';
const HR = 'Heredity and Evolution', LP = 'Life Processes in Living Organisms', EM = 'Environmental Management', GE = 'Towards Green Energy', AC = 'Animal Classification',
  MB = 'Introduction to Microbiology', CB = 'Cell Biology and Biotechnology', DM = 'Disaster Management', SH = 'Social Health';
const sec = (id, part, title, attempt, instruction, questions) => ({ id, part, title, attempt, instruction, questions });

window.PAPERS.push({
  id: 'science-mock-1', subject: 'science', kind: 'mock', year: null, durationMin: 240,
  title: 'Science & Technology (Part 1 + Part 2) — Mock Test 1',
  desc: 'Physics, Chemistry, Biology and Environment. Two 40-mark parts with "any N" choices (Q1–Q4). Part 1 and Part 2 are separate 2-hour papers, as in the board exam.',
  note: 'Original questions written from the Balbharati chapters. The layout (Q1A 5×1, Q1B 5×1, Q2 any 5 of 7, Q3 any 5 of 8, Q4 any 1 of 2) is <b>approximate</b> — it is taken from third-party sources because the board\'s Science papers could not be fetched. Check it against your school\'s sample paper.',
  sections: [
    sec('p1q1a', 1, 'Part 1 · Q.1 (A) Choose the correct option', 5, 'Write the letter of the correct answer (1 mark each).', [
      mcq('a1', 1, GR, 'The SI unit of the universal gravitational constant G is:', ['N m kg⁻¹', 'N m² kg⁻²', 'N kg m⁻²', 'm s⁻²'], 1, 'From F = Gm₁m₂/r², G = Fr²/(m₁m₂) ⇒ N·m²/kg² = N m² kg⁻².'),
      mcq('a2', 1, GR, 'The value of acceleration due to gravity (g) at the surface of the Earth is approximately:', ['9.8 m/s²', '6.67 m/s²', '98 m/s²', '1.6 m/s²'], 0, 'g ≈ 9.8 m/s² (1.6 m/s² is the Moon).'),
      mcq('a3', 1, PC, 'How many elements are present in the 3<sup>rd</sup> period of the modern periodic table?', ['2', '8', '18', '32'], 1, 'Periods 1, 2, 3 contain 2, 8 and 8 elements respectively.'),
      mcq('a4', 1, CR, 'Which gas is evolved when zinc reacts with dilute hydrochloric acid?', ['Oxygen', 'Carbon dioxide', 'Hydrogen', 'Chlorine'], 2, 'Zn + 2HCl → ZnCl₂ + H₂↑.'),
      mcq('a5', 1, EC, 'A device which converts mechanical energy into electrical energy is:', ['electric motor', 'generator', 'transformer', 'galvanometer'], 1, 'An electric generator (dynamo) works on electromagnetic induction.')
    ]),
    sec('p1q1b', 1, 'Part 1 · Q.1 (B) Answer in one word or one sentence', null, 'All five are compulsory (1 mark each).', [
      self('a6', 1, RL, 'Write the relation between the refractive index n of a medium, the speed of light c in vacuum and the speed v in the medium.', '<b>n = c / v</b>.'),
      num('a7', 1, LE, 'Which type of lens is used to correct myopia (short-sightedness)?', ['concave', 'concave lens', 'diverging lens', 'diverging'], 'A concave (diverging) lens.'),
      num('a8', 1, ME, 'Name the chief ore of aluminium.', ['bauxite'], 'Bauxite (Al₂O₃·2H₂O).'),
      self('a9', 1, CC, 'Write the general formula of the alkane series.', 'CₙH₂ₙ₊₂ (e.g. CH₄, C₂H₆).'),
      num('a10', 1, HE, 'What is the heat required to change 1 kg of a solid into liquid at its melting point called?', ['latent heat of fusion', 'latent heat', 'heat of fusion'], 'It is the latent heat of fusion.')
    ]),
    sec('p1q2', 1, 'Part 1 · Q.2 Solve any five of the following', 5, 'Attempt any five (2 marks each).', [
      num('b1', 2, GR, 'Find the weight (in newton) of a body of mass 10 kg on the Earth. (g = 10 m/s²)', ['100', '100 N'], 'W = mg = 10 × 10 = 100 N.'),
      self('b2', 2, PC, 'Write the electronic configuration of sodium (Z = 11) and state its group and period.', 'Electronic configuration: <b>2, 8, 1</b> (1 mark). Valence electrons = 1 ⇒ <b>Group 1</b>; three shells ⇒ <b>Period 3</b> (1 mark).'),
      self('b3', 2, CR, 'Balance the equation: Fe + H₂O → Fe₃O₄ + H₂', '<b>3Fe + 4H₂O → Fe₃O₄ + 4H₂</b>. (Fe 3 = 3, O 4 = 4, H 8 = 8.) 2 marks for the balanced equation; 1 mark for a partial attempt.'),
      num('b4', 2, EC, 'A current of 2 A flows through a resistor of 5 Ω. Find the potential difference across it (in volts).', ['10', '10 V'], 'V = IR = 2 × 5 = 10 V.'),
      self('b5', 2, SM, 'What is a geostationary satellite? State its time period.', 'A satellite that orbits the Earth in the equatorial plane at a height of about 36,000 km with the same angular speed as the Earth, so it appears fixed above one point (1 mark). Time period = <b>24 hours</b> (1 mark).'),
      self('b6', 2, PC, 'State the Modern Periodic Law.', 'The physical and chemical properties of elements are a <b>periodic function of their atomic numbers</b>. (2 marks)'),
      self('b7', 2, CC, 'Write the IUPAC name and the functional group of CH₃–CH₂–OH.', 'IUPAC name: <b>ethanol</b> (1 mark). Functional group: <b>–OH (alcohol / hydroxyl)</b> (1 mark).')
    ]),
    sec('p1q3', 1, 'Part 1 · Q.3 Solve any five of the following', 5, 'Attempt any five (3 marks each).', [
      self('c1', 3, RL, 'State Snell\'s law. The refractive index of glass with respect to air is 1.5 and the speed of light in air is 3 × 10⁸ m/s. Find the speed of light in glass.', 'Snell\'s law: <b>sin i / sin r = constant</b> (the refractive index) (1 mark).<br>n = c/v ⇒ v = c/n = 3 × 10⁸ / 1.5 = <b>2 × 10⁸ m/s</b> (2 marks).'),
      self('c2', 3, LE, 'An object is placed 20 cm in front of a convex lens of focal length 10 cm. Using the lens formula find the image distance and state the nature of the image.', 'u = −20 cm, f = +10 cm. 1/v − 1/u = 1/f ⇒ 1/v = 1/10 − 1/20 = 1/20 ⇒ <b>v = +20 cm</b> (2 marks).<br>m = v/u = −1: the image is <b>real, inverted and of the same size</b> (1 mark).'),
      self('c3', 3, ME, 'Write any two methods of preventing corrosion of iron and explain one of them.', 'Methods (any two): painting/oiling/greasing, galvanisation, tinning, alloying (stainless steel), electroplating, cathodic protection (1 mark).<br>Explanation e.g. <b>Galvanisation</b>: iron is coated with zinc, which is more reactive; it keeps air and moisture away and corrodes in preference to iron even when scratched (2 marks).'),
      self('c4', 3, CC, 'Define homologous series. Write the molecular formulae of the first three alkanes.', 'A series of organic compounds with the same functional group and general formula, in which successive members differ by a –CH₂– unit (1 mark).<br>Methane <b>CH₄</b>, ethane <b>C₂H₆</b>, propane <b>C₃H₈</b> (2 marks).'),
      num('c5', 3, HE, 'Calculate the heat (in joule) required to raise the temperature of 2 kg of water from 20 °C to 70 °C. (specific heat of water = 4200 J/kg °C)', ['420000', '4.2e5', '420000 J'], 'Q = mcΔT = 2 × 4200 × 50 = <b>4,20,000 J</b>.', 'in joule'),
      self('c6', 3, GR, 'State Kepler\'s third law of planetary motion and write it mathematically.', 'The square of the period of revolution (T) of a planet is directly proportional to the cube of the semi-major axis (r) of its orbit (2 marks): <b>T² ∝ r³</b> (1 mark).'),
      self('c7', 3, CR, 'Distinguish between exothermic and endothermic reactions with one example each.', 'Exothermic: heat is released, e.g. burning of coal / CaO + H₂O → Ca(OH)₂ + heat. Endothermic: heat is absorbed, e.g. decomposition of CaCO₃ on heating / photosynthesis. (1 mark each point, 1 mark examples)'),
      self('c8', 3, EC, 'Two resistors of 4 Ω and 6 Ω are connected in series across a 10 V battery. Find the current and the potential difference across the 6 Ω resistor.', 'R = 4 + 6 = 10 Ω. I = V/R = 10/10 = <b>1 A</b> (2 marks). Voltage across 6 Ω = 1 × 6 = <b>6 V</b> (1 mark).')
    ]),
    sec('p1q4', 1, 'Part 1 · Q.4 Solve any one of the following', 1, 'Attempt any one (5 marks).', [
      self('d1', 5, EC, 'Explain the principle and working of an electric motor with a neat labelled diagram.', '<b>Principle:</b> a current-carrying conductor placed in a magnetic field experiences a force (1 mark).<br><b>Diagram</b> (2 marks): rectangular coil ABCD, permanent magnet N–S, split-ring commutator, brushes, battery.<br><b>Working</b> (2 marks): current flows through the coil; by Fleming\'s left-hand rule the forces on AB and CD are opposite, so the coil rotates. After half a turn the split-ring commutator reverses the current, so the torque keeps the same direction and rotation is continuous. Electrical energy → mechanical energy.'),
      self('d2', 5, ME, 'Describe the main steps in the extraction of a metal from its ore, with an example of the metallurgy of a metal of medium reactivity such as zinc or iron.', '<b>Steps</b> (3 marks): (1) concentration/enrichment of the ore (removal of gangue), (2) extraction of the metal (roasting/calcination then reduction with carbon or CO, or electrolysis for highly reactive metals), (3) refining of the metal.<br><b>Example</b> (2 marks): ZnS is roasted: 2ZnS + 3O₂ → 2ZnO + 2SO₂; then ZnO is reduced with coke: ZnO + C → Zn + CO. Zinc is purified by distillation / electrolytic refining.')
    ]),

    sec('p2q1a', 2, 'Part 2 · Q.1 (A) Choose the correct option', 5, 'Write the letter of the correct answer (1 mark each).', [
      mcq('e1', 1, HR, 'The "Father of Genetics" is:', ['Charles Darwin', 'Gregor Mendel', 'Lamarck', 'Louis Pasteur'], 1, 'Gregor Johann Mendel experimented on pea plants.'),
      mcq('e2', 1, HR, 'The phenotypic ratio in the F₂ generation of a monohybrid cross is:', ['1 : 1', '3 : 1', '9 : 3 : 3 : 1', '1 : 2 : 1'], 1, '3 (dominant) : 1 (recessive). (1 : 2 : 1 is the genotypic ratio.)'),
      mcq('e3', 1, LP, 'Photosynthesis takes place in:', ['mitochondria', 'chloroplasts', 'ribosomes', 'nucleus'], 1, 'Chloroplasts contain the pigment chlorophyll.'),
      mcq('e4', 1, LP, 'Which organ of the human body filters blood to form urine?', ['Liver', 'Kidney', 'Lung', 'Pancreas'], 1, 'The nephrons of the kidney filter blood.'),
      mcq('e5', 1, EM, 'The ozone layer protects living things from:', ['infrared radiation', 'ultraviolet radiation', 'visible light', 'radio waves'], 1, 'Ozone (O₃) absorbs harmful UV radiation from the Sun.')
    ]),
    sec('p2q1b', 2, 'Part 2 · Q.1 (B) Answer in one word or one sentence', null, 'All five are compulsory (1 mark each).', [
      num('e6', 1, GE, 'Name one non-renewable source of energy.', ['coal', 'petroleum', 'natural gas', 'crude oil', 'diesel', 'kerosene', 'lpg'], 'Coal, petroleum or natural gas (fossil fuels).'),
      num('e7', 1, AC, 'Name a flying mammal.', ['bat', 'bats'], 'Bat — it has mammary glands and gives birth to young ones.'),
      num('e8', 1, MB, 'Polio is caused by which type of microorganism?', ['virus', 'a virus', 'poliovirus'], 'Poliovirus — a virus.'),
      num('e9', 1, CB, 'Which cell organelle is called the "powerhouse of the cell"?', ['mitochondria', 'mitochondrion'], 'Mitochondria release energy (ATP) through cellular respiration.'),
      num('e10', 1, DM, 'Which instrument records the vibrations of an earthquake?', ['seismograph', 'seismometer'], 'A seismograph.')
    ]),
    sec('p2q2', 2, 'Part 2 · Q.2 Solve any five of the following', 5, 'Attempt any five (2 marks each).', [
      self('f1', 2, HR, 'Distinguish between dominant and recessive traits (any two points).', '<b>Dominant:</b> expresses itself in both homozygous and heterozygous condition; written as a capital letter (T).<br><b>Recessive:</b> expresses only in homozygous condition and is masked in a hybrid; written as a small letter (t). (1 mark per valid point.)'),
      self('f2', 2, LP, 'Write the chemical equation of photosynthesis and name the pigment involved.', '6CO₂ + 6H₂O —(sunlight, chlorophyll)→ C₆H₁₂O₆ + 6O₂ (1½ mark). Pigment: <b>chlorophyll</b> (½ mark).'),
      self('f3', 2, EM, 'What is a biodiversity hotspot? Give one example from India.', 'A region with a very large number of endemic species that is under serious threat from human activities (1 mark). Example: <b>Western Ghats</b> (or Himalaya, Indo-Burma) (1 mark).'),
      self('f4', 2, CB, 'What is tissue culture? State one use.', 'Growing plant (or animal) cells/tissues in a sterile nutrient medium under controlled laboratory conditions (1 mark). Use: rapid production of disease-free plants / micropropagation (1 mark).'),
      self('f5', 2, DM, 'Distinguish between a natural and a man-made disaster, with one example of each.', 'Natural: caused by natural forces, e.g. earthquake, flood, cyclone. Man-made: caused by human action or negligence, e.g. industrial gas leak, fire. (1 mark each, with example)'),
      self('f6', 2, AC, 'Distinguish between vertebrates and invertebrates (any two points).', 'Vertebrates have a backbone/vertebral column and an internal skeleton (e.g. fish, birds); invertebrates have no backbone (e.g. insects, earthworm). Vertebrates generally have a well-developed brain in a skull. (1 mark per valid point)'),
      self('f7', 2, SH, 'What is addiction? State two harmful effects of tobacco.', 'Addiction is the physical/psychological dependence on a substance such as tobacco, alcohol or drugs (1 mark). Effects (any two, ½ mark each): cancer of mouth and lungs, heart disease, breathing problems, weakened immunity.')
    ]),
    sec('p2q3', 2, 'Part 2 · Q.3 Solve any five of the following', 5, 'Attempt any five (3 marks each).', [
      self('g1', 3, HR, 'A pure tall pea plant (TT) is crossed with a pure dwarf plant (tt). Using a Punnett square show the F₁ and F₂ generations and write the phenotypic ratio of F₂.', 'F₁: TT × tt → all <b>Tt</b> (tall) (1 mark).<br>F₂: Tt × Tt → gametes T, t and T, t; Punnett square gives TT, Tt, Tt, tt (1 mark).<br>Phenotypic ratio = <b>3 tall : 1 dwarf</b>; genotypic ratio 1 : 2 : 1 (1 mark).'),
      self('g2', 3, AC, 'Write any three distinguishing characters of class Aves (birds) with two examples.', 'Body covered with feathers; forelimbs modified into wings; beak without teeth; warm-blooded; lay hard-shelled eggs; hollow bones (any three, 2 marks). Examples: crow, pigeon, sparrow, peacock (1 mark).'),
      self('g3', 3, MB, 'How is curd formed from milk? Name the bacterium involved.', 'A little curd is added to warm milk. The bacterium <b>Lactobacillus</b> multiplies and converts lactose into lactic acid, which coagulates the milk protein casein so that the milk sets into curd. (name 1, process 2)'),
      self('g4', 3, GE, 'Explain how biogas is produced and state two advantages of biogas.', 'Cattle dung and plant waste mixed with water is fed to a digester; in the absence of oxygen anaerobic bacteria decompose it to give methane-rich gas (2 marks). Advantages (any two, 1 mark): clean smokeless fuel, slurry is a good manure, reduces waste, renewable.'),
      self('g5', 3, LP, 'Name the three types of blood vessels in the human body and state one function of each.', '<b>Arteries</b> – carry oxygenated blood away from the heart (except the pulmonary artery). <b>Veins</b> – carry deoxygenated blood to the heart (except the pulmonary vein). <b>Capillaries</b> – thin-walled vessels where exchange of materials between blood and tissues takes place. (1 mark each)'),
      self('g6', 3, HR, 'Explain Darwin\'s theory of natural selection in brief.', 'Organisms produce more offspring than can survive (1); there are variations among them and a struggle for existence (1); individuals with favourable variations survive and pass them on, so the species gradually changes — "survival of the fittest" (1).'),
      self('g7', 3, LP, 'Describe the path of air from the nose to the alveoli in humans.', 'Nostrils → nasal cavity → pharynx → larynx → trachea → two bronchi → bronchioles → alveoli (air sacs) where gas exchange takes place (any correct sequence of 6 parts, ½ mark each).'),
      self('g8', 3, EM, 'What is the greenhouse effect? Name two greenhouse gases and one effect of global warming.', 'Gases in the atmosphere trap the heat radiated by the Earth and keep the planet warm (1 mark). Gases: carbon dioxide, methane, nitrous oxide (any two, 1 mark). Effect: rise in sea level / melting of glaciers / climate change (1 mark).')
    ]),
    sec('p2q4', 2, 'Part 2 · Q.4 Solve any one of the following', 1, 'Attempt any one (5 marks).', [
      self('h1', 5, CB, 'Describe the structure of a plant cell with a neat labelled diagram. Write any two differences between a plant cell and an animal cell.', '<b>Diagram</b> (2 marks): cell wall, cell membrane, cytoplasm, nucleus, large central vacuole, chloroplasts, mitochondria, Golgi body, ER, ribosomes.<br><b>Structure</b> (1 mark): rigid cellulose cell wall outside the membrane; nucleus with chromosomes controls the cell; chloroplasts perform photosynthesis.<br><b>Differences</b> (2 marks): plant cell has a cell wall, animal cell does not; plant cell has chloroplasts and a large vacuole, animal cell has none or small vacuoles; animal cell has centrioles.'),
      self('h2', 5, LP, 'Describe the structure of the human heart with a neat labelled diagram and explain double circulation.', '<b>Diagram</b> (2 marks): four chambers — right and left atria, right and left ventricles; vena cava, pulmonary artery, pulmonary veins, aorta, valves.<br><b>Structure</b> (1 mark): muscular organ; septum separates oxygenated and deoxygenated blood.<br><b>Double circulation</b> (2 marks): blood passes through the heart twice in one cycle — <i>pulmonary circulation</i> (right ventricle → lungs → left atrium) and <i>systemic circulation</i> (left ventricle → body → right atrium).')
    ])
  ]
});
})();

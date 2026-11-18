/* Science Part 1 question bank — Chemistry (Periodic Classification, Chemical Reactions, Metallurgy, Carbon Compounds). Original questions. */
(function () {
const { add, N } = window.SCI;
const sub = n => String(n).replace(/\d/g, d => '₀₁₂₃₄₅₆₇₈₉'[d]);

/* ---------- Periodic Classification of Elements (element questions are generated from atomic number) ---------- */
const PC = 'Periodic Classification of Elements';
const EL = { 3: ['lithium', 'Li'], 4: ['beryllium', 'Be'], 5: ['boron', 'B'], 6: ['carbon', 'C'], 7: ['nitrogen', 'N'], 8: ['oxygen', 'O'], 9: ['fluorine', 'F'], 10: ['neon', 'Ne'], 11: ['sodium', 'Na'], 12: ['magnesium', 'Mg'], 13: ['aluminium', 'Al'], 14: ['silicon', 'Si'], 15: ['phosphorus', 'P'], 16: ['sulphur', 'S'], 17: ['chlorine', 'Cl'], 18: ['argon', 'Ar'], 19: ['potassium', 'K'], 20: ['calcium', 'Ca'] };
const info = z => { let r = z, sh = []; for (const cap of [2, 8, 8, 2]) { const t = Math.min(r, cap); if (t > 0) sh.push(t); r -= t; } const v = sh[sh.length - 1]; const grp = v <= 2 ? v : 10 + v; return { cfg: sh.join(', '), per: sh.length, v, grp, val: v <= 4 ? v : 8 - v }; };
const typeOf = z => [3, 4, 11, 12, 13, 19, 20].includes(z) ? 'metal' : z === 5 || z === 14 ? 'metalloid' : 'non-metal';
const gen = { mcq: [], one: [], two: [], three: [] };
[3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 19, 20].forEach(z => {
  const [nm, sy] = EL[z], f = info(z);
  gen.two.push([`Write the electronic configuration of ${nm} (Z = ${z}). State its group and period.`, `Electronic configuration of ${nm}: <b>${f.cfg}</b> (1 mark). Valence electrons = ${f.v}, so it is in <b>Group ${f.grp}</b> and, with ${f.per} shell${f.per > 1 ? 's' : ''}, in <b>Period ${f.per}</b> (1 mark).`]);
});
[11, 12, 13, 14, 15, 16, 19, 20].forEach(z => {
  const [nm, sy] = EL[z], f = info(z);
  const cl = f.val === 0 ? '' : `${sy}Cl${f.val > 1 ? sub(f.val) : ''}`;
  gen.three.push([`The atomic number of ${nm} is ${z}. Write its electronic configuration, group, period and valency, and the formula of its chloride.`, `Configuration: <b>${f.cfg}</b> (1 mark). Group <b>${f.grp}</b>, period <b>${f.per}</b> (1 mark). Valency = <b>${f.val}</b>, so the chloride is <b>${cl}</b> (1 mark). Nature: ${typeOf(z)}.`]);
});
[3, 5, 7, 8, 9, 11, 13, 15, 16, 17, 19].forEach(z => { const [nm] = EL[z], f = info(z); gen.one.push([`How many valence electrons are present in an atom of ${nm} (Z = ${z})?`, [String(f.v)], `Configuration ${f.cfg}; valence electrons = <b>${f.v}</b>.`]); });
[4, 6, 12, 14, 17, 20].forEach(z => { const [nm] = EL[z], f = info(z); gen.one.push([`In which period of the periodic table is ${nm} (Z = ${z}) placed?`, [String(f.per), 'period ' + f.per], `Configuration ${f.cfg}: ${f.per} shells ⇒ period <b>${f.per}</b>.`]); });
[3, 6, 7, 9, 12, 15, 19].forEach(z => { const [nm] = EL[z], f = info(z); const ws = [f.grp + 1, f.grp - 1, f.grp + 2, f.grp + 3, f.grp - 2].filter(x => x > 0 && x !== f.grp); gen.mcq.push([`The element ${nm} has atomic number ${z}. It belongs to group:`, String(f.grp), String(ws[0]), String(ws[1]), String(ws[2]), `Configuration ${f.cfg} ⇒ ${f.v} valence electrons ⇒ group ${f.grp}.`]); });
add(1, PC, {
  mcq: [
    ["Which of the following elements has the largest atomic size?", "Na", "Mg", "Al", "Cl", "Atomic size decreases across a period from left to right, so the first element (Na) is the largest."],
    ["Mendeleev arranged the elements in the increasing order of their:", "atomic masses", "atomic numbers", "number of neutrons", "valencies", "Mendeleev's periodic law was based on atomic mass; the modern periodic law uses atomic number."],
    ["The elements of group 18 are called:", "noble gases", "alkali metals", "halogens", "alkaline earth metals", "They have completely filled outermost shells and are chemically unreactive."],
    ["Going down a group in the periodic table, the metallic character:", "increases", "decreases", "remains the same", "first increases then decreases", "Atomic size increases down the group, so it is easier to lose electrons."]
  ].concat(gen.mcq),
  one: [
    ["Who proposed the periodic law based on atomic mass?", ["mendeleev", "dmitri mendeleev", "mendeleeff"], "Dmitri Mendeleev (1869)."],
    ["Name the family of elements present in Group 17.", ["halogens", "halogen"], "Group 17 elements are the halogens."],
    ["How many groups are there in the modern periodic table?", ["18"], "There are 18 groups and 7 periods."],
    ["How many periods are there in the modern periodic table?", ["7"], "There are 7 periods."]
  ].concat(gen.one),
  two: [
    ["State the Modern Periodic Law.", "The physical and chemical properties of elements are a periodic function of their <b>atomic numbers</b>. (2 marks)"],
    ["State two limitations of Mendeleev's periodic table.", "(1) The position of hydrogen could not be fixed. (2) Isotopes had no place of their own. (3) Some elements were placed in order against increasing atomic mass (e.g. Co and Ni). (any two, 1 mark each)"],
    ["Explain the trend of atomic radius across a period and down a group.", "Across a period the atomic radius <b>decreases</b> because the nuclear charge increases while electrons are added to the same shell (1 mark). Down a group it <b>increases</b> because new shells are added (1 mark)."],
    ["Name the four blocks of the periodic table and the groups in each.", "s-block: Groups 1, 2; p-block: Groups 13–18; d-block: Groups 3–12 (transition elements); f-block: lanthanides and actinides. (½ mark each)"],
    ["Write two properties of alkali metals.", "They are soft, silvery, reactive metals which have one valence electron, form +1 ions, react vigorously with water giving hydrogen and an alkali, and are stored in kerosene. (any two, 1 mark each)"],
    ["Why are noble gases chemically inert?", "Their outermost shell is completely filled (an octet; duplet in helium) (1 mark), which is a stable configuration, so they neither gain, lose nor share electrons (1 mark)."]
  ].concat(gen.two),
  three: [
    ["State three merits of Mendeleev's periodic table.", "(1) It classified the 63 known elements into groups and periods on the basis of properties. (2) He left gaps for undiscovered elements and predicted their properties (eka-aluminium = gallium, eka-silicon = germanium). (3) It corrected the atomic masses of some elements. (1 mark each)"],
    ["Write the trends in valency and metallic character along a period and down a group.", "Valency: increases from 1 to 4 and then decreases to 0 across a period; remains the same down a group (1½ marks). Metallic character: decreases across a period and increases down a group (1½ marks)."],
    ["Explain how the position of an element in the modern periodic table is related to its electronic configuration.", "The number of shells gives the period number (1 mark). For groups 1 and 2 the group number equals the number of valence electrons; for groups 13–18 the group number is 10 + the number of valence electrons (1 mark). Example: Cl, 2, 8, 7 → period 3, group 17 (1 mark)."],
    ["Distinguish between metals and non-metals placed in the periodic table (any three points).", "Metals are on the left and centre, non-metals on the right. Metals lose electrons to form cations and are good conductors; non-metals gain electrons to form anions and are poor conductors. Metals form basic oxides; non-metals form acidic oxides. (1 mark each)"],
    ["The elements Na (Z = 11), Mg (12) and Al (13) are in the same period. Compare their atomic sizes and metallic character.", "All have three shells, but the nuclear charge increases from Na to Al (1 mark). The pull on the outer electrons increases, so atomic size decreases: Na > Mg > Al (1 mark). Ease of losing electrons falls, so metallic character also decreases: Na > Mg > Al (1 mark)."]
  ].concat(gen.three),
  five: [
    ["Explain how the modern periodic table is organised. Describe the main characteristics of groups and periods.", "<b>Organisation</b> (2 marks): elements arranged in increasing atomic number in 18 vertical columns (groups) and 7 horizontal rows (periods). <b>Groups</b> (1½ marks): elements have the same number of valence electrons, similar chemical properties; valency same; atomic size increases down; metallic character increases down. <b>Periods</b> (1½ marks): same number of shells; atomic number increases left to right; atomic size and metallic character decrease; valency first increases then decreases."],
    ["Compare Mendeleev's periodic law with the Modern Periodic Law. List three anomalies of Mendeleev's table that were resolved by the modern table.", "<b>Mendeleev</b> (1 mark): properties are a periodic function of atomic mass. <b>Modern</b> (1 mark): properties are a periodic function of atomic number. <b>Anomalies resolved</b> (3 marks): position of hydrogen (now placed in Group 1 for configuration); isotopes now automatically occupy one position as they have the same atomic number; inverted pairs such as Co–Ni and Te–I are placed correctly in order of atomic number."]
  ]
});

/* ---------- Chemical Reactions and Equations ---------- */
const CR = 'Chemical Reactions and Equations';
const EQ = [
  ['Fe + H₂O → Fe₃O₄ + H₂', '3Fe + 4H₂O → Fe₃O₄ + 4H₂'], ['Al + O₂ → Al₂O₃', '4Al + 3O₂ → 2Al₂O₃'], ['H₂ + O₂ → H₂O', '2H₂ + O₂ → 2H₂O'],
  ['N₂ + H₂ → NH₃', 'N₂ + 3H₂ → 2NH₃'], ['KClO₃ → KCl + O₂', '2KClO₃ → 2KCl + 3O₂'], ['Mg + O₂ → MgO', '2Mg + O₂ → 2MgO'],
  ['Na + H₂O → NaOH + H₂', '2Na + 2H₂O → 2NaOH + H₂'], ['Zn + HCl → ZnCl₂ + H₂', 'Zn + 2HCl → ZnCl₂ + H₂'], ['CH₄ + O₂ → CO₂ + H₂O', 'CH₄ + 2O₂ → CO₂ + 2H₂O'],
  ['Pb(NO₃)₂ → PbO + NO₂ + O₂', '2Pb(NO₃)₂ → 2PbO + 4NO₂ + O₂'], ['NaOH + H₂SO₄ → Na₂SO₄ + H₂O', '2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O'], ['C₂H₅OH + O₂ → CO₂ + H₂O', 'C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O'],
  ['Fe₂O₃ + CO → Fe + CO₂', 'Fe₂O₃ + 3CO → 2Fe + 3CO₂'], ['AgNO₃ + NaCl → AgCl + NaNO₃', 'AgNO₃ + NaCl → AgCl↓ + NaNO₃'], ['BaCl₂ + Na₂SO₄ → BaSO₄ + NaCl', 'BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl']
];
const eqTwo = EQ.slice(0, 9).map(([a, b]) => [`Balance the following chemical equation: ${a}`, `<b>${b}</b> — 2 marks for the correct balanced equation, 1 mark for a partial attempt.`]);
const TY = ['thermal decomposition', 'neutralisation (a double displacement reaction)', 'combustion (an oxidation reaction)', 'redox (CO is oxidised, Fe₂O₃ is reduced)', 'double displacement (precipitation)', 'double displacement (precipitation)'];
const eqThree = EQ.slice(9).map(([a, b], i) => [`Balance the equation ${a} and state the type of reaction.`, `Balanced: <b>${b}</b> (2 marks). Type of reaction: <b>${TY[i]}</b> (1 mark).`]);
add(1, CR, {
  mcq: [
    ["The reaction CaO + H₂O → Ca(OH)₂ is an example of a:", "combination reaction", "decomposition reaction", "displacement reaction", "double displacement reaction", "Two substances combine to form a single product."],
    ["A reaction in which heat is released is called:", "exothermic", "endothermic", "photolysis", "electrolysis", "Examples: burning of fuels, respiration."],
    ["When a piece of zinc is dropped in a copper sulphate solution, the blue colour fades because:", "zinc displaces copper from the solution", "copper displaces zinc", "no reaction occurs", "zinc oxide is formed", "Zn + CuSO₄ → ZnSO₄ + Cu — a displacement reaction."],
    ["Rusting of iron is an example of:", "oxidation", "reduction", "neutralisation", "decomposition by heat", "Iron reacts with oxygen and moisture to form hydrated iron(III) oxide (Fe₂O₃·xH₂O)."],
    ["In the reaction 2Mg + O₂ → 2MgO, the substance that is oxidised is:", "magnesium", "oxygen", "magnesium oxide", "none of these", "Mg gains oxygen, so it is oxidised."]
  ],
  one: [
    ["Name the type of reaction: CaCO₃ → CaO + CO₂.", ["decomposition", "thermal decomposition", "decomposition reaction"], "A single compound breaks into simpler substances on heating."],
    ["What is the chemical formula of rust?", null, "Fe₂O₃·xH₂O (hydrated iron(III) oxide)."],
    ["What name is given to a reaction in which an acid and a base react to give salt and water?", ["neutralisation", "neutralization", "neutralisation reaction"], "Neutralisation, e.g. NaOH + HCl → NaCl + H₂O."],
    ["Which gas is released when a metal reacts with a dilute acid?", ["hydrogen", "h2"], "Metal + dilute acid → salt + hydrogen."],
    ["What colour is the precipitate formed when silver nitrate reacts with sodium chloride?", ["white", "white precipitate"], "AgCl is a white precipitate."]
  ],
  two: [
    ["Distinguish between exothermic and endothermic reactions with one example of each.", "<b>Exothermic:</b> heat is released, e.g. burning of coal / respiration. <b>Endothermic:</b> heat is absorbed, e.g. decomposition of CaCO₃ / photosynthesis. (1 mark each)"],
    ["What is corrosion? State two ways to prevent it.", "Corrosion is the slow eating away of metals by air, moisture or chemicals, e.g. rusting of iron (1 mark). Prevention: painting, galvanisation, greasing, alloying, electroplating (any two, ½ mark each)."],
    ["What is meant by rancidity? How can it be prevented?", "Rancidity is the spoiling of fats and oils by oxidation, giving an unpleasant smell and taste (1 mark). Prevention: adding antioxidants, storing in airtight containers, refrigeration, flushing the packet with nitrogen (1 mark)."],
    ["Give one example each of a combination reaction and a decomposition reaction.", "Combination: 2Mg + O₂ → 2MgO (1 mark). Decomposition: CaCO₃ → CaO + CO₂ (1 mark)."],
    ["Define oxidation and reduction in terms of oxygen and hydrogen.", "Oxidation: gain of oxygen or loss of hydrogen (1 mark). Reduction: loss of oxygen or gain of hydrogen (1 mark)."]
  ].concat(eqTwo),
  three: [
    ["Write the three types of displacement/double displacement reactions with an example of a double displacement reaction.", "A displacement reaction: a more reactive element displaces a less reactive one from its compound, e.g. Fe + CuSO₄ → FeSO₄ + Cu (1 mark). A double displacement reaction: ions of two compounds exchange places, e.g. Na₂SO₄ + BaCl₂ → BaSO₄↓ + 2NaCl (2 marks)."],
    ["Explain, with an example each, thermal decomposition, electrolytic decomposition and photolytic decomposition.", "Thermal: CaCO₃ → CaO + CO₂ on heating. Electrolytic: 2H₂O → 2H₂ + O₂ on passing an electric current. Photolytic: 2AgBr → 2Ag + Br₂ in sunlight. (1 mark each)"],
    ["Explain the terms 'precipitate' and 'redox reaction' with one example.", "A precipitate is an insoluble solid formed in a reaction in solution, e.g. BaSO₄ (1 mark). A redox reaction is one in which oxidation and reduction occur together, e.g. CuO + H₂ → Cu + H₂O: CuO is reduced, H₂ is oxidised (2 marks)."],
    ["Describe an activity to show that a more reactive metal displaces a less reactive metal from its salt solution.", "Place an iron nail in copper sulphate solution (1 mark). After some time the nail becomes covered with a reddish-brown deposit of copper and the blue colour of the solution fades to green (1 mark). Fe + CuSO₄ → FeSO₄ + Cu shows iron is more reactive than copper (1 mark)."],
    ["Why is a chemical equation balanced? Write the steps for balancing the equation H₂ + O₂ → H₂O.", "By the law of conservation of mass, the numbers of atoms of each element must be the same on both sides (1 mark). Count atoms: O is 2 on the left and 1 on the right → write 2 before H₂O; then H is 4 on the right → write 2 before H₂ (1 mark). Balanced: <b>2H₂ + O₂ → 2H₂O</b> (1 mark)."],
    ["State three observations that indicate a chemical reaction has taken place, with an example of each.", "Change of colour (iron nail in CuSO₄), evolution of a gas (zinc + HCl), formation of a precipitate (AgNO₃ + NaCl), change in temperature (CaO + H₂O) or change of state. (any three, 1 mark each)"]
  ].concat(eqThree),
  five: [
    ["Define the following with one example each: (i) combination reaction (ii) decomposition reaction (iii) displacement reaction (iv) double displacement reaction (v) neutralisation reaction.", "(i) Two or more substances combine to form a single product: CaO + H₂O → Ca(OH)₂. (ii) One compound breaks into simpler substances: 2H₂O₂ → 2H₂O + O₂. (iii) A more reactive element displaces a less reactive one: Zn + CuSO₄ → ZnSO₄ + Cu. (iv) Exchange of ions between two compounds: AgNO₃ + NaCl → AgCl + NaNO₃. (v) Acid + base → salt + water: HCl + NaOH → NaCl + H₂O. (1 mark each: definition and example)"],
    ["Explain corrosion of iron. Write the conditions for it, the chemical formula of rust and any three methods of preventing it.", "<b>Corrosion</b> (1 mark): the gradual destruction of a metal by the action of air and moisture. <b>Conditions</b> (1 mark): presence of both oxygen (air) and water. <b>Rust</b> (1 mark): Fe₂O₃·xH₂O (hydrated iron(III) oxide). <b>Prevention</b> (2 marks): painting/oiling; galvanisation (zinc coating); tinning; alloying (stainless steel); electroplating; cathodic protection."]
  ]
});

/* ---------- Metallurgy ---------- */
const ME = 'Metallurgy';
add(1, ME, {
  mcq: [
    ["Which of the following metals is obtained by electrolytic reduction of its molten ore?", "sodium", "iron", "copper", "zinc", "Highly reactive metals such as Na, K, Ca, Al are obtained by electrolysis of their molten salts."],
    ["An alloy of copper and zinc is called:", "brass", "bronze", "solder", "steel", "Brass = Cu + Zn; bronze = Cu + Sn."],
    ["Which of the following is a non-metal that is a good conductor of electricity?", "graphite", "sulphur", "phosphorus", "iodine", "Graphite conducts electricity because of free electrons."],
    ["The process of heating the ore strongly in a limited supply of air is called:", "calcination", "roasting", "smelting", "refining", "Calcination is used for carbonate ores; roasting is done in excess air for sulphide ores."],
    ["Which metal is liquid at room temperature?", "mercury", "sodium", "iron", "zinc", "Mercury (Hg) is the only metal liquid at room temperature (gallium and caesium melt just above)."]
  ],
  one: [
    ["Name the chief ore of aluminium.", ["bauxite"], "Bauxite (Al₂O₃·2H₂O)."],
    ["Name the process used to obtain aluminium from alumina.", ["electrolysis", "electrolytic reduction", "electrolytic reduction of alumina", "hall-heroult process"], "Electrolytic reduction (Hall–Héroult) of molten alumina."],
    ["Name an alloy of iron used to make cutlery.", ["stainless steel", "steel"], "Stainless steel contains Fe, Cr and Ni."],
    ["Which metal is known as quick silver?", ["mercury"], "Mercury."],
    ["What is the name for unwanted material (sand, soil) present in an ore?", ["gangue", "matrix"], "Gangue (matrix)."]
  ],
  two: [
    ["What is an alloy? Give two examples.", "An alloy is a homogeneous mixture of two or more metals, or of a metal and a non-metal (1 mark). Examples: brass (Cu + Zn), bronze (Cu + Sn), steel (Fe + C) (1 mark)."],
    ["Distinguish between roasting and calcination.", "<b>Roasting:</b> sulphide ore heated strongly in excess air, converting it to oxide (2ZnS + 3O₂ → 2ZnO + 2SO₂). <b>Calcination:</b> carbonate ore heated strongly in limited or no air, giving oxide (ZnCO₃ → ZnO + CO₂). (1 mark each)"],
    ["What are minerals and ores? How are they related?", "Minerals are naturally occurring compounds of metals found in the Earth's crust (1 mark). An ore is a mineral from which the metal can be extracted profitably (1 mark)."],
    ["Write any two physical properties of metals.", "Lustre, malleability, ductility, good conductivity of heat and electricity, high melting point, sonorousness, hardness (any two, 1 mark each)."],
    ["Why are aluminium and copper used for making electric wires and cooking vessels?", "Both are good conductors of electricity and heat (1 mark) and are ductile and do not corrode easily (1 mark)."],
    ["Write the reaction of a metal with dilute acid and with water, with the example of sodium.", "Metal + dilute acid → salt + H₂, e.g. 2Na + 2HCl → 2NaCl + H₂ (1 mark). Sodium reacts vigorously with cold water: 2Na + 2H₂O → 2NaOH + H₂ (1 mark)."]
  ],
  three: [
    ["Write the three main steps in the extraction of a metal from its ore.", "(1) Concentration of the ore — removing gangue by hand picking, washing, magnetic separation or froth flotation (1 mark). (2) Extraction — conversion into oxide by roasting/calcination followed by reduction (with carbon, CO or electrolysis) (1 mark). (3) Refining — purifying the crude metal, e.g. electrolytic refining of copper (1 mark)."],
    ["Explain the extraction of iron from haematite in a blast furnace in brief.", "The charge of haematite (Fe₂O₃), coke and limestone is added at the top and hot air blown at the bottom (1 mark). Coke burns to give CO; CO reduces the ore: Fe₂O₃ + 3CO → 2Fe + 3CO₂ (1 mark). Limestone gives CaO, which combines with silica gangue to give slag: CaO + SiO₂ → CaSiO₃; molten iron collects at the bottom (1 mark)."],
    ["How is copper refined electrolytically? Give the anode, cathode and electrolyte.", "Anode: impure copper; cathode: pure copper strip; electrolyte: acidified CuSO₄ solution (1½ marks). On passing current, copper dissolves from the anode and an equal quantity of pure copper deposits on the cathode, while impurities settle below as anode mud (1½ marks)."],
    ["Explain the activity series and how it is useful in deciding the method of extraction.", "The activity series arranges metals in decreasing order of reactivity: K, Na, Ca, Mg, Al, Zn, Fe, Pb, (H), Cu, Hg, Ag, Au (1 mark). Highly reactive metals (K–Al) are extracted by electrolysis of the molten ore; metals of medium reactivity (Zn–Pb) by reduction of their oxides with carbon; and the least reactive (Hg, Ag) are obtained by heating the ore or sulphide (2 marks)."],
    ["Explain galvanisation and write two advantages of alloying.", "Galvanisation: coating iron or steel with a layer of zinc to protect it from rusting (1 mark). Alloying improves hardness and strength, lowers the melting point, resists corrosion and can improve the appearance (any two, 1 mark each)."],
    ["Compare ionic and covalent compounds on the basis of melting point, electrical conductivity and solubility.", "Ionic compounds have high melting points, conduct electricity in the molten state or in solution, and are mostly soluble in water. Covalent compounds have low melting points, do not conduct electricity and are generally soluble in organic solvents. (1 mark each)"]
  ],
  five: [
    ["Describe the metallurgy of a metal of medium reactivity (zinc) from its sulphide ore. Write the equations.", "<b>Concentration</b> (1 mark): froth flotation of zinc blende (ZnS). <b>Roasting</b> (1½ marks): 2ZnS + 3O₂ → 2ZnO + 2SO₂. <b>Reduction</b> (1½ marks): ZnO + C → Zn + CO. <b>Refining</b> (1 mark): electrolytic refining or distillation."],
    ["Write the physical properties of metals and non-metals in a table of five points and explain why metals are good conductors.", "<b>Table</b> (4 marks): lustre — metals shiny, non-metals dull; malleability/ductility — metals malleable and ductile, non-metals brittle; conductivity — metals good, non-metals poor (graphite exception); density — metals dense; non-metals less; state — metals solid (except Hg), non-metals solid, liquid or gas. <b>Reason</b> (1 mark): metals have free-moving valence electrons that carry charge and heat."]
  ]
});

/* ---------- Carbon Compounds (alkane, alkene, alkyne and alcohol questions are generated) ---------- */
const CC = 'Carbon Compounds';
const ALK = ['methane', 'ethane', 'propane', 'butane', 'pentane', 'hexane', 'heptane', 'octane', 'nonane', 'decane'];
const frm = n => n === 1 ? 'CH₄' : `C${n > 1 ? sub(n) : ''}H${sub(2 * n + 2)}`;
const cond = n => { if (n === 1) return 'CH₄'; let s = 'CH₃' + '–CH₂'.repeat(n - 2) + '–CH₃'; return s; };
const gc = { mcq: [], one: [], two: [], three: [] };
[2, 3, 4, 5, 6, 8].forEach(n => gc.two.push([`Write the molecular formula and condensed structural formula of ${ALK[n - 1]}.`, `Molecular formula: <b>${frm(n)}</b> (CₙH₂ₙ₊₂ with n = ${n}) (1 mark). Condensed structure: <b>${cond(n)}</b> (1 mark).`]));
[3, 4, 5, 6, 7, 10].forEach(n => gc.one.push([`How many hydrogen atoms are present in one molecule of ${ALK[n - 1]}?`, [String(2 * n + 2)], `${ALK[n - 1]} is C${n}H${2 * n + 2} (CₙH₂ₙ₊₂), so <b>${2 * n + 2}</b> hydrogen atoms.`]));
[3, 5, 7].forEach(n => gc.mcq.push([`The molecular formula of ${ALK[n - 1]} is:`, frm(n), frm(n + 1), frm(n - 1), `C${sub(n)}H${sub(2 * n)}`, `Alkanes follow CₙH₂ₙ₊₂; for n = ${n} the formula is ${frm(n)}.`]));
[2, 3, 4, 5].forEach(n => gc.three.push([`Write the molecular formulae of the alkane, alkene and alkyne containing ${n} carbon atoms and state the type of bond between the carbon atoms in each.`, `Alkane ${ALK[n - 1]}: <b>C${sub(n)}H${sub(2 * n + 2)}</b> — all single bonds (1 mark). Alkene ${ALK[n - 1].replace('ane', 'ene')}: <b>C${sub(n)}H${sub(2 * n)}</b> — one C=C double bond (1 mark). Alkyne ${ALK[n - 1].replace('ane', 'yne')}: <b>C${sub(n)}H${sub(2 * n - 2)}</b> — one C≡C triple bond (1 mark).`]));
add(1, CC, {
  mcq: [
    ["The functional group present in ethanoic acid is:", "–COOH", "–OH", "–CHO", "–CO–", "Ethanoic acid (acetic acid) CH₃COOH contains the carboxyl group –COOH."],
    ["Which of the following is an unsaturated hydrocarbon?", "C₂H₄", "C₂H₆", "CH₄", "C₃H₈", "Ethene (C₂H₄) has a C=C double bond."],
    ["The IUPAC name of CH₃–CH₂–CH₂–OH is:", "propan-1-ol", "propanal", "propanoic acid", "propane", "Three carbons (prop) and an –OH group gives propan-1-ol."],
    ["Soap is the sodium or potassium salt of:", "long-chain fatty acids", "alcohols", "glycerol", "alkanes", "Soaps are made by saponification: fat + NaOH → soap + glycerol."],
    ["Which of the following reactions is characteristic of unsaturated hydrocarbons?", "addition reaction", "substitution reaction", "neutralisation", "esterification only", "They add H₂, Br₂ etc. at the double or triple bond."]
  ].concat(gc.mcq),
  one: [
    ["Write the general formula of the alkane series.", null, "<b>CₙH₂ₙ₊₂</b>."],
    ["Write the general formula of the alkene series.", null, "<b>CₙH₂ₙ</b>."],
    ["What is the ability of carbon to form long chains by bonding with itself called?", ["catenation"], "Catenation."],
    ["Name the functional group of an alcohol.", ["hydroxyl", "-oh", "–oh", "oh", "hydroxyl group"], "Hydroxyl (–OH)."],
    ["How many valence electrons does a carbon atom have?", ["4"], "Carbon (2, 4) has 4 valence electrons."]
  ].concat(gc.one),
  two: [
    ["Define homologous series. State two characteristics.", "A series of organic compounds with the same functional group and general formula, in which successive members differ by –CH₂– (1 mark). Characteristics: similar chemical properties and gradation in physical properties (any two, ½ mark each)."],
    ["What is meant by saturated and unsaturated hydrocarbons? Give one example each.", "Saturated: contain only single C–C bonds, e.g. ethane (C₂H₆) (1 mark). Unsaturated: contain at least one double or triple bond, e.g. ethene (C₂H₄), ethyne (C₂H₂) (1 mark)."],
    ["Write the IUPAC name and functional group of CH₃–CH₂–COOH.", "IUPAC name: <b>propanoic acid</b> (1 mark). Functional group: <b>–COOH (carboxylic acid)</b> (1 mark)."],
    ["What is meant by combustion? Write the combustion reaction of methane.", "Combustion is burning of a substance in oxygen with release of heat and light (1 mark). CH₄ + 2O₂ → CO₂ + 2H₂O + heat (1 mark)."],
    ["State the difference between esterification and saponification.", "Esterification: an alcohol reacts with a carboxylic acid in the presence of conc. H₂SO₄ to form an ester and water. Saponification: hydrolysis of a fat or oil with an alkali (NaOH) to form soap and glycerol. (1 mark each)"],
    ["Draw the structural formula of ethene and ethyne and state the bond between carbon atoms.", "Ethene: H₂C=CH₂ with a C=C double bond; ethyne: HC≡CH with a C≡C triple bond. (1 mark each)"]
  ].concat(gc.two),
  three: [
    ["What are the reasons for the large number of carbon compounds? Explain.", "Carbon forms millions of compounds because of (1) catenation — carbon atoms bond with each other to form long chains, branched chains and rings; (2) tetravalency — each carbon forms four bonds with C, H, O, N, halogens; (3) formation of single, double and triple bonds. (1 mark each)"],
    ["Distinguish between ethanol and ethanoic acid (any three points).", "Ethanol: C₂H₅OH, functional group –OH, neutral to litmus, no reaction with NaHCO₃. Ethanoic acid: CH₃COOH, functional group –COOH, turns blue litmus red, releases CO₂ with NaHCO₃. Ethanol is a liquid used as solvent/fuel; ethanoic acid is used as vinegar. (1 mark each)"],
    ["Explain the cleansing action of soap.", "A soap molecule has a hydrophilic (ionic) head and a hydrophobic (hydrocarbon) tail (1 mark). In water the tails dissolve in the oil/dirt while the heads face the water, forming micelles with the dirt in the centre (1 mark). The micelles are washed away with water, cleaning the cloth (1 mark)."],
    ["Write the names and formulae of the first three members of the homologous series of alcohols.", "Methanol CH₃OH, ethanol C₂H₅OH, propanol C₃H₇OH; each differs by a –CH₂– unit and has the –OH group. (1 mark each)"],
    ["Explain addition and substitution reactions with one example each.", "Addition: an unsaturated compound adds atoms across the double/triple bond, e.g. CH₂=CH₂ + H₂ → CH₃–CH₃ (1½ marks). Substitution: an atom/group is replaced by another, e.g. CH₄ + Cl₂ → CH₃Cl + HCl in sunlight (1½ marks)."],
    ["Write the uses of ethanol and ethanoic acid.", "Ethanol: solvent in medicines, perfumes and paints; fuel additive; antiseptic; in alcoholic drinks. Ethanoic acid: vinegar, food preservative, manufacture of dyes and perfumes, laboratory reagent. (any three, 1 mark each)"]
  ].concat(gc.three),
  five: [
    ["Write the structural isomers of butane and pentane in brief, naming each. Also state what isomerism is.", "<b>Isomerism</b> (1 mark): compounds with the same molecular formula but different structures. <b>Butane C₄H₁₀</b> (2 marks): n-butane CH₃–CH₂–CH₂–CH₃ and 2-methylpropane (isobutane). <b>Pentane C₅H₁₂</b> (2 marks): n-pentane, 2-methylbutane and 2,2-dimethylpropane."],
    ["Describe the chemical properties of ethanol: combustion, reaction with sodium, oxidation and dehydration, with equations.", "Combustion (1 mark): C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O. With sodium (1 mark): 2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂. Oxidation (1½ marks): ethanol on oxidation with alkaline KMnO₄ or acidified K₂Cr₂O₇ gives ethanoic acid. Dehydration (1½ marks): with conc. H₂SO₄ at 443 K gives ethene, C₂H₅OH → C₂H₄ + H₂O."]
  ]
});
})();

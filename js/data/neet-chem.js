/* NEET (UG) Chemistry question bank — NCERT Class XI, 9 chapters. Original questions; numericals are computed from their own numbers. */
(function () {
const NL = window.NL, S = 'chem', f = NL.f, sq = Math.sqrt, lg = Math.log10;
const gen = (ch, rows, fn) => NL.gen(S, ch, rows, fn), mcs = (ch, l) => NL.mcs(S, ch, l), st = (ch, T, F, sp) => NL.stmts(S, ch, T, F, sp), ar = (ch, l) => NL.ar(S, ch, l), pr = (ch, a, b, P, sp) => NL.pairs(S, ch, a, b, P, sp);
const NA = 6.022e23;

/* ---------- 1. Some Basic Concepts of Chemistry ---------- */
let C = 'Some Basic Concepts of Chemistry';
const CMP = [['water', 'H<sub>2</sub>O', 18], ['carbon dioxide', 'CO<sub>2</sub>', 44], ['sodium hydroxide', 'NaOH', 40], ['calcium carbonate', 'CaCO<sub>3</sub>', 100], ['sulphuric acid', 'H<sub>2</sub>SO<sub>4</sub>', 98], ['ammonia', 'NH<sub>3</sub>', 17], ['glucose', 'C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>', 180], ['oxygen', 'O<sub>2</sub>', 32]];
gen(C, [[0, 36], [1, 11], [2, 10], [3, 25], [4, 49], [5, 34], [6, 90], [7, 8]], (i, m) => {
  const [n, F, M] = CMP[i];
  return [`The number of moles in ${m} g of ${n} (${F}) is`, m / M, 'mol', [m * M / 100, M / m, m / M * 2], `Molar mass of ${F} = ${M} g mol⁻¹. n = mass/M = ${m}/${M} = <b>${f(m / M)} mol</b>.`, 'easy'];
});
gen(C, [[0, 9], [1, 22], [6, 18], [7, 16], [5, 1.7]], (i, m) => {
  const [n, F, M] = CMP[i], N = m / M * NA;
  return [`The number of molecules present in ${m} g of ${n} is`, N, '', [N * 2, N / 2, m * NA], `n = ${m}/${M} = ${f(m / M)} mol; N = n × N<sub>A</sub> = ${f(m / M)} × 6.022 × 10²³ = <b>${f(N)}</b>.`];
});
gen(C, [[4, 500], [2, 250], [8, 1000], [10, 500], [1, 100]], (g, V) => [
  `${g} g of NaOH (molar mass 40 g mol⁻¹) is dissolved in water to make ${V} mL of solution. The molarity of the solution is`,
  g / 40 / (V / 1000), 'M', [g / 40 / V, g / (V / 1000), g / 40 * (V / 1000)],
  `Moles = ${g}/40 = ${f(g / 40)}; volume = ${V / 1000} L. M = ${f(g / 40)}/${V / 1000} = <b>${f(g / 40 / (V / 1000))} M</b>.`, 'easy']);
gen(C, [[18, 500], [36, 250], [9, 1000], [90, 500]], (g, w) => [
  `${g} g of glucose (C₆H₁₂O₆, 180 g mol⁻¹) is dissolved in ${w} g of water. The molality of the solution is`,
  g / 180 / (w / 1000), 'm', [g / 180 / w, g / 180 / ((w + g) / 1000), g / (w / 1000)],
  `Molality = moles of solute / kg of solvent = (${g}/180)/(${w / 1000}) = <b>${f(g / 180 / (w / 1000))} mol kg⁻¹</b>.`]);
gen(C, [[100, 0.5, 0.1], [50, 2, 0.5], [200, 1, 0.25], [25, 4, 0.2]], (V1, M1, M2) => [
  `${V1} mL of a ${M1} M solution is diluted to make it ${M2} M. The final volume of the solution is`,
  V1 * M1 / M2, 'mL', [V1 * M2 / M1, V1 * M1 / M2 - V1, V1 * M1 * M2],
  `M₁V₁ = M₂V₂ ⇒ V₂ = ${M1}×${V1}/${M2} = <b>${f(V1 * M1 / M2)} mL</b>.`, 'easy']);
gen(C, [[2, 32], [4, 32], [1, 16], [6, 64], [3, 40]], (mh, mo) => {
  const nh = mh / 2, no = mo / 32, water = Math.min(nh, 2 * no) * 18;
  return [`${mh} g of H₂ is made to react with ${mo} g of O₂ to form water (2H₂ + O₂ → 2H₂O). The mass of water formed is`, water, 'g', [(mh + mo), Math.max(nh, 2 * no) * 18, water / 2],
    `n(H₂) = ${f(nh)} mol, n(O₂) = ${f(no)} mol. ${nh < 2 * no ? 'H₂ is the limiting reagent' : nh > 2 * no ? 'O₂ is the limiting reagent' : 'Both are used up exactly'}; water formed = ${f(Math.min(nh, 2 * no))} mol × 18 = <b>${f(water)} g</b>.`];
});
mcs(C, [
  ['The percentage of nitrogen in urea, NH₂CONH₂ (60 g mol⁻¹), is about', '46.7%', '23.3%', '28%', '60%', '%N = 28/60 × 100 = <b>46.7%</b>.', 'medium'],
  ['The percentage by mass of carbon in carbon dioxide is about', '27.3%', '72.7%', '12%', '44%', '%C = 12/44 × 100 = <b>27.3%</b>.'],
  ['A compound contains 40% C, 6.7% H and 53.3% O by mass. Its empirical formula is', 'CH₂O', 'CHO', 'C₂H₄O', 'CH₂O₂', 'Mole ratio C : H : O = 40/12 : 6.7/1 : 53.3/16 = 3.33 : 6.7 : 3.33 = 1 : 2 : 1 → <b>CH₂O</b>.', 'medium'],
  ['The empirical formula of a compound is CH₂O and its molar mass is 180 g mol⁻¹. Its molecular formula is', 'C₆H₁₂O₆', 'C₃H₆O₃', 'C₂H₄O₂', 'CH₂O', 'n = 180/30 = 6 ⇒ <b>C₆H₁₂O₆</b>.'],
  ['One atomic mass unit (u) is defined as', 'one-twelfth of the mass of one carbon-12 atom', 'the mass of one hydrogen atom', 'one-sixteenth of the mass of an oxygen atom', 'the mass of one proton', '1 u = 1/12 of the mass of a ¹²C atom = 1.66056 × 10⁻²⁴ g.'],
  ['The mass of one atom of carbon-12 is', '1.99 × 10<sup>−23</sup> g', '12 g', '6.022 × 10<sup>−23</sup> g', '1.66 × 10<sup>−24</sup> g', '12 g / 6.022 × 10²³ = <b>1.99 × 10⁻²³ g</b>.', 'medium'],
  ['Which of the following has the largest number of molecules?', '1 g of H₂', '1 g of O₂', '1 g of CO₂', '1 g of N₂', 'Same mass, so the gas with the smallest molar mass (H₂, 2 g mol⁻¹) has the most molecules.'],
  ['The mole fraction of the solute in a solution containing 1 mol of glucose in 9 mol of water is', '0.1', '0.9', '0.11', '1', 'x = 1/(1 + 9) = <b>0.1</b>.'],
  ['Molarity of a solution changes with temperature because', 'volume changes with temperature', 'mass changes with temperature', 'number of moles changes', 'molar mass changes', 'Molarity uses volume, which expands or contracts with temperature; molality (uses mass) does not change.'],
  ['The number of significant figures in 0.0025 is', '2', '4', '5', '3', 'Leading zeros do not count: 2 and 5 → <b>2</b>.'],
  ['Taking the molar volume of a gas as 22.4 L at 273 K and 1 atm, the volume occupied by 8.8 g of CO₂ under these conditions is', '4.48 L', '2.24 L', '8.96 L', '44.8 L', 'n = 8.8/44 = 0.2 mol; V = 0.2 × 22.4 = <b>4.48 L</b>.', 'medium'],
  ['How many moles of oxygen atoms are present in 0.5 mol of CaCO₃?', '1.5', '0.5', '3', '1', 'Each CaCO₃ has 3 O atoms: 0.5 × 3 = <b>1.5 mol</b>.']
]);
pr(C, 'Law of chemical combination', 'Proposed by', [
  ['Law of conservation of mass', 'Antoine Lavoisier'], ['Law of definite proportions', 'Joseph Proust'], ['Law of multiple proportions', 'John Dalton'],
  ['Law of gaseous volumes', 'Joseph Gay Lussac'], ['Equal volumes of gases at the same T and P contain equal numbers of molecules', 'Amedeo Avogadro']
], { list: 2, right: 2, wrong: 2, direct: 3, ask: l => `"${l}" was given by` });
st(C, [
  'Molality does not change with temperature.',
  'A limiting reagent is completely consumed in a reaction.',
  'One mole of any substance contains 6.022 × 10²³ elementary entities.',
  'Water and hydrogen peroxide illustrate the law of multiple proportions.',
  'Homogeneous mixtures have a uniform composition throughout.',
  'The molecular formula is a whole-number multiple of the empirical formula.'
], [
  ['Molarity is independent of temperature.', 'molarity depends on the volume of solution, which changes with temperature.'],
  ['The reactant present in the largest mass is always the limiting reagent.', 'the limiting reagent is decided by moles and stoichiometry, not by mass.'],
  ['The empirical formula always gives the actual number of atoms in a molecule.', 'it gives only the simplest whole-number ratio.'],
  ['Mass is conserved in a chemical reaction only if all reactants are gases.', 'mass is conserved in every chemical reaction.'],
  ['1 u is equal to the mass of one hydrogen atom exactly.', '1 u is 1/12 of the mass of a carbon-12 atom.']
], { correct: 3, incorrect: 3, two: 4, count: 3 });

/* ---------- 2. Structure of Atom ---------- */
C = 'Structure of Atom';
gen(C, [[1, 1], [2, 1], [2, 2], [3, 1], [1, 3], [3, 2]], (Z, n) => [
  `According to Bohr's model, the energy of the electron in the ${n === 1 ? 'first' : n === 2 ? 'second' : 'third'} orbit of ${Z === 1 ? 'the hydrogen atom' : Z === 2 ? 'He⁺' : 'Li²⁺'} is`,
  -13.6 * Z * Z / (n * n), 'eV', [-13.6 * Z / (n * n), -13.6 * Z * Z / n, 13.6 * Z * Z / (n * n)],
  `E<sub>n</sub> = −13.6 Z²/n² eV = −13.6 × ${Z * Z}/${n * n} = <b>${f(-13.6 * Z * Z / (n * n))} eV</b>.`]);
gen(C, [[1, 1], [1, 2], [2, 1], [3, 2], [2, 2]], (Z, n) => [
  `The radius of the ${n === 1 ? 'first' : 'second'} Bohr orbit of ${Z === 1 ? 'the hydrogen atom' : Z === 2 ? 'He⁺' : 'Li²⁺'} is (a₀ = 52.9 pm)`,
  52.9 * n * n / Z, 'pm', [52.9 * n / Z, 52.9 * n * n * Z, 52.9 * Z / (n * n)],
  `r<sub>n</sub> = 52.9 n²/Z pm = 52.9 × ${n * n}/${Z} = <b>${f(52.9 * n * n / Z)} pm</b>.`]);
gen(C, [[1, 2], [2, 3], [2, 4], [3, 4], [1, 3]], (n1, n2) => [
  `The wave number of the spectral line of hydrogen for the transition n = ${n2} → n = ${n1} is (R<sub>H</sub> = 109677 cm⁻¹)`,
  109677 * (1 / (n1 * n1) - 1 / (n2 * n2)), 'cm⁻¹', [109677 * (1 / n1 - 1 / n2), 109677 * (1 / (n1 * n1) + 1 / (n2 * n2)), 109677 / (n2 * n2)],
  `ν̄ = R<sub>H</sub>(1/n₁² − 1/n₂²) = 109677 (1/${n1 * n1} − 1/${n2 * n2}) = <b>${f(109677 * (1 / (n1 * n1) - 1 / (n2 * n2)))} cm⁻¹</b>.`]);
gen(C, [[400], [500], [600], [300], [700]], L => [
  `The energy of one photon of light of wavelength ${L} nm is (h = 6.626 × 10⁻³⁴ J s, c = 3 × 10⁸ m s⁻¹)`,
  6.626e-34 * 3e8 / (L * 1e-9), 'J', [6.626e-34 * 3e8 / L, 6.626e-34 * L * 1e-9 / 3e8 * 1e30, 6.626e-34 / (L * 1e-9)],
  `E = hc/λ = (6.626 × 10⁻³⁴ × 3 × 10⁸)/(${L} × 10⁻⁹) = <b>${f(6.626e-34 * 3e8 / (L * 1e-9))} J</b>.`]);
gen(C, [[1e6], [2e6], [5e5], [1e7]], v => [
  `The de Broglie wavelength of an electron (mass 9.1 × 10⁻³¹ kg) moving at ${f(v)} m s⁻¹ is (h = 6.626 × 10⁻³⁴ J s)`,
  6.626e-34 / (9.1e-31 * v) * 1e9, 'nm', [6.626e-34 / (9.1e-31 * v) * 1e10, 6.626e-34 * v / 9.1e-31 * 1e-27, 6.626e-34 / (9.1e-31 * v) * 1e8],
  `λ = h/mv = 6.626 × 10⁻³⁴/(9.1 × 10⁻³¹ × ${f(v)}) = ${f(6.626e-34 / (9.1e-31 * v))} m = <b>${f(6.626e-34 / (9.1e-31 * v) * 1e9)} nm</b>.`]);
gen(C, [[3], [4], [5], [6], [7]], n => [
  `In a sample of hydrogen atoms, electrons fall from the n = ${n} level to the ground state by every possible path. The maximum number of distinct spectral lines is`,
  n * (n - 1) / 2, '', [n - 1, n * (n + 1) / 2, n * n],
  `Number of lines = n(n − 1)/2 = ${n}×${n - 1}/2 = <b>${n * (n - 1) / 2}</b>.`, 'easy']);
gen(C, [[3, 0], [3, 1], [4, 2], [2, 1], [4, 1], [5, 2]], (n, l) => [
  `For the ${n}${'spdf'[l]} orbital, the numbers of radial and angular nodes respectively are`,
  `${n - l - 1}, ${l}`, '', [[l, n - l - 1], [n - 1, l], [n - l, l + 1], [n - l - 1, l + 1], [n, l]].map(x => x.join(', ')).filter((x, k, a) => x !== `${n - l - 1}, ${l}` && a.indexOf(x) === k).slice(0, 3),
  `Radial nodes = n − l − 1 = ${n - l - 1}; angular nodes = l = ${l}. Answer: <b>${n - l - 1}, ${l}</b>.`]);
mcs(C, [
  ['The maximum number of electrons in a shell with principal quantum number n is', '2n²', 'n²', '2n', '2l + 1', 'A shell has n² orbitals, each holding 2 electrons: <b>2n²</b>.'],
  ['The number of orbitals in a subshell with azimuthal quantum number l is', '2l + 1', '2l', 'l²', 'n − l', 'm<sub>l</sub> runs from −l to +l: <b>2l + 1</b> values.'],
  ['The electronic configuration of chromium (Z = 24) is', '[Ar] 3d⁵ 4s¹', '[Ar] 3d⁴ 4s²', '[Ar] 3d⁶', '[Ar] 4s² 4p⁴', 'A half-filled 3d subshell is extra stable: <b>[Ar] 3d⁵ 4s¹</b>.'],
  ['The electronic configuration of copper (Z = 29) is', '[Ar] 3d¹⁰ 4s¹', '[Ar] 3d⁹ 4s²', '[Ar] 3d¹⁰ 4s²', '[Ar] 3d⁸ 4s² 4p¹', 'A completely filled 3d subshell is extra stable: <b>[Ar] 3d¹⁰ 4s¹</b>.'],
  ['The number of unpaired electrons in Fe³⁺ (Z of Fe = 26) is', '5', '4', '3', '6', 'Fe³⁺ = [Ar] 3d⁵: five singly occupied d orbitals → <b>5</b>.', 'medium'],
  ['Which set of quantum numbers is NOT possible?', 'n = 2, l = 2, m<sub>l</sub> = 0', 'n = 2, l = 1, m<sub>l</sub> = −1', 'n = 3, l = 2, m<sub>l</sub> = +2', 'n = 1, l = 0, m<sub>l</sub> = 0', 'l can be at most n − 1; for n = 2, l = 2 is not allowed.', 'medium'],
  ['The orbital with n = 4 and l = 3 is', '4f', '4d', '3f', '4p', 'l = 3 is an f orbital: <b>4f</b>.'],
  ['According to the (n + l) rule, which orbital is filled first?', '4s', '3d', '4p', '5s', 'n + l: 4s = 4, 3d = 5, 4p = 5, 5s = 5 → <b>4s</b> (lowest).'],
  ['The Balmer series of the hydrogen spectrum lies in the', 'visible region', 'ultraviolet region', 'infrared region', 'microwave region', 'Transitions ending at n = 2 give the Balmer series, in the <b>visible</b> region.'],
  ['The shape of a p orbital is', 'dumb-bell', 'spherical', 'double dumb-bell', 'linear', 'A p orbital has two lobes on either side of a nodal plane: <b>dumb-bell</b>.'],
  ['Which of the following species is isoelectronic with Ne?', 'Na⁺', 'Na', 'K⁺', 'Cl⁻', 'Na⁺ has 11 − 1 = 10 electrons, like Ne.'],
  ['Hund\'s rule of maximum multiplicity says that', 'pairing in orbitals of a subshell starts only after each has one electron', 'no two electrons can have the same four quantum numbers', 'orbitals fill in order of increasing energy', 'an orbital holds at most two electrons', 'Electrons occupy degenerate orbitals singly (with parallel spins) before pairing.'],
  ['Isotopes of an element have the same', 'atomic number', 'mass number', 'number of neutrons', 'nuclear mass', 'Isotopes: same Z (protons), different numbers of neutrons.'],
  ['The photoelectric effect shows that light', 'behaves as particles (photons)', 'is a transverse wave', 'can be diffracted', 'has no energy', 'Emission of electrons only above a threshold frequency, instantly, is explained by <b>photons</b> (particle nature).']
]);
pr(C, 'Scientist', 'Contribution', [
  ['J. J. Thomson', 'charge-to-mass ratio of the electron'], ['R. A. Millikan', 'charge on the electron (oil-drop experiment)'], ['Ernest Rutherford', 'nuclear model of the atom (α-particle scattering)'],
  ['James Chadwick', 'discovery of the neutron'], ['Werner Heisenberg', 'uncertainty principle'], ['Louis de Broglie', 'wave nature of matter'], ['Niels Bohr', 'quantised energy levels of the hydrogen atom']
], { list: 3, right: 2, wrong: 2, direct: 4, ask: l => `Which of these is associated with ${l}?` });
pr(C, 'Spectral series of hydrogen', 'Final orbit (n₁)', [['Lyman series', 'n₁ = 1'], ['Balmer series', 'n₁ = 2'], ['Paschen series', 'n₁ = 3'], ['Brackett series', 'n₁ = 4'], ['Pfund series', 'n₁ = 5']], { list: 2, right: 1, wrong: 1, direct: 2, ask: l => `The ${l} of hydrogen ends on the orbit` });
st(C, [
  'Cathode rays consist of negatively charged particles.',
  'An orbital can hold at most two electrons, with opposite spins.',
  'The energy of an electron in a hydrogen atom depends only on n.',
  'Cr and Cu have exceptional electronic configurations.',
  'The 3d orbitals are filled after the 4s orbital.',
  'Heisenberg\'s uncertainty principle rules out fixed circular orbits for electrons.'
], [
  ['The neutron was discovered by Rutherford.', 'it was discovered by James Chadwick (1932).'],
  ['All orbitals of a given shell have the same energy in a multi-electron atom.', 'in multi-electron atoms the energy depends on n and l.'],
  ['The 2s orbital has two radial nodes.', 'a 2s orbital has n − l − 1 = 1 radial node.'],
  ['Electrons revolve in fixed orbits according to quantum mechanics.', 'quantum mechanics describes orbitals (probability regions), not fixed orbits.'],
  ['The Lyman series lies in the visible region.', 'the Lyman series lies in the ultraviolet region.']
], { correct: 3, incorrect: 3, two: 4, count: 3 });

/* ---------- 3. Classification of Elements and Periodicity in Properties ---------- */
C = 'Classification of Elements and Periodicity in Properties';
const ROOT = ['nil', 'un', 'bi', 'tri', 'quad', 'pent', 'hex', 'sept', 'oct', 'enn'], SYM = ['n', 'u', 'b', 't', 'q', 'p', 'h', 's', 'o', 'e'];
const iupac = z => { const d = String(z).split('').map(Number); let s = d.map(x => ROOT[x]).join(''); s = (s + 'ium').replace('nnn', 'nn').replace('iium', 'ium'); return s.charAt(0).toUpperCase() + s.slice(1); };
const isym = z => { const s = String(z).split('').map(x => SYM[+x]).join(''); return s.charAt(0).toUpperCase() + s.slice(1); };
NL.genT(S, C, [[101], [104], [109], [113], [118], [120], [107]], z => [
  `The IUPAC temporary name and symbol of the element with atomic number ${z} are`,
  `${iupac(z)} (${isym(z)})`, [z + 1, z - 1, Number(String(z).split('').reverse().join(''))].filter(x => x !== z && x > 100 && x < 200).concat([z + 2, z - 2]).slice(0, 3).map(x => `${iupac(x)} (${isym(x)})`),
  `Digits ${String(z).split('').join(', ')} → roots ${String(z).split('').map(x => ROOT[+x]).join(' + ')} + "ium": <b>${iupac(z)}, ${isym(z)}</b>.`]);
mcs(C, [
  ['The modern periodic law states that the properties of elements are a periodic function of their', 'atomic numbers', 'atomic masses', 'numbers of neutrons', 'densities', 'Moseley showed that <b>atomic number</b>, not atomic mass, is the basis of periodicity.'],
  ['The element with the most negative electron gain enthalpy is', 'chlorine', 'fluorine', 'oxygen', 'bromine', 'F is so small that the added electron is strongly repelled; <b>Cl</b> has the most negative value.', 'medium'],
  ['The most electronegative element is', 'fluorine', 'oxygen', 'chlorine', 'nitrogen', 'On the Pauling scale <b>F</b> has the highest electronegativity (4.0).'],
  ['The correct order of first ionisation enthalpy is', 'B < C < O < N', 'B < C < N < O', 'C < B < N < O', 'O < N < C < B', 'N (half-filled 2p³) has a higher IE than O; B (2p¹) is lower than Be and C. Order: <b>B < C < O < N</b>.', 'medium'],
  ['The correct order of ionic radii for the isoelectronic species is', 'O²⁻ > F⁻ > Na⁺ > Mg²⁺', 'Mg²⁺ > Na⁺ > F⁻ > O²⁻', 'F⁻ > O²⁻ > Na⁺ > Mg²⁺', 'Na⁺ > Mg²⁺ > O²⁻ > F⁻', 'All have 10 electrons; a larger nuclear charge pulls them in more, so radius falls as Z rises: <b>O²⁻ > F⁻ > Na⁺ > Mg²⁺</b>.', 'medium'],
  ['Elements of group 18 are called', 'noble gases', 'halogens', 'chalcogens', 'alkali metals', 'Group 18 elements (He to Rn) are the <b>noble gases</b>.'],
  ['The element with electronic configuration [Ne] 3s² 3p⁵ belongs to', 'period 3, group 17', 'period 3, group 7', 'period 5, group 17', 'period 2, group 17', 'n = 3 ⇒ period 3; 7 valence electrons in s and p ⇒ <b>group 17</b> (chlorine).'],
  ['Which of the following is a d-block element?', 'Iron', 'Calcium', 'Aluminium', 'Sulphur', 'Fe ([Ar] 3d⁶ 4s²) has its last electron entering a d orbital.'],
  ['Atomic radius generally', 'decreases across a period and increases down a group', 'increases across a period and decreases down a group', 'increases across a period and down a group', 'stays the same in a period', 'Across a period the effective nuclear charge rises; down a group new shells are added.'],
  ['The amphoteric oxide among the following is', 'Al₂O₃', 'Na₂O', 'SO₃', 'CaO', 'Al₂O₃ reacts with both acids and bases.'],
  ['Which of the following has the largest atomic radius?', 'Cs', 'Na', 'K', 'Li', 'Radius increases down group 1: <b>Cs</b> is largest of these.'],
  ['The second ionisation enthalpy of sodium is very high because', 'the second electron is removed from a stable noble-gas core', 'sodium is a metal', 'sodium has a small nucleus', 'the first electron is removed from 3p', 'After losing 3s¹, Na⁺ has the stable neon configuration; removing another electron needs a lot of energy.'],
  ['Elements in the same group have similar chemical properties because they have the same', 'number of valence electrons (outer configuration)', 'atomic mass', 'number of shells', 'atomic radius', 'Chemical behaviour is decided by the outer electronic configuration.'],
  ['Mendeleev left gaps in his periodic table and predicted the properties of eka-aluminium, later discovered as', 'gallium', 'germanium', 'scandium', 'aluminium', 'Eka-aluminium = <b>gallium</b>; eka-silicon = germanium.']
]);
pr(C, 'Element', 'Block of the periodic table', [['Sodium', 's-block'], ['Chlorine', 'p-block'], ['Manganese', 'd-block'], ['Cerium', 'f-block']], { list: 2, right: 2, wrong: 2, direct: 3, ask: l => `${l} belongs to the` });
st(C, [
  'Ionisation enthalpy generally increases across a period.',
  'Metallic character decreases across a period from left to right.',
  'The oxides of metals are generally basic.',
  'Electronegativity is a property of a bonded atom.',
  'Noble gases have large positive electron gain enthalpies.'
], [
  ['Electron gain enthalpy of fluorine is more negative than that of chlorine.', 'chlorine has the more negative electron gain enthalpy.'],
  ['Atomic radius increases across a period.', 'it generally decreases across a period.'],
  ['The first ionisation enthalpy of oxygen is higher than that of nitrogen.', 'nitrogen (half-filled 2p³) has the higher first ionisation enthalpy.'],
  ['A cation is larger than its parent atom.', 'a cation is smaller than its parent atom.'],
  ['Elements of the same period have the same number of valence electrons.', 'elements of the same group have the same number of valence electrons.']
], { correct: 3, incorrect: 3, two: 4, count: 3 });

/* ---------- 4. Chemical Bonding and Molecular Structure ---------- */
C = 'Chemical Bonding and Molecular Structure';
pr(C, 'Molecule', 'Shape', [
  ['BeCl<sub>2</sub>', 'linear'], ['BF<sub>3</sub>', 'trigonal planar'], ['CH<sub>4</sub>', 'tetrahedral'], ['NH<sub>3</sub>', 'trigonal pyramidal'], ['H<sub>2</sub>O', 'bent (V-shaped)'],
  ['PCl<sub>5</sub>', 'trigonal bipyramidal'], ['SF<sub>6</sub>', 'octahedral'], ['SF<sub>4</sub>', 'see-saw'], ['ClF<sub>3</sub>', 'T-shaped'], ['BrF<sub>5</sub>', 'square pyramidal'], ['XeF<sub>4</sub>', 'square planar']
], { list: 5, right: 3, wrong: 3, direct: 8, ask: l => `According to VSEPR theory, the shape of ${l} is` });
pr(C, 'Species', 'Hybridisation of the central atom', [['BeCl<sub>2</sub>', 'sp'], ['BCl<sub>3</sub>', 'sp<sup>2</sup>'], ['CCl<sub>4</sub>', 'sp<sup>3</sup>'], ['PCl<sub>5</sub>', 'sp<sup>3</sup>d'], ['SF<sub>6</sub>', 'sp<sup>3</sup>d<sup>2</sup>']], { list: 2, right: 2, wrong: 2, direct: 4, ask: l => `The hybridisation of the central atom in ${l} is` });
const BO = [['N<sub>2</sub>', 3, 'diamagnetic'], ['O<sub>2</sub>', 2, 'paramagnetic'], ['O<sub>2</sub><sup>−</sup>', 1.5, 'paramagnetic'], ['O<sub>2</sub><sup>2−</sup>', 1, 'diamagnetic'], ['O<sub>2</sub><sup>+</sup>', 2.5, 'paramagnetic'], ['H<sub>2</sub>', 1, 'diamagnetic'], ['He<sub>2</sub><sup>+</sup>', 0.5, 'paramagnetic'], ['C<sub>2</sub>', 2, 'diamagnetic'], ['N<sub>2</sub><sup>+</sup>', 2.5, 'paramagnetic']];
NL.genT(S, C, BO.map((x, i) => [i]), i => {
  const [s, b, m] = BO[i], w = [0.5, 1, 1.5, 2, 2.5, 3].filter(x => x !== b);
  return [`According to molecular orbital theory, the bond order of ${s} is`, String(b), [w[i % w.length], w[(i + 2) % w.length], w[(i + 4) % w.length]].map(String),
    `Bond order = ½(N<sub>b</sub> − N<sub>a</sub>) = <b>${b}</b>. ${s} is ${m}.`];
});
mcs(C, [
  ['Which of the following molecules has zero dipole moment?', 'CO₂', 'H₂O', 'NH₃', 'SO₂', 'CO₂ is linear (O=C=O): the two bond dipoles cancel.'],
  ['The dipole moment of NH₃ is larger than that of NF₃ because', 'in NH₃ the lone-pair moment adds to the bond moments, in NF₃ it opposes them', 'N is more electronegative than F', 'NF₃ is planar', 'NH₃ has no lone pair', 'In NH₃ the N–H bond dipoles point towards N, the same way as the lone pair; in NF₃ they point towards F, opposing it.', 'medium'],
  ['The number of σ and π bonds in ethyne (HC≡CH) is', '3 σ and 2 π', '2 σ and 3 π', '5 σ and 0 π', '3 σ and 1 π', 'Two C–H σ, one C–C σ and two C–C π bonds: <b>3σ, 2π</b>.'],
  ['The number of σ and π bonds in CH₂=CH–C≡N is', '6 σ and 3 π', '5 σ and 4 π', '6 σ and 2 π', '7 σ and 3 π', 'σ: 3 C–H + C–C + C=C σ + C≡N σ = 6; π: one in C=C and two in C≡N = 3.', 'medium'],
  ['O₂ is paramagnetic because', 'it has two unpaired electrons in π* orbitals', 'it has a double bond', 'its bond order is 2', 'all its electrons are paired', 'MO configuration ends in π*2p<sub>x</sub>¹ π*2p<sub>y</sub>¹: <b>two unpaired electrons</b>.'],
  ['Which of the following shows intramolecular hydrogen bonding?', 'o-nitrophenol', 'p-nitrophenol', 'water', 'HF', 'In o-nitrophenol the –OH and –NO₂ groups are close enough to H-bond within the molecule.', 'medium'],
  ['The formal charge on the central oxygen atom of O₃ is', '+1', '0', '−1', '+2', 'Central O: 6 valence electrons − 2 non-bonding − ½(6 bonding) = <b>+1</b>.', 'medium'],
  ['Which of the following has an expanded octet?', 'PCl₅', 'BF₃', 'NH₃', 'CH₄', 'P in PCl₅ has 10 electrons around it (third-period element using d orbitals).'],
  ['Which of the following has an incomplete octet on the central atom?', 'BCl₃', 'SF₆', 'PCl₅', 'H₂O', 'Boron in BCl₃ has only 6 electrons around it.'],
  ['The bond angle in H₂O is about 104.5° while in CH₄ it is 109.5° because', 'lone pairs repel more strongly than bond pairs', 'O is larger than C', 'H₂O is linear', 'hydrogen bonding', 'Lone pair–lone pair > lone pair–bond pair > bond pair–bond pair repulsion squeezes the H–O–H angle.'],
  ['Lattice enthalpy of an ionic solid is higher when', 'the ions are smaller and more highly charged', 'the ions are larger', 'the charges are smaller', 'the solid is covalent', 'Lattice energy ∝ (charge product)/(sum of radii).'],
  ['Which of the following has the highest bond order?', 'N₂', 'O₂', 'F₂', 'O₂⁻', 'N₂ has bond order 3; O₂ 2, O₂⁻ 1.5, F₂ 1.'],
  ['The type of hybridisation of carbon in graphite or benzene is', 'sp²', 'sp³', 'sp', 'sp³d', 'Each carbon forms three σ bonds in a plane and one π bond: <b>sp²</b>.'],
  ['The resonance structures of a molecule', 'differ only in the arrangement of electrons, not of atoms', 'differ in the position of atoms', 'exist separately and interconvert', 'have different numbers of electrons', 'The real molecule is a single hybrid; canonical forms differ only in electron placement.']
]);
st(C, [
  'Bond length decreases as bond order increases.',
  'Greater the bond order, greater the bond enthalpy.',
  'A sigma bond is stronger than a pi bond.',
  'Hydrogen bonding is responsible for the high boiling point of water.',
  'The ionic character of a bond increases with the electronegativity difference.',
  'Resonance stabilises a molecule.'
], [
  ['A pi bond can exist without a sigma bond between the same two atoms.', 'a pi bond is formed only after a sigma bond already exists.'],
  ['He₂ is a stable molecule with bond order 1.', 'He₂ has bond order 0 and does not exist.'],
  ['BF₃ has a trigonal pyramidal shape.', 'BF₃ (no lone pair on B) is trigonal planar.'],
  ['All molecules with polar bonds have a dipole moment.', 'symmetric molecules such as CO₂ and CCl₄ have polar bonds but zero dipole moment.'],
  ['N₂ is paramagnetic.', 'all electrons in N₂ are paired; it is diamagnetic.']
], { correct: 3, incorrect: 3, two: 4, count: 3 });

/* ---------- 5. Thermodynamics ---------- */
C = 'Thermodynamics';
const RX = [['N₂(g) + 3H₂(g) → 2NH₃(g)', -2], ['C(s) + O₂(g) → CO₂(g)', 0], ['CaCO₃(s) → CaO(s) + CO₂(g)', 1], ['PCl₅(g) → PCl₃(g) + Cl₂(g)', 1], ['2H₂(g) + O₂(g) → 2H₂O(l)', -3], ['CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)', -2]];
gen(C, [[0, -87.9], [1, -393.5], [2, 175.6], [3, 87], [4, -564], [5, -885.3]], (i, dU) => {
  const [r, dn] = RX[i], dH = dU + dn * 8.314 * 298 / 1000;
  return [`For the reaction ${r}, ΔU = ${dU} kJ mol⁻¹ at 298 K. The value of ΔH is (R = 8.314 J K⁻¹ mol⁻¹)`, +dH.toFixed(1), 'kJ mol⁻¹', [+(dU - dn * 8.314 * 298 / 1000).toFixed(1), dn ? dU + dn * 8.314 * 298 : dU + 2.5, dU + dn * 2.48 * 2],
    `ΔH = ΔU + Δn<sub>g</sub>RT; Δn<sub>g</sub> = ${dn}. ΔH = ${dU} + (${dn})(8.314 × 298/1000) = <b>${f(+dH.toFixed(1))} kJ mol⁻¹</b>.${dn === 0 ? ' With Δn<sub>g</sub> = 0, ΔH = ΔU.' : ''}`];
});
const HC = [['CH₄', 1, 4, -890.3], ['C₂H₆', 2, 6, -1560], ['C₂H₄', 2, 4, -1411], ['C₂H₂', 2, 2, -1300], ['C₃H₈', 3, 8, -2220]];
gen(C, HC.map((x, i) => [i]), i => {
  const [n, x, y, c] = HC[i], v = x * -393.5 + y / 2 * -285.8 - c;
  return [`The standard enthalpies of combustion of C(graphite), H₂(g) and ${n}(g) are −393.5, −285.8 and ${c} kJ mol⁻¹. The standard enthalpy of formation of ${n} is`, +v.toFixed(1), 'kJ mol⁻¹', [+(-v).toFixed(1), +(x * -393.5 + y * -285.8 - c).toFixed(1), +(x * -393.5 + y / 2 * -285.8 + c).toFixed(1)],
    `Hess's law: ΔfH = ${x}(−393.5) + ${y / 2}(−285.8) − (${c}) = <b>${f(+v.toFixed(1))} kJ mol⁻¹</b>.`];
});
gen(C, [[436, 242, 431], [436, 158, 568], [436, 193, 366], [946, 498, 630]], (a, b, c) => [
  `Bond enthalpies (kJ mol⁻¹): A–A = ${a}, B–B = ${b}, A–B = ${c}. The enthalpy change of A₂(g) + B₂(g) → 2AB(g) is`,
  a + b - 2 * c, 'kJ mol⁻¹', [2 * c - a - b, a + b - c, a + b + 2 * c],
  `ΔH = Σ(bonds broken) − Σ(bonds formed) = (${a} + ${b}) − 2(${c}) = <b>${a + b - 2 * c} kJ mol⁻¹</b>.`]);
gen(C, [[30, 100], [44, 120], [178, 160], [40, 80], [12, 40]], (H, Sv) => [
  `For a reaction ΔH = +${H} kJ mol⁻¹ and ΔS = +${Sv} J K⁻¹ mol⁻¹ (both taken as independent of temperature). Above what temperature does it become spontaneous?`,
  H * 1000 / Sv, 'K', [H / Sv, Sv / H * 1000, H * 1000 / Sv - 273],
  `Spontaneous when ΔG = ΔH − TΔS < 0 ⇒ T > ΔH/ΔS = ${H * 1000}/${Sv} = <b>${f(H * 1000 / Sv)} K</b>.`]);
gen(C, [[-100, -200, 300], [50, 150, 400], [-80, 40, 300], [20, 100, 250]], (H, Sv, T) => [
  `For a reaction at ${T} K, ΔH = ${H} kJ mol⁻¹ and ΔS = ${Sv} J K⁻¹ mol⁻¹. The value of ΔG is`,
  H - T * Sv / 1000, 'kJ mol⁻¹', [H + T * Sv / 1000, H - T * Sv, H * 1000 - T * Sv],
  `ΔG = ΔH − TΔS = ${H} − ${T}(${Sv}/1000) = <b>${f(H - T * Sv / 1000)} kJ mol⁻¹</b>.`]);
gen(C, [[2, 1, 6], [1, 2, 5], [5, 1, 3], [3, 4, 8]], (P, V1, V2) => [
  `A gas expands against a constant external pressure of ${P} bar from ${V1} L to ${V2} L. The work done is (1 L bar = 100 J)`,
  -P * (V2 - V1) * 100, 'J', [P * (V2 - V1) * 100, -P * (V2 - V1), -P * V2 * 100],
  `w = −p<sub>ex</sub>ΔV = −${P} × (${V2} − ${V1}) L bar = ${-P * (V2 - V1)} L bar = <b>${f(-P * (V2 - V1) * 100)} J</b> (negative: work done by the system).`]);
mcs(C, [
  ['Which of the following is an intensive property?', 'Temperature', 'Volume', 'Enthalpy', 'Mass', 'An intensive property does not depend on the amount of matter: <b>temperature</b>.'],
  ['Which of the following is a state function?', 'Enthalpy', 'Heat', 'Work', 'Heat at constant pressure path', 'State functions depend only on the state, not the path: <b>enthalpy</b> (also U, S, G).'],
  ['For an isolated system, the condition for a spontaneous process is', 'ΔS > 0', 'ΔS < 0', 'ΔH > 0', 'ΔG > 0', 'In an isolated system there is no energy exchange; entropy must increase.'],
  ['A reaction with ΔH < 0 and ΔS > 0 is', 'spontaneous at all temperatures', 'non-spontaneous at all temperatures', 'spontaneous only at high temperature', 'spontaneous only at low temperature', 'ΔG = ΔH − TΔS is negative for every T.'],
  ['A reaction with ΔH > 0 and ΔS > 0 is spontaneous', 'at high temperatures', 'at low temperatures', 'at all temperatures', 'at no temperature', 'ΔG < 0 when TΔS > ΔH, i.e. at <b>high T</b>.'],
  ['The relation between ΔG° and the equilibrium constant K is', 'ΔG° = −2.303 RT log K', 'ΔG° = 2.303 RT log K', 'ΔG° = −RT/K', 'ΔG° = RT ln K', '<b>ΔG° = −RT ln K = −2.303 RT log K</b>.'],
  ['The standard enthalpy of formation of an element in its standard state is', 'zero', 'positive', 'negative', 'equal to its bond enthalpy', 'By convention ΔfH° of an element in its most stable form is <b>0</b>.'],
  ['In which process does entropy decrease?', 'Freezing of water', 'Melting of ice', 'Evaporation of water', 'Dissolving sugar in water', 'A liquid turning into an ordered solid lowers the entropy.'],
  ['The first law of thermodynamics for a closed system is', 'ΔU = q + w', 'ΔU = q − w (w = work done on system)', 'ΔH = q + w', 'ΔG = ΔH − TΔS', 'With w the work done <b>on</b> the system (chemistry convention), <b>ΔU = q + w</b>.'],
  ['C<sub>p</sub> − C<sub>v</sub> for one mole of an ideal gas is', 'R', '2R', '0', 'R/2', '<b>C<sub>p</sub> − C<sub>v</sub> = R</b>.'],
  ['The enthalpy of neutralisation of a strong acid by a strong base is about', '−57 kJ mol⁻¹', '+57 kJ mol⁻¹', '−13.7 kJ mol⁻¹', '0', 'It is the enthalpy of H⁺ + OH⁻ → H₂O, about <b>−57 kJ mol⁻¹</b>.', 'medium'],
  ['In a reversible isothermal expansion of an ideal gas, ΔU is', 'zero', 'positive', 'negative', 'equal to q', 'U of an ideal gas depends only on T: ΔU = 0 at constant temperature.']
]);
st(C, [
  'Internal energy is an extensive property.',
  'For an isolated system ΔU = 0.',
  'At equilibrium ΔG = 0.',
  'Entropy of a perfectly crystalline substance at 0 K is taken as zero.',
  'Heat absorbed at constant pressure equals ΔH.'
], [
  ['Heat and work are state functions.', 'they are path functions.'],
  ['All exothermic reactions are spontaneous.', 'spontaneity depends on ΔG; some exothermic reactions with large negative ΔS are not spontaneous at high T.'],
  ['ΔH and ΔU are always equal.', 'they differ by Δn<sub>g</sub>RT; they are equal only when Δn<sub>g</sub> = 0 (for gases).'],
  ['Temperature is an extensive property.', 'temperature is intensive.'],
  ['Entropy decreases when a solid dissolves in a liquid.', 'dissolution usually increases the entropy.']
], { correct: 3, incorrect: 3, two: 4, count: 3 });

/* ---------- 6. Equilibrium ---------- */
C = 'Equilibrium';
gen(C, [['HCl', 0.01, 1], ['HCl', 0.001, 1], ['HNO₃', 0.0001, 1], ['H₂SO₄ (fully ionised)', 0.005, 2], ['H₂SO₄ (fully ionised)', 0.0005, 2]], (a, c, k) => [
  `The pH of a ${c} M solution of ${a} is`, -lg(c * k), '', [-lg(c), 14 + lg(c * k), -lg(c * k) + 1].filter(x => Math.abs(x + lg(c * k)) > 1e-9),
  `[H⁺] = ${k > 1 ? k + ' × ' : ''}${c} = ${f(c * k)} M; pH = −log[H⁺] = <b>${f(-lg(c * k))}</b>.`, 'easy']);
gen(C, [['NaOH', 0.01, 1], ['KOH', 0.001, 1], ['Ba(OH)₂', 0.005, 2], ['NaOH', 0.1, 1]], (b, c, k) => [
  `The pH of a ${c} M solution of ${b} at 298 K is`, 14 + lg(c * k), '', [-lg(c * k), 14 + lg(c), 14 + lg(c * k) - 1].filter(x => Math.abs(x - 14 - lg(c * k)) > 1e-9),
  `[OH⁻] = ${f(c * k)} M; pOH = ${f(-lg(c * k))}; pH = 14 − pOH = <b>${f(14 + lg(c * k))}</b>.`]);
gen(C, [[0.1, 1e-5], [0.01, 1e-6], [0.1, 1e-7], [1, 1e-4], [0.01, 1e-4]], (c, Ka) => [
  `The pH of a ${c} M solution of a weak monobasic acid (K<sub>a</sub> = ${f(Ka)}) is`, -lg(sq(Ka * c)), '', [-lg(Ka * c), -lg(c), -lg(sq(Ka / c))],
  `[H⁺] = √(K<sub>a</sub>C) = √(${f(Ka)} × ${c}) = ${f(sq(Ka * c))} M; pH = <b>${f(-lg(sq(Ka * c)))}</b>.`]);
gen(C, [[4.76, 10], [4.76, 1], [4.76, 0.1], [3.75, 10], [9.25, 1]], (pKa, r) => [
  `A buffer contains a weak acid (pK<sub>a</sub> = ${pKa}) and its sodium salt in the molar ratio [salt]/[acid] = ${r}. Its pH is`, pKa + lg(r), '', [pKa - lg(r) === pKa + lg(r) ? pKa + 1 : pKa - lg(r), pKa * r === pKa + lg(r) ? pKa + 2 : 14 - pKa - lg(r), pKa + r],
  `Henderson equation: pH = pK<sub>a</sub> + log([salt]/[acid]) = ${pKa} + log ${r} = <b>${f(pKa + lg(r))}</b>.`]);
gen(C, [['AB', 1e-10], ['AB', 1.6e-9], ['AB₂', 4e-12], ['AB₂', 3.2e-11], ['AB₃', 2.7e-15]], (t, K) => {
  const s = t === 'AB' ? sq(K) : t === 'AB₂' ? Math.cbrt(K / 4) : Math.pow(K / 27, 0.25);
  return [`The solubility product of a sparingly soluble salt of type ${t} is ${f(K)}. Its molar solubility is`, s, 'mol L⁻¹', [sq(K), Math.cbrt(K), K / 2],
    `${t === 'AB' ? 'K<sub>sp</sub> = s²' : t === 'AB₂' ? 'K<sub>sp</sub> = s(2s)² = 4s³' : 'K<sub>sp</sub> = s(3s)³ = 27s⁴'} ⇒ s = <b>${f(s)} mol L⁻¹</b>.`];
});
gen(C, [[0.1, 1.8e-5], [0.01, 1e-6], [0.2, 2e-5], [0.05, 5e-7]], (c, Ka) => [
  `The degree of ionisation of a ${c} M weak acid with K<sub>a</sub> = ${f(Ka)} is`, sq(Ka / c), '', [Ka / c, sq(Ka * c), sq(c / Ka) / 1e4],
  `Ostwald's dilution law: α = √(K<sub>a</sub>/C) = √(${f(Ka)}/${c}) = <b>${f(sq(Ka / c))}</b>.`]);
mcs(C, [
  ['For the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g), K<sub>p</sub> = K<sub>c</sub>(RT)<sup>x</sup>, where x is', '−2', '2', '−1', '4', 'Δn<sub>g</sub> = 2 − (1 + 3) = <b>−2</b>.'],
  ['For the reaction PCl₅(g) ⇌ PCl₃(g) + Cl₂(g), K<sub>p</sub> = K<sub>c</sub>(RT)<sup>x</sup>, where x is', '1', '−1', '0', '2', 'Δn<sub>g</sub> = 2 − 1 = <b>1</b>.'],
  ['For H₂(g) + I₂(g) ⇌ 2HI(g), the relation between K<sub>p</sub> and K<sub>c</sub> is', 'K<sub>p</sub> = K<sub>c</sub>', 'K<sub>p</sub> > K<sub>c</sub> always', 'K<sub>p</sub> = K<sub>c</sub>RT', 'K<sub>p</sub> = K<sub>c</sub>/RT', 'Δn<sub>g</sub> = 0, so <b>K<sub>p</sub> = K<sub>c</sub></b>.'],
  ['The equilibrium constant of a reaction is K. The equilibrium constant of the reverse reaction is', '1/K', 'K', '−K', 'K²', 'Reversing the reaction inverts K: <b>1/K</b>.'],
  ['The equilibrium constant for A ⇌ B is K. For 2A ⇌ 2B it is', 'K²', '2K', '√K', 'K/2', 'Multiplying the equation by 2 squares K: <b>K²</b>.'],
  ['The ionic product of water at 298 K is', '1.0 × 10<sup>−14</sup> mol² L<sup>−2</sup>', '1.0 × 10<sup>−7</sup> mol² L<sup>−2</sup>', '1.0 × 10<sup>14</sup> mol² L<sup>−2</sup>', '7', 'K<sub>w</sub> = [H⁺][OH⁻] = <b>1.0 × 10⁻¹⁴</b> at 298 K.'],
  ['The pH of a 10⁻⁸ M HCl solution is about', '6.98', '8', '7', '6', 'The H⁺ from water (10⁻⁷ M) cannot be neglected: [H⁺] ≈ 1.05 × 10⁻⁷ M, pH ≈ <b>6.98</b> (an acid solution can never have pH > 7).', 'medium'],
  ['Adding NH₄Cl to a solution of NH₄OH', 'suppresses the ionisation of NH₄OH (common-ion effect)', 'increases the ionisation of NH₄OH', 'has no effect', 'makes the solution strongly basic', 'NH₄⁺ is a common ion; the equilibrium NH₄OH ⇌ NH₄⁺ + OH⁻ shifts left.'],
  ['For N₂ + 3H₂ ⇌ 2NH₃ (ΔH < 0), the yield of ammonia increases on', 'increasing pressure and lowering temperature', 'decreasing pressure', 'increasing temperature', 'adding a catalyst', 'Le Chatelier: fewer gas moles on the right favour high pressure; exothermic forward reaction favours low temperature. A catalyst does not change the yield.'],
  ['A catalyst added to a system at equilibrium', 'does not change the equilibrium composition', 'shifts the equilibrium forward', 'shifts it backward', 'changes K', 'A catalyst speeds up forward and backward reactions equally; equilibrium is reached faster but K is unchanged.'],
  ['According to the Lewis concept, an acid is', 'an electron-pair acceptor', 'an electron-pair donor', 'a proton donor', 'a hydroxide-ion donor', 'Lewis acid = <b>electron-pair acceptor</b> (e.g. BF₃, AlCl₃).'],
  ['Which of the following is a Lewis acid?', 'BF₃', 'NH₃', 'OH⁻', 'H₂O', 'BF₃ has an empty orbital on boron and accepts an electron pair.'],
  ['An aqueous solution of sodium acetate is', 'basic', 'acidic', 'neutral', 'amphoteric', 'Salt of a weak acid and a strong base: CH₃COO⁻ hydrolyses to give OH⁻, so the solution is <b>basic</b>.'],
  ['An aqueous solution of ammonium chloride is', 'acidic', 'basic', 'neutral', 'strongly basic', 'Salt of a strong acid and a weak base: NH₄⁺ hydrolyses to give H₃O⁺, so the solution is <b>acidic</b>.'],
  ['If the ionic product of a salt exceeds its K<sub>sp</sub>, then', 'the salt precipitates', 'more salt dissolves', 'nothing happens', 'K<sub>sp</sub> increases', 'Q > K<sub>sp</sub> means the solution is supersaturated: <b>precipitation</b> occurs.']
]);
pr(C, 'Acid', 'Its conjugate base', [['HCl', 'Cl⁻'], ['H₂O', 'OH⁻'], ['NH₄⁺', 'NH₃'], ['HCO₃⁻', 'CO₃²⁻'], ['H₂SO₄', 'HSO₄⁻'], ['H₃O⁺', 'H₂O']], { list: 2, right: 2, wrong: 2, direct: 3, ask: l => `The conjugate base of ${l} is` });
st(C, [
  'At equilibrium the rates of the forward and backward reactions are equal.',
  'The value of K depends on temperature.',
  'A strong acid has a weak conjugate base.',
  'pH + pOH = 14 for aqueous solutions at 298 K.',
  'Equilibrium can be reached from either direction.'
], [
  ['At equilibrium all reactions stop.', 'equilibrium is dynamic: forward and backward reactions continue at equal rates.'],
  ['Adding a catalyst increases the equilibrium constant.', 'a catalyst does not change K.'],
  ['The value of K<sub>w</sub> is 10⁻¹⁴ at all temperatures.', 'K<sub>w</sub> increases with temperature; 10⁻¹⁴ is its value at 298 K.'],
  ['A buffer solution has a fixed pH that never changes on adding acid or base.', 'a buffer resists change in pH; the pH changes only slightly.'],
  ['Solubility of AgCl increases on adding NaCl.', 'the common ion Cl⁻ decreases the solubility of AgCl.']
], { correct: 3, incorrect: 3, two: 4, count: 3 });
ar(C, [
  ['The pH of a 10⁻⁸ M HCl solution is less than 7.', 'The H⁺ ions from the ionisation of water must also be taken into account in very dilute acid.', 0, 'Both true; R explains why pH is about 6.98, not 8.'],
  ['Increasing pressure favours the formation of ammonia in the Haber process.', 'The forward reaction is accompanied by a decrease in the number of moles of gas.', 0, 'Le Chatelier: higher pressure shifts equilibrium to fewer moles of gas.'],
  ['A catalyst increases the yield of a reversible reaction.', 'A catalyst lowers the activation energy of both forward and backward reactions.', 3, 'A is false (yield is unchanged); R is true.']
]);

/* ---------- 7. Redox Reactions ---------- */
C = 'Redox Reactions';
mcs(C, [
  ['The oxidation number of Cr in K₂Cr₂O₇ is', '+6', '+7', '+3', '+12', '2(+1) + 2x + 7(−2) = 0 ⇒ x = <b>+6</b>.'],
  ['The oxidation number of Mn in KMnO₄ is', '+7', '+6', '+5', '+4', '+1 + x + 4(−2) = 0 ⇒ x = <b>+7</b>.'],
  ['The oxidation number of S in H₂SO₄ is', '+6', '+4', '+2', '−2', '2(+1) + x + 4(−2) = 0 ⇒ <b>+6</b>.'],
  ['The oxidation number of S in Na₂S₂O₃ is', '+2', '+4', '+6', '+3', '2(+1) + 2x + 3(−2) = 0 ⇒ x = <b>+2</b> (average).', 'medium'],
  ['The oxidation number of N in NH₃ is', '−3', '+3', '0', '+5', 'x + 3(+1) = 0 ⇒ <b>−3</b>.'],
  ['The oxidation number of N in HNO₃ is', '+5', '+3', '+4', '−3', '+1 + x + 3(−2) = 0 ⇒ <b>+5</b>.'],
  ['The oxidation number of P in H₃PO₄ is', '+5', '+3', '+4', '−3', '3(+1) + x + 4(−2) = 0 ⇒ <b>+5</b>.'],
  ['The oxidation number of Cl in HClO₄ is', '+7', '+5', '+1', '−1', '+1 + x + 4(−2) = 0 ⇒ <b>+7</b>.'],
  ['The oxidation number of oxygen in OF₂ is', '+2', '−2', '−1', '+1', 'F is always −1: x + 2(−1) = 0 ⇒ <b>+2</b>.', 'medium'],
  ['The oxidation number of oxygen in H₂O₂ is', '−1', '−2', '0', '+1', 'Peroxide: 2(+1) + 2x = 0 ⇒ <b>−1</b>.'],
  ['The average oxidation number of Fe in Fe₃O₄ is', '+8/3', '+2', '+3', '+4', '3x + 4(−2) = 0 ⇒ x = <b>+8/3</b> (Fe₃O₄ = FeO·Fe₂O₃).', 'medium'],
  ['The oxidation number of S in the tetrathionate ion S₄O₆²⁻ is (average)', '+2.5', '+2', '+3', '+6', '4x + 6(−2) = −2 ⇒ x = <b>+2.5</b>.', 'medium'],
  ['The oxidation number of carbon in HCHO (formaldehyde) is', '0', '+2', '−2', '+4', '2(+1) + x + (−2) = 0 ⇒ <b>0</b>.', 'medium'],
  ['The oxidation number of hydrogen in NaH is', '−1', '+1', '0', '−2', 'In metal hydrides hydrogen is <b>−1</b>.'],
  ['In acidic medium, the number of moles of Fe²⁺ oxidised by one mole of MnO₄⁻ is', '5', '3', '2', '6', 'Mn goes from +7 to +2 (gains 5 e⁻); each Fe²⁺ loses 1 e⁻ ⇒ <b>5</b>.', 'medium'],
  ['In acidic medium, one mole of Cr₂O₇²⁻ oxidises how many moles of Fe²⁺?', '6', '3', '5', '2', 'Each Cr: +6 → +3 (3 e⁻), two Cr ⇒ 6 e⁻ ⇒ <b>6 Fe²⁺</b>.', 'medium'],
  ['In the reaction Zn + Cu²⁺ → Zn²⁺ + Cu, the reducing agent is', 'Zn', 'Cu²⁺', 'Zn²⁺', 'Cu', 'Zn loses electrons (is oxidised) and so reduces Cu²⁺: <b>Zn</b> is the reducing agent.'],
  ['Oxidation is', 'loss of electrons (increase in oxidation number)', 'gain of electrons', 'decrease in oxidation number', 'gain of hydrogen', 'In the electronic concept, <b>oxidation = loss of electrons</b>.'],
  ['Which of the following is a disproportionation reaction?', '2H₂O₂ → 2H₂O + O₂', 'Zn + 2HCl → ZnCl₂ + H₂', 'C + O₂ → CO₂', 'CaCO₃ → CaO + CO₂', 'O in H₂O₂ (−1) goes both to −2 (H₂O) and 0 (O₂): the same element is oxidised and reduced.', 'medium'],
  ['Which of the following is a decomposition redox reaction?', '2KClO₃ → 2KCl + 3O₂', 'NaOH + HCl → NaCl + H₂O', 'AgNO₃ + NaCl → AgCl + NaNO₃', 'CaO + H₂O → Ca(OH)₂', 'Cl: +5 → −1 and O: −2 → 0, so it is a redox decomposition.', 'medium'],
  ['The strongest oxidising agent among the halogens is', 'F₂', 'Cl₂', 'Br₂', 'I₂', 'F₂ has the highest standard reduction potential (+2.87 V).'],
  ['A substance that can act both as an oxidising and a reducing agent is', 'H₂O₂', 'KMnO₄', 'F₂', 'Na', 'In H₂O₂ oxygen is −1, between −2 and 0, so it can be reduced or oxidised.'],
  ['In the Daniell cell, the anode is', 'zinc', 'copper', 'the salt bridge', 'the copper sulphate solution', 'Oxidation (Zn → Zn²⁺) takes place at the zinc anode.'],
  ['The function of a salt bridge is to', 'complete the circuit and keep the solutions electrically neutral', 'allow the two solutions to mix', 'supply electrons', 'act as a catalyst', 'Ions move through the salt bridge, keeping both half-cells neutral.']
]);
st(C, [
  'Oxidation and reduction always occur together.',
  'Fluorine shows only the −1 oxidation state in its compounds.',
  'The oxidation number of an element in its free state is zero.',
  'In a galvanic cell, oxidation takes place at the anode.',
  'A more negative standard electrode potential means a stronger reducing agent.'
], [
  ['Oxygen always has an oxidation number of −2.', 'it is −1 in peroxides, −½ in superoxides and +2 in OF₂.'],
  ['The oxidation number of hydrogen is always +1.', 'it is −1 in metal hydrides such as NaH.'],
  ['Reduction means loss of electrons.', 'reduction is gain of electrons.'],
  ['An oxidising agent is itself oxidised in a reaction.', 'the oxidising agent is reduced.'],
  ['Oxidation numbers can only be whole numbers.', 'average oxidation numbers can be fractional, e.g. +8/3 for Fe in Fe₃O₄.']
], { correct: 3, incorrect: 3, two: 4, count: 3 });

/* ---------- 8. Organic Chemistry – Some Basic Principles and Techniques ---------- */
C = 'Organic Chemistry – Some Basic Principles and Techniques';
mcs(C, [
  ['The IUPAC name of CH₃–CH(CH₃)–CH₂–CH₃ is', '2-methylbutane', '3-methylbutane', 'pentane', '2-ethylpropane', 'Longest chain = 4 C (butane), methyl on C-2 (lowest locant): <b>2-methylbutane</b>.'],
  ['The IUPAC name of (CH₃)₃C–CH₂–CH₃ is', '2,2-dimethylbutane', '3,3-dimethylbutane', '2-ethyl-2-methylpropane', 'hexane', 'Longest chain 4 C, two methyls on C-2: <b>2,2-dimethylbutane</b>.'],
  ['The IUPAC name of CH₃–CH=CH–CH₃ is', 'but-2-ene', 'but-1-ene', 'butane', 'but-3-ene', 'Four carbons with a double bond starting at C-2: <b>but-2-ene</b>.'],
  ['The IUPAC name of CH≡C–CH₂–CH₃ is', 'but-1-yne', 'but-2-yne', 'but-3-yne', 'butene', 'Triple bond from C-1: <b>but-1-yne</b>.'],
  ['The IUPAC name of CH₃CH₂CHO is', 'propanal', 'propanone', 'propan-1-ol', 'propanoic acid', 'Three-carbon aldehyde: <b>propanal</b>.'],
  ['The IUPAC name of CH₃COCH₂CH₃ is', 'butan-2-one', 'butanal', 'butan-3-one', 'ethyl methyl ether', 'Ketone C=O on C-2 of a four-carbon chain: <b>butan-2-one</b>.'],
  ['The IUPAC name of CH₃CH(OH)CH₃ is', 'propan-2-ol', 'propan-1-ol', 'isopropanol-1', 'propanone', 'OH on C-2 of propane: <b>propan-2-ol</b>.'],
  ['The IUPAC name of CH₂=CH–CHO is', 'prop-2-enal', 'prop-1-enal', 'propenone', 'acrolein-1', 'The CHO carbon is C-1; double bond from C-2: <b>prop-2-enal</b>.', 'medium'],
  ['The IUPAC name of CH₃COOCH₂CH₃ is', 'ethyl ethanoate', 'methyl propanoate', 'ethyl methanoate', 'propyl ethanoate', 'Ester of ethanoic acid and ethanol: <b>ethyl ethanoate</b>.'],
  ['The IUPAC name of CH₃–CH(CH₃)–CH(CH₃)–CH₃ is', '2,3-dimethylbutane', '2,2-dimethylbutane', '2-isopropylpropane', '3-methylpentane', 'Butane chain with methyls on C-2 and C-3: <b>2,3-dimethylbutane</b>.'],
  ['The most stable carbocation among the following is', '(CH₃)₃C⁺', 'CH₃⁺', 'CH₃CH₂⁺', '(CH₃)₂CH⁺', 'Tertiary carbocations are stabilised most by +I effect and hyperconjugation.'],
  ['The order of stability of carbanions is', 'CH₃⁻ > 1° > 2° > 3°', '3° > 2° > 1° > CH₃⁻', '2° > 3° > 1° > CH₃⁻', '1° > CH₃⁻ > 2° > 3°', 'Alkyl groups (+I) destabilise a negative charge, so the order is the reverse of carbocations.', 'medium'],
  ['Which of the following is an electrophile?', 'NO₂⁺', 'OH⁻', 'NH₃', 'CN⁻', 'An electrophile is electron-seeking; the nitronium ion NO₂⁺ is electron deficient.'],
  ['Which of the following is a nucleophile?', 'CN⁻', 'BF₃', 'NO₂⁺', 'AlCl₃', 'A nucleophile donates an electron pair: <b>CN⁻</b>.'],
  ['Homolytic cleavage of a covalent bond produces', 'free radicals', 'carbocations', 'carbanions', 'ions of opposite charge', 'Each atom keeps one electron of the bond pair: <b>free radicals</b>.'],
  ['The hyperconjugation effect involves delocalisation of', 'σ electrons of a C–H bond into an adjacent empty p orbital or π system', 'π electrons only', 'lone pairs only', 'electrons of a C–C triple bond', 'It is a "no-bond resonance" of C–H σ electrons with an adjacent p orbital or π bond.'],
  ['CH₃OCH₃ and CH₃CH₂OH are', 'functional group isomers', 'chain isomers', 'position isomers', 'metamers', 'Same formula C₂H₆O, different functional groups (ether and alcohol).'],
  ['In Lassaigne\'s test, nitrogen in an organic compound is detected by the formation of', 'Prussian blue colour', 'a violet colour with sodium nitroprusside', 'a white precipitate with AgNO₃', 'a blood-red colour only', 'NaCN formed in the fusion gives ferric ferrocyanide, <b>Prussian blue</b>.'],
  ['The technique best suited to purify camphor (which sublimes) from a non-volatile impurity is', 'sublimation', 'crystallisation', 'steam distillation', 'chromatography', 'Camphor passes directly from solid to vapour on heating: <b>sublimation</b>.'],
  ['The –NO₂ group attached to a carbon chain shows', '−I and −R effects', '+I and +R effects', '+I effect only', '−I and +R effects', 'The nitro group withdraws electrons by both inductive and resonance effects.'],
  ['The –OH group attached to a benzene ring shows', '+R effect (stronger) and −I effect', '−R and −I effects', '+I effect only', 'no electronic effect', 'Oxygen\'s lone pair donates into the ring (+R) although O is electronegative (−I).', 'medium'],
  ['The hybridisation of the carbon atoms in CH₂=C=CH₂ (allene), from left to right, is', 'sp², sp, sp²', 'sp, sp², sp', 'sp², sp², sp²', 'sp³, sp, sp³', 'Terminal carbons form one double bond each (sp²); the central carbon forms two double bonds (sp).', 'medium']
]);
gen(C, [[0.5, 10, 1], [0.25, 20, 0.5], [1, 25, 0.5], [0.4, 12, 0.5]], (m, V, M) => [
  `In Kjeldahl's method, the ammonia from ${m} g of an organic compound neutralised ${V} mL of ${M} M H₂SO₄. The percentage of nitrogen in the compound is`,
  1.4 * 2 * M * V / m, '%', [1.4 * M * V / m, 1.4 * 2 * M * V / m / 2 + 5, 14 * M * V / m],
  `H₂SO₄ is dibasic, so moles of NH₃ = 2 × ${M} × ${V}/1000. %N = 1.4 × (2 × ${M}) × ${V}/${m} = <b>${f(1.4 * 2 * M * V / m)}%</b>.`]);
gen(C, [[0.15, 0.12], [0.2, 0.3], [0.25, 0.4], [0.1, 0.2]], (m, w) => [
  `In the Carius method, ${m} g of an organic compound gave ${w} g of AgBr. The percentage of bromine in the compound is (Ag = 108, Br = 80)`,
  80 / 188 * w / m * 100, '%', [w / m * 100, 108 / 188 * w / m * 100, 80 / 143.5 * w / m * 100],
  `%Br = (80/188) × (${w}/${m}) × 100 = <b>${f(80 / 188 * w / m * 100)}%</b>.`]);
pr(C, 'Mixture / need', 'Method of purification', [
  ['Separating the components of crude petroleum', 'fractional distillation'], ['Separating aniline–water mixture', 'steam distillation'],
  ['Separating plant pigments in small amounts', 'chromatography'], ['Purifying naphthalene from non-volatile impurities', 'sublimation'],
  ['Extracting an organic compound from its aqueous solution with an immiscible solvent', 'differential extraction']
], { list: 2, right: 2, wrong: 2, direct: 3, ask: l => `${l} is done by` });
st(C, [
  'Carbocations are sp² hybridised and planar.',
  'Tertiary free radicals are more stable than primary free radicals.',
  'Resonance structures differ only in the position of electrons.',
  'The inductive effect is a permanent effect transmitted through σ bonds.',
  'Electromeric effect is a temporary effect that operates in the presence of an attacking reagent.'
], [
  ['Carbanions are electron-deficient species.', 'carbanions carry a negative charge and are electron-rich; carbocations are electron deficient.'],
  ['Hyperconjugation involves π electrons of a C=C bond only.', 'it involves the σ electrons of C–H bonds adjacent to an unsaturated or electron-deficient carbon.'],
  ['Lassaigne\'s test detects nitrogen as a white precipitate of AgCN.', 'nitrogen is detected by the Prussian blue colour.'],
  ['Heterolytic cleavage gives free radicals.', 'heterolytic cleavage gives ions; homolytic cleavage gives free radicals.'],
  ['Chain isomers have different functional groups.', 'chain isomers differ in the carbon skeleton, not the functional group.']
], { correct: 3, incorrect: 3, two: 4, count: 3 });

/* ---------- 9. Hydrocarbons ---------- */
C = 'Hydrocarbons';
pr(C, 'Reaction / reagent', 'What it gives', [
  ['Wurtz reaction (alkyl halide + Na in dry ether)', 'a higher alkane with an even number of carbons'], ['Kolbe electrolysis of sodium carboxylate', 'an alkane at the anode'],
  ['Hydrogenation of an alkyne with Lindlar\'s catalyst', 'a cis-alkene'], ['Reduction of an alkyne with Na in liquid ammonia', 'a trans-alkene'],
  ['Ozonolysis of an alkene followed by Zn/H₂O', 'aldehydes and/or ketones'], ['Addition of HBr to propene in the presence of a peroxide', '1-bromopropane (anti-Markovnikov)'],
  ['Friedel–Crafts alkylation of benzene', 'an alkylbenzene'], ['Decarboxylation of sodium ethanoate with soda lime', 'methane']
], { list: 4, right: 3, wrong: 3, direct: 6, ask: l => `${l} gives` });
gen(C, [[1], [2], [3], [4], [5], [6]], n => [
  `The number of moles of O₂ needed for the complete combustion of one mole of the alkane C${n > 1 ? '<sub>' + n + '</sub>' : ''}H<sub>${2 * n + 2}</sub> is`,
  (3 * n + 1) / 2, 'mol', [n + (2 * n + 2) / 2, (3 * n + 1), (2 * n + 1) / 2],
  `C<sub>n</sub>H<sub>2n+2</sub> + (3n + 1)/2 O₂ → n CO₂ + (n + 1) H₂O. For n = ${n}: <b>${f((3 * n + 1) / 2)} mol</b>.`]);
mcs(C, [
  ['The number of structural isomers of C₅H₁₂ is', '3', '2', '4', '5', 'Pentane, 2-methylbutane and 2,2-dimethylpropane: <b>3</b>.'],
  ['The number of structural isomers of C₆H₁₄ is', '5', '4', '6', '3', 'Hexane, 2-methylpentane, 3-methylpentane, 2,2-dimethylbutane and 2,3-dimethylbutane: <b>5</b>.', 'medium'],
  ['The most stable conformation of ethane is', 'staggered', 'eclipsed', 'skew', 'chair', 'In the staggered form the C–H bonds are farthest apart: minimum torsional strain.'],
  ['Addition of HBr to propene (no peroxide) gives mainly', '2-bromopropane', '1-bromopropane', '1,2-dibromopropane', 'propane', 'Markovnikov\'s rule: Br goes to the carbon with fewer hydrogens (via the more stable 2° carbocation).'],
  ['The peroxide effect (anti-Markovnikov addition) is shown only by', 'HBr', 'HCl', 'HI', 'HF', 'Only HBr adds by a free-radical mechanism in the presence of peroxide.'],
  ['Ethyne on passing through a red-hot iron tube at 873 K gives', 'benzene', 'ethene', 'ethane', 'cyclohexane', 'Cyclic polymerisation (trimerisation) of three ethyne molecules gives <b>benzene</b>.'],
  ['Hydration of ethyne with dilute H₂SO₄ and HgSO₄ gives', 'ethanal', 'ethanol', 'ethanoic acid', 'propanone', 'Vinyl alcohol forms first and tautomerises to <b>ethanal (acetaldehyde)</b>.', 'medium'],
  ['Ozonolysis of but-2-ene gives', 'two molecules of ethanal', 'propanal and methanal', 'one molecule of butanal', 'propanone and methanal', 'The C=C between C-2 and C-3 breaks; each half becomes CH₃CHO.', 'medium'],
  ['Which of the following is aromatic according to Hückel\'s rule?', 'Benzene (6 π electrons)', 'Cyclobutadiene (4 π electrons)', 'Cyclooctatetraene (8 π electrons)', 'Cyclohexane', 'A planar, cyclic, conjugated system with (4n + 2) π electrons; benzene has 6 (n = 1).'],
  ['Which group is meta-directing in electrophilic substitution of benzene?', '–NO₂', '–OH', '–CH₃', '–NH₂', '–NO₂ withdraws electrons from the ortho and para positions, leaving meta as the site of attack.'],
  ['Which group is ortho/para-directing but deactivating?', '–Cl', '–NO₂', '–OH', '–CH₃', 'Halogens withdraw electrons (−I, deactivating) but donate by resonance (+R, o/p-directing).', 'medium'],
  ['Ethyne is more acidic than ethene and ethane because', 'its carbon is sp hybridised with more s-character', 'it has more hydrogen atoms', 'it is a gas', 'it has a triple bond that is weak', 'More s-character holds the electron pair of the C–H bond closer to carbon, so H⁺ leaves more easily.'],
  ['Which alkene shows geometrical (cis–trans) isomerism?', 'But-2-ene', 'But-1-ene', 'Propene', '2-Methylpropene', 'Each doubly bonded carbon of but-2-ene carries two different groups (H and CH₃).'],
  ['Benzene reacts with Cl₂ in the presence of anhydrous FeCl₃ (dark, cold) to give', 'chlorobenzene', 'benzene hexachloride', 'chlorocyclohexane', 'toluene', 'Electrophilic substitution: <b>chlorobenzene</b>. (In sunlight, addition gives benzene hexachloride.)'],
  ['The electrophile in the nitration of benzene is', 'NO₂⁺', 'NO₂⁻', 'NO₃⁻', 'HNO₃', 'Concentrated H₂SO₄ protonates HNO₃ to give the nitronium ion <b>NO₂⁺</b>.'],
  ['Baeyer\'s reagent (cold dilute alkaline KMnO₄) is used to test for', 'unsaturation (C=C or C≡C)', 'aromatic rings', 'alkanes', 'alcohols', 'Its purple colour is discharged by alkenes and alkynes.'],
  ['The Wurtz reaction of a mixture of CH₃Br and C₂H₅Br with sodium gives', 'a mixture of ethane, propane and butane', 'only propane', 'only butane', 'only ethane', 'Two different alkyl halides couple in all combinations, so a mixture forms.', 'medium'],
  ['Propyne on hydration (HgSO₄/H₂SO₄) gives', 'propanone', 'propanal', 'propan-1-ol', 'propanoic acid', 'Markovnikov addition of water followed by tautomerism gives the ketone <b>propanone</b>.', 'medium']
]);
st(C, [
  'Alkanes are generally unreactive towards acids, bases and oxidising agents under ordinary conditions.',
  'Benzene undergoes electrophilic substitution rather than addition reactions.',
  'The staggered conformation of ethane is more stable than the eclipsed one.',
  'Terminal alkynes react with sodium to form sodium alkynides.',
  'Boiling point of alkanes decreases with branching.'
], [
  ['Kharasch (peroxide) effect is shown by HCl.', 'it is shown only by HBr.'],
  ['Cyclooctatetraene is aromatic.', 'it has 8 π electrons and is non-planar, so it is not aromatic.'],
  ['Alkynes are less acidic than alkanes.', 'terminal alkynes are more acidic because of sp hybridisation.'],
  ['Lindlar\'s catalyst reduces alkynes to trans-alkenes.', 'Lindlar\'s catalyst gives cis-alkenes; Na in liquid NH₃ gives trans-alkenes.'],
  ['The eclipsed and staggered forms of ethane are different compounds that can be separated.', 'they are conformations that interconvert freely at room temperature.']
], { correct: 3, incorrect: 3, two: 4, count: 3 });
})();

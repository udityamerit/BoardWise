/* NEET (UG) Zoology question bank — NCERT Class XI Biology (rationalised syllabus), 9 Zoology chapters. Original questions. */
(function () {
const NL = window.NL, S = 'zoo', f = NL.f;
const mcs = (ch, l) => NL.mcs(S, ch, l), ar = (ch, l) => NL.ar(S, ch, l), gen = (ch, rows, fn) => NL.gen(S, ch, rows, fn);
const P = (ch, h1, h2, rows, ask, k, dmax) => NL.pairs(S, ch, h1, h2, rows, { list: k == null ? 3 : k, right: k == null ? 3 : k, wrong: k == null ? 3 : k, direct: Math.min(rows.length, dmax || 99), ask });
const D = (ch, rows, pool, ask) => NL.add(S, ch, rows.map(([l, r]) => NL.mc(ask(l), r, pool.filter(x => x !== r).slice(0, 3), `${l} — <b>${r}</b>.`, 'easy')));
const ST = (ch, T, F) => NL.stmts(S, ch, T, F, { correct: 4, incorrect: 4, two: 4, count: 4 });

/* ---------- 1. Animal Kingdom ---------- */
let C = 'Animal Kingdom';
P(C, 'Distinctive feature', 'Phylum', [
  ['Canal system and collar cells (choanocytes)', 'Porifera'], ['Cnidoblasts (stinging cells)', 'Cnidaria (Coelenterata)'], ['Eight external rows of ciliated comb plates', 'Ctenophora'],
  ['Flame cells for osmoregulation and excretion', 'Platyhelminthes'], ['Pseudocoelom; body circular in cross-section', 'Aschelminthes'], ['Metameric segmentation with nephridia', 'Annelida'],
  ['Jointed appendages and chitinous exoskeleton', 'Arthropoda'], ['Rasping organ (radula) in the mouth', 'Mollusca'], ['Water vascular system', 'Echinodermata'], ['Body divided into proboscis, collar and trunk', 'Hemichordata']
], l => `"${l}" is characteristic of the phylum`);
P(C, 'Animal', 'Phylum', [
  ['<i>Sycon</i>', 'Porifera'], ['<i>Spongilla</i>', 'Porifera'], ['<i>Physalia</i>', 'Cnidaria (Coelenterata)'], ['<i>Adamsia</i>', 'Cnidaria (Coelenterata)'], ['<i>Pleurobrachia</i>', 'Ctenophora'], ['<i>Ctenoplana</i>', 'Ctenophora'],
  ['<i>Taenia</i>', 'Platyhelminthes'], ['<i>Fasciola</i>', 'Platyhelminthes'], ['<i>Ascaris</i>', 'Aschelminthes'], ['<i>Wuchereria</i>', 'Aschelminthes'], ['<i>Nereis</i>', 'Annelida'], ['<i>Hirudinaria</i>', 'Annelida'],
  ['<i>Limulus</i>', 'Arthropoda'], ['<i>Laccifer</i>', 'Arthropoda'], ['<i>Pila</i>', 'Mollusca'], ['<i>Octopus</i>', 'Mollusca'], ['<i>Asterias</i>', 'Echinodermata'], ['<i>Antedon</i>', 'Echinodermata'], ['<i>Balanoglossus</i>', 'Hemichordata']
], l => `${l} belongs to the phylum`, 3, 12);
P(C, 'Animal', 'Common name', [
  ['<i>Pinctada</i>', 'pearl oyster'], ['<i>Sepia</i>', 'cuttlefish'], ['<i>Loligo</i>', 'squid'], ['<i>Aplysia</i>', 'sea hare'], ['<i>Dentalium</i>', 'tusk shell'], ['<i>Chaetopleura</i>', 'chiton'],
  ['<i>Physalia</i>', 'Portuguese man-of-war'], ['<i>Pennatula</i>', 'sea pen'], ['<i>Gorgonia</i>', 'sea fan'], ['<i>Meandrina</i>', 'brain coral'], ['<i>Adamsia</i>', 'sea anemone'], ['<i>Euspongia</i>', 'bath sponge'],
  ['<i>Antedon</i>', 'sea lily'], ['<i>Cucumaria</i>', 'sea cucumber'], ['<i>Ophiura</i>', 'brittle star'], ['<i>Echinus</i>', 'sea urchin'], ['<i>Limulus</i>', 'king crab (living fossil)'], ['<i>Laccifer</i>', 'lac insect'],
  ['<i>Ancylostoma</i>', 'hookworm'], ['<i>Wuchereria</i>', 'filaria worm'], ['<i>Fasciola</i>', 'liver fluke'], ['<i>Taenia</i>', 'tapeworm'], ['<i>Hirudinaria</i>', 'blood-sucking leech'], ['<i>Bombyx</i>', 'silkworm']
], l => `The common name of ${l} is`, 2, 12);
P(C, 'Vertebrate', 'Common name', [
  ['<i>Petromyzon</i>', 'lamprey'], ['<i>Myxine</i>', 'hagfish'], ['<i>Scoliodon</i>', 'dog fish'], ['<i>Pristis</i>', 'saw fish'], ['<i>Carcharodon</i>', 'great white shark'], ['<i>Trygon</i>', 'sting ray'],
  ['<i>Torpedo</i>', 'electric ray'], ['<i>Exocoetus</i>', 'flying fish'], ['<i>Hippocampus</i>', 'sea horse'], ['<i>Labeo</i>', 'rohu'], ['<i>Clarias</i>', 'magur'], ['<i>Betta</i>', 'fighting fish'],
  ['<i>Pterophyllum</i>', 'angel fish'], ['<i>Ichthyophis</i>', 'limbless amphibian'], ['<i>Hyla</i>', 'tree frog'], ['<i>Salamandra</i>', 'salamander'], ['<i>Chelone</i>', 'turtle'], ['<i>Testudo</i>', 'tortoise'],
  ['<i>Calotes</i>', 'garden lizard'], ['<i>Hemidactylus</i>', 'wall lizard'], ['<i>Bungarus</i>', 'krait'], ['<i>Naja</i>', 'cobra'], ['<i>Neophron</i>', 'vulture'], ['<i>Aptenodytes</i>', 'penguin'],
  ['<i>Struthio</i>', 'ostrich'], ['<i>Psittacula</i>', 'parrot'], ['<i>Ornithorhynchus</i>', 'platypus'], ['<i>Macropus</i>', 'kangaroo'], ['<i>Pteropus</i>', 'flying fox'], ['<i>Balaenoptera</i>', 'blue whale']
], l => `${l} is commonly known as the`, 2, 14);
P(C, 'Class', 'Feature', [
  ['Cyclostomata', 'circular sucking mouth without jaws; ectoparasites on fishes'], ['Chondrichthyes', 'cartilaginous endoskeleton and placoid scales'],
  ['Osteichthyes', 'bony endoskeleton, operculum and air bladder'], ['Amphibia', 'moist skin without scales; a tympanum represents the ear'],
  ['Reptilia', 'dry cornified skin with epidermal scales or scutes'], ['Aves', 'feathers, beak and pneumatic bones'], ['Mammalia', 'mammary glands and hair on the skin']
], l => `A characteristic feature of class ${l} is`, 2);
mcs(C, [
  ['Animals in which the body cavity is not lined by mesoderm but mesoderm occurs as scattered pouches are called', 'pseudocoelomates', 'coelomates', 'acoelomates', 'diploblastic', 'e.g. Aschelminthes.'],
  ['Platyhelminthes are', 'acoelomate and triploblastic', 'coelomate', 'pseudocoelomate', 'diploblastic', 'Flatworms have no body cavity.'],
  ['Diploblastic animals include', 'coelenterates (cnidarians)', 'annelids', 'arthropods', 'chordates', 'They have ectoderm and endoderm with undifferentiated mesoglea in between.'],
  ['Radial symmetry is shown by', 'coelenterates, ctenophores and adult echinoderms', 'annelids and arthropods', 'flatworms', 'chordates', 'Adult echinoderms are radially symmetrical; larvae are bilaterally symmetrical.'],
  ['Bioluminescence (emission of light) is well marked in', 'ctenophores', 'sponges', 'flatworms', 'annelids', 'Ctenophores (sea walnuts, comb jellies) show bioluminescence.'],
  ['Metagenesis (alternation of generation between polyp and medusa) is seen in', '<i>Obelia</i>', '<i>Hydra</i>', '<i>Adamsia</i>', '<i>Pleurobrachia</i>', 'Polyps produce medusae asexually; medusae form polyps sexually.', 'medium'],
  ['Corals have a skeleton composed of', 'calcium carbonate', 'silica', 'chitin', 'spongin fibres only', 'Corals have calcareous skeletons.'],
  ['The largest phylum of Animalia, including insects, is', 'Arthropoda', 'Mollusca', 'Chordata', 'Annelida', 'Over two-thirds of all named species on earth are arthropods.'],
  ['The second largest animal phylum is', 'Mollusca', 'Arthropoda', 'Annelida', 'Echinodermata', 'Molluscs are the second largest phylum.'],
  ['The excretory organs of insects are', 'Malpighian tubules', 'nephridia', 'flame cells', 'green glands', 'Malpighian tubules help in excretion in arthropods (insects).'],
  ['In the phylum Echinodermata, the digestive system is complete with mouth on the', 'lower (ventral) side and anus on the upper (dorsal) side', 'upper side', 'side', 'posterior end', 'The mouth is ventral and the anus dorsal.'],
  ['Notochord is present only in the larval tail in', 'Urochordata', 'Cephalochordata', 'Vertebrata', 'Hemichordata', 'In Cephalochordata it extends from head to tail and persists throughout life.'],
  ['All vertebrates are chordates but all chordates are not vertebrates because', 'in vertebrates the notochord is replaced by a vertebral column in the adult', 'vertebrates lack a notochord at all stages', 'chordates lack a nerve cord', 'invertebrates have a backbone', 'Some chordates (urochordates, cephalochordates) never develop a vertebral column.'],
  ['The heart of fishes is', 'two-chambered (one auricle, one ventricle)', 'three-chambered', 'four-chambered', 'absent', 'Fishes have a two-chambered heart.'],
  ['The animal with a four-chambered heart among reptiles is', 'crocodile', 'lizard', 'snake', 'tortoise', 'Reptiles generally have an incompletely four-chambered heart; crocodiles have four chambers.'],
  ['Air sacs connected to lungs supplement respiration in', 'birds', 'mammals', 'reptiles', 'amphibians', 'Birds have air sacs; their bones are hollow (pneumatic).'],
  ['Egg-laying mammals include', '<i>Ornithorhynchus</i> (platypus)', '<i>Macropus</i>', '<i>Pteropus</i>', '<i>Delphinus</i>', 'Monotremes like the platypus are oviparous.'],
  ['Which fish has an electric organ capable of giving a strong shock?', '<i>Torpedo</i>', '<i>Trygon</i>', '<i>Pristis</i>', '<i>Scoliodon</i>', '<i>Torpedo</i> has electric organs; <i>Trygon</i> has a poison sting.'],
  ['Cartilaginous fishes lack an air bladder, so they', 'have to swim constantly to avoid sinking', 'float without effort', 'cannot swim', 'live only at the surface', 'Without an air bladder, buoyancy needs constant swimming.'],
  ['Which of the following is a cold-blooded (poikilothermous) animal?', 'Frog', 'Pigeon', 'Dog', 'Whale', 'Fishes, amphibians and reptiles are poikilotherms; birds and mammals are homoiotherms.'],
  ['The body of sponges has the water-transport system called', 'canal system', 'water vascular system', 'haemocoel', 'ambulacral system', 'Water enters through ostia and leaves through the osculum.'],
  ['Fertilisation in sponges is', 'internal, with indirect development', 'external, with direct development', 'absent', 'internal with direct development', 'Sponges are hermaphrodites; fertilisation is internal and development has a larval stage.', 'medium'],
  ['Hookworm, roundworm and filarial worm belong to the phylum', 'Aschelminthes', 'Platyhelminthes', 'Annelida', 'Cnidaria', 'Roundworms are pseudocoelomate Aschelminthes.']
]);
ST(C, [
  'Sponges are mostly marine and asymmetrical.',
  'Arthropods have an open circulatory system.',
  'Molluscs have a soft body covered by a calcareous shell.',
  'Echinoderms have an endoskeleton of calcareous ossicles.',
  'Hemichordates were earlier considered a sub-phylum of Chordata.',
  'Birds and mammals are homoiothermous.',
  'Most mammals are viviparous.'
], [
  ['All cnidarians show both polyp and medusa forms.', 'some show only polyp forms (e.g. <i>Hydra</i>, <i>Adamsia</i>), some only medusae.'],
  ['Platyhelminthes have a true coelom.', 'flatworms are acoelomates.'],
  ['Annelids have an open circulatory system.', 'annelids have a closed circulatory system.'],
  ['The notochord is present in adult hemichordates.', 'hemichordates have a stomochord, not a true notochord.'],
  ['All reptiles have a four-chambered heart.', 'most reptiles have an incompletely four-chambered heart; only crocodiles have four chambers.'],
  ['Cartilaginous fishes have an air bladder.', 'cartilaginous fishes lack an air bladder; bony fishes have one.']
]);
ar(C, [
  ['Cartilaginous fishes have to swim constantly.', 'They do not have an air bladder.', 0, 'Without an air bladder they would sink.'],
  ['Birds have hollow (pneumatic) bones.', 'Pneumatic bones make the body light, an adaptation for flight.', 0, 'R explains A.']
]);

/* ---------- 2. Structural Organisation in Animals ---------- */
C = 'Structural Organisation in Animals';
P(C, 'Epithelium', 'Found in', [
  ['Simple squamous', 'walls of blood vessels and air sacs of lungs'], ['Simple cuboidal', 'ducts of glands and tubular parts of nephrons'], ['Simple columnar', 'lining of the stomach and intestine'],
  ['Ciliated epithelium', 'inner surface of bronchioles and fallopian tubes'], ['Compound epithelium', 'dry surface of the skin and moist surface of the buccal cavity and pharynx']
], l => `${l} epithelium is found in the`, 2);
P(C, 'Tissue / structure', 'Feature', [
  ['Tight junctions', 'stop substances from leaking across a tissue'], ['Adhering junctions', 'cement neighbouring cells together'], ['Gap junctions', 'connect the cytoplasm of adjoining cells for rapid transfer of ions and molecules'],
  ['Areolar tissue', 'loose connective tissue present beneath the skin'], ['Adipose tissue', 'loose connective tissue that stores fat, below the skin'], ['Tendons', 'dense regular tissue attaching skeletal muscles to bones'],
  ['Ligaments', 'dense regular tissue attaching one bone to another'], ['Cartilage', 'tissue at the tip of the nose, outer ear and between adjacent bones of the vertebral column'],
  ['Cardiac muscle', 'branched striated fibres joined by intercalated discs'], ['Neuroglia', 'cells that protect and support neurons and make up more than half the volume of neural tissue']
], l => `Which of the following describes ${l.toLowerCase()}?`);
P(C, 'Part of cockroach', 'Feature', [
  ['Hepatic (gastric) caecae', '6–8 blind tubules at the junction of foregut and midgut'], ['Malpighian tubules', '100–150 yellow filaments at the junction of midgut and hindgut that remove nitrogenous wastes'],
  ['Gizzard (proventriculus)', 'grinds food with six chitinous plates (teeth)'], ['Tegmina', 'opaque, dark leathery forewings arising from the mesothorax'],
  ['Anal styles', 'thread-like structures present only in males'], ['Mushroom-shaped gland', 'accessory reproductive gland in the 6th–7th abdominal segments of males'],
  ['Ootheca', 'dark reddish-black capsule containing fertilised eggs'], ['Spiracles', '10 pairs of small openings on the sides of the body for respiration'],
  ['Compound eye', 'about 2000 hexagonal ommatidia giving mosaic vision']
], l => `In the cockroach, ${l.toLowerCase()} is/are`);
mcs(C, [
  ['The epithelium with microvilli on the free surface, found in the proximal convoluted tubule, is', 'cuboidal epithelium with brush border', 'squamous', 'ciliated columnar', 'compound', 'Microvilli increase the absorptive surface.'],
  ['Goblet cells of the alimentary canal are examples of', 'unicellular glands', 'multicellular glands', 'endocrine glands', 'ciliated cells', 'Goblet cells secrete mucus.'],
  ['Exocrine glands secrete their products', 'through ducts', 'directly into blood', 'into lymph only', 'not at all', 'Saliva, milk and digestive enzymes are exocrine secretions; hormones are endocrine.'],
  ['The most abundant and widely distributed tissue in the body of complex animals is', 'connective tissue', 'epithelial tissue', 'muscular tissue', 'neural tissue', 'Connective tissues link and support other tissues.'],
  ['The cells of connective tissue that secrete fibres of structural proteins (collagen or elastin) are', 'fibroblasts', 'macrophages', 'mast cells', 'adipocytes', 'All connective tissues except blood have fibroblasts that secrete fibres.'],
  ['Bone cells (osteocytes) lie in spaces called', 'lacunae', 'Haversian canals', 'canaliculi', 'lamellae', 'Osteocytes are present in lacunae.'],
  ['The cells of cartilage (chondrocytes) are enclosed in', 'small cavities in the matrix secreted by them', 'Haversian canals', 'blood vessels', 'muscle fibres', 'Chondrocytes lie in cavities within the matrix.'],
  ['Smooth muscle fibres are', 'fusiform (tapering at both ends) and non-striated', 'striated and branched', 'striated and cylindrical', 'multinucleate and striated', 'Smooth muscles are involuntary, found in the walls of blood vessels, stomach and intestine.'],
  ['The scientific name of the common cockroach is', '<i>Periplaneta americana</i>', '<i>Blatta orientalis</i>', '<i>Musca domestica</i>', '<i>Apis indica</i>', 'NCERT describes <i>Periplaneta americana</i>.'],
  ['The number of nerve ganglia in the ventral nerve cord of the cockroach is', '3 thoracic and 6 abdominal', '3 thoracic and 9 abdominal', '1 thoracic and 6 abdominal', '9 abdominal only', 'The ventral nerve cord has 3 thoracic and 6 abdominal ganglia.', 'medium'],
  ['The heart of the cockroach consists of', '13 funnel-shaped chambers', '4 chambers', '2 chambers', '9 chambers', 'An elongated muscular tube lying along the mid-dorsal line, with 13 chambers.', 'medium'],
  ['The blood vascular system of the cockroach is', 'open, with colourless haemolymph', 'closed, with red blood', 'closed, with colourless blood', 'absent', 'Blood vessels open into the haemocoel.'],
  ['In the cockroach, the brain is represented by', 'the supra-oesophageal ganglion', 'the sub-oesophageal ganglion', 'the thoracic ganglia', 'the corpora allata', 'The supra-oesophageal ganglion supplies nerves to antennae and compound eyes.'],
  ['The development of the cockroach is', 'paurometabolous (through nymphs)', 'holometabolous (with pupa)', 'ametabolous', 'direct without moulting', 'Nymphs moult about 13 times to reach the adult form.'],
  ['On average, a female cockroach produces', '9–10 oothecae, each with 14–16 eggs', '2 oothecae with 100 eggs each', 'one ootheca with 40 eggs', '50 single eggs', 'NCERT gives 9–10 oothecae, each containing 14–16 eggs.', 'medium'],
  ['The hindwings of the cockroach arise from the', 'metathorax and are used in flight', 'mesothorax and protect the body', 'prothorax', 'abdomen', 'Forewings (tegmina) are mesothoracic; hindwings are metathoracic.'],
  ['Anal cerci in the cockroach are present', 'in both sexes', 'only in males', 'only in females', 'only in nymphs', 'Anal cerci are present in both sexes; anal styles only in males.'],
  ['The mouth parts of the cockroach are of the', 'biting and chewing type', 'piercing and sucking type', 'sponging type', 'siphoning type', 'They include labrum, a pair of mandibles, a pair of maxillae and a labium.'],
  ['The site of the testes in a male cockroach is the', '4th–6th abdominal segments', '2nd–6th abdominal segments', 'thorax', 'head', 'Ovaries lie in the 2nd–6th segments in females.', 'medium']
]);
ST(C, [
  'Epithelial tissue has a free surface facing a body fluid or the outside environment.',
  'Blood is a fluid connective tissue.',
  'Skeletal muscles are striated and voluntary.',
  'Cardiac muscle contracts as a unit because of communication junctions in the intercalated discs.',
  'The excretion in cockroach is performed by Malpighian tubules.',
  'Cockroaches are uricotelic.',
  'In cockroaches, the head is formed by the fusion of six segments.'
], [
  ['Compound epithelium has a mainly absorptive role.', 'its main function is protection against chemical and mechanical stresses.'],
  ['Tendons connect one bone to another.', 'tendons attach muscles to bones; ligaments attach bones to bones.'],
  ['Smooth muscles are voluntary.', 'smooth muscles are involuntary.'],
  ['Neurons form more than half the volume of neural tissue.', 'neuroglia make up more than half the volume.'],
  ['Cockroach blood carries oxygen with haemoglobin.', 'its haemolymph is colourless; respiration is by tracheae.'],
  ['Anal styles are present in both male and female cockroaches.', 'anal styles are present only in males.']
]);
ar(C, [
  ['Cardiac muscle cells contract as a unit.', 'Communication junctions at intercalated discs allow the cells to contract together.', 0, 'R explains A.'],
  ['The cockroach shows mosaic vision.', 'Each compound eye has about 2000 ommatidia, each receiving a part of the image.', 0, 'R explains A.']
]);

/* ---------- 3. Biomolecules ---------- */
C = 'Biomolecules';
P(C, 'Category of secondary metabolite', 'Example', [
  ['Pigments', 'carotenoids and anthocyanins'], ['Alkaloids', 'morphine and codeine'], ['Terpenoids', 'monoterpenes and diterpenes'], ['Essential oils', 'lemon grass oil'],
  ['Toxins', 'abrin and ricin'], ['Lectins', 'concanavalin A'], ['Drugs', 'vinblastine and curcumin'], ['Polymeric substances', 'rubber, gums and cellulose']
], l => `An example of ${l.toLowerCase()} (secondary metabolites) is`);
P(C, 'Biomolecule', 'Description', [
  ['Collagen', 'the most abundant protein in the animal world'], ['RuBisCO', 'the most abundant protein in the whole biosphere'], ['Inulin', 'a polymer of fructose'],
  ['Cellulose', 'a homopolymer of glucose that does not give blue colour with iodine'], ['Starch', 'forms helical secondary structures and holds iodine to give a blue colour'],
  ['Chitin', 'complex polysaccharide forming the exoskeleton of arthropods'], ['Lecithin', 'a phospholipid found in the cell membrane'], ['Glycogen', 'the storage polysaccharide in animals']
], l => `${l} is`);
P(C, 'Amino acid', 'Group R / type', [['Glycine', 'R = hydrogen'], ['Alanine', 'R = methyl group'], ['Serine', 'R = hydroxymethyl'], ['Glutamic acid', 'acidic amino acid'], ['Lysine', 'basic amino acid'], ['Valine', 'neutral amino acid'], ['Tryptophan', 'aromatic amino acid']], l => `${l} is described as`, 2);
P(C, 'Enzyme class', 'Reaction catalysed', [
  ['Oxidoreductases / dehydrogenases', 'oxidation–reduction between two substrates'], ['Transferases', 'transfer of a group (other than hydrogen) between substrates'],
  ['Hydrolases', 'hydrolysis of ester, ether, peptide, glycosidic and other bonds'], ['Lyases', 'removal of groups from substrates by mechanisms other than hydrolysis, leaving double bonds'],
  ['Isomerases', 'inter-conversion of optical, geometric or positional isomers'], ['Ligases', 'joining two compounds together, e.g. by C–O, C–S, C–N, P–O bonds']
], l => `${l} catalyse`, 2);
mcs(C, [
  ['The acid-insoluble fraction of a tissue contains', 'macromolecules such as proteins, nucleic acids and polysaccharides', 'amino acids and sugars', 'inorganic ions', 'only lipids', 'Lipids come in the acid-insoluble fraction too, though they are not strictly macromolecules (molecular weight less than 800 Da).', 'medium'],
  ['Lipids appear in the acid-insoluble fraction because', 'they form vesicles when the tissue is ground and cell membranes are broken', 'they are polymers', 'they have very high molecular weight', 'they are soluble in acid', 'Membrane fragments form insoluble vesicles.', 'medium'],
  ['The most abundant chemical in living organisms is', 'water', 'protein', 'carbohydrate', 'nucleic acid', 'Water forms 70–90% of total cellular mass.'],
  ['Palmitic acid has', '16 carbons including the carboxyl carbon', '20 carbons', '18 carbons with two double bonds', '12 carbons', 'Arachidonic acid has 20 carbons.'],
  ['A nucleotide consists of', 'a nitrogenous base, a pentose sugar and a phosphate group', 'a base and a sugar only', 'an amino acid and a sugar', 'a fatty acid and glycerol', 'A nucleoside (base + sugar) with a phosphate is a nucleotide.'],
  ['Adenine and guanine are', 'substituted purines', 'substituted pyrimidines', 'amino acids', 'nucleosides', 'Cytosine, uracil and thymine are substituted pyrimidines.'],
  ['The bond linking amino acids in a protein is the', 'peptide bond', 'glycosidic bond', 'phosphodiester bond', 'ester bond', 'Formed between the carboxyl of one amino acid and the amino group of the next.'],
  ['The bond between two monosaccharides is a', 'glycosidic bond', 'peptide bond', 'ester bond', 'hydrogen bond', 'Formed by dehydration between two carbon atoms of adjacent monosaccharides.'],
  ['In nucleic acids, the bond between the phosphate and the hydroxyl group of sugar is', 'an ester bond (phosphodiester linkage)', 'a peptide bond', 'a glycosidic bond', 'an ionic bond', 'There is an ester bond on either side of the phosphate.'],
  ['The primary structure of a protein refers to', 'the sequence of amino acids', 'the helical arrangement', 'the three-dimensional folding', 'the arrangement of subunits', 'Left end = N-terminal, right end = C-terminal amino acid.'],
  ['Adult human haemoglobin consists of', 'four subunits — two α and two β', 'two α subunits', 'one β subunit', 'six subunits', 'Two α and two β subunits form its quaternary structure.'],
  ['In proteins, only right-handed helices are observed in the', 'secondary structure', 'primary structure', 'tertiary structure', 'quaternary structure', 'Polypeptide chains fold into right-handed helices.'],
  ['Malonate inhibits succinic dehydrogenase because', 'it resembles the substrate succinate (competitive inhibition)', 'it destroys the enzyme', 'it binds the product', 'it is an allosteric activator', 'A competitive inhibitor competes with the substrate for the active site.'],
  ['A prosthetic group differs from a coenzyme in that it is', 'tightly bound to the apoenzyme', 'loosely bound', 'a metal ion', 'a protein', 'e.g. haem in peroxidase and catalase.'],
  ['NAD and NADP contain the vitamin', 'niacin', 'riboflavin', 'thiamine', 'pyridoxine', 'Many coenzymes are derived from vitamins.'],
  ['The metal ion that acts as a cofactor for the proteolytic enzyme carboxypeptidase is', 'zinc', 'iron', 'copper', 'magnesium', 'Zinc forms coordination bonds with side chains at the active site.'],
  ['Enzymes speed up reactions by', 'lowering the activation energy', 'raising the activation energy', 'changing the equilibrium constant', 'supplying energy', 'Enzymes lower the energy barrier of the transition state.'],
  ['Above the optimum temperature, enzyme activity declines because', 'the enzyme protein gets denatured', 'the substrate breaks down', 'the enzyme multiplies', 'the products accumulate', 'High temperatures destroy enzyme structure; low temperatures only make it temporarily inactive.'],
  ['The holoenzyme is', 'the apoenzyme together with its cofactor', 'the protein part only', 'the cofactor only', 'the inactive enzyme', 'Catalytic activity is lost when the cofactor is removed.'],
  ['A reaction in which the enzyme carbonic anhydrase is involved is', 'CO₂ + H₂O ⇌ H₂CO₃', 'glucose → 2 pyruvic acid', 'starch → maltose', 'fat → fatty acids + glycerol', 'Carbonic anhydrase speeds this reaction about 10 million times.']
]);
ST(C, [
  'Collagen is the most abundant protein in the animal world.',
  'Amino acids exist as zwitterions at a particular pH.',
  'Starch can hold iodine molecules in its helical structure.',
  'Enzymes are generally proteins; some nucleic acids (ribozymes) also act as enzymes.',
  'Lipids are generally water-insoluble.',
  'Cellulose does not contain complex helices and cannot hold iodine.',
  'The tertiary structure is absolutely necessary for many biological activities of proteins.'
], [
  ['Lipids are strictly macromolecules.', 'lipids have molecular weights below 800 Da and are not strictly macromolecules.'],
  ['Inulin is a polymer of glucose.', 'inulin is a polymer of fructose.'],
  ['The right end of a polypeptide is the N-terminal amino acid.', 'the left end is the N-terminal and the right end is the C-terminal amino acid.'],
  ['Competitive inhibitors bind to a site other than the active site.', 'competitive inhibitors bind the active site because they resemble the substrate.'],
  ['Cellulose is a heteropolymer.', 'cellulose is a homopolymer of glucose.'],
  ['Enzymes change the equilibrium of a reaction.', 'enzymes only speed up reaching equilibrium; they do not change it.']
]);
ar(C, [
  ['Starch gives a blue colour with iodine.', 'Starch forms helical secondary structures that can hold I₂ molecules.', 0, 'R explains A.'],
  ['Enzymes are denatured at high temperature.', 'Enzymes are proteins whose structure is held by weak bonds.', 0, 'Heat breaks these bonds and destroys the active site.']
]);

/* ---------- 4. Breathing and Exchange of Gases ---------- */
C = 'Breathing and Exchange of Gases';
P(C, 'Respiratory volume / capacity', 'Approximate value (healthy adult)', [
  ['Tidal volume', '500 mL'], ['Inspiratory reserve volume', '2500–3000 mL'], ['Expiratory reserve volume', '1000–1100 mL'], ['Residual volume', '1100–1200 mL']
], l => `The ${l.toLowerCase()} of a healthy human is about`, 1);
P(C, 'Capacity', 'Formula', [
  ['Inspiratory capacity', 'TV + IRV'], ['Expiratory capacity', 'TV + ERV'], ['Functional residual capacity', 'ERV + RV'], ['Vital capacity', 'ERV + TV + IRV'], ['Total lung capacity', 'RV + ERV + TV + IRV']
], l => `${l} is equal to`, 2);
P(C, 'Animal', 'Respiratory organ / method', [
  ['Sponges, coelenterates and flatworms', 'simple diffusion over the entire body surface'], ['Earthworms', 'moist cuticle (cutaneous respiration)'], ['Insects', 'network of tubes called tracheae'],
  ['Most aquatic arthropods and molluscs', 'gills (branchial respiration)'], ['Reptiles, birds and mammals', 'lungs (pulmonary respiration)']
], l => `${l} exchange gases through`, 1);
gen(C, [[500, 3000, 1100, 1200], [450, 2800, 1000, 1150], [500, 2500, 1000, 1100], [600, 3000, 1100, 1200]], (TV, IRV, ERV, RV) => [
  `In a person, tidal volume = ${TV} mL, IRV = ${IRV} mL, ERV = ${ERV} mL and residual volume = ${RV} mL. The vital capacity is`, TV + IRV + ERV, 'mL', [TV + IRV + ERV + RV, TV + IRV, ERV + RV],
  `VC = ERV + TV + IRV = ${ERV} + ${TV} + ${IRV} = <b>${TV + IRV + ERV} mL</b>.`]);
gen(C, [[500, 3000, 1100, 1200], [450, 2800, 1000, 1150], [500, 2500, 1000, 1100]], (TV, IRV, ERV, RV) => [
  `With TV = ${TV} mL, IRV = ${IRV} mL, ERV = ${ERV} mL and RV = ${RV} mL, the functional residual capacity is`, ERV + RV, 'mL', [TV + ERV, TV + IRV, TV + IRV + ERV],
  `FRC = ERV + RV = ${ERV} + ${RV} = <b>${ERV + RV} mL</b>.`]);
gen(C, [[500, 3000, 1100, 1200], [450, 2800, 1000, 1150], [500, 2500, 1000, 1100]], (TV, IRV, ERV, RV) => [
  `With TV = ${TV} mL, IRV = ${IRV} mL, ERV = ${ERV} mL and RV = ${RV} mL, the total lung capacity is`, TV + IRV + ERV + RV, 'mL', [TV + IRV + ERV, TV + IRV, IRV + ERV + RV],
  `TLC = RV + ERV + TV + IRV = <b>${TV + IRV + ERV + RV} mL</b>.`]);
gen(C, [[500, 12], [500, 16], [450, 14], [600, 15]], (TV, rate) => [
  `A healthy person breathes ${rate} times a minute with a tidal volume of ${TV} mL. The volume of air inspired per minute is`, TV * rate, 'mL', [TV * rate / 2, TV + rate, TV * rate * 2],
  `Minute volume = TV × rate = ${TV} × ${rate} = <b>${TV * rate} mL</b>.`, 'easy']);
D(C, [['Atmospheric air', '159 mm Hg'], ['Alveolar air', '104 mm Hg'], ['Deoxygenated blood', '40 mm Hg'], ['Oxygenated blood', '95 mm Hg']], ['159 mm Hg', '104 mm Hg', '40 mm Hg', '95 mm Hg'], l => `The partial pressure of oxygen (pO₂) in ${l.toLowerCase()} is about`);
D(C, [['Atmospheric air', '0.3 mm Hg'], ['Alveolar air', '40 mm Hg'], ['Deoxygenated blood', '45 mm Hg']], ['0.3 mm Hg', '40 mm Hg', '45 mm Hg', '104 mm Hg'], l => `The partial pressure of CO₂ (pCO₂) in ${l.toLowerCase()} is about`);
mcs(C, [
  ['About 97 percent of oxygen is transported in blood', 'by red blood cells as oxyhaemoglobin', 'dissolved in plasma', 'as bicarbonate', 'by white blood cells', 'Only about 3% is carried dissolved in plasma.'],
  ['About 70 percent of carbon dioxide is transported as', 'bicarbonate', 'carbamino-haemoglobin', 'dissolved CO₂', 'carbonic acid in RBCs only', 'About 20–25% is carried as carbamino-haemoglobin and about 7% dissolved in plasma.'],
  ['Every 100 mL of oxygenated blood can deliver to the tissues about', '5 mL of O₂', '20 mL of O₂', '1 mL of O₂', '50 mL of O₂', 'Under normal physiological conditions.'],
  ['Every 100 mL of deoxygenated blood delivers to the alveoli about', '4 mL of CO₂', '5 mL of CO₂', '40 mL of CO₂', '0.5 mL of CO₂', 'NCERT value.'],
  ['The solubility of CO₂ is', '20–25 times higher than that of O₂', 'lower than O₂', 'equal to O₂', '200 times higher than O₂', 'So more CO₂ can diffuse per unit difference in partial pressure.'],
  ['The oxygen dissociation curve is', 'sigmoid', 'linear', 'hyperbolic', 'parabolic', 'A plot of percentage saturation of haemoglobin against pO₂ gives a sigmoid curve.'],
  ['Factors favouring the formation of oxyhaemoglobin in the alveoli are', 'high pO₂, low pCO₂, lower H⁺ and lower temperature', 'low pO₂ and high pCO₂', 'high H⁺ and high temperature', 'low pO₂ and high temperature', 'In tissues, the opposite conditions favour dissociation.'],
  ['The enzyme that catalyses CO₂ + H₂O ⇌ H₂CO₃ in RBCs is', 'carbonic anhydrase', 'carboxypeptidase', 'RuBisCO', 'dehydrogenase', 'It is present in very high concentration in RBCs and in small quantity in plasma.'],
  ['The respiratory rhythm centre is located in the', 'medulla', 'pons', 'cerebellum', 'hypothalamus', 'The pneumotaxic centre in the pons moderates it.'],
  ['The pneumotaxic centre, which can reduce the duration of inspiration, is in the', 'pons', 'medulla', 'cerebrum', 'spinal cord', 'It alters the respiratory rate.'],
  ['A chemosensitive area adjacent to the rhythm centre is highly sensitive to', 'CO₂ and H⁺', 'O₂ only', 'glucose', 'Na⁺', 'Increase in these activates the centre to eliminate CO₂.'],
  ['Inspiration is initiated by', 'contraction of the diaphragm', 'relaxation of the diaphragm', 'contraction of abdominal muscles', 'relaxation of external intercostal muscles', 'Contraction of the diaphragm increases thoracic volume in the antero-posterior axis.'],
  ['The thin, membranous partition through which gases diffuse between alveoli and blood (diffusion membrane) is made of', 'three layers — alveolar squamous epithelium, endothelium of capillaries and the basement substance between them', 'two layers', 'only capillary endothelium', 'five layers', 'Its total thickness is much less than a millimetre.'],
  ['Emphysema is a chronic disorder in which', 'alveolar walls are damaged, decreasing the respiratory surface', 'bronchi are inflamed due to allergy', 'lungs fill with fluid', 'trachea is blocked', 'Cigarette smoking is one of the major causes.'],
  ['Asthma is a difficulty in breathing causing wheezing due to', 'inflammation of bronchi and bronchioles', 'damage to alveolar walls', 'fibrosis of lungs', 'paralysis of the diaphragm', 'It is often allergic.'],
  ['Occupational respiratory disorders (e.g. in stone-breaking industries) lead to', 'fibrosis (proliferation of fibrous tissue) of the lung', 'asthma only', 'emphysema only', 'pneumonia', 'Long exposure to dust causes inflammation and fibrosis.'],
  ['The trachea divides at the level of the', '5th thoracic vertebra into right and left primary bronchi', '1st cervical vertebra', '12th thoracic vertebra', '5th lumbar vertebra', 'NCERT: the trachea divides at the level of the 5th thoracic vertebra.', 'medium'],
  ['The conducting part of the respiratory system extends from the external nostrils up to the', 'terminal bronchioles', 'alveoli', 'larynx', 'primary bronchi', 'Alveoli and their ducts form the respiratory or exchange part.'],
  ['The lungs are covered by a double-layered', 'pleura with pleural fluid between', 'pericardium', 'meninges', 'peritoneum', 'Pleural fluid reduces friction on the lung surface.']
]);
ST(C, [
  'Exchange of gases occurs by simple diffusion.',
  'Diffusion of O₂ and CO₂ depends on partial pressure gradients.',
  'Binding of oxygen with haemoglobin is primarily related to the partial pressure of O₂.',
  'Expiration during normal breathing is a passive process.',
  'The alveoli are the primary sites of gas exchange.',
  'Residual volume cannot be expelled even by forcible expiration.'
], [
  ['Oxygen-carrying capacity of blood is mainly due to plasma.', 'about 97% of O₂ is carried by haemoglobin in RBCs.'],
  ['Most CO₂ is transported as carbamino-haemoglobin.', 'about 70% is transported as bicarbonate.'],
  ['The respiratory rhythm centre is located in the pons.', 'it is in the medulla; the pneumotaxic centre is in the pons.'],
  ['Vital capacity includes the residual volume.', 'VC = ERV + TV + IRV; TLC includes RV.'],
  ['Oxygen plays a significant role in regulating the respiratory rhythm through chemoreceptors.', 'the role of O₂ is quite insignificant; CO₂ and H⁺ are the main regulators.'],
  ['The diffusion membrane is very thick.', 'the diffusion membrane is very thin (much less than a millimetre).']
]);
ar(C, [
  ['CO₂ diffuses across the diffusion membrane faster than O₂ per unit pressure difference.', 'The solubility of CO₂ is 20–25 times higher than that of O₂.', 0, 'R explains A.'],
  ['In the tissues, oxygen dissociates from oxyhaemoglobin.', 'Low pO₂, high pCO₂, high H⁺ and higher temperature exist in the tissues.', 0, 'R explains A.']
]);

/* ---------- 5. Body Fluids and Circulation ---------- */
C = 'Body Fluids and Circulation';
P(C, 'White blood cell', 'Feature', [
  ['Neutrophils', 'most abundant WBCs (60–65%), phagocytic'], ['Lymphocytes', '20–25% of WBCs; B and T forms responsible for immune responses'], ['Monocytes', '6–8% of WBCs; phagocytic cells that destroy foreign organisms'],
  ['Eosinophils', '2–3% of WBCs; resist infections and are associated with allergic reactions'], ['Basophils', 'least abundant (0.5–1%); secrete histamine, serotonin and heparin']
], l => `${l} are`, 2);
D(C, [['P-wave', 'depolarisation of the atria'], ['QRS complex', 'depolarisation of the ventricles'], ['T-wave', 'repolarisation of the ventricles']],
  ['depolarisation of the atria', 'depolarisation of the ventricles', 'repolarisation of the ventricles', 'repolarisation of the atria'], l => `In a standard ECG, the ${l} represents`);
P(C, 'Blood group', 'Antigens on RBC / antibodies in plasma', [['A', 'antigen A, anti-B antibodies'], ['B', 'antigen B, anti-A antibodies'], ['AB', 'antigens A and B, no antibodies'], ['O', 'no antigens, anti-A and anti-B antibodies']], l => `A person of blood group ${l} has`, 1);
P(C, 'Disorder', 'Description', [
  ['Hypertension', 'blood pressure persistently higher than 140/90 mm Hg'], ['Coronary artery disease (atherosclerosis)', 'deposits of calcium, fat, cholesterol and fibrous tissue narrow the vessels supplying the heart'],
  ['Angina (angina pectoris)', 'acute chest pain when enough oxygen does not reach the heart muscle'], ['Heart failure', 'the heart is not pumping blood effectively enough to meet the needs of the body'],
  ['Erythroblastosis foetalis', 'Rh antibodies from an Rh⁻ mother destroy foetal RBCs in a later pregnancy']
], l => `${l} refers to`, 2);
gen(C, [[70, 72], [70, 75], [80, 70], [75, 80], [65, 72]], (SV, HR) => [
  `If the stroke volume is ${SV} mL and the heart rate is ${HR} beats per minute, the cardiac output is`, SV * HR / 1000, 'L min⁻¹', [SV * HR / 100, SV / HR, (SV + HR) / 100],
  `Cardiac output = stroke volume × heart rate = ${SV} × ${HR} = ${SV * HR} mL = <b>${f(SV * HR / 1000)} L min⁻¹</b>.`]);
gen(C, [[72], [75], [60], [80], [90], [100]], HR => [
  `If the heart beats ${HR} times per minute, the duration of one cardiac cycle is`, 60 / HR, 's', [HR / 60, 60 / HR / 2, 1],
  `One cycle = 60/${HR} s = <b>${f(60 / HR)} s</b>.`, 'easy']);
mcs(C, [
  ['Plasma forms about', '55% of the blood', '45% of the blood', '90% of the blood', '25% of the blood', 'Formed elements constitute nearly 45%.'],
  ['Plasma without clotting factors is called', 'serum', 'lymph', 'tissue fluid', 'haemolymph', 'Serum = plasma minus clotting factors.'],
  ['The major plasma proteins are', 'fibrinogen, globulins and albumins', 'haemoglobin and myoglobin', 'collagen and elastin', 'actin and myosin', 'Fibrinogen for clotting, globulins for defence, albumins for osmotic balance.'],
  ['A healthy adult man has, on average, RBCs numbering', '5 to 5.5 million per mm³ of blood', '6000–8000 per mm³', '1.5–3.5 lakh per mm³', '50 million per mm³', 'RBCs are the most abundant cells in blood.'],
  ['RBCs have an average life span of', '120 days', '30 days', '1 year', '12 hours', 'They are destroyed in the spleen (the graveyard of RBCs).'],
  ['Healthy individuals have haemoglobin', '12–16 g per 100 mL of blood', '5–6 g per 100 mL', '25–30 g per 100 mL', '1–2 g per 100 mL', 'NCERT value.'],
  ['Blood platelets (thrombocytes) are produced from', 'megakaryocytes in the bone marrow', 'the spleen', 'the liver', 'lymph nodes', 'Blood normally contains 1.5–3.5 lakh platelets per mm³.'],
  ['The universal donor blood group is', 'O', 'AB', 'A', 'B', 'Group O has no A or B antigens on its RBCs.'],
  ['The universal recipient blood group is', 'AB', 'O', 'A', 'B', 'Group AB has no anti-A or anti-B antibodies in plasma.'],
  ['The enzyme complex that converts prothrombin into thrombin is', 'thrombokinase', 'thrombin', 'fibrinogenase', 'heparin', 'Thrombin converts fibrinogen into fibrin.'],
  ['The ion that plays a very important role in clotting is', 'calcium', 'sodium', 'potassium', 'iron', 'Ca²⁺ is required in coagulation.'],
  ['The pacemaker of the human heart is the', 'sino-atrial node (SAN)', 'atrio-ventricular node', 'bundle of His', 'Purkinje fibres', 'The SAN generates the maximum number of action potentials (70–75 per minute).'],
  ['The duration of one cardiac cycle in a normal person is about', '0.8 second', '8 seconds', '0.08 second', '1.5 seconds', 'With 72 beats per minute, each cycle takes about 0.8 s.'],
  ['The stroke volume of a healthy person is about', '70 mL', '5000 mL', '7 mL', '700 mL', 'Cardiac output is about 5000 mL per minute.'],
  ['The first heart sound "lub" is due to the closure of the', 'tricuspid and bicuspid (atrio-ventricular) valves', 'semilunar valves', 'mitral valve only', 'aortic valve only', '"Dub" is due to the closure of semilunar valves.'],
  ['Double circulation is found in', 'birds and mammals', 'fishes', 'amphibians only', 'all vertebrates', 'Oxygenated and deoxygenated blood are kept separate in a four-chambered heart.'],
  ['The hepatic portal vein carries blood from the', 'intestine to the liver', 'liver to the heart', 'heart to the liver', 'kidney to the liver', 'Blood is processed in the liver before reaching the systemic circulation.'],
  ['Lymph is a colourless fluid containing specialised', 'lymphocytes', 'RBCs', 'platelets', 'neutrophils only', 'Lymphocytes are responsible for immune responses; lymph also absorbs fats through lacteals.'],
  ['Neural signals through the sympathetic nerves', 'increase the rate of heartbeat and strength of ventricular contraction', 'decrease the heart rate', 'stop the heart', 'have no effect', 'Parasympathetic signals decrease the rate.'],
  ['Fishes have a', 'two-chambered heart with single circulation', 'three-chambered heart', 'four-chambered heart', 'heart with double circulation', 'Fishes pump deoxygenated blood to the gills.'],
  ['The special cardiac musculature that conducts impulses to the ventricle walls is', 'Purkinje fibres', 'chordae tendineae', 'papillary muscles', 'SAN', 'The bundle of His divides into right and left bundles which give rise to Purkinje fibres.'],
  ['Erythroblastosis foetalis can be avoided by', 'giving anti-Rh antibodies to the mother immediately after the first delivery', 'giving Rh antigen to the child', 'giving blood transfusion to the mother', 'feeding the child with milk', 'This prevents the mother from forming Rh antibodies.']
]);
ST(C, [
  'Neutrophils and monocytes are phagocytic cells.',
  'Human heart is myogenic.',
  'Blood pressure of 120/80 mm Hg is considered normal.',
  'Lymph returns tissue fluid to the major veins.',
  'Serum lacks clotting factors.',
  'The heart is protected by a double-walled membranous bag called the pericardium.'
], [
  ['Basophils are the most abundant WBCs.', 'neutrophils are the most abundant; basophils are the least.'],
  ['The AV node is the pacemaker of the heart.', 'the SA node is the pacemaker.'],
  ['The "dub" sound is produced by the closure of the AV valves.', '"dub" is produced by closure of the semilunar valves.'],
  ['Platelets are produced in the spleen.', 'platelets are fragments of megakaryocytes in the bone marrow.'],
  ['Persons with blood group AB have anti-A and anti-B antibodies.', 'they have no anti-A or anti-B antibodies.'],
  ['The QRS complex represents atrial depolarisation.', 'it represents ventricular depolarisation; the P-wave represents atrial depolarisation.']
]);
ar(C, [
  ['People with blood group O are called universal donors.', 'Their RBCs have no A or B antigens.', 0, 'R explains A.'],
  ['The SA node is called the pacemaker of the heart.', 'It can generate the maximum number of action potentials.', 0, 'R explains A.'],
  ['The ventricular systole follows the QRS complex.', 'The QRS complex represents ventricular depolarisation.', 0, 'Depolarisation initiates contraction.']
]);

/* ---------- 6. Excretory Products and their Elimination ---------- */
C = 'Excretory Products and their Elimination';
P(C, 'Animal', 'Excretory structure', [
  ['Platyhelminthes (e.g. <i>Planaria</i>)', 'protonephridia (flame cells)'], ['Earthworm', 'nephridia'], ['Insects (e.g. cockroach)', 'Malpighian tubules'], ['Prawn and other crustaceans', 'antennal glands (green glands)'], ['Vertebrates', 'kidneys']
], l => `${l} excrete through`, 1);
D(C, [['Bony fishes', 'ammonotelic'], ['Aquatic amphibians', 'ammonotelic'], ['Aquatic insects', 'ammonotelic'], ['Mammals', 'ureotelic'], ['Many terrestrial amphibians', 'ureotelic'], ['Marine fishes', 'ureotelic'], ['Reptiles', 'uricotelic'], ['Birds', 'uricotelic'], ['Land snails', 'uricotelic'], ['Insects (terrestrial)', 'uricotelic']],
  ['ammonotelic', 'ureotelic', 'uricotelic', 'aminotelic'], l => `${l} are`);
P(C, 'Part of nephron', 'Role', [
  ['Glomerulus', 'filtration of blood'], ['Proximal convoluted tubule', 'reabsorbs nearly all essential nutrients and 70–80% of electrolytes and water'],
  ['Descending limb of loop of Henle', 'permeable to water but almost impermeable to electrolytes'], ['Ascending limb of loop of Henle', 'impermeable to water but allows transport of electrolytes'],
  ['Distal convoluted tubule', 'conditional reabsorption of Na⁺ and water, secretion of H⁺ and K⁺'], ['Collecting duct', 'reabsorbs large amounts of water to produce concentrated urine']
], l => `The ${l.toLowerCase()} is responsible for`, 2);
gen(C, [[125], [120], [130], [100]], g => [
  `If the GFR of a person is ${g} mL per minute, the volume of filtrate formed per day is about`, g * 60 * 24 / 1000, 'L', [g * 60 / 1000, g * 24 / 1000, g * 60 * 24 / 100],
  `${g} mL/min × 1440 min = ${g * 1440} mL ≈ <b>${f(g * 1440 / 1000)} L</b> per day.`, 'medium']);
gen(C, [[180, 1.5], [170, 1.7], [150, 1.5], [180, 1.8]], (F, U) => [
  `If ${F} L of glomerular filtrate is formed per day and ${U} L of urine is released, the percentage of filtrate reabsorbed is`, (F - U) / F * 100, '%', [U / F * 100, (F - U) / U, 100 - U],
  `Reabsorbed = (${F} − ${U})/${F} × 100 = <b>${f((F - U) / F * 100)}%</b>.`, 'medium']);
mcs(C, [
  ['Each human kidney has about', 'one million nephrons', 'one thousand nephrons', 'ten million nephrons', 'one hundred nephrons', 'Nephrons are the structural and functional units.'],
  ['The glomerular filtration rate (GFR) of a healthy individual is about', '125 mL per minute (180 L per day)', '1.5 L per minute', '12.5 mL per minute', '1250 mL per minute', 'About 1100–1200 mL of blood is filtered by the kidneys per minute.'],
  ['On average, the amount of urine excreted per day by an adult is', '1 to 1.5 L', '180 L', '10 L', '0.1 L', 'About 99% of the filtrate is reabsorbed.'],
  ['Urea excreted per day is about', '25–30 g', '1–2 g', '100 g', '250 g', 'NCERT value.', 'medium'],
  ['The osmolarity of the medullary interstitium increases from 300 mOsmol L⁻¹ in the cortex to about', '1200 mOsmol L⁻¹ in the inner medulla', '600 mOsmol L⁻¹', '3000 mOsmol L⁻¹', '100 mOsmol L⁻¹', 'The gradient is caused mainly by NaCl and urea.'],
  ['The counter-current mechanism is mainly helped by the', 'loop of Henle and vasa recta', 'glomerulus and Bowman\'s capsule', 'PCT and DCT', 'collecting duct and ureter', 'Flow in opposite directions in the two limbs creates the gradient.'],
  ['The vasa recta is', 'absent or highly reduced in cortical nephrons', 'absent in juxtamedullary nephrons', 'a part of the PCT', 'a part of the ureter', 'It runs parallel to the long loop of juxtamedullary nephrons.'],
  ['Juxtaglomerular apparatus (JGA) releases', 'renin when GFR falls', 'ADH', 'aldosterone', 'ANF', 'Renin converts angiotensinogen to angiotensin I.'],
  ['Angiotensin II', 'is a powerful vasoconstrictor and stimulates the adrenal cortex to release aldosterone', 'lowers blood pressure', 'inhibits ADH', 'is released by the heart', 'This raises blood pressure and GFR.'],
  ['ADH (vasopressin) is released by the', 'neurohypophysis (posterior pituitary)', 'adrenal cortex', 'kidney', 'heart', 'ADH facilitates water reabsorption from the latter parts of the tubule.'],
  ['Atrial natriuretic factor (ANF) causes', 'vasodilation and decrease in blood pressure', 'vasoconstriction', 'release of renin', 'increase in ADH', 'ANF acts as a check on the renin–angiotensin mechanism.'],
  ['Micturition is the process of', 'release of urine', 'formation of urine', 'reabsorption of water', 'filtration', 'Stretch receptors on the bladder wall send signals to the CNS for the reflex.'],
  ['Accumulation of urea in blood, which can lead to kidney failure, is called', 'uremia', 'glycosuria', 'ketonuria', 'renal calculi', 'Haemodialysis removes urea from such patients.'],
  ['In haemodialysis, the anticoagulant added to the blood is', 'heparin', 'thrombin', 'fibrinogen', 'vitamin K', 'After dialysis, anti-heparin is added before returning the blood.'],
  ['Presence of glucose (glycosuria) and ketone bodies (ketonuria) in urine indicate', 'diabetes mellitus', 'renal calculi', 'glomerulonephritis', 'uremia', 'NCERT names these as indicators of diabetes mellitus.'],
  ['Inflammation of the glomeruli of the kidney is called', 'glomerulonephritis', 'renal calculi', 'uremia', 'nephritis of the ureter', 'Renal calculi are stones or insoluble masses of crystallised salts.'],
  ['The lungs remove about how much CO₂ per minute?', '200 mL', '18 mL', '2000 mL', '20 L', 'NCERT gives about 200 mL of CO₂ per minute.', 'medium'],
  ['Bilirubin and biliverdin are excreted by the', 'liver (along with bile)', 'kidneys', 'lungs', 'sebaceous glands', 'They are degradation products of haemoglobin.'],
  ['Juxtamedullary nephrons have', 'a very long loop of Henle that runs deep into the medulla', 'a short loop of Henle', 'no loop of Henle', 'no vasa recta', 'In cortical nephrons the loop is short.'],
  ['The function of the tubular secretion of H⁺, K⁺ and ammonia is to', 'maintain ionic and acid–base balance of body fluids', 'filter blood', 'store urine', 'produce hormones', 'Tubular secretion helps in maintaining pH and ionic balance.']
]);
ST(C, [
  'Ammonia is the most toxic form of nitrogenous waste and needs a large amount of water for its elimination.',
  'Uric acid can be removed with minimum loss of water.',
  'Ascending limb of the loop of Henle dilutes the filtrate.',
  'An increase in body fluid volume can switch off osmoreceptors and suppress ADH release.',
  'Both PCT and DCT are situated in the cortical region of the kidney.',
  'Sweat produced by sweat glands helps mainly in cooling the body.'
], [
  ['The descending limb of the loop of Henle is impermeable to water.', 'it is permeable to water and nearly impermeable to electrolytes.'],
  ['The vasa recta is prominent in cortical nephrons.', 'it is absent or highly reduced in cortical nephrons.'],
  ['ANF increases blood pressure.', 'ANF causes vasodilation and decreases blood pressure.'],
  ['Birds are ureotelic.', 'birds are uricotelic.'],
  ['ADH decreases water reabsorption.', 'ADH increases water reabsorption, preventing diuresis.'],
  ['Renin is secreted by the adrenal cortex.', 'renin is released by the JG cells of the kidney.']
]);
ar(C, [
  ['Birds and reptiles excrete uric acid.', 'Uric acid can be excreted with minimum loss of water.', 0, 'Water conservation explains uricotelism.'],
  ['Urine is concentrated in the collecting duct.', 'The medullary interstitium is hyperosmotic, allowing water to be reabsorbed from the collecting duct.', 0, 'R explains A.']
]);

/* ---------- 7. Locomotion and Movement ---------- */
C = 'Locomotion and Movement';
P(C, 'Joint', 'Example', [
  ['Ball and socket joint', 'between humerus and pectoral girdle'], ['Hinge joint', 'knee joint'], ['Pivot joint', 'between atlas and axis'], ['Gliding joint', 'between the carpals'],
  ['Saddle joint', 'between the carpal and metacarpal of the thumb'], ['Fibrous joint', 'sutures between the flat bones of the skull'], ['Cartilaginous joint', 'between adjacent vertebrae']
], l => `An example of a ${l.toLowerCase()} is`, 3);
P(C, 'Disorder', 'Cause / description', [
  ['Myasthenia gravis', 'autoimmune disorder affecting the neuromuscular junction'], ['Muscular dystrophy', 'progressive degeneration of skeletal muscle, mostly genetic'], ['Tetany', 'rapid spasms in muscle due to low Ca²⁺ in body fluid'],
  ['Arthritis', 'inflammation of joints'], ['Osteoporosis', 'age-related decrease in bone mass and increased fractures (decreased oestrogen is a common cause)'], ['Gout', 'inflammation of joints due to accumulation of uric acid crystals']
], l => `${l} is`, 2);
D(C, [['Cervical vertebrae', '7'], ['Thoracic vertebrae', '12'], ['Lumbar vertebrae', '5'], ['True ribs (pairs)', '7']], ['7', '12', '5', '3'], l => `In humans, the number of ${l.toLowerCase()} is`);
D(C, [['Carpals in one hand', '8'], ['Tarsals in one foot', '7'], ['Metacarpals in one hand', '5'], ['Bones in one upper limb', '30']], ['8', '7', '5', '30'], l => `The number of ${l.toLowerCase()} is`);
D(C, [['Skull (cranial + facial)', '22'], ['Vertebral column (adult)', '26'], ['Axial skeleton', '80'], ['Appendicular skeleton', '126'], ['Whole adult skeleton', '206']], ['22', '26', '80', '126', '206'], l => `The total number of bones in the ${l.toLowerCase()} of an adult human is`);
mcs(C, [
  ['Amoeboid movement is seen in', 'macrophages and leucocytes in blood', 'cells lining the trachea', 'sperm', 'skeletal muscles', 'Pseudopodia are formed by streaming of protoplasm.'],
  ['Ciliary movement helps in', 'removing dust from the trachea and moving the ovum through the female reproductive tract', 'muscle contraction', 'blood flow', 'bone growth', 'Coordinated movements of cilia move material along the surface.'],
  ['The functional unit of contraction of a myofibril is the', 'sarcomere', 'sarcolemma', 'fascicle', 'Z-line', 'The portion of the myofibril between two successive Z-lines.'],
  ['The light band (I-band) of a myofibril contains', 'actin', 'myosin', 'both actin and myosin fully', 'only troponin', 'The dark A-band contains myosin.'],
  ['The dark band (A-band) is called anisotropic because', 'it contains myosin and is anisotropic to polarised light', 'it is isotropic', 'it contains actin only', 'it is the H-zone', 'I-band = isotropic; A-band = anisotropic.'],
  ['During muscle contraction', 'I-bands shorten while the A-band length stays the same', 'A-bands shorten', 'both bands lengthen', 'actin filaments shorten in length', 'Thin filaments slide over thick ones; the H-zone also narrows.'],
  ['Muscle contraction is initiated by the release of', 'Ca²⁺ from the sarcoplasmic reticulum', 'Na⁺ from the sarcolemma', 'K⁺ into the sarcoplasm', 'ATP from mitochondria only', 'Ca²⁺ binds troponin and unmasks active sites on actin for myosin.'],
  ['In the sliding filament theory, Ca²⁺ binds to', 'troponin', 'myosin', 'tropomyosin directly', 'actin', 'This shifts tropomyosin and exposes myosin-binding sites on actin.'],
  ['The myosin head (heavy meromyosin) acts as', 'an ATPase enzyme with binding sites for ATP and actin', 'a calcium pump', 'a structural part of the Z-line', 'a nucleotide', 'It hydrolyses ATP to provide energy for cross-bridge cycling.'],
  ['Red muscle fibres are rich in', 'myoglobin and mitochondria, using aerobic metabolism', 'sarcoplasmic reticulum only, with anaerobic metabolism', 'fat', 'glycogen only', 'White fibres have less myoglobin and depend on anaerobic processes.'],
  ['The longest bone of the human body is the', 'femur', 'tibia', 'humerus', 'fibula', 'The femur (thigh bone) is the longest.'],
  ['Floating ribs are', 'the 11th and 12th pairs, not connected ventrally', 'the 8th, 9th and 10th pairs', 'the first seven pairs', 'the 1st pair', 'True ribs: 1–7; vertebrochondral (false): 8–10; floating: 11–12.'],
  ['The 8th, 9th and 10th pairs of ribs are called', 'vertebrochondral (false) ribs', 'true ribs', 'floating ribs', 'cervical ribs', 'They do not articulate directly with the sternum but join the 7th rib with hyaline cartilage.'],
  ['The glenoid cavity (in the scapula) articulates with the', 'head of the humerus', 'head of the femur', 'clavicle', 'radius', 'It forms the shoulder joint.'],
  ['The acetabulum, which receives the head of the femur, is formed by the fusion of', 'ilium, ischium and pubis', 'scapula and clavicle', 'sacrum and coccyx', 'tibia and fibula', 'Each coxal bone of the pelvic girdle is formed by these three bones.'],
  ['The ear ossicles in the middle ear are', 'malleus, incus and stapes', 'hyoid, malleus and stapes', 'atlas, axis and incus', 'patella, malleus and incus', 'Three tiny bones in each middle ear.'],
  ['The cup-shaped bone covering the knee ventrally is the', 'patella', 'tibia', 'femur', 'fibula', 'Knee cap = patella.'],
  ['The first vertebra (atlas) articulates with the', 'occipital condyles of the skull', 'axis only', 'sacrum', 'ribs', 'The skull articulates with the atlas via two occipital condyles (dicondylic).'],
  ['Synovial joints are characterised by', 'a fluid-filled synovial cavity between the articulating surfaces', 'no movement', 'dense fibrous tissue fusing bones', 'cartilage fusion', 'They allow considerable movement.'],
  ['Each muscle fibre has many nuclei, so it is a', 'syncytium', 'single cell with one nucleus', 'tissue', 'organ', 'Skeletal muscle fibres are multinucleate (syncytial).']
]);
ST(C, [
  'The human skeleton has 206 bones.',
  'Each muscle fibre is lined by the plasma membrane called the sarcolemma.',
  'Tropomyosin runs along the actin filament.',
  'The sternum is a flat bone on the ventral midline of the thorax.',
  'The vertebral column protects the spinal cord.',
  'Fibrous joints do not allow any movement.'
], [
  ['The A-band shortens during muscle contraction.', 'the A-band keeps its length; the I-bands and H-zone shorten.'],
  ['White muscle fibres have plenty of myoglobin.', 'red fibres have plenty of myoglobin; white fibres have little.'],
  ['The knee joint is a ball and socket joint.', 'the knee is a hinge joint.'],
  ['Gout is caused by low Ca²⁺ in the body fluids.', 'gout is due to uric acid crystals in joints; tetany is caused by low Ca²⁺.'],
  ['There are 12 pairs of true ribs.', 'there are 7 pairs of true ribs out of 12 pairs.'],
  ['Myasthenia gravis is a genetic disorder of bones.', 'it is an autoimmune disorder affecting the neuromuscular junction.']
]);
ar(C, [
  ['During contraction the I-band shortens.', 'Actin filaments are pulled towards the centre of the sarcomere.', 0, 'Sliding of thin filaments explains A.'],
  ['Red muscle fibres are also called aerobic muscles.', 'They have a large number of mitochondria and much myoglobin.', 0, 'R explains A.'],
  ['The femur is the smallest bone in the body.', 'The stapes is in the middle ear.', 3, 'A is false (the femur is the longest); R is true.']
]);

/* ---------- 8. Neural Control and Coordination ---------- */
C = 'Neural Control and Coordination';
P(C, 'Part of brain', 'Function / feature', [
  ['Cerebrum', 'forms the major part of the brain and contains the sensory, motor and association areas'], ['Corpus callosum', 'tract of nerve fibres connecting the two cerebral hemispheres'],
  ['Hypothalamus', 'controls body temperature, urge for eating and drinking, and secretes hypothalamic hormones'], ['Limbic system (amygdala, hippocampus)', 'regulates sexual behaviour and expression of emotional reactions'],
  ['Corpora quadrigemina', 'four round swellings on the dorsal side of the midbrain'], ['Cerebellum', 'has a very convoluted surface providing space for many more neurons'],
  ['Medulla oblongata', 'controls respiration, cardiovascular reflexes and gastric secretions'], ['Pons', 'fibre tracts interconnecting different regions of the brain']
], l => `The ${l.charAt(0).toLowerCase() + l.slice(1)} is associated with`, 3);
mcs(C, [
  ['The neural system of Hydra is', 'a network of neurons (nerve net)', 'a central brain with ganglia', 'absent', 'a ventral nerve cord', 'Lower invertebrates like Hydra have a network of neurons.'],
  ['The axon terminal ends in a bulb-like structure called', 'synaptic knob', 'node of Ranvier', 'Nissl\'s granule', 'dendrite', 'Synaptic knobs contain synaptic vesicles with neurotransmitters.'],
  ['Nissl\'s granules are found in the', 'cell body and dendrites of a neuron', 'axon', 'myelin sheath', 'synaptic cleft', 'Nissl\'s granules are absent in the axon.', 'medium'],
  ['Myelinated nerve fibres are enveloped by', 'Schwann cells that form a myelin sheath', 'neuroglia only without myelin', 'connective tissue', 'nothing', 'Gaps between adjacent sheaths are the nodes of Ranvier.'],
  ['Unipolar neurons are found usually in the', 'embryonic stage', 'retina', 'cerebral cortex', 'spinal cord of adults', 'Bipolar neurons are found in the retina; multipolar in the cerebral cortex.'],
  ['At rest, the axonal membrane is', 'more permeable to K⁺ and nearly impermeable to Na⁺', 'more permeable to Na⁺', 'equally permeable to Na⁺ and K⁺', 'impermeable to all ions', 'This and the pump create the resting potential.'],
  ['The sodium–potassium pump transports', '3 Na⁺ outwards for 2 K⁺ into the cell', '2 Na⁺ outwards for 3 K⁺ in', '1 Na⁺ out for 1 K⁺ in', '3 K⁺ out for 2 Na⁺ in', 'This maintains the ionic gradients across the resting membrane.'],
  ['In the resting state, the outer surface of the axonal membrane is', 'positively charged and the inner surface negatively charged', 'negatively charged', 'neutral', 'positively charged on both sides', 'The membrane is said to be polarised.'],
  ['When a stimulus is applied at a site of the axon, the membrane becomes freely permeable to', 'Na⁺, causing depolarisation', 'K⁺, causing depolarisation', 'Cl⁻', 'Ca²⁺ only', 'Rapid influx of Na⁺ reverses the polarity.'],
  ['Repolarisation of the axon membrane is due to', 'increased permeability to K⁺ (K⁺ diffuses out)', 'influx of Na⁺', 'influx of Cl⁻', 'stopping of the Na⁺–K⁺ pump', 'The rise in K⁺ permeability restores the resting potential.'],
  ['In an electrical synapse, impulse transmission is', 'faster than at a chemical synapse', 'slower than at a chemical synapse', 'mediated by neurotransmitters', 'not possible', 'Electrical synapses are rare in our system.'],
  ['The space between pre-synaptic and post-synaptic neurons in a chemical synapse is the', 'synaptic cleft', 'node of Ranvier', 'axon hillock', 'synaptic knob', 'Neurotransmitters cross the synaptic cleft.'],
  ['The human brain is protected by the cranial meninges, which consist of (outer to inner)', 'dura mater, arachnoid and pia mater', 'pia mater, arachnoid and dura mater', 'arachnoid, dura mater and pia mater', 'pericardium and pleura', 'Dura mater is the outer layer; pia mater is in contact with brain tissue.'],
  ['The midbrain, pons and medulla together form the', 'brain stem', 'forebrain', 'hindbrain only', 'limbic system', 'The brain stem forms the connection between the brain and spinal cord.'],
  ['The autonomic neural system has two divisions:', 'sympathetic and parasympathetic', 'central and peripheral', 'somatic and visceral', 'afferent and efferent', 'Both supply involuntary organs and smooth muscles.'],
  ['The somatic neural system relays impulses from the CNS to', 'skeletal muscles', 'involuntary organs', 'smooth muscles', 'glands only', 'The autonomic system relays impulses to involuntary organs and smooth muscles.'],
  ['The cerebral cortex is referred to as the grey matter because', 'of the concentration of neuron cell bodies', 'it has myelinated fibres', 'it is made of bones', 'it lacks neurons', 'Tracts of myelinated fibres in the interior give white matter.'],
  ['The hypothalamus contains a number of centres that control', 'body temperature, urge for eating and drinking', 'only vision', 'only hearing', 'reflexes of the spinal cord', 'It also contains neurosecretory cells.']
]);
ST(C, [
  'The neural system provides an organised network of point-to-point connections for quick coordination.',
  'A neuron is made of cell body, dendrites and axon.',
  'Impulse transmission at chemical synapses involves neurotransmitters.',
  'Nodes of Ranvier are present between adjacent myelin sheaths.',
  'The cerebrum is divided into left and right hemispheres by a deep cleft.',
  'The PNS has afferent and efferent fibres.'
], [
  ['The outer surface of a resting axon membrane is negatively charged.', 'it is positively charged; the inner surface is negative.'],
  ['The axolemma is more permeable to Na⁺ than to K⁺ at rest.', 'at rest it is more permeable to K⁺ and nearly impermeable to Na⁺.'],
  ['The medulla oblongata controls temperature regulation.', 'the hypothalamus controls body temperature; the medulla controls respiration and cardiovascular reflexes.'],
  ['Electrical synapses are common in the human neural system.', 'electrical synapses are rare in our system.'],
  ['Myelinated fibres are found only in the autonomic nervous system.', 'myelinated fibres are found in spinal and cranial nerves.'],
  ['The corpus callosum connects the cerebellum to the spinal cord.', 'it connects the two cerebral hemispheres.']
]);
ar(C, [
  ['Impulse conduction in a myelinated fibre is faster than in an unmyelinated fibre.', 'In myelinated fibres the impulse jumps from node to node.', 0, 'Saltatory conduction is faster.'],
  ['The cerebellum has a very convoluted surface.', 'Convolutions provide additional space for many more neurons.', 0, 'R explains A.']
]);

/* ---------- 9. Chemical Coordination and Integration ---------- */
C = 'Chemical Coordination and Integration';
P(C, 'Hormone', 'Source', [
  ['Melatonin', 'pineal gland'], ['Thymosins', 'thymus'], ['Thyrocalcitonin (TCT)', 'thyroid gland'], ['Parathyroid hormone (PTH)', 'parathyroid glands'],
  ['Aldosterone', 'adrenal cortex'], ['Adrenaline and noradrenaline', 'adrenal medulla'], ['Glucagon', 'α-cells of the islets of Langerhans'], ['Insulin', 'β-cells of the islets of Langerhans'],
  ['Androgens (testosterone)', 'Leydig cells of the testis'], ['Progesterone', 'corpus luteum of the ovary'], ['Atrial natriuretic factor (ANF)', 'atrial wall of the heart'], ['Erythropoietin', 'juxtaglomerular cells of the kidney'],
  ['Gastrin', 'gastrointestinal tract'], ['Oxytocin and vasopressin (stored and released)', 'posterior pituitary (neurohypophysis)']
], l => `${l} is secreted (or released) by the`, 3);
P(C, 'Disorder', 'Hormonal cause', [
  ['Diabetes insipidus', 'impaired synthesis or release of ADH'], ['Diabetes mellitus', 'insufficient insulin action, causing prolonged hyperglycaemia'], ['Cretinism', 'hypothyroidism during pregnancy (defective development in the baby)'],
  ['Exophthalmic goitre (Graves\' disease)', 'hyperthyroidism'], ['Addison\'s disease', 'underproduction of hormones by the adrenal cortex'], ['Acromegaly', 'excess growth hormone in adults (especially middle age)'],
  ['Gigantism', 'over-secretion of growth hormone in childhood'], ['Pituitary dwarfism', 'low secretion of growth hormone in childhood']
], l => `${l} is caused by`, 3);
D(C, [['Aldosterone', 'zona glomerulosa'], ['Cortisol', 'zona fasciculata'], ['Some androgens', 'zona reticularis'], ['Adrenaline', 'adrenal medulla']], ['zona glomerulosa', 'zona fasciculata', 'zona reticularis', 'adrenal medulla'], l => `${l} is secreted by the`);
mcs(C, [
  ['Hormones are', 'non-nutrient chemicals that act as intercellular messengers and are produced in trace amounts', 'enzymes', 'nutrients', 'always proteins', 'They may be peptides, steroids, iodothyronines or amino-acid derivatives.'],
  ['The hormone that regulates the 24-hour (diurnal) rhythm of the body is', 'melatonin', 'thyroxine', 'oxytocin', 'insulin', 'Melatonin from the pineal gland maintains sleep–wake cycles and body temperature rhythms.'],
  ['Gonadotropin-releasing hormone (GnRH) from the hypothalamus stimulates the pituitary to release', 'gonadotropins (LH and FSH)', 'growth hormone', 'thyroxine', 'oxytocin', 'Hypothalamic hormones regulate pituitary secretion.'],
  ['Somatostatin from the hypothalamus', 'inhibits the release of growth hormone', 'stimulates growth hormone release', 'stimulates insulin release', 'stimulates thyroxine release', 'It is an inhibiting hormone.'],
  ['The hormone that stimulates the growth of mammary glands and milk formation is', 'prolactin', 'oxytocin', 'progesterone', 'MSH', 'Oxytocin causes milk ejection; prolactin regulates growth of mammary glands and milk production.'],
  ['Oxytocin acts on smooth muscles and stimulates', 'vigorous contraction of the uterus during childbirth and milk ejection', 'production of milk', 'water reabsorption', 'growth of bones', 'It is released from the posterior pituitary.'],
  ['The hormone that acts on the melanocytes and regulates skin pigmentation is', 'MSH', 'ACTH', 'TSH', 'LH', 'Melanocyte stimulating hormone.'],
  ['In males, LH stimulates the', 'synthesis and secretion of androgens from the testis', 'spermatogenesis directly', 'growth of the prostate only', 'production of FSH', 'LH and androgens with FSH regulate spermatogenesis.'],
  ['In females, LH induces', 'ovulation of fully mature follicles and maintains the corpus luteum', 'growth of follicles only', 'menstruation', 'milk ejection', 'FSH stimulates the growth and development of the ovarian follicles.'],
  ['Deficiency of iodine in the diet results in', 'hypothyroidism and enlargement of the thyroid gland (goitre)', 'hyperthyroidism', 'diabetes', 'gigantism', 'Iodine is essential for normal thyroid hormone synthesis.'],
  ['Thyrocalcitonin (TCT) regulates', 'blood calcium levels (lowers them)', 'blood glucose', 'water balance', 'basal metabolic rate', 'TCT is a protein hormone of the thyroid; PTH raises blood Ca²⁺.'],
  ['Parathyroid hormone (PTH) is a', 'hypercalcaemic hormone', 'hypocalcaemic hormone', 'hypoglycaemic hormone', 'hyperglycaemic hormone', 'PTH increases blood Ca²⁺ by bone resorption and reabsorption from tubules.'],
  ['Adrenaline and noradrenaline are called', 'catecholamines and emergency (fight-or-flight) hormones', 'steroids', 'corticoids', 'iodothyronines', 'They are secreted rapidly in response to stress.'],
  ['Glucocorticoids such as cortisol', 'stimulate gluconeogenesis, lipolysis and proteolysis and are anti-inflammatory', 'lower blood glucose', 'promote water loss', 'are secreted by the adrenal medulla', 'Cortisol also suppresses the immune response.'],
  ['Insulin is a', 'hypoglycaemic hormone', 'hyperglycaemic hormone', 'steroid hormone', 'hypercalcaemic hormone', 'Insulin increases cellular glucose uptake and glycogenesis.'],
  ['Glucagon is a', 'hyperglycaemic hormone', 'hypoglycaemic hormone', 'steroid', 'neurotransmitter', 'Glucagon stimulates glycogenolysis and gluconeogenesis.'],
  ['Hormones that interact with intracellular receptors and regulate gene expression are', 'steroid hormones and iodothyronines', 'peptide hormones', 'catecholamines', 'protein hormones', 'Lipid-soluble hormones enter the cell.'],
  ['Protein hormones act through membrane-bound receptors and generate', 'second messengers such as cAMP, IP₃ and Ca²⁺', 'mRNA directly', 'new receptors', 'antibodies', 'Second messengers regulate cellular metabolism.'],
  ['Secretin, a GI hormone, acts on the', 'exocrine pancreas and stimulates secretion of water and bicarbonate ions', 'gastric glands to secrete HCl', 'gall bladder to contract', 'liver to make glycogen', 'Gastrin stimulates HCl and pepsinogen secretion; CCK acts on pancreas and gall bladder.'],
  ['The thymus degenerates in old individuals, resulting in', 'a decreased production of thymosins and weaker immune responses', 'increased immunity', 'gigantism', 'diabetes', 'Thymosins play a major role in the differentiation of T-lymphocytes.'],
  ['The hormone that stimulates erythropoiesis is', 'erythropoietin', 'ANF', 'gastrin', 'thymosin', 'It is secreted by the JG cells of the kidney.'],
  ['The pituitary gland is located in a bony cavity called the', 'sella turcica', 'foramen magnum', 'orbit', 'acetabulum', 'The pituitary is attached to the hypothalamus by a stalk.']
]);
ST(C, [
  'Hypothalamic hormones reach the pituitary through a portal circulatory system.',
  'The posterior pituitary is under direct neural regulation of the hypothalamus.',
  'Thyroid hormones control the metabolism of carbohydrates, proteins and fats.',
  'Hyperthyroidism leads to Graves\' disease.',
  'The adrenal medulla secretes catecholamines.',
  'Steroid hormones interact with intracellular receptors.'
], [
  ['The posterior pituitary synthesises oxytocin and vasopressin.', 'they are synthesised by the hypothalamus and transported to the posterior pituitary for storage and release.'],
  ['Insulin is a hyperglycaemic hormone.', 'insulin is hypoglycaemic; glucagon is hyperglycaemic.'],
  ['PTH decreases blood calcium.', 'PTH increases blood calcium (hypercalcaemic).'],
  ['Aldosterone is secreted by the zona fasciculata.', 'aldosterone is secreted by the zona glomerulosa; cortisol comes from the zona fasciculata.'],
  ['Melatonin is secreted by the thymus.', 'melatonin is secreted by the pineal gland.'],
  ['Protein hormones enter the cell and bind to nuclear receptors.', 'protein hormones bind membrane receptors and act through second messengers.']
]);
ar(C, [
  ['Deficiency of iodine in the diet results in goitre.', 'Iodine is essential for the normal rate of thyroid hormone synthesis.', 0, 'Low iodine → hypothyroidism → enlarged thyroid.'],
  ['Adrenaline is called a fight-or-flight hormone.', 'Adrenaline increases alertness, heartbeat and breakdown of glycogen in emergencies.', 0, 'R explains A.'],
  ['Steroid hormones act through second messengers such as cAMP.', 'Steroid hormones are lipid-soluble.', 3, 'A is false (they act through intracellular receptors); R is true.']
]);
})();

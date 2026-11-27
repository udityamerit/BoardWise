/* NEET (UG) Botany question bank — NCERT Class XI Biology (rationalised syllabus), 10 Botany chapters. Original questions. */
(function () {
const NL = window.NL, S = 'bot', f = NL.f;
const mcs = (ch, l) => NL.mcs(S, ch, l), ar = (ch, l) => NL.ar(S, ch, l), gen = (ch, rows, fn) => NL.gen(S, ch, rows, fn);
const P = (ch, h1, h2, rows, ask, k) => NL.pairs(S, ch, h1, h2, rows, { list: k == null ? 3 : k, right: k == null ? 3 : k, wrong: k == null ? 3 : k, direct: rows.length, ask });
/* direct MCQs whose options come from a fixed pool of 4 answers */
const D = (ch, rows, pool, ask) => NL.add(S, ch, rows.map(([l, r]) => NL.mc(ask(l), r, pool.filter(x => x !== r).slice(0, 3), `${l} — <b>${r}</b>.`, 'easy')));
const ST = (ch, T, F) => NL.stmts(S, ch, T, F, { correct: 4, incorrect: 4, two: 4, count: 4 });

/* ---------- 1. The Living World ---------- */
let C = 'The Living World';
P(C, 'Taxon', 'Taxonomic category', [
  ['Hominidae', 'family'], ['Primata', 'order'], ['Mammalia', 'class'], ['Chordata', 'phylum'], ['Musca', 'genus'], ['Diptera', 'order'], ['Insecta', 'class'],
  ['Anacardiaceae', 'family'], ['Sapindales', 'order'], ['Poaceae', 'family'], ['Triticum', 'genus'], ['Arthropoda', 'phylum']
], l => `In the classification given in NCERT, <i>${l}</i> is a taxon at the level of`, 2);
P(C, 'Taxonomic aid', 'Description', [
  ['Herbarium', 'a store-house of dried, pressed and preserved plant specimens on sheets'],
  ['Botanical garden', 'a collection of living plants grown for identification and reference'],
  ['Museum', 'preserved plant and animal specimens kept for study and reference'],
  ['Zoological park', 'wild animals kept in protected environments similar to their natural habitats'],
  ['Key', 'an analytical aid based on contrasting characters arranged in pairs (couplets)'],
  ['Flora', 'the actual account of the habitat and distribution of plants of a given area'],
  ['Monograph', 'information on any one taxon'],
  ['Manual', 'information for identifying the names of species found in an area']
], l => `Which description fits a <b>${l}</b> as a taxonomic aid?`);
P(C, 'Organism', 'Its family', [['Man', 'Hominidae'], ['Housefly', 'Muscidae'], ['Mango', 'Anacardiaceae'], ['Wheat', 'Poaceae']], l => `${l} belongs to the family`, 1);
mcs(C, [
  ['In the scientific name <i>Mangifera indica</i> Linn., the word <i>indica</i> is the', 'specific epithet', 'genus', 'family', 'name of the author who first described it', 'Binomial nomenclature: the first word is the genus (capital letter), the second the specific epithet (small letter); Linn. is the author citation.'],
  ['In the name <i>Mangifera indica</i> Linn., "Linn." indicates', 'the name of the scientist who first described the species', 'the place where the plant was found', 'the family of the plant', 'the variety of mango', 'The author citation (here Linnaeus) is written after the specific epithet in an abbreviated form.'],
  ['The system of binomial nomenclature was given by', 'Carolus Linnaeus', 'Charles Darwin', 'Ernst Mayr', 'R. H. Whittaker', 'Linnaeus introduced binomial nomenclature.'],
  ['The names of plants are given according to the', 'ICBN (International Code of Botanical Nomenclature)', 'ICZN', 'ICNB', 'ICVN', 'Plant names follow the ICBN; animal names follow the ICZN.'],
  ['The basic unit of classification is', 'species', 'genus', 'family', 'kingdom', 'A species is the lowest (basic) taxonomic category.'],
  ['A group of related genera with fewer similarities than genera is called a', 'family', 'order', 'class', 'species', 'Genera with common features form a family.'],
  ['Which of the following is the correct sequence of taxonomic categories (from lower to higher)?', 'Species → Genus → Family → Order → Class → Phylum', 'Species → Family → Genus → Order → Class → Phylum', 'Genus → Species → Order → Family → Class → Phylum', 'Species → Genus → Order → Family → Phylum → Class', 'The hierarchy rises from species to kingdom: species, genus, family, order, class, phylum/division, kingdom.'],
  ['As we go up from species to kingdom, the number of common characters', 'decreases', 'increases', 'remains the same', 'first increases then decreases', 'Higher categories contain more diverse organisms, so they share fewer common features.'],
  ['The term "systematics" comes from the Latin word "systema", which means', 'systematic arrangement of organisms', 'naming of organisms', 'study of fossils', 'identification only', 'Linnaeus used <i>Systema Naturae</i>; systematics deals with the arrangement of organisms and their evolutionary relationships.'],
  ['Which of the following is a defining feature of all living organisms?', 'Cellular organisation and consciousness', 'Growth', 'Reproduction', 'Increase in mass', 'Growth and reproduction are not all-inclusive (mules do not reproduce; non-living things also grow by accumulation). Consciousness and metabolism are defining features.', 'medium'],
  ['The sum total of all the chemical reactions occurring in our body is called', 'metabolism', 'growth', 'homeostasis', 'reproduction', 'All living organisms carry out metabolism; it is a defining feature of life.'],
  ['In unicellular organisms, the terms growth and reproduction are', 'synonymous', 'unrelated', 'always separate events', 'not applicable', 'A unicellular organism grows by cell division, which is also its reproduction.']
]);
ST(C, [
  'Growth cannot be taken as a defining property of living organisms.',
  'Reproduction cannot be an all-inclusive defining characteristic of living organisms.',
  'Metabolism is a defining feature of all living organisms.',
  'In multicellular organisms, growth occurs by cell division.',
  'Human beings are the only organisms who are aware of themselves (self-consciousness).',
  'The genus name of an organism always starts with a capital letter.',
  'Taxonomic keys are based on contrasting characters generally in a pair called a couplet.'
], [
  ['Non-living objects can never grow.', 'non-living objects such as mountains and sand mounds grow by accumulation of material on the surface.'],
  ['Mules, sterile worker bees and infertile human couples are non-living because they do not reproduce.', 'reproduction is not all-inclusive; these are still living.'],
  ['Order is a lower category than family.', 'a family is a lower category; related families form an order.'],
  ['Both words of a biological name start with capital letters.', 'only the genus begins with a capital letter; the specific epithet starts with a small letter.'],
  ['Flora contains information on any one taxon only.', 'that is a monograph; a flora covers the plants of a given area.'],
  ['Herbarium sheets carry only the common name of the plant.', 'they carry the botanical name, family, collector\'s name, date and place of collection, etc.']
]);
ar(C, [
  ['Growth is not a defining property of living organisms.', 'Non-living things also increase in mass by accumulation of material on the surface.', 0, 'R is exactly why growth cannot define life.'],
  ['Biological names are generally in Latin and written in italics.', 'Latin names are given so that one organism has a single universally accepted name.', 0, 'A universal scientific name avoids the confusion of local names.']
]);

/* ---------- 2. Biological Classification ---------- */
C = 'Biological Classification';
P(C, 'Fungus', 'Class', [
  ['<i>Mucor</i>', 'Phycomycetes'], ['<i>Rhizopus</i>', 'Phycomycetes'], ['<i>Albugo</i>', 'Phycomycetes'], ['<i>Penicillium</i>', 'Ascomycetes'], ['<i>Claviceps</i>', 'Ascomycetes'], ['<i>Neurospora</i>', 'Ascomycetes'],
  ['<i>Agaricus</i>', 'Basidiomycetes'], ['<i>Ustilago</i>', 'Basidiomycetes'], ['<i>Puccinia</i>', 'Basidiomycetes'], ['<i>Alternaria</i>', 'Deuteromycetes'], ['<i>Colletotrichum</i>', 'Deuteromycetes'], ['<i>Trichoderma</i>', 'Deuteromycetes']
], l => `${l} belongs to the fungal class`);
P(C, 'Protist', 'Group', [
  ['Diatoms', 'Chrysophytes'], ['<i>Gonyaulax</i>', 'Dinoflagellates'], ['<i>Euglena</i>', 'Euglenoids'], ['<i>Trypanosoma</i>', 'Flagellated protozoans'],
  ['<i>Paramoecium</i>', 'Ciliated protozoans'], ['<i>Plasmodium</i>', 'Sporozoans'], ['<i>Amoeba</i>', 'Amoeboid protozoans']
], l => `${l} is placed among the`);
P(C, 'Fungal class', 'Sexual spores', [['Phycomycetes', 'zygospores'], ['Ascomycetes', 'ascospores in asci'], ['Basidiomycetes', 'basidiospores on basidia'], ['Deuteromycetes', 'no sexual stage known']], l => `The sexual reproduction of ${l} involves`, 1);
mcs(C, [
  ['The five-kingdom classification was proposed by', 'R. H. Whittaker (1969)', 'Carolus Linnaeus', 'Ernst Haeckel', 'Aristotle', 'Whittaker proposed Monera, Protista, Fungi, Plantae and Animalia.'],
  ['The main criteria used by Whittaker for classification include', 'cell structure, body organisation, mode of nutrition, reproduction and phylogenetic relationships', 'only the mode of nutrition', 'only cell wall composition', 'the habitat of organisms', 'Whittaker used all these characters together.'],
  ['Methanogens, which produce methane in the gut of ruminants, are', 'archaebacteria', 'eubacteria', 'cyanobacteria', 'mycoplasma', 'Methanogens, halophiles and thermoacidophiles are archaebacteria.'],
  ['Archaebacteria differ from other bacteria in having', 'a different cell wall structure', 'no DNA', 'a true nucleus', 'chloroplasts', 'Their distinct cell wall structure helps them survive extreme conditions.'],
  ['The specialised cells for nitrogen fixation in <i>Nostoc</i> and <i>Anabaena</i> are', 'heterocysts', 'akinetes', 'hormogonia', 'gemmae', 'Heterocysts are specialised for fixing atmospheric nitrogen.'],
  ['Organisms that completely lack a cell wall and are the smallest living cells known are', 'mycoplasma', 'cyanobacteria', 'viroids', 'archaebacteria', 'Mycoplasma lack a cell wall and can survive without oxygen.'],
  ['Red tides in the sea are caused by the rapid multiplication of', '<i>Gonyaulax</i> (dinoflagellates)', 'diatoms', '<i>Euglena</i>', 'slime moulds', 'Red dinoflagellates such as <i>Gonyaulax</i> make the sea appear red; they release toxins that can kill fish.'],
  ['Diatomaceous earth is formed from', 'the indestructible siliceous cell walls of diatoms', 'calcareous shells of foraminifers', 'fossil fungi', 'dinoflagellate plates', 'Diatom cell walls contain silica, so they accumulate as diatomaceous earth used in polishing and filtration.'],
  ['The slime moulds under unfavourable conditions form', 'fruiting bodies bearing spores with true walls', 'cysts with cellulose walls', 'zygospores', 'heterocysts', 'The plasmodium differentiates into fruiting bodies with spores that are extremely resistant.'],
  ['The cell wall of fungi is made of', 'chitin and polysaccharides', 'cellulose', 'peptidoglycan only', 'pectin only', 'Fungal cell walls are composed of chitin and polysaccharides.'],
  ['The dikaryophase (n + n) is characteristic of', 'Ascomycetes and Basidiomycetes', 'Phycomycetes only', 'Deuteromycetes only', 'all algae', 'In these fungi plasmogamy is followed by a dikaryotic stage before karyogamy.'],
  ['Deuteromycetes are called imperfect fungi because', 'only their asexual (or vegetative) phase is known', 'they cause disease', 'they have no mycelium', 'they are unicellular', 'When the sexual stage of a deuteromycete is found, it is moved to Ascomycetes or Basidiomycetes.'],
  ['The infectious agent consisting of free RNA without a protein coat is', 'a viroid', 'a virus', 'a prion', 'a bacteriophage', 'T. O. Diener (1971) discovered viroids, e.g. the cause of potato spindle tuber disease.'],
  ['Prions are infectious agents made of', 'abnormally folded protein', 'free RNA', 'DNA only', 'lipids', 'Prions cause diseases such as bovine spongiform encephalopathy (mad cow disease).'],
  ['The name "virus" (meaning venom or poisonous fluid) was given by', 'Dmitri Ivanowsky', 'M. W. Beijerinck', 'W. M. Stanley', 'Louis Pasteur', 'Ivanowsky (1892) recognised the causal organism of mosaic disease of tobacco and found it smaller than bacteria.', 'medium'],
  ['"Contagium vivum fluidum" (infectious living fluid) was the term used by', 'M. W. Beijerinck', 'Ivanowsky', 'W. M. Stanley', 'Robert Koch', 'Beijerinck (1898) showed that the extract of infected tobacco plants could cause infection.', 'medium'],
  ['W. M. Stanley (1935) showed that viruses', 'could be crystallised and are made mostly of proteins', 'are made of lipids', 'have a cell wall', 'are bacteria', 'Viruses are inert crystalline structures outside the living cell.'],
  ['The genetic material of the tobacco mosaic virus (TMV) is', 'single-stranded RNA', 'double-stranded DNA', 'single-stranded DNA', 'protein', 'Plant viruses generally have single-stranded RNA.'],
  ['In lichens, the algal partner and the fungal partner are called respectively', 'phycobiont and mycobiont', 'mycobiont and phycobiont', 'symbiont and host', 'parasite and host', 'Algae prepare food (phycobiont); fungi provide shelter and absorb nutrients and water (mycobiont).'],
  ['Lichens are very good pollution indicators because', 'they do not grow in polluted areas', 'they grow fastest in polluted air', 'they absorb SO₂ and convert it to sugar', 'they are parasites', 'Lichens are sensitive to pollution, especially SO₂.'],
  ['<i>Albugo</i>, the parasitic fungus on mustard, belongs to', 'Phycomycetes', 'Ascomycetes', 'Basidiomycetes', 'Deuteromycetes', '<i>Albugo</i> (white rust of mustard) is a phycomycete.'],
  ['Bacteria that oxidise various inorganic substances such as nitrates, nitrites and ammonia and use the energy released are', 'chemosynthetic autotrophs', 'photosynthetic autotrophs', 'heterotrophs', 'parasites', 'Chemoautotrophs help in recycling nutrients like nitrogen, phosphorus, iron and sulphur.']
]);
ST(C, [
  'Fungi are heterotrophic organisms.',
  'Euglenoids lack a cell wall and have a protein-rich layer called the pellicle.',
  'Viruses are obligate parasites.',
  'Kingdom Protista includes all single-celled eukaryotes.',
  'Mycoplasma can survive without oxygen.',
  'Cyanobacteria often form blooms in polluted water bodies.',
  'Yeast is a unicellular fungus.'
], [
  ['Cyanobacteria have a true nucleus.', 'cyanobacteria are prokaryotes (kingdom Monera).'],
  ['Viruses have their own metabolic machinery.', 'viruses use the host cell machinery; they are inert outside a living cell.'],
  ['Chrysophytes have walls made of cellulose plates that fit like a soap box.', 'chrysophytes (diatoms) have siliceous walls; it is dinoflagellates that have cellulose plates on the outer surface.'],
  ['Viroids have a protein coat.', 'viroids are free RNA without a protein coat.'],
  ['All fungi are multicellular.', 'yeast is unicellular.'],
  ['Phycomycetes have septate mycelium.', 'their mycelium is aseptate and coenocytic.']
]);
ar(C, [
  ['Lichens are good pollution indicators.', 'Lichens do not grow in polluted areas.', 0, 'Their absence indicates polluted air.'],
  ['Euglenoids show both autotrophic and heterotrophic nutrition.', 'In the absence of sunlight euglenoids behave like heterotrophs by predating on smaller organisms.', 0, 'They photosynthesise in light and feed heterotrophically in darkness.'],
  ['Mycoplasma are resistant to penicillin.', 'Mycoplasma lack a cell wall.', 0, 'Penicillin acts on cell-wall synthesis; with no wall, mycoplasma are unaffected.']
]);

/* ---------- 3. Plant Kingdom ---------- */
C = 'Plant Kingdom';
P(C, 'Alga', 'Class', [
  ['<i>Chlamydomonas</i>', 'Chlorophyceae'], ['<i>Volvox</i>', 'Chlorophyceae'], ['<i>Spirogyra</i>', 'Chlorophyceae'], ['<i>Chara</i>', 'Chlorophyceae'], ['<i>Ulothrix</i>', 'Chlorophyceae'],
  ['<i>Ectocarpus</i>', 'Phaeophyceae'], ['<i>Laminaria</i>', 'Phaeophyceae'], ['<i>Sargassum</i>', 'Phaeophyceae'], ['<i>Fucus</i>', 'Phaeophyceae'], ['<i>Dictyota</i>', 'Phaeophyceae'],
  ['<i>Polysiphonia</i>', 'Rhodophyceae'], ['<i>Porphyra</i>', 'Rhodophyceae'], ['<i>Gracilaria</i>', 'Rhodophyceae'], ['<i>Gelidium</i>', 'Rhodophyceae']
], l => `${l} is a member of`, 2);
D(C, [
  ['Stored food is floridean starch', 'Rhodophyceae'], ['Main pigment is r-phycoerythrin', 'Rhodophyceae'], ['Stored food is laminarin or mannitol', 'Phaeophyceae'], ['Pigments include fucoxanthin', 'Phaeophyceae'],
  ['Chlorophyll a and b; food stored as starch in pyrenoids', 'Chlorophyceae'], ['Cell wall has an inner layer of cellulose and an outer layer of algin', 'Phaeophyceae'], ['Pear-shaped zoospores with two unequal lateral flagella', 'Phaeophyceae']
], ['Chlorophyceae', 'Phaeophyceae', 'Rhodophyceae', 'Myxophyceae'], l => `"${l}" is a feature of the algal class`);
P(C, 'Plant', 'Group', [
  ['<i>Marchantia</i>', 'liverwort (bryophyte)'], ['<i>Funaria</i>', 'moss (bryophyte)'], ['<i>Sphagnum</i>', 'moss (bryophyte)'], ['<i>Selaginella</i>', 'pteridophyte'], ['<i>Equisetum</i>', 'pteridophyte'], ['<i>Dryopteris</i>', 'pteridophyte'],
  ['<i>Cycas</i>', 'gymnosperm'], ['<i>Pinus</i>', 'gymnosperm'], ['<i>Ginkgo</i>', 'gymnosperm'], ['<i>Sargassum</i>', 'brown alga'], ['<i>Polysiphonia</i>', 'red alga']
], l => `${l} is a`);
P(C, 'Plant', 'Notable feature', [
  ['<i>Sphagnum</i>', 'provides peat used as fuel and as packing material'], ['<i>Cycas</i>', 'coralloid roots associated with N₂-fixing cyanobacteria'], ['<i>Pinus</i>', 'roots associated with fungi as mycorrhiza'],
  ['<i>Sequoia</i>', 'one of the tallest tree species (a gymnosperm)'], ['<i>Selaginella</i> and <i>Salvinia</i>', 'heterosporous pteridophytes'], ['<i>Marchantia</i>', 'asexual reproduction by gemmae in gemma cups'],
  ['<i>Gelidium</i> and <i>Gracilaria</i>', 'source of agar'], ['<i>Chlorella</i>', 'protein-rich unicellular alga used as food supplement']
], l => `Which of these is true of ${l}?`);
mcs(C, [
  ['The life cycle of <i>Volvox</i>, <i>Spirogyra</i> and <i>Chlamydomonas</i> is', 'haplontic', 'diplontic', 'haplo-diplontic', 'diplo-haplontic only in <i>Spirogyra</i>', 'The dominant phase is the free-living haploid gametophyte; the zygote is the only diploid stage.'],
  ['The life-cycle pattern of all seed-bearing plants (gymnosperms and angiosperms) is', 'diplontic', 'haplontic', 'haplo-diplontic', 'isomorphic', 'The diploid sporophyte is dominant; the gametophyte is reduced.'],
  ['Bryophytes and pteridophytes show the life-cycle pattern called', 'haplo-diplontic', 'haplontic', 'diplontic', 'diploid only', 'Both phases are multicellular.'],
  ['In bryophytes the dominant, independent phase is the', 'gametophyte', 'sporophyte', 'protonema only', 'seed', 'The main plant body is the haploid gametophyte; the sporophyte is attached to it.'],
  ['In pteridophytes the main plant body is the', 'sporophyte (differentiated into root, stem and leaves)', 'gametophyte', 'protonema', 'prothallus', 'Pteridophytes are the first terrestrial plants with vascular tissues; the sporophyte is dominant.'],
  ['The first terrestrial plants to possess vascular tissues (xylem and phloem) are', 'pteridophytes', 'bryophytes', 'gymnosperms', 'algae', 'Pteridophytes have xylem and phloem.'],
  ['Bryophytes are called the amphibians of the plant kingdom because', 'they live in soil but need water for sexual reproduction', 'they live only in water', 'they have both xylem and phloem', 'they are found only in the sea', 'Their male gametes swim to the egg, so water is needed for fertilisation.'],
  ['The ploidy of the endosperm in gymnosperms is', 'haploid (n)', 'diploid (2n)', 'triploid (3n)', 'tetraploid (4n)', 'The gymnosperm endosperm is the female gametophyte tissue: <b>haploid</b>.', 'medium'],
  ['The protonema stage is found in the life cycle of', 'mosses', 'liverworts', 'ferns', 'gymnosperms', 'The moss spore germinates into a creeping, green, branched filamentous protonema.'],
  ['The male sex organ in bryophytes and pteridophytes is the', 'antheridium', 'archegonium', 'oogonium', 'ovule', 'The antheridium produces antherozoids; the flask-shaped archegonium produces the egg.'],
  ['In gymnosperms the ovules are', 'naked (not enclosed in an ovary)', 'enclosed in an ovary', 'absent', 'formed inside fruits', '"Gymnos" = naked; the ovules are not covered by an ovary wall before or after fertilisation.'],
  ['Heterospory (two kinds of spores) in <i>Selaginella</i> and <i>Salvinia</i> is considered a precursor to', 'the seed habit', 'the protonema', 'vascular tissue', 'the haplontic life cycle', 'Retention of the megaspore and development of the female gametophyte inside it is a step towards seeds.', 'medium'],
  ['Agar, used to grow microbes and in ice-creams and jellies, is obtained from', '<i>Gelidium</i> and <i>Gracilaria</i>', '<i>Laminaria</i>', '<i>Chlorella</i>', '<i>Spirulina</i>', 'Agar is a commercial product of these red algae.'],
  ['Algin is obtained from', 'brown algae', 'red algae', 'green algae', 'blue-green algae', 'Algin (hydrocolloid) comes from brown algae; carrageen from red algae.'],
  ['Most of the red algae are', 'marine, found in warmer areas', 'freshwater only', 'terrestrial', 'parasitic on plants', 'Red algae are mostly marine.'],
  ['The giant kelps (up to 100 m tall) belong to', 'brown algae', 'red algae', 'green algae', 'bryophytes', 'Kelps are brown algae.'],
  ['Male and female cones in gymnosperms bear respectively', 'microsporophylls and megasporophylls', 'archegonia and antheridia', 'ovules and pollen', 'zoospores and aplanospores', 'Male strobili have microsporophylls with microsporangia; female strobili have megasporophylls with ovules.']
]);
ST(C, [
  'Bryophytes play an important role in plant succession on bare rocks.',
  'In mosses the sporophyte is more elaborate than in liverworts.',
  'In gymnosperms the male and female gametophytes do not have an independent free-living existence.',
  'Pteridophytes need water for fertilisation.',
  'Many algae are used as food, e.g. <i>Porphyra</i>, <i>Laminaria</i> and <i>Sargassum</i>.',
  'Fucus shows a diplontic life cycle among algae.',
  'Gymnosperm leaves are well adapted to withstand extremes of temperature, humidity and wind.'
], [
  ['Bryophytes have true roots, stems and leaves.', 'their plant body has root-like, stem-like and leaf-like structures; true roots, stems and leaves are absent.'],
  ['The sporophyte of a moss is free-living.', 'it is attached to the gametophyte and derives nourishment from it.'],
  ['Red algae store food as laminarin.', 'red algae store floridean starch; laminarin is stored by brown algae.'],
  ['Gymnosperms produce fruits.', 'gymnosperms have naked seeds and do not form fruits.'],
  ['All pteridophytes are heterosporous.', 'most are homosporous; only a few like <i>Selaginella</i> and <i>Salvinia</i> are heterosporous.'],
  ['Chlorophyceae lack chlorophyll b.', 'green algae contain chlorophyll a and b.']
]);
ar(C, [
  ['Bryophytes are called the amphibians of the plant kingdom.', 'They can live in soil but are dependent on water for sexual reproduction.', 0, 'R is the reason for the name.'],
  ['<i>Sphagnum</i> is used as packing material for trans-shipment of living material.', 'It has the capacity to hold water.', 0, 'Its water-holding capacity keeps living material moist.'],
  ['Gymnosperms show diplontic life cycle.', 'In gymnosperms the gametophyte is the dominant phase.', 2, 'In gymnosperms the sporophyte is dominant; R is false.']
]);

/* ---------- 4. Morphology of Flowering Plants ---------- */
C = 'Morphology of Flowering Plants';
P(C, 'Plant', 'Aestivation', [
  ['<i>Calotropis</i>', 'valvate'], ['China rose', 'twisted'], ['Lady\'s finger', 'twisted'], ['Cotton', 'twisted'], ['<i>Cassia</i>', 'imbricate'], ['Gulmohur', 'imbricate'], ['Pea', 'vexillary (papilionaceous)'], ['Bean', 'vexillary (papilionaceous)']
], l => `The aestivation of the corolla in ${l} is`, 2);
P(C, 'Plant', 'Placentation', [
  ['Pea', 'marginal'], ['China rose', 'axile'], ['Tomato', 'axile'], ['Lemon', 'axile'], ['Mustard', 'parietal'], ['<i>Argemone</i>', 'parietal'], ['<i>Dianthus</i>', 'free central'], ['Primrose', 'free central'], ['Sunflower', 'basal'], ['Marigold', 'basal']
], l => `The type of placentation in ${l} is`);
P(C, 'Plant', 'Modification', [
  ['Carrot', 'tap root swollen to store food'], ['Sweet potato', 'adventitious root swollen to store food'], ['Banyan', 'prop roots'], ['Maize', 'stilt roots'], ['<i>Rhizophora</i>', 'pneumatophores (roots coming above ground for respiration)'],
  ['Potato', 'underground stem (tuber) storing food'], ['Cucumber', 'stem tendrils'], ['<i>Citrus</i>', 'stem modified into thorns'], ['<i>Opuntia</i>', 'flattened green stem (phylloclade)'], ['Pea', 'leaflets modified into tendrils'],
  ['Cactus', 'leaves modified into spines'], ['Onion', 'fleshy leaves storing food'], ['Australian acacia', 'phyllode (green, leaf-like petiole)'], ['Pitcher plant', 'leaf modified to trap insects'], ['<i>Pistia</i>', 'offset']
], l => `The characteristic modification seen in ${l} is`, 3);
P(C, 'Plant', 'Family', [
  ['Pea', 'Fabaceae'], ['Gram', 'Fabaceae'], ['Soybean', 'Fabaceae'], ['Groundnut', 'Fabaceae'], ['Tomato', 'Solanaceae'], ['Brinjal', 'Solanaceae'], ['Petunia', 'Solanaceae'], ['Ashwagandha', 'Solanaceae'],
  ['Tulip', 'Liliaceae'], ['<i>Gloriosa</i>', 'Liliaceae'], ['Aloe', 'Liliaceae'], ['<i>Asparagus</i>', 'Liliaceae'], ['Wheat', 'Poaceae']
], l => `${l} belongs to the family`);
mcs(C, [
  ['The phyllotaxy of <i>Alstonia</i> is', 'whorled', 'alternate', 'opposite', 'spiral', 'More than two leaves arise at a node in <i>Alstonia</i>.'],
  ['Opposite phyllotaxy is seen in', '<i>Calotropis</i> and guava', 'china rose and mustard', 'sunflower and mustard', '<i>Alstonia</i>', 'A pair of leaves arises at each node, opposite each other.'],
  ['A flower with superior ovary, and other floral parts below it, is called', 'hypogynous', 'perigynous', 'epigynous', 'zygomorphic', 'In a hypogynous flower (mustard, china rose, brinjal) the ovary is superior.'],
  ['Perigynous flowers are found in', 'plum, rose and peach', 'mustard and china rose', 'guava and cucumber', 'brinjal and tomato', 'The ovary is half-inferior in perigynous flowers.'],
  ['The ovary is inferior (epigynous flower) in', 'guava and cucumber', 'mustard', 'plum', 'brinjal', 'The thalamus grows up and fuses with the ovary wall.'],
  ['Mango and coconut fruits are', 'drupes', 'berries', 'pomes', 'nuts', 'Drupes develop from monocarpellary superior ovaries and are one-seeded.'],
  ['In coconut the edible part is the', 'endosperm', 'mesocarp', 'pericarp', 'cotyledon', 'Coconut "water" and the white kernel are endosperm; the mesocarp is fibrous.', 'medium'],
  ['In mango the edible part is the', 'fleshy mesocarp', 'endocarp', 'endosperm', 'thalamus', 'Mango has a thin epicarp, fleshy edible mesocarp and hard stony endocarp.'],
  ['A fruit that develops without fertilisation is called', 'a parthenocarpic fruit', 'a false fruit', 'a drupe', 'an aggregate fruit', 'Parthenocarpy gives seedless fruits.'],
  ['The swollen leaf base seen in leguminous plants is called', 'pulvinus', 'stipule', 'sheath', 'ligule', 'The leaf base of legumes may become swollen into a pulvinus.'],
  ['In monocotyledonous plants, venation is generally', 'parallel', 'reticulate', 'absent', 'pinnate reticulate', 'Veins run parallel to each other in most monocot leaves.'],
  ['Pinnately compound leaves are found in', 'neem', 'silk cotton', 'china rose', 'mango', 'In neem, leaflets are present on a common axis (rachis).'],
  ['Palmately compound leaves are found in', 'silk cotton', 'neem', 'pea', 'mustard', 'Leaflets are attached at a common point, the tip of the petiole.'],
  ['The floral formula of Liliaceae is', 'Br ⊕ ⚥ P<sub>(3+3)</sub> A<sub>3+3</sub> <u>G</u><sub>(3)</sub>', '% ⚥ K<sub>(5)</sub> C<sub>1+2+(2)</sub> A<sub>(9)+1</sub> <u>G</u><sub>1</sub>', '⊕ ⚥ K<sub>(5)</sub> C<sub>(5)</sub> A<sub>5</sub> <u>G</u><sub>(2)</sub>', '⊕ ⚥ K<sub>4</sub> C<sub>4</sub> A<sub>2+4</sub> <u>G</u><sub>(2)</sub>', 'Lily: trimerous perianth in two whorls, 6 stamens, tricarpellary syncarpous superior ovary.', 'medium'],
  ['The floral formula with K<sub>(5)</sub> C<sub>1+2+(2)</sub> A<sub>(9)+1</sub> (diadelphous stamens) belongs to', 'Fabaceae', 'Solanaceae', 'Liliaceae', 'Poaceae', 'Papilionaceous corolla and diadelphous stamens are typical of Fabaceae.', 'medium'],
  ['Epipetalous stamens (attached to petals) are found in', 'brinjal', 'pea', 'lily', 'mustard', 'In Solanaceae, the five stamens are epipetalous.', 'medium'],
  ['Stamens attached to the perianth (epiphyllous) are found in', 'lily', 'brinjal', 'pea', 'china rose', 'Liliaceae flowers have epiphyllous stamens.'],
  ['The fruit of members of family Fabaceae is a', 'legume (pod)', 'berry', 'capsule', 'drupe', 'Fabaceae fruit: legume; seed non-endospermic.'],
  ['Prop roots arising from branches that grow down into the soil are seen in', 'banyan', 'maize', 'carrot', '<i>Rhizophora</i>', 'Hanging prop roots of the banyan tree support its big branches.']
]);
ST(C, [
  'The leaves of monocots generally show parallel venation.',
  'In a pea flower the standard petal (vexillum) is the largest.',
  'An ovary that develops into a fruit without fertilisation forms a parthenocarpic fruit.',
  'Brinjal, tomato and potato belong to the same family.',
  'In axile placentation the ovary is divided into chambers.',
  'A flower that can be divided into two equal halves in only one vertical plane is zygomorphic.',
  'In grasses and wheat, fibrous roots arise from the base of the stem.'
], [
  ['Sweet potato is a modified stem.', 'it is a modified adventitious root.'],
  ['Potato is a modified root.', 'potato is an underground stem tuber (it has nodes and eyes).'],
  ['Mustard shows marginal placentation.', 'mustard shows parietal placentation; pea shows marginal placentation.'],
  ['Tendrils of cucumber develop from leaves.', 'cucumber tendrils are modified stems (from axillary buds).'],
  ['Mango is a berry.', 'mango is a drupe.'],
  ['Pea flowers are actinomorphic.', 'pea flowers are zygomorphic.']
]);
ar(C, [
  ['Potato is a stem and not a root.', 'Potato tubers bear nodes with buds (eyes).', 0, 'Nodes and axillary buds identify stems.'],
  ['Pneumatophores are found in <i>Rhizophora</i>.', 'Plants in swampy areas need roots that grow up above the ground to get oxygen for respiration.', 0, 'Pneumatophores help in respiration in waterlogged soil.']
]);

/* ---------- 5. Anatomy of Flowering Plants ---------- */
C = 'Anatomy of Flowering Plants';
P(C, 'Tissue / structure', 'Feature', [
  ['Collenchyma', 'cells thickened at the corners by cellulose, hemicellulose and pectin'], ['Sclereids', 'found in the pulp of guava, pear and sapota and in nut shells'],
  ['Phloem fibres', 'bast fibres used commercially (jute, flax, hemp)'], ['Companion cells', 'specialised parenchyma connected to sieve tubes by pit fields'],
  ['Intercalary meristem', 'occurs in grasses and regenerates parts removed by grazing herbivores'], ['Endodermis', 'cells with Casparian strips made of suberin'],
  ['Pericycle', 'gives rise to lateral roots'], ['Bulliform cells', 'cause leaves of grasses to roll inwards under water stress'], ['Albuminous cells', 'present instead of companion cells in gymnosperms']
], l => `${l} is best described as`, 3);
P(C, 'Feature', 'Found in', [
  ['Polyarch xylem (more than six bundles)', 'monocot root'], ['Scattered vascular bundles with sclerenchymatous sheath', 'monocot stem'], ['Conjoint, open vascular bundles in a ring', 'dicot stem'],
  ['Two to four xylem bundles (diarch to tetrarch)', 'dicot root'], ['Bulliform cells on the adaxial epidermis', 'monocot (grass) leaf'], ['Distinct palisade and spongy mesophyll', 'dicot (dorsiventral) leaf']
], l => `"${l}" is characteristic of a`, 3);
mcs(C, [
  ['Xylem in roots is', 'exarch (protoxylem towards the periphery)', 'endarch', 'mesarch', 'centrarch', 'In roots protoxylem lies outside metaxylem: exarch.'],
  ['Xylem in stems is', 'endarch (protoxylem towards the centre)', 'exarch', 'polyarch', 'absent', 'In stems protoxylem lies towards the pith: endarch.'],
  ['Gymnosperms lack', 'vessels in xylem', 'tracheids', 'phloem', 'xylem parenchyma', 'Vessels are a characteristic feature of angiosperms; gymnosperms have tracheids.'],
  ['The only living elements of xylem are', 'xylem parenchyma cells', 'tracheids', 'vessels', 'xylem fibres', 'Tracheids, vessels and fibres are dead at maturity.'],
  ['Sieve tube elements at maturity lack', 'a nucleus', 'cytoplasm', 'cell wall', 'sieve plates', 'A mature sieve tube element has peripheral cytoplasm and a large vacuole but no nucleus; companion cells control it.'],
  ['Phloem parenchyma is absent in', 'most monocots', 'dicots', 'gymnosperms', 'pteridophytes', 'Most monocotyledons lack phloem parenchyma.'],
  ['Radial vascular bundles (xylem and phloem on different radii) occur in', 'roots', 'stems', 'leaves', 'flowers', 'In roots xylem and phloem alternate on different radii.'],
  ['The vascular bundles of monocot stems are', 'conjoint and closed', 'conjoint and open', 'radial', 'bicollateral and open', 'They lack cambium (closed).'],
  ['Casparian strips are found in the', 'endodermis', 'pericycle', 'cortex', 'epidermis', 'The innermost layer of the cortex, the endodermis, has suberised Casparian strips.'],
  ['Stomata in grasses have', 'dumb-bell-shaped guard cells', 'bean-shaped guard cells', 'no guard cells', 'kidney-shaped subsidiary cells only', 'In grasses guard cells are dumb-bell shaped.'],
  ['Root hairs are', 'unicellular elongations of epidermal cells', 'multicellular', 'part of the cortex', 'formed by the pericycle', 'Root hairs are unicellular; shoot trichomes are usually multicellular.'],
  ['In a dicot stem, the hypodermis is', 'collenchymatous', 'sclerenchymatous', 'parenchymatous with chloroplasts only', 'absent', 'A few layers of collenchyma below the epidermis provide mechanical strength to the young stem.'],
  ['In a monocot stem, the hypodermis is', 'sclerenchymatous', 'collenchymatous', 'absent', 'chlorenchymatous only', 'Monocot stems have a sclerenchymatous hypodermis.'],
  ['Water-containing cavities are present within the vascular bundles of', 'monocot stem', 'dicot stem', 'dicot root', 'dicot leaf', 'A characteristic of monocot stems.'],
  ['The starch sheath of a dicot stem is the', 'endodermis', 'pericycle', 'hypodermis', 'pith', 'The endodermis of the stem is rich in starch grains.'],
  ['The cells of the epidermis that surround the guard cells and are specialised in shape and size are', 'subsidiary cells', 'bulliform cells', 'companion cells', 'trichomes', 'Guard cells, pore and subsidiary cells together form the stomatal apparatus.'],
  ['The tissue that forms the major part of the pulp of fruits, cortex, pith and mesophyll is', 'parenchyma', 'collenchyma', 'sclerenchyma', 'xylem', 'Parenchyma is the most common simple tissue.'],
  ['Fibres are', 'thick-walled, elongated, pointed sclerenchyma cells', 'living cells with thin walls', 'short sclerenchyma cells', 'conducting cells of xylem', 'Fibres occur in groups in various parts of the plant; sclereids are short and spherical/oval.']
]);
ST(C, [
  'Meristems at the root and shoot tips are apical meristems.',
  'The pericycle of the root gives rise to lateral roots and part of the vascular cambium.',
  'In dicot leaves the stomata are more on the abaxial (lower) epidermis.',
  'Isobilateral leaves have stomata on both surfaces.',
  'Tracheids and vessels are the main water-conducting elements in xylem.',
  'Sclerenchyma provides mechanical support to organs.',
  'The pith is small or inconspicuous in a monocot root.'
], [
  ['Vessels are found in all gymnosperms.', 'gymnosperms lack vessels (except a few like <i>Gnetum</i>); they have tracheids.'],
  ['Collenchyma is a dead tissue.', 'collenchyma is a living tissue.'],
  ['Monocot stems have open vascular bundles.', 'they have closed bundles (no cambium).'],
  ['Dicot roots have polyarch xylem.', 'dicot roots have two to four xylem bundles; polyarch xylem is typical of monocot roots.'],
  ['Phloem fibres are absent in the secondary phloem of all plants.', 'phloem fibres (bast) are usually absent in primary phloem but present in secondary phloem.'],
  ['Bulliform cells are found in dicot leaves.', 'they are found in grass (monocot) leaves.']
]);
ar(C, [
  ['Intercalary meristems help grasses regenerate after grazing.', 'Intercalary meristems occur at the base of leaves and internodes in grasses.', 0, 'Their position allows regrowth after herbivores graze the upper parts.'],
  ['Grass leaves roll inwards during water stress.', 'Bulliform cells become flaccid when they lose water.', 0, 'Flaccid bulliform cells make the leaf curl, reducing water loss.']
]);

/* ---------- 6. Cell: The Unit of Life ---------- */
C = 'Cell: The Unit of Life';
P(C, 'Organelle', 'Main function', [
  ['Mitochondrion', 'site of aerobic respiration (ATP production)'], ['Ribosome', 'site of protein synthesis'], ['Lysosome', 'intracellular digestion by hydrolytic enzymes'],
  ['Golgi apparatus', 'packaging of materials and formation of glycoproteins and glycolipids'], ['Smooth endoplasmic reticulum', 'synthesis of lipids (steroidal hormones in animal cells)'],
  ['Chloroplast', 'photosynthesis'], ['Nucleolus', 'active site of ribosomal RNA synthesis'], ['Centriole', 'forms basal bodies of cilia and flagella and spindle fibres'], ['Vacuole (tonoplast)', 'stores sap and maintains turgor']
], l => `The main function of the ${l.toLowerCase()} is`);
P(C, 'Scientist', 'Contribution', [
  ['Robert Brown', 'discovered the nucleus'], ['Matthias Schleiden and Theodore Schwann', 'proposed the cell theory'], ['Rudolf Virchow', 'stated that cells arise from pre-existing cells (<i>omnis cellula-e cellula</i>)'],
  ['Camillo Golgi', 'first observed the Golgi apparatus near the nucleus (1898)'], ['Singer and Nicolson', 'proposed the fluid mosaic model of the cell membrane (1972)'],
  ['Anton von Leeuwenhoek', 'first saw and described a live cell'], ['George Palade', 'first observed ribosomes as dense particles (1953)']
], l => `${l} is known for having`, 2);
P(C, 'Type of chromosome', 'Position of centromere', [['Metacentric', 'in the middle, forming two equal arms'], ['Sub-metacentric', 'slightly away from the middle, one arm shorter'], ['Acrocentric', 'close to one end, one arm extremely short'], ['Telocentric', 'at the terminal end']], l => `In a ${l.toLowerCase()} chromosome the centromere is`, 1);
mcs(C, [
  ['Prokaryotic ribosomes are of the type', '70S (50S + 30S)', '80S (60S + 40S)', '70S (60S + 40S)', '80S (50S + 30S)', 'Bacterial ribosomes are 70S; eukaryotic cytoplasmic ribosomes are 80S.'],
  ['"S" in 70S and 80S ribosomes stands for', 'sedimentation coefficient (Svedberg unit)', 'size', 'subunit number', 'surface area', 'S is the Svedberg unit, an indirect measure of density and size.'],
  ['The membrane-bound infoldings of the plasma membrane in bacteria are', 'mesosomes', 'cristae', 'thylakoids', 'cisternae', 'Mesosomes help in cell wall formation, DNA replication, respiration and secretion.'],
  ['Small circular DNA outside the genomic DNA of bacteria, conferring antibiotic resistance, is', 'a plasmid', 'a mesosome', 'a nucleoid', 'a ribosome', 'Plasmids carry genes such as those for antibiotic resistance.'],
  ['In the fluid mosaic model, the quasi-fluid nature of lipids allows', 'lateral movement of proteins within the bilayer', 'proteins to flip across the membrane easily', 'the membrane to become rigid', 'lipids to leave the membrane', 'The fluidity is important for cell growth, endocytosis, secretion and division.'],
  ['The human erythrocyte membrane contains approximately', '52% protein and 40% lipid', '40% protein and 52% lipid', '90% lipid', '10% protein', 'Biochemical studies on RBC membrane gave this composition.', 'medium'],
  ['The movement of water by diffusion across a membrane is called', 'osmosis', 'active transport', 'facilitated diffusion only', 'endocytosis', 'Osmosis is diffusion of water.'],
  ['The Na⁺/K⁺ pump is an example of', 'active transport using ATP', 'simple diffusion', 'osmosis', 'passive transport', 'Ions are moved against their concentration gradient using energy.'],
  ['The cell wall of plants is made mainly of', 'cellulose, hemicellulose, pectins and proteins', 'chitin', 'peptidoglycan', 'lipids only', 'The middle lamella is mainly calcium pectate.'],
  ['The middle lamella, which holds neighbouring plant cells together, is mainly made of', 'calcium pectate', 'cellulose', 'lignin', 'suberin', 'Calcium pectate glues adjacent cells.'],
  ['The cis face and trans face are associated with the', 'Golgi apparatus', 'mitochondrion', 'nucleus', 'endoplasmic reticulum', 'Golgi cisternae have a convex cis (forming) face and a concave trans (maturing) face.'],
  ['The inner membrane of the mitochondrion forms infoldings called', 'cristae', 'thylakoids', 'grana', 'cisternae', 'Cristae increase the surface area.'],
  ['Mitochondria and chloroplasts contain', 'their own circular DNA and 70S ribosomes', 'no DNA', 'only 80S ribosomes', 'linear DNA with histones', 'Both are semi-autonomous organelles.'],
  ['The structure of a cilium or flagellum shows the arrangement', '9 + 2 microtubules', '9 + 0 triplets', '9 + 3 doublets', '2 + 9 + 2', 'The axoneme has nine peripheral doublets and a central pair.'],
  ['Centrioles show the arrangement', 'nine peripheral triplet microtubules (cartwheel)', '9 + 2 doublets', 'two central singlets', 'nine doublets only', 'The centriole has a cartwheel organisation of nine triplets.'],
  ['Chloroplasts with chlorophyll; chromoplasts with carotenoids; leucoplasts are', 'colourless plastids that store food', 'pigmented plastids', 'mitochondria', 'ribosomes', 'Amyloplasts (starch), elaioplasts (oil), aleuroplasts (protein) are leucoplasts.'],
  ['Which of the following organelles is NOT a part of the endomembrane system?', 'Mitochondrion', 'Endoplasmic reticulum', 'Golgi complex', 'Lysosome', 'Mitochondria, chloroplasts and peroxisomes function independently of the endomembrane system.'],
  ['The perinuclear space lies between', 'the two membranes of the nuclear envelope', 'the nucleolus and nuclear envelope', 'the ER and the nucleus', 'the plasma membrane and cell wall', 'The nuclear envelope has two membranes with a 10–50 nm space.'],
  ['Satellite chromosomes (SAT) have', 'a secondary constriction appearing as a small fragment', 'no centromere', 'two centromeres', 'no kinetochore', 'Some chromosomes have non-staining secondary constrictions giving a satellite.'],
  ['The smallest cells known are', 'mycoplasma (about 0.3 μm)', 'bacteria (3–5 μm)', 'red blood cells', 'eggs of ostrich', 'Mycoplasma are the smallest; the egg of an ostrich is the largest isolated single cell.'],
  ['Inclusion bodies in prokaryotes are', 'reserve material not bound by a membrane', 'membrane-bound organelles', 'ribosomes', 'plasmids', 'e.g. phosphate granules, cyanophycean granules and glycogen granules.']
]);
gen(C, [[1], [5], [10], [25], [50]], n => [
  `A eukaryotic cell sample has ${n === 1 ? 'one' : n} free 80S ribosome${n > 1 ? 's' : ''}. How many small (40S) subunits do they contain in all?`, n, '', [2 * n, n * 40, n * 60 / 40], `Each 80S ribosome has one 60S and one 40S subunit, so ${n} ribosome${n > 1 ? 's have' : ' has'} <b>${n}</b> 40S subunit${n > 1 ? 's' : ''}.`, 'easy']);
ST(C, [
  'Cells arise from pre-existing cells.',
  'Prokaryotic cells lack a well-defined nucleus.',
  'Ribosomes are not bound by any membrane.',
  'The endoplasmic reticulum divides the intracellular space into luminal and extra-luminal compartments.',
  'Lysosomes are formed by the process of packaging in the Golgi apparatus.',
  'The nucleolus is not bound by a membrane.',
  'Plant cells have a cell wall, plastids and a large central vacuole.'
], [
  ['Schleiden and Schwann explained how new cells are formed.', 'their cell theory did not explain this; Virchow said cells arise from pre-existing cells.'],
  ['Centrioles are present in the cells of higher plants.', 'centrioles are usually absent in higher plants.'],
  ['Lysosomes have enzymes that are active at alkaline pH.', 'lysosomal hydrolases are active at acidic pH.'],
  ['Rough ER is the major site of lipid synthesis.', 'smooth ER synthesises lipids; rough ER, bearing ribosomes, is involved in protein synthesis and secretion.'],
  ['Prokaryotes have 80S ribosomes.', 'prokaryotes have 70S ribosomes.'],
  ['Mitochondria are found in bacterial cells.', 'prokaryotes lack membrane-bound organelles such as mitochondria.']
]);
ar(C, [
  ['Mitochondria are called the powerhouses of the cell.', 'Mitochondria are the sites of aerobic respiration and produce energy as ATP.', 0, 'R explains A.'],
  ['Lysosomes are called suicidal bags.', 'Lysosomes contain hydrolytic enzymes that can digest the cell itself if released.', 0, 'R explains A.'],
  ['Mycoplasma is the smallest living cell.', 'Mycoplasma has a rigid cell wall.', 2, 'Mycoplasma has no cell wall; R is false.']
]);

/* ---------- 7. Cell Cycle and Cell Division ---------- */
C = 'Cell Cycle and Cell Division';
P(C, 'Sub-stage of prophase I', 'Event', [
  ['Leptotene', 'chromosomes become gradually visible under the light microscope'], ['Zygotene', 'synapsis of homologous chromosomes (synaptonemal complex forms)'],
  ['Pachytene', 'crossing over between non-sister chromatids (recombination nodules appear)'], ['Diplotene', 'synaptonemal complex dissolves and chiasmata become visible'], ['Diakinesis', 'terminalisation of chiasmata; nucleolus disappears and nuclear envelope breaks down']
], l => `The characteristic event of ${l.toLowerCase()} is`, 2);
P(C, 'Stage of mitosis', 'Event', [
  ['Prophase', 'chromosomal material condenses; centrosomes move to opposite poles'], ['Metaphase', 'chromosomes align at the equatorial (metaphase) plate'],
  ['Anaphase', 'centromeres split and chromatids move to opposite poles'], ['Telophase', 'nuclear envelope reassembles around each chromosome cluster']
], l => `During ${l.toLowerCase()} of mitosis,`, 1);
gen(C, [[8], [14], [16], [20], [24], [46], [12], [40]], n2 => [
  `A diploid cell has 2n = ${n2} chromosomes. The number of chromatids present at metaphase of mitosis is`, 2 * n2, '', [n2, n2 / 2, 4 * n2],
  `After the S phase every chromosome has two sister chromatids: ${n2} × 2 = <b>${2 * n2}</b>. (The number of chromosomes stays ${n2}.)`]);
gen(C, [[8], [14], [20], [24], [46], [12]], n2 => [
  `In an organism with 2n = ${n2}, the number of bivalents formed during prophase I of meiosis is`, n2 / 2, '', [n2, 2 * n2, n2 / 4],
  `Homologous chromosomes pair up: ${n2}/2 = <b>${n2 / 2} bivalents</b> (tetrads).`]);
gen(C, [[2], [4], [8], [16], [32]], c => [
  `The DNA content of a cell in G<sub>1</sub> phase is ${c} pg. The DNA content of the same cell at G<sub>2</sub> and of each daughter cell after meiosis II will be respectively`,
  `${2 * c} pg and ${c / 2} pg`, '', [`${c} pg and ${c / 2} pg`, `${2 * c} pg and ${c} pg`, `${4 * c} pg and ${c / 4} pg`],
  `DNA doubles in S phase (2C → 4C): ${2 * c} pg at G₂. Meiosis halves it twice from the G₂ amount: ${2 * c}/4 = <b>${c / 2} pg</b> per gamete.`]);
gen(C, [[64], [128], [256], [32], [512]], N => [
  `How many successive mitotic divisions are needed to produce ${N} cells from a single cell?`, Math.log2(N), '', [N / 2, N - 1, Math.log2(N) + 1],
  `Each division doubles the number of cells: 2<sup>k</sup> = ${N} ⇒ k = <b>${Math.log2(N)}</b>.`]);
gen(C, [[100], [200], [400], [80], [50]], N => [
  `How many meiotic divisions are needed to form ${N} pollen grains (each pollen mother cell forming a tetrad)?`, N / 4, '', [N, N / 2, N * 2],
  `One meiosis gives 4 pollen grains: ${N}/4 = <b>${N / 4}</b>.`, 'medium']);
mcs(C, [
  ['In a typical human cell in culture, one cell cycle takes about', '24 hours', '90 minutes', '1 hour', '12 hours', 'Human cells in culture divide about once in 24 hours; yeast in about 90 minutes.'],
  ['The M phase of the human cell cycle lasts approximately', '1 hour', '24 hours', '10 hours', '5 minutes', 'The interphase occupies more than 95% of the cycle.'],
  ['DNA replication takes place during the', 'S phase', 'G₁ phase', 'G₂ phase', 'M phase', 'In S phase the DNA content doubles (2C to 4C), but the chromosome number does not change.'],
  ['Cells that do not divide further exit G₁ and enter an inactive stage called', 'G₀ (quiescent stage)', 'G₂', 'S phase', 'cytokinesis', 'Cells in G₀ remain metabolically active but do not proliferate unless called on.'],
  ['In animal cells, centriole duplication occurs during', 'S phase', 'G₁ phase', 'anaphase', 'telophase', 'DNA replication in the nucleus and centriole duplication in the cytoplasm both happen in S phase.', 'medium'],
  ['The stage most suitable for studying the morphology of chromosomes is', 'metaphase', 'prophase', 'anaphase', 'telophase', 'Chromosomes are most condensed and aligned at metaphase.'],
  ['Cytokinesis in plant cells takes place by', 'cell plate formation', 'furrow formation', 'budding', 'constriction only', 'Plant cells have a rigid wall, so the cell plate forms from the centre outwards.'],
  ['Mitosis is also called equational division because', 'the number of chromosomes in the parent and daughter cells is the same', 'the number of chromosomes is halved', 'it produces gametes', 'crossing over occurs', 'Daughter cells have the same chromosome number as the parent.'],
  ['Meiosis I is called reductional division because', 'the chromosome number is reduced to half', 'the DNA content doubles', 'sister chromatids separate', 'it occurs only in somatic cells', 'Homologous chromosomes separate in anaphase I.'],
  ['The enzyme involved in crossing over during pachytene is', 'recombinase', 'ligase', 'DNA polymerase', 'helicase', 'Crossing over is an enzyme-mediated process; the enzyme is called recombinase.'],
  ['In anaphase I of meiosis', 'homologous chromosomes separate while sister chromatids remain together', 'sister chromatids separate', 'centromeres split', 'crossing over occurs', 'Centromeres split only in anaphase II.'],
  ['The stage between the two meiotic divisions is called', 'interkinesis', 'interphase with DNA replication', 'diakinesis', 'G₀', 'Interkinesis is short and has no DNA replication.'],
  ['Meiosis II resembles', 'normal mitosis', 'meiosis I', 'amitosis', 'binary fission', 'Sister chromatids separate, as in mitosis.'],
  ['The longest phase of prophase I, which may last for months or years in oocytes of some vertebrates, is', 'diplotene', 'leptotene', 'zygotene', 'diakinesis', 'Diplotene can last for months or years in the oocytes of some vertebrates.', 'medium'],
  ['A cell plate is laid down in which part of the cell?', 'Centre, growing outwards to meet the lateral walls', 'At the periphery, growing inwards', 'Near one pole', 'Near the nucleus only', 'In plant cells, the cell plate (future middle lamella) starts in the centre.'],
  ['Syncytium (a multinucleate condition) results when', 'karyokinesis is not followed by cytokinesis', 'cytokinesis precedes karyokinesis', 'meiosis fails', 'crossing over does not occur', 'e.g. the liquid endosperm of coconut.'],
  ['Mitosis in diploid cells is significant because it', 'produces genetically identical daughter cells and helps growth and repair', 'introduces variation', 'reduces chromosome number', 'produces gametes in animals', 'Cell repair (e.g. epidermis, gut lining) and growth depend on mitosis.']
]);
ST(C, [
  'Interphase is the phase of preparation for cell division.',
  'The chromosome number does not change during the S phase.',
  'Crossing over takes place during pachytene.',
  'Meiosis maintains a constant chromosome number across generations in sexually reproducing organisms.',
  'Meiosis increases genetic variability.',
  'Kinetochores are disc-shaped structures at the surface of the centromeres.',
  'Haploid cells can divide by mitosis.'
], [
  ['DNA content doubles during the G₂ phase.', 'DNA replicates in the S phase.'],
  ['Synapsis occurs in diplotene.', 'synapsis (pairing) occurs in zygotene.'],
  ['Sister chromatids separate in anaphase I of meiosis.', 'homologous chromosomes separate in anaphase I; sister chromatids separate in anaphase II.'],
  ['DNA replication occurs during interkinesis.', 'there is no DNA replication in interkinesis.'],
  ['Mitosis occurs only in diploid cells.', 'haploid cells (e.g. in male honey bees and gametophytes) also divide by mitosis.'],
  ['Chiasmata appear during leptotene.', 'chiasmata become visible in diplotene.']
]);
ar(C, [
  ['The chromosome number remains the same after the S phase.', 'In the S phase each chromosome replicates to form two sister chromatids held at a centromere.', 0, 'DNA doubles but the number of centromeres (chromosomes) does not.'],
  ['Metaphase is the best stage to count chromosomes.', 'At metaphase, chromosomes are maximally condensed and lie at the equator.', 0, 'R explains A.']
]);

/* ---------- 8. Photosynthesis in Higher Plants ---------- */
C = 'Photosynthesis in Higher Plants';
P(C, 'Scientist', 'Contribution', [
  ['Joseph Priestley', 'showed that plants restore air that a burning candle or a breathing mouse spoils (1770)'],
  ['Jan Ingenhousz', 'showed that only the green parts of plants in sunlight release oxygen'], ['Julius von Sachs', 'showed that glucose (stored as starch) is made in green parts of plants'],
  ['T. W. Engelmann', 'plotted the first action spectrum using a prism, <i>Cladophora</i> and aerobic bacteria'], ['Cornelius van Niel', 'showed that the oxygen evolved comes from water (using purple and green bacteria)'],
  ['Melvin Calvin', 'worked out the C₃ carbon-fixation pathway using radioactive ¹⁴C'], ['Hatch and Slack', 'described the C₄ pathway']
], l => `${l} is credited with the finding that`);
P(C, 'Pigment', 'Colour on chromatography', [['Chlorophyll a', 'bright or blue-green'], ['Chlorophyll b', 'yellow-green'], ['Xanthophylls', 'yellow'], ['Carotenoids', 'yellow to yellow-orange']], l => `On a chromatogram of leaf pigments, ${l.toLowerCase()} appears`, 1);
P(C, 'Feature', 'Pathway', [
  ['First stable product is 3-phosphoglyceric acid (3-PGA)', 'C₃ pathway'], ['First stable product is oxaloacetic acid (OAA)', 'C₄ pathway'],
  ['Kranz anatomy', 'C₄ pathway'], ['Primary CO₂ acceptor is PEP in mesophyll cells', 'C₄ pathway'], ['Primary CO₂ acceptor is RuBP', 'C₃ pathway'],
  ['Photorespiration is significant', 'C₃ pathway'], ['Only PS I works; only ATP is formed', 'cyclic photophosphorylation'], ['Both PS II and PS I work; ATP and NADPH are formed', 'non-cyclic photophosphorylation']
], l => `"${l}" refers to the`, 0);
gen(C, [[1], [2], [3], [5], [10]], n => [
  `How many molecules of ATP and NADPH are needed in the Calvin cycle to make ${n === 1 ? 'one molecule' : n + ' molecules'} of glucose?`, `${18 * n} ATP and ${12 * n} NADPH`, '', [`${12 * n} ATP and ${18 * n} NADPH`, `${3 * n} ATP and ${2 * n} NADPH`, `${36 * n} ATP and ${24 * n} NADPH`],
  `One glucose needs 6 turns of the cycle; each turn uses 3 ATP and 2 NADPH: <b>${18 * n} ATP and ${12 * n} NADPH</b>.`]);
gen(C, [[1], [2], [4], [3], [6]], n => [
  `The number of turns of the Calvin cycle needed to produce ${n === 1 ? 'one molecule' : n + ' molecules'} of glucose is`, 6 * n, '', [n, 3 * n, 12 * n],
  `Each turn fixes one CO₂; glucose has six carbons, so ${n} glucose need <b>${6 * n}</b> turns.`, 'easy']);
mcs(C, [
  ['The reaction centre of photosystem I has an absorption peak at', '700 nm (P700)', '680 nm', '660 nm', '730 nm', 'PS I = P700; PS II = P680.'],
  ['Splitting of water during photosynthesis is associated with', 'photosystem II', 'photosystem I', 'the Calvin cycle', 'the stroma lamellae', 'The water-splitting complex is associated with PS II, on the inner side of the thylakoid membrane.'],
  ['The elements associated with the photolysis of water are', 'manganese and chlorine', 'magnesium and iron', 'copper and zinc', 'molybdenum and boron', 'Mn²⁺ and Cl⁻ are needed for the water-splitting complex.', 'medium'],
  ['The oxygen released in photosynthesis comes from', 'water', 'carbon dioxide', 'glucose', 'chlorophyll', 'Shown by van Niel and confirmed with radioisotopes.'],
  ['Cyclic photophosphorylation takes place in the', 'stroma lamellae', 'grana thylakoids only, using PS II', 'cytoplasm', 'mitochondria', 'Stroma lamellae lack PS II and NADP reductase, so only cyclic flow (ATP only) occurs there.', 'medium'],
  ['ATP synthesis in chloroplasts is explained by', 'chemiosmotic hypothesis', 'Z-scheme alone', 'Calvin cycle', 'Krebs cycle', 'A proton gradient across the thylakoid membrane drives ATP synthase.'],
  ['During the light reaction, protons accumulate', 'in the lumen of the thylakoid', 'in the stroma', 'in the cytoplasm', 'outside the chloroplast', 'Splitting of water and the cytochrome complex release H⁺ into the lumen.'],
  ['The CF₀ part of ATP synthase in chloroplasts', 'is embedded in the thylakoid membrane and forms a channel for protons', 'protrudes into the lumen', 'is the site of ATP synthesis', 'is found in mitochondria only', 'CF₁ protrudes on the stroma side and synthesises ATP.', 'medium'],
  ['The enzyme RuBisCO stands for', 'ribulose bisphosphate carboxylase-oxygenase', 'ribose bisphosphate carboxylase', 'ribulose phosphate oxidase', 'ribose biphosphate oxygenase', 'It can bind CO₂ and O₂; it is the most abundant enzyme in the world.'],
  ['The three stages of the Calvin cycle are', 'carboxylation, reduction and regeneration', 'glycolysis, reduction and oxidation', 'photolysis, carboxylation and phosphorylation', 'oxidation, decarboxylation and regeneration', 'CO₂ is fixed, 3-PGA is reduced, and RuBP is regenerated.'],
  ['In C₄ plants, the Calvin cycle takes place in', 'bundle-sheath cells', 'mesophyll cells', 'epidermal cells', 'guard cells', 'Bundle-sheath cells have RuBisCO and lack PEP case.'],
  ['Which of the following is a C₄ plant?', 'Maize', 'Wheat', 'Rice', 'Mustard', 'Maize, sugarcane and sorghum are C₄ plants.'],
  ['In photorespiration', 'neither sugar nor ATP is produced; CO₂ is released with use of ATP', 'ATP is formed', 'sugar is formed', 'only NADPH is formed', 'RuBisCO binds O₂; the pathway wastes fixed carbon.'],
  ['C₄ plants are more efficient than C₃ plants because', 'they concentrate CO₂ around RuBisCO, minimising photorespiration', 'they have more chlorophyll', 'they lack RuBisCO', 'they photosynthesise at night', 'High CO₂ in bundle-sheath cells keeps RuBisCO working as a carboxylase.'],
  ['The law of limiting factors was given by', 'Blackman (1905)', 'Calvin', 'Engelmann', 'Priestley', 'When a process depends on several factors, its rate is set by the factor nearest its minimum value.'],
  ['The CO₂ concentration of the atmosphere is about', '0.03 to 0.04 percent', '3 to 4 percent', '21 percent', '78 percent', 'CO₂ is the major limiting factor for photosynthesis.'],
  ['The light reaction (photochemical phase) takes place in the', 'grana (thylakoid membranes)', 'stroma', 'cytoplasm', 'mitochondrial matrix', 'The dark (biosynthetic) reactions happen in the stroma.'],
  ['The primary CO₂ acceptor in C₄ plants is', 'phosphoenolpyruvate (PEP)', 'RuBP', 'OAA', 'pyruvate', 'PEP (3C) is carboxylated by PEP case in mesophyll cells to form OAA.'],
  ['Light harvesting complexes (antennae) in a photosystem', 'absorb light of different wavelengths and pass energy to the reaction centre', 'split water', 'make ATP directly', 'fix CO₂', 'All pigments except one chlorophyll a molecule form the antennae.']
]);
ST(C, [
  'Chlorophyll a is the chief pigment associated with photosynthesis.',
  'Accessory pigments protect chlorophyll a from photo-oxidation.',
  'RuBisCO has a higher affinity for CO₂ than for O₂.',
  'In C₄ plants, photorespiration does not occur to a significant extent.',
  'The products of the light reaction are ATP, NADPH and O₂.',
  'Light is rarely a limiting factor in nature except under shade or in dense forests.',
  'The Calvin pathway occurs in all photosynthetic plants.'
], [
  ['The dark reactions can continue indefinitely in darkness.', 'they depend on ATP and NADPH from the light reaction, so they stop soon after light is removed.'],
  ['PS I contains the water-splitting complex.', 'the water-splitting complex is associated with PS II.'],
  ['The first stable product in C₃ plants is OAA.', 'it is 3-phosphoglyceric acid (3-PGA); OAA is the first product in C₄ plants.'],
  ['Bundle-sheath cells of C₄ plants lack chloroplasts.', 'they have a large number of chloroplasts and thick walls (Kranz anatomy).'],
  ['Photorespiration produces ATP.', 'photorespiration produces neither ATP nor sugar.'],
  ['In cyclic photophosphorylation NADPH is formed.', 'only ATP is formed in cyclic photophosphorylation.']
]);
ar(C, [
  ['C₄ plants show little or no photorespiration.', 'They increase the CO₂ concentration at the site of RuBisCO in bundle-sheath cells.', 0, 'High CO₂ prevents RuBisCO from binding O₂.'],
  ['The oxygen released during photosynthesis comes from water.', 'Water is split in the light reaction, releasing O₂, H⁺ and electrons.', 0, 'R explains A.'],
  ['Cyclic photophosphorylation produces NADPH.', 'In cyclic flow the electrons return to PS I.', 3, 'A is false (only ATP forms); R is true.']
]);

/* ---------- 9. Respiration in Plants ---------- */
C = 'Respiration in Plants';
gen(C, [[1], [2], [3], [5], [10]], n => [
  `The net gain of ATP from complete aerobic oxidation of ${n === 1 ? 'one molecule' : n + ' molecules'} of glucose (as per NCERT's theoretical calculation) is`, 38 * n, 'ATP', [36 * n, 2 * n, 30 * n],
  `Each glucose gives a net 38 ATP during aerobic respiration: <b>${38 * n} ATP</b>.`, 'easy']);
gen(C, [[1], [2], [4], [5]], n => [
  `During anaerobic glycolysis (fermentation), the net gain of ATP from ${n === 1 ? 'one molecule' : n + ' molecules'} of glucose is`, 2 * n, 'ATP', [38 * n, 4 * n, n],
  `Glycolysis yields a net 2 ATP per glucose: <b>${2 * n} ATP</b>.`, 'easy']);
gen(C, [[1], [2], [3], [4]], n => [
  `The number of turns of the Krebs cycle for the complete oxidation of ${n === 1 ? 'one molecule' : n + ' molecules'} of glucose is`, 2 * n, '', [n, 4 * n, 6 * n],
  `One glucose gives 2 pyruvate → 2 acetyl CoA, so the cycle runs twice per glucose: <b>${2 * n}</b>.`]);
gen(C, [[6, 6], [102, 145], [4, 2], [8, 9], [16, 23], [12, 12]], (co, o) => [
  `A substrate on complete oxidation released ${co} molecules of CO₂ while consuming ${o} molecules of O₂. Its respiratory quotient (RQ) is`, co / o, '', [o / co, co * o / 100, 1 - co / o],
  `RQ = CO₂ evolved / O₂ consumed = ${co}/${o} = <b>${f(co / o)}</b>.${co / o === 1 ? ' (carbohydrate)' : co / o < 0.8 ? ' (typical of fats)' : co / o > 1 ? ' (organic acid)' : ''}`]);
P(C, 'Respiratory substrate', 'RQ', [['Carbohydrates', 'exactly 1'], ['Fats (e.g. tripalmitin)', 'less than 1 (about 0.7)'], ['Organic acids', 'more than 1'], ['Anaerobic respiration', 'infinity (no O₂ consumed)']], l => `The respiratory quotient for ${l.toLowerCase()} is`, 1);
D(C, [
  ['Glycolysis', 'cytoplasm'], ['Oxidative decarboxylation of pyruvate to acetyl CoA', 'mitochondrial matrix'], ['Krebs cycle', 'mitochondrial matrix'],
  ['Electron transport system', 'inner mitochondrial membrane'], ['Fermentation', 'cytoplasm']
], ['cytoplasm', 'mitochondrial matrix', 'inner mitochondrial membrane', 'outer mitochondrial membrane'], l => `In eukaryotes, ${l.charAt(0).toLowerCase() + l.slice(1)} takes place in the`);
mcs(C, [
  ['Glycolysis is also called the', 'EMP pathway (Embden, Meyerhof and Parnas)', 'Krebs cycle', 'TCA cycle', 'Calvin cycle', 'The scheme was given by Gustav Embden, Otto Meyerhof and J. Parnas.'],
  ['In glycolysis, one molecule of glucose gives', 'two molecules of pyruvic acid', 'one molecule of pyruvic acid', 'two molecules of acetyl CoA', 'six molecules of CO₂', 'Glucose (6C) is partially oxidised to 2 pyruvate (3C each).'],
  ['In yeast, under anaerobic conditions, pyruvic acid is converted to', 'ethanol and CO₂', 'lactic acid', 'acetyl CoA', 'citric acid', 'Alcoholic fermentation by pyruvic acid decarboxylase and alcohol dehydrogenase.'],
  ['In animal muscles during exercise, when oxygen is inadequate, pyruvic acid is reduced to', 'lactic acid', 'ethanol', 'acetic acid', 'CO₂ and water', 'Lactate dehydrogenase uses NADH to reduce pyruvate.'],
  ['The first product of the Krebs cycle is', 'citric acid', 'oxaloacetic acid', 'α-ketoglutaric acid', 'succinic acid', 'Acetyl CoA (2C) condenses with OAA (4C) to form citric acid (6C) via citrate synthase.'],
  ['The final acceptor of electrons in the electron transport system is', 'oxygen', 'NAD⁺', 'cytochrome c', 'FAD', 'O₂ accepts electrons and H⁺ to form water.'],
  ['Oxidation of one molecule of NADH in the ETS gives rise to', '3 molecules of ATP', '2 molecules of ATP', '1 molecule of ATP', '4 molecules of ATP', 'NADH → 3 ATP; FADH₂ → 2 ATP (NCERT values).'],
  ['Oxidation of one molecule of FADH₂ in the ETS gives', '2 ATP', '3 ATP', '1 ATP', '4 ATP', 'FADH₂ enters at complex II and gives 2 ATP.'],
  ['Cytochrome c in the ETS is', 'a small protein attached to the outer surface of the inner membrane that moves electrons between complex III and IV', 'complex I', 'ATP synthase', 'a lipid', 'Cytochrome c is a mobile carrier between complexes III and IV.', 'medium'],
  ['Complex V of the ETS is', 'ATP synthase', 'cytochrome c oxidase', 'NADH dehydrogenase', 'succinate dehydrogenase', 'ATP synthase (F₀–F₁) uses the proton gradient to make ATP.'],
  ['The respiratory pathway is called an amphibolic pathway because', 'it is involved in both breakdown (catabolism) and synthesis (anabolism)', 'it occurs in amphibians', 'it uses both O₂ and CO₂', 'it occurs in both light and dark', 'Intermediates are withdrawn for synthesis of fatty acids, amino acids, etc.'],
  ['Fatty acids enter the respiratory pathway after being converted to', 'acetyl CoA', 'pyruvic acid', 'glucose', 'OAA', 'Fats are broken into glycerol (enters as PGAL) and fatty acids (as acetyl CoA).'],
  ['Pyruvate dehydrogenase catalyses the conversion of pyruvate to acetyl CoA and requires', 'NAD⁺ and coenzyme A', 'FAD only', 'ATP', 'oxygen directly', 'Pyruvic acid + CoA + NAD⁺ → acetyl CoA + CO₂ + NADH + H⁺.'],
  ['The first ATP-yielding step in glycolysis is the conversion of', '1,3-bisphosphoglycerate to 3-phosphoglyceric acid', 'glucose to glucose-6-phosphate', 'fructose-6-phosphate to fructose-1,6-bisphosphate', 'PEP to OAA', 'BPGA → PGA is an energy-yielding step producing ATP.', 'medium'],
  ['In glycolysis, ATP is used in the conversion of', 'glucose to glucose-6-phosphate and fructose-6-phosphate to fructose-1,6-bisphosphate', 'PEP to pyruvate', 'BPGA to PGA', 'PGAL to BPGA', 'Two ATP are consumed in these phosphorylations.', 'medium']
]);
ST(C, [
  'Plants do not have specialised organs for gaseous exchange.',
  'Glycolysis occurs in the cytoplasm of all living organisms.',
  'Fermentation results in incomplete oxidation of glucose.',
  'The Krebs cycle is also called the citric acid cycle or TCA cycle.',
  'The intermediates of respiration can be used to synthesise other compounds.',
  'In yeast, poisoning occurs when the alcohol concentration reaches about 13 percent.'
], [
  ['The Krebs cycle takes place in the cytoplasm.', 'it takes place in the mitochondrial matrix.'],
  ['Fermentation yields more ATP than aerobic respiration.', 'fermentation gives only 2 ATP per glucose; aerobic respiration gives 38.'],
  ['The ETS is located in the outer mitochondrial membrane.', 'it is in the inner mitochondrial membrane.'],
  ['The RQ of fats is greater than 1.', 'the RQ of fats is less than 1 (about 0.7).'],
  ['Glycolysis requires oxygen.', 'glycolysis is anaerobic; it occurs with or without oxygen.'],
  ['Oxygen is used directly in the Krebs cycle.', 'oxygen acts only at the end of the ETS as the final electron acceptor.']
]);
ar(C, [
  ['Respiration is an amphibolic pathway.', 'It involves both anabolism and catabolism.', 0, 'R is the definition of amphibolic.'],
  ['The RQ of fats is less than 1.', 'Fats need more oxygen for their oxidation because they have less oxygen than carbohydrates.', 0, 'More O₂ consumed than CO₂ released ⇒ RQ < 1.']
]);

/* ---------- 10. Plant Growth and Development ---------- */
C = 'Plant Growth and Development';
P(C, 'Plant growth regulator', 'Effect / use', [
  ['Auxin', 'initiates rooting in stem cuttings and promotes apical dominance'], ['Gibberellin', 'increases the length of grape stalks and the yield of sugarcane'], ['Cytokinin', 'promotes cell division and delays leaf senescence'],
  ['Ethylene', 'promotes fruit ripening and the triple response'], ['Abscisic acid', 'closes stomata and induces seed dormancy (stress hormone)']
], l => `${l} is mainly associated with the following:`, 2);
P(C, 'Discovery', 'Linked to', [
  ['Auxin', 'F. W. Went, from coleoptile tips of oat seedlings'], ['Gibberellin', 'E. Kurosawa, from <i>Gibberella fujikuroi</i> causing bakanae disease of rice'],
  ['Kinetin (cytokinin)', 'Skoog and Miller, from autoclaved herring sperm DNA'], ['Abscisic acid (dormin)', 'growth inhibitors in the mid-1960s, found to be one and the same'],
  ['Ethylene', 'H. H. Cousins, a volatile from ripened oranges that hastened ripening of bananas']
], l => `The discovery of ${l} is linked to`, 1);
gen(C, [[5, 10, 50, 55], [2, 4, 20, 24], [10, 15, 100, 105], [4, 8, 40, 44]], (a0, a1, b0, b1) => [
  `Leaf A grows from ${a0} cm² to ${a1} cm² and leaf B from ${b0} cm² to ${b1} cm² in the same time. The relative growth rates of A and B are respectively`,
  `${f((a1 - a0) / a0 * 100)}% and ${f((b1 - b0) / b0 * 100)}%`, '', [`${f((b1 - b0) / b0 * 100)}% and ${f((a1 - a0) / a0 * 100)}%`, `${a1 - a0} cm² and ${b1 - b0} cm²`, `${f((a1 - a0) / a1 * 100)}% and ${f((b1 - b0) / b1 * 100)}%`],
  `Both leaves have the same absolute growth (${a1 - a0} and ${b1 - b0} cm²), but relative growth = growth/initial size: A = ${a1 - a0}/${a0} = ${f((a1 - a0) / a0 * 100)}%, B = ${b1 - b0}/${b0} = <b>${f((b1 - b0) / b0 * 100)}%</b>.`, 'medium']);
gen(C, [[10, 2, 5], [5, 3, 4], [20, 1.5, 10], [8, 4, 6]], (L0, r, t) => [
  `A root elongates at a constant rate (arithmetic growth) of ${r} cm per day. If its initial length was ${L0} cm, its length after ${t} days will be`, L0 + r * t, 'cm', [L0 * r * t, r * t, L0 * Math.pow(2, t)],
  `L<sub>t</sub> = L<sub>0</sub> + rt = ${L0} + ${r}×${t} = <b>${L0 + r * t} cm</b>.`, 'easy']);
mcs(C, [
  ['The growth curve of geometric growth (in a limited nutrient environment) is', 'sigmoid (S-shaped)', 'linear', 'parabolic only', 'a straight horizontal line', 'Lag, log (exponential) and stationary phases give an S-shaped curve.'],
  ['Arithmetic growth is shown by', 'a root elongating at a constant rate', 'an embryo in early stages', 'bacteria in log phase', 'a population of yeast', 'Only one daughter cell keeps dividing while the other differentiates.'],
  ['Mathematical expression of exponential growth is', 'W<sub>1</sub> = W<sub>0</sub>e<sup>rt</sup>', 'L<sub>t</sub> = L<sub>0</sub> + rt', 'W = W<sub>0</sub> + r', 'L = L<sub>0</sub>/rt', 'r is the relative growth rate (efficiency index).'],
  ['The phenomenon by which living differentiated cells regain the capacity of division is', 'dedifferentiation', 'redifferentiation', 'differentiation', 'senescence', 'e.g. formation of interfascicular cambium and cork cambium from fully differentiated parenchyma.'],
  ['Heterophylly in cotton, coriander and larkspur is an example of', 'plasticity', 'senescence', 'dormancy', 'vernalisation', 'Different forms of leaves in juvenile and mature plants show developmental plasticity.'],
  ['Heterophylly in buttercup is due to', 'the environment (leaves in air and in water differ)', 'age', 'hormones only', 'mutation', 'Leaves produced in air and under water differ in shape.'],
  ['The plant hormone that is a gas is', 'ethylene', 'auxin', 'cytokinin', 'ABA', 'Ethylene is a simple gaseous PGR.'],
  ['The PGR used to promote flowering in pineapple and synchronise fruit set is', 'ethylene', 'abscisic acid', 'cytokinin', 'gibberellin', 'Ethylene (and auxins) are used to induce flowering in pineapple.'],
  ['Ethephon, a source of ethylene, is used to', 'hasten fruit ripening in tomatoes and apples', 'close stomata', 'induce seed dormancy', 'delay senescence', 'Ethephon in aqueous solution releases ethylene; it also promotes female flowers in cucumbers.'],
  ['Spraying gibberellins on juvenile conifers', 'hastens maturity, leading to early seed production', 'delays seed production', 'causes leaf fall', 'prevents flowering', 'GAs speed up maturation of conifers.'],
  ['Bolting (internode elongation just before flowering) in beet and cabbage is promoted by', 'gibberellins', 'ethylene', 'abscisic acid', 'cytokinins', 'GAs promote bolting in rosette plants.'],
  ['2,4-D is widely used to', 'kill dicotyledonous weeds', 'kill monocot crops', 'induce dormancy', 'ripen fruits', '2,4-D (a synthetic auxin) is a herbicide for dicot weeds; it does not affect mature monocots.'],
  ['The removal of the shoot tip results in the growth of lateral buds; this is because of the removal of', 'apical dominance caused by auxin', 'gibberellin', 'cytokinin', 'abscisic acid', 'Auxin from the apex suppresses lateral buds; this is used in tea plantations and hedge-making.'],
  ['Zeatin, a natural cytokinin, was isolated from', 'corn kernels and coconut milk', 'herring sperm DNA', 'oat coleoptiles', 'ripened oranges', 'Kinetin came from herring sperm DNA; zeatin from corn kernels and coconut milk.'],
  ['Abscisic acid acts as an antagonist to', 'gibberellins', 'ethylene', 'cytokinins only', 'auxins only', 'ABA inhibits seed germination and growth, opposing GAs.'],
  ['The plant hormone that helps overcome apical dominance and promotes nutrient mobilisation is', 'cytokinin', 'auxin', 'ABA', 'ethylene', 'Cytokinins promote lateral shoot growth and delay senescence.'],
  ['Which PGR is used to make seedless (parthenocarpic) tomatoes?', 'Auxin', 'ABA', 'Ethylene', 'Cytokinin', 'Auxins induce parthenocarpy.'],
  ['Gibberellins are used in the brewing industry to', 'speed up the malting process', 'stop fermentation', 'kill yeast', 'colour beer', 'GA₃ speeds up malting.'],
  ['In deep-water rice, rapid elongation of internodes/petioles is promoted by', 'ethylene', 'abscisic acid', 'cytokinin', 'auxin only', 'Ethylene helps leaves and upper parts remain above water.']
]);
ST(C, [
  'Plant growth is generally indeterminate.',
  'Growth in plants is open, i.e. it continues throughout life because of meristems.',
  'Ethylene is a gaseous plant growth regulator.',
  'Auxins promote root initiation in stem cuttings.',
  'ABA increases tolerance of plants to various kinds of stress.',
  'Differentiation in plants is open; cells from the same meristem can form different structures.',
  'Gibberellins cause fruits like apple to elongate and improve their shape.'
], [
  ['Abscisic acid promotes seed germination.', 'ABA inhibits seed germination and induces dormancy.'],
  ['Cytokinins promote leaf senescence.', 'cytokinins delay leaf senescence.'],
  ['Gibberellins are gaseous hormones.', 'ethylene is the gaseous hormone; gibberellins are acidic organic compounds.'],
  ['Auxins promote the growth of lateral buds.', 'auxins from the apex suppress lateral buds (apical dominance).'],
  ['Ethylene delays fruit ripening.', 'ethylene promotes fruit ripening.'],
  ['Kinetin occurs naturally in plants.', 'kinetin is not found in plants; it was obtained from autoclaved herring sperm DNA.']
]);
ar(C, [
  ['Removal of the shoot tip promotes bushy growth.', 'Auxin produced at the shoot tip suppresses the growth of lateral buds.', 0, 'Decapitation removes apical dominance.'],
  ['Abscisic acid is called the stress hormone.', 'ABA increases the tolerance of plants to various kinds of stress.', 0, 'R explains A.'],
  ['Cytokinins delay senescence.', 'Cytokinins promote nutrient mobilisation.', 0, 'Nutrient mobilisation by cytokinins delays leaf senescence.']
]);
})();

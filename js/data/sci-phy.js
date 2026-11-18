/* Science Part 1 question bank — Physics (Gravitation, Heat, Effects of Electric Current, Refraction of Light, Lenses, Space Missions). Original questions. */
(function () {
const { add, N } = window.SCI;

/* ---------- Gravitation ---------- */
const GR = 'Gravitation';
add(1, GR, {
  mcq: [
    ["If the distance between two bodies is doubled, the gravitational force between them becomes:", "one-fourth", "half", "double", "four times", "F ∝ 1/r². Putting r → 2r gives F → F/4."],
    ["Compared with the equator, the value of g at the poles is:", "slightly greater", "slightly smaller", "exactly the same", "zero", "The Earth is flattened at the poles, so the polar radius is smaller and g = GM/R² is greater there."],
    ["The escape velocity from the surface of the Earth is about:", "11.2 km/s", "7.9 km/s", "9.8 km/s", "3 × 10⁸ m/s", "v<sub>esc</sub> = √(2GM/R) ≈ 11.2 km/s."],
    ["The mass of a body on the Moon, compared with its mass on the Earth, is:", "the same", "one-sixth", "six times", "zero", "Mass is the quantity of matter and does not change with place; only weight changes."],
    ["According to Kepler's second law, the line joining a planet to the Sun sweeps out:", "equal areas in equal intervals of time", "equal distances in equal intervals of time", "equal angles in equal intervals of time", "the largest area at aphelion", "A planet moves faster when nearer the Sun so that the area swept per unit time stays constant."],
    ["A freely falling body is released from rest. Its speed after 2 s is (g = 10 m/s²):", "20 m/s", "10 m/s", "5 m/s", "40 m/s", "v = gt = 10 × 2 = 20 m/s."]
  ],
  one: [
    ["Write the formula for the escape velocity of a body from a planet of mass M and radius R.", null, "<b>v = √(2GM/R)</b>."],
    ["Which of the two — mass or weight — is the same everywhere in the universe for a given body?", ["mass"], "Mass is constant; weight = mg depends on g."],
    ["State the value of the universal gravitational constant G.", null, "G = 6.67 × 10⁻¹¹ N m² kg⁻²."],
    ["Who gave the three laws of planetary motion?", ["kepler", "johannes kepler"], "Johannes Kepler."],
    ["What is the SI unit of weight?", ["newton", "n"], "Weight is a force, so its SI unit is the newton (N)."]
  ],
  two: [
    ["Distinguish between mass and weight (any two points).", "<b>Mass:</b> quantity of matter in a body; SI unit kg; constant everywhere; a scalar. <b>Weight:</b> force with which the Earth attracts the body (W = mg); SI unit newton; changes with place; a vector. (1 mark per valid point)"],
    ["State Newton's universal law of gravitation and write it as a formula.", "Every particle attracts every other particle with a force directly proportional to the product of their masses and inversely proportional to the square of the distance between them (1 mark). <b>F = G m₁m₂ / r²</b> (1 mark)."],
    ["What is free fall? What is the acceleration of a freely falling body near the Earth?", "Free fall is the motion of a body under the influence of gravity alone, with no other force acting (1 mark). Its acceleration is <b>g ≈ 9.8 m/s²</b>, directed towards the centre of the Earth, whatever its mass (1 mark)."],
    ["What is escape velocity? Write its approximate value for the Earth.", "The minimum velocity with which a body must be projected from the surface of a planet so that it leaves the planet's gravitational field and never returns (1 mark). For the Earth it is about <b>11.2 km/s</b> (1 mark)."],
    N("A man has a mass of 60 kg. On the Moon g = 1.6 m/s². Find his weight on the Moon (in newton).", 60 * 1.6, "W = mg = 60 × 1.6 = <b>96 N</b>.", "in newton"),
    N("A stone is dropped from the top of a tower. Find its speed after 3 s (in m/s). (g = 10 m/s²)", 30, "v = u + gt = 0 + 10 × 3 = <b>30 m/s</b>.", "in m/s"),
    N("A ball is dropped from a bridge and takes 2 s to reach the water. Find the height of the bridge (in metres). (g = 10 m/s²)", 20, "h = ½gt² = ½ × 10 × 2² = <b>20 m</b>.", "in metres"),
    ["If the masses of both bodies are doubled and the distance between them is unchanged, how does the gravitational force change? Show it.", "F′ = G(2m₁)(2m₂)/r² = 4 G m₁m₂/r² = <b>4F</b>. The force becomes four times."]
  ],
  three: [
    ["Derive the expression for the acceleration due to gravity, g = GM/R², on the surface of the Earth.", "Let M = mass and R = radius of the Earth, and m the mass of a body on its surface. Gravitational force F = GMm/R² (1 mark). Weight of the body W = mg (1 mark). Equating, mg = GMm/R² ⇒ <b>g = GM/R²</b>, independent of m (1 mark)."],
    ["State Kepler's first and second laws of planetary motion.", "<b>First law (law of orbits):</b> every planet moves around the Sun in an elliptical orbit with the Sun at one focus (1½ marks). <b>Second law (law of areas):</b> the line joining the Sun and the planet sweeps equal areas in equal intervals of time, so the planet moves faster when nearer the Sun (1½ marks)."],
    ["Distinguish between G and g (any three points).", "G is the universal gravitational constant, g the acceleration due to gravity. G is the same everywhere in the universe; g changes with place (altitude, latitude). G = 6.67 × 10⁻¹¹ N m² kg⁻²; g = 9.8 m/s² on the Earth. G is a scalar; g is a vector. Unit of G: N m² kg⁻²; unit of g: m/s². (1 mark each)"],
    ["In air a feather falls more slowly than a stone, but in a vacuum they fall together. Explain.", "In air, the feather is affected much more by air resistance and buoyancy because of its large surface area and small weight, so its net downward acceleration is smaller (2 marks). In a vacuum there is no air resistance, so both fall with the same acceleration g irrespective of mass (1 mark)."],
    ["Why is the weight of a body slightly more at the poles than at the equator?", "The Earth is not a perfect sphere; it is flattened at the poles, so the polar radius is smaller than the equatorial radius (1 mark). Since g = GM/R², g is greater at the poles (1 mark). Weight W = mg is therefore greater at the poles (1 mark)."],
    N("A planet has twice the mass and twice the radius of the Earth. Find g on that planet (in m/s²) if g on the Earth is 9.8 m/s².", 9.8 / 2, "g′ = G(2M)/(2R)² = (2/4)·GM/R² = g/2 = 9.8/2 = <b>4.9 m/s²</b>.", "in m/s²"),
    ["A body is thrown vertically upwards. State what happens to its velocity and acceleration during the rise, at the highest point and during the fall.", "While rising, the velocity decreases because gravity acts opposite to the motion (1 mark). At the highest point, velocity is zero for an instant (1 mark), but the acceleration stays equal to g (downward) throughout — rise, top and fall (1 mark)."],
    ["Explain what is meant by weightlessness. When does an astronaut in an orbiting satellite experience it?", "Weightlessness is the state in which a body feels no weight, because there is no reaction force from the surface supporting it (1 mark). The satellite and astronaut are in continuous free fall towards the Earth with the same acceleration (1 mark), so the astronaut exerts no force on the floor and feels weightless (1 mark)."]
  ],
  five: [
    ["Derive the expression for the escape velocity of a body from the surface of the Earth and state its value. Does it depend on the mass of the body?", "<b>Derivation</b> (3 marks): to leave the Earth the kinetic energy must equal the work done against gravity: ½mv² = GMm/R, giving <b>v<sub>esc</sub> = √(2GM/R)</b> = √(2gR). <b>Value</b> (1 mark): about 11.2 km/s. <b>Mass</b> (1 mark): m cancels, so the escape velocity does not depend on the mass of the body."],
    ["Explain how the value of g changes with (i) altitude and (ii) depth, and with the shape of the Earth. A body of mass 5 kg is taken to the Moon where g = 1.6 m/s². Find its mass and weight there.", "(i) g decreases with altitude because r increases (g ∝ 1/r²) (1 mark). (ii) g decreases with depth and becomes zero at the centre (1 mark). (iii) g is greater at the poles than at the equator because the Earth is flattened (1 mark). Mass on the Moon = <b>5 kg</b> (1 mark); weight = mg = 5 × 1.6 = <b>8 N</b> (1 mark)."]
  ]
});

/* ---------- Heat ---------- */
const HE = 'Heat';
add(1, HE, {
  mcq: [
    ["The SI unit of specific heat capacity is:", "J kg⁻¹ K⁻¹", "J K⁻¹", "J kg", "W kg⁻¹", "c = Q/(mΔT), so the unit is J/(kg·K)."],
    ["The specific heat capacity of water is about:", "4200 J/kg °C", "420 J/kg °C", "2100 J/kg °C", "840 J/kg °C", "Water has a high specific heat capacity of 4200 J kg⁻¹ °C⁻¹."],
    ["During melting of ice at 0 °C, the heat supplied is used to:", "change the state without changing the temperature", "raise the temperature of the ice", "raise the temperature of the water", "evaporate the water", "This heat is the latent heat of fusion; the temperature stays at 0 °C."],
    ["According to the principle of calorimetry, if there is no loss of heat:", "heat lost by the hot body = heat gained by the cold body", "heat lost by the hot body > heat gained by the cold body", "heat gained is always zero", "temperature of both bodies remains unchanged", "It follows from the law of conservation of energy."],
    ["Heat capacity of a body is the heat required to raise its temperature by:", "1 °C", "1 kg", "10 °C", "100 °C", "Heat capacity = Q/ΔT, the heat needed per degree rise for the whole body."]
  ],
  one: [
    ["Write the formula for the heat energy Q absorbed by a body of mass m, specific heat c and temperature rise ΔT.", null, "<b>Q = m c ΔT</b>."],
    ["What is the heat required to change 1 kg of a liquid into vapour at its boiling point called?", ["latent heat of vaporisation", "latent heat of vaporization", "heat of vaporisation", "latent heat"], "Latent heat of vaporisation."],
    ["Which process takes place at all temperatures — evaporation or boiling?", ["evaporation"], "Evaporation occurs at every temperature, only from the surface; boiling takes place at a fixed temperature."],
    ["At what temperature (in °C) does pure ice melt at normal atmospheric pressure?", ["0", "0 c", "0 °c"], "Ice melts at 0 °C."],
    ["State the SI unit of latent heat.", null, "J/kg (joule per kilogram)."]
  ],
  two: [
    ["Define specific heat capacity and write its SI unit.", "The heat required to raise the temperature of 1 kg of a substance by 1 °C (or 1 K) (1 mark). SI unit: <b>J kg⁻¹ K⁻¹</b> (1 mark)."],
    ["Distinguish between evaporation and boiling (any two points).", "<b>Evaporation:</b> takes place at all temperatures; only from the surface; slow; causes cooling. <b>Boiling:</b> takes place at a fixed temperature (boiling point); throughout the liquid with bubbles; rapid. (1 mark per valid point)"],
    ["State the principle of calorimetry.", "When two bodies at different temperatures are in contact and no heat is lost to the surroundings, the heat lost by the hotter body equals the heat gained by the colder body, until both reach the same final temperature. (2 marks)"],
    ["Define latent heat of fusion and state its SI unit.", "The heat required to change 1 kg of a solid completely into liquid at its melting point, without any change in temperature (1 mark). SI unit: J/kg (1 mark)."],
    N("How much heat (in joule) is needed to melt 3 kg of ice at 0 °C? (latent heat of fusion of ice = 3.34 × 10⁵ J/kg)", 3 * 334000, "Q = mL = 3 × 3.34 × 10⁵ = <b>1.002 × 10⁶ J</b> = 10,02,000 J.", "in joule"),
    N("A body of mass 4 kg absorbs 16 800 J of heat and its temperature rises by 10 °C. Find the specific heat capacity of its material (in J/kg °C).", 16800 / (4 * 10), "c = Q/(mΔT) = 16 800/(4 × 10) = <b>420 J/kg °C</b>.", "in J/kg °C"),
    N("Find the heat capacity (in J/°C) of a body that needs 6000 J of heat to raise its temperature by 20 °C.", 6000 / 20, "Heat capacity = Q/ΔT = 6000/20 = <b>300 J/°C</b>.", "in J/°C")
  ],
  three: [
    N("200 g of water at 80 °C is mixed with 300 g of water at 30 °C. Find the final temperature of the mixture (in °C), assuming no heat loss.", (200 * 80 + 300 * 30) / 500, "Heat lost = heat gained: 200 × c × (80 − t) = 300 × c × (t − 30). 16000 − 200t = 300t − 9000 ⇒ 500t = 25000 ⇒ <b>t = 50 °C</b>.", "in °C"),
    N("Calculate the heat (in joule) required to raise the temperature of 0.5 kg of copper from 20 °C to 100 °C. (specific heat of copper = 390 J/kg °C)", 0.5 * 390 * 80, "Q = mcΔT = 0.5 × 390 × 80 = <b>15 600 J</b>.", "in joule"),
    ["Why does ice at 0 °C cool a drink better than the same mass of water at 0 °C?", "Ice at 0 °C absorbs the latent heat of fusion (3.34 × 10⁵ J/kg) from the drink in order to melt, in addition to the heat it absorbs when the melted water warms up (2 marks). Water at 0 °C absorbs only the smaller heat needed to warm it, so ice is a far better coolant (1 mark)."],
    ["Distinguish between heat capacity and specific heat capacity (any three points).", "Heat capacity is for the whole body; specific heat capacity is for 1 kg of the substance. Heat capacity depends on mass and substance; specific heat depends only on the substance. Units: J/°C and J/kg °C respectively. Heat capacity = mc. (1 mark each)"],
    ["Why is water used as a coolant in car radiators and in hot-water bags?", "Water has a very high specific heat capacity (4200 J/kg °C) (1 mark). It can therefore absorb or release a large quantity of heat with only a small change in temperature (1 mark), so it removes engine heat efficiently and keeps a hot-water bag warm for a long time (1 mark)."],
    N("How much heat (in joule) is needed to convert 2 kg of water at 100 °C completely into steam at 100 °C? (latent heat of vaporisation = 2.26 × 10⁶ J/kg)", 2 * 2260000, "Q = mL = 2 × 2.26 × 10⁶ = <b>4.52 × 10⁶ J</b> = 45,20,000 J.", "in joule"),
    ["A piece of hot iron is dropped into cold water in a calorimeter. State the three things that are assumed when you apply the principle of calorimetry, and write the equation.", "Assumptions: no heat is lost to the surroundings; the calorimeter absorbs negligible heat (or is included); no change of state occurs (1½ marks). Equation: m₁c₁(T₁ − T) = m₂c₂(T − T₂), where T is the common final temperature (1½ marks)."]
  ],
  five: [
    ["State the principle of calorimetry. Describe how you would find the specific heat capacity of a solid (such as a metal block) using it.", "<b>Principle</b> (1 mark): heat lost by the hot body = heat gained by the cold body. <b>Method</b> (4 marks): weigh the calorimeter with stirrer, add water and weigh again; note its initial temperature T₂. Heat the metal block of known mass m₁ to temperature T₁ in boiling water, drop it quickly into the water, stir and read the final temperature T. Then m₁c₁(T₁ − T) = (m₂c₂ + m₃c₃)(T − T₂), where m₂ and m₃ are masses of water and calorimeter; solve for c₁."],
    ["Draw and explain the temperature–heat graph for heating 1 kg of ice from −10 °C to steam above 100 °C. Name each stage and the formula used.", "<b>Graph</b> (1 mark): five segments. <b>Stages</b> (4 marks): (1) ice warms from −10 °C to 0 °C, Q = mc<sub>ice</sub>ΔT; (2) melting at 0 °C, temperature constant, Q = mL<sub>f</sub>; (3) water warms from 0 °C to 100 °C, Q = mc<sub>w</sub>ΔT; (4) boiling at 100 °C, temperature constant, Q = mL<sub>v</sub>; (5) steam warms above 100 °C, Q = mc<sub>steam</sub>ΔT. During the flat parts heat is used as latent heat."]
  ]
});

/* ---------- Effects of Electric Current ---------- */
const EC = 'Effects of Electric Current';
add(1, EC, {
  mcq: [
    ["The SI unit of electrical resistance is:", "ohm", "ampere", "volt", "watt", "R = V/I, measured in ohm (Ω)."],
    ["When resistors are connected in parallel, the equivalent resistance is:", "less than the smallest individual resistance", "equal to the sum of the resistances", "equal to the largest resistance", "equal to the average resistance", "1/R = 1/R₁ + 1/R₂ + … so R is always smaller than the smallest one."],
    ["The wire used for earthing in a domestic circuit is connected to:", "the metal body of the appliance", "the live wire", "the neutral wire only", "the switch", "The earth wire provides a low-resistance path to the ground so a leakage current does not shock the user."],
    ["Fleming's left-hand rule is used to find the direction of:", "the force on a current-carrying conductor in a magnetic field", "the induced current", "the magnetic field of a magnet", "the resistance of a wire", "Forefinger – field, middle finger – current, thumb – force. It applies to the electric motor."],
    ["An electric generator converts:", "mechanical energy into electrical energy", "electrical energy into mechanical energy", "chemical energy into electrical energy", "heat energy into light energy", "A generator works on electromagnetic induction: rotating coil in a magnetic field."],
    ["The colour of the live wire in a domestic circuit (as in the textbook) is:", "red", "black", "green", "blue", "Live – red, neutral – black, earth – green (as used in the textbook)."]
  ],
  one: [
    ["State Ohm's law in the form of an equation.", null, "<b>V = IR</b> (at constant temperature)."],
    ["Name the device that protects a circuit by melting when the current becomes too high.", ["fuse", "a fuse"], "A fuse wire melts and breaks the circuit during overloading or a short circuit."],
    ["Name the effect of electric current used in an electric heater.", ["heating effect", "heating", "heating effect of current", "joule heating"], "The heating effect of current."],
    ["Which instrument is used to detect a small electric current in a circuit?", ["galvanometer"], "A galvanometer."],
    ["What type of current is supplied to our homes — AC or DC?", ["ac", "alternating", "alternating current"], "Alternating current (AC), 50 Hz in India."]
  ],
  two: [
    ["State Ohm's law. Write the formula for the resistance in terms of potential difference and current.", "At constant temperature, the current through a conductor is directly proportional to the potential difference across its ends (1 mark). <b>V = IR</b> or R = V/I (1 mark)."],
    ["Write the formulae for the equivalent resistance of resistors connected (i) in series (ii) in parallel.", "(i) Series: <b>R = R₁ + R₂ + R₃</b> (1 mark). (ii) Parallel: <b>1/R = 1/R₁ + 1/R₂ + 1/R₃</b> (1 mark)."],
    ["What is a short circuit? What is an overload?", "<b>Short circuit:</b> the live and neutral wires touch directly, resistance becomes very small and the current very large (1 mark). <b>Overload:</b> too many appliances connected to one circuit draw more current than the wires can carry (1 mark)."],
    ["State the use of an earth wire and a fuse in domestic wiring.", "<b>Earth wire:</b> carries any leakage current to the ground and prevents electric shock (1 mark). <b>Fuse:</b> melts when the current exceeds a safe limit and breaks the circuit, protecting appliances and wiring (1 mark)."],
    N("A potential difference of 12 V is applied across a resistor of 4 Ω. Find the current through it (in ampere).", 12 / 4, "I = V/R = 12/4 = <b>3 A</b>.", "in ampere"),
    N("A current of 0.5 A flows through a bulb when the voltage is 220 V. Find the resistance of the bulb filament (in ohm).", 220 / 0.5, "R = V/I = 220/0.5 = <b>440 Ω</b>.", "in ohm"),
    N("Find the equivalent resistance (in ohm) of resistors of 3 Ω, 5 Ω and 7 Ω connected in series.", 15, "R = 3 + 5 + 7 = <b>15 Ω</b>.", "in ohm"),
    N("Find the equivalent resistance (in ohm) of two resistors of 6 Ω and 3 Ω connected in parallel.", 2, "R = (6 × 3)/(6 + 3) = 18/9 = <b>2 Ω</b>.", "in ohm")
  ],
  three: [
    N("Two resistors of 8 Ω and 12 Ω are connected in series across a 20 V battery. Find the current in the circuit (in ampere).", 1, "R = 8 + 12 = 20 Ω. I = V/R = 20/20 = <b>1 A</b>.", "in ampere"),
    N("A heater of power 1000 W works for 3 hours every day. Find the electrical energy used in 10 days (in kWh).", 1 * 3 * 10, "P = 1 kW; energy = P × t = 1 × 3 × 10 = <b>30 kWh</b>.", "in kWh"),
    N("An electric iron draws a current of 4 A at 220 V. Find its power (in watt).", 880, "P = VI = 220 × 4 = <b>880 W</b>.", "in watt"),
    ["Explain the construction of a simple domestic wiring system, naming the three wires.", "Electricity enters through the <b>live</b> (red, at 220 V) and <b>neutral</b> (black, at 0 V) wires from the main supply and passes through a fuse and the main switch (1 mark). Appliances are connected in parallel across live and neutral so each gets 220 V and can be switched independently (1 mark). The <b>earth</b> wire (green) connects the metal body of appliances to the ground for safety (1 mark)."],
    ["State Faraday's law of electromagnetic induction and state two ways of increasing the induced current.", "When the magnetic flux linked with a coil changes, an emf (and current) is induced in it (1 mark). It can be increased by moving the magnet/coil faster, increasing the number of turns of the coil, or using a stronger magnet (any two, 1 mark each)."],
    ["Distinguish between an AC generator and a DC generator (any three points).", "AC generator uses slip rings; DC generator uses a split-ring commutator. AC output reverses its direction periodically; DC output is in one direction only. AC is used for domestic supply; DC is used for charging batteries. AC can be transmitted over long distances efficiently. (1 mark each)"],
    ["Why are appliances in a house connected in parallel and not in series?", "In parallel each appliance receives the full supply voltage (220 V) (1 mark). Each can be switched on or off independently without affecting the others (1 mark). If one fails, the others keep working; in series all would stop and the current would be low (1 mark)."],
    N("A bulb of 100 W is used for 5 hours a day. If the electricity rate is ₹ 6 per unit (kWh), find the cost of using it for 30 days (in ₹).", 0.1 * 5 * 30 * 6, "Energy = 0.1 kW × 5 h × 30 = 15 kWh. Cost = 15 × 6 = <b>₹ 90</b>.", "in rupees")
  ],
  five: [
    ["Explain the principle and working of an electric generator (AC) with a neat labelled diagram.", "<b>Principle</b> (1 mark): electromagnetic induction — an emf is induced in a coil when the flux through it changes. <b>Diagram</b> (2 marks): rectangular armature coil between the N and S poles, two slip rings, two carbon brushes, external circuit/galvanometer. <b>Working</b> (2 marks): the coil is rotated in the magnetic field by an external agent; the flux linked with it changes continuously, so an alternating emf is induced; the slip rings and brushes carry it to the external circuit. Mechanical energy is converted into electrical energy."],
    ["State Fleming's left-hand rule. Describe how a current-carrying conductor behaves in a magnetic field and how the force can be increased.", "<b>Rule</b> (2 marks): stretch the forefinger, middle finger and thumb of the left hand mutually perpendicular; if the forefinger points in the direction of the magnetic field and the middle finger in the direction of the current, the thumb gives the direction of the force on the conductor. <b>Behaviour</b> (1 mark): the conductor experiences a force perpendicular to both field and current; the force is zero if the current is parallel to the field. <b>Increase the force</b> (2 marks): increase the current, use a stronger magnet, or increase the length of the conductor in the field."]
  ]
});

/* ---------- Refraction of Light ---------- */
const RL = 'Refraction of Light';
add(1, RL, {
  mcq: [
    ["When light passes from air into glass, it:", "bends towards the normal", "bends away from the normal", "does not bend", "is totally reflected", "Glass is optically denser, so the ray bends towards the normal."],
    ["The refractive index of a medium with respect to vacuum is 2. The speed of light in that medium is (c = 3 × 10⁸ m/s):", "1.5 × 10⁸ m/s", "3 × 10⁸ m/s", "6 × 10⁸ m/s", "9 × 10⁸ m/s", "v = c/n = 3 × 10⁸/2 = 1.5 × 10⁸ m/s."],
    ["Total internal reflection occurs when light travels from:", "a denser to a rarer medium at an angle greater than the critical angle", "a rarer to a denser medium at any angle", "a denser to a rarer medium at an angle less than the critical angle", "air to vacuum", "The angle of incidence must exceed the critical angle."],
    ["Splitting of white light into its seven colours by a prism is called:", "dispersion", "reflection", "scattering", "diffraction", "Different colours have different speeds in glass and so are bent by different amounts."],
    ["Which colour of white light is bent the most by a glass prism?", "violet", "red", "green", "yellow", "Violet has the shortest wavelength and the highest refractive index, so it deviates most."],
    ["A rainbow is formed due to:", "dispersion and total internal reflection of sunlight in raindrops", "only reflection of sunlight", "only scattering of light", "diffraction of light", "Each raindrop acts like a small prism."]
  ],
  one: [
    ["Write the relation between the refractive index n, the speed of light c in vacuum and the speed v in a medium.", null, "<b>n = c/v</b>."],
    ["State the SI unit of refractive index.", ["no unit", "none", "unitless", "it has no unit", "dimensionless"], "Refractive index is a ratio of two speeds, so it has no unit."],
    ["Which phenomenon makes a diamond sparkle?", ["total internal reflection", "tir"], "The very small critical angle of diamond (about 24°) leads to total internal reflection."],
    ["Name the optical device used in periscopes and binoculars to turn light through 90° or 180°.", ["prism", "a prism", "right-angled prism", "totally reflecting prism"], "A right-angled glass prism using total internal reflection."],
    ["Which colour of light travels fastest in glass?", ["red"], "Red has the lowest refractive index in glass, so it travels fastest."]
  ],
  two: [
    ["State the two laws of refraction of light.", "(1) The incident ray, the refracted ray and the normal at the point of incidence all lie in the same plane (1 mark). (2) Snell's law: sin i / sin r = constant (the refractive index of the second medium with respect to the first) (1 mark)."],
    ["State two conditions necessary for total internal reflection.", "(1) The light must travel from an optically denser medium to a rarer medium (1 mark). (2) The angle of incidence in the denser medium must be greater than the critical angle (1 mark)."],
    ["What is the critical angle? Write its relation to the refractive index.", "The angle of incidence in the denser medium for which the angle of refraction in the rarer medium is 90° (1 mark). <b>n = 1/sin C</b> (1 mark)."],
    ["Give two applications of total internal reflection.", "Optical fibres (communication, endoscopy); prism periscope; sparkling of diamonds; mirage and shining of an air bubble under water. (any two, 1 mark each)"],
    N("The refractive index of water is 1.33 and the speed of light in vacuum is 3 × 10⁸ m/s. Find the speed of light in water (in units of 10⁸ m/s, up to two decimals).", 3 / 1.33, "v = c/n = 3 × 10⁸ / 1.33 = <b>2.26 × 10⁸ m/s</b>.", "give the number only, in 10⁸ m/s", 0.01),
    N("Light travels in a medium with a speed of 2 × 10⁸ m/s. Find the refractive index of the medium. (c = 3 × 10⁸ m/s)", 1.5, "n = c/v = 3 × 10⁸ / 2 × 10⁸ = <b>1.5</b>.", "no unit"),
    N("The refractive index of diamond is 2.4. Find the speed of light in diamond (in units of 10⁸ m/s). (c = 3 × 10⁸ m/s)", 3 / 2.4, "v = c/n = 3 × 10⁸/2.4 = <b>1.25 × 10⁸ m/s</b>.", "give the number only, in 10⁸ m/s", 0.001)
  ],
  three: [
    ["What is dispersion of light? Explain with a labelled ray diagram how a prism disperses white light.", "Dispersion is the splitting of white light into its constituent colours (1 mark). Diagram: a white ray entering a prism and emerging as a band — violet at the bottom (deviates most), red at the top (deviates least) (1 mark). Explanation: each colour has a different refractive index, and so a different deviation (1 mark)."],
    ["Explain how a rainbow is formed.", "Rainbow forms when the Sun is behind the observer and there are water drops in the air (1 mark). Sunlight is refracted and dispersed on entering a raindrop, totally internally reflected inside it and refracted again on leaving (1 mark). Each drop sends different colours at different angles to the eye, giving the arc of seven colours — VIBGYOR — across the sky (1 mark)."],
    ["Explain the working of an optical fibre and name two uses.", "An optical fibre is a thin glass/plastic thread with a dense core and a rarer cladding (1 mark). Light entering at one end strikes the core–cladding boundary at angles greater than the critical angle and undergoes repeated total internal reflection, travelling along the fibre even when it bends (1 mark). Uses: telecommunication/internet, endoscopy (any two, 1 mark)."],
    N("A ray of light passes from air into a liquid. The speed of light in the liquid is 2.25 × 10⁸ m/s. Find the refractive index of the liquid with respect to air. (c = 3 × 10⁸ m/s)", 3 / 2.25, "n = c/v = 3 × 10⁸/2.25 × 10⁸ = 4/3 = <b>1.33</b>.", "up to 2 decimal places", 0.01),
    ["Explain the phenomenon of mirage.", "In deserts the layer of air near the hot ground becomes hotter and rarer than the air above it (1 mark). Light from a tree/sky travelling downwards passes from denser to rarer layers, bends away from the normal and finally undergoes total internal reflection (1 mark). The observer sees an inverted image of the tree/sky, which looks like water on the ground (1 mark)."],
    ["Why does a pencil partly dipped in water appear bent at the water surface?", "Light from the immersed part of the pencil passes from water (denser) to air (rarer) and bends away from the normal (1 mark). The rays seem to come from a point that is higher than the actual position (1 mark), so the submerged part appears raised and the pencil seems bent (1 mark)."],
    ["Why do the Sun and the Moon appear reddish near the horizon? Explain in brief.", "Near the horizon the sunlight/moonlight has to travel a longer path through the atmosphere (1 mark). Shorter wavelengths such as blue are scattered away more strongly by air molecules and dust (1 mark). Red, with its longer wavelength, is scattered the least and reaches the eye, so the Sun looks red (1 mark)."]
  ],
  five: [
    ["State the laws of refraction of light. Define the refractive index of a medium and explain why a glass slab laterally displaces a ray but does not change its direction.", "<b>Laws</b> (2 marks): the incident ray, refracted ray and normal are in one plane; sin i/sin r = constant (Snell's law). <b>Refractive index</b> (1 mark): n = c/v = sin i/sin r. <b>Slab</b> (2 marks): at the first surface the ray bends towards the normal, at the second surface it bends away by an equal angle, so the emergent ray is parallel to the incident ray but shifted sideways (lateral displacement)."],
    ["What is total internal reflection? Describe with a diagram how a ray of light moves in a right-angled prism to turn through 90° and through 180°, and write one use of each.", "<b>TIR</b> (1 mark): light going from a denser to a rarer medium is totally reflected if the angle of incidence exceeds the critical angle. <b>Diagrams</b> (2 marks): (a) ray entering the face perpendicular to a short side strikes the hypotenuse at 45° (> critical angle of glass ≈ 42°) and is turned through 90°; (b) ray entering the hypotenuse is reflected at both short faces and returns, turned through 180°. <b>Uses</b> (2 marks): 90° — periscope/binoculars; 180° — reversing the direction of a ray in binoculars/reflectors."]
  ]
});

/* ---------- Lenses ---------- */
const LE = 'Lenses';
add(1, LE, {
  mcq: [
    ["The power of a lens of focal length 50 cm is:", "+2 D", "+0.5 D", "+50 D", "−2 D", "P = 1/f(m) = 1/0.5 = +2 D for a convex lens."],
    ["A convex lens forms a real and inverted image of the same size as the object when the object is placed at:", "2F", "F", "between F and 2F", "infinity", "At u = 2f, v = 2f and m = −1."],
    ["Hypermetropia (long-sightedness) is corrected using:", "a convex lens", "a concave lens", "a cylindrical lens", "a plane mirror", "A convex lens helps to focus the image on the retina."],
    ["The SI unit of power of a lens is:", "dioptre", "metre", "watt", "newton", "1 D = 1 m⁻¹."],
    ["The magnification produced by a lens is negative. The image is:", "real and inverted", "virtual and erect", "virtual and inverted", "real and erect", "Negative m means the image is inverted, which is always real for a single lens."],
    ["The image formed on the retina of the human eye is:", "real and inverted", "virtual and erect", "real and erect", "virtual and inverted", "The eye lens forms a real inverted image; the brain interprets it as upright."]
  ],
  one: [
    ["Write the lens formula.", null, "<b>1/v − 1/u = 1/f</b> (with the sign convention)."],
    ["Which lens is used to correct myopia (short-sightedness)?", ["concave", "concave lens", "diverging lens", "diverging"], "A concave (diverging) lens."],
    ["What is the power of a lens whose focal length is 1 m?", ["1", "1 d", "+1", "1 dioptre"], "P = 1/f = 1/1 = +1 D."],
    ["Name the part of the human eye that controls the amount of light entering the eye.", ["iris", "pupil", "the iris"], "The iris adjusts the size of the pupil."],
    ["Which lens is used as a magnifying glass?", ["convex", "convex lens", "converging lens", "converging"], "A convex lens of short focal length when the object is within its focal length."]
  ],
  two: [
    ["Distinguish between a convex lens and a concave lens (any two points).", "Convex lens: thicker in the middle, converging, real focus, positive focal length. Concave lens: thinner in the middle, diverging, virtual focus, negative focal length. (1 mark per valid point)"],
    ["What is myopia? Which type of lens corrects it?", "Myopia (short-sightedness): the person can see nearby objects clearly but not distant objects, because the image forms in front of the retina (1 mark). It is corrected with a concave lens of suitable power (1 mark)."],
    ["Define the power of a lens. Write its SI unit.", "The power of a lens is the reciprocal of its focal length expressed in metres, P = 1/f (1 mark). SI unit: dioptre (D) (1 mark)."],
    ["Write the sign convention for the focal length of convex and concave lenses and for the object distance.", "Focal length: positive for a convex lens, negative for a concave lens (1 mark). Distances are measured from the optical centre; the object is on the left, so u is negative (1 mark)."],
    N("Find the power (in dioptre) of a convex lens of focal length 25 cm.", 1 / 0.25, "f = 25 cm = 0.25 m; P = 1/f = 1/0.25 = <b>+4 D</b>.", "in dioptre"),
    N("A concave lens has a power of −2.5 D. Find its focal length (in cm, magnitude only).", 40, "f = 1/P = 1/(−2.5) = −0.4 m = <b>−40 cm</b>. (Magnitude 40 cm.)", "in cm, number only"),
    N("The size of an object is 4 cm and the size of its image is 12 cm. Find the magnification.", 3, "m = h₂/h₁ = 12/4 = <b>3</b>.", "no unit")
  ],
  three: [
    N("An object is placed 30 cm from a convex lens of focal length 15 cm. Find the image distance (in cm).", 30, "u = −30, f = 15: 1/v = 1/f + 1/u = 1/15 − 1/30 = 1/30 ⇒ <b>v = +30 cm</b>.", "in cm"),
    N("An object is placed 40 cm in front of a convex lens of focal length 10 cm. Find the image distance (in cm, up to 2 decimals).", 40 / 3, "1/v = 1/10 − 1/40 = 3/40 ⇒ v = 40/3 = <b>13.33 cm</b>.", "in cm", 0.01),
    N("The magnification of a lens is −2 and the object is 6 cm tall. Find the height of the image (in cm, magnitude).", 12, "m = h₂/h₁ ⇒ h₂ = m × h₁ = −2 × 6 = −12 cm. The image is <b>12 cm</b> tall and inverted.", "in cm, magnitude only"),
    ["Draw a ray diagram for an object placed between F and 2F of a convex lens and state the nature, size and position of the image.", "Diagram (1 mark): ray parallel to the axis refracts through F; ray through the optical centre goes straight. Image (2 marks): formed beyond 2F, <b>real, inverted and magnified</b>."],
    ["What is hypermetropia? State two causes and how it is corrected.", "In hypermetropia the person sees distant objects clearly but cannot see near objects clearly, because the image forms behind the retina (1 mark). Causes: eyeball too short, or the eye lens has a long focal length / weak converging power (1 mark). Correction: convex lens of suitable power (1 mark)."],
    ["Write three differences between a real image and a virtual image.", "Real image is formed by actual intersection of refracted rays; virtual image is formed by apparent intersection (backward extension). Real image can be obtained on a screen; virtual cannot. Real image is inverted; virtual is erect (for a lens). (1 mark each)"],
    ["Describe the working of a simple microscope. Where should the object be placed?", "A simple microscope is a convex lens of short focal length (1 mark). The object is placed between the optical centre and the principal focus F (1 mark). The image formed is virtual, erect and magnified, on the same side as the object, so the small object is seen enlarged (1 mark)."]
  ],
  five: [
    ["A convex lens forms images of different kinds as the object moves from infinity towards the lens. Tabulate the position, nature and size of the image for an object at (i) infinity (ii) beyond 2F (iii) at 2F (iv) between F and 2F (v) between F and the lens.", "(i) At F, real, inverted, highly diminished (1 mark). (ii) Between F and 2F, real, inverted, diminished (1 mark). (iii) At 2F, real, inverted, same size (1 mark). (iv) Beyond 2F, real, inverted, magnified (1 mark). (v) On the same side as the object, virtual, erect, magnified (1 mark)."],
    ["Describe the structure of the human eye with a neat labelled diagram and explain how it forms an image of a distant object.", "<b>Diagram</b> (2 marks): cornea, iris, pupil, eye lens, ciliary muscles, retina, optic nerve, aqueous and vitreous humour. <b>Structure</b> (1 mark): the cornea and eye lens act as a convex lens system; the retina is the screen. <b>Image formation</b> (2 marks): light passes through the cornea and pupil; the iris controls the amount of light; the lens focuses a real inverted image on the retina; its cells send signals through the optic nerve to the brain, which interprets it as erect. Ciliary muscles change the focal length of the lens to focus near and distant objects (accommodation)."]
  ]
});

/* ---------- Space Missions ---------- */
const SM = 'Space Missions';
add(1, SM, {
  mcq: [
    ["The time period of a geostationary satellite is:", "24 hours", "12 hours", "90 minutes", "365 days", "It revolves with the same angular speed as the Earth, so T = 24 h."],
    ["Which Indian mission put a satellite into the orbit of Mars?", "Mangalyaan (Mars Orbiter Mission)", "Chandrayaan-1", "Aryabhata", "Bhaskara", "Mangalyaan was launched in November 2013 and entered the Martian orbit in September 2014."],
    ["India's first satellite, launched in 1975, was:", "Aryabhata", "Rohini", "INSAT-1A", "Bhaskara", "Aryabhata was launched on 19 April 1975."],
    ["Satellites in a polar orbit are mainly used for:", "remote sensing and mapping", "TV broadcasting", "weather forecasts only", "navigation of ships only", "A polar satellite scans the whole Earth as the planet rotates below it."],
    ["The most abundant form of space debris is:", "defunct satellites and rocket fragments", "meteors", "comets", "cosmic dust only", "Human-made debris from dead satellites, rocket stages and collisions orbits the Earth."]
  ],
  one: [
    ["Name the Indian space agency which launches satellites.", ["isro", "indian space research organisation", "indian space research organization"], "ISRO — Indian Space Research Organisation."],
    ["Name India's first lunar mission, launched in 2008.", ["chandrayaan-1", "chandrayaan 1", "chandrayaan"], "Chandrayaan-1."],
    ["From which spaceport in India are ISRO's rockets launched?", ["sriharikota", "satish dhawan space centre", "shar"], "Satish Dhawan Space Centre, Sriharikota."],
    ["What is the approximate height of a geostationary orbit above the Earth's surface?", ["36000", "36000 km", "35786", "36,000 km", "35786 km"], "About 36 000 km."],
    ["Name the Indian regional navigation satellite system.", ["navic", "irnss"], "NavIC (IRNSS)."]
  ],
  two: [
    ["What is a geostationary satellite? State two uses.", "A satellite that revolves in the equatorial plane at a height of about 36 000 km with a period equal to the Earth's period (24 h), so it seems fixed above one point (1 mark). Uses: TV and telecommunication, weather forecasting (any two, ½ mark each)."],
    ["Distinguish between a natural and an artificial satellite, with an example of each.", "<b>Natural:</b> formed in nature, e.g. the Moon. <b>Artificial:</b> man-made and launched into orbit, e.g. Aryabhata, INSAT. (1 mark each)"],
    ["What is meant by orbital velocity? What provides the centripetal force for a satellite?", "The velocity with which a satellite revolves around a planet in a stable orbit (1 mark). The gravitational force of the Earth provides the centripetal force (1 mark)."],
    ["What is space debris? Why is it a problem?", "Space debris is the collection of dead satellites, spent rocket stages and fragments orbiting the Earth (1 mark). Moving at high speed, even small pieces can damage active satellites and space stations and make future launches risky (1 mark)."],
    ["Write the full forms of ISRO and PSLV.", "ISRO — Indian Space Research Organisation; PSLV — Polar Satellite Launch Vehicle. (1 mark each)"],
    ["State any two applications of artificial satellites in everyday life.", "Communication (TV, mobile, internet), weather forecasting, navigation (GPS/NavIC), remote sensing for agriculture and disaster warning, defence (any two, 1 mark each)."],
    N("A planet's orbit radius becomes 4 times that of the Earth. By Kepler's third law (T² ∝ r³), how many times is its period compared with the Earth's (T = 1 year)?", 8, "T² ∝ r³ ⇒ T ∝ r^(3/2); T′ = 4^(3/2) × T = 8 T. The period becomes <b>8 times</b>.", "number of times")
  ],
  three: [
    ["Explain the main stages of a space mission launch with a multi-stage rocket.", "A rocket carries payload in several stages (1 mark). Each stage has its own engine and fuel; when its fuel is used up it is separated and falls away, reducing the mass to be carried (1 mark). The last stage places the satellite in the required orbit with the required orbital velocity (1 mark)."],
    ["Write short notes on India's Mars Orbiter Mission (Mangalyaan).", "Launched by ISRO's PSLV-C25 on 5 November 2013 from Sriharikota (1 mark). Entered Mars orbit on 24 September 2014 in its first attempt, making India the first Asian country to do so (1 mark). Purpose: to study the Martian atmosphere, surface and search for methane (1 mark)."],
    ["What are the differences between a geostationary and a polar satellite (any three points)?", "Geostationary: equatorial orbit at ≈36 000 km, period 24 h, stays above one place, used for communication. Polar: passes over the poles at ≈ 600–900 km, period ≈ 100 minutes, scans the whole Earth, used for remote sensing and mapping. (1 mark per point)"],
    ["What are the effects of space debris, and how can its quantity be reduced?", "Effects: collisions damaging functional satellites and space stations, danger to astronauts, adds more debris (1½ marks). Reduction: designing satellites to deorbit at the end of life, avoiding explosions of spent stages, tracking and removing large objects (1½ marks)."],
    ["Explain why a satellite does not fall down to the Earth although gravity acts on it.", "Gravity provides the centripetal force that keeps the satellite moving in a circle (1 mark). The satellite has a large tangential speed; it keeps falling towards the Earth, but the Earth's surface curves away beneath it by the same amount (1 mark). Thus it stays in orbit (1 mark)."],
    ["Describe any three uses of the Indian remote sensing and communication satellites.", "Remote sensing: crop and forest monitoring, groundwater and mineral exploration, flood and cyclone warnings. Communication: TV broadcasting, telephony, internet and telemedicine/tele-education. (1 mark each use, any three)"],
    ["State the names and purpose of two Indian missions after 2008 other than Mangalyaan.", "Chandrayaan-1 (2008): lunar orbiter that found evidence of water molecules on the Moon (1½ marks). Chandrayaan-2/3: lunar landing missions studying the Moon's south polar region; Chandrayaan-3 landed softly near the south pole in 2023 (1½ marks)."]
  ],
  five: [
    ["Explain what a satellite is. Describe the types of artificial satellites by orbit and state the use of each.", "<b>Satellite</b> (1 mark): a body revolving around a planet. <b>Types</b> (3 marks): geostationary (equatorial, 36 000 km, communication and weather), polar/sun-synchronous (near-polar orbit, 600–900 km, remote sensing and mapping), low-Earth orbit (200–2000 km, space stations, Earth observation). <b>Use</b> (1 mark): each type is chosen for its coverage and revisit time."],
    ["Write an essay on the importance of space missions for India, including the benefits and the problems of space debris.", "<b>Importance</b> (3 marks): communication and broadcasting, weather forecasting and disaster warning, agriculture and resource mapping, navigation, defence and scientific exploration (Chandrayaan, Mangalyaan). <b>Problems</b> (2 marks): space debris threatens satellites and missions; mitigation by designing for deorbiting, tracking objects and international cooperation."]
  ]
});
})();

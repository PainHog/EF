/**
 * NIGHTWAKE — System Configuration
 * --------------------------------
 * Static game data shared by the data models, sheets, chat cards and the pure
 * rules logic (module/logic/). Pure data only: no `game`, `ui`, `foundry` or DOM,
 * so module/logic/ imports it under plain Node.
 *
 * The rulebook (book/src/chapters/) is the source of truth: this file follows the
 * book, never the other way round. Each block names the chapter it copies.
 */

export const EF = {};

/** The system id (must match system.json "id" and contracts.mjs SYSTEM_ID). */
EF.id = "elemental-fighters";

/** Ch 1, Ch 3: the feeding cycle, in order. Each element feeds the next. */
EF.cycle = ["wood", "fire", "earth", "metal", "water"];

/** Ch 2: elements, their techniques (1 Chi, declared with a Strike), and the Shell each breaks. */
EF.elements = {
  wood:  { label: "Wood",  technique: "renewal", techniqueLabel: "Renewal", breaks: "earth", text: "After the roll, you or an ally regains 1 Vigor, whatever the result." },
  fire:  { label: "Fire",  technique: "blaze",   techniqueLabel: "Blaze",   breaks: "metal", text: "+2 damage if you hit at all." },
  earth: { label: "Earth", technique: "bulwark", techniqueLabel: "Bulwark", breaks: "water", text: "Choose a fighter, you or an ally. The next time they would lose Vigor this round, they lose 3 less." },
  metal: { label: "Metal", technique: "edge",    techniqueLabel: "Edge",    breaks: "wood",  text: "Each 6 you roll counts as three hits." },
  water: { label: "Water", technique: "tide",    techniqueLabel: "Tide",    breaks: "fire",  text: "After the roll, reroll up to three dice that aren't hits." }
};

/** Ch 2: fighting styles (always on). */
EF.styles = {
  brawler:  { label: "Brawler",  text: "+1 damage when you meet the Guard." },
  guardian: { label: "Guardian", text: "Once per round, when another fighter would lose Vigor, you may lose it instead. When you do, gain 2 Chi." },
  sweeper:  { label: "Sweeper",  text: "When you meet the Guard, also deal 1 damage to one other enemy." },
  counter:  { label: "Counter",  text: "When an enemy hits you back, deal it 1 damage and gain 1 more Chi." },
  flow:     { label: "Flow",     text: "Lose 1 less Vigor each time, except from a Sweep." },
  breath:   { label: "Breath",   text: "Gain 4 Chi at the start of every fight." }
};

/** Ch 2: perks. */
EF.perks = {
  tough:    { label: "Tough",    text: "+3 maximum Vigor." },
  medic:    { label: "Medic",    text: "After each fight, share out 2 Vigor among the fighters." },
  lucky:    { label: "Lucky",    text: "Once per fight, after you roll, reroll every die that isn't a hit." },
  quick:    { label: "Quick",    text: "Before the first round of each fight, take a free Strike with +1 die. It can't be hit back." },
  stubborn: { label: "Stubborn", text: "The first time in each fight you would go Down, stay up with 2 Vigor instead." },
  trained:  { label: "Trained",  text: "Your Criticals deal 2 more damage and give 1 more Chi." }
};

/** Ch 2, Ch 4: Awakenings (once a night, 3 Chi, 3 rounds; Seal 2). */
EF.awakenings = {
  ascendant:   { label: "Ascendant",   rounds: 3, text: "Each of your hits deals 2 damage." },
  unbreakable: { label: "Unbreakable", rounds: 3, text: "You lose no Vigor." },
  wellspring:  { label: "Wellspring",  rounds: 3, text: "At the start of each round, share out 2 Vigor. A Down fighter given any stands up." },
  tempest:     { label: "Tempest",     rounds: 3, text: "You take two actions each round, and your Strikes can't be hit back." },
  seal:        { label: "Seal",        rounds: 2, text: "The Warden or the Heart can't Surge. Holding the Seal is your action each round." },
  harmony:     { label: "Harmony",     rounds: 3, text: "At the start of each round, share out 3 Chi." }
};

/** Ch 3, Ch 4: the core numbers. */
EF.rules = {
  basePool: 5,          // dice in every Strike
  hitFace: 5,           // a die showing 5 or 6 is a hit
  bonusCap: 2,          // never more than 2 bonus dice on a roll
  critSixes: 2,         // a Critical: the Guard met and two or more 6s
  critDamage: 1, critChi: 1,
  chiStart: 2, chiMax: 5,
  hitBackChi: 1,        // Chi for being hit back (unless it puts you Down)
  rallyVigor: 2,        // a Rallied fighter gets up with 2 Vigor
  standVigor: 1,        // Down fighters stand with 1 Vigor when a fight ends
  heartChi: 3,          // every fighter gains 3 Chi as the Heart fight begins
  awakenCost: 3,
  // techniques, styles, perks
  renewalVigor: 1, blazeDamage: 2, bulwarkReduce: 3, edgeHits: 3, tideRerolls: 3,
  brawlerDamage: 1, guardianChi: 2, sweeperDamage: 1, counterDamage: 1, counterChi: 1, flowReduce: 1, breathChi: 4,
  toughVigor: 3, medicVigor: 2, quickDice: 1, stubbornVigor: 2, trainedDamage: 2, trainedChi: 1,
  feedDamage: 1,
  wellspringVigor: 2, harmonyChi: 3, ascendantMult: 2
};

/** Ch 6: the Unmade. */
EF.stills = { guard: 1, harm: 1, toughPer: 3 };
EF.warden = { guard: 2, harm: 2, shellGuard: 1, toughPer: 9, crush: 3, sweep: 1 };
EF.heart = { guard: 2, harm: 2, base: 5, baseBySize: { 5: 6 }, perAnchor: 4 };

/** Ch 6: the Night card. Only the Heart's Crush and Sweep change. */
EF.difficulties = {
  easy:     { label: "Easy",     crush: 2, sweep: 1 },
  standard: { label: "Standard", crush: 4, sweep: 2 },
  hard:     { label: "Hard",     crush: 6, sweep: 3 }
};

/** Ch 2, Ch 6: by the number of fighters when the night begins. */
EF.sizes = [3, 4, 5];
EF.vigorBySize = { 3: 10, 4: 7, 5: 6 };

/** Ch 6: the Surge table (one d6). */
EF.surge = { 1: "crush", 2: "crush", 3: "sweep", 4: "sweep", 5: "drain", 6: "call" };
EF.surgeLabels = { crush: "Crush", sweep: "Sweep", drain: "Drain", call: "Call" };
EF.drainChi = 2;        // a Warden's Drain: the fighter with the most Chi loses 2
EF.heartDrainChi = 1;   // the Heart's Drain: every fighter loses 1
EF.callStills = 2;      // a Call: 2 more Stills, up to fighters + 2

/** Ch 5: the night. */
EF.night = {
  hours: 4,
  anchors: 5,
  firstClashStillsPer: 2,   // the First Clash: 2 Stills per fighter, no Warden
  anchorStillsPer: 1,       // an Anchor or the Heart: 1 Still per fighter
  longFightRound: 4,        // an Anchor fight still going at the end of round 4 costs one more Hour
  lastRound: 7,             // every fight ends at the end of round 7 (dawn at the Heart)
  partialFrac: 0.5          // driven off: dawn with the Heart at half its Toughness or less
};

/** Fight kinds. */
EF.fightKinds = { clash: "The First Clash", anchor: "An Anchor", heart: "The Heart" };

/** Ch 8: the ready-made night's Anchors (the Night sheet starts with these; the Storyteller can rename them). */
EF.readyNight = [
  { name: "The Old Greenhouse", warden: "the Gardener", shell: "wood" },
  { name: "The Substation", warden: "the Stoker", shell: "fire" },
  { name: "The Underpass", warden: "the Mason", shell: "earth" },
  { name: "The Iron Bridge", warden: "the Girder", shell: "metal" },
  { name: "The Reservoir", warden: "the Overflow", shell: "water" }
];

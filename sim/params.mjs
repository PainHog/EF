/**
 * Every number in the core rules, and every player habit, as a named
 * parameter. RULES mirrors docs/CORE-RULES.md (section numbers in the
 * comments); DIFFICULTY holds the Night card's per-label values (§10); POLICY
 * is how the simulated players decide: a documented, sensible habit, not a rule.
 *
 * Change a number here only together with docs/CORE-RULES.md, and log why in
 * docs/DESIGN.md.
 */

export const RULES = {
  // §1 The roll
  basePool: 5,          // dice every fighter rolls
  hitFace: 5,           // a die showing this or more is a hit
  bonusCap: 2,          // most bonus dice on one roll, from every source
  critSixes: 2,         // sixes needed (with the Guard met) for a Critical
  critDamage: 1,        // extra damage on a Critical
  critChi: 1,           // Chi gained on a Critical

  // §2 Fighters (starting Vigor is in §10)
  chiStart: 2,
  chiMax: 5,

  // §2 Elements: techniques (1 Chi, declared with a Strike)
  woodHeal: 1,          // Wood Renewal: you or an ally regains this much Vigor
  fireDamage: 2,        // Fire Blaze: extra damage if you hit
  earthReduce: 3,       // Earth Bulwark: the chosen fighter's next loss of Vigor this round is this much less
  metalSixExtra: 2,     // Metal Edge: each six counts as 1 + this many hits
  waterRerollDice: 3,   // Water Tide: reroll up to this many dice that aren't hits

  // §2 Fighting styles
  brawlerDamage: 1,     // Brawler: extra damage when you meet the Guard
  guardianChi: 2,       // Guardian: Chi gained when you take another fighter's loss
  sweeperDamage: 1,     // Sweeper: damage to one other enemy when you meet the Guard
  counterDamage: 1,     // Counter: damage to an enemy that hits you back…
  counterChi: 1,        // …and extra Chi
  flowReduce: 1,        // Flow: lose this much less Vigor each time, except from Sweeps
  breathChi: 4,         // Breath: Chi at the start of every fight

  // §2 Perks
  toughVigor: 3,        // Tough: extra maximum Vigor
  medicPool: 2,         // Medic: Vigor shared out after each fight
  quickDice: 1,         // Quick: bonus dice on the free Strike before the first round
  stubbornVigor: 2,     // Stubborn: the first time each fight you'd go Down, stay up with this much
  trainedDamage: 2,     // Trained: your Criticals deal this much more damage…
  trainedChi: 1,        // …and give this much more Chi

  // §3 Fights
  feedDamage: 1,        // a fed strike deals this much more damage if it hits
  rallyVigor: 2,        // a Rallied fighter stands with this much Vigor

  // §4 Enemies
  shellGuard: 1,        // a Shell adds this to Guard until it shatters
  screenGuard: 0,       // standing Stills add this to their Warden's or Heart's Guard…
  guardMax: 3,          // …to at most this
  stills: { tough: 3, guard: 1, harm: 1, swarmPer: 2 }, // Swarm Harm = ceil(Stills / swarmPer)
  warden: { guard: 2, harm: 2, toughPer: 9, crush: 3, sweep: 1 },                  // Toughness = 9 × fighters
  heart: { guard: 2, harm: 2, toughPer: 5, toughBySize: { 5: 6 }, perAnchor: 4, crush: 4, sweep: 2 }, // Toughness = (5 + 4 × Anchors standing) × fighters; 6 + … with five
  feedOnStills: 1,      // the Warden or Heart regains this much Toughness per standing Still each round
  swarmSpread: false,   // Swarm Harm comes as separate 1-point blows the players place
  callStills: 2,        // Stills a Call adds (to at most fighters + 2)

  // §5 Harm and Down
  standVigor: 1,        // Down fighters stand with this after a fight

  // §6 Chi
  chiOnHitBack: 1,
  heartChi: 3,          // Chi every fighter gains when the Heart fight begins

  // §7 Awakening
  awakenCost: 3,
  awakenRounds: 3,      // rounds an Awakening lasts, counting the round it starts
  sealRounds: 2,        // …except Seal
  ascendantMult: 2,     // Ascendant: each hit deals this much damage
  wellspringPool: 2,    // Wellspring: Vigor shared out at the start of each round
  harmonyChi: 3,        // Harmony: Chi shared out at the start of each round

  // §8 The night
  firstClashPer: 2,     // First Clash: Stills per fighter
  anchorStillsPer: 1,   // Anchor: Stills per fighter
  heartStillsPer: 1,    // Heart: Stills per fighter
  anchors: 5,
  huntHours: 4,
  longFightRound: 4,    // an Anchor fight still going at the end of this round costs an Hour
  dawnRound: 7,         // every fight ends at the end of this round (the Heart: dawn)
  partialFrac: 0.5,     // dawn with the Heart at or below this share of its Toughness = partial win

  // §10 Group size
  vigorBySize: { 3: 10, 4: 7, 5: 6 },
};

/** CORE-RULES §10: the Night card's difficulty labels (overrides of RULES). */
export const DIFFICULTY = {
  easy: { heart: { crush: 2, sweep: 1 } },
  standard: {},
  hard: { heart: { crush: 6, sweep: 3 } },
};

/** How the simulated players decide (not rules). */
export const POLICY = {
  restBelow: 0.7,          // take a Respite when the group has less than this share of its Vigor
  withdrawDownShare: 0.5,  // withdraw from an Anchor when at least this share is Down…
  withdrawEnemyAbove: 0.5, // …and its Warden has more than this share of its Toughness left
  reserveForAwakening: false, // in the Hunt, keep enough Chi to Awaken at the Heart (the Heart gives 3)
  awakenInHunt: "trouble", // "trouble": only when someone is Down and the enemy is above half; "never"; "asap"
  packFirstAt: 2,          // strike the pack first while it has at least this many Stills
};

/** Deep-merge plain objects (b wins). */
export function merge(a, b) {
  const out = { ...a };
  for (const [k, v] of Object.entries(b ?? {})) {
    out[k] = v && typeof v === "object" && !Array.isArray(v) && a[k] && typeof a[k] === "object" ? merge(a[k], v) : v;
  }
  return out;
}

export function rulesFor(difficulty, overrides = {}) {
  return merge(merge(RULES, DIFFICULTY[difficulty] ?? {}), overrides);
}

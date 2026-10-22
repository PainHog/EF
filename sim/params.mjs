/**
 * Every number in the core rules, and every player policy, as a named
 * parameter. RULES mirrors docs/CORE-RULES.md; DIFFICULTY holds the per-label
 * overrides from the Night card (CORE-RULES §10); POLICY is how the simulated
 * players decide (not a rule: a documented, sensible habit).
 *
 * Change a number here only together with docs/CORE-RULES.md.
 */

export const RULES = {
  // §1 The roll
  basePool: 5,          // dice every fighter rolls
  hitFace: 5,           // a die showing this or more is a hit
  bonusCap: 2,          // most bonus dice on one roll, from every source
  critSixes: 2,         // sixes needed (with the Guard met) for a Critical
  critDamage: 1,        // extra damage on a Critical
  critChi: 1,           // Chi gained on a Critical

  // §2 Fighters
  vigorBySize: { 3: 10, 4: 7, 5: 6 }, // §10: starting Vigor by group size
  chiStart: 2,
  chiMax: 5,

  // §3 Fights
  feedDamage: 1,        // damage bonus when the previous action fed your element
  rallyVigor: 2,        // a Rallied fighter stands with this much Vigor

  // §4 Enemies
  shellGuard: 1,        // a Shell adds this to Guard until it shatters
  stills: { tough: 3, guard: 1, harm: 1, swarmPer: 2 }, // swarm Harm = ceil(Stills / swarmPer)
  warden: { guard: 2, harm: 2, toughPer: 9, crush: 3, sweep: 1 },   // Toughness = toughPer × fighters
  heart: { guard: 2, harm: 2, toughPer: 11, perAnchor: 3, crush: 3, sweep: 2 }, // Toughness = (toughPer + perAnchor × Anchors standing) × fighters
  callStills: 2,        // Stills a Call adds

  // §5 Harm and Down
  standVigor: 1,        // Down fighters stand with this after a fight
  // §6 Chi
  chiOnHitBack: 1,
  chiFightStart: 0,
  heartChi: 3,          // Chi every fighter gains when the Heart fight begins

  // §2 Elements: techniques (1 Chi, riding on a strike)
  woodHeal: 1,
  fireDamage: 2,
  earthReduce: 3,
  metalSixExtra: 2,     // each six counts as 1 + this many hits
  waterMode: "reroll",  // "opening": no hit back + next striker's Guard −1; "choose": the enemy's Surge is rolled twice, you pick
  waterRerollDice: 2,   // Water (reroll mode) rerolls up to this many dice that aren't hits
  earthOnce: true,      // Bulwark stops only the next loss of Vigor
  earthOne: true,       // Bulwark covers one fighter of your choice (you or an ally)
  earthSelfOnly: false, // Bulwark covers only you
  earthNoSweep: false,  // Bulwark doesn't reduce Sweeps
  waterOpenAll: false,  // the opening lasts for every other strike on that enemy this round
  waterOpening: 1,      // the next strike on the same enemy this round treats its Guard as this much lower

  // §2 Styles
  brawlerDamage: 1,
  guardianReduce: 0,
  sweeperDamage: 2,
  counterDamage: 1,
  counterChi: 1,
  flowReduce: 1,
  flowAll: false,       // Flow reduces every loss of Vigor, not only hit backs
  flowSingle: true,     // Flow reduces everything except Sweeps
  guardianNoSweep: false, // Guardian can't take a Sweep for someone
  guardianOnlySave: false, // Guardian can only take Harm that would put someone Down
  guardianChi: 2,       // Chi the Guardian gains when it takes someone's Harm
  flowFirstFree: false, // Flow ignores the first loss of Vigor each round
  flowChi: 0,           // extra Chi Flow gains when hit back
  internalChi: 3,

  // §2 Perks
  toughVigor: 3,
  medicPool: 2,         // after each fight, share out this much Vigor
  localHours: 1,
  localRestOnly: false, // Local: one Respite takes no Hour (instead of +1 Hour)
  luckyDice: 9,         // Lucky rerolls up to this many dice that aren't hits
  quickDice: 1,         // bonus dice on Quick's free strike
  stubbornVigor: 2,     // Stubborn keeps you up with this much Vigor

  // §7 Awakening
  awakenCost: 3,
  awakenRounds: 3,      // rounds an Awakening lasts, counting the round it starts
  ascendantMult: 2,
  wellspringPool: 2,    // Vigor shared out at the start of each round
  harmonyChi: 3,        // Chi shared out at the start of each round
  sealGuard: 0,         // Seal stops Surges; it doesn't lower Guard
  sealHolds: true,      // holding the Seal takes your action each round
  sealRounds: 3,         // Seal lasts this many rounds (the others last awakenRounds)
  unbreakableIntercept: false, // Unbreakable also takes one Harm a round meant for someone else
  tempestNoHitBack: true,

  // §8 The night
  firstClashPer: 2,     // First Clash pack = this many Stills per fighter
  anchors: 5,
  anchorStillsExtra: 0, // Anchor pack = fighters + this
  heartStillsExtra: 0,
  huntHours: 4,
  longFightRound: 5,    // an Anchor fight still going at the end of this round costs an Hour
  dawnRound: 7,         // the Heart fight ends at the end of this round
  partialFrac: 0.5,     // dawn with the Heart at or below this share of its Toughness = partial
};

/** CORE-RULES §10: the Night card's difficulty labels (overrides of RULES). */
export const DIFFICULTY = {
  easy: { heart: { crush: 1, sweep: 1 } },
  standard: {},
  hard: { heart: { harm: 3, crush: 5, sweep: 3 } },
};

/** How the simulated players decide. */
export const POLICY = {
  restBelow: 0.5,        // take a Respite when the group has less than this share of its Vigor
  withdrawDownShare: 0.5, // withdraw from an Anchor when at least this share is Down…
  withdrawEnemyAbove: 0.5, // …and its Warden has more than this share of its Toughness left
  reserveForAwakening: true, // in the Hunt, keep enough Chi to Awaken at the Heart
  awakenInHunt: "trouble", // "trouble": only when someone is Down and the Warden is above half; "never"; "asap"
  packFirstAt: 3,        // strike the pack first while it has at least this many Stills
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

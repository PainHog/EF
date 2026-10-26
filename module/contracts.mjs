/**
 * NIGHTWAKE — Cross-package contracts.
 * Constants only: no imports, no Foundry globals, no logic. Every name that two
 * parts of the system must agree on (setting keys, chat-card kinds, GM operation
 * names, hook names, flag scopes) is declared here once and imported everywhere;
 * a test asserts each one is actually used. Change it only on purpose, together
 * with every user of it.
 */
export const SYSTEM_ID = "elemental-fighters";
/** Flag scope for documents (flags["elemental-fighters"]). */
export const FLAG = "elemental-fighters";
/** CONFIG.queries handler name for GM-authoritative operations. */
export const QUERY = "elemental-fighters.op";
/** Socket channel (system.json "socket": true). */
export const SOCKET = "system.elemental-fighters";

/** World/client setting keys. */
export const SETTINGS = Object.freeze({
  night: "night",                 // the Night sheet: difficulty, size, Hours, Anchors, the fight in progress
  autoApply: "autoApply",         // apply Strike results (damage, Vigor, Chi) automatically
  autoEnemies: "autoEnemies",     // run the enemies' step (feed, Swarm, Surge) at the end of each round
  autoClocks: "autoClocks",       // keep the Hours, long fights, the round-7 limit and dawn
  guardianPrompt: "guardianPrompt", // ask whether a Guardian takes a loss
  welcomed: "welcomed",           // the Storyteller has seen the welcome note
  migration: "systemMigrationVersion"
});

/** Chat-card kinds (flags["elemental-fighters"].card). */
export const CARD = Object.freeze({
  strike: "strike",
  rally: "rally",
  awaken: "awaken",
  seal: "seal",
  enemies: "enemies",
  clocks: "clocks",
  night: "night"
});

/** GM-authoritative operation names. */
export const OPS = Object.freeze({
  beginNight: "beginNight",
  startFight: "startFight",
  strike: "strike",
  rally: "rally",
  awaken: "awaken",
  holdSeal: "holdSeal",
  endRound: "endRound",
  withdraw: "withdraw",
  respite: "respite",
  join: "join",
  anchors: "anchors"
});

/** Hooks this system fires (other modules may listen). */
export const HOOKS = Object.freeze({
  strike: "nightwake.strike",       // (result, fighterId, targetId)
  roundEnded: "nightwake.roundEnded", // (night)
  fightEnded: "nightwake.fightEnded"  // (night, ending)
});

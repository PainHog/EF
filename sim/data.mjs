/**
 * Game data for the simulator: the names of every option and the two Wu Xing
 * cycles. The numbers live in params.mjs so the runner can sweep them.
 *
 * This file follows docs/CORE-RULES.md (the rules until chapters exist). Once
 * Richard approves the core, the data moves into module/config.mjs and the
 * resolution functions into module/logic/, and the simulator imports them.
 */

/** CORE-RULES §2: the five elements, one per fighter, in the generating cycle's order. */
export const CYCLE = Object.freeze(["wood", "fire", "earth", "metal", "water"]);
export const ELEMENTS = CYCLE;

/** CORE-RULES §3 Feeding (the generating cycle): key feeds value. */
export const FEEDS = Object.freeze({ wood: "fire", fire: "earth", earth: "metal", metal: "water", water: "wood" });

/** CORE-RULES §4 Shells (the overcoming cycle): key breaks value. */
export const BREAKS = Object.freeze({ wood: "earth", earth: "water", water: "fire", fire: "metal", metal: "wood" });

/** The element that breaks a Shell of element `shell`. */
export const breakerOf = shell => Object.keys(BREAKS).find(k => BREAKS[k] === shell);

/** CORE-RULES §2: fighting styles, perks and awakenings (each pick is unique within a group). */
export const STYLES = Object.freeze(["brawler", "guardian", "sweeper", "counter", "flow", "breath"]);
export const PERKS = Object.freeze(["tough", "medic", "lucky", "quick", "stubborn", "trained"]);
export const AWAKENINGS = Object.freeze(["ascendant", "unbreakable", "wellspring", "tempest", "seal", "harmony"]);

export const PICKS = Object.freeze({ element: ELEMENTS, style: STYLES, perk: PERKS, awakening: AWAKENINGS });

/**
 * Fighters the way CORE-RULES §2 makes them: each fighter takes one element,
 * fighting style, perk and awakening, and no two fighters in a group share any
 * of them. Random but always legal; validate() rejects an illegal group.
 */
import { PICKS } from "./data.mjs";

export function makeParty(rng, size) {
  const deck = Object.fromEntries(Object.entries(PICKS).map(([k, v]) => [k, rng.shuffle(v)]));
  return Array.from({ length: size }, (_, i) => ({
    id: i, element: deck.element[i], style: deck.style[i], perk: deck.perk[i], awakening: deck.awakening[i],
  }));
}

export function validate(party) {
  const errs = [];
  if (party.length < 3 || party.length > 5) errs.push(`group of ${party.length}: must be 3 to 5`);
  for (const [k, opts] of Object.entries(PICKS)) {
    const seen = new Set();
    for (const f of party) {
      if (!opts.includes(f[k])) errs.push(`${k} "${f[k]}" is not an option`);
      if (seen.has(f[k])) errs.push(`${k} "${f[k]}" taken twice`);
      seen.add(f[k]);
    }
  }
  return errs;
}

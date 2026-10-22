/**
 * NIGHTWAKE — Pure Rules Logic
 * ----------------------------
 * Every rule the system automates is computed here by a Foundry-free function:
 * no `game`, `ui`, `foundry`, `Hooks`, `CONFIG` or DOM; plain data in, plain data
 * out, plus static data from ../config.mjs. Sheets, chat cards and GM operations
 * call these functions and only do the Foundry plumbing around them, so the rules
 * are unit-tested with `node --test` (test/logic.test.mjs).
 *
 * Each function cites the rulebook passage it implements. The rulebook
 * (book/src/chapters/) is the source of truth: change the book first, then this
 * file and its tests.
 *
 * Plain shapes used below:
 *   fighter: { id, element, style, perk, awakening, vigor, vigorMax, chi, down,
 *              awakened: { active, roundsLeft, used }, luckyUsed, stubbornUsed }
 *   enemy:   { id, kind: "warden" | "heart" | "pack", toughness, toughnessMax,
 *              shell: element | null, shellIntact, masterId (packs) }
 */

import { EF } from "../config.mjs";

const R = EF.rules;
const clampChi = n => Math.max(0, Math.min(R.chiMax, n));

/* ------------------------------------------------------------ the roll -- */

/** Ch 3 "Bonus dice": the Chi die, Help and Quick add dice; at most +2. */
export function bonusDice({ chiDie = false, helpers = 0, quick = false } = {}) {
  const offered = (chiDie ? 1 : 0) + helpers + (quick ? R.quickDice : 0);
  return Math.min(R.bonusCap, offered);
}

/** Ch 3: five dice plus bonus dice. */
export const poolSize = bonus => R.basePool + Math.max(0, Math.min(R.bonusCap, bonus));

/** Ch 3 "The roll": 5s and 6s are hits; Ch 2 Edge: each 6 counts as three hits. */
export function countHits(faces, { edge = false } = {}) {
  const sixes = faces.filter(f => f === 6).length;
  const fives = faces.filter(f => f === 5).length;
  return { hits: fives + sixes * (edge ? R.edgeHits : 1), sixes };
}

/** Ch 2 Tide: reroll up to three dice that aren't hits (the lowest, which is never worse). */
export function tideRerolls(faces) {
  return faces.map((f, i) => [f, i]).filter(([f]) => f < R.hitFace).sort((a, b) => a[0] - b[0]).slice(0, R.tideRerolls).map(([, i]) => i);
}

/** Ch 2 Lucky: reroll every die that isn't a hit. */
export const luckyRerolls = faces => faces.map((f, i) => (f < R.hitFace ? i : -1)).filter(i => i >= 0);

/** Replace the faces at `indices` with `fresh` (in order). */
export function applyRerolls(faces, indices, fresh) {
  const out = [...faces];
  indices.forEach((idx, k) => { out[idx] = fresh[k]; });
  return out;
}

/**
 * Ch 3, Ch 6: the Guard to meet. A pack has Guard 1; a Warden 2, +1 while its
 * Shell holds, except for the element that shatters the Shell; the Heart 2.
 */
export function guardFor(enemy, element) {
  if (enemy.kind === "pack") return EF.stills.guard;
  if (enemy.kind === "heart") return EF.heart.guard;
  const shellCounts = enemy.shell && enemy.shellIntact && EF.elements[element]?.breaks !== enemy.shell;
  return EF.warden.guard + (shellCounts ? EF.warden.shellGuard : 0);
}

/** Ch 6: the enemy's Harm when it hits back. */
export const harmOf = enemy => (enemy.kind === "pack" ? EF.stills.harm : enemy.kind === "heart" ? EF.heart.harm : EF.warden.harm);

/**
 * Ch 3 "Resolving a Strike, in order", with Ch 2 (techniques, styles, perks) and
 * Ch 4 (Ascendant, Tempest). Works out the result of one Strike; applying it to
 * the fighters and enemies is the caller's job.
 *
 * @param {object} a
 * @param {object} a.fighter   the striker
 * @param {object} a.target    the enemy struck
 * @param {number[]} a.faces   the final faces, after any rerolls
 * @param {boolean} a.technique  the element's technique was declared (1 Chi paid)
 * @param {boolean} a.fed      the action just before this one was by the fighter before this one in the ring
 * @param {boolean} a.free     Quick's free Strike (can't be hit back)
 */
export function resolveStrike({ fighter, target, faces, technique = false, fed = false, free = false }) {
  const element = fighter.element;
  const edge = technique && element === "metal";
  const { hits, sixes } = countHits(faces, { edge });
  const guard = guardFor(target, element);
  const met = hits >= guard;
  const critical = met && sixes >= R.critSixes;
  const ascendant = fighter.awakened?.active && fighter.awakening === "ascendant";
  const tempest = fighter.awakened?.active && fighter.awakening === "tempest";

  // Damage: hits (doubled by Ascendant), plus bonuses only if there was a hit.
  const parts = [];
  let damage = 0;
  if (hits > 0) {
    const base = hits * (ascendant ? R.ascendantMult : 1);
    damage += base;
    parts.push({ label: ascendant ? "hits ×2 (Ascendant)" : "hits", value: base });
    const add = (cond, label, value) => { if (cond) { damage += value; parts.push({ label, value }); } };
    add(technique && element === "fire", "Blaze", R.blazeDamage);
    add(fed, "fed", R.feedDamage);
    add(met && fighter.style === "brawler", "Brawler", R.brawlerDamage);
    add(critical, "Critical", R.critDamage);
    add(critical && fighter.perk === "trained", "Trained", R.trainedDamage);
  }
  const left = Math.max(0, target.toughness - damage);
  const falls = left === 0;

  // Ch 6 Shell: the first hit by the element that shatters it does; so does half Toughness.
  let shellShatters = false;
  if (target.kind === "warden" && target.shell && target.shellIntact) {
    const breakerHit = EF.elements[element]?.breaks === target.shell && hits > 0;
    shellShatters = breakerHit || left <= target.toughnessMax / 2;
  }

  const sweeper = met && fighter.style === "sweeper" ? R.sweeperDamage : 0;
  const renewal = technique && element === "wood" ? R.renewalVigor : 0;

  // Missed the Guard and the enemy still stands: it hits back (Ch 3), unless
  // the Strike can't be hit back (Quick's free Strike, Tempest).
  const hitBack = !met && !falls && !free && !tempest ? { harm: harmOf(target) } : null;
  const counter = hitBack && fighter.style === "counter" ? { damage: R.counterDamage, chi: R.counterChi } : null;
  const critChi = critical ? R.critChi + (fighter.perk === "trained" ? R.trainedChi : 0) : 0;

  return { faces, hits, sixes, guard, met, critical, damage, parts, left, falls, shellShatters, sweeper, renewal, hitBack, counter, critChi };
}

/* --------------------------------------------------------- the ring -- */

/** Ch 3 "Feeding": the ring is the cycle order, skipping elements nobody has. */
export const ringOf = elements => EF.cycle.filter(e => elements.includes(e));

/** The element just before `element` in the ring of `elements`. */
export function ringBefore(element, elements) {
  const ring = ringOf(elements);
  const i = ring.indexOf(element);
  if (i < 0 || ring.length < 2) return null;
  return ring[(i - 1 + ring.length) % ring.length];
}

/**
 * Ch 3: a Strike is fed when the action just before it in this fight was taken
 * by the fighter before this one in the ring. Two actions in a row by the same
 * fighter don't feed.
 * @param {{id, element}|null} last  who took the last action in this fight
 */
export function isFed(last, fighter, elements) {
  if (!last || last.id === fighter.id) return false;
  return ringBefore(fighter.element, elements) === last.element;
}

/* -------------------------------------------------- losing Vigor -- */

/**
 * Ch 2 Guardian: who may take this loss instead: once per round, standing, not
 * the fighter losing it, and only with more Vigor than the loss.
 */
export function guardiansFor(victimId, fighters, usedThisRound = [], amount = 0) {
  return fighters.filter(f => f.style === "guardian" && !f.down && f.id !== victimId && !usedThisRound.includes(f.id) && f.vigor > amount);
}

/**
 * Ch 3 "Vigor and going Down": the protections after Guardian, in order:
 * Bulwark (3 less, once, this round), Flow (1 less, not from a Sweep), then
 * Unbreakable (no loss); `afterProtections` is what is left (Guardian's Chi needs
 * 2 or more of what is actually lost). Then Stubborn (Ch 2): the first time in a fight you
 * would go Down, stay up with 2 Vigor. At 0 you are Down: all Chi lost, any
 * Awakening ends. Harm past 0 is lost.
 * @param {object} f   the fighter losing Vigor
 * @param {number} amount
 * @param {{source?: string, bulwark?: boolean}} o  source "sweep" skips Flow; bulwark: f holds a Bulwark this round
 */
export function loseVigor(f, amount, { source = "", bulwark = false } = {}) {
  const steps = [];
  let loss = amount;
  let bulwarkUsed = false;
  if (bulwark && loss > 0) { const cut = Math.min(loss, R.bulwarkReduce); loss -= cut; bulwarkUsed = true; steps.push(`Bulwark −${cut}`); }
  if (f.style === "flow" && source !== "sweep" && loss > 0) { loss -= Math.min(loss, R.flowReduce); steps.push("Flow −1"); }
  if (f.awakened?.active && f.awakening === "unbreakable" && loss > 0) { loss = 0; steps.push("Unbreakable"); }
  let vigor = Math.max(0, f.vigor - loss);
  let stubbornUsed = false;
  if (vigor === 0 && loss > 0 && f.perk === "stubborn" && !f.stubbornUsed) {
    vigor = R.stubbornVigor; stubbornUsed = true; steps.push("Stubborn: stays up with 2");
  }
  const down = vigor === 0;
  return {
    loss: Math.min(loss, f.vigor), afterProtections: loss, vigor, down, wentDown: down && !f.down,
    chi: down ? 0 : f.chi, awakeningEnds: down && !!f.awakened?.active, bulwarkUsed, stubbornUsed, steps
  };
}

/** Ch 3, Ch 4: Chi after gaining `n` (never past 5; extra is lost). */
export const gainChi = (chi, n) => clampChi(chi + n);

/* ------------------------------------------------------- the Unmade -- */

/** Ch 6 "A pack of Stills": damage carries over; a pack with 4 Toughness has two Stills. */
export const stillsIn = pack => (pack.toughness > 0 ? Math.ceil(pack.toughness / EF.stills.toughPer) : 0);

/** Ch 6 Swarm: Harm equal to half its Stills, rounded up, as one blow. */
export const swarmHarm = pack => Math.ceil(stillsIn(pack) / 2);

/** Ch 6 "Draws on its Stills": 1 Toughness per Still standing, never above its start. */
export function drawOnStills(master, packs) {
  const stills = packs.filter(p => p.masterId === master.id).reduce((n, p) => n + stillsIn(p), 0);
  const toughness = Math.min(master.toughnessMax, master.toughness + stills);
  return { gain: toughness - master.toughness, toughness };
}

/** Ch 6: the Surge for a d6 face. */
export const surgeKind = face => EF.surge[face];

/**
 * Ch 6 "Ties, for a Crush or a Drain": the fighter among them who acted last
 * that round. `actedAt` maps fighter id → a clock tick (higher = later).
 */
function pickBy(fighters, score, actedAt, rand = Math.random) {
  const top = Math.max(...fighters.map(score));
  const tied = fighters.filter(f => score(f) === top);
  const last = Math.max(...tied.map(f => actedAt[f.id] ?? -1));
  const pool = tied.filter(f => (actedAt[f.id] ?? -1) === last);
  // …and if none of them acted this round (or still a tie), a die decides
  return pool.length > 1 ? pool[Math.floor(rand() * pool.length)] : pool[0] ?? null;
}

/**
 * Ch 6 "The Surge table": what a Surge does. Returns plain effects for the
 * caller to apply: { kind, losses: [{id, amount, source}], drains: [{id, amount}], call: n }.
 * @param {object} a
 * @param {string} a.kind        crush | sweep | drain | call
 * @param {object} a.master      the Warden or the Heart
 * @param {object[]} a.fighters  every fighter in the fight
 * @param {object} a.damage      fighter id → damage dealt to the master this round
 * @param {object} a.actedAt     fighter id → when they last acted this round
 * @param {string} a.difficulty  easy | standard | hard (the Heart's column)
 * @param {number} a.size        fighters in this fight (the Call cap)
 * @param {number} a.packStills  Stills now in the master's pack(s)
 * @param {Function} a.rand       a die for ties nobody acted to break (0 ≤ x < 1)
 */
export function resolveSurge({ kind, master, fighters, damage = {}, actedAt = {}, difficulty = "standard", size = 3, packStills = 0, rand = Math.random }) {
  const heart = master.kind === "heart";
  const card = EF.difficulties[difficulty] ?? EF.difficulties.standard;
  const standing = fighters.filter(f => !f.down);
  const out = { kind, losses: [], drains: [], call: 0, note: "" };
  const crush = () => {
    const amount = heart ? card.crush : EF.warden.crush;
    const hitters = standing.filter(f => (damage[f.id] ?? 0) > 0);
    const target = hitters.length ? pickBy(hitters, f => damage[f.id], actedAt, rand) : pickBy(standing, f => f.vigor, actedAt, rand);
    if (target) out.losses.push({ id: target.id, amount, source: "crush" });
    out.note = hitters.length ? "the fighter who dealt it the most damage" : "nobody damaged it: the fighter with the most Vigor";
  };
  if (kind === "crush") crush();
  else if (kind === "sweep") {
    // one at a time, in the order the players choose: a Guardian's own share last
    const amount = heart ? card.sweep : EF.warden.sweep;
    for (const f of [...standing].sort((a, b) => (a.style === "guardian") - (b.style === "guardian"))) out.losses.push({ id: f.id, amount, source: "sweep" });
  } else if (kind === "drain") {
    const withChi = standing.filter(f => f.chi > 0);
    if (!withChi.length) { out.kind = "crush"; crush(); out.note = `a Drain that finds no Chi Crushes instead (${out.note})`; }
    else if (heart) for (const f of withChi) out.drains.push({ id: f.id, amount: EF.heartDrainChi });
    else { const t = pickBy(withChi, f => f.chi, actedAt, rand); out.drains.push({ id: t.id, amount: EF.drainChi }); }
  } else if (kind === "call") {
    out.call = Math.max(0, Math.min(EF.callStills, callCap(size) - packStills));
  }
  return out;
}

/* ------------------------------------------------------- the night -- */

/** Ch 2: starting (and maximum) Vigor by the number of fighters; Tough adds 3. */
export const startingVigor = (size, perk) => (EF.vigorBySize[size] ?? EF.vigorBySize[3]) + (perk === "tough" ? R.toughVigor : 0);

/** Ch 6: Warden Toughness, 9 per fighter. */
export const wardenToughness = size => EF.warden.toughPer * size;

/** Ch 6: Heart Toughness, (5 + 4 per Anchor standing) × fighters; 6 instead of 5 with five fighters. */
export const heartToughness = (size, anchorsStanding) => ((EF.heart.baseBySize[size] ?? EF.heart.base) + EF.heart.perAnchor * anchorsStanding) * size;

/** Ch 5: Stills in a fight: 2 per fighter in the First Clash, 1 per fighter at an Anchor or the Heart. */
export const stillsFor = (kind, size) => size * (kind === "clash" ? EF.night.firstClashStillsPer : EF.night.anchorStillsPer);

/** Ch 6: a Call fills a pack up to fighters + 2 Stills. */
export const callCap = size => size + 2;

/** Ch 4: may this fighter Awaken now? (Once a night, 3 Chi, from the first Down tonight or at the Heart.) */
export function canAwaken(f, { firstDownTonight = false, fightKind = null } = {}) {
  if (f.down || f.awakened?.used || f.chi < R.awakenCost || !fightKind) return false;
  return firstDownTonight || fightKind === "heart";
}

/** Ch 4: how many rounds an Awakening lasts, counting the round it starts (Seal 2). */
export const awakeningRounds = awakening => EF.awakenings[awakening]?.rounds ?? 3;

/** Ch 5: the round dawn breaks at the Heart: 7, one sooner per Hour owed. */
export const dawnRound = hoursOwed => Math.max(1, EF.night.lastRound - hoursOwed);

/**
 * Ch 5 "The Hunt's clocks" and "Endings": what the clocks say at the end of a
 * round. Returns { longFight, ends, ending } where ending is one of
 * "holds" (the Warden holds), "won", "driven-off", "lost" or null.
 */
export function clocksAtEndOfRound({ kind, round, hoursOwed = 0, heart = null }) {
  const out = { longFight: false, ends: false, ending: null };
  if (kind === "anchor") {
    if (round === EF.night.longFightRound) out.longFight = true;
    if (round >= EF.night.lastRound) { out.ends = true; out.ending = "holds"; }
  } else if (kind === "heart") {
    if (round >= dawnRound(hoursOwed)) {
      out.ends = true;
      out.ending = heart && heart.toughness <= heart.toughnessMax * EF.night.partialFrac ? "driven-off" : "lost";
    }
  } else if (round >= EF.night.lastRound) {
    out.ends = true; out.ending = "holds";
  }
  return out;
}

/**
 * Ch 5: pay for a long fight. With an Hour left it costs that Hour; with none,
 * dawn comes one round sooner at the Heart instead.
 */
export const payLongFight = ({ hoursLeft, hoursOwed }) => (hoursLeft > 0 ? { hoursLeft: hoursLeft - 1, hoursOwed } : { hoursLeft, hoursOwed: hoursOwed + 1 });

/** Ch 3 "How a fight ends": every fighter Down. */
export const allDown = fighters => fighters.length > 0 && fighters.every(f => f.down);

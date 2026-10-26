/**
 * The pure rules logic (module/logic/rules.mjs) against the rulebook: every
 * worked example in the chapters, the Difficulty table's numbers, and the edge cases
 * the chapters spell out. Run with `npm test`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import * as L from "../module/logic/rules.mjs";
import { EF } from "../module/config.mjs";

const fighter = (o = {}) => ({ id: o.id ?? "f", element: "wood", style: "flow", perk: "tough", awakening: "seal", vigor: 7, vigorMax: 7, chi: 2, down: false, awakened: { active: false, roundsLeft: 0, used: false }, ...o });
const warden = (o = {}) => ({ id: "w", kind: "warden", toughness: 27, toughnessMax: 27, shell: "earth", shellIntact: true, ...o });
const pack = (o = {}) => ({ id: "p", kind: "pack", toughness: 9, toughnessMax: 9, masterId: "w", ...o });

test("Ch 3 example: Jun's strike (Brawler, Guard 2)", () => {
  const jun = fighter({ element: "earth", style: "brawler" });
  const target = warden({ shell: null, shellIntact: false });
  const r = L.resolveStrike({ fighter: jun, target, faces: [6, 5, 3, 3, 2, 1] });
  assert.equal(r.hits, 2); assert.equal(r.met, true); assert.equal(r.damage, 3); assert.equal(r.critical, false); assert.equal(r.hitBack, null);
  const miss = L.resolveStrike({ fighter: jun, target, faces: [6, 4, 3, 3, 2, 1] });
  assert.equal(miss.damage, 1, "one hit: 1 damage, no Brawler bonus");
  assert.deepEqual(miss.hitBack, { harm: 2 });
});

test("Ch 3 example: one round at an Anchor", () => {
  const ana = fighter({ id: "ana", element: "wood", style: "sweeper" });
  const marcus = fighter({ id: "marcus", element: "fire", style: "guardian" });
  const priya = fighter({ id: "priya", element: "metal", style: "flow" });
  const elements = ["wood", "fire", "metal"];
  const w = warden();
  assert.equal(L.guardFor(w, "wood"), 2, "Wood breaks Earth Shells: Guard 2 for Ana");
  assert.equal(L.guardFor(w, "fire"), 3);
  const a = L.resolveStrike({ fighter: ana, target: w, faces: [5, 6, 1, 2, 3], fed: L.isFed(null, ana, elements) });
  assert.equal(a.damage, 2); assert.equal(a.shellShatters, true); assert.equal(a.sweeper, 1);
  const w2 = { ...w, toughness: a.left, shellIntact: false };
  const fedM = L.isFed(ana, marcus, elements);
  assert.equal(fedM, true, "Marcus follows Ana in the ring Wood, Fire, Metal");
  const m = L.resolveStrike({ fighter: marcus, target: w2, faces: [5, 1, 2, 3, 4], technique: true, fed: fedM });
  assert.equal(m.damage, 4, "1 + 2 Blaze + 1 fed"); assert.deepEqual(m.hitBack, { harm: 2 });
  const p = pack({ toughness: 9 - a.sweeper });
  const pr = L.resolveStrike({ fighter: priya, target: p, faces: [5, 5, 6, 1, 2], fed: L.isFed(marcus, priya, elements) });
  assert.equal(pr.damage, 4); assert.equal(pr.left, 4); assert.equal(L.stillsIn({ ...p, toughness: pr.left }), 2);
  const fed = L.drawOnStills({ ...w2, toughness: m.left }, [{ ...p, toughness: pr.left }]);
  assert.equal(fed.gain, 2, "the Warden draws 2 from two Stills");
  assert.equal(L.swarmHarm({ ...p, toughness: pr.left }), 1, "half of 2");
});

test("Ch 3 example: a ring of three skips missing elements", () => {
  const els = ["wood", "earth", "water"];
  assert.deepEqual(L.ringOf(els), ["wood", "earth", "water"]);
  assert.equal(L.ringBefore("wood", els), "water", "the ring closes");
  assert.equal(L.isFed({ id: "x", element: "water" }, fighter({ id: "y", element: "wood" }), els), true);
  assert.equal(L.isFed({ id: "y", element: "wood" }, fighter({ id: "y", element: "wood" }), els), false, "two actions in a row by one fighter");
});

test("Ch 3: the bonus-dice cap is 2 from every source", () => {
  assert.equal(L.bonusDice({ chiDie: true, helpers: 3, quick: true }), 2);
  assert.equal(L.poolSize(L.bonusDice({ chiDie: true })), 6);
  assert.equal(L.poolSize(9), 7);
});

test("Ch 3: damage needs a hit; a Strike that destroys the enemy can't be hit back", () => {
  const f = fighter({ element: "fire" });
  const none = L.resolveStrike({ fighter: f, target: pack(), faces: [1, 2, 3, 4, 4], technique: true, fed: true });
  assert.equal(none.damage, 0); assert.deepEqual(none.hitBack, { harm: 1 });
  const kill = L.resolveStrike({ fighter: f, target: warden({ toughness: 3, shell: null }), faces: [5, 1, 1, 1, 1], technique: true });
  assert.equal(kill.falls, true); assert.equal(kill.hitBack, null);
});

test("Ch 2, Ch 4: Edge, Ascendant, Critical with Trained, Tempest, Quick", () => {
  const metal = fighter({ element: "metal", perk: "trained" });
  const e = L.resolveStrike({ fighter: metal, target: warden({ shell: null }), faces: [6, 6, 1, 1, 1], technique: true });
  assert.equal(e.hits, 6); assert.equal(e.critical, true); assert.equal(e.damage, 6 + 1 + 2); assert.equal(e.critChi, 2);
  const asc = fighter({ awakening: "ascendant", awakened: { active: true, roundsLeft: 3, used: true } });
  const a = L.resolveStrike({ fighter: asc, target: warden({ shell: null }), faces: [5, 5, 1, 1, 1], fed: true });
  assert.equal(a.damage, 5, "hits doubled first, then +1 fed"); assert.equal(a.guard, 2);
  const tmp = fighter({ awakening: "tempest", awakened: { active: true, roundsLeft: 2, used: true } });
  assert.equal(L.resolveStrike({ fighter: tmp, target: warden({ shell: null }), faces: [1, 1, 1, 1, 1] }).hitBack, null);
  assert.equal(L.resolveStrike({ fighter: fighter(), target: pack(), faces: [1, 1, 1, 1, 1, 1], free: true }).hitBack, null);
});

test("Ch 2: Counter answers a hit back", () => {
  const sam = fighter({ element: "water", style: "counter" });
  const r = L.resolveStrike({ fighter: sam, target: warden({ shell: null }), faces: [5, 1, 1, 1, 1] });
  assert.deepEqual(r.counter, { damage: 1, chi: 1 });
});

test("Ch 2: Tide and Lucky reroll only dice that aren't hits", () => {
  assert.deepEqual(L.tideRerolls([5, 1, 4, 2, 6, 3]), [1, 3, 5]);
  assert.deepEqual(L.luckyRerolls([5, 1, 4, 6]), [1, 2]);
  assert.deepEqual(L.applyRerolls([5, 1, 4], [1, 2], [6, 2]), [5, 6, 2]);
});

test("Ch 3: protections in order, then Stubborn; Down loses all Chi", () => {
  const flow = fighter({ style: "flow", vigor: 5, chi: 3 });
  assert.equal(L.loseVigor(flow, 3, { bulwark: true }).loss, 0, "Bulwark −3 takes it all");
  assert.equal(L.loseVigor(fighter({ style: "guardian", vigor: 1 }), 3).afterProtections, 3, "what the protections leave, before Vigor runs out");
  assert.equal(L.loseVigor(flow, 2).loss, 1, "Flow −1");
  assert.equal(L.loseVigor(flow, 2, { source: "sweep" }).loss, 2, "Flow doesn't work against a Sweep");
  const unb = fighter({ awakening: "unbreakable", awakened: { active: true, roundsLeft: 2, used: true }, style: "brawler" });
  assert.equal(L.loseVigor(unb, 6).loss, 0);
  const down = L.loseVigor(fighter({ style: "brawler", vigor: 2, chi: 4 }), 5);
  assert.equal(down.down, true); assert.equal(down.vigor, 0); assert.equal(down.chi, 0);
  const st = L.loseVigor(fighter({ style: "brawler", perk: "stubborn", vigor: 2 }), 5);
  assert.equal(st.down, false); assert.equal(st.vigor, 2); assert.equal(st.stubbornUsed, true);
  assert.equal(L.loseVigor(fighter({ style: "brawler", perk: "stubborn", vigor: 2, stubbornUsed: true }), 5).down, true);
  assert.equal(L.loseVigor(fighter({ style: "brawler", perk: "stubborn", vigor: 1 }), 5).vigor, 1, "Stubborn never gives more than you had");
});

test("Ch 2: Guardian may take a loss once per round, for someone else", () => {
  const fs = [fighter({ id: "g", style: "guardian" }), fighter({ id: "v", style: "brawler" }), fighter({ id: "d", style: "guardian", down: true })];
  assert.deepEqual(L.guardiansFor("v", fs).map(f => f.id), ["g"]);
  assert.deepEqual(L.guardiansFor("g", fs), []);
  assert.deepEqual(L.guardiansFor("v", fs, ["g"]), []);
});

test("Ch 4: Chi never goes past 5", () => {
  assert.equal(L.gainChi(4, 3), 5);
  assert.equal(L.gainChi(0, 0), 0);
});

test("Ch 6: Surges, their targets and ties", () => {
  const a = fighter({ id: "a", vigor: 5, chi: 1 }), b = fighter({ id: "b", vigor: 5, chi: 3 }), c = fighter({ id: "c", vigor: 2, chi: 3 });
  const fs = [a, b, c];
  const w = warden();
  let s = L.resolveSurge({ kind: "crush", master: w, fighters: fs, damage: { a: 2, c: 4 } });
  assert.deepEqual(s.losses, [{ id: "c", amount: 3, source: "crush" }], "the most damage this round");
  s = L.resolveSurge({ kind: "crush", master: w, fighters: fs, actedAt: { a: 1, b: 2 } });
  assert.equal(s.losses[0].id, "b", "nobody damaged it: most Vigor, tie to who acted last");
  s = L.resolveSurge({ kind: "drain", master: w, fighters: fs, actedAt: { b: 1, c: 2 } });
  assert.deepEqual(s.drains, [{ id: "c", amount: 2 }]);
  s = L.resolveSurge({ kind: "drain", master: w, fighters: fs.map(f => ({ ...f, chi: 0 })) });
  assert.equal(s.kind, "crush", "a Drain that finds no Chi Crushes instead");
  const h = { id: "h", kind: "heart", toughness: 30, toughnessMax: 30 };
  s = L.resolveSurge({ kind: "sweep", master: h, fighters: fs, difficulty: "hard" });
  assert.deepEqual(s.losses.map(l => l.amount), [3, 3, 3]);
  s = L.resolveSurge({ kind: "drain", master: h, fighters: fs });
  assert.equal(s.drains.length, 3);
  assert.equal(L.resolveSurge({ kind: "call", master: w, fighters: fs, size: 3, packStills: 4 }).call, 1, "up to fighters + 2");
  assert.equal(L.resolveSurge({ kind: "call", master: w, fighters: fs, size: 3, packStills: 0 }).call, 2);
  assert.equal(L.surgeKind(1), "crush"); assert.equal(L.surgeKind(4), "sweep"); assert.equal(L.surgeKind(5), "drain"); assert.equal(L.surgeKind(6), "call");
});

test("Ch 6: the size table", () => {
  const row = fn => EF.sizes.map(fn);
  assert.deepEqual(row(n => L.startingVigor(n)), [10, 7, 6]);
  assert.deepEqual(row(n => L.startingVigor(n, "tough")), [13, 10, 9]);
  assert.deepEqual(row(L.wardenToughness), [27, 36, 45]);
  assert.deepEqual(row(n => L.heartToughness(n, 0)), [15, 20, 30]);
  assert.deepEqual(row(n => L.heartToughness(n, 1) - L.heartToughness(n, 0)), [12, 16, 20]);
  assert.deepEqual(row(n => L.stillsFor("clash", n)), [6, 8, 10]);
  assert.deepEqual(row(n => L.stillsFor("anchor", n)), [3, 4, 5]);
  assert.deepEqual(row(L.callCap), [5, 6, 7]);
});

test("Ch 4: when you may Awaken", () => {
  const f = fighter({ chi: 3 });
  assert.equal(L.canAwaken(f, { fightKind: "anchor" }), false, "not before the first Down tonight");
  assert.equal(L.canAwaken(f, { fightKind: "anchor", firstDownTonight: true }), true);
  assert.equal(L.canAwaken(f, { fightKind: "heart" }), true);
  assert.equal(L.canAwaken({ ...f, chi: 2 }, { fightKind: "heart" }), false);
  assert.equal(L.canAwaken({ ...f, awakened: { used: true } }, { fightKind: "heart" }), false, "once a night");
  assert.equal(L.awakeningRounds("seal"), 2); assert.equal(L.awakeningRounds("tempest"), 3);
});

test("Ch 5: the clocks", () => {
  assert.deepEqual(L.clocksAtEndOfRound({ kind: "anchor", round: 4 }), { longFight: true, ends: false, ending: null });
  assert.equal(L.clocksAtEndOfRound({ kind: "anchor", round: 7 }).ending, "holds");
  assert.deepEqual(L.payLongFight({ hoursLeft: 2, hoursOwed: 0 }), { hoursLeft: 1, hoursOwed: 0 });
  assert.deepEqual(L.payLongFight({ hoursLeft: 0, hoursOwed: 0 }), { hoursLeft: 0, hoursOwed: 1 });
  assert.equal(L.dawnRound(2), 5);
  const heart = { toughness: 15, toughnessMax: 30 };
  assert.equal(L.clocksAtEndOfRound({ kind: "heart", round: 7, heart }).ending, "driven-off", "half or less");
  assert.equal(L.clocksAtEndOfRound({ kind: "heart", round: 7, heart: { ...heart, toughness: 16 } }).ending, "lost");
  assert.equal(L.clocksAtEndOfRound({ kind: "heart", round: 6, hoursOwed: 1, heart }).ends, true);
  assert.equal(L.clocksAtEndOfRound({ kind: "heart", round: 6, heart }).ends, false);
});

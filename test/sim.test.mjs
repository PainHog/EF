/**
 * Simulator tests — run with `npm test` (node --test).
 *  - the party generator only makes legal groups, and the validator catches illegal ones;
 *  - the ready-made fighters are a legal group;
 *  - the same seed plays the same night;
 *  - every night respects the clocks and limits in docs/CORE-RULES.md;
 *  - the feeding ring always closes;
 *  - Standard stays near its target (a loose guard against a broken change).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { makeRng } from "../sim/rng.mjs";
import { makeParty, validate } from "../sim/party.mjs";
import { playNight } from "../sim/engine.mjs";
import { rulesFor, POLICY } from "../sim/params.mjs";
import { READY_MADE, CYCLE, FEEDS, BREAKS, breakerOf } from "../sim/data.mjs";
import { runCell, summarise } from "../sim/run.mjs";

const night = (party, seed, diff = "standard") =>
  playNight({ party, R: rulesFor(diff), P: POLICY, rng: makeRng(seed, "test") });

test("the party generator makes only legal groups of 3 to 5", () => {
  for (const size of [3, 4, 5]) for (let i = 0; i < 200; i++) {
    const p = makeParty(makeRng(9, size, i), size);
    assert.equal(p.length, size);
    assert.deepEqual(validate(p), []);
  }
});

test("the validator rejects shared picks and wrong sizes", () => {
  const p = makeParty(makeRng(1), 3);
  assert.ok(validate([...p, { ...p[0], id: 3 }]).some(e => e.includes("taken twice")));
  assert.ok(validate(p.slice(0, 2)).some(e => e.includes("must be 3 to 5")));
});

test("the ready-made fighters are a legal group", () => {
  assert.deepEqual(validate(READY_MADE.map((f, id) => ({ id, ...f }))), []);
});

test("the two cycles are the Wu Xing cycles", () => {
  assert.deepEqual(CYCLE.map(e => FEEDS[e]), ["fire", "earth", "metal", "water", "wood"]);
  assert.deepEqual(Object.entries(BREAKS), [["wood", "earth"], ["earth", "water"], ["water", "fire"], ["fire", "metal"], ["metal", "wood"]]);
  for (const e of CYCLE) assert.equal(BREAKS[breakerOf(e)], e);
});

test("the same seed plays the same night", () => {
  const p = makeParty(makeRng(4), 4);
  assert.deepEqual(night(p, 77), night(p, 77));
  assert.notDeepEqual(night(p, 77), night(p, 78));
});

test("every night keeps to the clocks and limits", () => {
  for (const diff of ["easy", "standard", "hard"]) for (const size of [3, 4, 5]) for (let i = 0; i < 60; i++) {
    const p = makeParty(makeRng(5, size, i), size);
    const n = night(p, i, diff);
    assert.ok(["win", "partial", "loss"].includes(n.outcome));
    assert.equal(n.fights[0].kind, "clash");
    assert.equal(n.fights.at(-1).kind, "heart");
    for (const f of n.fights) assert.ok(f.rounds <= 7, `${f.kind} fight ran ${f.rounds} rounds`);
    const anchors = n.fights.filter(f => f.kind === "anchor");
    // a long fight with no Hour left brings dawn closer instead (overdue)
    assert.ok(anchors.length + n.rests + n.longFights - n.overdue <= rulesFor(diff).huntHours, "the Hunt used more Hours than it has");
    assert.ok(n.fights.at(-1).rounds <= Math.max(1, rulesFor(diff).dawnRound - n.overdue), "dawn came late");
    assert.ok(n.anchorsBroken <= 5);
    assert.equal(n.standing, 5 - n.anchorsBroken);
    for (const f of n.fighters) {
      assert.ok(f.chiSpent <= f.chiStart + f.chiGained, "spent Chi nobody had");
      assert.ok(f.chiWasted >= 0);
    }
  }
});

test("the feeding ring closes for every group, so every fighter can be fed", () => {
  for (const size of [3, 4, 5]) for (let i = 0; i < 50; i++) {
    const p = makeParty(makeRng(6, size, i), size);
    const ring = CYCLE.filter(el => p.some(f => f.element === el));
    assert.equal(ring.length, size);
    // the fighter before each one in the ring is someone else
    ring.forEach((el, k) => assert.notEqual(ring[(k - 1 + size) % size], el));
  }
});

test("Standard stays near its target win rate", () => {
  const x = summarise([3, 4, 5].flatMap(size => runCell({ diff: "standard", size, runs: 500, seed: 11 })));
  assert.ok(x.win > 0.65 && x.win < 0.85, `Standard win ${x.win}`);
  assert.ok(x.loss > 0.03 && x.loss < 0.2, `Standard loss ${x.loss}`);
});

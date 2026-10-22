/**
 * The system on the fake Foundry (tools/fake-foundry.mjs): a Storyteller and three
 * players play a night through the real entry module, sheets, dialogs and
 * Storyteller operations, with scripted dice and dialog answers. Checks the
 * results against the book.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { installFoundry, log, Hooks, asUser, diceQueue, dialogResponders, fakeForm, packDoc, settle } from "../tools/fake-foundry.mjs";

const { game } = installFoundry({ users: [
  { id: "gm00000000000000", name: "Storyteller", isGM: true },
  { id: "p100000000000000", name: "P1" }, { id: "p200000000000000", name: "P2" }, { id: "p300000000000000", name: "P3" }
] });
await import("../module/elemental-fighters.mjs");
Hooks.callAll("init");
Hooks.callAll("ready");
const { OPS, SYSTEM_ID, SETTINGS, CARD } = await import("../module/contracts.mjs");
const { strikeFlow, rallyFlow, awakenFlow } = await import("../module/apps/actions.mjs");
const { FighterSheet, UnmadeSheet, PackSheet } = await import("../module/apps/sheets.mjs");
const { NightTracker } = await import("../module/apps/night.mjs");
const api = game.elementalFighters;
const [gm, p1, p2, p3] = game.users;

const make = async (key, owner) => {
  const d = packDoc("fighters", key, "fighter");
  return Actor.create({ ...d, ownership: { default: 0, [owner.id]: 3 } });
};
const dani = await make("01-dani", p1), marcus = await make("02-marcus", p2), priya = await make("04-priya", p3);
const night = () => api.getNight();
const fight = () => night().fight;
const pack = () => game.actors.get(fight().packIds[0]);
const master = () => game.actors.get(fight().masterId);
/** Answer the next prompt dialog with these form values. */
const answer = values => dialogResponders.push(opts => opts.ok.callback({}, { form: fakeForm(values) }));
const confirm = yes => dialogResponders.push(() => yes);
const set = (k, v) => game.settings.set(SYSTEM_ID, k, v);
const lastCard = () => game.messages.at(-1);

test("the night begins with the Difficulty table's numbers", async () => {
  const res = await api.request(OPS.beginNight, { difficulty: "easy", fighterIds: [dani.id, marcus.id, priya.id] });
  assert.equal(res.ok, true, res.error);
  for (const a of [dani, marcus, priya]) { assert.equal(a.system.vigor.value, 10); assert.equal(a.system.vigor.max, 10); assert.equal(a.system.chi, 2); }
  assert.equal(night().phase, "prologue");
  assert.equal(night().size, 3);
});

test("a player can't act for someone else's fighter", async () => {
  const res = await asUser(p1, () => api.request(OPS.awaken, { fighterId: marcus.id }));
  assert.equal(res.ok, false);
  assert.match(log.warnings.at(-1), /You don't play Marcus/);
});

test("the First Clash: Quick, feeding, Help-free strikes, a Critical, Guardian, Medic", async () => {
  assert.equal((await api.request(OPS.startFight, { kind: "clash" })).ok, true);
  assert.equal(pack().system.toughness.value, 18, "2 Stills per fighter, 3 Toughness each");

  // Dani's free Strike with +1 die (Quick): 6 dice, two hits on Guard 1.
  answer({ target: pack().id, renewalTarget: dani.id });
  diceQueue.push(5, 5, 1, 2, 3, 4);
  let r = await asUser(p1, () => strikeFlow(dani, { free: true }));
  assert.equal(r.ok, true, r.error);
  assert.equal(pack().system.toughness.value, 16);
  assert.deepEqual(fight().actions, {}, "the free Strike isn't the round's action");

  // Marcus: Blaze, no hits. Fed by Dani, but damage needs a hit. Hit back for 1, +1 Chi.
  answer({ target: pack().id, technique: true });
  diceQueue.push(1, 2, 3, 4, 4);
  r = await asUser(p2, () => strikeFlow(marcus));
  assert.equal(r.ok, true, r.error);
  assert.equal(r.result.damage, 0);
  assert.equal(marcus.system.vigor.value, 9);
  assert.equal(marcus.system.chi, 2, "2 − 1 Blaze + 1 for the hit back");

  // Priya: Chi die, a Critical; fed by Marcus (Fire before Metal).
  answer({ target: pack().id, chiDie: true });
  diceQueue.push(6, 6, 5, 1, 2, 3);
  r = await asUser(p3, () => strikeFlow(priya));
  assert.equal(r.result.critical, true);
  assert.equal(r.result.damage, 5, "3 hits + 1 fed + 1 Critical");
  assert.equal(priya.system.chi, 2, "2 − 1 Chi die + 1 for the Critical");
  assert.equal(pack().system.toughness.value, 11);

  // Dani again (her round action): fed by Priya, Metal before Wood in this ring.
  answer({ target: pack().id, renewalTarget: dani.id });
  diceQueue.push(5, 1, 1, 1, 1);
  r = await asUser(p1, () => strikeFlow(dani));
  assert.equal(r.result.damage, 2);
  r = await asUser(p1, () => api.request(OPS.rally, { fighterId: dani.id, targetId: marcus.id }));
  assert.equal(r.ok, false, "one action a round");

  // End of round: the pack (9 Toughness, 3 Stills) Swarms for 2; Marcus (Guardian) takes it for Priya.
  answer({ target: priya.id });
  confirm(true);
  r = await api.request(OPS.endRound);
  assert.equal(r.ok, true, r.error);
  assert.equal(priya.system.vigor.value, 10);
  assert.equal(marcus.system.vigor.value, 7);
  assert.equal(marcus.system.chi, 4, "Guardian: +2 Chi");
  assert.equal(fight().round, 2);

  // Round 2: Dani (not fed: she acted last) and Marcus (fed) finish the pack.
  answer({ target: pack().id, chiDie: true, renewalTarget: dani.id });
  diceQueue.push(6, 6, 6, 5, 5, 5);
  r = await asUser(p1, () => strikeFlow(dani));
  assert.equal(r.result.damage, 7, "6 hits + 1 Critical, not fed");
  answer({ target: pack().id });
  diceQueue.push(5, 1, 1, 1, 1);
  answer({ [`n-${marcus.id}`]: 2 });          // Priya's Medic share after the fight
  r = await asUser(p2, () => strikeFlow(marcus));
  assert.equal(r.ok, true, r.error);
  assert.equal(fight(), null);
  assert.equal(night().phase, "hunt");
  assert.equal(marcus.system.vigor.value, 9, "Medic +2");
  assert.equal(night().hoursLeft, 4, "the First Clash costs no Hour");
});

test("an Anchor: Shell Guard, hit back, the enemies' step, withdrawing", async () => {
  await set(SETTINGS.guardianPrompt, false);
  assert.equal((await api.request(OPS.startFight, { kind: "anchor", anchor: 1 })).ok, true);
  assert.equal(night().hoursLeft, 3);
  assert.equal(master().system.toughness.value, 27);
  assert.equal(master().system.guard, 3, "Fire Shell: nobody here is Water");

  answer({ target: master().id, renewalTarget: dani.id });
  diceQueue.push(5, 5, 1, 1, 1);
  const r = await asUser(p1, () => strikeFlow(dani));
  assert.equal(r.result.met, false);
  assert.equal(dani.system.vigor.value, 8, "hit back for 2");
  assert.equal(dani.system.chi, 3, "2 + 1 for the hit back");
  assert.equal(master().system.toughness.value, 25);

  // End of round: feeds (+2 for 3 Stills, back to 27), Swarm 2 to Priya (Flow: 1), Surge 1: Crush 3 on Dani (the only one who damaged it).
  diceQueue.push(1);
  const e = await api.request(OPS.endRound, { swarmTargets: { [pack().id]: priya.id } });
  assert.equal(e.ok, true, e.error);
  assert.equal(master().system.toughness.value, 27);
  assert.equal(priya.system.vigor.value, 9, "Flow: 1 less");
  assert.equal(dani.system.vigor.value, 5, "Crush 3");

  diceQueue.push(3);                           // round 2 Surge: Sweep 1 each
  answer({ [`n-${dani.id}`]: 2 });             // Priya's Medic share after the fight
  const w = await api.request(OPS.withdraw, { swarmTargets: { [pack().id]: marcus.id } });
  assert.equal(w.ok, true, w.error);
  assert.equal(dani.system.vigor.value, 6, "5 − 1 Sweep + 2 Medic");
  assert.equal(priya.system.vigor.value, 8, "9 − 1 Sweep (Flow doesn't work on a Sweep)");
  assert.equal(fight(), null);
  assert.equal(night().anchors[1].broken, false, "the Anchor stands");
  assert.equal(night().hoursLeft, 3);
});

test("a Respite, and the Heart waits for the Hunt to end", async () => {
  assert.equal((await api.request(OPS.respite)).ok, true);
  assert.equal(night().hoursLeft, 2);
  for (const a of [dani, marcus, priya]) assert.equal(a.system.vigor.value, a.system.vigor.max);
  const h = await api.request(OPS.startFight, { kind: "heart" });
  assert.equal(h.ok, false);
});

test("a long fight costs an Hour, and the Warden holds at round 7", async () => {
  await set(SETTINGS.autoEnemies, false);
  assert.equal((await api.request(OPS.startFight, { kind: "anchor", anchor: 0 })).ok, true);
  assert.equal(night().hoursLeft, 1);
  for (let round = 1; round <= 7; round++) assert.equal((await api.request(OPS.endRound)).ok, true);
  assert.equal(night().hoursLeft, 0, "the long fight paid the last Hour");
  assert.equal(fight(), null);
  assert.equal(night().anchors[0].broken, false);
  assert.equal(night().phase, "heart");
});

test("the Heart: Toughness from the Anchors standing, 3 Chi, Awakening, dawn", async () => {
  const before = { dani: dani.system.chi };
  assert.equal((await api.request(OPS.startFight, { kind: "heart" })).ok, true);
  assert.equal(master().system.toughness.value, (5 + 4 * 5) * 3);
  assert.equal(dani.system.chi, Math.min(5, before.dani + 3));
  const aw = await asUser(p1, () => awakenFlow(dani));
  assert.equal(aw.ok, true, aw.error);
  assert.equal(dani.system.awakened.active, true);
  assert.equal(dani.system.awakened.roundsLeft, 3);
  for (let round = 1; round <= 3; round++) await api.request(OPS.endRound);
  assert.equal(dani.system.awakened.active, false, "3 rounds, counting the first");
  for (let round = 4; round <= 7; round++) await api.request(OPS.endRound);
  assert.equal(night().ending, "lost", "dawn with the Heart above half");
  assert.equal(night().phase, "ended");
});

test("sheets and the Night sheet render for the Storyteller and a player", async () => {
  for (const [Sheet, doc] of [[FighterSheet, dani], [UnmadeSheet, game.actors.find(a => a.type === "unmade")], [PackSheet, game.actors.find(a => a.type === "pack")]]) {
    const app = new Sheet({ document: doc });
    await app.render();
    assert.ok(app.element.innerHTML.length > 200, `${Sheet.name} rendered`);
  }
  const t = new NightTracker();
  await t.render();
  assert.match(t.element.innerHTML, /Lost: the Unmade took hold/);
  await asUser(p1, () => new NightTracker().render());
  await settle();
  assert.deepEqual(log.errors, []);
  assert.ok(game.messages.some(m => m.flags[SYSTEM_ID]?.card === CARD.strike));
});

test("every contract name is used by the system", async () => {
  const { readFileSync, readdirSync } = await import("node:fs");
  const walk = d => readdirSync(d, { withFileTypes: true }).flatMap(e => (e.isDirectory() ? walk(`${d}/${e.name}`) : e.name.endsWith(".mjs") ? [`${d}/${e.name}`] : []));
  const code = walk("module").filter(f => !f.endsWith("contracts.mjs")).map(f => readFileSync(f, "utf8")).join("\n");
  const C = await import("../module/contracts.mjs");
  for (const group of ["SETTINGS", "CARD", "OPS", "HOOKS"]) {
    for (const key of Object.keys(C[group])) assert.ok(code.includes(`${group}.${key}`), `${group}.${key} is never used`);
  }
});

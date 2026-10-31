/**
 * Whole nights online: the fake Foundry (tools/fake-foundry.mjs) plays complete
 * nights through the real entry module, the Ready-made Nights add-on, the
 * players' action dialogs and the Storyteller's operations, for both ready-made
 * nights, every group size and every difficulty. Dice come from the fake's seeded
 * generator, so every run plays the same nights.
 *
 * The players play by the simulator's player policy (sim/params.mjs POLICY,
 * sim/engine.mjs): the Stills first while two or more stand, a Shell-breaker on
 * its Shell, techniques and Help when they pay, 3 Chi kept for the Awakening at
 * the Heart, Rally a Down friend, Awaken at the Heart (in the Hunt only in
 * trouble), Hold the Seal, the Guardian for losses of 2 or more, a Respite below
 * 70% Vigour, withdraw when half the group is Down and the Warden is above half.
 * After every step the test checks the book's limits: Vigour between 0 and its
 * maximum, Chi between 0 and 5, Toughness between 0 and its starting value, no
 * errors, and every night reaching one of the book's endings. Played that way, the
 * online version should win about as often as the simulator says.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { installFoundry, log, Hooks, asUser, dialogResponders, fakeForm, packDoc } from "../tools/fake-foundry.mjs";

const { game } = installFoundry({ users: [
  { id: "gm00000000000000", name: "Storyteller", isGM: true },
  { id: "p100000000000000", name: "P1" }, { id: "p200000000000000", name: "P2" }, { id: "p300000000000000", name: "P3" }
] });
await import("../module/elemental-fighters.mjs");
await import("../modules/nightwake-nights/scripts/nights.mjs");
Hooks.callAll("init"); Hooks.callAll("setup"); Hooks.callAll("ready");
const { OPS } = await import("../module/contracts.mjs");
const { strikeFlow, rallyFlow, awakenFlow, sealFlow } = await import("../module/apps/actions.mjs");
const { POLICY } = await import("../sim/params.mjs");
const L = await import("../module/logic/rules.mjs");
const api = game.elementalFighters, EF = api.EF;
const [gm, ...players] = game.users;

const KEYS = ["01-dani", "02-marcus", "03-jun", "04-priya", "05-sam"];
const roster = [];
for (const [i, k] of KEYS.entries()) {
  const owner = players[i % players.length];
  roster.push({ actor: await Actor.create({ ...packDoc("fighters", k, "fighter"), ownership: { default: 0, [owner.id]: 3 } }), owner });
}

const A = id => game.actors.get(id);
const ratio = t => (t.max ? t.value / t.max : 0);
/** The policy's Chi kept back: 3 at the Heart until you have Awakened. */
const reserveOf = a => (night().fight?.kind === "heart" && !a.system.awakened.used ? EF.rules.awakenCost : 0);
let striker = null, free = false, aimed = null;

/** sim chooseTarget: Sweepers and big packs first, Shell-breakers on their Shell, otherwise the Warden or Heart. */
function chooseTarget(a) {
  const fight = night().fight;
  const master = fight.masterId ? A(fight.masterId) : null, pack = A(fight.packIds[0]);
  const m = master && master.system.toughness.value > 0 ? master : null, p = pack && pack.system.toughness.value > 0 ? pack : null;
  if (!m) return p;
  if (!p) return m;
  const stills = L.stillsIn({ toughness: p.system.toughness.value });
  if (a.system.style === "sweeper" && stills >= 2) return p;
  if (m.system.shell && m.system.shellIntact && EF.elements[a.system.element].breaks === m.system.shell) return m;
  return stills >= POLICY.packFirstAt ? p : m;
}

/** sim wantsTechnique: when each element's technique is worth its Chi. */
function wantsTechnique(a, t, g) {
  const team = night().fight.fighterIds.map(A).filter(x => !x.system.down);
  switch (a.system.element) {
    case "wood": return team.some(x => x.system.vigor.max - x.system.vigor.value >= EF.rules.renewalVigor && x.system.vigor.value <= x.system.vigor.max / 2);
    case "fire": return t.system.toughness.value >= 3;
    case "earth": return !night().fight.bulwark.length && (t.type !== "pack" || L.stillsIn({ toughness: t.system.toughness.value }) >= 3); // one Bulwark a round
    case "metal": return g >= 2;
    case "water": return t.type !== "pack" || g >= 2;
  }
  return false;
}

/** Answers the system's dialogs the way the simulator's players decide. */
function auto(opts, kind) {
  const html = opts.content ?? "", title = opts.window?.title ?? "";
  if (kind === "confirm") {
    if (title === "Lucky") { // sim: Lucky only to dodge a hit back
      const faces = html.match(/You rolled ([\d, ]+)\./)[1].split(",").map(Number);
      const tempest = striker.system.awakened.active && striker.system.awakening === "tempest";
      return !free && !tempest && faces.filter(x => x >= EF.rules.hitFace).length < aimed.guard;
    }
    // the Guardian: take another fighter's loss of 2 or more, or one that would put them Down
    const m = html.match(/may lose (\d+) Vigour instead of (.+?)[ (.]/);
    if (!m) return true;
    const victim = game.actors.find(x => x.name === m[2]);
    return Number(m[1]) >= POLICY.guardFrom || (victim && victim.system.vigor.value <= Number(m[1]));
  }
  const values = {};
  for (const [, name, first] of html.matchAll(/<select name="([^"]+)">\s*<option value="([^"]*)"/g)) values[name] = first;
  if (/<select name="target">/.test(html) && /: (Strike|Quick's free Strike)$/.test(title)) {
    const a = striker, t = chooseTarget(a), fight = night().fight;
    const g = L.guardFor(t.system.toRules(), a.system.element);
    let chi = a.system.chi, bonus = free ? EF.rules.quickDice : 0;
    values.target = t.id;
    aimed = { id: t.id, guard: g };
    if (/name="technique"/.test(html) && chi - reserveOf(a) >= 1 && wantsTechnique(a, t, g)) { values.technique = true; chi--; }
    if (/name="chiDie"/.test(html) && bonus < EF.rules.bonusCap && g >= 2 && chi - reserveOf(a) >= 1) { values.chiDie = true; bonus++; }
    if (g >= 2) for (const [, id] of html.matchAll(/name="help-([^"]+)"/g)) {
      if (bonus >= EF.rules.bonusCap) break;
      if (A(id).system.chi - reserveOf(A(id)) >= 2) { values[`help-${id}`] = true; bonus++; }
    }
    const team = fight.fighterIds.map(A).filter(x => !x.system.down);
    if (/name="renewalTarget"/.test(html)) values.renewalTarget = team.sort((x, y) => ratio(x.system.vigor) - ratio(y.system.vigor))[0].id;
    if (/name="bulwarkTarget"/.test(html)) values.bulwarkTarget = (team.find(x => x.id !== a.id && x.system.style === "guardian") ?? team.sort((x, y) => x.system.vigor.value - y.system.vigor.value)[0]).id;
    if (/name="sweeperTarget"/.test(html)) values.sweeperTarget = [fight.masterId, ...fight.packIds].find(id => id && id !== t.id && A(id).system.toughness.value > 0) ?? t.id;
  } else if (/Swarm .* Who takes it\?/.test(html)) { // sim swarm, "smart": Unbreakable, a Flow fighter who stays up, a Bulwark, else the most Vigour
    const harm = Number(html.match(/Swarm for (\d+) Harm/)[1]);
    const ids = [...html.matchAll(/<option value="([^"]+)"/g)].map(m => m[1]).map(A);
    const fight = night().fight;
    const pick = ids.find(x => x.system.awakened.active && x.system.awakening === "unbreakable")
      ?? ids.find(x => x.system.style === "flow" && x.system.vigor.value > harm - EF.rules.flowReduce)
      ?? ids.find(x => fight.bulwark.includes(x.id) && x.system.vigor.value > harm - EF.rules.bulwarkReduce)
      ?? ids.sort((x, y) => y.system.vigor.value - x.system.vigor.value)[0];
    values.target = pick.id;
  }
  // shares (sim shareVigor, Harmony): one point at a time; Vigour stands Down fighters up first,
  // then goes to whoever has the smallest share of their maximum; Chi to whoever has least
  const shares = [...html.matchAll(/\((Vigour|Chi) (\d+)\) <input type="number" name="n-([^"]+)" value="0" min="0" max="(\d+)"/g)];
  if (shares.length) {
    const isChi = shares[0][1] === "Chi", pool = Number(shares[0][4]);
    const now = Object.fromEntries(shares.map(([, , v, id]) => [id, Number(v)])), give = Object.fromEntries(shares.map(([, , , id]) => [id, 0]));
    const max = id => (isChi ? EF.rules.chiMax : A(id).system.vigor.max);
    for (let k = 0; k < pool; k++) {
      const ids = Object.keys(now).filter(id => now[id] < max(id));
      const to = (isChi ? null : ids.find(id => now[id] === 0)) ?? ids.sort((x, y) => (isChi ? now[x] - now[y] : now[x] / max(x) - now[y] / max(y)))[0];
      if (!to) break;
      now[to]++; give[to]++;
    }
    for (const id of Object.keys(give)) values[`n-${id}`] = give[id];
  }
  return opts.ok.callback({}, { form: fakeForm(values) });
}
const answering = async fn => {
  dialogResponders.length = 0;
  for (let i = 0; i < 12; i++) dialogResponders.push(auto);
  try { return await fn(); } finally { dialogResponders.length = 0; }
};

const night = () => api.getNight();
// Per-night measures, comparable with the simulator's (sim/REPORT.md §4).
const heartBy = {}; let lastRound = 0;
const stats = { strikes: 0, hitBacks: 0, downs: 0, long: 0, damage: 0, crits: 0 };
Hooks.on("nightwake.strike", r => { stats.strikes++; if (r.hitBack) stats.hitBacks++; stats.damage += r.damage; if (r.critical) stats.crits++; });
Hooks.on("preUpdateActor", (a, diff) => { if (a.type === "fighter" && a.system.vigor.value > 0 && diff?.system?.vigor?.value === 0) stats.downs++; });
function checkLimits(where) {
  assert.deepEqual(log.errors, [], `${where}: errors`);
  const n = night();
  for (const id of n.fighterIds) {
    const s = game.actors.get(id).system;
    assert.ok(s.vigor.value >= 0 && s.vigor.value <= s.vigor.max, `${where}: Vigour ${s.vigor.value}/${s.vigor.max}`);
    assert.ok(s.chi >= 0 && s.chi <= EF.rules.chiMax, `${where}: Chi ${s.chi}`);
    assert.equal(s.down, s.vigor.value === 0, `${where}: Down exactly at 0 Vigour`);
  }
  if (n.fight) for (const id of [n.fight.masterId, ...n.fight.packIds].filter(Boolean)) {
    const t = game.actors.get(id).system.toughness;
    assert.ok(t.value >= 0 && t.value <= t.max, `${where}: Toughness ${t.value}/${t.max}`);
  }
}

/** One player's turn (sim fight loop): Awaken when the policy says, then Hold the Seal, Rally, or Strike. */
async function turn(f) {
  const a = f.actor, s = () => a.system, fight = night().fight;
  if (!fight || s().down || fight.noAct.includes(a.id)) return;
  const enemy = A(fight.masterId ?? fight.packIds[0]);
  const trouble = fight.fighterIds.some(id => A(id).system.down) && enemy && ratio(enemy.system.toughness) > 0.5;
  if ((fight.kind === "heart" || trouble) && L.canAwaken(s().toRules(), { firstDownTonight: night().firstDown, fightKind: fight.kind })) await asUser(f.owner, () => awakenFlow(a));
  const actions = s().awakened.active && s().awakening === "tempest" ? 2 : 1;
  for (let i = 0; i < actions && night().fight && !s().down; i++) {
    if (s().awakened.active && s().awakening === "seal") { await asUser(f.owner, () => sealFlow(a)); continue; }
    const fnow = night().fight, e = A(fnow.masterId) ?? A(fnow.packIds[0]);
    const elite = fnow.masterId && A(fnow.masterId).system.toughness.value > 0 ? A(fnow.masterId) : A(fnow.packIds[0]);
    const downFriend = fnow.fighterIds.some(id => id !== a.id && A(id).system.down);
    if (downFriend && elite && elite.system.toughness.value > 3) { await asUser(f.owner, () => answering(() => rallyFlow(a))); continue; }
    striker = a; free = false;
    await asUser(f.owner, () => answering(() => strikeFlow(a)));
  }
}

/** sim chooseOrder: the standing fighters in the ring rotation that feeds the most, Earth's Bulwark early on a tie. */
function chooseOrder(ours, fight) {
  const live = ours.filter(f => !f.actor.system.down);
  const els = ours.map(f => f.actor.system.element);
  let best = live, bestScore = -1;
  for (let r = 0; r < 5; r++) {
    const order = [];
    for (let i = 0; i < 5; i++) { const f = live.find(x => x.actor.system.element === EF.cycle[(r + i) % 5]); if (f) order.push(f); }
    let score = 0, prev = fight.last?.element ?? null;
    for (const f of order) { if (prev && L.ringBefore(f.actor.system.element, els) === prev) score++; prev = f.actor.system.element; }
    const ei = order.findIndex(f => f.actor.system.element === "earth");
    const s2 = score * 10 - (ei < 0 ? 0 : ei);
    if (s2 > bestScore) { bestScore = s2; best = order; }
  }
  return best;
}

async function playFight(where) {
  for (let guard = 0; night().fight && guard < 12; guard++) {
    const fight = night().fight, ours = roster.filter(f => fight.fighterIds.includes(f.actor.id));
    if (fight.round === 1 && !fight.started) {
      for (const f of ours) if (f.actor.system.perk === "quick" && !f.actor.system.down) { striker = f.actor; free = true; await asUser(f.owner, () => answering(() => strikeFlow(f.actor, { free: true }))); }
    }
    lastRound = fight.round;
    for (const f of chooseOrder(ours, fight)) { if (!night().fight) break; await turn(f); checkLimits(`${where} round ${fight.round}`); }
    if (night().fight) {
      // sim: withdraw from an Anchor when half the group is Down and the Warden is above half
      const f2 = night().fight, ids = f2.fighterIds;
      const withdraw = f2.kind === "anchor" && ids.filter(id => A(id).system.down).length / ids.length >= POLICY.withdrawDownShare && ratio(A(f2.masterId).system.toughness) > POLICY.withdrawEnemyAbove;
      await answering(() => api.request(withdraw ? OPS.withdraw : OPS.endRound));
    }
    checkLimits(`${where} end of round`);
  }
  assert.equal(night().fight, null, `${where}: the fight ended by round 7`);
}

/** A whole night, start to Morning. Returns what happened. */
async function playNight({ preset, difficulty, size }) {
  const where = `${preset} ${difficulty} ${size}`;
  const ids = roster.slice(0, size).map(f => f.actor.id);
  const res = await api.request(OPS.beginNight, { difficulty, fighterIds: ids, preset });
  assert.equal(res.ok, true, `${where}: ${res.error}`);
  assert.deepEqual(night().anchors.map(a => a.name), EF.nights[preset].anchors.map(a => a.name), `${where}: the ready-made night's Anchors`);
  for (const id of ids) assert.equal(game.actors.get(id).system.vigor.max, L.startingVigor(size, game.actors.get(id).system.perk), `${where}: starting Vigour`);

  assert.equal((await api.request(OPS.startFight, { kind: "clash" })).ok, true);
  assert.equal(game.actors.get(night().fight.packIds[0]).system.toughness.max, L.stillsFor("clash", size) * EF.stills.toughPer, `${where}: First Clash Stills`);
  await playFight(`${where} First Clash`);
  let anchorsFought = 0, respites = 0, lastRest = false;
  while (night().phase === "hunt" && night().hoursLeft > 0) {
    const group = ids.map(id => game.actors.get(id).system.vigor);
    const low = group.reduce((s, v) => s + v.value, 0) < POLICY.restBelow * group.reduce((s, v) => s + v.max, 0);
    if (low && !lastRest) { // sim: never two Respites in a row
      assert.equal((await api.request(OPS.respite)).ok, true);
      respites++; lastRest = true;
      for (const id of ids) assert.equal(game.actors.get(id).system.vigor.value, game.actors.get(id).system.vigor.max, `${where}: a Respite heals fully`);
      continue;
    }
    const els = ids.map(id => game.actors.get(id).system.element);
    const standing = night().anchors.map((a, i) => ({ ...a, i })).filter(a => !a.broken);
    const pick = standing.find(a => els.some(e => EF.elements[e].breaks === a.shell)) ?? standing[0];
    lastRest = false;
    const hoursBefore = night().hoursLeft;
    assert.equal((await api.request(OPS.startFight, { kind: "anchor", anchor: pick.i })).ok, true);
    assert.equal(night().hoursLeft, hoursBefore - 1, `${where}: an Anchor costs an Hour`);
    const warden = game.actors.get(night().fight.masterId);
    assert.equal(warden.system.toughness.max, L.wardenToughness(size), `${where}: Warden Toughness`);
    assert.equal(warden.system.shell, pick.shell, `${where}: the Warden's Shell is its Anchor's`);
    await playFight(`${where} ${pick.name}`);
    if (night().hoursLeft < hoursBefore - 1 || night().hoursOwed) stats.long++;
    anchorsFought++;
  }
  assert.equal(night().phase, "heart", `${where}: the Hunt ends at the Heart`);
  const broken = night().anchors.filter(a => a.broken).length;
  assert.equal((await api.request(OPS.startFight, { kind: "heart" })).ok, true);
  const heart = game.actors.get(night().fight.masterId);
  assert.equal(heart.system.toughness.max, L.heartToughness(size, 5 - broken), `${where}: Heart Toughness`);
  const heartStart = night().fight;
  await playFight(`${where} the Heart`);
  if (process.env.NW_STATS) { const k = 5 - broken; heartBy[difficulty] ??= {}; const b = heartBy[difficulty][k] ??= { n: 0, win: 0, part: 0, rounds: 0 }; b.n++; if (night().ending === "won") b.win++; else if (night().ending === "driven-off") b.part++; b.rounds += lastRound; }
  assert.equal(night().phase, "ended");
  assert.ok(["won", "driven-off", "lost"].includes(night().ending), `${where}: ending ${night().ending}`);
  return { ending: night().ending, anchorsFought, broken, respites };
}

// The simulator's win rates for any 4 ready-made fighters (sim/REPORT.md §7: mean, lowest and highest group).
const SIM_ANY4 = { easy: [96.1, 93, 98], standard: [81.7, 78, 87], hard: [60.2, 57, 65] };
const NIGHTS = Number(process.env.NW_NIGHTS ?? 60);

test(`played the simulator's way, the online version wins as often as the simulator says (${NIGHTS} nights per difficulty)`, async () => {
  const rows = [];
  for (const difficulty of ["easy", "standard", "hard"]) {
    let won = 0, partial = 0, broken = 0, respites = 0;
    for (const k of Object.keys(stats)) stats[k] = 0;
    for (let i = 0; i < NIGHTS; i++) {
      const r = await playNight({ preset: i % 2 ? "tide" : "clocks", difficulty, size: 4 });
      if (r.ending === "won") won++; else if (r.ending === "driven-off") partial++;
      broken += r.broken; respites += r.respites;
    }
    if (process.env.NW_STATS) console.log(`  ${difficulty}: win ${(100 * won / NIGHTS).toFixed(1)}% partial ${(100 * partial / NIGHTS).toFixed(1)}% anchors ${(broken / NIGHTS).toFixed(2)} rests ${(respites / NIGHTS).toFixed(2)} downs ${(stats.downs / NIGHTS).toFixed(2)} strikes/f ${(stats.strikes / NIGHTS / 4).toFixed(1)} hitback ${(100 * stats.hitBacks / stats.strikes).toFixed(1)}% long ${(stats.long / NIGHTS).toFixed(2)} dmg/strike ${(stats.damage / stats.strikes).toFixed(2)} crit ${(100 * stats.crits / stats.strikes).toFixed(1)}%`);
    const pct = 100 * won / NIGHTS, [mean, lo, hi] = SIM_ANY4[difficulty];
    // a sample this size wanders about 2 standard errors either side of the true rate
    const slack = 2 * 100 * Math.sqrt((mean / 100) * (1 - mean / 100) / NIGHTS);
    rows.push({ difficulty, pct, lo, hi, slack });
  }
  if (process.env.NW_STATS) for (const [d, by] of Object.entries(heartBy)) console.log(`  heart ${d}: ` + Object.entries(by).map(([k, v]) => `${k} standing: n=${v.n} win ${(100 * v.win / v.n).toFixed(0)}% part ${(100 * v.part / v.n).toFixed(0)}% rounds ${(v.rounds / v.n).toFixed(2)}`).join(" | "));
  console.log(`  online wins, 4 ready-made fighters: ${rows.map(r => `${r.difficulty} ${r.pct.toFixed(1)}% (simulator ${r.lo}–${r.hi}%)`).join("; ")}`);
  for (const r of rows) assert.ok(r.pct >= r.lo - r.slack && r.pct <= r.hi + r.slack, `${r.difficulty}: online ${r.pct.toFixed(1)}% vs simulator ${r.lo}–${r.hi}% (±${r.slack.toFixed(1)})`);
});

test("both ready-made nights play to Morning online, at every size and difficulty", async () => {
  const results = [];
  for (const preset of ["clocks", "tide"]) for (const difficulty of ["easy", "standard", "hard"]) for (const size of [3, 4, 5]) {
    results.push({ preset, difficulty, size, ...(await playNight({ preset, difficulty, size })) });
  }
  assert.equal(results.length, 18);
  const count = e => results.filter(r => r.ending === e).length;
  console.log(`  played ${results.length} whole nights online: ${count("won")} won, ${count("driven-off")} driven off, ${count("lost")} lost; ` +
    `${results.reduce((s, r) => s + r.broken, 0)} Anchors broken, ${results.reduce((s, r) => s + r.respites, 0)} Respites`);
  assert.deepEqual(log.errors, []);
});

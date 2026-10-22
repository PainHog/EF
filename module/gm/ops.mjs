/**
 * NIGHTWAKE — Storyteller-authoritative operations.
 * Players never write enemies, other fighters or the Night sheet: their clients
 * ask the Storyteller's client (CONFIG.queries[QUERY]) to run an operation, which
 * checks it against the book, works out the result with module/logic/rules.mjs,
 * writes it, and posts a card. Operations run one at a time.
 *
 * The Night sheet (the world setting SETTINGS.night) holds the night: difficulty,
 * the number of fighters, Hours, Anchors and the fight in progress.
 */
import { EF } from "../config.mjs";
import * as L from "../logic/rules.mjs";
import { SYSTEM_ID, FLAG, QUERY, SETTINGS, OPS, CARD, HOOKS } from "../contracts.mjs";
import { postCard, diceHtml } from "../chat.mjs";

const esc = s => foundry.utils.escapeHTML(String(s ?? ""));
const Dialog = () => foundry.applications.api.DialogV2;
const auto = key => game.settings.get(SYSTEM_ID, key);
const actor = id => (id ? game.actors.get(id) : null);
const rulesOf = a => a.system.toRules();
const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/** A refusal the player should see (anything else is a bug and is thrown). */
export class OpError extends Error {}

/* --------------------------------------------------------- the Night -- */

export function defaultNight() {
  return {
    started: false, difficulty: "standard", size: 0, fighterIds: [],
    hoursLeft: EF.night.hours, hoursOwed: 0, firstDown: false,
    anchors: EF.readyNight.map(a => ({ ...a, broken: false })),
    phase: "setup", ending: null, fight: null
  };
}
export const getNight = () => ({ ...defaultNight(), ...(foundry.utils.deepClone(game.settings.get(SYSTEM_ID, SETTINGS.night)) ?? {}) });
const saveNight = night => game.settings.set(SYSTEM_ID, SETTINGS.night, night);

const fightersIn = ids => ids.map(actor).filter(Boolean);
const standingIn = ids => fightersIn(ids).filter(a => !a.system.down);
function requireFight(night) {
  if (!night.fight) throw new OpError("No fight is going on.");
  return night.fight;
}
function assertOwner(userId, a) {
  const user = game.users.get(userId);
  if (!a) throw new OpError("That fighter doesn't exist.");
  if (!user?.isGM && !a.testUserPermission(user, "OWNER")) throw new OpError(`You don't play ${a.name}.`);
}
/** Ch 3: one action a turn (Tempest: two); Rallied fighters act from the next round. */
function cantAct(fight, a) {
  const f = a.system;
  if (!fight.fighterIds.includes(a.id)) return `${a.name} isn't in this fight.`;
  if (f.down) return `${a.name} is Down and can't act.`;
  if (fight.noAct.includes(a.id)) return `${a.name} was Rallied this round and acts from the next.`;
  const allowed = f.awakened.active && f.awakening === "tempest" ? 2 : 1;
  if ((fight.actions[a.id] ?? 0) >= allowed) return `${a.name} has already acted this round.`;
  return null;
}
/** Bookkeeping for feeding and ties (Ch 3, Ch 6). */
function acted(fight, a, { countsAsAction = true } = {}) {
  if (countsAsAction) { fight.actions[a.id] = (fight.actions[a.id] ?? 0) + 1; fight.started = true; }
  fight.last = { id: a.id, element: a.system.element };
  fight.clock += 1;
  fight.actedAt[a.id] = fight.clock;
}

/** Find or make the actor for an enemy role ("warden-2", "heart", "stills"), reset to `data`. */
async function enemyActor(role, data) {
  const found = game.actors.find(x => x.getFlag?.(FLAG, "role") === role);
  if (found) { await found.update({ name: data.name, system: data.system }); return found; }
  return Actor.create({ ...data, flags: { [FLAG]: { role } } });
}

/* ----------------------------------------------------- losing Vigor -- */

async function chooseFighter(title, actors) {
  if (actors.length <= 1) return actors[0]?.id ?? null;
  const options = actors.map(a => `<option value="${a.id}">${esc(a.name)} (Vigor ${a.system.vigor.value})</option>`).join("");
  const id = await Dialog().prompt({
    window: { title },
    content: `<div class="elemental-fighters nw-dialog"><p>${esc(title)}</p><select name="target">${options}</select></div>`,
    ok: { label: "Confirm", callback: (event, button) => button.form.elements.target.value }
  });
  return actors.some(a => a.id === id) ? id : actors[0].id;
}

/**
 * Ch 3 "Vigor and going Down": a fighter would lose Vigor. A Guardian may take
 * it instead (asked of the Storyteller), then Bulwark, Flow, Unbreakable and
 * Stubborn apply to whoever takes it.
 */
async function applyLoss(night, victimId, amount, source) {
  const fight = night.fight;
  const victim = actor(victimId);
  if (!victim || victim.system.down || amount <= 0) return null;
  let guardian = null;
  if (auto(SETTINGS.guardianPrompt)) {
    const all = fightersIn(fight.fighterIds).map(rulesOf);
    for (const g of L.guardiansFor(victimId, all, fight.guardianUsed, amount)) {
      const yes = await Dialog().confirm({
        window: { title: "Guardian" },
        content: `<p>${esc(g.name)} (Guardian) may lose ${amount} Vigor instead of ${esc(victim.name)}${amount >= EF.rules.guardianMinLoss ? " (and gain 2 Chi if they lose 2 or more)" : ""}. Take it?</p>`
      });
      if (yes) { guardian = actor(g.id); fight.guardianUsed.push(g.id); break; }
    }
  }
  const who = guardian ?? victim;
  const res = L.loseVigor(rulesOf(who), amount, { source, bulwark: fight.bulwark.includes(who.id) });
  if (res.bulwarkUsed) fight.bulwark.splice(fight.bulwark.indexOf(who.id), 1);
  const upd = { "system.vigor.value": res.vigor, "system.chi": res.chi };
  if (res.stubbornUsed) upd["system.stubbornUsed"] = true;
  if (res.awakeningEnds) Object.assign(upd, { "system.awakened.active": false, "system.awakened.roundsLeft": 0 });
  // Ch 2 Guardian: 2 Chi when the Guardian actually loses 2 or more this way, unless it puts them Down.
  // (counting only the Vigor actually lost: Stubborn keeping them at 2 can make it less)
  if (guardian && !res.down && who.system.vigor.value - res.vigor >= EF.rules.guardianMinLoss) upd["system.chi"] = L.gainChi(res.chi, EF.rules.guardianChi);
  await who.update(upd);
  if (res.wentDown) night.firstDown = true;
  return { id: who.id, name: who.name, guardian: !!guardian, for: guardian ? victim.name : null, ...res };
}

function lossLine(what, amount, res) {
  if (!res) return `${what}: ${amount}, but nobody is standing to take it.`;
  const who = res.guardian ? `${res.name} (Guardian, for ${res.for})` : res.name;
  const how = res.steps.length ? ` (${res.steps.join(", ")})` : "";
  return `${what}: ${who} loses ${res.loss} Vigor${how}${res.wentDown ? " and goes Down" : ""}.`;
}

/** Ch 2, Ch 4: share out Vigor (Wellspring, Medic) or Chi (Harmony) as the sharer chooses. */
async function share(night, from, kind) {
  const fight = night.fight;
  const ids = fight ? fight.fighterIds : night.fighterIds;
  const isChi = kind === "harmony";
  const amount = kind === "harmony" ? EF.rules.harmonyChi : kind === "wellspring" ? EF.rules.wellspringVigor : EF.rules.medicVigor;
  // Down fighters can take Vigor (Wellspring stands them up); Chi goes to standing fighters only.
  const takers = fightersIn(ids).filter(a => (isChi ? !a.system.down && a.system.chi < EF.rules.chiMax : a.system.vigor.value < a.system.vigor.max));
  if (!takers.length) return `${from.name} has nobody to share with.`;
  const label = isChi ? "Chi" : "Vigor";
  const inputs = takers.map(a => `<label>${esc(a.name)} (${label} ${isChi ? a.system.chi : a.system.vigor.value}) <input type="number" name="n-${a.id}" value="0" min="0" max="${amount}"></label>`).join("");
  const want = await Dialog().prompt({
    window: { title: `${from.name}: share out ${amount} ${label}` },
    content: `<div class="elemental-fighters nw-dialog"><p>${esc(from.name)} shares out ${amount} ${label} (${EF.awakenings[kind]?.label ?? "Medic"}).</p>${inputs}</div>`,
    ok: { label: "Share", callback: (event, button) => Object.fromEntries(takers.map(a => [a.id, Number(button.form.elements[`n-${a.id}`]?.value ?? 0)])) }
  }) ?? {};
  let left = amount;
  const given = [];
  for (const a of takers) {
    const room = isChi ? EF.rules.chiMax - a.system.chi : a.system.vigor.max - a.system.vigor.value;
    const n = Math.max(0, Math.min(Math.floor(Number(want[a.id]) || 0), room, left));
    if (!n) continue;
    left -= n;
    if (isChi) await a.update({ "system.chi": a.system.chi + n });
    else await a.update({ "system.vigor.value": a.system.vigor.value + n });
    given.push(`${a.name} +${n}`);
  }
  return given.length ? `${from.name} shares ${label}: ${given.join(", ")}.` : `${from.name} shares nothing.`;
}

/* -------------------------------------------------------- operations -- */

async function beginNight({ difficulty = "standard", fighterIds = [], anchors = null }) {
  const ids = [...new Set(fighterIds)].filter(id => actor(id)?.type === "fighter");
  if (ids.length < 3 || ids.length > 5) throw new OpError("A night needs 3 to 5 fighters (Chapter 1).");
  if (!EF.difficulties[difficulty]) throw new OpError("Pick Easy, Standard or Hard.");
  for (const key of ["element", "style", "perk", "awakening"]) {
    const vals = ids.map(id => actor(id).system[key]);
    if (vals.some(v => !v)) throw new OpError(`Every fighter needs four picks: one has no ${key}.`);
    if (new Set(vals).size !== vals.length) throw new OpError(`Two fighters share a ${key}. No two fighters in a group share any pick (Chapter 2).`);
  }
  const size = ids.length;
  for (const id of ids) {
    const a = actor(id);
    const max = L.startingVigor(size, a.system.perk);
    await a.update({ "system.vigor.value": max, "system.vigor.max": max, "system.chi": EF.rules.chiStart, "system.awakened": { active: false, roundsLeft: 0, used: false }, "system.luckyUsed": false, "system.stubbornUsed": false });
  }
  const night = { ...defaultNight(), started: true, difficulty, size, fighterIds: ids, phase: "prologue", anchors: anchors ?? defaultNight().anchors };
  await saveNight(night);
  await postCard(CARD.night, "The night begins", [
    `${size} fighters on ${EF.difficulties[difficulty].label}.`,
    `Starting Vigor ${EF.vigorBySize[size]} (Tough +3) and 2 Chi each.`,
    "The Prologue: each player describes the moment their element woke. Then the First Clash."
  ]);
  return { night };
}

/** Ch 2 "Joining late": four picks nobody has, the starting Vigor everyone began with (+3 if Tough), 2 Chi; joins at the next fight. */
async function join({ fighterId }) {
  const night = getNight();
  const a = actor(fighterId);
  if (!night.started || night.ending) throw new OpError("No night is going on.");
  if (a?.type !== "fighter" || night.fighterIds.includes(a.id)) throw new OpError("That fighter can't join.");
  for (const key of ["element", "style", "perk", "awakening"]) {
    if (!a.system[key]) throw new OpError(`A fighter needs four picks: this one has no ${key}.`);
    if (fightersIn(night.fighterIds).some(o => o.system[key] === a.system[key])) throw new OpError(`Another fighter already has that ${key} (Chapter 2).`);
  }
  if (night.fighterIds.length >= 5) throw new OpError("A night has five fighters at most.");
  // Everyone's maximum becomes the starting Vigor for the new number of fighters.
  night.fighterIds.push(a.id);
  night.size = night.fighterIds.length;
  for (const f of fightersIn(night.fighterIds)) {
    const max = L.startingVigor(night.size, f.system.perk);
    if (f.id === a.id) await f.update({ "system.vigor.value": max, "system.vigor.max": max, "system.chi": EF.rules.chiStart, "system.awakened": { active: false, roundsLeft: 0, used: false } });
    else await f.update({ "system.vigor.max": max, "system.vigor.value": Math.min(f.system.vigor.value, max) });
  }
  await saveNight(night);
  await postCard(CARD.night, `${a.name} joins the night`, [`Everyone's maximum Vigor is now ${EF.vigorBySize[night.size]} (Tough +3). ${a.name} joins at the start of the next fight.`], { actor: a });
  return { night };
}

async function startFight({ kind, anchor = null }) {
  const night = getNight();
  if (!night.started || night.ending) throw new OpError("Begin the night first.");
  if (night.fight) throw new OpError("A fight is already going on.");
  const clocks = auto(SETTINGS.autoClocks);
  const huntOver = night.hoursLeft <= 0 || night.anchors.every(x => x.broken);
  if (kind === "clash") {
    if (clocks && night.phase !== "prologue") throw new OpError("The First Clash is the night's first fight.");
  } else if (kind === "anchor") {
    const an = night.anchors[anchor];
    if (!an || an.broken) throw new OpError("That Anchor is already broken.");
    if (clocks && huntOver) throw new OpError("The Hunt is over: the fighters are drawn to the Heart.");
    if (clocks) night.hoursLeft -= 1;
    night.phase = "hunt";
  } else if (kind === "heart") {
    if (clocks && !huntOver) throw new OpError(`The Hunt still has ${plural(night.hoursLeft, "Hour")} left.`);
    night.phase = "heart";
  } else throw new OpError("Unknown fight.");

  const n = night.fighterIds.length;
  let master = null;
  if (kind === "anchor") {
    const an = night.anchors[anchor];
    const t = L.wardenToughness(n);
    const name = an.warden ? an.warden.replace(/^the /, "The ") : `The Warden of ${an.name}`;
    master = await enemyActor(`warden-${anchor}`, { name, type: "unmade", system: { kind: "warden", shell: an.shell, shellIntact: true, toughness: { value: t, max: t }, anchor } });
  } else if (kind === "heart") {
    const t = L.heartToughness(n, night.anchors.filter(x => !x.broken).length);
    master = await enemyActor("heart", { name: "The Heart", type: "unmade", system: { kind: "heart", shell: "", shellIntact: false, toughness: { value: t, max: t }, anchor: null } });
  }
  const stills = L.stillsFor(kind, n);
  const pt = stills * EF.stills.toughPer;
  const pack = await enemyActor("stills", { name: "Stills", type: "pack", system: { toughness: { value: pt, max: pt }, masterId: master?.id ?? "" } });

  const lines = [];
  for (const a of fightersIn(night.fighterIds)) {
    let chi = a.system.chi;
    if (a.system.style === "breath") { chi = L.gainChi(chi, EF.rules.breathChi); lines.push(`${a.name} (Breath) gains Chi: ${chi}.`); }
    if (kind === "heart") chi = L.gainChi(chi, EF.rules.heartChi);
    await a.update({ "system.chi": chi, "system.luckyUsed": false, "system.stubbornUsed": false });
  }
  night.fight = {
    kind, anchor: kind === "anchor" ? anchor : null, round: 1, fighterIds: [...night.fighterIds],
    masterId: master?.id ?? null, packIds: [pack.id],
    last: null, clock: 0, actedAt: {}, actions: {}, damage: {}, bulwark: [], guardianUsed: [], noAct: [], quickDone: [], started: false
  };
  await saveNight(night);
  const title = kind === "anchor" ? night.anchors[anchor].name : EF.fightKinds[kind];
  if (master) lines.unshift(`${master.name}: Guard ${master.system.guard}, Harm ${master.system.harm}, Toughness ${master.system.toughness.value}${master.system.shell ? `, ${EF.elements[master.system.shell].label} Shell (shattered by ${EF.elements[EF.cycle.find(e => EF.elements[e].breaks === master.system.shell)].label})` : ""}.`);
  lines.splice(master ? 1 : 0, 0, `A pack of ${plural(stills, "Still")}: Guard 1, Harm 1, Toughness ${pt}.`);
  if (kind === "heart") lines.push(`Every fighter gains 3 Chi, and anyone may Awaken at the start of their turn. Dawn breaks at the end of round ${L.dawnRound(night.hoursOwed)}.`);
  if (kind === "anchor") lines.push(`${plural(night.hoursLeft, "Hour")} left after this one.`);
  if (fightersIn(night.fighterIds).some(a => a.system.perk === "quick")) lines.push("Quick: a free Strike with +1 die before round 1.");
  await postCard(CARD.night, title, lines);
  return { night };
}

async function strike(data) {
  const a = actor(data.fighterId);
  assertOwner(data.userId, a);
  const night = getNight();
  const fight = requireFight(night);
  const f = rulesOf(a);
  const free = !!data.free;
  if (free) {
    if (f.perk !== "quick") throw new OpError("Only a Quick fighter has a free Strike.");
    if (fight.round !== 1 || fight.started) throw new OpError("Quick's free Strike comes before the first round, before anyone takes a turn.");
    if (fight.quickDone.includes(a.id)) throw new OpError(`${a.name} has already taken the free Strike this fight.`);
    if (f.down) throw new OpError(`${a.name} is Down.`);
  } else {
    const why = cantAct(fight, a);
    if (why) throw new OpError(why);
    if (f.awakened.active && f.awakening === "seal") throw new OpError("Holding the Seal is your action while it lasts: you can't Strike.");
  }
  const t = actor(data.targetId);
  const enemies = [fight.masterId, ...fight.packIds].filter(Boolean);
  if (!t || !enemies.includes(t.id) || t.system.toughness.value <= 0) throw new OpError("That enemy isn't standing in this fight.");
  const helpers = [...new Set(data.helperIds ?? [])].filter(id => id !== a.id).map(actor);
  for (const h of helpers) {
    if (!h || !fight.fighterIds.includes(h.id) || h.system.down || h.system.chi < 1) throw new OpError(`${h?.name ?? "That fighter"} can't Help (it costs 1 Chi, and Down fighters can't Help).`);
  }
  const offered = (data.chiDie ? 1 : 0) + helpers.length + (free ? EF.rules.quickDice : 0);
  if (offered > EF.rules.bonusCap) throw new OpError("At most two bonus dice on a roll (Chapter 3).");
  const cost = (data.chiDie ? 1 : 0) + (data.technique ? 1 : 0);
  if (f.chi < cost) throw new OpError(`${a.name} has only ${plural(f.chi, "Chi", "Chi")}.`);
  const faces = (data.faces ?? []).map(Number);
  const pool = L.poolSize(offered);
  if (faces.length !== pool || faces.some(x => !(x >= 1 && x <= 6))) throw new OpError(`That roll should be ${pool} dice.`);
  if (data.lucky && (f.perk !== "lucky" || f.luckyUsed)) throw new OpError("Lucky is once per fight.");

  const elements = fightersIn(fight.fighterIds).map(x => x.system.element);
  const fed = L.isFed(fight.last, f, elements);
  const r = L.resolveStrike({ fighter: f, target: rulesOf(t), faces, technique: !!data.technique, fed, free });
  const tech = data.technique ? EF.elements[f.element].techniqueLabel : null;
  const lines = [
    { html: `<div class="nw-dice">${diceHtml(faces)}</div>` },
    data.rerolls?.length ? `Rerolled: ${data.rerolls.join("; ")}.` : null,
    `${[free ? "Quick's free Strike" : null, tech, data.chiDie ? "Chi die" : null, helpers.length ? `Help from ${helpers.map(h => h.name).join(" and ")}` : null].filter(Boolean).join(", ") || "A plain Strike"} against ${t.name}.`,
    `Guard ${r.guard}: ${plural(r.hits, "hit")}, ${r.met ? "a clean strike" : "missed the Guard"}${r.critical ? ", a Critical" : ""}.`,
    `Damage ${r.damage}${r.parts.length > 1 ? ` (${r.parts.map(p => `${p.label} ${p.value}`).join(" + ")})` : ""}${r.falls ? `: ${t.name} falls` : `: ${t.name} has ${r.left} left`}.`,
    r.shellShatters ? `The ${EF.elements[t.system.shell].label} Shell shatters.` : null
  ];

  if (!auto(SETTINGS.autoApply)) {
    lines.push("Automatic results are off: apply this by hand.");
    await postCard(CARD.strike, `${a.name} strikes`, lines, { actor: a, data: { result: r } });
    return { result: r, applied: false };
  }

  // Pay: the striker's Chi die and technique, 1 Chi from each helper.
  if (cost) await a.update({ "system.chi": a.system.chi - cost });
  for (const h of helpers) await h.update({ "system.chi": h.system.chi - 1 });
  if (data.lucky) await a.update({ "system.luckyUsed": true });

  const hurt = async (enemy, n) => {
    if (!enemy || n <= 0 || enemy.system.toughness.value <= 0) return 0;
    const left = Math.max(0, enemy.system.toughness.value - n);
    const upd = { "system.toughness.value": left };
    if (enemy.type === "unmade" && enemy.system.shell && enemy.system.shellIntact && left <= enemy.system.toughness.max / 2) upd["system.shellIntact"] = false;
    await enemy.update(upd);
    if (enemy.id === fight.masterId && !free) fight.damage[a.id] = (fight.damage[a.id] ?? 0) + n;   // Quick's Strike comes before round 1
    return n;
  };
  if (r.damage) await hurt(t, r.damage);
  if (r.shellShatters && t.system.shellIntact) await t.update({ "system.shellIntact": false });
  if (r.sweeper) {
    const other = actor(data.sweeperTargetId);
    if (other && other.id !== t.id && enemies.includes(other.id) && other.system.toughness.value > 0) {
      await hurt(other, r.sweeper);
      lines.push(`Sweeper: 1 damage to ${other.name}.`);
    }
  }
  if (r.renewal) {
    const rt = actor(data.renewalTargetId) ?? a;
    if (fight.fighterIds.includes(rt.id) && !rt.system.down && rt.system.vigor.value < rt.system.vigor.max) {
      await rt.update({ "system.vigor.value": rt.system.vigor.value + r.renewal });
      lines.push(`Renewal: ${rt.name} regains 1 Vigor.`);
    }
  }
  if (data.technique && f.element === "earth") {
    const bt = actor(data.bulwarkTargetId) ?? a;
    if (free) lines.push("Bulwark on Quick's Strike ends before round 1 begins.");
    else if (!fight.fighterIds.includes(bt.id) || bt.system.down) lines.push("Bulwark: a Down fighter can't be chosen.");
    else if (fight.bulwark.includes(bt.id)) lines.push(`${bt.name} already carries a Bulwark (one at a time).`);
    else { fight.bulwark.push(bt.id); lines.push(`Bulwark on ${bt.name}: the next loss this round is 3 less.`); }
  }
  if (r.hitBack) {
    const res = await applyLoss(night, a.id, r.hitBack.harm, "hitback");
    lines.push(lossLine(`${t.name} hits back for ${r.hitBack.harm}`, r.hitBack.harm, res));
    if (r.counter && t.system.toughness.value > 0) { await hurt(t, r.counter.damage); lines.push(`Counter: 1 damage to ${t.name}.`); }
    if (!a.system.down) {
      const gain = EF.rules.hitBackChi + (r.counter ? r.counter.chi : 0);
      await a.update({ "system.chi": L.gainChi(a.system.chi, gain) });
      lines.push(`${a.name} gains ${gain} Chi.`);
    }
  }
  if (r.critChi && !a.system.down) {
    await a.update({ "system.chi": L.gainChi(a.system.chi, r.critChi) });
    lines.push(`Critical: ${a.name} gains ${r.critChi} Chi.`);
  }
  if (free) fight.quickDone.push(a.id);
  acted(fight, a, { countsAsAction: !free });

  await postCard(CARD.strike, `${a.name} strikes`, lines, { actor: a, data: { result: r } });
  Hooks.callAll(HOOKS.strike, r, a.id, t.id);
  await afterAction(night);
  return { result: r, applied: true };
}

/** Ch 3 "How a fight ends", checked after every action: the enemy falls (first), or everyone is Down. */
async function afterAction(night) {
  const fight = night.fight;
  const master = actor(fight.masterId);
  const packs = fight.packIds.map(actor).filter(Boolean);
  if (master && master.system.toughness.value <= 0) {
    for (const p of packs) if (p.system.toughness.value > 0) await p.update({ "system.toughness.value": 0 });
    return endFight(night, "won", [`${master.name} falls, and its Stills crumble.`]);
  }
  if (!master && packs.every(p => p.system.toughness.value <= 0)) return endFight(night, "won", ["The last Still falls."]);
  if (L.allDown(fightersIn(fight.fighterIds).map(rulesOf))) return endFight(night, fight.kind === "heart" ? "lost" : "down", ["Every fighter is Down."]);
  return saveNight(night);
}

async function rally({ userId, fighterId, targetId }) {
  const a = actor(fighterId);
  assertOwner(userId, a);
  const night = getNight();
  const fight = requireFight(night);
  const why = cantAct(fight, a);
  if (why) throw new OpError(why);
  if (a.system.awakened.active && a.system.awakening === "seal") throw new OpError("Holding the Seal is your action while it lasts: you can't Rally.");
  const t = actor(targetId);
  if (!t || !fight.fighterIds.includes(t.id) || !t.system.down) throw new OpError("Only a Down fighter in this fight can be Rallied.");
  await t.update({ "system.vigor.value": Math.min(EF.rules.rallyVigor, t.system.vigor.max) });
  fight.noAct.push(t.id);
  acted(fight, a);
  await postCard(CARD.rally, `${a.name} Rallies ${t.name}`, [`${t.name} gets up with 2 Vigor and acts from the next round.`], { actor: a });
  await saveNight(night);
  return { night };
}

async function awaken({ userId, fighterId }) {
  const a = actor(fighterId);
  assertOwner(userId, a);
  const night = getNight();
  const fight = requireFight(night);
  if (!fight.fighterIds.includes(a.id)) throw new OpError(`${a.name} isn't in this fight.`);
  if ((fight.actions[a.id] ?? 0) > 0) throw new OpError("You Awaken at the start of your turn, before you act.");
  const quickWaiting = fight.round === 1 && !fight.started && fightersIn(fight.fighterIds).some(x => x.system.perk === "quick" && !x.system.down && !fight.quickDone.includes(x.id));
  if (quickWaiting && !(await Dialog().confirm({ window: { title: "Quick's free Strike" }, content: "<p>Awakening starts round 1, so any Quick fighter who hasn't taken their free Strike loses it. Awaken anyway?</p>" }))) throw new OpError("Take Quick's free Strike first: you can't Awaken before it.");
  if (!L.canAwaken(rulesOf(a), { firstDownTonight: night.firstDown, fightKind: fight.kind })) {
    const why = a.system.awakened.used ? "Once a night, and it's been used." : a.system.chi < EF.rules.awakenCost ? "It costs 3 Chi." : a.system.down ? `${a.name} is Down.` : "Not yet: from the first time a fighter goes Down tonight, or at the Heart.";
    throw new OpError(why);
  }
  const rounds = L.awakeningRounds(a.system.awakening);
  fight.started = true;   // a turn has begun: Quick's free Strike is gone
  await a.update({ "system.chi": a.system.chi - EF.rules.awakenCost, "system.awakened": { active: true, roundsLeft: rounds, used: true } });
  const aw = EF.awakenings[a.system.awakening];
  await postCard(CARD.awaken, `${a.name} Awakens: ${aw.label}`, [aw.text, `It lasts ${plural(rounds, "round")}, counting this one.`], { actor: a });
  await saveNight(night);
  return { night };
}

async function holdSeal({ userId, fighterId }) {
  const a = actor(fighterId);
  assertOwner(userId, a);
  const night = getNight();
  const fight = requireFight(night);
  if (!(a.system.awakened.active && a.system.awakening === "seal")) throw new OpError(`${a.name} isn't holding a Seal.`);
  const why = cantAct(fight, a);
  if (why) throw new OpError(why);
  acted(fight, a);
  await postCard(CARD.seal, `${a.name} holds the Seal`, ["The enemy can't Surge this round. Its Stills still Swarm."], { actor: a });
  await saveNight(night);
  return { night };
}

/**
 * Ch 3 "The round", steps 2 and 3: the enemies act (feed, Swarm, Surge), then
 * Awakenings count down and the clocks are checked; then the next round starts
 * (Wellspring and Harmony share out). With `withdraw`, the group withdraws
 * from an Anchor at the end of this round.
 */
async function endRound({ withdraw = false, swarmTargets = {} } = {}) {
  const night = getNight();
  const fight = requireFight(night);
  if (withdraw && fight.kind !== "anchor") throw new OpError("Only an Anchor fight can be withdrawn from (Chapter 5).");
  const lines = [];
  const master = actor(fight.masterId);
  const packs = fight.packIds.map(actor).filter(Boolean);
  const fighters = () => fightersIn(fight.fighterIds);

  if (auto(SETTINGS.autoEnemies)) {
    if (master && master.system.toughness.value > 0) {
      const fd = L.drawOnStills(rulesOf(master), packs.map(rulesOf));
      if (fd.gain) { await master.update({ "system.toughness.value": fd.toughness }); lines.push(`${master.name} draws on its Stills: +${fd.gain} Toughness (${fd.toughness}).`); }
    }
    for (const p of packs) {
      if (L.allDown(fighters().map(rulesOf))) break;
      const harm = L.swarmHarm(rulesOf(p));
      const standing = fighters().filter(x => !x.system.down);
      if (!harm || !standing.length) continue;
      let tid = swarmTargets[p.id];
      if (!standing.some(x => x.id === tid)) tid = await chooseFighter(`The Stills Swarm for ${harm} Harm. Who takes it?`, standing);
      lines.push(lossLine(`Swarm for ${harm}`, harm, await applyLoss(night, tid, harm, "swarm")));
    }
    if (master && master.system.toughness.value > 0 && !L.allDown(fighters().map(rulesOf))) {
      const sealed = fighters().some(x => x.system.awakened.active && x.system.awakening === "seal");
      if (sealed) lines.push(`${master.name} is Sealed and can't Surge.`);
      else {
        const roll = await new Roll("1d6").evaluate();
        const face = roll.total;
        const packStills = packs.reduce((n, p) => n + p.system.stills, 0);
        const s = L.resolveSurge({ kind: L.surgeKind(face), master: rulesOf(master), fighters: fighters().map(rulesOf), damage: fight.damage, actedAt: fight.actedAt, difficulty: night.difficulty, size: fight.fighterIds.length, packStills });
        lines.push(`Surge (rolled ${face}): ${EF.surgeLabels[s.kind]}${s.note ? `, ${s.note}` : ""}.`);
        for (const l of s.losses) lines.push(lossLine(`${EF.surgeLabels[s.kind]} for ${l.amount}`, l.amount, await applyLoss(night, l.id, l.amount, l.source)));
        for (const d of s.drains) {
          const v = actor(d.id);
          const lost = Math.min(v.system.chi, d.amount);
          await v.update({ "system.chi": v.system.chi - lost });
          lines.push(`Drain: ${v.name} loses ${lost} Chi.`);
        }
        if (s.call) {
          const p = packs[0];
          const value = p.system.toughness.value + s.call * EF.stills.toughPer;
          await p.update({ "system.toughness.value": value, "system.toughness.max": Math.max(p.system.toughness.max, value) });
          lines.push(`Call: ${plural(s.call, "Still")} join the pack (now ${p.system.stills}). They Swarm from next round.`);
        } else if (s.kind === "call") lines.push("Call: the pack is already full.");
      }
    }
  }

  for (const a of fighters()) {
    if (!a.system.awakened.active) continue;
    const left = a.system.awakened.roundsLeft - 1;
    if (left <= 0) { await a.update({ "system.awakened.active": false, "system.awakened.roundsLeft": 0 }); lines.push(`${a.name}'s Awakening ends.`); }
    else await a.update({ "system.awakened.roundsLeft": left });
  }

  let ending = null;
  if (L.allDown(fighters().map(rulesOf))) ending = fight.kind === "heart" ? "lost" : "down";
  if (!ending && auto(SETTINGS.autoClocks)) {
    const c = L.clocksAtEndOfRound({ kind: fight.kind, round: fight.round, hoursOwed: night.hoursOwed, heart: fight.kind === "heart" && master ? rulesOf(master) : null });
    if (c.longFight) {
      const owedBefore = night.hoursOwed;
      Object.assign(night, L.payLongFight(night));
      lines.push(night.hoursOwed > owedBefore ? "A long fight with no Hours left: dawn comes one round sooner at the Heart." : `A long fight costs one more Hour (${plural(night.hoursLeft, "Hour")} left).`);
    }
    if (c.ends) ending = c.ending;
  }
  if (!ending && withdraw) ending = "withdrew";

  await postCard(CARD.enemies, `End of round ${fight.round}`, lines);
  if (ending) { await endFight(night, ending, []); return { night: getNight(), ending }; }

  fight.round += 1;
  Object.assign(fight, { actions: {}, damage: {}, actedAt: {}, bulwark: [], guardianUsed: [], noAct: [] });
  const shares = [];
  for (const a of fighters()) {
    if (a.system.awakened.active && ["wellspring", "harmony"].includes(a.system.awakening)) shares.push(await share(night, a, a.system.awakening));
  }
  await saveNight(night);
  if (shares.length) await postCard(CARD.enemies, `Round ${fight.round} begins`, shares);
  Hooks.callAll(HOOKS.roundEnded, night);
  return { night, ending: null };
}

const ENDINGS = {
  won: { anchor: "The Warden falls and the Anchor breaks.", clash: "The First Clash is won. The Hunt begins.", heart: "The Heart falls. The clocks start again." },
  holds: { anchor: "Round 7: the Warden holds, and the Anchor stands.", clash: "Round 7: the Stills scatter, and the Hunt begins." },
  withdrew: { anchor: "The group withdraws. The Anchor stands, and Down fighters stand up with 1 Vigor." },
  down: { anchor: "Everyone is Down. The Anchor stands, and everyone stands up with 1 Vigor.", clash: "Everyone is Down. The Stills scatter; everyone stands up with 1 Vigor, and the Hunt begins." },
  "driven-off": { heart: "Dawn breaks with the Heart at half its Toughness or less: the Unmade is driven off." },
  lost: { heart: "The Unmade takes hold. The sun rises on a city that has stopped." }
};

async function endFight(night, ending, lines = []) {
  const fight = night.fight;
  if (ending === "won" && fight.kind === "anchor") night.anchors[fight.anchor].broken = true;
  for (const a of fightersIn(fight.fighterIds)) {
    const upd = { "system.awakened.active": false, "system.awakened.roundsLeft": 0 };
    if (a.system.down) upd["system.vigor.value"] = Math.min(EF.rules.standVigor, a.system.vigor.max);
    await a.update(upd);
  }
  lines.push(ENDINGS[ending]?.[fight.kind] ?? "The fight ends.");
  if (fight.kind !== "heart") {
    for (const m of fightersIn(fight.fighterIds).filter(x => x.system.perk === "medic")) lines.push(await share(night, m, "medic"));
  }
  if (fight.kind === "clash") night.phase = "hunt";
  else if (fight.kind === "anchor") night.phase = night.hoursLeft <= 0 || night.anchors.every(x => x.broken) ? "heart" : "hunt";
  else { night.phase = "ended"; night.ending = ending === "won" ? "won" : ending === "driven-off" ? "driven-off" : "lost"; }
  night.fight = null;
  if (night.phase === "heart") lines.push("The Hunt is over. Wherever they are, the fighters are drawn to the Heart.");
  await saveNight(night);
  await postCard(CARD.clocks, ending === "won" ? "Victory" : "The fight ends", lines);
  Hooks.callAll(HOOKS.fightEnded, night, ending);
}

async function respite() {
  const night = getNight();
  if (!night.started || night.ending) throw new OpError("No night is going on.");
  if (night.fight) throw new OpError("Not in the middle of a fight.");
  if (night.phase !== "hunt") throw new OpError("A Respite is an Hour of the Hunt.");
  if (auto(SETTINGS.autoClocks)) {
    if (night.hoursLeft <= 0) throw new OpError("No Hours are left.");
    night.hoursLeft -= 1;
  }
  for (const a of fightersIn(night.fighterIds)) await a.update({ "system.vigor.value": a.system.vigor.max });
  if (night.hoursLeft <= 0) night.phase = "heart";
  await saveNight(night);
  await postCard(CARD.clocks, "A Respite", ["Every fighter returns to full Vigor. Chi is unchanged.", `${plural(night.hoursLeft, "Hour")} left.`]);
  return { night };
}

/* --------------------------------------------------------- dispatcher -- */

const HANDLERS = {
  [OPS.beginNight]: beginNight,
  [OPS.join]: join,
  [OPS.startFight]: startFight,
  [OPS.strike]: strike,
  [OPS.rally]: rally,
  [OPS.awaken]: awaken,
  [OPS.holdSeal]: holdSeal,
  [OPS.endRound]: endRound,
  [OPS.withdraw]: data => endRound({ ...data, withdraw: true }),
  [OPS.respite]: respite
};

let chain = Promise.resolve();
/** Run on the Storyteller's client, one operation at a time. */
export function runOp({ op, data = {} } = {}) {
  if (!game.user.isGM) throw new Error("Nightwake: operations run on the Storyteller's client only.");
  const fn = HANDLERS[op];
  if (!fn) return Promise.resolve({ ok: false, error: `Unknown operation: ${op}` });
  const run = chain.then(async () => {
    try { return { ok: true, ...(await fn(data)) }; }
    catch (e) { if (e instanceof OpError) return { ok: false, error: e.message }; throw e; }
  });
  chain = run.catch(() => {});
  return run;
}

/** Ask for an operation from any client. Shows a refusal as a warning. */
export async function request(op, data = {}) {
  const payload = { op, data: { ...data, userId: game.user.id } };
  let res;
  if (game.user.isGM) res = await runOp(payload);
  else {
    const gm = game.users.activeGM;
    if (!gm) { ui.notifications.warn("The Storyteller isn't connected, so nothing can be resolved."); return null; }
    res = await gm.query(QUERY, payload, { timeout: 120000 });
  }
  if (res && !res.ok) ui.notifications.warn(res.error);
  return res;
}

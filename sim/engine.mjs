/**
 * Plays one night of Nightwake strictly by docs/CORE-RULES.md, with the
 * numbers in params.mjs (RULES) and the player habits in POLICY. Comments cite
 * the CORE-RULES section each piece implements.
 *
 * Abstractions (stated, not hidden):
 *  - No map and no movement: every fighter can reach every enemy (§3).
 *  - Story scenes between fights (the Prologue's awakening moments, travel,
 *    the Epilogue) are not simulated; they cost nothing in the rules (§8).
 *  - Player choices follow POLICY; it is a sensible habit, not perfect play.
 */
import { ELEMENTS, breakerOf } from "./data.mjs";

const CYCLE = ["wood", "fire", "earth", "metal", "water"];

export function makeFighter(spec, R, off, n) {
  const has = (pick, id) => spec[pick] === id && !off.has(`${pick}:${id}`);
  const vigorMax = R.vigorBySize[n] + (has("perk", "tough") ? R.toughVigor : 0);
  return {
    ...spec, has, vigorMax, vigor: vigorMax, chi: R.chiStart, down: false,
    awakenUsed: false, awake: false, awakenWhere: null,
    luckyUsed: false, stubbornUsed: false, quickUsed: false,
    st: { chiStart: R.chiStart, chiGained: 0, chiSpent: 0, chiLostDown: 0, chiDrained: 0, chiWasted: 0, damage: 0, downs: 0, rallies: 0, techniques: 0, helps: 0 },
  };
}

/** Play one night. Returns a plain record of what happened. */
export function playNight({ party, R, P, rng, off = new Set(), trace = null }) {
  const n = party.length;
  const F = party.map(s => makeFighter(s, R, off, n)); // §10: starting Vigor depends on group size
  const ctx = { R, P, rng, F, n, off, trace, unlocked: false, phase: "clash", hoursLeft: 0,
    rec: { rolls: 0, crits: 0, fails: 0, hitBacks: 0, fights: [], downs: 0, wipes: 0, withdraws: 0, longFights: 0, rests: 0,
      anchorsBroken: 0, overdue: 0, guardianSaves: 0, stubbornSaves: 0, luckyUses: 0, shellsByBreaker: 0, shellsByHalf: 0,
      surges: 0, surgesStopped: 0, feeds: 0, strikes: 0 } };
  const rec = ctx.rec;
  const log = (...a) => trace && trace.push(a.join(" "));
  // §3 Feeding: the fighters' elements form a ring in cycle order, skipping elements nobody has.
  const ring = CYCLE.map(el => F.find(f => f.element === el)).filter(Boolean);
  ctx.feeder = new Map(ring.map((f, i) => [f, ring[(i - 1 + ring.length) % ring.length]]));

  // §8 Prologue: the First Clash, a pack of fighters + 2 Stills. Costs no Hour.
  ctx.phase = "clash";
  const clash = fight(ctx, "clash", { pack: R.firstClashPer * n });
  rec.fights.push(clash);
  afterFight(ctx);

  // §8 The Hunt: Hours, five Anchors with a Shell each, Respites.
  const local = F.some(f => f.has("perk", "local"));
  let hours = R.huntHours + (local && !R.localRestOnly ? R.localHours : 0);
  let freeRest = local && R.localRestOnly;
  const anchors = rng.shuffle(ELEMENTS).slice(0, R.anchors).map(shell => ({ shell, broken: false }));
  let overdue = 0, lastRest = false;
  ctx.phase = "hunt";
  while (hours > 0) {
    ctx.hoursLeft = hours;
    const standing = anchors.filter(a => !a.broken);
    const vig = F.reduce((a, f) => a + f.vigor, 0) / F.reduce((a, f) => a + f.vigorMax, 0);
    if (!standing.length) { // every Anchor broken: rest if hurt, then go to the Heart
      if (vig < 1 && !lastRest) { rest(ctx); hours--; rec.rests++; }
      break;
    }
    if (vig < P.restBelow && !lastRest) {
      rest(ctx); rec.rests++; lastRest = true; log("respite");
      if (freeRest) freeRest = false; else hours--;
      continue;
    }
    lastRest = false;
    // Prefer an Anchor whose Shell someone in the group can break.
    const mine = standing.filter(a => F.some(f => f.element === breakerOf(a.shell)));
    const anchor = (mine.length ? mine : standing)[0];
    const res = fight(ctx, "anchor", { shell: anchor.shell, pack: n + R.anchorStillsExtra });
    rec.fights.push(res);
    hours--;
    if (res.long) { rec.longFights++; if (hours > 0) hours--; else overdue++; }
    if (res.result === "win") { anchor.broken = true; rec.anchorsBroken++; }
    afterFight(ctx);
  }
  rec.overdue = overdue;

  // §8 The Heart, in the last Hour. §9 endings.
  ctx.phase = "heart";
  ctx.unlocked = true; // §7: every Awakening can be used once the Heart fight begins
  const standing = anchors.filter(a => !a.broken).length;
  const heart = fight(ctx, "heart", { standing, pack: n + R.heartStillsExtra, dawn: Math.max(1, R.dawnRound - overdue) });
  rec.fights.push(heart);
  const outcome = heart.result === "win" ? "win" : heart.result === "partial" ? "partial" : "loss";
  return {
    outcome, lossKind: outcome === "loss" ? heart.result : null, standing, heartFrac: heart.heartFrac,
    ...rec,
    fighters: F.map(f => ({ element: f.element, style: f.style, perk: f.perk, awakening: f.awakening,
      awakened: f.awakenUsed, awakenWhere: f.awakenWhere, ...f.st })),
  };
}

function rest(ctx) {
  // §8 Respite: everyone back to full Vigor; Down fighters stand.
  for (const f of ctx.F) { f.vigor = f.vigorMax; f.down = false; }
}

function afterFight(ctx) {
  const { F, R } = ctx;
  // §5: Down fighters stand with 1 Vigor when the fight ends; §7 Awakenings end.
  for (const f of F) {
    if (f.down) { f.down = false; f.vigor = R.standVigor; }
    f.awake = false;
    f.luckyUsed = false; f.stubbornUsed = false; f.quickUsed = false;
  }
  // §2 Medic: after each fight, share out Vigor among the fighters.
  if (F.some(f => f.has("perk", "medic"))) shareVigor(F, R.medicPool);
}

/** Policy for shared healing: stand Down fighters first, then always the one with the least Vigor. */
function shareVigor(F, pool) {
  for (let k = 0; k < pool; k++) {
    const down = F.find(f => f.down);
    if (down) { down.down = false; down.vigor = 1; continue; }
    const to = F.filter(f => f.vigor < f.vigorMax).sort((a, b) => a.vigor / a.vigorMax - b.vigor / b.vigorMax)[0];
    if (!to) return;
    to.vigor++;
  }
}

function gainChi(ctx, f, k) {
  if (f.down || k <= 0) return;
  const room = ctx.R.chiMax - f.chi;
  const got = Math.min(room, k);
  f.chi += got; f.st.chiGained += got; f.st.chiWasted += k - got;
}
function spendChi(f, k) { f.chi -= k; f.st.chiSpent += k; }

const alive = F => F.filter(f => !f.down);
const eliteOf = enemies => enemies.find(e => e.kind !== "pack");
const packOf = enemies => enemies.find(e => e.kind === "pack" && e.tough > 0);

function makePack(R, stills) {
  return { kind: "pack", stills, tough: stills * R.stills.tough, toughMax: stills * R.stills.tough, guard: R.stills.guard, harm: R.stills.harm, shell: null };
}

/** Run one fight. kind: "clash" | "anchor" | "heart". */
function fight(ctx, kind, setup) {
  const { R, P, rng, F, n, rec } = ctx;
  const enemies = [];
  if (setup.pack > 0) enemies.push(makePack(R, setup.pack));
  if (kind === "anchor") {
    const t = R.warden.toughPer * n;
    enemies.push({ kind: "warden", tough: t, toughMax: t, guard: R.warden.guard, harm: R.warden.harm, crush: R.warden.crush, sweep: R.warden.sweep, shell: setup.shell, sealedBy: null, skip: false });
  }
  if (kind === "heart") {
    const t = (R.heart.toughPer + R.heart.perAnchor * setup.standing) * n;
    enemies.push({ kind: "heart", tough: t, toughMax: t, guard: R.heart.guard, harm: R.heart.harm, crush: R.heart.crush, sweep: R.heart.sweep, shell: null, sealedBy: null, skip: false });
  }
  // §6: Chi at the start of each fight (more at the Heart); §2 Internal style.
  for (const f of F) gainChi(ctx, f, R.chiFightStart + (kind === "heart" ? R.heartChi : 0) + (f.has("style", "internal") ? R.internalChi : 0));

  const elite = eliteOf(enemies);
  let round = 0, last = null, long = false;
  const done = () => (elite ? elite.tough <= 0 : enemies.every(e => e.tough <= 0));
  const out = (result, extra = {}) => ({ kind, result, rounds: round, long, ...extra });
  ctx.rs = { earth: null, guardianUsed: false, unbreakableUsed: false, dmg: new Map() };

  // §2 Quick: before the first round, a free Strike that can't be hit back.
  for (const f of F) if (f.has("perk", "quick") && !done()) {
    strike(ctx, f, chooseTarget(ctx, f, enemies, kind), enemies, last, { free: true });
    last = f;
  }
  if (done()) return out("win", heartFrac(elite));

  while (true) {
    round++;
    ctx.rs = { earth: null, guardianUsed: false, unbreakableUsed: false, dmg: new Map() };
    for (const e of enemies) { e.opening = null; e.choose = false; }

    // §7 Wellspring: at the start of each round, share out Vigor (a Down fighter given any stands).
    for (const w of F) if (w.awake && !w.down && w.has("awakening", "wellspring")) shareVigor(F, R.wellspringPool);
    // §7 Harmony: at the start of each round, share out Chi.
    for (const w of F) if (w.awake && !w.down && w.has("awakening", "harmony")) {
      for (let k = 0; k < R.harmonyChi; k++) {
        const to = alive(F).filter(x => x.chi < R.chiMax).sort((a, b) => a.chi - b.chi)[0];
        if (to) gainChi(ctx, to, 1);
      }
    }

    // §3: fighters act in any order the players choose (policy: follow the feeding cycle).
    for (const f of chooseOrder(ctx, last)) {
      if (f.down || done()) continue;
      maybeAwaken(ctx, f, kind, enemies);
      if (R.sealHolds && f.awake && f.has("awakening", "seal")) { last = f; continue; } // holding the Seal is your action
      const acts = f.awake && f.has("awakening", "tempest") ? 2 : 1;
      for (let a = 0; a < acts && !f.down && !done(); a++) {
        const downAlly = F.find(x => x.down);
        if (downAlly && shouldRally(ctx, enemies)) {
          // §3 Rally: your action; they stand with 2 Vigor.
          downAlly.down = false; downAlly.vigor = R.rallyVigor; f.st.rallies++;
        } else {
          strike(ctx, f, chooseTarget(ctx, f, enemies, kind), enemies, last);
        }
        last = f;
      }
      if (F.every(x => x.down)) break;
    }
    if (done()) return out("win", heartFrac(elite));
    if (F.every(x => x.down)) { rec.wipes++; return out(kind === "heart" ? "wipe" : "wiped", heartFrac(elite)); }

    // §4: enemies act at the end of the round.
    for (const e of enemies) {
      if (e.tough <= 0) continue;
      if (e.kind === "pack") swarm(ctx, e);
      else surge(ctx, e, enemies);
      if (F.every(x => x.down)) break;
    }
    if (F.every(x => x.down)) { rec.wipes++; return out(kind === "heart" ? "wipe" : "wiped", heartFrac(elite)); }

    // §7: an Awakening lasts a set number of rounds (counting the round it starts).
    for (const f of F) if (f.awake && --f.awakeLeft <= 0) f.awake = false;

    // §8: a long Anchor fight costs an Hour; §9 dawn ends the Heart fight.
    if (kind === "anchor" && round === R.longFightRound) long = true;
    if (kind === "heart" && round >= setup.dawn) {
      const frac = heartFrac(elite).heartFrac;
      return out(frac <= R.partialFrac ? "partial" : "dawn", { heartFrac: frac });
    }
    // §8: an Anchor fight still going at the end of round 7 ends: the Warden holds.
    if (kind === "anchor" && round >= R.dawnRound) { rec.withdraws++; return out("held"); }
    // §8 Withdraw (not at the Heart).
    if (kind === "anchor") {
      const downShare = F.filter(x => x.down).length / n;
      if (downShare >= P.withdrawDownShare && elite.tough / elite.toughMax > P.withdrawEnemyAbove) {
        rec.withdraws++; return out("withdrew");
      }
    }
    if (round >= 30) return out(kind === "heart" ? "dawn" : "stalled", heartFrac(elite)); // safety net
  }
}

const heartFrac = e => ({ heartFrac: e && e.kind === "heart" ? Math.max(0, e.tough) / e.toughMax : null });

/** Policy: walk the feeding cycle, starting where it gives the most feeds (including from the last actor). */
function chooseOrder(ctx, last) {
  const live = alive(ctx.F);
  let best = null, bestScore = -1;
  for (let r = 0; r < 5; r++) {
    const order = [];
    for (let i = 0; i < 5; i++) {
      const el = CYCLE[(r + i) % 5];
      const f = live.find(x => x.element === el);
      if (f) order.push(f);
    }
    let score = 0, prev = last;
    for (const f of order) { if (prev && ctx.feeder.get(f) === prev) score++; prev = f; }
    // Earth's Bulwark protects everyone after it acts: prefer it early on a tie.
    const ei = order.findIndex(f => f.element === "earth");
    const s2 = score * 10 - (ei < 0 ? 0 : ei);
    if (s2 > bestScore) { bestScore = s2; best = order; }
  }
  return best;
}

function shouldRally(ctx, enemies) {
  const e = eliteOf(enemies) ?? packOf(enemies);
  return !!e && e.tough > 3;
}

function chooseTarget(ctx, f, enemies, kind) {
  const pack = packOf(enemies), elite = eliteOf(enemies);
  if (!elite) return pack;
  if (!pack) return elite;
  if (f.has("style", "sweeper") && pack.stills >= 2) return pack; // policy: hit the easy Guard, sweep the elite
  if (elite.shell && f.element === breakerOf(elite.shell)) return elite;
  if (pack.stills >= ctx.P.packFirstAt) return pack;
  return elite;
}

function reserveOf(ctx, f) {
  return ctx.P.reserveForAwakening && !f.awakenUsed && ctx.phase !== "heart" ? ctx.R.awakenCost : 0;
}

function maybeAwaken(ctx, f, kind, enemies) {
  const { R, P } = ctx;
  if (f.awakenUsed || !ctx.unlocked || f.chi < R.awakenCost) return;
  if (kind !== "heart") {
    if (P.awakenInHunt === "never") return;
    if (P.awakenInHunt === "trouble") {
      const e = eliteOf(enemies) ?? packOf(enemies);
      const trouble = ctx.F.some(x => x.down) && e && e.tough / e.toughMax > 0.5;
      if (!trouble) return;
    }
  }
  // §7: spend 3 Chi at the start of your turn; lasts until the fight ends.
  spendChi(f, R.awakenCost);
  f.awakenUsed = true; f.awake = true; f.awakenWhere = kind;
  f.awakeLeft = f.has("awakening", "seal") ? R.sealRounds : R.awakenRounds;
  if (f.has("awakening", "seal")) { const e = eliteOf(enemies); if (e) e.sealedBy = f; }
}

function guardOf(ctx, f, t) {
  const { R } = ctx;
  let g = t.guard;
  if (t.shell && f.element !== breakerOf(t.shell)) g += R.shellGuard;
  if (t.sealedBy && t.sealedBy.awake && !t.sealedBy.down) g -= R.sealGuard;
  if (t.opening && t.opening !== f) g -= R.waterOpening;
  return Math.max(1, g);
}

function wantsTechnique(ctx, f, t, g) {
  const { R, F } = ctx;
  if (ctx.off.has(`element:${f.element}`)) return false; // blank test: the technique is switched off
  switch (f.element) {
    case "wood": return F.some(x => !x.down && x.vigorMax - x.vigor >= R.woodHeal && x.vigor <= x.vigorMax / 2);
    case "fire": return t.tough >= 3;
    case "earth": return !ctx.rs.earth && (t.kind !== "pack" || t.stills >= 3);
    case "metal": return g >= 2;
    case "water": return R.waterMode === "opening" ? g >= 2 : R.waterMode === "reroll" ? t.kind !== "pack" || g >= 2 : t.kind !== "pack" && !t.choose;
  }
  return false;
}

/** §1 the roll + §3 Strike. */
function strike(ctx, f, t, enemies, last, { free = false } = {}) {
  const { R, rng, F, rec } = ctx;
  const g = guardOf(ctx, f, t);
  if (t.opening && t.opening !== f && !R.waterOpenAll) t.opening = null; // the opening is used by this strike
  const reserve = f2 => reserveOf(ctx, f2);
  rec.strikes++;

  // Chi riders and bonus dice (policy order: technique, Quick, own Chi, Help).
  let tech = false, bonus = 0, noHitBack = false;
  if (f.chi - reserve(f) >= 1 && wantsTechnique(ctx, f, t, g)) { spendChi(f, 1); tech = true; f.st.techniques++; }
  if (free) { noHitBack = true; bonus += R.quickDice; }
  if (R.tempestNoHitBack && f.awake && f.has("awakening", "tempest")) noHitBack = true;
  if (bonus < R.bonusCap && g >= 2 && f.chi - reserve(f) >= 1) { spendChi(f, 1); bonus++; }
  if (g >= 2) for (const h of F) {
    if (bonus >= R.bonusCap) break;
    if (h === f || h.down || h.chi - reserve(h) < 2) continue;
    spendChi(h, 1); h.st.helps++; bonus++;
  }
  if (tech && f.element === "earth") {
    // §2 Earth Bulwark: you and one other fighter (policy: the Guardian, else the most hurt) lose 1 less this round.
    const others = alive(F).filter(o => o !== f);
    const ally = others.find(o => o.has("style", "guardian")) ?? others.sort((a, b) => a.vigor - b.vigor)[0];
    // earthOne: one fighter of your choice (policy: the Guardian, else whoever has the least Vigor, you included)
    const one = others.find(o => o.has("style", "guardian")) ?? alive(F).sort((a, b) => a.vigor - b.vigor)[0];
    ctx.rs.earth = new Set(R.earthOne ? [one] : R.earthSelfOnly ? [f] : [f, ally].filter(Boolean));
  }
  if (tech && f.element === "water") {
    if (R.waterMode === "opening") noHitBack = true; // §2 Water Undertow (the opening is set after the roll)
    else if (t.kind !== "pack") t.choose = true;     // §2 Water: the enemy's Surge this round is rolled twice; you choose
  }

  const pool = R.basePool + Math.min(bonus, R.bonusCap);
  let dice = rng.roll(pool);
  const count = ds => {
    const sixes = ds.filter(d => d === 6).length;
    let hits = ds.filter(d => d >= R.hitFace).length;
    if (tech && f.element === "metal") hits += sixes * R.metalSixExtra;
    return { hits, sixes };
  };
  let { hits, sixes } = count(dice);
  // §2 Water (reroll mode): reroll every die that isn't a hit.
  if (tech && f.element === "water" && R.waterMode === "reroll") {
    let left = R.waterRerollDice;
    dice = dice.map(d => (d >= R.hitFace || left-- <= 0 ? d : rng.d6()));
    ({ hits, sixes } = count(dice));
  }
  // §2 Lucky: once per fight, reroll every die that isn't a hit.
  if (f.has("perk", "lucky") && !f.luckyUsed && hits < g && !noHitBack) {
    f.luckyUsed = true; rec.luckyUses++;
    let left = R.luckyDice;
    dice = dice.map(d => (d >= R.hitFace || left-- <= 0 ? d : rng.d6()));
    ({ hits, sixes } = count(dice));
  }
  rec.rolls++;
  const met = hits >= g;
  const crit = met && sixes >= R.critSixes;
  if (crit) rec.crits++;
  if (hits === 0) rec.fails++;

  // Damage (§1, §3 Feeding, §2 techniques, styles, §7 awakenings).
  let dmg = 0;
  if (hits > 0) {
    dmg = hits * (f.awake && f.has("awakening", "ascendant") ? R.ascendantMult : 1);
    if (last && ctx.feeder.get(f) === last) { dmg += R.feedDamage; rec.feeds++; }
    if (tech && f.element === "fire") dmg += R.fireDamage;
    if (met && f.has("style", "brawler")) dmg += R.brawlerDamage;
    if (crit) dmg += R.critDamage;
  }
  dealDamage(ctx, f, t, dmg, hits);
  // §2 Sweeper: when you meet the Guard, deal 2 damage to one other enemy as well.
  if (met && f.has("style", "sweeper")) {
    const pick = t.kind === "pack" ? eliteOf(enemies) : packOf(enemies);
    if (pick && pick !== t && pick.tough > 0) dealDamage(ctx, f, pick, R.sweeperDamage, 0);
  }

  // §2 Water: Undertow leaves an opening for the next fighter to strike this enemy this round.
  if (tech && f.element === "water" && R.waterMode === "opening" && t.tough > 0) t.opening = f;

  // §2 Wood: Renewal heals after the roll, whatever the result.
  if (tech && f.element === "wood") {
    const pick = alive(F).sort((a, b) => a.vigor / a.vigorMax - b.vigor / b.vigorMax)[0];
    if (pick) pick.vigor = Math.min(pick.vigorMax, pick.vigor + R.woodHeal);
  }

  // §1: fewer hits than the Guard → the enemy hits back, unless the strike defeated it.
  if (t.tough > 0 && !met && !noHitBack) {
    rec.hitBacks++;
    harm(ctx, f, t.harm, { hitBack: true });
    gainChi(ctx, f, R.chiOnHitBack + (f.has("style", "flow") ? R.flowChi : 0));
    if (f.has("style", "counter")) { dealDamage(ctx, f, t, R.counterDamage, 0); gainChi(ctx, f, R.counterChi); }
  }
  if (crit) gainChi(ctx, f, R.critChi);
}

function dealDamage(ctx, f, t, dmg, hits) {
  const { R, rec } = ctx;
  if (dmg <= 0 || t.tough <= 0) return;
  const real = Math.min(dmg, t.tough);
  t.tough -= real;
  f.st.damage += real;
  ctx.rs.dmg.set(t, ctx.rs.dmg.get(t) ?? new Map());
  const m = ctx.rs.dmg.get(t); m.set(f, (m.get(f) ?? 0) + real);
  if (t.kind === "pack") t.stills = Math.ceil(t.tough / R.stills.tough);
  // §4 Shells: shattered by any hit from the breaker element, or at half Toughness.
  if (t.shell) {
    if (hits > 0 && f.element === breakerOf(t.shell)) { t.shell = null; rec.shellsByBreaker++; }
    else if (t.tough <= t.toughMax / 2) { t.shell = null; rec.shellsByHalf++; }
  }
}

/** §5: lose Vigor, with every protection applied. */
function harm(ctx, f, amount, { hitBack = false, sweep = false } = {}) {
  const { R, F, rec } = ctx;
  if (f.down || amount <= 0) return;
  let target = f;
  // §7 Unbreakable: once per round, take Harm meant for another fighter.
  const ub = F.find(o => o !== f && o.awake && !o.down && o.has("awakening", "unbreakable"));
  if (ub && R.unbreakableIntercept && !ctx.rs.unbreakableUsed) { ctx.rs.unbreakableUsed = true; target = ub; }
  else {
    // §2 Guardian: once per round, take another fighter's Harm, 1 less.
    const gd = F.find(o => o !== f && !o.down && o.has("style", "guardian"));
    const saves = f.vigor <= amount; // the Harm would put them Down
    if (gd && !(R.guardianNoSweep && sweep) && !ctx.rs.guardianUsed && (saves || (!R.guardianOnlySave && amount >= 2)) && gd.vigor > amount - R.guardianReduce) {
      ctx.rs.guardianUsed = true; target = gd; amount -= R.guardianReduce; rec.guardianSaves++; gainChi(ctx, gd, R.guardianChi);
    }
  }
  if (ctx.rs.earth && ctx.rs.earth.has(target) && !(R.earthNoSweep && sweep)) {
    amount -= R.earthReduce;
    if (R.earthOnce) ctx.rs.earth.delete(target); // the Bulwark takes one blow
  }
  if (target === f && f.has("style", "flow")) {
    if (R.flowFirstFree) { if (!ctx.rs.flowUsed?.has(f)) { (ctx.rs.flowUsed ??= new Set()).add(f); amount = 0; } }
    else if (hitBack || R.flowAll || (R.flowSingle && !sweep)) amount -= R.flowReduce;
  }
  if (target.awake && target.has("awakening", "unbreakable")) amount = 0;
  amount = Math.max(0, amount);
  if (!amount) return;
  target.vigor -= amount;
  if (target.vigor <= 0) {
    if (target.has("perk", "stubborn") && !target.stubbornUsed) { target.stubbornUsed = true; target.vigor = R.stubbornVigor; rec.stubbornSaves++; return; }
    target.vigor = 0; target.down = true; target.st.downs++; rec.downs++;
    target.st.chiLostDown += target.chi; target.chi = 0; // §5: a Down fighter loses all Chi
    target.awake = false;                                 // §7: an Awakening ends when you go Down
    ctx.unlocked = true;                                  // §7: the first fighter Down unlocks Awakenings
  }
}

/** §4 Stills: at the end of the round a pack deals ceil(Stills / 2) Harm to one fighter of the players' choice. */
function swarm(ctx, pack) {
  const { R, F } = ctx;
  const amt = Math.ceil(pack.stills / R.stills.swarmPer);
  const live = alive(F);
  if (!live.length) return;
  // Policy: an awake Unbreakable fighter takes it; else whoever can take it without going Down (most Vigor).
  const ub = live.find(f => f.awake && f.has("awakening", "unbreakable"));
  const pick = ub ?? live.slice().sort((a, b) => b.vigor - a.vigor)[0];
  harm(ctx, pick, amt);
}

/** §4 Surge tables (Warden and Heart), rolled at the end of each round. */
function surge(ctx, e, enemies) {
  const { R, rng, F, rec, n } = ctx;
  if (e.sealedBy && e.sealedBy.awake && !e.sealedBy.down) { rec.surgesStopped++; return; }
  rec.surges++;
  let r = rng.d6();
  if (e.choose) { // policy: keep the result that costs the group least
    const r2 = rng.d6();
    const cost = x => (x <= 2 ? e.crush : x <= 4 ? e.sweep * alive(F).length : x === 5 ? 1 : 2);
    if (cost(r2) < cost(r)) r = r2;
  }
  const live = alive(F);
  const crush = () => {
    const m = ctx.rs.dmg.get(e);
    let tgt = null, best = -1;
    if (m) for (const [f, d] of m) if (!f.down && d >= best) { best = d; tgt = f; }
    if (!tgt) tgt = live.slice().sort((a, b) => b.vigor - a.vigor)[0];
    if (tgt) harm(ctx, tgt, e.crush);
  };
  if (r <= 2) crush();
  else if (r <= 4) for (const f of live) harm(ctx, f, e.sweep, { sweep: true });
  else if (r === 5) {
    if (e.kind === "warden") {
      const rich = live.filter(f => f.chi > 0).sort((a, b) => b.chi - a.chi)[0];
      if (!rich) crush(); else { const k = Math.min(2, rich.chi); rich.chi -= k; rich.st.chiDrained += k; }
    } else {
      const rich = live.filter(f => f.chi > 0);
      if (!rich.length) crush(); else for (const f of rich) { f.chi -= 1; f.st.chiDrained += 1; }
    }
  } else {
    // Call: more Stills join (a new pack if none is left), up to fighters + 2 Stills.
    const p = packOf(enemies);
    const cap = (n + 2) * R.stills.tough;
    if (p) { p.tough = Math.min(cap, p.tough + R.callStills * R.stills.tough); p.toughMax = Math.max(p.toughMax, p.tough); p.stills = Math.ceil(p.tough / R.stills.tough); }
    else enemies.push(makePack(R, R.callStills));
  }
}

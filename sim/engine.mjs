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
 *    Every choice the rules leave to the players is marked "policy".
 */
import { ELEMENTS, CYCLE, breakerOf } from "./data.mjs";

export function makeFighter(spec, R, off, n) {
  const has = (pick, id) => spec[pick] === id && !off.has(`${pick}:${id}`);
  const vigorMax = R.vigorBySize[n] + (has("perk", "tough") ? R.toughVigor : 0); // §10, §2 Tough
  return {
    ...spec, has, vigorMax, vigor: vigorMax, chi: R.chiStart, down: false,
    awakenUsed: false, awake: false, awakeLeft: 0, awakenWhere: null,
    luckyUsed: false, stubbornUsed: false,
    st: { chiStart: R.chiStart, chiGained: 0, chiSpent: 0, chiLostDown: 0, chiDrained: 0, chiWasted: 0, damage: 0, downs: 0, rallies: 0, techniques: 0, helps: 0 },
  };
}

/** Play one night. Returns a plain record of what happened. */
export function playNight({ party, R, P, rng, off = new Set() }) {
  const n = party.length;
  const F = party.map(s => makeFighter(s, R, off, n));
  const ctx = { R, P, rng, F, n, off, unlocked: false, phase: "clash", clock: 0,
    rec: { rolls: 0, crits: 0, fails: 0, hitBacks: 0, fights: [], downs: 0, wipes: 0, withdraws: 0, longFights: 0, rests: 0,
      anchorsBroken: 0, overdue: 0, guardianSaves: 0, stubbornSaves: 0, luckyUses: 0, shellsByBreaker: 0, shellsByHalf: 0,
      surges: 0, surgesStopped: 0, feeds: 0, strikes: 0 } };
  const rec = ctx.rec;
  // §3 Feeding: the fighters' elements form a ring in cycle order, skipping elements nobody has.
  const ring = CYCLE.map(el => F.find(f => f.element === el)).filter(Boolean);
  ctx.feeder = new Map(ring.map((f, i) => [f, ring[(i - 1 + ring.length) % ring.length]]));

  // §8 Prologue: the First Clash, a pack of 2 Stills per fighter. Costs no Hour.
  rec.fights.push(fight(ctx, "clash", { pack: R.firstClashPer * n }));
  afterFight(ctx);

  // §8 The Hunt: Hours, five Anchors with a Shell each, Respites.
  let hours = R.huntHours;
  const anchors = rng.shuffle(ELEMENTS).slice(0, R.anchors).map(shell => ({ shell, broken: false }));
  let overdue = 0, lastRest = false;
  ctx.phase = "hunt";
  while (hours > 0) {
    const standing = anchors.filter(a => !a.broken);
    const vig = F.reduce((a, f) => a + f.vigor, 0) / F.reduce((a, f) => a + f.vigorMax, 0);
    if (!standing.length) { // every Anchor broken: rest if hurt (policy), then go to the Heart
      if (vig < 1 && !lastRest) { rest(ctx); hours--; rec.rests++; }
      break;
    }
    if (vig < P.restBelow && !lastRest) { rest(ctx); hours--; rec.rests++; lastRest = true; continue; }
    lastRest = false;
    // Policy: prefer an Anchor whose Shell someone in the group can break.
    const mine = standing.filter(a => F.some(f => f.element === breakerOf(a.shell)));
    const anchor = (mine.length ? mine : standing)[0];
    const res = fight(ctx, "anchor", { shell: anchor.shell, pack: R.anchorStillsPer * n });
    rec.fights.push(res);
    hours--;
    if (res.long) { rec.longFights++; if (hours > 0) hours--; else overdue++; } // §8 a long fight costs an Hour
    if (res.result === "win") { anchor.broken = true; rec.anchorsBroken++; }
    afterFight(ctx);
  }
  rec.overdue = overdue;

  // §8 The Heart, in the last Hour. §9 endings.
  ctx.phase = "heart";
  ctx.unlocked = true; // §7: every Awakening can be used once the Heart fight begins
  const standing = anchors.filter(a => !a.broken).length;
  const heart = fight(ctx, "heart", { standing, pack: R.heartStillsPer * n, dawn: Math.max(1, R.dawnRound - overdue) });
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
  // §8 Respite: everyone back to full Vigor; Down fighters stand. Chi is unchanged.
  for (const f of ctx.F) { f.down = false; f.vigor = f.vigorMax; }
}

function afterFight(ctx) {
  const { F, R } = ctx;
  // §5: Down fighters stand with 1 Vigor when the fight ends; §7 Awakenings end; once-per-fight uses reset.
  for (const f of F) {
    if (f.down) { f.down = false; f.vigor = R.standVigor; }
    f.awake = false;
    f.luckyUsed = false; f.stubbornUsed = false;
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

/** §6: gain Chi up to the maximum; the rest is lost. */
function gainChi(ctx, f, k) {
  if (f.down || k <= 0) return;
  const got = Math.min(ctx.R.chiMax - f.chi, k);
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
  const { R, P, F, n, rec } = ctx;
  const enemies = [];
  if (setup.pack > 0) enemies.push(makePack(R, setup.pack));
  if (kind === "anchor") { // §4 Warden
    const t = R.warden.toughPer * n;
    enemies.push({ kind: "warden", tough: t, toughMax: t, guard: R.warden.guard, harm: R.warden.harm, crush: R.warden.crush, sweep: R.warden.sweep, shell: setup.shell, sealedBy: null });
  }
  if (kind === "heart") { // §4 The Heart; Toughness is fixed when the fight begins
    const t = ((R.heart.toughBySize?.[n] ?? R.heart.toughPer) + R.heart.perAnchor * setup.standing) * n;
    enemies.push({ kind: "heart", tough: t, toughMax: t, guard: R.heart.guard, harm: R.heart.harm, crush: R.heart.crush, sweep: R.heart.sweep, shell: null, sealedBy: null });
  }
  // §6: Chi when the Heart fight begins; §2 Breath: Chi at the start of every fight.
  for (const f of F) gainChi(ctx, f, (kind === "heart" ? R.heartChi : 0) + (f.has("style", "breath") ? R.breathChi : 0));

  ctx.enemies = enemies;
  const elite = eliteOf(enemies);
  let round = 0, last = null, long = false;
  const done = () => (elite ? elite.tough <= 0 : enemies.every(e => e.tough <= 0)); // §4: when the elite falls, its Stills crumble
  const out = (result, extra = {}) => ({ kind, result, rounds: round, long, ...extra });
  const newRound = () => ({ earth: null, guardianUsed: false, dmg: new Map() });
  ctx.rs = newRound();

  // §2 Quick: before the first round, a free Strike with +1 die that can't be hit back.
  for (const f of F) if (f.has("perk", "quick") && !done()) {
    strike(ctx, f, chooseTarget(ctx, f, enemies), enemies, last, { free: true });
    last = f; f.actedAt = ++ctx.clock;
  }
  if (done()) return out("win", heartFrac(elite));

  while (true) {
    round++;
    ctx.rs = newRound();

    // §7 Wellspring and Harmony act at the start of each round while they last.
    for (const w of F) if (w.awake && !w.down && w.has("awakening", "wellspring")) shareVigor(F, R.wellspringPool);
    for (const w of F) if (w.awake && !w.down && w.has("awakening", "harmony")) {
      for (let k = 0; k < R.harmonyChi; k++) { // policy: to whoever has the least Chi
        const to = alive(F).filter(x => x.chi < R.chiMax).sort((a, b) => a.chi - b.chi)[0];
        if (to) gainChi(ctx, to, 1);
      }
    }

    // §3: fighters act one at a time, in any order (policy: follow the feeding ring).
    for (const f of chooseOrder(ctx, last)) {
      if (f.down || done()) continue;
      maybeAwaken(ctx, f, kind, enemies);
      if (f.awake && f.has("awakening", "seal")) { last = f; f.actedAt = ++ctx.clock; continue; } // §7 Seal: holding it is your action
      const acts = f.awake && f.has("awakening", "tempest") ? 2 : 1;      // §7 Tempest: two actions
      for (let a = 0; a < acts && !f.down && !done(); a++) {
        const downAlly = F.find(x => x.down);
        if (downAlly && shouldRally(enemies)) {
          downAlly.down = false; downAlly.vigor = R.rallyVigor; f.st.rallies++; // §3 Rally
        } else {
          strike(ctx, f, chooseTarget(ctx, f, enemies), enemies, last);
        }
        last = f; f.actedAt = ++ctx.clock;
      }
      if (F.every(x => x.down)) break;
    }
    // §9: a strike that destroys the elite wins, even if it also put the last fighter Down.
    if (done()) return out("win", heartFrac(elite));
    if (F.every(x => x.down)) { rec.wipes++; return out(kind === "heart" ? "wipe" : "wiped", heartFrac(elite)); }

    // §4 (test): the Warden or Heart feeds on its standing Stills.
    if (R.feedOnStills) {
      const p = packOf(enemies);
      if (p && elite && elite.tough > 0) elite.tough = Math.min(elite.toughMax, elite.tough + p.stills * R.feedOnStills);
    }
    // §4: enemies act at the end of the round: packs Swarm, then the Warden or Heart Surges.
    for (const e of [...enemies]) { // a pack Called this round doesn't Swarm until the next
      if (e.tough <= 0) continue;
      if (e.kind === "pack") swarm(ctx, e);
      else surge(ctx, e, enemies);
      if (F.every(x => x.down)) break;
    }
    if (F.every(x => x.down)) { rec.wipes++; return out(kind === "heart" ? "wipe" : "wiped", heartFrac(elite)); }

    // §7: an Awakening lasts 3 rounds, counting the round it starts.
    for (const f of F) if (f.awake && --f.awakeLeft <= 0) f.awake = false;

    if (kind === "anchor" && round === R.longFightRound) long = true; // §8 long fight
    if (kind === "heart" && round >= setup.dawn) {                   // §9 dawn
      const frac = heartFrac(elite).heartFrac;
      return out(frac <= R.partialFrac ? "partial" : "dawn", { heartFrac: frac });
    }
    if (kind === "anchor" && round >= R.dawnRound) { rec.withdraws++; return out("held"); } // §8: the Warden holds
    if (kind === "anchor") { // §8 Withdraw (policy: when half the group is Down and the Warden is above half)
      const downShare = F.filter(x => x.down).length / n;
      if (downShare >= P.withdrawDownShare && elite.tough / elite.toughMax > P.withdrawEnemyAbove) {
        rec.withdraws++; return out("withdrew");
      }
    }
    if (round >= 30) return out("stalled", heartFrac(elite)); // safety net: never reached by the rules above
  }
}

const heartFrac = e => ({ heartFrac: e && e.kind === "heart" ? Math.max(0, e.tough) / e.toughMax : null });

/** Policy: walk the feeding ring, starting where it gives the most fed strikes (counting the last actor). */
function chooseOrder(ctx, last) {
  const live = alive(ctx.F);
  let best = [], bestScore = -1;
  for (let r = 0; r < 5; r++) {
    const order = [];
    for (let i = 0; i < 5; i++) {
      const f = live.find(x => x.element === CYCLE[(r + i) % 5]);
      if (f) order.push(f);
    }
    let score = 0, prev = last;
    for (const f of order) { if (prev && ctx.feeder.get(f) === prev) score++; prev = f; }
    const ei = order.findIndex(f => f.element === "earth"); // tie-break: Earth's Bulwark early
    const s2 = score * 10 - (ei < 0 ? 0 : ei);
    if (s2 > bestScore) { bestScore = s2; best = order; }
  }
  return best;
}

/** Policy: Rally whenever someone is Down, unless the fight is nearly won. */
function shouldRally(enemies) {
  const e = eliteOf(enemies) ?? packOf(enemies);
  return !!e && e.tough > 3;
}

/** Policy: Sweepers and big packs first, Shell-breakers on their Shell, otherwise the Warden or Heart. */
function chooseTarget(ctx, f, enemies) {
  const pack = packOf(enemies), elite = eliteOf(enemies);
  if (!elite) return pack;
  if (!pack) return elite;
  if (f.has("style", "sweeper") && pack.stills >= 2) return pack;
  if (elite.shell && f.element === breakerOf(elite.shell)) return elite;
  if (pack.stills >= ctx.P.packFirstAt) return pack;
  return elite;
}

/** Policy: at the Heart, keep 3 Chi until you have Awakened; in the Hunt only if POLICY says so. */
function reserveOf(ctx, f) {
  if (f.awakenUsed) return 0;
  return ctx.phase === "heart" || ctx.P.reserveForAwakening ? ctx.R.awakenCost : 0;
}

function maybeAwaken(ctx, f, kind, enemies) {
  const { R, P } = ctx;
  if (f.awakenUsed || !ctx.unlocked || f.chi < R.awakenCost) return;
  if (kind !== "heart") { // policy: in the Hunt, only when someone is Down and the enemy is above half
    if (P.awakenInHunt === "never") return;
    if (P.awakenInHunt === "trouble") {
      const e = eliteOf(enemies) ?? packOf(enemies);
      if (!(ctx.F.some(x => x.down) && e && e.tough / e.toughMax > 0.5)) return;
    }
  }
  // §7: spend 3 Chi at the start of your turn.
  spendChi(f, R.awakenCost);
  f.awakenUsed = true; f.awake = true; f.awakenWhere = kind;
  f.awakeLeft = f.has("awakening", "seal") ? R.sealRounds : R.awakenRounds; // §7: Seal lasts 2 rounds
  if (f.has("awakening", "seal")) { const e = eliteOf(enemies); if (e) e.sealedBy = f; }
}

/** §4: Guard, plus a Shell unless you are its breaker, plus the screen of standing Stills (at most guardMax). */
function guardOf(ctx, f, t) {
  let g = t.guard + (t.shell && f.element !== breakerOf(t.shell) ? ctx.R.shellGuard : 0);
  if (t.kind !== "pack" && ctx.R.screenGuard && ctx.enemies.some(e => e.kind === "pack" && e.tough > 0)) g = Math.min(ctx.R.guardMax, g + ctx.R.screenGuard);
  return g;
}

/** Policy: when each element's technique is worth its Chi. */
function wantsTechnique(ctx, f, t, g) {
  const { R, F } = ctx;
  if (ctx.off.has(`element:${f.element}`)) return false; // blank test: the technique is switched off
  switch (f.element) {
    case "wood": return F.some(x => !x.down && x.vigorMax - x.vigor >= R.woodHeal && x.vigor <= x.vigorMax / 2);
    case "fire": return t.tough >= 3;
    case "earth": return !ctx.rs.earth && (t.kind !== "pack" || t.stills >= 3);
    case "metal": return g >= 2;
    case "water": return t.kind !== "pack" || g >= 2;
  }
  return false;
}

/** §1 the roll + §3 Strike, resolved in the order CORE-RULES §3 gives. */
function strike(ctx, f, t, enemies, last, { free = false } = {}) {
  const { R, rng, F, rec } = ctx;
  const g = guardOf(ctx, f, t);
  const reserve = x => reserveOf(ctx, x);
  rec.strikes++;

  // 1. Declare: technique (1 Chi), then bonus dice from your Chi and Help, at most +2 in all.
  let tech = false, bonus = 0, noHitBack = false;
  if (f.chi - reserve(f) >= 1 && wantsTechnique(ctx, f, t, g)) { spendChi(f, 1); tech = true; f.st.techniques++; }
  if (free) { noHitBack = true; bonus += R.quickDice; }                              // §2 Quick
  if (f.awake && f.has("awakening", "tempest")) noHitBack = true;                    // §7 Tempest
  if (bonus < R.bonusCap && g >= 2 && f.chi - reserve(f) >= 1) { spendChi(f, 1); bonus++; } // policy: own die vs Guard 2+
  if (g >= 2) for (const h of F) { // §3 Help (policy: helpers keep 1 Chi for their own technique)
    if (bonus >= R.bonusCap) break;
    if (h === f || h.down || h.chi - reserve(h) < 2) continue;
    spendChi(h, 1); h.st.helps++; bonus++;
  }
  if (tech && f.element === "earth") {
    // §2 Earth Bulwark: one fighter (policy: the Guardian, else whoever has the least Vigor).
    const one = alive(F).find(o => o !== f && o.has("style", "guardian")) ?? alive(F).sort((a, b) => a.vigor - b.vigor)[0];
    ctx.rs.earth = new Set([one]);
  }

  // 2. Roll, then rerolls (Water, then Lucky).
  let dice = rng.roll(R.basePool + Math.min(bonus, R.bonusCap));
  const count = ds => {
    const sixes = ds.filter(d => d === 6).length;
    let hits = ds.filter(d => d >= R.hitFace).length;
    if (tech && f.element === "metal") hits += sixes * R.metalSixExtra; // §2 Metal Edge
    return { hits, sixes };
  };
  const reroll = k => { let left = k; dice = dice.map(d => (d >= R.hitFace || left-- <= 0 ? d : rng.d6())); };
  let { hits, sixes } = count(dice);
  if (tech && f.element === "water") { reroll(R.waterRerollDice); ({ hits, sixes } = count(dice)); } // §2 Water Tide
  if (f.has("perk", "lucky") && !f.luckyUsed && hits < g && !noHitBack) {                            // §2 Lucky (policy: to dodge a hit back)
    f.luckyUsed = true; rec.luckyUses++;
    reroll(99); ({ hits, sixes } = count(dice));
  }
  rec.rolls++;
  const met = hits >= g;
  const crit = met && sixes >= R.critSixes; // §1 Critical
  if (crit) rec.crits++;
  if (hits === 0) rec.fails++;

  // 3. Damage: hits (doubled by Ascendant), plus bonuses, only if at least one hit.
  let dmg = 0;
  if (hits > 0) {
    dmg = hits * (f.awake && f.has("awakening", "ascendant") ? R.ascendantMult : 1);
    if (last && ctx.feeder.get(f) === last) { dmg += R.feedDamage; rec.feeds++; } // §3 Feeding
    if (tech && f.element === "fire") dmg += R.fireDamage;                         // §2 Fire Blaze
    if (met && f.has("style", "brawler")) dmg += R.brawlerDamage;                  // §2 Brawler
    if (crit) dmg += R.critDamage + (f.has("perk", "trained") ? R.trainedDamage : 0); // §2 Trained
  }
  dealDamage(ctx, f, t, dmg, hits);
  if (met && f.has("style", "sweeper")) { // §2 Sweeper: 1 damage to one other enemy
    const pick = t.kind === "pack" ? eliteOf(enemies) : packOf(enemies);
    if (pick && pick !== t && pick.tough > 0) dealDamage(ctx, f, pick, R.sweeperDamage, 0);
  }

  // 4. Wood heals, whatever the result (policy: the fighter with the smallest share of Vigor).
  if (tech && f.element === "wood") {
    const pick = alive(F).sort((a, b) => a.vigor / a.vigorMax - b.vigor / b.vigorMax)[0];
    if (pick) pick.vigor = Math.min(pick.vigorMax, pick.vigor + R.woodHeal);
  }

  // 5. Fewer hits than the Guard: the enemy hits back, unless this strike destroyed it.
  if (t.tough > 0 && !met && !noHitBack) {
    rec.hitBacks++;
    harm(ctx, f, t.harm);
    gainChi(ctx, f, R.chiOnHitBack); // §6
    if (f.has("style", "counter")) { dealDamage(ctx, f, t, R.counterDamage, 0); gainChi(ctx, f, R.counterChi); } // §2 Counter
  }
  // 6. A Critical gives Chi.
  if (crit) gainChi(ctx, f, R.critChi + (f.has("perk", "trained") ? R.trainedChi : 0));
}

function dealDamage(ctx, f, t, dmg, hits) {
  const { R, rec } = ctx;
  if (dmg <= 0 || t.tough <= 0) return;
  const real = Math.min(dmg, t.tough); // damage past the last Toughness is lost
  t.tough -= real;
  f.st.damage += real;
  if (!ctx.rs.dmg.has(t)) ctx.rs.dmg.set(t, new Map());
  const m = ctx.rs.dmg.get(t); m.set(f, (m.get(f) ?? 0) + real);
  if (t.kind === "pack") t.stills = Math.ceil(t.tough / R.stills.tough);
  // §4 Shells: shattered by any hit from the breaker element, or at half Toughness.
  if (t.shell) {
    if (hits > 0 && f.element === breakerOf(t.shell)) { t.shell = null; rec.shellsByBreaker++; }
    else if (t.tough <= t.toughMax / 2) { t.shell = null; rec.shellsByHalf++; }
  }
}

/** §5: lose Vigor, with every protection applied in CORE-RULES §5 order. */
function harm(ctx, f, amount, { sweep = false } = {}) {
  const { R, F, rec } = ctx;
  if (f.down || amount <= 0) return;
  let target = f;
  // §2 Guardian: once per round, take another fighter's loss instead (policy: when it would put them Down, or it's at least P.guardFrom).
  const gd = F.find(o => o !== f && !o.down && o.has("style", "guardian"));
  if (gd && !ctx.rs.guardianUsed && (f.vigor <= amount || amount >= ctx.P.guardFrom) && gd.vigor > amount) {
    ctx.rs.guardianUsed = true; target = gd; rec.guardianSaves++;
    if (amount >= R.guardianMinLoss) gainChi(ctx, gd, R.guardianChi); // §2 Guardian: 2 Chi for a loss of 2 or more
  }
  if (ctx.rs.earth && ctx.rs.earth.has(target)) { amount -= R.earthReduce; ctx.rs.earth.delete(target); } // §2 Bulwark takes one blow
  if (target === f && f.has("style", "flow") && !sweep) amount -= R.flowReduce;                            // §2 Flow
  if (target.awake && target.has("awakening", "unbreakable")) amount = 0;                                 // §7 Unbreakable
  amount = Math.max(0, amount);
  if (!amount) return;
  target.vigor -= amount;
  if (target.vigor <= 0) {
    if (target.has("perk", "stubborn") && !target.stubbornUsed) { // §2 Stubborn
      target.stubbornUsed = true; target.vigor = R.stubbornVigor; rec.stubbornSaves++; return;
    }
    target.vigor = 0; target.down = true; target.st.downs++; rec.downs++;
    target.st.chiLostDown += target.chi; target.chi = 0; // §5: a Down fighter loses all Chi
    target.awake = false;                                 // §7: an Awakening ends when you go Down
    ctx.unlocked = true;                                  // §7: the first fighter Down lets everyone Awaken
  }
}

/** §4 Swarm: a pack deals Harm equal to half its Stills (round up) to one fighter of the players' choice. */
function swarm(ctx, pack) {
  const live = alive(ctx.F);
  if (!live.length) return;
  // Policy: an awake Unbreakable fighter takes it; else whoever has the most Vigor.
  const ub = live.find(f => f.awake && f.has("awakening", "unbreakable"));
  const amt = Math.ceil(pack.stills / ctx.R.stills.swarmPer);
  if (!ctx.R.swarmSpread) { harm(ctx, ub ?? live.slice().sort((a, b) => b.vigor - a.vigor)[0], amt); return; }
  for (let k = 0; k < amt; k++) { // one blow per point, each to whoever has the most Vigor
    const now = alive(ctx.F);
    if (!now.length) return;
    harm(ctx, ub && !ub.down ? ub : now.sort((a, b) => b.vigor - a.vigor)[0], 1);
  }
}

/** §4 Surge tables (Warden and Heart), rolled at the end of each round. */
function surge(ctx, e, enemies) {
  const { R, rng, F, rec, n } = ctx;
  if (e.sealedBy && e.sealedBy.awake && !e.sealedBy.down) { rec.surgesStopped++; return; } // §7 Seal
  rec.surges++;
  const r = rng.d6();
  const live = alive(F);
  const lastFirst = (a, b) => (b.actedAt ?? 0) - (a.actedAt ?? 0); // §4 ties: the fighter who acted last
  const crush = () => { // the fighter who dealt it the most damage this round; nobody: the most Vigor
    const m = ctx.rs.dmg.get(e);
    const hitters = m ? [...m].filter(([f]) => !f.down).sort(([a, da], [b, db]) => db - da || lastFirst(a, b)) : [];
    const tgt = hitters.length ? hitters[0][0] : live.slice().sort((a, b) => b.vigor - a.vigor || lastFirst(a, b))[0];
    if (tgt) harm(ctx, tgt, e.crush);
  };
  if (r <= 2) crush();
  else if (r <= 4) for (const f of live) harm(ctx, f, e.sweep, { sweep: true });
  else if (r === 5) { // Drain: Warden takes 2 from the richest; the Heart takes 1 from everyone. No Chi anywhere: Crush.
    if (e.kind === "warden") {
      const rich = live.filter(f => f.chi > 0).sort((a, b) => b.chi - a.chi || lastFirst(a, b))[0];
      if (!rich) crush(); else { const k = Math.min(2, rich.chi); rich.chi -= k; rich.st.chiDrained += k; }
    } else {
      const rich = live.filter(f => f.chi > 0);
      if (!rich.length) crush(); else for (const f of rich) { f.chi -= 1; f.st.chiDrained += 1; }
    }
  } else { // Call: 2 more Stills join (a new pack if none is left), to at most fighters + 2 Stills.
    const p = packOf(enemies);
    const cap = (n + 2) * R.stills.tough;
    if (p) { p.tough = Math.min(cap, p.tough + R.callStills * R.stills.tough); p.toughMax = Math.max(p.toughMax, p.tough); p.stills = Math.ceil(p.tough / R.stills.tough); }
    else enemies.push(makePack(R, R.callStills));
  }
}

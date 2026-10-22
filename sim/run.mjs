#!/usr/bin/env node
/**
 * Runs the simulator and writes sim/REPORT.md.
 *
 *   node sim/run.mjs                       # 4,000 nights per difficulty × group size, seed 1
 *   node sim/run.mjs --runs 1000 --seed 2  # faster / another seed
 *   node sim/run.mjs --set warden.toughPer=5 --policy restBelow=0.4 --no-write   # try a change
 *   node sim/run.mjs --blank               # also measure every option against a blank copy of itself
 *
 * Same seed → same report. Parties and dice come from separate seeded streams
 * per night, so the three difficulties replay the same groups (common random numbers).
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { makeRng } from "./rng.mjs";
import { rulesFor, POLICY, merge } from "./params.mjs";
import { makeParty } from "./party.mjs";
import { playNight } from "./engine.mjs";
import { PICKS, READY_MADE } from "./data.mjs";
import { TARGETS } from "./targets.mjs";

const DIFFS = ["easy", "standard", "hard"];
const POLICY_SWEEP = [
  ["Default habits (POLICY)", {}],
  ["Never Awaken before the Heart", { awakenInHunt: "never" }],
  ["Awaken as soon as allowed", { awakenInHunt: "asap" }],
  ["Save 3 Chi through the Hunt for an Awakening", { reserveForAwakening: true }],
  ["Rest only below 40% Vigor", { restBelow: 0.4 }],
  ["Rest below 80% Vigor", { restBelow: 0.8 }],
  ["Always strike the Warden or Heart, never the pack", { packFirstAt: 99 }],
  ["Never withdraw", { withdrawDownShare: 2 }],
  ["Give every Swarm to whoever has the most Vigor", { swarmTarget: "vigor" }],
];
const SIZES = [3, 4, 5];

export function parseArgs(argv) {
  const a = { runs: 4000, seed: 1, set: {}, policy: {}, write: true, blank: false };
  const put = (obj, path, raw) => {
    let v = raw;
    if (raw === "true" || raw === "false") v = raw === "true";
    else if (!Number.isNaN(Number(raw))) v = Number(raw);
    const keys = path.split(".");
    let o = obj;
    for (const k of keys.slice(0, -1)) o = o[k] ??= {};
    o[keys.at(-1)] = v;
  };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === "--runs") a.runs = Number(argv[++i]);
    else if (k === "--seed") a.seed = Number(argv[++i]);
    else if (k === "--set") { const [p, v] = argv[++i].split("="); put(a.set, p, v); }
    else if (k === "--policy") { const [p, v] = argv[++i].split("="); put(a.policy, p, v); }
    else if (k === "--no-write") a.write = false;
    else if (k === "--blank") a.blank = true;
  }
  return a;
}

/** Play `runs` nights for one difficulty and group size (random legal groups, or a fixed `party`). */
export function runCell({ diff, size, runs, seed, set = {}, policy = {}, off = null, filter = null, fixed = null }) {
  const R = rulesFor(diff, set);
  const P = merge(POLICY, policy);
  const nights = [];
  for (let i = 0; i < runs; i++) {
    const party = fixed ? fixed.map((f, id) => ({ id, ...f })) : makeParty(makeRng(seed, "party", size, i), size);
    if (filter && !filter(party)) continue;
    const offSet = off ? off(party) : new Set();
    nights.push({ party, ...playNight({ party, R, P, rng: makeRng(seed, "dice", size, i), off: offSet }) });
  }
  return nights;
}

const pct = (x, d = 1) => (100 * x).toFixed(d) + "%";
const mean = xs => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
const median = xs => { if (!xs.length) return 0; const s = xs.slice().sort((a, b) => a - b); return s[Math.floor(s.length / 2)]; };
const quant = (xs, q) => { if (!xs.length) return 0; const s = xs.slice().sort((a, b) => a - b); return s[Math.min(s.length - 1, Math.floor(q * s.length))]; };

export function summarise(nights) {
  const N = nights.length;
  const share = f => nights.filter(f).length / N;
  const fighters = nights.flatMap(n => n.fighters);
  const fights = kind => nights.flatMap(n => n.fights.filter(f => f.kind === kind));
  const rolls = nights.reduce((a, n) => a + n.rolls, 0);
  const chiUse = fighters.map(f => f.chiSpent / Math.max(1, f.chiStart + f.chiGained));
  const fk = {};
  for (const k of ["clash", "anchor", "heart"]) {
    const fs = fights(k);
    fk[k] = { n: fs.length, rounds: mean(fs.map(f => f.rounds)), p90: quant(fs.map(f => f.rounds), 0.9),
      max: Math.max(0, ...fs.map(f => f.rounds)), win: fs.filter(f => f.result === "win").length / Math.max(1, fs.length),
      wiped: fs.filter(f => f.result === "wiped" || f.result === "wipe").length / Math.max(1, fs.length),
      withdrew: fs.filter(f => f.result === "withdrew").length / Math.max(1, fs.length),
      held: fs.filter(f => f.result === "held").length / Math.max(1, fs.length),
      long: fs.filter(f => f.long).length / Math.max(1, fs.length) };
  }
  return {
    N,
    win: share(n => n.outcome === "win"), partial: share(n => n.outcome === "partial"), loss: share(n => n.outcome === "loss"),
    lossWipe: share(n => n.lossKind === "wipe"), lossDawn: share(n => n.lossKind === "dawn"),
    endedByDawn: share(n => n.fights.at(-1).result === "partial" || n.fights.at(-1).result === "dawn"),
    anchors: mean(nights.map(n => n.anchorsBroken)), rests: mean(nights.map(n => n.rests)),
    longNights: share(n => n.longFights > 0), overdue: share(n => n.overdue > 0),
    downs: mean(nights.map(n => n.downs)), wipesHunt: share(n => n.fights.some(f => f.result === "wiped")),
    crit: nights.reduce((a, n) => a + n.crits, 0) / rolls, fail: nights.reduce((a, n) => a + n.fails, 0) / rolls,
    hitBack: nights.reduce((a, n) => a + n.hitBacks, 0) / rolls,
    rollsPerFighter: rolls / fighters.length,
    awakened: fighters.filter(f => f.awakened).length / fighters.length,
    awakenHeart: fighters.filter(f => f.awakenWhere === "heart").length / fighters.length,
    chiMedianUse: median(chiUse), chiHalfSpenders: chiUse.filter(x => x >= 0.5).length / chiUse.length,
    chiGained: mean(fighters.map(f => f.chiGained)), chiSpent: mean(fighters.map(f => f.chiSpent)),
    chiLost: mean(fighters.map(f => f.chiLostDown + f.chiDrained)), chiWasted: mean(fighters.map(f => f.chiWasted)),
    fk,
  };
}

/** Win rate of groups holding each option, averaged over group sizes, minus the mean of its pick. */
export function optionTable(cellsBySize) {
  const out = {};
  for (const [pick, opts] of Object.entries(PICKS)) {
    const rows = opts.map(o => {
      const per = [];
      for (const nights of cellsBySize) {
        const sub = nights.filter(n => n.party.some(f => f[pick] === o));
        if (sub.length) per.push({ win: sub.filter(n => n.outcome === "win").length / sub.length,
          loss: sub.filter(n => n.outcome === "loss").length / sub.length, n: sub.length,
          dmg: mean(sub.map(n => n.fighters.find(f => f[pick] === o).damage)) });
      }
      return { o, win: mean(per.map(p => p.win)), loss: mean(per.map(p => p.loss)), dmg: mean(per.map(p => p.dmg)), n: per.reduce((a, p) => a + p.n, 0) };
    });
    const m = mean(rows.map(r => r.win));
    out[pick] = rows.map(r => ({ ...r, delta: r.win - m }));
  }
  return out;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const cmd = "node sim/run.mjs " + process.argv.slice(2).join(" ");
  const t0 = Date.now();
  const cells = {};
  for (const d of DIFFS) for (const s of SIZES) cells[`${d}:${s}`] = runCell({ diff: d, size: s, ...args });
  const sum = Object.fromEntries(Object.entries(cells).map(([k, v]) => [k, summarise(v)]));
  const pooled = Object.fromEntries(DIFFS.map(d => [d, summarise(SIZES.flatMap(s => cells[`${d}:${s}`]))]));
  const opt = optionTable(SIZES.map(s => cells[`standard:${s}`]));

  // Optional: each option against a blank copy of itself (same groups, same dice, effect switched off).
  let blank = null;
  if (args.blank) {
    blank = {};
    for (const [pick, opts] of Object.entries(PICKS)) for (const o of opts) {
      const has = p => p.some(f => f[pick] === o);
      let on = 0, offW = 0, cnt = 0;
      for (const s of SIZES) {
        const a = runCell({ diff: "standard", size: s, ...args, filter: has });
        const b = runCell({ diff: "standard", size: s, ...args, filter: has, off: () => new Set([`${pick}:${o}`]) });
        on += a.filter(n => n.outcome === "win").length; offW += b.filter(n => n.outcome === "win").length; cnt += a.length;
      }
      blank[`${pick}:${o}`] = (on - offW) / Math.max(1, cnt);
    }
  }
  // Player habits are not rules: show what each alternative habit does at Standard.
  const sweep = POLICY_SWEEP.map(([label, policy]) => {
    const x = summarise(SIZES.flatMap(s => runCell({ diff: "standard", size: s, ...args, policy: { ...args.policy, ...policy } })));
    return { label, x };
  });
  // The ready-made fighters: all five, and every group of three or four of them.
  const subsets = k => { const out = []; const rec = (i, cur) => { if (cur.length === k) return out.push(cur); for (let j = i; j < 5; j++) rec(j + 1, [...cur, READY_MADE[j]]); }; rec(0, []); return out; };
  const ready = [3, 4, 5].map(k => {
    const rows = subsets(k).map(g => ({ g, by: Object.fromEntries(DIFFS.map(d => [d, summarise(runCell({ diff: d, size: k, ...args, runs: Math.max(200, Math.floor(args.runs / 4)), fixed: g }))])) }));
    return { k, rows };
  });
  const secs = ((Date.now() - t0) / 1000).toFixed(1);
  const md = report({ cmd, args, sum, pooled, opt, blank, sweep, ready, secs });
  if (args.write) writeFileSync(join(dirname(fileURLToPath(import.meta.url)), "REPORT.md"), md);
  console.log(md.split("\n## ")[0] + "\n## " + md.split("\n## ")[1]);
  console.log(`(${secs}s)`);
}

function check(v, [lo, hi]) { return v >= lo && v <= hi ? "ok" : "**off**"; }

export function report({ cmd, args, sum, pooled, opt, blank, sweep = null, ready = null, secs }) {
  const T = TARGETS;
  const L = [];
  L.push("# Nightwake balance report", "");
  L.push(`Generated by \`${cmd.trim()}\` (${args.runs.toLocaleString()} nights per difficulty and group size, seed ${args.seed}). Same seed → same report.`, "");
  L.push("Every night is played start to finish by `sim/engine.mjs`, strictly by `docs/CORE-RULES.md`, with random legal groups (`sim/party.mjs`) and the player habits in `sim/params.mjs` `POLICY`.", "");

  L.push("## 1. Against the targets", "");
  L.push("| Measure | Target | Easy | Standard | Hard |", "|---|---|---|---|---|");
  const row = (label, key, fmt = pct) => {
    const t = T[key]; const tt = t ? (Array.isArray(t) ? `${fmt(t[0], 0)}–${fmt(t[1], 0)}` : "") : "";
    const cells = DIFFS.map(d => { const v = pooled[d][key]; const tgt = t && !Array.isArray(t) ? t[d] : t;
      return `${fmt(v)}${tgt ? ` (${check(v, tgt)})` : ""}`; });
    const tlabel = t && !Array.isArray(t) ? DIFFS.map(d => `${fmt(t[d][0], 0)}–${fmt(t[d][1], 0)}`).join(" / ") : tt;
    L.push(`| ${label} | ${tlabel} | ${cells.join(" | ")} |`);
  };
  row("Win", "win"); row("Partial (driven off at dawn)", "partial"); row("Loss", "loss");
  row("Critical (share of rolls)", "crit"); row("Failure: no hits (share of rolls)", "fail");
  row("Fighters who Awaken", "awakened"); row("Fighters spending at least half their Chi", "chiHalfSpenders");
  row("Nights the Heart fight ends at dawn", "endedByDawn"); row("Nights with a long Anchor fight", "longNights");
  L.push("");

  L.push("## 2. Win · partial · loss by difficulty and group size", "");
  L.push("| Group | Easy | Standard | Hard |", "|---|---|---|---|");
  for (const s of SIZES) L.push(`| ${s} fighters | ${DIFFS.map(d => { const x = sum[`${d}:${s}`]; return `${pct(x.win)} · ${pct(x.partial)} · ${pct(x.loss)}`; }).join(" | ")} |`);
  L.push(`| **all** | ${DIFFS.map(d => { const x = pooled[d]; return `**${pct(x.win)}** · ${pct(x.partial)} · ${pct(x.loss)}`; }).join(" | ")} |`);
  L.push("", `Target: each group size within ${pct(T.sizeSpread, 0)} of its difficulty's pooled win rate.`, "");
  L.push("Losses split (wiped out at the Heart / dawn with the Heart above half):", "");
  L.push("| Group | Easy | Standard | Hard |", "|---|---|---|---|");
  for (const s of SIZES) L.push(`| ${s} fighters | ${DIFFS.map(d => { const x = sum[`${d}:${s}`]; return `${pct(x.lossWipe)} / ${pct(x.lossDawn)}`; }).join(" | ")} |`);
  L.push("");

  L.push("## 3. Fight length (rounds) and fight results", "");
  L.push("| Fight | Target rounds | Easy mean (90th pct, max) | Standard | Hard | Standard: won · wiped out · withdrew · held at round 7 |", "|---|---|---|---|---|---|");
  for (const k of ["clash", "anchor", "heart"]) {
    const t = T.rounds[k];
    L.push(`| ${{ clash: "First Clash", anchor: "Anchor", heart: "Heart" }[k]} | ${t[0]}–${t[1]} | ${DIFFS.map(d => { const f = pooled[d].fk[k]; return `${f.rounds.toFixed(1)} (${f.p90}, ${f.max})`; }).join(" | ")} | ${(() => { const f = pooled.standard.fk[k]; return `${pct(f.win)} · ${pct(f.wiped)} · ${pct(f.withdrew)} · ${pct(f.held)}`; })()} |`);
  }
  L.push("");

  L.push("## 4. The night at Standard, by group size", "");
  L.push("| Measure | 3 | 4 | 5 |", "|---|---|---|---|");
  const r2 = (label, f) => L.push(`| ${label} | ${SIZES.map(s => f(sum[`standard:${s}`])).join(" | ")} |`);
  r2("Anchors broken (of 5)", x => x.anchors.toFixed(2));
  r2("Respites taken", x => x.rests.toFixed(2));
  r2("Nights with a long Anchor fight", x => pct(x.longNights));
  r2("Nights a long fight brings dawn closer", x => pct(x.overdue));
  r2("Nights with a wipe-out in the Hunt", x => pct(x.wipesHunt));
  r2("Fighters Down per night", x => x.downs.toFixed(2));
  r2("Rolls per fighter per night", x => x.rollsPerFighter.toFixed(1));
  r2("Hit back (share of rolls)", x => pct(x.hitBack));
  r2("Fighters who Awaken (at the Heart)", x => `${pct(x.awakened)} (${pct(x.awakenHeart)})`);
  r2("Chi gained / spent / lost per fighter", x => `${x.chiGained.toFixed(1)} / ${x.chiSpent.toFixed(1)} / ${x.chiLost.toFixed(1)}`);
  r2("Median share of Chi spent", x => pct(x.chiMedianUse, 0));
  L.push("");

  L.push("## 5. Option balance (Standard, averaged over group sizes)", "");
  L.push(`Win rate of groups that include the option, minus the average for that pick. Target: every option within ±${(100 * T.optionSpread).toFixed(0)} points.${blank ? " \"vs blank\" is the same groups and dice with that option's effect switched off: what the option is worth." : ""}`, "");
  for (const [pick, rows] of Object.entries(opt)) {
    L.push(`**${pick}**`, "");
    L.push(`| Option | Win | Δ | Loss | Damage per night${blank ? " | vs blank" : ""} |`, `|---|---|---|---|---|${blank ? "---|" : ""}`);
    for (const r of rows) {
      const flag = Math.abs(r.delta) > T.optionSpread ? " **off**" : "";
      const b = blank ? ` | ${(100 * blank[`${pick}:${r.o}`]).toFixed(1)} pts` : "";
      L.push(`| ${r.o} | ${pct(r.win)} | ${(100 * r.delta >= 0 ? "+" : "") + (100 * r.delta).toFixed(1)}${flag} | ${pct(r.loss)} | ${r.dmg.toFixed(1)}${b} |`);
    }
    L.push("");
  }
  if (sweep) {
    L.push("## 6. Player habits (Standard, all group sizes)", "");
    L.push("How the simulated players decide is not a rule. Each row changes one habit; the spread shows how much table play matters.", "");
    L.push("| Habit | Win | Partial | Loss | Fighters who Awaken | Anchors broken |", "|---|---|---|---|---|---|");
    for (const { label, x } of sweep) L.push(`| ${label} | ${pct(x.win)} | ${pct(x.partial)} | ${pct(x.loss)} | ${pct(x.awakened)} | ${x.anchors.toFixed(2)} |`);
    L.push("");
  }
  if (ready) {
    L.push("## 7. The ready-made fighters", "");
    L.push(`Win rate of each ready-made group (${Math.max(200, Math.floor(args.runs / 4)).toLocaleString()} nights each), against the random groups above.`, "");
    L.push("| Group | Easy | Standard | Hard |", "|---|---|---|---|");
    for (const { k, rows } of ready) {
      const avg = d => rows.reduce((a, r) => a + r.by[d].win, 0) / rows.length;
      const lo = d => Math.min(...rows.map(r => r.by[d].win)), hi = d => Math.max(...rows.map(r => r.by[d].win));
      L.push(`| ${k === 5 ? "all five" : `any ${k} (${rows.length} groups): mean (lowest–highest)`} | ${DIFFS.map(d => k === 5 ? pct(avg(d)) : `${pct(avg(d))} (${pct(lo(d), 0)}–${pct(hi(d), 0)})`).join(" | ")} |`);
    }
    L.push("");
  }
  return L.join("\n");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();

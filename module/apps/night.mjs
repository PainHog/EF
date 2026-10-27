/**
 * NIGHTWAKE — The Night sheet (Ch 5): difficulty, Hours, Anchors and the fight
 * in progress, with the Storyteller's buttons and a line saying what comes next.
 * Players see it read-only.
 */
import { EF } from "../config.mjs";
import * as L from "../logic/rules.mjs";
import { OPS } from "../contracts.mjs";
import { getNight, request } from "../gm/ops.mjs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
const esc = s => foundry.utils.escapeHTML(String(s ?? ""));
const Dialog = () => foundry.applications.api.DialogV2;
const actor = id => game.actors.get(id);
const PHASES = { setup: "Not begun", prologue: "The Prologue", hunt: "The Hunt", heart: "The Heart", ended: "Morning" };
const ENDINGS = { won: "Won: the Heart fell", "driven-off": "Driven off at dawn", lost: "Lost: the Unmade took hold" };

/** What the Storyteller does next (Ch 5, Ch 7). */
function nextStep(night, huntOver) {
  const f = night.fight;
  if (!night.started) return "Begin the night: pick the difficulty and the fighters (3 to 5).";
  if (night.ending) return "Morning: go round once more for the epilogue (Chapter 7).";
  if (f) {
    const last = f.kind === "heart" ? L.dawnRound(night.hoursOwed) : EF.night.lastRound;
    const quick = f.round === 1 && !f.started ? " Quick fighters may take their free Strike first." : "";
    return `Round ${f.round} of ${last}: each fighter acts once, in any order the players like.${quick} Then end the round.`;
  }
  if (night.phase === "prologue") return "The Prologue: each player says how their element woke. Then start the First Clash.";
  if (huntOver) return "The Hunt is over: the fighters are drawn to the Heart.";
  return `Hour ${EF.night.hours - night.hoursLeft + 1} of ${EF.night.hours}: go to an Anchor, or take a Respite.`;
}

export class NightTracker extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: "nightwake-night",
    classes: ["elemental-fighters", "nw-night"],
    window: { title: "The Night", icon: "fa-solid fa-moon", resizable: true },
    position: { width: 520, height: "auto" },
    actions: {
      beginNight: NightTracker.#beginNight,
      join: NightTracker.#join,
      editAnchors: NightTracker.#editAnchors,
      readNight: () => {
        const uuid = EF.nights[getNight().preset]?.journal;
        if (uuid) fromUuid(uuid).then(j => j?.sheet?.render(true));
      },
      openSheet: (event, target) => actor(target.dataset.id)?.sheet?.render(true),
      clash: () => request(OPS.startFight, { kind: "clash" }),
      anchor: (event, target) => request(OPS.startFight, { kind: "anchor", anchor: Number(target.dataset.anchor) }),
      heart: () => request(OPS.startFight, { kind: "heart" }),
      respite: () => request(OPS.respite),
      endRound: () => request(OPS.endRound),
      withdraw: () => request(OPS.withdraw)
    }
  };
  static PARTS = { main: { template: `systems/${EF.id}/templates/night-tracker.hbs` } };

  async _prepareContext() {
    const night = getNight(), fight = night.fight;
    const fighters = (fight?.fighterIds ?? night.fighterIds).map(actor).filter(Boolean);
    const enemies = fight ? [fight.masterId, ...fight.packIds].map(actor).filter(Boolean) : [];
    const anchorsStanding = night.anchors.filter(a => !a.broken).length;
    const huntOver = night.hoursLeft <= 0 || anchorsStanding === 0;
    return {
      gm: game.user.isGM, night, fight,
      started: night.started, ended: !!night.ending, endingText: ENDINGS[night.ending] ?? "",
      phase: fight?.kind === "clash" ? EF.fightKinds.clash : PHASES[night.phase] ?? night.phase,
      next: nextStep(night, huntOver),
      readyNight: EF.nights[night.preset]?.label ?? "",
      canRead: !!EF.nights[night.preset]?.journal,
      difficulty: EF.difficulties[night.difficulty]?.label,
      awakeningsOpen: night.firstDown,
      hours: Array.from({ length: EF.night.hours }, (_, i) => ({ left: i < night.hoursLeft })),
      anchors: night.anchors.map((a, i) => ({
        ...a, index: i, shellLabel: EF.elements[a.shell]?.label, shellIcon: EF.art.element(a.shell),
        breaker: EF.elements[EF.cycle.find(e => EF.elements[e].breaks === a.shell)]?.label,
        canStrike: night.started && !night.ending && !fight && !a.broken && !huntOver && ["prologue", "hunt"].includes(night.phase)
      })),
      canEditAnchors: !fight && !night.ending && (!night.started || night.phase === "prologue"),
      canClash: night.phase === "prologue" && !fight,
      canRespite: night.phase === "hunt" && !fight && night.hoursLeft > 0,
      canHeart: night.started && !night.ending && !fight && huntOver,
      heartPreview: night.started ? L.heartToughness(night.fighterIds.length, anchorsStanding) : 0,
      fightTitle: fight ? (fight.kind === "anchor" ? night.anchors[fight.anchor].name : EF.fightKinds[fight.kind]) : "",
      lastRound: fight?.kind === "heart" ? L.dawnRound(night.hoursOwed) : EF.night.lastRound,
      lastRoundAtHeart: L.dawnRound(night.hoursOwed),
      canWithdraw: fight?.kind === "anchor",
      enemies: enemies.map(e => ({
        id: e.id, name: e.name, img: e.img, toughness: e.system.toughness.value, max: e.system.toughness.max,
        stills: e.type === "pack" ? e.system.stills : null, guard: e.system.guard, harm: e.system.harm,
        shell: e.system.shell && e.system.shellIntact ? EF.elements[e.system.shell].label : null
      })),
      fighters: fighters.map(f => ({
        id: f.id, name: f.name, img: f.img, vigor: f.system.vigor.value, max: f.system.vigor.max, chi: f.system.chi, down: f.system.down,
        element: EF.elements[f.system.element]?.label, acted: !!fight?.actions[f.id],
        awakened: f.system.awakened.active ? `${EF.awakenings[f.system.awakening]?.label} (${f.system.awakened.roundsLeft})` : ""
      }))
    };
  }

  static async #beginNight() {
    const candidates = game.actors.filter(a => a.type === "fighter");
    if (candidates.length < 3) { ui.notifications.warn("Make at least three fighters first, or import the ready-made fighters from their compendium."); return; }
    const diffs = Object.entries(EF.difficulties).map(([k, d]) => `<option value="${k}"${k === "standard" ? " selected" : ""}>${d.label}</option>`).join("");
    const boxes = candidates.map(a => `<label><input type="checkbox" name="f-${a.id}"> ${esc(a.name)}</label>`).join("");
    const nights = Object.entries(EF.nights).map(([k, v]) => `<option value="${k}">${esc(v.label)}</option>`).join("");
    const choice = await Dialog().prompt({
      window: { title: "Begin the night" },
      content: `<div class="elemental-fighters nw-dialog"><label>Difficulty <select name="difficulty">${diffs}</select></label><p class="hint">Easy for a first night or a young table; Standard for most nights; Hard for a group that wants to lose sometimes.</p><label>Anchors <select name="preset"><option value="">As named on the Night sheet</option>${nights}</select></label><fieldset><legend>Fighters (3 to 5)</legend>${boxes}</fieldset></div>`,
      ok: { label: "Begin", callback: (event, button) => ({ difficulty: button.form.elements.difficulty.value, preset: button.form.elements.preset?.value ?? "", fighterIds: candidates.filter(a => button.form.elements[`f-${a.id}`]?.checked).map(a => a.id) }) }
    });
    if (choice) await request(OPS.beginNight, choice);
  }

  static async #join() {
    const night = getNight();
    const candidates = game.actors.filter(a => a.type === "fighter" && !night.fighterIds.includes(a.id));
    if (!candidates.length) { ui.notifications.warn("Every fighter is already in the night."); return; }
    const fighterId = await Dialog().prompt({
      window: { title: "A fighter joins late" },
      content: `<div class="elemental-fighters nw-dialog"><select name="f">${candidates.map(a => `<option value="${a.id}">${esc(a.name)}</option>`).join("")}</select><p class="hint">They join now, before the next fight; everyone's maximum Vigour becomes the starting Vigour for the new group size.</p></div>`,
      ok: { label: "Join", callback: (event, button) => button.form.elements.f.value }
    });
    if (fighterId) await request(OPS.join, { fighterId });
  }

  static async #editAnchors() {
    const night = getNight();
    const rows = night.anchors.map((a, i) => `<fieldset><legend>${esc(EF.elements[a.shell]?.label)} Shell</legend>
      <label>Anchor <input type="text" name="n-${i}" value="${esc(a.name)}"></label>
      <label>Warden <input type="text" name="w-${i}" value="${esc(a.warden)}"></label></fieldset>`).join("");
    const names = await Dialog().prompt({
      window: { title: "Name the Anchors" },
      content: `<div class="elemental-fighters nw-dialog"><p class="hint">For a night of your own (Chapter 9): five Anchors, one for each Shell element.</p>${rows}</div>`,
      ok: { label: "Save", callback: (event, button) => night.anchors.map((a, i) => ({ name: button.form.elements[`n-${i}`]?.value, warden: button.form.elements[`w-${i}`]?.value })) }
    });
    if (names) await request(OPS.anchors, { anchors: names });
  }
}

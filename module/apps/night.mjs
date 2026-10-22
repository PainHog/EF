/**
 * NIGHTWAKE — The Night sheet (Ch 5): difficulty, Hours, Anchors and the fight
 * in progress, with the Storyteller's buttons. Players see it read-only.
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

export class NightTracker extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: "nightwake-night",
    classes: ["elemental-fighters", "nw-night"],
    window: { title: "The Night", resizable: true },
    position: { width: 480, height: "auto" },
    actions: {
      beginNight: NightTracker.#beginNight,
      join: NightTracker.#join,
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
      phase: PHASES[night.phase] ?? night.phase,
      difficulty: EF.difficulties[night.difficulty]?.label,
      hours: Array.from({ length: EF.night.hours }, (_, i) => ({ left: i < night.hoursLeft })),
      anchors: night.anchors.map((a, i) => ({
        ...a, index: i, shellLabel: EF.elements[a.shell]?.label,
        breaker: EF.elements[EF.cycle.find(e => EF.elements[e].breaks === a.shell)]?.label,
        canStrike: night.started && !night.ending && !fight && !a.broken && !huntOver && ["prologue", "hunt"].includes(night.phase)
      })),
      canClash: night.phase === "prologue" && !fight,
      canRespite: night.phase === "hunt" && !fight && night.hoursLeft > 0,
      canHeart: night.started && !night.ending && !fight && huntOver,
      heartPreview: night.started ? L.heartToughness(night.fighterIds.length, anchorsStanding) : 0,
      fightTitle: fight ? (fight.kind === "anchor" ? night.anchors[fight.anchor].name : EF.fightKinds[fight.kind]) : "",
      lastRound: fight?.kind === "heart" ? L.dawnRound(night.hoursOwed) : EF.night.lastRound,
      canWithdraw: fight?.kind === "anchor",
      enemies: enemies.map(e => ({ name: e.name, toughness: e.system.toughness.value, max: e.system.toughness.max, stills: e.type === "pack" ? e.system.stills : null, shell: e.system.shell && e.system.shellIntact ? EF.elements[e.system.shell].label : null })),
      fighters: fighters.map(f => ({
        name: f.name, vigor: f.system.vigor.value, max: f.system.vigor.max, chi: f.system.chi, down: f.system.down,
        element: EF.elements[f.system.element]?.label, acted: !!fight?.actions[f.id],
        awakened: f.system.awakened.active ? `${EF.awakenings[f.system.awakening]?.label} (${f.system.awakened.roundsLeft})` : ""
      }))
    };
  }

  static async #beginNight() {
    const candidates = game.actors.filter(a => a.type === "fighter");
    if (candidates.length < 3) { ui.notifications.warn("Make at least three fighters first (or import the ready-made fighters)."); return; }
    const diffs = Object.entries(EF.difficulties).map(([k, d]) => `<option value="${k}"${k === "standard" ? " selected" : ""}>${d.label}</option>`).join("");
    const boxes = candidates.map(a => `<label><input type="checkbox" name="f-${a.id}"> ${esc(a.name)}</label>`).join("");
    const choice = await Dialog().prompt({
      window: { title: "Begin the night" },
      content: `<div class="elemental-fighters nw-dialog"><label>Difficulty <select name="difficulty">${diffs}</select></label><fieldset><legend>Fighters (3 to 5)</legend>${boxes}</fieldset></div>`,
      ok: { label: "Begin", callback: (event, button) => ({ difficulty: button.form.elements.difficulty.value, fighterIds: candidates.filter(a => button.form.elements[`f-${a.id}`]?.checked).map(a => a.id) }) }
    });
    if (choice) await request(OPS.beginNight, choice);
  }

  static async #join() {
    const night = getNight();
    const candidates = game.actors.filter(a => a.type === "fighter" && !night.fighterIds.includes(a.id));
    if (!candidates.length) { ui.notifications.warn("Every fighter is already in the night."); return; }
    const fighterId = await Dialog().prompt({
      window: { title: "A fighter joins late" },
      content: `<div class="elemental-fighters nw-dialog"><select name="f">${candidates.map(a => `<option value="${a.id}">${esc(a.name)}</option>`).join("")}</select></div>`,
      ok: { label: "Join", callback: (event, button) => button.form.elements.f.value }
    });
    if (fighterId) await request(OPS.join, { fighterId });
  }
}

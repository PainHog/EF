/**
 * NIGHTWAKE — Actor sheets: the fighter sheet (Ch 2's four picks, Vigour, Chi,
 * the Awakening, and the actions), and the Unmade's sheets (a Warden or the
 * Heart, and a pack of Stills).
 */
import { EF } from "../config.mjs";
import * as L from "../logic/rules.mjs";
import { getNight } from "../gm/ops.mjs";
import { strikeFlow, rallyFlow, awakenFlow, sealFlow } from "./actions.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;
const T = name => `systems/${EF.id}/templates/${name}.hbs`;
const opts = (table, current) => Object.entries(table).map(([value, d]) => ({ value, label: d.label, selected: value === current }));
const pips = (n, max) => Array.from({ length: max }, (_, i) => ({ on: i < n, value: i + 1 }));

/** Change a document's portrait with Foundry's file picker. */
function pickImage(sheet) {
  const FP = foundry.applications.apps?.FilePicker?.implementation ?? globalThis.FilePicker;
  if (!FP || !sheet.isEditable) return;
  return new FP({ type: "image", current: sheet.document.img, callback: path => sheet.document.update({ img: path }) }).browse();
}
/** Click a pip to set a track to it; click the top lit pip to step down by one. */
function setTrack(sheet, path, value, max) {
  if (!sheet.isEditable) return;
  const now = foundry.utils.getProperty(sheet.document, path) ?? 0;
  const next = Math.max(0, Math.min(max, value === now ? value - 1 : value));
  return sheet.document.update({ [path]: next });
}

export class FighterSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["elemental-fighters", "nw-sheet", "nw-fighter"],
    position: { width: 580, height: 720 },
    window: { resizable: true },
    form: { submitOnChange: true },
    actions: {
      strike: FighterSheet.#strike,
      freeStrike: FighterSheet.#freeStrike,
      rally: FighterSheet.#rally,
      awaken: FighterSheet.#awaken,
      holdSeal: FighterSheet.#seal,
      editImage: FighterSheet.#editImage,
      setVigor: FighterSheet.#setVigor,
      setChi: FighterSheet.#setChi,
      openNight: () => game.elementalFighters?.openNight?.()
    }
  };
  static PARTS = { sheet: { template: T("fighter-sheet") } };

  async _prepareContext(options) {
    const ctx = await super._prepareContext(options);
    const a = this.document, s = a.system;
    const night = getNight(), fight = night.fight;
    const inFight = !!fight?.fighterIds.includes(a.id);
    const awakening = EF.awakenings[s.awakening];
    const sealHolder = s.awakened.active && s.awakening === "seal";
    return Object.assign(ctx, {
      actor: a, system: s,
      elements: opts(EF.elements, s.element), styles: opts(EF.styles, s.style), perks: opts(EF.perks, s.perk), awakenings: opts(EF.awakenings, s.awakening),
      element: EF.elements[s.element], style: EF.styles[s.style], perk: EF.perks[s.perk], awakening,
      breaksLabel: EF.elements[EF.elements[s.element]?.breaks]?.label,
      feedsLabel: EF.elements[EF.cycle[(EF.cycle.indexOf(s.element) + 1) % 5]]?.label,
      vigorPips: pips(s.vigor.value, s.vigor.max), chiPips: pips(s.chi, EF.rules.chiMax),
      down: s.down, inFight,
      fightLabel: inFight ? `${fight.kind === "anchor" ? night.anchors[fight.anchor].name : EF.fightKinds[fight.kind]}, round ${fight.round}` : "",
      canStrike: inFight && !s.down && !sealHolder,
      canFree: inFight && !s.down && s.perk === "quick" && fight.round === 1 && !fight.started && !fight.quickDone.includes(a.id),
      canAwaken: inFight && L.canAwaken(s.toRules(), { firstDownTonight: night.firstDown, fightKind: fight?.kind }),
      sealHolder,
      awakenedText: s.awakened.active ? `${awakening?.label}: ${s.awakened.roundsLeft} round(s) left` : s.awakened.used ? "Used tonight" : "Ready (3 Chi)",
      awakenedActive: s.awakened.active,
      ringText: fight ? fight.fighterIds.map(id => game.actors.get(id)).filter(Boolean).map(x => x.system.element).filter(Boolean)
        .sort((x, y) => EF.cycle.indexOf(x) - EF.cycle.indexOf(y)).map(e => EF.elements[e].label).join(" → ") : ""
    });
  }

  static #strike() { return strikeFlow(this.document); }
  static #freeStrike() { return strikeFlow(this.document, { free: true }); }
  static #rally() { return rallyFlow(this.document); }
  static #awaken() { return awakenFlow(this.document); }
  static #seal() { return sealFlow(this.document); }
  static #editImage() { return pickImage(this); }
  static #setVigor(event, target) { return setTrack(this, "system.vigor.value", Number(target.dataset.value), this.document.system.vigor.max); }
  static #setChi(event, target) { return setTrack(this, "system.chi", Number(target.dataset.value), EF.rules.chiMax); }
}

export class UnmadeSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["elemental-fighters", "nw-sheet", "nw-unmade"],
    position: { width: 460, height: 480 },
    window: { resizable: true },
    form: { submitOnChange: true },
    actions: { editImage() { return pickImage(this); } }
  };
  static PARTS = { sheet: { template: T("unmade-sheet") } };

  async _prepareContext(options) {
    const ctx = await super._prepareContext(options);
    const a = this.document, s = a.system;
    const breaker = EF.cycle.find(e => EF.elements[e].breaks === s.shell);
    return Object.assign(ctx, {
      actor: a, system: s, isHeart: s.kind === "heart",
      shells: [{ value: "", label: "None", selected: !s.shell }, ...opts(EF.elements, s.shell)],
      breakerLabel: EF.elements[breaker]?.label ?? "",
      warden: EF.warden, card: EF.difficulties[getNight().difficulty] ?? EF.difficulties.standard
    });
  }
}

export class PackSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["elemental-fighters", "nw-sheet", "nw-pack"],
    position: { width: 420, height: 360 },
    window: { resizable: true },
    form: { submitOnChange: true },
    actions: { editImage() { return pickImage(this); } }
  };
  static PARTS = { sheet: { template: T("pack-sheet") } };

  async _prepareContext(options) {
    const ctx = await super._prepareContext(options);
    const s = this.document.system;
    return Object.assign(ctx, { actor: this.document, system: s, swarm: L.swarmHarm(this.document.system.toRules()) });
  }
}

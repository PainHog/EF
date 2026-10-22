/**
 * NIGHTWAKE — Actor data models.
 *  - fighter: a player's fighter (Ch 2): four picks, Vigor, Chi, the Awakening.
 *  - unmade:  a Warden or the Heart (Ch 6).
 *  - pack:    a pack of Stills, fought as one enemy (Ch 6).
 * Rules are computed by module/logic/rules.mjs; these models only hold the data
 * and expose it to the logic as plain objects (toRules()).
 */
import { EF } from "../config.mjs";

const { StringField, NumberField, BooleanField, SchemaField, HTMLField } = foundry.data.fields;
const int = (initial, min = 0) => new NumberField({ required: true, integer: true, min, initial });
const choice = (choices, initial) => new StringField({ required: true, blank: true, initial, choices: Object.keys(choices) });

export class FighterData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      element: choice(EF.elements, ""),
      style: choice(EF.styles, ""),
      perk: choice(EF.perks, ""),
      awakening: choice(EF.awakenings, ""),
      before: new StringField({ required: true, blank: true, initial: "" }),
      woke: new StringField({ required: true, blank: true, initial: "" }),
      vigor: new SchemaField({ value: int(EF.vigorBySize[3]), max: int(EF.vigorBySize[3], 1) }),
      chi: int(EF.rules.chiStart),
      awakened: new SchemaField({
        active: new BooleanField({ initial: false }),
        roundsLeft: int(0),
        used: new BooleanField({ initial: false })
      }),
      luckyUsed: new BooleanField({ initial: false }),
      stubbornUsed: new BooleanField({ initial: false }),
      notes: new HTMLField({ required: false, blank: true, initial: "" })
    };
  }

  prepareDerivedData() {
    this.vigor ??= { value: 0, max: 1 };
    this.awakened ??= { active: false, roundsLeft: 0, used: false };
    this.down = (this.vigor.value ?? 0) <= 0;
  }

  /** The plain shape module/logic expects. */
  toRules() {
    const a = this.parent;
    return {
      id: a.id, name: a.name, element: this.element, style: this.style, perk: this.perk, awakening: this.awakening,
      vigor: this.vigor.value, vigorMax: this.vigor.max, chi: this.chi, down: this.down,
      awakened: { ...this.awakened }, luckyUsed: !!this.luckyUsed, stubbornUsed: !!this.stubbornUsed
    };
  }
}

export class UnmadeData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      kind: new StringField({ required: true, initial: "warden", choices: ["warden", "heart"] }),
      shell: choice(EF.elements, ""),
      shellIntact: new BooleanField({ initial: true }),
      toughness: new SchemaField({ value: int(27), max: int(27, 1) }),
      anchor: new NumberField({ required: false, integer: true, nullable: true, initial: null }),
      notes: new HTMLField({ required: false, blank: true, initial: "" })
    };
  }

  prepareDerivedData() {
    this.toughness ??= { value: 0, max: 1 };
    this.guard = this.kind === "heart" ? EF.heart.guard : EF.warden.guard + (this.shell && this.shellIntact ? EF.warden.shellGuard : 0);
    this.harm = this.kind === "heart" ? EF.heart.harm : EF.warden.harm;
  }

  toRules() {
    const a = this.parent;
    return { id: a.id, name: a.name, kind: this.kind, toughness: this.toughness.value, toughnessMax: this.toughness.max, shell: this.shell || null, shellIntact: !!this.shellIntact };
  }
}

export class PackData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      toughness: new SchemaField({ value: int(9), max: int(9, 1) }),
      masterId: new StringField({ required: true, blank: true, initial: "" })
    };
  }

  prepareDerivedData() {
    this.toughness ??= { value: 0, max: 1 };
    this.stills = this.toughness.value > 0 ? Math.ceil(this.toughness.value / EF.stills.toughPer) : 0;
    this.guard = EF.stills.guard;
    this.harm = EF.stills.harm;
  }

  toRules() {
    const a = this.parent;
    return { id: a.id, name: a.name, kind: "pack", toughness: this.toughness.value, toughnessMax: this.toughness.max, masterId: this.masterId };
  }
}

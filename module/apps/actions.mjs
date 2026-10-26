/**
 * NIGHTWAKE — Player actions: the dialogs a player fills in before the
 * Storyteller's client resolves the action (module/gm/ops.mjs).
 * Players roll their own dice here; rerolls the book allows (Tide, Lucky) are
 * rolled here too, then the final faces go to the Storyteller's client.
 */
import { EF } from "../config.mjs";
import * as L from "../logic/rules.mjs";
import { OPS } from "../contracts.mjs";
import { getNight, request } from "../gm/ops.mjs";

const esc = s => foundry.utils.escapeHTML(String(s ?? ""));
const Dialog = () => foundry.applications.api.DialogV2;
const actor = id => game.actors.get(id);
const option = (a, extra = "") => `<option value="${a.id}">${esc(a.name)}${extra}</option>`;

async function rollDice(n) {
  const roll = await new Roll(`${n}d6`).evaluate();
  game.dice3d?.showForRoll?.(roll, game.user, true);
  return roll.dice[0].results.map(r => r.result);
}

function fightOrWarn() {
  const fight = getNight().fight;
  if (!fight) ui.notifications.warn("No fight is going on.");
  return fight;
}

/** Ch 3 "Resolving a Strike": declare, roll, reroll, then the Storyteller's client resolves it. */
export async function strikeFlow(a, { free = false } = {}) {
  const fight = fightOrWarn();
  if (!fight) return null;
  const sys = a.system;
  const enemies = [fight.masterId, ...fight.packIds].map(actor).filter(e => e && e.system.toughness.value > 0);
  if (!enemies.length) { ui.notifications.warn("No enemy is standing."); return null; }
  const allies = fight.fighterIds.filter(id => id !== a.id).map(actor).filter(Boolean);
  const helpers = allies.filter(o => !o.system.down && o.system.chi >= 1);
  const standing = [a, ...allies.filter(o => !o.system.down)];
  const el = EF.elements[sys.element];
  const guardText = e => ` (Guard ${L.guardFor(e.system.toRules(), sys.element)}, Toughness ${e.system.toughness.value})`;
  const rows = [
    `<label>Target <select name="target">${enemies.map(e => option(e, guardText(e))).join("")}</select></label>`,
    `<label><input type="checkbox" name="chiDie"> Chi die: 1 Chi for a bonus die (you have ${sys.chi})</label>`,
    el ? `<label><input type="checkbox" name="technique"> ${esc(el.techniqueLabel)} (1 Chi): ${esc(el.text)}</label>` : "",
    sys.element === "wood" ? `<label>Renewal heals <select name="renewalTarget">${standing.map(o => option(o)).join("")}</select></label>` : "",
    sys.element === "earth" ? `<label>Bulwark protects <select name="bulwarkTarget">${standing.map(o => option(o)).join("")}</select></label>` : "",
    sys.style === "sweeper" && enemies.length > 1 ? `<label>Sweeper's 1 damage goes to <select name="sweeperTarget">${enemies.map(e => option(e)).join("")}</select></label>` : "",
    helpers.length ? `<fieldset><legend>Help (1 Chi each, from the helper)</legend>${helpers.map(h => `<label><input type="checkbox" name="help-${h.id}"> ${esc(h.name)} (${h.system.chi} Chi)</label>`).join("")}</fieldset>` : "",
    `<p class="hint">At most two bonus dice on a roll${free ? " (Quick's free Strike already has one)" : ""}.</p>`
  ];
  const choice = await Dialog().prompt({
    window: { title: `${a.name}: ${free ? "Quick's free Strike" : "Strike"}` },
    content: `<div class="elemental-fighters nw-dialog">${rows.join("")}</div>`,
    ok: {
      label: "Roll",
      callback: (event, button) => {
        const e = button.form.elements;
        return {
          targetId: e.target?.value, chiDie: !!e.chiDie?.checked, technique: !!e.technique?.checked,
          renewalTargetId: e.renewalTarget?.value ?? null, bulwarkTargetId: e.bulwarkTarget?.value ?? null,
          sweeperTargetId: e.sweeperTarget?.value ?? null,
          helperIds: helpers.filter(h => e[`help-${h.id}`]?.checked).map(h => h.id)
        };
      }
    }
  });
  if (!choice) return null;
  if (choice.sweeperTargetId === choice.targetId) choice.sweeperTargetId = enemies.find(e => e.id !== choice.targetId)?.id ?? null;
  const offered = (choice.chiDie ? 1 : 0) + choice.helperIds.length + (free ? EF.rules.quickDice : 0);
  if (offered > EF.rules.bonusCap) { ui.notifications.warn("At most two bonus dice on a roll (Chapter 3)."); return null; }
  const cost = (choice.chiDie ? 1 : 0) + (choice.technique ? 1 : 0);
  if (cost > sys.chi) { ui.notifications.warn(`${a.name} has only ${sys.chi} Chi.`); return null; }

  let faces = await rollDice(L.poolSize(offered));
  const rerolls = [];
  if (choice.technique && sys.element === "water") {
    const idx = L.tideRerolls(faces);
    if (idx.length) {
      const fresh = await rollDice(idx.length);
      rerolls.push(`Tide ${idx.map(i => faces[i]).join(", ")} to ${fresh.join(", ")}`);
      faces = L.applyRerolls(faces, idx, fresh);
    }
  }
  let lucky = false;
  if (sys.perk === "lucky" && !sys.luckyUsed) {
    const idx = L.luckyRerolls(faces);
    if (idx.length) {
      const yes = await Dialog().confirm({
        window: { title: "Lucky" },
        content: `<p>You rolled ${faces.join(", ")}. Use Lucky (once per fight) to reroll the ${idx.length} dice that aren't hits?</p>`
      });
      if (yes) {
        const fresh = await rollDice(idx.length);
        rerolls.push(`Lucky ${idx.map(i => faces[i]).join(", ")} to ${fresh.join(", ")}`);
        faces = L.applyRerolls(faces, idx, fresh);
        lucky = true;
      }
    }
  }
  return request(OPS.strike, { fighterId: a.id, ...choice, faces, free, lucky, rerolls });
}

/** Ch 3 Rally: a Down fighter gets up with 2 Vigour. */
export async function rallyFlow(a) {
  const fight = fightOrWarn();
  if (!fight) return null;
  const down = fight.fighterIds.map(actor).filter(o => o && o.id !== a.id && o.system.down);
  if (!down.length) { ui.notifications.warn("Nobody is Down."); return null; }
  const targetId = down.length === 1 ? down[0].id : await Dialog().prompt({
    window: { title: `${a.name}: Rally` },
    content: `<div class="elemental-fighters nw-dialog"><label>Rally <select name="target">${down.map(o => option(o)).join("")}</select></label></div>`,
    ok: { label: "Rally", callback: (event, button) => button.form.elements.target.value }
  });
  if (!targetId) return null;
  return request(OPS.rally, { fighterId: a.id, targetId });
}

export const awakenFlow = a => request(OPS.awaken, { fighterId: a.id });
export const sealFlow = a => request(OPS.holdSeal, { fighterId: a.id });

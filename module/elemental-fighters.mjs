/**
 * NIGHTWAKE
 * A tabletop roleplaying game by Richard Moore.
 * Foundry VTT game system: entry point.
 *
 * This file only wires things up: data models, sheets, settings and the
 * Storyteller's operations in "init"; the Night sheet button in "ready". Rules
 * logic lives in module/logic/ (Foundry-free); shared names in module/contracts.mjs.
 */

import { EF } from "./config.mjs";
import * as rules from "./logic/rules.mjs";
import { SYSTEM_ID, QUERY, SETTINGS } from "./contracts.mjs";
import { FighterData, UnmadeData, PackData } from "./data/models.mjs";
import { FighterSheet, UnmadeSheet, PackSheet } from "./apps/sheets.mjs";
import { NightTracker } from "./apps/night.mjs";
import { strikeFlow } from "./apps/actions.mjs";
import { defaultNight, getNight, request, runOp } from "./gm/ops.mjs";

let tracker = null;
function openNight() {
  tracker ??= new NightTracker();
  return tracker.render({ force: true });
}
function refreshOpen() {
  if (tracker?.rendered) tracker.render();
  for (const app of foundry.applications.instances?.values?.() ?? []) {
    if (app.rendered && (app instanceof FighterSheet)) app.render();
  }
}

/* -------------------------------------------- */
/*  Init                                        */
/* -------------------------------------------- */

Hooks.once("init", function () {
  console.log("Nightwake | Initialising the system.");
  CONFIG.EF = EF;

  Object.assign(CONFIG.Actor.dataModels, { fighter: FighterData, unmade: UnmadeData, pack: PackData });
  CONFIG.Actor.trackableAttributes = {
    fighter: { bar: ["vigor"], value: ["chi"] },
    unmade: { bar: ["toughness"], value: [] },
    pack: { bar: ["toughness"], value: [] }
  };

  const sheets = foundry.applications.apps.DocumentSheetConfig;
  sheets.registerSheet(Actor, SYSTEM_ID, FighterSheet, { types: ["fighter"], makeDefault: true, label: "Nightwake fighter" });
  sheets.registerSheet(Actor, SYSTEM_ID, UnmadeSheet, { types: ["unmade"], makeDefault: true, label: "Nightwake Warden or Heart" });
  sheets.registerSheet(Actor, SYSTEM_ID, PackSheet, { types: ["pack"], makeDefault: true, label: "Nightwake pack of Stills" });

  // The Night sheet: written only by the Storyteller's client.
  game.settings.register(SYSTEM_ID, SETTINGS.night, {
    scope: "world", config: false, type: Object, default: defaultNight(), onChange: refreshOpen
  });
  // Every automation can be switched off (then the cards still say what the book says).
  const toggle = (key, name, hint) => game.settings.register(SYSTEM_ID, key, { name, hint, scope: "world", config: true, type: Boolean, default: true });
  toggle(SETTINGS.autoApply, "Apply Strike results", "Damage, Vigor, Chi, Shells and Help are written automatically. Off: the card shows the result and you apply it by hand.");
  toggle(SETTINGS.autoEnemies, "Run the enemies' step", "At the end of each round the Warden or the Heart feeds, the Stills Swarm and the Surge is rolled and applied.");
  toggle(SETTINGS.autoClocks, "Keep the clocks", "Hours, long fights, the round-7 limit and dawn are kept and enforced.");
  toggle(SETTINGS.guardianPrompt, "Ask about the Guardian", "When a fighter would lose Vigor and a Guardian could take it, ask the Storyteller.");
  game.settings.register(SYSTEM_ID, SETTINGS.migration, { scope: "world", config: false, type: String, default: "" });

  CONFIG.queries[QUERY] = runOp;

  game.elementalFighters = Object.assign(game.elementalFighters ?? {}, {
    EF, id: SYSTEM_ID, rules, request, getNight, openNight,
    strike: actor => strikeFlow(actor)
  });
});

/* -------------------------------------------- */
/*  Ready                                       */
/* -------------------------------------------- */

Hooks.once("ready", function () {
  console.log("Nightwake | Ready.");
});

Hooks.on("updateActor", () => { if (tracker?.rendered) tracker.render(); });

// A button for the Night sheet at the top of the Actors directory.
Hooks.on("renderActorDirectory", (app, html) => {
  const root = html instanceof HTMLElement ? html : html?.[0];
  const bar = root?.querySelector?.(".header-actions");
  if (!bar || bar.querySelector?.("[data-nightwake-night]")) return;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.setAttribute("data-nightwake-night", "");
  btn.innerHTML = "The Night";
  btn.addEventListener("click", () => openNight());
  bar.appendChild(btn);
});

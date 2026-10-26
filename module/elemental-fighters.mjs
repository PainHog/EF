/**
 * NIGHTWAKE
 * A tabletop roleplaying game by Richard Moore.
 * Foundry VTT game system: entry point.
 *
 * This file only wires things up: data models, sheets, settings, token defaults
 * and the Storyteller's operations in "init"; the welcome note and the Night
 * sheet in "ready". Rules logic lives in module/logic/ (Foundry-free); shared
 * names in module/contracts.mjs.
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

/** Token settings a new actor starts with (the Storyteller can change them). */
const TOKEN = {
  fighter: { actorLink: true, disposition: 1, displayBars: 50, displayName: 30, bar1: { attribute: "vigor" } },
  unmade: { actorLink: true, disposition: -1, displayBars: 50, displayName: 30, bar1: { attribute: "toughness" } },
  pack: { actorLink: true, disposition: -1, displayBars: 50, displayName: 30, bar1: { attribute: "toughness" } }
};
const isDefaultArt = img => !img || img === EF.art.defaultFighter || img.startsWith("icons/svg/") || img.includes(`systems/${EF.id}/assets/elements/`);

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
  toggle(SETTINGS.autoApply, "Apply Strike results", "Damage, Vigour, Chi, Shells and Help are written automatically. Off: the card shows the result and you apply it by hand.");
  toggle(SETTINGS.autoEnemies, "Run the enemies' step", "At the end of each round the Warden or the Heart draws on its Stills, the Stills Swarm and the Surge is rolled and applied.");
  toggle(SETTINGS.autoClocks, "Keep the clocks", "Hours, long fights, the round-7 limit and dawn are kept and enforced.");
  toggle(SETTINGS.guardianPrompt, "Ask about the Guardian", "When a fighter would lose Vigour and a Guardian could take it, ask the Storyteller.");
  game.settings.register(SYSTEM_ID, SETTINGS.welcomed, { scope: "world", config: false, type: Boolean, default: false });
  game.settings.register(SYSTEM_ID, SETTINGS.migration, { scope: "world", config: false, type: String, default: "" });

  CONFIG.queries[QUERY] = runOp;

  game.elementalFighters = Object.assign(game.elementalFighters ?? {}, {
    EF, id: SYSTEM_ID, rules, request, getNight, openNight,
    strike: actor => strikeFlow(actor)
  });
});

/* -------------------------------------------- */
/*  Token defaults and portraits                */
/* -------------------------------------------- */

// A new actor gets the right token settings; a new fighter shows its element's badge once it has one.
Hooks.on("preCreateActor", (actor, data) => {
  const token = TOKEN[actor.type];
  if (!token) return;
  const changes = { prototypeToken: { ...token, ...(data.prototypeToken ?? {}) } };
  if (actor.type === "fighter" && isDefaultArt(data.img) && data.system?.element) changes.img = EF.art.element(data.system.element);
  if (changes.img || data.img) changes.prototypeToken.texture = { src: changes.img ?? data.img, ...(data.prototypeToken?.texture ?? {}) };
  actor.updateSource(changes);
});

// Picking an element swaps a default portrait for that element's badge (your own art is left alone).
Hooks.on("preUpdateActor", (actor, changes) => {
  if (actor.type !== "fighter") return;
  const el = foundry.utils.getProperty(changes, "system.element");
  if (!el || !isDefaultArt(changes.img ?? actor.img)) return;
  foundry.utils.setProperty(changes, "img", EF.art.element(el));
  if (isDefaultArt(actor.prototypeToken?.texture?.src)) foundry.utils.setProperty(changes, "prototypeToken.texture.src", EF.art.element(el));
});

/* -------------------------------------------- */
/*  Ready                                       */
/* -------------------------------------------- */

Hooks.once("ready", async function () {
  console.log("Nightwake | Ready.");
  if (!game.user.isGM) return;
  const night = getNight();
  if (night.started && !night.ending) openNight();
  if (!game.settings.get(SYSTEM_ID, SETTINGS.welcomed)) {
    await ChatMessage.create({
      whisper: [game.user.id],
      speaker: ChatMessage.getSpeaker({ alias: "Nightwake" }),
      content: `<div class="elemental-fighters nw-card nw-night"><h3>Welcome to Nightwake</h3><ul>
        <li>Open <strong>The Night</strong> from the button at the top of the Actors tab: it runs the whole night.</li>
        <li>The <strong>Nightwake guide</strong> compendium has <em>Playing Nightwake online</em> (how everything works here) and the <em>At the Table</em> reference.</li>
        <li>The <strong>Ready-made Fighters</strong> compendium has the five fighters from Chapter 2, ready to import.</li>
        <li>Each automation can be switched off in the system settings.</li></ul></div>`
    });
    await game.settings.set(SYSTEM_ID, SETTINGS.welcomed, true);
  }
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
  btn.innerHTML = `<i class="fa-solid fa-moon"></i> The Night`;
  btn.addEventListener("click", () => openNight());
  bar.appendChild(btn);
});

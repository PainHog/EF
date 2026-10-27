/**
 * NIGHTWAKE: Ready-made Nights. Adds the book's ready-made nights to the Night
 * sheet's choices when a night begins, each with its journal to read from.
 * The nights' data is copied from the book by tools/build-nights.mjs.
 */
import { NIGHTS } from "./nights-data.mjs";

Hooks.once("setup", () => {
  const api = game.elementalFighters;
  if (!api?.registerNight) {
    console.warn("Nightwake: Ready-made Nights needs the Nightwake game system, version 0.2 or later.");
    return;
  }
  for (const n of NIGHTS) api.registerNight(n.id, { label: n.label, anchors: n.anchors, journal: n.journal });
});

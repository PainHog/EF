/**
 * The Ready-made Nights module (modules/nightwake-nights/): its journals and data
 * are current copies of the book's Chapters 8 and 10, it registers its nights
 * with the system, and beginning a night with one sets up the Night sheet.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { installFoundry, Hooks, packDoc, dialogResponders, fakeForm, log } from "../tools/fake-foundry.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MOD = join(ROOT, "modules/nightwake-nights");
const { nightSources, BOOK_NIGHTS, parseNight } = await import("../tools/build-nights.mjs");

test("the module's journals and data are current copies of the book", () => {
  const { journals, dataJs } = nightSources();
  for (const doc of journals) assert.deepEqual(JSON.parse(readFileSync(join(MOD, "packs/_source", `${doc.key}.json`), "utf8")), doc, `${doc.key} is stale: run node tools/build-nights.mjs`);
  assert.equal(readFileSync(join(MOD, "scripts/nights-data.mjs"), "utf8"), dataJs, "nights-data.mjs is stale: run node tools/build-nights.mjs");
  assert.ok(existsSync(join(MOD, "packs/nights")), "compiled pack missing: run node tools/build-nights.mjs");
});

test("each ready-made night in the book has five Anchors, one per Shell, each shattered by the right element", async () => {
  const { EF } = await import("../module/config.mjs");
  const { anchorsProblem } = await import("../module/logic/rules.mjs");
  for (const b of BOOK_NIGHTS) {
    const html = readFileSync(join(ROOT, "book/src/chapters", b.file), "utf8");
    const n = parseNight(html);
    assert.equal(anchorsProblem(n.anchors), null, b.file);
    for (const [, shell, by] of html.matchAll(/<strong>Shell:<\/strong>\s*(\w+)[\s\S]*?<strong>Shattered by:<\/strong>\s*(\w+)/g)) {
      assert.equal(EF.elements[by.toLowerCase()].breaks, shell.toLowerCase(), `${b.file}: ${shell} is shattered by ${by}`);
    }
  }
  const ch8 = parseNight(readFileSync(join(ROOT, "book/src/chapters/33-ch08.html"), "utf8")).anchors.map(({ name, warden, shell }) => ({ name, warden, shell }));
  assert.deepEqual(EF.readyNight, ch8, "the system's built-in Anchors are Chapter 8's");
});

test("the free system's download never carries the paid module", () => {
  const wf = readFileSync(join(ROOT, ".github/workflows/release.yml"), "utf8");
  assert.match(wf, /-x "modules\/\*"/);
});

test("with the module on, the Storyteller can begin either ready-made night and read it", async () => {
  const { game } = installFoundry({ users: [{ id: "gm00000000000000", name: "Storyteller", isGM: true }] });
  await import("../module/elemental-fighters.mjs");
  await import("../modules/nightwake-nights/scripts/nights.mjs");
  Hooks.callAll("init"); Hooks.callAll("setup"); Hooks.callAll("ready");
  const api = game.elementalFighters;
  const { OPS } = await import("../module/contracts.mjs");
  const { NightTracker } = await import("../module/apps/night.mjs");
  assert.deepEqual(Object.keys(api.EF.nights), ["clocks", "tide"]);
  assert.match(api.EF.nights.tide.journal, /^Compendium\.nightwake-nights\.nights\.JournalEntry\.[0-9a-f]{16}$/);
  assert.throws(() => api.registerNight("bad", { label: "Bad", anchors: api.EF.readyNight.slice(0, 4) }), /exactly 5 Anchors/);

  const ids = [];
  for (const k of ["01-dani", "02-marcus", "04-priya"]) ids.push((await Actor.create(packDoc("fighters", k, "fighter"))).id);
  // the Begin dialog offers the nights; pick the second one
  dialogResponders.push(opts => {
    assert.match(opts.content, /The Night the Tide Stood Still/);
    return opts.ok.callback({}, { form: fakeForm({ difficulty: "standard", preset: "tide", ...Object.fromEntries(ids.map(id => [`f-${id}`, true])) }) });
  });
  const t = new NightTracker();
  await t.render();
  await t.options.actions.beginNight.call(t);
  const night = api.getNight();
  assert.equal(night.preset, "tide");
  assert.deepEqual(night.anchors.map(a => a.name), ["The Old Pier", "The Beach Bonfire", "The Sea Wall", "The Harbour Crane", "The Lido"]);
  assert.ok(night.anchors.every(a => a.broken === false));
  await t.render();
  assert.match(t.element.innerHTML, /The Night the Tide Stood Still/);
  assert.match(t.element.innerHTML, /data-action="readNight"/);
  const bad = await api.request(OPS.beginNight, { difficulty: "standard", fighterIds: ids, preset: "nonsense" });
  assert.equal(bad.ok, false);
  assert.deepEqual(log.errors, []);
});

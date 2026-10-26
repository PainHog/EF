/**
 * Art slots (book/tools/art-slots.mjs): the size table in ART-BRIEF.md is current,
 * every picture the book and the online version use has a slot, and finished
 * pictures are read and checked correctly.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { BRIEF, briefWithTable, allSlots, slotFor, imageSize, checkFinal } from "../book/tools/art-slots.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

test("ART-BRIEF.md's size table is current", () => {
  const text = readFileSync(BRIEF, "utf8");
  assert.equal(text, briefWithTable(text), "run node book/tools/art-slots.mjs");
});

test("every picture the chapters use has a slot and a placeholder", () => {
  const names = new Set(allSlots().map(s => s.name));
  const chapters = readdirSync(join(ROOT, "book/src/chapters")).map(f => readFileSync(join(ROOT, "book/src/chapters", f), "utf8")).join("\n");
  for (const [, name] of chapters.matchAll(/data-art="([^"]+)"/g)) assert.ok(names.has(name), name);
  const spots = readFileSync(join(ROOT, "book/build.mjs"), "utf8").match(/const SPOTS = \{([\s\S]*?)\};/)[1];
  for (const [, name] of spots.matchAll(/"(spot-[a-z-]+)"/g)) assert.ok(names.has(name), name);
});

test("the slot sizes follow the layout", () => {
  assert.deepEqual(slotFor("ch-city").px, [2142, 540], "7.14 × 1.8in at 300 ppi");
  assert.deepEqual(slotFor("cover-night").px.map(Math.round), [2625, 3398], "8.75in wide with the bleed");
  assert.equal(slotFor("pc-dani").round, true);
  assert.throws(() => slotFor("nonsense-name"));
});

test("finished pictures: PNG, JPEG and WebP sizes, and the checks", () => {
  const dir = mkdtempSync(join(tmpdir(), "nw-art-"));
  execFileSync("python3", ["-I", "-c", `
import sys
from PIL import Image
for ext in ("png", "jpg", "webp"):
    Image.new("RGB", (321, 123), (9, 9, 9)).save(f"{sys.argv[1]}/x.{ext}")
`, dir]);
  for (const ext of ["png", "jpg", "webp"]) assert.deepEqual(imageSize(readFileSync(join(dir, `x.${ext}`))), [321, 123], ext);
  const slot = slotFor("ch-city");
  assert.deepEqual(checkFinal(slot, { w: 2142, h: 540 }), []);
  const small = checkFinal(slot, { w: 1071, h: 270 });
  assert.match(small[0], /smaller than the 2142×540 px it needs \(150 ppi/);
  assert.match(checkFinal(slot, { w: 2400, h: 2400 }).at(-1), /taller than the slot/);
});

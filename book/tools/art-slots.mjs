/**
 * NIGHTWAKE — art slots: every picture the book and the online version use, the
 * size each one is shown at, and where the finished art goes.
 *
 * Every picture has a name (cover-night, ch-city, el-wood, token-heart …). The
 * drawn placeholder is book/art/<name>.svg (or, for online-only pictures, drawn
 * by tools/build-assets.mjs). A finished picture saved as
 * book/art/final/<name>.png|.jpg|.webp replaces the placeholder everywhere: the
 * book build (book/build.mjs) and the online art (tools/build-assets.mjs) both
 * look there first. The finished picture is fitted to the placeholder's shape
 * (cropped to fill, never stretched), so the pages can't move.
 *
 *   node book/tools/art-slots.mjs    rewrite the size table in book/art/ART-BRIEF.md
 *
 * The sizes follow book/src/book.css and book/build.mjs: change them together.
 */
import { readFileSync, readdirSync, existsSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const BOOK = join(dirname(fileURLToPath(import.meta.url)), "..");
export const ART = join(BOOK, "art");
export const FINAL = join(ART, "final");
export const BRIEF = join(ART, "ART-BRIEF.md");
export const PPI = 300;                       // print wants 300 pixels per inch at the size shown
const BLEED = 0.125;                          // build.mjs --print
const TEXT_W = 8.5 - 2 * 0.68;                // book.css @page side margins
export const ELEMENTS = ["wood", "fire", "earth", "metal", "water"];

/** Each kind of slot, by the first part of the picture's name. */
export const KINDS = {
  cover:   { where: "Front cover, full bleed, 0.125in trimmed off every edge", widthIn: 8.5 + 2 * BLEED },
  back:    { where: "Back cover: a framed panel under the blurb", widthIn: 4.4 - 2 * 0.12 },
  part:    { where: "Part title pages: on the dark page under the title", widthIn: 6.7 },
  ch:      { where: "Chapter openers: a banner across the top of the chapter", widthIn: TEXT_W, heightIn: 1.8, frame: true },
  spot:    { where: "End-of-chapter pictures, placed where a chapter leaves room (shown up to this size)", heightIn: 5.3 },
  el:      { where: "Element badges: each element's entry in Chapters 2 and 8; online, a fighter's portrait until they choose one", px: [512, 512], printIn: 1.05, round: true },
  pc:      { where: "Ready-made fighters: their entries in Chapter 2; online, their portraits and tokens", px: [512, 512], printIn: 1.2, round: true },
  token:   { where: "Online only: tokens on the map", px: [512, 512], round: true },
  foundry: { where: "Online only: the game's background picture in Foundry VTT", px: [1920, 1080] }
};

/** The online-only pictures (no book placeholder; tools/build-assets.mjs draws theirs). */
export const ONLINE_ONLY = ["token-still", "token-heart", ...ELEMENTS.map(e => `token-warden-${e}`), "foundry-background"];

/** Width / height of a placeholder SVG (from its viewBox), or null. */
export function placeholderBox(name) {
  const file = join(ART, `${name}.svg`);
  if (!existsSync(file)) return null;
  const m = readFileSync(file, "utf8").match(/viewBox="\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)"/);
  return m ? [Number(m[1]), Number(m[2])] : null;
}

/** Pixel size of a PNG, JPEG or WebP file, read from its header. */
export function imageSize(buf) {
  if (buf.readUInt32BE(0) === 0x89504e47) return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    for (let o = 2; o < buf.length - 9;) {
      if (buf[o] !== 0xff) { o++; continue; }
      const m = buf[o + 1];
      if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return [buf.readUInt16BE(o + 7), buf.readUInt16BE(o + 5)];
      o += 2 + buf.readUInt16BE(o + 2);
    }
  }
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8 ") return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff];
    if (chunk === "VP8L") { const b = buf.readUInt32LE(21); return [(b & 0x3fff) + 1, ((b >> 14) & 0x3fff) + 1]; }
    if (chunk === "VP8X") return [1 + buf.readUIntLE(24, 3), 1 + buf.readUIntLE(27, 3)];
  }
  throw new Error("not a PNG, JPEG or WebP file");
}

const MIME = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp" };

/** The finished picture for a slot, if one has been saved in book/art/final/. */
export function finalArt(name) {
  if (!existsSync(FINAL)) return null;
  const file = readdirSync(FINAL).find(f => f.slice(0, f.lastIndexOf(".")) === name && MIME[f.slice(f.lastIndexOf(".") + 1).toLowerCase()]);
  if (!file) return null;
  const path = join(FINAL, file);
  const buf = readFileSync(path);
  const [w, h] = imageSize(buf);
  return { path, file, mime: MIME[file.slice(file.lastIndexOf(".") + 1).toLowerCase()], w, h, buf };
}

/** Where a picture is shown, how big, and the pixels it needs. */
export function slotFor(name) {
  const kind = name.split("-")[0];
  const k = KINDS[kind];
  if (!k) throw new Error(`art slot: "${name}" doesn't start with a known kind (${Object.keys(KINDS).join(", ")})`);
  const box = placeholderBox(name);
  if (k.px) return { name, kind, where: k.where, px: k.px, aspect: k.px[0] / k.px[1], widthIn: null, heightIn: null, printIn: k.printIn ?? null, round: !!k.round, box: box ?? k.px };
  const aspect = k.frame ? k.widthIn / k.heightIn : box[0] / box[1];
  const widthIn = k.widthIn ?? k.heightIn * aspect;
  const heightIn = k.heightIn ?? widthIn / aspect;
  // the box the finished picture fills: the placeholder's own shape, or the frame's
  const fill = k.frame ? [Math.round(widthIn * 100), Math.round(heightIn * 100)] : box;
  return { name, kind, where: k.where, aspect, widthIn, heightIn, px: [Math.ceil(widthIn * PPI), Math.ceil(heightIn * PPI)], round: false, box: fill };
}

/** Every picture: the book's placeholders, then the online-only ones. */
export function allSlots() {
  const book = readdirSync(ART).filter(f => f.endsWith(".svg")).map(f => f.slice(0, -4)).sort();
  return [...book, ...ONLINE_ONLY].map(slotFor);
}

/** Problems with a finished picture: too few pixels for print, or a shape that will be cropped a lot. */
export function checkFinal(slot, art) {
  const out = [];
  const [needW, needH] = slot.px;
  if (art.w < needW || art.h < needH) {
    const ppi = slot.widthIn ? Math.floor(Math.min(art.w / slot.widthIn, art.h / slot.heightIn)) : null;
    out.push(`${slot.name}: ${art.w}×${art.h} px is smaller than the ${needW}×${needH} px it needs${ppi ? ` (${ppi} ppi in print; 300 wanted)` : ""}`);
  }
  const off = (art.w / art.h) / slot.aspect - 1;
  if (Math.abs(off) > 0.05) out.push(`${slot.name}: its shape is ${Math.round(Math.abs(off) * 100)}% ${off > 0 ? "wider" : "taller"} than the slot, so the ${off > 0 ? "sides" : "top and bottom"} are cropped`);
  return out;
}

const ratio = a => {
  for (const [w, h] of [[1, 1], [4, 3], [3, 1], [16, 9], [612, 792]]) if (Math.abs(a - w / h) < 0.01) return w === 612 ? "8.5 : 11" : `${w} : ${h}`;
  return `${a.toFixed(2)} : 1`;
};
const shown = s => (s.widthIn ? `${s.widthIn.toFixed(2)} × ${s.heightIn.toFixed(2)} in` : s.printIn ? `${s.printIn} in wide in print; on screen online` : "on screen");

/** The size table for ART-BRIEF.md: one row per kind of slot. */
export function slotTable() {
  const groups = new Map();
  for (const s of allSlots()) {
    const key = `${s.where}|${shown(s)}|${s.px}|${s.aspect}`;
    if (!groups.has(key)) groups.set(key, { s, names: [] });
    groups.get(key).names.push(`\`${s.name}\``);
  }
  const rows = [...groups.values()].map(({ s, names }) => `| ${names.join(", ")} | ${s.where} | ${shown(s)} | ${s.px[0]} × ${s.px[1]} | ${ratio(s.aspect)}${s.round ? ", cut to a circle" : ""} |`);
  return ["| Pictures | Where they go | Shown at | Pixels needed (at least) | Shape |", "|---|---|---|---|---|", ...rows].join("\n");
}

const START = "<!-- slots:start (written by node book/tools/art-slots.mjs) -->", END = "<!-- slots:end -->";
export function briefWithTable(text) {
  const a = text.indexOf(START), b = text.indexOf(END);
  if (a < 0 || b < a) throw new Error("ART-BRIEF.md has no slots markers");
  return `${text.slice(0, a + START.length)}\n${slotTable()}\n${text.slice(b)}`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  writeFileSync(BRIEF, briefWithTable(readFileSync(BRIEF, "utf8")));
  console.log(`Size table written to ${BRIEF}.`);
}

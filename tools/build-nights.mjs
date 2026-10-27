/**
 * NIGHTWAKE — the Ready-made Nights module (modules/nightwake-nights/): a separate,
 * paid Foundry module with the book's ready-made nights (DESIGN D46). The free
 * system keeps the rules; this module adds the nights to read and run.
 *
 * Its journals and night data are copied from the book (Chapters 8 and 10), so the
 * text stays in one place; test/nights.test.mjs checks the copy is current.
 *
 *   node tools/build-nights.mjs          write the sources and data, compile the pack
 *   node tools/build-nights.mjs --zip    also package dist/nightwake-nights-<version>.zip
 */
import { compilePack } from "@foundryvtt/foundryvtt-cli";
import { readFileSync, writeFileSync, mkdirSync, rmSync, mkdtempSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ROOT, makeId, toCliDoc } from "./pack-config.mjs";

export const MODULE = join(ROOT, "modules", "nightwake-nights");
const SRC = join(MODULE, "packs", "_source");
const PACK = { file: "nights", out: "nights", collection: "journal", type: "JournalEntry", subtype: null };
const manifest = JSON.parse(readFileSync(join(MODULE, "module.json"), "utf8"));

/** The book's ready-made nights, in the order they appear. */
export const BOOK_NIGHTS = [
  { id: "clocks", key: "01-clocks", file: "33-ch08.html" },
  { id: "tide", key: "02-tide", file: "35-ch10.html" }
];

const tidy = html => html
  .replace(/<span class="sep">·<\/span>/g, "·")
  .replace(/ class="[^"]*"/g, "")
  .split("\n").map(l => l.trim()).filter(Boolean).join("\n");

/** One ready-made night from its chapter: title, Anchors and the sections in order. */
export function parseNight(html) {
  const pick = re => html.match(re)?.[1]?.trim() ?? "";
  const title = pick(/<h2>([\s\S]*?)<\/h2>/), chapter = pick(/<p class="chapter-num">([\s\S]*?)<\/p>/);
  const epigraph = pick(/<p class="epigraph">([\s\S]*?)<\/p>/), opener = pick(/<p class="opener">([\s\S]*?)<\/p>/);
  if (!title || !chapter) throw new Error("build-nights: a ready-made night has no title or chapter number");
  const anchors = [];
  let body = html.slice(html.indexOf("</header>") + "</header>".length, html.lastIndexOf("</section>"));
  body = body.replace(/<p class="(?:epigraph|opener)">[\s\S]*?<\/p>/g, "");
  body = body.replace(/<article class="entry"[^>]*>([\s\S]*?)<\/article>/g, (m, inner) => {
    const name = inner.match(/<h3>([\s\S]*?)<\/h3>/)?.[1];
    const shell = inner.match(/<strong>Shell:<\/strong>\s*(\w+)/)?.[1]?.toLowerCase();
    const warden = inner.match(/The Warden is <strong>([\s\S]*?)<\/strong>/)?.[1];
    if (!name || !shell || !warden) throw new Error(`build-nights: an Anchor in "${title}" lacks a name, Shell or Warden`);
    anchors.push({ name, warden, shell, html: tidy(inner.replace(/<figure[\s\S]*?<\/figure>/, "").replace(/<h3>[\s\S]*?<\/h3>/, "")) });
    return `@@anchor-${anchors.length - 1}@@`;
  });
  const parts = body.split(/<h3>([\s\S]*?)<\/h3>/);
  const sections = [];
  for (let i = 1; i < parts.length; i += 2) sections.push({ name: parts[i].trim(), html: parts[i + 1] });
  return { title, chapter, epigraph, opener, anchors, sections };
}

const badge = shell => `<img src="systems/elemental-fighters/assets/elements/${shell}.webp" alt="" width="96" height="96" style="float:right;border:none;margin:0 0 6px 10px">`;

/** The journal for one night: an opening page, then a page per section and per Anchor. */
export function nightJournal({ key, file }) {
  const n = parseNight(readFileSync(join(ROOT, "book", "src", "chapters", file), "utf8"));
  const pages = [{
    key: "tonight", name: "Tonight",
    text: { format: 1, content: tidy(`<p><em>${n.epigraph}</em></p>\n<p>${n.opener}</p>\n<p><strong>Online:</strong> when you begin the night on the Night sheet, choose “${n.title}” under Anchors. The Night sheet is then set up with these Anchors and their Wardens, and its <em>Read the night</em> button opens this journal.</p>\n<p><em>From ${n.chapter} of the rulebook.</em></p>`) }
  }];
  n.sections.forEach((s, i) => {
    const anchorList = n.anchors.map(a => `<li><strong>${a.name}</strong>: ${a.warden} · ${a.shell[0].toUpperCase() + a.shell.slice(1)} Shell</li>`).join("");
    const html = s.html.replace(/(\s*@@anchor-\d+@@\s*)+/, `\n<ul>${anchorList}</ul>\n`);
    pages.push({ key: `s${i + 1}`, name: s.name, text: { format: 1, content: tidy(html) } });
    if (/@@anchor-/.test(s.html)) n.anchors.forEach((a, j) => pages.push({ key: `a${j + 1}`, name: a.name, text: { format: 1, content: `${badge(a.shell)}\n${a.html}` } }));
  });
  return { key, name: n.title, pages, night: { label: n.title, anchors: n.anchors.map(({ name, warden, shell }) => ({ name, warden, shell })) } };
}

/** Everything the module carries from the book: journal sources and the nights' data. */
export function nightSources() {
  const journals = BOOK_NIGHTS.map(nightJournal);
  const data = BOOK_NIGHTS.map((b, i) => ({
    id: b.id, label: journals[i].night.label, anchors: journals[i].night.anchors,
    journal: `Compendium.${manifest.id}.${PACK.out}.JournalEntry.${makeId(PACK.out, b.key)}`
  }));
  const dataJs = `// Written by tools/build-nights.mjs from the book (Chapters 8 and 10). Don't edit by hand.\nexport const NIGHTS = ${JSON.stringify(data, null, 2)};\n`;
  return { journals: journals.map(({ night, ...doc }) => doc), dataJs };
}

async function build({ zip = false } = {}) {
  const { journals, dataJs } = nightSources();
  rmSync(SRC, { recursive: true, force: true });
  mkdirSync(SRC, { recursive: true });
  for (const doc of journals) writeFileSync(join(SRC, `${doc.key}.json`), JSON.stringify(doc, null, 2) + "\n");
  writeFileSync(join(MODULE, "scripts", "nights-data.mjs"), dataJs);

  const staging = mkdtempSync(join(tmpdir(), "nw-nights-"));
  try {
    journals.forEach((raw, i) => writeFileSync(join(staging, `${raw.key}.json`), JSON.stringify(toCliDoc(PACK, raw, i), null, 2)));
    const out = join(MODULE, "packs", PACK.out);
    rmSync(out, { recursive: true, force: true });
    await compilePack(staging, out, { log: false });
  } finally {
    rmSync(staging, { recursive: true, force: true });
  }
  console.log(`Built the ${manifest.title} pack: ${journals.length} nights, ${journals.reduce((s, j) => s + j.pages.length, 0)} pages.`);

  if (zip) {
    const dist = join(ROOT, "dist");
    mkdirSync(dist, { recursive: true });
    const file = join(dist, `${manifest.id}-${manifest.version}.zip`);
    rmSync(file, { force: true });
    execFileSync("zip", ["-qr", file, manifest.id, "-x", "*/packs/_source/*", "*/LOCK", "*/LOG", "*/LOG.old", "*/.gitkeep"], { cwd: join(ROOT, "modules") });
    console.log(`Packaged ${file}`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) await build({ zip: process.argv.includes("--zip") });

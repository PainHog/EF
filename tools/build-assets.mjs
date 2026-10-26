/**
 * NIGHTWAKE — Art for the online version.
 * Writes assets/ (shipped in system.zip) as WebP: element badges, the ready-made
 * fighters, tokens for Stills, Wardens and the Heart, and the system background.
 *
 * Each picture is an art slot (book/tools/art-slots.mjs). A finished picture in
 * book/art/final/<name>.png|jpg|webp is used when there is one (cropped to fill,
 * never stretched); otherwise the placeholder is drawn: the book's SVG, or for
 * the online-only pictures the drawings in book/tools/art-gen/scenes/nightwake.mjs.
 * The file names never change, so the system's paths (module/config.mjs) and the
 * ready-made fighters keep working.
 *   node tools/build-assets.mjs
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync, rmSync, mkdtempSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { tokenStill, tokenWarden, tokenHeart, systemBackground } from "../book/tools/art-gen/scenes/nightwake.mjs";
import { ART, ELEMENTS, finalArt, slotFor } from "../book/tools/art-slots.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "assets");
const FIGHTERS = ["dani", "marcus", "jun", "priya", "sam"];

/** art slot → the file it becomes, and the placeholder drawing if it has no finished picture. */
const JOBS = [
  ...ELEMENTS.map(el => ({ name: `el-${el}`, out: `elements/${el}.webp` })),
  ...FIGHTERS.map(pc => ({ name: `pc-${pc}`, out: `fighters/${pc}.webp` })),
  { name: "token-still", out: "tokens/still.webp", draw: tokenStill },
  { name: "token-heart", out: "tokens/heart.webp", draw: tokenHeart },
  ...ELEMENTS.map(el => ({ name: `token-warden-${el}`, out: `tokens/warden-${el}.webp`, draw: () => tokenWarden(el) })),
  { name: "foundry-background", out: "background.webp", draw: systemBackground, opaque: true }
];

const tmp = mkdtempSync(join(tmpdir(), "nw-assets-"));
const CHROME = process.env.CHROME_PATH ?? (existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined);
const browser = await chromium.launch(CHROME ? { executablePath: CHROME } : {});
const convert = [];
let finished = 0;
try {
  for (const job of JOBS) {
    const slot = slotFor(job.name), [w, h] = slot.px;
    const art = finalArt(job.name);
    let src;
    if (art) {
      src = art.path;
      finished++;
    } else {
      // draw the placeholder at the size wanted, on a transparent page
      const svg = (job.draw ? job.draw() : readFileSync(join(ART, `${job.name}.svg`), "utf8"))
        .replace(/<\?xml[^>]*\?>/, "").replace(/<svg\b/, `<svg width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice"`);
      const page = await browser.newPage({ viewport: { width: w, height: h } });
      await page.setContent(`<!doctype html><html><body style="margin:0;background:transparent">${svg}</body></html>`);
      src = join(tmp, `${job.name}.png`);
      writeFileSync(src, await page.screenshot({ type: "png", omitBackground: !job.opaque, clip: { x: 0, y: 0, width: w, height: h } }));
      await page.close();
    }
    mkdirSync(dirname(join(OUT, job.out)), { recursive: true });
    convert.push({ src, out: join(OUT, job.out), w, h, opaque: !!job.opaque, round: slot.round && !!art });
  }
} finally {
  await browser.close();
}

// Crop to fill and save as WebP with Pillow (pip install pillow), the tool the book's contact sheets use.
const jobsFile = join(tmp, "jobs.json");
writeFileSync(jobsFile, JSON.stringify(convert));
execFileSync("python3", ["-I", "-c", `
import json, sys
from PIL import Image, ImageOps, ImageDraw, ImageChops
for j in json.load(open(sys.argv[1])):
    im = Image.open(j["src"])
    im = im.convert("RGB") if j["opaque"] else im.convert("RGBA")
    im = ImageOps.fit(im, (j["w"], j["h"]), Image.LANCZOS)
    if j["round"]:   # a finished badge or token is cut to a circle, like its placeholder
        mask = Image.new("L", im.size, 0)
        ImageDraw.Draw(mask).ellipse((0, 0, im.size[0] - 1, im.size[1] - 1), fill=255)
        im.putalpha(ImageChops.multiply(im.getchannel("A"), mask))
    im.save(j["out"], "WEBP", quality=86, method=6)
`, jobsFile]);
rmSync(tmp, { recursive: true, force: true });
console.log(`wrote assets/: ${JOBS.length} pictures (${finished} finished, ${JOBS.length - finished} placeholders)`);

/**
 * NIGHTWAKE — Art for the online version.
 * Writes assets/ (shipped in system.zip): the book's element and ready-made
 * fighter emblems as actor images, token art for Stills, Wardens and the Heart
 * (drawn by book/tools/art-gen/scenes/nightwake.mjs), and the system background
 * as a WebP rendered with Chromium. Replace any file to change the art; keep the
 * names, or change the paths in module/config.mjs.
 *   node tools/build-assets.mjs
 */
import { mkdirSync, writeFileSync, copyFileSync, existsSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";
import { tokenStill, tokenWarden, tokenHeart, systemBackground } from "../book/tools/art-gen/scenes/nightwake.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "assets");
const ART = join(ROOT, "book", "art");
for (const d of ["elements", "fighters", "tokens"]) mkdirSync(join(OUT, d), { recursive: true });

const EL = ["wood", "fire", "earth", "metal", "water"];
for (const el of EL) copyFileSync(join(ART, `el-${el}.svg`), join(OUT, "elements", `${el}.svg`));
for (const pc of ["dani", "marcus", "jun", "priya", "sam"]) copyFileSync(join(ART, `pc-${pc}.svg`), join(OUT, "fighters", `${pc}.svg`));
writeFileSync(join(OUT, "tokens", "still.svg"), tokenStill());
writeFileSync(join(OUT, "tokens", "heart.svg"), tokenHeart());
for (const el of EL) writeFileSync(join(OUT, "tokens", `warden-${el}.svg`), tokenWarden(el));

// The background as WebP (Foundry shows it on the setup screen and behind the world).
const svgPath = join(OUT, ".background.svg");
writeFileSync(svgPath, systemBackground());
const CHROME = process.env.CHROME_PATH ?? (existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined);
const browser = await chromium.launch(CHROME ? { executablePath: CHROME } : {});
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(pathToFileURL(svgPath).href);
const png = await page.screenshot({ type: "png" });
await browser.close();
const pngPath = join(OUT, ".background.png");
writeFileSync(pngPath, png);
// PNG to WebP with Pillow (pip install pillow), the same tool the book's contact sheets use.
execFileSync("python3", ["-I", "-c", "import sys; from PIL import Image; Image.open(sys.argv[1]).convert('RGB').save(sys.argv[2], 'WEBP', quality=86)", pngPath, join(OUT, "background.webp")]);
rmSync(pngPath); rmSync(svgPath);
console.log("wrote assets/: 5 element emblems, 5 fighter emblems, 7 tokens, background.webp");

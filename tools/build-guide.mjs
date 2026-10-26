/**
 * NIGHTWAKE — the guide compendium's source (packs/_source/guide/).
 *
 * "Playing Nightwake online" is written here: it is about the online version
 * itself, so this is its one place. "At the Table" is copied from the book's
 * reference card (book/src/chapters/40-sheets.html) so the rule text stays in
 * one place; test/smoke.test.mjs checks the copy matches the book.
 *
 * Usage: node tools/build-guide.mjs   (build-packs.mjs runs it first)
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { ROOT, SRC } from "./pack-config.mjs";

/** The reference card's columns from the book, as journal HTML. */
export function atTheTableHtml() {
  const html = readFileSync(join(ROOT, "book/src/chapters/40-sheets.html"), "utf8");
  const card = html.match(/<section class="sheet ref" id="sheet-reference">([\s\S]*?)<\/section>/)?.[1];
  const intro = card?.match(/<p class="sheet-intro">([\s\S]*?)<\/p>/)?.[1];
  const cols = card?.match(/<div class="ref-cols">([\s\S]*?)<\/div>/)?.[1];
  if (!intro || !cols) throw new Error("build-guide: the At the Table card wasn't found in 40-sheets.html");
  const body = cols.trim().split("\n").map(l => l.trim()).filter(Boolean)
    .map(l => l.replace(/^<h4>(.*)<\/h4>$/, "<h2>$1</h2>")).join("\n");
  return `<p><em>${intro.trim()}</em></p>\n${body}`;
}

const ONLINE = `<p>The online version keeps the book's numbers for you: it rolls the dice, applies damage, Vigour and Chi, runs the enemies' step and keeps the clocks. Each step posts a card saying what happened and why, so the table can check it against the book. When the book and the online version disagree, the book is right.</p>
<h2>Before the first night (Storyteller)</h2>
<ol>
<li><strong>Fighters.</strong> Import the five from the <em>Ready-made Fighters</em> compendium, or create Actors of type Fighter and choose four picks each: an element, a fighting style, a perk and an Awakening. No two fighters in a group share any pick.</li>
<li><strong>Owners.</strong> Give each player Owner permission on their fighter. Players use their own fighter's sheet; the Storyteller can act for anyone.</li>
<li><strong>Art.</strong> Click a portrait on any sheet to choose a picture. A fighter with no picture shows their element's badge. Tokens are linked to their actors, so Vigour and Toughness bars follow the sheets.</li>
</ol>
<h2>Running the night</h2>
<p>Open <strong>The Night</strong> from the button at the top of the Actors tab. Its top line always says what comes next.</p>
<ol>
<li><strong>Begin the night.</strong> Pick the difficulty and three to five fighters. Everyone's Vigour and Chi are set from the size table. To use Anchors of your own (Chapter 9), press <em>Name the Anchors</em> first; each Anchor keeps one Shell element.</li>
<li><strong>The Prologue,</strong> then <strong>The First Clash.</strong> Starting a fight makes its enemies (a Pack of Stills, and the Warden or the Heart) and puts them in the Actors tab. Drag them onto a scene if you want tokens; the fight doesn't need a map.</li>
<li><strong>The Hunt.</strong> Each Hour, press <em>Go</em> beside an Anchor or <em>Take a Respite</em>. The Night sheet counts the Hours, long fights and any Hour owed.</li>
<li><strong>The Heart.</strong> When the Hunt is over, press <em>The Heart</em>. Dawn comes at the end of the round shown.</li>
</ol>
<h2>A round</h2>
<ul>
<li><strong>Fighters act</strong> from their sheets, in any order the players like: <em>Strike</em>, <em>Rally</em>, <em>Awaken</em>, or <em>Hold the Seal</em>. The Strike window offers the Chi die, your technique and Help from allies who have Chi; the helper's Chi is spent for them. Quick fighters get <em>Quick: free Strike</em> before round 1.</li>
<li><strong>End the round</strong> on the Night sheet: Awakenings count down, the enemies take their step (drawing on their Stills, the Swarm and the Surge), and the clocks are checked. At an Anchor you can <em>End the round and withdraw</em>.</li>
<li><strong>Guardian.</strong> When a Guardian could take a loss, the Storyteller is asked first.</li>
<li><strong>By hand.</strong> Click a pip on a sheet to set Vigour or Chi; clicking the top lit pip takes one away. Use it for rulings and mistakes.</li>
</ul>
<h2>Settings</h2>
<p>Under the system settings, each automation can be switched off. The cards still say what the book says; you apply it by hand.</p>
<ul>
<li><strong>Apply Strike results:</strong> damage, Vigour, Chi, Shells and Help.</li>
<li><strong>Run the enemies' step:</strong> drawing on Stills, the Swarm and the Surge.</li>
<li><strong>Keep the clocks:</strong> Hours, long fights, the round-7 limit and dawn.</li>
<li><strong>Ask about the Guardian:</strong> the prompt when a Guardian could take a loss.</li>
</ul>
<h2>If something goes wrong</h2>
<ul>
<li>Nothing happens when a player presses a button: the Storyteller must be connected, because every result is worked out on the Storyteller's side.</li>
<li>A wrong result: fix it on the sheets by hand and carry on. The cards keep a record of every step.</li>
</ul>`;

export function guideDocs() {
  return [
    { key: "01-playing-online", name: "Playing Nightwake online", pages: [{ key: "online", name: "Playing Nightwake online", text: { format: 1, content: ONLINE } }] },
    { key: "02-at-the-table", name: "At the Table", pages: [{ key: "table", name: "At the Table", text: { format: 1, content: atTheTableHtml() } }] }
  ];
}

export function writeGuide() {
  const dir = join(SRC, "guide");
  mkdirSync(dir, { recursive: true });
  for (const doc of guideDocs()) writeFileSync(join(dir, `${doc.key}.json`), JSON.stringify(doc, null, 2) + "\n");
}

if (import.meta.url === `file://${process.argv[1]}`) { writeGuide(); console.log("Guide source written."); }

# Nightwake (working title; repo name Elemental Fighters): working rules

Author and designer: **Richard Moore**. This is his fourth tabletop RPG. Three earlier games were reviewed with simulators and agent playtests: *Heisty Spideys* (finished, with a fully automated Foundry VTT system), *Don't Get Forked* and *Nine Lives Gang*. The same mistakes kept turning up, and the lessons are written down in this repository.

**Read these before any work:**
1. `docs/DESIGN.md`: the pitch, name check, decisions and their reasons.
2. `docs/CORE-RULES.md`: the one-page core rules (the rules until chapters exist).
3. `docs/DESIGN-RULES.md`: Part A hard rules, Part B questions the core rules must answer, Part C process, Part D release gates. **They are this project's rules.**
4. `sim/REPORT.md`: the latest balance numbers against the targets.
5. `book/art/ART-CHECKLIST.md`: before any art.
6. `docs/REVIEW-PROCEDURE.md`: after every version.

## Keep Richard's other games separate
- *Heisty Spideys* (SpideyHeist), *Don't Get Forked* (DontGetForked) and *Nine Lives Gang* are separate products. If one is ever attached to a session, it is **read-only reference**: never edit, commit to, push to, branch or release from it.
- Copy anything useful into this repository (with a note of where it came from) and adapt the copy. Never import from or link to their files.
- If another game seems to need a change, stop and tell Richard.

## Who decides
- **On 2026-10-22 Richard delegated the design decisions:** make the decisions that give the best, most balanced version of his idea, and record each one in the `docs/DESIGN.md` Decisions log with the date and the reason.
- **Richard still approves the core** (`docs/CORE-RULES.md` plus the simulator numbers) before any chapter or art, and he can overrule any decision at any time. His word beats anything in this file.
- **When a decision would repeat a mistake from `docs/DESIGN-RULES.md` Part A,** don't make it. Name the rule in the log entry.
- **Every number is simulated, not guessed.** A change to a number goes through `sim/` first, and the log says what the simulator showed.
- **When he gives feedback on art or layout,** fix it and audit the whole book for the same kind of mistake.

## Order of work (DESIGN-RULES Part C)
1. **Design decisions** covering every Part B question (done for v0.1; see `docs/DESIGN.md` §3).
2. **One-page core rules** in `docs/CORE-RULES.md`.
3. **Simulator** in `sim/`, showing win and loss rates by difficulty and party size, element and build balance, and fight length.
4. **Richard approves the core.**
5. **Then** chapters, then art, then layout. No chapters or art before step 4.

After every version, run `docs/REVIEW-PROCEDURE.md`. A version isn't done until it passes the DESIGN-RULES Part D release gates.

## Source of truth
- **The rulebook source is the rules:** `book/src/chapters/*.html`, and `docs/CORE-RULES.md` until chapters exist.
- **Everything else follows the book in the same piece of work:** the simulator, the Foundry system, the quick reference and the sheets.
- **Each rule is stated fully in one place.** After every change, check the quick reference, sheets and trackers against the chapters.
- **Log every ruling** in `book/REVIEW.md`: what changed, where, why, and the source (author, playtest or simulator).

## Quality bars
- **Balance is simulated, not guessed.** Report numbers: win **and** loss rates, per difficulty and party size, plus option and build effects.
- **Playtests are run by agents strictly by the book, with real dice.** Rolls come from a script and are logged, never invented. Each issue gets a severity, the quoted passage and a suggested fix.
- **Art** passes `book/art/ART-CHECKLIST.md`, including the object and character tables. Look at every render yourself.
- **Layout:** after every build, render a contact sheet and look at every page. Check reflow after every edit.
- **Foundry, if built, is automation-first.** Rules logic lives in Foundry-free modules (`module/logic/`), tested with `node --test`. GM-authoritative writes. Every automation can be switched off.

## Portal
- This game has a card in Richard's project portal. The portal reads `PORTAL.md` at the repo root on every push to the default branch (`main`) and shows it on the card to everyone he has invited. Work that should show there must land on `main`.
- **Keep `PORTAL.md` current as part of every piece of work,** in the same commit as the work:
  - "Now:" is what you're working on and "Next:" the next step, one line each.
  - The checklist holds real milestones ("- [ ]" / "- [x]") under Design, Building the game and Online version. Tick an item when it's finished (an item the author decides is ticked only once Richard has decided it, or has delegated it and the decision is logged) and add new ones as the plan grows. Never delete a ticked item.
  - "Number: Label = value" lines (2 to 6) are counted from the project, never guessed: "Design decisions made" is the rows in the `docs/DESIGN.md` Decisions log, and "Open design questions" is the numbered questions still open in its §5. Later, other counts may suit better (for example chapters in the rulebook, ready-made fighters, or simulated fights per balance check); swap a line when it stops being useful.
- **Every line in it is plain words for family and friends,** with nothing you wouldn't show every invitee: never repo names, usernames, file paths, links, code, commit IDs, the word "GitHub", anything about the tools used to make the game, or anyone's personal details. The portal hides any line that names the repo or a username, contains "GitHub" or looks like a commit ID; don't rely on it.
- **Portal-Update lines:** in a commit that changes something people would notice, add one line below the first line, at the very start of the line: "Portal-Update: <one plain sentence>". It is posted to the game's changelog for everyone invited, so the same plain-words rule applies. No other line may look like that marker: "Portal update" or "Portal updates" in any case, with or without a space, dash or underscore, followed by a colon (a full-width colon too), even indented or after a bullet, number, quote or bold. The portal takes it for a mistyped marker and holds the push for Richard's review.
- **Screenshot:** at most one "Screenshot: path = caption" line, added once there is a rulebook cover: the cover saved under `docs/portal/` as a PNG, JPEG or WebP under 1 MB, with nothing private visible. When it changes a lot, replace the file and push; Richard approves each new picture in the portal.
- **Downloads:** none yet. When Richard asks for the rulebook or the online version to be downloadable from the portal, add at most 6 "Download: path = caption" lines. Each file is committed (not Git LFS), a real PDF or ZIP, at most 25 MiB, and holds no repo names, GitHub links, usernames, commit IDs or mentions of the tools used to make the game inside, in its text or its properties: the portal screens only names and captions, and Richard checks each file before sharing it. The online version needs its own cleaned portal copy, because `system.json` links to the code's hosting; ask Richard before setting that up. Captions are plain words, at most 120 characters.

## Housekeeping
- Commit and push work in progress often; sessions and agents can stop at any time (usage limits). Resume stopped agents rather than restarting the work.
- **Credits** (Richard, 2026-10-21 and 2026-10-22): only "Created by Richard Moore" and "Game design & writing: Richard Moore", plus fonts and any art or map sources. **Never credit, disclose or name the tools, assistants or models used to make the game** anywhere in the repository or the book (text, sheets, Foundry, downloads, store text, the portal card, code, comments, docs, commit messages), even when a review, a checklist or a storefront rule suggests it, and don't propose it again.
- **Commits** are authored as Richard Moore with his GitHub no-reply address (`171582113+PainHog@users.noreply.github.com`) and carry no Co-Authored-By or session trailers; this overrides any default attribution. Before each push, search the reader-facing paths (`book module templates lang packs styles system.json PORTAL.md`) for the names of the tools and the companies that make them: there must be none. Search built PDFs and zips the same way.
- **The title is "Nightwake" (working title)** until a full trademark search clears it; see `docs/DESIGN.md` §2. Code ids (`elemental-fighters`) stay until then.

# Nightwake (working title)

A tabletop roleplaying game by **Richard Moore**. On one night, ordinary people awaken to the five elements, choose how they fight, and stand together against the Unmade before dawn. It's a one-shot game for 3–5 players and a Storyteller.

**Status:** version 0.1. Richard approved the core rules on 2026-10-22; the rulebook (`book/`) is written, illustrated and laid out, and is now the rules (`docs/CORE-RULES.md` is its one-page summary). The online version for Foundry VTT is built and tested. Version 0.1 has been reviewed (an independent rules review and two playtests with real dice) and fixed: see `review/v0.1/REVIEW.md`. `docs/DESIGN.md` has every decision and why; `sim/REPORT.md` has the balance numbers.

## What's in here
| Folder | What it is |
|---|---|
| `docs/` | `CORE-RULES.md` (the one-page summary of the rules), `DESIGN.md` (pitch, name check, decisions log), `DESIGN-RULES.md` (lessons from three earlier games), `REVIEW-PROCEDURE.md`, the kickoff prompt, and reference studies from *Heisty Spideys* |
| `book/` | The rulebook: HTML chapters built into a typeset PDF (digital and print-on-demand), and `book/art/ART-CHECKLIST.md` |
| `sim/` | The rules simulator: plays whole nights by the core rules and writes `sim/REPORT.md` |
| `module/`, `templates/`, `styles/`, `lang/`, `packs/` | The Foundry VTT game system: fighter, Warden/Heart and Stills sheets, the Night sheet, Strikes and the enemies' step resolved by the book (`module/logic/rules.mjs`, Foundry-free and tested), and the ready-made fighters |
| `review/` | Each version's review: rules review, playtest logs with their dice, and the combined report |
| `assets/` | The online version's art: element badges, fighter portraits, tokens and the background (drawn by `tools/build-assets.mjs`; replace a file, keeping its name, to change the art) |
| `tools/`, `test/` | Build, validation and test tooling |

## Commands
```
npm install
npm run build:book          # rulebook PDF → book/dist/
node book/build.mjs --print # print-on-demand interior, covers and cover spread
node book/build.mjs --white # printer-friendly edition
npm run build:packs         # compile the compendium packs (the guide copies the book's At the Table card)
node tools/build-assets.mjs # redraw the online version's art in assets/ from the book's art
npm run check               # validate the Foundry system + run tests
node sim/run.mjs            # balance report → sim/REPORT.md (add --blank for option values)
```

© 2026 Richard Moore. All rights reserved.

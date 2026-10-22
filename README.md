# Nightwake (working title)

A tabletop roleplaying game by **Richard Moore**. On one night, ordinary people awaken to the five elements, choose how they fight, and stand together against the Unmade before dawn. It's a one-shot game for 3–5 players and a Storyteller.

**Status:** core rules v0.1 written and simulated, waiting for Richard's approval. Read `docs/CORE-RULES.md` (the rules), `docs/DESIGN.md` (every decision and why) and `sim/REPORT.md` (the balance numbers). No chapters or art until the core is approved.

## What's in here
| Folder | What it is |
|---|---|
| `docs/` | `CORE-RULES.md` (the rules until chapters exist), `DESIGN.md` (pitch, name check, decisions log), `DESIGN-RULES.md` (lessons from three earlier games), `REVIEW-PROCEDURE.md`, the kickoff prompt, and reference studies from *Heisty Spideys* |
| `book/` | The rulebook: HTML chapters built into a typeset PDF (digital and print-on-demand), and `book/art/ART-CHECKLIST.md` |
| `sim/` | The rules simulator: plays whole nights by the core rules and writes `sim/REPORT.md` |
| `module/`, `templates/`, `styles/`, `lang/`, `packs/` | The Foundry VTT game system (a skeleton for now) |
| `tools/`, `test/` | Build, validation and test tooling |

## Commands
```
npm install
npm run build:book          # rulebook PDF → book/dist/
node book/build.mjs --print # print-on-demand interior + covers
npm run check               # validate the Foundry system + run tests
node sim/run.mjs            # balance report → sim/REPORT.md (add --blank for option values)
```

© 2026 Richard Moore. All rights reserved.

# Elemental Fighters (working title)

A tabletop roleplaying game by **Richard Moore**. On one night, ordinary people awaken to the five elements, choose how they fight, and stand together against the dark force that would end the world. It's a one-shot game for a group.

**Status:** early design. The premise is set; the rules aren't written yet. See `docs/DESIGN.md`.

## What's in here
| Folder | What it is |
|---|---|
| `docs/` | `DESIGN.md` (pitch, name check, early flags, decisions, open questions), `DESIGN-RULES.md` (lessons from three earlier games), `REVIEW-PROCEDURE.md`, the kickoff prompt, and reference studies from *Heisty Spideys* |
| `book/` | The rulebook: HTML chapters built into a typeset PDF (digital and print-on-demand), and `book/art/ART-CHECKLIST.md` |
| `sim/` | The rules simulator for balance testing, built once the core rules exist |
| `module/`, `templates/`, `styles/`, `lang/`, `packs/` | The Foundry VTT game system (a skeleton for now) |
| `tools/`, `test/` | Build, validation and test tooling |

## Commands
```
npm install
npm run build:book          # rulebook PDF → book/dist/
node book/build.mjs --print # print-on-demand interior + covers
npm run check               # validate the Foundry system + run tests
```

© 2026 Richard Moore. All rights reserved.

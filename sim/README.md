# Rules simulator

Plays whole nights of Nightwake strictly by `docs/CORE-RULES.md` and reports win and loss rates against the agreed targets. The method was carried over from *Heisty Spideys* (rule A19: balance is simulated, not guessed). The latest results are in `REPORT.md`.

```bash
node sim/run.mjs                                    # 4,000 nights per difficulty × group size, seed 1 → sim/REPORT.md
node sim/run.mjs --blank                            # also each option against a blank copy of itself (slower)
node sim/run.mjs --runs 1000 --seed 2 --no-write    # quick look, another seed, nothing written
node sim/run.mjs --set heart.toughPer=6 --no-write  # try a rule number
node sim/run.mjs --policy restBelow=0.5 --no-write  # try a player habit
```

Same seed → same report. Each night draws its group and its dice from separate seeded streams, so the three difficulties replay the same groups with the same dice where the rules agree (common random numbers).

## Files
| File | What |
|---|---|
| `rng.mjs` | Seeded RNG (mulberry32 + FNV-1a stream derivation) |
| `data.mjs` | Option names, the two Wu Xing cycles, the ready-made fighters |
| `params.mjs` | **Every number in the rules** (`RULES`, section-referenced), the Night card (`DIFFICULTY`), the player habits (`POLICY`) |
| `party.mjs` | Random legal groups (CORE-RULES §2) and a validator |
| `engine.mjs` | Plays one night: First Clash, the Hunt, the Heart. Comments cite the CORE-RULES section |
| `targets.mjs` | The balance targets the report checks against |
| `run.mjs` | CLI → `REPORT.md` |

## What the engine abstracts (stated, not hidden)
- **No map.** Every fighter can reach every enemy. Movement isn't a rule in v0.1.
- **Story scenes cost nothing.** The awakening moments, travel between Anchors and the epilogue aren't simulated, because the rules give them no cost.
- **Player choices follow `POLICY`.** Each one is marked "policy" in the code. These are a sensible table's habits, not perfect play:
  - act in feeding-ring order;
  - strike the pack while it has 2+ Stills, otherwise the Warden or Heart (Sweepers and Shell-breakers have their own preferences);
  - Rally anyone Down unless the fight is nearly won;
  - spend Chi on techniques when they pay, on a Chi die against Guard 2+, and on Help when you can spare 2;
  - at the Heart, keep 3 Chi until you have Awakened;
  - take a Respite below 70% of the group's Vigor;
  - withdraw when half the group is Down and the Warden is above half;
  - pick Anchors whose Shell the group can break.
- **Report §6 changes one habit at a time**, so you can see how much table play matters. For example, ignoring the Stills drops Standard from 75% to 55%.

## How the numbers were set
1. **Size first.** Starting Vigor by group size (10 / 7 / 6) and the feeding ring that skips missing elements put 3, 4 and 5 fighters level (rule A21).
2. **Then difficulty.** The Night card changes only the Heart's Crush and Sweep (rules A19, A20).
3. **Then options.** Each option was measured against a blank copy of itself (the same groups and dice with its effect switched off) and adjusted until every option in a pick was worth about the same. The report's §5 shows both the comparison and the blank test.
4. **Then habits.** Report §6 found two traps the rules had to fix:
   - **Ignoring the Stills was best,** so the Warden and Heart now feed on standing Stills.
   - **Resting was always best,** so breaking Anchors is now worth more.

   The best habit now sits in the middle, and labels are calibrated to sensible play.

## Still to build
- **Agent playtests with real dice** (`playtests/`), per `docs/REVIEW-PROCEDURE.md`, once the chapters exist.
- **A frozen copy of these rules** (`rules-v0_1.mjs`) the first time the live rules change, so this version stays measurable (DESIGN-RULES C5).
- **Move the resolution functions into `module/logic/`** and the data into `module/config.mjs` once Richard approves the core, so the simulator and the Foundry system share one implementation.

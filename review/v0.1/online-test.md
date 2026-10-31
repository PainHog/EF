# The online version, played end to end (2026-10-31)

Foundry itself can't run here, so the online version was played on the fake Foundry (`tools/fake-foundry.mjs`): the real entry module, the Ready-made Nights add-on, the players' action windows and the Storyteller's operations, with players and a Storyteller as separate users. The test is `test/full-night.test.mjs`; it runs with `npm test` (60 nights per difficulty) or with more nights: `NW_NIGHTS=1000 NW_STATS=1 node --test test/full-night.test.mjs`.

## What it checks
- **Every night reaches Morning:** both ready-made nights (picked from the add-on), 3, 4 and 5 fighters, Easy, Standard and Hard: 18 whole nights, from the First Clash through the Hunt to the Heart, with no errors.
- **The book's limits after every step:** Vigour between 0 and its maximum, Down exactly at 0, Chi between 0 and 5, Toughness between 0 and its starting value; the size table's starting Vigour, Stills, Warden and Heart Toughness; an Anchor costs an Hour; a Respite heals fully; every night ends Won, Driven off or Lost.
- **The online rules give the simulator's results.** The test's players decide the way the simulator's players do (`sim/params.mjs` POLICY and the habits in `sim/engine.mjs`: the Stills first while two or more stand, a Shell-breaker on its Shell, techniques and Help when they pay, Chi kept for the Awakening at the Heart, Lucky only to dodge a hit back, shared Vigour standing Down fighters up first, the turn order that feeds most, Respites below 70%, withdrawing when half the group is Down). Played that way, 1,000 nights per difficulty with Dani, Marcus, Jun and Priya:

| Measure | Easy online / simulator | Standard online / simulator | Hard online / simulator |
|---|---|---|---|
| Won | 96.5% / 96.5% | 80.8% / 80.4% | 59.1% / 56.6% |
| Driven off | 3.4% / 2.8% | 4.8% / 6.1% | 9.6% / 11.5% |
| Anchors broken | 2.69 / 2.69 | 2.71 / 2.69 | 2.73 / 2.69 |
| Respites | 0.99 / 1.01 | 0.98 / 1.01 | 0.97 / 1.01 |
| Fighters Down per night | 1.07 / 1.04 | 2.50 / 2.64 | 4.54 / 4.93 |
| Hit back (share of Strikes) | 23.2% / 22.9% | 23.2% / 23.1% | 23.5% / 23.3% |

The simulator's figures are for the same four fighters and habits (3,000 nights each). Every difference is within what 1,000 nights wander by chance.

## What it found
- **No rules bug in the online version.** With the same habits, the online version and the simulator agree.
- **Test-tool bugs, fixed:** the fake Foundry's dice generator lost precision and repeated whole nights after a while (replaced with an exact 32-bit generator), and the first version of the test's players spent Lucky on their first roll, gave all shared Vigour to one fighter and ignored turn order, which made the online version look far weaker than it is. Those were the test's habits, not the game's rules.
- **For Richard's own Foundry:** `docs/TESTING.md`, a step-by-step script with a Storyteller window and a player window.

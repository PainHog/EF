# Nightwake (working title; first called Elemental Fighters): design document

This is a living document. **§1 Pitch** is Richard's own. **§3 Decisions** lists what Richard has decided or, since his delegation on 2026-10-22, what was decided for him and logged here with the reason; he can overrule any of it. The rules themselves are in `docs/CORE-RULES.md`, and the balance evidence is in `sim/REPORT.md`.

## 1. Pitch (Richard Moore, 2026-10-22)

> **Elemental Fighters**
>
> Each player selects one of the elements from the chinese elemental table "fire, water, wind, earth, metal" then they select a perk, fighting style, and an awakening. They then have to fight back the "blank" with their group. Its a game where this one night they awaken to save the world one shot.
>
> I think blank is "The Darkness". Reference the movie/show Invincible (featuring billy zane) as to the theory behind the game.

### What the pitch settles
- **A group game.** Each player is one fighter who awakens to an **element** and picks a **perk**, a **fighting style** and an **awakening**.
- **One night, one shot.** The fighters awaken on a single night and must save the world before it ends. The game is designed for **one-shot play**.
- **The enemy is a single dark force** that the group fights back together.
- **Inspiration:** the 2001 TV film *Invincible* (Billy Zane). In it, five people who are each the embodiment of an element (Fire, Water, Air, Metal and Wood) awaken as "hyper-humans". A converted Shadow Man, Os, mentors them against the Shadow Men, whose leader, Slate, is about to open a portal that would destroy the world. The film is a guide to the *theory* of the game; its specifics are someone else's (see §2.3).

## 2. Name check and rights (2026-10-22; risk flags, not legal advice)

### 2.1 The title: "Nightwake" (working title)
- **"Elemental Fighters" is crowded:**
  - a mobile fighting RPG (Serpent Games, 2022);
  - *Element Fighters* on Steam;
  - several itch.io and GitHub prototypes;
  - LEGO *Ninjago*'s "Elemental Fighters".

  It's also generic, so it stays the repository's name only.
- **"Nightwake"** says *one night* and *awakening*, and suits any tone. A web check on 2026-10-22 found no game, book or product by that name.
- **Second web check, 2026-10-22 (layout pass):** searches for the game and for a trademark found no game and no trademark record named "Nightwake". The nearest names are *Nighthawks* (a vampire video game RPG), *Night Wakings* (a short itch.io horror game), and NIGHTWAY, NIGHTWATCH and NIGHTHAWK marks for clothing, coffee and lighting. None is a tabletop game. This is not the full register search below, which is still owed.
- **Rejected:**
  - "Hold Till Dawn" (a 2026 browser game);
  - "Fivefold" (a 3- or 4-player table doesn't field all five elements);
  - "Fists Before Dawn" (it suggests unarmed fighting only).
- **Before any store page, cover or logo:** run a full search of DriveThruRPG, itch.io, Steam, the USPTO and the UK IPO. The code ids stay `elemental-fighters` until then.

### 2.2 The enemy: the Unmade
- *The Darkness* is a registered trademark of Top Cow Productions (comics since 1996; 2K video games), so the enemy is **the Unmade**. Using "darkness" as an ordinary word is fine.
- **Web check, 2026-10-22:** the only use found was a deity in a small indie game still in development.
- **Rejected:**
  - "The Gloam" (an existing folk-fantasy RPG about a growing darkness);
  - "The Hush" (DC's Batman villain Hush);
  - "The Blank" (Dick Tracy's faceless villain, with a 2025 comic);
  - "The Stillness" (the continent in N.K. Jemisin's *Broken Earth*);
  - "Hollows" for the minions (Bleach's monsters).
- **The Unmade's servants** have plain-word names: **Stills**, **Wardens** and **the Heart**. Its footholds are **Anchors**.

### 2.3 Using *Invincible* (2001) as inspiration
The idea is free to use: protectors awakening to the five elements, shadow beings, one night to stop the end of the world. The **film's specifics** are not: Os, Slate, the Shadow Men, the White Warrior, the tablet and portal plot, and its scenes and dialogue.
- Nightwake has **no mentor and no portal**. The Unmade anchors itself through places, and the deadline is dawn.
- The film's element set had Air instead of Earth; Nightwake uses the traditional Wu Xing set.
- The film was criticised for tying elements to demographic stereotypes. **Any element can belong to anyone.**

### 2.4 Other look-alikes to steer clear of
- *Avatar: The Last Airbender*: four elemental nations, with air among them. Nightwake has no air element and no nations.
- LEGO *Ninjago*: elemental masters, and the "Elemental Fighters" name.
- *Rivals of Aether*.

Use original names and designs.

### 2.5 The source culture
- Wu Xing (五行, the five phases) is a traditional Chinese system and free to use. Use it accurately and respectfully: correct characters and meanings, no pseudo-Chinese text, no ethnic stereotypes.
- **Wind as Wood's:** in the traditional correspondences, wind is the climate of Wood ("the East generates wind, wind generates wood", attributed to the *Huangdi Neijing* Suwen, ch. 5). The I Ching trigram Xun (巽) means both wind and wood. Both were checked only against secondary sources.
- **Have the final Chinese terms checked by a native reader.**

## 3. Decisions log
| # | Date | Decision | Why (and what the simulator showed) |
|---|---|---|---|
| 1 | 2026-10-22 | Premise, one-night one-shot structure, and the four character picks (element, perk, fighting style, awakening), as in the pitch | Richard's pitch |
| 2 | 2026-10-22 | Richard delegated the design decisions: make the best, most balanced version of his idea. He still approves the core before any chapter or art | Richard |
| 3 | 2026-10-22 | Credits name only Richard; never credit or name the tools used to make the game, anywhere | Richard |
| 4 | 2026-10-22 | **Elements: the Wu Xing set** (Wood, Fire, Earth, Metal, Water). **Wind is part of Wood** | Accurate to the source (§2.5), keeps the pitch's wind, makes both cycles usable as rules, and avoids *Avatar*'s air (flag 1) |
| 5 | 2026-10-22 | **One element per fighter, no sharing.** Styles, perks and awakenings are also once per group. Tie-break: both roll a die, higher picks first | Every player gets a spotlight; no stacking of one option; a tie-break the table can use at once (A27) |
| 6 | 2026-10-22 | **Tone:** martial-arts pulp with mythic stakes. Ages 12+, no gore | Suits a one-shot's pace and the power fantasy. A gritty tone would fight A2 and make defeats feel bad |
| 7 | 2026-10-22 | **Setting:** a modern city, tonight. Any city works; scenarios use places every city has | Nothing to explain at setup (A27); ordinary people awakening in familiar places; clear of the film's specifics |
| 8 | 2026-10-22 | **The table:** 3–5 players plus a Storyteller; about 3 hours plus up to 30 minutes of setup | Fits a 4-hour slot. Simulated fighters roll about 16 times a night |
| 9 | 2026-10-22 | **Title "Nightwake"** (working title, §2.1) | One word, searchable, no clash found; full search before any store page |
| 10 | 2026-10-22 | **The enemy is the Unmade:** one will with many hands, outside the cycle. It feeds nothing and breaks nothing; it stops change. Its pieces are **Stills** (people and things it has emptied), **Wardens** (each guards an **Anchor** and wears a Shell of what it hollowed) and **the Heart** | Clear of Top Cow, the film and the other clashes (§2.2). It gives the cycles a reason to be the weapon |
| 11 | 2026-10-22 | **Engine:** Heisty Spideys' d6 pool, with **hits on 5–6**, **5 dice**, at most **+2 bonus dice** from all sources, and **no opposed rolls**: the enemy has a fixed **Guard** | A proven engine, plus the "what worked" list (one cap per roll; the opposition is a single number). Simulated: 9.6% of rolls get no hits (target ~10%) |
| 12 | 2026-10-22 | **Trading blows:** damage = hits; fewer hits than the Guard means the enemy **hits you back**, and **being hit back gives 1 Chi**. **Critical:** Guard met plus two 6s, for +1 damage and +1 Chi | One roll settles both sides; Chi from pain stops death spirals (A2). Simulated: Criticals are 25% of rolls (target 15–25%) |
| 13 | 2026-10-22 | **Fights:** one action each (Strike or Rally); Help, the Chi die and techniques are free; fighters act in any order | Helpers spend a resource, not their action (a "what worked" item); fewer steps for the Storyteller (A29) |
| 14 | 2026-10-22 | **Feeding:** the generating cycle as a **ring that skips missing elements**; a fed strike deals +1 damage | **Settles flag 2.** With the plain cycle, 5-fighter groups won about 25 points more than 3-fighter groups; the ring makes the bonus the same at every size |
| 15 | 2026-10-22 | **Shells:** the overcoming cycle. +1 Guard; the breaker ignores it and shatters it with any hit; it also shatters at half Toughness. Five Anchors, five different Shells | Every element gets its moment in every night (A9), and the half-Toughness rule covers a missing breaker (A13, A21) |
| 16 | 2026-10-22 | **Techniques:** Wood heals 1; Fire +2 damage; Earth stops 3 of the next loss; Metal counts each 6 as three hits; Water rerolls up to three misses | Each tuned against a blank copy of itself. First drafts ranged from 1 to 20 points; now 5–10 |
| 17 | 2026-10-22 | **Fighting styles:** Brawler, Guardian, Sweeper, Counter, Flow, Breath (numbers in CORE-RULES §2) | Within 1 point of each other; each worth 7.5–11.6 points against a blank copy |
| 18 | 2026-10-22 | **Perks:** Tough, Medic, Lucky, Quick, Stubborn, Trained. **Local (+1 Hour) cut** | An extra Hour was worth 17 points against 6–11 for every other perk, and stayed that strong in every weaker form tried. Trained took its place |
| 19 | 2026-10-22 | **Awakenings:** Ascendant, Unbreakable, Wellspring, Tempest, Seal, Harmony. **Cost 3 Chi; 3 rounds (Seal 2)**; open once the first fighter goes Down tonight, or at the Heart; the Heart gives every fighter 3 Chi | **Settles flag 4:** a cost, a trigger, once a night, never free. Simulated: every fighter Awakens at the Heart; the awakenings are within 1.5 points of each other. Seal holds the Heart (it costs your actions) and lasts 2 rounds, because at 3 it was worth 16 points against 8–13 for the others |
| 20 | 2026-10-22 | **Chi:** start with 2, maximum 5, lost when Down; drained by Surges | Simulated: the median fighter spends 93% of the Chi they get (A7) |
| 21 | 2026-10-22 | **Starting Vigor by group size: 10 / 7 / 6** for 3 / 4 / 5 fighters, and the Heart's base Toughness is 6 instead of 5 with five fighters | An explicit per-size adjustment (A21). Simulated: every size within 3.2 points of its difficulty's average |
| 22 | 2026-10-22 | **Down, not dead:** Down fighters lose their Chi, can be Rallied, and stand with 1 Vigor after the fight. Everyone Down at an Anchor means the Anchor stands; everyone Down at the Heart is a loss. Nobody withdraws from the Heart | **Settles flag 6.** Losing always costs something and never beats fighting on (A4). No player sits out a one-shot |
| 23 | 2026-10-22 | **Enemies:** Stills in packs (3 Toughness each, Swarm), Wardens (9 Toughness per fighter), the Heart ((5 + 4 per Anchor standing) per fighter); Surge tables; **the Warden or Heart regains 1 Toughness per standing Still each round** | The simulator found that ignoring the Stills was the best tactic (82% against 74%). With feeding, ignoring them drops to 55%, and the best habit is in the middle (clear packs down to the last Still) |
| 24 | 2026-10-22 | **The night:** Prologue and First Clash; the Hunt of **4 Hours** across **5 Anchors**; Respite; a long fight (past round 4) costs an Hour; any Anchor fight ends at round 7; the Heart in the last Hour; **dawn at the end of round 7** | **Settles flag 5.** Every clock binds (A22): long fights in 40% of nights, dawn ends 10–19% of Heart fights. Everything is capped at 7 rounds (A24). Breaking an Anchor takes 4 per fighter off the Heart, so resting and hunting trade evenly |
| 25 | 2026-10-22 | **Endings:** win; **partial** when dawn breaks with the Heart at half or less (the Unmade is driven off and will return); loss | A partial win is visibly partial (A23) |
| 26 | 2026-10-22 | **Night card:** the Heart's Crush / Sweep are **2 / 1 Easy, 4 / 2 Standard, 6 / 3 Hard**; everything else is the same | Labels come from results (A20). Simulated win · loss: Easy 89% · 1%, Standard 75% · 10%, Hard 61% · 21% |
| 27 | 2026-10-22 | **Five ready-made fighters**, one per element, each mixing offense and defense (CORE-RULES §10) | The first line-up won only 27% of nights with one all-defensive trio. Now every group of 3–5 of them wins 77–91% at Standard (A21: a small group needs a damage dealer) |
| 28 | 2026-10-22 | **Balance targets** (`sim/targets.mjs`): win and loss per label as in A19; Criticals 15–25%; no-hit rolls 8–15%; at least 85% of fighters Awaken; the median fighter spends more than half their Chi; each group size within 5 points; each option within 3 points; fight lengths First Clash 2–3, Anchor 3–5, Heart 4–7 rounds | From DESIGN-RULES A19–A24 and the earlier games |
| 29 | 2026-10-22 | **First night:** each player needs 7 d6; the book gives a fighter sheet, a Night sheet (Hours, Anchors, dawn, enemy Toughness) and a one-card Storyteller round; play the ready-made fighters | Setup under 30 minutes (A27); a round has three steps (A29) |
| 30 | 2026-10-22 | **Time budget:** setup 20–30 min, Prologue 10, First Clash 15, each Hour about 25, the Heart 35–40, Epilogue 10. About 3 hours of play | Simulated: the First Clash lasts about 2 rounds, an Anchor fight about 4, the Heart about 5 |
| 31 | 2026-10-22 | **Ready-made content for the book:** one full night with five named Anchors, plus an Anchor generator of d6 tables, validated with 100 generated nights | A25 and A26. Written after the core is approved |
| 32 | 2026-10-22 | **Art direction:** each element has one colour and one shape, so meaning is never carried by colour alone: Wood green with a tall leaf, Fire red with a triangle, Earth ochre with a square, Metal silver-white with a circle, Water deep blue with a wave. The Unmade looks unfinished: desaturated, missing detail, still. Fighters come from every background, age and build | These are the traditional Wu Xing colours and shapes. Avoids the Top Cow and film looks (no black tendrils, no silhouette men). ART-CHECKLIST 18 and 21–24 |
| 33 | 2026-10-22 | **Foundry: book first.** The Foundry system follows once the chapters exist; rules logic moves to `module/logic/` after the core is approved | DESIGN-RULES C2 and C6 |
| 34 | 2026-10-22 | **Core rules v0.1 approved** (`docs/CORE-RULES.md` and `sim/REPORT.md`). The book's chapters become the rules, and CORE-RULES stays as their one-page summary | Richard. Credits stay out of everything players see (the book, the Foundry system, downloads); the repository's history is left as it is |
| 35 | 2026-10-22 | **Art: the city, the elements and the Unmade, not faces.** Flat colour and ink on a night palette (brass lamplight, the five element colours, the Unmade's grey). People are small silhouettes from one figure kit; the ready-made fighters appear only as emblems (an element badge and an icon of their ordinary life) | Players picture their own fighters, and no element is tied to a look (ART-CHECKLIST 23). One figure kit makes body counts right by construction (ART-CHECKLIST 9). Audit in `book/art/AUDIT.md` |
| 36 | 2026-10-22 | **Online version v0.1: the Storyteller's client decides, players roll.** Players roll their own dice (and the rerolls Tide and Lucky allow) and declare their spends in a dialog; the Storyteller's client checks the action against the book, resolves it with the same pure rules functions the tests check, writes every change and posts a card. Choices the book gives the table (who takes a Swarm, whether a Guardian steps in, how Wellspring, Harmony and Medic share out) are asked of the Storyteller. Four switches turn off the automation: Strike results, the enemies' step, the clocks, the Guardian question | DESIGN-RULES C6 (automation-first, nothing tracked by hand) and the working rules (Storyteller-authoritative writes, every automation can be switched off). Tide rerolls the lowest non-hits and Lucky is offered after the roll, since rerolling a die that isn't a hit can never make a roll worse |
| 37 | 2026-10-22 | **A Down fighter is out of play.** Nobody can choose them for anything (Swarm, Bulwark, Renewal, Help, a share of Chi); they take no losses, gain no Chi, and their style, perk and technique do nothing until a Rally or Wellspring stands them up. A Crush meant for a Down fighter goes to the standing fighter who dealt the next most damage, else the most Vigor | The v0.1 review's one blocker, found by the rules review and Playtest B (DESIGN-RULES A4, A5, A13: being Down must never be better than standing, and soaking harm at 0 Vigor was free). The rules reviewer measured the loose reading: Hard losses 20.5% to 13.5%, off target. The simulator already played it this way, so no published number changes |
| 38 | 2026-10-22 | **Guardian: 2 Chi only for a real loss of 2 or more.** The Guardian gains 2 Chi only if it actually loses 2 or more Vigor taking another fighter's loss (after Bulwark, Flow or Unbreakable), and not if that puts it Down | Playtest A found Guardian plus the players' choice of Swarm target made a Chi engine (2 Chi for 1 Vigor every round); Playtest B found Guardian with Unbreakable gained Chi from losses it never took. Simulated (4,000 nights per size): guarding every loss under the old rule gave Guardian groups +2.1 / +4.5 points (Standard / Hard), and Guardian with Unbreakable on one fighter +3.8 / +6.0. With this rule those fall to below the default habit and +1.3 / +0.4. Labels re-measured: wins 88 / 72 / 58, losses 1 / 10 / 22, every target met, Guardian at −1.5 in its pick (A5, A6) |
| 39 | 2026-10-22 | **The Heart comes after the four Hours; at least one Anchor always stands.** The Heart row of the size table starts at one Anchor standing (27 / 36 / 50) | "In the last Hour" read as Hour 4 in all three reports. Four Hours and five Anchors already meant one Anchor always stands, so the old "every Anchor broken" row was unreachable (A12) |
| 40 | 2026-10-22 | **Edge cases settled to match the simulator, and terms given one meaning.** Withdrawing at round 4 still costs the long-fight Hour; a fight ends the moment the enemy falls or everyone is Down; the First Clash ends at round 7 or when everyone is Down, with no withdrawing; one Bulwark at a time; one Chi die per roll; Quick's Strike isn't part of round 1; a Strike is judged against the Guard it rolled against; a shattered Shell stays shattered; a Down fighter keeps their place in the ring. Terms: Wardens **draw on** their Stills, elements **shatter** Shells, the **Difficulty table**, **Go to an Anchor** | Each was a ruling a table had to invent (A10, A12, A15, A16). Where the simulator already played one reading, the book now says that reading, so the published numbers stay valid. Metal's Edge was checked and left alone: Metal with Brawler and Trained wins 1.6 points below average; Metal with Ascendant +3.6 at Hard, the strongest pairing found |
| 41 | 2026-10-22 | **Hard's Heart Crush 7 (was 6); the simulated tables give each Swarm to a Flow or Bulwarked fighter** | Both rounds of playtests gave every Swarm to the best soak, which the book allows; the simulator's habit had been "the most Vigor". As the default habit it adds 1.4 to 2.7 win points, Flow stays within its pick (+1.5) and Hard losses fell to 19.7%, under the 20% target. Hard Crush 7 restores every target (4,000 nights per size): wins 89.5 / 74.9 / 58.3, losses 0.7 / 8.9 / 20.8, sizes within 3.3, options within 1.8 (A19, A20) |
| 42 | 2026-10-22 | **The verification round's rulings:** a Guardian needs more Vigor than the loss it takes; a Sweep's losses come one at a time in the players' order; an action before going Down still feeds the next one; a start-of-round step for Wellspring and Harmony; a late joiner resets everyone's maximum to the new group size; going back to an Anchor is a new fight | Playtest B2 had to invent two core rulings (feeding after a Down; the Guardian in a Sweep) and found a late-join loophole and a Rally-the-Guardian loop. Each ruling takes the reading the simulator already played (A4, A12, A15), so no published number moves beyond D41 |
| 43 | 2026-10-22 | **Round 3's rulings:** Stubborn never gives more Vigor than you had; a Rallied fighter is back in play at once; you can't skip your action; ties nobody acted to break go to each fighter's die; a late fighter changes everyone's maximum only when they join; "half" rounds down; advice checked (spend Chi even at the Heart; don't chase the last Still even there; rest after each hard Anchor fight) | Playtests A3 (clean) and B3 (clean in play; one tie-roll detail in a drill). Each takes the simulator's reading. Simulated: keeping 1 Chi each at the Heart loses 8.1 (Standard) and 9.7 (Hard) win points; chasing the last Still at the Heart loses 1.3 and 2.0; Stubborn's change is too small to measure |
| 44 | 2026-10-26 | **"Vigour", not "Vigor"**, in everything players read (the book, the sheets, the online version, the core rules summary); the code keeps `vigor` | The book is written in British spelling (colour, armour, grey, centre), and the one American form read as a slip. A copy-edit flagged it. No rule or number changes. Richard confirmed it on 2026-10-26 |
| 45 | 2026-10-26 | **Final art drops in by slot.** Every picture has a named slot with a fixed shape; a finished picture saved under that name replaces the placeholder in the book and the online version, cropped to fill (round badges cut to a circle). The brief for the artist is `book/art/ART-BRIEF.md`, its size table counted from the layout | The pages are laid out and checked with the placeholders, so the art can't move them or reopen layout work (DESIGN-RULES Part C: layout after art, checked after every change). D32 and D35 still set the look; the brief says so |

## 4. Early flags: how each was settled
1. **Which five elements:** the Wu Xing set, with wind as Wood's (D4).
2. **Five elements, three to five players:** each element is unique (D5). The feeding ring skips missing elements (D14), a Shell without its breaker shatters at half Toughness (D15), and starting Vigor is set by group size (D21). Nothing needs all five elements.
3. **A combat game:**
   - Enemy stats and procedures: Surge tables, not scripts (D23).
   - No death spirals: hit backs give Chi, and there are no wound penalties (D12).
   - Fight length: capped at 7 rounds (D24).
   - Turn order: free, with feeding rewarding the cycle's order (D13, D14).
   - Builds: every option was tested against the others and against a blank copy of itself (D16–D19).
   - Abilities that skip rolls: none. Quick's free strike is still a roll, and Tempest still rolls.
4. **The awakening:** costs 3 Chi; triggered by the first fighter going Down or by reaching the Heart; once a night; never free (D19).
5. **A fast start and a binding clock:** five ready-made fighters (D27), Hours and dawn (D24).
6. **Losing:** Down, not dead; the Anchor stands; loss at the Heart (D22, D25).

## 5. Design questions (DESIGN-RULES Part B)
All 14 questions from the original interview list are settled:
1. **Identity and tone:** D4–D10.
2. **Engine:** D11–D12.
3. **The four picks:** D5, D16–D19, D27.
4. **Combat:** D12–D15, D23.
5. **The awakening:** D19.
6. **The threat:** D23–D24.
7. **Resources:** D20.
8. **Failure:** D22.
9. **The night's structure:** D24, D25, D30.
10. **Party size:** D14, D15, D21.
11. **Ready-made content:** D27, D31.
12. **The first night:** D29.
13. **Simulator targets:** D28.
14. **Art direction and Foundry:** D32, D33.

**Still open, and not design questions:**
- The full title and trademark search (§2.1).
- The native-reader check of the Chinese terms (§2.5).
- The names of the Anchors, Wardens and ready-made fighters, written with the chapters.

## 6. What the simulator taught (for the chapters' advice, A17)
- **Clear the Stills, but not the last one.** Each standing Still heals the Warden or Heart. Ignoring them drops Standard from 75% to 55% wins; striking the pack down to its last Still and then switching is best.
- **Rest at about two-thirds Vigor.** Resting only below 40% drops Standard to 63%. Resting at 80% wins about as often but breaks fewer Anchors, so more nights end at dawn.
- **Spend Chi in the Hunt.** The Heart gives every fighter the 3 Chi they need to Awaken, and hoarding gains nothing.
- **Save the Awakening for the Heart** unless the fight is going badly. Awakening at the first chance costs about a point.
- **Walk the ring.** Acting in cycle order makes nearly every strike a fed strike.

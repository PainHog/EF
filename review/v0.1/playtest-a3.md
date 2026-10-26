# Playtest A3: first night, fresh table (Nightwake v0.1)

## Verdict

- **Blockers: none.** Both nights were played start to finish using only the book and its sheets.
- **Rulings the table had to invent on core flow** (the round, a Strike, feeding, losing Vigor and going Down, the enemies' step, the clocks, the endings): **none.** The book answered every core-flow question that came up, usually on the page where the table first looked. The table made five small rulings, all on setup or on rare style interactions, not on core flow:
  1. what a fighter who loses a pick clash changes to (S1, setup);
  2. whether the rolled picks come before or after clashes are settled (S2, setup);
  3. whether a fighter can pass their turn (M1; it never came up in play);
  4. whether Counter still answers when a Guardian takes the hit back for you (M2);
  5. whether a fighter Rallied this round is in play before "they act from the next round" (M3). This one sits closest to core flow, because it is about the Rally. The core part, that she takes her share of a Sweep once she is up, is settled by p12's "out of play until you stand up". The table only had to rule on whether she could use Guardian or Help that round, and the ruling didn't change anything.
- **Results:** Night 1 (Chapter 8, Standard): **win**, Heart broken in round 6 of 7. Night 2 (Chapter 9 tables, Easy): **win**, Heart broken in round 6 of 7.
- **Issues:** 0 blocker, 2 confusing, 9 minor (plus one table bookkeeping error, which was the table's fault and not the book's).

Table: one Storyteller who has read the book once; four players who have never played a roleplaying game (Ade, Bel, Cass, Dev). Rules used: only `book/src/chapters/*.html`, with page numbers from `book/dist/Nightwake_v0.1.pdf` (31 pages). Dice: `review/v0.1/playtest-a3-dice.log`, 175 lines. Line numbers in this report (L1, L2, ...) are lines in that file. Every roll came from the script; no roll was changed or rolled again except by Tide, using the script.

---

## Setup and timing

### The four fighters

| Player | How made | Fighter | Element | Style | Perk | Awakening | Vigor |
|---|---|---|---|---|---|---|---|
| Ade | ready-made | Dani Okafor, bike courier | Wood | Sweeper | Quick | Ascendant | 7 |
| Bel | ready-made (element changed after a clash) | Sam Whitlock, retired judo coach | Fire (was Water) | Counter | Trained | Unbreakable | 7 |
| Cass | built own, by choosing | Lena Moss, lifeguard at the public baths | Water | Guardian | Medic | Wellspring | 7 |
| Dev | built own, by rolling every pick | Hal Brennan, night-shift tunnel engineer | Earth | Breath | Tough | Tempest | 10 |

**How the picks went (p7).**
- Cass chose Water, Guardian, Medic and Wellspring after reading the tip on p7 ("most groups want at least one fighter whose picks help the others"). Water clashed with Sam's Water. Roll-off: Bel 5, Cass 6 (L1-L2), so Cass keeps Water. Bel had to "change only that pick" and asked "change it to what?" The book doesn't say (S1). Ruling: any element nobody has. Bel took Fire, because "+2 damage is easy to understand".
- Dev rolled after the others, once the clash was settled (S2). Element 5 = Water, taken; next free down the list, wrapping round to the top: Wood taken, Fire taken, so **Earth** (L3). Style 6 = **Breath** (L4). Perk 1 = **Tough** (L5). Awakening 1 = Ascendant, taken; Unbreakable taken; Wellspring taken; so **Tempest** (L6). The "next free one down the list" rule worked first time.
- The ring at this table: **Wood (Dani) → Fire (Sam) → Earth (Hal) → Water (Lena) → Wood**. Metal is missing and skipped. Nobody can shatter a Wood Shell.

**Setup time in book minutes** (the Storyteller's estimate of real table time for each step):

| Step | Minutes |
|---|---|
| Lines and pauses (p6 box) | 2 |
| Storyteller reads aloud the elements, the two cycles and the round (p22 list) | 5 |
| Ade and Bel take ready-made fighters | 2 |
| Cass reads the Chapter 2 lists and boxes, and chooses four picks | 10 |
| Clash roll-off; Bel re-picks Sam's element | 2 |
| Dev rolls four picks with the "next free one down the list" rule | 3 |
| Names, one line each, sheets filled in (Vigor, Chi, technique, feeds, shatters) | 6 |
| Storyteller fills in the Night sheet (Toughness, Anchors, Shells) | 4 |
| **Total** | **34** |

The two ready-made players were ready in about five minutes, as p7 promises, then waited about 25 minutes for the two builders. The book gives 20 minutes with ready-made fighters and 30-40 if everyone builds their own (p16), but says nothing about a mixed table (M4). Our 34 minutes falls in the all-built range.

### Newcomer questions during setup

| # | Question | Answered by the book? |
|---|---|---|
| Q1 | "I lost the clash for Water. What do I change it to?" | No. p7 says only "The others change only that pick". (S1) |
| Q2 | "Do I roll before or after the others settle their clash?" | Not clearly. p7: "Once the others have chosen". (S2) |
| Q3 | "What do I write under 'Feeds (at your table)'?" | Yes, but slowly: the answer is the ring on p12, two chapters away from the sheet. (M6) |
| Q4 | "What's a Shell? My sheet says I shatter Earth Shells." | Not in Part One. p5 points to Chapter 6, the Storyteller's part, and none of the three sheets has the Shell rule. (S3) |
| Q5 | "Do I have to strike on my turn, or can I wait?" | No. p11 says "take one action" but not whether you may pass. Nobody needed to pass. (M1) |
| Q6 | "Tough gives +3 maximum Vigor, so I start on 10?" | Yes: the fighter sheet's Vigor note says "+3 if Tough" (p28). |
| Q7 | "Can the Medic heal someone who is Down after a fight?" | Yes: the "Reading the perks" box (p9) says Down fighters stand up first. |

### What the players looked at on the sheets (p28-30)

- **Fighter sheet:** clear. Every box was used. Shading Vigor circles and crossing out the ones past your maximum worked well (Hal crossed out 3 of 13, the others 6). The "This fight" and "This round" checkboxes covered Bulwark and Guardian. Only "Feeds (at your table)" caused a question (M6).
- **Night sheet:** the Surge table, the round track with 4 and 7 marked, and the damage-by-fighter boxes did their jobs every round. Missing: how a Shell shatters (S3), and the Warden's half Toughness, the point at which its Shell breaks (M5).
- **At the Table card:** it answered every in-fight question about the roll, the order of a Strike, feeding and losing Vigor. It has nothing on Shells (S3).

---

## Night 1: The Night the Clocks Stopped (Chapter 8), Standard

Night sheet: Standard (the Heart's Crush 4, Sweep 2). Four fighters: Warden Toughness 36 (half 18); First Clash 8 Stills (24 Toughness); Anchor and Heart packs 4 Stills (12); a Call fills a pack up to 6 Stills. Heart Toughness (5 + 4 per Anchor standing) x 4.

Notation: V = Vigor, C = Chi. "Fed" means +1 damage from the ring.

### Prologue (about 10 minutes)

Each player described the moment their element woke. The Storyteller asked each one question from p22 (to Lena: "What did you see the Stills take?" Answer: the swimmers' reflections climbing out of the pool). Then the night bus station (p24): the passengers' reflections step off the bus.

### First Clash: the night bus station (8 Stills, 24 Toughness)

Start: everyone at full Vigor with 2 Chi; Hal's Breath takes him to 5 (2 + 4, capped at 5).

- **Before round 1:** Dani's Quick free Strike on the pack, 7 dice (5 + Quick + Chi die) (L7): 1 hit, Guard 1 met, 1 damage. Pack 23. Sweeper has no other target in the First Clash. The players chose the turn order Sam, Hal, Lena, Dani, so the ring carries on from Dani's Quick Strike.
- **Round 1.** Sam (fed), Blaze + Chi die + Hal's Help, 7 dice (L8): 3 hits, 3 + 2 + 1 = 6. Pack 17. Hal (fed), Bulwark on himself + Chi die (L9): 5 hits with two 6s, a Critical: 5 + 1 + 1 = 7, +1 C. Pack 10. Lena (fed), Tide + Chi die (L10): 1 hit; Tide reroll (L11) adds nothing; 1 + 1 = 2. Pack 8. Dani (fed), Chi die + Hal's Help (L12): 2 hits, 3 damage. Pack 5 (2 Stills). Enemies: there's no Warden, so no draw and no Surge. The Swarm deals 1 (half of 2) to Hal; his Bulwark takes it to 0.
- **Round 2.** Sam (fed) + Hal's Help (L13): 2 hits, 3 damage. Pack 2. Hal (fed) (L14): 4 hits, two 6s, a Critical: 6 damage. **Pack destroyed. First Clash won in round 2.**
- After the fight, the Medic has nobody to heal. Nobody went Down, so Awakenings stay closed.

End: Dani V7 C0, Sam V7 C0, Hal V10 C2, Lena V7 C0. Nobody was hit back, so the First Clash never showed the hit-back rule it is meant to teach (M7).

### The Hunt

The Storyteller read out all five Anchors (p24-25). The Shells the group can shatter: the Underpass (Earth, by Dani), the Iron Bridge (Metal, by Sam), the Reservoir (Water, by Hal) and the Substation (Fire, by Lena). The Greenhouse (Wood) needs Metal, which nobody has. The group chose the Underpass first, because Dani's Quick Strike lands before round 1 and can shatter its Shell straight away.

#### Hour 1: the Underpass, the Mason (Warden 36, Earth Shell; pack of 4 Stills, 12)

Hours: 4 → 3. Hal's Breath: C 5.

- **Before round 1:** Dani's Quick Strike on the Mason (Guard 2 for Wood) with Hal's Help, 7 dice (L15): 1 hit, short of the Guard, but a Quick Strike can't be hit back. 1 damage, and Wood's first hit **shatters the Earth Shell**. Mason 35; Guard 2 for everyone from now on.
- **Round 1.** Sam (fed) strikes the pack (L16): 0 hits. The pack hits him back for 1: Sam V6. His Counter deals 1 (pack 11) and he gains 1 + 1 = 2 C. Hal (fed), Bulwark on himself + Chi die, at the pack (L17): 2 hits, 3 damage, pack 8. Lena (fed) + Hal's Help, at the pack (L18): 2 hits, 3 damage, pack 5. Dani (fed) + Sam's Help, at the Mason (L19): 2 hits, Guard met, 3 damage (Mason 32), and Sweeper deals 1 to the pack (4, so 2 Stills). Damage this round: Dani 3. Enemies: the Mason draws 2 (34). Swarm 1 to Hal, Bulwark → 0. Surge **6, Call** (L20): +2 Stills, pack 4 → 10 (4 Stills).
- **Round 2.** Sam (fed), Blaze, at the pack (L21): 3 hits with three 6s, a Critical, with Trained: 3 + 2 + 1 + 1 + 2 = 9. Pack 1 (1 Still); Sam +2 C. Hal (fed), Chi die, at the Mason (L22): 2 hits, 3 damage (31). Lena (fed) + Sam's Help (L23): 1 hit, short of the Guard: 2 damage (29); hit back 2, Lena V5, +1 C. Dani (fed) (L24): 1 hit, short: 2 damage (27); hit back 2, Dani V5, +1 C. Enemies: draw 1 (28). Swarm 1 to Hal (V9). Surge **4, Sweep** (L25): everyone loses 1. Dani 4, Sam 5, Hal 8, Lena 4.
- **Round 3.** Sam (fed), Blaze (L26): 2 hits, 5 damage (23). Hal (fed) (L27): 2 hits, 3 damage (20). Lena (fed), Tide (L28): 0 hits; reroll (L29): 2 hits; 3 damage (17, now under half). Dani (fed), Chi die (L30): 1 hit, short: 2 damage (15); hit back, Dani V2, +1 C. Enemies: draw 1 (16). Swarm 1 to Hal (V7). Surge **5, Drain** (L31): Dani has the most Chi (1) and loses it.
- **Round 4.** Everyone is at 0 Chi. Sam (fed) (L32): 2 hits, 3 damage (13). Hal (fed) (L33): 1 hit, short: 2 damage (11); hit back, Hal V5, +1 C. Lena (fed) + Hal's Help (L34): 3 hits, two 6s, a Critical: 5 damage (6), +1 C. Dani (fed, V2) avoids a Guard-2 hit back that would put him Down and strikes the last Still instead (L35): 2 hits, 3 damage, pack destroyed; Sweeper deals 1 to the Mason (5). Damage this round: Sam 3, Hal 2, Lena 5, Dani 1. Enemies: no Stills left. Surge **2, Crush** (L36): 3 to Lena (the most damage): Lena V1. **End of round 4: a long fight, so it costs one more Hour.** Hours 3 → 2.
- **Round 5.** Sam (fed) (L37): 0 hits; hit back 2 (Sam V3); Counter 1 (Mason 4); Sam +2 C. Hal (fed: Sam's miss still counts as his action) + Sam's Help (L38): 1 hit, short: 2 damage (2); hit back, Hal V3, +1 C. Lena (fed, V1), Tide + Sam's Help (L39): 5 hits with two 6s. **The Mason falls. The Underpass breaks.** (A Critical: +1 C.)
- After the fight the Medic shares out 2: Lena +1 (V2), Dani +1 (V3).

End of Hour 1 (two Hours spent): Dani V3 C0, Sam V3 C0, Hal V3 C1, Lena V2 C1. Group Vigor 11 of 31.

#### Hour 3: Respite

The group was at about a third of its Vigor, far below the "about two-thirds" on p17 (M8). With two Hours left, they rested now rather than fight a Warden on 11 Vigor. Everyone back to full: Dani 7, Sam 7, Hal 10, Lena 7. Chi unchanged. Hours 2 → 1.

#### Hour 4: the Iron Bridge, the Girder (Warden 36, Metal Shell; pack of 4 Stills, 12)

Chosen because Sam (Fire) shatters it and comes straight after Dani's Quick Strike in the ring. Hours 1 → 0, so a long fight here would leave an Hour owed. Hal's Breath: C 5.

- **Before round 1:** Dani's Quick Strike on the pack + Hal's Help (L40): 0 hits. Nothing.
- **Round 1.** Sam (fed) + Hal's Help, at the Girder (Guard 2 for Fire) (L41): 1 hit, short of the Guard; Fire's first hit **shatters the Metal Shell**. **Table error:** Sam's player declared Blaze, but Sam had 0 Chi (it had all gone on Help at the end of the Underpass fight), and nobody noticed until the table checked every sheet after the night. The Strike was recorded as 1 + 2 (Blaze) + 1 (fed) = 4 damage (32); by the book it was 2 (34). See "Table errors" below. Sam was hit back for 2, and **Lena, the Guardian, took it** (she had 7, more than 2): Lena V5, +2 C. Sam still gains 1 C, and his Counter deals 1 (31) and gives 1 more C (M2). Hal (fed), Chi die + Bulwark on himself, at the pack (L42): 4 hits, 5 damage, pack 7. Lena (fed), Tide + Chi die, at the pack (L43): 2 hits; reroll (L44): 3 hits; 4 damage, pack 3 (1 Still). Dani (fed) + Lena's Help, at the Girder (L45): 2 hits, two 6s, a Critical: 4 damage (27); Sweeper deals 1 to the pack (2); +1 C. Damage this round: Sam 5 (4 + Counter 1), Dani 4. Enemies: draw 1 (28). Swarm 1 to Hal, Bulwark → 0. Surge **5, Drain** (L46): Sam has the most Chi (2) and loses 2.
- **Round 2.** Sam (fed) (L47): 2 hits, two 6s, a Critical with Trained: 2 + 1 + 1 + 2 = 6 damage (22), +2 C. Hal (fed), Chi die (L48): 2 hits, 3 damage (19). Lena (fed) + Sam's Help (L49): 2 hits, 3 damage (16). Dani (fed), Chi die (L50): 0 hits; hit back 2, Dani V5, +1 C. (Lena chose not to Guard him: Dani had more Vigor than she did.) Enemies: draw 1 (17). Swarm 1 to Hal (V9). Surge **2, Crush** (L51): 3 to Sam (6 damage, the most): Sam V4.
- **Round 3.** Sam (fed), Blaze (L52): 2 hits, two 6s, a Critical with Trained: 2 + 2 + 1 + 1 + 2 = 8 damage (9), +2 C. Hal (fed) + Sam's Help (L53): 3 hits, 4 damage (5). Lena (fed) + Sam's Help (L54): 4 hits, 5 damage. **The Girder falls. The Iron Bridge breaks.** No long fight and no Hour owed. (Without the error the Girder would have had 2 Toughness left at this point, with Dani, fed, to strike next.)
- After the fight the Medic shares out 2, both to Sam (V6).

The Hunt ends with two Anchors broken (the Underpass and the Iron Bridge) and three standing (the Greenhouse, the Substation and the Reservoir).

### The Heart: the clock tower (Standard)

Heart Toughness (5 + 4 x 3) x 4 = **68**, which agrees with the size table (36 + 16 + 16); half is 34. Pack of 4 Stills (12). Dawn after round 7. Everyone gains 3 Chi: Dani 1 → 4, Sam 0 → 3, Hal 0 → 5 (3 + Breath's 4, capped at 5), Lena 0 → 3. Vigor: Dani 5, Sam 6, Hal 9, Lena 5.

- **Before round 1:** Dani's Quick Strike on the Heart, Quick + Chi die (L55): 5 hits, Guard met, 5 damage (63); Sweeper deals 1 to the pack (11). This damage doesn't count toward round 1's Crush (p9).
- **Round 1.** Sam **Awakens: Unbreakable** (3 C) and strikes (fed) with Hal's Help (L56): 1 hit, short: 2 damage (61). He is hit back but loses nothing; Counter deals 1 (60); +2 C. Hal **Awakens: Tempest** (3 C). Strike 1 (fed), at the pack, with Bulwark on Dani (L57): 2 hits, 3 damage, pack 8. Strike 2 (not fed), at the Heart, with Sam's Help (L58): 1 hit, short, but it can't be hit back: 1 damage (59). Lena **Awakens: Wellspring** (3 C) and strikes the pack (fed) (L59): 1 hit, 2 damage, pack 6 (2 Stills). Dani **Awakens: Ascendant** (3 C) and strikes (fed) with Sam's Help (L60): 3 hits x 2 + 1 = 7 damage (52); Sweeper deals 1 to the pack (5). Damage this round: Sam 3, Hal 1, Dani 7. Enemies: draw 2 (54). The Swarm's 1 goes to Sam (Unbreakable: 0). Surge **1, Crush** (L61): 4 to Dani, and the Bulwark makes it 1: Dani V4.
- **Round 2.** Wellspring: 2 Vigor to Dani (V6). Sam (fed) (L62): 2 hits, 3 damage (51). Hal strike 1 (fed), at the pack (L63): 1 hit, 2 damage, pack 3 (1 Still). Strike 2, at the Heart (L64): 3 hits with three 6s, a Critical: 4 damage (47), +1 C. Lena (fed) (L65): 1 hit, short: 2 damage (45); hit back, Lena V3, +1 C. Dani (fed), Ascendant + Hal's Help (L66): 1 hit, short: 2 + 1 = 3 damage (42); hit back, Dani V4, +1 C. Damage this round: Sam 3, Hal 4, Lena 2, Dani 3. Enemies: draw 1 (43). Swarm 1 to Sam (0). Surge **2, Crush** (L67): 4 to Hal: V5.
- **Round 3.** Wellspring: 2 Vigor to Lena (V5). Sam (fed) (L68): 1 hit, short: 2 damage (41); hit back, Unbreakable, Counter 1 (40), +2 C. Hal strike 1 (fed) + Sam's Help (L69): 3 hits, three 6s, a Critical: 5 damage (35), +1 C. Strike 2, Bulwark on himself (L70): 2 hits, two 6s, a Critical: 3 damage (32, **now at or under half**), +1 C. Lena (fed), Tide (L71): 0 hits; reroll (L72): 2 hits; 3 damage (29). Dani (fed), Ascendant, Chi die + Sam's Help (L73): 1 hit, short: 3 damage (26); hit back 2, and **Lena Guards** him (V5 → 3, +2 C); Dani +1 C. Damage this round: Sam 3, Hal 8, Lena 3, Dani 3. Enemies: draw 1 (27). Swarm 1 to Sam (0). Surge **6, Call** (L74): pack 3 → 9 (3 Stills). All four Awakenings end.
- **Round 4.** Sam (fed), at the pack (L75): 2 hits, 3 damage, pack 6. Hal (fed), Chi die, at the pack (L76): 3 hits, two 6s, a Critical: 5 damage, pack 1, +1 C. Lena (fed), Tide + Chi die (L77): 2 hits with two 6s; reroll (L78) adds nothing; a Critical: 4 damage (23), +1 C. Dani (fed), Chi die (L79): 2 hits, 3 damage (20); Sweeper kills the last Still. Damage this round: Lena 4, Dani 3. Enemies: no Stills. Surge **2, Crush** (L80): 4 to Lena (V3): **Lena is Down** and loses her Chi.
- **Round 5** ("The sky's going grey"). Sam (fed) (L81): 3 hits, two 6s, a Critical with Trained: 7 damage (13), +2 C. Hal (fed), Chi die + Sam's Help (L82): 1 hit, short: 2 damage (11); hit back, Hal V3, +1 C. Dani can't be fed while Lena is Down, so he **Rallies Lena** (V2; she acts next round). Damage this round: Sam 7, Hal 2. Surge **2, Crush** (L83): 4 to Sam: V2.
- **Round 6.** Sam (fed by Dani's Rally), Blaze (L84): 1 hit, short: 1 + 2 + 1 = 4 damage (7); hit back 2, and **Sam is Down**, but his Counter still lands (6). Hal (fed: Sam's action before he went Down still feeds), Chi die (L85): 1 hit, short: 2 damage (4); hit back, Hal V1, +1 C. Lena (fed) + Hal's Help (L86): 3 hits, 3 + 1 = 4 damage. **The Heart falls in round 6. WIN.**

### Epilogue

The clock tower strikes midnight six hours late (p25). Each player said where their fighter watched the sunrise and the one thing they will never tell anyone. Sam's player said she will never tell her Tuesday class that her judo is now on fire.

### Night 1 result

**Win at Standard.** The Heart broke in round 6 of 7, with two Anchors broken and three standing. The four Hours: the Underpass (1) + its long fight (1) + a Respite (1) + the Iron Bridge (1). Fighters Down: Lena (Heart, round 4) and Sam (Heart, round 6); nobody went Down in the Hunt. The table error (2 damage too many on the Girder) almost certainly didn't change the result: the Girder would still have fallen in round 3, with no long fight, and every later number would be the same.

Book minutes of play: Prologue and First Clash 20, Underpass 35, Respite 5, Iron Bridge 20, Heart 40, Epilogue 10. That's about 2 hours 10 minutes, plus 34 minutes of setup.

---

## Night 2: a night built from the Chapter 9 tables, Easy

The same four fighters, reset as p5 says: starting Vigor, 2 Chi and an unused Awakening. In the Prologue each player said where their fighter had been since the first night (Sam has been flinching at every stopped clock; Hal went back to the tunnels and found the tiles still warm).

### Building the night (every table rolled, L87-L98; about 8 minutes)

| Table | Roll | Result |
|---|---|---|
| First Clash | 3 (L87) | A 24-hour supermarket: the security monitors show grey shoppers who aren't there. |
| Wood Shell (shattered by Metal) | 5 (L88) | The cemetery's yew avenue: **the Keeper**, a hedge cut into the shape of a man |
| Fire Shell (shattered by Water) | 1 (L89) | The substation by the canal: **the Stoker**, frozen grey flame |
| Earth Shell (shattered by Wood) | 6 (L90) | The deepest underground station: **the Tunneller**, clay, tiles and grey roots of cable |
| Metal Shell (shattered by Fire) | 4 (L91) | The church bell tower: **the Tolling**, a bell that rings without sound |
| Water Shell (shattered by Earth) | 5 (L92) | The weir on the river: **the Undertow**, a waterfall frozen mid-fall |
| Sign, Wood Anchor | 2 (L93) | Every clock, phone and screen showing 23:58 |
| Sign, Fire Anchor | 2 (L94), taken → 3 | Shadows walking away from the people who cast them |
| Sign, Earth Anchor | 5 (L95) | Colour draining out of everything, street by street |
| Sign, Metal Anchor | 2 (L96), taken → 3 taken → 4 | Sound arriving late |
| Sign, Water Anchor | 2 (L97), taken → 3, 4, 5 taken → 6 | A crowd frozen mid-step, every face turned toward the Anchor |
| Heart | 5 (L98) | In the fountain of the main square, where the water stands still |

The four steps on p26 and the "next sign down" rule worked without a question. Four of the five sign rolls came up 2, so the wrap-around rule got a real test, and it held.

Night sheet: Easy (the Heart's Crush 2, Sweep 1). Every other number is the same as Night 1.

### First Clash: the supermarket (8 Stills, 24 Toughness)

Hal's Breath: C 5.

- **Before round 1:** Dani's Quick Strike, Quick + Chi die (L99): 2 hits with two 6s, a Critical: 3 damage (21), +1 C.
- **Round 1.** Sam (fed), Blaze (L100): 1 hit, 1 + 2 + 1 = 4 (17). Hal (fed), Bulwark on himself + Chi die (L101): 2 hits, 3 (14). Lena (fed), Tide + Hal's Help (L102): 3 hits with two 6s; reroll (L103): 4 hits; a Critical: 6 (8), +1 C. Dani (fed), Chi die (L104): 2 hits, 3 (5, so 2 Stills). Swarm 1 to Hal, Bulwark → 0.
- **Round 2.** Sam (fed), Blaze (L105): 1 hit, 4 (1). Hal (fed) (L106): 2 hits. **Pack destroyed. Won in round 2**, and again nobody lost any Vigor (M7).

End: Dani V7 C1, Sam V7 C0, Hal V10 C2, Lena V7 C2.

### The Hunt

Shells the group can shatter: the Tunneller (Earth, Dani), the Tolling (Metal, Sam), the Undertow (Water, Hal) and the Stoker (Fire, Lena); the Keeper (Wood) needs Metal. Having learned from Night 1, the group opened where Dani's Quick Strike can shatter the Shell.

#### Hour 1: the deepest underground station, the Tunneller

Hours 4 → 3. Hal's Breath: C 5.

- **Before round 1:** Dani's Quick Strike on the Tunneller, Quick + Chi die (L107). Hal offered to Help, but that would have been a third bonus die, past the cap (p11), so he didn't. 3 hits, two 6s, a Critical: 4 damage (32); Wood's first hit **shatters the Earth Shell**; Sweeper deals 1 to the pack (11); +1 C.
- **Round 1.** Sam (fed) + Hal's Help, at the pack (L108): 1 hit, 2 (pack 9). Hal (fed), Bulwark on himself + Chi die, at the pack (L109): 2 hits, 3 (6). Lena (fed), Tide, at the pack (L110): 0 hits; reroll (L111): 1 hit; 2 (4, so 2 Stills). Dani (fed), Chi die, at the Tunneller (L112): 0 hits; hit back 2, and **Lena Guards** him (V7 → 5, +2 C); Dani +1 C. Nobody damaged the Warden this round. Enemies: draw 2 (34). Swarm 1 to Hal, Bulwark → 0. Surge **4, Sweep** (L113): Dani 6, Sam 6, Hal 9, Lena 4.
- **Round 2.** Sam (fed) + Lena's Help, at the pack (L114): 1 hit, 2 (pack 2, 1 Still). Hal (fed), Chi die + Bulwark on himself (L115): 3 hits, 4 (30). Lena (fed), Tide + Chi die (L116): 1 hit; reroll (L117) adds nothing; short of the Guard: 2 (28); hit back, Lena V2, +1 C. Dani (fed), Chi die (L118): 1 hit, short: 2 (26); hit back, Dani V4, +1 C. Enemies: draw 1 (27). Swarm 1 to Hal, Bulwark → 0. Surge **3, Sweep** (L119): Dani 3, Sam 5, Hal 8, Lena 1. The group could have withdrawn now (Warden 27, group Vigor 17 of 31). They chose to press on.
- **Round 3.** Sam (fed) (L120): 2 hits, 3 (24). Hal (fed) (L121): 5 hits with four 6s, a Critical: 7 (17, under half), +1 C. Lena (fed, V1), Tide, at the last Still, where a miss costs only 1 (L122): 4 hits, three 6s; the pack is destroyed; +1 C. Dani (fed), Chi die (L123): 2 hits, 3 (14). Enemies: no Stills. Surge **4, Sweep** (L124): **Lena is Down** (1 → 0); Dani 2, Sam 4, Hal 7. Awakenings are now open, but nobody has 3 Chi.
- **Round 4.** Sam (fed) (L125): 2 hits, 3 (11). Hal (fed), Bulwark on Dani (L126): 1 hit, short: 2 (9); hit back, Hal V5, +1 C. Dani can't be fed while Lena is Down. With the Bulwark covering him, he strikes rather than Rallying (L127): 1 hit, short: 1 damage (8); hit back 2, and the Bulwark takes it to 0; +1 C. Damage this round: Sam 3, Hal 2, Dani 1. Surge **2, Crush** (L128): 3 to Sam: V1. **End of round 4: a long fight.** Hours 3 → 2.
- **Round 5.** Sam (fed, V1) with Help from both Hal and Dani, 7 dice (L129): 6 hits with four 6s, a Critical with Trained: 6 + 1 + 1 + 2 = 10. **The Tunneller falls.**
- After the fight Lena stands up with 1 Vigor; then the Medic shares out 2: Sam +1 (V2), Lena +1 (V2).

End of Hour 1 (two Hours spent): Dani V2 C0, Sam V2 C2, Hal V5 C0, Lena V2 C0. Group Vigor 11 of 31, exactly as in Night 1.

#### Hour 3: Respite

Everyone back to full; Chi unchanged. Hours 2 → 1.

#### Hour 4: the church bell tower, the Tolling (Metal Shell)

Hours 1 → 0. Hal's Breath: 0 + 4 = C 4.

- **Before round 1:** Dani's Quick Strike on the pack + Hal's Help (L130): 4 hits, 4 damage (pack 8); Sweeper deals 1 to the Tolling (35). The Sweeper damage doesn't shatter the Shell (p9).
- **Round 1.** Sam (fed), Blaze + Chi die (L131): 1 hit, short; 1 + 2 + 1 = 4 (31); Fire's first hit **shatters the Metal Shell**. Hit back 2, and **Lena Guards** him (V7 → 5, +2 C); Sam +1 C, and his Counter deals 1 (30) and gives +1 C. Hal (fed), Chi die + Bulwark on himself, at the pack (L132): 2 hits, two 6s, a Critical: 4 (pack 4), +1 C. Lena (fed), Tide + Chi die, at the pack (L133): 1 hit; reroll (L134): 2 hits; 3 (pack 1). Dani (fed) + Hal's Help (L135): 4 hits, 5 (25); Sweeper kills the last Still. Damage this round: Sam 5, Dani 5, a tie. Enemies: no Stills. Surge **4, Sweep** (L136): Dani 6, Sam 6, Hal 10 (his unused Bulwark takes it), Lena 4.
- **Round 2.** Sam (fed), Blaze (L137): 2 hits, 5 (20). Hal (fed), Chi die (L138): 3 hits, 4 (16). Lena (fed) + Sam's Help (L139): 2 hits, 3 (13). Dani (fed) (L140): 0 hits; hit back, Dani V4, +1 C. Surge **6, Call** (L141): the pack was gone, so the 2 Stills form a new one (6 Toughness). New Stills don't Swarm until next round.
- **Round 3.** Sam (fed) (L142): 1 hit, short: 2 (11); hit back, Sam V4; Counter 1 (10); +2 C. Hal (fed) + Sam's Help (L143): 4 hits, three 6s, a Critical: 6 (4), +1 C. Lena (fed) + Sam's Help (L144): 2 hits, 3 (1). Dani (fed), Chi die (L145): 2 hits. **The Tolling falls**, and its Stills crumble.
- After the fight the Medic shares out 2: Dani +1 (V5), Sam +1 (V5).

The Hunt ends with two Anchors broken (the Tunneller and the Tolling) and three standing (the Keeper, the Stoker and the Undertow), exactly as in Night 1.

### The Heart: the fountain in the main square (Easy)

Toughness 68, half 34. Everyone gains 3 Chi: Dani 3, Sam 3, Hal 5 (1 + 3 + 4, capped), Lena 3. Vigor: Dani 5, Sam 5, Hal 10, Lena 4.

- **Before round 1:** Dani's Quick Strike + Hal's Help (no Chi die, so that he keeps 3 Chi to Awaken) (L146): 2 hits, two 6s, a Critical: 3 (65); Sweeper deals 1 to the pack (11); +1 C.
- **Round 1.** Sam **Awakens: Unbreakable**, strikes (fed) with Hal's Help (L147): 2 hits, 3 (62). Hal **Awakens: Tempest** and declares both Strikes at the pack (the two rolls went in one call): strike 1 (fed) (L148): 2 hits, 3 (pack 8); strike 2 (L149): 0 hits, and it can't be hit back. Lena **Awakens: Wellspring**, at the pack (fed) (L150): 3 hits, two 6s, a Critical: 5 (pack 3, 1 Still), +1 C. Dani **Awakens: Ascendant**, Chi die (L151): 1 hit, short: 2 + 1 = 3 (59); hit back, Dani V3, +1 C. Damage this round: Sam 3, Dani 3, a tie, broken by who acted last (p20): Dani. Enemies: draw 1 (60). Swarm 1 to Sam (Unbreakable: 0). Surge **1, Crush** (L152): 2 to Dani, and **Lena Guards** him (V4 → 2, +2 C).
- **Round 2.** Wellspring: Lena +1 (V3), Dani +1 (V4). Sam (fed) + Lena's Help (L153): 2 hits, 3 (57). Hal strike 1 (fed) (L154): 3 hits, 4 (53). Strike 2 (L155): 3 hits, 3 (50). Lena (fed), Tide + Chi die (L156): 2 hits; reroll (L157): 4 hits; 5 (45). Dani (fed), Ascendant, Chi die (L158): 2 hits, two 6s, a Critical: 2 x 2 + 1 + 1 = 6 (39); Sweeper deals 1 to the pack (1); +1 C. Damage this round: Sam 3, Hal 7, Lena 5, Dani 6. Enemies: draw 1 (40). Swarm 1 to Sam (0). Surge **1, Crush** (L159): 2 to Hal: V8.
- **Round 3.** Wellspring: Lena +1 (V4), Dani +1 (V5). Sam (fed) (L160): 1 hit, short: 2 (38); hit back, Unbreakable; Counter 1 (37); +2 C. Hal strike 1 (fed) + Sam's Help (L161): 4 hits, two 6s, a Critical: 6 (31, **under half**), +1 C. Strike 2, Chi die + Sam's Help (L162): 2 hits, two 6s, a Critical: 3 (28), +1 C. Lena (fed) + Hal's Help (L163): 2 hits, 3 (25). Dani (fed), Ascendant, Chi die (L164): 1 hit, short: 3 (22); hit back, Dani V3, +1 C. Enemies: draw 1 (23). Swarm 1 to Sam (0). Surge **4, Sweep 1** (L165): Dani 2, Hal 7, Lena 3, Sam 5 (Unbreakable). All four Awakenings end.
- **Round 4.** Sam (fed) (L166): 3 hits, 4 (19). Hal (fed) (L167): 2 hits, 3 (16). Lena (fed) (L168): 1 hit, short: 2 (14); hit back, Lena V1, +1 C. Dani (fed, V2) strikes the last Still, where a miss costs only 1 (L169): 2 hits, and the Still is destroyed; Sweeper deals 1 to the Heart (13). Enemies: no Stills. Surge **4, Sweep 1** (L170): **Lena is Down**; Dani 1, Sam 4, Hal 6.
- **Round 5.** Sam (fed) (L171): 1 hit, short: 2 (11); hit back, Sam V2; Counter 1 (10); +2 C. Hal (fed) + Sam's Help (L172): 3 hits, 4 (6). Dani (V1, can't be fed) **Rallies Lena** (V2) rather than risk a hit back. Surge **4, Sweep 1** (L173): **Dani is Down**; Sam 1, Hal 5, Lena 1. (Lena, just Rallied and on 2 Vigor, could have used Guardian to take Dani's share, but that would only have put her Down instead of him. The table had to decide whether a fighter Rallied this round can use Guardian at all: M3.)
- **Round 6.** Sam (fed by Dani's Rally, V1), Blaze (L174): 2 hits, 2 + 2 + 1 = 5 (1). Hal (fed) (L175): 1 hit, 1 + 1 = 2. **The Heart falls in round 6. WIN.**

### Epilogue

The fountain starts to run again, a second late. Each player named the first person they called.

### Night 2 result

**Win at Easy.** The Heart broke in round 6 of 7, with two Anchors broken and three standing. The four Hours: the Tunneller (1) + its long fight (1) + a Respite (1) + the Tolling (1), the same shape as Night 1. Fighters Down: Lena (Tunneller, round 3), Lena (Heart, round 4) and Dani (Heart, round 5). At the end the Heart was on 6 Toughness with two fighters Down and Sam on 1 Vigor.

Book minutes: build 8, Prologue 5, First Clash 10, Tunneller 35, Respite 5, Tolling 20, Heart 40, Epilogue 10. That's about 2 hours 15 minutes.

---

## Issues

Severity: **blocker** (the table can't go on), **confusing** (the table stops and the book doesn't settle it quickly), **minor** (a gap or rough edge with an obvious answer).

### Confusing

**S1. A fighter who loses a pick clash isn't told what to change to.** (p7)
> "Everyone chooses all four picks, then any clash is settled pick by pick: everyone who wants it rolls a die and the highest roll keeps it (roll again on a tie). The others change only that pick; a ready-made fighter keeps the rest of theirs."

At this table a ready-made fighter (Sam) lost his element to a newcomer's build, and his player asked straight away, "change it to what?" Choose freely? Roll? Take the next free one down the list? The book doesn't say. It also leaves open what happens when the new choice causes a second clash.
*Suggested fix:* "The others change only that pick, to any one nobody has (or roll for it, as below)."
*Ruling used tonight:* the loser picks any option nobody has.

**S3. The Shell rule is on none of the three sheets and not in Part One, yet players write "Shatters" on their fighter sheet.** (p5, p20, p28-30)
p5: "Each element **shatters** one kind of armour the Unmade wears (Chapter 6)." The rule itself is only in the Warden stat block on p20: "+1 Guard (Guard 3) until it shatters. The element that shatters the Shell ignores it, and that element's first hit shatters it. It also shatters once the Warden is at half its Toughness or less." The Night sheet says only "Warden: Guard 2 (+1 Shell)" with a "Shell shattered" box, and the At the Table card doesn't mention Shells. At the first Anchor, all four players asked what their Guard was. The Storyteller had to explain the Shell from p20 (which p22 does tell them to do), and then had to repeat it at every Anchor: who has Guard 2, when the Shell breaks, and that Sweeper damage doesn't break it.
*Suggested fix:* add one line to the At the Table card and the Night sheet: "Shell: the Warden's Guard is 3 until its Shell shatters. Against the element that shatters it, the Guard is 2, and that element's first hit shatters it. It also shatters at half Toughness. Sweeper damage never shatters it."
*Ruling used tonight:* the Storyteller read p20 aloud at the first Anchor, as p22 says.

### Minor

**S2. Rolled picks: before or after clashes are settled?** (p7)
> "Rather leave it to the dice? Once the others have chosen, roll a die for each pick..."

"Once the others have chosen" could mean once they've written their picks down, or once their clashes are settled. If you roll first, a rolled pick can clash with a choice nobody has settled yet.
*Suggested fix:* "Once the others have chosen and settled any clashes, roll..."
*Ruling used tonight:* settle the clashes first, then roll.

**M1. Can a fighter pass their turn?** (p11)
> "When it is your turn, take **one action**: Strike ... Rally ..."

Newcomers asked whether they could wait. It didn't matter at this table, but a cautious player on 1 Vigor might want to sit out a round rather than risk a hit back.
*Suggested fix:* one sentence, either "You must take an action" or "You may skip your action (it doesn't feed)".
*Ruling used tonight:* you must Strike or Rally. Nobody tested it.

**M2. Guardian takes a hit back: does the struck fighter's Counter still answer?** (p8, p9, p14)
p14 settles the Chi: "1 each time an enemy hits you back ... even when a Guardian takes the loss for you". It doesn't say whether Counter ("When an enemy hits you back, deal it 1 damage and gain 1 more Chi") still fires when someone else took the loss. This came up twice (Night 1, Iron Bridge round 1; Night 2, Tolling round 1). The Guardian-plus-Counter pair is one of the strongest engines at the table: one hit back gave 2 Chi to Lena, 2 Chi to Sam and 1 damage, at a cost of 2 of Lena's Vigor.
*Suggested fix:* add to "Reading the styles" (p9): "The fighter who was hit back still gains the Chi, and their Counter still answers."
*Ruling used tonight:* yes, Counter answers.

**M3. A fighter Rallied this round: are they in play before they "act from the next round"?** (p11)
> "Rally a Down fighter: they get up with 2 Vigor. No roll. They act from the next round."

In Night 2 (Heart, round 5) Lena was Rallied and a Sweep followed. Plainly she takes her share, because she is no longer Down. But could she use Guardian (a style, "always on", p8) or Help (which is "free, not an action", p11) in the round she stood up? "They act from the next round" reads as though she does nothing until then.
*Suggested fix:* "They act from the next round, but they are back in play at once: they take losses, their style and perk work, and they can Help."
*Ruling used tonight:* back in play at once; only her action waits. (The question didn't change the outcome.)

**M4. Setup time for a mixed table is not stated, and the setup times are scattered.** (p5, p7, p16, p22)
p5: "about half an hour of setup (20 minutes with the ready-made fighters)"; p7: "With them, the fighters are ready in five minutes"; p16: "20 minutes with ready-made fighters, 30–40 if everyone builds their own"; p22: "First night in under 30 minutes". This table, with two ready-made fighters and two built, took 34 minutes, and the ready-made players waited about 25 of them.
*Suggested fix:* give one setup line in the p16 table that covers mixed tables ("30-40 if anyone builds their own"), and suggest that ready-made players read the round on p11 while the others build.
*Ruling used tonight:* none needed.

**M5. The Night sheet gives the Heart's half Toughness but not the Warden's, and the Warden's half is when its Shell breaks.** (p29)
> "Warden: Guard 2 (+1 Shell), Harm 2, Toughness 9 × fighters" / "Heart: ... Toughness (5, or 6 with five, + 4 × Anchors standing) × fighters, and half"

*Suggested fix:* "Warden: ... Toughness 9 × fighters, and half (its Shell breaks there)".
*Ruling used tonight:* the Storyteller wrote "half 18" in the box.

**M6. "Feeds (at your table)" on the fighter sheet left newcomers unsure what to write.** (p28)
Chapter 2 prints "Feeds: Fire" for Wood, but at this table Metal was missing, so Hal (Earth) feeds Water, not Metal. The sheet's "(at your table)" hints at this, but the rule is on p12.
*Suggested fix:* "Feeds: the next element round your table's ring (skip any nobody has)", or print the ring Wood → Fire → Earth → Metal → Water in the box so players can cross out the missing ones.
*Ruling used tonight:* the Storyteller read out the ring from the Night sheet's "Fighters and ring" line.

**M7. The First Clash didn't teach the hit back either night.** (p16, p22)
p16: "It throws the fighters together and teaches the rules." Both First Clashes ended in round 2. No fighter lost any Vigor and nobody missed the pack's Guard of 1 (with 5 dice you meet Guard 1 about 87 times in 100, and more often with bonus dice). So the first hit back each night came at the first Anchor, together with the Shell, the draw and the Surge, which p22 already says to explain there.
*Suggested fix* (no numbers changed): in Chapter 7's Prologue advice, "If nobody misses in the First Clash, walk through the hit back with the p11 example before the first Anchor."
*Ruling used tonight:* the Storyteller explained the hit back at the first Anchor.

**M8. "Rest at about two-thirds" couldn't be acted on: one Anchor fight took the group from full to about a third.** (p17)
> "Rest at about two-thirds. Take a Respite when the group is down to about two-thirds of its Vigor."

Both nights, the first Anchor fight took the group from 31 to 11 Vigor (35 percent). There was never a moment between fights when the group was near two-thirds. The players asked, "did we do it wrong?" They weren't sure whether the advice meant "rest after every fight" or "push on until two-thirds". It made the Hunt feel the same both nights: Anchor, long fight, Respite, Anchor, Heart.
*Suggested fix:* say what the advice means in fights: "Most groups need a Respite after each hard Anchor fight. If you finish a fight above two-thirds, push on."
*Ruling used tonight:* the table rested whenever it was below two-thirds, which in practice meant after every Anchor fight but the last.

### Table errors (the table's fault, not the book's)

- **Night 1, Iron Bridge round 1 (L41):** Sam's player declared Blaze with 0 Chi: all his Chi had gone on Help at the end of the previous fight. It was found when the table checked every sheet after the night. Effect: the Girder took 2 damage too many. It still fell in round 3 with no long fight, and every number after that is unchanged. The cause: Help spends from another player's sheet in the middle of someone else's turn, and four players gave Help about 40 times (41 counted) between them over the two nights. Not a book issue, but worth one line on the At the Table card: "Rub out the Chi when you say you're spending it."
- **Night 2, Heart round 1 (L148-149):** Hal's two Tempest Strikes were rolled in one call. Hal had declared both at the pack before rolling, so no decision depended on the first result.

---

## What worked

- **Core flow needed no invented rulings.** The round (p11), the order of a Strike (p12), feeding (p12), the protections and going Down (p12), the enemies' step (draw, Swarm, Surge), the long fight and the endings were all answered by the first page the table looked at. The At the Table card alone covered nearly every in-fight question.
- **The ring is easy and it rewards the table.** After one round the players naturally acted in ring order, and almost every Strike was fed. The edge cases were all in the book: the Quick Strike feeding the first fighter in round 1, a miss still feeding, an action taken before going Down still feeding, and nobody being fed past a Down fighter.
- **Small rules that each settled a moment at the table:** the cap of two bonus dice (Hal couldn't Help a Quick Strike that already had a Chi die); "Crush on a tie goes to the fighter who acted last" (used twice); the Quick Strike's damage not counting for round 1's Crush; "A Call with no pack forms a new one"; Sweeper damage not shattering a Shell.
- **The Night sheet** kept every clock where everyone could see it. The damage-by-fighter boxes made the Crush target obvious every round, and the bold 4 and 7 on the round track made the long fight impossible to forget.
- **Chapter 9's build** took 8 minutes, and the "next sign down" rule handled four repeated 2s cleanly.
- **The ready-made fighter and the rolled build both played well.** Dev's rolled Earth / Breath / Tough / Tempest fighter was a strong Chi battery and a heavy hitter at the Heart. Nobody felt stuck with a weak fighter.
- **Awakenings at the Heart felt big.** All four Awakened in round 1 both nights. Ascendant and Tempest drove the Heart under half by round 3 each time, Unbreakable soaked every Swarm, and Wellspring kept the two lowest fighters standing.

## How it felt

- **Was losing a real risk?** In the Hunt, yes: the Night 2 Tunneller fight had Lena Down, Sam on 1 Vigor and Dani on 2 before Sam's 6-hit roll ended it. At the Heart, less so. Both nights the Heart was under half by round 3, which made "driven off" safe unless everyone went Down. Then attrition made the finish tense: Night 1 ended with Sam Down and Hal on 1, and Night 2 with Lena and Dani Down and Sam on 1. A loss would have needed everyone Down, and that never looked likely. That fits the book's claim that ready-made-heavy groups are a little stronger than average (p9).
- **Easy and Standard felt almost the same** with this group. The two nights had the same shape and the same round-6 finish. The only visible difference was that the Heart's Crushes hit for 2 instead of 4. Two nights are too few to read anything into that.
- **Was Chi spent?** Constantly. Nobody sat on Chi. The usual pattern was to spend it the turn it arrived, on Help, Blaze or Tide. Help was by far the most common use (41 Helps over the two nights). Hal's Breath (+4 Chi at every fight) made him the group's Chi battery, and Lena's Guardian turned hit backs on other fighters into 2 Chi for herself.
- **A dominant tactic?** Nothing broke the game, but three habits came up every fight. (1) Open with the Quick Strike from the fighter whose element shatters the Shell, or straight before the one who does. (2) Kill the pack first with the fed Strikes, then turn on the Warden. (3) At the Heart, everyone Awakens in round 1 and every Swarm goes to the Unbreakable fighter (the players choose the Swarm's target). None of these felt wrong. (3) is strong, but it lasts only three rounds.
- **The Hunt felt the same both nights.** A single Anchor fight cost two-thirds of the group's Vigor and usually ran to a long fight, so both Hunts went Anchor, long fight, Respite, Anchor, and the Heart started at 68 both times (M8). Going where your Shells shatter (p17) was clear, interesting advice. "How many Anchors can we break" never really came up as a choice: the answer was two.
- **How long?** Setup 34 minutes. Night 1 about 2 hours 10 minutes of play; Night 2 about 2 hours 15 minutes including an 8-minute build. That's under the "about three hours" on p5, because each Hunt had two Anchor fights, not four.

## Results

| | Night 1 | Night 2 |
|---|---|---|
| Night | Chapter 8, The Night the Clocks Stopped | Built from the Chapter 9 tables (every table rolled) |
| Difficulty | Standard | Easy |
| First Clash | won in round 2, no Vigor lost | won in round 2, no Vigor lost |
| Hours | Underpass (long fight, 2 Hours), Respite, Iron Bridge | Tunneller (long fight, 2 Hours), Respite, Tolling |
| Anchors broken / standing | 2 / 3 | 2 / 3 |
| Heart Toughness | 68 (half 34) | 68 (half 34) |
| Heart under half | after round 3 | after round 3 |
| Ending | **Win**, Heart broken in round 6 of 7 | **Win**, Heart broken in round 6 of 7 |
| Fighters Down | 2 (both at the Heart) | 3 (one in the Hunt, two at the Heart) |
| Long fights / Hours owed | 1 / 0 | 1 / 0 |
| Play time (book minutes) | about 130, plus 34 setup | about 135, including the build |
| Dice lines | L1-L86 (setup L1-L6) | L87-L175 |

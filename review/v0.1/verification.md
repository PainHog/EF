# Nightwake v0.1: verification of the review fixes

Reviewer: the reviewer (verification pass, `docs/REVIEW-PROCEDURE.md` section 4).

**Sources.** `book/src/chapters/*.html` in filename order and the built `book/dist/Nightwake_v0.1.pdf` (31 pages; page numbers below are PDF pages). `docs/CORE-RULES.md`; `sim/engine.mjs`, `sim/params.mjs`, `sim/REPORT.md`; `module/logic/rules.mjs`, `module/gm/ops.mjs` (with a look at `module/config.mjs` and `templates/`). Checked against `review/v0.1/rules-review.md`, `playtest-a.md` section 6, `playtest-b.md` Issues, `REVIEW.md`, `book/REVIEW.md` rows 6 to 22 and `docs/DESIGN.md` D37 to D40.

**PDF.** The text of all 31 pages was extracted and compared with the chapter source. They match: the PDF was built (03:22) after the last chapter edit. The contents page is right (Ch 1 p5, Ch 2 p7, Ch 3 p11, Ch 4 p14, Ch 5 p16, Part Two p18, Ch 6 p19, Ch 7 p22, Ch 8 p24, Ch 9 p26, sheets p28 to 30). Pages 10, 13, 15, 21 and 25, the short ones after the reflow, were looked at as images: each is filled out by a spot picture, so there is no near-empty page.

**Status words.**
- **fixed**: the fix is in the book.
- **partly fixed**: the main point is fixed, but a piece is left over.
- **not changed**: nothing was done.
- **changed differently**: settled another way than the report suggested.
- **left alone**: deliberately not changed, as listed in `REVIEW.md` section 4.

## Summary

| Report | Items | Fixed | Partly fixed | Changed differently | Not changed | Left alone |
|---|---|---|---|---|---|---|
| Rules review (B1, C1 to C12, M1 to M30) | 43 | 37 | 6 | 0 | 0 | 0 |
| Playtest A (issues 1 to 17) | 17 | 13 | 1 | 2 | 1 | 0 |
| Playtest B (B-01 to B-27) | 27 | 25 | 0 | 0 | 0 | 2 |
| **All** | **87** | **75** | **7** | **2** | **1** | **2** |

- **The blocker is closed.** A Down fighter is out of play in the book, the sheets, the one-page summary, the simulator and the online version.
- **Simulator.** Re-run with the same settings and seed, it reproduces `sim/REPORT.md` exactly, every section. It plays the new rules as the book states them.
- **New issues:** no blockers, 1 confusing, 12 minor. The confusing one is Guardian with Stubborn, which is the ready-made Marcus Bell (N1).
- **Online version:** two mismatches change results.
  - It lets a fighter Awaken before Quick's free Strike. The ready-made Dani Okafor, who is Quick and Ascendant, then doubles that Strike at the Heart (O1).
  - It gives the Guardian 2 Chi when Stubborn kept them up, even though they lost less than 2 Vigor (O2, the same edge as N1).

  A few leftover old words appear in its chat text and fighter sheet.

## 1. Every previous item

### Rules review

| # | Status | Page | New text (exact quote) and notes |
|---|---|---|---|
| B1 | fixed | 12, 19, 20, 29, 30 | p12: "you are out of play: nobody can choose you for anything (a Swarm, a Bulwark, Renewal, Help, a share of Chi), you take no losses and gain no Chi, and your style, perk and technique do nothing, until a Rally or a Wellspring share stands you up." p19 Swarm: "to one fighter who isn’t Down, of the players’ choice." p20: "Crush on a Down fighter: it goes to the standing fighter who dealt it the next most damage this round; if no standing fighter damaged it, to the fighter with the most Vigor." The card (p30) repeats it: "Down: out of play (no actions, Help, losses, Chi or powers, and nobody can choose you)". See N7 for the unstated exceptions. |
| C1 | fixed | 7, 30 | p7 Renewal: "After the roll, you or an ally who isn’t Down regains 1 Vigor, whatever the result." Card: "you or a standing ally +1 Vigor". |
| C2 | fixed | 20, 29 | p20, as in B1. Night sheet: "Crush: most damage this round, standing fighters only (else most Vigor)". |
| C3 | fixed | 29, 22 | Night sheet: "Damage to the Warden or Heart this round, by fighter (for the Crush). Clear each round." with five boxes. p22: "On the Night sheet, track each fighter’s damage to the Warden or Heart this round (a Crush needs it)." The suggested note "Sweeper and Counter damage count" was not added. It isn't needed, because damage is damage. |
| C4 | fixed | 16, 11, 30 | p16: "Long fight: an Anchor fight still going at the end of round 4 costs one more Hour, even if the group then withdraws (the clocks are checked first)." p11: "End of round. Awakenings count down, then the clocks are checked (Chapter 5), then the group may withdraw from an Anchor." Card: "Long fight (past round 4, even if you withdraw)". Matches the simulator. |
| C5 | fixed | 6, 17, 25, 30 | p6: "The Heart. When the four Hours are spent, you face the Heart of the Unmade." p17: "When the Hunt ends, wherever they are, the fighters are drawn to the Heart." p25: "When the Hunt ends, every stopped clock in the city points the same way". Card: "Heart (after the four Hours)". This uses the playtests' wording rather than "a fifth Hour", and is better for it. The online chat text still says "In the last Hour" (O3). |
| C6 | fixed | 12 | "A fight ends the moment the enemy falls or every fighter is Down, even in the middle of a step." A wipe in the enemies' step of the dawn round is therefore a loss. |
| C7 | fixed | 8, 30 | p8 Bulwark: "A fighter carries one Bulwark at a time." Card: "(one at a time)". |
| C8 | fixed | 11, 14, 30 | p11: "a Chi die: spend 1 Chi for a bonus die on your own roll (one per roll);" p14: "(one per roll)". Card: "Help (1 Chi, +1 die to another’s roll; each helper once per roll)". |
| C9 | fixed | 11, 20, 22, 29, 30 | "draws on its Stills" everywhere. p20: "Draws on its Stills: At the end of each round, before anything else acts, it regains 1 Toughness for each of its Stills still standing". "Feeds on" appears nowhere in the book, the summary or the online version. |
| C10 | fixed | 12, 6 | p12: "Any fighter’s action counts: a Strike, a Rally, holding a Seal, a Quick fighter’s free Strike, and the last fighter’s action of the round before. The enemies’ steps don’t count." Glossary: "Surge: A Warden’s or the Heart’s end-of-round attack"; "Swarm: A pack’s end-of-round attack". |
| C11 | fixed | 9, 21 | p9: "Three of them are a little stronger than an average group: at Standard they win about 84 nights in 100, so for a real challenge, play Hard." p21: "The ready-made fighters are a little stronger (Chapter 2)." This is true for three; all five play below the Hard band at Hard (N10). |
| C12 | fixed | 8 | p8: "If you lose 2 or more Vigor this way, gain 2 Chi." Reading the styles: "No Chi if the loss puts you Down." D38 goes further than the suggestion. See N1 for Stubborn. |
| M1 | fixed | 12 | "The clock runs out. An Anchor fight or the First Clash ends at the end of round 7; the Heart ends at dawn (Chapter 5)." |
| M2 | fixed | 16, 12 | p16: "If everyone goes Down, or it reaches the end of round 7, the Stills scatter: Down fighters stand up with 1 Vigor and the Hunt begins anyway. Nobody can withdraw from it." |
| M3 | fixed | 21, 16 | p21: "Heart Toughness, one Anchor standing 27 / 36 / 50" and "…plus, per other Anchor standing +12 / +16 / +20". p16: "The Hunt ends when the four Hours are spent. With four Hours and five Anchors, at least one Anchor always stands at the Heart." |
| M4 | partly fixed | 29, 17, 22 | Night sheet: "Hour owed (dawn after round 6):" with one box. p17: "Dawn breaks at the end of round 7, or round 6 if a long fight left an Hour owed (only a long fight in the last Hour of the Hunt can)." **Left over:** p22 still says "Hours left, Anchors standing, Hours owed, and the round" (N4). |
| M5 | fixed | 12, 30 | p12: "nothing takes you above your maximum Vigor." Card: "Never above your maximum." |
| M6 | fixed | 20 | "A shattered Shell stays shattered." |
| M7 | fixed | 8 | Sweeper: "also deal 1 damage to one other enemy, if there is one." Reading the styles: "Sweeper’s damage isn’t a hit: it never counts as the first hit that shatters a Shell, though it can bring a Warden to half its Toughness. With no other enemy (the First Clash, or once the pack is gone) it does nothing." |
| M8 | fixed | 9 | "Quick’s free Strike is a normal Strike (technique, Chi die and Help allowed, two bonus dice at most), but it isn’t a turn and isn’t part of round 1: you can’t Awaken before it, and nothing it starts lasts into round 1." This matches the simulator. See N9 for one gap. |
| M9 | partly fixed | 17 | "As the fight begins, every fighter gains 3 Chi (with Breath’s 4, still no more than 5), and anyone may Awaken at the start of their turn." Awakening before round 1 is settled. The order of the Heart's Chi and Quick's Strike is still implied rather than stated ("as the fight begins" against "before the first round"). |
| M10 | fixed | 10 | "A player who arrives late makes all four picks from what nobody has, starts with the Vigor everyone else began with (+3 if Tough) and 2 Chi, and joins at the start of the next fight." |
| M11 | fixed | 12, 30 | "A Down fighter keeps their place in the ring: until they act again, the fighter after them can’t be fed." Card: "A Down fighter keeps their place." |
| M12 | fixed | 30 | Card: "Fewer hits: hit back: lose its Harm, gain 1 Chi (unless you went Down). Critical: Guard met and two or more 6s: +1 damage, +1 Chi." |
| M13 | fixed | 28 | "Awakening (3 Chi, start of your turn, 3 rounds; Seal 2)"; "Awakened tonight · rounds left" with one box and three round boxes; "This round: Bulwark on you ☐ Guardian used ☐". See N11 for where those last boxes sit. |
| M14 | fixed | 29 | "Shell shattered ☐" beside "Warden or Heart: Toughness left". |
| M15 | partly fixed | 6 | "Words in bold are game terms. Each one means exactly one thing; the list below gives the main ones and where each is explained." The claim is softened and 13 terms were added. Bold terms still missing: Crush, Sweep, Drain, Call, Prologue, Epilogue, owed, and the new **out of play** (p12). |
| M16 | fixed | 21, 6, 16, 22 | Now "the Difficulty table" everywhere, with no "Night card" left. The new name is used for two tables, though (N5). |
| M17 | partly fixed | 16, 6 | p16: "Go to an Anchor. Fight its Warden and a pack of 1 Still per fighter." **Left over:** p6 "Each Hour you either strike an Anchor and fight its Warden, or take a Respite to recover." (N3). |
| M18 | partly fixed | 5, 7, 8, 20, 24 to 29 | Shells are "shattered by" in every table, statline, sheet and Ch 9 heading. p5: "Each element shatters one kind of armour the Unmade wears". **Left over:** "break" for Shells on p13, p17 and p23 (N2), and in the online fighter sheet (O4). |
| M19 | fixed | 16 | "Everyone Down: the Anchor stands, and everyone stands up with 1 Vigor." |
| M20 | fixed | 12, 30 | "There is no movement in a fight: any fighter can Strike any enemy." Card: "No movement: strike any enemy." |
| M21 | fixed | 5 | "Every night stands alone: you can keep your fighters for another night, but nothing else carries over." |
| M22 | fixed | 7 | "Rather leave it to the dice? Roll a die for each pick, counting down the lists in this chapter (for elements, reroll a 6), and reroll anything already taken." |
| M23 | fixed | 26 | "Reroll a sign another Anchor already has." |
| M24 | fixed | 21 | "Three, four and five fighters do within a few points of each other." This is honest: each size is within 3.2 points of its pooled rate, although 3 and 5 fighters at Easy are 6.1 points apart. |
| M25 | fixed | 22 | "with fewer than five players, pick any of them." |
| M26 | fixed | 24 | "The substation by the canal, humming without making a sound." |
| M27 | fixed | 22 | "Round 7 (at the Heart, round 6 if an Hour is owed): the fight ends." |
| M28 | partly fixed | 11, 19 | p11: "in any order the players like (if they can’t agree, the Storyteller decides)." This covers the order only. The Swarm's "of the players’ choice" (p19) still has no tie-break. |
| M29 | fixed | 16 | "Every fighter returns to full Vigor. Chi is unchanged." |
| M30 | fixed | CORE-RULES §11 | "each element, style, perk and awakening is within 2 points of its pick's average." The report's largest gap is Tempest at +1.8. |

### Playtest A

| # | Status | Page | New text (exact quote) and notes |
|---|---|---|---|
| 1 | fixed | 7 | "Everyone chooses all four picks, then any clash is settled pick by pick: both players roll a die and the higher roll keeps it (roll again on a tie). The other changes only that pick; a ready-made fighter keeps the rest of theirs." |
| 2 | fixed | 6, 17, 25 | As C5. |
| 3 | fixed | 14, 30 | p14: "1 each time an enemy hits you back (unless it puts you Down), even when a Guardian takes the loss for you;" Card: "1 when hit back (even if a Guardian takes it)". Counter still answers because the striker was still hit back; this is implied, not stated. |
| 4 | changed differently | 8 | The engine is gone another way than suggested. Instead of Chi only for hit backs and Crushes (or the Swarm to the most Vigor), D38 gives Chi only for a real loss of 2 or more: "If you lose 2 or more Vigor this way, gain 2 Chi." A 1-Harm Swarm no longer pays. The reviewer agrees: it closes the Unbreakable case too. |
| 5 | fixed | 22 | "The First Clash is short and has no Warden, so it won’t show the Guard of 2, Shells or the Surge: explain those when the fighters reach their first Anchor." |
| 6 | fixed | 9, 17 | As M8 and M9. |
| 7 | fixed | 12, 9 | p12: "nothing takes you above your maximum Vigor. When you share something out, you may keep some for yourself." p9: "Medic shares out after Down fighters have stood up, and you may keep some for yourself." |
| 8 | fixed | 20, 29 | p20: "A Drain that finds no Chi Crushes instead (the Heart’s, only when no fighter has any Chi)." Night sheet: "Drain (nobody has Chi: Crush)". |
| 9 | fixed | 28 | "Cross out the circles past your maximum; shade one for each Vigor you lose, and rub it out when you heal." |
| 10 | changed differently | 16 | The table ruled that withdrawing at round 4 costs no Hour. The book now says the opposite: "even if the group then withdraws (the clocks are checked first)". The issue offered either reading. The book takes the one the simulator plays, and the reviewer agrees. |
| 11 | partly fixed | 28, 29 | Added: Awakening rounds left, Guardian used, Shell shattered, "Awakenings open (someone has gone Down tonight)", damage per fighter, and "Heart Toughness … and half of it". Not added: who acted last (the Crush and Drain tie-break) and a ring to tick. Both can be worked out at the table. |
| 12 | fixed | 12, 16 | As M1 and M2. |
| 13 | fixed | 20 | As M6. |
| 14 | fixed | 7 | "A good group can shatter at least two or three different Shells (Chapter 6), and each fighter has at least one pick that helps the others". See N12 for the wording. |
| 15 | not changed | 17 | "Rest at about two-thirds. Take a Respite when the group is down to about two-thirds of its Vigor. Resting much later loses nights; resting much earlier leaves too many Anchors standing." This is unchanged, and `REVIEW.md` doesn't mention the issue anywhere. The playtest asked the simulator to compare resting in the last Hour, just before the Heart. `sim/REPORT.md` section 6 tests rest thresholds (40%, 80%) but not that timing. Either simulate it or log it as left alone. |
| 16 | fixed | 16 | "20 minutes with ready-made fighters, 30–40 if everyone builds their own". This now contradicts p5's "no more than half an hour of setup" (N6). |
| 17 | fixed | 5 | As M21. |

### Playtest B

| # | Status | Page | New text (exact quote) and notes |
|---|---|---|---|
| B-01 | fixed | 6, 17, 25 | As C5. |
| B-02 | fixed | 21, 16 | As M3. |
| B-03 | fixed | 19, 29, 30 | p19, as B1. Night sheet: "to a fighter who isn’t Down (the players choose)". Card: "packs Swarm (never on a Down fighter)". |
| B-04 | fixed | 12 | As B1: "your style, perk and technique do nothing". |
| B-05 | fixed | 20 | As C2. The players can still Swarm the top damage dealer Down. The Crush then moves to the next fighter and still lands, so it is a choice, not a free soak. |
| B-06 | fixed | 7 | As C1. |
| B-07 | fixed | 11, 14, 30 | As C8. |
| B-08 | fixed | 16, 11 | As C4. |
| B-09 | fixed | 12 | "The Strike is judged against the Guard you rolled against: a Shell that shatters during it lowers the Guard from the next roll." |
| B-10 | fixed | 16, 12 | As M2. |
| B-11 | fixed | 10, 21 | p10: "Starting Vigor is set by how many fighters there are when the night begins; the enemies are sized by how many there are when each fight begins." and "A night has five fighters at most." p21: "(for starting Vigor, when the night begins; for the enemies, when each fight begins)". |
| B-12 | fixed | 29 | As M4: one box. |
| B-13 | fixed | 12 | "If the same Strike destroys the Heart and puts the last fighter Down (Counter can do this), the fighters win." See N8. |
| B-14 | fixed | 30 | As M12. |
| B-15 | fixed | 8 | As C12. |
| B-16 | fixed | 8 | As M7. |
| B-17 | fixed | 8 | "Guardian takes the whole loss as a loss of your own: the other protections (Chapter 3) then apply to you, and a Bulwark on the fighter you saved waits for their next loss." |
| B-18 | fixed | 8 | "Counter’s damage lands even when the hit back puts you Down; then you gain no Chi." |
| B-19 | fixed | 9 | As M8. |
| B-20 | fixed | 11 | "and nobody spends Chi on a die past that". |
| B-21 | fixed | 12 | As M11. |
| B-22 | left alone | 8 | Edge is unchanged: "Each 6 you roll counts as three hits." `REVIEW.md` section 4 says Metal with Brawler and Trained wins 1.6 points below average, and Metal with Ascendant is +3.6 at Hard. **The reviewer agrees.** Metal is +0.6 in its pick (`sim/REPORT.md` section 5), inside the ±3 target, and the +3.6 belongs to a pairing, not an option. That pairing figure isn't in `sim/REPORT.md`, so it couldn't be checked from the published report. |
| B-23 | fixed | 15 | "If you go Down before the Surge, the Seal has ended and the enemy Surges." |
| B-24 | fixed | 28, 29 | Shell shattered box; "Awakenings open (someone has gone Down tonight): ☐"; three rounds-left boxes; "Pack: Toughness left (Stills: ÷ 3, round up)". |
| B-25 | fixed (the Seal pair left alone) | 8 | The suggested fix (no Chi from a loss not actually lost) is D38: "If you lose 2 or more Vigor this way". `REVIEW.md` section 4 leaves the Guardian with a Seal alone (+1.4 at Hard under D38). **The reviewer agrees.** |
| B-26 | fixed | 20, 29 | "A Call with a full pack does nothing." Night sheet: "(full: nothing)". |
| B-27 | left alone | 14, 15 | Unchanged: "You may Awaken from the moment the first fighter goes Down tonight". `REVIEW.md` section 4 points to the simulator's "Awaken as soon as allowed" habit (71.7% against 72.5%) and p15: "Awakening at the first chance simply costs you the Heart." **The reviewer agrees.** D37 doesn't change this: the players can still give the First Clash's Swarm to a standing fighter on purpose. |

## 2. New issues

Every changed passage was read literally at the start and end of a fight and of the night. The chapters were cross-checked against each other, against the three sheets and against `docs/CORE-RULES.md`, and searched for the new terms and the old wording.

No new blockers. The start and end of every fight and of the night now read cleanly. These run in one order without contradiction:
- First Clash: the Chi and Breath; Quick; round 1; the fight ends at once on a wipe; round 7; nobody withdraws.
- Anchor: the round-4 clock, then withdrawing; the Warden holds at round 7; everyone Down.
- Heart: dawn at round 7, or 6 with the owed Hour; the Counter win.

### N1. Guardian with Stubborn: does a loss Stubborn stops count as "2 or more"? (confusing)
- **Pages:** 8, 9.
- **Quote:** p8: "If you lose 2 or more Vigor this way, gain 2 Chi." and "No Chi if the loss puts you Down." p9 Stubborn: "The first time in each fight you would go Down, stay up with 2 Vigor instead."
- **Problem:** the ready-made Marcus Bell is Guardian and Stubborn (p9), so this will come up at first tables. Say Marcus at 3 Vigor takes a Hard Crush of 6 for a friend. Stubborn keeps him up at 2, so he lost 1 Vigor. At 2 Vigor he would lose none. He wasn't put Down, so the "No Chi" line doesn't apply. Read literally, "lose 2 or more Vigor" gives no Chi. A table that counts the loss he took (6) gives 2 Chi. The online version gives the Chi (O2). The simulator would too, but its Guardian only guards when it has more Vigor than the loss, so the case never happens there.
- **Fix:** say which. The words "actually loses" in D38 point to counting the Vigor really lost: "With Stubborn, count only the Vigor you actually lost." Make the online version match.

### N2. "Break" for Shells is left in three places (minor, A16)
- **Pages:** 13, 17, 23.
- **Quotes:** p13 example: "As the Wood fighter she breaks Earth Shells, so the Warden’s Guard is 2 for her, not 3." p17: "Break the Anchors you can break. Pick the Anchors whose Shells your elements break." p23: "which Shells can we break, and can we afford to rest?"
- **Fix:** "she shatters Earth Shells"; "Pick the Anchors whose Shells your elements shatter"; "which Shells can we shatter". Keep "break" for Anchors.

### N3. "Strike an Anchor" is left in Chapter 1 (minor, A16)
- **Page:** 6.
- **Quote:** "Each Hour you either strike an Anchor and fight its Warden, or take a Respite to recover."
- **Fix:** "Each Hour you either go to an Anchor and fight its Warden, or take a Respite to recover."

### N4. "Hours owed" is left in Chapter 7 (minor)
- **Page:** 22.
- **Quote:** "Keep the clocks on the Night sheet, where everyone can see them: Hours left, Anchors standing, Hours owed, and the round."
- **Fix:** "…Hours left, Anchors standing, the owed Hour, and the round."

### N5. "The Difficulty table" names two tables (minor, A16)
- **Pages:** 6, 20, 21, 22, 25.
- **Quote:** glossary p6: "Difficulty table: Easy, Standard or Hard: the Heart’s Crush and Sweep". But p20 Heart: "Toughness: see the Difficulty table"; p22: "Fill in the Night sheet from the Difficulty table (Chapter 6): Warden and Heart Toughness for this many fighters"; p25: "Toughness and Surges from the Difficulty table".
- **Problem:** the section headed "The Difficulty table" on p21 holds two tables. One is the Heart's Crush and Sweep by difficulty, which is the glossary's meaning. The other is the size table by number of fighters, which holds every Toughness. Warden and Heart Toughness are not in the Difficulty table as the glossary defines it. `docs/CORE-RULES.md` uses the narrow meaning.
- **Fix:** call the second table "the size table" and point Toughness references to it ("Toughness from the size table, Surges from the Difficulty table"). Or widen the glossary entry: "the two tables in Chapter 6: the Heart's Crush and Sweep by difficulty, and every size by number of fighters".

### N6. Setup time now contradicts Chapter 1 (minor, A11)
- **Pages:** 5, 16.
- **Quote:** p5: "A game is one night: about three hours of play, after no more than half an hour of setup." p16: "20 minutes with ready-made fighters, 30–40 if everyone builds their own".
- **Fix:** p5: "after about half an hour of setup (20 minutes with the ready-made fighters)".

### N7. "Out of play" doesn't state its own exceptions (minor)
- **Pages:** 12, 30, 8.
- **Quote:** p12: "nobody can choose you for anything (a Swarm, a Bulwark, Renewal, Help, a share of Chi) … and your style, perk and technique do nothing, until a Rally or a Wellspring share stands you up." Card: "Down: out of play (no actions, Help, losses, Chi or powers, and nobody can choose you)". p8: "Counter’s damage lands even when the hit back puts you Down".
- **Problem:** read literally, "nobody can choose you for anything" also forbids the Rally and the Wellspring share, which must choose a Down fighter. Chapter 3 implies those exceptions; the card leaves them out. "Your style … do nothing" also clashes with Counter's damage landing from Down. Careful readers will see the specific rules win, but the card is what players read at the table.
- **Fix:** p12: "nobody can choose you for anything except a Rally or a share of Wellspring's Vigor". Card: "nobody can choose you, except to Rally you or share Wellspring's Vigor". Optionally add "(Counter's answer to the blow that put you Down still lands)".

### N8. "A fight ends the moment … every fighter is Down" comes before Counter can answer (minor, A15)
- **Page:** 12.
- **Quote:** "A fight ends the moment the enemy falls or every fighter is Down, even in the middle of a step. If the same Strike destroys the Heart and puts the last fighter Down (Counter can do this), the fighters win."
- **Problem:** in the Counter case the hit back drops the last fighter (step 7) before Counter's damage lands. Taken literally, the first sentence ends the fight at that moment, so the second sentence could never happen. The second sentence is clearly meant as the exception, and the simulator and online version both play it that way, but the order should be said.
- **Fix:** "…even in the middle of a step, but a Strike always finishes resolving first: if the same Strike destroys the Heart and puts the last fighter Down (Counter can do this), the fighters win."

### N9. Quick: "nothing it starts lasts into round 1" against feeding (minor)
- **Pages:** 9, 12.
- **Quote:** p9: "nothing it starts lasts into round 1." p12: "Any fighter’s action counts: … a Quick fighter’s free Strike".
- **Problem:** the free Strike feeds the first action of round 1. A careful reader can take that as something it started lasting into round 1. The intent is a Bulwark given on it, and its damage for the Crush.
- **Fix:** "a Bulwark given with it ends, and its damage doesn't count for round 1's Crush; it still feeds the next action".

### N10. "The ready-made fighters are a little stronger" doesn't hold for five at Hard (minor, A18 and A20)
- **Pages:** 21, 9.
- **Quote:** p21: "The ready-made fighters are a little stronger (Chapter 2)." p9: "for a real challenge, play Hard."
- **Problem:** `sim/REPORT.md` section 7 gives these win rates for ready-made groups:

  | Ready-made group | Standard | Hard |
  |---|---|---|
  | Three | 83.9% | 68.4% |
  | Four | 78.4% | 60.1% (51% to 66%) |
  | All five | 73.9% | 50.5% |
  | Random groups (for comparison) | 72.5% | 58.2% |

  All five at Hard sit below the Hard target band (52% to 62%). A five-player table told to "play Hard" for a challenge gets a harder night than the label. `docs/CORE-RULES.md` §10 states the numbers correctly.
- **Fix:** p21: "Three ready-made fighters are a little stronger (about 84 in 100 at Standard); all five are about average at Standard and win only about half their Hard nights." Make p9 say the same.

### N11. Sheet details (minor, A11 and A28)
- **Pages:** 28, 29.
- **Quotes and problems:**
  - Fighter sheet footer: "Meet the Guard or be hit back (lose its Harm, gain 1 Chi)." It lacks the card's and Chapter 3's "(unless you went Down)".
  - Fighter sheet: "This fight: Clear at the end of every fight." The new "This round: Bulwark on you ☐ Guardian used ☐" boxes sit inside that row, but they must be cleared every round.
  - Night sheet: "Anchor: a long fight after round 4 costs an Hour; the Warden holds after round 7. Heart: dawn after round 7 (6 if an Hour is owed)." It leaves out the First Clash's round-7 end, which the card has.
- **Fix:**
  - Footer: "(lose its Harm, gain 1 Chi unless you went Down)".
  - Fighter sheet: "This round (clear each round):".
  - Night sheet: add "First Clash: ends after round 7".

### N12. Chapter 2's new advice and clash wording (minor)
- **Page:** 7.
- **Quote:** "Help is open to everyone, but so are Guardian, Medic, Wellspring, Harmony and Wood’s Renewal." and "both players roll a die and the higher roll keeps it".
- **Problem:** the first sentence reads as if those picks were open to everyone, when it means they help the others. "Both players" assumes two, but three players can want the same pick.
- **Fix:** "Help is open to everyone; the picks that help others are Guardian, Medic, Wellspring, Harmony and Wood’s Renewal." And "everyone who wants it rolls a die and the highest roll keeps it".

### N13. One-page summary leftovers (minor, A11 and A16)
- **Page:** `docs/CORE-RULES.md` §2, §3.
- **Quote:** §2: "The five ready-made fighters (§10) skip this step." §3: "Feeding (the generating cycle)."
- **Problem:**
  - The first sentence is from the old text. The book now settles clashes involving a ready-made fighter: "a ready-made fighter keeps the rest of theirs" (p7). The summary should say the same.
  - "Generating cycle" was already there before the fix, but the book calls it "the feeding cycle" (p5, p12).
- **Fix:** "A ready-made fighter who loses a clash changes only that pick." And "Feeding (the feeding cycle)."

Checked with no gap found:
- The out-of-play rule against Medic (after standing), Harmony, Bulwark, Help, Sweep, Drain and Stubborn.
- The Crush move-on and its tie rule.
- The owed Hour.
- The late joiner and enemy sizing.
- The Shell judged against the Guard rolled against.
- The Seal ending before the Surge.
- The Call with a full pack.
- The glossary's new terms.
- The card against Chapter 3, line by line.
- The summary against the book on every number.

No leftover "feeds on its Stills", "Night card", "Broken by" (for Shells) or "In the last Hour" remains in the book, the sheets or the summary. The one use of "the last Hour of the Hunt" (p17) correctly means Hour 4.

## 3. Simulator comparison

**Re-run:** `node sim/run.mjs --runs 4000 --blank --no-write` (seed 1) took 79 s.
- With `--no-write` the script prints only section 1. Section 1 matches `sim/REPORT.md` exactly: wins 88.1 / 72.5 / 58.2%, partials 11.0 / 17.1 / 19.8%, losses 0.9 / 10.4 / 22.1%, Criticals 24.7%, failures 9.8%, Awakenings 100%, Chi spent 100%, dawn 11.3 / 17.9 / 21.2%, long fights 41.4%.
- To compare every section, an unmodified copy of `sim/*.mjs` (byte-identical, checked with `cmp`) was run with the same command, without `--no-write`, in a scratch folder outside the repository. Its whole report is **identical** to `sim/REPORT.md` (diff empty). That covers group size, losses split, fight length, the night by size, option balance, habits and ready-made groups.
- The repository's `sim/` was not changed.

**The published numbers still match the book:**
- Designer's Note (p21): 88 / 72 / 58 wins and 1 / 10 / 22 losses.
- Ready-made trios "about 84" at Standard (p9; report 83.9%).
- Every option within ±1.8 of its pick (§11 says within 2).
- Guardian −1.5 (D38).
- "Ignores the Stills … about half" (report: 50.8% for "Always strike the Warden or Heart").
- Ch 4's "spent their Chi … did better" (report §6: saving 3 Chi drops wins to 66.4%; the rules review's S16 gap is closed).

**The simulator plays the new rules as the book states them (`sim/engine.mjs`):**

| Rule in the fixed book | Engine | Result |
|---|---|---|
| Down fighters out of play: no Swarm, Crush, Bulwark, Renewal, Help, Harmony Chi, Guardian, Chi gain | `swarm` uses `alive(F)`; `crush` filters `!f.down` and falls back to the standing fighter with most Vigor; Bulwark and Renewal pick from `alive(F)`; Help skips `h.down`; Harmony gives to `alive(F)`; Guardian needs `!o.down`; `gainChi` returns if `f.down`; `harm` returns if `f.down` | matches |
| Wellspring stands a Down fighter, who acts that round | `shareVigor` stands Down fighters first, at the start of the round | matches |
| Counter's damage lands from Down, no Chi | `harm` then `gainChi` (refused when Down) then Counter's `dealDamage` | matches |
| Guardian: 2 Chi only for a real loss of 2 or more, after protections, not if Down | `guarded && amount >= guardianMinLoss` after Bulwark, Flow and Unbreakable; no Chi on the Down branch. Policy guards only when the Guardian's Vigor exceeds the loss | matches. The Stubborn branch gives the Chi too (see N1), but that branch can't be reached under the policy. |
| Withdrawing at round 4 still costs the Hour | `long = true` at round 4 (line 210) is set before the withdraw check (line 216); `res.long` costs an Hour or adds to `overdue` | matches |
| End-of-round order: Awakenings, clocks, withdraw | lines 208, 210, 211, 215, 216 | matches |
| A fight ends the moment everyone is Down; the same Strike that destroys the Heart wins | `F.every(down)` checked after each action and each enemy; `done()` checked before the wipe | matches |
| Quick's Strike isn't part of round 1, and no Awakening before it | Quick strikes before `ctx.rs = newRound()`; Awakening happens only inside rounds | matches |
| A Down fighter keeps their place in the ring | `ctx.feeder` is built from all fighters, not only standing ones | matches |
| One Chi die per roll, no Help past the cap, one Bulwark at a time, Sweeper "if there is one" and not a hit, the Guard rolled against, a shattered Shell stays shattered, the Heart's Drain only with no Chi anywhere, at most one owed Hour (dawn 6) | as the book | matches |

The rules review's simulator list (S1 to S18), now:
- **S1 to S9:** the book now says what the engine does.
- **S15, S16, S17:** fixed. The report shows "held at round 7" and the saving habit, and the Sweeper comment reads "1 damage".
- **Still open, all harmless:**
  - S10: the "every Anchor broken" branch at lines 51 to 54 is dead code.
  - S11: a Call on a full pack still heals a damaged Still, where the book says "does nothing"; this is negligible.
  - S12: the engine has no round-7 end for the First Clash, but the longest one is 5 rounds.
  - S14: Lucky policy unchanged.
  - S18: late joiners are not simulated.
- **Stale comments**, not reader-facing:
  - engine line 69: "§8 The Heart, in the last Hour."
  - engine line 85: Respite "Down fighters stand".
  - `params.mjs` line 34: "…of at least this much (before protections)". The rule and the engine now count the loss after protections.

## 4. Online version

`module/logic/rules.mjs` and `module/gm/ops.mjs` were read against the fixed book. The 39 tests in `test/` pass (`node --test test/*.mjs`).

**Mismatches:**

| # | Severity | Where | What the online version does | The book (fixed) | Suggested fix |
|---|---|---|---|---|---|
| O1 | confusing | `ops.mjs` `awaken` and `strike` (free) | `awaken` refuses only if this fighter has an action this round. Quick's free Strike doesn't count as an action, and the free Strike checks only `fight.round === 1` with no actions. So any fighter, including the Quick fighter, can Awaken before the free Strike. `resolveStrike` then applies Ascendant to it, so the ready-made Dani Okafor (Wood, Sweeper, Quick, Ascendant) can Awaken with the Heart's 3 Chi and double her free Strike. | p9: "it isn’t a turn and isn’t part of round 1: you can’t Awaken before it". Awakening is "at the start of your turn" (p14), and turns are in rounds. | In `awaken`, refuse while it is round 1, nobody has acted, and a standing Quick fighter hasn't taken the free Strike. Or track a "before round 1" phase that ends after Quick's Strike or once anyone else acts. |
| O2 | confusing | `ops.mjs` `applyLoss` | Gives the Guardian 2 Chi if `!res.down && res.afterProtections >= 2`. With Stubborn, a Guardian at 2 Vigor who takes 4 ends on 2 Vigor, having lost nothing, and still gains 2 Chi. | p8: "If you lose 2 or more Vigor this way, gain 2 Chi." See N1: the book's literal reading gives no Chi. | Settle N1 in the book, then compare the Vigor before and after (`f.vigor - res.vigor >= 2`). |
| O3 | minor | `ops.mjs` `endFight`, line 551 | Chat card: "The Hunt is over. In the last Hour the fighters are drawn to the Heart." | C5 fix, p17: "When the Hunt ends, wherever they are, the fighters are drawn to the Heart." | Use the book's sentence. |
| O4 | minor | `templates/fighter-sheet.hbs` line 45 | "Feeds {{feedsLabel}}; breaks {{breaksLabel}} Shells." | M18 fix: elements shatter Shells (p7 "Shatters: Earth Shells"). | "shatters {{breaksLabel}} Shells". The data key `breaks` can stay. |
| O5 | minor | `ops.mjs` `startFight` (Heart) | "Every fighter gains 3 Chi, and anyone may Awaken." | p17: "anyone may Awaken at the start of their turn." | Add "at the start of their turn". |
| O6 | trivial (code comments only) | `ops.mjs` `join`; `rules.mjs` `resolveSurge`, `guardFor`, Shell comment; `startFight` and `endFight` | The `join` comment says "an element nobody has" (the code correctly checks all four picks). The `resolveSurge` JSDoc says `size` is "fighters when the night began" (ops correctly passes the fighters in this fight). Several comments say "breaks" or "breaker". The "every Anchor broken" clause in `startFight` and `endFight` is unreachable. | Each comment states old wording; none affects play. | Update the comments when next touching the files. |

**Matches the fixed book:**
- Swarm and Crush never on a Down fighter, with the Crush going to the next most damage and then the most Vigor.
- Guardian only while standing, its loss treated as its own (a Bulwark on the saved fighter waits).
- Help, Bulwark, Renewal and Harmony refuse Down fighters; Wellspring may stand them, and they act that round.
- No Chi while Down.
- Counter's damage lands from Down.
- Quick's damage left out of round 1's Crush, and a Bulwark given with it dropped.
- One Chi die per roll; no Help past the cap; one Bulwark at a time.
- Sweeper "if there is one", not a hit, though half Toughness still shatters the Shell.
- The Strike judged against the Guard rolled against; a shattered Shell stays shattered.
- A Down fighter keeps their ring place (the ring is built from every fighter in the fight).
- Withdrawing after the round-4 clock still costs the Hour.
- The First Clash ends at round 7 or when everyone is Down, with no withdrawing; at the Heart, no withdrawing and dawn at round 6 with an owed Hour.
- A Seal holder going Down lets the Surge happen.
- A Call with a full pack does nothing.
- The Heart's Drain Crushes only when nobody has Chi.
- Medic shares after Down fighters stand.
- Nothing goes above maximum Vigor.
- Late joiners make four unique picks and take the others' starting Vigor (+3 if Tough) and 2 Chi; the enemies are sized from the fighters in each fight.

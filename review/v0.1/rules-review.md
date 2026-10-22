# Nightwake v0.1: rules review

Reviewer: the reviewer (independent rules pass, `docs/REVIEW-PROCEDURE.md` section 1).
Source read: `book/src/chapters/*.html` in filename order (cover, credits, Part One Ch 1–5, Part Two Ch 6–9, Fighter sheet, Night sheet, At the Table card). Page numbers are PDF pages of `book/dist/Nightwake_v0.1.pdf` (29 pages). `docs/CORE-RULES.md` and `sim/` were read for comparison. Nothing outside `review/v0.1/` was changed.

Severity: **blocker** = must be fixed before the book counts as v0.1-done (it breaks a Part A rule on core flow, or a table must invent a ruling that changes results); **confusing** = a table will stop and argue, or the book misleads; **minor** = wording, sheets, polish.

## Verdict

**The core holds; the edges don't yet. Not done: 1 blocker, 12 confusing, 30 minor.**

The roll, the trade of blows, Chi from pain, the feeding ring and the Shells are clear, consistent between chapters, and match the simulator closely. All three worked examples add up. Every "Chapter N" cross-reference is right. The ready-made night (Ch 8) matches the night-making tables (Ch 9) entry for entry. The five ready-made fighters are legal. The Night card arithmetic is right for 3, 4 and 5 fighters.

The problems are the ones the design rules warn about: what happens **at 0 Vigor** (A4, A5, A13), **at the edges of a fight** (round 4, round 7, the First Clash, the Quick Strike before round 1; A12, A15), and **words with two meanings** (A16). One of them, Down fighters soaking harm for free, moves Hard-difficulty losses from 20% to 13% when the reviewer tested it on a copy of the simulator. That makes it a blocker. Most fixes are one sentence each.

Part D gate 1 ("every Part B question is answered in the text, in one place") fails on the Down-fighter, reach and carry-over questions. Gate 2 (sheets checked line by line) fails on small differences listed under Minor.

`docs/CORE-RULES.md` agrees with the book on every number and rule the reviewer checked. It leaves out a few clarifications the book adds (Ch 6: Called Stills don't Swarm until the next round, a Sealed Warden still feeds; Ch 4: a Seal holder can Help, Tempest's second action is not fed), which is fine for a summary. Its §11 line "each element, style, perk and awakening is within 2 points of the others in its pick" overstates the report: Tempest (+1.5) and Wellspring (−1.1) are 2.6 points apart (minor, M30).

## Blockers

### B1. A Down fighter can soak harm for free (Swarm target, Guardian, Crush)
- **Severity:** blocker (A4, A5, A13; changes Hard-difficulty results).
- **Pages:** 17 (Swarm), 8 (Guardian), 11 (Down), 18 (Crush).
- **Quotes:**
  - p17, Stills statblock: "At the end of each round, the pack deals Harm equal to **half its Stills** (rounded up), as one blow, to one fighter of the players’ choice."
  - p8, Guardian: "Once per round, when another fighter would lose Vigor, you may lose it instead. When you do, gain 2 Chi." Styles are "always on" (p8).
  - p11, Down: "you can’t act or Help; you lose all your Chi; your Awakening, if you are Awakened, ends." … "Harm past 0 is lost."
- **Problem:** nothing says a Down fighter can't be *chosen* for a Swarm, or that a Down fighter's style stops working. Read literally:
  - the players give every Swarm to a fighter who is already Down, and "Harm past 0 is lost" makes it vanish;
  - a Down Guardian takes another fighter's loss once a round (a Hard Heart Crush of 6, say), loses nothing because they are at 0, and gains 2 Chi while Down.
  Losing (being Down) becomes better than standing in exactly the moments that matter (A4), and the soak costs nothing (A5). The question comes up in most nights: fighters go Down 1.3 to 3.7 times a night in the simulator, often from a hit back during the fighters' step, so they are still Down when the enemies act.
- **What the simulator shows:** the simulator never allows either (it picks Swarm targets and Guardians only among standing fighters). On a scratch copy, the reviewer switched the readings on (2,000 nights per size):
  - a Down Guardian soaking once a round: Standard loss 9.8% → 6.4%, Hard loss 20.5% → 13.5% (below the 20–35% Hard target), Hard partial 17.7% → 23.5%;
  - Swarms dumped on Down fighters whenever one happens to be Down: Hard loss 20.5% → 19.8% (a table leaving someone Down on purpose would gain more).
- **Related:** the Crush (p18) "3 Harm to the fighter who dealt it the most damage this round" lands on that fighter even if they went Down after dealing it (the Swarm comes first), so it is wasted. The simulator instead moves it to the next fighter. This difference is small (+0.2 points), but it comes from the same gap (see C2).
- **Suggested fix:** one rule in Ch 3, "Vigor and going Down", repeated on the At the Table card: "**A Down fighter is out of play.** Enemies and the players can't choose them for anything: a Swarm, Bulwark, Renewal or a share of Vigor or Chi (except Wellspring, which stands them up). They take no losses and gain no Chi, and their style, perk and technique do nothing until they stand." Add to the Surge table: "If that fighter is Down, the Crush goes to the standing fighter who dealt it the next most damage, or else to the fighter with the most Vigor." This matches what the simulator already does, so the published numbers stay valid.

## Confusing

### C1. Can Wood's Renewal stand a Down fighter?
- **Page:** 7 (also 11, 13).
- **Quote:** p7, Renewal: "After the roll, you or an ally regains **1 Vigor**, whatever the result." p11: "At **0 Vigor** you are **Down**." p13, Wellspring: "A Down fighter given any stands up and acts that round."
- **Problem:** a Down ally at 0 who regains 1 is no longer at 0 Vigor. Wellspring's sentence reads either as a general principle (any Vigor stands you up) or as a Wellspring-only power. If Renewal stands people up, Wood gets a 1-Chi Rally that doesn't cost an action and still Strikes. The simulator never does this. A scratch test with Wood striking and standing the ally instead of Rallying gave Standard +0.4 and Hard +0.9 win points, so the effect on balance is small, but tables will ask every night.
- **Fix:** covered by the B1 sentence ("can't choose them for … Renewal"), or add to Renewal: "It can't target a Down fighter."

### C2. Crush when the top damage dealer is Down
- **Page:** 18.
- **Quote:** "3 Harm to the fighter who dealt it the most damage this round"; "Crush when nobody damaged it this round: it hits the fighter with the most Vigor."
- **Problem:** A13. The Swarm happens before the Surge, and a striker can go Down to a hit back after dealing the damage. Read literally, the Crush hits a Down fighter and is wasted. The simulator retargets it. Negligible for balance (+0.2), but tables will have to rule on it.
- **Fix:** see B1: "If that fighter is Down, the next most; if none is standing, the most Vigor."

### C3. The Night sheet has nowhere to track who damaged the Warden this round
- **Pages:** 27 (Night sheet), 20.
- **Quote:** p20: "**Fighters act** in the order the players choose. Track damage on the Night sheet." Night sheet (p27): one box, "Warden or Heart: Toughness left".
- **Problem:** A28. Every Crush (a third of all Surges) needs each fighter's damage *to the Warden or Heart this round*, including Sweeper and Counter damage. The sheet has no place for it, so the Storyteller must remember it.
- **Fix:** add a row "Damage to the Warden or Heart this round" with one box per fighter (five), cleared each round, plus a note: "Sweeper and Counter damage count."

### C4. Withdrawing at the end of round 4: does it still cost the long-fight Hour?
- **Page:** 14.
- **Quote:** "**Long fight:** an Anchor fight still going at the end of **round 4** costs **one more Hour**." … "**Withdraw:** at the end of any round, the group can withdraw."
- **Problem:** A15. Both happen "at the end of round 4". If withdrawing comes first, a group can dodge the extra Hour. That is a real decision in the 40% of nights with a long fight. The simulator charges the Hour, but it almost never withdraws, so this is untested.
- **Fix:** in "The Hunt's clocks": "Withdrawing at the end of round 4 still makes it a long fight. Decide to withdraw before the clocks are checked if you want to avoid it" (pick one; the first matches the simulator).

### C5. Is the Heart the fourth Hour or a fifth?
- **Pages:** 6, 14.
- **Quote:** p6: "You have **four Hours**. Each Hour you either strike an Anchor … or take a **Respite** … 3. **The Heart.** In the last Hour you face the Heart of the Unmade." p14: "In the last Hour, wherever they are, the fighters are drawn to the Heart."
- **Problem:** "the last Hour" reads naturally as the fourth of the four, which would leave three Hours for the Hunt. The Night sheet's four Hunt pips (p27) and "The Hunt ends when the Hours run out" (p14) imply a fifth. A newcomer could easily play one Hour short, which is a large swing.
- **Fix:** "After the four Hours of the Hunt comes a fifth and last Hour: the Heart." Use the same words in Ch 1, Ch 5, Ch 8 (p23 "In the last Hour") and on the card.

### C6. Everyone goes Down in the same round dawn breaks: loss or driven off?
- **Pages:** 11, 15.
- **Quote:** p10, the round: "2. **Enemies act.** … 3. **End of round.** Awakenings count down, then the clocks are checked." p15, Endings: "**Driven off:** Dawn breaks with the Heart at half its Toughness or less." "**Loss:** Every fighter is Down at the Heart, or dawn breaks with the Heart above half."
- **Problem:** A12 and A15. A round-7 Sweep can drop the last fighter with the Heart at 40%. The step order suggests a loss (the enemies act before the clocks), but no rule says the fight ends the moment everyone is Down. The simulator scores it as a loss.
- **Fix:** Ch 3, "How a fight ends": "A fight ends the moment the enemy falls or every fighter is Down, even in the middle of a step."

### C7. Two Bulwarks in one round (Tempest Earth, the ready-made Jun)
- **Pages:** 8, 13, 9.
- **Quote:** p8, Bulwark: "Choose a fighter, you or an ally. The next time they would lose Vigor this round, they lose **3 less**." p13, Tempest: "You take **two actions** each round."
- **Problem:** Jun Park (Earth, Tempest) can Strike twice and pay for Bulwark twice. On the same fighter, do both reduce the same "next" loss (6 less) or the next two losses? The simulator never Bulwarks twice in a round.
- **Fix:** "A fighter can carry only one Bulwark at a time" (simplest), or "a second Bulwark on the same fighter covers their next loss after that."

### C8. How many Chi dice can you buy for your own roll?
- **Pages:** 10, 28.
- **Quote:** p10: "a **Chi die**: spend 1 Chi for a bonus die on your own roll"; "**Help**: … Each helper can Help a roll once." At the Table (p28): "Help (1 Chi, +1 die to another’s roll, once per roll)".
- **Problem:** A10. "A Chi die" may mean one per roll or one per Chi spent, up to the +2 cap. The card's "once per roll" for Help reads as one Help per roll in total, which contradicts Ch 3's "each helper … once". The simulator buys at most one own die. A scratch test with two own dice changed nothing measurable, but Criticals already sit at the 25% top of their target, so more dice per roll push them over (see Core-roll odds).
- **Fix:** Ch 3: "You can spend Chi for up to two bonus dice on your own roll (the cap still applies)", or "one Chi die per roll". Card: "Help (1 Chi, +1 die to another's roll; each helper once per roll)".

### C9. "Feeding" names two different rules
- **Pages:** 6, 10, 11, 18.
- **Quote:** glossary p6: "feeding — +1 damage for acting in cycle order". p10: "The Warden or the Heart feeds on its Stills." p18, Warden: "**Feeds on its Stills:** At the end of each round … it regains **1 Toughness for each of its Stills**".
- **Problem:** A16 ("terms have one meaning each"). The book's own glossary says each bold word means one thing. Players will look up "feeding" and find the wrong rule.
- **Fix:** rename the enemy rule: "**draws on its Stills**" (or "leeches"). Change Ch 3, Ch 6, Ch 7's round box, the Night sheet note and the At the Table card together.

### C10. Enemy "actions" and feeding's "the last action of the round before"
- **Pages:** 6, 11.
- **Quote:** p11: "Any action counts: a Strike, a Rally, holding a Seal, a Quick fighter’s free Strike, and the last action of the round before." Glossary p6: "Surge — A Warden’s or the Heart’s action"; "Swarm — A pack’s action".
- **Problem:** A16. By the glossary, the last action of the round before is the Surge, which no fighter took, so the first Strike of every round could never be fed. The "ring of three" example (p11) says the opposite ("every Strike after the very first one in the fight is fed"). The example settles the intent, but the rule text contradicts it.
- **Fix:** p11: "the last fighter's action of the round before (enemy steps don't count)". Change the glossary entries to "A Warden's or the Heart's end-of-round attack" and "A pack's end-of-round attack".

### C11. The ready-made fighters play about one difficulty label easier than the book says
- **Pages:** 5, 9, 19, 20.
- **Quote:** p9: "any three, four or all five of them make a good group." p19, Designer's Note: "groups win about **89** on Easy, **75** on Standard and **61** on Hard". p5: "the difficulty you pick is the difficulty you get." p20: hand out the ready-made fighters; "Pick the difficulty: **Easy** for a first night."
- **Problem:** A20. The labels are measured on random legal groups. `sim/REPORT.md` §7 shows ready-made trios winning 85% at Standard (78–91%) and 70% at Hard (62–78%), against 75% and 61%. The book's recommended first table (three ready-made fighters) gets a Standard night that plays like Easy, and a Hard night above the Hard band, without being told.
- **Fix:** add one line to the Designer's Note and to "Ready-made fighters": "Three ready-made fighters are a little stronger than an average group: at Standard they win about 85 nights in 100. For a real challenge with them, play Hard." Or retune the ready-made picks until trios land on the labels.

### C12. Guardian's 2 Chi when the Guardian goes Down by guarding
- **Page:** 8.
- **Quote:** "you may lose it instead. When you do, gain 2 Chi." Compare p10, hit back: "gain **1 Chi** (unless you went Down)."
- **Problem:** A15. If the Guardian goes Down taking the loss, does the 2 Chi come before (lost with all Chi on going Down), after (kept while Down), or not at all? Players will want the Chi kept.
- **Fix:** "…gain 2 Chi, unless taking it puts you Down" (matches the hit-back wording and the B1 fix).

## Minor

| # | Page | Quote | Problem | Suggested fix |
|---|---|---|---|---|
| M1 | 11 | "**The clock runs out.** Every fight ends at the end of round 7 (Chapter 5)." | Ch 5 says this only for Anchors, and the Heart can end sooner ("one round sooner for each Hour owed", p15). A11 | "Anchor fights end at the end of round 7; the Heart ends at dawn (Chapter 5)." |
| M2 | 11, 14 | "The First Clash is won when its last Still falls." | Everyone Down in the First Clash, round 7 of the First Clash, and withdrawing from it are all undefined (A12). The simulator never sees it (longest First Clash 5 rounds, no wipes) | "If everyone goes Down in the First Clash, they stand with 1 Vigor and the Hunt begins anyway; the Stills scatter." |
| M3 | 19, 14, 27 | "Heart Toughness, every Anchor broken 15 / 20 / 30"; "or when every Anchor is broken" | Four Hours and five Anchors mean at least one Anchor always stands. The first Heart row and the Hunt-ending clause can never apply, and players may plan to break all five | Make the table's base row "one Anchor standing: 27 / 36 / 50", plus 12 / 16 / 20 per extra Anchor; drop "or when every Anchor is broken" or add "(you can break at most four)". |
| M4 | 27, 15 | "Hours owed (each brings dawn one round sooner): ☐☐☐"; "one round sooner for each Hour owed" | Only the last fight of the Hunt can owe an Hour, so at most one is ever owed | One box; "dawn breaks at the end of round 6 if you owe an Hour". |
| M5 | 7, 8, 13 | "Your starting (and maximum) Vigor"; Renewal, Medic, Wellspring "share out 2 Vigor" | Nothing says healing stops at the maximum (A1) | Ch 3: "Nothing takes you above your maximum Vigor." |
| M6 | 18 | "It also shatters once the Warden is at half its Toughness or less." | A Warden that heals from its Stills back above half: does the Shell come back? (A1) | "A shattered Shell stays shattered." |
| M7 | 8 | Sweeper: "also deal 1 damage to one other enemy." | No other enemy in the First Clash, or once the pack is gone (A13). Also unclear whether Sweeper's damage, being damage and not a hit, shatters a Shell | "…if there is one. This is damage, not a hit: it doesn't shatter a Shell." |
| M8 | 8 | Quick: "Before the first round of each fight, take a free Strike" | Is it "this round" for a Bulwark declared on it, for the round-1 Crush ("most damage this round") and for Guardian's once per round? Can the Quick fighter Awaken first? | "Quick's Strike counts as part of round 1." (The simulator counts it as outside round 1: decide and match.) |
| M9 | 14, 12 | "As the fight begins, **every fighter gains 3 Chi**, and anyone may Awaken." vs "at the **start of your turn**" | Can fighters Awaken before round 1 (which gives Wellspring and Harmony an extra share)? In what order do the Heart's Chi, Breath and Quick come? | "…and anyone may Awaken at the start of their turn"; "First the Heart's Chi and Breath, then Quick." |
| M10 | 9 | "A player who arrives late takes an element nobody has, the starting Vigor everyone else began with, and 2 Chi." | Style, perk and Awakening not mentioned; Tough's +3 not mentioned | "…and a style, perk and Awakening nobody has (+3 Vigor if Tough)." |
| M11 | 11 | "Any element nobody has is **skipped**, so the ring always closes" | A Down fighter keeps their place, so the ring is broken while they are Down. Correct as written, but "always closes" suggests otherwise | "A Down fighter keeps their place in the ring, so nobody after them is fed until they stand." |
| M12 | 28 | "**Critical:** Guard met and two 6s"; "**Fewer hits:** hit back: lose its Harm, gain 1 Chi." | Ch 3 says "two or more 6s" and "(unless you went Down)" (A11) | Copy Ch 3's words. |
| M13 | 26 | "Awakening (3 Chi, start of your turn, 3 rounds)" | Seal lasts 2. There are no boxes for Awakening rounds left, Bulwark on you this round, or Guardian used this round (A28) | "(… 3 rounds, Seal 2)", plus three "rounds left" boxes and "Bulwark ☐ Guardian used ☐" under "This round". |
| M14 | 27 | Anchor table columns: "Shell · Broken by · Anchor and Warden · Broken" | No box for "Shell shattered" during an Anchor fight | Add a "Shell shattered ☐" box by "Warden or Heart: Toughness left". |
| M15 | 6 | Glossary, "Each one means exactly one thing; the list below says where it is explained." | Missing bold terms: Night card, Crush, Sweep, Drain, Call, breaker / breaks, withdraw, Hours owed, First Clash, Hunt, Prologue, Epilogue, element, fighting style, perk, Awakening (the noun), meet the Guard, ring | Add them, or unbold terms not in the list. |
| M16 | 14, 19, 20 | "Setup: fighters and the Night card"; "Fill in the Night sheet from the Night card" | "Night card" and "Night sheet" are too close. The Night card is a table on p19, not a printed card, so newcomers look for it among the printouts | Rename the table "the Difficulty table" or "the Night numbers". |
| M17 | 6, 14 | "**Strike an Anchor.** Fight its Warden…" | "Strike" is the glossary's one-roll action; here it means a whole fight (A16) | "**Attack an Anchor**" or "**Go to an Anchor**". |
| M18 | 6, 14, 18 | "Each element breaks one kind of armour"; "If the Warden falls, the Anchor **breaks**"; the Shell "shatters" | "Break" is used for Shells (by an element) and for Anchors (by winning), and Shells also "shatter" (A16) | Keep "breaks" for Anchors and "shatters" for Shells; call the element the Shell's "shatterer" or keep "breaker" but define it. |
| M19 | 14 | "**Everyone Down:** the Anchor stands, and everyone wakes with 1 Vigor." | Everywhere else, Down fighters "stand up" | "…everyone stands up with 1 Vigor." |
| M20 | 11 | (no rule) | Part B, Time: does movement cost the action? The book never says every fighter can reach every enemy (the simulator assumes it) | Ch 3, Actions: "There is no movement in a fight: anyone can Strike any enemy." |
| M21 | 15 | (no rule) | Part B, The end: rewards and carry-over. The book doesn't say that nothing carries to another night | Epilogue: "Nightwake is one night. Nothing carries over; a new night starts fresh." |
| M22 | 7 | "Each fighter makes four picks" | Part B asks for random tables with duplicate rerolls. The book has picks, a tie-break roll and ready-made fighters, but no random option | Optional: "Roll a d6 on each list; reroll anything already taken." |
| M23 | 24 | "**Pick or roll a sign of the Unmade** for each Anchor" | Five rolls on a d6 table repeat often, and there is no duplicate rule | "Reroll a sign another Anchor already has." |
| M24 | 19 | "Three, four and five fighters do equally well." | At Easy, 3 fighters win 86.1% against 91.9% for 5, and lose 1.3% against 0.3% (`sim/REPORT.md` §2) | "…within a few points of each other." |
| M25 | 20 | "players with fewer seats pick any of them" | Odd wording | "with fewer than five players, pick any of them". |
| M26 | 22 | "**The Substation** … The power station by the canal" | A substation isn't a power station; Ch 9 says "The substation by the canal" | "The substation by the canal". |
| M27 | 20 | "Round 4 at an Anchor: has it become a long fight? Round 7: the fight ends." | At the Heart, dawn can come at round 6 | "…Round 7 (the Heart: 6 if an Hour is owed): the fight ends." |
| M28 | 10, 17 | "in any order the players like"; "one fighter of the players’ choice" | No tie-break when players disagree | "If the players can't agree, the Storyteller decides." |
| M29 | 14 | Respite: "Every fighter returns to **full Vigor** and every Down fighter stands." | Nobody is Down between fights (everyone stands when a fight ends), so the second half never applies. Harmless | Drop "and every Down fighter stands". |
| M30 | CORE-RULES §11 | "each element, style, perk and awakening is within 2 points of the others in its pick" | The report shows options within ±1.5 points of their pick's average, which allows 2.6 points between two of them | "within 2 points of its pick's average". |

## Part A pass/fail table

| Rule | Result | Notes (issue numbers above) |
|---|---|---|
| A1 Every state of every track | Fail (minor) | Hours, dawn, Chi, Toughness and the round are well defined. Gaps: healing above the maximum (M5), a Shell after the Warden heals back above half (M6), the Hours owed maximum (M4). |
| A2 No feedback spirals | Pass | Hit backs give Chi; Guard is fixed; one long fight gives one extra Hour; no wound penalties. |
| A3 No good result undoes the threat cheaply | Pass | Criticals give damage and Chi, never Hours or rounds. |
| A4 Losing costs; losing never better than fighting on | Fail | B1: being Down lets a fighter soak a Swarm or, as Guardian, any loss for free. Withdrawing at round 4 may dodge the long-fight Hour (C4). Otherwise losing an Anchor costs the Hour and strengthens the Heart. |
| A5 No spend is ever free | Fail | B1 ("Harm past 0 is lost" makes a Down target free). Guardian's 2 Chi also comes when Bulwark or Unbreakable cut the loss to 0: not free (Earth pays 1 Chi, Unbreakable costs 3), but a cheap Chi source. |
| A6 No dominated option | Pass | No option is always worse than another in its pick. Report §5: every option within ±1.5 points of its pick's average. |
| A7 Resources get spent | Pass | Median fighter spends 92–93% of their Chi. Ch 4 tells players to spend it, and the reviewer confirmed that saving 3 Chi through the Hunt costs about 6 points at Standard (1,000 nights per size: 68.7% against about 75%). |
| A8 Nothing skips a roll for free | Pass, with a note | Quick and Tempest still roll; Rally is an action. If Renewal can stand a Down fighter (C1), it is a Rally that costs no action. |
| A9 Every option matters in the shipped scenarios | Pass | All five Shells appear every night; every option is worth 5.2–12.7 points against a blank copy (report §5). Seal and Sweeper do nothing in the First Clash (no Warden, one enemy), which is acceptable. |
| A10 Limits per character or group, stated | Fail (minor) | Once per round, fight, Strike and night are all defined. Not stated: Chi dice per roll (C8), Bulwark stacking (C7), a late joiner's picks (M10). |
| A11 One source of truth | Fail (minor) | The card differs from Ch 3 on Help and Critical (C8, M12); Ch 3's "every fight ends at round 7" differs from Ch 5 (M1); the fighter sheet's "3 rounds" (M13). |
| A12 Literal at the start and end | Fail | First Clash end states (M2); everyone Down at dawn (C6); withdrawing at round 4 (C4); the Quick Strike's round (M8); the unreachable "every Anchor broken" (M3). |
| A13 "Nearest / other / none" | Fail | Swarm and Guardian with Down fighters (B1); Crush on a Down fighter (C2); Sweeper with no other enemy (M7). The Drain with no Chi and the missing Shell breaker are handled well. |
| A14 Nothing consumable runs out without a rule | Pass | Hours, Anchors and Stills all covered. A Call forms a new pack. |
| A15 Order of resolution | Fail | The Strike order, protection order and enemy order are good. Missing: withdraw vs long fight (C4), Guardian's Chi vs going Down (C12), start-of-fight order (M9), everyone Down vs dawn (C6). |
| A16 Terms have one meaning | Fail | "Feeding" (C9), enemy "actions" (C10), "Strike an Anchor" (M17), "break / shatter" (M18), "Night card / Night sheet" (M16). |
| A17 Examples checked and teach good play | Pass | All three add up (see below). They teach walking the ring and thinning the pack, which the simulator confirms. |
| A18 Say the true cost | Pass, with notes | Down, losing an Anchor and Awakening early are all costed plainly. Overstated: "equally well" (M24) and the ready-made labels (C11). |
| A19 Simulate first; targets | Pass | Every target met. Criticals sit on the top edge at 25.0%. |
| A20 Labels from results | Fail (confusing) | True for random groups; ready-made trios play about one label easier (C11). |
| A21 3, 4 and 5 players | Pass | Explicit Vigor and Heart adjustments; each size within 3.2 points. |
| A22 Every clock binds | Pass | Long fights in 40% of nights, dawn in 10–20% of Heart fights, and Hours always bind (four Hours, five Anchors). The Anchor round-7 cap almost never fires (about 0.6% of Anchor fights), which is acceptable for a cap under A24. |
| A23 Partial wins are partial | Pass | Driven off needs the Heart at half or less, and the text says it costs the city. |
| A24 Long events | Pass | Everything is capped at 7 rounds; Tempest gives only two actions. |
| A25 Ready-made scenario complete | Pass | No map, ways in or athletic trait apply (there is no movement). Every Warden and the Heart have numbers and a d6 Surge procedure; a Shell whose breaker isn't in the group still shatters at half Toughness. |
| A26 Generators are validated tables | Pass | Ch 9's tables are flavour with fixed numbers, every result is allowed anywhere, and the always-five-Shells rule guarantees a playable night. Minor: no duplicate rule for signs (M23). |
| A27 First night under 30 minutes | Pass | What to print, dice (five plus two of another colour), what to track, a tie-break, ready-made fighters, and whether players read Part Two: all stated (p5, p7, p20). |
| A28 Sheets fit the biggest case | Fail | No per-fighter damage tracking for the Crush (C3); no Awakening rounds-left, Bulwark, Guardian or Shell boxes (M13, M14); 3 Hours-owed boxes for at most 1 (M4). Vigor (13 pips) and Chi (5) fit. |
| A29 Storyteller's load on one card | Pass | A three-step round, a round box (p20), the Night sheet's Surge table and the At the Table card. |


## Part B coverage table

| Question | Answered? | Where (one place?) | Gaps |
|---|---|---|---|
| The roll: dice, bands, Critical, bonus cap, opposed rolls | Yes | Ch 3, p10 (one place; the card repeats it) | How many Chi dice per roll (C8). |
| Group actions: helping, what one roll covers | Mostly | Ch 3, p10–11 | Chi die count; the card's "once per roll" (C8). There are no group checks, which is fine. |
| Time: turn, round, scene; one action; movement | Mostly | Ch 3 (round, action, p10–11); Ch 5 (Hour, fight, p14) | Reach and movement are never stated (M20); the Quick Strike's round (M8). |
| Threat: every track and state, what raises and lowers it, the top | Mostly | Ch 5 clocks (p14–15); Ch 6 Surge (p18) | Withdraw at round 4 (C4); Hours owed maximum (M4); the "feeding" name clash (C9). |
| Resources: earned, spent, never free or dominated | Mostly | Ch 4 (Chi, p12); Ch 3 (Vigor, p11) | Free soaking at 0 Vigor (B1); healing cap (M5); Chi gained while Down (B1, C12). |
| Characters: steps, random tables, starting resources, replacements | Mostly | Ch 2, p7–9 | No random tables (M22); a late joiner's picks (M10). Starting resources are equal for everyone. |
| NPCs and threats: stats, attacks, beaten, driven off, active | Mostly | Ch 6, p17–19 | Targeting Down fighters (B1, C2). |
| The prize: what partial means, what capture does | Yes | Anchors broken or standing set the Heart (Ch 5–6); driven off (p15) | The "every Anchor broken" row is unreachable (M3). |
| Failure states: Down, coming back, everyone Down, giving up | Mostly | Ch 3 (p11), Ch 5 (p14) | First Clash with everyone Down, and no withdrawing there (M2); what a Down fighter can still do (B1). |
| The end: every way, literal first and last moment, tiers, carry-over | Mostly | Ch 5 Endings (p15), Ch 7 Epilogues | Everyone Down vs dawn in the same round (C6); no carry-over statement (M21). |
| Party size: 3, 4, 5 with adjustments | Yes | Ch 6 Night card (p19); repeated in Ch 2 (p7), consistent | none |
| Simulator targets | Yes | Ch 6 Designer's Note (p19) for win and loss; `sim/REPORT.md` for the rest | Ready-made groups (C11). |

## Core-roll odds

Computed exactly by enumeration (a die is a 6 with p 1/6, a 5 with p 1/6, a miss with p 4/6). "Meet" = hits ≥ Guard; "Critical" = meet **and** two or more 6s (the book's definition); "hit back" = 1 − meet. Fractions are exact; percentages rounded.

**Plain roll (no technique, no rerolls)**

| Dice | Guard | Meet | Hit back | Critical | Zero hits | Mean hits |
|---|---|---|---|---|---|---|
| 5 | 1 | 211/243 = 86.8% | 13.2% | 763/3888 = 19.6% | 32/243 = 13.2% | 1.67 |
| 5 | 2 | 131/243 = 53.9% | 46.1% | 763/3888 = 19.6% | 13.2% | 1.67 |
| 5 | 3 | 17/81 = 21.0% | 79.0% | 443/3888 = 11.4% | 13.2% | 1.67 |
| 6 | 1 | 665/729 = 91.2% | 8.8% | 12281/46656 = 26.3% | 64/729 = 8.8% | 2.00 |
| 6 | 2 | 473/729 = 64.9% | 35.1% | 26.3% | 8.8% | 2.00 |
| 6 | 3 | 233/729 = 32.0% | 68.0% | 8441/46656 = 18.1% | 8.8% | 2.00 |
| 7 | 1 | 2059/2187 = 94.1% | 5.9% | 7703/23328 = 33.0% | 128/2187 = 5.9% | 2.33 |
| 7 | 2 | 179/243 = 73.7% | 26.3% | 33.0% | 5.9% | 2.33 |
| 7 | 3 | 313/729 = 42.9% | 57.1% | 5911/23328 = 25.3% | 5.9% | 2.33 |

**With the two reroll techniques and Metal's Edge (same dice counts, Guard 1 / 2 / 3)**

| Effect | Dice | Meet G1 / G2 / G3 | Critical G1–2 / G3 | Zero hits | Mean hits |
|---|---|---|---|---|---|
| Metal Edge (each 6 = 3 hits) | 5 | 86.8 / 70.4 / 62.1% | 19.6 / 19.6% | 13.2% | 3.33 |
| | 6 | 91.2 / 78.0 / 69.8% | 26.3 / 26.3% | 8.8% | 4.00 |
| | 7 | 94.1 / 83.9 / 76.2% | 33.0 / 33.0% | 5.9% | 4.67 |
| Water Tide (reroll up to 3 misses) | 5 | 96.1 / 80.5 / 53.2% | 38.4 / 31.6% | 3.9% | 2.58 |
| | 6 | 97.4 / 85.7 / 62.3% | 45.4 / 39.5% | 2.6% | 2.96 |
| | 7 | 98.3 / 89.6 / 70.1% | 51.5 / 46.6% | 1.7% | 3.32 |
| Lucky (reroll every miss, used only when the Guard is missed) | 5 | 98.3 / 87.4 / 60.3% | n/a | 1.7% | n/a |
| | 6 | 99.2 / 93.5 / 75.4% | n/a | 0.8% | n/a |
| | 7 | 99.7 / 96.7 / 85.4% | n/a | 0.3% | n/a |

What the odds say:
- **At Guard 1 and 2 the Critical chance doesn't depend on the Guard,** because two 6s always meet it. Bonus dice are the main Critical lever: 19.6% → 26.3% → 33.0%. The simulator's pooled 25.0% sits on the top edge of the 15–25% target. Anything that adds dice per roll (two own Chi dice, C8; more Help) pushes it over.
- **A bare roll fails outright 13.2% of the time;** with the usual bonus die, 8.8%. The pooled 9.6% is on target.
- **An unbroken Shell (Guard 3) hits back 79% of bare rolls.** Bonus dice matter most there (21% → 43% with +2), which fits the book's "break the Anchors you can break" advice.
- **Metal's Edge almost cancels any Shell** (62% against 21% at Guard 3 on five dice) and doubles mean damage. Metal is in effect a breaker for every Shell. That is not a rules gap and the simulator has Metal in balance, but Ch 5's Anchor advice could mention it.
- **Water's Tide** lifts five dice to roughly what seven plain dice do against Guard 2, and better against Guard 1.

The reviewer's enumeration script and the scratch copy of the simulator were kept outside the repository, as instructed; the method above is enough to reproduce every figure.

## Option audit

Each option was checked for skipped rolls, missing limits, dead or dominated use, broken combinations, and references to rules that don't exist. No option refers to a rule that doesn't exist.

**Elements (techniques, 1 Chi, declared with a Strike, once per Strike)**
- **Wood, Renewal:** unclear on Down allies (C1); no healing cap (M5). Paid before the roll and works "whatever the result": clear. The weakest element in the simulator (−1.5, 5.2 points against blank, the lowest of all 28 options), still inside the target.
- **Fire, Blaze:** clean. +2 on any hit (86.8% on five dice against Guard 1).
- **Earth, Bulwark:** stacking with Tempest (C7); "this round" when declared on Quick's Strike (M8). Bulwark plus Guardian is a Chi engine (Earth pays 1, Guardian gains 2, the loss disappears). That works as written and is not free.
- **Metal, Edge:** strong against Guard 3 (see odds). With Ascendant each 6 deals 6. Edge doesn't change the 6s count for Criticals: clear. In balance.
- **Water, Tide:** clean. The order "Tide first, then Lucky" is stated (p11), so Water with Lucky is settled.

**Fighting styles (always on)**
- **Brawler:** clean.
- **Guardian:** a Down Guardian (B1); Chi vs going Down (C12). Gains 2 Chi even when Bulwark or Unbreakable cut the loss to 0: as written, Guardian plus Unbreakable gains 2 Chi a round for three rounds. Cheap but bounded. "Once per round" has no gap before round 1, because Quick can't be hit back.
- **Sweeper:** no "other enemy" (M7); does nothing in the First Clash; its damage isn't a hit, so whether it shatters a Shell should be said.
- **Counter:** works from Down by implication (the "same Strike … puts the last fighter Down" win rule, p11, only makes sense for Counter). Say so outright. Counter plus Unbreakable (the ready-made Sam) is good synergy, and not free (it needs a miss).
- **Flow:** clean. The name "Sweep" (a Surge) sits close to "Sweeper" (a style); Flow's "except from a Sweep" is still clear in context.
- **Breath:** at the Heart, 3 + 4 Chi is capped at 5, so mostly wasted. Not dominated (−0.1). "Can't take you past 5 Chi" is stated.

**Perks**
- **Tough:** a late joiner's Tough isn't covered (M10). The sheet's 13 Vigor pips fit 10 + 3.
- **Medic:** no cap (M5); meaningless after the Heart. Fine.
- **Lucky:** clean; the sheet has a box.
- **Quick:** which round its Strike belongs to (M8), and Awakening before it (M9). The feeding rule names it explicitly: good.
- **Stubborn:** clean; the sheet has a box. It can lift a fighter from 1 Vigor to 2 (works as written, harmless).
- **Trained:** clean. "Double your hits first, then add bonuses" (p12) settles it with Ascendant.

**Awakenings (3 Chi, once a night, start of your turn, 3 rounds; Seal 2)**
- **Ascendant:** clean; the order is stated.
- **Unbreakable:** clean. It makes Swarm targeting trivial (every Swarm goes to them), as intended.
- **Wellspring:** clean. Awakened mid-round, it gives two shares (4 Vigor), and "acts that round" is stated. Needs the healing cap (M5).
- **Tempest:** Bulwark stacking (C7). "Your second action is never fed by your first": good.
- **Seal:** dead in the First Clash (no Warden or Heart to Seal), and the only way to Awaken there is someone going Down. Clear otherwise: holding the Seal is your action, you can still Help, and Stills still Swarm.
- **Harmony:** Chi shared to a Down fighter (and kept after a Rally?) is covered by the B1 fix.

**Combinations tried:**
- no rule gaps: Guardian + Unbreakable, Guardian + Bulwark, Counter + Unbreakable, Tempest + Sweeper (two Sweeps a round), Water + Lucky, Wellspring + Rally;
- Metal + Ascendant + Trained: a best case of 7 sixes = 21 hits × 2 + 1 Critical + 2 Trained + 1 fed = 46 damage, rare;
- Earth + Tempest: needs C7.

None is dominated. The simulator's blank tests (report §5) give every option 5–13 points.

## Worked examples checked

| Example | Page | Check | Result |
|---|---|---|---|
| A strike (Jun) | 10 | 6 dice: 6, 5, 3, 3, 2, 1 = 2 hits ≥ Guard 2, so no hit back; 2 + 1 Brawler = 3; one 6, so no Critical. The miss case: 1 damage, no Brawler, −2 Vigor, +1 Chi | Correct |
| A ring of three | 11 | Wood → Earth → Water → Wood; acting in order, every Strike after the first is fed (the last action of the round before feeds the next round's first). A Rally by Water still feeds Wood | Correct (but see C10: the glossary's enemy "actions" contradict it) |
| One round at an Anchor | 11 | 3 fighters: Warden 27, pack 3 Stills = 9. Ana (breaker, Guard 2): 2 damage, shatters the Shell, Sweeper 1 to the pack (pack 8). Marcus fed: 1 + 2 Blaze + 1 fed = 4, misses Guard 2, takes 2 Harm, gains 1 Chi (Warden 21). Priya fed: 3 + 1 = 4 on the pack: 9 − 1 − 4 = 4, so 2 Stills. Warden +2 (23); Swarm ⌈2/2⌉ = 1 to Marcus | Correct |
| The Night card | 19 | Warden 9 × n = 27 / 36 / 45; Heart base 5 × 3, 5 × 4, 6 × 5 = 15 / 20 / 30; per Anchor 4 × n = 12 / 16 / 20; Stills 2n = 6 / 8 / 10; n = 3 / 4 / 5; Call cap n + 2 = 5 / 6 / 7 | Correct (the base row is unreachable, M3) |
| Time budget | 14 | 25 + 4 × 25 + 35–40 + 10 = 170–175 minutes of play, plus 20–30 setup | Matches "about three hours" |
| Designer's Notes | 12, 19 | Wins 89 / 75 / 61 and losses 1 / 10 / 21 against report §1 (89.3 / 75.1 / 61.3; 0.8 / 9.8 / 20.6). "Ignores the Stills … about half" against 55.0%. "Spent their Chi … did better": confirmed by the reviewer's run (saving 3 Chi: Standard 68.7%) | Correct; see C11 and M24 |

## Simulator vs book

The simulator (`sim/engine.mjs`, `params.mjs`, `data.mjs`) follows `docs/CORE-RULES.md`. Its numbers match the book's numbers line by line, and it already implements the book's extra Ch 6 rules (Called Stills don't Swarm until the next round; a Sealed Warden still feeds). Every player choice is a documented POLICY. Where the book is silent, the simulator takes the stricter reading, which is why the published numbers would survive the B1 and C2 fixes unchanged.

Differences, and whether each could change the balance numbers. The reviewer tested the material ones on a scratch copy of the simulator (2,000 nights per size; the real `sim/` was not changed):

| # | Book says | Simulator does | Could it change the numbers? |
|---|---|---|---|
| S1 | A Swarm goes to "one fighter of the players' choice", Down fighters not excluded (B1) | Gives it only to standing fighters (an awake Unbreakable fighter, else the most Vigor) | **Yes, a little, and more if exploited:** loss −0.5 (Standard) and −0.7 (Hard) with no deliberate play. The simulator also never aims the Swarm at a Flow or Bulwarked fighter (policy; slightly understates the players). |
| S2 | Guardian is always on; a Down Guardian isn't excluded (B1) | Only a standing Guardian guards, and only when its own Vigor exceeds the loss | **Yes, materially:** with a Down Guardian soaking once a round, Standard loss 9.8% → 6.4%, Hard loss 20.5% → 13.5% (out of target), Hard partial 17.7% → 23.5%. |
| S3 | Crush hits "the fighter who dealt it the most damage this round", even if now Down (C2) | Skips Down fighters to the next living hitter, else the most Vigor | No: +0.2 win points. |
| S4 | Renewal "you or an ally regains 1 Vigor", Down allies not excluded (C1) | Heals only standing fighters, and Wood always Rallies instead of striking when someone is Down | Small: with Wood striking and standing the ally instead, Standard +0.4 and Hard +0.9 win points. |
| S5 | "A Chi die", count unclear (C8) | At most one own Chi die, and only against Guard 2+ | No measurable change with two own dice, but Criticals are at their 25% ceiling. |
| S6 | Chi gained while Down is ruled out only for the hit back's 1 Chi | Gives no Chi at all to a Down fighter (Counter's extra Chi, Guardian, Harmony) | Small. |
| S7 | Withdraw at the end of round 4 vs the long-fight Hour: order unclear (C4) | The long flag is set before the withdraw check, so withdrawing still costs the Hour | No: the withdraw policy almost never triggers (report §3: 0.0%; "Never withdraw" equals the default), so this rule is untested either way. |
| S8 | Bulwark twice in a round: unclear (C7) | Never Bulwarks twice in a round (policy; the data can't hold two) | Small. |
| S9 | The Quick Strike's round: unclear (M8) | Quick's damage doesn't count for the round-1 Crush, and a Bulwark declared on it is dropped before round 1 | Negligible. |
| S10 | "The Hunt ends … when every Anchor is broken" | Has a branch that takes a Respite after every Anchor is broken | None: unreachable with four Hours and five Anchors (dead code). |
| S11 | A Call adds Stills "up to fighters + 2" | Adds Toughness up to (fighters + 2) × 3, which also heals a damaged Still when the pack is at the cap | Negligible. |
| S12 | First Clash: no rule for everyone Down or round 7 (M2) | Treats a First Clash wipe as a lost fight and carries on; no round-7 end there | None: never happens (longest First Clash 5 rounds, no wipes). |
| S13 | No statement on reach or movement (M20) | Every fighter can strike any enemy (stated in the engine's header) | None, but the book should say it. |
| S14 | Lucky: once per fight, any roll | Used only to dodge a hit back, never on Quick or Tempest Strikes (policy) | Small; slightly understates Lucky. |
| S15 | The Anchor round-7 cap ("the Warden holds") | Counted internally as a withdrawal and shown nowhere: report §3's won · wiped · withdrew add to 99.4% | None to play; a reporting gap. |
| S16 | Ch 4's Designer's Note says saving Chi does worse | Report §6's "Spend Chi freely" row is the default habit (`reserveForAwakening: false`), so the report never shows the saving habit | None to play. The claim holds (the reviewer's run: Standard 68.7% when saving), but the report should show that row. |
| S17 | Sweeper deals 1 damage | Correct in code (`sweeperDamage: 1`), but the comment at engine.mjs line 363 says "2 damage" | None. |
| S18 | Late joiners and leavers (p9) | Not simulated | Unknown; rare. |

Only S2 changes a published label. Fixing B1 the way the simulator already plays keeps every published number valid.

## What works

- **One roll settles both sides.** Meet the Guard or be hit back, then gain Chi from the pain: easy to teach, no death spiral, and the exact odds sit where the design wants them (54% against a Warden on five dice, 87% against a pack).
- **The feeding ring that skips missing elements** is elegant and size-neutral. The ring-of-three example teaches it in four lines.
- **Shells and breakers, with the half-Toughness fallback,** give every element a moment in every night without ever needing a missing element (A13 done right).
- **The Night card changes only the Heart.** Difficulty sits in one small table.
- **Stills that heal their master** turn targeting into a real decision, and the book tells players the winning habit (thin the pack, don't chase the last Still).
- **Clocks that bind:** a long fight costs an Hour, the Warden holds at round 7, dawn comes at round 7. The Night sheet shows them where everyone can see.
- **Endings are literal at the hard edge:** "If the same Strike destroys the Heart and puts the last fighter Down, the fighters win" (p11).
- **A three-step round, a Strike order and a protection order,** each written once in Ch 3 and repeated faithfully on the card.
- **The first-night checklist** (p20), the dice colours, the tie-break and the ready-made fighters meet A27 fully.
- **The ready-made night matches the night-making tables** entry for entry, and every result on those tables works in any night.
- **Every cross-reference and every worked example is correct,** and the Designer's Notes quote the simulator honestly.

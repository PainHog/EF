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

<!-- part 2 follows -->

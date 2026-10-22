# Nightwake v0.1: combined review

The review of version 0.1, run as `docs/REVIEW-PROCEDURE.md` says: an independent rules review, two playtests with logged real dice, and the layout and art audit, each done separately from the others, then combined here. All three reports and the dice logs are in this folder:

| File | What |
|---|---|
| `rules-review.md` | Rules review: 1 blocker, 12 confusing, 30 minor; exact odds; Part A and Part B tables; simulator against the book |
| `playtest-a.md`, `playtest-a-dice.log` | Playtest A: a first night with 3 new players (Easy, then a night built from Chapter 9 at Standard); 123 logged rolls |
| `playtest-b.md`, `playtest-b-dice.log` | Playtest B: 5 experienced players at Hard, plus 23 drills and a 3-fighter Heart; 183 logged rolls |
| `verification.md` | Verification round: every earlier item marked fixed or not, new gaps, the simulator re-run, the online version checked |
| `playtest-a2.md`, `playtest-a2-dice.log` | Playtest A2 on the fixed book: 3 new players, Easy then Standard; 160 logged rolls |
| `playtest-b2.md`, `playtest-b2-dice.log` | Playtest B2 on the fixed book: 5 players at Hard on a Chapter 9 night, plus drills; 191 logged rolls |
| `dice.mjs` | The dice script every roll came from |
| `../../book/art/AUDIT.md` | The art audit, with object and figure tables for every picture |

Every issue below was checked against the book before it was fixed. Every fix is logged in `book/REVIEW.md` (rows 6 to 35) and every design decision in `docs/DESIGN.md` (D37 to D42). The verification round is summarised at the end.

## 1. Verdict

**The core works, and the edges are now settled.** In both playtests the newcomers were playing confidently by the first Anchor; the roll, the trade of blows, Chi from pain, the feeding ring and the Shells needed no rulings. The problems were what happens at 0 Vigor, at the edges of a fight, and words with two meanings. All of them are fixed in the book, the sheets, the one-page summary, the simulator and the online version.

Results of the playtests (with the rules as they were):

| Night | Group | Result |
|---|---|---|
| A1: the ready-made night, Easy | 3 new players | Win, Heart in round 4 of 7 |
| A2: a night from Chapter 9, Standard | 3 new players | Win, Heart in round 5 of 7 |
| B: the ready-made night, Hard | 5 experienced players | Win, Heart in round 4 of 7 |
| B drill 19: the Heart, Hard | 3 fighters, no Guardian or Seal | Loss on the last Surge, Heart at 6 of 51 |

## 2. Fix before anyone outside the table sees it

Done:
- **A Down fighter could soak harm for free** (blocker, found by all three reviews): see §3.
- **The Heart read as Hour 4** of the Hunt, which would cost every group an Hour: now "When the Hunt ends, the fighters are drawn to the Heart".
- **The Night sheet couldn't aim a Crush:** it now tracks each fighter's damage to the Warden or Heart this round.

Still open, for Richard:
- **The full name and trademark search** for "Nightwake" (USPTO, UK IPO, EUIPO, DriveThruRPG, itch.io, Steam). Two web checks found nothing; that isn't the full search. See `docs/DESIGN.md` §2.
- **A native speaker's check** of the Chinese terms (Wu Xing and the cycle names).
- **A try of the online version in Foundry VTT itself.** It's tested on a stand-in that plays a whole night, but not yet in a real Foundry world.

## 3. Blockers

| # | Issue | Fix | Effect on the numbers |
|---|---|---|---|
| B1 (rules review B1; Playtest B B-03, B-04, B-05) | Swarms and Crushes could be steered onto Down fighters and wasted; a Down Guardian could take any loss for nothing and gain 2 Chi | **A Down fighter is out of play** (Ch 3): nobody can choose them, they take no losses, gain no Chi, and their style, perk and technique do nothing until a Rally or Wellspring stands them up. A Crush meant for a Down fighter goes to the standing fighter who dealt the next most damage, else the most Vigor (Ch 6) | None: the simulator already played it this way. The loose reading would have moved Hard losses from 20.5% to 13.5% |

No other blockers.

## 4. Design decisions (each logged with its reasons)

| Decision | Options weighed | Chosen, and why |
|---|---|---|
| **D37 A Down fighter is out of play** | Exclude Down fighters only from Swarms; exclude them from everything | Everything: one sentence closes the Swarm, Crush, Guardian, Renewal and Harmony questions together, and matches the simulator |
| **D38 Guardian's Chi** | Leave it; Chi only for hit backs and Crushes; Chi only for a loss of 2 or more before protections; **Chi only when the Guardian actually loses 2 or more** | The last. Playtest A found a Chi engine (2 Chi for every 1-Harm Swarm); Playtest B found Guardian with Unbreakable gaining Chi from losses it never took. Simulated: the old rule let Guardian groups gain +2.1 / +4.5 points (Standard / Hard) by guarding everything, and Guardian with Unbreakable +3.8 / +6.0. Under the chosen rule both fall away (+1.3 / +0.4). The verification round added: the Guardian needs more Vigor than the loss it takes (D42) |
| **D39 The Heart after four Hours** | The Heart in Hour 4; the Heart after Hour 4 | After: it is what the Night sheet, the timings and the simulator always meant. The size table's Heart row now starts at one Anchor standing, because four Hours and five Anchors mean one always stands |
| **D40 Edge cases and terms** | For each, the two readings the reviews found | Where the simulator already played one reading, the book says that one (withdrawing at round 4 still costs the Hour; Quick's Strike isn't part of round 1; one Bulwark at a time; one Chi die per roll; a fight ends the moment everyone is Down). Terms: Wardens *draw on* their Stills, elements *shatter* Shells, *the Difficulty table*, *Go to an Anchor* |

Checked and left alone:
- **Metal's Edge** (Playtest B B-22): Metal with Brawler and Trained wins 1.6 points below average in the simulator; Metal with Ascendant is +3.6 at Hard, the strongest pairing found, and not worth a rule.
- **Opening Awakenings early on purpose** (B-27): the simulator's "Awaken as soon as allowed" habit is worse than the default (71.7% against 72.5%), and the book already says early Awakening costs the Heart.
- **A Guardian and a Seal together** (B-25): +2.8 at Hard with the old Guardian rule; +1.4 with D38.

## 5. Wording fixes

All of these are in the book, logged row by row in `book/REVIEW.md`:
- **Edge cases spelled out** (rules review C4, C6 to C10, C12, M1 to M11; Playtest A issues 6 to 8, 10, 12, 13; Playtest B B-07 to B-10, B-13 to B-21, B-23, B-26):
  - withdrawing at round 4;
  - the First Clash's end states;
  - everyone Down mid-step;
  - Bulwark stacking;
  - Chi dice per roll;
  - Help past the cap;
  - Sweeper with no other enemy, and Sweeper's damage not counting as a hit;
  - Counter from Down;
  - Quick's Strike;
  - Medic's timing and sharing to yourself;
  - the maximum Vigor;
  - a Shell shattering mid-Strike;
  - a shattered Shell staying shattered;
  - the Heart's Drain;
  - a full pack's Call;
  - the Seal holder going Down;
  - a Down fighter's place in the ring;
  - no movement in a fight.
- **Character creation** (Playtest A issues 1, 14; rules review M10, M22; Playtest B B-11):
  - clashes settled pick by pick;
  - a ready-made fighter keeps its other picks;
  - optional rolled picks;
  - group-building advice;
  - late joiners.
- **One meaning per term** (rules review C9, C10, M15 to M18): draws on, shatter, the Difficulty table, Go to an Anchor, enemy steps as "end-of-round attacks"; a fuller glossary.
- **Honest labels** (rules review C11, M24): ready-made groups are a little stronger, so play Hard for a challenge; the Designer's Note has the new numbers.
- **Newcomer questions** (Playtest A issues 5, 16, 17; rules review M21, M23, M25 to M27):
  - every night stands alone;
  - setup time with built fighters;
  - teaching the Warden at the first Anchor;
  - the round box's dawn note;
  - "the substation";
  - rerolling repeated signs.

## 6. Art

Every picture passes `book/art/ART-CHECKLIST.md`, with written object and figure tables (`book/art/AUDIT.md`). Three pieces were redrawn after looking at them in place:
- the clocks in the dawn picture floated in the sky;
- the reservoir read as a dome;
- several emblems read as other icons.

All art is original, drawn by the book's own scripts (`book/art/SOURCES.md`). No faces, no named characters, no echoes of the 2001 film, Top Cow, *Avatar* or *Ninjago*.

## 7. Layout and sheets

**Book:**
- 31 pages.
- No near-empty pages; chapter ends are filled by spot pictures.
- No text under 7.5 pt.
- Only the three credited typefaces are embedded, with no Type 3 fonts; the build now refuses any character the fonts lack.
- The contents page is generated from the real pages.
- Meaning is never shown by colour alone: each element has its own shape as well as its colour.

**Editions:**
- the full-colour book;
- a printer-friendly white edition (`--white`);
- print-on-demand files with 0.125 in bleed and a one-piece cover spread (`--print`). The spine width is an estimate to replace with the printer's own figure.

**Sheets:**
- The Fighter sheet now has Awakening rounds left, the round's Bulwark and Guardian, and how to mark Vigor.
- The Night sheet now has Shell shattered, Awakenings open, damage per fighter for the Crush, one owed-Hour box and the Heart's half.
- The At the Table card now uses Chapter 3's exact words.
- All three still fit one page each.

## 8. Rights and credits

- **Credits:** "Created by Richard Moore" and "Game design & writing: Richard Moore", the three typefaces (SIL OFL 1.1), and the online companion at domoorestudio.com.
- **No mentions:** the book, the PDFs and the online version name none of the tools used to make the game. Checked by searching every reader-facing file and every PDF's text and properties.
- **Image source log:** `book/art/SOURCES.md`.
- **Name check:** see §2 (the full search is open).
- **Famous-character echoes:** checked in `docs/DESIGN.md` §2.3 and §2.4.

## 9. What works

From the three reports, in their words where possible:
- **"One roll settles both sides."** Meet the Guard or be hit back, then gain Chi from the pain: all three newcomers had it after two Strikes.
- **The feeding ring** is elegant, size-neutral and always worth walking.
- **Shells make the Hunt a real choice:** groups picked Anchors by the Shells they could shatter, and each element got its moment.
- **Chi flowed:** it was spent as fast as it came, and Help gave everyone something to do on other players' turns.
- **The clocks bind:** a long fight cost an Hour in Playtest B; dawn and the Warden holding at round 7 settled every ending without argument.
- **The Stills matter:** what they give back each round drove target choices at every Anchor.
- **Chapter 9 built a full night in 8 minutes.**

## Part D release gates

| Gate | Status |
|---|---|
| Every Part B question answered in the text, in one place | **Pass** after the fixes: the Down state, movement, carry-over, late joiners and every end state are now in the text |
| Quick reference, sheets and trackers checked against the chapters, line by line | **Pass**: checked after the edits (the card now uses Chapter 3's words; the sheets carry every box the rules need) |
| Simulated win and loss rates on target for every label and size; no dead or dominated options | **Pass**: wins 89.5 / 74.9 / 58.3, losses 0.7 / 8.9 / 20.8, every size within 3.3 points, every option within ±1.8 of its pick (`sim/REPORT.md`) |
| Two clean playtests in a row: no blocker, no invented ruling on core flow | **Not yet**. Round 1 found the blocker. Round 2: A2 was clean; B2 had no blocker but had to invent two small core rulings (feeding after a Down; the Guardian in a Sweep), now in the book. A third round on the current book is the next step |
| Every picture passes the art checklist, with tables | **Pass** (`book/art/AUDIT.md`) |
| Layout: no near-empty pages, text ≥ 7.5 pt, no colour-only meaning, contents and cross-references verified | **Pass** |
| Print: printer-friendly version; bleed, cover spread, fonts embedded and credited, no Type 3 | **Pass** (the spine width needs the printer's figure before ordering) |
| Credits and rights | **Pass**, except the full trademark search (§2), which is Richard's |

## Verification round (second round)

**Verification** (`verification.md`): of the 87 earlier items, 75 fixed, 7 partly fixed (old words left in a few places), 2 changed differently (agreed), 1 not changed (where to put the last Respite; now covered by a sentence in the advice) and 2 deliberately left alone (agreed). No new blocker; 1 confusing (Guardian with Stubborn) and 12 minor. The seeded simulator re-run matched `sim/REPORT.md` exactly. Two places where the online version disagreed with the book were fixed (Awakening before Quick's free Strike; the Guardian's Chi with Stubborn).

**Playtest A2** (3 new players; Easy, then a Chapter 9 night at Standard): **clean**: no blocker and no invented ruling on core flow. Driven off at Easy (the Heart on 3 of 39 at dawn), a round-7 win at Standard with the fighters on 2, 2 and 1 Vigor. 1 confusing and 7 minor issues, all fixed.

**Playtest B2** (5 players at Hard on a Chapter 9 night, plus drills): driven off (the Heart on 12 of 70), no blocker; the table had to invent two one-line core rulings (feeding after a Down; the Guardian in a Sweep). 5 confusing and 13 minor issues, all fixed. Drills covered every ending.

**What changed** (D41, D42; `book/REVIEW.md` rows 23 to 35):
- Hard's Heart Crush is 7, because tables give Swarms to Flow or Bulwarked fighters (now the simulator's habit). Every target is still met.
- The Guardian can take a loss only with more Vigor than the loss. This closes a Rally-the-Guardian loop and the Stubborn question.
- A Sweep's losses come one at a time in the players' order, and an action taken before going Down still feeds.
- A start-of-round step was added for Wellspring and Harmony.
- A late joiner now resets everyone's maximum Vigor to the new group size.
- Going back to an Anchor is a new fight.
- The sheets now carry each enemy's Guard and Harm, a ring line and names for the Crush damage.


# Playtest B, version 0.1: the rowdy table

**Table:** 5 experienced players trying to break the game, one Storyteller. **Difficulty:** Hard. **Night:** "The Night the Clocks Stopped" (Chapter 8).
**Rules used:** only the book, `book/src/chapters/*.html` and the built PDF `book/dist/Nightwake_v0.1.pdf` (29 pages). Page numbers below are PDF pages.
**Dice:** every roll comes from `review/v0.1/dice.mjs` and is logged in `review/v0.1/playtest-b-dice.log`. Dice references below quote the roll label from that log.

## Setup

### Making the fighters (Chapter 2, pp. 7-9)

The players read the four picks and set out to cover as many styles, perks and Awakenings as possible while building the nastiest combinations they could find. Two clashes were settled by the book's roll-off ("both roll a die and the higher roll picks first", p. 7):

- Unbreakable, wanted by the Earth and Water players: Earth 3, Water 5. Water takes it. (log: "Setup pick clash Unbreakable")
- Ascendant, wanted by the Metal and Fire players: Metal 1, Fire 5. Fire takes it. (log: "Setup pick clash Ascendant")

| Fighter | Element | Style | Perk | Awakening | Vigor | Chi | The player's plan |
|---|---|---|---|---|---|---|---|
| **Tess Adeyemi**, night-shift care worker | Wood (Renewal) | Flow | Medic | Harmony | 6 | 2 | Healer and Chi battery; Flow makes small blows vanish |
| **Omar Haddad**, takeaway cook | Fire (Blaze) | Breath | Quick | Ascendant | 6 | 2 | Breath refills him every fight, so Blaze on every Strike; Quick opens every fight |
| **Lou Brennan**, nightclub doorman | Earth (Bulwark) | Guardian | Tough | Seal | 9 | 2 | The wall: soaks the big blow each round and turns it into Chi |
| **Kit Mercer**, 24-hour locksmith | Metal (Edge) | Brawler | Trained | Tempest | 6 | 2 | Edge sixes count three hits; Trained Criticals; two actions when Awakened |
| **Nell Fairweather**, lifeguard at the old baths | Water (Tide) | Counter | Lucky | Unbreakable | 6 | 2 | Rerolls on rerolls; gets paid in Chi and damage for being hit back |

Unpicked, for the drills: style **Sweeper**, perk **Stubborn**, Awakening **Wellspring**.

**Ring** (p. 11): Wood (Tess) -> Fire (Omar) -> Earth (Lou) -> Metal (Kit) -> Water (Nell) -> Wood.
**Shells this group breaks:** Wood Shell (Kit), Fire Shell (Nell), Earth Shell (Tess), Metal Shell (Omar), Water Shell (Lou). Every Anchor has a breaker.

### The Night card at Hard with five fighters (pp. 18-19)

Starting Vigor 6 (Lou 9 with Tough). Warden: Guard 2 (+1 Shell), Harm 2, Toughness 45, Crush 3, Sweep 1. Pack: Guard 1, Harm 1, 3 Toughness per Still; 5 Stills at an Anchor or the Heart (15 Toughness), 10 at the First Clash (30 Toughness); a Call fills a pack up to 7. Heart: Guard 2, Harm 2, Toughness 30 + 20 per Anchor standing, Crush 6, Sweep 3.

## Play log

Notation: "Strike X (Y)" names the target and the free spends declared before the roll. Damage is written as hits + bonuses. V = Vigor, C = Chi. Every roll's label in the dice log starts with the fight code (FC, H1, H2, Heart) and the round.

### Prologue

Each player described their waking (Tess: the care home's dead pot plants put out leaves as she walked past; Omar: the kebab grill's flame climbed his arm and didn't burn; Lou: the queue outside the club froze and the pavement held him up; Kit: every lock on the street clicked open at once; Nell: the pool stopped mid-ripple and she kept swimming). The Storyteller asked one Chapter 7 question of each. Then the night bus station (Chapter 8).

### First Clash: the night bus station (pack of 10 Stills, 30 Toughness, Guard 1, Harm 1)

- **Start of fight.** Breath: Omar 2 + 4 = 6, capped at 5 (p. 8, "Breath can't take you past 5 Chi").
- **Before round 1, Omar's Quick Strike** at the pack (Blaze, Quick die + Chi die = 2 bonus dice, the cap): 3 4 3 6 6 6 6 = 4 hits, four 6s, Critical. 4 + 2 Blaze + 1 Critical = **7**. Pack 30 -> 23. Omar C 5 -> 3 -> 4 (Critical).
- **Round 1.** The table walked the ring starting from Earth, because Omar's Quick Strike was the last action (p. 11: "a Quick fighter's free Strike" counts for feeding).
  - Lou, fed (Bulwark on himself, Chi die): 2 6 3 6 5 2 = 3 hits, Critical. 3 + 1 fed + 1 Crit = 5. Pack 23 -> 18. Lou C 2 -> 0 -> 1.
  - Kit, fed (Edge, Chi die): 1 4 6 4 6 6 = three 6s, each three hits with Edge = **9 hits**, Critical. 9 + 1 fed + 1 Brawler + 1 Crit + 2 Trained = **14**. Pack 18 -> 4. Kit C 2 -> 0 -> 2 (Critical 1 + Trained 1).
  - Nell, fed (Tide, Chi die): 3 4 3 2 6 3 = 1 hit; Tide rerolls three misses: 4 3 6. Now 6, 6 = 2 hits, two 6s, Critical. 2 + 1 fed + 1 Crit = 4. Pack 4 -> 0. **First Clash won in round 1**, four Strikes in. Nell C 2 -> 0 -> 1.
- Tess never acted; no Swarm ever happened. Medic's 2 Vigor had nobody to heal.
- **After:** V all full (Lou 9). C: Tess 2, Omar 4, Lou 1, Kit 2, Nell 1. Awakenings still locked (nobody Down).

### The Hunt

The Storyteller read out the five Anchors and their Shells. The table picked Anchors by breaker: the Greenhouse first (Kit's Edge breaks the Wood Shell), then the Iron Bridge (Omar's Quick Strike can shatter the Metal Shell before round 1).

#### Hour 1: the Old Greenhouse, the Gardener (Wood Shell; Warden 45, pack 5 Stills = 15)

- **Start.** Breath: Omar 4 + 4 = 8, capped at 5.
- **Quick Strike** at the pack (Blaze, Quick die + Chi die): 5 2 5 6 2 3 6 = 4 hits, Critical. 4 + 2 + 1 = 7. Pack 15 -> 8. Omar C 5 -> 3 -> 4.
- **Round 1** (order Lou, Kit, Nell, Tess, Omar; all fed):
  - Lou at pack (Chi die): 3 1 1 3 3 5 = 1 hit, meets Guard 1. 1 + 1 = 2. Pack 8 -> 6. Lou C 0.
  - Kit at Warden (Edge, Chi die, Help from Tess): Guard 2 for Kit, Shell ignored. 6 2 6 2 4 4 5 = two 6s (6 hits) + one 5 = 7 hits, Critical. **The Shell shatters** on Metal's first hit. 7 + 1 fed + 1 Brawler + 1 Crit + 2 Trained = **12**. Warden 45 -> 33. Kit C 2 -> 0 -> 2. Tess C 2 -> 1.
  - Nell at Warden (Chi die): 1 6 6 2 1 6 = 3 hits, Critical. 3 + 1 + 1 = 5. Warden 33 -> 28. Nell C 1 -> 0 -> 1.
  - Tess at Warden (Chi die): 4 6 5 5 5 1 = 4 hits. 4 + 1 = 5. Warden 28 -> 23. Tess C 0.
  - Omar at Warden (Blaze, Chi die, Help from Kit): 3 3 6 5 4 4 3 = 2 hits. 2 + 2 + 1 = 5. Warden 23 -> 18. Omar C 4 -> 2 (left over: the table's ruling is one Chi die per roll, issue B-07). Kit C 2 -> 1.
  - Enemies: Warden feeds +2 (2 Stills) -> 20. Swarm 1 to Tess, Flow makes it 0. **Surge 6: Call**, 2 Stills join: pack 6 -> 12 (4 Stills).
- **Round 2:**
  - Lou at Warden (no Chi): 1 3 5 4 2 = 1 hit, misses Guard 2. 1 + 1 = 2. Warden 20 -> 18. Hit back 2: Lou V 9 -> 7, C 0 -> 1.
  - Kit at Warden (Edge, Help from Omar): 2 5 3 2 3 3 = 1 hit, miss. 1 + 1 = 2. Warden 16. Hit back: Kit V 6 -> 4, C 0 -> 1. Omar C 2 -> 1. (Edge spent for nothing: the 1 Chi bought no six.)
  - Nell at Warden (Chi die): 3 1 6 2 3 1 = 1 hit; **Lucky** rerolls five misses: 2 1 1 1 2 = still 1 hit. Miss. 1 + 1 = 2, Warden 14. Hit back 2: Nell V 6 -> 4; C +1; **Counter** deals 1 (Warden 13) and gives 1 more Chi: Nell C 0 -> 2.
  - Tess at Warden (Help from Nell): 5 5 4 5 5 5 = 5 hits. 5 + 1 = 6. Warden 13 -> 7. Nell C 2 -> 1.
  - Omar at Warden (Blaze, Help from Lou and from Kit: 2 bonus dice): 4 5 6 4 1 2 5 = 3 hits. 3 + 2 + 1 = 6. Warden 7 -> 1. Omar C 0, Lou C 0, Kit C 0.
  - Enemies: feeds +4 -> 5. Swarm 2 to Tess, Flow: 1 (V 6 -> 5). **Surge 1: Crush** 3 to the most damage this round: Tess and Omar tied on 6, so the one who acted last, Omar. **Guardian:** Lou takes it instead: V 7 -> 4, C 0 -> 2.
- **Round 3:**
  - Lou at Warden (Chi die): 2 6 5 1 2 4 = 2 hits. 2 + 1 = 3. Warden 5 -> 2. Lou C 1.
  - Kit at Warden (Help from Lou): 2 1 1 3 2 5 = 1 hit, misses the Guard; 1 + 1 fed = 2. **Warden falls.** The roll's result comes first, so no hit back (p. 10). Stills crumble. **The Greenhouse is broken** (round 3).
- **After:** Medic: 1 Vigor each to Kit and Nell. V: Tess 5, Omar 6, Lou 4/9, Kit 5, Nell 5. C: Nell 1, everyone else 0.

#### Hour 2: the Iron Bridge, the Girder (Metal Shell; Warden 45, pack 15)

- **Start.** Breath: Omar 0 + 4 = 4.
- **Quick Strike** at the Warden (Blaze, Quick die + Chi die; Fire ignores the Metal Shell): 2 2 5 6 4 4 5 = 3 hits, meets Guard 2. **The Shell shatters before round 1.** 3 + 2 = 5. Warden 45 -> 40. Omar C 2.
- **Round 1:**
  - Lou at pack, fed: 2 4 6 4 5 = 2 hits. 3. Pack 15 -> 12.
  - Kit at Warden (Help from Omar): 5 2 1 5 3 4 = 2 hits. 2 + 1 + 1 Brawler = 4. Warden 36. Omar C 1.
  - Nell at Warden (Chi die): 4 4 2 1 6 3 = 1 hit; **Lucky**: 6 6 6 6 4. Now 5 hits, five 6s, Critical. 5 + 1 + 1 = 7. Warden 29. Nell C 0 -> 1.
  - Tess at pack: 4 3 6 2 3 = 1 hit. 2. Pack 12 -> 10 (4 Stills).
  - Omar at Warden (Blaze, Help from Nell): 1 1 6 4 3 2 = 1 hit, miss. 1 + 2 + 1 = 4. Warden 25. Hit back: Omar V 6 -> 4, C 0 -> 1. Nell C 0.
  - Enemies: feeds +4 -> 29. Swarm 2 to Tess, Flow: 1 (V 5 -> 4). **Surge 2: Crush** 3 at Nell (7 damage this round; Omar's Quick Strike came "before the first round", so it is not "this round"). Lou takes it as Guardian: V 4 -> 1, C 0 -> 2.
- **Round 2:**
  - Lou at pack (Bulwark on himself, Chi die): 2 6 5 1 1 1 = 2 hits. 3. Pack 10 -> 7. Lou C 0.
  - Kit at Warden (Help from Omar): 5 6 1 2 4 2 = 2 hits. 4. Warden 25. Omar C 0.
  - Nell at Warden: 2 6 3 2 3 = 1 hit, miss. 2. Warden 23. Hit back: Nell V 5 -> 3; Counter 1 (Warden 22, at half or less; the Shell was already gone). Nell C 0 -> 2.
  - Tess at pack: 1 3 3 4 6 = 1 hit. 2. Pack 7 -> 5 (2 Stills).
  - Omar at Warden (Help from Nell): 6 1 2 4 5 3 = 2 hits. 3. Warden 19. Nell C 1.
  - Enemies: feeds +2 -> 21. Swarm 1 to Tess, Flow: 0. **Surge 4: Sweep**, every fighter loses 1. Flow doesn't help with a Sweep; Lou's pending Bulwark makes his 0. The table asked whether Lou could also take Tess's Sweep as Guardian and have Bulwark cover both points (issue B-17); with Lou on 1 Vigor they didn't risk it. V: Tess 3, Omar 3, Lou 1, Kit 4, Nell 2.
- **Round 3:**
  - Lou at pack: 3 1 4 3 4 = 0 hits. Hit back 1: **Lou Down** (V 0, C 0, no Chi for the hit back). **Awakenings are now open for the night** (p. 12). Nobody has 3 Chi.
  - Kit at Warden, fed by Lou's Strike (Help from Nell): 1 4 5 3 3 6 = 2 hits. 4. Warden 17. Nell C 0.
  - Nell at pack (on 2 Vigor she won't risk the Warden's Harm 2): 6 6 3 2 4 = 2 hits, Critical. 2 + 1 + 1 = 4. Pack 5 -> 1 (1 Still). Nell C 1.
  - Tess **Rallies** Lou: V 2, acts next round. The Rally feeds Omar.
  - Omar at Warden, fed: 4 4 5 4 6 = 2 hits. 3. Warden 14.
  - Enemies: feeds +1 -> 15. Swarm 1 to Tess, Flow: 0. **Surge 1: Crush** 3 at Kit (4 damage). Lou could take it as Guardian, but it would put him Down; the table's ruling (issue B-15) is that a Guardian who goes Down from the loss gets no Chi, so Kit takes it: V 4 -> 1.
- **Round 4:**
  - Lou at Warden: 1 3 2 2 3 = 0 hits. Hit back 2: **Lou Down** again.
  - Kit at Warden, fed (Help from Nell): 4 5 6 3 1 4 = 2 hits. 4. Warden 11. Nell C 0.
  - Nell at Warden: 3 5 6 4 2 = 2 hits. 3. Warden 8.
  - Tess at Warden: 3 1 4 2 3 = 0 hits. Hit back 2, Flow: 1. Tess V 3 -> 2, C 0 -> 1.
  - Omar at Warden (Help from Tess): 5 1 2 4 3 5 = 2 hits. 3. Warden 5. Tess C 0.
  - Enemies: feeds +1 -> 6. **Swarm 1: the table wanted to give it to Lou, who is Down** ("Harm past 0 is lost"). Nothing in the Swarm rule forbids it (issue B-03). Ruling tonight: a Swarm must go to a fighter who isn't Down. It went to Tess, Flow: 0. **Surge 2: Crush** 3 at Kit (4 damage): **Kit Down**. The table then argued that Lou, Down, could still take it as Guardian for 2 Chi (issue B-04). Ruling tonight: a Down fighter's style does nothing.
- **End of round 4: the long-fight clock.** Warden 6/45, three fighters standing (Tess 2, Omar 3, Nell 2), all at 0 Chi. The table asked whether withdrawing now, at the end of round 4, dodges the long-fight Hour, since the fight would not be "still going" (issue B-08). Ruling tonight: the clocks are checked first (p. 10, step 3: "Awakenings count down, then the clocks are checked"), then the group may withdraw, so withdrawing now still costs the Hour. With the Warden on 6 the table played on. **Long fight: Hour 3 is crossed off.**
- **Round 5.** Omar acted last; the next in the ring is Lou, who is Down, so the first Strike this round can't be fed. The ring is broken at Earth and Metal (issue B-21: Down fighters are not skipped).
  - Nell at Warden, not fed: 2 5 6 3 5 = 3 hits. 3. Warden 3.
  - Tess at Warden, fed by Nell: 1 3 4 1 6 = 1 hit, miss. 2. Warden 1. Hit back 2, Flow 1: Tess V 1, C 1.
  - Omar at Warden (Help from Tess), fed: 3 5 3 4 3 1 = 1 hit. 2. **Warden falls. The Iron Bridge is broken** (round 5).
- **After:** Lou and Kit stand with 1 Vigor. Medic: Tess +1, Kit +1. All Chi 0.

#### Hour 3: spent by the long fight

#### Hour 4: Respite

V 2/3/1/2/2 (10 of 33). Another Anchor would have been suicide, so the table took the **Respite**: every fighter back to full Vigor; Chi unchanged (all 0). The Hunt ends: Hours run out. Anchors standing: the Substation, the Underpass and the Reservoir (3).

### The Heart: the clock tower (Toughness 30 + 3 x 20 = 90, half = 45; pack 5 Stills = 15; Guard 2, Harm 2; Hard: Crush 6, Sweep 3; dawn at the end of round 7)

The Storyteller showed the cold fire behind the clock face, the brickwork in its works and the sheet of water hanging over the square.

- **Start.** Every fighter gains 3 Chi (all at 3). Breath: Omar 3 + 4 = 7, capped at 5.
- **Plan.** Lou Seals rounds 1-2; Kit (Tempest), Omar (Ascendant) and Tess (Harmony) Awaken in round 1; Nell keeps her Chi for Tide and Chi dice and Awakens Unbreakable in round 3, when the Seal ends.
- **Quick Strike** at the pack (Blaze, Quick die + Chi die): 4 1 6 1 3 1 4 = 1 hit. 1 + 2 = 3. Pack 15 -> 12 (4 Stills). Omar C 5 -> 3: exactly enough to Awaken on his turn. Breath plus the Heart's 3 Chi pays for a Quick Strike with Blaze and a Chi die *and* the Awakening.
- **Round 1** (order Lou, Kit, Nell, Tess, Omar; all fed):
  - Lou Awakens **Seal** (C 3 -> 0). Holding it is his action for rounds 1 and 2, and it feeds Kit (p. 13).
  - Kit Awakens **Tempest** (C 3 -> 0): two actions, no hit backs. Action 1 at the Heart, fed: 6 4 5 6 6 = 4 hits, three 6s, Critical. 4 + 1 fed + 1 Brawler + 1 Crit + 2 Trained = **9**. Heart 90 -> 81. Kit C 0 -> 2. Action 2 at the pack, not fed (p. 13, "Your second action is never fed by your first"): 1 4 2 2 4 = 0 hits; no hit back. *Table slip:* both Tempest rolls were declared together before the first was rolled, so Kit could not spend the 2 Chi his Critical had just given him on Edge for action 2. The declaration stood.
  - Nell, fed (Tide, Chi die; she holds off Awakening): 3 1 2 3 6 5 = 2 hits; Tide rerolls three misses: 1 4 2. 2 hits. 3 damage. Heart 78. Nell C 3 -> 1.
  - Tess Awakens **Harmony** (C 3 -> 0), then Strikes, fed: 2 5 3 6 2 = 2 hits. 3. Heart 75.
  - Omar Awakens **Ascendant** (C 3 -> 0), then Strikes, fed (Help from Kit and Nell): 6 2 5 1 2 1 5 = 3 hits. 3 x 2 = 6, + 1 fed = **7**. Heart 68. Kit C 1, Nell C 0.
  - Enemies: the Heart feeds +4 -> 72. Swarm 2 to Tess, Flow: 1 (V 5). **No Surge: Sealed.**
- **Round 2.** Start of round: **Harmony** shares 3 Chi: Kit +2 (C 3), Omar +1 (C 1).
  - Lou holds the Seal (his action; feeds Kit).
  - Kit, action 1, fed (Edge, Chi die): 2 1 3 3 5 6 = one 6 (3 hits) + one 5 = 4 hits. 4 + 1 + 1 = 6. Heart 66. Kit C 1. Action 2 at the pack (Edge): 5 3 4 4 5 = 2 hits. 2 + 1 Brawler = 3. Pack 12 -> 9 (3 Stills). Kit C 0.
  - Nell, fed: 5 6 5 1 3 = 3 hits. 4. Heart 62.
  - Tess, fed: 2 1 5 6 2 = 2 hits. 3. Heart 59.
  - Omar, Ascendant, fed (Blaze: +2 is worth more than a Chi die's third of a hit doubled): 5 3 1 6 3 = 2 hits. 4 + 2 Blaze + 1 fed = 7. Heart 52.
  - Enemies: feeds +3 -> 55. Swarm 2 (half of 3, rounded up) to Tess, Flow: 1 (V 4). **No Surge: Sealed.** The Seal ends.
- **Round 3.** Start of round: Harmony's last share: Kit +2 (C 2), Omar +1 (C 1). Nell gets none, so she cannot Awaken this round as planned.
  - Lou, fed: 1 3 5 6 2 = 2 hits. 3. Heart 52.
  - Kit, action 1, fed (Edge): 6 2 5 5 6 = two 6s (6 hits) + two 5s = 8 hits, Critical. 8 + 1 + 1 + 1 + 2 = **13**. Heart 39: **at half or less** (45), so the night can no longer be lost on the dawn clock. Kit C 1 -> 3. Action 2 (Edge, Chi die): 3 2 2 3 3 6 = one 6 = 3 hits. 3 + 1 Brawler = 4. Heart 35. Kit C 1.
  - Nell, fed: 5 3 4 4 5 = 2 hits. 3. Heart 32.
  - Tess, fed: 4 5 6 1 5 = 3 hits. 4. Heart 28.
  - Omar, Ascendant, fed (Blaze, Help from Kit): 2 6 5 6 2 3 = 3 hits, Critical. 6 + 2 + 1 fed + 1 Crit = **10**. Heart 18. Omar C 0 -> 1. Kit C 0.
  - Enemies: feeds +3 -> 21. Swarm 2 to Lou (V 9 -> 7). **Surge 2: Crush**, Hard: **6 Harm** at Kit (17 damage this round). **Lou takes it as Guardian:** V 7 -> 1, C 0 -> 2. Tempest, Ascendant and Harmony end.
- **Round 4:**
  - Lou, fed, on 1 Vigor (Bulwark on himself, Chi die): 5 4 1 3 3 3 = 1 hit, miss. 2 damage, Heart 19. Hit back 2, **Bulwark takes 3 off: he loses 0 and still gains 1 Chi** for being hit back (C 0 -> 1). Bulwark on yourself makes a miss cost nothing.
  - Kit, fed (Help from Lou): 1 2 1 6 6 5 = 3 hits, Critical. 3 + 1 + 1 + 1 + 2 = 8. Heart 11. Kit C 0 -> 2. Lou C 0.
  - Nell, fed: 4 3 2 4 6 = 1 hit; **Lucky**: 2 3 5 4. Now 2 hits. 3. Heart 8.
  - Tess, fed (Help from Kit): 4 1 4 5 6 3 = 2 hits. 3. Heart 5. Kit C 1.
  - Omar, fed (Blaze, Help from Kit): 6 4 4 2 6 5 = 3 hits, Critical. 3 + 2 + 1 + 1 = 7. **The Heart falls in round 4.**

### Result: WIN

The clock tower strikes midnight six hours late. **Win at Hard, in round 4 of 7, with three Anchors standing**, no fighter Down at the Heart, and one Awakening (Nell's Unbreakable) never used. Only one Surge landed in the whole Heart fight (the Seal stopped two), and the Guardian took it.

**Totals for the night:** 4 fights, 13 rounds, 74 roll requests (dice log lines 5 to 78). Two fighters went Down (Lou twice, Kit once), all in the Iron Bridge's long fight. At the table this would be about 2 hours 45 minutes including setup.

## Drills

Fresh labelled rolls, every one in the dice log under "Drill N". Where a drill needs a fighter with the unpicked options, the table used **Rae Ito** (drill fighter): **Wood (Renewal) · Sweeper · Stubborn · Wellspring**, V 6 in a five-fighter group, standing in for Tess. Each drill starts from a stated position; the position is set, the dice are not.

### Drill 1: Sweeper in the First Clash
Rae Strikes the First Clash pack: 5 6 5 2 6 = 4 hits, Critical, 5 damage. Sweeper says "also deal 1 damage to **one other enemy**" (p. 8), but the First Clash is one pack "fought as one enemy" (p. 17) with no Warden. **Sweeper does nothing in the First Clash** (issue B-16).

### Drill 2: Shells, half Toughness, Sweeper, the Call cap (the Underpass, Earth Shell)
- **2a, a non-breaker meets Guard 3 and brings the Warden to half.** Warden 24/45, Shell on. Lou (Earth): 6 5 2 5 2 = 3 hits, meets Guard 3. 3 damage, Warden 21: at half or less, so the Shell shatters. No conflict: both triggers agree.
- **2a second try, a non-breaker misses Guard 3 but brings the Warden to half.** Warden 24/45, Shell on. Nell, fed: 6 1 3 1 5 = 2 hits, short of Guard 3. 2 + 1 fed = 3, Warden 21: **the Shell shatters at step 5 (damage), so by step 7 ("If you missed the Guard...") the Guard is 2 and she has 2 hits.** Was she hit back? The book doesn't say whether the Guard is the one when you rolled or the one at step 7 (issue B-09). Ruling tonight: the Guard is fixed when hits are counted (step 4), so she was hit back: Nell V -2, C +1; Counter 1 (Warden 20), C +1.
- **2b, the breaker plus Sweeper plus Renewal.** Warden 30, Shell on, pack 18 (6 Stills). Rae (Wood breaks Earth), fed (Chi die, Renewal on Lou at 5/9): 3 6 5 4 1 5 = 3 hits vs Guard 2; her first hit shatters the Shell. 3 + 1 = 4 (Warden 26). Sweeper: 1 to the pack (18 -> 17, still 6 Stills: one point of Sweeper damage rarely removes a Still). Renewal: Lou 6/9. All clean.
- **2c, Surge with a damage tie** (Rae and Kit on 4, Kit acted later): 3, Sweep; next round 3 again, Sweep. Flow doesn't apply. (The tie rule was exercised in the night instead: Hour 1 round 2 and Drill 12.)
- **2d, the Call cap.** Pack at 6 Stills, nobody touches it, six Surges in a row: 1 2 6 4 5 6. Crush, Crush, **Call: only 1 Still joins** (cap 7, "up to fighters + 2"), Sweep, Drain, **Call with the pack full: nothing happens.** A full pack of 7 Swarms for 4 (half of 7, rounded up), two thirds of a five-fighter Vigor track in one blow. Once the pack is full, a sixth of the Surge table is a blank (issue B-26).

### Drill 3: Stubborn, Wellspring, a Down fighter standing and acting at once
Position: an Anchor, round 5 (Awakenings open). Warden 20, pack 6 (2 Stills). Rae V 2, C 3; Kit V 1; Lou Down; Nell V 6.
- **3a.** Rae Awakens **Wellspring** (C 0) at the start of her turn, then Strikes: 2 1 6 2 4 = 1 hit, miss. 1 damage (Warden 19). Hit back 2 would put her Down: **Stubborn**, she stays up with 2 Vigor, and since she didn't go Down she gains 1 Chi. On 2 Vigor, Stubborn is a full immunity for that blow.
- **3b.** Kit, V 1: 6 3 6 5 2 = 3 hits, Critical. 3 + 1 Brawler + 1 Crit + 2 Trained = 7 (Warden 12). C +2.
- **3c.** Enemies: feeds +2 (14). Swarm 1: **the table again asked to give it to Lou, who is Down** (issue B-03); ruling tonight, a standing fighter: Nell 6 -> 5. Surge 2: Crush 3 at Kit (7 damage): **Kit Down**, loses his 2 Chi.
- **Round 6 starts:** Wellspring shares 2 Vigor: 1 to Lou, 1 to Kit. **Both Down fighters stand with 1 Vigor and act this round** (p. 13). For 3 Chi, Wellspring did two Rallies that cost no actions and act at once; a Rally costs an action and the fighter waits a round.

### Drill 4: Unbreakable, and Guardian with Unbreakable
- **4a.** At the Heart, Nell Awakens **Unbreakable** (C 3 -> 0) and Strikes: 5 1 3 2 3 = 1 hit, miss. 1 damage; hit back 2: she loses 0, gains 1 Chi; Counter deals 1 more and gives 1 more Chi (C 2). Every Swarm can now go to her for nothing. A miss is worth 2 damage and 2 Chi to an Unbreakable Counter fighter.
- **4b.** The combination the Earth player wanted before the roll-off: **Earth · Guardian · Tough · Unbreakable**, Awakened at the Heart, Hard. Three Surges: 4 1 2 = Sweep 3, Crush 6, Crush 6. The Guardian takes one other fighter's Sweep (loses 0, +2 Chi), then both Crushes (0 each, +2 Chi each). **Over three rounds: 15 Vigor of Heart damage turned into 6 Chi.** The book allows it: "Guardian takes the whole loss, after which the other protections (Chapter 3) apply to you" (p. 8). See issue B-25.

### Drill 5: everyone Down at an Anchor (the Reservoir, Water Shell)
Position: round 3, all five on 1 Vigor, no Chi, Stubborn used. Warden 40, Shell on, pack 15.
- Round 3: Lou (breaker), fed: 5 4 5 2 1 = 2 hits, meets Guard 2, Shell shatters. 3 (37). Kit: 2 6 2 2 5 = 2 hits. 4 (33). Nell: 4 2 6 3 6 = 2 hits, Critical. 4 (29). Rae: 4 6 3 2 3 = 1 hit, miss. 2 (27), hit back: **Rae Down**. Omar: 4 2 1 4 6 = 1 hit, miss. 2 (25), hit back: **Omar Down**. Enemies: feeds +5 (30). Swarm 3 to Nell: **Nell Down**. Surge 6: Call, pack to 7 (the cap).
- Round 4: Lou **Rallies** Omar (V 2). Kit, fed by the Rally: 1 3 6 5 1 = 2 hits. 4 (26). Enemies: feeds +7 (33). Swarm 4 (half of 7) to Omar: **Down**. Surge 3: **Sweep 1: Lou and Kit Down. Everyone is Down.**
- **Outcome:** the fight ends at that moment, during the enemies' step; the Anchor stands, everyone wakes with 1 Vigor and 0 Chi (Chi was lost going Down). The Hour is spent. No conflict in the rules.

### Drill 6: everyone Down at the Heart, and the "same Strike" rule
- **6a.** Heart round 5, Heart at 4, only Omar standing (V 2, Blaze): 4 1 4 3 1 = 0 hits, no damage (Blaze needs a hit). Hit back 2: **Omar Down; everyone is Down: the night is lost at once**, mid-round, before any Swarm or Surge.
- **6b.** Heart at 2, only Nell standing (V 2): 3 6 1 1 1 = 1 hit, miss. 1 damage (Heart 1). The Heart is still standing, so it hits back: **Nell Down, the last fighter.** Then **Counter** answers: 1 damage, **Heart 0**. "If the same Strike destroys the Heart and puts the last fighter Down, the fighters win" (p. 11). **Win.** This is the only way that sentence can happen (a Strike that destroys the enemy can't be hit back, p. 10), and it quietly answers whether Counter works when its fighter goes Down (issues B-13, B-18).

### Drill 7: the bonus dice cap
Kit declares a Chi die and is offered Help by Nell and Omar (three bonus dice). He rolls 7: 1 5 4 2 1 6 2 = 2 hits. Which offer is refused, and does the refused helper pay? The book says "you roll at most two bonus dice" (p. 10) but not whether Chi spent past the cap is lost (issue B-20). Ruling tonight: nobody may spend Chi on a die past the cap; Omar keeps his Chi.

### Drill 8: the Chi cap
Nell at 4 Chi Strikes the Warden with no spend: 1 4 3 5 1 = 1 hit, miss. Hit back: C 4 -> 5; Counter's "1 more Chi" is lost ("Any Chi you would gain past 5 is lost", p. 12). Clean. Breath hit the cap in every fight of the night (Omar 2 + 4, 4 + 4, 3 + 3 + 4).

### Drill 9: when Awakening opens, and once per night
- **9a.** First Clash, nobody Down yet: Omar (Breath, 5 Chi) asks to Awaken. Refused: "You may Awaken from the moment the first fighter goes Down tonight, or once the Heart fight begins" (p. 12). Clean.
- **9b.** A fighter who Awakened in the Hunt has 5 Chi at the Heart and asks to Awaken again. Refused: "Once per night". The sheet's "Awakened tonight" box tracks it. Clean.
- **9c.** A First Clash where nobody spends Chi: Quick Strike 4 4 6 3 6 2 (2 hits, Critical: 3; pack 27; Omar's Critical Chi lost at the cap), Lou 5 1 3 2 5 (3; 24), Kit 2 1 2 6 2 (1 hit + fed + Brawler = 3; 21), Nell 1 6 6 6 2 (Critical, 5; 16), Tess 1 4 2 5 5 (3; 13), Omar 1 1 3 1 4 (miss, hit back 1, V 5). Pack 13 = 5 Stills: Swarm 3, one blow, players' choice. The First Clash takes two rounds even with no Chi. **The players choose the Swarm target, so a table can deliberately drop a fighter who has already been hit back and open Awakenings for the whole night** (issue B-27). They didn't, because it would cost the Heart Awakening.

### Drill 10: the Seal holder goes Down before the Surge
Lou is holding the Seal on 2 Vigor. In the enemies' step the Warden feeds, then the pack Swarms: the players have to give the 3-Harm Swarm to someone, and every other fighter is on 1 or 2, so it goes to Lou: **Lou Down, and the Seal ends** ("It ends early if you go Down", p. 12). Does the Warden now Surge, since the Surge comes after the Swarm? Surge die: 4, Sweep. Ruling tonight: yes, the Seal has ended, so the Sweep lands (issue B-23).

### Drill 11: the long fight in the last Hour, and the Warden holding at round 7
- **11a: Hour 4 (no Hours left), the Substation.** Start of round 4: Warden 42 (Shell gone), pack 9 (3 Stills), no Chi.
  - Round 4: Lou 4 1 3 3 1 (0 hits, hit back, V 9 -> 7). Kit 6 4 6 5 1 (3 hits, Critical: 8; 34). Nell 3 6 6 6 5 (4 hits, Critical: 6; 28). Rae 4 5 3 3 3 (1 hit, miss: 2; 26; hit back, V 4). Omar 1 6 5 2 5 (3 hits: 4; 22). Feeds +3 (25). Swarm 2 to Lou. Surge 5: Drain, the most Chi: Kit (2) loses 2.
  - **End of round 4: still going, so it is a long fight; no Hours are left, so "dawn comes one round sooner at the Heart instead" (p. 14). One Hour owed.**
  - Round 5: Lou 1 6 6 4 4 (Critical: 4; 21). Kit 4 6 6 4 2 (Critical: 7; 14). Nell 3 4 4 6 5 (3; 11). Rae 6 5 3 1 5 (4; 7; Sweeper 1 to the pack). Omar 5 4 6 4 4 (3; 4). Feeds +3 (7). Swarm 2 to Lou. Surge 1: Crush 3 at Kit.
  - Round 6: Lou 2 2 4 6 6 (Critical: 4; 3). Kit (Edge) 4 6 6 1 4: falls. **The Substation breaks in round 6, and the Heart's dawn comes at the end of round 6.**
- **11b: round 7.** Start of round 7: Warden 30, pack 9 (3 Stills). Lou 6 3 5 3 2 (3; 27). Kit 4 6 6 1 6 (3 hits, Critical: 8; 19). Nell 3 5 2 3 1 (miss: 2 + Counter 1; 16). Rae 6 1 4 6 6 (Critical: 5; 11; Sweeper 1 to the pack). Omar 4 5 2 2 3 (miss: 2; 9). Enemies: feeds +3 (12), Swarm 2, Surge 6: Call (two Stills that will never act). **End of round 7: the Warden holds; the Anchor stands.** Note the round-7 enemy step still happens in full before the fight ends: a Crush or Sweep there can still put fighters Down for nothing. Clean, if harsh.

### Drill 12: driven off at an early dawn (one Hour owed)
Position: Heart 70 (two Anchors standing), half 35. Start of round 6, which is the last round because of Drill 11's owed Hour. Heart 41, pack 6 (2 Stills).
- Lou, fed: 2 5 6 6 1 = 3 hits, Critical: 5 (36). Kit: 6 1 1 5 3 = 2 hits: 4 (32). Nell: 1 4 4 3 3 = 0 hits; hit back, Counter 1 (31). Rae at the pack: 4 2 1 6 1 = 1 hit: 2 (pack 4); Sweeper 1 to the Heart (30). Omar: 6 6 1 3 5 = 3 hits, Critical: 5 (25).
- Enemies: feeds +2 (27). Swarm 1 to Lou. Surge 1: Crush 6 at the most damage: Lou and Omar tied on 5, Omar acted last: Omar Down.
- **End of round 6: dawn. Heart 27, at half or less: driven off.** The moment it is decided: the end of the round, after the enemies have acted, so the Heart's feeding counts against you.

### Drill 14: a late-joining fighter
Position: a four-fighter night (Tess, Omar, Lou, Kit: starting Vigor 7). Nell's player arrives after the First Clash. The book: "takes an element nobody has, the starting Vigor everyone else began with, and 2 Chi. From the next fight on, the enemies count them as a fighter" (p. 9).
- Nell joins with Water, V 7, C 2. Her first Strike at the Greenhouse, fed by Kit: 6 3 1 2 4 = 1 hit vs Guard 3, miss: 2 damage, hit back (V 5), C 3, Counter (C 4).
- Questions the table could not answer from the book (issue B-11): Does she also pick a style, perk and Awakening (the box mentions only the element)? The Warden is now 45, but is the Heart (5 + 4 per Anchor) x 5 or (6 + 4 per Anchor) x 5 ("With five fighters, use 6", p. 18)? The same box opens by saying "the size of every enemy [is] set by how many fighters there are when the night begins", which contradicts "the enemies count them as a fighter". And at a five-fighter table, a sixth player can't join at all: no element is free. Rulings tonight: she picks unused options as in Chapter 2; the Heart uses the five-fighter formula; a sixth player waits for a seat.

### Drill 15: withdrawing from an Anchor
Position: Hour 2, the Reservoir, round 2: Warden 41, Shell on; V Lou 3, Kit 2, Nell 2, Tess 2, Omar 2; no Chi.
- Lou (breaker): 5 2 2 4 1 = 1 hit vs Guard 2, miss. **His one hit still shatters the Shell** ("that element's first hit shatters it"). 2 (39); hit back: V 1, C 1. Kit: 1 4 2 3 4 = 0 hits; hit back: **Kit Down**. Nell: 5 6 3 4 2 = 2 hits: 3 (36). Tess: 3 4 3 6 6 = 2 hits, Critical: 4 (32), C 1. Omar: 6 1 5 1 6 = 3 hits, Critical: 5 (27), C 1. Enemies: feeds +5 (32). Swarm 3 to Nell: **Down**. Surge 2: Crush 3 at Omar (5 damage): **Down**.
- **End of round 2: the group withdraws.** The Anchor stands; Kit, Nell and Omar stand with 1 Vigor; Lou keeps 1 V and 1 C, Tess 2 V and 1 C. The Hour is spent. Medic still shares 2 Vigor "after each fight" (the table read a withdrawal as the end of a fight). Clean.

### Drill 16: Drain ties and empty Drains (reading)
Warden Drain with Kit and Nell both on 3 Chi and Nell acting later: Nell loses 2 (the tie rule covers Drains, p. 18). Heart Drain when nobody has Chi: "A Drain that finds no Chi Crushes instead", so a Heart Crush of 6. When only some fighters have Chi, the Heart Drain still finds Chi and takes 1 from each of them. Clean.

### Drill 17: the Quick Strike and the Awakening
At the Heart, Omar asks to Awaken Ascendant before his Quick Strike, so that it counts double. The Awakening is "at the start of your turn"; the Quick Strike is "before the first round", not a turn. Ruling tonight: refused (issue B-19). Quick Strike with Blaze, Quick die + Help from Kit: 5 1 3 1 3 3 4 = 1 hit: 3 damage. (Doubled it would have been 4.)

### Drill 18: Metal with Ascendant (the build nobody could take tonight)
A Metal · Brawler · Trained · Ascendant fighter, fed, Edge, Chi die and Help: 1 2 2 4 1 2 4 = 0 hits. Nothing, and hit back. The average is another matter: worked out exactly (not rolled), this build averages **8.8 damage on 5 dice and 12.1 on 7** against Guard 2, against **2.7 and 3.6** for a plain fed Strike (issue B-22).

### Drill 19: three fighters at the Heart (Hard)
Group: **Rae** (Wood · Sweeper · Stubborn · Wellspring), **Kit** (Metal · Brawler · Trained · Tempest), **Nell** (Water · Counter · Lucky · Unbreakable). Starting Vigor 10. Ring Wood -> Metal -> Water -> Wood. Position: two Anchors broken, three standing: Heart (5 + 12) x 3 = **51** (table: 15 + 3 x 12 = 51), half 25.5; pack 3 Stills (9), a Call fills it to 5; Crush 6, Sweep 3; dawn at the end of round 7. Each arrives with 1 Chi, +3 at the Heart = 4.
- **R1.** Rae (Chi die): 3 4 3 5 2 1 = 1 hit, miss. 1 (50); hit back: V 8, C 4. Kit Awakens **Tempest** (C 1). Action 1, fed (Edge): 3 1 1 4 1 = 0 hits; no hit back, so no Chi either. Action 2 (Help from Nell): 2 1 1 2 5 2 = 1 hit: 1 (49). Nell Awakens **Unbreakable** (C 0), fed: 6 6 1 4 4 = 2 hits, Critical: 4 (45). Feeds +3 (48). Swarm 2 to Nell: 0. Surge 5: Heart Drain, everyone loses 1 Chi (Rae 3).
- **R2.** Rae, fed (Chi die): 1 1 5 3 6 1 = 2 hits: 3 (45); Sweeper 1 to the pack (8). Kit action 1, fed (Help from Rae): 5 4 5 2 2 5 = 3 hits: 5 (40). Action 2 (Help from Rae): 5 6 6 4 6 3 = 4 hits, Critical: 8 (32), C 2. Nell, fed (Help from Kit): 1 6 2 6 2 6 = 3 hits, Critical: 5 (27). Feeds +3 (30). Swarm 2 to Nell: 0. Surge 2: **Crush 6 at Kit** (13 damage): V 10 -> 4. No Guardian in a group of three.
- **R3.** Rae, fed: 3 6 3 2 6 = 2 hits, Critical: 4 (26); Sweeper 1 (pack 7). Kit action 1 (Edge): 1 5 1 5 4 = 2 hits: 4 (22). Action 2 (Help from Rae): 5 4 2 6 2 4 = 2 hits: 3 (19). Nell (Tide): 2 6 2 5 5, Tide 1 3: 3 hits: 4 (15). Feeds +3 (18). Swarm 2 to Nell: 0. Surge 3: **Sweep 3**: Rae 8 -> 5, Kit 4 -> 1, Nell 0 (Unbreakable). Tempest and Unbreakable end. Heart 18: already at half or less.
- **R4.** Rae: 6 2 4 2 1 = 1 hit, miss: 2 (16); hit back: V 3, C 1. Kit on 1 Vigor: 4 5 2 6 4 = 2 hits: 4 (12). Nell: 2 2 2 6 1, **Lucky** 1 3 5 2: 2 hits: 3 (9). Feeds +3 (12). Swarm 2 to Nell (V 8). Surge 1: **Crush 6 at Kit: Down.**
- **R5.** Rae **Rallies** Kit (V 2, acts next round). Nell is not fed (the Rally was Wood's, and Water's place in the ring follows Metal) (Help from Rae): 5 4 6 4 6 4 = 3 hits, Critical: 4 (8). Feeds +3 (11). Swarm 2 to Nell (V 6). Surge 4: **Sweep 3**: Rae 3 -> 0, **Stubborn** keeps her up on 2; **Kit 2 -> 0, Down again**; Nell 3.
- **R6.** Rae, fed: 6 4 5 3 5 = 3 hits: 4 (7); Sweeper 1 (pack 6). Nell, not fed (Chi die): 6 1 3 3 3 2 = 1 hit, miss: 1 (6); hit back: V 1; Counter 1 (5); C 2. Feeds +2 (7). Swarm 1 to Rae (V 1). Surge 6: Call, pack to 4 Stills (12).
- **R7.** Rae, fed: 1 5 5 1 3 = 2 hits: 3 (4); Sweeper 1 (pack 11). Nell (Chi die, Tide): 6 2 3 2 2 1, Tide 5 1 4: 2 hits: 2. **Heart 2.** Enemies: feeds +4 (6). Swarm 2 (half of 4): every standing fighter is on 1, so someone goes Down; the players give it to **Rae, who dealt the most damage this round**. Surge 1: **Crush 6 "to the fighter who dealt it the most damage this round"**: that is Rae, who is now Down.
  - **Read literally, the Crush hits a Down fighter, "Harm past 0 is lost", Nell survives, and dawn breaks with the Heart at 6 of 51: driven off.**
  - **With tonight's ruling (issue B-05: a Crush goes to the standing fighter who dealt the most damage), it hits Nell: everyone is Down at the Heart: LOSS**, with the Heart at 6 of 51, in the enemies' step of the very last round.
  - The table played the ruling: **loss**. The one unclear sentence decided the night.
- **What the small group lacked:** anything that stops a Surge. With no Guardian, no Seal and no Earth (Bulwark), each Hard Crush (6) and Sweep (3) landed in full; three of the seven Surges put a fighter Down. Its Awakenings were spent by round 3 and nothing refilled Chi but misses (Tempest misses give none). Its damage was fine: 51 Toughness came down to 2. The group is also easier to break apart: one Down fighter in a ring of three breaks the feeding for the next fighter too (Nell went unfed in rounds 5 to 7).

### Drill 20: dawn with the Heart above half
Position: round 7 (dawn), Heart 52/70 (half 35), pack 3 Stills. Lou 2 6 1 4 4 (miss: 2; 50), Kit 2 5 1 1 1 (miss: 2; 48), Nell 2 2 4 5 2 (miss: 2, Counter 1; 45), Tess 5 3 4 3 2 (miss: 2; 43), Omar 2 4 3 5 6 (2 hits: 3; 40). Feeds +3 (43). **Dawn: Heart 43, above half: loss.** Clean.

### Drill 21: Renewal on a Down ally
Tess Strikes with Renewal declared on Kit, who is Down: 3 6 5 6 4 = 3 hits, Critical (4 damage). Renewal: "you or an ally regains 1 Vigor, whatever the result" (p. 7). Kit goes from 0 to 1 Vigor. You are Down "at 0 Vigor" (p. 11), so is Kit up? If so, Renewal is a 1-Chi Rally that costs no action (issue B-06). Ruling tonight: Renewal can't target a Down fighter.

### Drill 22: the last Still and the Warden on one Strike
Warden at 1, pack at 2 (1 Still). Rae Strikes the pack: 6 3 1 6 5 = 3 hits, Critical: the last Still falls; Sweeper's 1 damage finishes the Warden. Both fall on one Strike; the fight is won. Clean.

### Drill 23: a Surge on a round the Warden falls (observed in play)
Three Wardens fell during the fighters' step (Hour 1 round 3, Hour 2 round 5, Drill 11 round 6). The fight ends when the enemy falls (p. 11), so the fighters still to act don't act and there is no feeding, Swarm or Surge. Nothing in the enemies' step can destroy a Warden, so a Surge can never coincide with a Warden falling. Clean.

### Coverage
- **Styles:** Brawler, Guardian, Counter, Flow, Breath (night); Sweeper (Drills 1, 2b, 11, 12, 19, 22). **Perks:** Tough, Medic, Lucky, Quick, Trained (night); Stubborn (Drills 3a, 19). **Awakenings:** Seal, Tempest, Ascendant, Harmony (night); Unbreakable (Drills 4, 19); Wellspring (Drill 3). **Techniques:** Blaze, Bulwark, Edge, Tide (night); Renewal (Drills 2b, 21). **Actions and free spends:** Strike, Rally, Chi die, Help (night).
- **Clocks:** long fight (night, Drill 11), Respite (night), withdraw (Drill 15), the Warden holds (Drill 11b), a long fight with no Hours left and an early dawn (Drills 11-12).
- **Failure states:** a fighter Down and Rallied (night), everyone Down at an Anchor (Drill 5), everyone Down at the Heart (Drills 6a, 19).
- **Session ends:** win (night: decided by the Strike that drops the Heart), win on the same Strike as the last fighter going Down (Drill 6b), driven off (Drill 12: decided at the end of the dawn round, after the enemies act), loss by everyone Down (Drill 6a: at once, mid-round; Drill 19: in the enemies' step), loss at dawn (Drill 20).

## Issues

Severity: **blocker** (a table can exploit it or can't play on without a ruling that changes the result), **confusing** (two careful readers will play it differently), **minor** (wording, sheets, or balance to check). Pages are PDF pages. 27 issues: **3 blockers, 8 confusing, 16 minor.**

### B-01: Is the Heart in Hour 4, or after it? (confusing, pp. 6 and 14)
- **Quote:** "The Heart. In the last Hour you face the Heart of the Unmade." (p. 6); "In the last Hour, wherever they are, the fighters are drawn to the Heart." (p. 14); against "The Hunt lasts 4 Hours." (p. 14)
- **Problem:** "Hour" is a game term ("One step of the Hunt's clock", p. 6), so "the last Hour" reads as Hour 4 of the Hunt, which would leave three Hours to hunt. The time table and the Night sheet's four Hour pips say the Heart comes after all four.
- **Fix:** "When the Hunt ends, the fighters are drawn to the Heart." Keep "Hour" for Hunt steps only.
- **Ruling tonight:** the Heart comes after all four Hours.

### B-02: Five Anchors, four Hours: "every Anchor broken" can't happen (confusing, pp. 14, 19, 24)
- **Quote:** "The Hunt ends when the Hours run out, or when every Anchor is broken." (p. 14); Night card row "Heart Toughness, every Anchor broken: 15 / 20 / 30" (p. 19); "every fighter's element has a Shell to break" (p. 24)
- **Problem:** every Anchor fight costs at least one Hour and there are four Hours for five Anchors, so at least one Anchor always stands. The second end condition and the table row can never happen; the real smallest Heart is 27 / 36 / 50. A table that reads the row plans for a Heart it can't get.
- **Fix:** say "At most four Anchors can fall in one night", and label the row "one Anchor standing" with the real numbers (or change the design and let the simulator decide).
- **Ruling tonight:** as written; the row is unreachable.

### B-03: A Swarm can be given to a Down fighter (blocker, p. 17)
- **Quote:** "the pack deals Harm equal to half its Stills (rounded up), as one blow, to one fighter of the players’ choice."
- **Problem:** nothing stops the players choosing a fighter who is already Down, and "Harm past 0 is lost" (p. 11). Once anyone is Down, every Swarm is free. The table reached for this three times (Hour 2 round 4, Drills 3c, 5).
- **Fix:** "...to one fighter who isn't Down, of the players' choice." Repeat it on the Night sheet and the At the Table card.
- **Ruling tonight:** as the fix.

### B-04: A Down Guardian can still take losses (blocker, pp. 8 and 11)
- **Quote:** Guardian: "Once per round, when another fighter would lose Vigor, you may lose it instead. When you do, gain 2 Chi." (p. 8); Down: "you can’t act or Help" (p. 11)
- **Problem:** Guardian isn't an action, so a Down Guardian may take a Crush every round, lose nothing (already at 0) and gain 2 Chi, ready for when they are Rallied. Hour 2 round 4: the table asked to do exactly that.
- **Fix:** add to the Down list: "your style, perk and technique do nothing".
- **Ruling tonight:** a Down fighter's style does nothing.

### B-05: A Crush can land on a Down fighter, and the players choose who goes Down first (blocker, p. 18)
- **Quote:** "Crush: 3 Harm to the fighter who dealt it the most damage this round"; "Crush when nobody damaged it this round: it hits the fighter with the most Vigor."
- **Problem:** the Swarm comes before the Surge and the players pick its target. They can Swarm the top damage dealer Down, and the Crush then falls on a Down fighter and is lost. In Drill 19 this one sentence decided the night: read literally, driven off; with the ruling, a loss with the Heart at 6 of 51.
- **Fix:** "Crush: to the fighter who isn't Down and dealt it the most damage this round; if none of them did, the standing fighter with the most Vigor."
- **Ruling tonight:** as the fix.

### B-06: Renewal on a Down ally (confusing, p. 7)
- **Quote:** "After the roll, you or an ally regains 1 Vigor, whatever the result."
- **Problem:** a Down ally goes from 0 to 1 Vigor; you are Down "at 0 Vigor" (p. 11), so are they up, and when do they act? Wellspring says a Down fighter given Vigor stands (p. 13); Renewal is silent. If it stands them, it is a 1-Chi Rally that costs no action (Drill 21).
- **Fix:** "you or an ally who isn't Down regains 1 Vigor".
- **Ruling tonight:** Renewal can't target a Down fighter.

### B-07: One Chi die per roll, or more? (confusing, p. 10)
- **Quote:** "a Chi die: spend 1 Chi for a bonus die on your own roll"; "Your Chi die, Help and the Quick perk add dice to a roll."
- **Problem:** "your Chi die" suggests one, but nothing forbids buying two (still within the cap). It matters most with Breath: Omar ended Hour 1 round 1 holding 2 Chi he could not spend on himself.
- **Fix:** "one Chi die per roll" in Chapter 3, Chapter 4's spend table and the card; or "1 Chi per bonus die".
- **Ruling tonight:** one Chi die per roll.

### B-08: Withdrawing at the end of round 4 (confusing, pp. 10 and 14)
- **Quote:** "Long fight: an Anchor fight still going at the end of round 4 costs one more Hour." and "Withdraw: at the end of any round, the group can withdraw." (p. 14); "Awakenings count down, then the clocks are checked" (p. 10)
- **Problem:** a group that withdraws at the end of round 4 can argue its fight wasn't "still going", so it fought four full rounds and pays no extra Hour. The table argued it (Hour 2, end of round 4).
- **Fix:** "Withdrawing at the end of round 4 still costs the long-fight Hour" (or the reverse, but say which).
- **Ruling tonight:** the clocks are checked first, then the group may withdraw; the Hour is spent.

### B-09: A Shell that shatters during the Strike: is the Strike still hit back? (confusing, pp. 11 and 18)
- **Quote:** "It also shatters once the Warden is at half its Toughness or less." (p. 18); step 7, "If you missed the Guard and the enemy is still standing, it hits you back" (p. 11)
- **Problem:** Drill 2a: 2 hits against Guard 3, the damage takes the Warden to half, the Shell shatters at step 5, and by step 7 the Guard is 2 and the fighter has 2 hits.
- **Fix:** "Your Strike is judged against the Guard you rolled against; a Shell that shatters during it lowers the Guard from the next roll."
- **Ruling tonight:** as the fix (hit back).

### B-10: The First Clash has no failure state (confusing, pp. 11 and 14)
- **Quote:** "Every fighter is Down. At an Anchor, the Anchor stands (Chapter 5). At the Heart, the night is lost." and "The clock runs out. Every fight ends at the end of round 7 (Chapter 5)." (p. 11)
- **Problem:** neither line, nor Chapter 5, says what happens if everyone is Down in the First Clash, or if it reaches the end of round 7.
- **Fix:** one line in Chapter 5: "First Clash: if everyone is Down, or round 7 ends, the Stills melt away; Down fighters stand with 1 Vigor."
- **Ruling tonight:** as the fix.

### B-11: The late-joiner box contradicts itself and leaves out three picks (confusing, p. 9)
- **Quote:** "Starting Vigor and the size of every enemy are set by how many fighters there are when the night begins." ... "A player who arrives late takes an element nobody has, the starting Vigor everyone else began with, and 2 Chi. From the next fight on, the enemies count them as a fighter."
- **Problem:** the first and last sentences contradict. Only the element is mentioned (style, perk, Awakening?). The Heart's "with five fighters, use 6 instead of 5" is unclear for a group that becomes five. At a five-fighter table no element is free, so a sixth player can't join. A late joiner to a three-fighter night brings 10 Vigor into fights sized for four, whose fighters would have had 7.
- **Fix:** "Enemies are sized for the fighters at the start of each fight. A late fighter makes all four picks from what is left and starts with the Vigor everyone else began with and 2 Chi. A night seats five fighters at most."
- **Ruling tonight:** as in Drill 14.

### B-12: Three "Hours owed" boxes, but only one Hour can ever be owed (minor, pp. 14, 15, 27)
- **Quote:** Night sheet, "Hours owed (each brings dawn one round sooner):" with three boxes (p. 27); "one round sooner for each Hour owed by a long fight" (p. 15)
- **Problem:** a long fight before the last Hour simply uses the next Hour (and may end the Hunt); only a long fight in the last Hour owes one. Three boxes and "each" suggest more.
- **Fix:** one box: "Hour owed: dawn after round 6".
- **Ruling tonight:** none needed.

### B-13: The "same Strike" rule only happens through Counter, and doesn't say so (minor, p. 11)
- **Quote:** "If the same Strike destroys the Heart and puts the last fighter Down, the fighters win."
- **Problem:** a Strike that destroys the enemy can't be hit back (p. 10), so readers take this for a dead sentence. It happens only when the hit back drops the last fighter and Counter's 1 damage then finishes the Heart (Drill 6b). For a moment everyone is Down, so the order matters.
- **Fix:** add "(for example, when Counter's damage finishes the Heart)".
- **Ruling tonight:** win.

### B-14: The card says "two 6s", the chapter says "two or more" (minor, p. 28)
- **Quote:** "Critical: Guard met and two 6s: +1 damage, +1 Chi." (p. 28) against "shows two or more 6s" (p. 10)
- **Fix:** "two or more 6s" on the card.
- **Ruling tonight:** two or more.

### B-15: A Guardian who goes Down from the loss they took (minor, p. 8)
- **Quote:** "When you do, gain 2 Chi."
- **Problem:** the hit back says "gain 1 Chi (unless you went Down)"; Guardian has no such clause, so a Guardian who goes Down taking a Crush loses all their Chi and then gains 2.
- **Fix:** "When you do, gain 2 Chi, unless it puts you Down."
- **Ruling tonight:** no Chi (Hour 2 round 3: Lou declined to take the Crush because of it).

### B-16: Sweeper does nothing in the First Clash (minor, pp. 8 and 17)
- **Quote:** "When you meet the Guard, also deal 1 damage to one other enemy."
- **Problem:** the First Clash is one pack "fought as one enemy", with no Warden; Sweeper is blank there and at an Anchor once the pack is gone (Drill 1). Not wrong, but a player choosing Sweeper should know.
- **Fix:** add it to "Reading the styles", or let Sweeper's point go to the same pack when there is no other enemy.
- **Ruling tonight:** does nothing.

### B-17: Guardian, Sweeps and Bulwark (minor, pp. 8 and 11)
- **Quote:** "The next time they would lose Vigor this round, they lose 3 less." (p. 8); "a Guardian may take the loss for you; then Bulwark" (p. 11)
- **Problem:** a Sweep hits everyone at once. If Lou, holding his own Bulwark, also takes Tess's Sweep, is that one loss of 2 (Bulwark covers both) or two losses of 1? And if a Guardian takes a loss for a fighter who has a Bulwark, is that Bulwark used up?
- **Fix:** "A loss a Guardian takes is a separate loss. A Bulwark waits until its fighter actually loses Vigor."
- **Ruling tonight:** as the fix.

### B-18: Counter when the hit back puts you Down (minor, p. 8)
- **Quote:** "When an enemy hits you back, deal it 1 damage and gain 1 more Chi."
- **Problem:** does the damage still land, and do you gain the Chi, when the hit back puts you Down? B-13's sentence implies the damage lands.
- **Fix:** "Counter's damage lands even if the hit back puts you Down; you gain no Chi then."
- **Ruling tonight:** as the fix.

### B-19: The Quick Strike: is it a turn, and is it "this round"? (minor, p. 8)
- **Quote:** "Before the first round of each fight, take a free Strike with +1 die. It can’t be hit back."
- **Problem:** can a fighter Awaken before it ("at the start of your turn")? Does its damage count for round 1's Crush ("most damage this round")?
- **Fix:** "It isn't a turn and isn't part of round 1."
- **Ruling tonight:** as the fix (Drill 17; Hour 2 round 1).

### B-20: Help offered past the cap (minor, p. 10)
- **Quote:** "However many you are offered, you roll at most two bonus dice"
- **Problem:** is the third helper's Chi spent?
- **Fix:** "Nobody may spend Chi on a bonus die past the cap."
- **Ruling tonight:** as the fix (Drill 7).

### B-21: A Down fighter isn't skipped in the ring (minor, p. 11)
- **Quote:** "Any element nobody has is skipped, so the ring always closes"
- **Problem:** a Down fighter still "has" their element, so one Down fighter stops the next fighter in the ring being fed until they act again (Hour 2 round 5; Drill 19 rounds 5 to 7). Probably intended, since it makes a Rally worth more, but the book should say so.
- **Fix:** "A Down fighter isn't skipped: the fighter after them can't be fed until they act again."
- **Ruling tonight:** not skipped.

### B-22: Edge is the best technique by a distance (minor, balance; pp. 7-8)
- **Quote:** "Each 6 you roll counts as three hits."
- **Problem:** worked out exactly against Guard 2, fed, 5 dice: plain Strike 2.7 damage, Blaze 4.5, **Edge with Brawler and Trained 5.5** (and it meets the Guard 70% of the time instead of 54%); **with Ascendant, 8.8** (12.1 on 7 dice). Edge doubles the hits Trained's Criticals add to, and a Trained Critical's 2 Chi pays for the next Edge. Kit dealt the most damage in three of the four fights, including 14 of the First Clash's 30 and 40 of the 102 the Heart took.
- **Fix:** run Metal builds through the simulator; for example "each 6 counts as two hits".
- **Ruling tonight:** as written.

### B-23: The Seal holder dropped by the Swarm before the Surge (minor, pp. 12 and 18)
- **Quote:** "It ends early if you go Down or the fight ends." (p. 12); "A Sealed Warden or Heart doesn’t Surge" (p. 18)
- **Problem:** the Swarm comes before the Surge. If it drops the Seal holder, does the Surge right after it happen (Drill 10)?
- **Fix:** say so either way.
- **Ruling tonight:** the Seal has ended, so the Surge happens.

### B-24: The sheets don't track what changes every round (minor, pp. 26-27)
- **Quote:** Night sheet, "Warden or Heart: Toughness left" (p. 27); Fighter sheet, "Awakened tonight" (p. 26)
- **Problem:** no box for the Shell (on or shattered), whether Awakenings are open yet (someone has gone Down tonight), Awakening rounds left, or the number of Stills (only pack Toughness, so the table keeps working out "rounded up" Stills).
- **Fix:** a Shell box beside the Warden's Toughness, an "Awakenings open" box on the Night sheet, three round boxes beside "Awakened tonight", and "Stills = Toughness / 3, rounded up" by the pack box.
- **Ruling tonight:** none needed.

### B-25: Guardian with Seal, or Guardian with Unbreakable, blunts Hard (minor, balance; pp. 8, 13, 18)
- **Quote:** "Guardian takes the whole loss, after which the other protections (Chapter 3) apply to you, not to them." (p. 8)
- **Problem:** in the night only one Surge landed in four Heart rounds (the Seal stopped two, the Guardian took the third). In Drill 4b a Guardian with Unbreakable turned 15 Vigor of Hard Heart damage into 6 Chi over three rounds. Hard's difference is only the Heart's Crush and Sweep, and these two pairs cancel most of it.
- **Fix:** simulate Hard nights with these pairs; for example, the Guardian gains no Chi from a loss they don't actually lose.
- **Ruling tonight:** as written.

### B-26: A Call with a full pack does nothing (minor, p. 18)
- **Quote:** "2 more Stills join its pack (or form a new one), up to fighters + 2 Stills"
- **Problem:** with the pack full, a sixth of the Surge table is blank (Drill 2d); a Call in round 7 brings Stills that never act (Drill 11b). Fine if intended; worth a line so the Storyteller doesn't look for something else to do.
- **Fix:** "A Call with a full pack does nothing", or let a full pack Swarm again.
- **Ruling tonight:** nothing happens.

### B-27: The players can choose when Awakenings open (minor, pp. 12 and 17)
- **Quote:** "You may Awaken from the moment the first fighter goes Down tonight"
- **Problem:** the players choose who takes the Swarm, so a table can drop a fighter on purpose in the First Clash (a 10-Still pack Swarms for 5) and open Awakenings for the whole Hunt (Drill 9c). It costs the Heart Awakening, so it is rarely worth it, but a Breath fighter refills every fight.
- **Fix:** accept, or "from the first time a fighter goes Down in an Anchor fight".
- **Ruling tonight:** as written.

## What worked

- **The roll is fast and settles things.** One roll per action, no opposed rolls, hits on 5-6. "A roll's result comes first" settled every killing blow at once (three Wardens and the Heart fell on Strikes that would otherwise have been hit back).
- **"Resolving a Strike, in order" (p. 11) handled every pile-up in play:** Tide then Lucky, Sweeper, Renewal, hit back then Counter, Critical Chi. The Vigor protection order (Guardian, Bulwark, Flow, Unbreakable) did the same.
- **The ring is easy and always worth walking.** Calling out "Earth, Metal, Water, Wood, Fire" round after round took no effort, and the explicit lines for a Quick Strike, a Rally and a held Seal answered all three questions before anyone asked.
- **Shells make the Hunt a real choice.** The table picked Anchors by breaker, and the Quick Strike shattering a Shell before round 1 felt like a discovered trick, not an exploit.
- **The clocks ran from the sheet:** the long fight, the Warden holding at round 7, the owed Hour bringing dawn to round 6, and the round order (enemies act, then the clocks) made every dawn unambiguous.
- **Chi flowed.** Hit backs refilled people, Help gave everyone something to do on other players' turns, and the Heart's 3 Chi made the Awakening a big shared moment. All six Awakenings felt different.
- **The tie rule** ("the fighter among them who acted last") settled three Crush ties with no argument.
- **The Stills mattered.** The Storyteller's reminder of what they gave back each round drove target choices, and the Call in Hour 1 changed the plan.

## How it felt

- **Was losing a real risk at Hard?** In the Hunt, yes: the Iron Bridge ran long, two fighters went Down three times between them, and the group came out on 10 of 33 Vigor. At the Heart, no: with a Seal, a Guardian and three Awakenings in round 1, the five-fighter group took one Surge (which the Guardian absorbed) and won in round 4 of 7 with three Anchors standing. The three-fighter group in Drill 19, with no Seal and no Guardian, lost on the last Surge with the Heart at 6 of 51. Hard's danger depends far more on whether a group has a way to stop Surges than on the difficulty label.
- **Was Chi spent?** Constantly. Most fighters were on 0 or 1 Chi at the end of most rounds. Help was the biggest sink; Breath gave Omar a second budget every fight (a Quick Strike with Blaze and a Chi die, and still the 3 for his Awakening at the Heart). The only real Chi tension was Harmony's last share: the Awakening Nell had planned, or techniques for the damage dealers.
- **Dominant tactics:** walk the ring (the book says so, and it is right); **the Guardian takes every Crush** (Lou took 3 Crushes, 12 Harm, and turned them into 6 Chi); **Flow as the Swarm sink** (Tess took 8 Swarms totalling 12 Harm and lost 4 Vigor); **Bulwark on yourself before a risky Strike** (a miss costs nothing and the hit back refunds the Chi); **Metal with Edge and Trained** (B-22); **a Seal at the Heart**.
- **What the rowdy table tried to break:** Swarms and Crushes onto Down fighters (B-03, B-05), a Down Guardian soaking hits (B-04), withdrawing at the end of round 4 (B-08), Renewal as a free Rally (B-06), two Chi dice (B-07), Awakening before the Quick Strike (B-19), Help past the cap (B-20). Every one needed a ruling, and three of them would change who wins.
- **How long it took:** about 2 hours 45 minutes at a real table: setup 25 minutes, Prologue and First Clash 15 (it ended in round 1), the Greenhouse 20, the Iron Bridge 40 (five rounds and two long arguments), the Respite 5, the Heart 35, the Epilogue 10. That fits the book's three hours. Strikes with a technique, a Chi die, two Helps and a reroll were the slowest part.
- **Skipped rolls or free spends:** none found in the rules as written. Free value came from choices the rules allow: Flow on 1-Harm Swarms, Bulwark on yourself, Stubborn on 2 Vigor, and Wellspring standing two Down fighters who act at once.

## Result

**The night: WIN at Hard** with five fighters: the Greenhouse and the Iron Bridge broken (the second in a long fight), the third Hour lost to the long fight, a Respite in the fourth, and the Heart (90 Toughness, three Anchors standing) broken in round 4 of 7 with nobody Down.

**Drills:** every unpicked option, failure state, limit and session end was exercised (see Coverage). The three-fighter Heart at Hard ended in a **loss** on the last Surge of round 7 with the Heart at 6 of 51, and the result turned on issue B-05.

**Issues:** 27 in all: **3 blockers** (B-03, B-04, B-05: all about what a Down fighter can still do or have done to them), **8 confusing**, **16 minor**. The three most important: (1) **B-03 and B-05:** Swarms and Crushes can be steered onto Down fighters and wasted, which one sentence each will close; (2) **B-04:** a Down Guardian can still soak a loss every round and gain Chi; (3) **B-01 and B-02:** the night's structure is unclear (is the Heart in Hour 4, and "every Anchor broken" can never happen with four Hours for five Anchors).

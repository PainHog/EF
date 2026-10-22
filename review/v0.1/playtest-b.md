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

**Totals for the night:** 4 fights, 13 rounds, 70 rolls. Two fighters went Down (Lou twice, Kit once), all in the Iron Bridge's long fight. At the table this would be about 2 hours 45 minutes including setup.


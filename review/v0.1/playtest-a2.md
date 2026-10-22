# Playtest A2: first night, version 0.1 (after fixes)

**Did the table have to invent any ruling on core flow?** No. Every question about the round, the Strike, feeding, the clocks, the Surge and the endings was answered by the book. The table made rulings only on setup wording (C1, M1), sheet gaps (M2, M4, M6), a second night with kept fighters (M5), and one targeting case that the Night sheet answers but Chapter 6 doesn't state on its own (M3).

**Was there any blocker?** No.

**Results.** Night 1, the ready-made night on Easy: **Driven off**, with the Heart on 3 of 39 at dawn. Night 2, a night built from the Chapter 9 tables on Standard: **Win** in round 7, with the fighters on 2, 2 and 1 Vigor.

**Issues:** 0 blocker, 1 confusing, 7 minor.

**The three most important:**
1. **M7 (balance flag):** the players choose who takes each Swarm, so every Swarm went to the Flow fighter (or the Unbreakable one). 18 Swarms over two nights dealt 3 Vigor in all. Worth checking in the simulator.
2. **M6 (sheet):** the Night sheet has no enemy Guard or Harm, which are needed on every Strike, so the Storyteller kept Chapter 6 open all night.
3. **C1 (wording):** "each fighter has at least one pick that helps the others" (p. 7) reads as a building rule and stalled a new player's build.

## 1. The table and setup

**Who sat down.** One Storyteller who has read the book once. Three players who have never played a roleplaying game: Ruth, Dev and Ellie. All four play strictly from the book (the chapters in `book/src/chapters/`, cited by the page numbers of the built PDF). Every die came from the dice script; line numbers below (L1, L2, ...) are lines of `review/v0.1/playtest-a2-dice.log`.

**Fighters (avoiding the obvious ready-made trio).**

| Player | How | Fighter | Element | Style | Perk | Awakening | Vigor | Chi |
|---|---|---|---|---|---|---|---|---|
| Ruth | ready-made (p. 10) | Sam Whitlock, 67, retired judo coach | Water (Tide) | Counter | Trained | Unbreakable | 10 | 2 |
| Dev | built by choice (Ch 2) | Tariq Haddad, 31, night-shift chef at a kebab shop; the grill flared and stayed in his hands | Fire (Blaze) | Breath | Tough | Ascendant | 13 | 2 |
| Ellie | built with the rolled picks (Ch 2) | Grace Lindqvist, 45, tram driver; her tram stopped dead and the rails rose to hold it | Earth (Bulwark) | Flow | Stubborn | Wellspring | 10 | 2 |

- Dev's reasoning: "I want my power every time I hit", so Fire plus Breath (4 Chi every fight pays for Blaze), Tough because he is nervous about getting hurt, Ascendant because "double damage" is the easiest Awakening to understand.
- Ellie rolled her four picks after the other two had announced theirs (L1-L4): element 3 = Earth, style 4 = Counter (already Sam's, rerolled: L5 = 5, Flow), perk 5 = Stubborn, Awakening 3 = Wellspring. Nothing else clashed, so no roll-off was needed.
- The ring is **Fire -> Earth -> Water -> Fire** (Wood and Metal skipped). Shells the group can shatter: Metal (Fire), Water (Earth), Fire (Water). Three, so the "good group" advice on p. 7 is met.
- Starting Vigor 10 for three fighters (p. 7), Tariq 13 with Tough. Everyone 2 Chi.

**Setup timing (book minutes).**

| Step | Minutes |
|---|---|
| Lines and pauses (p. 6 box) | 3 |
| Storyteller reads the elements and two cycles (p. 5) and the round (p. 11) aloud, as p. 22 says | 5 |
| Ruth reads Sam's entry and copies her picks onto the sheet | 4 (in parallel) |
| Dev reads the element, style, perk and Awakening lists and chooses | 12 |
| Ellie rolls her picks, rerolls one, reads what she got | 6 (in parallel with Dev) |
| Names, "before tonight", "when it woke" | 5 |
| Filling in the fighter sheets: copying technique text, Feeds and Shatters, crossing out Vigor circles | 6 |
| Storyteller fills in the Night sheet (Easy, Warden 27, five Anchors from Ch 8, Heart formula) | 4 (in parallel) |
| **Total** | **about 35 minutes** |

That sits inside the book's own band (p. 16: "20 minutes with ready-made fighters, 30-40 if everyone builds their own"); two of three built their own. The slowest part was Dev reading four lists of six and asking what each style "is for".

**Newcomer questions during setup** (A = the book answers it quickly; Q = it did not, see Issues):
1. Ellie: "If my roll lands on something someone already has, do I reroll or roll off?" A: p. 7, "reroll anything already taken". But see issue M1: it is not said whether picks others have only *announced* count as taken.
2. Dev: "Breath gives 4 Chi, I start with 2. Do I start fights with 6?" A: p. 8, "Breath can't take you past 5 Chi."
3. Dev: "Do I *have* to take a pick that helps the others?" Q: issue C1.
4. Ellie: "What's a Shell? It says a good group can shatter two or three." Partly A: Ch 1 says each element "shatters one kind of armour the Unmade wears (Chapter 6)", but the explanation is in the Storyteller's part. Took a minute of page-flipping.
5. Ruth: "My Feeds box: Water feeds Wood, but nobody is Wood." A, but slowly: the ring rule is on p. 12; the sheet box invites the wrong answer. Issue M2.
6. Ruth: "Tide says 'after the roll'. Can I decide to use it after I see the dice?" A: p. 7, "spend 1 Chi as you declare a Strike", and the Strike order on p. 12. The table got it right, but only by reading two places.
7. Ellie: "Flow means a Still's hit back (Harm 1) does nothing to me?" A: p. 8, "Lose 1 less Vigor each time"; Flow "works against hit backs, Crushes and Swarms, but not Sweeps."

**Sheets as a player sees them (pp. 28-30).** The fighter sheet held everything the night needed: 13 Vigor circles covered Tough exactly, the Awakening box and three round boxes worked well, and the "This fight" checkboxes were used for Down. Missing or awkward: there is no line for the ring at this table (who feeds you and whom you feed), and the Night sheet's five "Damage this round, by fighter" boxes are unlabelled, so the Storyteller pencilled initials above them. The Night sheet also leaves out the enemies' Guard and Harm, which are needed on every Strike, so the Storyteller kept pp. 19-20 open beside it. See issues M2, M4 and M6.

## 2. Night 1: "The Night the Clocks Stopped" (Ch 8), Easy

Night sheet: 3 fighters, Easy. Warden Toughness 27 (half: 13 or less). Heart Toughness (5 + 4 x Anchors standing) x 3. Heart Crush 2, Sweep 1.

Tracking, as the book says: the Storyteller kept the Night sheet in the middle of the table (Hours crossed off, Anchors ticked broken, round boxes, Toughness left for the Warden and the pack, Shell shattered, damage by fighter cleared each round); each player kept Vigor and Chi in pencil on the fighter sheet and ticked the Awakening box and its rounds. Nothing had to be tracked off the sheets except the ring (issue M2).

### Prologue (book minutes: 12)
Each player described the moment their element woke; the Storyteller asked one question from p. 22 each ("What were you doing at two minutes to midnight?", "Who is the one person in this city you need to still be here tomorrow?", "What did you see the Stills take?"). Sam was mid-length in the pool when the water stopped for everyone but her. Tariq's grill flame climbed his arms. Grace's tram stopped on a hill and the rails rose up to hold it.

### First Clash: the night bus station (book minutes: 10)
Pack of 6 Stills: Toughness 18, Guard 1, Harm 1. Tariq gains 4 Chi from Breath at the start (2 + 4, capped at 5). The players act in ring order, because the Storyteller had read out "Fighters who act in this order hit harder" (p. 5).

| Round | Action | Dice | Result |
|---|---|---|---|
| 1 | Tariq strikes pack: Blaze + Chi die (Chi 5 to 3), not fed (first action) | L6: 4 hits | 4 + 2 Blaze = 6. Pack 18 to 12 |
| 1 | Grace strikes pack: Chi die (Chi 1), fed | L7: 1 hit | 1 + 1 = 2. Pack 10 (4 Stills) |
| 1 | Sam strikes pack: Chi die (Chi 1), fed | L8: 2 hits | 2 + 1 = 3. Pack 7 (3 Stills) |
| 1 | Enemies: Swarm 2 (half of 3, rounded up) | | Players give it to Grace: Flow, she loses 1 (Vigor 9) |
| 2 | Tariq: Blaze + Chi die (Chi 1), fed by Sam's last action | L9: 3 hits | 3 + 2 + 1 = 6. Pack 1 |
| 2 | Grace strikes pack, fed | L10: 2 hits | Last Still falls. **First Clash won in round 2.** |

After: Tariq 13/13, Grace 9/10, Sam 10/10. Chi 1 / 1 / 1. Nobody has gone Down, so Awakenings are not open.

### The Hunt
The Storyteller reads all five Anchors (pp. 24-25). The players pick the three whose Shells they can break: the Iron Bridge (Metal Shell, Fire breaks it), the Reservoir (Water, Earth) and the Substation (Fire, Water), planning a Respite "when we're at about two-thirds" (p. 17 box).

**Hour 1: the Iron Bridge, the Girder** (Warden 27, Guard 3 with Shell, 2 for Tariq; pack of 3 Stills, 9 Toughness). Tariq gains 4 Chi (Breath): 5. Order Tariq, Grace, Sam.

| Round | Action | Dice | Result |
|---|---|---|---|
| 1 | Tariq strikes Girder: Blaze + Chi die (Chi 3); Guard 2 for Fire | L11: 3 hits | Met. 3 + 2 = 5, his hit **shatters the Shell**. Girder 22 |
| 1 | Grace strikes pack: Chi die (Chi 0), fed | L12: 1 hit | 1 + 1 = 2. Pack 7 (still 3 Stills) |
| 1 | Sam strikes pack: Chi die (Chi 0), fed | L13: 2 hits, two 6s | **Critical**: 2 + 1 fed + 1 Critical + 2 Trained = 6. Pack 1 (1 Still). Chi +1 +1 = 2 |
| 1 | Enemies: draw 1 (Girder 23); Swarm 1 to Grace (Flow: 0); Surge | L14: 4 | Sweep: everyone loses 1 (Flow doesn't apply). T 12, G 8, S 9 |
| 2 | Tariq: Blaze + Chi die (Chi 1), fed | L15: 1 hit | Missed Guard 2. 1 + 2 + 1 = 4 (Girder 19). Hit back 2: T 10, Chi 2 |
| 2 | Grace strikes Girder, fed (not chasing the last Still, p. 17) | L16: 2 hits | Met. 3. Girder 16 |
| 2 | Sam: Tide + Chi die (Chi 0), fed | L17: 0 hits; Tide L18: 1 hit | Missed. 1 + 1 = 2 (Girder 14). Hit back: S 7, +1 Chi; Counter: 1 damage (Girder 13), +1 Chi (Chi 2) |
| 2 | Enemies: draw 1 (14); Swarm 1 to Grace (0); Surge | L19: 3 | Sweep. T 9, G 7, S 6 |
| 3 | Tariq: Blaze + Chi die (Chi 0), fed | L20: 3 hits | 6. Girder 8 |
| 3 | Grace, fed | L21: 1 hit | Missed. 2 (Girder 6). Hit back 2, Flow 1: G 6, Chi 1 |
| 3 | Sam: Tide + Chi die (Chi 0), fed | L22: 2 hits; Tide L23: 3 hits | Met. 4. Girder 2 |
| 3 | Enemies: draw 1 (3); Swarm 1 to Grace (0); Surge | L24: 4 | Sweep. T 8, G 5, S 5 |
| 4 | Tariq, fed | L25: 2 hits | 3. **Girder falls in round 4; the Bridge breaks.** Not a long fight (it ended before the end of round 4) |

After: Tariq 8/13, Grace 5/10, Sam 5/10 (18 of 33, 55%). Chi 0 / 1 / 0.

**Hour 2: Respite.** Below two-thirds, so the group rests. Everyone to full Vigor: 13 / 10 / 10. Chi unchanged.

**Hour 3: the Reservoir, the Overflow** (Water Shell; Guard 2 for Grace). Breath: Tariq 0 + 4 = 4. The players notice that the ring can start anywhere, so Grace goes first and the order is Grace, Sam, Tariq (still the ring, Earth -> Water -> Fire).

| Round | Action | Dice | Result |
|---|---|---|---|
| 1 | Grace strikes Overflow: Chi die (Chi 0), not fed | L26: 1 hit | Her first hit **shatters the Shell**, but the Strike is judged against Guard 2 (p. 12): missed. 1 damage (26). Hit back 2, Flow 1: G 9, Chi 1 |
| 1 | Sam strikes pack, fed | L27: 2 hits | 3. Pack 6 (2 Stills) |
| 1 | Tariq strikes pack: Blaze + Chi die (Chi 2), fed | L28: 6 hits, four 6s | **Critical**: 6 + 2 + 1 + 1 = 10. Pack destroyed. Chi 3 |
| 1 | Enemies: no Stills; Surge | L29: 5 | Drain: most Chi (Tariq, 3) loses 2. Chi 1 |
| 2 | Grace: Chi die (Chi 0), fed by Tariq's last action | L30: 3 hits | 4. Overflow 22 |
| 2 | Sam, fed | L31: 2 hits | 3. Overflow 19 |
| 2 | Tariq: Blaze (Chi 0), fed | L32: 2 hits | 5. Overflow 14 |
| 2 | Surge | L33: 5 | Drain, but nobody has Chi: Crush instead, 3 Harm to most damage this round (Tariq, 5). T 10 |
| 3 | Grace, fed | L34: 3 hits | 4. Overflow 10 (Shell already gone) |
| 3 | Sam, fed | L35: 1 hit | Missed. 2 (8). Hit back: S 8; Counter 1 (7); Chi 2 |
| 3 | Tariq, fed | L36: 0 hits | 0 damage (bonuses need a hit). Hit back: T 8, Chi 1 |
| 3 | Surge | L37: 2 | Crush 3 to Grace (4 damage, most). Flow: G 7 |
| 4 | Grace, fed | L38: 4 hits, two 6s | **Critical**: 4 + 1 + 1 = 6. Overflow 1. Chi 1 |
| 4 | Sam: Tide (Chi 1), fed | L39: 2 hits | **Overflow falls in round 4; the Reservoir breaks** |

After: Tariq 8/13, Grace 7/10, Sam 8/10 (23 of 33, 70%). Chi 1 / 1 / 1. They judge that "about two-thirds" and go straight on, because a Respite now would leave the Substation standing.

**Hour 4: the Substation, the Stoker** (Fire Shell; Guard 2 for Sam). Breath: Tariq 5. Order Sam, Tariq, Grace (Water -> Fire -> Earth).

| Round | Action | Dice | Result |
|---|---|---|---|
| 1 | Sam strikes Stoker: Tide (Chi 0), not fed | L40: 2 hits, two 6s; Tide L41: no change | **Critical**, Shell shattered: 2 + 1 + 2 Trained = 5. Stoker 22. Chi 2 |
| 1 | Tariq strikes pack: Blaze + Chi die (Chi 3), fed | L42: 1 hit | Met Guard 1. 4. Pack 5 (2 Stills) |
| 1 | Grace strikes pack: Chi die (Chi 0), fed | L43: 2 hits, two 6s | **Critical**: 4. Pack 1. Chi 1 |
| 1 | Enemies: draw 1 (23); Swarm 1 to Grace (0); Surge | L44: 2 | Crush 3 to Sam (5 damage). S 5 |
| 2 | Sam: Tide + Chi die (Chi 0), fed by Grace | L45: 2 hits; Tide L46: 3 hits, two 6s | **Critical**: 3 + 1 + 1 + 2 = 7. Stoker 16. Chi 2 |
| 2 | Tariq: Blaze + Chi die (Chi 1), fed | L47: 1 hit | Missed. 4 (Stoker 12). Hit back: T 6, Chi 2 |
| 2 | Grace: Chi die (Chi 0), fed | L48: 2 hits | 3. Stoker 9 |
| 2 | Enemies: draw 1 (10); Swarm 1 to Grace (0); Surge | L49: 2 | Crush 3 to Sam (7 damage). S 2 |
| 3 | Sam: Tide + Chi die (Chi 0), fed | L50: 2 hits; Tide L51: no change | 3. Stoker 7 |
| 3 | Tariq: Blaze + Chi die (Chi 0), fed | L52: 1 hit | Missed. 4 (Stoker 3). Hit back: T 4, Chi 1 |
| 3 | Grace, fed | L53: 2 hits | 3. **Stoker falls in round 3; the Substation breaks** |

The Hunt ends: four Hours spent (Bridge, Respite, Reservoir, Substation). Three Anchors broken; the Greenhouse and the Underpass stand. Nobody has gone Down tonight.

Going into the Heart with no rest: Tariq 4/13, Grace 7/10, Sam 2/10 (13 of 33). Chi 1 / 0 / 0.

### The Heart: the clock tower, Easy
Toughness (5 + 4 x 2) x 3 = **39**; half is 19.5, so 19 or less at dawn drives it off. Pack of 3 Stills (9). Crush 2, Sweep 1. Everyone gains 3 Chi: Tariq 1 + 3 + 4 (Breath) capped at 5, Grace 3, Sam 3. All three Awaken on their first turn: the book says to save it for the Heart (p. 15), and Sam is on 2 Vigor.

| Round | Action | Dice | Result |
|---|---|---|---|
| 1 | Tariq Awakens (Ascendant, Chi 2), strikes Heart: Blaze + Chi die (Chi 0) | L54: 2 hits | Met. 2 x 2 + 2 = 6. Heart 33 |
| 1 | Grace Awakens (Wellspring, Chi 0), strikes pack, fed | L55: 2 hits | 3. Pack 6 (2 Stills) |
| 1 | Sam Awakens (Unbreakable, Chi 0), strikes Heart, fed | L56: 1 hit | Missed. 2 (31). Hit back: no Vigor lost, +1 Chi; Counter 1 (30), +1 Chi (Chi 2) |
| 1 | Enemies: draw 2 (32); Swarm 1 to Sam (Unbreakable: 0); Surge | L57: 3 | Sweep 1. T 3, G 6, S 2 (Unbreakable) |
| 1 | End of round | | Awakenings: 2 rounds left each |
| 2 | Start: Wellspring shares 2 Vigor | | Grace gives both to Tariq: T 5 |
| 2 | Tariq (Ascendant), fed | L58: 1 hit | Missed. 2 + 1 = 3 (29). Hit back: T 3, Chi 1 |
| 2 | Grace strikes pack, fed | L59: 2 hits | 3. Pack 3 (1 Still) |
| 2 | Sam: Tide + Chi die (Chi 0), fed | L60: 2 hits; Tide L61: 4 hits | 5. Heart 24 |
| 2 | Enemies: draw 1 (25); Swarm 1 to Sam (0); Surge | L62: 5 | Heart's Drain: everyone loses 1 Chi. Tariq 0 |
| 3 | Start: Wellspring 2 to Tariq | | T 5 |
| 3 | Tariq (Ascendant), fed | L63: 1 hit | Missed. 3 (22). Hit back: T 3, Chi 1 |
| 3 | Grace strikes Heart, fed | L64: 2 hits | 3. Heart 19 (half or less) |
| 3 | Sam (Unbreakable), fed | L65: 1 hit | Missed. 2 (17); Counter 1 (16). Chi 2 |
| 3 | Enemies: draw 1 (17); Swarm 1 to Sam (0); Surge | L66: 6 | Call: 2 more Stills. Pack 3 + 6 = 9 (3 Stills) |
| 3 | End of round | | All three Awakenings end |
| 4 | Tariq strikes pack: Blaze (Chi 0), fed | L67: 1 hit | 4. Pack 5 (2 Stills) |
| 4 | Grace strikes pack, fed | L68: 2 hits, two 6s | **Critical**: 4. Pack 1. Chi 1 |
| 4 | Sam strikes pack: Chi die (Chi 1), fed. She is on 2 Vigor and the Heart's hit back would put her Down | L69: 3 hits, two 6s | **Critical**: pack destroyed. Chi 1 + 1 + 1 = 3 |
| 4 | Enemies: no Stills; Surge | L70: 4 | Sweep 1. T 2, G 5, S 1. Next round the Storyteller counts it aloud, as p. 23 says: "That's round five. The sky's going grey." |
| 5 | Tariq strikes Heart, fed; Sam Helps (Chi 2) | L71: 1 hit | Missed. 2 (15). Hit back: **Tariq Down** (Chi lost) |
| 5 | Grace **Rallies** Tariq (2 Vigor, acts next round) | | Her Rally is her action; it feeds Sam |
| 5 | Sam: Tide + Chi die (Chi 0), fed | L72: 2 hits; Tide L73: 3 hits | 4. Heart 11 |
| 5 | Surge | L74: 1 | Crush 2 to Sam (4 damage, most). **Sam Down** |
| 6 | Tariq, fed by Sam's last action | L75: 1 hit | Missed. 2 (9). Hit back: **Tariq Down** again |
| 6 | Grace **Rallies** Sam | | |
| 6 | Surge | L76: 1 | Crush 2: Tariq (most damage) is Down; no standing fighter damaged the Heart, so it goes to the most Vigor: Grace, Flow 1. G 4 |
| 7 | Sam strikes, fed by Grace's Rally; Grace Helps (Chi 0) | L77: 1 hit | Missed. 2 (7). Hit back: **Sam Down**; Counter still lands (6) |
| 7 | Grace strikes, not fed (Tariq is Down and keeps his place before her) | L78: 3 hits | 3. Heart 3 |
| 7 | Surge | L79: 3 | Sweep 1. G 3 |
| 7 | End of round 7 | | **Dawn.** |

**Result: Driven off.** The Heart was at 3 of 39 when the sun came up: three points from a win.

### Epilogue (book minutes: 8)
The Driven off epilogue (p. 23): the Unmade pulls back and takes the old greenhouse with it; nobody in the city remembers it was there. Ruth: Sam lost the Tuesday class's photograph from the clubhouse wall. Dev: Tariq will leave the grill on all night, every night, "in case". Ellie: Grace's tram line now ends one stop early.

### Night 1 timing (book minutes)
Prologue 12, First Clash 10, Hour 1 25, Respite 5, Hour 3 22, Hour 4 20, Heart 40, Epilogue 8: **about 2 hours 20 minutes of play**, plus 35 minutes of setup. Inside the book's "about three hours" (p. 5), with the Hunt running a little faster than the 25 minutes an Hour the book suggests, because every Warden fell by round 4.

## 3. Night 2: a night built from the Ch 9 tables, Standard

The same three players keep their fighters (p. 5: "you can keep your fighters for another night, but nothing else carries over"). Everyone starts again at full Vigor (13 / 10 / 10), 2 Chi and an unused Awakening.

### Building the night (book minutes: 6). Every table rolled.

| Table (pp. 26-27) | Roll | Result |
|---|---|---|
| First Clash | L80: 3 | A 24-hour supermarket: the security monitors show grey shoppers who aren't there |
| Wood Shell (shattered by Metal) | L81: 5 | The cemetery's yew avenue: **the Keeper**, a hedge cut into the shape of a man |
| Fire Shell (Water) | L82: 2 | The night market's grills: **the Cook**, smoke and skewers and still coals |
| Earth Shell (Wood) | L83: 4 | The multi-storey car park: **the Ramp**, concrete levels folded into a giant |
| Metal Shell (Fire) | L84: 6 | The shopping centre's escalators: **the Stair**, steel steps coiled like a spine |
| Water Shell (Earth) | L85: 4 | The canal lock: **the Lock-Keeper**, held-back water in a gate's shape |
| Sign, Wood Anchor | L86: 5 | Colour draining out of everything, street by street |
| Sign, Fire Anchor | L87: 1 | Rain hanging in the air, drop by drop |
| Sign, Earth Anchor | L88: 3 | Shadows walking away from the people who cast them |
| Sign, Metal Anchor | L89: 5 (taken), L92: 1 (taken), L94: 4 | Sound arriving late |
| Sign, Water Anchor | L90: 5 (taken), L93: 6 | A crowd frozen mid-step, every face turned towards the Anchor |
| Heart | L91: 6 | In the dome of the old observatory, where the stars have stopped |

The four-step list on p. 26 was easy to follow and every result was usable. Standard: Heart Crush 4, Sweep 2.

### Prologue (book minutes: 6)
The Prologue on p. 16 asks for "the moment their element woke", which these fighters already did last night. The table used a quick variant (issue M5): each player said where their fighter was when the clocks stopped again.

### First Clash: the supermarket (book minutes: 9)
Pack of 6 Stills (18). Tariq: Breath, Chi 5.

| Round | Action | Dice | Result |
|---|---|---|---|
| 1 | Tariq: Blaze + Chi die (Chi 3) | L95: 1 hit | 3. Pack 15 |
| 1 | Grace: Chi die (Chi 1), fed | L96: 4 hits | 5. Pack 10 |
| 1 | Sam: Chi die (Chi 1), fed | L97: 1 hit | 2. Pack 8 (3 Stills) |
| 1 | Swarm 2 to Grace | | Flow: G 9 |
| 2 | Tariq: Blaze + Chi die (Chi 1), fed | L98: 1 hit | 4. Pack 4 |
| 2 | Grace: Chi die (Chi 0), fed | L99: 4 hits, two 6s | **Critical**, pack destroyed. Chi 1. **Won in round 2.** |

### The Hunt
Same plan as Night 1: break the Metal, Fire and Water Shells, rest when needed.

**Hour 1: the escalators, the Stair** (Metal Shell; Guard 2 for Tariq). Tariq: Chi 5.

| Round | Action | Dice | Result |
|---|---|---|---|
| 1 | Tariq strikes Stair: Blaze + Chi die (Chi 3) | L100: 0 hits | No damage, no shatter. Hit back: T 11, Chi 4 |
| 1 | Grace strikes pack: Chi die (Chi 0), fed | L101: 1 hit | 2. Pack 7 |
| 1 | Sam strikes pack: Chi die (Chi 0), fed | L102: 3 hits, two 6s | **Critical**: 3 + 1 + 1 + 2 = 7. Pack destroyed. Chi 2 |
| 1 | Surge | L103: 4 | Sweep 1: T 10, G 8, S 9 |
| 2 | Tariq: Blaze + Chi die (Chi 2), fed | L104: 2 hits | Met Guard 2. 5, **Shell shattered**. Stair 22 |
| 2 | Grace, fed | L105: 1 hit | Missed. 2 (20). Hit back, Flow: G 7, Chi 1 |
| 2 | Sam: Tide + Chi die (Chi 0), fed | L106: 2 hits; Tide L107: 3 hits | 4. Stair 16 |
| 2 | Surge | L108: 6 | Call: 2 Stills form a new pack (6) |
| 3 | Tariq: Blaze + Chi die (Chi 0), fed | L109: 1 hit | Missed. 4 (12). Hit back: T 8, Chi 1 |
| 3 | Grace strikes pack: Chi die (Chi 0), fed | L110: 0 hits | Pack hits back for 1; Flow makes it 0, but she still gains 1 Chi |
| 3 | Sam strikes pack, fed | L111: 1 hit | 2. Pack 4 (2 Stills) |
| 3 | Enemies: draw 2 (Stair 14); Swarm 1 to Grace (0); Surge | L112: 6 | Call again: pack 4 + 6 = 10 (4 Stills) |
| 4 | Tariq: Blaze (Chi 0), fed | L113: 3 hits | 6. Stair 8 |
| 4 | Grace: Chi die (Chi 0), fed | L114: 2 hits, two 6s | **Critical**: 4. Stair 4. Chi 1 |
| 4 | Sam, fed | L115: 0 hits | Hit back: S 7. Counter 1 (Stair 3), Chi 2 |
| 4 | Enemies: draw 4 (Stair 7); Swarm 2 to Grace (Flow 1: G 6); Surge | L116: 2 | Crush 3 to Tariq (6 damage): T 5 |
| 4 | End of round 4 | | **Long fight**: the Storyteller crosses off a second Hour. The group stays in |
| 5 | Tariq, fed; Sam Helps (Chi 1) | L117: 0 hits | Hit back: T 3, Chi 1 |
| 5 | Grace: Chi die (Chi 0), fed | L118: 0 hits | Hit back, Flow: G 5, Chi 1 |
| 5 | Sam: Tide (Chi 0), fed | L119: 2 hits; Tide L120: 3 hits, two 6s | **Critical**: 3 + 1 + 1 + 2 = 7. **The Stair falls in round 5; the escalators break.** Chi 2 |

Two Hours spent. Tariq 3/13, Grace 5/10, Sam 7/10 (15 of 33, 45%). Chi 1 / 1 / 2.

**Hour 3: Respite.** The book's "rest at about two-thirds" says they are past due. Everyone to full: 13 / 10 / 10.

**Hour 4: the night market, the Cook** (Fire Shell; Guard 2 for Sam). The Storyteller warns that a long fight now would leave an Hour owed and bring dawn a round early. Tariq: Chi 1 + 4 = 5. Order Sam, Tariq, Grace.

| Round | Action | Dice | Result |
|---|---|---|---|
| 1 | Sam strikes Cook: Tide + Chi die (Chi 0) | L121: 2 hits; Tide L122: 3 hits, two 6s | **Critical**, Shell shattered: 3 + 1 + 2 = 6. Cook 21. Chi 2 |
| 1 | Tariq strikes pack: Blaze + Chi die (Chi 3), fed | L123: 1 hit | 4. Pack 5 |
| 1 | Grace strikes pack: Chi die (Chi 0), fed | L124: 3 hits, two 6s | **Critical**: 5. Pack destroyed. Chi 1 |
| 1 | Surge | L125: 2 | Crush 3 to Sam (6 damage): S 7 |
| 2 | Sam: Tide + Chi die (Chi 0), fed | L126: 2 hits; Tide L127: 3 hits, two 6s | **Critical**: 3 + 1 + 1 + 2 = 7. Cook 14. Chi 2 |
| 2 | Tariq: Blaze + Chi die (Chi 1), fed | L128: 3 hits, two 6s | **Critical**: 3 + 2 + 1 + 1 = 7. Cook 7. Chi 2 |
| 2 | Grace: Chi die (Chi 0), fed | L129: 0 hits | Hit back, Flow: G 9, Chi 1 |
| 2 | Surge | L130: 1 | Crush 3. Sam and Tariq tied on 7; Tariq acted last of the two (p. 20): T 10 |
| 3 | Sam: Tide + Chi die (Chi 0), fed | L131: 2 hits; Tide L132: 3 hits | 4. Cook 3 |
| 3 | Tariq: Blaze + Chi die (Chi 0), fed | L133: 3 hits | **The Cook falls in round 3; the night market breaks.** (Critical: Chi 1) |

The Hunt ends. Broken: the escalators and the night market. Standing: the yew avenue, the car park, the canal lock (three). Going in: Tariq 10/13, Grace 9/10, Sam 7/10 (26 of 33). Chi 1 / 1 / 0.

### The Heart: the observatory dome, Standard
Toughness (5 + 4 x 3) x 3 = **51**; half is 25.5. Pack of 3 Stills (9). Crush 4, Sweep 2. Dawn after round 7 (no Hour owed). Everyone gains 3 Chi: Tariq 5 (capped), Grace 4, Sam 3.

Having watched all three Awakenings run out together on Night 1, the players stagger them: Tariq and Sam Awaken at once; Grace holds Wellspring.

| Round | Action | Dice | Result |
|---|---|---|---|
| 1 | Tariq Awakens (Ascendant, Chi 2); Blaze + Chi die (Chi 0) | L134: 1 hit | Missed. 2 + 2 = 4 (47). Hit back: T 8, Chi 1 |
| 1 | Grace: Bulwark on Tariq (Chi 3), strikes pack, fed | L135: 2 hits | 3. Pack 6 (2 Stills) |
| 1 | Sam Awakens (Unbreakable, Chi 0), strikes Heart, fed | L136: 1 hit | Missed. 2 (45). Hit back: no loss; Counter 1 (44). Chi 2 |
| 1 | Enemies: draw 2 (46); Swarm 1 to Sam (0); Surge | L137: 5 | Heart's Drain: everyone loses 1 Chi. T 0, G 2, S 1. Grace can no longer afford Wellspring. The Bulwark lapses unused |
| 2 | Tariq (Ascendant), fed; Sam Helps (Chi 0) | L138: 2 hits | Met. 4 + 1 = 5. Heart 41 |
| 2 | Grace strikes pack, fed (saving Chi) | L139: 3 hits, two 6s | **Critical**: 5. Pack 1 (1 Still). Chi 3 again |
| 2 | Sam (Unbreakable), fed | L140: 0 hits | Hit back: no loss; Counter 1 (40). Chi 2 |
| 2 | Enemies: draw 1 (41); Swarm 1 to Sam (0); Surge | L141: 2 | Crush 4 to Tariq (5 damage): T 4 |
| 3 | Tariq (Ascendant), fed; Sam Helps (Chi 1) | L142: 3 hits, two 6s | **Critical**: 3 x 2 + 1 fed + 1 Critical = 7. Heart 34. Chi 1 |
| 3 | Grace Awakens (Wellspring, Chi 0), strikes Heart, fed | L143: 2 hits | 3. Heart 31 |
| 3 | Sam (Unbreakable): Tide (Chi 0), fed | L144: 0 hits; Tide L145: 2 hits | 3. Heart 28 |
| 3 | Enemies: draw 1 (29); Swarm 1 to Sam (0); Surge | L146: 3 | Sweep 2: T 2, G 7, S 7 (Unbreakable) |
| 3 | End of round | | Ascendant and Unbreakable end; Wellspring has 2 rounds left |
| 4 | Start: Wellspring 2 Vigor to Tariq | | T 4 |
| 4 | Tariq: Blaze (Chi 0), fed | L147: 1 hit | Missed. 4 (25: half or less). Hit back: T 2, Chi 1 |
| 4 | Grace, fed | L148: 0 hits | Hit back, Flow: G 6, Chi 1 |
| 4 | Sam, fed | L149: 1 hit | Missed. 2 (23); hit back: S 5; Counter 1 (22). Chi 2 |
| 4 | Enemies: draw 1 (23); Swarm 1 to Grace (0); Surge | L150: 5 | Drain: everyone loses 1 Chi. T 0, G 0, S 1 |
| 5 | Start: Wellspring 2 to Tariq | | T 4. "Round five. The stars are going grey." |
| 5 | Tariq, fed; Sam Helps (Chi 0) | L151: 2 hits, two 6s | **Critical**: 2 + 1 + 1 = 4. Heart 19. Chi 1 |
| 5 | Grace, fed | L152: 1 hit | Missed. 2 (17). Hit back, Flow: G 5, Chi 1 |
| 5 | Sam, fed | L153: 5 hits, three 6s | **Critical**: 5 + 1 + 1 + 2 = 9. Heart 8. Chi 2 |
| 5 | Enemies: draw 1 (9); Swarm 1 to Grace (0); Surge | L154: 1 | Crush 4 to Sam (9 damage): S 1 |
| 5 | End of round | | Wellspring ends |
| 6 | Tariq: Blaze (Chi 0), fed; Sam and Grace both Help (7 dice, the most a roll can be) | L155: 0 hits on seven dice | Hit back: T 2, Chi 1 |
| 6 | Grace, fed | L156: 2 hits, two 6s | **Critical**: 4. Heart 5. Chi 1 |
| 6 | Sam: Tide (Chi 0), fed; Grace Helps (Chi 0) | L157: 2 hits; Tide L158: no change | 3. Heart 2 |
| 6 | Enemies: draw 1 (3); Swarm 1 to Grace (0); Surge | L159: 2 | Crush 4 to Grace (4 damage), Flow 3: G 2 |
| 7 | Tariq: Blaze (Chi 0), fed | L160: 2 hits | 5. **The Heart falls in round 7.** |

**Result: Win.** Going into round 7 the fighters were on 2, 2 and 1 Vigor. Had Tariq missed and the others not found 3 damage, a Sweep 2 at the end of round 7 would have put all three Down before dawn: a loss with the Heart at 3 of 51. The table felt that.

### Epilogue (book minutes: 8)
The Win epilogue (p. 23): the clocks start, all at once, a second late, and above the observatory the stars begin to turn. Sam calls her granddaughter. Tariq turns the grill off for the first time in two nights. Grace drives the first tram of the morning, on time.

### Night 2 timing (book minutes)
Build 6, Prologue 6, First Clash 9, Hour 1 (long fight, five rounds) 32, Respite 5, Hour 4 18, Heart 42, Epilogue 8: **about 2 hours 5 minutes**.

## 4. Issues

Severity: **blocker** (the table cannot go on without inventing a rule for the core flow), **confusing** (the book answers it, but a newcomer is likely to read it wrongly or stall), **minor** (a gap, a sheet gap or a balance flag that the table settled quickly). Page numbers are the built PDF's.

### C1. The "helping pick" sentence reads like a building rule (confusing, p. 7)
> "A good group can shatter at least two or three different Shells (Chapter 6), and each fighter has at least one pick that helps the others: Help is open to everyone, but so are Guardian, Medic, Wellspring, Harmony and Wood’s Renewal."

Dev built Fire, Breath, Tough, Ascendant and asked whether his fighter was "allowed", because "each fighter has at least one pick that helps the others" reads as a requirement, and none of his four picks is on the list. The sentence also calls Help (which is not a pick) and Wood's Renewal (a technique, not one of the four picks) "picks". Setup stalled for about three minutes while the table decided whether it was a rule.
- **Suggested fix:** make it plainly advice and separate the two ideas: "Advice, not a rule: a group does best when it can shatter two or three different Shells (Chapter 6) and when everyone has a way to help the others. Anyone can Help (Chapter 3); Guardian, Medic, Wellspring, Harmony and Wood’s Renewal help more."
- **Ruling tonight:** it is advice. Dev keeps his picks.

### M1. Rolled picks against chosen picks: what counts as "already taken"? (minor, p. 7)
> "Everyone chooses all four picks, then any clash is settled pick by pick: both players roll a die and the higher roll keeps it" ... "Rather leave it to the dice? Roll a die for each pick, counting down the lists in this chapter (for elements, reroll a 6), and reroll anything already taken."

Ellie's style roll landed on Counter, which Ruth had announced for Sam but which was not yet "settled". The book does not say whether a pick another player has chosen counts as taken (reroll) or is a clash (roll off).
- **Suggested fix:** "If you roll, roll after everyone else has chosen, and reroll anything another fighter has."
- **Ruling tonight:** picks other players have announced count as taken; Ellie rerolled (L5).

### M2. No place for tonight's ring; the "Feeds" box invites the wrong answer (minor, pp. 28 and 12)
> Fighter sheet box: "Feeds · Shatters". Ch 2, Earth: "Feeds: Metal". Ch 3: "Any element nobody has is skipped, so the ring always closes, however many of you there are."

At this table Earth fed Water and Water fed Fire, not Metal and Wood. Ruth and Ellie first copied the Ch 2 statline into the box. Later, at the Heart (Night 1, rounds 6 and 7, with two fighters Down and Rallied), the table had to reconstruct who acted last and whether a Down fighter was blocking the feed, with nothing on any sheet to look at.
- **Suggested fix:** a line on the Night sheet, "Tonight’s ring: ___ → ___ → ___ → ___ → ___ (skip missing elements)", and on the fighter sheet change the box to "Shatters" plus "Fed by (tonight)".
- **Ruling tonight:** the Storyteller wrote "Fire → Earth → Water → Fire" in the Night sheet margin.

### M3. Crush when nobody damaged the Warden or Heart this round (minor, p. 20; answered on p. 29)
> Surge table: "3 Harm to the fighter who dealt it the most damage this round". Below it: "Crush on a Down fighter: it goes to the standing fighter who dealt it the next most damage this round; if no standing fighter damaged it, to the fighter with the most Vigor."

Twice the whole group dealt the Warden or Heart nothing in a round (Night 1 Heart round 4: everyone cleared the pack; Night 2 Hour 1 round 1: Tariq rolled no hits and the others struck the pack). Chapter 6 only gives the "most Vigor" fallback inside the bullet about a Down fighter. The Night sheet does say it ("Crush: most damage this round, standing fighters only (else most Vigor)"), so the Storyteller found it there. Both Surges came up Sweep, so the ruling was not applied, but a first-time Storyteller should not have to look in two places.
- **Suggested fix:** give it its own bullet in Ch 6: "If no standing fighter damaged it this round, a Crush goes to the fighter with the most Vigor."
- **Ruling tonight:** the fighter with the most Vigor (the Night sheet's wording).

### M4. The Night sheet's damage boxes have no names (minor, p. 29)
> "Damage to the Warden or Heart this round, by fighter (for the Crush). Clear each round." (five blank boxes)

Five boxes, no labels. With three fighters the Storyteller pencilled initials above them; with five and lots of rubbing out, the names would smudge away.
- **Suggested fix:** a small printed name line at the top of each box.
- **Ruling tonight:** initials in pencil.

### M5. A second night with kept fighters: what resets, and what is the Prologue? (minor, pp. 5 and 16)
> "Every night stands alone: you can keep your fighters for another night, but nothing else carries over." Prologue: "Each player describes, in a few sentences, the moment their element woke".

The players asked whether they start Night 2 at full Vigor with 2 Chi and an unused Awakening. The book implies yes ("You start the night with 2 Chi", p. 14; "Once per night", p. 14; starting Vigor "when the night begins", p. 7), but never says it, and "the moment their element woke" doesn't fit fighters who woke last week.
- **Suggested fix:** one sentence in Ch 5 or Ch 7: "With kept fighters, everyone starts the night at full Vigor and 2 Chi with their Awakening unused; in the Prologue, each player says where they were when the clocks stopped again."
- **Ruling tonight:** exactly that.

### M6. The Night sheet leaves out the numbers the Storyteller needs on every Strike (minor, p. 29)
The Night sheet carries the Toughness formulas and the Surge table, but not any enemy's **Guard** or **Harm** (Stills 1 and 1, 3 Toughness each; Warden 2, or 3 with its Shell, Harm 2; Heart 2 and 2), the pack sizes (2 Stills per fighter in the First Clash, 1 per fighter at an Anchor and the Heart) or how a Shell shatters (its breaker's first hit, or half Toughness). Every Strike needs the Guard and every hit back needs the Harm, so the Storyteller kept Ch 6 (pp. 19-20) open beside the sheet all night. The At the Table card does not have them either.
- **Suggested fix:** one strip on the Night sheet: "Stills: Guard 1, Harm 1, 3 Toughness each (First Clash 2 per fighter; Anchor and Heart 1 per fighter). Warden: Guard 2 (3 with its Shell), Harm 2. Heart: Guard 2, Harm 2. Shell: shattered by its breaker’s first hit, or at half Toughness."
- **Ruling tonight:** Chapter 6 open beside the sheet.

### M7. Player-chosen Swarm targets plus Flow make the Stills' attacks almost harmless (minor; balance flag for the simulator; pp. 19 and 8)
> Swarm: "deals Harm equal to half its Stills (rounded up), as one blow, to one fighter who isn’t Down, of the players’ choice." Flow: "Lose 1 less Vigor each time, except from a Sweep."

Every Swarm across both nights went to Grace (Flow) or to Sam while she was Unbreakable. **18 Swarms dealt a total of 3 Vigor**; most were a 1 that Flow turned into 0. The pack's hit backs (Harm 1) also cost Grace nothing, and she still gained 1 Chi from each. The Stills mattered only by drawing Toughness back into their master, which was real (four Stills drew 4 a round and caused Night 2's long fight). This is not a gap in the rules, and it was obvious to brand-new players within one round.
- **Suggested fix:** check that the simulator sends every Swarm to a Flow (or Unbreakable) fighter, as players will. If the numbers move, options are: Flow doesn't reduce Swarms (as with Sweeps), or the Swarm goes to the fighter who last struck the pack, or to the fighter with the most Vigor.
- **Ruling tonight:** as written.

**Not issues, but questions the book answered quickly in play:** Blaze counting on a roll that missed the Guard ("Bonuses count only if you rolled at least one hit", p. 11); a Shell shattered by a hit on a roll that still missed the Guard ("The Strike is judged against the Guard you rolled against", p. 12); Ascendant with Blaze and a Critical ("Double your hits first, then add bonuses", p. 15); a Crush tie ("the fighter among them who acted last that round", p. 20); a Crush whose top damager is Down (p. 20); feeding past a Down fighter ("A Down fighter keeps their place in the ring", p. 12); Counter damage landing as Sam went Down (p. 8); Breath at the Heart ("with Breath’s 4, still no more than 5", p. 17).

## 5. What worked

- **The core roll.** "Roll five dice, 5 or 6 is a hit, meet the Guard or be hit back" was in all three newcomers' hands by their third Strike. Nobody needed the chapters for a plain Strike after the First Clash.
- **"Resolving a Strike, in order" (p. 12)** settled every stacking question in one read: Tide before counting, Counter after the hit back, Critical Chi last, Trained on top. The same line on the At the Table card was the most-read line of both nights.
- **Shells and the ring together made the Hunt a real choice.** The players picked the three Anchors their elements break without prompting, and found on their own that the ring can start with whoever breaks the Shell.
- **The clocks.** The Storyteller's telegraph ("End of round four. If this Warden is still up, it's costing you an Hour", p. 23) turned Night 2's long fight into a felt decision, and the Hour cross-offs on the Night sheet were never in doubt.
- **The targeting rules** for the Crush (ties go to whoever acted last; a Down top damager passes it on) resolved instantly every time they came up.
- **Counter with Unbreakable at the Heart** was the best moment at the table: Ruth started rooting for her own misses.
- **Chapter 9.** Rolling every table took six book minutes; every result was usable, and the "reroll a sign another Anchor already has" rule was clear. The built night felt as finished as the ready-made one.
- **The fighter sheet's 13 Vigor circles** exactly fitted a Tough fighter at three players, and the Awakening box with three round boxes counted Awakenings down with no mistakes.
- **Length.** Night 1 came in at about three hours including setup, as p. 5 promises; Night 2 at a little over two hours.

## 6. How it felt

- **Was losing a real risk?** On **Easy** (Night 1) the Heart was at half or less from round 3, so a loss needed all three fighters Down. By rounds 6 and 7 two were Down and Grace stood alone on 4 Vigor with Flow: possible, but remote. The real tension on Easy was win against driven off, and it came down to 3 points of Toughness. On **Standard** (Night 2) the risk was real and the table felt it: in round 7 the fighters were on 2, 2 and 1 Vigor, and if Tariq had missed (about one roll in eight) and the others had not found 3 damage, a Sweep of 2 would have put everyone Down before dawn for a loss, with the Heart on 3 of 51.
- **Was Chi spent?** Constantly. Outside the Heart's +3, almost nobody ever held more than 2 Chi. Tariq's Breath paid for Blaze and a Chi die in the first two rounds of every fight; Sam spent hers on Tide whenever she had it. Grace (Earth) spent hers on Chi dice and used Bulwark once in two nights, and that one lapsed unused: Bulwark is bought on your own Strike, before the Crush target is known and before the Surge is rolled, while a Chi die always does something. The Designer's Note "spend it" (p. 14) matched what the table did anyway.
- **Dominant tactics.** (1) Every Swarm to the Flow fighter (issue M7): the only one that felt like a hole. (2) Walking the ring costs nothing for a group of three: every Strike except the first of each fight was fed, both nights, except when a fighter was Down. Feeding became bookkeeping rather than a choice; it never felt wrong, but it never felt like a decision either. (3) Whoever breaks the Shell goes first, and the ring starts with them. (4) The big hitter clears the pack in round 1 to stop the draw. (3) and (4) felt like good play, not exploits.
- **Awakenings.** On Night 1 all three Awakened in round 1 of the Heart, as the book suggests; all three ran out together at the end of round 3, and rounds 4 to 7 were three tired fighters with no Chi. On Night 2 the players staggered them and it felt much better. Wellspring felt the weakest: Awakened on your turn, it shares twice (4 Vigor in all), and a Heart Drain took the Chi Grace was saving to pay for it.
- **Rally at the Heart.** A Rally stands a fighter up on 2 Vigor; the Heart's hit back is 2. On Night 1 Tariq was Rallied and went straight back Down on his next Strike. Rallying felt like a wasted action, though the arithmetic on whether it was right was close.
- **The First Clash** was over in two rounds both nights and nobody was hit back in it, so the hit back, the heart of "every fight in Nightwake is a trade" (p. 11), was first met at the first Anchor. It taught the roll and the Swarm, not the trade.
- **Pace.** Most Anchor fights ended in round 3 or 4, a little quicker than the book's 25 minutes an Hour. The Heart took about 40 minutes both nights, as p. 16 says.

## 7. Results

| | Night 1 | Night 2 |
|---|---|---|
| Night | The Night the Clocks Stopped (Ch 8) | Built from the Ch 9 tables |
| Difficulty | Easy | Standard |
| First Clash | Won in round 2 | Won in round 2 |
| Hours | Bridge (won, round 4); Respite; Reservoir (won, round 4); Substation (won, round 3) | Escalators (won, round 5: long fight, two Hours); Respite; night market (won, round 3) |
| Anchors broken | 3 of 5 | 2 of 5 |
| Heart Toughness | 39 (half 19.5) | 51 (half 25.5) |
| Vigor going into the Heart | 13 of 33 | 26 of 33 |
| Fighters Down | None in the Hunt; at the Heart Tariq twice, Sam twice | None all night |
| Awakenings used | All three, round 1 of the Heart | Tariq and Sam round 1, Grace round 3 |
| **Ending** | **Driven off**: Heart on 3 of 39 at dawn | **Win**: Heart falls in round 7 |
| Play time (book minutes) | about 2 h 20 (plus 35 setup) | about 2 h 5 (plus 6 to build) |

160 dice lines in all (L1-L160), every one from the script, none rerolled except where a rule allows it (Tide, the pick reroll and the sign reroll).

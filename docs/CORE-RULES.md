# Nightwake: core rules v0.1

*One night. Five elements. Break the Heart before dawn.*

**The table:** 3–5 players and a Storyteller, ages 12+, about 3 hours plus setup. Each player needs 7 six-sided dice; the Storyteller needs a few. **Approved by Richard on 2026-10-22**, then revised after the version 0.1 review (`review/v0.1/`; `docs/DESIGN.md` D37–D40). The rulebook chapters (`book/src/chapters/`) are the rules; this page is their one-page summary and must match them. Every number here was tested by `sim/` (results in §11).

## §1 The roll
- Roll **5 dice**. Each **5 or 6 is a hit**.
- **Bonus dice:** at most **+2** on one roll from all sources together, so never more than 7 dice.
- In a fight you always roll against an enemy's **Guard**. There are no opposed rolls.
  - **Guard met** (hits at least the Guard): a clean strike.
  - **Fewer hits than its Guard:** the enemy **hits you back**. You lose Vigor equal to its **Harm**, then gain 1 Chi (unless you went Down).
  - **Critical:** you met the Guard **and** rolled two or more 6s. You deal +1 damage and gain 1 Chi.
- **Damage** = your hits, plus any bonuses. Bonuses count only if you rolled at least one hit.
- **A roll's result comes first.** If your strike destroys the enemy, it can't hit back.
- A strike is judged against the Guard you rolled against: a Shell that shatters during it lowers the Guard from the next roll.

## §2 Fighters
Each fighter takes one **element**, one **fighting style**, one **perk** and one **awakening**. No two fighters in a group share any of them. Everyone picks all four, then clashes are settled pick by pick: both roll a die, the higher keeps it, and the other changes only that pick. Picks can also be rolled (reroll anything taken). The five ready-made fighters (§10) skip this step. A late fighter makes all four picks from what is left, starts with the Vigor the others began with (+3 if Tough) and 2 Chi, and joins at the next fight; five fighters at most. Every fighter starts with **2 Chi** (maximum 5) and the Vigor in §10.

**Elements.** Your element fixes your place in the two cycles (§3, §4) and gives you a **technique**. Spend 1 Chi as you declare a Strike to use it, once per strike.

| Element | Technique |
|---|---|
| **Wood** (growth; wind is Wood's) | **Renewal:** after the roll, you or an ally who isn't Down regains 1 Vigor. |
| **Fire** | **Blaze:** +2 damage if you hit. |
| **Earth** | **Bulwark:** choose a fighter. The next time they would lose Vigor this round, they lose 3 less. One Bulwark at a time. |
| **Metal** | **Edge:** each 6 counts as three hits. |
| **Water** | **Tide:** after the roll, reroll up to three dice that aren't hits. |

| Fighting style | Effect |
|---|---|
| **Brawler** | +1 damage when you meet the Guard. |
| **Guardian** | Once per round, when another fighter would lose Vigor, you may lose it instead. If you lose 2 or more Vigor this way, gain 2 Chi (not if it puts you Down). The fighter you saved still gains Chi for a hit back. |
| **Sweeper** | When you meet the Guard, also deal 1 damage to one other enemy, if there is one (not a hit: it never counts as the Shell's first hit). |
| **Counter** | When an enemy hits you back, deal it 1 damage and gain 1 more Chi. The damage lands even if the hit back puts you Down. |
| **Flow** | Lose 1 less Vigor each time, except from a Sweep. |
| **Breath** | Gain 4 Chi at the start of every fight. |

| Perk | Effect |
|---|---|
| **Tough** | +3 maximum Vigor. |
| **Medic** | After each fight (once Down fighters have stood), share out 2 Vigor among the fighters. |
| **Lucky** | Once per fight, after you roll, reroll every die that isn't a hit. |
| **Quick** | Before the first round of each fight, take a free Strike with +1 die. It can't be hit back. It isn't a turn and isn't part of round 1. |
| **Stubborn** | The first time in each fight you would go Down, stay up with 2 Vigor. |
| **Trained** | Your Criticals deal 2 more damage and give 1 more Chi. |

| Awakening (§7) | While it lasts |
|---|---|
| **Ascendant** | Each of your hits deals 2 damage. |
| **Unbreakable** | You lose no Vigor. |
| **Wellspring** | At the start of each round, share out 2 Vigor. A Down fighter given any stands up. |
| **Tempest** | You take two actions each round, and your strikes can't be hit back. |
| **Seal** | The Warden or Heart can't Surge. Holding the Seal is your action each round. Lasts 2 rounds. |
| **Harmony** | At the start of each round, share out 3 Chi. |

## §3 Fights
**A round** has three steps:
1. **Fighters act** one at a time, in any order the players like (the Storyteller settles disagreements).
2. **Enemies act.** The Warden or Heart draws on its Stills (§4). Then each pack Swarms, then the Warden or Heart Surges.
3. **End of round.** Awakenings count down, then check the clocks (§8, §9), then the group may withdraw from an Anchor.

A fight ends the moment the enemy falls or every fighter is Down, even mid-step. There is no movement: anyone can strike any enemy.

**Actions.** Each fighter takes one action:
- **Strike** an enemy (§1).
- **Rally** a Down fighter. They stand with 2 Vigor (no roll) and act from the next round.

**Free, not actions:**
- a **Chi die**: spend 1 Chi for +1 die on your own roll (one per roll; nobody spends Chi on a die past the cap);
- **Help**: spend 1 Chi to give another fighter's roll +1 die, once per roll for each helper (Down fighters can't Help);
- your element's **technique**.

**Feeding (the generating cycle).** The fighters' elements form a ring in cycle order: Wood → Fire → Earth → Metal → Water → back to Wood. Any element nobody has is skipped, so the ring always closes. A strike deals **+1 damage** (if it hits) when the fighters' action just before it in this fight was taken by the fighter before you in the ring.
- Any fighter's action counts, including Rally, holding a Seal, Quick's free Strike, and the last fighter's action of the round before. The enemies' steps don't count.
- A Down fighter keeps their place: the fighter after them can't be fed until they act again.
- Two actions in a row by the same fighter don't feed.

**Resolving a strike, in order:**
1. Declare the technique and bonus dice.
2. Roll.
3. Reroll (Tide first, then Lucky).
4. Count hits.
5. Deal damage (and Sweeper's).
6. Apply Renewal.
7. The enemy hits back (and Counter answers).
8. Gain Chi for a Critical.

## §4 Enemies
**Stills** come in a **pack**, which is one target: Guard 1, Harm 1, **3 Toughness per Still**. Damage carries over from one Still to the next.
- **Swarm:** at the end of each round, a pack deals Harm equal to half its Stills (rounded up) to one fighter who isn't Down, of the players' choice.
- **Drawing on the Stills:** at the end of each round, the Warden or Heart regains 1 Toughness for each of its Stills still standing. It never goes above its starting Toughness.
- **When a Warden or the Heart falls, its Stills crumble** and the fight is won.

**Wardens** guard the Anchors: Guard 2, Harm 2, Toughness 9 per fighter.
- **Shell:** each Warden wears a Shell of one element, a different one at each Anchor. The Shell adds +1 to its Guard.
- The element that **shatters** that Shell ignores it, and its first hit shatters it. This is the overcoming cycle: Wood shatters Earth, Earth shatters Water, Water shatters Fire, Fire shatters Metal, Metal shatters Wood.
- A Shell also shatters once the Warden is at half its Toughness or less. A shattered Shell stays shattered.

**The Heart:** Guard 2, Harm 2.
- Its Toughness is (5 + 4 per Anchor still standing) × fighters. With five fighters, use 6 instead of 5.
- Its Toughness is fixed when the fight begins.
- Its Crush and Sweep come from the Difficulty table (§10).

**Surge:** at the end of each round, the Warden or Heart rolls a d6.

| d6 | Warden | Heart |
|---|---|---|
| 1–2 **Crush** | 3 Harm to the fighter who dealt it the most damage this round | the Difficulty table's Crush, to the same fighter |
| 3–4 **Sweep** | every fighter loses 1 Vigor | every fighter loses the Difficulty table's Sweep |
| 5 **Drain** | the fighter with the most Chi loses 2 Chi | every fighter loses 1 Chi |
| 6 **Call** | 2 more Stills join its pack (or form a new one), up to fighters + 2 Stills | the same |

- **Crush:** if that fighter is Down, the standing fighter who dealt it the next most; if no standing fighter damaged it, the fighter with the most Vigor.
- **Ties** (for a Crush or a Drain): the fighter who acted last that round.
- **A Drain that finds no Chi** Crushes instead (the Heart's, only when no fighter has any).
- **A Call with a full pack** does nothing. **A Sealed** Warden or Heart still draws on its Stills; if the Seal's holder goes Down before the Surge, it Surges.

## §5 Vigor and Down
- **Protections, in order:** when you would lose Vigor, a Guardian may take it first, then Bulwark applies, then Flow, then Unbreakable.
- **At 0 Vigor you are Down.** You can't act or Help, **you lose all your Chi**, and your Awakening ends. Harm past 0 is lost.
- **A Down fighter is out of play:** nobody can choose them for anything (Swarm, Bulwark, Renewal, Help, a share of Chi); they take no losses, gain no Chi, and their style, perk and technique do nothing until a Rally or a Wellspring share stands them up.
- **After a fight,** Down fighters stand with 1 Vigor.
- Vigor carries from fight to fight. Nothing heals except what these rules say, and nothing goes above your maximum Vigor. When you share something out, you may keep some.

## §6 Chi
- **Start and limit:** 2 at the start of the night, maximum 5. Any Chi past 5 is lost.
- **Gain:**
  - 1 when you are hit back (even if a Guardian takes the loss);
  - 1 on a Critical;
  - **3 for every fighter when the Heart fight begins**;
  - Breath, Guardian, Counter, Trained and Harmony give more.
- **Spend:** a Chi die, Help or a technique cost 1 each; Awakening costs 3.
- **Drains** take Chi away.
- Chi is worth nothing at dawn: spend it.

## §7 Awakening
- **Once per night,** at the start of your turn, spend 3 Chi to Awaken.
- **When:** from the moment the first fighter goes Down tonight, or once the Heart fight begins.
- **How long:** 3 rounds, counting the round you Awaken (Seal lasts 2). It ends early if you go Down or the fight ends.

## §8 The night
1. **Prologue.** Each player describes the moment their element wakes. Then comes the **First Clash** against a pack of 2 Stills per fighter. It costs no Hour. If everyone goes Down or it reaches the end of round 7, the Stills scatter, Down fighters stand with 1 Vigor and the Hunt begins. No withdrawing.
2. **The Hunt: 4 Hours.** There are five **Anchors**. Each has a Warden (each with a different Shell) and a pack of 1 Still per fighter. Each Hour, the group chooses one:
   - **Go to an Anchor.** If you win, the Anchor breaks. If everyone goes Down, or the group **withdraws** at the end of any round, the Anchor stands and Down fighters stand with 1 Vigor.
   - **Respite.** Everyone returns to full Vigor. Chi is unchanged.
   - **A long fight**, one still going at the end of round 4, costs **one more Hour**, even if the group then withdraws. If no Hours are left, the Hour is owed and dawn comes one round sooner at the Heart.
   - **An Anchor fight still going at the end of round 7** ends: the Warden holds and the Anchor stands.
   - **When the four Hours are spent**, go to the Heart. At least one Anchor always stands.
3. **The Heart**, after the Hunt. Fight the Heart and a pack of 1 Still per fighter.
   - Every fighter gains 3 Chi as the fight begins, and anyone may Awaken at the start of their turn.
   - Nobody can withdraw.
   - **Dawn** breaks at the end of round 7 (round 6 if an Hour is owed).
4. **Every night stands alone:** nothing but the fighters themselves carries over.

## §9 Endings
- **Win:** the Heart falls, even if the same strike puts the last fighter Down.
- **Partial, driven off:** dawn breaks with the Heart at half its Toughness or less. The Unmade retreats into the dark. The city is scarred, and it will come back.
- **Loss:** every fighter is Down at the Heart, or dawn breaks with the Heart above half. The Unmade takes hold.

## §10 Group size, difficulty and ready-made fighters
| Fighters | 3 | 4 | 5 |
|---|---|---|---|
| Starting Vigor | 10 | 7 | 6 |
| Warden Toughness | 27 | 36 | 45 |
| Heart Toughness, one Anchor standing | 27 | 36 | 50 |
| …plus, for each other Anchor standing | +12 | +16 | +20 |
| Stills: First Clash / Anchor / Heart | 6 / 3 / 3 | 8 / 4 / 4 | 10 / 5 / 5 |

| Difficulty table: the Heart's | Easy | Standard | Hard |
|---|---|---|---|
| Crush | 2 | 4 | 6 |
| Sweep | 1 | 2 | 3 |

**Ready-made fighters** (one per element; with fewer players, any of them). They are a little stronger than random groups: three of them win about 84% at Standard (78–91%), four 78%, all five 74%.

| Element | Style | Perk | Awakening |
|---|---|---|---|
| Wood | Sweeper | Quick | Ascendant |
| Fire | Guardian | Stubborn | Harmony |
| Earth | Brawler | Lucky | Tempest |
| Metal | Flow | Medic | Wellspring |
| Water | Counter | Trained | Unbreakable |

## §11 What the simulator says (`sim/REPORT.md`)
- **Results:** 4,000 simulated nights per difficulty and group size, with random legal groups.

  | Difficulty | Win | Partial | Loss |
  |---|---|---|---|
  | Easy | 88% | 11% | 1% |
  | Standard | 72% | 17% | 10% |
  | Hard | 58% | 20% | 22% |

- **Group size:** every size is within 3.2 points of its difficulty's average.
- **Options:** each element, style, perk and awakening is within 2 points of its pick's average.
- **Fight length:** the Heart fight lasts about 5 rounds and an Anchor fight about 4.
- **Habits that win:**
  - Clear the Stills before they feed the enemy, but don't spend strikes on the last one.
  - Take a Respite when the group is down to about two-thirds of its Vigor.
  - Spend Chi freely in the Hunt; the Heart gives you the 3 you need to Awaken.

**Words used in these rules:** hit, Guard, Harm, hit back, Critical, damage, Toughness, Vigor, Down, Chi, Strike, Rally, Help, technique, feeding, ring, Shell, shatter, pack, Stills, Swarm, Surge (Crush, Sweep, Drain, Call), Warden, Anchor, the Heart, the Unmade, Hour, Respite, long fight, dawn, Awaken.

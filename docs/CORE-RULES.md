# Nightwake: core rules v0.1

*One night. Five elements. Break the Heart before dawn.*

**The table:** 3–5 players and a Storyteller, ages 12+, about 3 hours plus setup. Each player needs 7 six-sided dice; the Storyteller needs a few. **Approved by Richard on 2026-10-22.** The rulebook chapters (`book/src/chapters/`) are now the rules; this page is their one-page summary and must match them. Every number here was tested by `sim/` (results in §11).

## §1 The roll
- Roll **5 dice**. Each **5 or 6 is a hit**.
- **Bonus dice:** at most **+2** on one roll from all sources together, so never more than 7 dice.
- In a fight you always roll against an enemy's **Guard**. There are no opposed rolls.
  - **Hits ≥ Guard:** a clean strike.
  - **Fewer hits than its Guard:** the enemy **hits you back**. You lose Vigor equal to its **Harm**, then gain 1 Chi (unless you went Down).
  - **Critical:** you met the Guard **and** rolled two or more 6s. You deal +1 damage and gain 1 Chi.
- **Damage** = your hits, plus any bonuses. Bonuses count only if you rolled at least one hit.
- **A roll's result comes first.** If your strike destroys the enemy, it can't hit back.

## §2 Fighters
Each fighter takes one **element**, one **fighting style**, one **perk** and one **awakening**. No two fighters in a group share any of them. If two players want the same one, both roll a die and the higher roll picks first. The five ready-made fighters (§10) skip this step. Every fighter starts with **2 Chi** (maximum 5) and the Vigor in §10.

**Elements.** Your element fixes your place in the two cycles (§3, §4) and gives you a **technique**. Spend 1 Chi as you declare a Strike to use it, once per strike.

| Element | Technique |
|---|---|
| **Wood** (growth; wind is Wood's) | **Renewal:** after the roll, you or an ally regains 1 Vigor. |
| **Fire** | **Blaze:** +2 damage if you hit. |
| **Earth** | **Bulwark:** choose a fighter. The next time they would lose Vigor this round, they lose 3 less. |
| **Metal** | **Edge:** each 6 counts as three hits. |
| **Water** | **Tide:** after the roll, reroll up to three dice that aren't hits. |

| Fighting style | Effect |
|---|---|
| **Brawler** | +1 damage when you meet the Guard. |
| **Guardian** | Once per round, when another fighter would lose Vigor, you may lose it instead. When you do, gain 2 Chi. |
| **Sweeper** | When you meet the Guard, also deal 1 damage to one other enemy. |
| **Counter** | When an enemy hits you back, deal it 1 damage and gain 1 more Chi. |
| **Flow** | Lose 1 less Vigor each time, except from a Sweep. |
| **Breath** | Gain 4 Chi at the start of every fight. |

| Perk | Effect |
|---|---|
| **Tough** | +3 maximum Vigor. |
| **Medic** | After each fight, share out 2 Vigor among the fighters. |
| **Lucky** | Once per fight, after you roll, reroll every die that isn't a hit. |
| **Quick** | Before the first round of each fight, take a free Strike with +1 die. It can't be hit back. |
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
1. **Fighters act** one at a time, in any order the players like.
2. **Enemies act.** The Warden or Heart feeds on its Stills (§4). Then each pack Swarms, then the Warden or Heart Surges.
3. **End of round.** Awakenings count down, then check the clocks (§8, §9).

**Actions.** Each fighter takes one action:
- **Strike** an enemy (§1).
- **Rally** a Down fighter. They stand with 2 Vigor (no roll) and act from the next round.

**Free, not actions:**
- a **Chi die**: spend 1 Chi for +1 die on your own roll;
- **Help**: spend 1 Chi to give another fighter's roll +1 die, once per roll for each helper (Down fighters can't Help);
- your element's **technique**.

**Feeding (the generating cycle).** The fighters' elements form a ring in cycle order: Wood → Fire → Earth → Metal → Water → back to Wood. Any element nobody has is skipped, so the ring always closes. A strike deals **+1 damage** (if it hits) when the action just before it in this fight was taken by the fighter before you in the ring.
- Any action counts, including Rally, holding a Seal, Quick's free Strike, and the last action of the round before.
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
- **Swarm:** at the end of each round, a pack deals Harm equal to half its Stills (rounded up) to one fighter of the players' choice.
- **Feeding on the Stills:** at the end of each round, the Warden or Heart regains 1 Toughness for each of its Stills still standing. It never goes above its starting Toughness.
- **When a Warden or the Heart falls, its Stills crumble** and the fight is won.

**Wardens** guard the Anchors: Guard 2, Harm 2, Toughness 9 per fighter.
- **Shell:** each Warden wears a Shell of one element, a different one at each Anchor. The Shell adds +1 to its Guard.
- The element that **breaks** that Shell ignores it, and its first hit shatters it. The breakers are the overcoming cycle: Wood breaks Earth, Earth breaks Water, Water breaks Fire, Fire breaks Metal, Metal breaks Wood.
- A Shell also shatters once the Warden is at half its Toughness or less.

**The Heart:** Guard 2, Harm 2.
- Its Toughness is (5 + 4 per Anchor still standing) × fighters. With five fighters, use 6 instead of 5.
- Its Toughness is fixed when the fight begins.
- Its Crush and Sweep come from the Night card (§10).

**Surge:** at the end of each round, the Warden or Heart rolls a d6.

| d6 | Warden | Heart |
|---|---|---|
| 1–2 **Crush** | 3 Harm to the fighter who dealt it the most damage this round | the Night card's Crush, to the same fighter |
| 3–4 **Sweep** | every fighter loses 1 Vigor | every fighter loses the Night card's Sweep |
| 5 **Drain** | the fighter with the most Chi loses 2 Chi | every fighter loses 1 Chi |
| 6 **Call** | 2 more Stills join its pack (or form a new one), up to fighters + 2 Stills | the same |

- **Crush when nobody damaged it:** it hits the fighter with the most Vigor.
- **Ties** (for a Crush or a Drain): the fighter who acted last that round.
- **A Drain that finds no Chi** Crushes instead.

## §5 Vigor and Down
- **Protections, in order:** when you would lose Vigor, a Guardian may take it first, then Bulwark applies, then Flow, then Unbreakable.
- **At 0 Vigor you are Down.** You can't act or Help, **you lose all your Chi**, and your Awakening ends. Harm past 0 is lost.
- **After a fight,** Down fighters stand with 1 Vigor.
- Vigor carries from fight to fight. Nothing heals except what these rules say.

## §6 Chi
- **Start and limit:** 2 at the start of the night, maximum 5. Any Chi past 5 is lost.
- **Gain:**
  - 1 when you are hit back;
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
1. **Prologue.** Each player describes the moment their element wakes. Then comes the **First Clash** against a pack of 2 Stills per fighter. It costs no Hour.
2. **The Hunt: 4 Hours.** There are five **Anchors**. Each has a Warden (each with a different Shell) and a pack of 1 Still per fighter. Each Hour, the group chooses one:
   - **Strike an Anchor.** If you win, the Anchor breaks. If everyone goes Down, or the group **withdraws** at the end of any round, the Anchor stands and Down fighters stand with 1 Vigor.
   - **Respite.** Everyone returns to full Vigor and Down fighters stand. Chi is unchanged.
   - **A long fight**, one still going at the end of round 4, costs **one more Hour**. If no Hours are left, dawn comes one round sooner at the Heart instead.
   - **An Anchor fight still going at the end of round 7** ends: the Warden holds and the Anchor stands.
   - **When the Hours run out**, or every Anchor is broken, go to the Heart.
3. **The Heart: the last Hour.** Fight the Heart and a pack of 1 Still per fighter.
   - Every fighter gains 3 Chi as the fight begins, and anyone may Awaken.
   - Nobody can withdraw.
   - **Dawn** breaks at the end of round 7, one round sooner for each Hour owed.

## §9 Endings
- **Win:** the Heart falls, even if the same strike puts the last fighter Down.
- **Partial, driven off:** dawn breaks with the Heart at half its Toughness or less. The Unmade retreats into the dark. The city is scarred, and it will come back.
- **Loss:** every fighter is Down at the Heart, or dawn breaks with the Heart above half. The Unmade takes hold.

## §10 Group size, difficulty and ready-made fighters
| Fighters | 3 | 4 | 5 |
|---|---|---|---|
| Starting Vigor | 10 | 7 | 6 |
| Warden Toughness | 27 | 36 | 45 |
| Heart Toughness, every Anchor broken | 15 | 20 | 30 |
| …plus, for each Anchor still standing | +12 | +16 | +20 |
| Stills: First Clash / Anchor / Heart | 6 / 3 / 3 | 8 / 4 / 4 | 10 / 5 / 5 |

| Night card: the Heart's | Easy | Standard | Hard |
|---|---|---|---|
| Crush | 2 | 4 | 6 |
| Sweep | 1 | 2 | 3 |

**Ready-made fighters** (one per element; with fewer players, any of them: every group of three, four or five wins 77–91% at Standard):

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
  | Easy | 89% | 10% | 1% |
  | Standard | 75% | 15% | 10% |
  | Hard | 61% | 18% | 21% |

- **Group size:** every size is within 3.2 points of its difficulty's average.
- **Options:** each element, style, perk and awakening is within 2 points of the others in its pick.
- **Fight length:** the Heart fight lasts about 5 rounds and an Anchor fight about 4.
- **Habits that win:**
  - Clear the Stills before they feed the enemy, but don't spend strikes on the last one.
  - Take a Respite when the group is down to about two-thirds of its Vigor.
  - Spend Chi freely in the Hunt; the Heart gives you the 3 you need to Awaken.

**Words used in these rules:** hit, Guard, Harm, hit back, Critical, damage, Toughness, Vigor, Down, Chi, Strike, Rally, Help, technique, feeding, Shell, breaker, pack, Stills, Swarm, Surge (Crush, Sweep, Drain, Call), Warden, Anchor, the Heart, the Unmade, Hour, Respite, long fight, dawn, Awaken.

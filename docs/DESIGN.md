# Elemental Fighters (working title): design document

This is a living document. **§1 Pitch** is Richard's own. **§3 Decisions** lists only what Richard has approved. Everything in §4–§6 is undecided until he chooses.

## 1. Pitch (Richard Moore, 2026-10-22)

> **Elemental Fighters**
>
> Each player selects one of the elements from the chinese elemental table "fire, water, wind, earth, metal" then they select a perk, fighting style, and an awakening. They then have to fight back the "blank" with their group. Its a game where this one night they awaken to save the world one shot.
>
> I think blank is "The Darkness". Reference the movie/show Invincible (featuring billy zane) as to the theory behind the game.

### What the pitch settles
- **A group game.** Each player is one fighter who awakens to an **element** and picks a **perk**, a **fighting style** and an **awakening**.
- **One night, one shot.** The fighters awaken on a single night and must save the world before it ends. The game is designed for **one-shot play**.
- **The enemy is a single dark force** that the group fights back together. Working name: "The Darkness" (see §2.2).
- **Inspiration:** the 2001 TV film *Invincible* (Billy Zane). In it, five people who are each the embodiment of an element (Fire, Water, Air, Metal and Wood) awaken as "hyper-humans". A converted Shadow Man, Os, mentors them against the Shadow Men, whose leader, Slate, is about to open a portal that would destroy the world. The film is a guide to the *theory* of the game; its specifics are someone else's (see §2.3).

## 2. Name check and rights (2026-10-22; risk flags, not legal advice)

### 2.1 "Elemental Fighters": a crowded name, best treated as a working title
Products and characters already using it, or something very close:
- *Elemental Fighters*, a mobile fighting RPG (Serpent Games, 2022);
- *Element Fighters*, an arena fighter listed on Steam;
- several itch.io and GitHub fighting-game prototypes called *Elemental Fighters*;
- LEGO *Ninjago*'s "Elemental Fighters", a named group of elemental-master characters.

It's also generic, so it would be hard to own or to find in a store search. **Recommendation:** keep it as the working title, and brainstorm a distinctive title during the design interview. Run a full search (DriveThruRPG, itch.io, Steam, the USPTO and the UK IPO) before any store page, cover or logo.

### 2.2 "The Darkness" as the villain's name: avoid
*The Darkness* is a **registered trademark of Top Cow Productions**: a comic book series since 1996, and video games published by 2K (2007 and 2012), about a dark entity called "the Darkness". A capitalised villain called **The Darkness** in a commercial game sits right on that mark. Using "darkness" as an ordinary word in descriptions is fine. **Pick a distinctive name for the enemy** during the interview.

### 2.3 Using *Invincible* (2001) as inspiration
The idea is free to use: protectors awakening to the five elements, a mentor, shadow beings, one night to stop the end of the world. The **film's specifics** are not: Os, Slate, the Shadow Men, the White Warrior, the tablet and portal plot, and its scenes and dialogue. Don't copy them.

The film was also criticised for tying each element to a demographic stereotype. **Don't do that:** any element can belong to anyone.

### 2.4 Other look-alikes to steer clear of
- *Avatar: The Last Airbender* (four elemental nations).
- LEGO *Ninjago* (elemental masters, and the "Elemental Fighters" name).
- *Rivals of Aether* (elemental fighters).

Use original names and designs.

### 2.5 The source culture
Wu Xing (五行, the five phases) is a traditional Chinese system and free to use. Use it accurately and respectfully: correct characters and correct meanings, no pseudo-Chinese text, and no ethnic stereotypes. Have the final Chinese terms checked by a native reader.

## 3. Decisions log
| Date | Decision | Notes |
|---|---|---|
| 2026-10-22 | Premise, one-night one-shot structure, and the four character picks (element, perk, fighting style, awakening) as in the pitch | Title and villain name are working names only (§2) |

## 4. Early flags: where the pitch meets the lessons in `DESIGN-RULES.md`
These aren't decisions. They're the first things to settle, because each one has already caused trouble in an earlier game.

1. **Which five elements?** The pitch lists fire, water, **wind**, earth and metal.
   - **The traditional Chinese Wu Xing** is **Wood**, Fire, Earth, Metal and Water. Wind isn't one of them; wind belongs to the Japanese *godai* and the Western classical elements.
   - **The 2001 film** used Fire, Water, **Air**, Metal and **Wood**.
   - **Options:** authentic Wu Xing (Wood instead of Wind); keep Wind as a deliberate twist (and say so in the book); or a set of your own.
   - **Why it matters:** Wu Xing has two traditional cycles, which could become a rule if you want one.
     - **Generating:** Wood feeds Fire, Fire makes Earth (ash), Earth bears Metal, Metal collects Water, Water nourishes Wood.
     - **Overcoming:** Wood parts Earth, Earth dams Water, Water quenches Fire, Fire melts Metal, Metal chops Wood.
     - That's a suggestion only; the cycles need the authentic set.
2. **Five elements, three to five players** (rules A21 and A9).
   - If anything needs all five elements (a combined finale, like the film's joined lightning storm), 3- and 4-player tables break.
   - Decide: can two players share an element? What fills a missing element? Does every rule work with 3, 4 and 5 fighters?
3. **This is a combat game, which is new ground.** The earlier games were about avoiding trouble; fighting brings its own failure modes:
   - **Enemy stats** and how they act (A25, Part B).
   - **Damage and health**, with no death spirals (A2).
   - **Fight length:** cap or clock anything that can drag (A24).
   - **Turn order and the action economy.**
   - **Dominant builds:**
     - Element × perk × fighting style × awakening multiplies into many combinations.
     - The simulator must test them, so no combination dominates and none is a trap (A6, A9).
   - **Abilities that skip rolls,** especially in combination (A8).
4. **The awakening is a power-up, so give it a cost and a trigger** (A5, A7).
   - Is it once a night, earned, or risky?
   - Can it be held back and hoarded?
   - Does it ever become free?
5. **A one-shot needs a fast start and a clock that binds** (A27, A22).
   - Setup under 30 minutes means pre-generated fighters, or a 5-minute build.
   - "One night" should be a real clock that ends or pressures the session.
   - Campaign questions can mostly be skipped, but decide whether sequels or repeat nights exist.
6. **Losing must cost something, and must never beat fighting on** (A4).
   - What happens to a fighter who falls, or is corrupted?
   - What happens if everyone falls?
   - Can a fighter give up or be pulled out?

## 5. Open questions for the design interview (DESIGN-RULES Part B, matched to this game)
1. **Identity and tone:**
   - **The settled-together decisions:** the element set (flag 1), the enemy's name and nature, and the title.
   - **Tone:** gritty, mythic, or martial-arts pulp.
   - **Setting:** a modern city, as in the film, or somewhere else.
   - **The table:** age range, player count, session length.
2. **Engine:** reuse a proven engine or build new, with the trade-offs for a combat game:
   - Heisty Spideys' d6 pool, with Successes on 5–6;
   - Don't Get Forked's trait die plus a risk die;
   - Nine Lives Gang's push-your-luck;
   - something new.
3. **The four picks:** what each one does mechanically, how many options each has, duplicates and tie-breaks, and ready-made fighters.
4. **Combat:**
   - turn order and actions, and whether movement costs the action;
   - attack and defence, opposed rolls or a Difficulty;
   - damage and health;
   - enemy stat blocks (minions, lieutenants, a boss);
   - group attacks and element combinations;
   - the bonus cap from all sources.
5. **The awakening:** its trigger, its effect, its cost and its timing (flag 4).
6. **The threat:**
   - how the enemy's power or the portal advances (one event, one rise);
   - every state at its limit;
   - what lowers it, if anything.
7. **Resources:** energy, chi or similar. How it's earned and spent, and whether a spend is ever free or never the better choice.
8. **Failure:** down, captured, corrupted. How a fighter returns, what "everyone down" means, and whether a fighter can give up (flag 6).
9. **The night's structure:**
   - the scenes, for example: awakening, finding each other, a first defeat, learning the powers, the final battle;
   - the time budget for each scene;
   - the endings: win, partial, loss.
10. **Party size:** 3, 4 and 5 fighters, and element coverage (flag 2).
11. **Ready-made content:**
    - how many one-shot scenarios;
    - maps or zones;
    - an enemy roster;
    - a scenario generator, if any (rules A25–A26).
12. **The first night at the table:** the dice needed, the sheets, pre-generated fighters, and the Storyteller's round card (A27–A29).
13. **Simulator targets:** win and loss rates per difficulty and party size, typical fight length in rounds, and how often the awakening is used.
14. **Art direction:** palette, the look of each element, the fighters, the enemy. **Foundry:** from day one, or book first?

## 6. Suggestions (for discussion, not decisions)
- **Pitch the opposite of a heist.** The earlier games were about not being seen; this one is about being seen and standing your ground. That gives it its own identity, even if it reuses a proven dice engine.
- **The film's emotional arc can be the night's structure:** the fighters are outmatched, someone nearly dies and is healed by the others, they unlock their full power, then the final stand. The structure is fine to use; the specifics aren't.
- **Wu Xing's two cycles** could drive teamwork: one element empowers the next, and one element breaks a certain kind of enemy defence. That rewards a full, mixed group, as long as every rule still works with 3 fighters.

# Testing the online version in your own Foundry

About 30 to 40 minutes. You play the Storyteller in one window and a player in a second window, so you see both sides. Tick each step; if anything doesn't match **Expect**, note the step's letter, what you saw, and any red lines in the console (press **F12**, then the **Console** tab; a screenshot is fine).

What this covers: version 0.1.0 (the release you can install now). The last section is for version 0.2 with the Ready-made Nights add-on, once that is released.

## Before you start

1. **Install:** Foundry's setup screen → **Game Systems** → **Install System** → paste `https://github.com/PainHog/EF/releases/latest/download/system.json` → Install.
   - **Expect:** "Nightwake" appears in your systems list.
2. **World:** **Game Worlds** → **Create World** → any name, system **Nightwake** → Launch, and log in as Gamemaster.
3. **A player:** in the world, **Settings** (gear tab) → **Users** (User Management) → add a player called **Tester** (no password) → Save.
4. **Second window:** open a private browser window at the same address you use for Foundry (often `http://localhost:30000`) and log in as **Tester**. Keep both windows side by side.

## A. First look (Storyteller window)
- [ ] **Expect:** a "Welcome to Nightwake" note in chat, seen only by you.
- [ ] **Expect:** in the **Actors** tab, a **The Night** button with a moon at the top.
- [ ] **Expect:** in the **Compendium** tab, a **Nightwake** folder holding **Nightwake guide** and **Ready-made Fighters**.
- [ ] Open **Nightwake guide** → **Playing Nightwake online**. **Expect:** a readable guide. **At the Table** matches the card at the back of the book.

## B. Fighters
- [ ] From **Ready-made Fighters**, import **Dani Okafor**, **Marcus Bell** and **Jun Park** (right-click → Import, or drag them into the Actors tab).
- [ ] Right-click **Dani** → **Configure Ownership** → set **Tester** to **Owner**.
- [ ] Open Dani's sheet. **Expect:** her emblem as the portrait, Wood, Sweeper, Quick and Ascendant filled in, the texts for each, and Vigour and Chi tracks.
- [ ] Click the 5th Vigour pip. **Expect:** Vigour shows 5. Click the 5th pip again. **Expect:** 4. (Beginning the night resets it.)
- [ ] **Tester's window:** Dani appears in the Actors tab and her sheet opens. Marcus and Jun don't open for Tester.

## C. Begin the night (Storyteller)
- [ ] Press **The Night** → **Begin the night** → Difficulty **Standard**, tick Dani, Marcus and Jun → **Begin**.
- [ ] **Expect:** a "The night begins" card. Every fighter has 10 Vigour and 2 Chi. The Night sheet shows **The Prologue**, four Hours, the five Anchors with their Shells, and a top line saying what to do next.
- [ ] **Tester's window:** press **The Night** in the Actors tab. **Expect:** the same Night sheet, with no buttons.

## D. The First Clash
- [ ] Storyteller: press **The First Clash**. **Expect:** a card naming the enemies. A pack of Stills appears in the Actors tab with Toughness 18 (6 Stills). The top line reads "Round 1 of 7 …", mentioning Quick fighters.
- [ ] **Tester's window:** on Dani's sheet, press **Quick: free Strike** → leave the choices → **Roll**. **Expect:** a chat card with the dice (5s and 6s marked), the damage, and the pack's Toughness going down. No hit back, because a Quick Strike can't be hit back.
- [ ] **Tester's window:** press **Strike**, tick **Chi die** → **Roll**. **Expect:** 6 dice, Dani's Chi goes down by 1. If she missed the Guard, she loses 1 Vigour and gains 1 Chi.
- [ ] **Tester's window:** press **Strike** again. **Expect:** a warning that Dani has already acted this round.
- [ ] Storyteller: open **Marcus** and **Strike**. Then open **Jun** → **Strike**, and in the window tick **Help** from Marcus. **Expect:** Jun rolls an extra die and Marcus's Chi goes down by 1.
- [ ] Storyteller: press **End the round** on the Night sheet. **Expect:** an "End of round 1" card: the Stills Swarm (if several fighters are standing, you're asked who takes it). An Awakening, if any, counts down.
- [ ] Keep striking and ending rounds until the pack falls. **Expect:** a card saying the First Clash is won, Down fighters back up with 1 Vigour, and the Night sheet showing **The Hunt**, "Hour 1 of 4".

## E. An Anchor
- [ ] Storyteller: press **Go** next to **The Old Greenhouse** (Wood Shell). **Expect:** one Hour used. A Warden ("The Gardener") and a pack of 3 Stills appear. The Warden's token art shows a green ring.
- [ ] Open a Strike window for **Marcus** (Fire). **Expect:** the target list shows the Warden's Guard as 3 (Fire doesn't shatter Wood).
- [ ] When a fighter would lose Vigour and Marcus (Guardian) could take it, **Expect:** you, as the Storyteller, are asked "Take it?".
- [ ] Play until the Warden falls, or until round 7. **Expect:** the Anchor is crossed out if it broke. If the fight went past round 4, the card says it cost one more Hour.

## F. A Respite and the clocks
- [ ] Storyteller: press **Take a Respite**. **Expect:** everyone back to full Vigour and one more Hour used.
- [ ] Use up the Hours (more Anchors or Respites). **Expect:** the top line says the Hunt is over, and **The Heart** button appears.
- [ ] Press **The Heart**. **Expect:** every fighter gains 3 Chi, and the card says when dawn comes. **Awaken (3 Chi)** appears on the fighters' sheets.
- [ ] Play to the end, or end rounds quickly. **Expect:** at round 7 (or sooner) the night ends with **Won**, **Driven off** or **Lost**, and a **Begin a new night** button.

## G. Safety checks
- [ ] **Settings** → **Configure Settings** → **System Settings**. **Expect:** four switches: Apply Strike results, Run the enemies' step, Keep the clocks, Ask about the Guardian.
- [ ] Turn off **Apply Strike results**, then make a Strike. **Expect:** the card shows the result and says to apply it by hand; nothing changes on the sheets. Turn it back on.
- [ ] In the middle of a fight, refresh the Storyteller window (F5). **Expect:** the Night sheet reopens with the fight where it was.
- [ ] Log the Storyteller out, then strike from Tester's window. **Expect:** a warning that the Storyteller isn't connected, and nothing changes.

## H. With version 0.2 and the Ready-made Nights add-on (once released)
- [ ] Install the add-on: unzip it into Foundry's `Data/modules/` folder, restart Foundry, open the world, and turn on **Nightwake: Ready-made Nights** under **Manage Modules**.
- [ ] **Begin the night** → **Anchors**. **Expect:** a choice of "As named on the Night sheet", **The Night the Clocks Stopped** and **The Night the Tide Stood Still**.
- [ ] Choose **The Night the Tide Stood Still**. **Expect:** the Night sheet lists the Old Pier, the Beach Bonfire, the Sea Wall, the Harbour Crane and the Lido, shows the night's name, and has a **Read the night** button. Pressing it opens the night's journal.
- [ ] **Tester's window:** **Expect:** Tester can't open the **Ready-made Nights** compendium.

## What to send back
For each step that didn't match: the letter, what you expected, what happened, and any red console lines. Steps that worked need no notes; just say which sections you finished.

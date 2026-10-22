# Kickoff prompt: Elemental Fighters (working title)

1. Create your new, empty GitHub repository and start a new Claude Code session with **only that repository** selected.
2. Attach **`Elemental-Fighters-Starter.zip`**.
3. Paste everything below the line.

---

I'm Richard Moore, starting my fourth tabletop RPG, working title **Elemental Fighters**. Three earlier games (*Heisty Spideys*, *Don't Get Forked* and *Nine Lives Gang*) were reviewed with simulators and agent playtests, and the same mistakes kept turning up. This project starts with those lessons built in.

**Setup first:**
1. Unzip the attached `Elemental-Fighters-Starter.zip` into the root of this repository. Its top folder's *contents* go at the root, not the folder itself.
2. Run `npm install` and `npm run check`. Tell me if anything fails.
3. Commit everything to the default branch with the message "Project setup: design docs and toolchain", and push.

**Then read, in this order:**
1. `CLAUDE.md`: how we work. These are the project's rules. I decide all game content; you give options and I choose.
2. `docs/DESIGN.md`: my pitch, the name check, the early flags, and the open questions.
3. `docs/DESIGN-RULES.md`: Part A hard rules, Part B questions, Part C process, Part D release gates.
4. `book/art/ART-CHECKLIST.md` and `docs/REVIEW-PROCEDURE.md`: for later stages.

**Today's goal is the core design**, not chapters or art:
- **Interview me** through the open questions in `docs/DESIGN.md` §5, in order and one topic at a time. Settle the early flags in §4 as they come up.
  - For each topic, give two or three concrete options, with your recommendation and why, and wait for my choice.
  - Start with **question 1**: the five elements (Wu Xing's Wood or my Wind), the tone and setting, and title and villain name ideas, since "Elemental Fighters" is crowded and "The Darkness" is a Top Cow trademark.
  - Then **question 2**, the engine.
- **When one of my ideas would repeat a mistake** from `DESIGN-RULES.md` Part A, tell me straight away and name the rule.
- **After each decision,** add it to the Decisions log in `docs/DESIGN.md`, then commit and push.
- **Once the core is settled:**
  1. Write the one-page `docs/CORE-RULES.md`.
  2. Build a first simulator in `sim/`.
  3. Show me the win and loss rates by difficulty and party size, element and build balance, and typical fight length, against the targets we agree on.
- **No rulebook chapters or art until I approve the core rules.**

Start with the setup, then ask me the first question.

# Art brief: every picture in Nightwake

Everything in the book and the online version is finished except the pictures. Each picture already has a drawn placeholder in its place, at its final size, so the pages are laid out and won't move when the real art arrives. This brief is what to hand an artist, and how to put the finished pictures in.

## Putting a finished picture in

1. Save it in `book/art/final/` with the picture's name from the table below, as PNG, JPEG or WebP: for example `book/art/final/ch-city.jpg`.
2. Build: `npm run build:book` (and `-- --print`, `-- --white`) for the book, then `node tools/build-assets.mjs` and `npm run build:packs` for the online version.
3. Read the build's last lines: it lists the finished pictures it used and warns about any picture with too few pixels for print or a shape that will be cropped a lot. Then look at every page (contact sheet, `book/README.md`).

The finished picture replaces the placeholder everywhere it is used, in the book and online. It is fitted to the slot's shape: cropped to fill, never stretched. Delete the file to go back to the placeholder. Once a piece is in, go through it against `ART-CHECKLIST.md`, add a row to `AUDIT.md`, log the artist and licence in `SOURCES.md`, and add the artist to the credits page (`book/src/chapters/01-credits.html`: an "Art" line under "Typefaces").

## For the artist

**The look** (decisions D32 and D35 in `docs/DESIGN.md`):

- A city at night, from just before midnight to dawn. Lamplight brass, deep navy, and the five element colours; the Unmade are grey.
- The book shows places, the elements and the Unmade. People are small and seen from a distance; nobody recurring has a face, so players picture their own fighters. The ready-made fighters appear only as emblems.
- Each element keeps one colour **and** one shape everywhere, so the shape alone tells you the element in black and white:

| Element | Colour | Shape |
|---|---|---|
| Wood | green `#3f8a55` | a tall leaf |
| Fire | red `#c8472f` | a flame |
| Earth | ochre `#c49a3a` | a layered square |
| Metal | silver `#aab3bd` | a ring |
| Water | deep blue `#2c5f8f` | three waves |

- The Unmade look unfinished: desaturated grey, missing detail, still. The **Stills** are frozen people with a peeled, broken outline; the **Wardens** are bigger Unmade guarding an Anchor, each with a **Shell** in one element's colour and shape; the **Heart** is a grey wheel turning in the air.
- Fighters come from every background, age and build.
- **Never:** words or numbers in a picture (clocks have ticks only); black tendrils; silhouette "shadow men" with glowing eyes; martial-arts nations or elemental-master costumes.

**Files:**

- At least the pixels in the table (300 pixels per inch at the size printed; the art checklist's floor is 250). Bigger is fine, but only makes the files bigger.
- The shape in the table. Art of another shape is cropped to fit; the build says how much.
- RGB, sRGB. JPEG (quality 90 or more) for scenes, PNG or WebP for badges and tokens, which need a transparent background outside the circle.
- The **cover** is printed full bleed: the table's size includes 0.125in on every edge that is trimmed off. The title and its dark fade cover the top 3.4in and the version line the bottom 1.3in, so keep faces and focal points out of those bands.
- Round badges and tokens are cut to a circle; keep everything important inside it.

## Sizes

Counted from the layout (`book/tools/art-slots.mjs` writes this table; run it after a layout change).

<!-- slots:start (written by node book/tools/art-slots.mjs) -->
| Pictures | Where they go | Shown at | Pixels needed (at least) | Shape |
|---|---|---|---|---|
| `back-heart` | Back cover: a framed panel under the blurb | 4.16 × 3.12 in | 1248 × 936 | 4 : 3 |
| `ch-awakening`, `ch-city`, `ch-clocktower`, `ch-fighters`, `ch-fights`, `ch-lighthouse`, `ch-map`, `ch-night`, `ch-storyteller`, `ch-unmade` | Chapter openers: a banner across the top of the chapter | 7.14 × 1.80 in | 2142 × 540 | 3.97 : 1 |
| `cover-night` | Front cover, full bleed, 0.125in trimmed off every edge | 8.75 × 11.32 in | 2625 × 3398 | 8.5 : 11 |
| `el-earth`, `el-fire`, `el-metal`, `el-water`, `el-wood` | Element badges: each element's entry in Chapters 2 and 8; online, a fighter's portrait until they choose one | 1.05 in wide in print; on screen online | 512 × 512 | 1 : 1, cut to a circle |
| `part-awaken`, `part-unmade` | Part title pages: on the dark page under the title | 6.70 × 2.23 in | 2010 × 670 | 3 : 1 |
| `pc-dani`, `pc-jun`, `pc-marcus`, `pc-priya`, `pc-sam` | Ready-made fighters: their entries in Chapter 2; online, their portraits and tokens | 1.2 in wide in print; on screen online | 512 × 512 | 1 : 1, cut to a circle |
| `spot-bridge`, `spot-dice`, `spot-greenhouse`, `spot-reservoir`, `spot-stills`, `spot-substation`, `spot-underpass` | End-of-chapter pictures, placed where a chapter leaves room (shown up to this size) | 7.07 × 5.30 in | 2120 × 1590 | 4 : 3 |
| `token-still`, `token-heart`, `token-warden-wood`, `token-warden-fire`, `token-warden-earth`, `token-warden-metal`, `token-warden-water` | Online only: tokens on the map | on screen | 512 × 512 | 1 : 1, cut to a circle |
| `foundry-background` | Online only: the game's background picture in Foundry VTT | on screen | 1920 × 1080 | 16 : 9 |
<!-- slots:end -->

## What each picture shows

The placeholder in `book/art/<name>.svg` shows the composition and what must be in it; the artist is free to compose it better, keeping what the text needs.

### Covers and part pages

- **`cover-night`** (front cover): the city's skyline at night under a full moon. At its centre, an old clock tower whose clock face holds the **Heart**, a grey wheel in place of the hands. On a rooftop in the foreground, five fighters from every walk of life stand ready, each with a glow in their element's colour (Wood, Fire, Earth, Metal, Water). Mood: the moment before the fight; big, hopeful, a little dangerous.
- **`back-heart`** (back cover panel): the Heart, the grey wheel, turning in the air over the rooftops, with the sky starting to lighten towards dawn.
- **`part-awaken`** (Part One, "Awaken"): the feeding cycle. Five element badges in order, Wood, Fire, Earth, Metal, Water, each feeding the next, with the cycle returning from Water to Wood. This one teaches a rule: keep the order and the arrows clear.
- **`part-unmade`** (Part Two, "The Unmade"): the Heart over a grey, emptied city.

### Chapter openers (a wide banner at the top of each chapter)

- **`ch-city`** (1, Welcome to Nightwake): a city street at two minutes to midnight. A street clock stopped at 11:58 (ticks only, no numbers), a night bus, lit windows, the moon. Everything has just stopped.
- **`ch-fighters`** (2, Fighters): five ordinary people on a rooftop who have just woken to their elements, the five element shapes painted or glowing along the parapet.
- **`ch-fights`** (3, Fights): a fighter's strike landing on a Still on a rooftop: the impact, the frozen grey figure, the city behind.
- **`ch-awakening`** (4, Chi and the Awakening): a fighter Awakening, arms raised, five rings of element light around them.
- **`ch-night`** (5, The Night): the sky from night to dawn across the banner, with a band along the top marking the four Hours and then the Heart: the shape of the night.
- **`ch-unmade`** (6, The Unmade): the Unmade: Stills standing frozen in a street, a Warden behind them, the Heart above.
- **`ch-storyteller`** (7, Running the Night): a game table seen from above: fighter sheets, dice, Chi tokens, the Night sheet.
- **`ch-clocktower`** (8, The Night the Clocks Stopped): the clock tower in its square, the Heart in its face.
- **`ch-map`** (9, Making Your Own Night): a city map from above: a river, streets, a park, five Anchors marked by the five element shapes, and the Heart at the centre. No labels.
- **`ch-lighthouse`** (10, The Night the Tide Stood Still): a seaside town's bay at night with the sea stopped: a wave hanging mid-break, the old pier on its posts, and the lighthouse on the point with the Heart turning in its lamp room in place of the light.

### End-of-chapter pictures

Placed by the build where a chapter leaves room, never the same one twice.

- **`spot-greenhouse`**: the Old Greenhouse, the Wood Anchor: glass and iron, plants grown wild, a Warden with a green leaf Shell.
- **`spot-substation`**: the Substation, the Fire Anchor: transformers and fences, a Warden with a red flame Shell.
- **`spot-underpass`**: the Underpass, the Earth Anchor: concrete and tiles, a Warden with an ochre square Shell.
- **`spot-bridge`**: the Iron Bridge, the Metal Anchor: girders and rivets over the river, a Warden with a silver ring Shell.
- **`spot-reservoir`**: the Reservoir, the Water Anchor: still water behind a dam wall, a Warden with a blue wave Shell.
- **`spot-stills`**: a group of Stills frozen mid-stride in a street.
- **`spot-dice`**: six-sided dice and Chi tokens on a table.

### Badges and the ready-made fighters

- **`el-wood`, `el-fire`, `el-earth`, `el-metal`, `el-water`**: one round badge per element, its colour and shape (table above). They label each element in Chapters 2 and 8, and online they stand in for a fighter's portrait.
- **`pc-dani`, `pc-marcus`, `pc-jun`, `pc-priya`, `pc-sam`**: the five ready-made fighters (Chapter 2), each as an emblem: their element's badge with one object from their ordinary life. Dani (Wood, a bike courier): a bicycle wheel. Marcus (Fire, a tower-block caretaker): a spanner. Jun (Earth, a baker and amateur boxer): a boxing glove. Priya (Metal, a paramedic): trauma shears. Sam (Water, a retired judo coach): a tied judo belt. Online these are their portraits and tokens. (If Richard wants these drawn as people instead, that changes D35: decide it first.)

### Online only

- **`token-still`**: a Still as a round token, seen from above or face-on, grey.
- **`token-heart`**: the Heart as a round token.
- **`token-warden-wood` … `token-warden-water`**: a Warden as a round token, one for each Shell: the same Warden with its Shell in that element's colour and shape.
- **`foundry-background`**: a wide view in the cover's world (the clock tower, the Heart, five fighters on a roof), shown behind the game in Foundry VTT.

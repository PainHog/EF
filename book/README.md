# Nightwake — the rulebook

Version 0.1: every chapter, sheet and picture is done. Three editions build from the same
source: the full-colour book, a printer-friendly white edition for home printers, and
print-on-demand files with bleed.

| Path | What |
|---|---|
| `src/chapters/*.html` | The text, one file per chapter, concatenated in filename order (see `src/MARKUP.md`) |
| `src/book.css` | The print design. The palette and typefaces are tokens at the top (night palette, DESIGN D35) |
| `art/*.svg` | All illustrations (catalogue and palette in `art/README.md`; every piece must pass `art/ART-CHECKLIST.md`) |
| `tools/art-gen/` | Scripts that generate the art: `lib.mjs` (drawing primitives), `scenes/lib.mjs` (scene kit), `scenes/build.mjs` (writes the pieces), `scenes/nightwake.mjs` (every picture in the book) |
| `tools/preview-art.mjs` | Renders art to PNGs plus a labelled contact sheet, and checks every SVG is well-formed |
| `tools/contact-sheet.py` | Renders a PDF's pages into one contact-sheet image for layout review |
| `tools/text-diff.py` | Word-level diff of two builds' text (to prove only intended text changed) |
| `art/AUDIT.md`, `art/SOURCES.md` | The art checklist audit (object and figure tables for every piece) and the image source log |
| `REVIEW.md` | The log of every ruling and text change (what, where, why, source) |
| `dist/Nightwake_v0.1.pdf` | The typeset edition (digital, full colour) |
| `dist/Nightwake_v0.1_printer-friendly.pdf` | The printer-friendly edition: white paper, no covers or scene pictures, light boxes; chapters run on |
| `dist/Nightwake_v0.1_print-*.pdf` | Print-on-demand files: interior (8.75×11.25in incl. 0.125in bleed, even page count) separate front/back covers, and a one-piece cover spread (back, spine, front) |

```bash
npm install
npm run build:book                                   # → book/dist/Nightwake_v0.1.pdf
npm run build:book -- --print                        # → print-on-demand interior + covers + cover spread (with bleed)
npm run build:book -- --white                        # → printer-friendly white edition
npm run build:book -- --draft                        # missing art becomes a labelled box instead of an error
node book/tools/art-gen/scenes/build.mjs [name …]    # regenerate art into book/art/
node book/tools/preview-art.mjs /tmp/art [name …]    # look at the art (PNG per piece + _sheet.png)
python3 book/tools/contact-sheet.py book/dist/Nightwake_v0.1.pdf /tmp/sheet 40 6   # look at every page
python3 book/tools/text-diff.py old.pdf book/dist/Nightwake_v0.1.pdf               # text check vs an earlier build
```

## What the build does
- **Two-pass Table of Contents.** Pass 1 prints with invisible markers at every part and
  chapter start; their pages feed the TOC of the final pass (markers are absolutely
  positioned, so removing them moves nothing). The build fails if pass 1 and the final
  pass paginate differently.
- **End-of-chapter spot art.** Pass 1 also measures the room left on each chapter's last
  page; `SPOTS` in `build.mjs` lists each chapter's preferred spot
  illustrations, and one sized to fit is placed there — never a repeat, never one that
  would move a page. Large unfilled gaps are reported as warnings.
- **Overflow guard.** Chromium silently shrinks every page when anything is wider than the
  paper; the build refuses to print instead and names the culprits.
- **Missing art fails the build** (use `--draft` while drafting).
- **`--print`:** interior with 0.125in bleed and an even page count (a blank page is
  added if needed), no covers; front and back covers as separate files with bleed; and a
  one-piece cover spread whose spine is the page count × `SPINE_IN_PER_PAGE` (an estimate:
  replace it with the printer's own figure before ordering; no spine text under 80 pages).
- **`--white`:** the printer-friendly edition: white paper, no covers, scene pictures or
  spots, every dark fill a light box with a dark edge, and chapters that run on instead
  of starting new pages.
- **Glyph guard:** a character the typefaces lack fails the build (Chromium would embed an
  uncredited fallback or a Type 3 font). "→" is drawn as a small vector arrow.
- **Keep-with-next:** an h3/h4 is bound to its next short block so headings never strand;
  tables of 4+ columns span both columns automatically (see `src/MARKUP.md`).
- Title, author, version and output names are constants at the top of `build.mjs`.

Chromium comes from `$CHROME_PATH`, else `/opt/pw-browsers/chromium`, else Playwright's
default. Fonts (Fraunces, Alegreya, Alegreya Sans) are SIL OFL and embedded
in the PDF, so the file can be sold. `contact-sheet.py` and `text-diff.py` need
`pip install pymupdf pillow`.

## After every build
Render a contact sheet and look at every page: no near-empty pages, odd gaps, overflow
or split tables. Run the text diff against the previous build and check every changed
span against `REVIEW.md`.

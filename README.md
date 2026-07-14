# Compean Painting Services — Brand + Website

Client: Guillermo "Junior" Compean, Georgetown TX. Painting, drywall, siding, remodeling.
A+ BBB rated, accredited Aug 2024. Phone (512) 986-0094.

## What's here

- `brand/logos/` — 3 logo concepts as SVG masters + transparent @2x PNGs in `png/`
  - **Concept A (recommended primary)**: flat brush-C around a house; evolves the old logo
  - **Concept B**: Texas heritage badge for merch, stamps, yard-sign corners
  - **Concept C**: bold wordmark with red paint swipe; strongest as a website header
  - Every concept: stacked, horizontal, icon, plus one-color black and white variants
  - SVGs embed their fonts, so they render correctly anywhere; outline text to paths
    in Illustrator/Figma before sending to a print shop
- `docs/` — the one-page website (plain HTML/CSS/JS, no build step)
- `COMPEAN LOGO style 2.jpg`, `QRCode 2.png` — original client assets

## Brand quick reference

| Token | Hex | Use |
|---|---|---|
| Compean Red | `#D62828` | CTAs, accents, the swipe |
| Deep Red | `#A61B1B` | Hovers, print red |
| Ink | `#141414` | Headlines, dark grounds |
| Charcoal | `#1D1D1F` | Panels, cards |
| Silver | `#8E8E8E` | Captions |
| Canvas | `#F5F3EF` | Page background |

Type: **Archivo Black** (display), **Barlow Condensed** (labels/subheads), **Barlow** (body).
All free Google Fonts.

## Launching the site

1. Replace the temporary AI-generated photos in `docs/assets/` (hero.jpg, junior.jpg,
   work-1.jpg … work-6.jpg) with real project photos — keep the same filenames and
   nothing else needs to change. Each spot is marked with a TEMP comment in index.html.
   Do not launch with the AI images; they show work Junior didn't do.
2. Verify "Free Estimates" and service claims with Junior
3. Drag the `docs/` folder into [Netlify Drop](https://app.netlify.com/drop) —
   the quote form works automatically on Netlify (form name: `estimate`)
   - On other hosts, point the form at Formspree or similar
4. Point the domain, then update the `url` in the JSON-LD block in `index.html`

To use Concept B or C instead: replace `docs/assets/logo-horizontal.svg` and
`docs/assets/logo-stacked-white.svg` with that concept's files from `brand/logos/`.

Local preview: `python3 -m http.server --directory docs 8000`

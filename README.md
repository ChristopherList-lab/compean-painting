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
- `brand/business-card/` — print-ready card, 3.5×2" trim with 1/16" bleed per side
  - `Compean-Business-Card-PRINT.pdf` — upload this to the print shop (page 1 front, page 2 back)
  - `card-front.png` / `card-back.png` — previews at ~384 dpi, also printable
  - `business-card.html` — self-contained source (fonts embedded); edit and re-print
    to PDF from Chrome at 100% scale, no margins
  - Back QR is the client's BBB-profile code; copy says "Call or text for an
    estimate" until Junior confirms the free-estimates claim
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

## Estimate pipeline

The "Get a Free Estimate" form captures leads through Netlify Forms. The form
submits over AJAX, so the visitor stays on the page and sees a thank-you card
instead of a page reload. `netlify.toml` already points Netlify at the `docs/`
folder, so no build settings are needed.

**Turn it on (once per project):**

1. In Netlify, **Add new site → Import an existing project → GitHub**, pick the
   `compean-painting` repo. Netlify reads `netlify.toml` and deploys `docs/`.
2. Open the site's **Forms** tab. The `estimate` form appears after the first
   deploy that receives a submission.
3. **Forms → Settings → Form notifications → Add notification → Email** and enter
   the address that should get leads. Add a second one for the agency copy.

Every submission then lands in the Netlify dashboard and hits those inboxes.
Spam is filtered by the honeypot field (`bot-field`) already in the markup.

**Route leads into GoHighLevel:**

The form field names map to GHL contact fields — `name`, `phone`, `email`,
`service`, `message`. To push each lead into a GHL account:

1. In GHL, create an inbound webhook trigger (Automation → Workflows → Webhook
   trigger) and copy its URL.
2. In Netlify, **Forms → Settings → Form notifications → Add notification →
   Outgoing webhook**, paste the GHL URL, and select the `estimate` form.

Netlify then POSTs every submission to GHL, which can create the contact, text
or call Junior, and start a follow-up sequence. No site code changes needed.

Local note: the form only sends on Netlify. On GitHub Pages or a local server it
shows the graceful error ("please call us") because there is no form backend
there.

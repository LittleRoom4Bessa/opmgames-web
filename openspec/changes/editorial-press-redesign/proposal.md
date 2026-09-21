# Proposal: editorial-press-redesign

## Why

The site currently has baseline-only styling. Through a design exploration (6 references studied via screenshots + obscura snapshots: stripe.dev, fionavilmer.com, Kinfolk, specs.berlin, Snøhetta, Metalab), we've locked a visual identity: **typography-driven editorial design that abstracts real-world print objects instead of mimicking them** — a newspaper stack for the blog, a magazine cover for photo albums, pixel type reserved as the game-developer signature.

## What Changes

- **Visual identity**: white background + whisper-level grain overlay; ink black; single rust accent (`#b5501f`). Type roster: Archivo (display sans), Newsreader (serif body/italic accents), Times New Roman (blog headlines), Silkscreen (pixel — game-related title keywords only), IBM Plex Mono (labels/meta).
- **Site chrome replaces top nav**: fixed header (left: current page path; center: bold sans "OPM GAMES"; right: utility slot, reserved) + left floating vertical dock as the only navigation (bottom bar on mobile).
- **Homepage**: stripe.dev-inspired — lede above a giant mixed-type display title (sans × pixel keyword × serif italic), `/ LATEST` index list.
- **Blog**: index becomes "The Daily Build" — a newsstand stack of clipped Times headlines (gradient-fade peek, hover expands), section tabs (All / Devlogs / Essays). Post pages continue the newspaper voice.
- **Gallery → "Fotos"**: UI label and routes rename to `/fotos`. Album pages = Kinfolk-style cover (centered serif title + featured hero photo) over a specs.berlin/Snøhetta-style body (columned notes, offset photo grid).
- **Page isolation**: sections are standalone pages reachable via the dock; no continuous scroll between sections (already true via routes; preserved as a design rule).

## Capabilities

### New Capabilities

<!-- None -->

### Modified Capabilities

- `site-foundation`: base layout chrome (header + dock replaces top nav); baseline styling tokens become the full design system.
- `homepage`: layout and content structure redesigned.
- `blog`: index layout (newsstand stack), post page typography, section tabs.
- `gallery`: label/routes rename to Fotos; album page layout (cover + hero + grid).

## Impact

- **Code**: `src/styles/global.css` (new token system), `src/layouts/Base.astro` (header + dock), all page templates, lightbox restyle to match.
- **Routes**: `/gallery/*` → `/fotos/*` (no external links exist yet; sitemap regenerates).
- **Fonts**: 4 Google Fonts + system Times; must subset and self-host or use `font-display: swap` to protect performance budget.
- **Content**: no schema changes; album `photos`/`cover` fields drive the new layouts.
- **Explicitly out of scope**: i18n/language switcher (header right slot is reserved but inert), comments, dark mode, `/games` section.

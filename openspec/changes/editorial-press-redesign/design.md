# Design: editorial-press-redesign

## Context

Direction locked through iterative demos (`_design/site-demo.html` v6 is the reference implementation). Core principle from the owner: **abstract the real world, don't mimic it** — print objects are evoked through typography rules and information hierarchy, never through textures/skeuomorphism. Reference DNA: stripe.dev (sans title × pixel keyword), fionavilmer.com (newsstand-stack clipped headlines), Kinfolk (album covers), specs.berlin/Snøhetta (body typography, whitespace discipline), Metalab (header layout, left vertical nav precedent).

## Goals / Non-Goals

**Goals:**
- One cohesive paper-white system across all pages; sections differ by layout rhythm, not by "skins".
- Typography carries all visual weight: extreme scale contrast (huge display vs tiny mono labels), hairline rules, disciplined whitespace.
- The newsstand stack on the blog index is the signature interaction.
- Pixel font appears ONLY inside display titles on game-related keywords (readability rule from owner).

**Non-Goals:**
- i18n (header right slot reserved), dark mode, comments, view transitions, animated generative art (stripe.dev's canvas figures), per-section material themes (rejected approach from v2).

## Decisions

### D1: Type system (5 voices, strict jobs)

| Voice | Font | Job |
|---|---|---|
| Display sans | Archivo 800, stretched | Page titles, header logo |
| Pixel | Silkscreen 700 | Game-related keywords inside display titles ONLY (`GAMES`, `BUILD`) |
| Serif italic | Newsreader italic | Accent lines inside display titles |
| Book serif | Newsreader 400–500 | Prose, list titles, album covers |
| Newsprint serif | Times New Roman (system) | Blog headline rows (the "newspaper" voice; zero font cost) |
| Mono | IBM Plex Mono 400/500 | All labels, kickers, dates, captions, dock |

### D2: Chrome — fixed header + left dock

Header: left current path (`/ BLOG`), center "OPM GAMES", right reserved slot (inert). Dock: vertical pill, hairline border, mono vertical-rl labels, active = rust square dot (no circles — pixel logic), mobile → bottom bar. Pages never chain-scroll into each other; dock is the only through-line.

### D3: Blog index = newsstand stack

Each post row: mono kicker (`DEVLOG — № 001`) + Times headline clipped to ~2 lines via `max-height` + linear-gradient mask (fade, NOT halftone — halftone was prototyped and rejected) + inline thumbnail chips + dateline. Hover expands (`max-height` transition, mask removed) revealing deck. Section tabs filter Devlogs/Essays (client-side, server-rendered pages per category acceptable v1: tabs as links to `/blog`, `/blog/devlogs`, `/blog/essays` — decision: static filtered routes, no JS filter). Masthead: "The Daily BUILD" between thick/thin rules, vol/issue line in mono.

### D4: Album page = cover + body

Cover: mono issue label, centered Newsreader title (italic accent), italic sub-line, framed hero (album `cover`) with mono caption. Body: justified two-column note (column rule) from album markdown body, then offset 12-col photo grid with mono EXIF-style captions; lightbox retained, restyled to white frame.

### D5: Performance & technique constraints

- Google Fonts via `<link>` with `display=swap`; Archivo/Newsreader loaded as variable instances limited to used axes; Silkscreen single weight (700). Budget: ≤ 120 KB font payload.
- Grain overlay: one tiny SVG feTurbulence data-URI, `mix-blend-mode: overlay`, opacity ≤ .3, `pointer-events: none`.
- Peek rows: pure CSS (gradient mask + max-height); expand on hover/focus-within for keyboard parity; no JS required.
- All decorative techniques are CSS/SVG-only; zero image assets.

## Risks / Trade-offs

- **Silkscreen legibility at small sizes** → rule D1 confines it to large title keywords.
- **Times rendering variance across platforms** → acceptable; it's the "generic newsprint" voice by design.
- **Peek rows hide content** → row remains fully clickable; hover/focus expands; dateline always visible.
- **Font payload** → subset + swap; measure in build task.

## Migration Plan

1. Tokens + fonts in `global.css`; 2. Base.astro chrome; 3. pages one by one (home → blog → fotos → about); 4. route rename `/gallery` → `/fotos` (update sitemap/links; no redirects needed — nothing published); 5. verify build + perf. Rollback: revert commit; design demos live in `_design/` (not built).

# Tasks: editorial-press-redesign

## 1. Foundation

- [x] 1.1 Rewrite `src/styles/global.css` with the design tokens (white bg, grain overlay, ink steps, hairlines, rust accent) and font loading (Archivo, Newsreader, Silkscreen 700, IBM Plex Mono via Google Fonts `display=swap`; Times = system)
- [x] 1.2 Rebuild `src/layouts/Base.astro`: fixed header (left current path, center "OPM GAMES", right reserved slot), left vertical dock (mono labels, rust square active dot), mobile bottom bar; remove top nav; scroll-spy for active state
- [x] 1.3 Shared components/styles: index list rows, kickers, `+++` marks, section page-head

## 2. Pages

- [x] 2.1 Home: lede → mixed-type display title (pixel `GAMES`), `/ LATEST` index, `+++` marks
- [x] 2.2 Blog index: masthead ("The Daily BUILD", vol/issue line), section tabs, newsstand peek rows (Times, gradient mask, hover/focus expand, inline thumb chips)
- [x] 2.3 Category routes: `/blog/devlogs`, `/blog/essays` static filtered pages
- [x] 2.4 Post page: newspaper voice (kicker, Times headline, dateline, justified Newsreader prose, prev/next)
- [x] 2.5 Route rename `/gallery` → `/fotos`: move `src/pages/gallery/` → `src/pages/fotos/`, update all links/sitemap references, Fotos index page
- [x] 2.6 Album page: cover (issue label, centered serif title, framed hero) + columned body + offset grid; restyle lightbox to white hairline frame
- [x] 2.7 About page: display title (no pixel) + cv grid; tags page adapted to index-list style
- [x] 2.8 RSS/feed copy unchanged; verify sitemap reflects `/fotos`

## 3. Verification

- [x] 3.1 `astro build` passes; all routes present; no `/gallery` remnants
- [x] 3.2 Font payload measured ≤ 120 KB; page weight budget holds
- [x] 3.3 Mobile pass: bottom dock, single-column fallbacks, readable pixel sizes
- [x] 3.4 obscura visual check of all pages + owner browser review of final look
- [x] 3.5 `_design/` kept as design archive (outside src/, never built)

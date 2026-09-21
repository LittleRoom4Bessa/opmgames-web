# Spec: site-foundation (delta)

## MODIFIED Requirements

### Requirement: Base layout

All pages SHALL share a base layout providing: a fixed header (left: current page path such as `/ BLOG`; center: bold sans wordmark "OPM GAMES" linking home; right: a reserved utility slot rendered inert); a floating vertical dock on the left as the sole site navigation (links: Home, Blog, Fotos, About), with hairline border, blurred translucent background, mono vertical labels, and a rust square-dot active indicator; SEO meta; and the global stylesheet. On narrow viewports the dock SHALL become a fixed bottom bar. Pages SHALL NOT chain into one another by scrolling; the dock (and in-content links) are the only navigation between sections.

#### Scenario: Shared chrome

- **WHEN** any page loads
- **THEN** the fixed header and the dock are present and consistent

#### Scenario: Current location is visible

- **WHEN** a visitor is on a page
- **THEN** the header shows the current page path and the dock marks the active item with a rust square dot

#### Scenario: No scroll chaining

- **WHEN** a visitor scrolls to the bottom of any page
- **THEN** no other section is revealed below; reaching another section requires the dock or a link

#### Scenario: Mobile navigation

- **WHEN** the viewport is narrow (≤ 760px)
- **THEN** the dock collapses to a fixed bottom bar with horizontal labels

### Requirement: Baseline styling tokens

Global styles SHALL define the editorial-press design token layer: background white (`#ffffff`) with a fixed full-viewport SVG grain overlay (mix-blend overlay, opacity ≤ 0.3, pointer-events none); ink `#1b1915` with 62%/35% opacity steps; hairline rules (`rgba(27,25,21,.18)`); single rust accent `#b5501f` reserved for active/hover/selection; type roster — Archivo (display sans), Newsreader (serif body and italic title accents), Times New Roman system serif (blog headlines), Silkscreen 700 (pixel, restricted to game-related keywords inside display titles), IBM Plex Mono (all labels, dates, captions, dock). `::selection` uses the rust accent.

#### Scenario: Token foundation

- **WHEN** a page template applies token variables
- **THEN** colors, hairlines, and type roles render per the roster without per-page overrides

#### Scenario: Pixel font discipline

- **WHEN** any text is rendered
- **THEN** Silkscreen appears only on game-related keywords within display-size titles, never in body text, labels, dates, or navigation

### Requirement: Performance budget

First load of any page SHALL stay under 1 MB total transferred on desktop, with fonts subset/limited to used weights and loaded with `font-display: swap`; images optimized via `astro:assets`; zero JavaScript by default except where a component opts in (dock scroll-spy, lightbox).

#### Scenario: Fast first load

- **WHEN** the production build is inspected
- **THEN** pages contain no framework JS bundles and font payload stays within the ≤120 KB budget

## RENAMED Requirements

- None

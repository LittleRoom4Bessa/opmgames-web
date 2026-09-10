# Spec: gallery

## ADDED Requirements

### Requirement: Album content collection

Gallery albums SHALL be authored as content collection entries with a validated frontmatter schema: `title` (string, required), `description` (string, required), `date` (date, required), `cover` (image, required), `tags` (array of strings, default empty — same taxonomy as blog tags), and `photos` (required, non-empty array of `{ src: image, alt: string, caption?: string }`). The album body SHALL support free Markdown text displayed on the album page.

#### Scenario: Invalid album rejected

- **WHEN** an album is missing `cover` or has an empty `photos` array
- **THEN** the build fails with a schema validation error naming the offending file

### Requirement: Gallery index

`/gallery` SHALL list all albums in reverse chronological order, each shown with its cover image, title, and date, linking to the album page.

#### Scenario: Album listing

- **WHEN** a visitor opens `/gallery`
- **THEN** albums render as a cover grid, newest first, each linking to `/gallery/<slug>`

### Requirement: Album page with grid and lightbox

Each album SHALL have a page at `/gallery/[slug]` rendering the album title, date, body text, linked tags, and a grid of its photos (each photo displaying its `alt` semantics and optional `caption`). Clicking a photo SHALL open a lightbox showing the full-size image with the ability to navigate between the album's photos and close the lightbox.

#### Scenario: Grid rendering

- **WHEN** a visitor opens an album page
- **THEN** photos render in a grid in the order defined in frontmatter, with captions where provided

#### Scenario: Lightbox navigation

- **WHEN** a visitor clicks a photo
- **THEN** a lightbox opens at full size and allows moving to previous/next photo and closing (including via keyboard Escape)

### Requirement: Image optimization

Gallery photos and covers SHALL be processed through Astro's image optimization (responsive `srcset` with multiple widths, modern formats such as WebP, lazy loading for below-the-fold images).

#### Scenario: Responsive images

- **WHEN** an album page's HTML is inspected
- **THEN** photo `<img>` elements carry `srcset`/`sizes` with multiple widths and `loading="lazy"` where below the fold

### Requirement: Unified tag pages

`/tags/[tag]` SHALL aggregate both blog posts and gallery albums carrying that tag, each entry linking to its page. Tag links from posts and albums SHALL point to these unified pages.

#### Scenario: Cross-type aggregation

- **WHEN** a tag exists on at least one post and at least one album
- **THEN** `/tags/<tag>` lists both, grouped or labeled by content type

#### Scenario: Tag page from post

- **WHEN** a visitor clicks a tag on a post or album
- **THEN** they land on the unified tag page for that tag

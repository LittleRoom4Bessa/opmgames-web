# Spec: gallery (delta)

Note: the capability keeps the internal name `gallery`; the UI label and routes become "Fotos" / `/fotos`.

## MODIFIED Requirements

### Requirement: Album collection

Albums SHALL be authored as content entries with a typed schema: `title`, `description`, `date`, `cover` (image), `tags` (array of strings), and `photos` (non-empty array of `{ src, alt, caption? }`). The section SHALL be labeled "Fotos" in all UI copy, and routes SHALL be `/fotos` (index) and `/fotos/<album>/`; the former `/gallery` paths are removed (the site has no inbound links to preserve).

#### Scenario: Author an album

- **WHEN** an author adds an album directory with frontmatter and photos
- **THEN** the build validates the schema and generates its pages under `/fotos/`

### Requirement: Album page

An album page SHALL present: a cover section (mono issue label, centered serif title with italic accent, italic sub-line, the `cover` photo in a white hairline frame with a mono caption row); a body section (album text in justified columns with a hairline column rule, single column on mobile); and an offset 12-column photo grid. Each photo SHALL open in a full-screen lightbox when activated; the lightbox SHALL show a white hairline frame consistent with the grid presentation.

#### Scenario: View an album

- **WHEN** a visitor opens `/fotos/<album>/`
- **THEN** the cover, body text, and photo grid render in that order

#### Scenario: Lightbox

- **WHEN** a visitor activates a photo
- **THEN** the photo displays full-screen with alt text available and dismissal works via click and keyboard

### Requirement: Optimized images

Photos SHALL be processed at build time into responsive sizes with modern formats and lazy loading.

#### Scenario: Responsive photo delivery

- **WHEN** an album page is built
- **THEN** each photo emits multiple width variants and a srcset

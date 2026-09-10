# Spec: blog

## ADDED Requirements

### Requirement: Blog content collection

Blog posts SHALL be authored as Markdown/MDX files in a typed content collection with a validated frontmatter schema: `title` (string, required), `description` (string, required), `pubDate` (date, required), `category` (enum: `devlog` | `essay`, required), `tags` (array of strings, default empty), `game` (string, optional — reserved for a future `/games` section; no UI renders it in this change), `draft` (boolean, default false).

#### Scenario: Invalid frontmatter rejected

- **WHEN** a post has a missing required field or a `category` outside `devlog`/`essay`
- **THEN** the build fails with a schema validation error naming the offending file

#### Scenario: Draft exclusion

- **WHEN** a post has `draft: true`
- **THEN** it is excluded from production builds and all listing pages

### Requirement: Blog index with category filter

`/blog` SHALL list all non-draft posts in reverse chronological order, showing title, date, category, and tags, and SHALL provide filtering by category (`devlog` | `essay` | all).

#### Scenario: Reverse chronological listing

- **WHEN** a visitor opens `/blog`
- **THEN** posts are listed newest first with title, date, and category visible

#### Scenario: Filter by category

- **WHEN** a visitor selects the `devlog` filter
- **THEN** only posts with `category: devlog` are shown

### Requirement: Post pages

Each non-draft post SHALL have a page at `/blog/[slug]` rendering its content with a header showing title, date, category, and tags, where each tag links to the unified tag page for that tag.

#### Scenario: Post rendering

- **WHEN** a visitor opens `/blog/<slug>` for an existing non-draft post
- **THEN** the post content renders with title, date, category, and linked tags

### Requirement: RSS feed

The site SHALL expose an RSS feed at `/rss.xml` containing all non-draft blog posts.

#### Scenario: Feed content

- **WHEN** `/rss.xml` is requested
- **THEN** it contains a valid RSS document listing all non-draft posts with title, link, date, and description

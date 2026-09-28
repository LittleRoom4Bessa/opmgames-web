# blog Specification

## Purpose

The blog publishes devlogs and essays as Markdown/MDX posts with a fixed category enum and free-form tags, an index with category filtering, per-post pages, and an RSS feed.

## Requirements

### Requirement: Blog content collection

Blog posts SHALL be authored as Markdown/MDX files in a typed content collection with a validated frontmatter schema: `title` (string, required), `description` (string, required), `pubDate` (date, required), `category` (enum: `devlog` | `essay`, required), `tags` (array of strings, default empty), `lang` (enum: `en` | `zh`, default `en`), `translationOf` (string, optional — slug of the original post when this entry is a translation), `game` (string, optional — reserved for a future `/games` section; no UI renders it), `draft` (boolean, default false).

#### Scenario: Invalid frontmatter rejected

- **WHEN** a post has a missing required field or a `category` outside `devlog`/`essay`
- **THEN** the build fails with a schema validation error naming the offending file

#### Scenario: Draft exclusion

- **WHEN** a post has `draft: true`
- **THEN** it is excluded from production builds and all listing pages

### Requirement: Blog index with category filter

`/blog` SHALL list all non-draft original posts (translations excluded) in reverse chronological order, showing title, date, category, a stable issue number, and available languages, and SHALL provide filtering by category (`devlog` | `essay` | all).

#### Scenario: Reverse chronological listing

- **WHEN** a visitor opens `/blog`
- **THEN** posts are listed newest first with title, date, and category visible

#### Scenario: Filter by category

- **WHEN** a visitor selects the `devlog` filter
- **THEN** only posts with `category: devlog` are shown

### Requirement: Stable issue numbering

Each original post SHALL carry a stable issue number displayed on index rows and post pages, with the oldest original numbered № 001 and newer originals numbered consecutively. Translations SHALL share their original's number and SHALL NOT affect numbering.

#### Scenario: Translation does not shift numbers

- **WHEN** a translation entry is added for an existing post
- **THEN** every post's issue number remains unchanged

### Requirement: Translations

A post MAY have translation entries: separate collection entries with `translationOf` set to the original's slug and a different `lang`. A translation SHALL have its own page at `/blog/<slug>` with `<html lang>` set accordingly, a `hreflang` alternate link, and a visible cross-language link to its sibling. Translations SHALL be excluded from index pages, tag pages, issue numbering, and prev/next navigation, and SHALL be included in the RSS feed.

#### Scenario: Translation page exists but stays out of indexes

- **WHEN** a post has a translation
- **THEN** both pages render and cross-link to each other, while `/blog`, category filters, and tag pages list only the original

#### Scenario: Redirect to a readable language

- **WHEN** a visitor opens a post whose `lang` is absent from `navigator.languages` and a translation's `lang` is present
- **THEN** the page redirects to the translation via `location.replace` — unless the visitor used the manual language switch earlier in the session, in which case no redirect occurs

#### Scenario: Index marks available languages

- **WHEN** a post with a translation is listed on the blog index
- **THEN** its row marks all available languages (e.g. `ZH · EN`)

### Requirement: Post pages

Each non-draft post SHALL have a page at `/blog/[slug]` rendering its content with `<html lang>` matching the post's `lang`, a header showing title, date, category, issue number, and tags, where each tag links to the unified tag page for that tag.

#### Scenario: Post rendering

- **WHEN** a visitor opens `/blog/<slug>` for an existing non-draft post
- **THEN** the post content renders with title, date, category, and linked tags

### Requirement: RSS feed

The site SHALL expose an RSS feed at `/rss.xml` containing all non-draft blog posts.

#### Scenario: Feed content

- **WHEN** `/rss.xml` is requested
- **THEN** it contains a valid RSS document listing all non-draft posts with title, link, date, and description

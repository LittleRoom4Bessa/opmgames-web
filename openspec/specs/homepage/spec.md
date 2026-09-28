# homepage Specification

## Purpose

The homepage introduces the site owner and surfaces the latest blog posts and gallery albums as entry points into the site.

## Requirements

### Requirement: Hero section

The homepage SHALL present a hero section introducing the site as a one-person studio with a short tagline. Identity claims SHALL follow the no-unearned-claims rule (see about-page spec).

#### Scenario: First impression

- **WHEN** a visitor opens `/`
- **THEN** the hero communicates what this site is about, above the fold, without claiming credentials not backed by shipped work

### Requirement: Latest content entry points

The homepage SHALL surface the most recent content — blog posts and gallery albums merged into a single reverse-chronological list (e.g. latest 5) — each entry linking to its page, with links onward to the full Blog and Gallery indexes. Translated blog entries SHALL NOT appear as separate rows (see blog spec).

#### Scenario: Latest content shown

- **WHEN** a visitor opens `/` and at least one non-draft post or album exists
- **THEN** the latest entries are listed with title, content type, and date, linking to their pages

#### Scenario: Empty state

- **WHEN** no published content exists
- **THEN** the list renders an explicit empty state instead of a bare rule

#### Scenario: Empty state

- **WHEN** no posts or albums exist yet
- **THEN** the homepage still renders cleanly without broken sections

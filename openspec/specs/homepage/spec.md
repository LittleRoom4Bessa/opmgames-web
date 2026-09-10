# homepage Specification

## Purpose

The homepage introduces the site owner and surfaces the latest blog posts and gallery albums as entry points into the site.

## Requirements

### Requirement: Hero section

The homepage SHALL present a hero section introducing the owner (name/identity as an indie game developer) with a short tagline.

#### Scenario: First impression

- **WHEN** a visitor opens `/`
- **THEN** the hero communicates who the owner is and what this site is about, above the fold

### Requirement: Latest content entry points

The homepage SHALL surface the most recent blog posts (e.g. latest 3–5) and the most recent gallery albums (e.g. latest 3), each linking to the corresponding page, plus links to the full Blog and Gallery indexes.

#### Scenario: Latest posts shown

- **WHEN** a visitor opens `/` and at least one non-draft post exists
- **THEN** the latest posts are listed with title, date, and category, linking to the post pages

#### Scenario: Latest albums shown

- **WHEN** a visitor opens `/` and at least one album exists
- **THEN** the latest albums are listed with cover image and title, linking to the album pages

#### Scenario: Empty state

- **WHEN** no posts or albums exist yet
- **THEN** the homepage still renders cleanly without broken sections

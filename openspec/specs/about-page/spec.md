# about-page Specification

## Purpose

The About page presents the site owner as a resume-style single page: craft, tools, external links, and a filmography of shipped game credits. Authored in Markdown/MDX.

## Requirements

### Requirement: Resume-style about page

`/about` SHALL present a resume-style single page containing: key/value rows for craft, tools, and external links, followed by a shipped-titles filmography. Content SHALL be authored in Markdown/MDX so the owner can edit it without touching layout code.

#### Scenario: Page rendering

- **WHEN** a visitor opens `/about`
- **THEN** craft, tools, links, and the filmography render within the base layout

#### Scenario: Editable content

- **WHEN** the owner edits the about page's Markdown source
- **THEN** the rendered page updates without any layout/component changes

### Requirement: Shipped-titles filmography

The filmography SHALL list shipped game credits newest first, each row showing a sequence number, the exact shipped title, and the year, linking to the title's public store page (new tab, `rel="noopener noreferrer"`). The role SHALL be stated once for the whole list ("shipped — as technical artist"), not repeated per row. Studio or publisher names SHALL NOT appear.

#### Scenario: Verified titles

- **WHEN** the filmography renders
- **THEN** every title is spelled exactly as shipped and links to a live public store page

### Requirement: No unearned claims

The site SHALL NOT describe the owner with titles not backed by shipped work (e.g. "indie game developer" before a game ships). Self-descriptions SHALL state activities ("building", "making") rather than unearned identities.

#### Scenario: Copy review

- **WHEN** new copy is added anywhere on the site
- **THEN** it contains no identity claims beyond what shipped work supports

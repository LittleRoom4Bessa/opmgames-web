# about-page Specification

## Purpose

The About page presents the site owner as a resume-style single page (bio, experience, skills, external links), authored in Markdown/MDX.

## Requirements

### Requirement: Resume-style about page

`/about` SHALL present a resume-style single page containing: a short bio/introduction, experience (roles/projects with dates), skills, and external links (e.g. GitHub, email, social). Content SHALL be authored in Markdown/MDX so the owner can edit it without touching layout code.

#### Scenario: Page rendering

- **WHEN** a visitor opens `/about`
- **THEN** bio, experience, skills, and links sections render within the base layout

#### Scenario: Editable content

- **WHEN** the owner edits the about page's Markdown source
- **THEN** the rendered page updates without any layout/component changes

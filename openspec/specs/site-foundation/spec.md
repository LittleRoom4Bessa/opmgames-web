# site-foundation Specification

## Purpose

The site foundation provides the Astro static site scaffold, shared base layout and navigation, baseline styling tokens, SEO basics, and the GitHub Actions deployment pipeline to GitHub Pages at the custom domain.

## Requirements

### Requirement: Astro static site project

The system SHALL be an Astro project producing a fully static build (`dist/`) with no server-side runtime requirements, with all dependencies version-pinned in `package.json`.

#### Scenario: Production build

- **WHEN** `npm run build` is executed
- **THEN** a static site is emitted to `dist/` containing all pages, and drafts are excluded

#### Scenario: Local development

- **WHEN** `npm run dev` is executed
- **THEN** the site is served locally with hot reload and drafts visible

### Requirement: Base layout and navigation

Every page SHALL render within a shared base layout containing a site header with navigation links to Home (`/`), Blog (`/blog`), Gallery (`/gallery`), and About (`/about`), and a site footer. All site UI text SHALL be in English.

#### Scenario: Navigation present on all pages

- **WHEN** any page of the site is rendered
- **THEN** the header shows links to Home, Blog, Gallery, and About, and the current section is visually indicated

#### Scenario: Responsive layout

- **WHEN** any page is viewed on mobile (≤ 640px) and desktop widths
- **THEN** navigation and content remain usable without horizontal scrolling

### Requirement: Baseline styling tokens

The site SHALL define a minimal set of CSS custom-property tokens (a small color set, one readable font stack, a spacing scale) in a global stylesheet, applied consistently across pages. Visual identity work (distinctive fonts, palette, motifs, motion) SHALL NOT be part of this capability as implemented here and is deferred to future changes.

#### Scenario: Consistent baseline styling

- **WHEN** any two pages are compared
- **THEN** they share the same color palette, font stack, and spacing scale derived from the shared tokens

### Requirement: SEO and feed basics

The site SHALL emit a `sitemap.xml` including all non-draft pages, set a canonical URL of `https://opmgames.com` per page, and provide per-page `<title>` and meta description.

#### Scenario: Sitemap generation

- **WHEN** the site is built
- **THEN** `sitemap.xml` lists all public pages and excludes drafts

#### Scenario: Page metadata

- **WHEN** any page is rendered
- **THEN** the HTML head contains a unique title and meta description

### Requirement: Deployment pipeline

The site SHALL deploy automatically to GitHub Pages via a GitHub Actions workflow on every push to `main`, and SHALL be served at the custom domain `https://opmgames.com` (with `www` redirecting to apex) over HTTPS.

#### Scenario: Deploy on push

- **WHEN** a commit is pushed to `main`
- **THEN** the workflow builds the site and deploys it to GitHub Pages without manual steps

#### Scenario: Custom domain

- **WHEN** a visitor requests `https://opmgames.com` or `https://www.opmgames.com`
- **THEN** the site loads over HTTPS at the apex domain

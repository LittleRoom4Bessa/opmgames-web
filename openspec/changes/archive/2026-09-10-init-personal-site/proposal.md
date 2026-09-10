# Proposal: init-personal-site

## Why

The domain `opmgames.com` is registered and the repo is empty. We need to bootstrap a personal website from zero: a home base for the owner's indie game developer identity, a blog for devlogs and essays, a photo gallery, and a resume-style about page — all served as a static site on GitHub Pages under the custom domain.

## What Changes

- Scaffold an **Astro** static site project (content collections, image optimization, sitemap, RSS) deployed to **GitHub Pages** via GitHub Actions, with `opmgames.com` as the custom domain (CNAME + DNS).
- Establish a **functional baseline layout**: site header with navigation (Home / Blog / Gallery / About), footer, and a minimal set of CSS tokens (color, type, spacing) sufficient for a clean, consistent, readable site. All site content is in **English**. **Visual identity work is explicitly deferred** to later changes.
- Build the **Homepage**: hero section introducing the owner, plus entry points to latest blog posts and latest albums.
- Build the **Blog**: Markdown/MDX posts with frontmatter `category` (fixed set: `devlog` | `essay`) and free-form `tags`; index page with category filtering, tag pages, per-post pages, and an RSS feed. Frontmatter reserves an optional `game` field so devlogs can be grouped under a future `/games` section without rework.
- Build the **Gallery**: photo albums as a content collection — each album has a title, cover, date, body text, and an ordered list of photos each with an optional caption. Grid-style album pages with a lightbox for full-size viewing. Albums share the same tag taxonomy as the blog, enabling cross-linking (e.g. a trip essay ↔ its photo album). The data model keeps per-photo captions so a narrative long-form template can be added later without restructuring content.
- Build the **About page**: resume-style single page (experience, skills, links).
- **Out of scope (deferred)**: **visual identity / aesthetic tuning** (fonts, palette, motifs, motion — a plain functional baseline is enough for launch; dedicated visual-design changes come later); a `/games` section (added after the first game ships — only the `game` frontmatter field is reserved now); comments; bilingual content; narrative-style album template.

## Capabilities

### New Capabilities

- `site-foundation`: Astro project scaffolding, base layout, navigation/footer, minimal baseline CSS tokens, SEO basics (sitemap), GitHub Actions deployment to GitHub Pages with custom domain.
- `homepage`: Landing page with hero and latest-content entry points.
- `blog`: Blog content collection, post pages, category/tag taxonomy, index with filtering, RSS feed.
- `gallery`: Album content collection, album index, grid album pages with lightbox, image optimization, shared tag taxonomy with blog.
- `about-page`: Resume-style about page.

### Modified Capabilities

<!-- None — greenfield repo, no existing specs. -->

## Impact

- **New code**: entire Astro project (`package.json`, `astro.config`, `src/`, `public/`), GitHub Actions workflow (`.github/workflows/deploy.yml`).
- **Dependencies**: Astro and official integrations (MDX, sitemap, RSS); deployed to GitHub Pages.
- **External systems**: GitHub repo Pages settings; DNS records for `opmgames.com` at the registrar (A/AAAA records or ALIAS pointing to GitHub Pages).
- **Design**: visual identity is **out of scope** for this change; a `frontend-design` skill is available locally for future dedicated visual-design changes.

# Tasks: init-personal-site

## 1. Project scaffolding

- [x] 1.1 Initialize Astro project in repo root (`package.json`, `astro.config.mjs`, `tsconfig.json`), pin dependency versions, add `.gitignore` (node_modules, dist, .astro)
- [x] 1.2 Add official integrations: `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/rss`; set `site: 'https://opmgames.com'` in config
- [x] 1.3 Create base directory structure (`src/layouts`, `src/components`, `src/pages`, `src/content`, `src/styles`, `public/`) and verify `npm run dev` / `npm run build` work

## 2. Baseline styling & base layout

- [x] 2.1 Implement global stylesheet with a minimal set of CSS custom-property tokens (small color set, one readable font stack, spacing scale) — NO visual identity work (fonts/palette/motifs/motion) in this change
- [x] 2.2 Build base layout component: header with nav (Home / Blog / Gallery / About + active-section indication), footer, per-page `<title>`/meta description slots, canonical URLs
- [x] 2.3 Verify responsive behavior at mobile and desktop widths (no horizontal scroll, usable nav)

## 3. Content collections

- [x] 3.1 Define `blog` collection schema in content config (title, description, pubDate, category enum devlog|essay, tags[], optional game, draft) with drafts excluded from production builds
- [x] 3.2 Define `albums` collection schema (title, description, date, cover image, tags[], photos[] with src/alt/optional caption) — confirm content-config file location for the installed Astro major version
- [x] 3.3 Add sample content: 2–3 blog posts (at least one per category, one with `draft: true`, one with a `game` field) and 1–2 albums with real photos + captions

## 4. Blog

- [x] 4.1 Build `/blog` index: reverse-chronological list with title/date/category/tags and category filter (all / devlog / essay)
- [x] 4.2 Build `/blog/[slug]` post pages with header (title, date, category, linked tags)
- [x] 4.3 Add RSS feed at `/rss.xml` covering all non-draft posts
- [x] 4.4 Verify schema validation fails the build on bad frontmatter, and drafts are excluded from build output and listings

## 5. Gallery

- [x] 5.1 Build `/gallery` index: cover grid, reverse chronological, linking to albums
- [x] 5.2 Build `/gallery/[slug]` album pages: title, date, body Markdown, linked tags, ordered photo grid with captions
- [x] 5.3 Implement lightbox (dependency-free): full-size view, prev/next, close on Escape
- [x] 5.4 Wire `astro:assets` optimization for covers and photos (responsive srcset, WebP, lazy loading)

## 6. Unified tags & homepage & about

- [x] 6.1 Build `/tags/[tag]` pages aggregating posts + albums, labeled by content type; point all tag links there
- [x] 6.2 Build homepage: hero (owner identity + tagline), latest posts (with title/date/category), latest albums (cover + title), links to full indexes; handle empty state
- [x] 6.3 Build `/about` resume-style page from a Markdown/MDX source (bio, experience, skills, links) — placeholder content for the owner to fill

## 7. Deployment

- [x] 7.1 Add `.github/workflows/deploy.yml`: build on push to `main`, upload `dist/` artifact, deploy to GitHub Pages
- [x] 7.2 Add `public/CNAME` with `opmgames.com`; configure repo Pages settings (source: GitHub Actions)
- [ ] 7.3 Configure DNS at registrar: apex A records to GitHub's 4 IPs, `www` CNAME to `<user>.github.io`; verify `www` redirects to apex
- [ ] 7.4 After certificate issuance, enable "Enforce HTTPS"; verify `https://opmgames.com` loads and sitemap/RSS are reachable

## 8. Polish & acceptance

- [x] 8.1 Cross-page consistency check against baseline tokens (palette, font stack, spacing uniform)
- [x] 8.2 Validate sitemap.xml contains all public pages and excludes drafts; validate RSS feed in a reader
- [ ] 8.3 Owner review pass on real content; replace sample/placeholder content as needed

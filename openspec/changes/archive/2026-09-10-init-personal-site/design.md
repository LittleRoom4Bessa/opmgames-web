# Design: init-personal-site

## Context

Greenfield repo (`opmgames-web`) with only OpenSpec planning artifacts. The owner is an indie game developer; `opmgames.com` is the personal brand domain. All site content is English. No comments system. First game has not shipped yet, so no `/games` section now — but devlogs must be future-compatible with it.

## Goals / Non-Goals

**Goals:**
- Fully static site, deployed to GitHub Pages from `main` via GitHub Actions; custom domain `opmgames.com`.
- Content authored in Markdown/MDX with typed frontmatter schemas (Astro Content Collections).
- Blog with fixed categories (`devlog` | `essay`) + free-form tags; RSS; tag pages.
- Gallery as album collections (grid template + lightbox), sharing the blog's tag taxonomy.
- Functional, consistent baseline styling only (minimal CSS tokens; visual identity is deferred).
- Fast: optimized images, minimal JS shipped.

**Non-Goals:**
- **Visual identity / aesthetic tuning** (fonts, palette, motifs, motion) — handled by future dedicated changes.
- `/games` section, comments, bilingual/i18n, narrative-style album template, search, analytics (defer all).

## Decisions

### D1: Astro (over Hugo / Jekyll / Next.js)

Astro Content Collections model the two content types (posts, albums) with Zod-validated schemas; built-in image optimization (`astro:assets`) handles gallery photos; zero-JS-by-default output matches GitHub Pages; RSS/sitemap are official integrations. Hugo is lighter but templating is dated and image processing for albums is clunkier; Jekyll is native to Pages but slow and Ruby-dependent; Next.js is over-engineered for a static content site.

### D2: Deployment — GitHub Actions → Pages (over branch-publish)

Workflow builds on push to `main`, uploads `dist/` via `actions/upload-pages-artifact`, deploys with `actions/deploy-pages`. Requires no `gh-pages` branch gymnastics. Custom domain via `public/CNAME` containing `opmgames.com` + repo Pages settings; DNS at registrar: apex `A` records to GitHub's four IPs (185.199.108–111.153), `www` CNAME to `<user>.github.io`. Enforce HTTPS once certificates provision.

### D3: Content model

Two collections under `src/content/` (Astro v5 `src/content.config.ts` with loaders; config file location depends on Astro major version — confirm at scaffold time):

```
blog/                          albums/
└── <slug>/index.md(x)         └── <slug>/index.md
    frontmatter:                    frontmatter:
    • title                         • title
    • description                   • description
    • pubDate                       • date
    • category: devlog|essay        • cover (image)
    • tags: string[]                • tags: string[]
    • game?: string  ◄── reserved   • photos: [{ src, alt, caption? }]
    • draft?: boolean
```

- **Category vs tags (asymmetric design)**: category is a fixed enum driving navigation/filtering ("what kind of writing is this"); tags are free-form and shared across blog + albums ("what is this about"), enabling essay ↔ album cross-links. Albums have no category field.
- **`game?: string`** reserved on blog posts only; no UI renders it yet. When the first game ships, a `/games` section can group devlogs by this field with zero content migration.
- **Albums**: photos listed in frontmatter with optional per-photo captions. Initial template renders a grid + lightbox with album-level body text; the caption data also supports a future narrative/interleaved template without restructuring content.
- Drafts excluded from production builds (`draft: true`).

### D4: Routing

```
/                 homepage (hero + latest posts + latest albums)
/blog             post index, filterable by category
/blog/[slug]      post page
/blog/tags/[tag]  posts by tag
/gallery          album index (covers grid)
/gallery/[slug]   album page (photo grid + lightbox)
/gallery/tags/[tag] albums by tag        ◄── or unify as /tags/[tag] across both
/about            resume-style page
/rss.xml          blog RSS
```

Open point: a unified `/tags/[tag]` page aggregating posts + albums is more "personal site flavored"; separate tag pages per section are simpler. Default: **unified `/tags/[tag]`** showing both content types, unless implementation friction appears.

### D5: Styling — functional baseline only

Scoped CSS in Astro components + a global stylesheet with a minimal set of CSS custom-property tokens (a small color set, one readable font stack, a spacing scale). No CSS framework (Tailwind adds tooling weight without payoff at this scale). **Visual identity work (distinctive fonts, palette, motifs, motion) is explicitly out of scope for this change**; it will be tackled in future dedicated changes, optionally guided by the local `frontend-design` skill.

### D6: Image handling

Gallery and blog images processed via `astro:assets` (responsive `srcset`, modern formats). Originals live inside each content folder (colocated). Lightbox: minimal dependency-free implementation (dialog element or small custom script) — no heavy gallery library.

## Risks / Trade-offs

- **GitHub Pages constraints** (static only, no server logic) → acceptable by design; no forms/comments planned.
- **Large photo libraries will grow repo size** → mitigate with Astro image optimization output; if albums ever reach hundreds of MB, revisit (external asset host or LFS). Not a concern at launch scale.
- **Custom domain HTTPS provisioning lag** → DNS first, enable "Enforce HTTPS" after certificate issuance.
- **Astro major-version drift in content config API** → pin versions in package.json; verify config location at scaffold time.

## Migration Plan

N/A — greenfield. Rollback = revert commit; Pages redeploys previous state.

## Open Questions

- ~~Visual identity specifics~~ — deferred to a future dedicated change.
- Owner's display name / bio / resume content — placeholder content at first, owner fills in.
- Whether `www.opmgames.com` should redirect to apex (default: yes).

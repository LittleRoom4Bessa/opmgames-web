# opmgames-web

Personal site of OPM (indie game developer) — **https://opmgames.com**

Built with [Astro](https://astro.build), deployed to GitHub Pages.

## Commands

```bash
npm install      # install dependencies
npm run dev      # local dev server (drafts visible)
npm run build    # production build → dist/
npm run preview  # preview production build
```

## Content

- Blog posts: `src/content/blog/<slug>.md` — frontmatter: `title`, `description`, `pubDate`, `category` (`devlog` | `essay`), `tags`, optional `game`, `draft: true` to hide from production.
- Albums: `src/content/albums/<slug>/index.md` + colocated photos — frontmatter: `title`, `description`, `date`, `cover`, `tags`, `photos` (`src`/`alt`/optional `caption`).
- About page: `src/pages/about.mdx`.

## Release flow

- `main` — development stream. Push freely; **does not deploy**.
- `release` — production stream. Protected: changes arrive only via PR with the `build` check passing. Merging deploys to production automatically.

```bash
# publish what's on main:
gh pr create --base release --head main --title "release: <what's new>"
gh pr merge --merge   # NOT --squash: squash diverges release/main history
```

# AGENTS.md

Personal site of OPM — Astro (static), deployed to GitHub Pages. Commands and the deploy flow live in README.md. Domain behavior is specified in `openspec/specs/` — when behavior changes, update the spec in the same commit.

## Workflow

- Feature work lands on `dev`; the owner eyeballs changes in their own browser (`npm run dev`, :4321) before merge to `main`.
- Deploy = release PR per README (merge commit, not squash).
- After content or layout changes, verify with `npm run build` and grep the `dist/` output for the expected markup — a green build does not prove the right thing rendered.

## Editorial rules

- No unearned claims: OPM is never described as an indie game developer until a game ships. Credentials come from shipped work (see the About filmography).
- Chinese copy: curly quotes “ ”, adverbial 地 (not 的). Posts declare `lang` in frontmatter.

## Conventions the code can't tell you

- Translations are separate collection entries with `translationOf: <original slug>`: they get their own page and an RSS item, but stay out of indexes, № numbering, and prev/next. Details: `openspec/specs/blog/spec.md`.
- Typesetting pairs the two languages at equal physical width: en prose `72ch` ≈ zh prose `32em` (~590px). Retune one only together with the other.
- Transitions list properties explicitly (`transition: color 0.25s`); animate transform/opacity, not padding. One `:focus-visible` ring style is defined globally — extend it rather than inventing new ones.

## Tooling gotcha

- obscura screenshots cannot render CJK (tofu boxes) and miscompute `calc()` with `ch` units — never judge zh layout or calc-heavy CSS from obscura output; ask the owner to eyeball.

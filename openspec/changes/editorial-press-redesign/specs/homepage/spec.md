# Spec: homepage (delta)

## MODIFIED Requirements

### Requirement: Homepage content

The homepage SHALL present: a lede paragraph above a giant mixed-type display title (bold sans with a pixel-font game-related keyword and a serif-italic closing line — stripe.dev-style mixing); decorative `+++` grid marks; and a `/ LATEST` index list of recent posts and albums (mono number, serif title, mono category and date; row hover indents and italicizes the title). Each row links to its page.

#### Scenario: Latest content surfacing

- **WHEN** a visitor opens the homepage
- **THEN** the index list shows the most recent published posts and albums, each linking to its page

#### Scenario: Display title mixing

- **WHEN** the display title renders
- **THEN** sans, pixel, and serif-italic voices appear in one title block, pixel restricted to the game-related keyword

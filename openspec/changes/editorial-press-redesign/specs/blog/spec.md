# Spec: blog (delta)

## MODIFIED Requirements

### Requirement: Blog index page

The blog index SHALL present as "The Daily Build": a masthead (bold sans title with pixel keyword, between thick/thin rules, with a mono volume/issue line); section tabs linking to `/blog` (all), `/blog/devlogs`, `/blog/essays` (static filtered routes); and a newsstand stack of post rows. Each row: mono kicker (`CATEGORY — № NNN`), a Times serif headline clipped to ~2 lines with a linear-gradient fade (the "stacked newspapers" peek), optional inline thumbnail chips, a mono dateline, and the description revealed on hover/focus expansion. Rows are fully clickable links to the post.

#### Scenario: Newsstand stack

- **WHEN** a visitor opens the blog index
- **THEN** posts render as clipped Times headline rows with gradient-fade bottom edges, ordered newest first

#### Scenario: Peek expansion

- **WHEN** a visitor hovers or keyboard-focuses a row
- **THEN** the headline unclips and the deck (description) fades in

#### Scenario: Section filter

- **WHEN** a visitor activates the Devlogs or Essays tab
- **THEN** they navigate to a statically generated page listing only that category, with the tab marked current

### Requirement: Blog post page

Each post page SHALL render in the newspaper voice: mono kicker (category + number), Times serif headline, mono dateline, then Newsreader body prose (justified, hyphenated, comfortable measure). Tag chips link to unified tag pages; prev/next post links appear at the end.

#### Scenario: Read a post

- **WHEN** a visitor opens a post
- **THEN** the article renders in the newspaper voice and prev/next navigation is available

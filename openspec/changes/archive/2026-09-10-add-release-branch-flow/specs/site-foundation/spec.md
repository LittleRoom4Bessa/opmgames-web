# Spec: site-foundation (delta)

## MODIFIED Requirements

### Requirement: Deployment pipeline

The site SHALL deploy automatically to GitHub Pages via a GitHub Actions workflow on every push to the `release` branch, and SHALL be served at the custom domain `https://opmgames.com` (with `www` redirecting to apex) over HTTPS. Pushes to the `main` branch SHALL NOT trigger deployment; `main` is the development stream and `release` is the production stream.

The `release` branch SHALL be protected: direct pushes are disallowed, and changes MUST reach `release` through a pull request on which the workflow's `build` job has run and passed. Pull requests targeting `release` SHALL run the build as a required status check without deploying.

#### Scenario: Deploy on push to release

- **WHEN** a commit is pushed to (or a pull request is merged into) `release`
- **THEN** the workflow builds the site and deploys it to GitHub Pages without manual steps

#### Scenario: No deploy from main

- **WHEN** a commit is pushed to `main`
- **THEN** no deployment to production occurs

#### Scenario: PR gate on release

- **WHEN** a pull request targeting `release` is opened or updated
- **THEN** the `build` job runs as a status check and merging is blocked until it passes

#### Scenario: Direct push to release blocked

- **WHEN** a non-bypass user attempts to push directly to `release`
- **THEN** GitHub rejects the push

#### Scenario: Custom domain

- **WHEN** a visitor requests `https://opmgames.com` or `https://www.opmgames.com`
- **THEN** the site loads over HTTPS at the apex domain

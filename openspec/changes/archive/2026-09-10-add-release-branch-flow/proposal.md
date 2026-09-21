# Proposal: add-release-branch-flow

## Why

Currently every push to `main` deploys straight to production. We want `main` to be a free development stream and a protected `release` branch to be the only path to production, so the live site is never broken by in-progress work.

## What Changes

- **Deployment trigger moves from `main` to `release`**: the GitHub Actions workflow deploys only on pushes to `release`.
- **PR gate**: pull requests targeting `release` run the build as a required status check (build-only, no deploy).
- **Branch protection on `release`**: direct pushes disallowed; merging requires a PR with the `build` check passing (0 required approvals — solo development). `main` stays unprotected for fast iteration.
- **Promotion flow**: work happens on `main`; releasing = PR `main` → `release` → merge → auto-deploy.

## Capabilities

### New Capabilities

<!-- None -->

### Modified Capabilities

- `site-foundation`: the Deployment pipeline requirement changes — deploys trigger on `release` (not `main`); `release` is protected with a required PR + build check; `main` becomes the unprotected development stream.

## Impact

- **Code**: `.github/workflows/deploy.yml` triggers and job conditions.
- **GitHub config**: new `release` branch; branch protection ruleset on `release`.
- **Workflow**: publishing now requires a PR merge instead of a plain push.
- Repo is public, so branch protection and environment rules are available on the free plan.

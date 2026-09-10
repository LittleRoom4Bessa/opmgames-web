# Design: add-release-branch-flow

## Context

Site currently deploys on every push to `main` (see `init-personal-site`). Owner wants a two-stream model: `main` for development, `release` for production. Repo is public (branch protection available on free plan); solo developer.

## Goals / Non-Goals

**Goals:**
- Production deploys happen only from the `release` branch.
- A PR into `release` must pass the `build` job before it can be merged.
- `main` remains push-anything-goes for fast iteration.

**Non-Goals:**
- Protecting `main`, required human approvals (solo dev — the PR + CI gate is the checkpoint), release tagging/changelogs, staging environments.

## Decisions

### D1: Branch model — main(dev) → release(prod)

`main` is the default branch where all work lands. `release` is created from `main` and only advances via PR merges. Alternative considered: deploy from `main` and use tags for milestones — rejected because it gives no pre-production gate.

### D2: Workflow triggers

`deploy.yml` runs on `push` to `release` (build + deploy) and on `pull_request` targeting `release` (build only — the deploy job gets `if: github.event_name != 'pull_request'`). `workflow_dispatch` retained for manual deploys.

### D3: Branch protection on `release`

Via GitHub API:
- `required_status_checks`: context `build` (the workflow's build job; `strict: false` — solo repo, up-to-date requirement adds friction without value)
- `required_pull_request_reviews`: `required_approving_review_count: 0` (PR form required, self-merge allowed)
- `enforce_admins: false` (owner retains an escape hatch)
- force pushes and branch deletion disallowed

Note: the `build` check appears on PRs because the workflow runs on `pull_request`. A skipped required check counts as passing, but here the build job genuinely runs on PRs, so the gate is real.

## Risks / Trade-offs

- **Every publish costs two extra actions (open PR, merge)** → accepted; the gate is the point. Owner (admin) can bypass protection in an emergency.
- **Check context name drift** (job renamed → protection references stale `build` context) → keep job name stable; noted in tasks.

## Migration Plan

1. Update workflow on `main`, push.
2. Create `release` from `main`, push.
3. Apply branch protection to `release`.
4. Verify with a test PR `main` → `release`.

Rollback: delete protection rules + revert workflow trigger to `main`.

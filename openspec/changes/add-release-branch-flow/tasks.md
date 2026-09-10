# Tasks: add-release-branch-flow

## 1. Workflow

- [x] 1.1 Update `.github/workflows/deploy.yml`: trigger on `push: [release]` + `pull_request: [release]` (keep `workflow_dispatch`); gate deploy job with `if: github.event_name != 'pull_request'`; keep build job name as `build` (referenced by branch protection)
- [x] 1.2 Push updated workflow to `main` and confirm no deployment triggers from `main`

## 2. Release branch & protection

- [x] 2.1 Create `release` branch from `main` and push to origin
- [x] 2.2 Apply branch protection on `release` via GitHub API: require PR (0 approvals), require `build` status check (strict: false), no force pushes, no deletions, admins not enforced (escape hatch)
- [x] 2.3 Verify protection is active (direct push to `release` rejected; settings show required check `build`)

## 3. End-to-end verification

- [ ] 3.1 Make a trivial content change on `main`, push, confirm no deploy runs
- [ ] 3.2 Open PR `main` → `release`, confirm `build` check runs and merge is blocked until green
- [ ] 3.3 Merge the PR, confirm deploy workflow runs and site updates

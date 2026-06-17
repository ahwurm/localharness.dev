---
description: Review LocalHarness project state and bring localharness.dev (pages + llms.txt) into sync — factually, under the site's no-numbers / no-fabrication rules.
---

You are syncing this marketing site to the *real* state of the product. Read `CLAUDE.md` in this
repo first — every hard rule there is binding on anything you change: dead simple, **NO numbers /
stats / version strings**, proof via case studies, no fabrication, analyst voice, no launch date,
no reintroduced "Local__ family" branding.

## 1. Gather ground truth (read-only — use a subagent to keep context lean)

Inspect the LocalHarness repo at `~/localharness`:
- **CLI surface** — the real subcommands from the Typer app in `src/localharness/cli/app.py`
  (read the code, not the docs).
- **Shipped features** — `README.md` + `git -C ~/localharness log --oneline -40` + any `CHANGELOG`.
- **Recent (last ~3 weeks)** — notable shipped commits, with subjects and dates.

Do the same briefly for LocalShift at `~/localshift`. Return a tight, path-cited digest of
**concrete shipped capabilities only** — no roadmap or aspirational items.

## 2. Diff against the site

Compare the digest to what the site currently claims:
- `public/llms.txt` — the CLI list, architecture summary, feature claims.
- `src/pages/index.astro` and `src/pages/localshift/index.astro` — feature / architecture copy.
- Any answer or roadmap pages under `src/pages/`.

List every drift: stale claims, missing capabilities, or commands present in code but absent from
the site (and vice-versa). The CLI list in `llms.txt` is the most common thing to fall behind.

## 3. Propose, then apply

Show the drift list and the exact edits you intend to make. Apply them only once the rules hold:
- NO numbers, stats, version strings, benchmark figures, or parameter sizes in visible copy.
- Every on-page claim traces to a real fact in `~/localharness` / `~/localshift` or their READMEs.
  No fabrication, no placeholder data.
- Analyst voice: thesis-first, declarative, em-dashes, no hype, no exclamation points.
- Keep `llms.txt` consistent with the pages.
- Roadmap / not-yet-shipped items must be framed honestly as in-progress, never as features.

## 4. Verify and report

- `npm run build` must pass.
- If copy or the CLI list changed, flag that `npm run og` may need a rerun for social cards.
- Summarize what changed and why. Do **not** commit or push — leave the diff for review unless
  explicitly told to ship.

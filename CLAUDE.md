# localharness.dev

Static marketing site for the Local__ family: LocalHarness (`/`) + LocalShift (`/localshift/`).
Astro 5 + Tailwind v4, static output, GitHub Pages deploy, domain `localharness.dev` (Route 53).

## Commands

- `npm run dev` — dev server :4321
- `npm run build` — static build to `dist/`
- `npm run preview` — serve `dist/` locally
- `npm run og` — regenerate `public/og/*.png` social cards (run after logo/copy changes)

## Hard rules

- **NEVER commit `.planning/`** — untracked GSD state. Pre-push gate: `git check-ignore -q .planning/`.
- **No placeholder/sample data.** Every on-page claim must trace to a real fact in
  `~/localharness`, `~/localshift`, or their GitHub READMEs. Verify counts at publish time:
  - train scenarios: `ls ~/localharness/bench/scenarios/train/*.yaml | wc -l`
  - tests: `cd ~/localharness && uv run pytest --collect-only -q tests/ | tail -1`
- No LocalHarness version string on the site (pyproject 0.1.0 vs v1.1 tag unresolved).
- No fabricated terminal output; commands only, with comment annotations.
- No `npm install` / `pip install` copy — not published to registries. Install = clone + `uv sync`.
- Star-count badge stays behind `SHOW_STARS = false` until repos have stars.
- Dark theme only; one accent (terminal green); animations limited to hover transitions + one CSS fade-in.

## Asset contract (drop-in, then rebuild + `npm run og` + push)

- `public/logo.svg` (or `logo.png` ≥360px wide) — Wordmark.astro auto-detects at build time, falls back to text wordmark
- `public/favicon.svg` — replaces placeholder
- `public/apple-touch-icon.png` — optional, 180×180

## Launch-day flip (Jun 15, 2026)

"Launches June 15" → "Launched June 15" on both pages; optionally flip `SHOW_STARS`.

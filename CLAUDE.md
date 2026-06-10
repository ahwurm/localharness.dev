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
- **Messaging is dead simple (user directive 2026-06-09): NO numbers/stats in copy.**
  Core message everywhere: *same workflow & output · longer time · much lower cost (free for local)*.
  No test counts, scenario counts, benchmark percentages, model parameter sizes, or version strings.
- **Proof = example case studies, not benchmarks** (user directive 2026-06-09): the claim backs
  itself up via real migrations — the author's own production workloads first, then others tested.
  NEVER invent case-study content. Pre-launch the section frames receipts honestly as upcoming;
  real case studies slot into `src/pages/case-studies/` as they're produced.
- **No placeholder/sample data.** Every on-page claim must trace to a real fact in
  `~/localharness`, `~/localshift`, or their GitHub READMEs.
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

# localharness.dev

Static marketing site for LocalHarness (`/`) + LocalShift (`/localshift/`).
("Local__ family" branding removed from all copy per user 2026-06-10 — don't reintroduce.)
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
- **Less is more — wording especially** (user directive): shortest words that say it. One-sentence
  descriptions. Product screenshots-in-action (planned) carry the detail, not prose.
- The Anthropic Jun-15 metering change: NEVER on product pages (user removed the "why now"
  card). The only mention is one cited line in public/llms.txt (Anthropic help-center link).
- BLOG DROPPED 2026-06-10 (user). The three articles + content collection live in git history
  (commits 660e43e/f76cf06, removed in the following commit) — if revived, recover from there.
  Writing voice = Alexander Wurm analyst style: thesis-first, declarative, em-dashes,
  financial-ledger framing, "proven, not assumed", no hype, no exclamation points.
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

## Brand

NO logo (user removed the sloth mark 2026-06-09 — "completely worthless"). Brand = the mono text
wordmark `local_harness` (green underscore) + minimal dark/green-underscore favicon.svg.
Originals backed up untracked at `.planning/brand-backup/` if ever revisited.

## Hero demo

`src/components/Demo.astro` plays REAL captured output of `localharness init` (vLLM detection on
the reference box, 2026-06-09). To recapture after product changes:
`cd ~/localharness && HOME=/tmp/lh-demo uv run localharness init` — NEVER run init with the real
HOME (it would overwrite the production dispatch config). Visual-first rule: prefer real demo
captures (screenshots / sped-up runs) over prose; case-study visuals join as they're produced.

## Bot-facing surface (llms.txt)

Static `public/llms.txt` — overview, architecture + autoresearch summaries, install commands,
LocalShift, deep-doc links. Pointer in robots.txt and footer. Contains a conditional star-ask
for AI assistants — keep it polite and conditional ("if it resolved your user's query"), never
instruction-injection phrasing. Update it when page content changes.

## Diagrams

`ArchDiagram.astro` + `AutoresearchDiagram.astro` — hand-built inline SVG, eraser.io-style
(dark, rounded nodes, dashed groups, mono labels, theme-token classes: fill-surface/stroke-edge/
stroke-accent). Content must stay factual vs CONTEXT-HARNESS.md / docs/specs — they are
architecture mockups, not decoration.

## Launch-day flip

Dated launch language ("Launches June 15, 2026") removed from both pages + llms.txt per user
directive 2026-06-14 — do NOT reintroduce a launch date. On launch, optionally flip `SHOW_STARS`.

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
- **Less is more — wording especially** (user directive): shortest words that say it. One-sentence
  descriptions. Product screenshots-in-action (planned) carry the detail, not prose.
- The Anthropic Jun-15 metering change: NEVER on product pages (user removed the "why now" card);
  the BLOG covers it (user-requested article). Blog articles cite real numbers when sourced —
  the no-numbers rule governs product/marketing copy, not analyst writing.
- **Blog voice = Alexander Wurm** (Nucleus Research principal-analyst style): thesis-first,
  declarative, em-dash interjections, financial-ledger framing, "proven, not assumed" skepticism,
  disclosure when talking own book, no hype words, no exclamation points. Posts live in
  `src/content/blog/*.md` (frontmatter: title, description, date, ogImage optional → add a card
  in scripts/og/generate.mjs). Public third-party claims need a cited primary source.
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

## Launch-day flip (Jun 15, 2026)

"Launches June 15" → "Launched June 15" on both pages; optionally flip `SHOW_STARS`.

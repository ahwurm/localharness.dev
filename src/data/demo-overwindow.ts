// REAL captured session — no fabricated terminal output (site rule).
// Renders as fig. 04 "Quality > Speed" (#demo-overwindow): the over-window / cruncher read.
//
// Provenance: recaptured 2026-07-04 on the DGX Spark reference box for v0.7.0.
//   - repo: github.com/ahwurm/localharness @ main (fabfde4, v0.7.0 — the built-in
//     root agent was renamed `default` → `orchestrator`, so the answer panel's
//     border title reads `orchestrator`), fresh worktree
//   - endpoint: vLLM at localhost:8000 serving qwen3.6-27b
//     (context budget 126,976 tokens = served 131,072 − 4,096 output reserve)
//   - document: the FULL text of Homer's Odyssey — Project Gutenberg #1727 (Butler translation)
//     (gutenberg.org/cache/epub/1727/pg1727.txt, retrieved 2026-07-04; Gutenberg
//     license boilerplate outside the *** START/END *** markers stripped, the
//     text itself untouched): 678,822 chars (~169,705 tokens) vs the 126,976-token budget.
//   - run: `localharness start` driven over stdin; the model called
//     load_document, then delegated to the cruncher with a content grant; the
//     harness split the text into sections and read EVERY one in a fresh
//     chunk-summarizer window; the cruncher combined the extracts tool-lessly.
//     (The raw v0.7.0 run first mis-resolved the doc path and globbed/attempted a
//     write before loading from the sandbox docs dir; d2Lines shows the successful
//     load only — curation, same policy as the trims below.)
//   - the 22 real ◆ tool_result_get calls (+ their ✓ returns) are consolidated
//     to ONE live counter line — each tick is one captured call/return pair, in
//     order, at the pair-equivalent replay pacing (140ms = the prior 70ms × 2
//     lines). Owner call 2026-07-02 ("consolidate — keep true behavior"); the
//     line-per-call form is surfaced in the count line's `calls` drill-down
//     (verbatim handle + return line-count per pair, from start-odyssey.txt).
//     Since localharness ceaff5b the REAL terminal emits this consolidated
//     counter line itself — future captures need no hand-consolidation.
//   - bus events: 253 (198 from chunk-summarizer leaves; 43 leaf windows) — bus-events-odyssey.jsonl
//   - real duration 525.3s; the replay compresses pacing only, never text. The
//     Cyclops episode's mechanism (fire-hardened olive-wood stake; escape under the
//     flock) verified against the text.
// Cosmetic normalizations (same policy as demo-session.ts): sandbox path
// /tmp/lh-cap-odyssey/docs/ rendered as ~/docs/; REPL panels re-rendered as CSS
// boxes (the answer panel's `orchestrator` border title becomes the fieldset
// legend); 80-col wrapped lines re-joined; spinner frames not re-rendered.
// Raw capture triple + the source document: .planning/captures/
// (init-odyssey.txt, start-odyssey.txt, bus-events-odyssey.jsonl, odyssey.txt).
import type { DemoLine } from './demo-session';

export const overwindowPromptText =
  "Load ~/docs/odyssey.txt — the full text of Homer's Odyssey, far bigger than your context window — and have the cruncher explain how Odysseus defeats the Cyclops. Answer in two sentences grounded in the text.";

export const d2Lines: DemoLine[] = [
  { kind: 'prompt', text: overwindowPromptText, d: 700 },
  { kind: 'tool', text: '◆ load_document ~/docs/odyssey.txt', d: 500 },
  { kind: 'ok', text: '✓ load_document (2 lines)', d: 350 },
  { kind: 'tool', text: '◆ agent cruncher', d: 1100 },
  {
    kind: 'count',
    text: 'tool_result_get — section reads, a fresh window each',
    n: 22,
    td: 140,
    d: 600,
    calls: [
      'tool_result_get 5613cfd00330 — ✓ 18 lines',
      'tool_result_get 695bb3032f1f — ✓ 3 lines',
      'tool_result_get 8e37f672c554 — ✓ 3 lines',
      'tool_result_get e9a727b3f514 — ✓ 3 lines',
      'tool_result_get 2aa84fcee663 — ✓ 3 lines',
      'tool_result_get 57e797dd896c — ✓ 3 lines',
      'tool_result_get 38146f5b066d — ✓ 3 lines',
      'tool_result_get ffcc354a38ba — ✓ 3 lines',
      'tool_result_get 3791c62a65b3 — ✓ 3 lines',
      'tool_result_get 9dc7e7ecdfe3 — ✓ 3 lines',
      'tool_result_get 258eb10b4f50 — ✓ 3 lines',
      'tool_result_get 8d9290c193c2 — ✓ 3 lines',
      'tool_result_get ac963161c2c6 — ✓ 3 lines',
      'tool_result_get 0f60eb955f89 — ✓ 3 lines',
      'tool_result_get dd88df9bebaa — ✓ 4 lines',
      'tool_result_get 4924fd4a4010 — ✓ 3 lines',
      'tool_result_get d37ac6a0278b — ✓ 3 lines',
      'tool_result_get 726764399c68 — ✓ 3 lines',
      'tool_result_get 7f0f28d9c89b — ✓ 3 lines',
      'tool_result_get e5e3dbfe6785 — ✓ 3 lines',
      'tool_result_get f62a78d6f848 — ✓ 5 lines',
      'tool_result_get 4058a041e6f6 — ✓ 3 lines',
    ],
  },
  { kind: 'ok', text: '✓ agent (3 lines)', d: 900 },
  {
    kind: 'answer',
    text: "Odysseus gets the Cyclops drunk with wine and then drives a sharpened, fire-hardened olive wood stake into Polyphemus's eye, blinding him. He and his surviving men then escape the cave by hiding themselves beneath the bellies of the Cyclops's sheep as they are driven out to pasture each morning.",
    d: 900,
  },
];

/** the input-box meter after this run, verbatim from the capture */
export const overwindowTailMeter = '░░░░░░░░░░ 6%';

// REAL captured session — no fabricated terminal output (site rule).
// Demo 2 "_bigger than the window": the over-window / cruncher read.
//
// Provenance: captured 2026-07-02 on the DGX Spark reference box.
//   - repo: github.com/ahwurm/localharness @ main (78564b9, v0.5.1), fresh worktree
//   - endpoint: vLLM at localhost:8000 serving qwen3.6-27b
//     (context budget 126,976 tokens = served 131,072 − 4,096 output reserve)
//   - document: the FULL text of Homer's Odyssey — Project Gutenberg #1727 (Butler translation)
//     (gutenberg.org/cache/epub/1727/pg1727.txt, retrieved 2026-07-02; Gutenberg
//     license boilerplate outside the *** START/END *** markers stripped, the
//     text itself untouched): 678,822 chars vs the 126,976-token budget.
//   - run: `localharness start` driven over stdin; the model called
//     load_document, then delegated to the cruncher with a content grant; the
//     harness split the text into sections and read EVERY one in a fresh
//     chunk-summarizer window; the cruncher combined the extracts tool-lessly.
//   - the 42 real ◆ tool_result_get calls (+ their ✓ returns) are consolidated
//     to ONE live counter line — each tick is one captured call/return pair, in
//     order, at the pair-equivalent replay pacing (140ms = the prior 70ms × 2
//     lines). Owner call 2026-07-02 ("consolidate — keep true behavior"); the
//     line-per-call form lives in this file's git history and start-odyssey.txt.
//   - bus events: 429 (410 from chunk-summarizer leaves) — bus-events-odyssey.jsonl
//   - real duration 163.2s; the replay compresses pacing only, never text. The
//     Cyclops episode's mechanism (heated olive-wood stake; escape under the
//     flock) verified against the text.
// Cosmetic normalizations (same policy as demo-session.ts): sandbox path
// /tmp/lh-cap-odyssey/docs/ rendered as ~/docs/; REPL panels re-rendered as CSS
// boxes; 80-col wrapped lines re-joined; spinner frames not re-rendered.
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
  { kind: 'count', text: 'tool_result_get — section reads, a fresh window each', n: 42, td: 140, d: 600 },
  { kind: 'ok', text: '✓ agent (3 lines)', d: 900 },
  {
    kind: 'answer',
    text: "Odysseus and his men blind the Cyclops Polyphemus by driving a red-hot olive-wood stake into his eye after getting him drunk with wine. They then escape by hiding beneath the bellies of the Cyclops's sheep, slipping past his groping hands as he lets his flock out to graze each morning.",
    d: 900,
  },
];

/** the input-box meter after this run, verbatim from the capture */
export const overwindowTailMeter = '░░░░░░░░░░ 2%';

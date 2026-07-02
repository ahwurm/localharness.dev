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
//     chunk-summarizer window (the tool_result_get lines below are those reads,
//     verbatim, in their REAL concurrent interleave order — do not tidy them
//     into call/return pairs); the cruncher combined the extracts tool-lessly.
//   - bus events: 429 (410 from chunk-summarizer leaves) — bus-events-odyssey.jsonl
//   - real duration 163.2s; the replay compresses pacing only (leaf reads
//     at ~70ms), never text. The Cyclops episode's mechanism (heated olive-wood stake; escape under the flock) verified against the text.
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
  { kind: 'tool', text: '◆ tool_result_get ff1d056ab581', d: 600 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 882218be1223', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (18 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 09f921a784af', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 5a6fa74e7d4c', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get e49b22a4e58d', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 25610245fa2d', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (4 lines)', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (4 lines)', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get fc4b25e2b9b2', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 6f75779495d7', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get f5dfa83bcbcb', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 44f182869bad', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 0d4cd9faa2c6', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 4d8d393fe0fc', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get c517e3bc9651', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 921744d0307e', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 6a7ba6692eeb', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 3a588e7859f4', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 8f2683998def', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 19ee5bf208a5', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 69c5b23e63b4', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (5 lines)', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 43ee29081393', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 478a1d46f9ba', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get fab6251aab22', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (5 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get cde82f21dc5a', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (4 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get bd01e1ec03a6', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get e04e25366fbe', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get fd0a76688578', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get e1e214afc8d0', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 8e34d923b173', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get f18f13b51a59', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 73dc89737999', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get f272ba43afbd', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get f2747c0660f6', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (4 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 23a20a7933ac', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 16d0440b6307', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get ed7202ab7490', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 7146830a74d2', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 1971ce4185f4', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get b4db0c1448e9', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 02b9b2ef99e8', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 5e764caa4b52', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get aa7cb6b6ea70', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (4 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 32012eebd337', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'ok', text: '✓ agent (3 lines)', d: 900 },
  {
    kind: 'answer',
    text: "Odysseus and his men blind the Cyclops Polyphemus by driving a red-hot olive-wood stake into his eye after getting him drunk with wine. They then escape by hiding beneath the bellies of the Cyclops's sheep, slipping past his groping hands as he lets his flock out to graze each morning.",
    d: 900,
  },
];

/** the input-box meter after this run, verbatim from the capture */
export const overwindowTailMeter = '░░░░░░░░░░ 2%';

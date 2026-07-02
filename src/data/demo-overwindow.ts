// REAL captured session — no fabricated terminal output (site rule).
// Demo 2 "_bigger than the window": the over-window / cruncher read.
//
// Provenance: captured 2026-07-02 ~23:30Z on the DGX Spark reference box.
//   - repo: github.com/ahwurm/localharness @ main (78564b9, v0.5.1), fresh worktree
//   - endpoint: vLLM at localhost:8000 serving qwen3.6-27b
//     (context budget 126,976 tokens = served 131,072 − 4,096 output reserve)
//   - document: the FULL text of A Tale of Two Cities — Project Gutenberg #98
//     (gutenberg.org/cache/epub/98/pg98.txt, retrieved 2026-07-02; Gutenberg
//     license boilerplate outside the *** START/END *** markers stripped, the
//     novel text itself untouched): 757,604 chars ≈ 1.5× the context budget.
//   - run: `localharness start` driven over stdin; the model called
//     load_document, then delegated to the cruncher with a content grant; the
//     harness split the book into 48 sections and read EVERY one in a fresh
//     chunk-summarizer window (the 96 tool_result_get lines below are those
//     reads, verbatim, in their REAL concurrent interleave order — do not tidy
//     into call/return pairs); the cruncher combined the extracts tool-lessly.
//   - bus events: 451 (432 from chunk-summarizer leaves) — bus-events-totc.jsonl
//   - real duration 189.9s; the replay compresses pacing only (leaf reads at
//     ~70ms), never text. Answer verified verbatim against the source text
//     ("One Hundred and Five, North Tower", first occurrence at 10.7% depth).
// Cosmetic normalizations (same policy as demo-session.ts): sandbox path
// /tmp/lh-demo5/docs/ rendered as ~/docs/; REPL panels re-rendered as CSS
// boxes; 80-col wrapped lines re-joined; spinner frames not re-rendered.
// Raw capture triple + the source document: .planning/captures/
// (init-totc.txt, start-totc.txt, bus-events-totc.jsonl, tale-of-two-cities.txt).
import type { DemoLine } from './demo-session';

export const overwindowPromptText =
  'Load ~/docs/tale-of-two-cities.txt — the full text of A Tale of Two Cities, far bigger than your context window — and have the cruncher find Doctor Manette Bastille cell number. Answer with the exact phrase the novel uses.';

export const d2Lines: DemoLine[] = [
  { kind: 'prompt', text: overwindowPromptText, d: 700 },
  { kind: 'tool', text: '◆ load_document ~/docs/tale-of-two-cities.txt', d: 500 },
  { kind: 'ok', text: '✓ load_document (2 lines)', d: 350 },
  { kind: 'tool', text: '◆ agent cruncher', d: 1100 },
  { kind: 'tool', text: '◆ tool_result_get aa1a799420aa', d: 600 },
  { kind: 'tool', text: '◆ tool_result_get 801be1641d60', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 3fcab3b4fa26', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (4 lines)', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get e1ec77fbd460', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 0f0914d692dc', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get bd922f93751c', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (5 lines)', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (5 lines)', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (7 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 59415d514fe7', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 37717e803848', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (15 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get c84853dd9caa', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 29eb4660fe3d', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 8d5eff23d0cb', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (6 lines)', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (4 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 377a4c4b4aea', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 9c26f66e810b', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 768e538f66eb', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (6 lines)', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get a4c31924425c', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 76d765175066', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (5 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 09f7852d0850', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get c48a548ada38', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (5 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 32be29ae182e', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 3980723a4b9c', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (6 lines)', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 1b0b1c26f271', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get d35956b0dcbc', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 946ec90b2752', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (4 lines)', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (5 lines)', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (5 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get a98b1028e463', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (6 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 9cfc0c6cf0d4', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get c690ae45db9e', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (6 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get a2846a4854f5', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 097b15786998', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 7c3c5597bd1f', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (5 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 456ba72b74f0', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get ba965bd9a1d9', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 16f286fd63b4', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 50dcc8564d7a', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get e938d9ee642d', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get c4ba3bc759b3', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 8e65938ba12b', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 46570c5c6006', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get f954ec3ba6a8', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (6 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 063fd8cb8ec8', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get e2acdb5fc8a2', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 121ce4ab3a7b', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (5 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 22bd08ee48ef', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get f0248e7e54db', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get ba958ece6d61', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get ef600c800891', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (7 lines)', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get aacce23e5548', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 7dacb0f69e37', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (5 lines)', d: 70 },
  { kind: 'tool', text: '◆ tool_result_get 931c2f2526aa', d: 70 },
  { kind: 'ok', text: '✓ tool_result_get (3 lines)', d: 70 },
  { kind: 'ok', text: '✓ agent (5 lines)', d: 900 },
  {
    kind: 'answer',
    text: 'The exact phrase the novel uses for Doctor Manette\u0027s Bastille cell number is:\n\u0022One Hundred and Five, North Tower\u0022',
    d: 900,
  },
];

/** the input-box meter after this run, verbatim from the capture */
export const overwindowTailMeter = '\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591 2%';

// REAL captured session — no fabricated terminal output (site rule).
// Demo 4 "_built in": a fresh install asked what it ships.
//
// Provenance: captured 2026-07-03T00:07Z (2026-07-02 local) on the DGX Spark reference box.
//   - repo: github.com/ahwurm/localharness @ main (50c9ad4, v0.5.1), fresh worktree
//   - endpoint: vLLM at localhost:8000 serving qwen3.6-27b
//   - commands: `localharness init` into a fresh sandbox HOME, then
//     `localharness start` driven over stdin — a cold install's first question
//   - no tool calls: the model answered from its system prompt. The loop's
//     act-guard asked it to restate in full rather than end on a back-reference
//     (2 llm rounds, 8 bus events); the panel is the TaskComplete summary.
//   - roster verified against src/localharness/agent/subagent.py @ 50c9ad4
//   - real duration 45.1s (prompt 00:07:49.9Z → answer panel 00:08:34.9Z); the
//     replay compresses the model-thinking pause only, never text
// Cosmetic normalizations (same policy as demo-session.ts): the REPL's Rich
// panels (prompt echo box, `default` answer panel) re-rendered as CSS boxes;
// 80-col wrapped panel lines re-joined; the non-TTY warning and spinner frames
// not reproduced. Raw capture triple: .planning/captures/
// (init-agents.txt, start-agents.txt, bus-events-agents.jsonl).
import type { DemoLine } from './demo-session';

export const agentsPromptText =
  'List the subagents that ship built in — name and one-line job for each.';

export const d4Lines: DemoLine[] = [
  { kind: 'prompt', text: agentsPromptText, d: 700 },
  {
    kind: 'answer',
    text: 'The built-in subagents are:\n\n1 explore — Explore and analyze the local filesystem, codebases, and project structure.\n2 web-researcher — Search the web and gather information from online sources.\n3 data-analyst — Analyze datasets, run statistics, and derive insights from data.\n4 frontend-designer — Design and generate frontend UI code (HTML/CSS/JS, React, etc.).\n5 cruncher — Read large documents by handle, split them into chunks, and perform detailed analysis or summarization.\n6 search-verifier — Verify search results and validate the accuracy of information.\n7 default — General-purpose delegation agent for tasks that don’t fit a specialized role.',
    d: 1600,
  },
];

/** the input-box meter after this run, verbatim from the capture */
export const agentsTailMeter = '░░░░░░░░░░ 2%';

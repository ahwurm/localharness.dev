// REAL captured session — no fabricated terminal output (site rule).
// Renders as fig. 03 "Agents" (#agents): a fresh install asked what it ships.
//
// Provenance: recaptured 2026-07-04 on the DGX Spark reference box for v0.7.0.
//   - repo: github.com/ahwurm/localharness @ main (fabfde4, v0.7.0 — the release that
//     renamed the built-in root agent `default` → `orchestrator`), fresh worktree
//   - endpoint: vLLM at localhost:8000 serving qwen3.6-27b
//   - commands: `localharness init` into a fresh sandbox HOME, then
//     `localharness start` driven over stdin — a cold install's first question
//   - no tool calls: the model answered from its system prompt; the panel is the
//     answer as drawn. Three takes were captured and the clean numbered-list draw
//     (take 1) chosen; text below is that take VERBATIM. The 5th roster entry is now
//     `orchestrator` (the renamed root), not `default`.
//   - roster verified against src/localharness/agent/subagent.py @ fabfde4
//     (explore · web-researcher · cruncher · search-verifier; orchestrator = the root)
//   - the replay compresses the model-thinking pause only, never text
// Cosmetic normalizations (same policy as demo-session.ts): the REPL's Rich panels
// (prompt echo box, `orchestrator` answer panel) re-rendered as CSS boxes; 80-col wrapped
// panel lines re-joined; the non-TTY warning and spinner frames not reproduced.
// Raw capture: /tmp/lh-070-caps/d4-take1.txt (the v0.7.0 recapture keeper take; the
// prior v0.5.3 5-roster capture triple stays in .planning/captures/ as *-agents5.*).
import type { DemoLine } from './demo-session';

export const agentsPromptText =
  'List the subagents that ship built in — a plain numbered list, name and one-line job for each.';

export const d4Lines: DemoLine[] = [
  { kind: 'prompt', text: agentsPromptText, d: 700 },
  {
    kind: 'answer',
    text: '1 explore — Explore and analyze the local codebase and file structure.\n2 web-researcher — Search the web and browse pages for information.\n3 cruncher — Process and analyze large documents, data, or complex computations.\n4 search-verifier — Verify search results and validate information accuracy.\n5 orchestrator — Coordinate multi-step tasks across multiple subagents.',
    d: 1600,
  },
];

/** the input-box meter after this run, verbatim from the capture */
export const agentsTailMeter = '░░░░░░░░░░ 2%';

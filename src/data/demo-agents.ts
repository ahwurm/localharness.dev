// REAL captured session — no fabricated terminal output (site rule).
// Renders as fig. 03 "Agents" (#agents): a fresh install asked what it ships.
//
// Provenance: captured 2026-07-03T01:37Z (2026-07-02 local) on the DGX Spark reference box.
//   - repo: github.com/ahwurm/localharness @ main (e885d0b, v0.5.3 — the release that
//     slimmed the default roster to quarantined-or-read-only), fresh worktree
//   - endpoint: vLLM at localhost:8000 serving qwen3.6-27b
//   - commands: `localharness init` into a fresh sandbox HOME, then
//     `localharness start` driven over stdin — a cold install's first question
//   - no tool calls: the model answered from its system prompt. The loop's act-guard
//     asked it to restate in full (2 llm rounds, 8 bus events); the panel is the
//     TaskComplete summary. 5 takes were captured and the clean numbered-list draw
//     chosen (other draws: Rich-table form, or restatements that narrate the
//     act-guard exchange — a known cosmetic residual noted in the release work);
//     text below is take 5 VERBATIM.
//   - roster verified against src/localharness/agent/subagent.py @ e885d0b
//   - real duration 24.0s; the replay compresses the model-thinking pause only, never text
// Cosmetic normalizations (same policy as demo-session.ts): the REPL's Rich panels
// (prompt echo box, `default` answer panel) re-rendered as CSS boxes; 80-col wrapped
// panel lines re-joined; the non-TTY warning and spinner frames not reproduced.
// Raw capture triple: .planning/captures/ (init-agents5.txt, start-agents5.txt,
// bus-events-agents5.jsonl; the earlier 7-roster v0.5.1 capture kept as *-agents.*).
import type { DemoLine } from './demo-session';

export const agentsPromptText =
  'List the subagents that ship built in — a plain numbered list, name and one-line job for each.';

export const d4Lines: DemoLine[] = [
  { kind: 'prompt', text: agentsPromptText, d: 700 },
  {
    kind: 'answer',
    text: 'The subagents that ship built-in are:\n\n1 explore — Filesystem and codebase exploration specialist for navigating directories and finding files.\n2 web-researcher — Web search and information gathering specialist for online research.\n3 cruncher — Large document/data analysis specialist for processing and summarizing big texts.\n4 search-verifier — Search result verification and fact-checking specialist.\n5 default — General-purpose fallback agent for tasks without a specialized match.',
    d: 1600,
  },
];

/** the input-box meter after this run, verbatim from the capture */
export const agentsTailMeter = '░░░░░░░░░░ 2%';

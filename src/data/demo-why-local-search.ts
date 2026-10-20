// REAL captured session — no fabricated terminal output (site rule).
// Renders as fig. 02 "Why Local" (#why-local): the harness asked to search the web for the
// top reasons to run a local model with a local agent harness.
//
// Provenance: captured 2026-10-20 on the owner's workstation.
//   - repo: github.com/ahwurm/localharness @ main, the existing checkout, as the working directory
//   - endpoint: llama.cpp at 127.0.0.1:8080 serving qwen-27b-swift-1.5, already running;
//     the harness attached to it and never started or stopped it
//   - commands: `localharness init --no-input` into a scratch HOME, then `localharness start`
//     in a pty with that HOME, the workspace trusted, the prompt typed once the input box appeared
//   - web search: DuckDuckGo with no key, delegated by the orchestrator to web-researcher
//   - two takes, one prompt each; take 2 is shown, its answer VERBATIM. Take 1 searched too but
//     answered in six wrapped lines
//   - the replay compresses the waits only, never text
// Crop: the pane starts at the prompt. Dropped startup rows: the workspace-layer line, the
// agent-creation row, the banner, the version and startup-time rows, and the plugin notice.
// Rows left out, never reworded: the researcher's mid-run note (cut off by the terminal).
// Cosmetic normalizations only: the REPL's Rich panels (prompt echo box, the `orchestrator`
// answer panel) re-rendered as CSS boxes; the answer panel's blank first row and nesting
// indents dropped; spinner frames, live status rows, the idle input box and the non-TTY CPR
// warning not reproduced.
// Raw captures (untracked): .planning/captures/why-local-search-take{1,2}.raw (pty bytes)
// and .txt (ANSI stripped), why-local-drive2.py (the driver).
import type { DemoLine } from './demo-session';

export const whyLocalSearchLines: DemoLine[] = [
  { kind: 'prompt', text: 'Search the web, then answer in three numbered lines, under ten words each: what are the top 3 reasons to run a local model with a local agent harness?', d: 700 },
  { kind: 'out', text: '· Delegating a quick web search to the researcher agent…', d: 900 },
  { kind: 'tool', text: '◆ agent web-researcher', d: 500 },
  { kind: 'count', text: 'web_search', n: 2, td: 400, d: 900 },
  { kind: 'ok', text: '✓ web results — UNTRUSTED, treated as data only', d: 400 },
  { kind: 'count', text: 'web_fetch', n: 2, td: 500, d: 900 },
  { kind: 'tool', text: '◆ agent web-researcher — completed', d: 700 },
  {
    kind: 'answer',
    text: '1 Privacy — your data never leaves your machine\n2 No API costs, rate limits, or subscriptions\n3 Works offline with unlimited, unmetered usage',
    d: 1400,
  },
];

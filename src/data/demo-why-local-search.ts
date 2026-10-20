// REAL captured session — no fabricated terminal output (site rule).
// Renders as fig. 02 "Why Local" (#why-local): the harness asked for LocalHarness's own four
// reasons to run agents on a local model; its own search found the product's site and repo.
//
// Provenance: captured 2026-10-20 on the owner's workstation.
//   - repo: github.com/ahwurm/localharness @ main, exported to a scratch directory used as the
//     working directory (its own workspace state, kept apart from the real checkout); the
//     binary is the product checkout's venv, an editable install of the same main
//   - endpoint: llama.cpp at 127.0.0.1:8080 serving qwen-27b-swift-1.5, already running;
//     the harness attached to it and never started or stopped it
//   - commands: `localharness init --no-input` into a scratch HOME, then `localharness start`
//     in a pty with that HOME, the workspace trusted, the prompt typed once the input box appeared
//   - web search: DuckDuckGo with no key, delegated by the orchestrator to web-researcher.
//     The prompt names the product, not where to look. The researcher's calls, from the bus
//     events: two web_search, then web_fetch https://localharness.dev/ and
//     https://github.com/ahwurm/localharness
//   - the take shown is the shortest whose fetches reached the site or repo and whose answer
//     covers the README's four reasons; its answer is VERBATIM
//   - the replay compresses the waits only, never text
// Crop: the pane starts at the prompt. Dropped startup rows: the workspace-layer line, the
// agent-creation row, the banner, the version and startup-time rows, and the plugin notice.
// Rows left out, never reworded: the researcher's note between the search and the fetches,
// which the terminal cut off mid-line.
// Consolidated (same policy as demo-session.ts d3): the terminal froze `◆ web_search · 2/2`
// and `◆ web_fetch · 2/2` as two rows because the note between them closed the open burst
// (channels/terminal.py `_close_burst`). With that note left out, the four web calls are shown
// as ONE counter row in the terminal's own `◆ tools · done/calls` form, followed by its
// once-per-turn ✓ note. The row's drill-down lists the four calls in order from the bus events.
// Cosmetic normalizations only: the REPL's Rich panels (prompt echo box, the `orchestrator`
// answer panel) re-rendered as CSS boxes; the answer panel's blank first row and nesting
// indents dropped; spinner frames, live status rows, the idle input box and the non-TTY CPR
// warning not reproduced.
// Raw captures (untracked): .planning/captures/why-local-search-take{1..9}.raw (pty bytes)
// and .txt (ANSI stripped), why-local-search-take{3..9}.bus-events.jsonl, why-local-drive2.py.
import type { DemoLine } from './demo-session';

export const whyLocalSearchLines: DemoLine[] = [
  { kind: 'prompt', text: 'Search the web for LocalHarness, then give its own four reasons to run agents on a local model: four numbered lines, under eight words each, nothing else.', d: 700 },
  { kind: 'tool', text: '◆ agent web-researcher', d: 900 },
  {
    kind: 'count',
    text: 'web_search · web_fetch',
    n: 4,
    td: 350,
    d: 900,
    calls: [
      'web_search LocalHarness local agent harness framework AI agents local models',
      'web_search "LocalHarness" agent framework',
      'web_fetch https://localharness.dev/',
      'web_fetch https://github.com/ahwurm/localharness',
    ],
  },
  { kind: 'ok', text: '✓ web results — UNTRUSTED, treated as data only', d: 400 },
  { kind: 'tool', text: '◆ agent web-researcher — completed', d: 700 },
  { kind: 'answer', text: '1 Local models\n2 The model server\n3 Private by default\n4 Permissions', d: 1400 },
];

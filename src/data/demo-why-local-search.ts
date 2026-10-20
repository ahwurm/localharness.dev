// REAL captured session — no fabricated terminal output (site rule).
// Renders as fig. 02 "Why Local" (#why-local): the harness asked for the top reasons to pair
// a local model with LocalHarness; its own search found the product's site and repo.
//
// Provenance: captured 2026-10-20 on the owner's workstation.
//   - repo: github.com/ahwurm/localharness @ main, exported to a scratch directory used as the
//     working directory (its own workspace state, kept apart from the real checkout)
//   - endpoint: llama.cpp at 127.0.0.1:8080 serving qwen-27b-swift-1.5, already running;
//     the harness attached to it and never started or stopped it
//   - commands: `localharness init --no-input` into a scratch HOME, then `localharness start`
//     in a pty with that HOME, the workspace trusted, the prompt typed once the input box appeared
//   - web search: DuckDuckGo with no key, delegated by the orchestrator to web-researcher.
//     The prompt names the product, not where to look. The researcher's fetches, from the
//     bus events: https://localharness.dev/ (twice, the second from offset 8000) and
//     https://github.com/ahwurm/localharness (twice, the second from offset 6000)
//   - the take shown is the shortest of those whose fetches reached the site or repo; its
//     answer is VERBATIM
//   - the replay compresses the waits only, never text
// Crop: the pane starts at the prompt. Dropped startup rows: the workspace-layer line, the
// agent-creation row, the banner, the version and startup-time rows, and the plugin notice.
// Rows left out, never reworded: the researcher's notes the terminal cut off mid-line.
// Consolidated (same policy as demo-session.ts d3): the terminal froze one counter row per
// burst — `◆ web_search · 2/2`, `◆ web_fetch · 1/1`, `◆ web_page_query · 1/1` and three more
// `◆ web_fetch · 1/1` — because each researcher note between calls closed the open burst
// (channels/terminal.py `_close_burst`). With those notes left out, the seven web calls are
// shown as ONE counter row in the terminal's own `◆ tools · done/calls` form, followed by its
// once-per-turn ✓ note. The row's drill-down lists the seven calls in order from the bus
// events: tool, then its url, query or pattern, with a non-default
// start_index or pattern shown as key=value.
// Cosmetic normalizations only: the REPL's Rich panels (prompt echo box, the `orchestrator`
// answer panel) re-rendered as CSS boxes; the answer panel's blank first row and nesting
// indents dropped; the source line's wrap re-joined; spinner frames, live status rows, the
// idle input box and the non-TTY CPR warning not reproduced.
// Raw captures (untracked): .planning/captures/why-local-search-take{1,2,3,4}.raw (pty bytes)
// and .txt (ANSI stripped), why-local-search-take{3,4}.bus-events.jsonl, why-local-drive2.py.
import type { DemoLine } from './demo-session';

export const whyLocalSearchLines: DemoLine[] = [
  { kind: 'prompt', text: 'What are the top 3 reasons to pair a local model with LocalHarness? Search first; three numbered lines under ten words each, then the source on one line.', d: 700 },
  { kind: 'out', text: "· I'll search the web for this.", d: 900 },
  { kind: 'tool', text: '◆ agent web-researcher', d: 500 },
  {
    kind: 'count',
    text: 'web_search · web_fetch · web_page_query',
    n: 7,
    td: 260,
    d: 900,
    calls: [
      'web_search LocalHarness local agent harness AI coding localharness.dev',
      'web_search "LocalHarness" local LLM benefits',
      'web_fetch https://localharness.dev/',
      'web_page_query pg-1 pattern=per-token|privacy|leaving your machine|cost|free|control',
      'web_fetch https://localharness.dev/ start_index=8000',
      'web_fetch https://github.com/ahwurm/localharness',
      'web_fetch https://github.com/ahwurm/localharness start_index=6000',
    ],
  },
  { kind: 'ok', text: '✓ web results — UNTRUSTED, treated as data only', d: 400 },
  { kind: 'tool', text: '◆ agent web-researcher — completed', d: 700 },
  {
    kind: 'answer',
    text: '1 No per-token bill\n2 Nothing leaves your machine\n3 Run models you already have\n\nSource: https://localharness.dev/ (see also the "Why an agent harness for local models" section at https://github.com/ahwurm/localharness)',
    d: 1400,
  },
];

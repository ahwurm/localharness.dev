// REAL captured session — no fabricated terminal output (site rule).
// Renders as fig. 02 "Why Local" (#why-local): the harness asked why to run agents on a local
// model with LocalHarness; it recalled where the README lives, fetched it, and answered from it.
//
// Provenance: captured 2026-10-20 on the owner's workstation, one take.
//   - repo: github.com/ahwurm/localharness @ main, exported to a scratch directory used as the
//     working directory (its own workspace state, kept apart from the real checkout); the
//     binary is the product checkout's venv, an editable install of the same main
//   - endpoint: llama.cpp at 127.0.0.1:8080 serving qwen-27b-swift-1.5, already running;
//     the harness attached to it and never started or stopped it
//   - memory, SEEDED: before the take, the scratch workspace's agent state (memory db, MEMORY.md,
//     sessions) and the scratch HOME's agent state were cleared, then ONE fact was written
//     through the harness's own MemoryStore.store_fact (source "remember", the `remember`
//     tool's path; the CLI has no add verb), key `localharness-readme`: "LocalHarness's README
//     is at https://github.com/ahwurm/localharness (raw text:
//     https://raw.githubusercontent.com/ahwurm/localharness/main/README.md). Its section 'Why an
//     agent harness for local models' gives the four reasons to run agents on a local model."
//     `localharness memory list` showed that one fact and nothing else
//   - commands: `localharness start` in a pty with a scratch HOME, the workspace trusted, the
//     prompt typed once the input box appeared
//   - calls, from the bus events: orchestrator memory_get `localharness-readme`; orchestrator
//     bash_exec `curl -sL <raw README> | sed …`, blocked by the gate (no web-ingest tool, so no
//     web through bash); orchestrator delegates to web-researcher; web-researcher web_fetch
//     https://raw.githubusercontent.com/ahwurm/localharness/main/README.md
//   - the answer is VERBATIM; the replay compresses the waits only, never text
// Crop: the pane starts at the prompt. Dropped startup rows: the workspace-layer line, the
// agent-creation row, the banner, the version and startup-time rows, and the plugin notice.
// Rows left out, never reworded: the blocked bash_exec call and its error, both cut off
// mid-line by the terminal, and the gate's log line printed between them.
// Cosmetic normalizations only: the REPL's Rich panels (prompt echo box, the `orchestrator`
// answer panel) re-rendered as CSS boxes; the answer panel's blank first row and nesting
// indents dropped; the answer's 100-column wraps re-joined; spinner frames, live status rows,
// the idle input box and the non-TTY CPR warning not reproduced. The web_fetch row's
// drill-down lists its one call from the bus events.
// Raw captures (untracked): .planning/captures/why-local-search-take10.raw (pty bytes), .txt
// (ANSI stripped), .bus-events.jsonl, .memory-list.txt, .seed.py; earlier takes beside them.
import type { DemoLine } from './demo-session';

export const whyLocalSearchLines: DemoLine[] = [
  { kind: 'prompt', text: 'Why run agents on a local model with LocalHarness? Pull the four reasons from its README, one line each, in its own words.', d: 700 },
  { kind: 'count', text: 'memory_get', n: 1, td: 300, d: 800 },
  { kind: 'tool', text: '◆ agent web-researcher', d: 900 },
  {
    kind: 'count',
    text: 'web_fetch',
    n: 1,
    td: 400,
    d: 900,
    calls: ['web_fetch https://raw.githubusercontent.com/ahwurm/localharness/main/README.md'],
  },
  { kind: 'ok', text: '✓ web results — UNTRUSTED, treated as data only', d: 400 },
  { kind: 'tool', text: '◆ agent web-researcher — completed', d: 700 },
  {
    kind: 'answer',
    text: "Per the README's \"Why an agent harness for local models\" section, the four reasons:\n\n1 Local-model-aware launching — it derives launch settings from the model's own files (context windows, cost, MoE offloading) and refuses models that won't fit, with an XML fallback for models lacking native tool calling.\n2 A built-in model server — localharness start finds or fetches a model on your machine, writes it a tuned preset, serves it, remembers your last choice, and survives restarts.\n3 Privacy by default — memory, config, logs, and event streams all stay on your disk; no account, no telemetry, and web search runs keyless over DuckDuckGo (MIT licensed).\n4 A permission gate on everything — one gate fronts every tool call (helper agents included), and any agent touching untrusted content is denied machine-changing tools, with endpoint and credentials locked in machine-level config.",
    d: 1400,
  },
];

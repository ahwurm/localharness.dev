// REAL captured session — no fabricated terminal output (site rule).
// Renders as fig. 02 "Why Local" (#why-local): a one-line question; the harness recalls where
// the README lives, fetches it, and answers in the shape its project instructions ask for.
//
// Provenance: captured 2026-10-20 on the owner's workstation.
//   - repo: github.com/ahwurm/localharness @ main, exported to a scratch directory used as the
//     working directory (its own workspace state, kept apart from the real checkout); the
//     binary is the product checkout's venv, an editable install of the same main
//   - endpoint: llama.cpp at 127.0.0.1:8080 serving qwen-27b-swift-1.5, already running;
//     the harness attached to it and never started or stopped it
//   - project instructions: AGENTS.md added to that working directory, which the harness names
//     at startup and in the input hint ("Using AGENTS.md (0.4 KB)"). Its text, verbatim:
//     "When asked why to run agents on a local model with LocalHarness, read the "Why an agent
//     harness for local models" section of the README and answer with exactly four items. Each
//     item is one line: a two-or-three-word title, a colon, then one plain sentence a first-time
//     visitor understands. Put a blank line between items. No preamble, no closing line, no
//     bold, no bullets, no numbers."
//   - memory, SEEDED: before each take, the scratch workspace's agent state (memory db,
//     MEMORY.md, sessions) and the scratch HOME's agent state were cleared, then ONE fact was
//     written through the harness's own MemoryStore.store_fact (source "remember", the
//     `remember` tool's path; the CLI has no add verb), key `localharness-readme`:
//     "LocalHarness's README is at https://github.com/ahwurm/localharness (raw text:
//     https://raw.githubusercontent.com/ahwurm/localharness/main/README.md). Its section 'Why an
//     agent harness for local models' gives the four reasons to run agents on a local model."
//     `localharness memory list` showed that one fact and nothing else
//   - commands: `localharness start` in a pty with a scratch HOME, the workspace trusted, the
//     prompt typed once the input box appeared
//   - two takes. Take 11's AGENTS.md said "no markdown" and the four items printed as one run-on
//     paragraph (the answer panel renders Markdown, so single line breaks merge); AGENTS.md then
//     asked for a blank line between items, and take 12 is shown, its answer VERBATIM
//   - calls, from the bus events: orchestrator memory_get `localharness-readme`; orchestrator
//     bash_exec `curl -sL <raw README> | awk …`, blocked by the gate (no web-ingest tool, so no
//     web through bash); orchestrator delegates to web-researcher; web-researcher web_fetch
//     https://raw.githubusercontent.com/ahwurm/localharness/main/README.md, its only fetch
//   - the replay compresses the waits only, never text
// Crop: the pane starts at the startup row that names AGENTS.md. Dropped startup rows: the
// workspace-layer line, the agent-creation row, the banner, the version row, and the plugin
// notice. Rows left out, never reworded: the blocked bash_exec call and its error, both cut off
// mid-line by the terminal, and the gate's log line printed between them.
// Cosmetic normalizations only: the REPL's Rich panels (prompt echo box, the `orchestrator`
// answer panel) re-rendered as CSS boxes; nesting indents dropped; the answer's 100-column
// wraps re-joined; spinner frames, live status rows, the idle input box and the non-TTY CPR
// warning not reproduced. The web_fetch row's drill-down lists its one call from the bus events.
// Display styling only: each item's title, up to and including its colon, is drawn in the
// accent hue (`parts`); the characters are the captured text, unchanged and in order.
// Raw captures (untracked): .planning/captures/why-local-search-take12.raw (pty bytes), .txt
// (ANSI stripped), .bus-events.jsonl, .memory-list.txt, .AGENTS.md; take 11 and the earlier
// takes beside them, and why-local-search-take10.seed.py.
import type { DemoLine } from './demo-session';

export const whyLocalSearchLines: DemoLine[] = [
  { kind: 'meta', text: '(0.1s startup) -- 1 agent, 2 plugins, AGENTS.md', d: 300 },
  { kind: 'prompt', text: 'Why run agents on a local model with LocalHarness?', d: 700 },
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
    text: "Local models: The harness reads a model's own files to work out how to launch it, and refuses to start a model that does not fit on your machine.\n\nThe model server: A single command finds a model on your machine or fetches one for you, serves it, and remembers your last choice.\n\nPrivate by default: Your memory, config, logs and results stay on your own disk, with no account and no telemetry.\n\nPermission gate: Every tool call passes through one permission gate, and an agent that reads untrusted content is never given tools that can change your machine.",
    d: 1400,
    parts: [
      { text: "Local models:", accent: true },
      { text: " The harness reads a model's own files to work out how to launch it, and refuses to start a model that does not fit on your machine.\n\n" },
      { text: "The model server:", accent: true },
      { text: " A single command finds a model on your machine or fetches one for you, serves it, and remembers your last choice.\n\n" },
      { text: "Private by default:", accent: true },
      { text: " Your memory, config, logs and results stay on your own disk, with no account and no telemetry.\n\n" },
      { text: "Permission gate:", accent: true },
      { text: " Every tool call passes through one permission gate, and an agent that reads untrusted content is never given tools that can change your machine." },
    ],
  },
];

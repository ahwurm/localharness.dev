// REAL captured session — no fabricated terminal output (site rule).
// Renders as fig. 01 "Why Local" (#why-local): the sensed window, `/model`, and a tool call
// stopped at the permission gate.
//
// Provenance: captured 2026-10-20 on the owner's workstation.
//   - repo: github.com/ahwurm/localharness @ main, the existing checkout
//   - endpoint: llama.cpp at 127.0.0.1:8080 serving qwen-27b-swift-1.5, already running;
//     the harness attached to it and never started or stopped it
//   - commands: `localharness init --no-input` into a scratch HOME, then `localharness start`
//     from that HOME in a pty, each input typed after its prompt appeared
//   - the workspace has a "not trusted" record, so the session runs guarded and the write asks
//   - the model wrote the bash command itself; the ask was answered `y` once
//   - the replay compresses the waits only, never text
// Cosmetic normalizations only: the scratch HOME shown as `~`; the REPL's Rich panels (prompt
// echo boxes, the `orchestrator` answer panel) re-rendered as CSS boxes; spinner frames, live
// status rows, the input box and the non-TTY CPR warning not reproduced; the guarded-mode
// notice, printed twice, shown once; leading indents dropped; the permission line's wrap
// re-joined. Rows left out, never reworded: the agent-creation row and the startup banner
// (fig. 02 shows both), the line naming the server's systemd unit, the context-budget,
// no-project and plugin notices, the startup-time row, and two `/model` rows: the one naming
// the server's unit (the runtime is in the pane title) and the switch hint.
// Raw capture (untracked): .planning/captures/why-local-start.raw (pty bytes),
// why-local-start.txt (ANSI stripped), why-local-init.txt, why-local-drive.py (the driver).
import type { DemoLine } from './demo-session';

export const whyLocalLines: DemoLine[] = [
  { kind: 'cmd', text: 'localharness start', d: 300 },
  { kind: 'out', text: 'window: served 98,304 · trained 262,144 · fits 262,144 (free 5.9 GiB of 31.8 beside the served model; weights 19.4 GiB)', d: 500 },
  { kind: 'out', text: '→ the next harness launch uses -c 262144', d: 260 },
  { kind: 'meta', text: 'v0.20.1    qwen-27b-swift-1.5    ~', d: 300 },
  { kind: 'out', text: 'this workspace is not trusted, so the session runs in guarded mode — boundary-crossing and destructive calls will ask first', d: 300 },
  { kind: 'prompt', text: '/model', d: 700 },
  { kind: 'out', text: 'Models:', d: 300 },
  { kind: 'out', text: '1. qwen-27b-swift-1.5  (serving)  ● [active]', d: 200 },
  { kind: 'prompt', text: 'Save the date to today.txt with bash, then tell me in one line what it saved.', d: 700 },
  { kind: 'tool', text: '◆ bash_exec date > today.txt && cat today.txt', d: 900 },
  { kind: 'out', text: 'Permission needed: bash_exec: date > today.txt && cat today.txt  (no-boundary — no workspace boundary here (the project root is your home directory or above))', d: 400 },
  { kind: 'out', text: '[y]es once   [n]o     (asks every time — cannot be remembered)', d: 200 },
  { kind: 'ok', text: '✓ allowed once', d: 900 },
  { kind: 'ok', text: '✓ bash_exec (1 lines)', d: 700 },
  { kind: 'answer', text: 'It saved "Tue Oct 20 09:07:57 AM MDT 2026" — today\'s date and time in MDT.', d: 1200 },
];

/** the input-box meter after this run, verbatim from the capture */
export const whyLocalTailMeter = '░░░░░░░░░░ 6%';

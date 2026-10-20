// REAL captured session — no fabricated terminal output (site rule).
// Renders as fig. 02 "Why Local" (#why-local): the harness asked why local, answered from
// the README.
//
// Provenance: captured 2026-10-20 on the owner's workstation.
//   - repo: github.com/ahwurm/localharness @ main, the existing checkout, as the working directory
//   - endpoint: llama.cpp at 127.0.0.1:8080 serving qwen-27b-swift-1.5, already running;
//     the harness attached to it and never started or stopped it
//   - commands: `localharness init --no-input` into a scratch HOME, then `localharness start`
//     in a pty with that HOME, the workspace trusted, the prompt typed once the input box appeared
//   - four takes, one prompt each; take 4 is shown, its answer VERBATIM. Take 1 answered from
//     the project's CLAUDE.md instead of the product; take 2 was a paragraph; take 3 repeated
//     one reason and missed the model server
//   - the replay compresses the waits only, never text
// Crop: the pane starts at the prompt. Dropped startup rows: the workspace-layer line, the
// agent-creation row, the banner, the version and startup-time rows, and the plugin notice.
// Cosmetic normalizations only: the REPL's Rich panels (prompt echo box, the `orchestrator`
// answer panel) re-rendered as CSS boxes; the answer panel's blank first row and indents
// dropped; spinner frames, live status rows and the non-TTY CPR warning not reproduced.
// Raw captures (untracked): .planning/captures/why-local-take{1,2,3,4}.raw (pty bytes) and
// .txt (ANSI stripped), why-local-drive2.py (the driver).
import type { DemoLine } from './demo-session';

export const whyLocalLines: DemoLine[] = [
  { kind: 'prompt', text: 'Read README.md first, then give its four reasons for local in four numbered lines, under ten words each.', d: 700 },
  { kind: 'count', text: 'read', n: 1, td: 400, d: 900 },
  {
    kind: 'answer',
    text: "1 Launches sized from your model's own files\n2 Finds, serves, and remembers your model\n3 Everything stays on disk — no account\n4 One permission gate before every tool call",
    d: 1400,
  },
];

/** the input-box meter after this run, verbatim from the capture */
export const whyLocalTailMeter = '█░░░░░░░░░ 11%';

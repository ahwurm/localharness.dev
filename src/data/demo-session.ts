// REAL captured session — no fabricated terminal output (site rule).
//
// Provenance: captured 2026-07-02 on the DGX Spark reference box.
//   - repo: github.com/ahwurm/localharness @ main (78564b9, v0.5.1), fresh worktree
//   - endpoint: vLLM at localhost:8000 serving qwen3.6-27b
//   - commands: `localharness init` then `localharness start` driven over stdin
//   - bus events: verbatim from ~/.localharness/agents/default/bus-events.jsonl
// Cosmetic normalizations only (each noted inline): capture-sandbox paths
// (/tmp/lh-demo2, /tmp/lh-main) rendered as `~`/`~/localharness`; REPL box-drawing
// chrome, the non-TTY warning, spinner frames, and the ASCII banner rows are not
// re-rendered here; the star-ask footer line of `init` is trimmed. Raw captures:
// .planning/captures/ (untracked).

export type DemoLine = {
  kind: 'cmd' | 'out' | 'prompt' | 'tool' | 'ok' | 'answer' | 'meta';
  text: string;
  /** ms pause before this line appears (replay pacing; real run took ~35s) */
  d?: number;
  /** diagram node set live with this line */
  node?: string;
  /** real bus events (seq · type · detail) revealed with this line */
  ev?: string[];
  /** TraceFlow arrow (data-edge index) revealed with this line */
  edge?: number;
};

export const promptText =
  'Use the explore subagent to find which file defines the deny-first tool permission check, and answer with just that file path.';

export const lines: DemoLine[] = [
  { kind: 'cmd', text: 'localharness init', d: 300, node: 'provider' },
  { kind: 'out', text: 'Probing for local LLM...', d: 500 },
  { kind: 'ok', text: '✓ vllm found at http://localhost:8000/v1', d: 550 },
  { kind: 'out', text: 'Model: qwen3.6-27b (auto-selected)', d: 260 },
  { kind: 'ok', text: '✓ Tool calling: native', d: 260 },
  { kind: 'ok', text: '✓ Context budget: 126,976 tokens (served window 131,072 − 4,096 output reservation)', d: 260 },
  { kind: 'ok', text: '✓ LocalHarness configured at ~/.localharness/config.yaml.', d: 420 },
  { kind: 'cmd', text: 'localharness start', d: 900, node: 'agent' },
  { kind: 'meta', text: 'v0.5.1    qwen3.6-27b    ~/localharness', d: 600 },
  { kind: 'out', text: 'Describe a task, or /help for commands.', d: 300 },
  {
    kind: 'prompt',
    text: promptText,
    d: 700,
    node: 'agent',
    edge: 0,
    ev: ['00 · UserMessage', '01 · TurnStarted', '02 · Heartbeat — ctx 2.0%'],
  },
  {
    kind: 'tool',
    text: '◆ agent explore',
    d: 1400,
    node: 'explore',
    edge: 1,
    ev: ['03 · Action — llm_response', '04 · Action — tool_call agent', '05 · TurnStarted', '06 · Heartbeat — ctx 0.6%'],
  },
  { kind: 'tool', text: '◆ grep deny.first|deny_first|denyFirst', d: 900, node: 'tools', edge: 2, ev: ['08 · Action — tool_call grep'] },
  { kind: 'ok', text: '✓ grep (1 lines)', d: 240, ev: ['09 · Observation — grep'] },
  { kind: 'tool', text: '◆ grep tool.permission|tool_permission|toolPermission', d: 420, ev: ['10 · Action — tool_call grep'] },
  { kind: 'ok', text: '✓ grep (1 lines)', d: 240, ev: ['11 · Observation — grep'] },
  { kind: 'tool', text: '◆ grep permission.check|permission_check|permissionCheck', d: 420, ev: ['12 · Action — tool_call grep'] },
  { kind: 'ok', text: '✓ grep (2 lines)', d: 240, ev: ['13 · Observation — grep', '14 · Heartbeat — ctx 1.4%'] },
  { kind: 'tool', text: '◆ grep ~/localharness/src/localharness/agent/loop.py', d: 500, ev: ['16 · Action — tool_call grep'] },
  { kind: 'ok', text: '✓ grep (3 lines)', d: 240, ev: ['17 · Observation — grep'] },
  { kind: 'tool', text: '◆ grep ~/localharness/docs/specs/04-tool-system.md', d: 420, ev: ['18 · Action — tool_call grep'] },
  { kind: 'ok', text: '✓ grep (3 lines)', d: 240, ev: ['19 · Observation — grep', '20 · Heartbeat — ctx 4.5%'] },
  { kind: 'tool', text: '◆ grep .', d: 420, ev: ['22 · Action — tool_call grep'] },
  { kind: 'ok', text: '✓ grep (2 lines)', d: 240, edge: 3, ev: ['23 · Observation — grep', '24 · Heartbeat — ctx 8.4%'] },
  { kind: 'tool', text: '◆ read ~/localharness/src/localharness/agent/permissions.py', d: 500, edge: 4, ev: ['26 · Action — tool_call read'] },
  { kind: 'ok', text: '✓ read (8 lines)', d: 240, edge: 5, ev: ['27 · Observation — read', '28 · Heartbeat — ctx 9.0%'] },
  {
    kind: 'ok',
    text: '✓ agent (1 lines)',
    d: 900,
    node: 'agent',
    edge: 6,
    ev: ['30 · TaskComplete', '31 · TurnCompleted', '32 · Observation — agent'],
  },
  {
    kind: 'answer',
    text: 'src/localharness/agent/permissions.py',
    d: 800,
    node: 'bus',
    edge: 7,
    ev: ['33 · Heartbeat — ctx 2.5%', '34 · Action — llm_response', '35 · TaskComplete'],
  },
];

/** total real events on the bus for this turn (parent + child) */
export const eventTotal = 37;

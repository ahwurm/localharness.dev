// The five bundled plugins in code order (localharness plugins/builtin.py BUILTIN_PLUGINS):
// one list for the nav's Plugins menu and the architecture page's plugin row.
import type { IconName } from '../components/Icon.astro';

export const PLUGINS: { name: string; href: string; icon: IconName; clause: string }[] = [
  { name: 'image', href: '/plugins/image/', icon: 'studio', clause: 'pictures from your own ComfyUI server' },
  { name: 'mobile', href: '/plugins/mobile/', icon: 'globe', clause: 'the phone app, served from your machine' },
  { name: 'memory', href: '/plugins/memory/', icon: 'layers', clause: 'facts that outlive the session' },
  { name: 'dispatch', href: '/plugins/dispatch/', icon: 'prompt', clause: 'drive a session from Discord' },
  { name: 'autoresearch', href: '/plugins/autoresearch/', icon: 'gauge', clause: 'the loop that tunes the harness' },
];

// SetupFlow data — one plugin's setup as it runs INSIDE a session (`localharness start`), then the
// plugin in use from that same session. All five steps are SHIPPED: `/plugins enable <name>` in a
// terminal session runs the plugin's setup step on the plain terminal and restarts the session with
// the plugin on and the conversation kept; the shell's `localharness plugins enable <name>` runs the
// same step (its success line adds "takes effect on the next `localharness start`"). Sources:
// localharness @ 0f54f1d (branch feature/setup-wizard; not released when this was written — publish
// this with the release that carries it).
// - frame: cli/ui.py startup_banner (wordmark, model, cwd; version left out) and start_cmd.py's
//   `Plugins: <running names>` line, in BUILTIN_PLUGINS order. memory and autoresearch are on by
//   default with no extra, so they are the frame's other running plugins: enabling one of them
//   restarts the session but adds no name to that line. ❯ is terminal.py's prompt.
// - the step: captured from plugins_cmd.session_step (what the restart runs) on a pty, with local
//   fakes only (ComfyUI and the proposer answering through their _TRANSPORT seams, the embedding
//   download writing a cache entry, the dispatch extra reported installed); home shown as ~. The
//   restart lines are repl.py PLUGINS_RESTARTING and start_cmd.py RESTARTED_LINE / _resume_status.
//   Questions render as typer prints them ("<prompt> [<default>]: "); the token is never echoed.
//   Answers are examples: Enter for image's default and for web's guess, an illustrative Discord
//   user id, and for autoresearch the local example in config/models.py ProposerConfig. web's Enter
//   leaves its check at "not enrolled yet", so the CLI prints its coding-agent prompt there (shown
//   under the frame) and the status line names it. memory's download progress bar is left out.
// - in use: /memory on an empty store (cli/memory_cmd.py); the generate_image call/result rows
//   (terminal.py: `◆ <tool> <first string arg>`, `✓ <tool>`). web, dispatch and autoresearch are
//   used outside the session (`localharness web`, `start --channel discord`, `localharness propose`).
// - prompts: each plugin's manifest agent_prompt rendered by plugins/setup.py render_agent_prompt
//   (setup defaults filled, {machine} empty), joined to one paragraph, without the lead line the
//   CodeBlock label stands for.
export interface SetupLine {
  kind: 'you' | 'ask' | 'out' | 'good' | 'dim' | 'gain';
  text: string; // 'gain': the plugin name the frame's Plugins: line gains at this point
  answer?: string; // 'ask' only: what the user types (empty = Enter, or a hidden answer)
}
export interface SetupFlowData {
  plugins: string[]; // the frame's Plugins: line once the step has run, in start order
  lines: SetupLine[];
  prompt: string; // "paste this into your coding agent to set it up for your hardware"
}
const ORDER = ['image', 'web', 'memory', 'dispatch', 'autoresearch'];
const DEFAULT_ON = ['memory', 'autoresearch'];
const flow = (name: string, steps: SetupLine[], status: string, use: SetupLine[], prompt: string): SetupFlowData => ({
  plugins: ORDER.filter((n) => n === name || DEFAULT_ON.includes(n)),
  lines: [
    { kind: 'you', text: `/plugins enable ${name}` },
    { kind: 'out', text: `Restarting with ${name} on — your conversation is kept.` },
    ...steps,
    { kind: 'out', text: `Restarted with ${name} on. Your conversation continues.` },
    ...(DEFAULT_ON.includes(name) ? [] : [{ kind: 'gain', text: name } as SetupLine]),
    { kind: 'out', text: status },
    ...use,
  ],
  prompt,
});
const enabled = (n: string): SetupLine => ({ kind: 'good', text: `✓ ${n} enabled in ~/.localharness/overrides.yaml` });
const checking: SetupLine = { kind: 'out', text: 'Checking it now:' };
const on = (n: string) => `${n}: on in this session`;

export const SETUP: Record<string, SetupFlowData> = {
  image: flow(
    'image',
    [
      { kind: 'ask', text: 'ComfyUI address [http://127.0.0.1:8188]: ', answer: '' },
      enabled('image'),
      { kind: 'out', text: "  set image.comfyui_url = 'http://127.0.0.1:8188'" },
      checking,
      { kind: 'good', text: '✓ image: ComfyUI reachable at http://127.0.0.1:8188 (template: qwen-image-2.1)' },
      { kind: 'out', text: '  Once ComfyUI answers, the agent can make pictures with generate_image.' },
    ],
    on('image'),
    [
      { kind: 'you', text: 'make a picture of a lighthouse at dusk' },
      { kind: 'out', text: '  ◆ generate_image a lighthouse at dusk' },
      { kind: 'good', text: '  ✓ generate_image' },
    ],
    "Set up ComfyUI on this machine for LocalHarness image generation. Install ComfyUI and run it so it answers at http://127.0.0.1:8188; keep it off the open internet. Put these Qwen-Image-2.1 INT8 files in its models folder: diffusion_models/qwen_image_2.1_int8_convrot.safetensors (about 7.3 GB), text_encoders/qwen3vl_8b_int8_convrot.safetensors (about 9.4 GB) and vae/qwen_image_2.1_vae_bf16.safetensors (about 0.7 GB). The weights are under the Qwen Research License: personal, non-commercial use. Keep the UNETLoader weight_dtype at \"default\" (the fp8 fast mode spoils the pictures). On an NVIDIA GB10 (DGX Spark) the INT8 kernels compile on first use and need the Python headers: start ComfyUI with C_INCLUDE_PATH pointing at them. You are done when http://127.0.0.1:8188/system_stats answers and `localharness doctor` shows image reachable."
  ),
  web: flow(
    'web',
    [
      { kind: 'ask', text: 'Phone address, the URL your phone opens (Enter: `localharness web` guesses it): ', answer: '' },
      enabled('web'),
      checking,
      { kind: 'dim', text: 'i  web: not enrolled yet' },
      { kind: 'dim', text: '       `localharness web` generates its app token on first run' },
      { kind: 'dim', text: 'Or paste this into your coding agent to set it up for your hardware:' },
      { kind: 'out', text: '  Run `localharness web`, then scan its pairing QR with your phone.' },
    ],
    'web: on, but not set up yet — not enrolled yet',
    [],
    "Set up the LocalHarness phone app on this machine. Install LocalHarness with its web extra, keeping the extras I already use. Run `localharness web` and leave it running: it serves the page on this machine only, so do not pass --allow-unsafe-bind. To reach it from my phone, put it behind a private network I already use, for example `tailscale serve --bg 8765`, rather than opening a port to the internet. You are done when `localharness doctor` shows web enrolled and my phone has scanned the pairing QR."
  ),
  memory: flow(
    'memory',
    [
      enabled('memory'),
      { kind: 'ask', text: 'Download the embedding model now (about 1.2 GB)? [Y/n]: ', answer: 'y' },
      { kind: 'good', text: '✓ memory-embedding: downloaded Qwen/Qwen3-Embedding-0.6B' },
      checking,
      { kind: 'good', text: '✓ memory-db: ~/.localharness/agents/orchestrator/memory.db (schema 10)' },
      { kind: 'good', text: '✓ memory-embedding: embedding model Qwen/Qwen3-Embedding-0.6B is in the local cache' },
      { kind: 'out', text: '  In a session, /memory shows what it keeps.' },
    ],
    on('memory'),
    [
      { kind: 'you', text: '/memory' },
      { kind: 'out', text: 'Memory is empty — nothing has been remembered yet.' },
    ],
    "Set up LocalHarness memory on this machine. Install LocalHarness with its embeddings extra, keeping the extras I already use (a reinstall keeps only the extras it names). Then run `localharness plugins enable memory` and answer yes to downloading the embedding model (about 1.2 GB, into the Hugging Face cache). The model runs on the CPU, so no GPU setup is needed. You are done when `localharness doctor` shows memory-embedding passing."
  ),
  dispatch: flow(
    'dispatch',
    [
      { kind: 'ask', text: 'Discord bot token: ', answer: '' },
      { kind: 'ask', text: 'Your Discord user id(s), comma-separated: ', answer: '123456789012345678' },
      enabled('dispatch'),
      { kind: 'out', text: "  set dispatch.discord.token = '**********'" },
      { kind: 'out', text: "  set dispatch.discord.allow = '123456789012345678'" },
      checking,
      { kind: 'good', text: '✓ dispatch: Discord configured — 1 allowed user(s); listens in any channel the bot can see' },
      { kind: 'out', text: '  Then start the Discord session: localharness start --channel discord' },
    ],
    on('dispatch'),
    [],
    "Set up the LocalHarness dispatch plugin on this machine. Install LocalHarness with its dispatch extra, keeping the extras I already use. Walk me through the Discord side: in the Discord Developer Portal, create a bot, turn on the Message Content intent and invite it to my server (OAuth2 > URL Generator, scope bot); then have me turn on Developer Mode and copy my user id. Then run `localharness plugins enable dispatch` and let me type the token at its hidden prompt myself: never print the token, store it in a file, or paste it into this chat. You are done when `localharness doctor` shows Discord configured and `localharness start --channel discord` answers my message."
  ),
  autoresearch: flow(
    'autoresearch',
    [
      { kind: 'ask', text: 'Proposer address (an OpenAI-compatible base URL): ', answer: 'http://127.0.0.1:11434/v1' },
      { kind: 'ask', text: 'Proposer model id (not your main model): ', answer: 'gpt-oss:120b' },
      enabled('autoresearch'),
      { kind: 'out', text: "  set proposer.base_url = 'http://127.0.0.1:11434/v1'" },
      { kind: 'out', text: "  set proposer.model = 'gpt-oss:120b'" },
      { kind: 'good', text: '✓ autoresearch-proposer: the proposer answers at http://127.0.0.1:11434/v1 and serves gpt-oss:120b' },
      checking,
      { kind: 'good', text: '✓ autoresearch: proposer: gpt-oss:120b at http://127.0.0.1:11434/v1' },
      { kind: 'out', text: '  Then: `localharness propose --help` shows how to write the first proposal.' },
    ],
    on('autoresearch'),
    [],
    "Set up the LocalHarness autoresearch plugin on this machine. It needs a proposer: a second model, different from the one LocalHarness already runs on, served behind an OpenAI-compatible endpoint. Pick the strongest model this hardware can serve alongside the main one and serve it locally. Then run `localharness plugins enable autoresearch` and give it that address and model id. Leave proposer.api_key unset for a local server. You are done when `localharness doctor` shows the proposer row passing."
  ),
};

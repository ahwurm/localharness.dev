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

// SetupFlow data — one plugin's setup as it will run INSIDE a session (`localharness start`), then
// the plugin in use from that same session. All five are LANDING: the in-session step is the roadmap
// phase "Setup Wizard" (init and a first start walk the user through each plugin's settings, a
// reachability check, plain next steps and a paste-into-your-coding-agent prompt); there is no
// in-session /plugins command today. The shipped path is the shell's `localharness plugins enable
// <name>`, named in the caption under each terminal. Sources (localharness main @ 582b69c):
// - frame: cli/ui.py startup_banner (wordmark, model, cwd; version left out) and start_cmd.py's
//   `Plugins: <running names>` line, in BUILTIN_PLUGINS order. memory and autoresearch are on by
//   default with no extra, so they are the frame's other running plugins. ❯ is terminal.py's prompt.
// - wizard wording: the shipped `plugins enable` flow's own lines (image's is a real capture, ComfyUI
//   live; its "takes effect on the next start" tail is cut, since the step runs in the session).
//   Questions name real settings and real defaults (image SetupField; memory recall_scope /
//   archive.enabled; dispatch's two SetupFields; autoresearch proposer.base_url / .model, which have
//   no default). Check lines are each plugin's real doctor row text. web has no settings to ask.
// - in use: /memory on an empty store (cli/memory_cmd.py); the generate_image call/result rows
//   (terminal.py: `◆ <tool> <first string arg>`, `✓ <tool>`); web_cmd.py's ENROLMENT_HEADER with a
//   Tailscale address shape from ENROLMENT_LOOPBACK_NOTE, token masked; dispatch's start_banner.
//   autoresearch's experiment run prints nothing until its verdict, so no output line is shown.
// - prompts: image's is the plugin's own IMAGE_SETUP_HELP paste block, verbatim; the others are new.
export interface SetupLine {
  kind: 'you' | 'ask' | 'out' | 'good' | 'dim' | 'gain';
  text: string; // 'gain': the plugin name the frame's Plugins: line gains at this point
  answer?: string; // 'ask' only: what the user types (empty = Enter takes the default)
}
export interface SetupFlowData {
  plugins: string[]; // the frame's Plugins: line once the step has run, in start order
  lines: SetupLine[];
  prompt: string; // "paste this into your coding agent to set it up for your hardware"
}
const ORDER = ['image', 'web', 'memory', 'dispatch', 'autoresearch'];
const DEFAULT_ON = ['memory', 'autoresearch'];
const flow = (name: string, steps: SetupLine[], use: SetupLine[], prompt: string): SetupFlowData => ({
  plugins: ORDER.filter((n) => n === name || DEFAULT_ON.includes(n)),
  lines: [
    { kind: 'you', text: `/plugins enable ${name}` },
    ...steps,
    { kind: 'gain', text: name },
    ...use,
  ],
  prompt,
});
const enabled = (n: string): SetupLine => ({ kind: 'good', text: `✓ ${n} enabled in ~/.localharness/overrides.yaml` });
const checking: SetupLine = { kind: 'out', text: 'Checking it now:' };

export const SETUP: Record<string, SetupFlowData> = {
  image: flow(
    'image',
    [
      { kind: 'ask', text: 'ComfyUI address [http://127.0.0.1:8188]: ', answer: '' },
      enabled('image'),
      { kind: 'out', text: "  set image.comfyui_url = 'http://127.0.0.1:8188'" },
      checking,
      { kind: 'good', text: '✓ image: ComfyUI reachable at http://127.0.0.1:8188 (template: qwen-image-2.1)' },
      { kind: 'dim', text: '# next: the agent can now call generate_image' },
    ],
    [
      { kind: 'you', text: 'make a picture of a lighthouse at dusk' },
      { kind: 'out', text: '  ◆ generate_image a lighthouse at dusk' },
      { kind: 'good', text: '  ✓ generate_image' },
    ],
    'Set up ComfyUI on this machine for LocalHarness image generation. Install ComfyUI and run it on 127.0.0.1, port 8188 (this machine only, not the network). Put these Qwen-Image-2.1 INT8 files in its models folder: diffusion_models/qwen_image_2.1_int8_convrot.safetensors (about 7.3 GB), text_encoders/qwen3vl_8b_int8_convrot.safetensors (about 9.4 GB) and vae/qwen_image_2.1_vae_bf16.safetensors (about 0.7 GB). The weights are under the Qwen Research License: personal, non-commercial use. Keep the UNETLoader weight_dtype at "default" (the fp8 fast mode spoils the pictures). On an NVIDIA GB10 (DGX Spark) the INT8 kernels compile on first use and need the Python headers: start ComfyUI with C_INCLUDE_PATH pointing at them. You are done when http://127.0.0.1:8188/system_stats answers and `localharness doctor` shows image reachable.'
  ),
  web: flow(
    'web',
    [
      enabled('web'),
      checking,
      { kind: 'dim', text: 'i  web: not enrolled yet' },
      { kind: 'dim', text: '       `localharness web` generates its app token on first run' },
      { kind: 'dim', text: '# next: localharness web — scan the pairing QR with your phone' },
    ],
    [
      { kind: 'out', text: 'Pair a phone: scan this with the camera (it carries the URL and the token).' },
      { kind: 'out', text: '  https://<your-machine>.<your-tailnet>.ts.net/#t=**********' },
    ],
    'Set up the LocalHarness phone app on this machine. Install LocalHarness with its web extra, then run `localharness web` and leave it running: it serves the page on loopback only, so do not pass --allow-unsafe-bind. To reach it from my phone, put it behind a private network I already use (for example Tailscale) rather than opening a port to the internet. You are done when `localharness doctor` shows web enrolled and my phone has scanned the pairing QR.'
  ),
  memory: flow(
    'memory',
    [
      { kind: 'ask', text: 'Recall from which store — workspace, global or both [workspace]: ', answer: '' },
      { kind: 'ask', text: 'Archive dormant facts (restorable, never deleted) [no]: ', answer: '' },
      enabled('memory'),
      checking,
      { kind: 'dim', text: 'i  memory-db: no memory database yet — created on first start' },
      { kind: 'good', text: '✓ memory-embedding: embedding model Qwen/Qwen3-Embedding-0.6B is in the local cache' },
      { kind: 'dim', text: '# next: /memory to see what it keeps' },
    ],
    [
      { kind: 'you', text: '/memory' },
      { kind: 'out', text: 'Memory is empty — nothing has been remembered yet.' },
    ],
    'Set up LocalHarness memory on this machine. Install LocalHarness with its embeddings extra, then run `localharness doctor`. If the memory-embedding row says the embedding model is not in the local Hugging Face cache, run the `hf download` command it prints, so the first memory search does not stop to download it. The model runs on the CPU, so no GPU setup is needed. You are done when `localharness doctor` shows memory-embedding passing.'
  ),
  dispatch: flow(
    'dispatch',
    [
      { kind: 'ask', text: 'Discord bot token: ', answer: '' },
      { kind: 'ask', text: 'Your Discord user id(s), comma-separated: ', answer: '<your user id>' },
      enabled('dispatch'),
      { kind: 'out', text: "  set dispatch.discord.token = '**********'" },
      { kind: 'out', text: "  set dispatch.discord.allow = '<your user id>'" },
      checking,
      { kind: 'good', text: '✓ dispatch: Discord configured — 1 allowed user(s); listens in any channel the bot can see' },
      { kind: 'dim', text: '# next: localharness start --channel discord' },
    ],
    [{ kind: 'dim', text: 'Dispatch mode: Discord — listening for allowlisted messages.' }],
    'Set up the LocalHarness dispatch plugin on this machine. Install LocalHarness with its dispatch extra. Walk me through the Discord side: in the Discord Developer Portal, create a bot, turn on the Message Content intent and invite it to my server (OAuth2 > URL Generator, scope bot); then have me turn on Developer Mode and copy my user id. Then run `localharness plugins enable dispatch` and let me type the token at its hidden prompt myself — never print the token, put it in a file you write, or paste it into this chat. You are done when `localharness doctor` shows Discord configured and `localharness start --channel discord` answers my message.'
  ),
  autoresearch: flow(
    'autoresearch',
    [
      { kind: 'ask', text: 'OpenAI-compatible base URL for the proposer model: ', answer: '<your proposer endpoint>' },
      { kind: 'ask', text: 'Proposer model id (not your main model): ', answer: '<a stronger local model>' },
      enabled('autoresearch'),
      checking,
      { kind: 'good', text: '✓ autoresearch: proposer: <a stronger local model> at <your proposer endpoint>' },
      { kind: 'dim', text: '# next: localharness propose — then localharness experiment run <id>' },
    ],
    [],
    'Set up the LocalHarness autoresearch plugin on this machine. It needs a proposer: a second model, different from the one LocalHarness already runs on, served behind an OpenAI-compatible endpoint. Pick the strongest model this hardware can serve alongside the main one, serve it locally, and set proposer.base_url and proposer.model to it. Leave proposer.api_key unset for a local server. You are done when `localharness doctor` shows the proposer row passing.'
  ),
};

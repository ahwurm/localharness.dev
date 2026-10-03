// The five bundled plugins in code order (localharness plugins/builtin.py BUILTIN_PLUGINS):
// one list for the nav's Plugins menu and the architecture page's plugin row.
import type { IconName } from '../components/Icon.astro';

export const PLUGINS: { name: string; href: string; icon: IconName; clause: string }[] = [
  { name: 'image', href: '/plugins/image/', icon: 'studio', clause: 'pictures from your own ComfyUI server' },
  { name: 'web', href: '/plugins/web/', icon: 'globe', clause: 'the phone app, served from your machine' },
  { name: 'memory', href: '/plugins/memory/', icon: 'layers', clause: 'facts that outlive the session' },
  { name: 'dispatch', href: '/plugins/dispatch/', icon: 'prompt', clause: 'drive a session from Discord' },
  { name: 'autoresearch', href: '/plugins/autoresearch/', icon: 'gauge', clause: 'the loop that tunes the harness' },
];

// SetupFlow data — one setup step per plugin, as the setup wizard will run it.
// image is SHIPPED: the lines are a real `plugins enable image` capture (localharness main @
// 582b69c, isolated HOME, ComfyUI live; home path normalised to ~), and its agent prompt is the
// plugin's own IMAGE_SETUP_HELP paste block, verbatim. The other four are LANDING (roadmap phase
// "Setup Wizard", not released): each question names a real setting and its real default, and each
// check line is that plugin's real `localharness doctor` row text — but the wizard step that asks
// and checks in one go does not run yet. dispatch's two questions are its real SetupFields (they
// already ask on `plugins enable dispatch`); its agent prompt is new. `#` lines are annotations.
export interface SetupLine {
  kind: 'cmd' | 'ask' | 'out' | 'good' | 'dim';
  text: string;
  answer?: string; // 'ask' only: what the user types (empty = Enter takes the default)
}
export interface SetupFlowData {
  state: 'shipped' | 'landing';
  lines: SetupLine[];
  prompt: string; // "paste this into your coding agent to set it up for your hardware"
}
const enabled = (n: string): SetupLine => ({
  kind: 'good',
  text: `✓ ${n} enabled in ~/.localharness/overrides.yaml — takes effect on the next \`localharness start\``,
});

export const SETUP: Record<string, SetupFlowData> = {
  image: {
    state: 'shipped',
    lines: [
      { kind: 'cmd', text: 'localharness plugins enable image' },
      { kind: 'ask', text: 'ComfyUI address [http://127.0.0.1:8188]: ', answer: '' },
      enabled('image'),
      { kind: 'out', text: "  set image.comfyui_url = 'http://127.0.0.1:8188'" },
      { kind: 'out', text: 'Checking it now:' },
      { kind: 'good', text: '✓ image: ComfyUI reachable at http://127.0.0.1:8188 (template: qwen-image-2.1)' },
      { kind: 'dim', text: '# next: localharness start — the agent can now call generate_image' },
      { kind: 'dim', text: '# or from the shell: localharness generate-image' },
    ],
    prompt:
      'Set up ComfyUI on this machine for LocalHarness image generation. Install ComfyUI and run it on 127.0.0.1, port 8188 (this machine only, not the network). Put these Qwen-Image-2.1 INT8 files in its models folder: diffusion_models/qwen_image_2.1_int8_convrot.safetensors (about 7.3 GB), text_encoders/qwen3vl_8b_int8_convrot.safetensors (about 9.4 GB) and vae/qwen_image_2.1_vae_bf16.safetensors (about 0.7 GB). The weights are under the Qwen Research License: personal, non-commercial use. Keep the UNETLoader weight_dtype at "default" (the fp8 fast mode spoils the pictures). On an NVIDIA GB10 (DGX Spark) the INT8 kernels compile on first use and need the Python headers: start ComfyUI with C_INCLUDE_PATH pointing at them. You are done when http://127.0.0.1:8188/system_stats answers and `localharness doctor` shows image reachable.',
  },
  web: {
    state: 'landing',
    lines: [
      { kind: 'cmd', text: 'localharness plugins enable web' },
      { kind: 'ask', text: 'Address a phone reaches this box at [auto-detect from tailscale]: ', answer: '' },
      enabled('web'),
      { kind: 'out', text: 'Checking it now:' },
      { kind: 'dim', text: 'i  web: not enrolled yet' },
      { kind: 'dim', text: '       `localharness web` generates its app token on first run' },
      { kind: 'dim', text: '# next: localharness web — scan the pairing QR with your phone' },
      { kind: 'dim', text: '# it listens on this machine only; a proxy you run publishes it' },
    ],
    prompt:
      'Set up the LocalHarness phone app on this machine. Install LocalHarness with its web extra, then run `localharness web` and leave it running: it serves the page on loopback only, so do not pass --allow-unsafe-bind. To reach it from my phone, put it behind a private network I already use (for example Tailscale) rather than opening a port to the internet. You are done when `localharness doctor` shows web enrolled and my phone has scanned the pairing QR.',
  },
  memory: {
    state: 'landing',
    lines: [
      { kind: 'cmd', text: 'localharness plugins enable memory' },
      { kind: 'ask', text: 'Recall from which store — workspace, global or both [workspace]: ', answer: '' },
      { kind: 'ask', text: 'Archive dormant facts (restorable, never deleted) [no]: ', answer: '' },
      enabled('memory'),
      { kind: 'out', text: 'Checking it now:' },
      { kind: 'dim', text: 'i  memory-db: no memory database yet — created on first start' },
      { kind: 'good', text: '✓ memory-embedding: embedding model Qwen/Qwen3-Embedding-0.6B is in the local cache' },
      { kind: 'dim', text: '# next: localharness start — then /memory to see what it keeps' },
    ],
    prompt:
      'Set up LocalHarness memory on this machine. Install LocalHarness with its embeddings extra, then run `localharness doctor`. If the memory-embedding row says the embedding model is not in the local Hugging Face cache, run the `hf download` command it prints, so the first memory search does not stop to download it. The model runs on the CPU, so no GPU setup is needed. You are done when `localharness doctor` shows memory-embedding passing.',
  },
  dispatch: {
    state: 'landing',
    lines: [
      { kind: 'cmd', text: 'localharness plugins enable dispatch' },
      { kind: 'ask', text: 'Discord bot token: ', answer: '' },
      { kind: 'ask', text: 'Your Discord user id(s), comma-separated: ', answer: '<your user id>' },
      enabled('dispatch'),
      { kind: 'out', text: "  set dispatch.discord.token = '**********'" },
      { kind: 'out', text: "  set dispatch.discord.allow = '<your user id>'" },
      { kind: 'out', text: 'Checking it now:' },
      { kind: 'good', text: '✓ dispatch: Discord configured — 1 allowed user(s); listens in any channel the bot can see' },
      { kind: 'dim', text: '# next: localharness start --channel discord' },
    ],
    prompt:
      'Set up the LocalHarness dispatch plugin on this machine. Install LocalHarness with its dispatch extra. Walk me through the Discord side: in the Discord Developer Portal, create a bot, turn on the Message Content intent and invite it to my server (OAuth2 > URL Generator, scope bot); then have me turn on Developer Mode and copy my user id. Then run `localharness plugins enable dispatch` and let me type the token at its hidden prompt myself — never print the token, put it in a file you write, or paste it into this chat. You are done when `localharness doctor` shows Discord configured and `localharness start --channel discord` answers my message.',
  },
  autoresearch: {
    state: 'landing',
    lines: [
      { kind: 'cmd', text: 'localharness plugins enable autoresearch' },
      { kind: 'ask', text: 'Proposer address [http://localhost:8000/v1]: ', answer: '' },
      { kind: 'ask', text: 'Proposer model (not your main model): ', answer: '<a stronger local model>' },
      enabled('autoresearch'),
      { kind: 'out', text: 'Checking it now:' },
      { kind: 'good', text: '✓ autoresearch: proposer: <a stronger local model> at http://localhost:8000/v1' },
      { kind: 'dim', text: '# next: localharness propose — then localharness experiment run <id>' },
    ],
    prompt:
      'Set up the LocalHarness autoresearch plugin on this machine. It needs a proposer: a second model, different from the one LocalHarness already runs on, served behind an OpenAI-compatible endpoint. Pick the strongest model this hardware can serve alongside the main one, serve it locally, and set proposer.base_url and proposer.model to it. Leave proposer.api_key unset for a local server. You are done when `localharness doctor` shows the proposer row passing.',
  },
};

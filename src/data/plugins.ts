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

// plateTokens.ts — shared SVG "plate token" vocabulary for the /architecture/
// blueprint plates (figs 01, 02, 03, 04, 06). Every value is extracted VERBATIM
// from TraceFlow.astro (the canonical v3 plate) so the new plates draw from one
// visual vocabulary instead of per-plate hand-tuning drift.
//
// WHY A PLAIN CONSTANTS MODULE, NOT SHARED LIVE <defs> (ARCH-PHASE1-ADDENDUM
// ruling 12): SVG marker ids are DOCUMENT-GLOBAL — two plates that share one
// <marker id> in the same section would collide. So this module ships GEOMETRY
// NUMBERS ONLY; each plate builds its OWN inline <marker> with a plate-unique id
// (e.g. id="f01-call") from `edge.marker.*` below. There are deliberately NO id
// strings in this file.
//
// Provenance: TraceFlow.astro (the "architectural-plate language" — sublabeled
// node boxes in dashed trust-boundary containers, labeled edges with numbered
// badges, legend row). Line refs and the drift record for the three shipped
// diagrams live in .planning/PLATE-TOKENS-NOTES.md. Where TraceFlow is internally
// inconsistent, the majority (or, on a tie, the neutral) value is taken and the
// exception is noted inline + in that doc.
//
// Colour tokens are the EXACT Tailwind theme-utility strings TraceFlow uses
// (fill-* / stroke-* → CSS vars in src/styles/global.css; dark theme, single
// terminal-green accent used via /NN alpha steps). `amber` is NOT a TraceFlow
// token — see `colors.warning`.
//
// NOT imported anywhere yet (intentional — dependency-free, cannot break the
// build). Do not add imports or types; string/number literals + `as const` only.

/** trust / group container — the dashed boundary box (TraceFlow L54, L57). */
export const container = {
  fill: 'fill-none',
  stroke: 'stroke-edge',
  strokeWidth: 1,
  dash: '4 4', // stroke-dasharray
  corner: 0, // square corners (site hard rule: border-radius 0 everywhere)
  /** small filled name-tab notched into the container's top edge (L55–56) */
  labelTab: {
    fill: 'fill-surface',
    stroke: 'stroke-edge',
    strokeWidth: 1,
    height: 13,
  },
  /** tab caption: uppercase, wide-tracked, tiny (L56) */
  label: {
    color: 'fill-dim',
    family: 'font-mono',
    size: 'text-[8px]',
    tracking: 'tracking-[0.08em]',
  },
} as const;

/** node box — sublabeled rectangle (TraceFlow L63–65 standard; L85 deep variant). */
export const nodeBox = {
  stroke: 'stroke-edge',
  strokeWidth: 1.4,
  fill: 'fill-surface', // standard raised node
  fillDeep: 'fill-bg', // deep "container" node, e.g. the web box (L85) — intentional, not drift
  corner: 0,
  /** primary label — centred (L64) */
  label: { color: 'fill-ink', family: 'font-mono', size: 'text-[12px]', anchor: 'middle' },
  /** dim sublabel line(s) beneath the label — centred (L65) */
  sublabel: { color: 'fill-dim', family: 'font-mono', size: 'text-[9px]', anchor: 'middle' },
  /** vertical rhythm in px, measured from the box TOP: label baseline, then each sublabel step */
  pad: { labelFromTop: 20, sublabelStep: 13 },
  /** reference box heights: 46 = label + 1 sublabel; 54 = label + 2 sublabels */
  height: { twoLine: 46, threeLine: 54 },
  /** hairline divider drawn INSIDE a node (L91) */
  innerDivider: { stroke: 'stroke-edge', strokeWidth: 1 },
} as const;

/** numbered + labeled edge — call (solid accent) / return (dashed dim). */
export const edge = {
  /** solid call edge (L99); pathLength=1 enables the DemoSession draw-on and is
   *  harmless on a static plate */
  call: { stroke: 'stroke-accent', strokeWidth: 1.4, pathLength: 1 },
  /** dashed return edge (L116) */
  return: { stroke: 'stroke-dim', strokeWidth: 1.2, dash: '4 4', pathLength: 1 },
  /** dim edge caption (L98) */
  label: { color: 'fill-dim', family: 'font-mono', size: 'text-[9px]' },

  /** RAW arrowhead <marker> geometry — build ONE inline <marker> PER PLATE with a
   *  plate-unique id (ruling 12); no id strings live here. (L45–50) */
  marker: {
    viewBox: '0 0 8 8',
    refX: 6.5,
    refY: 4,
    markerWidth: 6.5,
    markerHeight: 6.5,
    orient: 'auto-start-reverse',
    path: 'M0,0.5 L7,4 L0,7.5',
    callArrowStroke: 1.4, // accent arrowhead — matches the call edge
    returnArrowStroke: 1.3, // dim arrowhead — NOTE: TraceFlow draws this 1.3 while the
    // return EDGE is 1.2 (its one geometry inconsistency)
  },

  /** numbered order badge on the edge (L100–101 call; L117–118 return) */
  badge: {
    radius: 7,
    /** solid badge — a call/step number */
    call: {
      fill: 'fill-accent',
      text: { color: 'fill-accent-ink', family: 'font-mono', size: 'text-[9px]', weight: 'font-semibold' },
    },
    /** hollow badge — a return number */
    return: {
      fill: 'fill-surface',
      stroke: 'stroke-accent/60',
      strokeWidth: 1.2,
      text: { color: 'fill-accent', family: 'font-mono', size: 'text-[9px]', weight: 'font-semibold' },
    },
    /** number baseline = circle cy + 3 (centres a 9px glyph inside r=7) */
    textBaselineOffset: 3,
    /** optional caption beneath a badge, e.g. "UNTRUSTED" (L119): ≈16px below centre.
     *  TraceFlow ties fill-dim (L119) vs fill-accent (L149) 1:1 — canonical = fill-dim
     *  (accent is otherwise reserved for edges/badges/emphasis) */
    caption: { color: 'fill-dim', family: 'font-mono', size: 'text-[9px]', offsetBelow: 16 },
  },
} as const;

/** legend row — the bottom-edge key, a left-anchored + right-anchored pair (L153–154). */
export const legend = {
  color: 'fill-dim',
  family: 'font-mono',
  size: 'text-[9px]',
} as const;

/** type scale — the size of every visible glyph in a plate, in one place
 *  (font-mono throughout; colour/anchor live in each functional group above). */
export const type = {
  family: 'font-mono',
  containerLabel: 'text-[8px]', // + tracking-[0.08em], uppercase
  legend: 'text-[9px]',
  edgeLabel: 'text-[9px]',
  sublabel: 'text-[9px]',
  badgeNumber: 'text-[9px]', // + font-semibold
  nodeLabel: 'text-[12px]',
} as const;

/** fill / opacity ladder — depth from page-back to accent-front. Accent alpha is
 *  expressed as Tailwind `/NN` steps (TraceFlow uses stroke-accent/60 on hollow badges). */
export const fillLadder = {
  page: 'fill-bg', // deepest surface
  surface: 'fill-surface', // raised node / label tab
  transparent: 'fill-none', // container interiors
  accent: 'fill-accent', // solid badge / emphasis
  accentInk: 'fill-accent-ink', // text sitting on an accent fill
  alphaExample: 'stroke-accent/60', // the /NN alpha-step convention
} as const;

/** colour tokens — the EXACT Tailwind theme-utility strings TraceFlow uses. */
export const colors = {
  fill: {
    none: 'fill-none',
    bg: 'fill-bg',
    surface: 'fill-surface',
    ink: 'fill-ink',
    dim: 'fill-dim',
    accent: 'fill-accent',
    accentInk: 'fill-accent-ink',
  },
  stroke: {
    edge: 'stroke-edge',
    dim: 'stroke-dim',
    accent: 'stroke-accent',
    accentAlpha: 'stroke-accent/60',
  },
  /** WARNING / UNTRUSTED — NOT a TraceFlow token. The shipped Security/OverWindow
   *  diagrams use `amber` (+ /50 /60 /70 alpha steps) for the untrusted-content /
   *  warning semantic that figs 03/04 (trust geometry) will need. Recorded here so
   *  the vocabulary lives in one place, but flagged as non-canonical to TraceFlow. */
  warning: {
    fill: 'fill-amber',
    stroke: 'stroke-amber',
    strokeSteps: ['stroke-amber/50', 'stroke-amber/60', 'stroke-amber/70'],
  },
} as const;

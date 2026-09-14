import { Color } from "molstar/lib/mol-util/color";
import { StructureElement } from "molstar/lib/mol-model/structure";
import { createPluginUI } from "molstar/lib/mol-plugin-ui";
import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { renderReact18 } from "molstar/lib/mol-plugin-ui/react18";
import { DefaultPluginUISpec } from "molstar/lib/mol-plugin-ui/spec";
import type { PluginUISpec } from "molstar/lib/mol-plugin-ui/spec";
import type { StructureRepresentationBuiltInProps } from "molstar/lib/mol-plugin-state/helpers/structure-representation-params";
import type { PluginStateObject } from "molstar/lib/mol-plugin-state/objects";
import { PluginBehaviors } from "molstar/lib/mol-plugin/behavior";
import { setSubtreeVisibility } from "molstar/lib/mol-plugin/behavior/static/state";
import { PluginConfig, PluginConfigItem } from "molstar/lib/mol-plugin/config";
import { Representation } from "molstar/lib/mol-repr/representation";
import type { Expression } from "molstar/lib/mol-script/language/expression";
import type { StateObjectSelector } from "molstar/lib/mol-state";
import type { ColorTheme } from "molstar/lib/mol-theme/color";
import type { SizeTheme } from "molstar/lib/mol-theme/size";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { createSequenceView } from "../components/SequenceView";
import { createViewportView } from "../components/Viewport";
import type {
  ChainRef,
  ResidueRef,
  StructureDownload,
  StructureSelection,
} from "../ProteinStructureViewer.types";
import { syncClipToZoom } from "../utils/cameraFocus";
import { AXES_OFF, AXES_ON } from "../utils/axes";
import {
  chainLigandExpression,
  chainPolymerExpression,
  chainsEqual,
  scanChains,
} from "../utils/chains";
import { mergeMolstarSpec } from "../utils/molstarSpec";
import { residueRefFromLoci, selectionFromLoci } from "../utils/residueRef";
import type {
  MolstarViewSettings,
  MolstarViewSettingsSubject,
  ThemeMode,
} from "../utils/theme";
import {
  CHAIN_COLOR_THEME_NAME,
  ChainColorTheme,
  createChainColorTheme,
} from "../utils/chainColorTheme";
import { PLDDT_THEME_NAME, PlddtColoring } from "../utils/plddt";
import {
  ResidueValueTheme,
  createResidueValueTheme,
} from "../utils/residueValueTheme";

/**
 * Theme used when neither pLDDT scores nor an overlay are supplied. Our own
 * per-chain theme rather than Mol*'s built-in `chain-id`, so the chain legend
 * can show swatches that match the structure instead of guessing at the colors
 * Mol* picked.
 */
export const FALLBACK_THEME_NAME = CHAIN_COLOR_THEME_NAME;

/** Delay before retrying initialization while the container has no size. */
const LAYOUT_RETRY_MS = 100;

/** How long to wait for a frame before starting without one. */
const FRAME_WAIT_MS = 100;

/**
 * Yield once so the container can be laid out before it is measured.
 *
 * `requestAnimationFrame` does not fire while the document is hidden -- a
 * background tab, a collapsed pane, or a headless capture that never paints --
 * and awaiting it alone leaves the viewer parked forever on a page that has in
 * fact been laid out. Racing it against a timeout keeps the fast path on a
 * visible page and still starts on a hidden one, where the size check below is
 * what actually guards against measuring too early.
 *
 * The loser of the race is cancelled rather than left to fire: on a visible
 * page this runs once per viewer, and a grid of them would otherwise each keep
 * a stray timer alive past the frame that already resolved.
 */
function nextFrame(): Promise<void> {
  return new Promise((resolve) => {
    const done = () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      resolve();
    };
    const frame = requestAnimationFrame(done);
    const timer = setTimeout(done, FRAME_WAIT_MS);
  });
}

/**
 * Hover fills the geometry with a tint; selection stays outline-only. Mol*'s
 * `colorMarker` is a global toggle for the per-fragment marker tint, so it is
 * scoped to hover via the per-state strengths below.
 */
const HIGHLIGHT_STRENGTH = 0.2;
const SELECT_STRENGTH = 0;

/**
 * Turns the screenshot controls off, on the versions of Mol* that have them.
 *
 * `ShowScreenshotControls` arrived in Mol* 5 and this package's peer range
 * reaches back to 4, so the key is read through an index rather than named
 * directly: naming it would not compile against 4, and passing the resulting
 * `undefined` would ask Mol* to set a config item it has no name for. On 4
 * there are no screenshot controls to hide in the first place.
 */
const SCREENSHOT_CONTROLS_CONFIG: [PluginConfigItem<boolean>, boolean][] =
  (() => {
    // Through `unknown`, since the surrounding keys differ between the two
    // majors and neither shape is assignable to the other.
    const item = (
      PluginConfig.Viewport as unknown as Record<
        string,
        PluginConfigItem<boolean> | undefined
      >
    ).ShowScreenshotControls;

    return item ? [[item, false]] : [];
  })();

function setAxes(plugin: PluginUIContext, enabled: boolean) {
  if (!plugin.canvas3d) return;
  try {
    plugin.canvas3d.setProps({
      camera: { helper: { axes: enabled ? AXES_ON : AXES_OFF } },
    });
  } catch (e) {
    // Mol* rejects prop updates while the canvas is being torn down.
    console.warn("Could not set axes:", e);
  }
}

interface CreateViewerOptions {
  root: HTMLDivElement;
  backgroundColor: Color;
  edgeColor: Color;
  highlightColor: Color;
  viewSettings: MolstarViewSettingsSubject;
  showAxes: boolean;
  showSequenceViewer: boolean;
  residueValueTheme: ResidueValueTheme;
  chainColorTheme: ChainColorTheme;
  molstarSpec?: Partial<PluginUISpec>;
}

async function createViewer({
  backgroundColor,
  chainColorTheme,
  edgeColor,
  highlightColor,
  molstarSpec,
  residueValueTheme,
  root,
  showAxes,
  showSequenceViewer,
  viewSettings,
}: CreateViewerOptions): Promise<PluginUIContext> {
  const spec = DefaultPluginUISpec();

  // Drop Mol*'s built-in click-to-focus camera behavior, for two reasons. It
  // zooms in with a tiny focus radius, which collapses the camera's near/far
  // clip planes into a thin slab around the residue and slices the rest of the
  // structure away; and it moves the camera on click, when the camera is meant
  // to follow `selectedResidue`. The zoom is driven from useResidueFocus
  // instead, which keeps the clip planes open to the whole scene. The residue
  // highlight is unaffected - that comes from the separate
  // Representation.FocusLoci behavior, so a click still marks a residue even
  // when the consumer does not drive the selection.
  const behaviors = spec.behaviors.filter(
    (b) => b.transformer !== PluginBehaviors.Camera.FocusLoci
  );

  // What the viewer asks of Mol*. A consumer's `molstarSpec` is laid over it
  // below, so every setting here is a default rather than a fixed choice.
  const viewerSpec: PluginUISpec = {
    ...spec,
    behaviors,
    canvas3d: {
      camera: { helper: { axes: showAxes ? AXES_ON : AXES_OFF } },
      // Hover is a geometry tint (renderer below) plus an outline; selection
      // is an outline only. Both outlines come from the marking edge colors.
      marking: {
        highlightEdgeColor: edgeColor,
        selectEdgeColor: edgeColor,
      },
      renderer: {
        backgroundColor,
        colorMarker: true,
        highlightColor,
        highlightStrength: HIGHLIGHT_STRENGTH,
        selectStrength: SELECT_STRENGTH,
      },
    },
    components: {
      /*
       * The side regions are declined here rather than hidden in CSS. Mol*
       * renders a region whenever its layout says to, and `regionState` only
       * changes the class it renders with - so a `display: none` was what
       * actually kept them away, and it kept them away from a consumer asking
       * for them too. Saying "none" is the same answer given where Mol* reads
       * it, which leaves `molstarSpec` able to say otherwise.
       *
       * `top` is left alone: that is where the sequence panel lives.
       */
      controls: { bottom: "none", left: "none", right: "none" },
      remoteState: "none",
      sequenceViewer: { view: createSequenceView(viewSettings) },
      /*
       * Always the viewer's own viewport, not only when the axes are on. Mol*'s
       * default viewport brings its icon column with it, and several of those
       * icons - reset zoom, fullscreen, illumination - are not behind any
       * `PluginConfig` flag, so the only way to be rid of them used to be CSS.
       * Replacing the view declines them at the source, and a consumer who
       * wants Mol*'s native chrome can set this back to undefined.
       */
      viewport: { view: createViewportView(viewSettings) },
    },
    config: [
      ...(spec.config ?? []),
      [PluginConfig.Viewport.ShowExpand, false],
      [PluginConfig.Viewport.ShowControls, false],
      [PluginConfig.Viewport.ShowSettings, false],
      [PluginConfig.Viewport.ShowSelectionMode, false],
      [PluginConfig.Viewport.ShowAnimation, false],
      [PluginConfig.Viewport.ShowTrajectoryControls, false],
      ...SCREENSHOT_CONTROLS_CONFIG,
    ],
    layout: {
      initial: {
        controlsDisplay: "reactive",
        isExpanded: false,
        regionState: {
          bottom: "hidden",
          left: "hidden",
          right: "hidden",
          top: showSequenceViewer ? "full" : "hidden",
        },
      },
    },
  };

  const plugin = await createPluginUI({
    render: renderReact18,
    spec: mergeMolstarSpec(viewerSpec, molstarSpec),
    target: root,
  });

  const registry = plugin.representation.structure.themes.colorThemeRegistry;
  if (PlddtColoring.colorThemeProvider) {
    registry.add(PlddtColoring.colorThemeProvider);
  }
  registry.add(
    residueValueTheme.provider as Parameters<typeof registry.add>[0]
  );
  registry.add(chainColorTheme.provider as Parameters<typeof registry.add>[0]);

  // Remove Mol*'s default label providers (chain/atom/residue detail lines).
  // The hovered residue's info is surfaced in the legend instead of an
  // in-viewport tooltip, so no label provider is registered.
  for (const p of [...plugin.managers.lociLabels.providers]) {
    plugin.managers.lociLabels.removeProvider(p);
  }

  // The selected residue is highlighted via the marking system. Clicking a
  // residue sets Mol*'s focus; mirror that focus into the selection so the
  // residue is marked and renders with the marking.selectEdgeColor outline (no
  // geometry tint, since renderer.selectStrength is 0 above). The sequence
  // panel also reads this selection to dim the other residues.
  plugin.managers.structure.focus.behaviors.current.subscribe((entry) => {
    const select = plugin.managers.interactivity.lociSelects;
    if (entry?.loci) select.selectOnly({ loci: entry.loci });
    else select.deselectAll();
  });

  return plugin;
}

/**
 * The representation parameters Mol*'s own presets compute, read from the same
 * manager state they read. Ported rather than hardcoded so a chain drawn here
 * looks exactly like the one the preset used to draw. Mol* hands the same set
 * to its cartoons and its ball-and-sticks, and so does this.
 */
function representationTypeParams(plugin: PluginUIContext) {
  const { hydrogens, ignoreLight, visualQuality } =
    plugin.managers.structure.component.state.options;

  return {
    ignoreHydrogens: hydrogens !== "all",
    ignoreHydrogensVariant: (hydrogens === "only-polar"
      ? "non-polar"
      : "all") as "all" | "non-polar",
    ignoreLight,
    quality: visualQuality,
  };
}

/**
 * The two halves of a chain the viewer draws, which are also the prefixes of
 * the component keys they are built under - what `applyColorTheme` reads back
 * to tell one from the other, and what tags the representation over each.
 */
const POLYMER_PART = "polymer";
const LIGAND_PART = "ligand";

/** True for a component holding heteroatoms rather than polymer. */
function isLigandComponent(component: { key?: string }): boolean {
  return component.key?.startsWith(`${LIGAND_PART}-`) === true;
}

/**
 * How heteroatoms are colored: by element, with grey carbons.
 *
 * Pinned rather than left to the structure-wide theme the props ask for, for
 * two reasons. A heme reads as a heme because its iron is orange and its
 * nitrogens are blue, and a flat chain color throws that away. And pLDDT and
 * residue overlays have no value for a HETATM at all, so sharing their theme
 * would color a ligand by a score it does not have.
 *
 * The explicit `carbonColor` is what makes the carbons grey. Mol* defaults it
 * to `chain-id`, which would draw them from its own palette rather than this
 * viewer's - near enough the chain's color to look like a bug, never equal to
 * it, and meaningless under pLDDT.
 */
const ELEMENT_THEME = "element-symbol";
const ELEMENT_THEME_PARAMS: ColorTheme.BuiltInParams<typeof ELEMENT_THEME> = {
  carbonColor: { name: "element-symbol", params: {} },
};

type StructureSelector =
  StateObjectSelector<PluginStateObject.Molecule.Structure>;

/**
 * Draws one chain: its polymer as a cartoon, its ligands and ions as
 * ball-and-stick.
 *
 * Two components rather than one, because a component is what a representation
 * attaches to and neither representation suits both halves - a cartoon has no
 * backbone to trace through a heme, and a ball-and-stick over the whole chain
 * would draw every protein atom as a sphere.
 *
 * Hands back the refs of whichever components the chain turned out to have,
 * which is what `setSubtreeVisibility` is later pointed at. Grouping them
 * under the chain is what makes hiding a chain take its ligands with it.
 */
async function buildChainComponents(
  plugin: PluginUIContext,
  structure: StructureSelector,
  chain: { chainId: string; label: string },
  typeParams: ReturnType<typeof representationTypeParams>
): Promise<string[]> {
  const builders = plugin.builders.structure;
  const refs: string[] = [];

  const addPart = async (
    part: string,
    expression: Expression,
    props: StructureRepresentationBuiltInProps
  ) => {
    const component = await builders.tryCreateComponentFromExpression(
      structure,
      expression,
      `${part}-${chain.chainId}`,
      { label: chain.label }
    );

    // Undefined when the chain has nothing of this kind: no ligands, which is
    // most chains, or no polymer, which is what a solvent-only chain looks
    // like. Either way there is nothing to draw and nothing to hide.
    if (!component) return;

    await builders.representation.addRepresentation(component, props, {
      tag: part,
    });
    refs.push(component.ref);
  };

  await addPart(POLYMER_PART, chainPolymerExpression(chain.chainId), {
    type: "cartoon",
    typeParams,
  });

  await addPart(LIGAND_PART, chainLigandExpression(chain.chainId), {
    color: ELEMENT_THEME,
    colorParams: ELEMENT_THEME_PARAMS,
    type: "ball-and-stick",
    typeParams,
  });

  return refs;
}

/** What a load leaves behind for the chain-keyed props to address. */
interface LoadedStructure {
  chains: ChainRef[];
  /** Which residues sit on each chain, by `chainId`. */
  residuesByChain: Map<string, number[]>;
  /**
   * State tree refs of each chain's components, by `chainId` - its polymer's
   * and, where it has any, its ligands'. Chains with nothing to draw are
   * absent rather than present and empty.
   */
  componentRefs: Map<string, string[]>;
}

const NOTHING_LOADED: LoadedStructure = {
  chains: [],
  componentRefs: new Map(),
  residuesByChain: new Map(),
};

/**
 * Parses the PDB and draws each chain: a cartoon over its polymer, and
 * ball-and-stick over its ligands and ions.
 *
 * Mol*'s `default` hierarchy preset would be shorter, but it groups every
 * polymer chain into a single component, and a component is the unit Mol* can
 * hide. Building them per chain is what makes a chain individually hideable;
 * the refs handed back are what `setSubtreeVisibility` is later pointed at.
 */
async function loadStructure(
  plugin: PluginUIContext,
  pdbData: string,
  usePlddtColoring: boolean,
  showAxes: boolean
): Promise<LoadedStructure> {
  try {
    await plugin.clear();

    const data = await plugin.builders.data.rawData({
      data: pdbData,
      label: "Structure",
    });
    const trajectory = await plugin.builders.structure.parseTrajectory(
      data,
      "pdb"
    );
    const model = await plugin.builders.structure.createModel(trajectory);
    const structure = await plugin.builders.structure.createStructure(model, {
      name: "model",
      params: {},
    });

    const data3d = structure.data;
    if (!data3d) return NOTHING_LOADED;

    const { chainLabels, chains, residuesByChain } = scanChains(data3d);
    const typeParams = representationTypeParams(plugin);
    const componentRefs = new Map<string, string[]>();

    // Every chain the file names, not just the ones `chains` reports: a chain
    // holding nothing but a ligand is absent from the legend, since there is
    // no sequence to list, and still has to be drawn.
    for (const [chainId, label] of chainLabels) {
      const refs = await buildChainComponents(
        plugin,
        structure,
        { chainId, label },
        typeParams
      );

      // None for a chain with nothing the viewer draws, which is what a
      // solvent-only chain looks like. Nothing to color, nothing to hide.
      if (refs.length > 0) componentRefs.set(chainId, refs);
    }

    if (usePlddtColoring) {
      await applyColorTheme(plugin, PLDDT_THEME_NAME);
    }

    plugin.canvas3d?.requestCameraReset();
    setAxes(plugin, showAxes);

    return { chains, componentRefs, residuesByChain };
  } catch (error) {
    console.error("Failed to load structure:", error);
    return NOTHING_LOADED;
  }
}

/**
 * Shows or hides everything each chain is drawn with, cartoon and sticks
 * alike. Every component under the chain, so hiding it takes its ligands with
 * it rather than leaving a heme floating where its protein used to be.
 *
 * The whole subtree of each, not just the component cell: visibility is
 * per-cell, and it is the representation underneath that actually draws.
 *
 * Set outright rather than through the component manager's `toggleVisibility`,
 * which flips whatever it finds: the hidden set is derived from props on every
 * pass, so it has to be applied as a statement of what should be true and not
 * as a change to what already is.
 */
function applyChainVisibility(
  plugin: PluginUIContext,
  componentRefs: Map<string, string[]>,
  hidden: Set<string>
): void {
  for (const [chainId, refs] of componentRefs) {
    for (const ref of refs) {
      setSubtreeVisibility(plugin.state.data, ref, hidden.has(chainId));
    }
  }
}

/**
 * Recolors every loaded structure's representations with the named theme,
 * leaving the heteroatoms on element colors (see `ELEMENT_THEME_PARAMS`).
 *
 * The per-representation form of `updateRepresentationsTheme`, so the two can
 * be told apart in one pass; handing it a filtered list instead would leave
 * the ligands on whichever theme happened to be current when they were built.
 */
export async function applyColorTheme(
  plugin: PluginUIContext,
  colorTheme: string
): Promise<void> {
  await plugin.dataTransaction(async () => {
    for (const s of plugin.managers.structure.hierarchy.current.structures) {
      // Pinned to the element theme's generic, since it is the only one whose
      // params are named here. The other name rides in as a cast, which is
      // what Mol* asks of a theme it does not ship (see UpdateThemeParams).
      await plugin.managers.structure.component.updateRepresentationsTheme<
        typeof ELEMENT_THEME,
        SizeTheme.BuiltIn
      >(s.components, (component) =>
        isLigandComponent(component)
          ? { color: ELEMENT_THEME, colorParams: ELEMENT_THEME_PARAMS }
          : { color: colorTheme as typeof ELEMENT_THEME }
      );
    }
  });
}

export interface UseMolstarPluginOptions {
  containerRef: RefObject<HTMLDivElement | null>;
  pdb: string;
  hasPlddt: boolean;
  backgroundColor: Color;
  edgeColor: Color;
  highlightColor: Color;
  mode: ThemeMode;
  sequenceViewerBackgroundColor?: string;
  showAxes: boolean;
  showSequenceViewer: boolean;
  /** Chains to hide from the 3D view, by `chainId`. */
  hiddenChains: Set<string>;
  /** Color per chain, by `chainId`, as `#RRGGBB`. */
  chainColors: Map<string, string>;
  /** Selects a whole chain, for the sequence panel's chain captions. */
  onChainSelect?: (chainId: string) => void;
  /** Flips a chain's visibility, for the sequence panel's captions. */
  onChainToggle?: (chainId: string) => void;
  /** Chains the current selection covers whole. */
  selectedChains: Set<string>;
  /** What the capture button downloads, or undefined for no button. */
  download?: StructureDownload | null;
  /** Mol* spec laid over the viewer's own. */
  molstarSpec?: Partial<PluginUISpec>;
  onResidueClick?: (residue: ResidueRef) => void;
  onResidueHover?: (residue: ResidueRef | null) => void;
  /** Called with everything a click covers, which a drag makes a range. */
  onSelectionChange?: (selection: StructureSelection) => void;
  /** Called when the user clicks empty space, clearing the selection. */
  onSelectionClear?: () => void;
}

export interface UseMolstarPluginResult {
  pluginRef: RefObject<PluginUIContext | null>;
  /** True once the plugin exists and a structure has been loaded into it. */
  isReady: boolean;
  /**
   * Records the clip anchor taken when a residue is focused, which is what
   * keeps depth clipping in step with the zoom. Null stops the clipping.
   */
  setClipRatio: (ratio: number | null) => void;
  /** Chains of the loaded structure, or `[]` before one is loaded. */
  chains: ChainRef[];
}

/**
 * Owns the Mol* plugin for one viewer: creates it, loads the structure, wires
 * interaction callbacks, and disposes of it on unmount.
 *
 * The plugin is built once and then mutated in place. Creating it is expensive
 * and destroys the camera, so prop changes that Mol* can absorb (background,
 * axes, coloring, new PDB) are pushed in through the effects below and in the
 * sibling hooks rather than by rebuilding.
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
export function useMolstarPlugin({
  backgroundColor,
  chainColors,
  containerRef,
  download,
  edgeColor,
  hasPlddt,
  hiddenChains,
  highlightColor,
  mode,
  molstarSpec,
  onChainSelect,
  onChainToggle,
  onResidueClick,
  onResidueHover,
  onSelectionChange,
  onSelectionClear,
  pdb,
  selectedChains,
  sequenceViewerBackgroundColor,
  showAxes,
  showSequenceViewer,
}: UseMolstarPluginOptions): UseMolstarPluginResult & {
  residueValueThemeRef: RefObject<ResidueValueTheme | null>;
  chainColorThemeRef: RefObject<ChainColorTheme | null>;
  residuesByChainRef: RefObject<Map<string, number[]>>;
} {
  const pluginRef = useRef<PluginUIContext | null>(null);
  const residueValueThemeRef = useRef<ResidueValueTheme | null>(null);
  const chainColorThemeRef = useRef<ChainColorTheme | null>(null);
  const currentPdbRef = useRef<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [chains, setChains] = useState<ChainRef[]>([]);

  /**
   * Where each chain's components live in the state tree, which is what the
   * visibility effect points `setSubtreeVisibility` at. Rewritten by every
   * load, since the refs do not survive `plugin.clear()`.
   */
  const componentRefsRef = useRef<Map<string, string[]>>(new Map());

  /**
   * Which residues sit on each chain, for the readout to average a score over
   * a whole-chain selection. A ref rather than state: nothing renders from it
   * directly, and it is rewritten in step with `chains`, which does.
   */
  const residuesByChainRef = useRef<Map<string, number[]>>(new Map());

  /**
   * The visibility and coloring to apply as soon as a structure exists. Read
   * through refs because both arrive as fresh objects on every render, and a
   * load has to be able to consult them without the load effect depending on
   * them - a new Set each render would reload the structure on every pass.
   */
  const hiddenChainsRef = useRef(hiddenChains);
  hiddenChainsRef.current = hiddenChains;
  const chainColorsRef = useRef(chainColors);
  chainColorsRef.current = chainColors;

  /**
   * Carries the theme-dependent props into the views Mol* renders in its own
   * React root. They cannot read them from context, and rebuilding the plugin
   * would throw away the camera, so the values are pushed to them instead.
   */
  const viewSettingsRef = useRef<MolstarViewSettingsSubject | null>(null);
  if (viewSettingsRef.current === null) {
    viewSettingsRef.current = new BehaviorSubject<MolstarViewSettings>({
      mode,
      sequenceViewerBackgroundColor,
      showAxes,
    });
  }
  const viewSettings = viewSettingsRef.current;

  /**
   * Clip-radius-per-camera-distance ratio recorded at the last residue focus,
   * or null when no residue is focused. Anchors the adaptive depth clipping.
   */
  const clipRatioRef = useRef<number | null>(null);

  // Stable, so the focus effect that takes it does not re-run every render.
  const setClipRatio = useCallback((ratio: number | null) => {
    clipRatioRef.current = ratio;
  }, []);

  /**
   * Takes up what a load produced: the component refs the chain-keyed props
   * address, the visibility they were already asking for, and the chain list
   * the consumer is told about.
   *
   * Chains are published only when they actually differ, so reloading the same
   * structure - a theme switch that happens to reload, a parent handing back an
   * equal PDB string - does not hand every consumer a new array to react to.
   */
  const adoptLoadedStructure = useCallback(
    (plugin: PluginUIContext, loaded: LoadedStructure) => {
      componentRefsRef.current = loaded.componentRefs;
      residuesByChainRef.current = loaded.residuesByChain;
      applyChainVisibility(
        plugin,
        loaded.componentRefs,
        hiddenChainsRef.current
      );
      setChains((prev) =>
        chainsEqual(prev, loaded.chains) ? prev : loaded.chains
      );
    },
    []
  );

  // Interaction callbacks are read through refs so a parent passing new
  // closures on every render does not tear down and rebuild the plugin.
  const onResidueClickRef = useRef(onResidueClick);
  onResidueClickRef.current = onResidueClick;
  const onSelectionClearRef = useRef(onSelectionClear);
  onSelectionClearRef.current = onSelectionClear;
  const onSelectionChangeRef = useRef(onSelectionChange);
  onSelectionChangeRef.current = onSelectionChange;
  const onResidueHoverRef = useRef(onResidueHover);
  onResidueHoverRef.current = onResidueHover;

  /** Last residue reported to `onResidueHover`, to suppress repeats. */
  const lastHoverRef = useRef<ResidueRef | null>(null);

  // Values that only apply at creation time, read through refs so that changing
  // them later does not rebuild the plugin (they are pushed in via effects).
  const initialPropsRef = useRef({
    backgroundColor,
    edgeColor,
    hasPlddt,
    highlightColor,
    mode,
    molstarSpec,
    pdb,
    showAxes,
    showSequenceViewer,
  });
  initialPropsRef.current = {
    backgroundColor,
    edgeColor,
    hasPlddt,
    highlightColor,
    mode,
    molstarSpec,
    pdb,
    showAxes,
    showSequenceViewer,
  };

  /**
   * The consumer's `canvas3d` overrides, keyed by content. Unlike the rest of
   * the spec these are re-applied when they change, and they commonly arrive
   * as an object written inline - so the effect below turns on what they say
   * rather than on the identity of the object saying it.
   */
  const canvas3dOverrideKey = (() => {
    try {
      return JSON.stringify(molstarSpec?.canvas3d ?? null);
    } catch {
      // Something unserializable in there; fall back to re-applying always.
      return String(Date.now());
    }
  })();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let clipSubscription: { unsubscribe: () => void } | undefined;

    const init = async () => {
      await nextFrame();
      if (cancelled) return;

      // Mol* needs a laid-out container to size its canvas, so wait for one.
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        setTimeout(init, LAYOUT_RETRY_MS);
        return;
      }

      const initial = initialPropsRef.current;

      try {
        const residueValueTheme = createResidueValueTheme(initial.mode);
        const chainColorTheme = createChainColorTheme();
        const plugin = await createViewer({
          backgroundColor: initial.backgroundColor,
          chainColorTheme,
          edgeColor: initial.edgeColor,
          highlightColor: initial.highlightColor,
          molstarSpec: initial.molstarSpec,
          residueValueTheme,
          root: container,
          showAxes: initial.showAxes,
          showSequenceViewer: initial.showSequenceViewer,
          viewSettings,
        });

        if (cancelled) {
          plugin.dispose();
          return;
        }

        pluginRef.current = plugin;
        residueValueThemeRef.current = residueValueTheme;
        chainColorThemeRef.current = chainColorTheme;

        // Building the plugin outlasts a paint or two, so the props can have
        // moved on since the snapshot above was taken - an app whose structure
        // arrives after first paint will have swapped it by now. None of the
        // effects below can step in while this one is still running, so load
        // what the props say at this moment rather than what they said when
        // initialization started.
        const latest = initialPropsRef.current;

        const loaded = await loadStructure(
          plugin,
          latest.pdb,
          latest.hasPlddt,
          latest.showAxes
        );
        currentPdbRef.current = latest.pdb;
        adoptLoadedStructure(plugin, loaded);

        /**
         * Mol*'s click behavior is a BehaviorSubject, so subscribing replays
         * whatever it is currently holding - which, before anything has been
         * clicked, is an empty click. Acting on that would read as the user
         * clicking empty space and clear a selection the consumer had set
         * before the viewer was even interactive.
         *
         * Only the replay is skipped, not every empty click: clicking away
         * from the structure is how a selection is meant to be cleared.
         */
        let clickReplayConsumed = false;

        plugin.behaviors.interaction.click.subscribe((e) => {
          if (!clickReplayConsumed) {
            clickReplayConsumed = true;
            if (Representation.Loci.isEmpty(e.current)) return;
          }

          if (Representation.Loci.isEmpty(e.current)) {
            onSelectionClearRef.current?.();
            return;
          }

          const loci = e.current.loci;
          if (!StructureElement.Loci.is(loci)) return;

          const residue = residueRefFromLoci(loci);
          if (!residue) return;

          // Reporting only: the camera follows `selection`, so it is the
          // consumer echoing this back that moves it (see useSelectionFocus).
          //
          // Two callbacks because a click carries two different facts. The
          // residue is the one under the pointer, which is all a click on the
          // 3D view has to say; the selection is everything the click covers,
          // which for a drag across the sequence is a whole range.
          onResidueClickRef.current?.(residue);
          onSelectionChangeRef.current?.(selectionFromLoci(loci));
        });

        plugin.behaviors.interaction.hover.subscribe((e) => {
          const loci = e.current.loci;
          const residue = StructureElement.Loci.is(loci)
            ? residueRefFromLoci(loci)
            : null;

          // Mol* emits hover continuously while the pointer rests on a residue.
          // Reporting a fresh object each time would cost every consumer that
          // stores it a re-render per event, where the previous pair of
          // primitives let React bail out on an unchanged value.
          if (residue?.index === lastHoverRef.current?.index) return;
          lastHoverRef.current = residue;

          onResidueHoverRef.current?.(residue);
        });

        clipSubscription = plugin.canvas3d?.didDraw.subscribe(() => {
          syncClipToZoom(plugin, () => clipRatioRef.current);
        });

        if (!cancelled) setIsReady(true);
      } catch (error) {
        console.error("Failed to initialize Mol* viewer:", error);
      }
    };

    init();

    return () => {
      cancelled = true;
      clipSubscription?.unsubscribe();
      pluginRef.current?.dispose();
      pluginRef.current = null;
      residueValueThemeRef.current = null;
      chainColorThemeRef.current = null;
      componentRefsRef.current = new Map();
      residuesByChainRef.current = new Map();
      currentPdbRef.current = null;
      clipRatioRef.current = null;
      setIsReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Push theme-derived colors into the live canvas. Rebuilding the plugin would
  // reset the camera, so a theme change is applied in place instead.
  useEffect(() => {
    const canvas3d = pluginRef.current?.canvas3d;
    if (!canvas3d || !isReady) return;

    canvas3d.setProps({
      marking: { highlightEdgeColor: edgeColor, selectEdgeColor: edgeColor },
      renderer: { backgroundColor, highlightColor },
    });

    // Applied after, so a consumer naming the same setting wins over the
    // viewer's. `setProps` merges into what is already there, which is what
    // lets the two be pushed in sequence rather than combined first.
    const override = initialPropsRef.current.molstarSpec?.canvas3d;
    if (override) canvas3d.setProps(override);
    // There is no canvas to push to until the plugin is up, and a dependency
    // that changed before then will not change again to replay this. Waiting
    // on isReady is what keeps a theme switched mid-initialization.
    //
    // canvas3dOverrideKey stands in for the override object; see above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    backgroundColor,
    canvas3dOverrideKey,
    edgeColor,
    highlightColor,
    isReady,
  ]);

  // Hand the new settings to the views Mol* renders outside the React tree.
  useEffect(() => {
    viewSettings.next({
      download,
      hiddenChains,
      mode,
      onChainSelect,
      onChainToggle,
      selectedChains,
      sequenceViewerBackgroundColor,
      showAxes,
    });
  }, [
    download,
    hiddenChains,
    mode,
    onChainSelect,
    onChainToggle,
    selectedChains,
    sequenceViewerBackgroundColor,
    showAxes,
    viewSettings,
  ]);

  useEffect(() => {
    if (!isReady || !pluginRef.current) return;
    setAxes(pluginRef.current, showAxes);
    // isReady replays this for the same reason as the colors above.
  }, [showAxes, isReady]);

  // Reload the structure when the PDB data changes.
  useEffect(() => {
    const plugin = pluginRef.current;
    if (!plugin || !isReady) return;
    if (pdb === currentPdbRef.current) return;

    currentPdbRef.current = pdb;
    clipRatioRef.current = null;
    // The residue under the pointer belongs to the outgoing structure, and the
    // hover guard compares against it. Clearing it keeps the first hover on the
    // new structure from being read as a repeat.
    lastHoverRef.current = null;
    loadStructure(plugin, pdb, hasPlddt, showAxes).then((loaded) => {
      // The plugin can have been disposed while the structure was loading.
      if (pluginRef.current !== plugin) return;
      adoptLoadedStructure(plugin, loaded);
    });
    // isReady replays this once the plugin is up, which is what catches a pdb
    // swapped while it was still being built; the comparison above makes the
    // replay a no-op when it was not.
    // showAxes is read for the reload only; changing it alone is handled above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdb, hasPlddt, isReady, adoptLoadedStructure]);

  // Show and hide chains in place. Visibility is a state-tree flag, so it costs
  // neither a reload nor a recolor, and a hidden chain stops being drawn - which
  // is also what takes it out of reach of hover and click.
  useEffect(() => {
    const plugin = pluginRef.current;
    if (!plugin || !isReady) return;

    applyChainVisibility(plugin, componentRefsRef.current, hiddenChains);
    // isReady replays this for the same reason as the colors above: a chain
    // hidden before the plugin came up has no later change to ride in on.
  }, [hiddenChains, isReady]);

  return {
    chainColorThemeRef,
    chains,
    isReady,
    pluginRef,
    residuesByChainRef,
    residueValueThemeRef,
    setClipRatio,
  };
}

import { Color } from "molstar/lib/mol-util/color";
import { StructureElement } from "molstar/lib/mol-model/structure";
import { createPluginUI } from "molstar/lib/mol-plugin-ui";
import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { renderReact18 } from "molstar/lib/mol-plugin-ui/react18";
import { DefaultPluginUISpec } from "molstar/lib/mol-plugin-ui/spec";
import type { PluginUISpec } from "molstar/lib/mol-plugin-ui/spec";
import { PluginBehaviors } from "molstar/lib/mol-plugin/behavior";
import { PluginConfig, PluginConfigItem } from "molstar/lib/mol-plugin/config";
import { Representation } from "molstar/lib/mol-repr/representation";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { createSequenceView } from "../components/SequenceView";
import { createViewportView } from "../components/Viewport";
import type {
  CameraOrientation,
  ChainRef,
  LoadedStructureInfo,
  ResidueRef,
  SceneMode,
  StructureDownload,
  StructureLoadInfo,
  StructureSelection,
  ViewerErrorPhase,
} from "../ProteinStructureViewer.types";
import type { CameraFraming } from "../scene/camera";
import {
  LoadOutcome,
  LoadedStructure,
  NOTHING_LOADED,
  loadInfo,
} from "../scene/load";
import { chainSetKey } from "../scene/representation";
import { SceneProps, StructureScene } from "../scene/StructureScene";
import { syncClipToZoom } from "../utils/cameraFocus";
import { AXES_OFF, AXES_ON } from "../utils/axes";
import { chainsEqual } from "../utils/chains";
import { highlightsKey } from "../utils/highlights";
import { mergeMolstarSpec } from "../utils/molstarSpec";
import { residueRefFromLoci, selectionFromLoci } from "../utils/residueRef";
import type {
  MolstarViewSettings,
  MolstarViewSettingsSubject,
  ThemeMode,
} from "../utils/theme";

/** Delay before retrying initialization while the container has no size. */
const LAYOUT_RETRY_MS = 100;

/** What the viewer logs for a failure when no `onError` is listening. */
const UNHANDLED_ERROR_MESSAGES: Record<ViewerErrorPhase, string> = {
  capture: "Failed to download the structure image:",
  init: "Failed to initialize Mol* viewer:",
  load: "Failed to load structure:",
  representation: "Failed to draw the structure:",
};

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
  molstarSpec?: Partial<PluginUISpec>;
}

async function createViewer({
  backgroundColor,
  edgeColor,
  highlightColor,
  molstarSpec,
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
  // to follow `selection`. The zoom is driven from useSelectionFocus instead,
  // which keeps the clip planes open to the whole scene. The residue highlight
  // is unaffected - that comes from the separate Representation.FocusLoci
  // behavior, so a click still marks a residue even when a consumer
  // controlling the selection declines it.
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

export interface UseMolstarPluginOptions {
  containerRef: RefObject<HTMLDivElement | null>;
  structure: string;
  backgroundColor: Color;
  edgeColor: Color;
  highlightColor: Color;
  mode: ThemeMode;
  sequenceViewerBackgroundColor?: string;
  showAxes: boolean;
  showSequenceViewer: boolean;
  /** Chains hidden from the 3D view, by `chainId`, for the sequence panel. */
  hiddenChains: Set<string>;
  /**
   * What to draw and how to color it, and where the camera starts: read by
   * every load, and pushed into the scene when it changes.
   */
  sceneProps: SceneProps & CameraFraming;
  /** Selects a whole chain, for the sequence panel's chain captions. */
  onChainSelect?: (chainId: string) => void;
  /** Flips a chain's visibility, for the sequence panel's captions. */
  onChainToggle?: (chainId: string) => void;
  /** Lights a chain up while its caption is pointed at; null on leave. */
  onChainHover?: (chainId: string | null) => void;
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
  /** Who draws the structure. Read once, when the plugin is created. */
  sceneMode: SceneMode;
  /** Handed the plugin after each successful load. */
  onReady?: (
    plugin: PluginUIContext,
    loaded: LoadedStructureInfo
  ) => void | Promise<void>;
  /** Told of failures in place of the console. */
  onError?: (error: unknown, phase: ViewerErrorPhase) => void;
  /** Called before a plugin handed to `onReady` is disposed of. */
  onDispose?: () => void;
  /** Told of every structure that loads. */
  onStructureLoad?: (info: StructureLoadInfo) => void;
}

export interface UseMolstarPluginResult {
  pluginRef: RefObject<PluginUIContext | null>;
  /** True once the plugin exists and a structure has been loaded into it. */
  isReady: boolean;
  /**
   * The scene mode the plugin was created with, which is the one in force for
   * as long as it lives whatever the prop says later.
   */
  sceneMode: SceneMode;
  /**
   * Records the clip anchor taken when a residue is focused, which is what
   * keeps depth clipping in step with the zoom. Null stops the clipping.
   */
  setClipRatio: (ratio: number | null) => void;
  /** Chains of the loaded structure, or `[]` before one is loaded. */
  chains: ChainRef[];
  /**
   * How many structures have been loaded into the plugin. A load rebuilds the
   * state tree, so anything written into it outside this hook has to be written
   * again - which is what this counts for.
   */
  loadCount: number;
  /**
   * How many times the scene has replaced components without a load - a
   * surface rebuilt around newly hidden chains, highlights redrawn. Counted for
   * the same reason as `loadCount`.
   */
  sceneVersion: number;
  /** Which residues sit on each chain, for expanding whole-chain selections. */
  residuesByChainRef: RefObject<Map<string, number[]>>;
  /** Residue index by address, for resolving addresses in props. */
  addressIndexRef: RefObject<Map<string, number>>;
  /** The scene drawn on the plugin, which places the camera too. */
  sceneRef: RefObject<StructureScene | null>;
  /**
   * The orientation the camera was last turned to, by a load or since, so a
   * change can be told from one already applied.
   */
  framedOrientationRef: { current: CameraOrientation | undefined };
}

/**
 * Owns the Mol* plugin for one viewer: creates it, loads the structure, wires
 * interaction callbacks, and disposes of it on unmount.
 *
 * The plugin is built once and then mutated in place. Creating it is expensive
 * and destroys the camera, so prop changes that Mol* can absorb (background,
 * axes, coloring, representation, new structure) are pushed in through the
 * effects below and in the sibling hooks rather than by rebuilding.
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
export function useMolstarPlugin({
  backgroundColor,
  containerRef,
  download,
  edgeColor,
  hiddenChains,
  highlightColor,
  mode,
  molstarSpec,
  onChainHover,
  onChainSelect,
  onChainToggle,
  onDispose,
  onError,
  onReady,
  onResidueClick,
  onResidueHover,
  onSelectionChange,
  onSelectionClear,
  onStructureLoad,
  sceneMode,
  sceneProps,
  selectedChains,
  sequenceViewerBackgroundColor,
  showAxes,
  showSequenceViewer,
  structure,
}: UseMolstarPluginOptions): UseMolstarPluginResult {
  const pluginRef = useRef<PluginUIContext | null>(null);
  const sceneRef = useRef<StructureScene | null>(null);
  const currentStructureRef = useRef<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [chains, setChains] = useState<ChainRef[]>([]);
  const [loadCount, setLoadCount] = useState(0);
  const [sceneVersion, setSceneVersion] = useState(0);
  const [sceneBusy, setSceneBusy] = useState(false);

  /**
   * Which residues sit on each chain, for the readout to average a score over
   * a whole-chain selection. A ref rather than state: nothing renders from it
   * directly, and it is rewritten in step with `chains`, which does.
   */
  const residuesByChainRef = useRef<Map<string, number[]>>(new Map());
  const addressIndexRef = useRef<Map<string, number>>(new Map());
  const framedOrientationRef = useRef<CameraOrientation | undefined>(undefined);

  /**
   * The scene as the props describe it, read by a load when it comes to draw.
   * Through a ref because a load outlasts renders and has to draw what the
   * props say when it gets there, not what they said when it began.
   */
  const scenePropsRef = useRef(sceneProps);
  scenePropsRef.current = sceneProps;

  // Values that only apply at creation time, read through refs so that changing
  // them later does not rebuild the plugin (they are pushed in via effects).
  const initialPropsRef = useRef({
    backgroundColor,
    edgeColor,
    highlightColor,
    mode,
    molstarSpec,
    showAxes,
    showSequenceViewer,
    structure,
  });
  initialPropsRef.current = {
    backgroundColor,
    edgeColor,
    highlightColor,
    mode,
    molstarSpec,
    showAxes,
    showSequenceViewer,
    structure,
  };

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
   * Takes up what a load produced: what the chain-keyed props and addresses
   * are resolved against, and the chain list the consumer is told about.
   *
   * Chains are published only when they actually differ, so reloading the same
   * structure - a parent handing back an equal PDB string - does not hand every
   * consumer a new array to react to.
   */
  const adoptLoadedStructure = useCallback((loaded: LoadedStructure) => {
    residuesByChainRef.current = loaded.residuesByChain;
    addressIndexRef.current = loaded.addressIndex;
    setChains((prev) =>
      chainsEqual(prev, loaded.chains) ? prev : loaded.chains
    );

    // Counted rather than derived from the chains, which a structure reloaded
    // for a new string comes back with unchanged.
    setLoadCount((count) => count + 1);
  }, []);

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
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;
  const onDisposeRef = useRef(onDispose);
  onDisposeRef.current = onDispose;
  const onStructureLoadRef = useRef(onStructureLoad);
  onStructureLoadRef.current = onStructureLoad;

  /**
   * Fixed at the first render: the load path draws or declines to draw by it,
   * so a mode that changed under a live plugin would leave its scene half one
   * and half the other.
   */
  const sceneModeRef = useRef(sceneMode);

  /**
   * The plugin last handed to `onReady`, so that `onDispose` is only called for
   * one a consumer has actually been given - and is called for it even while
   * its `onReady` is still running.
   */
  const handedOverRef = useRef<PluginUIContext | null>(null);

  /** Last residue reported to `onResidueHover`, to suppress repeats. */
  const lastHoverRef = useRef<ResidueRef | null>(null);

  // Stable, so it can ride into the views Mol* renders without a push per
  // render, and so the load paths below can close over it.
  const reportError = useCallback((error: unknown, phase: ViewerErrorPhase) => {
    const handler = onErrorRef.current;
    if (handler) handler(error, phase);
    else console.error(UNHANDLED_ERROR_MESSAGES[phase], error);
  }, []);

  /**
   * Hands a loaded structure to `onReady` and waits for it.
   *
   * `isCurrent` says whether the plugin is still the viewer's own by the time
   * the consumer is done with it. A failure after that is not reported: the
   * plugin it happened on is gone, and the consumer has been told so through
   * `onDispose` already.
   */
  const handOver = useCallback(
    async (
      plugin: PluginUIContext,
      loaded: LoadedStructure,
      isCurrent: () => boolean
    ) => {
      const ready = onReadyRef.current;
      const { atomCount, chains: loadedChains, structure: parsed } = loaded;
      if (!ready || !parsed) return;

      handedOverRef.current = plugin;
      try {
        await ready(plugin, {
          atomCount,
          chains: loadedChains,
          structure: parsed,
        });
      } catch (error) {
        if (isCurrent()) reportError(error, "load");
      }
    },
    [reportError]
  );

  /**
   * Takes up whatever a load produced. A failed load leaves the viewer holding
   * nothing, as a structure with no chains would, and is reported rather than
   * handed to `onReady`.
   */
  const takeUpLoad = useCallback(
    async (
      plugin: PluginUIContext,
      outcome: LoadOutcome,
      isCurrent: () => boolean
    ) => {
      if (!isCurrent()) return;

      if (!outcome.ok) {
        adoptLoadedStructure(NOTHING_LOADED);
        reportError(outcome.error, "load");
        return;
      }

      const { loaded } = outcome;
      adoptLoadedStructure(loaded);
      onStructureLoadRef.current?.(loadInfo(loaded));

      await handOver(plugin, loaded, isCurrent);
    },
    [adoptLoadedStructure, handOver, reportError]
  );

  /**
   * Loads a structure and brings everything up on it: parses it, draws the
   * scene when the viewer is the one drawing it, places the camera, and hands
   * it over. Runs inside the scene's queue, so it never interleaves with an
   * update to the structure it is replacing.
   *
   * The camera is placed once something is drawn: Mol* settles a reset on the
   * next frame, and one settled against an empty scene is lost. So it follows
   * the viewer's own scene when there is one, and the consumer's `onReady`
   * when the consumer draws.
   */
  const loadAndDraw = useCallback(
    async (
      plugin: PluginUIContext,
      scene: StructureScene,
      text: string,
      isCurrent: () => boolean
    ) => {
      const outcome = await scene.load(text, scenePropsRef.current);
      if (!isCurrent()) return;

      const managed = sceneModeRef.current === "managed";
      if (outcome.ok) setAxes(plugin, initialPropsRef.current.showAxes);

      if (managed && outcome.ok) {
        framedOrientationRef.current = scene.frame(scenePropsRef.current, true);
      }

      await takeUpLoad(plugin, outcome, isCurrent);

      if (!managed && outcome.ok && isCurrent()) {
        framedOrientationRef.current = scene.frame(
          scenePropsRef.current,
          false
        );
      }
    },
    [takeUpLoad]
  );

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
        const plugin = await createViewer({
          backgroundColor: initial.backgroundColor,
          edgeColor: initial.edgeColor,
          highlightColor: initial.highlightColor,
          molstarSpec: initial.molstarSpec,
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
        const scene = new StructureScene(plugin, {
          draw: sceneModeRef.current === "managed",
          mode: initial.mode,
          onBusyChange: setSceneBusy,
          onRebuild: () => setSceneVersion((version) => version + 1),
          reportError,
        });
        sceneRef.current = scene;

        // Building the plugin outlasts a paint or two, so the props can have
        // moved on since the snapshot above was taken - an app whose structure
        // arrives after first paint will have swapped it by now. None of the
        // effects below can step in while this one is still running, so load
        // what the props say at this moment rather than what they said when
        // initialization started.
        const latest = initialPropsRef.current;
        currentStructureRef.current = latest.structure;

        // Handed over before the viewer answers a click, so a scene the
        // consumer builds is in place before one reaches it.
        await scene.enqueue(() =>
          loadAndDraw(plugin, scene, latest.structure, () => !cancelled)
        );
        if (cancelled) return;

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

          // Reporting only: the camera follows the selection, so it moves once
          // this is accepted - echoed back by a consumer controlling
          // `selection`, or taken up by the viewer when nobody is (see
          // useSelectionFocus).
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
        if (!cancelled) reportError(error, "init");
      }
    };

    init();

    return () => {
      cancelled = true;
      clipSubscription?.unsubscribe();
      sceneRef.current?.dispose();
      sceneRef.current = null;

      const plugin = pluginRef.current;
      try {
        if (plugin && handedOverRef.current === plugin) {
          handedOverRef.current = null;
          onDisposeRef.current?.();
        }
      } finally {
        // A consumer's teardown failing must not leak the WebGL context.
        plugin?.dispose();
      }
      pluginRef.current = null;
      residuesByChainRef.current = new Map();
      addressIndexRef.current = new Map();
      currentStructureRef.current = null;
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
      onChainHover,
      onChainSelect,
      onChainToggle,
      onError: reportError,
      sceneBusy,
      selectedChains,
      sequenceViewerBackgroundColor,
      showAxes,
    });
  }, [
    download,
    hiddenChains,
    mode,
    onChainHover,
    onChainSelect,
    onChainToggle,
    reportError,
    sceneBusy,
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

  // Reload the structure when the data changes.
  useEffect(() => {
    const plugin = pluginRef.current;
    const scene = sceneRef.current;
    if (!plugin || !scene || !isReady) return;
    if (structure === currentStructureRef.current) return;

    currentStructureRef.current = structure;
    clipRatioRef.current = null;
    // The residue under the pointer belongs to the outgoing structure, and the
    // hover guard compares against it. Clearing it keeps the first hover on the
    // new structure from being read as a repeat.
    lastHoverRef.current = null;
    scene
      .enqueue(() =>
        // The plugin can have been disposed while the structure was loading.
        loadAndDraw(
          plugin,
          scene,
          structure,
          () => pluginRef.current === plugin
        )
      )
      .catch((error) => {
        if (pluginRef.current === plugin) reportError(error, "load");
      });
    // isReady replays this once the plugin is up, which is what catches a
    // structure swapped while it was still being built; the comparison above
    // makes the replay a no-op when it was not.
  }, [structure, isReady, loadAndDraw, reportError]);

  /**
   * Keys for the scene props that arrive as fresh objects on every render, so
   * the update below turns on what they say rather than on their identity.
   * `plddt` and the overlay are compared by identity, as they are elsewhere.
   */
  const hiddenKey = chainSetKey(sceneProps.hiddenChains);
  const sceneHighlightsKey = highlightsKey(sceneProps.highlights);
  const chainColorsKey = JSON.stringify(sceneProps.chainColors ?? null);

  // Bring the scene in line with the props, in place. Recoloring, hiding and
  // replacing a representation all leave the camera where it is.
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || !isReady || sceneModeRef.current !== "managed") return;

    void scene.update(scenePropsRef.current);
    // The keys above stand in for the objects they describe; isReady replays
    // this once the plugin is up, for props that changed while it was built.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isReady,
    sceneProps.representation,
    hiddenKey,
    sceneHighlightsKey,
    sceneProps.colorBy,
    chainColorsKey,
    sceneProps.plddt,
    sceneProps.overlay,
    sceneProps.mode,
  ]);

  return {
    addressIndexRef,
    chains,
    framedOrientationRef,
    isReady,
    loadCount,
    pluginRef,
    residuesByChainRef,
    sceneMode: sceneModeRef.current,
    sceneRef,
    sceneVersion,
    setClipRatio,
  };
}

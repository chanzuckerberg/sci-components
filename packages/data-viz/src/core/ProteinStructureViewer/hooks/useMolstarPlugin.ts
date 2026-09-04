import { Color } from "molstar/lib/mol-util/color";
import { StructureElement } from "molstar/lib/mol-model/structure";
import { createPluginUI } from "molstar/lib/mol-plugin-ui";
import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { renderReact18 } from "molstar/lib/mol-plugin-ui/react18";
import { DefaultPluginUISpec } from "molstar/lib/mol-plugin-ui/spec";
import { PluginBehaviors } from "molstar/lib/mol-plugin/behavior";
import { PluginConfig } from "molstar/lib/mol-plugin/config";
import { Representation } from "molstar/lib/mol-repr/representation";
import { RefObject, useEffect, useRef, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { createSequenceView } from "../components/SequenceView";
import { createViewportView } from "../components/Viewport";
import type { ResidueRef } from "../ProteinStructureViewer.types";
import { focusResidue, syncClipToZoom } from "../utils/cameraFocus";
import { residueRefFromLoci } from "../utils/residueRef";
import type {
  MolstarViewSettings,
  MolstarViewSettingsSubject,
  ThemeMode,
} from "../utils/theme";
import { PLDDT_THEME_NAME, PlddtColoring } from "../utils/plddt";
import {
  ResidueValueTheme,
  createResidueValueTheme,
} from "../utils/residueValueTheme";

/** Structure representation Mol* builds for the loaded model. */
const REPRESENTATION_PRESET = "polymer-cartoon";

/** Theme used when no pLDDT scores are supplied. */
export const FALLBACK_THEME_NAME = "chain-id";

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

const AXES_ON = {
  name: "on" as const,
  params: {
    alpha: 0.51,
    colorX: 16711680,
    colorY: 32768,
    colorZ: 255,
    labelColorX: 8421504,
    labelColorY: 8421504,
    labelColorZ: 8421504,
    labelOpacity: 1,
    labelScale: 0.25,
    labelX: "X",
    labelY: "Y",
    labelZ: "Z",
    location: "bottom-left",
    locationOffsetX: 0,
    locationOffsetY: 0,
    originColor: 8421504,
    planeColorXY: 8421504,
    planeColorXZ: 8421504,
    planeColorYZ: 8421504,
    radiusScale: 0.075,
    scale: 0.15,
    showLabels: false,
    showPlanes: true,
  },
};

const AXES_OFF = { name: "off" as const, params: {} };

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
}

async function createViewer({
  backgroundColor,
  edgeColor,
  highlightColor,
  residueValueTheme,
  root,
  showAxes,
  showSequenceViewer,
  viewSettings,
}: CreateViewerOptions): Promise<PluginUIContext> {
  const spec = DefaultPluginUISpec();

  // Drop Mol*'s built-in click-to-focus camera behavior. It zooms in with a
  // tiny focus radius, which collapses the camera's near/far clip planes into a
  // thin slab around the residue and slices the rest of the structure away. We
  // drive the zoom ourselves (see focusResidue) so we can keep the zoom while
  // holding the clip planes open to the whole scene. The residue highlight is
  // unaffected - that comes from the separate Representation.FocusLoci behavior.
  const behaviors = spec.behaviors.filter(
    (b) => b.transformer !== PluginBehaviors.Camera.FocusLoci
  );

  const plugin = await createPluginUI({
    render: renderReact18,
    spec: {
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
        remoteState: "none",
        sequenceViewer: { view: createSequenceView(viewSettings) },
        ...(showAxes && {
          viewport: { view: createViewportView(viewSettings) },
        }),
      },
      config: [
        ...(spec.config ?? []),
        [PluginConfig.Viewport.ShowExpand, false],
        [PluginConfig.Viewport.ShowControls, false],
        [PluginConfig.Viewport.ShowSettings, false],
        [PluginConfig.Viewport.ShowSelectionMode, false],
        [PluginConfig.Viewport.ShowAnimation, false],
        [PluginConfig.Viewport.ShowTrajectoryControls, false],
        [PluginConfig.Viewport.ShowScreenshotControls, false],
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
    },
    target: root,
  });

  const registry = plugin.representation.structure.themes.colorThemeRegistry;
  if (PlddtColoring.colorThemeProvider) {
    registry.add(PlddtColoring.colorThemeProvider);
  }
  registry.add(
    residueValueTheme.provider as Parameters<typeof registry.add>[0]
  );

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

async function loadStructure(
  plugin: PluginUIContext,
  pdbData: string,
  usePlddtColoring: boolean,
  showAxes: boolean
) {
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

    await plugin.builders.structure.hierarchy.applyPreset(
      trajectory,
      "default",
      {
        representationPreset: REPRESENTATION_PRESET,
        showUnitcell: false,
        structure: { name: "model", params: {} },
      }
    );

    if (usePlddtColoring) {
      await applyColorTheme(plugin, PLDDT_THEME_NAME);
    }

    plugin.canvas3d?.requestCameraReset();
    setAxes(plugin, showAxes);
  } catch (error) {
    console.error("Failed to load structure:", error);
  }
}

/** Recolors every loaded structure's representations with the named theme. */
export async function applyColorTheme(
  plugin: PluginUIContext,
  colorTheme: string
): Promise<void> {
  await plugin.dataTransaction(async () => {
    for (const s of plugin.managers.structure.hierarchy.current.structures) {
      await plugin.managers.structure.component.updateRepresentationsTheme(
        s.components,
        { color: colorTheme as never }
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
  onResidueClick?: (residue: ResidueRef) => void;
  onResidueHover?: (residue: ResidueRef | null) => void;
  onSelectionClear?: () => void;
}

export interface UseMolstarPluginResult {
  pluginRef: RefObject<PluginUIContext | null>;
  /** True once the plugin exists and a structure has been loaded into it. */
  isReady: boolean;
  /** Clears the recorded residue focus, stopping adaptive depth clipping. */
  clearClipRatio: () => void;
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
  containerRef,
  edgeColor,
  hasPlddt,
  highlightColor,
  mode,
  onResidueClick,
  onResidueHover,
  onSelectionClear,
  pdb,
  sequenceViewerBackgroundColor,
  showAxes,
  showSequenceViewer,
}: UseMolstarPluginOptions): UseMolstarPluginResult & {
  residueValueThemeRef: RefObject<ResidueValueTheme | null>;
} {
  const pluginRef = useRef<PluginUIContext | null>(null);
  const residueValueThemeRef = useRef<ResidueValueTheme | null>(null);
  const initializedRef = useRef(false);
  const currentPdbRef = useRef<string | null>(null);
  const [isReady, setIsReady] = useState(false);

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
    });
  }
  const viewSettings = viewSettingsRef.current;

  /**
   * Clip-radius-per-camera-distance ratio recorded at the last residue focus,
   * or null when no residue is focused. Anchors the adaptive depth clipping.
   */
  const clipRatioRef = useRef<number | null>(null);

  // Interaction callbacks are read through refs so a parent passing new
  // closures on every render does not tear down and rebuild the plugin.
  const onResidueClickRef = useRef(onResidueClick);
  onResidueClickRef.current = onResidueClick;
  const onSelectionClearRef = useRef(onSelectionClear);
  onSelectionClearRef.current = onSelectionClear;
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
    pdb,
    showAxes,
    showSequenceViewer,
  };

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
        const plugin = await createViewer({
          backgroundColor: initial.backgroundColor,
          edgeColor: initial.edgeColor,
          highlightColor: initial.highlightColor,
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

        await loadStructure(
          plugin,
          initial.pdb,
          initial.hasPlddt,
          initial.showAxes
        );
        currentPdbRef.current = initial.pdb;
        initializedRef.current = true;

        plugin.behaviors.interaction.click.subscribe((e) => {
          if (Representation.Loci.isEmpty(e.current)) {
            onSelectionClearRef.current?.();
            return;
          }

          const loci = e.current.loci;
          if (!StructureElement.Loci.is(loci)) return;

          const residue = residueRefFromLoci(loci);
          if (!residue) return;

          clipRatioRef.current = focusResidue(plugin, loci);
          onResidueClickRef.current?.(residue);
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
      initializedRef.current = false;
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
    if (!canvas3d) return;

    canvas3d.setProps({
      marking: { highlightEdgeColor: edgeColor, selectEdgeColor: edgeColor },
      renderer: { backgroundColor, highlightColor },
    });
  }, [backgroundColor, edgeColor, highlightColor]);

  // Hand the new settings to the views Mol* renders outside the React tree.
  useEffect(() => {
    viewSettings.next({ mode, sequenceViewerBackgroundColor });
  }, [mode, sequenceViewerBackgroundColor, viewSettings]);

  useEffect(() => {
    if (pluginRef.current && initializedRef.current) {
      setAxes(pluginRef.current, showAxes);
    }
  }, [showAxes]);

  // Reload the structure when the PDB data changes.
  useEffect(() => {
    const plugin = pluginRef.current;
    if (!plugin || !initializedRef.current) return;
    if (pdb === currentPdbRef.current) return;

    currentPdbRef.current = pdb;
    clipRatioRef.current = null;
    // The residue under the pointer belongs to the outgoing structure, and the
    // hover guard compares against it. Clearing it keeps the first hover on the
    // new structure from being read as a repeat.
    lastHoverRef.current = null;
    loadStructure(plugin, pdb, hasPlddt, showAxes);
    // showAxes is read for the reload only; changing it alone is handled above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdb, hasPlddt]);

  return {
    clearClipRatio: () => {
      clipRatioRef.current = null;
    },
    isReady,
    pluginRef,
    residueValueThemeRef,
  };
}

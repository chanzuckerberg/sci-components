import type { PluginContext } from "molstar/lib/mol-plugin/context";
import { chainColorMap } from "../../../common/chainColors";
import type {
  CameraOrientation,
  CameraState,
  ChainRef,
  ResidueHighlight,
  ResidueValueOverlay,
  StructureColorBy,
  StructureRepresentation,
  ViewerErrorPhase,
} from "../ProteinStructureViewer.types";
import { highlightsKey, resolveHighlights } from "../utils/highlights";
import { residueAddressesKey } from "../utils/residueAddress";
import type { ThemeMode } from "../utils/theme";
import {
  CameraFraming,
  frameStructure,
  orientationSnapshot,
  readCameraState,
  residuesCenter,
} from "./camera";
import {
  COLOR_THEME_NAMES,
  SceneColoring,
  SceneThemes,
  resolveColorBy,
  sceneThemesFor,
  syncSceneThemes,
} from "./coloring";
import { LoadOutcome, LoadedStructure, parseStructure } from "./load";
import {
  StructureSelector,
  applyChainVisibility,
  applyColorTheme,
  buildCartoonLayer,
  buildHighlightLayer,
  buildLigandLayer,
  buildSurfaceLayer,
  chainSetKey,
  removeComponents,
  representationTypeParams,
} from "./representation";

/** The props that decide what the viewer draws, and how it colors it. */
export interface SceneProps {
  representation: StructureRepresentation;
  hiddenChains: ReadonlySet<string>;
  highlights?: readonly ResidueHighlight[];
  colorBy?: StructureColorBy;
  /** The consumer's colors by `chainId`, laid over the chain palette. */
  chainColors?: Record<string, string>;
  plddt?: readonly (number | null)[] | null;
  overlay?: ResidueValueOverlay | null;
  mode: ThemeMode;
}

/** A parsed structure, and what drawing it takes knowing about it. */
interface SceneStructure {
  structure: StructureSelector;
  /** Every chain the file names, and its label: everything that is drawn. */
  chainLabels: ReadonlyMap<string, string>;
  /**
   * The polymer chains, in the order the legend lists them. The chain palette
   * is spent in this order, so the structure and the legend agree on colors.
   */
  chains: readonly ChainRef[];
  /** Residue index by address, which highlights are resolved through. */
  addressIndex: ReadonlyMap<string, number>;
}

interface PolymerLayer {
  /** What was drawn, which is a cartoon when a surface could not be. */
  drawn: StructureRepresentation;
  cartoon: Map<string, string>;
  surface?: string;
}

/** The components the scene built, by what they draw. */
interface Layers {
  polymer: PolymerLayer;
  ligand: Map<string, string>;
  highlight: Map<string, string>;
}

const emptyLayers = (): Layers => ({
  highlight: new Map(),
  ligand: new Map(),
  polymer: { cartoon: new Map(), drawn: "cartoon" },
});

const polymerRefs = (layer: PolymerLayer): string[] => [
  ...layer.cartoon.values(),
  ...(layer.surface ? [layer.surface] : []),
];

/** What the scene was last brought in line with. */
interface AppliedScene {
  coloringKey: string;
  hiddenKey: string;
  highlightLayerKey: string;
  representation: StructureRepresentation;
}

export interface StructureSceneConfig {
  /**
   * Whether the scene draws the structures it loads. A scene that does not
   * only parses them, for a consumer drawing its own.
   */
  draw: boolean;
  /** The mode the scene's themes start in, until props say otherwise. */
  mode: ThemeMode;
  reportError: (error: unknown, phase: ViewerErrorPhase) => void;
  /**
   * Called after an update replaced components, so what was written into the
   * old ones - chain dimming - can be written into the new.
   */
  onRebuild?: () => void;
  /** Told when work is first queued and when the queue drains. */
  onBusyChange?: (busy: boolean) => void;
}

/**
 * Objects compared by identity, as numbers a string key can carry. A new
 * `plddt` array or overlay is new data even when it holds the same values,
 * which is how the rest of the viewer treats them too.
 */
const identities = new WeakMap<object, number>();
let nextIdentity = 1;

function identityKey(value: object | null | undefined): number {
  if (!value) return 0;

  let id = identities.get(value);
  if (id === undefined) {
    id = nextIdentity++;
    identities.set(value, id);
  }

  return id;
}

/**
 * A structure scene on a Mol* plugin: loads a structure into it, draws it from
 * props, keeps the drawing in line with them, and places the camera.
 *
 * It takes any plugin - the viewer's own, a consumer's, or one rendering
 * offscreen - and draws the same scene on each, which is what makes an image
 * rendered without the viewer match what the viewer shows.
 *
 * Every change to the plugin's state tree - a load clearing it, an update
 * rebuilding part of it - runs through one queue, so no two ever interleave:
 * a surface half built when the next structure arrives would otherwise be
 * built on a cell that no longer exists.
 *
 * An update rebuilds only the parts whose inputs changed. Recoloring is a
 * theme update and rebuilds nothing, hiding a chain toggles its components,
 * and only the surface - which is computed over whatever is visible - is
 * rebuilt when visibility changes.
 */
export class StructureScene {
  private tail: Promise<unknown> = Promise.resolve();

  private pending = 0;

  /** Bumped by every build, which an update queued before it defers to. */
  private generation = 0;

  private disposed = false;

  private readonly themes: SceneThemes;

  private scene: SceneStructure | null = null;

  private parsed: LoadedStructure | null = null;

  private layers: Layers = emptyLayers();

  private applied: AppliedScene | null = null;

  constructor(
    private readonly plugin: PluginContext,
    private readonly options: StructureSceneConfig
  ) {
    this.themes = sceneThemesFor(plugin, options.mode);
  }

  /** Runs `task` once everything queued before it has finished. */
  enqueue<T>(task: () => Promise<T>): Promise<T> {
    this.changePending(1);

    const run = this.tail.then(task);
    const settle = () => this.changePending(-1);
    // A failed task is its caller's to handle, and does not stall the queue.
    this.tail = run.then(settle, settle);

    return run;
  }

  /**
   * Clears the plugin, parses the structure, and draws it from `props` when
   * the scene draws. Call it from inside the queue.
   *
   * A scene disposed of while the structure was parsing draws nothing: the
   * plugin it would draw on is going.
   */
  async load(text: string, props: SceneProps): Promise<LoadOutcome> {
    const outcome = await parseStructure(this.plugin, text);
    if (!outcome.ok || this.disposed) return outcome;

    this.parsed = outcome.loaded;
    const { addressIndex, chainLabels, chains, structure } = outcome.loaded;
    if (!this.options.draw || !structure) return outcome;

    try {
      this.generation++;
      this.scene = { addressIndex, chainLabels, chains, structure };
      this.layers = emptyLayers();
      this.applied = null;
      await this.apply(props, true);
    } catch (error) {
      return { error, ok: false };
    }

    return outcome;
  }

  /** Brings the scene in line with new props. */
  update(props: SceneProps): Promise<void> {
    const { generation } = this;

    return this.enqueue(async () => {
      // A structure loaded since this was asked for was drawn from props at
      // least as new as these.
      if (this.disposed || !this.scene || generation !== this.generation) {
        return;
      }

      try {
        await this.apply(props, false);
      } catch (error) {
        if (!this.disposed) this.options.reportError(error, "representation");
      }
    });
  }

  /**
   * Places the camera on the structure last loaded, as `framing` says, and
   * returns the orientation now in force. Call it once something is drawn:
   * Mol* settles the reset on its next frame, and one settled against an empty
   * scene is lost.
   *
   * `fitDurationMs` is how long a plain fit animates; an offscreen render asks
   * for none, so the image it takes is of the camera at rest.
   */
  frame(
    framing: CameraFraming & { highlights?: readonly ResidueHighlight[] },
    fit: boolean,
    fitDurationMs?: number
  ): CameraOrientation | undefined {
    const { canvas3d } = this.plugin;
    if (!canvas3d) return undefined;

    const orienting = Boolean(framing.orientation && !framing.initialCamera);
    return frameStructure(
      canvas3d,
      framing,
      orienting ? this.highlightsCenter(framing.highlights) : undefined,
      fit,
      fitDurationMs
    );
  }

  /** Turns the camera to an orientation, over `durationMs`. */
  orient(
    orientation: CameraOrientation,
    highlights: readonly ResidueHighlight[] | undefined,
    durationMs: number
  ): void {
    this.plugin.canvas3d?.requestCameraReset({
      durationMs,
      snapshot: orientationSnapshot(
        orientation,
        this.highlightsCenter(highlights)
      ),
    });
  }

  /** Where the camera is now, or undefined before there is a canvas. */
  camera(): CameraState | undefined {
    const { canvas3d } = this.plugin;
    return canvas3d ? readCameraState(canvas3d) : undefined;
  }

  /** Stops the scene touching a plugin that is being disposed of. */
  dispose(): void {
    this.disposed = true;
  }

  /** The center of the highlighted residues on the structure last loaded. */
  private highlightsCenter(highlights?: readonly ResidueHighlight[]) {
    const parsed = this.parsed;
    if (!parsed?.structureData) return undefined;

    const residues = [
      ...resolveHighlights(highlights, parsed.addressIndex).colors.keys(),
    ];
    return residuesCenter(parsed.structureData, residues);
  }

  private changePending(delta: number): void {
    const wasBusy = this.pending > 0;
    this.pending += delta;
    const busy = this.pending > 0;

    if (busy !== wasBusy) this.options.onBusyChange?.(busy);
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  private async apply(props: SceneProps, fresh: boolean): Promise<void> {
    const { plugin } = this;
    const scene = this.scene as SceneStructure;
    const previous = this.applied;

    const highlights = resolveHighlights(props.highlights, scene.addressIndex);
    const coloring: SceneColoring = {
      chainColors: chainColorMap(
        scene.chains.map((chain) => chain.chainId),
        props.chainColors
      ),
      colorBy: resolveColorBy(props.colorBy, props.overlay, props.plddt),
      highlightColors: highlights.colors,
      mode: props.mode,
      overlay: props.overlay,
      plddt: props.plddt,
    };
    const colorTheme = COLOR_THEME_NAMES[coloring.colorBy];
    const coloringKey = [
      coloring.colorBy,
      [...coloring.chainColors].join(";"),
      identityKey(props.plddt),
      identityKey(props.overlay),
      props.mode,
      highlightsKey(props.highlights),
    ].join("|");
    const hiddenKey = chainSetKey(props.hiddenChains);
    const recolor = !previous || previous.coloringKey !== coloringKey;

    // Before anything is built, so new components come up in the right colors
    // rather than being drawn once in the old ones.
    if (recolor) syncSceneThemes(this.themes, coloring);

    const typeParams = representationTypeParams(plugin);
    // Refs of every layer rebuilt, from before; whichever did not survive the
    // rebuild under its own key is removed once the rebuild is done.
    const replaced: string[] = [];
    let rebuilt = false;

    const polymerStale =
      !previous ||
      previous.representation !== props.representation ||
      (props.representation === "surface" && previous.hiddenKey !== hiddenKey);

    if (polymerStale) {
      replaced.push(...polymerRefs(this.layers.polymer));
      this.layers.polymer = await this.buildPolymer(
        scene,
        props,
        typeParams,
        colorTheme
      );
      rebuilt = true;
    }

    // Ligands depend on nothing but the structure, so they are drawn once.
    if (fresh) {
      this.layers.ligand = await buildLigandLayer(
        plugin,
        scene.structure,
        scene.chainLabels,
        typeParams
      );
    }

    // Sticks are drawn over a cartoon only. A surface carries its highlights
    // in its own colors, and sticks inside it would be buried anyway.
    const { drawn } = this.layers.polymer;
    const highlightLayerKey = `${drawn}|${residueAddressesKey(props.highlights)}`;

    if (!previous || previous.highlightLayerKey !== highlightLayerKey) {
      replaced.push(...this.layers.highlight.values());
      this.layers.highlight = await buildHighlightLayer(
        plugin,
        scene.structure,
        drawn === "cartoon" ? highlights.byChain : new Map(),
        typeParams,
        colorTheme,
        this.layers.highlight
      );
      rebuilt = true;
    }

    // Removed only once their replacements exist, so the scene never empties:
    // Mol* refits the camera to anything drawn into an empty scene.
    const kept = new Set([
      ...polymerRefs(this.layers.polymer),
      ...this.layers.highlight.values(),
    ]);
    await removeComponents(
      plugin,
      replaced.filter((ref) => !kept.has(ref))
    );

    if (recolor) await applyColorTheme(plugin, colorTheme);
    applyChainVisibility(plugin, this.refsByChain(), props.hiddenChains);

    this.applied = {
      coloringKey,
      hiddenKey,
      highlightLayerKey,
      representation: props.representation,
    };

    // A fresh build comes with a load, which is announced separately.
    if (rebuilt && !fresh) this.options.onRebuild?.();
  }

  /**
   * The polymer as the props ask: a cartoon per chain, or one surface over
   * the visible chains - falling back to the cartoon, reported, when the
   * surface cannot be drawn. What is already drawn is updated in place where
   * it can be.
   */
  private async buildPolymer(
    scene: SceneStructure,
    props: SceneProps,
    typeParams: ReturnType<typeof representationTypeParams>,
    colorTheme: string
  ): Promise<PolymerLayer> {
    const current = this.layers.polymer;

    if (props.representation === "surface") {
      const visible = scene.chains
        .map((chain) => chain.chainId)
        .filter((chainId) => !props.hiddenChains.has(chainId));

      try {
        const surface = await buildSurfaceLayer(
          this.plugin,
          scene.structure,
          visible,
          typeParams,
          colorTheme,
          current.surface
        );
        return { cartoon: new Map(), drawn: "surface", surface };
      } catch (error) {
        this.options.reportError(error, "representation");
      }
    }

    const cartoon = await buildCartoonLayer(
      this.plugin,
      scene.structure,
      scene.chainLabels,
      typeParams,
      colorTheme,
      current.cartoon
    );
    return { cartoon, drawn: "cartoon" };
  }

  /**
   * Each chain's components, for hiding it: its cartoon, its ligands and its
   * highlights. A surface is not among them - it is rebuilt over what is
   * visible instead.
   */
  private refsByChain(): Map<string, string[]> {
    const refs = new Map<string, string[]>();
    const add = (layer: ReadonlyMap<string, string>) => {
      for (const [chainId, ref] of layer) {
        refs.set(chainId, [...(refs.get(chainId) ?? []), ref]);
      }
    };

    add(this.layers.polymer.cartoon);
    add(this.layers.ligand);
    add(this.layers.highlight);

    return refs;
  }
}

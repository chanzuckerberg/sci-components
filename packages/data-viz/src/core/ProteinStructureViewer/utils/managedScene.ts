import type { PluginContext } from "molstar/lib/mol-plugin/context";
import { chainColorMap } from "../../../common/chainColors";
import type {
  ChainRef,
  ResidueHighlight,
  ResidueValueOverlay,
  StructureColorBy,
  StructureRepresentation,
  ViewerErrorPhase,
} from "../ProteinStructureViewer.types";
import { highlightsKey, resolveHighlights } from "./highlights";
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
import { residueAddressesKey } from "./residueAddress";
import {
  COLOR_THEME_NAMES,
  SceneColoring,
  SceneThemes,
  resolveColorBy,
  syncSceneThemes,
} from "./sceneThemes";
import type { ThemeMode } from "./theme";

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
export interface SceneStructure {
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

/** The components the viewer built, by what they draw. */
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

export interface ManagedSceneOptions {
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
 * The scene the viewer draws for its structure, kept in line with its props.
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
export class ManagedScene {
  private tail: Promise<unknown> = Promise.resolve();

  private pending = 0;

  /** Bumped by every build, which an update queued before it defers to. */
  private generation = 0;

  private disposed = false;

  private loaded: SceneStructure | null = null;

  private layers: Layers = emptyLayers();

  private applied: AppliedScene | null = null;

  constructor(
    private readonly plugin: PluginContext,
    private readonly themes: SceneThemes,
    private readonly options: ManagedSceneOptions
  ) {}

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
   * Draws a structure just parsed, in full. Called from inside the queue, by
   * the load that parsed it.
   */
  async build(loaded: SceneStructure, props: SceneProps): Promise<void> {
    this.generation++;
    this.loaded = loaded;
    this.layers = emptyLayers();
    this.applied = null;

    await this.apply(props, true);
  }

  /** Brings the scene in line with new props. */
  update(props: SceneProps): Promise<void> {
    const { generation } = this;

    return this.enqueue(async () => {
      // A structure loaded since this was asked for was drawn from props at
      // least as new as these.
      if (this.disposed || !this.loaded || generation !== this.generation) {
        return;
      }

      try {
        await this.apply(props, false);
      } catch (error) {
        if (!this.disposed) this.options.reportError(error, "representation");
      }
    });
  }

  /** Stops the scene touching a plugin that is being disposed of. */
  dispose(): void {
    this.disposed = true;
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
    const loaded = this.loaded as SceneStructure;
    const previous = this.applied;

    const highlights = resolveHighlights(props.highlights, loaded.addressIndex);
    const coloring: SceneColoring = {
      chainColors: chainColorMap(
        loaded.chains.map((chain) => chain.chainId),
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
        loaded,
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
        loaded.structure,
        loaded.chainLabels,
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
        loaded.structure,
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
    loaded: SceneStructure,
    props: SceneProps,
    typeParams: ReturnType<typeof representationTypeParams>,
    colorTheme: string
  ): Promise<PolymerLayer> {
    const current = this.layers.polymer;

    if (props.representation === "surface") {
      const visible = loaded.chains
        .map((chain) => chain.chainId)
        .filter((chainId) => !props.hiddenChains.has(chainId));

      try {
        const surface = await buildSurfaceLayer(
          this.plugin,
          loaded.structure,
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
      loaded.structure,
      loaded.chainLabels,
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

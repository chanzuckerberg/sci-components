import { TooltipProps } from "@czi-sds/components";
import type { PluginUISpec } from "molstar/lib/mol-plugin-ui/spec";
import { HTMLAttributes } from "react";
import { ColorScale } from "../../common/colorScales";

/**
 * Per-residue values painted onto the structure in place of the default pLDDT
 * coloring, along with the legend that describes them.
 */
export interface ResidueValueOverlay {
  /** 0-based residue index to value. Residues absent from the map read as 0. */
  values: Map<number, number>;
  /** Value mapped to the top of the color scale. */
  max: number;
  /**
   * Values at or below this render in a neutral gray rather than on the scale.
   * Values above it are normalized into `min`-`max` before being sampled, so
   * this is also what the legend's lower tick reports.
   * @default 0
   */
  min?: number;
  /**
   * Scale used to color residues and to draw the legend.
   * @default PLASMA_COLOR_SCALE
   */
  colorScale?: ColorScale;
  /** Legend caption, e.g. "Feature activation". */
  label?: string;
  /**
   * Title of the help tooltip on the legend caption. The common case: a
   * string is enough. Use `tooltipProps` when the tooltip needs a subtitle, a
   * custom body, or any other SDS Tooltip prop. Overrides
   * `tooltipProps.title` when both are set.
   */
  tooltip?: string;
  /**
   * Props forwarded to the SDS Tooltip on the legend caption. The trigger is
   * the caption's help icon, so `children` is omitted.
   */
  tooltipProps?: Partial<Omit<TooltipProps, "children">>;
  /**
   * Label for the per-residue readout that replaces a stat slot on hover.
   * @default "Value"
   */
  readoutLabel?: string;
}

/**
 * A residue the user pointed at, in each of the ways a caller might need to
 * address it.
 *
 * `index` is the viewer's own key: the position in `plddt` and in
 * `residueOverlay`'s map, and what `selectedResidue` takes. `chainId`, `seqId`
 * and `insCode` are what the file says, which is what the sequence panel shows
 * and what a system that supplied the structure will recognise. They differ
 * from `index` whenever the file does not number a single chain from 1 -- a
 * crop, or a complex -- so address a residue outside the viewer with those
 * three, not with `index`.
 *
 * `insCode` is rarely set but is part of the address when it is: `10` and `10A`
 * are different residues on the same chain, so chain and number alone do not
 * name one.
 */
export interface ResidueRef {
  /** 0-based position in the structure, counting residues in file order. */
  index: number;
  /** Three-letter residue code, e.g. `"LYS"`. */
  compId: string;
  /** Chain the residue sits on, as named in the file. */
  chainId: string;
  /** Residue number as written in the file. */
  seqId: number;
  /** Insertion code, or `""` when the residue has none. */
  insCode: string;
}

/**
 * A chain the viewer found in the structure it loaded, reported through
 * `onChainsChange` so a consumer can label, color or hide chains by name
 * without parsing the structure itself.
 *
 * `chainId` is the file's own name for the chain, the same one `ResidueRef`
 * reports, and the key every chain-keyed prop takes. A chain carrying several
 * symmetry operators appears once, under the first.
 *
 * Describes the chain's polymer. The ligands and ions sitting on it are drawn
 * and are hidden and selected with it, but are not counted here or spanned by
 * the range below - they are no part of the sequence. A chain holding nothing
 * but heteroatoms is left out altogether, having no sequence to describe.
 */
export interface ChainRef {
  /** Chain as named in the file (`auth_asym_id`), e.g. `"A"`. */
  chainId: string;
  /** Chain as the sequence panel captions it. */
  label: string;
  /** Lowest 0-based residue index of the chain's polymer. */
  startIndex: number;
  /** Highest 0-based residue index of the chain's polymer. */
  endIndex: number;
  /** Polymer residues the chain holds. */
  residueCount: number;
}

/**
 * What is selected, in the two ways a caller might say it. `null` selects
 * nothing.
 *
 * The two combine: `{ chains: ["A"], residues: [150] }` takes all of chain A
 * plus one residue elsewhere. `chains` is kept as named rather than expanded
 * into indices, so a whole-chain selection survives a round trip through a
 * consumer's state at its original size.
 */
export interface StructureSelection {
  /**
   * 0-based residue indices, counting residues in file order across the whole
   * structure - the same index `plddt` and `residueOverlay` are keyed by.
   */
  residues?: number[];
  /** Whole chains by `chainId`, each standing for every residue on it. */
  chains?: string[];
}

/**
 * How large a downloaded image is, in pixels.
 *
 * Named rather than given as dimensions because the aspect is Mol*'s to
 * choose: each of these is one of its own presets, and a size picked here
 * would have to be reconciled with the canvas the image is rendered from.
 */
export type DownloadResolution = "low" | "medium" | "high" | "maximum";

/** Pixel dimensions each resolution produces, for documentation and labels. */
export const DOWNLOAD_RESOLUTIONS: Record<DownloadResolution, string> = {
  high: "3840x2160",
  low: "1280x720",
  maximum: "7680x4320",
  medium: "1920x1080",
};

/**
 * Turns on the capture button under the reset-camera control, and says what it
 * should produce. Omit it and no button is drawn.
 *
 * The image is rendered fresh at the size asked for rather than scaled up from
 * the canvas, so a high resolution costs time rather than sharpness - which is
 * why the default sits in the middle rather than at the top.
 */
export interface StructureDownload {
  /**
   * Size of the image. See `DOWNLOAD_RESOLUTIONS` for the pixel dimensions.
   * @default "medium"
   */
  resolution?: DownloadResolution;
  /**
   * Background behind the structure, as `#RRGGBB`. Omit for a transparent
   * one, which is what a figure usually wants - the viewer's own canvas color
   * is deliberately not inherited, since a screenshot tends to outlive the
   * theme it was taken under.
   */
  backgroundColor?: string;
  /**
   * Draw the orientation axes into the image. Independent of `showAxes`, which
   * is about the view rather than the capture: the widget orients a reader who
   * can turn the structure, and earns its place less in a still.
   * @default false
   */
  showAxes?: boolean;
  /**
   * Name for the downloaded file, without an extension. Defaults to the one
   * Mol* derives from the loaded structure.
   */
  filename?: string;
}

/** A whole-structure statistic shown along the bottom of the viewer. */
export interface StructureStat {
  value: string;
  label: string;
}

export interface ProteinStructureViewerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  /** Structure to render, as raw PDB or mmCIF (PDBx) text. */
  structure: string;
  /**
   * Per-residue pLDDT confidence on a 0-1 scale, ordered by residue. When
   * supplied the structure is colored by pLDDT unless `residueOverlay` takes
   * over.
   */
  plddt?: number[] | null;
  /**
   * Canvas background, as `#RRGGBB`. Defaults to the SDS theme's base
   * background, so the canvas follows the surrounding page in both modes.
   */
  backgroundColor?: string;
  /**
   * Sequence panel background, as any CSS color. Defaults to the SDS theme's
   * primary surface, so the panel follows the surrounding page in both modes.
   */
  sequenceViewerBackgroundColor?: string;
  /**
   * Show the orientation axes widget and the reset-camera button.
   * @default true
   */
  showAxes?: boolean;
  /**
   * Adds a capture button beneath the reset-camera control, which downloads a
   * PNG of the structure as it currently stands. Omit for no button.
   */
  download?: StructureDownload | null;
  /**
   * Show the sequence panel pinned along the bottom of the viewer.
   * @default true
   */
  showSequenceViewer?: boolean;
  /**
   * Show the stats and color scale legend overlaid on the viewer.
   * @default true
   */
  showLegend?: boolean;
  /** Per-residue values that override pLDDT coloring while set. */
  residueOverlay?: ResidueValueOverlay | null;
  /**
   * What is selected, or null when nothing is. Controlled: the camera frames
   * whatever the selection covers, and clearing it zooms back out to the
   * default view.
   */
  selection?: StructureSelection | null;
  /**
   * Chains hidden from the 3D view, by `chainId`. Leave undefined to let the
   * viewer own visibility itself, which is what the chain legend's toggles
   * drive; passing it takes that over, and the toggles then only report.
   */
  hiddenChains?: string[];
  /**
   * Color per chain, by `chainId`, as `#RRGGBB`. Chains left out fall back to
   * the viewer's palette. Only visible while chain coloring is what is on
   * screen, which is when neither `plddt` nor `residueOverlay` is set.
   */
  chainColors?: Record<string, string>;
  /**
   * Show the chain legend, which lists each chain with its color and a
   * visibility toggle. Ignored on a single-chain structure, where there is
   * nothing to tell apart or hide.
   * @default true
   */
  showChainLegend?: boolean;
  /**
   * Stop other chains from dimming in the 3D view while a chain's name is
   * pointed at, in the legend or above its grid in the sequence panel.
   *
   * The dim is on by default, since on a complex it is how a reader finds out
   * which chain is which. Turn it off where the movement is more distracting
   * than the answer is useful - a grid of viewers a pointer crosses on its way
   * somewhere else, or a page driving its own highlighting through `selection`.
   * @default false
   */
  disableChainHighlightOnHover?: boolean;
  /**
   * Mol* plugin spec laid over the viewer's own, which is how the whole of
   * Mol*'s configuration is reachable without a prop here for each setting.
   * Anything named here wins, so `canvas3d.postprocessing`, a `PluginConfig`
   * item, or `layout.initial` can all be set to something other than the
   * default the viewer picked.
   *
   * List-valued keys - `behaviors`, `config`, `actions`, `animations`,
   * `customFormats`, `customParamEditors` - are appended to rather than
   * replaced. For `config` that is what lets an entry override the viewer's,
   * since Mol* reads the list in order. It also means a behavior cannot be
   * taken away: the ones the viewer drops stay dropped, and the ones it keeps
   * cannot be removed from here.
   *
   * Read once, when the plugin is created, except for `canvas3d`, which is
   * re-applied whenever it changes. Creating the plugin throws away the camera,
   * so the rest is deliberately not reactive.
   */
  molstarSpec?: Partial<PluginUISpec>;
  /**
   * Up to three whole-structure stats shown along the bottom. A null entry
   * reserves its column without rendering anything, so the columns never shift
   * as values come and go.
   */
  stats?: (StructureStat | null)[];
  /** Called with the clicked residue. */
  onResidueClick?: (residue: ResidueRef) => void;
  /**
   * Called as the pointer moves over residues, and with `null` when it leaves
   * the structure.
   */
  onResidueHover?: (residue: ResidueRef | null) => void;
  /**
   * Called with the new selection whenever the user makes one - clicking a
   * residue, dragging across the sequence, clicking a chain caption - and with
   * `null` when they click empty space to clear it.
   *
   * A whole-chain selection arrives as `{ chains: [id] }` rather than as every
   * index on it, so echoing it straight back into `selection` costs nothing.
   */
  onSelectionChange?: (selection: StructureSelection | null) => void;
  /**
   * Called with the chains found in the structure, whenever a structure is
   * loaded. Fires with `[]` when the structure holds none.
   */
  onChainsChange?: (chains: ChainRef[]) => void;
  /**
   * Called with the chains now hidden when a visibility toggle is used. Fires
   * whether or not `hiddenChains` is controlled, so a consumer can follow the
   * viewer's own state without owning it.
   */
  onChainVisibilityChange?: (hiddenChains: string[]) => void;
}

/**
 * Readout that replaces the whole-structure stats while something is hovered
 * or selected. Covers one residue or many: a drag across the sequence and a
 * whole-chain selection report through this too, as a mean over what they
 * cover.
 */
export interface ResidueReadout {
  /** e.g. "PHE 17", "Chain A", or "24 residues". */
  label: string;
  /**
   * pLDDT on a 0-1 scale, or null when unavailable. The mean across the
   * residues covered when there is more than one, ignoring those without a
   * score.
   */
  plddt: number | null;
  /**
   * Overlay value, or null when the overlay holds none - which is also what a
   * structure paints neutral - or when no overlay is set. The mean across the
   * residues covered when there is more than one, ignoring those the overlay
   * says nothing about.
   */
  value: number | null;
  /**
   * Residues the readout covers, which is what makes the numbers above means
   * rather than readings. 1 for a single residue.
   */
  residueCount: number;
}

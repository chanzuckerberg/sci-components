import { TooltipProps } from "@czi-sds/components";
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
 * without parsing the PDB itself.
 *
 * `chainId` is the file's own name for the chain, the same one `ResidueRef`
 * reports, and the key every chain-keyed prop takes. A chain carrying several
 * symmetry operators appears once, under the first.
 */
export interface ChainRef {
  /** Chain as named in the file (`auth_asym_id`), e.g. `"A"`. */
  chainId: string;
  /** Chain as the sequence panel captions it. */
  label: string;
  /** Lowest 0-based residue index on the chain. */
  startIndex: number;
  /** Highest 0-based residue index on the chain. */
  endIndex: number;
  /** Residues the chain holds. */
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

/** A whole-structure statistic shown along the bottom of the viewer. */
export interface StructureStat {
  value: string;
  label: string;
}

export interface ProteinStructureViewerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  /** Structure to render, as raw PDB text. */
  pdb: string;
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

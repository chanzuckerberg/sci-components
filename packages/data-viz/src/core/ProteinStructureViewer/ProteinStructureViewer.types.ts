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
  /** Help tooltip attached to the legend caption. */
  tooltip?: string;
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
 * `index` is the viewer's own key -- the position in `plddt` and in
 * `residueOverlay`'s map -- and counts residues in file order, straight through
 * a chain break. `chainId` and `seqId` are what the file says, which is what the
 * sequence panel shows and what an external system that supplied the structure
 * will recognise. The two coincide for a single chain starting at 1 and diverge
 * otherwise, so a caller mapping a click back onto its own numbering wants the
 * latter pair rather than arithmetic on the former.
 */
export interface ResidueRef {
  /** 0-based index across the whole structure, in file order. */
  index: number;
  /** Three-letter residue code, e.g. `"LYS"`. */
  compId: string;
  /** Chain the residue sits on, as named in the file. */
  chainId: string;
  /** Residue number as written in the file. */
  seqId: number;
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
   * 0-based index of the selected residue, or null when none is selected.
   * Controlled: selecting a residue zooms the camera in on it, and clearing the
   * selection zooms back out to the default view.
   */
  selectedResidue?: number | null;
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
  /** Called when the user clicks empty space, clearing the selection. */
  onSelectionClear?: () => void;
}

/**
 * Per-residue readout that replaces the whole-structure stats while a residue
 * is hovered or selected.
 */
export interface ResidueReadout {
  /** e.g. "PHE 17" */
  label: string;
  /** Residue pLDDT on a 0-1 scale, or null when unavailable. */
  plddt: number | null;
  /** Residue overlay value, or null when no overlay is set. */
  value: number | null;
}

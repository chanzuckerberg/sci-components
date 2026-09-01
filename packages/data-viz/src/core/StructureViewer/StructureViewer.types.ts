import { HTMLAttributes } from "react";

/** A stop on a continuous color scale, positioned at `t` in the range 0-1. */
export interface ContinuousColorStop {
  t: number;
  color: string;
}

/**
 * A band on a stepped color scale. `threshold` is the upper bound of the band
 * on the normalized 0-1 value range; `label` is rendered above the band in the
 * legend.
 */
export interface SteppedColorStop {
  threshold: number;
  color: string;
  label: string;
}

/**
 * How per-residue values map to colors, both on the structure and in the
 * legend. A continuous scale interpolates between its stops and renders as a
 * gradient bar; a stepped scale renders as discrete bands.
 */
export type ColorScale =
  | { kind: "continuous"; stops: ContinuousColorStop[] }
  | { kind: "stepped"; stops: SteppedColorStop[] };

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

/** A whole-structure statistic shown along the bottom of the viewer. */
export interface StructureStat {
  value: string;
  label: string;
}

export interface StructureViewerProps extends Omit<
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
  /**
   * Called with the 0-based residue index and 3-letter amino acid code when a
   * residue is clicked.
   */
  onResidueClick?: (residueIndex: number, compId: string) => void;
  /**
   * Called as the pointer moves over residues, and with (null, null) when it
   * leaves the structure.
   */
  onResidueHover?: (residueIndex: number | null, compId: string | null) => void;
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

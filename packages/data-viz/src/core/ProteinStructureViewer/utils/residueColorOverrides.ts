import type { Color } from "molstar/lib/mol-util/color";

/**
 * Colors given to single residues over whatever theme is painting the rest,
 * by 0-based residue index - which is what a highlight is painted with.
 *
 * A holder rather than a map, shared by every theme a viewer registers: each
 * reads what it holds when Mol* next asks it for colors, so a change of
 * highlights repaints whichever theme is on screen without a theme of its own.
 */
export interface ResidueColorOverrides {
  current: ReadonlyMap<number, Color>;
}

export function createResidueColorOverrides(): ResidueColorOverrides {
  return { current: new Map() };
}

import {
  StructureElement,
  StructureProperties,
} from "molstar/lib/mol-model/structure";
import { Color } from "molstar/lib/mol-util/color";
import { ColorScale } from "../StructureViewer.types";
import { neutralResidueColor } from "./color";
import { PLASMA_COLOR_SCALE, sampleColorScale } from "./colorScales";

/** Mol* color theme name under which residue value overlays are registered. */
export const RESIDUE_VALUE_THEME_NAME = "residue-value";

/** Overlay state the color theme reads on every render. */
interface ResidueValueState {
  values: Map<number, number>;
  max: number;
  min: number;
  colorScale: ColorScale;
  mode: "light" | "dark";
  /**
   * Bumped on every update and handed to Mol* as the theme's `contextHash`, so
   * it re-renders instead of serving colors from its per-model property cache.
   */
  version: number;
}

export interface ResidueValueTheme {
  /** Provider to register on a plugin's color theme registry. */
  provider: unknown;
  /** Replaces the overlay data and invalidates Mol*'s cache. */
  setState: (next: Partial<Omit<ResidueValueState, "version">>) => void;
}

/**
 * Builds a Mol* color theme that paints residues by an arbitrary per-residue
 * value.
 *
 * The theme is created per plugin instance rather than shared at module scope,
 * so several viewers can render different overlays on the same page. Its state
 * lives in the closure below and is read live inside `color()`, which is what
 * lets an overlay update recolor the structure without rebuilding it.
 */
export function createResidueValueTheme(
  mode: "light" | "dark"
): ResidueValueTheme {
  const state: ResidueValueState = {
    colorScale: PLASMA_COLOR_SCALE,
    max: 1,
    min: 0,
    mode,
    values: new Map(),
    version: 0,
  };

  const provider = {
    category: "residue property",
    defaultValues: {},
    factory() {
      const { colorScale, max, min, mode: currentMode, values } = state;
      const neutral = neutralResidueColor(currentMode);

      return {
        color(location: unknown) {
          if (!StructureElement.Location.is(location)) return neutral;

          // label_seq_id is 1-based in PDB output; overlay values are 0-based.
          const residueIndex =
            StructureProperties.residue.label_seq_id(location) - 1;
          const value = values.get(residueIndex) ?? 0;
          const rgb = sampleColorScale(colorScale, value, max, min);

          return rgb ? Color.fromRgb(rgb[0], rgb[1], rgb[2]) : neutral;
        },
        contextHash: state.version,
        description: "Color residues by a per-residue value",
        factory: provider.factory,
        granularity: "group" as const,
        props: {},
      };
    },
    getParams: () => ({}),
    isApplicable: () => true,
    label: "Residue Value",
    name: RESIDUE_VALUE_THEME_NAME,
  };

  return {
    provider,
    setState(next) {
      Object.assign(state, next);
      state.version++;
    },
  };
}

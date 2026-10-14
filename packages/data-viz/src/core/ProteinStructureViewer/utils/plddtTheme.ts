import {
  StructureElement,
  StructureProperties,
} from "molstar/lib/mol-model/structure";
import { Color } from "molstar/lib/mol-util/color";
import { sampleSteppedScale } from "../../../common/colorScales";
import { neutralResidueColor } from "./color";
import { PLDDT_COLOR_SCALE } from "./plddt";
import type { ResidueColorOverrides } from "./residueColorOverrides";

/** Mol* color theme name under which pLDDT coloring is registered. */
export const PLDDT_THEME_NAME = "plddt";

const PLDDT_BANDS =
  PLDDT_COLOR_SCALE.kind === "stepped" ? PLDDT_COLOR_SCALE.stops : [];

/** The band color for a score on the 0-1 scale `plddt` uses. */
export function plddtColor(score: number): Color {
  const [r, g, b] = sampleSteppedScale(PLDDT_BANDS, score);
  return Color.fromRgb(r, g, b);
}

/** pLDDT state the theme reads on every render. */
interface PlddtState {
  /** Score per residue by 0-based index; `null` for a residue with none. */
  scores: readonly (number | null)[];
  mode: "light" | "dark";
  /**
   * Bumped on every update and handed to Mol* as the theme's `contextHash`, so
   * it re-renders instead of serving colors from its per-model property cache.
   */
  version: number;
}

export interface PlddtTheme {
  /** Provider to register on a plugin's color theme registry. */
  provider: unknown;
  /** Replaces the scores or the mode and invalidates Mol*'s cache. */
  setState: (next: Partial<Omit<PlddtState, "version">>) => void;
}

/**
 * Builds a Mol* color theme that paints each residue its pLDDT band.
 *
 * Read from the scores themselves, by residue index, rather than written into
 * the file's B-factor column first. A column has no way to say "unscored", so a
 * residue without a score would have to be given one; here it reads neutral,
 * as it does under an overlay, and the structure text reaching Mol* is exactly
 * the text the consumer passed. Scores arriving after the structure recolor it
 * without reloading it, which leaves the camera where it was.
 *
 * Created per plugin instance for the same reasons as the other themes, and
 * `overrides` paints single residues - the highlights - over it.
 */
export function createPlddtTheme(
  mode: "light" | "dark",
  overrides?: ResidueColorOverrides
): PlddtTheme {
  const state: PlddtState = { mode, scores: [], version: 0 };

  const provider = {
    category: "residue property",
    defaultValues: {},
    factory() {
      const { mode: currentMode, scores } = state;
      const neutral = neutralResidueColor(currentMode);
      const overrideColors = overrides?.current;

      return {
        color(location: unknown) {
          if (!StructureElement.Location.is(location)) return neutral;

          const residue = StructureProperties.residue.key(location);
          const override = overrideColors?.get(residue);
          if (override !== undefined) return override;

          const score = scores[residue];
          if (score === null || score === undefined || !Number.isFinite(score))
            return neutral;

          return plddtColor(score);
        },
        contextHash: state.version,
        description: "Color residues by pLDDT confidence",
        factory: provider.factory,
        granularity: "group" as const,
        props: {},
      };
    },
    getParams: () => ({}),
    isApplicable: () => true,
    label: "pLDDT",
    name: PLDDT_THEME_NAME,
  };

  return {
    provider,
    setState(next) {
      Object.assign(state, next);
      state.version++;
    },
  };
}

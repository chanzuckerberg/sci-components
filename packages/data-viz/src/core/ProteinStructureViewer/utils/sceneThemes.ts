import type { PluginContext } from "molstar/lib/mol-plugin/context";
import type { Color } from "molstar/lib/mol-util/color";
import { PLASMA_COLOR_SCALE } from "../../../common/colorScales";
import type {
  ResidueValueOverlay,
  StructureColorBy,
} from "../ProteinStructureViewer.types";
import {
  CHAIN_COLOR_THEME_NAME,
  ChainColorTheme,
  createChainColorTheme,
} from "./chainColorTheme";
import { PLDDT_THEME_NAME, PlddtTheme, createPlddtTheme } from "./plddtTheme";
import {
  ResidueColorOverrides,
  createResidueColorOverrides,
} from "./residueColorOverrides";
import {
  RESIDUE_VALUE_THEME_NAME,
  ResidueValueTheme,
  createResidueValueTheme,
} from "./residueValueTheme";
import type { ThemeMode } from "./theme";

/**
 * Every color theme a viewer paints with, and the residue overrides they share.
 * Created per plugin, so viewers on one page color independently.
 */
export interface SceneThemes {
  chain: ChainColorTheme;
  plddt: PlddtTheme;
  value: ResidueValueTheme;
  /** Highlight colors, painted over whichever theme is on screen. */
  overrides: ResidueColorOverrides;
}

export function createSceneThemes(mode: ThemeMode): SceneThemes {
  const overrides = createResidueColorOverrides();

  return {
    chain: createChainColorTheme(overrides),
    overrides,
    plddt: createPlddtTheme(mode, overrides),
    value: createResidueValueTheme(mode, overrides),
  };
}

/** Registers the themes on a plugin, so representations can name them. */
export function registerSceneThemes(
  plugin: PluginContext,
  themes: SceneThemes
): void {
  const registry = plugin.representation.structure.themes.colorThemeRegistry;

  for (const { provider } of [themes.chain, themes.plddt, themes.value]) {
    registry.add(provider as Parameters<typeof registry.add>[0]);
  }
}

/** The Mol* theme name each way of coloring is registered under. */
export const COLOR_THEME_NAMES: Record<StructureColorBy, string> = {
  chain: CHAIN_COLOR_THEME_NAME,
  overlay: RESIDUE_VALUE_THEME_NAME,
  plddt: PLDDT_THEME_NAME,
};

/**
 * What paints the structure: `colorBy` when it names one, and otherwise the
 * first of an overlay, pLDDT scores and chain colors that is supplied.
 *
 * Set is what makes an overlay active, not populated. An overlay whose values
 * have not arrived yet still owns the coloring: its residues read as missing
 * and come out neutral, which is the honest answer and the one the legend
 * beside it is describing.
 */
export function resolveColorBy(
  colorBy: StructureColorBy | undefined,
  overlay: ResidueValueOverlay | null | undefined,
  plddt: readonly (number | null)[] | null | undefined
): StructureColorBy {
  if (colorBy) return colorBy;
  if (overlay) return "overlay";
  return plddt && plddt.length > 0 ? "plddt" : "chain";
}

/** Everything the themes paint from. */
export interface SceneColoring {
  colorBy: StructureColorBy;
  /** Color per chain, by `chainId`, as `#RRGGBB`. */
  chainColors: ReadonlyMap<string, string>;
  plddt?: readonly (number | null)[] | null;
  overlay?: ResidueValueOverlay | null;
  /** Color per highlighted residue, by 0-based index. */
  highlightColors: ReadonlyMap<number, Color>;
  mode: ThemeMode;
}

/**
 * Hands every theme the data it paints from and names the one to paint with.
 *
 * All three are kept current whichever is showing, so switching between them
 * reveals the right colors at once rather than the ones a theme had when it
 * was last on screen.
 */
export function syncSceneThemes(
  themes: SceneThemes,
  coloring: SceneColoring
): string {
  const { chainColors, highlightColors, mode, overlay, plddt } = coloring;

  themes.overrides.current = highlightColors;
  themes.chain.setState(chainColors);
  themes.plddt.setState({ mode, scores: plddt ?? [] });
  themes.value.setState(
    overlay
      ? {
          colorScale: overlay.colorScale ?? PLASMA_COLOR_SCALE,
          max: overlay.max,
          min: overlay.min ?? 0,
          mode,
          values: overlay.values,
        }
      : // Emptied rather than left, so a later re-apply cannot serve stale
        // colors out of Mol*'s per-model property cache.
        { mode, values: new Map() }
  );

  return COLOR_THEME_NAMES[coloring.colorBy];
}

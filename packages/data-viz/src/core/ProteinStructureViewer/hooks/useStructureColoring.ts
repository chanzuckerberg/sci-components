import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { RefObject, useEffect } from "react";
import { PLASMA_COLOR_SCALE } from "../../../common/colorScales";
import { ResidueValueOverlay } from "../ProteinStructureViewer.types";
import type { ChainColorTheme } from "../utils/chainColorTheme";
import { PLDDT_THEME_NAME } from "../utils/plddt";
import { RESIDUE_VALUE_THEME_NAME } from "../utils/residueValueTheme";
import type { ResidueValueTheme } from "../utils/residueValueTheme";
import { FALLBACK_THEME_NAME, applyColorTheme } from "./useMolstarPlugin";

export interface UseStructureColoringOptions {
  pluginRef: RefObject<PluginUIContext | null>;
  residueValueThemeRef: RefObject<ResidueValueTheme | null>;
  chainColorThemeRef: RefObject<ChainColorTheme | null>;
  isReady: boolean;
  overlay?: ResidueValueOverlay | null;
  hasPlddt: boolean;
  /** Color per chain, by `chainId`, as `#RRGGBB`. */
  chainColors: Map<string, string>;
  mode: "light" | "dark";
}

/**
 * Decides what is coloring the structure and keeps that theme's data current.
 *
 * Three themes compete for the same representations, in a fixed order: a
 * residue value overlay, then pLDDT scores, then per-chain colors. Only one
 * can be applied, so the precedence lives here rather than being spread across
 * the hooks that own each theme's data - and the legend resolves what to
 * describe the same way, so the two cannot disagree about what is on screen.
 *
 * Recoloring happens in place: the camera is left where it is, so selecting or
 * switching an overlay does not zoom back out to the default view.
 */
export function useStructureColoring({
  chainColorThemeRef,
  chainColors,
  hasPlddt,
  isReady,
  mode,
  overlay,
  pluginRef,
  residueValueThemeRef,
}: UseStructureColoringOptions): void {
  useEffect(() => {
    const plugin = pluginRef.current;
    const residueTheme = residueValueThemeRef.current;
    const chainTheme = chainColorThemeRef.current;
    if (!plugin || !residueTheme || !chainTheme || !isReady) return;

    // Kept current whether or not chain coloring is what is showing, so that
    // clearing an overlay reveals the right colors immediately rather than the
    // ones the chains had when the overlay took over.
    chainTheme.setState(chainColors);

    // Set is what makes an overlay active, not populated. An overlay whose
    // values have not arrived yet, or that has nothing to report, still owns
    // the coloring: its residues read as missing and come out neutral, which
    // is the honest answer and the one the legend beside it is describing.
    if (overlay) {
      residueTheme.setState({
        colorScale: overlay.colorScale ?? PLASMA_COLOR_SCALE,
        max: overlay.max,
        min: overlay.min ?? 0,
        mode,
        values: overlay.values,
      });
      applyColorTheme(plugin, RESIDUE_VALUE_THEME_NAME);
      return;
    }

    // Reset the overlay data so a later re-apply cannot serve stale colors
    // out of Mol*'s per-model property cache.
    residueTheme.setState({ mode, values: new Map() });
    applyColorTheme(plugin, hasPlddt ? PLDDT_THEME_NAME : FALLBACK_THEME_NAME);
    // The three refs are stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overlay, hasPlddt, isReady, mode, chainColors]);
}

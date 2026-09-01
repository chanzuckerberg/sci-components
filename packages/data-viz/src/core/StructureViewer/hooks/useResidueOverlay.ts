import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { RefObject, useEffect } from "react";
import { ResidueValueOverlay } from "../StructureViewer.types";
import { PLASMA_COLOR_SCALE } from "../utils/colorScales";
import { PLDDT_THEME_NAME } from "../utils/plddt";
import { RESIDUE_VALUE_THEME_NAME } from "../utils/residueValueTheme";
import type { ResidueValueTheme } from "../utils/residueValueTheme";
import { FALLBACK_THEME_NAME, applyColorTheme } from "./useMolstarPlugin";

export interface UseResidueOverlayOptions {
  pluginRef: RefObject<PluginUIContext | null>;
  residueValueThemeRef: RefObject<ResidueValueTheme | null>;
  isReady: boolean;
  overlay?: ResidueValueOverlay | null;
  hasPlddt: boolean;
  mode: "light" | "dark";
}

/**
 * Switches the structure's coloring between the residue value overlay and the
 * default (pLDDT, or chain-id when no scores were supplied).
 *
 * Recoloring happens in place: the camera is left where it is, so selecting or
 * switching an overlay does not zoom back out to the default view.
 */
export function useResidueOverlay({
  hasPlddt,
  isReady,
  mode,
  overlay,
  pluginRef,
  residueValueThemeRef,
}: UseResidueOverlayOptions): void {
  useEffect(() => {
    const plugin = pluginRef.current;
    const theme = residueValueThemeRef.current;
    if (!plugin || !theme || !isReady) return;

    const hasOverlay = Boolean(overlay && overlay.values.size > 0);

    if (hasOverlay) {
      const active = overlay as ResidueValueOverlay;
      theme.setState({
        colorScale: active.colorScale ?? PLASMA_COLOR_SCALE,
        max: active.max,
        min: active.min ?? 0,
        mode,
        values: active.values,
      });
      applyColorTheme(plugin, RESIDUE_VALUE_THEME_NAME);
    } else {
      // Reset the overlay data so a later re-apply cannot serve stale colors
      // out of Mol*'s per-model property cache.
      theme.setState({ mode, values: new Map() });
      applyColorTheme(
        plugin,
        hasPlddt ? PLDDT_THEME_NAME : FALLBACK_THEME_NAME
      );
    }
    // pluginRef and residueValueThemeRef are stable refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overlay, hasPlddt, isReady, mode]);
}

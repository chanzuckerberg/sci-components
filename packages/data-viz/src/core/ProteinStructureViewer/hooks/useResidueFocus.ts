import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { RefObject, useEffect, useRef } from "react";

export interface UseResidueFocusOptions {
  pluginRef: RefObject<PluginUIContext | null>;
  isReady: boolean;
  selectedResidue?: number | null;
  /** Stops adaptive depth clipping once the focus is dropped. */
  clearClipRatio: () => void;
}

/**
 * Zooms back out when the selected residue is cleared.
 *
 * Selecting a residue zooms the camera in on it (handled in the click
 * subscription, which has the loci to frame), but deselecting leaves the camera
 * zoomed in. On the transition back to null this drops the focus, stops
 * adaptive clipping, and resets the camera to the default view.
 */
export function useResidueFocus({
  clearClipRatio,
  isReady,
  pluginRef,
  selectedResidue,
}: UseResidueFocusOptions): void {
  const prevSelectedResidueRef = useRef<number | null | undefined>(
    selectedResidue
  );

  useEffect(() => {
    const plugin = pluginRef.current;
    const prev = prevSelectedResidueRef.current;
    prevSelectedResidueRef.current = selectedResidue;

    if (!plugin || !isReady) return;
    if (prev === null || prev === undefined) return;
    if (selectedResidue !== null && selectedResidue !== undefined) return;

    clearClipRatio();
    plugin.managers.structure.focus.clear();
    plugin.canvas3d?.requestCameraReset();
    // pluginRef is a stable ref; clearClipRatio is stable per hook instance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedResidue, isReady]);
}

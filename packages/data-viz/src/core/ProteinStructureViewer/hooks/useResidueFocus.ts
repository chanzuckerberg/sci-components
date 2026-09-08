import { StructureElement } from "molstar/lib/mol-model/structure";
import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { RefObject, useEffect, useRef } from "react";
import { focusResidue } from "../utils/cameraFocus";
import { lociForResidueIndex } from "../utils/residueLoci";

export interface UseResidueFocusOptions {
  pluginRef: RefObject<PluginUIContext | null>;
  isReady: boolean;
  selectedResidue?: number | null;
  /** Records the focus anchor for adaptive depth clipping; null stops it. */
  setClipRatio: (ratio: number | null) => void;
}

/**
 * Makes `selectedResidue` the one thing that decides where the camera sits.
 *
 * Setting the prop zooms in on that residue and marks it; clearing it drops the
 * focus and zooms back out. The click subscription only reports the residue it
 * was given, so a click moves the camera only once the consumer accepts it and
 * echoes it back - which is what the prop being controlled is supposed to mean.
 *
 * Clicking still marks the residue immediately, through Mol*'s own focus
 * behavior, so the structure responds to a click whether or not the consumer
 * wires the prop up.
 */
export function useResidueFocus({
  isReady,
  pluginRef,
  selectedResidue,
  setClipRatio,
}: UseResidueFocusOptions): void {
  /**
   * The residue this hook last pointed the camera at. Tracked rather than
   * compared against the previous prop value so that a selection made before
   * the plugin was ready is still applied once it is, and so that a plugin
   * rebuilt underneath us - which comes up focused on nothing - is not assumed
   * to still be holding the old one.
   */
  const focusedRef = useRef<number | null>(null);

  useEffect(() => {
    const plugin = pluginRef.current;

    if (!plugin || !isReady) {
      focusedRef.current = null;
      return;
    }

    const residue = selectedResidue ?? null;
    if (residue === focusedRef.current) return;
    focusedRef.current = residue;

    if (residue === null) {
      setClipRatio(null);
      plugin.managers.structure.focus.clear();
      plugin.canvas3d?.requestCameraReset();
      return;
    }

    const loci = lociForResidueIndex(plugin, residue);
    if (!loci) return;

    // A click has already focused the residue by the time the consumer echoes
    // it back, so only mark it when it is not the one already marked; setting
    // it again would restate the selection and repaint the sequence panel for
    // nothing.
    const focused = plugin.managers.structure.focus.behaviors.current.value;
    if (!focused || !StructureElement.Loci.areEqual(focused.loci, loci)) {
      plugin.managers.structure.focus.setFromLoci(loci);
    }

    setClipRatio(focusResidue(plugin, loci));
    // pluginRef is a stable ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedResidue, isReady, setClipRatio]);
}

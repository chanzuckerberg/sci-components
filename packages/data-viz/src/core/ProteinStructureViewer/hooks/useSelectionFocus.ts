import { StructureElement } from "molstar/lib/mol-model/structure";
import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { RefObject, useEffect, useRef } from "react";
import type { StructureSelection } from "../ProteinStructureViewer.types";
import { focusResidue } from "../utils/cameraFocus";
import { setFocusNeighbourhood } from "../utils/focusRepresentation";
import { lociForSelection } from "../utils/residueLoci";
import { selectionKey } from "../utils/selection";

export interface UseSelectionFocusOptions {
  pluginRef: RefObject<PluginUIContext | null>;
  isReady: boolean;
  selection?: StructureSelection | null;
  /** Records the focus anchor for adaptive depth clipping; null stops it. */
  setClipRatio: (ratio: number | null) => void;
}

/**
 * Makes `selection` the one thing that decides where the camera sits.
 *
 * Setting the prop frames whatever it covers and marks it; clearing it drops
 * the focus and zooms back out. The camera frames the selection's bounding
 * sphere, so a range or a whole chain is fitted rather than approached as a
 * point - one residue is just the smallest case of that.
 *
 * The click subscription only reports the selection it was given, so a click
 * moves the camera only once the consumer accepts it and echoes it back -
 * which is what the prop being controlled is supposed to mean. Clicking still
 * marks immediately, through Mol*'s own focus behavior, so the structure
 * responds to a click whether or not the consumer wires the prop up.
 */
export function useSelectionFocus({
  isReady,
  pluginRef,
  selection,
  setClipRatio,
}: UseSelectionFocusOptions): void {
  /**
   * What this hook last pointed the camera at, as a key rather than the object
   * itself: a consumer echoing a selection back builds a new object each time,
   * and comparing identity would refocus on every render.
   *
   * Tracked here rather than compared against the previous prop so that a
   * selection made before the plugin was ready is still applied once it is,
   * and so that a plugin rebuilt underneath us - which comes up focused on
   * nothing - is not assumed to still be holding the old one.
   */
  const focusedRef = useRef<string | null>(null);

  /**
   * Whether the focus shell currently reaches beyond the selection, so the
   * behavior is only updated when the answer actually changes rather than on
   * every selection.
   */
  const neighbourhoodRef = useRef<boolean | null>(null);

  useEffect(() => {
    const plugin = pluginRef.current;

    if (!plugin || !isReady) {
      focusedRef.current = null;
      neighbourhoodRef.current = null;
      return;
    }

    const key = selection ? selectionKey(selection) : null;
    if (key === focusedRef.current) return;
    focusedRef.current = key;

    if (key === null) {
      setClipRatio(null);
      plugin.managers.structure.focus.clear();
      plugin.canvas3d?.requestCameraReset();
      return;
    }

    const chosen = selection as StructureSelection;
    const loci = lociForSelection(plugin, chosen);
    if (!loci) return;

    // A whole chain keeps its shell confined to itself; a residue or a range
    // keeps the 5A shell Mol* draws around it.
    const includeNeighbours = !chosen.chains?.length;
    let cancelled = false;

    const focus = () => {
      // A click has already focused what the consumer echoes back by the time
      // it arrives, so only mark it when it is not already marked; setting it
      // again would restate the selection and repaint the sequence panel for
      // nothing.
      const focused = plugin.managers.structure.focus.behaviors.current.value;
      if (!focused || !StructureElement.Loci.areEqual(focused.loci, loci)) {
        plugin.managers.structure.focus.setFromLoci(loci);
      }

      setClipRatio(focusResidue(plugin, loci));
    };

    if (neighbourhoodRef.current === includeNeighbours) {
      focus();
      return;
    }

    // Set before focusing, so the shell is sized for this selection rather
    // than drawn at the old reach and then rebuilt.
    neighbourhoodRef.current = includeNeighbours;
    setFocusNeighbourhood(plugin, includeNeighbours).then(() => {
      if (cancelled || pluginRef.current !== plugin) return;
      focus();
    });

    return () => {
      cancelled = true;
    };
    // pluginRef is a stable ref, and `selection` is compared through its key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection && selectionKey(selection), isReady, setClipRatio]);
}

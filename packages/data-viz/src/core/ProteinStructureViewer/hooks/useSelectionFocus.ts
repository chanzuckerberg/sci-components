import { StructureElement } from "molstar/lib/mol-model/structure";
import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { RefObject, useEffect, useRef } from "react";
import type { StructureSelection } from "../ProteinStructureViewer.types";
import { focusResidue } from "../utils/cameraFocus";
import { setFocusNeighbourhood } from "../utils/focusRepresentation";
import { lociForSelection } from "../utils/residueLoci";
import { selectionKey } from "../utils/selection";

/** Records the focus anchor for adaptive depth clipping; null stops it. */
type SetClipRatio = (ratio: number | null) => void;

/**
 * Points the camera at a loci and marks it.
 *
 * A click has already focused what the consumer echoes back by the time it
 * arrives, so the focus is only set when it is not already what is marked;
 * setting it again would restate the selection and repaint the sequence panel
 * for nothing.
 */
function focusLoci(
  plugin: PluginUIContext,
  loci: StructureElement.Loci,
  setClipRatio: SetClipRatio
): void {
  const focused = plugin.managers.structure.focus.behaviors.current.value;

  if (!focused || !StructureElement.Loci.areEqual(focused.loci, loci)) {
    plugin.managers.structure.focus.setFromLoci(loci);
  }

  setClipRatio(focusResidue(plugin, loci));
}

/**
 * Drops the focus, and the depth clipping anchored to it.
 *
 * `resetCamera` separates the two ways this happens. The consumer clearing the
 * selection means there is nothing to look at, so the view goes back to the
 * default. A selection that merely resolved to nothing visible - the chain it
 * covers having been hidden - still stands, so throwing the camera back would
 * be answering a question nobody asked.
 */
function clearFocus(
  plugin: PluginUIContext,
  setClipRatio: SetClipRatio,
  resetCamera: boolean
): void {
  setClipRatio(null);
  plugin.managers.structure.focus.clear();
  if (resetCamera) plugin.canvas3d?.requestCameraReset();
}

/**
 * Focuses a loci, resizing the focus shell first when this selection wants a
 * different reach than the last one did.
 *
 * The resize is asynchronous and the focus has to follow it - the shell is
 * sized before focusing so it is not drawn at the old reach and rebuilt - so
 * this hands back a teardown that abandons the focus if the effect is torn
 * down while the resize is still in flight.
 *
 * `currentShell` is the reach already configured, carried in a ref so that two
 * selections of the same kind do not each restate it.
 */
function focusWithShell(
  plugin: PluginUIContext,
  loci: StructureElement.Loci,
  includeNeighbours: boolean,
  currentShell: { current: boolean | null },
  pluginRef: RefObject<PluginUIContext | null>,
  setClipRatio: SetClipRatio
): (() => void) | undefined {
  if (currentShell.current === includeNeighbours) {
    focusLoci(plugin, loci, setClipRatio);
    return undefined;
  }

  let cancelled = false;
  currentShell.current = includeNeighbours;

  setFocusNeighbourhood(plugin, includeNeighbours).then(() => {
    if (cancelled || pluginRef.current !== plugin) return;
    focusLoci(plugin, loci, setClipRatio);
  });

  return () => {
    cancelled = true;
  };
}

export interface UseSelectionFocusOptions {
  pluginRef: RefObject<PluginUIContext | null>;
  isReady: boolean;
  selection?: StructureSelection | null;
  /**
   * Chains hidden from the 3D view. Subtracted from what is focused, so a
   * hidden chain draws nothing even while it is selected.
   */
  hiddenChains: Set<string>;
  setClipRatio: SetClipRatio;
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
  hiddenChains,
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

  /**
   * What the camera should be pointed at, as a string. Hiding a chain changes
   * what there is to focus, so it belongs in here alongside the selection
   * itself - and comparing strings rather than objects is what keeps a consumer
   * echoing an equal selection back from refocusing on every render.
   */
  const focusKey = selection
    ? `${selectionKey(selection)}#${[...hiddenChains].sort().join(",")}`
    : null;

  useEffect(() => {
    const plugin = pluginRef.current;

    if (!plugin || !isReady) {
      focusedRef.current = null;
      neighbourhoodRef.current = null;
      return;
    }

    if (focusKey === focusedRef.current) return;
    focusedRef.current = focusKey;

    if (focusKey === null) {
      clearFocus(plugin, setClipRatio, true);
      return;
    }

    const chosen = selection as StructureSelection;
    const loci = lociForSelection(plugin, chosen, hiddenChains);

    // Nothing visible left, which is what hiding the only chain the selection
    // covers looks like. Mol* draws its ball-and-stick from whatever is
    // focused, so dropping the focus is what takes the hidden chain's atoms
    // off the canvas along with its cartoon.
    if (!loci) {
      clearFocus(plugin, setClipRatio, false);
      return;
    }

    // A whole chain keeps its shell confined to itself; a residue or a range
    // keeps the 5A shell Mol* draws around it.
    return focusWithShell(
      plugin,
      loci,
      !chosen.chains?.length,
      neighbourhoodRef,
      pluginRef,
      setClipRatio
    );
    // pluginRef is a stable ref, and `selection` and `hiddenChains` are both
    // read through `focusKey`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusKey, isReady, setClipRatio]);
}

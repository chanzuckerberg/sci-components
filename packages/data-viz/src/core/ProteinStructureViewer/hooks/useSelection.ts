import { useCallback, useEffect, useRef, useState } from "react";
import type { StructureSelection } from "../ProteinStructureViewer.types";

export interface UseSelectionOptions {
  /** Controlled selection, or undefined to let this hook own it. */
  selection?: StructureSelection | null;
  onSelectionChange?: (selection: StructureSelection | null) => void;
  /** The structure the selection's residue indices point into. */
  structure: string;
}

export interface UseSelectionResult {
  /** What is selected, from whichever side owns it. */
  selection: StructureSelection | null;
  /** Takes up a selection the user made and reports it. */
  changeSelection: (selection: StructureSelection | null) => void;
}

/**
 * Reconciles the selection the consumer passes with the one the viewer keeps.
 *
 * Selection is controlled when `selection` is passed and owned here when it is
 * not, the same split `useChains` makes for visibility. The camera only ever
 * follows the selection, so without an owner a click on a viewer nobody holds
 * state for would mark the residue and never zoom in on it.
 * `onSelectionChange` fires either way: a consumer that only wants to follow
 * along should not have to take ownership to hear about it.
 */
export function useSelection({
  onSelectionChange,
  selection,
  structure,
}: UseSelectionOptions): UseSelectionResult {
  const isControlled = selection !== undefined;
  const [ownSelection, setOwnSelection] = useState<StructureSelection | null>(
    null
  );

  const onSelectionChangeRef = useRef(onSelectionChange);
  onSelectionChangeRef.current = onSelectionChange;

  // Residue indices name nothing on another structure, so a selection owned
  // here does not outlive the structure it was made on.
  useEffect(() => {
    setOwnSelection(null);
  }, [structure]);

  const changeSelection = useCallback(
    (next: StructureSelection | null) => {
      if (!isControlled) setOwnSelection(next);
      onSelectionChangeRef.current?.(next);
    },
    [isControlled]
  );

  return {
    changeSelection,
    selection: isControlled ? selection : ownSelection,
  };
}

import { StructureElement } from "molstar/lib/mol-model/structure";
import { createContext, useCallback, useContext, useMemo, useRef } from "react";

export interface SequenceDrag {
  /** The mouse-down anchor while a drag is underway, otherwise undefined. */
  getAnchor: () => StructureElement.Loci | undefined;
  setAnchor: (anchor: StructureElement.Loci | undefined) => void;
  clearAnchor: () => void;
}

const NO_DRAG: SequenceDrag = {
  clearAnchor: () => undefined,
  getAnchor: () => undefined,
  setAnchor: () => undefined,
};

const SequenceDragContext = createContext<SequenceDrag>(NO_DRAG);

export const SequenceDragProvider = SequenceDragContext.Provider;

/**
 * The anchor a drag across the sequence started from, shared by every chain's
 * grid.
 *
 * It has to live above the grids rather than inside one. A complex renders one
 * grid per chain, so a drag that begins on the target and ends on the binder
 * starts in one component and finishes in another; an anchor held by the grid
 * it started in is not there to be read by the grid it ends in, and the drag
 * would be reported as a plain click on whatever it landed on.
 *
 * Held in a ref rather than state: it changes on mouse-down and mouse-up, and
 * nothing renders from it, so re-rendering every residue in the panel twice per
 * drag would buy nothing.
 */
export function useCreateSequenceDrag(): SequenceDrag {
  const anchorRef = useRef<StructureElement.Loci | undefined>(undefined);

  const getAnchor = useCallback(() => anchorRef.current, []);
  const setAnchor = useCallback((anchor: StructureElement.Loci | undefined) => {
    anchorRef.current = anchor;
  }, []);
  const clearAnchor = useCallback(() => {
    anchorRef.current = undefined;
  }, []);

  return useMemo(
    () => ({ clearAnchor, getAnchor, setAnchor }),
    [clearAnchor, getAnchor, setAnchor]
  );
}

export function useSequenceDrag(): SequenceDrag {
  return useContext(SequenceDragContext);
}

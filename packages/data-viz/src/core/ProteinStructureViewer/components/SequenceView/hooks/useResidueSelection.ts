import { StructureElement } from "molstar/lib/mol-model/structure";
import type { SequenceWrapper } from "molstar/lib/mol-plugin-ui/sequence/wrapper";
import {
  getButton,
  getButtons,
  getModifiers,
} from "molstar/lib/mol-util/input/input-observer";
import { MouseEvent } from "react";
import { getLoci } from "../utils/loci";
import { readSeqIdx } from "../utils/residue";
import { useLociDispatch } from "./useLociDispatch";
import { useSequenceDrag } from "./useSequenceDrag";

export interface UseResidueSelectionOptions {
  sequenceWrapper: SequenceWrapper.Any;
}

export interface ResidueSelection {
  onMouseDown: (e: MouseEvent) => void;
  onMouseUp: (e: MouseEvent) => void;
}

/**
 * Turns a press and release on the grid into a selection: one residue when
 * both land on the same one, otherwise the contiguous range dragged across -
 * which the panel-level anchor lets reach into another chain's grid.
 */
export function useResidueSelection({
  sequenceWrapper,
}: UseResidueSelectionOptions): ResidueSelection {
  const { clearAnchor, getAnchor, setAnchor } = useSequenceDrag();
  const { click } = useLociDispatch();

  const onMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    setAnchor(getLoci(sequenceWrapper, readSeqIdx(e.target as HTMLElement)));
  };

  const onMouseUp = (e: MouseEvent) => {
    e.stopPropagation();

    const anchor = getAnchor();
    if (anchor === undefined) return;

    // Resolved against this grid's wrapper, which is the one the pointer was
    // released over. On a drag that crossed chains that is not the grid the
    // anchor came from, and reading the release point here is what keeps the
    // two ends of the range addressed correctly.
    const loci = getLoci(sequenceWrapper, readSeqIdx(e.target as HTMLElement));
    if (loci) {
      // Releasing on the anchor is a plain click, so it must not be widened
      // into a one-residue range.
      const dragged = !StructureElement.Loci.areEqual(anchor, loci);
      click(
        loci,
        getButtons(e.nativeEvent),
        getButton(e.nativeEvent),
        getModifiers(e.nativeEvent),
        dragged ? anchor : undefined
      );
    }

    clearAnchor();
  };

  return { onMouseDown, onMouseUp };
}

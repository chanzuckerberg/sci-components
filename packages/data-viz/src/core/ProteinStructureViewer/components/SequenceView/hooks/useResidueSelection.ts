import { StructureElement } from "molstar/lib/mol-model/structure";
import type { SequenceWrapper } from "molstar/lib/mol-plugin-ui/sequence/wrapper";
import {
  getButton,
  getButtons,
  getModifiers,
} from "molstar/lib/mol-util/input/input-observer";
import { MouseEvent, useRef } from "react";
import { getLoci } from "../utils/loci";
import { readSeqIdx } from "../utils/residue";
import { useLociDispatch } from "./useLociDispatch";

export interface UseResidueSelectionOptions {
  sequenceWrapper: SequenceWrapper.Any;
}

export interface ResidueSelection {
  /** The mouse-down anchor while a drag is underway, otherwise undefined. */
  getAnchor: () => StructureElement.Loci | undefined;
  clearAnchor: () => void;
  onMouseDown: (e: MouseEvent) => void;
  onMouseUp: (e: MouseEvent) => void;
}

/**
 * Turns a press and release on the grid into a selection: one residue when
 * both land on the same one, otherwise the contiguous range dragged across.
 */
export function useResidueSelection({
  sequenceWrapper,
}: UseResidueSelectionOptions): ResidueSelection {
  const anchorRef = useRef<StructureElement.Loci | undefined>(undefined);
  const { click } = useLociDispatch();

  const onMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    anchorRef.current = getLoci(
      sequenceWrapper,
      readSeqIdx(e.target as HTMLElement)
    );
  };

  const onMouseUp = (e: MouseEvent) => {
    e.stopPropagation();

    const anchor = anchorRef.current;
    if (anchor === undefined) return;

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

    anchorRef.current = undefined;
  };

  return {
    clearAnchor: () => {
      anchorRef.current = undefined;
    },
    getAnchor: () => anchorRef.current,
    onMouseDown,
    onMouseUp,
  };
}

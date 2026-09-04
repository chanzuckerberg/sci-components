import { StructureElement } from "molstar/lib/mol-model/structure";
import type { SequenceWrapper } from "molstar/lib/mol-plugin-ui/sequence/wrapper";
import { useRef } from "react";
import type { ResidueColors } from "../../../../utils/theme";
import { SEQUENCE_GROUP_SIZE } from "../../constants";
import { useResidueMarkers } from "../../hooks/useResidueMarkers";
import { useResiduePointer } from "../../hooks/useResiduePointer";
import { ResidueGrid } from "../../style";
import {
  getResidueClass,
  getSequenceNumber,
  resolveSequenceNumberPeriod,
} from "../../utils/residue";
import ResidueTooltip from "../ResidueTooltip";

export interface SequenceProps {
  sequenceWrapper: SequenceWrapper.Any;
  /**
   * Chain the grid covers, when the structure has more than one. The caption
   * above the grid is a visual sibling, so without this every grid announces
   * the same name and the chain a reader is on is only apparent by sight.
   */
  chainLabel?: string;
  /**
   * Residue colors resolved from the active theme. Passed in rather than read
   * from context because the markers are written straight to the DOM.
   */
  residueColors: ResidueColors;
  sequenceNumberPeriod?: number;
  hideSequenceNumbers?: boolean;
}

/**
 * One residue. Not a component: the grid can hold thousands of these, and
 * giving each its own fiber costs more than it saves, since the markers that
 * actually change bypass React anyway.
 */
function renderResidue(
  sequenceWrapper: SequenceWrapper.Any,
  seqIdx: number,
  seqNum: string | null
) {
  return (
    <span
      className={getResidueClass(sequenceWrapper, seqIdx)}
      data-seqid={seqIdx}
      key={seqIdx}
    >
      {seqNum && <span className="msp-sequence-number">{seqNum}</span>}
      {sequenceWrapper.residueLabel(seqIdx)}
    </span>
  );
}

/** Interactive residue grid, kept in sync with the 3D view's hover and selection. */
const Sequence = ({
  chainLabel,
  hideSequenceNumbers,
  residueColors,
  sequenceNumberPeriod,
  sequenceWrapper,
}: SequenceProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);

  /** Scratch location reused by every sequence-number lookup below. */
  const locationRef = useRef(StructureElement.Location.create(void 0));

  useResidueMarkers({ containerRef, residueColors, sequenceWrapper });

  const { handlers, tooltipRef } = useResiduePointer({
    containerRef,
    sequenceWrapper,
  });

  const period = resolveSequenceNumberPeriod(
    sequenceWrapper,
    locationRef.current,
    sequenceNumberPeriod
  );

  // Residues are grouped into fixed sections, each one grid cell; see
  // ResidueGrid for the layout that spaces them.
  const groups: JSX.Element[] = [];
  for (
    let start = 0;
    start < sequenceWrapper.length;
    start += SEQUENCE_GROUP_SIZE
  ) {
    const end = Math.min(start + SEQUENCE_GROUP_SIZE, sequenceWrapper.length);
    const residues: JSX.Element[] = [];

    for (let i = start; i < end; i++) {
      const showNum = !hideSequenceNumbers && i % period === 0;
      residues.push(
        renderResidue(
          sequenceWrapper,
          i,
          showNum
            ? getSequenceNumber(sequenceWrapper, i, locationRef.current)
            : null
        )
      );
    }

    groups.push(<span key={`group-${start}`}>{residues}</span>);
  }

  return (
    <>
      {/*
        Pointer-driven residue picking and drag-to-range selection. Every
        interaction here is also reachable by pointer in the 3D view, and the
        grid is a rendering of the structure rather than a control of its own,
        so it is exposed as an image with the sequence as its label. Keyboard
        traversal of individual residues is a known gap in both surfaces.
      */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <ResidueGrid
        aria-label={
          chainLabel
            ? `Chain ${chainLabel}, residue sequence, ${sequenceWrapper.length} residues`
            : `Residue sequence, ${sequenceWrapper.length} residues`
        }
        className="msp-sequence-wrapper"
        ref={containerRef}
        role="img"
        {...handlers}
      >
        {groups}
      </ResidueGrid>
      <ResidueTooltip ref={tooltipRef} />
    </>
  );
};

export default Sequence;

import type { SequenceWrapper } from "molstar/lib/mol-plugin-ui/sequence/wrapper";
import { RefObject, useCallback, useEffect, useMemo, useRef } from "react";
import type { ResidueTooltipHandle } from "../components/ResidueTooltip";
import { getScrollParent } from "../utils/residue";

export interface UseHoveredResidueOptions {
  containerRef: RefObject<HTMLDivElement | null>;
  sequenceWrapper: SequenceWrapper.Any;
}

export interface HoveredResidue {
  /** Attach to the grid's `ResidueTooltip`; driven by the calls below. */
  tooltipRef: RefObject<ResidueTooltipHandle>;
  /**
   * Records the residue now under the pointer and moves the tooltip onto it,
   * or off the grid entirely for a negative index. Returns false when the
   * pointer never left the residue it was already on, so callers can stop
   * there.
   */
  moveTo: (seqIdx: number, el: HTMLElement) => boolean;
  /** Forgets the tracked residue, returning false when there was none. */
  clear: () => boolean;
  hide: () => void;
}

/**
 * Tracks which residue the pointer is over and keeps the tooltip pinned to it.
 *
 * The tracked index also deduplicates pointer moves: the grid sees a move for
 * every pixel, but only the ones that cross into a different residue matter.
 */
export function useHoveredResidue({
  containerRef,
  sequenceWrapper,
}: UseHoveredResidueOptions): HoveredResidue {
  const tooltipRef = useRef<ResidueTooltipHandle>(null);

  /** Index of the tracked residue, or -1 when the pointer is off the grid. */
  const seqIdxRef = useRef(-1);

  const hide = useCallback(() => tooltipRef.current?.hide(), []);

  const clear = useCallback(() => {
    if (seqIdxRef.current === -1) return false;
    seqIdxRef.current = -1;
    tooltipRef.current?.hide();
    return true;
  }, []);

  const moveTo = useCallback(
    (seqIdx: number, el: HTMLElement) => {
      if (seqIdxRef.current === seqIdx) return false;
      seqIdxRef.current = seqIdx;

      if (seqIdx < 0) tooltipRef.current?.hide();
      else tooltipRef.current?.show(el, sequenceWrapper.residueLabel(seqIdx));

      return true;
    },
    [sequenceWrapper]
  );

  // Scrolling moves the residues out from under the cursor, so drop the
  // tracked one. Listen on the nearest scrollable ancestor (not window) so
  // unrelated scrolling elsewhere in the app does not dismiss the tooltip and
  // a multi-chain sequence does not register one global listener per chain.
  useEffect(() => {
    const scrollTarget = getScrollParent(containerRef.current);
    if (!scrollTarget) return;

    const handleScroll = () => clear();
    scrollTarget.addEventListener("scroll", handleScroll, { passive: true });

    return () => scrollTarget.removeEventListener("scroll", handleScroll);
  }, [clear, containerRef]);

  return useMemo(
    () => ({ clear, hide, moveTo, tooltipRef }),
    [clear, hide, moveTo]
  );
}

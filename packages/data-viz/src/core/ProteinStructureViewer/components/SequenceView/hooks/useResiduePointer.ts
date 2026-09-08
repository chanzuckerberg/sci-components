import type { SequenceWrapper } from "molstar/lib/mol-plugin-ui/sequence/wrapper";
import {
  ButtonsType,
  getButton,
  getButtons,
  getModifiers,
  type ModifiersKeys,
} from "molstar/lib/mol-util/input/input-observer";
import { MouseEvent, RefObject, useMemo, useRef } from "react";
import { Subject } from "rxjs";
import { throttleTime } from "rxjs/operators";
import { useSubscribe } from "../../../hooks/useSubscribe";
import type { ResidueTooltipHandle } from "../components/ResidueTooltip";
import { HOVER_THROTTLE_MS } from "../constants";
import { getLoci } from "../utils/loci";
import { readSeqIdx } from "../utils/residue";
import { useHoveredResidue } from "./useHoveredResidue";
import { useLociDispatch } from "./useLociDispatch";
import { useResidueSelection } from "./useResidueSelection";

/** A hover the grid has requested but not yet dispatched to the 3D view. */
interface HoverRequest {
  seqIdx: number;
  buttons: number;
  button: number;
  modifiers: ModifiersKeys;
}

export interface UseResiduePointerOptions {
  containerRef: RefObject<HTMLDivElement | null>;
  sequenceWrapper: SequenceWrapper.Any;
}

export interface ResiduePointerHandlers {
  onContextMenu: (e: MouseEvent) => void;
  onMouseDown: (e: MouseEvent) => void;
  onMouseLeave: (e: MouseEvent) => void;
  onMouseMove: (e: MouseEvent) => void;
  onMouseUp: (e: MouseEvent) => void;
}

export interface ResiduePointer {
  handlers: ResiduePointerHandlers;
  tooltipRef: RefObject<ResidueTooltipHandle>;
}

/**
 * Everything the grid does with a pointer: hover on move, and the drag-to-range
 * selection delegated to `useResidueSelection`.
 *
 * Hover reaches the 3D view through a throttled queue, so that sweeping the
 * pointer across the grid does not ask Mol* to re-mark on every residue
 * crossed. A drag is exempt: its hover carries the growing range, so it goes
 * out immediately to keep the preview under the pointer.
 */
export function useResiduePointer({
  containerRef,
  sequenceWrapper,
}: UseResiduePointerOptions): ResiduePointer {
  const { hover } = useLociDispatch();

  const { clear, hide, moveTo, tooltipRef } = useHoveredResidue({
    containerRef,
    sequenceWrapper,
  });

  const { clearAnchor, getAnchor, onMouseDown, onMouseUp } =
    useResidueSelection({ sequenceWrapper });

  const queueRef = useRef<Subject<HoverRequest> | null>(null);
  if (queueRef.current === null) queueRef.current = new Subject<HoverRequest>();
  const queue = queueRef.current;

  const throttledHover = useMemo(
    () =>
      queue.pipe(
        throttleTime(HOVER_THROTTLE_MS, void 0, {
          leading: true,
          trailing: true,
        })
      ),
    [queue]
  );

  useSubscribe(throttledHover, (e) => {
    const loci = getLoci(sequenceWrapper, e.seqIdx < 0 ? void 0 : e.seqIdx);
    hover(loci, e.buttons, e.button, e.modifiers, getAnchor());
  });

  const queueHover = (e: MouseEvent, seqIdx: number) =>
    queue.next({
      button: getButton(e.nativeEvent),
      buttons: getButtons(e.nativeEvent),
      modifiers: getModifiers(e.nativeEvent),
      seqIdx,
    });

  /** Asks the 3D view to drop its hover, once, if the grid still holds one. */
  const releaseHover = (e: MouseEvent) => {
    if (clear()) queueHover(e, -1);
  };

  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  const onMouseMove = (e: MouseEvent) => {
    e.stopPropagation();

    const el = e.target as HTMLElement;
    if (!el || !el.getAttribute) {
      releaseHover(e);
      return;
    }

    const seqIdx = readSeqIdx(el) ?? -1;
    if (!moveTo(seqIdx, el)) return;

    const anchor = getAnchor();
    if (anchor === undefined) {
      queueHover(e, seqIdx);
      return;
    }

    hover(
      getLoci(sequenceWrapper, seqIdx),
      ButtonsType.Flag.None,
      ButtonsType.Flag.None,
      getModifiers(e.nativeEvent),
      anchor
    );
  };

  const onMouseLeave = (e: MouseEvent) => {
    e.stopPropagation();
    clearAnchor();
    hide();
    releaseHover(e);
  };

  return {
    handlers: {
      onContextMenu,
      onMouseDown,
      onMouseLeave,
      onMouseMove,
      onMouseUp,
    },
    tooltipRef,
  };
}

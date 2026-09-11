import {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  GenomeSelection,
  GenomeTrackData,
  GenomeViewport,
} from "../GenomeTrack.types";
import { TrackHit, hitTest } from "../utils/hitTest";
import { TrackRow, rowAt } from "../utils/layout";
import { GenomeScale, panBy, spanOf, zoomAt } from "../utils/scale";

/**
 * Pan, zoom, hover, and selection.
 *
 * All of the component's interaction lives here, which is what keeps the render
 * function readable. It is also where the awkward parts of pointer handling are
 * concentrated: drag-versus-click disambiguation, pointer capture, and the
 * non-passive wheel listener.
 */

/** Wheel zoom per notch. Below 1 zooms in. */
const ZOOM_STEP = 0.82;

/** Fraction of the window an arrow key pans. */
const KEY_PAN_FRACTION = 0.15;

/**
 * Pointer travel, in px, below which a drag is treated as a click.
 *
 * Without this, selecting a block is unreliable: a mouse almost always moves a
 * pixel or two between down and up, so every click would register as a pan and
 * nothing would ever get selected.
 */
const CLICK_SLOP_PX = 4;

export interface UseTrackNavigationOptions {
  bounds: GenomeViewport;
  data: GenomeTrackData | null;
  disabled: boolean;
  navigate: (viewport: GenomeViewport) => void;
  onSelectionChange?: (selection: GenomeSelection | null) => void;
  plotRef: RefObject<HTMLDivElement>;
  rows: TrackRow[];
  scale: GenomeScale;
  selectedId: string | null;
  viewport: GenomeViewport;
}

export interface UseTrackNavigationResult {
  /** What the pointer is over, for the tooltip and the hover outline. */
  hit: TrackHit | null;
  isDragging: boolean;
  handlers: {
    onKeyDown: (event: ReactKeyboardEvent<HTMLDivElement>) => void;
    onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
    onPointerLeave: () => void;
    onPointerMove: (event: ReactPointerEvent<HTMLDivElement>) => void;
    onPointerUp: (event: ReactPointerEvent<HTMLDivElement>) => void;
  };
}

export function useTrackNavigation(
  options: UseTrackNavigationOptions
): UseTrackNavigationResult {
  const {
    bounds,
    data,
    disabled,
    navigate,
    onSelectionChange,
    plotRef,
    rows,
    scale,
    selectedId,
    viewport,
  } = options;

  const [hit, setHit] = useState<TrackHit | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Drag state is a ref, not state: it changes on every pointer move and
  // nothing rendered depends on the intermediate values, so keeping it in state
  // would cost a React pass per frame for no visual difference.
  const drag = useRef<{ moved: number; startX: number } | null>(null);

  const localX = useCallback(
    (clientX: number): number =>
      clientX - (plotRef.current?.getBoundingClientRect().left ?? 0),
    [plotRef]
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!data) return;

      const rect = plotRef.current?.getBoundingClientRect();
      const x = event.clientX - (rect?.left ?? 0);
      const y = event.clientY - (rect?.top ?? 0);

      if (drag.current) {
        const deltaX = x - drag.current.startX;

        drag.current.moved += Math.abs(deltaX);

        if (deltaX !== 0) {
          // Pan against the drag: dragging right moves the window left, the way
          // dragging a map does.
          navigate(panBy(scale, bounds, -deltaX));
          drag.current.startX = x;
        }

        return;
      }

      setHit(hitTest(data, rows, scale, x, y));
    },
    [bounds, data, navigate, plotRef, rows, scale]
  );

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      // Focus on click so keyboard navigation works without a separate tab
      // stop, which is what a user expects after interacting with a plot.
      plotRef.current?.focus();

      if (disabled) return;

      /**
       * A drag beginning on the minimap does nothing at all.
       *
       * Panning is inverted by design — the plot moves under the pointer the
       * way a map does — and on a minimap that would send the window the
       * opposite way to the box the user is dragging. Doing nothing is worse
       * than dragging the box and better than moving it backwards; dragging it
       * properly means treating the minimap as its own control, which is the
       * work this is holding a place for.
       */
      const plot = plotRef.current?.getBoundingClientRect();

      if (rowAt(rows, event.clientY - (plot?.top ?? 0))?.kind === "minimap") {
        return;
      }

      drag.current = { moved: 0, startX: localX(event.clientX) };
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [disabled, localX, plotRef, rows]
  );

  const onPointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const wasClick = (drag.current?.moved ?? 0) < CLICK_SLOP_PX;

      drag.current = null;
      setIsDragging(false);

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      if (!wasClick || !data || !onSelectionChange) return;

      const rect = plotRef.current?.getBoundingClientRect();
      const found = hitTest(
        data,
        rows,
        scale,
        event.clientX - (rect?.left ?? 0),
        event.clientY - (rect?.top ?? 0)
      );

      // Clicking a block selects it; clicking it again, or clicking empty
      // space, clears. Emitting null rather than ignoring the click is what
      // lets a shell close a detail surface from here.
      if (!found || found.kind === "trace") {
        onSelectionChange(null);
        return;
      }

      onSelectionChange(
        selectedId === found.id ? null : { id: found.id, kind: "block" }
      );
    },
    [data, onSelectionChange, plotRef, rows, scale, selectedId]
  );

  const onPointerLeave = useCallback(() => setHit(null), []);

  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (!data || disabled) return;

      const step = Math.max(Math.round(spanOf(viewport) * KEY_PAN_FRACTION), 1);
      const center = scale.width / 2;

      switch (event.key) {
        case "ArrowLeft":
          navigate({ end: viewport.end - step, start: viewport.start - step });
          break;
        case "ArrowRight":
          navigate({ end: viewport.end + step, start: viewport.start + step });
          break;
        case "ArrowUp":
        case "+":
        case "=":
          navigate(zoomAt(scale, bounds, center, ZOOM_STEP));
          break;
        case "ArrowDown":
        case "-":
          navigate(zoomAt(scale, bounds, center, 1 / ZOOM_STEP));
          break;
        case "Home":
          navigate(bounds);
          break;
        default:
          // Unhandled keys fall through without preventDefault, so the page's
          // own shortcuts still work while the plot has focus.
          return;
      }

      event.preventDefault();
    },
    [bounds, data, disabled, navigate, scale, viewport]
  );

  /**
   * Wheel zoom, bound imperatively.
   *
   * React attaches wheel listeners as passive, where `preventDefault` is a
   * no-op — so through the `onWheel` prop the page would scroll while the track
   * zoomed. This is the one listener that cannot go through React.
   */
  useEffect(() => {
    const element = plotRef.current;

    if (!element || disabled || !data) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();

      const rect = element.getBoundingClientRect();
      const factor = event.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP;

      navigate(zoomAt(scale, bounds, event.clientX - rect.left, factor));
    };

    element.addEventListener("wheel", onWheel, { passive: false });

    return () => element.removeEventListener("wheel", onWheel);
  }, [bounds, data, disabled, navigate, plotRef, scale]);

  return {
    handlers: {
      onKeyDown,
      onPointerDown,
      onPointerLeave,
      onPointerMove,
      onPointerUp,
    },
    hit,
    isDragging,
  };
}

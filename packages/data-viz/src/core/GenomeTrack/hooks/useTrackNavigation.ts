import {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  GenomeSelection,
  GenomeTrackData,
  GenomeViewport,
} from "../GenomeTrack.types";
import { TrackHit, hitTest, sameHit, selectionForHit } from "../utils/hitTest";
import { TrackRow, rowAt } from "../utils/layout";
import {
  GenomeScale,
  createScale,
  panBy,
  panByBp,
  pxToBp,
  spanOf,
  zoomAt,
} from "../utils/scale";

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
  /**
   * What the minimap's bar spans, which its band is dragged along.
   *
   * The plot and the minimap measure in different spaces — the plot in the
   * viewport, the minimap in the whole extent — so a drag of the band converts
   * pixels through this rather than through `scale`.
   */
  extent: GenomeViewport;
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
    extent,
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
  const drag = useRef<{
    /** Which space the drag moves in: the plot's viewport, or the minimap's extent. */
    kind: "minimap" | "plot";
    moved: number;
    startX: number;
  } | null>(null);

  /** The minimap's axis: its bar spans the extent, not the viewport. */
  const minimapScale = useMemo(
    () => createScale(extent, scale.width),
    [extent, scale.width]
  );

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
          navigate(
            drag.current.kind === "minimap"
              ? // The band follows the pointer, and the window follows the
                // band. Measured on the minimap's own axis, so one pixel is a
                // chromosome-scale step rather than a viewport-scale one.
                panByBp(viewport, bounds, deltaX * minimapScale.bpPerPx)
              : // Pan against the drag: dragging right moves the window left,
                // the way dragging a map does.
                panBy(scale, bounds, -deltaX)
          );
          drag.current.startX = x;
        }

        return;
      }

      // Only when it changed: see `sameHit`. A fresh object every pointer move
      // would re-render the whole track while the pointer sits in one block.
      const next = hitTest(data, rows, scale, x, y);

      setHit((previous) => (sameHit(previous, next) ? previous : next));
    },
    [bounds, data, minimapScale, navigate, plotRef, rows, scale, viewport]
  );

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      // Focus on click so keyboard navigation works without a separate tab
      // stop, which is what a user expects after interacting with a plot.
      plotRef.current?.focus();

      if (disabled) return;

      const plot = plotRef.current?.getBoundingClientRect();
      const startX = localX(event.clientX);
      const onMinimap =
        rowAt(rows, event.clientY - (plot?.top ?? 0))?.kind === "minimap";

      /**
       * The minimap is its own control, dragged rather than panned.
       *
       * Panning the plot is inverted by design — the view moves under the
       * pointer the way a map does — and applying that to the minimap would
       * send the band the opposite way to the pointer holding it. So a drag
       * that starts on the band moves the band *with* the pointer, and the
       * window follows it.
       *
       * Only from inside the band: the bar is 24 px of whole chromosome, so a
       * press outside the band is far more likely to be aimed at the row than
       * at a jump of several megabases.
       */
      if (onMinimap) {
        const bp = pxToBp(minimapScale, startX);

        if (bp < viewport.start || bp > viewport.end) return;

        drag.current = { kind: "minimap", moved: 0, startX };
        setIsDragging(true);
        event.currentTarget.setPointerCapture(event.pointerId);

        return;
      }

      drag.current = { kind: "plot", moved: 0, startX };
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [disabled, localX, minimapScale, plotRef, rows, viewport]
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

      /**
       * A features row selects the *feature*, not a position in it.
       *
       * A trace is a measurement and also a thing to pick: selecting one is how
       * the minimap learns whose activation to draw across the chromosome,
       * which is the only way to see a feature outside the loaded window.
       *
       * Anywhere in the row counts, since the whole row is that one feature —
       * requiring a click on a bar would make silent stretches unclickable,
       * and a feature's quiet regions are as much a part of it as its peaks.
       */
      onSelectionChange(selectionForHit(found, selectedId));
    },
    [data, onSelectionChange, plotRef, rows, scale, selectedId]
  );

  const onPointerLeave = useCallback(() => setHit(null), []);

  /**
   * A new payload clears the hover.
   *
   * `hit` is only recomputed on pointer *movement*, and it holds resolved
   * values — a bin's range, an activation — rather than a reference the data
   * could invalidate. Wheel-zoom leaves the pointer stationary, so a re-fetch
   * landing mid-hover would otherwise leave a tooltip quoting the previous
   * stride's bin against the new trace, and `hit.rowIndex` pointing into a row
   * list that may have changed length. Stale numbers next to the pointer are
   * worse than none: the user has no way to tell they are reading the old
   * window.
   */
  useEffect(() => setHit(null), [data]);

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
   * What the wheel handler needs, in a ref rather than in its closure.
   *
   * `scale`, `bounds` and `navigate` all change identity on every viewport
   * update, so closing over them would make the effect below re-run — and
   * therefore remove and re-add a non-passive DOM listener — on every pan
   * frame. Reading them through a ref keeps the registration stable.
   */
  const wheelState = useRef({ bounds, navigate, scale });

  wheelState.current = { bounds, navigate, scale };

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
      const current = wheelState.current;

      current.navigate(
        zoomAt(current.scale, current.bounds, event.clientX - rect.left, factor)
      );
    };

    element.addEventListener("wheel", onWheel, { passive: false });

    return () => element.removeEventListener("wheel", onWheel);
    // Deliberately not depending on `scale`, `bounds` or `navigate`: they are
    // read through `wheelState` precisely so this registration survives a pan.
  }, [data, disabled, plotRef]);

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

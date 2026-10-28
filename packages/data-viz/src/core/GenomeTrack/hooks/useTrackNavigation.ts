import {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
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
import {
  TrackHit,
  hitTest,
  keyboardItems,
  sameHit,
  selectionForHit,
  stepItem,
} from "../utils/hitTest";
import { TrackRow, rowAt } from "../utils/layout";
import {
  GenomeScale,
  clampViewport,
  createScale,
  minimapBand,
  panBy,
  panByBp,
  spanOf,
  zoomAt,
} from "../utils/scale";

/** Pan, zoom, hover, and selection for the track. */

/** Wheel zoom per notch. Below 1 zooms in. */
const ZOOM_STEP = 0.82;

/** Fraction of the window an arrow key pans. */
const KEY_PAN_FRACTION = 0.15;

/** Pointer travel, in px, below which a drag counts as a click. */
const CLICK_SLOP_PX = 4;

/** How far outside the minimap's band, in px, a press still grabs it. */
const BAND_GRAB_SLOP_PX = 4;

export interface UseTrackNavigationOptions {
  /** Limits for drag, wheel, and arrow-key navigation (not the minimap). */
  bounds: GenomeViewport;
  data: GenomeTrackData | null;
  disabled: boolean;
  navigate: (viewport: GenomeViewport) => void;
  onSelectionChange?: (selection: GenomeSelection | null) => void;
  plot: HTMLDivElement | null;
  /** What the minimap's bar spans; its band is dragged within it. */
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
    onLostPointerCapture: () => void;
    onPointerCancel: () => void;
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
    plot,
    extent,
    rows,
    scale,
    selectedId,
    viewport,
  } = options;

  const [hit, setHit] = useState<TrackHit | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // A ref, since it changes every pointer move and nothing renders from it.
  // Each move pans from where the drag started, so sub-base movement between
  // events is not rounded away.
  const drag = useRef<{
    kind: "minimap" | "plot";
    lastX: number;
    moved: number;
    startBounds: GenomeViewport;
    startScale: GenomeScale;
    startViewport: GenomeViewport;
    startX: number;
  } | null>(null);

  const minimapScale = useMemo(
    () => createScale(extent, scale.width),
    [extent, scale.width]
  );

  const localX = useCallback(
    (clientX: number): number =>
      clientX - (plot?.getBoundingClientRect().left ?? 0),
    [plot]
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!data) return;

      const rect = plot?.getBoundingClientRect();
      const x = event.clientX - (rect?.left ?? 0);
      const y = event.clientY - (rect?.top ?? 0);
      const current = drag.current;

      if (current) {
        if (x === current.lastX) return;

        current.moved += Math.abs(x - current.lastX);
        current.lastX = x;

        const deltaX = x - current.startX;

        navigate(
          current.kind === "minimap"
            ? // The band moves with the pointer, on the minimap's scale.
              panByBp(
                current.startViewport,
                extent,
                deltaX * minimapScale.bpPerPx
              )
            : // Inverted, like dragging a map.
              panBy(current.startScale, current.startBounds, -deltaX)
        );

        return;
      }

      const next = hitTest(data, rows, scale, x, y);

      setHit((previous) => (sameHit(previous, next) ? previous : next));
    },
    [data, extent, minimapScale, navigate, plot, rows, scale]
  );

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      // Focus so keyboard navigation works after a click.
      plot?.focus();

      if (disabled) return;

      const rect = plot?.getBoundingClientRect();
      const startX = localX(event.clientX);
      const onMinimap =
        rowAt(rows, event.clientY - (rect?.top ?? 0))?.kind === "minimap";
      const start = {
        lastX: startX,
        moved: 0,
        startBounds: bounds,
        startScale: scale,
        startViewport: viewport,
        startX,
      };

      // On the minimap, only a press on or near the drawn band starts a drag.
      if (onMinimap) {
        const band = minimapBand(minimapScale, viewport);

        if (
          !band ||
          startX < band.x - BAND_GRAB_SLOP_PX ||
          startX > band.x + band.width + BAND_GRAB_SLOP_PX
        ) {
          return;
        }

        drag.current = { ...start, kind: "minimap" };
        setIsDragging(true);
        event.currentTarget.setPointerCapture(event.pointerId);

        return;
      }

      drag.current = { ...start, kind: "plot" };
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [bounds, disabled, localX, minimapScale, plot, rows, scale, viewport]
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

      const rect = plot?.getBoundingClientRect();
      const found = hitTest(
        data,
        rows,
        scale,
        event.clientX - (rect?.left ?? 0),
        event.clientY - (rect?.top ?? 0)
      );

      onSelectionChange(selectionForHit(found, selectedId));
    },
    [data, onSelectionChange, plot, rows, scale, selectedId]
  );

  // A cancelled or lost pointer ends the drag without selecting anything.
  const endDrag = useCallback(() => {
    drag.current = null;
    setIsDragging(false);
  }, []);

  const onPointerLeave = useCallback(() => setHit(null), []);

  // New data clears the hover, since `hit` holds values from the old payload.
  useEffect(() => setHit(null), [data]);

  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      // Keyboard navigation stays on when `disabled` turns off pointer gestures.
      if (!data) return;

      const step = Math.max(Math.round(spanOf(viewport) * KEY_PAN_FRACTION), 1);
      const center = scale.width / 2;

      switch (event.key) {
        case "ArrowLeft":
          navigate(
            clampViewport(
              { end: viewport.end - step, start: viewport.start - step },
              bounds
            )
          );
          break;
        case "ArrowRight":
          navigate(
            clampViewport(
              { end: viewport.end + step, start: viewport.start + step },
              bounds
            )
          );
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
        // Keyboard focus steps through the visible items, shown as a hover.
        case "]":
        case "[":
          setHit((previous) =>
            stepItem(
              keyboardItems(data, rows, viewport),
              previous,
              event.key === "]" ? 1 : -1
            )
          );
          break;
        case "Enter":
        case " ":
          if (!hit || !onSelectionChange) return;
          onSelectionChange(selectionForHit(hit, selectedId));
          break;
        case "Escape":
          if (!selectedId || !onSelectionChange) return;
          onSelectionChange(null);
          break;
        default:
          // Leave other keys to the page.
          return;
      }

      event.preventDefault();
    },
    [
      bounds,
      data,
      hit,
      navigate,
      onSelectionChange,
      rows,
      scale,
      selectedId,
      viewport,
    ]
  );

  // Read by the wheel listener so it is not re-registered on every pan.
  const wheelState = useRef({ bounds, navigate, scale });

  wheelState.current = { bounds, navigate, scale };

  // Registered by hand: React's wheel listeners are passive, so they cannot
  // `preventDefault` page scroll.
  useEffect(() => {
    const element = plot;

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
  }, [data, disabled, plot]);

  return {
    handlers: {
      onKeyDown,
      onLostPointerCapture: endDrag,
      onPointerCancel: endDrag,
      onPointerDown,
      onPointerLeave,
      onPointerMove,
      onPointerUp,
    },
    hit,
    isDragging,
  };
}

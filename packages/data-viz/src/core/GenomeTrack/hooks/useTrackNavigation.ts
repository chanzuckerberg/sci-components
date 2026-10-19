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
  plotRef: RefObject<HTMLDivElement>;
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

  // A ref, since it changes every pointer move and nothing renders from it.
  const drag = useRef<{
    kind: "minimap" | "plot";
    moved: number;
    startX: number;
  } | null>(null);

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
              ? // The band moves with the pointer, on the minimap's scale.
                panByBp(viewport, extent, deltaX * minimapScale.bpPerPx)
              : // Inverted, like dragging a map.
                panBy(scale, bounds, -deltaX)
          );
          drag.current.startX = x;
        }

        return;
      }

      const next = hitTest(data, rows, scale, x, y);

      setHit((previous) => (sameHit(previous, next) ? previous : next));
    },
    [
      bounds,
      data,
      extent,
      minimapScale,
      navigate,
      plotRef,
      rows,
      scale,
      viewport,
    ]
  );

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      // Focus so keyboard navigation works after a click.
      plotRef.current?.focus();

      if (disabled) return;

      const plot = plotRef.current?.getBoundingClientRect();
      const startX = localX(event.clientX);
      const onMinimap =
        rowAt(rows, event.clientY - (plot?.top ?? 0))?.kind === "minimap";

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

      onSelectionChange(selectionForHit(found, selectedId));
    },
    [data, onSelectionChange, plotRef, rows, scale, selectedId]
  );

  const onPointerLeave = useCallback(() => setHit(null), []);

  // New data clears the hover, since `hit` holds values from the old payload.
  useEffect(() => setHit(null), [data]);

  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (!data || disabled) return;

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
        default:
          // Leave other keys to the page.
          return;
      }

      event.preventDefault();
    },
    [bounds, data, disabled, navigate, scale, viewport]
  );

  // Read by the wheel listener so it is not re-registered on every pan.
  const wheelState = useRef({ bounds, navigate, scale });

  wheelState.current = { bounds, navigate, scale };

  // Registered by hand: React's wheel listeners are passive, so they cannot
  // `preventDefault` page scroll.
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

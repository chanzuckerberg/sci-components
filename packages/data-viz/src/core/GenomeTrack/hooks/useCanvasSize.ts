import { RefObject, useEffect, useState } from "react";

/** A container's CSS width and the device pixel ratio, kept up to date. */
export interface CanvasSize {
  /** Container width in CSS px. */
  width: number;
  /** Device pixel ratio, clamped to something a canvas can afford. */
  dpr: number;
}

/** Caps canvas backing-store memory. */
const MAX_DPR = 3;

export function useCanvasSize(ref: RefObject<HTMLElement>): CanvasSize {
  const [size, setSize] = useState<CanvasSize>({ dpr: 1, width: 0 });

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const read = () => {
      const nextWidth = element.clientWidth;
      const nextDpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

      setSize((previous) =>
        previous.width === nextWidth && previous.dpr === nextDpr
          ? previous
          : { dpr: nextDpr, width: nextWidth }
      );
    };

    read();

    // Not available in jsdom.
    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(read);

    observer.observe(element);

    // Fires when the pixel ratio changes, e.g. moving between displays.
    const query = window.matchMedia?.(
      `(resolution: ${window.devicePixelRatio || 1}dppx)`
    );

    query?.addEventListener?.("change", read);

    return () => {
      observer.disconnect();
      query?.removeEventListener?.("change", read);
    };
  }, [ref]);

  return size;
}

import { RefObject, useEffect, useState } from "react";

/**
 * Tracks a container's CSS size and the device pixel ratio.
 *
 * Two things have to be observed rather than measured once: the container,
 * because a track is nearly always in a flexible layout, and `devicePixelRatio`,
 * because dragging a window between a Retina and a non-Retina display changes
 * it without resizing anything. Missing the second produces a canvas that stays
 * crisp on one monitor and blurry on the other, which is the kind of bug that
 * only ever reproduces on someone else's desk.
 */
export interface CanvasSize {
  /** Container width in CSS px. */
  width: number;
  /** Device pixel ratio, clamped to something a canvas can afford. */
  dpr: number;
}

/**
 * Above this, the backing store costs more memory than the sharpness is worth;
 * 3x on a 2000px-wide track is already a 6000px canvas per layer.
 */
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

    // jsdom has no ResizeObserver. Reading once and skipping the subscription
    // keeps unit tests rendering at a real width instead of crashing or
    // measuring zero.
    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(read);

    observer.observe(element);

    // `resolution` media queries fire when the ratio itself changes, which a
    // ResizeObserver does not see.
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

import { useCallback, useEffect, useRef, useState } from "react";
import { GenomeViewport } from "../GenomeTrack.types";
import { overlaps } from "../utils/extent";
import { clampViewport } from "../utils/scale";

/**
 * Owns the visible range, controlled or uncontrolled.
 *
 * Controlled means the prop wins on every render and every navigation is only a
 * request — a shell that re-fetches on viewport change needs that, or the track
 * would show a range whose data has not arrived. Uncontrolled means the
 * component keeps its own state, which is what stories and simple embeds want.
 *
 * The distinction is decided once, at mount, by whether `viewport` was
 * supplied. Switching a component between the two mid-life is a React
 * anti-pattern that produces a viewport neither side owns, so the initial mode
 * is remembered rather than re-derived.
 *
 * It takes the navigable extent and the payload's window separately, and uses
 * each for one thing:
 *
 * - **`extent`** clamps. It is the chromosome when the payload can say so, which
 *   is what lets a user zoom back out past a window that was re-fetched narrow.
 * - **`window`** is where an uncontrolled track opens, and what it follows when
 *   the payload moves somewhere else entirely.
 *
 * Opening at the extent instead would start every uncontrolled track zoomed out
 * to the whole chromosome, showing a payload window a few hundred bases wide as
 * a sliver — which is not what a caller handing over one window is asking for.
 */
export interface UseViewportResult {
  viewport: GenomeViewport;
  /** Applies a navigation: clamps it, updates internal state, and reports it. */
  navigate: (next: GenomeViewport) => void;
}

export function useViewport(
  extent: GenomeViewport,
  window: GenomeViewport,
  controlled: GenomeViewport | undefined,
  onChange: ((viewport: GenomeViewport) => void) | undefined
): UseViewportResult {
  const isControlled = useRef(controlled !== undefined).current;
  const [internal, setInternal] = useState<GenomeViewport>(
    () => controlled ?? window
  );

  /**
   * An uncontrolled track follows a payload that moved, but not one that was
   * merely re-fetched.
   *
   * The distinction is what makes zoom-triggered re-fetching work at all. A new
   * window that still overlaps the viewport is the *result* of a zoom — the
   * shell fetching a finer stride for where the user already is — and snapping
   * to it would undo the zoom that asked for it, or fight it frame by frame. A
   * window that does not overlap is a different locus, where the old viewport
   * describes coordinates that are no longer anywhere on screen.
   */
  useEffect(() => {
    if (isControlled) return;

    setInternal((previous) =>
      clampViewport(overlaps(previous, window) ? previous : window, extent)
    );
  }, [extent, window, isControlled]);

  const viewport = isControlled ? (controlled as GenomeViewport) : internal;

  const navigate = useCallback(
    (next: GenomeViewport) => {
      const clamped = clampViewport(next, extent);

      if (!isControlled) setInternal(clamped);

      onChange?.(clamped);
    },
    [extent, isControlled, onChange]
  );

  // Home goes back to the loaded window rather than to the whole chromosome.
  // Zooming out to a chromosome is a fetch; going back to what is already in
  // hand should not be.

  return { navigate, viewport };
}

import { useCallback, useEffect, useRef, useState } from "react";
import { GenomeViewport } from "../GenomeTrack.types";
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
 */
export interface UseViewportResult {
  viewport: GenomeViewport;
  /** Applies a navigation: clamps it, updates internal state, and reports it. */
  navigate: (next: GenomeViewport) => void;
  /** Resets to the payload's full window. */
  reset: () => void;
}

export function useViewport(
  bounds: GenomeViewport,
  controlled: GenomeViewport | undefined,
  onChange: ((viewport: GenomeViewport) => void) | undefined
): UseViewportResult {
  const isControlled = useRef(controlled !== undefined).current;
  const [internal, setInternal] = useState<GenomeViewport>(
    () => controlled ?? bounds
  );

  // An uncontrolled track follows its payload: when a new window arrives —
  // because the model opened a different locus — the old viewport describes
  // coordinates that are no longer on screen. Clamping to the new bounds keeps
  // the two in step without discarding a zoom that still fits.
  useEffect(() => {
    if (isControlled) return;

    setInternal((previous) => clampViewport(previous, bounds));
  }, [bounds, isControlled]);

  const viewport = isControlled ? (controlled as GenomeViewport) : internal;

  const navigate = useCallback(
    (next: GenomeViewport) => {
      const clamped = clampViewport(next, bounds);

      if (!isControlled) setInternal(clamped);

      onChange?.(clamped);
    },
    [bounds, isControlled, onChange]
  );

  const reset = useCallback(() => navigate(bounds), [navigate, bounds]);

  return { navigate, reset, viewport };
}

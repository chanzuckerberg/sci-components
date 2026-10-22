import { useCallback, useEffect, useRef, useState } from "react";
import { GenomeViewport } from "../GenomeTrack.types";
import { overlaps } from "../utils/extent";
import { clampViewport } from "../utils/scale";

export interface UseViewportResult {
  viewport: GenomeViewport;
  /** Applies a navigation: clamps it, updates internal state, and reports it. */
  navigate: (next: GenomeViewport) => void;
}

/**
 * The visible range, controlled or uncontrolled (fixed at mount). Navigation is
 * clamped to `extent`; an uncontrolled track opens at `window`.
 */
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

  // Follow a payload window that moved elsewhere, but not one re-fetched for
  // the current view, which would undo the zoom that requested it.
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

  return { navigate, viewport };
}

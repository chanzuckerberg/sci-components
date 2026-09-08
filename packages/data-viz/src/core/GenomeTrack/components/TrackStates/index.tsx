import { TrackError, TrackKind } from "../../GenomeTrack.types";
import { TrackMessage, TrackMessageTitle, TrackSkeletonRow } from "../../style";

/**
 * The states that replace the plot entirely.
 *
 * Grouped here rather than inlined in the component so the render function is
 * about drawing a track, not about the four ways there might be nothing to
 * draw. Each accepts `density` so a comparison card's placeholder is the size
 * of the card, not the size of a standalone track.
 */

/** Test ids, re-exported through the component's own `TEST_IDS`. */
export const STATE_TEST_IDS = {
  message: "genome-track-message",
  skeleton: "genome-track-skeleton",
} as const;

interface DensityProp {
  density: "comfortable" | "compact";
}

interface SkeletonProps extends DensityProp {
  activationRowHeight: number;
  blockRowHeight: number;
  rulerHeight: number;
  /** Requested rows, so the skeleton is the shape of what is coming. */
  tracks: TrackKind[];
}

/**
 * Loading skeleton shaped like the rows that were asked for.
 *
 * Sizing it from `tracks` rather than using a single grey box means the layout
 * does not jump when the data lands, which matters most in the MCP App where
 * the fetch happens after the iframe is already visible.
 */
export const TrackSkeleton = ({
  activationRowHeight,
  blockRowHeight,
  rulerHeight,
  tracks,
}: SkeletonProps): JSX.Element => (
  <div aria-busy data-testid={STATE_TEST_IDS.skeleton}>
    <TrackSkeletonRow style={{ height: rulerHeight, width: "40%" }} />
    {tracks.map((kind) => (
      <TrackSkeletonRow
        key={kind}
        style={{
          height: kind === "activation" ? activationRowHeight : blockRowHeight,
        }}
      />
    ))}
  </div>
);

interface ErrorProps extends DensityProp {
  error: TrackError;
  /** Copy keyed by error code, owned by the component. */
  copy: Record<string, string>;
}

/**
 * A typed error, rendered as a first-class state.
 *
 * The code chooses the headline and the server's message is shown underneath,
 * so a missing activation cache reads differently from a region that was never
 * precomputed. An unknown code falls back to the server's message alone, which
 * is more useful than a generic apology that hides what happened.
 */
export const TrackErrorState = ({
  copy,
  density,
  error,
}: ErrorProps): JSX.Element => (
  <TrackMessage
    data-testid={STATE_TEST_IDS.message}
    density={density}
    role="alert"
  >
    <div>
      <TrackMessageTitle>
        {copy[error.code] ?? "This track could not be drawn."}
      </TrackMessageTitle>
      {error.message}
    </div>
  </TrackMessage>
);

/** Nothing loaded yet — the state before a launcher has run. */
export const TrackEmptyState = ({ density }: DensityProp): JSX.Element => (
  <TrackMessage data-testid={STATE_TEST_IDS.message} density={density}>
    No region loaded.
  </TrackMessage>
);

import { TrackError, TrackKind } from "../../GenomeTrack.types";
import { TrackMessage, TrackMessageTitle, TrackSkeletonRow } from "../../style";
import { rowLabelHeight } from "../../utils/layout";

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
  blockRowHeight: number;
  featureRowHeight: number;
  /**
   * Everything above a trace's bars: its name and its y axis. One number
   * because the skeleton only needs the row's total height, not the strips.
   */
  featureLabelHeight: number;
  maxFeatureRows: number;
  /** Whether names will occupy a line above each section, so the shape matches. */
  showRowLabels: boolean;
  /** Requested rows, so the skeleton is the shape of what is coming. */
  tracks: TrackKind[];
}

/**
 * Loading skeleton shaped like the rows that were asked for.
 *
 * Sizing it from `tracks` rather than using a single grey box means the layout
 * does not jump when the data lands, which matters most in the MCP App where
 * the fetch happens after the iframe is already visible. The features row is
 * the reason this is worth the trouble: it expands to as many rows as there are
 * traces, so a single placeholder would be short by hundreds of pixels and the
 * page would lurch when the payload arrived.
 */
export const TrackSkeleton = ({
  blockRowHeight,
  density,
  featureLabelHeight,
  featureRowHeight,
  maxFeatureRows,
  showRowLabels,
  tracks,
}: SkeletonProps): JSX.Element => (
  <div aria-busy data-testid={STATE_TEST_IDS.skeleton}>
    {tracks.flatMap((kind) => [
      // A spacer for the section name rather than a bar: the label is text,
      // and a pulsing block where a one-word heading will land reads as
      // content that never arrives. Per kind, because an unnamed section gets
      // no line and the sequence section's line is taller.
      <div
        key={`${kind}-label`}
        style={{ height: rowLabelHeight(kind, density, showRowLabels) }}
      />,
      ...(kind === "features"
        ? Array.from({ length: maxFeatureRows }, (_, index) => (
            <TrackSkeletonRow
              key={`features-${index}`}
              style={{ height: featureRowHeight + featureLabelHeight }}
            />
          ))
        : [<TrackSkeletonRow key={kind} style={{ height: blockRowHeight }} />]),
    ])}
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

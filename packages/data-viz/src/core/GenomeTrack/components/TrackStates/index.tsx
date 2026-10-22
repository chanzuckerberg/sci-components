import { TrackError, TrackKind } from "../../GenomeTrack.types";
import { TrackMessage, TrackMessageTitle, TrackSkeletonRow } from "../../style";
import { rowLabelHeight } from "../../utils/layout";

/** The states that replace the plot entirely. */

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
  /** Height above a trace's bars: its name plus its y axis. */
  featureLabelHeight: number;
  maxFeatureRows: number;
  showRowLabels: boolean;
  tracks: TrackKind[];
}

/** Loading skeleton sized like the requested rows, so layout does not jump. */
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
      // Empty space where the section name will go.
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
  /** Headline copy keyed by error code. */
  copy: Record<string, string>;
}

/** Shows a headline for the error code above the server's message. */
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

export const TrackEmptyState = ({ density }: DensityProp): JSX.Element => (
  <TrackMessage data-testid={STATE_TEST_IDS.message} density={density}>
    No region loaded.
  </TrackMessage>
);

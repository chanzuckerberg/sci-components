import { getMode, getSemanticColors } from "@czi-sds/components";
import { useTheme } from "@mui/material/styles";
import { ForwardedRef, forwardRef, memo, useId, useMemo, useRef } from "react";
import { AccessibleTable } from "./components/AccessibleTable";
import { HitTooltip } from "./components/HitTooltip";
import { RankingDropdown } from "./components/RankingDropdown";
import { SequenceCopyButton } from "./components/SequenceCopyButton";
import {
  STATE_TEST_IDS,
  TrackEmptyState,
  TrackErrorState,
  TrackSkeleton,
} from "./components/TrackStates";
import {
  FeatureOverview,
  GenomeTrackData,
  GenomeTrackProps,
  GenomeViewport,
  TrackKind,
} from "./GenomeTrack.types";
import { useCanvasSize } from "./hooks/useCanvasSize";
import { useRetainedOverview } from "./hooks/useRetainedOverview";
import { useTrackNavigation } from "./hooks/useTrackNavigation";
import { useTrackRenderer } from "./hooks/useTrackRenderer";
import { useViewport } from "./hooks/useViewport";
import {
  TrackBody,
  TrackFeatureLabel,
  TrackHeader,
  TrackHeaderRange,
  TrackHeaderTitle,
  TrackLegend,
  TrackLegendItem,
  TrackLegendSwatch,
  TrackPlot,
  TrackProgress,
  TrackRoot,
  TrackRowLabel,
  VisuallyHidden,
} from "./style";
import { TrackExtents, gestureBounds, trackExtents } from "./utils/extent";
import { featureIdFromSeries, seriesId } from "./utils/hitTest";
import { formatRange, formatResolution, formatSpan } from "./utils/format";
import {
  ACTIVATION_AXIS_HEIGHT,
  FEATURE_LABEL_HEIGHT,
  TrackRow,
  featureLabel,
  featureTraces,
  layoutRows,
} from "./utils/layout";
import { resolvePalette } from "./utils/palette";
import {
  CategoryKey,
  SegmentPalette,
  presentCategories,
  segmentPalette,
} from "./utils/segmentColors";
import { createScale, spanOf } from "./utils/scale";

export * from "./GenomeTrack.types";
export { MIN_SPAN } from "./utils/scale";
export { featureIdFromSeries, seriesId } from "./utils/hitTest";

const DEFAULT_TRACKS: TrackKind[] = [
  "minimap",
  "sequence",
  "annotations",
  "segments",
  "features",
];

function rowKey(row: TrackRow): string {
  return `${row.kind}-${row.traceId ?? row.laneIndex ?? 0}`;
}

/** e.g. "NC_000913.3 45,000–85,000 · 40 kb · 21 bp/point" */
function headerCoordinates(
  data: GenomeTrackData,
  window: GenomeViewport
): string {
  return [
    `${data.locus.chrom} ${formatRange(window.start, window.end)}`,
    formatSpan(spanOf(window)),
    formatResolution(data.bins.stride),
  ]
    .filter((part): part is string => part !== null)
    .join(" · ");
}

function sliceVisible(data: GenomeTrackData, viewport: GenomeViewport): string {
  if (!data.sequence) return "";

  const offset = viewport.start - data.locus.start;

  return data.sequence.slice(
    Math.max(offset, 0),
    Math.max(viewport.end - data.locus.start + 1, 0)
  );
}

/**
 * The selected feature's minimap signal: `feature_overview` when it matches,
 * otherwise the feature's window trace.
 */
function selectedFeatureSignal(
  data: GenomeTrackData | null,
  selectedSeriesId: string | null
): FeatureOverview | null {
  if (!data || !selectedSeriesId) return null;

  const carried = data.feature_overview;

  if (carried && seriesId(carried.feature_id) === selectedSeriesId) {
    return carried;
  }

  const featureId = featureIdFromSeries(selectedSeriesId);
  const trace = featureTraces(data).find(
    (candidate) => candidate.feature_id === featureId
  );

  return trace
    ? { bins: data.bins, feature_id: trace.feature_id, values: trace.values }
    : null;
}

function selectedFeatureId(selectedSeriesId: string | null): number | null {
  return selectedSeriesId ? featureIdFromSeries(selectedSeriesId) : null;
}

function selectedFeatureName(
  data: GenomeTrackData,
  selectedSeriesId: string | null
): string | null {
  const featureId = selectedFeatureId(selectedSeriesId);

  if (featureId === null) return null;

  const trace = featureTraces(data).find(
    (candidate) => candidate.feature_id === featureId
  );

  return trace ? featureLabel(data, trace) : `Feature ${featureId}`;
}

/** The segment categories present in the window. */
function legendFor(
  data: GenomeTrackData | null,
  categories: SegmentPalette
): CategoryKey[] {
  if (!data) return [];

  return presentCategories(data.segments, data.segment_categories, categories);
}

/** The first row of a section, where that section's header controls sit. */
function headerRowFor(rows: TrackRow[], kind: TrackKind): TrackRow | undefined {
  return rows.find((row) => row.kind === kind);
}

/** The category key for the segments row. */
function SegmentLegend({
  items,
  top,
}: {
  items: CategoryKey[];
  top: number | null;
}): JSX.Element | null {
  if (top === null || items.length === 0) return null;

  return (
    <TrackLegend aria-hidden data-testid={TEST_IDS.legend} style={{ top }}>
      {items.map((item) => (
        <TrackLegendItem key={item.name}>
          <TrackLegendSwatch striped={item.striped} swatchColor={item.color} />
          {item.name}
        </TrackLegendItem>
      ))}
    </TrackLegend>
  );
}

/** Section names, each on the line reserved above its rows. */
function RowLabels({ rows }: { rows: TrackRow[] }): JSX.Element {
  return (
    <>
      {rows.map((row, index) =>
        row.label && row.headerHeight ? (
          <TrackRowLabel
            aria-hidden
            key={rowKey(row)}
            style={{
              height: row.headerHeight,
              top: row.y - (row.headerHeight ?? 0),
            }}
            withSeparator={index > 0}
          >
            {row.label}
          </TrackRowLabel>
        ) : null
      )}
    </>
  );
}

/** Feature names, drawn inside the plot above their own bars. */
function FeatureLabels({
  rows,
  selectedTraceId,
}: {
  rows: TrackRow[];
  selectedTraceId: number | null;
}): JSX.Element {
  return (
    <>
      {rows
        .filter((row) => row.traceLabel)
        .map((row) => (
          <TrackFeatureLabel
            aria-hidden
            key={rowKey(row)}
            selected={row.traceId === selectedTraceId}
            style={{ top: row.y }}
          >
            {row.traceLabel}
          </TrackFeatureLabel>
        ))}
    </>
  );
}

/** Test ids for the DOM rendered around the canvas. */
export const TEST_IDS = {
  legend: "genome-track-legend",
  message: STATE_TEST_IDS.message,
  progress: "genome-track-progress",
  range: "genome-track-range",
  root: "genome-track",
  skeleton: STATE_TEST_IDS.skeleton,
  title: "genome-track-title",
} as const;

/** Headlines for known error codes; others show only the server's message. */
const ERROR_COPY: Record<string, string> = {
  dependency_unavailable:
    "Some tracks are unavailable for this genome because the activation cache is not loaded.",
  invalid_input: "That region could not be read.",
  not_found: "This region is not precomputed.",
  rate_limited: "Too many requests. Try again shortly.",
  region_too_large: "That window is too wide to draw. Zoom in and try again.",
  restricted: "This region is restricted.",
};

/**
 * Genome browser track: a shared bp axis with stacked rows for reference
 * annotations, predicted segments, and SAE feature activation. It does no
 * fetching; pan, zoom, and selection are reported to the caller.
 */
const GenomeTrack = forwardRef(
  (props: GenomeTrackProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const {
      blockRowHeight = 16,
      data,
      density = "comfortable",
      disableNavigation = false,
      error = null,
      featureRowHeight = 24,
      loading = false,
      maxAnnotationLanes = 4,
      maxFeatureRows = 8,
      navigationMargin = 1,
      onRankingChange,
      onSelectionChange,
      onViewportChange,
      ranking = "zscore",
      refreshing = false,
      selection = null,
      showRowLabels = true,
      tracks = DEFAULT_TRACKS,
      viewport: controlledViewport,
      ...rest
    } = props;

    const theme = useTheme();
    const palette = useMemo(
      () => resolvePalette(getSemanticColors({ theme })),
      [theme]
    );

    // Depends on `segment_categories`, not `data`, so a new window does not
    // recolour every block.
    const segmentCategories = useMemo(
      () =>
        segmentPalette(data?.segment_categories, getMode({ theme }) === "dark"),
      [data?.segment_categories, theme]
    );

    const legendItems = useMemo(
      () => legendFor(data, segmentCategories),
      [data, segmentCategories]
    );

    const plotRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { dpr, width } = useCanvasSize(plotRef);
    const tableId = `sds-genome-track-${useId()}`;

    // Kept across payloads, which may omit an overview already sent.
    const overview = useRetainedOverview(data);

    const extents = useMemo<TrackExtents>(
      () =>
        data
          ? trackExtents(data, overview, navigationMargin)
          : {
              extent: { end: 1, start: 1 },
              navigable: { end: 1, start: 1 },
              window: { end: 1, start: 1 },
            },
      [data, overview, navigationMargin]
    );

    // Clamped to the whole chromosome; plot gestures are bounded by `bounds`.
    const { navigate, viewport } = useViewport(
      extents.extent,
      extents.window,
      controlledViewport,
      onViewportChange
    );

    const bounds = useMemo(
      () => gestureBounds(extents, viewport, navigationMargin),
      [extents, navigationMargin, viewport]
    );

    const layout = useMemo(
      () =>
        data
          ? layoutRows(data, {
              blockRowHeight,
              density,
              featureRowHeight,
              maxAnnotationLanes,
              maxFeatureRows,
              showRowLabels,
              tracks,
            })
          : {
              annotationOverflow: 0,
              height: 0,
              rows: [],
              segmentLegendY: null,
            },
      [
        data,
        blockRowHeight,
        density,
        featureRowHeight,
        maxAnnotationLanes,
        maxFeatureRows,
        showRowLabels,
        tracks,
      ]
    );

    const scale = useMemo(
      () => createScale(viewport, width),
      [viewport, width]
    );

    const selectedBlockId = selection?.kind === "block" ? selection.id : null;
    const selectedSeriesId = selection?.kind === "series" ? selection.id : null;

    // Memoized so the canvas does not redraw on every render.
    const featureOverview = useMemo(
      () => selectedFeatureSignal(data, selectedSeriesId),
      [data, selectedSeriesId]
    );
    const selectedTraceId = selectedFeatureId(selectedSeriesId);

    const { handlers, hit, isDragging } = useTrackNavigation({
      bounds,
      data,
      disabled: disableNavigation,
      extent: extents.extent,
      navigate,
      onSelectionChange,
      plotRef,
      rows: layout.rows,
      scale,
      // A second click on the selected block or feature clears it.
      selectedId: selectedBlockId ?? selectedSeriesId,
      viewport,
    });

    useTrackRenderer({
      canvasRef,
      data,
      density,
      dpr,
      extents,
      featureOverview,
      height: layout.height,
      hoveredId: hit?.id ?? null,
      palette,
      rows: layout.rows,
      scale,
      segmentCategories,
      selectedId: selectedBlockId,
      width,
    });

    if (loading) {
      return (
        <TrackRoot data-testid={TEST_IDS.root} ref={ref} {...rest}>
          <TrackSkeleton
            blockRowHeight={blockRowHeight}
            density={density}
            featureLabelHeight={
              FEATURE_LABEL_HEIGHT[density] + ACTIVATION_AXIS_HEIGHT[density]
            }
            featureRowHeight={featureRowHeight}
            maxFeatureRows={maxFeatureRows}
            showRowLabels={showRowLabels}
            tracks={tracks}
          />
        </TrackRoot>
      );
    }

    if (error) {
      return (
        <TrackRoot data-testid={TEST_IDS.root} ref={ref} {...rest}>
          <TrackErrorState copy={ERROR_COPY} density={density} error={error} />
        </TrackRoot>
      );
    }

    if (!data) {
      return (
        <TrackRoot data-testid={TEST_IDS.root} ref={ref} {...rest}>
          <TrackEmptyState density={density} />
        </TrackRoot>
      );
    }

    const { locus } = data;
    const organism = locus.organism_label ?? locus.organism;
    const range = formatRange(viewport.start, viewport.end);
    const coordinates = headerCoordinates(data, extents.window);

    const tooltipRow = hit ? layout.rows[hit.rowIndex] : undefined;

    const sequenceRow = headerRowFor(layout.rows, "sequence");
    const featuresHeader = headerRowFor(layout.rows, "features");
    const visibleSequence = sliceVisible(data, viewport);

    return (
      <TrackRoot data-testid={TEST_IDS.root} ref={ref} {...rest}>
        <TrackHeader>
          <TrackHeaderTitle data-testid={TEST_IDS.title}>
            {[locus.gene, organism, selectedFeatureName(data, selectedSeriesId)]
              .filter(Boolean)
              .join(" · ")}
          </TrackHeaderTitle>
          <TrackHeaderRange data-testid={TEST_IDS.range}>
            {coordinates}
          </TrackHeaderRange>
        </TrackHeader>

        <TrackBody>
          <TrackPlot
            aria-busy={refreshing || undefined}
            aria-describedby={tableId}
            aria-label={`Genome track for ${organism}, ${locus.chrom} ${range}`}
            interactive={!disableNavigation}
            isDragging={isDragging}
            ref={plotRef}
            role="img"
            // Pointer cursor only when a click would do something.
            selectable={hit !== null && onSelectionChange !== undefined}
            tabIndex={0}
            {...handlers}
          >
            <canvas ref={canvasRef} />

            {refreshing && <TrackProgress data-testid={TEST_IDS.progress} />}

            <RowLabels rows={layout.rows} />
            <FeatureLabels
              rows={layout.rows}
              selectedTraceId={selectedTraceId}
            />
            <SegmentLegend items={legendItems} top={layout.segmentLegendY} />

            {hit && tooltipRow && (
              <HitTooltip
                hit={hit}
                row={tooltipRow}
                scale={scale}
                width={width}
              />
            )}
          </TrackPlot>

          {featuresHeader && onRankingChange && (
            <RankingDropdown
              height={featuresHeader.headerHeight || featuresHeader.height}
              onChange={onRankingChange}
              top={featuresHeader.y - (featuresHeader.headerHeight ?? 0)}
              value={ranking}
            />
          )}

          {sequenceRow && visibleSequence && (
            <SequenceCopyButton
              density={density}
              fullRange={formatRange(extents.window.start, extents.window.end)}
              fullSequence={data.sequence ?? ""}
              // On the section's header line, or centred on the row if none.
              height={sequenceRow.headerHeight || sequenceRow.height}
              top={sequenceRow.y - (sequenceRow.headerHeight ?? 0)}
              visibleRange={range}
              visibleSequence={visibleSequence}
            />
          )}
        </TrackBody>

        <VisuallyHidden>
          <AccessibleTable
            annotationOverflow={layout.annotationOverflow}
            data={data}
            id={tableId}
            rows={layout.rows}
          />
        </VisuallyHidden>
      </TrackRoot>
    );
  }
);

export default memo(GenomeTrack);

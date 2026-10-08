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

/**
 * The header's coordinate readout.
 *
 * ex: NC_000913.3 45,000–85,000 · 40 kb · 21 bp/point
 */
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

/**
 * The slice of sequence visible at the current zoom level
 */
function sliceVisible(data: GenomeTrackData, viewport: GenomeViewport): string {
  if (!data.sequence) return "";

  const offset = viewport.start - data.locus.start;

  return data.sequence.slice(
    Math.max(offset, 0),
    Math.max(viewport.end - data.locus.start + 1, 0)
  );
}

/**
 * The selected feature's activation for the minimap, or null when nothing is
 * selected. Prefers the chromosome-wide `feature_overview`, and falls back to
 * the feature's own window trace when there is none.
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

/**
 * The selected trace's `feature_id`, or null when no feature is selected.
 */
function selectedFeatureId(selectedSeriesId: string | null): number | null {
  return selectedSeriesId ? featureIdFromSeries(selectedSeriesId) : null;
}

/**
 * Display name for the selected feature, or null when none is selected.
 */
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

/** The categories the window actually contains, or none without a payload. */
function legendFor(
  data: GenomeTrackData | null,
  categories: SegmentPalette
): CategoryKey[] {
  if (!data) return [];

  return presentCategories(data.segments, data.segment_categories, categories);
}

/**
 * The first row of a section, which is where a control mounted on that
 * section's line — the ranking dropdown, the sequence copy button — positions
 * itself.
 */
function headerRowFor(rows: TrackRow[], kind: TrackKind): TrackRow | undefined {
  return rows.find((row) => row.kind === kind);
}

/**
 * The category key for the segments row.
 */
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

/**
 * Section names, each on the line the layout reserved above its rows.
 */
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

/**
 * Feature names, drawn inside the plot above their own bars.
 *
 * The one label that does not sit on a section's header line: there is one name
 * per trace and only one header per section.
 */
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

/**
 * Test ids for the DOM the component renders around the canvas.
 *
 * Exported rather than left as string literals because these are the only way a
 * consumer can assert on this component: the plot is a canvas, so there is no
 * accessible node for a gene block or a trace value. Everything a test can read
 * comes from the header, the states, or the accessible table.
 */
export const TEST_IDS = {
  legend: "genome-track-legend",
  // Taken from `TrackStates` rather than retyped: those two ids are what that
  // module actually renders, so a literal here that drifted from it would make
  // an assertion silently query nothing.
  message: STATE_TEST_IDS.message,
  progress: "genome-track-progress",
  range: "genome-track-range",
  root: "genome-track",
  skeleton: STATE_TEST_IDS.skeleton,
  title: "genome-track-title",
} as const;

/**
 * Copy for the error codes the component renders as first-class states.
 *
 * Anything not listed falls back to the server's own message, which is more
 * useful than a generic apology that hides what happened.
 */
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
 * annotations, predicted segments, and SAE feature activation.
 *
 * The component is presentational and does no I/O. It takes a window of data
 * and reports what the user did to it — pan, zoom, select — leaving the caller
 * to decide whether that means a re-fetch. That is what lets one implementation
 * serve a React app, an MCP App iframe, and a static HTML snapshot: only the
 * shell around it changes.
 *
 * Rendering is a single 2D canvas with a DOM overlay, rather than a charting
 * library. A genome axis is not a cartesian chart — 1-based inclusive ranges,
 * strand-aware glyphs, and a viewport shared across stacked rows would all have
 * to be reimplemented on top of one — and a dozen chart instances for a dozen
 * rows costs a dozen resize observers for what is one coordinate system drawn
 * repeatedly.
 *
 * Text stays in the DOM wherever it can. Canvas text is invisible to
 * find-in-page, unselectable, and ignores a reader's font settings, so the
 * header, the row labels, the tooltip, and the accessible table are all real
 * elements; only tick labels and on-block labels are drawn.
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

    /**
     * Category colours for the segments row.
     *
     * Rebuilt when the theme mode changes as well as when the enum does: the
     * SDS generator reverses its ramp for dark mode, so the colours are a
     * function of both. Keyed off `segment_categories` rather than `data` so a
     * window re-fetch does not repaint every block — the enum is global and
     * does not change when the window does.
     */
    const segmentCategories = useMemo(
      () =>
        segmentPalette(data?.segment_categories, getMode({ theme }) === "dark"),
      [data?.segment_categories, theme]
    );

    /**
     * The legend's entries, which change only with the payload.
     *
     * Memoized because `presentCategories` builds a set over every segment —
     * thousands at a wide window — and the component re-renders on every
     * pointer move and every pan frame. Computed inline it also handed the
     * legend a fresh array each time, re-rendering it for a list that had not
     * changed.
     */
    const legendItems = useMemo(
      () => legendFor(data, segmentCategories),
      [data, segmentCategories]
    );

    const plotRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { dpr, width } = useCanvasSize(plotRef);
    const tableId = `sds-genome-track-${useId()}`;

    // Retained across window re-fetches: the overview is chromosome-scale, so
    // a shell fetches it once per accession and omits it thereafter.
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

    // Clamped to the chromosome, not the navigable halo: the minimap travels
    // the whole extent, and each plot gesture applies `gestureBounds` itself.
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

    // Blocks and feature traces are both selectable, and the two uses differ:
    // the renderer outlines a selected *block*, while navigation only needs to
    // know which id is currently selected so a second click toggles it off.
    const selectedBlockId = selection?.kind === "block" ? selection.id : null;
    const selectedSeriesId = selection?.kind === "series" ? selection.id : null;

    // Memoized because the fallback returns a fresh object, and the canvas
    // effect lists this in its dependencies — an unstable identity would
    // redraw the whole plot on every render, including every pointer move.
    const featureOverview = useMemo(
      () => selectedFeatureSignal(data, selectedSeriesId),
      [data, selectedSeriesId]
    );
    const selectedTraceId = selectedFeatureId(selectedSeriesId);

    const { handlers, hit, isDragging } = useTrackNavigation({
      // The loaded window plus its margin, not the whole chromosome: zooming
      // out of a re-fetched window has to work, but outrunning the data by an
      // unbounded factor squeezes every row into a sliver.
      bounds,
      data,
      disabled: disableNavigation,
      // What the minimap's bar spans, so its band can be dragged along it.
      extent: extents.extent,
      navigate,
      onSelectionChange,
      plotRef,
      rows: layout.rows,
      scale,
      // Any kind, so a second click on the same block or feature clears it.
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
              // Name plus y axis: the two strips the layout puts above the
              // bars, so the skeleton is the height the data will land at.
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

    // The hit names its own row by index, which is the only thing that works
    // once the features stack means several rows share a kind.
    const tooltipRow = hit ? layout.rows[hit.rowIndex] : undefined;

    const sequenceRow = headerRowFor(layout.rows, "sequence");
    const featuresHeader = headerRowFor(layout.rows, "features");
    const visibleSequence = sliceVisible(data, viewport);

    return (
      <TrackRoot data-testid={TEST_IDS.root} ref={ref} {...rest}>
        <TrackHeader>
          <TrackHeaderTitle data-testid={TEST_IDS.title}>
            {/*
             * Gene, organism, and the selected feature, whichever of the
             * three there are. Joined from a filtered list rather than
             * nested ternaries, which is what keeps the separators right as
             * parts come and go.
             */}
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
            // Only when a click would do something: the selection callbacks are
            // optional, and a hand over a plot nobody is listening to promises
            // an interaction that cannot happen.
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
              // On the section's own header line, beside its name. Falls back
              // to centring on the row when labels are off, where there is no
              // header line to sit on.
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

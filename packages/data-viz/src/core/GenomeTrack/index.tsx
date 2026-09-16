import { getMode, getSemanticColors } from "@czi-sds/components";
import { useTheme } from "@mui/material/styles";
import { ForwardedRef, forwardRef, memo, useId, useMemo, useRef } from "react";
import { AccessibleTable } from "./components/AccessibleTable";
import { HitTooltip } from "./components/HitTooltip";
import { RankingDropdown } from "./components/RankingDropdown";
import { SequenceCopyButton } from "./components/SequenceCopyButton";
import {
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
import { TrackExtents, trackExtents, uncoveredRanges } from "./utils/extent";
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
  presentCategories,
  segmentPalette,
} from "./utils/segmentColors";
import { createScale, spanOf } from "./utils/scale";

export * from "./GenomeTrack.types";
export { MIN_SPAN } from "./utils/scale";
/**
 * A `"series"` selection's id is opaque to the caller by design, but a shell
 * has to turn one back into a feature to fetch its chromosome-wide trace — so
 * both directions of the mapping are public rather than reimplemented by hand.
 */
export { featureIdFromSeries, seriesId } from "./utils/hitTest";

/**
 * Rows a caller gets without asking, in the order the designs stack them.
 *
 * The sequence row drops itself on a window too wide to carry one, so a default
 * that includes it costs nothing on a 40 kb view.
 */
const DEFAULT_TRACKS: TrackKind[] = [
  "minimap",
  "sequence",
  "annotations",
  "segments",
  "features",
];

/**
 * A row's key for React.
 *
 * Kind alone stopped being unique when the features row became a stack of
 * several rows sharing one kind, and the annotations row became a second such
 * stack. Both sub-row indices are folded in because a row has at most one.
 */
function rowKey(row: TrackRow): string {
  // A feature row is keyed by identity rather than position: the payload ranks
  // by score within the window, so a re-fetch can put a different feature at
  // the same index, and a positional key would reuse the row across the change.
  return `${row.kind}-${row.traceId ?? row.laneIndex ?? 0}`;
}

/**
 * The header's coordinate readout.
 *
 * Four facts, each included only when it changes what the plot means:
 *
 * - the visible range and its span, always;
 * - the pooled stride, whenever it is above 1. Zooming a pooled window
 *   magnifies bins rather than sharpening them, so a 24 bp view drawn from
 *   21 bp points looks exactly like one drawn from 24 bases, and nothing else
 *   on screen distinguishes them;
 * - which part of the view is loaded, once the viewport can leave the payload.
 *   That is the text half of what the wash and the minimap's outline say
 *   visually — and the only half a screen reader gets, since both are canvas.
 */
function headerCoordinates(
  data: GenomeTrackData,
  viewport: GenomeViewport,
  window: GenomeViewport
): string {
  const loaded =
    uncoveredRanges(viewport, window).length > 0
      ? `${formatRange(window.start, window.end)} loaded`
      : null;

  return [
    `${data.locus.chrom} ${formatRange(viewport.start, viewport.end)}`,
    formatSpan(spanOf(viewport)),
    formatResolution(data.bins.stride),
    loaded,
  ]
    .filter((part): part is string => part !== null)
    .join(" · ");
}

/**
 * The letters actually on screen, which is what the copy control offers as its
 * visible range.
 *
 * Clamped through `Math.max` because a controlled viewport can be handed
 * coordinates outside the payload before the two agree — and now routinely is,
 * since the viewport may sit past the loaded window by design. Both clamps
 * collapse to an empty string when the viewport misses the sequence entirely,
 * which the caller reads as "no control to draw".
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
 * The selected feature's chromosome-wide trace, or null.
 *
 * Null unless the payload's `feature_overview` is for the feature currently
 * selected. The two arrive separately — the selection is immediate, the trace
 * is a fetch — so between a click and its response the payload still holds the
 * *previous* feature's trace. Drawing that under the new selection would
 * attribute one feature's activation to another, which is the kind of wrong
 * that looks entirely plausible.
 */
function matchedFeatureOverview(
  data: GenomeTrackData | null,
  selectedSeriesId: string | null
): FeatureOverview | null {
  const carried = data?.feature_overview;

  if (!carried || !selectedSeriesId) return null;

  return selectedSeriesId === seriesId(carried.feature_id) ? carried : null;
}

/**
 * The selected trace's `feature_id`, or null when no feature is selected.
 *
 * Resolved once rather than per row: the labels compare it against
 * `row.traceId`, and parsing the series id inside that loop would re-run a
 * regex for every trace on every render.
 */
function selectedFeatureId(selectedSeriesId: string | null): number | null {
  return selectedSeriesId ? featureIdFromSeries(selectedSeriesId) : null;
}

/**
 * Display name for the selected feature, or null when none is selected.
 *
 * Reported whenever a feature is *selected*, not only when its chromosome-wide
 * trace has arrived: the header is saying what the user picked, and a label
 * that appeared a round trip after the click would read as the click having
 * missed.
 *
 * Falls back to the bare `Feature 13492` when the selected feature is not in
 * the payload, which a re-fetch can cause — the features are ranked within the
 * window, so panning can drop the one that is selected while the minimap is
 * still drawing its trace. Naming it from the id keeps the header and the
 * minimap agreeing about whose signal is on screen.
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

/**
 * The row carrying a section's header line, or undefined when it has none.
 *
 * Only the first row of a section has a header, so this is how a control
 * mounted on that line — the ranking dropdown, the sequence copy button —
 * finds the band to position itself in.
 */
function headerRowFor(rows: TrackRow[], kind: TrackKind): TrackRow | undefined {
  return rows.find((row) => row.kind === kind && row.headerHeight);
}

/**
 * The category key for the segments row.
 *
 * Lists only the categories the window actually contains, in the enum's order
 * — the server's most-common-first ordering — so the entries do not reshuffle
 * as the user pans.
 *
 * Not the SDS `Legend`, and that is a deliberate trade. `Legend` takes a colour
 * per item and cannot express a *pattern*, so `+CDS` and `-CDS` would come out
 * as two identical swatches with different names, which is worse than no key.
 * The colours are still SDS's generator; only the swatch is local.
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
 *
 * `aria-hidden` because these are inside the plot's `role="img"`, whose
 * contents assistive technology does not expose in any case — the accessible
 * table is what describes the track, and it names every row it draws. They are
 * still DOM text rather than canvas text for the reason all the component's
 * text is: canvas text is invisible to find-in-page and ignores a reader's font
 * settings.
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
            // A rule needs something above it to rule off. Tested against the
            // row list rather than the labelled subset, so the sequence
            // section is still separated from the unnamed minimap above it.
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
  message: "genome-track-message",
  progress: "genome-track-progress",
  range: "genome-track-range",
  root: "genome-track",
  skeleton: "genome-track-skeleton",
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
              isChromosome: false,
              navigable: { end: 1, start: 1 },
              window: { end: 1, start: 1 },
            },
      [data, overview, navigationMargin]
    );

    const { navigate, viewport } = useViewport(
      extents.navigable,
      extents.window,
      controlledViewport,
      onViewportChange
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

    const featureOverview = matchedFeatureOverview(data, selectedSeriesId);
    const selectedTraceId = selectedFeatureId(selectedSeriesId);

    const { handlers, hit, isDragging } = useTrackNavigation({
      // The loaded window plus its margin, not the whole chromosome: zooming
      // out of a re-fetched window has to work, but outrunning the data by an
      // unbounded factor squeezes every row into a sliver.
      bounds: extents.navigable,
      data,
      disabled: disableNavigation,
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
    const coordinates = headerCoordinates(data, viewport, extents.window);

    // The hit names its own row by index, which is the only thing that works
    // once the features stack means several rows share a kind.
    const tooltipRow = hit ? layout.rows[hit.rowIndex] : undefined;

    const sequenceRow = layout.rows.find((row) => row.kind === "sequence");
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
            <SegmentLegend
              items={presentCategories(
                data.segments,
                data.segment_categories,
                segmentCategories
              )}
              top={layout.segmentLegendY}
            />

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
              height={featuresHeader.headerHeight ?? 0}
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

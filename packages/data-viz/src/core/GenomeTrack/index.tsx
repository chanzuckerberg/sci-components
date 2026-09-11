import { getSemanticColors } from "@czi-sds/components";
import { useTheme } from "@mui/material/styles";
import { ForwardedRef, forwardRef, memo, useId, useMemo, useRef } from "react";
import { AccessibleTable } from "./components/AccessibleTable";
import { HitTooltip } from "./components/HitTooltip";
import { SequenceCopyButton } from "./components/SequenceCopyButton";
import {
  TrackEmptyState,
  TrackErrorState,
  TrackSkeleton,
} from "./components/TrackStates";
import {
  GenomeTrackProps,
  GenomeViewport,
  TrackKind,
} from "./GenomeTrack.types";
import { useCanvasSize } from "./hooks/useCanvasSize";
import { useTrackNavigation } from "./hooks/useTrackNavigation";
import { useTrackRenderer } from "./hooks/useTrackRenderer";
import { useViewport } from "./hooks/useViewport";
import {
  TrackBody,
  TrackFeatureLabel,
  TrackGutter,
  TrackGutterLabel,
  TrackHeader,
  TrackHeaderRange,
  TrackHeaderTitle,
  TrackPlot,
  TrackRoot,
  VisuallyHidden,
} from "./style";
import { formatRange, formatResolution, formatSpan } from "./utils/format";
import { FEATURE_LABEL_HEIGHT, TrackRow, layoutRows } from "./utils/layout";
import { resolvePalette } from "./utils/palette";
import { createScale, spanOf } from "./utils/scale";

export * from "./GenomeTrack.types";
export { MIN_SPAN } from "./utils/scale";

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
 * several rows sharing one kind.
 */
function rowKey(row: TrackRow): string {
  return `${row.kind}-${row.traceIndex ?? 0}`;
}

/** Row names down the left edge, positioned against the layout's offsets. */
function GutterLabels({ rows }: { rows: TrackRow[] }): JSX.Element {
  return (
    <>
      {rows
        .filter((row) => row.label)
        .map((row) => (
          <TrackGutterLabel key={rowKey(row)} style={{ top: row.y }}>
            {row.label}
          </TrackGutterLabel>
        ))}
    </>
  );
}

/**
 * Feature names, drawn inside the plot above their own bars.
 *
 * The one row label that cannot live in the gutter: a feature name runs to
 * forty characters and the gutter is under a hundred pixels wide.
 */
function FeatureLabels({ rows }: { rows: TrackRow[] }): JSX.Element {
  return (
    <>
      {rows
        .filter((row) => row.traceLabel)
        .map((row) => (
          <TrackFeatureLabel
            aria-hidden
            key={rowKey(row)}
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
  message: "genome-track-message",
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
      blockRowHeight = 28,
      data,
      density = "comfortable",
      disableNavigation = false,
      error = null,
      featureRowHeight = 24,
      labelWidth = 96,
      loading = false,
      maxFeatureRows = 8,
      onSelectionChange,
      onViewportChange,
      selection = null,
      tracks = DEFAULT_TRACKS,
      viewport: controlledViewport,
      ...rest
    } = props;

    const theme = useTheme();
    const palette = useMemo(
      () => resolvePalette(getSemanticColors({ theme })),
      [theme]
    );

    const plotRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { dpr, width } = useCanvasSize(plotRef);
    const tableId = `sds-genome-track-${useId()}`;

    const bounds = useMemo<GenomeViewport>(
      () =>
        data
          ? { end: data.locus.end, start: data.locus.start }
          : { end: 1, start: 1 },
      [data]
    );

    const { navigate, viewport } = useViewport(
      bounds,
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
              maxFeatureRows,
              tracks,
            })
          : { height: 0, rows: [] },
      [data, blockRowHeight, density, featureRowHeight, maxFeatureRows, tracks]
    );

    const scale = useMemo(
      () => createScale(viewport, width),
      [viewport, width]
    );

    const selectedId = selection?.kind === "block" ? selection.id : null;

    const { handlers, hit, isDragging } = useTrackNavigation({
      bounds,
      data,
      disabled: disableNavigation,
      navigate,
      onSelectionChange,
      plotRef,
      rows: layout.rows,
      scale,
      selectedId,
      viewport,
    });

    useTrackRenderer({
      canvasRef,
      data,
      density,
      dpr,
      height: layout.height,
      hoveredId: hit?.id ?? null,
      palette,
      rows: layout.rows,
      scale,
      selectedId,
      width,
    });

    if (loading) {
      return (
        <TrackRoot data-testid={TEST_IDS.root} ref={ref} {...rest}>
          <TrackSkeleton
            blockRowHeight={blockRowHeight}
            density={density}
            featureLabelHeight={FEATURE_LABEL_HEIGHT[density]}
            featureRowHeight={featureRowHeight}
            maxFeatureRows={maxFeatureRows}
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

    // Resolution is dropped rather than shown as "1 bp/point" on an unpooled
    // window, so the readout appears only where it changes what the plot means.
    const coordinates = [
      `${locus.chrom} ${range}`,
      formatSpan(spanOf(viewport)),
      formatResolution(data.bins.stride),
    ]
      .filter((part): part is string => part !== null)
      .join(" · ");

    // The hit names its own row by index, which is the only thing that works
    // once the features stack means several rows share a kind.
    const tooltipRow = hit ? layout.rows[hit.rowIndex] : undefined;

    const sequenceRow = layout.rows.find((row) => row.kind === "sequence");
    // The letters actually on screen, which is what the copy control offers.
    // Clamped through `Math.max` because a controlled viewport can be handed
    // coordinates outside the payload before the two agree.
    const visibleSequence = data.sequence
      ? data.sequence.slice(
          Math.max(viewport.start - locus.start, 0),
          Math.max(viewport.end - locus.start + 1, 0)
        )
      : "";

    return (
      <TrackRoot data-testid={TEST_IDS.root} ref={ref} {...rest}>
        <TrackHeader>
          <TrackHeaderTitle data-testid={TEST_IDS.title}>
            {locus.gene ? `${locus.gene} · ${organism}` : organism}
          </TrackHeaderTitle>
          <TrackHeaderRange data-testid={TEST_IDS.range}>
            {coordinates}
          </TrackHeaderRange>
        </TrackHeader>

        <TrackBody>
          {labelWidth > 0 && (
            <TrackGutter aria-hidden density={density} labelWidth={labelWidth}>
              <GutterLabels rows={layout.rows} />
            </TrackGutter>
          )}

          <TrackPlot
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

            <FeatureLabels rows={layout.rows} />

            {hit && tooltipRow && (
              <HitTooltip
                hit={hit}
                row={tooltipRow}
                scale={scale}
                width={width}
              />
            )}
          </TrackPlot>

          {sequenceRow && visibleSequence && (
            <SequenceCopyButton
              height={sequenceRow.height}
              range={range}
              sequence={visibleSequence}
              top={sequenceRow.y}
            />
          )}
        </TrackBody>

        <VisuallyHidden>
          <AccessibleTable data={data} id={tableId} rows={layout.rows} />
        </VisuallyHidden>
      </TrackRoot>
    );
  }
);

export default memo(GenomeTrack);

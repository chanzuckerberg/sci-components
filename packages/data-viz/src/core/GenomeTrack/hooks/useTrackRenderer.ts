import { RefObject, useEffect } from "react";
import {
  FeatureOverview,
  FeatureTrace,
  GenomeTrackData,
} from "../GenomeTrack.types";
import {
  DrawContext,
  drawAnnotations,
  drawFeatureBars,
  drawMinimap,
  drawOutsideWindow,
  drawSegments,
  drawSequence,
} from "../renderers";
import { TrackExtents, uncoveredRanges } from "../utils/extent";
import { TrackRow, featureTraces, viewportBands } from "../utils/layout";
import { TrackPalette } from "../utils/palette";
import { GenomeScale } from "../utils/scale";
import { SegmentPalette } from "../utils/segmentColors";

/** Options for `useTrackRenderer`, which draws every row onto the canvas. */
export interface UseTrackRendererOptions {
  canvasRef: RefObject<HTMLCanvasElement>;
  data: GenomeTrackData | null;
  density: "comfortable" | "compact";
  dpr: number;
  /** The navigable extent and the window the payload covers. */
  extents: TrackExtents;
  /** The selected feature's chromosome-wide trace; null draws no signal. */
  featureOverview: FeatureOverview | null;
  /** Total canvas height, from the layout pass. */
  height: number;
  /** Category colours for the segments row. */
  segmentCategories: SegmentPalette;
  hoveredId: string | null;
  palette: TrackPalette;
  rows: TrackRow[];
  scale: GenomeScale;
  selectedId: string | null;
  width: number;
}

/** Dispatches one row to its draw pass. */
function drawRow(
  draw: DrawContext,
  data: GenomeTrackData,
  extents: TrackExtents,
  featureOverview: FeatureOverview | null,
  segmentCategories: SegmentPalette,
  traces: FeatureTrace[]
): void {
  switch (draw.row.kind) {
    case "annotations":
      // Each annotation row is one packed lane and carries its own blocks.
      drawAnnotations(draw, draw.row.laneBlocks ?? []);
      break;
    case "features": {
      const trace = traces[draw.row.traceIndex ?? 0];

      if (trace) drawFeatureBars(draw, trace, data.bins);
      break;
    }
    case "minimap":
      drawMinimap(draw, {
        extent: extents.extent,
        feature: featureOverview,
      });
      break;
    case "segments":
      // Same list, sorted by `end`, that the hit-test uses.
      drawSegments(
        draw,
        draw.row.segmentBlocks ?? data.segments,
        segmentCategories
      );
      break;
    case "sequence":
      if (data.sequence) drawSequence(draw, data.sequence, data.locus.start);
      break;
    default:
      break;
  }
}

export function useTrackRenderer(options: UseTrackRendererOptions): void {
  const {
    canvasRef,
    data,
    density,
    dpr,
    extents,
    featureOverview,
    height,
    hoveredId,
    palette,
    rows,
    scale,
    segmentCategories,
    selectedId,
    width,
  } = options;

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !data || width === 0) return;

    const ctx = canvas.getContext("2d");

    // Null under jsdom.
    if (!ctx) return;

    // Backing store in device pixels, drawing in CSS pixels. Only assign on a
    // real change: setting `canvas.width`/`.height` reallocates the bitmap even
    // when the value is the same.
    const backingWidth = Math.round(width * dpr);
    const backingHeight = Math.round(height * dpr);

    if (canvas.width !== backingWidth) canvas.width = backingWidth;
    if (canvas.height !== backingHeight) canvas.height = backingHeight;
    if (canvas.style.height !== `${height}px`) {
      canvas.style.height = `${height}px`;
    }

    // Always reset: resizing the canvas clears the transform.
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const base: Omit<DrawContext, "row"> = {
      ctx,
      density,
      hoveredId,
      palette,
      scale,
      selectedId,
    };

    const traces = featureTraces(data);

    rows.forEach((row) =>
      drawRow(
        { ...base, row },
        data,
        extents,
        featureOverview,
        segmentCategories,
        traces
      )
    );

    // Last, so the wash sits over the rows.
    drawOutsideWindow(
      ctx,
      palette,
      scale,
      viewportBands(rows),
      uncoveredRanges(scale, extents.window)
    );
  }, [
    canvasRef,
    data,
    density,
    dpr,
    extents,
    featureOverview,
    height,
    hoveredId,
    palette,
    rows,
    scale,
    segmentCategories,
    selectedId,
    width,
  ]);
}

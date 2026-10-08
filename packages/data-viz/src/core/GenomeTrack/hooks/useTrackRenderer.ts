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

/**
 * Drives the canvas.
 *
 * Kept out of the component for two reasons. It is the only imperative code in
 * the component, so isolating it keeps the render function declarative; and it
 * has a long, precise dependency list — miss one and the canvas silently shows
 * stale data, which is far harder to notice than a stale DOM node.
 */
export interface UseTrackRendererOptions {
  canvasRef: RefObject<HTMLCanvasElement>;
  data: GenomeTrackData | null;
  density: "comfortable" | "compact";
  dpr: number;
  /** The navigable extent and the window the payload covers. */
  extents: TrackExtents;
  /**
   * The selected feature's chromosome-wide trace, already matched against the
   * selection. Null draws the minimap with no signal in it.
   */
  featureOverview: FeatureOverview | null;
  /** Total canvas height, from the layout pass. */
  height: number;
  /** Category colours for the segments row, from the payload's full enum. */
  segmentCategories: SegmentPalette;
  hoveredId: string | null;
  palette: TrackPalette;
  rows: TrackRow[];
  scale: GenomeScale;
  selectedId: string | null;
  width: number;
}

/**
 * Dispatches one row to its draw pass.
 *
 * Outside the effect so the effect stays a list of dependencies and a loop:
 * every row kind that lands adds a case here rather than another branch inside
 * the hook.
 */
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
      // One lane's worth, not the whole payload: the row is one of several
      // lanes the layout packed the annotations into, and it carries its own.
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
      // The row's own blocks, sorted by `end` in the layout pass, so the canvas
      // and the hit-test are looking at one list rather than two orderings.
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

    // jsdom returns null here. Bailing out rather than throwing is what lets
    // the component render its DOM — header, accessible table, states — under
    // test, which is the part worth asserting on anyway.
    if (!ctx) return;

    // Size the backing store in device pixels and the element in CSS pixels,
    // then scale the context once. Everything downstream works in CSS pixels
    // without knowing the ratio.
    //
    // Only on an actual size change. Assigning `canvas.width` or `.height`
    // discards and re-zeroes the whole bitmap *even when the value is
    // unchanged* — at 1200 px × dpr 2 over a 600 px track that is an ~11 MB
    // allocation, and this effect re-runs on every pan frame and every hover.
    // `clearRect` below is what actually needs to happen per frame.
    const backingWidth = Math.round(width * dpr);
    const backingHeight = Math.round(height * dpr);

    if (canvas.width !== backingWidth) canvas.width = backingWidth;
    if (canvas.height !== backingHeight) canvas.height = backingHeight;
    if (canvas.style.height !== `${height}px`) {
      canvas.style.height = `${height}px`;
    }

    // Unconditional: a resize above resets the context's transform, and
    // re-setting it when nothing resized costs nothing.
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

    // Once, not per features row: `featureTraces` concatenates `pinned` and
    // `features`, and the stack calls `drawRow` once per trace.
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

    // Last, so the wash sits over every row it applies to rather than under
    // the blocks it is meant to explain the absence of.
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

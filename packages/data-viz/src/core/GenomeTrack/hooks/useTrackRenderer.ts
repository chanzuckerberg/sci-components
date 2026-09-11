import { RefObject, useEffect } from "react";
import { GenomeTrackData } from "../GenomeTrack.types";
import {
  DrawContext,
  drawAnnotations,
  drawFeatureBars,
  drawMinimap,
  drawSegments,
  drawSequence,
} from "../renderers";
import { TrackRow, featureTraces } from "../utils/layout";
import { TrackPalette } from "../utils/palette";
import { GenomeScale } from "../utils/scale";

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
  /** Total canvas height, from the layout pass. */
  height: number;
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
function drawRow(draw: DrawContext, data: GenomeTrackData): void {
  switch (draw.row.kind) {
    case "annotations":
      drawAnnotations(draw, data.annotations ?? []);
      break;
    case "features": {
      const trace = featureTraces(data)[draw.row.traceIndex ?? 0];

      if (trace) drawFeatureBars(draw, trace, data.bins);
      break;
    }
    case "minimap":
      // The payload's window is the extent the viewport is placed inside.
      drawMinimap(draw, { end: data.locus.end, start: data.locus.start });
      break;
    case "segments":
      drawSegments(draw, data.segments);
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
    height,
    hoveredId,
    palette,
    rows,
    scale,
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
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.height = `${height}px`;

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

    rows.forEach((row) => drawRow({ ...base, row }, data));
  }, [
    canvasRef,
    data,
    density,
    dpr,
    height,
    hoveredId,
    palette,
    rows,
    scale,
    selectedId,
    width,
  ]);
}

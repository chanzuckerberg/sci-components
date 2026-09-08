import { RefObject, useEffect } from "react";
import { GenomeTrackData } from "../GenomeTrack.types";
import {
  DrawContext,
  drawActivation,
  drawAnnotations,
  drawRuler,
  drawSegments,
  drawSequence,
} from "../renderers";
import { TrackRow } from "../utils/layout";
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
  rulerHeight: number;
  scale: GenomeScale;
  selectedId: string | null;
  width: number;
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
    rulerHeight,
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

    drawRuler({
      ...base,
      row: { height: rulerHeight, kind: "sequence", label: "", y: 0 },
    });

    rows.forEach((row) => {
      const draw: DrawContext = { ...base, row };

      switch (row.kind) {
        case "activation": {
          // Pinned features win over ranked ones: a user who pinned a feature
          // asked for that one specifically.
          const trace = data.pinned[0] ?? data.features[0];

          if (trace) drawActivation(draw, trace, data.bins);
          break;
        }
        case "annotations":
          drawAnnotations(draw, data.annotations ?? []);
          break;
        case "segments":
          drawSegments(draw, data.segments);
          break;
        case "sequence":
          if (data.sequence)
            drawSequence(draw, data.sequence, data.locus.start);
          break;
        default:
          break;
      }
    });
  }, [
    canvasRef,
    data,
    density,
    dpr,
    height,
    hoveredId,
    palette,
    rows,
    rulerHeight,
    scale,
    selectedId,
    width,
  ]);
}

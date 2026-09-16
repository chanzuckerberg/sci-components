import { DEFAULT_TRACK_DATA } from "../__storybook__/constants";
import { TrackKind } from "../GenomeTrack.types";
import { hitTest, selectionForHit, seriesId } from "../utils/hitTest";
import { layoutRows } from "../utils/layout";
import { bpToPx, createScale } from "../utils/scale";

/**
 * Hit-testing has to agree with what was drawn.
 *
 * The renderer and the hit-test read the same layout and the same scale, but
 * nothing in the type system enforces that they stay in step. These tests pin
 * the agreement: a click at the pixel where a block was drawn has to return
 * that block, and a click in a gap has to return nothing rather than the last
 * thing found.
 */

const WIDTH = 800;
const OPTIONS = {
  blockRowHeight: 28,
  density: "comfortable" as const,
  featureRowHeight: 24,
  maxAnnotationLanes: 4,
  maxFeatureRows: 8,
  showRowLabels: true,
  tracks: ["annotations", "segments", "features"] as TrackKind[],
};

const layout = layoutRows(DEFAULT_TRACK_DATA, OPTIONS);
const scale = createScale(
  { end: DEFAULT_TRACK_DATA.locus.end, start: DEFAULT_TRACK_DATA.locus.start },
  WIDTH
);

/** Centre of a row, so a hit is not decided by a rounding edge. */
function rowCenter(kind: string): number {
  const row = layout.rows.find((candidate) => candidate.kind === kind);

  if (!row) throw new Error(`No ${kind} row in the fixture`);

  return row.y + row.height / 2;
}

describe("hitTest", () => {
  it("finds the annotation drawn under the pointer", () => {
    const annotation = DEFAULT_TRACK_DATA.annotations?.[0];

    if (!annotation) throw new Error("Fixture has no annotations");

    const midBp = Math.floor((annotation.start + annotation.end) / 2);
    const hit = hitTest(
      DEFAULT_TRACK_DATA,
      layout.rows,
      scale,
      bpToPx(scale, midBp),
      rowCenter("annotations")
    );

    expect(hit).toMatchObject({
      id: annotation.id,
      kind: "annotation",
      label: annotation.name,
    });
  });

  it("finds the segment drawn under the pointer", () => {
    const segment = DEFAULT_TRACK_DATA.segments[1];
    const midBp = Math.floor((segment.start + segment.end) / 2);
    const hit = hitTest(
      DEFAULT_TRACK_DATA,
      layout.rows,
      scale,
      bpToPx(scale, midBp),
      rowCenter("segments")
    );

    expect(hit).toMatchObject({ id: segment.id, kind: "segment" });
  });

  it("reports the segment's own short id, not the namespaced one", () => {
    const hit = hitTest(
      DEFAULT_TRACK_DATA,
      layout.rows,
      scale,
      bpToPx(scale, DEFAULT_TRACK_DATA.segments[0].start + 1),
      rowCenter("segments")
    );

    expect(hit?.label).toMatch(/^seg_\d{5}$/);
  });

  it("returns a binned value for a feature row", () => {
    const hit = hitTest(
      DEFAULT_TRACK_DATA,
      layout.rows,
      scale,
      WIDTH / 2,
      rowCenter("features")
    );

    expect(hit?.kind).toBe("trace");
    expect(hit).toHaveProperty("value");
    // The reported range is the bin's, so a tooltip cannot claim single-base
    // precision for a pooled value.
    expect(hit!.end).toBeGreaterThanOrEqual(hit!.start);
  });

  it("returns null in the gap between rows", () => {
    const annotations = layout.rows.find((row) => row.kind === "annotations")!;
    const gapY = annotations.y + annotations.height + 2;

    expect(
      hitTest(DEFAULT_TRACK_DATA, layout.rows, scale, WIDTH / 2, gapY)
    ).toBeNull();
  });

  it("returns null outside the plot's horizontal bounds", () => {
    const y = rowCenter("segments");

    expect(hitTest(DEFAULT_TRACK_DATA, layout.rows, scale, -5, y)).toBeNull();
    expect(
      hitTest(DEFAULT_TRACK_DATA, layout.rows, scale, WIDTH + 5, y)
    ).toBeNull();
  });

  it("finds every annotation at its own midpoint, in its own lane", () => {
    const lanes = layout.rows.filter((row) => row.kind === "annotations");

    expect(lanes.length).toBeGreaterThan(1);

    lanes.forEach((lane) => {
      (lane.laneBlocks ?? []).forEach((annotation) => {
        const midBp = Math.floor((annotation.start + annotation.end) / 2);
        const hit = hitTest(
          DEFAULT_TRACK_DATA,
          layout.rows,
          scale,
          bpToPx(scale, midBp),
          lane.y + lane.height / 2
        );

        // Within a lane blocks cannot overlap, so a midpoint resolves to that
        // block and no other. Across lanes, y is what tells them apart.
        expect(hit?.id).toBe(annotation.id);
      });
    });
  });

  /**
   * Nested annotations, which real GFFs contain — a tRNA inside a CDS — and
   * which a flat annotation row got wrong twice over.
   *
   * Drawn flat, the inner block is painted over by its host and is unreachable
   * by the pointer. Worse, `firstCandidate` binary-searches on `end`, and
   * nesting is precisely the case where start order does not imply end order:
   * the search stepped past the enclosing gene, so hovering the host anywhere
   * beyond the nested block's end returned nothing at all. Both failures are
   * properties of putting them in one row, so both are pinned here.
   */
  it("reaches a nested annotation and its host, with no dead zone between", () => {
    const outer = {
      end: 1000,
      id: "outer",
      kind: "CDS",
      name: "longGene",
      start: 100,
      strand: "+" as const,
    };
    const inner = {
      end: 500,
      id: "inner",
      kind: "tRNA",
      name: "tRNA-Ala",
      start: 400,
      strand: "-" as const,
    };

    const data = {
      ...DEFAULT_TRACK_DATA,
      annotations: [outer, inner],
      locus: { ...DEFAULT_TRACK_DATA.locus, end: 1200, start: 1 },
    };
    const nestedLayout = layoutRows(data, {
      ...OPTIONS,
      tracks: ["annotations"],
    });
    const nestedScale = createScale({ end: 1200, start: 1 }, WIDTH);

    expect(nestedLayout.rows).toHaveLength(2);

    const at = (bp: number, row: (typeof nestedLayout.rows)[number]) =>
      hitTest(
        data,
        nestedLayout.rows,
        nestedScale,
        bpToPx(nestedScale, bp),
        row.y + row.height / 2
      );

    const [hostLane, nestedLane] = nestedLayout.rows;

    // The host, on both sides of the nested block. 800 is the dead zone: it is
    // inside `outer` but past `inner`'s end, and it used to return null.
    expect(at(200, hostLane)?.id).toBe("outer");
    expect(at(800, hostLane)?.id).toBe("outer");

    // The nested block, which a flat row could not reach at all.
    expect(at(450, nestedLane)?.id).toBe("inner");

    // And its lane is empty either side of it, rather than reporting the host
    // from a row the host is not drawn in.
    expect(at(200, nestedLane)).toBeNull();
    expect(at(800, nestedLane)).toBeNull();
  });

  /**
   * The features stack is many rows of one kind, so a y offset is the only
   * thing that distinguishes them. A hit that resolved by kind would report the
   * first feature wherever in the stack the pointer was — the failure this
   * exists to catch.
   */
  it("reports the trace belonging to the feature row under the pointer", () => {
    const featureLayout = layoutRows(DEFAULT_TRACK_DATA, {
      ...OPTIONS,
      tracks: ["features"],
    });

    featureLayout.rows.forEach((row, index) => {
      const hit = hitTest(
        DEFAULT_TRACK_DATA,
        featureLayout.rows,
        scale,
        WIDTH / 2,
        row.y + row.height / 2
      );

      expect(hit).toMatchObject({
        id: `feature-${DEFAULT_TRACK_DATA.features[index].feature_id}`,
        kind: "trace",
        rowIndex: index,
      });
    });
  });

  it("finds a block whose pixel width is below the pointer's precision", () => {
    // 200 kb window: every segment is a fraction of a pixel wide, and without
    // the slack allowance they would be visible but unclickable.
    const wideData = DEFAULT_TRACK_DATA;
    const wideScale = createScale(
      { end: wideData.locus.start + 200_000, start: wideData.locus.start },
      WIDTH
    );
    const segment = wideData.segments[0];
    const hit = hitTest(
      wideData,
      layout.rows,
      wideScale,
      bpToPx(wideScale, segment.start),
      rowCenter("segments")
    );

    expect(hit?.kind).toBe("segment");
  });
});

/**
 * What a click on a hit should select.
 *
 * Split out of the pointer handler so it is testable at all: inside the
 * handler it was reachable only through a simulated pointer sequence, and
 * jsdom reports a zero-width plot, so every simulated click missed.
 */
describe("selectionForHit", () => {
  const annotation = DEFAULT_TRACK_DATA.annotations?.[0];
  const feature = DEFAULT_TRACK_DATA.features[0];

  const blockHit = {
    detail: "",
    end: annotation?.end ?? 0,
    id: annotation?.id ?? "",
    kind: "annotation" as const,
    label: "",
    rowIndex: 0,
    start: annotation?.start ?? 0,
    strand: "+" as const,
  };

  const traceHit = {
    detail: "",
    end: 0,
    id: seriesId(feature.feature_id),
    kind: "trace" as const,
    label: "",
    rowIndex: 0,
    start: 0,
    value: 0,
  };

  it("selects a feature row as a series, not a block", () => {
    // The change this exists for: a features row used to clear the selection.
    // Selecting it is how the minimap learns whose activation to draw across
    // the chromosome, which is the only way to see a feature outside the
    // loaded window.
    expect(selectionForHit(traceHit, null)).toEqual({
      id: seriesId(feature.feature_id),
      kind: "series",
    });
  });

  it("selects an annotation or segment as a block", () => {
    expect(selectionForHit(blockHit, null)).toEqual({
      id: annotation?.id,
      kind: "block",
    });
  });

  it("toggles off when the same thing is clicked again", () => {
    expect(selectionForHit(traceHit, traceHit.id)).toBeNull();
    expect(selectionForHit(blockHit, blockHit.id)).toBeNull();
  });

  it("switches directly from one feature to another", () => {
    // No intermediate null: the shell gets one selection change and fetches
    // one chromosome trace, rather than clearing the minimap in between.
    expect(selectionForHit(traceHit, seriesId(999))).toEqual({
      id: seriesId(feature.feature_id),
      kind: "series",
    });
  });

  it("clears on empty space", () => {
    // Emitting null rather than nothing is what lets a shell close a detail
    // surface from here.
    expect(selectionForHit(null, traceHit.id)).toBeNull();
    expect(selectionForHit(null, null)).toBeNull();
  });
});

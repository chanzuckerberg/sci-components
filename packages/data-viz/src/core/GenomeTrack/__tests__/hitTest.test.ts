import { DEFAULT_TRACK_DATA } from "../__storybook__/constants";
import { TrackKind } from "../GenomeTrack.types";
import { hitTest, selectionForHit, seriesId } from "../utils/hitTest";
import { layoutRows } from "../utils/layout";
import { bpToPx, createScale } from "../utils/scale";

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

/** Centre of a row, away from rounding edges. */
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
    // The reported range is the whole bin's.
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

        expect(hit?.id).toBe(annotation.id);
      });
    });
  });

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

    // 800 is inside `outer` but past `inner`'s end.
    expect(at(200, hostLane)?.id).toBe("outer");
    expect(at(800, hostLane)?.id).toBe("outer");

    expect(at(450, nestedLane)?.id).toBe("inner");

    expect(at(200, nestedLane)).toBeNull();
    expect(at(800, nestedLane)).toBeNull();
  });

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
    // 200 kb window: every segment is under a pixel wide.
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
    expect(selectionForHit(traceHit, seriesId(999))).toEqual({
      id: seriesId(feature.feature_id),
      kind: "series",
    });
  });

  it("clears on empty space", () => {
    expect(selectionForHit(null, traceHit.id)).toBeNull();
    expect(selectionForHit(null, null)).toBeNull();
  });
});

describe("segments arriving in an unhelpful order", () => {
  // Named by drawn position, not payload order.
  const FIRST = "seg:first";
  const SECOND = "seg:second";
  const THIRD = "seg:third";

  const { start: windowStart } = DEFAULT_TRACK_DATA.locus;
  const template = DEFAULT_TRACK_DATA.segments[0];
  const disordered = {
    ...DEFAULT_TRACK_DATA,
    segments: [
      {
        ...template,
        end: windowStart + 238,
        id: THIRD,
        start: windowStart + 160,
      },
      {
        ...template,
        end: windowStart + 159,
        id: SECOND,
        start: windowStart + 80,
      },
      {
        ...template,
        end: windowStart + 79,
        id: FIRST,
        start: windowStart + 8,
      },
    ],
  };

  const disorderedLayout = layoutRows(disordered, OPTIONS);
  const segmentRow = disorderedLayout.rows.find(
    (candidate) => candidate.kind === "segments"
  );
  const y = (segmentRow?.y ?? 0) + (segmentRow?.height ?? 0) / 2;

  it("sorts the row's blocks by end, whatever order they arrived in", () => {
    expect(segmentRow?.segmentBlocks?.map((block) => block.id)).toEqual([
      FIRST,
      SECOND,
      THIRD,
    ]);
  });

  it.each([
    ["the segment listed last", 40, FIRST],
    ["the segment listed second", 120, SECOND],
    ["the segment listed first", 200, THIRD],
  ])("finds %s", (_label, offset, expected) => {
    const hit = hitTest(
      disordered,
      disorderedLayout.rows,
      scale,
      bpToPx(scale, windowStart + offset),
      y
    );

    expect(hit?.id).toBe(expected);
  });
});

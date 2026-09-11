import { DEFAULT_TRACK_DATA } from "../__storybook__/constants";
import { TrackKind } from "../GenomeTrack.types";
import { hitTest } from "../utils/hitTest";
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
  maxFeatureRows: 8,
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

  it("finds each annotation at its own midpoint", () => {
    const y = rowCenter("annotations");

    (DEFAULT_TRACK_DATA.annotations ?? []).forEach((annotation) => {
      const midBp = Math.floor((annotation.start + annotation.end) / 2);
      const hit = hitTest(
        DEFAULT_TRACK_DATA,
        layout.rows,
        scale,
        bpToPx(scale, midBp),
        y
      );

      // Blocks do not overlap in the annotation row, so the midpoint of each
      // must resolve to that block and no other.
      expect(hit?.id).toBe(annotation.id);
    });
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

import {
  AnnotationBlock,
  FeatureTrace,
  GenomeTrackData,
  SegmentBlock,
  TrackKind,
} from "../GenomeTrack.types";

/**
 * Row layout for the track.
 *
 * The `tracks` prop is an ordered list of row kinds; this turns it into
 * concrete y offsets and heights, skipping rows the payload cannot fill. Doing
 * it as a separate pass rather than inline in the renderer means hit-testing
 * and the accessible table read the same layout the canvas drew, so a click
 * cannot land on a row the user is not looking at.
 */

export interface TrackRow {
  kind: TrackKind;
  /** Top edge in CSS px, relative to the plot area. */
  y: number;
  height: number;
  /** Section name, drawn above the row. Empty for the rows that share one. */
  label: string;
  /**
   * Space reserved immediately above `row.y` for `label` and its separator.
   *
   * Set only on the row that carries the label — the first of each section — so
   * the label is drawn at `row.y - headerHeight`. Zero or absent when labels
   * are off.
   */
  headerHeight?: number;
  /**
   * Which trace a `"features"` sub-row draws, as an index into
   * `featureTraces(data)`.
   *
   * The features row is the one kind that expands: one sub-row per trace,
   * rather than one row per kind. Carrying the index on the row is what lets
   * hit-testing and the renderer address a single trace without recomputing
   * which one a y offset belongs to.
   */
  traceIndex?: number;
  /**
   * The `feature_id` a `"features"` sub-row draws.
   *
   * Carried alongside `traceIndex` because the two answer different questions,
   * and re-fetching on zoom is what made the difference matter. `traceIndex` is
   * a *position* in the stack; `traceId` is an *identity*. The payload ranks
   * features by score within the window, so a narrower window can return a
   * different set — position 3 is then a different feature than it was, and a
   * React key built from the position would reuse the row's DOM across that
   * change.
   */
  traceId?: number;
  /**
   * The trace's display name, drawn as DOM text inside the row.
   *
   * There is one of these per trace and only one header line per section, so a
   * trace's name cannot go where every other row's label goes. They are DOM
   * rather than canvas text for the reason all the component's text is: canvas
   * text is invisible to find-in-page and ignores a reader's font settings.
   */
  traceLabel?: string;
  /** Space reserved at the top of the row for `traceLabel`, in px. */
  labelInset?: number;
  /**
   * Space between `traceLabel` and the bars, holding the y axis maximum.
   *
   * Separate from `labelInset` because the two are consumed by different
   * things: the name is DOM text at the row's top, the axis is canvas text just
   * above the bars. A renderer needs both to know where the bars begin.
   */
  axisInset?: number;
  /**
   * Which lane of the annotations stack this row is, from the top.
   *
   * Like `traceIndex`, this exists because one kind expands into several rows.
   * Unlike `traceIndex` it does not index into anything the caller can rebuild
   * from the payload, because a lane is an artefact of the packing rather than
   * a property of the data — so the row carries its own blocks in `laneBlocks`.
   */
  laneIndex?: number;
  /**
   * The annotations packed into this lane, sorted by start and guaranteed not
   * to overlap each other.
   *
   * Carried on the row rather than re-derived by each consumer. The packing has
   * to happen here — the number of lanes determines the row's height, so the
   * layout pass cannot avoid computing it — and handing the result over means
   * the renderer, the hit-test, and the accessible table cannot disagree with
   * each other about which lane a gene landed in. A second, independent packing
   * in the hit-test would also cost an O(n·lanes) pass on every pointer move.
   *
   * The non-overlap guarantee is load-bearing, not incidental: `hitTest`
   * binary-searches a lane on `end`, which is only sorted if the lane's blocks
   * do not overlap. See `packAnnotationLanes`.
   */
  laneBlocks?: AnnotationBlock[];
  /**
   * The segments this row draws, sorted by `end`.
   *
   * `hitTest` binary-searches on `end`, so a list that is not in `end` order —
   * two segmentation runs concatenated, a response sorted by score — makes
   * blocks silently unhoverable while the row still draws perfectly. Sorting
   * here establishes that precondition where the row's blocks are chosen,
   * rather than assuming it of the payload, and costs one pass per payload
   * instead of per frame.
   *
   * This is weaker than what `packAnnotationLanes` gives the annotations row,
   * and deliberately so. Sorting does not survive *nesting*: the search's
   * forward scan stops at the first block starting after the point, so a
   * position inside only an enclosing segment halts on the inner one. Lanes
   * fix that by removing overlap altogether, which annotations need because
   * nesting is normal there — a tRNA inside a CDS. Segments are an exhaustive
   * partition, so they cannot nest; if that ever changes, this row needs the
   * lane packer rather than a bigger sort.
   *
   * Separate from `laneBlocks` rather than one widened field, so neither
   * consumer needs a cast to get its own block type back.
   */
  segmentBlocks?: SegmentBlock[];
}

export interface RowLayoutOptions {
  blockRowHeight: number;
  density: "comfortable" | "compact";
  featureRowHeight: number;
  maxAnnotationLanes: number;
  maxFeatureRows: number;
  /** Whether to reserve a line above each section for its name. */
  showRowLabels: boolean;
  tracks: TrackKind[];
}

/** Vertical gap between rows, per density. */
const ROW_GAP = { comfortable: 10, compact: 4 };

/**
 * Vertical gap between the sub-rows of the features stack, per density.
 *
 * Still tighter than `ROW_GAP`: the traces are one section, and a gap as wide
 * as the one between sections would read as several. Compact stays at 3, since
 * the in-card variant exists to be tight and has no y axis strip crowding the
 * rows apart in the first place.
 */
const FEATURE_GAP = { comfortable: 8, compact: 3 };

/**
 * Vertical gap between the lanes of the annotations stack, per density.
 *
 * Tighter than the gap between features, which are separate measurements that
 * want separating. Annotation lanes are one row of genes that happened not to
 * fit on one line, so they read best as a block.
 */
const LANE_GAP = { comfortable: 2, compact: 1 };

/**
 * Height reserved above a feature's bars for its name, per density.
 *
 * Zero in compact: a comparison card has no room for forty characters per row,
 * and the names are the first thing to go when the card is the size of a
 * thumbnail.
 */
export const FEATURE_LABEL_HEIGHT = { comfortable: 16, compact: 0 };

/**
 * Space between a trace's name and its bars, for the y axis maximum.
 *
 * Its own band rather than an overlay on the bars, because an overlay always
 * collides: the bars are normalized to the trace's own peak, so the tallest one
 * reaches the top of the band *by definition* and sits exactly where the label
 * would go. Reserving a strip above them is the only way the number is reliably
 * legible.
 *
 * Twelve is the 10 px label's ascent plus the 1 px gap that puts its baseline
 * just clear of the tallest bar. Zero in compact, which draws no axis.
 */
export const ACTIVATION_AXIS_HEIGHT = { comfortable: 12, compact: 0 };

/**
 * Space above a section for its name and separator, per density.
 *
 * Row names sit above their rows rather than in a gutter down the left edge.
 * The gutter cost a fixed column of the plot's width at every zoom — ninety-six
 * pixels that the axis could have used — and still truncated the longer names
 * to an ellipsis. Above the row a name has the whole width to use, and the plot
 * gets the space back.
 *
 * Reserved *above* `row.y` rather than added to `row.height`, which is what
 * keeps this out of the renderers: a row still describes exactly the band it
 * draws into, so no draw pass and no hit-test has to know a label exists.
 *
 * One height for every section, and everything the band holds is centred in
 * it: the name, and in the sequence section the copy control beside it. That
 * is what makes the gap between a heading and the data it heads the same
 * everywhere — equal bands, centred contents, equal gaps. Sections sized
 * individually could only match on one edge, and matching on the wrong one is
 * what left some headings floating a long way above their rows.
 *
 * The floor is the rule plus the tallest thing centred in it, which is not the
 * text but the copy control: an SDS `Button`, 28 px at `medium` and 24 px at
 * `small`. Set below that and the button overflows its band.
 */
export const ROW_LABEL_HEIGHT = { comfortable: 34, compact: 30 };

/**
 * Height of the line above a section, or zero when it has no name.
 *
 * Exported because three callers have to agree on it: the layout reserves it,
 * the skeleton matches it so the page does not jump when data lands, and the
 * copy control positions itself inside it.
 */
export function rowLabelHeight(
  kind: TrackKind,
  density: "comfortable" | "compact",
  showRowLabels: boolean
): number {
  return showRowLabels && ROW_LABELS[kind] ? ROW_LABEL_HEIGHT[density] : 0;
}

/**
 * Height of the minimap's bar, per density.
 *
 * The bar is the one row that gains from height rather than merely spending it:
 * the chromosome-wide activation summary is drawn inside it, and a shorter bar
 * flattens that signal into a line.
 */
export const MINIMAP_BAR_HEIGHT = { comfortable: 24, compact: 12 };

/**
 * Space above the minimap's bar for the visible range, per density.
 *
 * The range is captioned above the bar rather than written inside the band, for
 * two reasons. The band shrinks as the user zooms in — at a deep zoom it is
 * three pixels wide and could not hold text at all — and a caption on the row's
 * own background can use a colour that contrasts in both themes. Text on the
 * band cannot: the band is a neutral fill, which is dark in light mode and
 * light in dark mode, and no `textOnFill` token flips with it.
 */
export const MINIMAP_RANGE_HEIGHT = { comfortable: 14, compact: 0 };

/**
 * Space under the minimap's bar for its own tick labels, per density.
 *
 * These are the only coordinates drawn inside the plot. They belong to the
 * extent rather than the visible range, which is the pairing that makes the
 * band readable: the header states where you are, and the bar states what you
 * are inside of. Zero in compact, where a card has no room for either.
 */
export const MINIMAP_LABEL_HEIGHT = { comfortable: 16, compact: 0 };

/**
 * Space under the segments section for its category key, per density.
 *
 * One line of swatches. Zero in compact, where a comparison card has no room
 * for a key and the colours have to speak for themselves.
 *
 * A fixed reservation rather than a measured one, which is the one approximate
 * thing about it: the key wraps if a window holds more categories than fit the
 * width, and a wrapped second line overruns into the row below. A window holds
 * a handful of the enum's categories in practice, so one line is nearly always
 * enough — but it is an assumption, not a guarantee.
 */
export const SEGMENT_LEGEND_HEIGHT = { comfortable: 24, compact: 0 };

/** Height of the sequence row, per density. */
export const SEQUENCE_HEIGHT = { comfortable: 18, compact: 12 };

/**
 * Section names. An empty string means the section carries no name.
 *
 * The minimap has none on purpose. Every other row is a band on the shared bp
 * axis and needs saying which; the minimap is the chromosome bar at the top of
 * the plot, already distinguished by having its own ruler and by sitting above
 * everything else. Naming it spends a line of height restating what the row
 * plainly is.
 */
const ROW_LABELS: Record<TrackKind, string> = {
  annotations: "Annotations",
  features: "Features",
  minimap: "",
  segments: "Predicted",
  sequence: "Sequence",
};

/**
 * The traces the features row can draw, in the order it draws them.
 *
 * Pinned first, then ranked: a user who pinned a feature asked for that one
 * specifically, and the payload lists the rest highest-scoring first. The order
 * is the payload's and is never re-sorted here — the server ranks, and the
 * segment-features endpoint returns an explicit `rank`, so re-deriving an order
 * from `score` would be a second opinion nobody asked for.
 *
 * Returns the whole list rather than a capped one so that a `traceIndex` means
 * the same thing to every caller. The layout slices a prefix of it for the rows
 * it draws, which leaves the indices of everything it kept unchanged.
 */
export function featureTraces(data: GenomeTrackData): FeatureTrace[] {
  return [...data.pinned, ...data.features];
}

/**
 * Packs annotations into lanes so that no two blocks in a lane overlap.
 *
 * Annotations overlap in real data — divergent gene pairs, overlapping ORFs,
 * a tRNA nested inside a CDS — and a single flat row draws them on top of each
 * other, so an enclosed gene disappears behind its neighbour. Lanes are the
 * standard answer and the one the design asks for.
 *
 * Lane assignment carries no meaning. It is first-fit: each block goes in the
 * topmost lane whose last block has already ended. In particular a lane is
 * **not** a strand — strand stays encoded by the arrowhead `blockPath` draws,
 * which is the cue that survives a colorblind reader and does not move when
 * the packing changes. Confirmed against the design.
 *
 * Two invariants come out of this, and both are relied on elsewhere:
 *
 * 1. Within a lane, blocks do not overlap. Because they are also in start
 *    order, their `end` values are therefore sorted — which is exactly the
 *    precondition `hitTest`'s binary search needs and which a flat row does not
 *    provide. Packing is what makes that search correct, so it is not merely a
 *    rendering change.
 * 2. Checking only the lane's last block is sufficient, for the same reason: it
 *    is the block with the greatest `end` in that lane.
 *
 * Both depend on the input being sorted by start, so this sorts rather than
 * trusting it. The server does emit annotations in start order, but an unsorted
 * payload here would not draw badly — it would silently put overlapping blocks
 * in one lane and reintroduce the hit-test hole, which is far harder to notice.
 * Sorting intervals for packing is not the same thing as re-ranking data: the
 * order of `features` is the server's opinion and is left alone, whereas start
 * order is a precondition for the algorithm to be correct at all.
 *
 * Blocks past `maxLanes` are counted rather than crammed into the last lane.
 * Overflowing into a shared lane would break invariant 1 and take the hit-test
 * with it, which is a worse failure than not drawing a rare fourth-deep gene —
 * and the accessible table lists the whole payload regardless, so nothing is
 * lost outright.
 */
export function packAnnotationLanes(
  annotations: AnnotationBlock[],
  maxLanes: number
): { lanes: AnnotationBlock[][]; overflow: number } {
  const limit = Math.max(Math.floor(maxLanes), 1);
  const sorted = [...annotations].sort((a, b) => a.start - b.start);
  const lanes: AnnotationBlock[][] = [];

  let overflow = 0;

  sorted.forEach((annotation) => {
    const lane = lanes.find(
      (candidate) => candidate[candidate.length - 1].end < annotation.start
    );

    if (lane) lane.push(annotation);
    else if (lanes.length < limit) lanes.push([annotation]);
    else overflow += 1;
  });

  return { lanes, overflow };
}

/**
 * A feature's description, or null when the knowledge base has none.
 *
 * The precedence — a short label, else the long description — lives here
 * because three callers want it with three different fallbacks: the row label
 * falls back to the bare feature id, the tooltip to nothing, and the accessible
 * table to prose. Written out three times, a change to that precedence was
 * three edits, and the copies had already drifted.
 */
export function featureNote(
  data: GenomeTrackData,
  trace: FeatureTrace
): string | null {
  const note = data.feature_notes[String(trace.feature_id)];

  return note?.label || note?.description || null;
}

/**
 * A trace's display name.
 *
 * Falls back to the bare feature id, which is the common case rather than the
 * exceptional one: the knowledge base describes a few percent of features
 * today, and for checkpoints its pipeline has not run against it describes
 * none. A layout that only looks right with prose labels is a layout that only
 * looks right on a fixture.
 */
export function featureLabel(
  data: GenomeTrackData,
  trace: FeatureTrace
): string {
  return featureNote(data, trace) ?? `Feature ${trace.feature_id}`;
}

/**
 * Whether the payload can fill a row.
 *
 * A row the data cannot support is dropped rather than drawn empty: an empty
 * annotation row reads as "no genes here", which is a claim the payload does
 * not make when `annotations` is null ("nobody looked").
 */
function hasDataFor(kind: TrackKind, data: GenomeTrackData): boolean {
  switch (kind) {
    case "features":
      return data.features.length > 0 || data.pinned.length > 0;
    case "annotations":
      return data.annotations !== null;
    case "minimap":
      // Always drawable. The row places the viewport inside the payload's own
      // window, and a payload always has one — it reads `locus`, not the
      // chromosome-scale `overview`, so `caps.overview_available` has no
      // bearing on whether it can be drawn.
      return true;
    case "segments":
      return data.segments.length > 0;
    case "sequence":
      return data.sequence !== null;
    default:
      return false;
  }
}

/**
 * Height of one row, before it is placed.
 *
 * The features row is absent from this: it is the one kind whose height is a
 * function of how many traces it draws, so `layoutRows` sizes it itself.
 */
function heightOf(kind: TrackKind, options: RowLayoutOptions): number {
  switch (kind) {
    case "minimap":
      return (
        MINIMAP_RANGE_HEIGHT[options.density] +
        MINIMAP_BAR_HEIGHT[options.density] +
        MINIMAP_LABEL_HEIGHT[options.density]
      );
    case "sequence":
      return SEQUENCE_HEIGHT[options.density];
    default:
      return options.blockRowHeight;
  }
}

/**
 * The annotation lanes, as rows stacked from `y`.
 *
 * Always at least one row. `hasDataFor` has already established that
 * `annotations` is not null, so an empty list means "looked, found nothing" —
 * which the design draws as an empty labelled row, not as a missing one.
 */
function annotationLaneRows(
  data: GenomeTrackData,
  options: RowLayoutOptions,
  y: number,
  headerHeight: number
): { overflow: number; rows: TrackRow[] } {
  const height = options.blockRowHeight;
  const step = height + LANE_GAP[options.density];
  const { lanes, overflow } = packAnnotationLanes(
    data.annotations ?? [],
    options.maxAnnotationLanes
  );

  return {
    overflow,
    rows: Array.from(
      { length: Math.max(lanes.length, 1) },
      (_, laneIndex): TrackRow => ({
        headerHeight: laneIndex === 0 ? headerHeight : 0,
        height,
        kind: "annotations",
        // Only the top lane carries the section name, so the stack reads as one
        // row of genes rather than as N rows of different things.
        label: laneIndex === 0 ? ROW_LABELS.annotations : "",
        laneBlocks: lanes[laneIndex] ?? [],
        laneIndex,
        y: y + laneIndex * step,
      })
    ),
  };
}

/** The features stack, as rows from `y`: one per trace, up to the cap. */
function featureStackRows(
  data: GenomeTrackData,
  options: RowLayoutOptions,
  y: number,
  headerHeight: number
): TrackRow[] {
  const labelInset = FEATURE_LABEL_HEIGHT[options.density];
  const axisInset = ACTIVATION_AXIS_HEIGHT[options.density];
  const height = options.featureRowHeight + labelInset + axisInset;
  const step = height + FEATURE_GAP[options.density];

  return featureTraces(data)
    .slice(0, Math.max(options.maxFeatureRows, 0))
    .map((trace, traceIndex) => ({
      axisInset,
      headerHeight: traceIndex === 0 ? headerHeight : 0,
      height,
      kind: "features",
      // Only the first sub-row carries the section name, so the stack reads as
      // one section rather than as N rows that happen to be adjacent.
      label: traceIndex === 0 ? ROW_LABELS.features : "",
      labelInset,
      traceId: trace.feature_id,
      traceIndex,
      traceLabel: labelInset > 0 ? featureLabel(data, trace) : undefined,
      y: y + traceIndex * step,
    }));
}

/**
 * A row for a kind that occupies exactly one band — everything but the
 * annotations and features stacks.
 *
 * Its own function because the segments row is not quite uniform with the
 * others: it carries its blocks, for the ordering reason `segmentBlocks`
 * explains. Inlined, that one conditional pushed `layoutRows` past its
 * complexity budget, which is a fair signal that "build a row" and "place the
 * rows" are two jobs.
 */
function singleRow(
  kind: TrackKind,
  data: GenomeTrackData,
  band: { headerHeight: number; height: number; y: number }
): TrackRow {
  const row: TrackRow = {
    headerHeight: band.headerHeight,
    height: band.height,
    kind,
    label: ROW_LABELS[kind],
    y: band.y,
  };

  if (kind === "segments") {
    // See `segmentBlocks`: the hit-test's binary search needs `end` order, and
    // this is the one place that can guarantee it for this row.
    row.segmentBlocks = [...data.segments].sort((a, b) => a.end - b.end);
  }

  return row;
}

/**
 * Places the requested rows top to bottom, from the top of the plot.
 *
 * Returns the rows and the total height, so the container can size itself to
 * its content rather than the caller guessing a height that happens to fit.
 */
export function layoutRows(
  data: GenomeTrackData,
  options: RowLayoutOptions
): {
  annotationOverflow: number;
  height: number;
  rows: TrackRow[];
  /** Top of the segment category key, or null when there is none to draw. */
  segmentLegendY: number | null;
} {
  const gap = ROW_GAP[options.density];
  const rows: TrackRow[] = [];

  // Drawn only when there are both segments and an enum to explain them.
  const legendHeight =
    data.segments.length > 0 && (data.segment_categories?.length ?? 0) > 0
      ? SEGMENT_LEGEND_HEIGHT[options.density]
      : 0;

  let annotationOverflow = 0;
  let segmentLegendY: number | null = null;
  let y = 0;

  /**
   * Places a stack and leaves `y` under it.
   *
   * A stack closes with the gap that separates rows generally, not with the
   * tighter one it uses internally: the lanes of an annotation row belong
   * together, but the row below is a different thing.
   */
  const place = (stack: TrackRow[]): void => {
    if (stack.length === 0) return;

    const last = stack[stack.length - 1];

    rows.push(...stack);
    y = last.y + last.height + gap;
  };

  options.tracks.forEach((kind) => {
    if (!hasDataFor(kind, data)) return;

    // Zero for a section with no name, and taller for one whose line carries a
    // control. Reserved before the rows are placed rather than folded into
    // their heights, which is what keeps `row.y` the top of the drawn band.
    const headerHeight = rowLabelHeight(
      kind,
      options.density,
      options.showRowLabels
    );
    const top = y + headerHeight;

    if (kind === "annotations") {
      const packed = annotationLaneRows(data, options, top, headerHeight);

      annotationOverflow = packed.overflow;
      place(packed.rows);

      return;
    }

    if (kind === "features") {
      place(featureStackRows(data, options, top, headerHeight));

      return;
    }

    const height = heightOf(kind, options);

    rows.push(singleRow(kind, data, { headerHeight, height, y: top }));
    y = top + height + gap;

    // The key sits directly under the row whose colours it explains, which
    // means reserving its band here rather than appending it to the track.
    if (kind === "segments" && legendHeight > 0) {
      segmentLegendY = top + height;
      y += legendHeight;
    }
  });

  // Trailing gap is trimmed: it would read as unexplained padding at the bottom
  // of a card whose height is otherwise determined by its content.
  return {
    annotationOverflow,
    height: Math.max(y - gap, 0),
    rows,
    segmentLegendY,
  };
}

/**
 * Contiguous y bands covering every row drawn on the viewport scale.
 *
 * Which is every row but the minimap. A caller that needs to paint something
 * across the plot's x axis — "no data loaded past here" — has to skip the
 * minimap, whose x axis is the chromosome rather than the viewport, or it will
 * mark an unrelated slice of it.
 *
 * Bands rather than one rect per row so the gaps *between* consecutive rows are
 * included: a wash that stopped at each row boundary would read as stripes
 * rather than as a region.
 */
export function viewportBands(
  rows: TrackRow[]
): { bottom: number; top: number }[] {
  const bands: { bottom: number; top: number }[] = [];

  let open: { bottom: number; top: number } | null = null;

  rows.forEach((row) => {
    // A minimap closes the band rather than being added to it, so the rows
    // either side of one do not merge across it.
    if (row.kind === "minimap") {
      open = null;
      return;
    }

    // A section header closes it too: the space above a labelled row holds
    // that label's text and separator, and washing it would tint the label
    // rather than the plot.
    if (open && !row.headerHeight) {
      open.bottom = row.y + row.height;
      return;
    }

    open = { bottom: row.y + row.height, top: row.y };
    bands.push(open);
  });

  return bands;
}

/** Index of the row under a y offset, or -1 in a gap or below the last row. */
export function rowIndexAt(rows: TrackRow[], y: number): number {
  return rows.findIndex((row) => y >= row.y && y < row.y + row.height);
}

/** Finds the row under a y offset, or null in a gap or below the last row. */
export function rowAt(rows: TrackRow[], y: number): TrackRow | null {
  return rows[rowIndexAt(rows, y)] ?? null;
}

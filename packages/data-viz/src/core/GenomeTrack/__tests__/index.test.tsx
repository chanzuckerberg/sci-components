import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DEFAULT_TRACK_DATA,
  POOLED_TRACK_DATA,
  UNANNOTATED_TRACK_DATA,
} from "../__storybook__/constants";
import { COPY_TEST_ID } from "../components/SequenceCopyButton";
import { TrackKind } from "../GenomeTrack.types";
import GenomeTrack, { TEST_IDS } from "../index";
import { layoutRows, rowAt } from "../utils/layout";

/**
 * Component tests focus on what a canvas cannot show.
 *
 * jsdom has no 2D context, so nothing here asserts pixels — that is Chromatic's
 * job. What is testable, and what actually protects a user, is the DOM the
 * component renders alongside the canvas: the header's authoritative
 * coordinates, the accessible table, and the states that replace the plot
 * entirely.
 */

const ROW_OPTIONS = {
  blockRowHeight: 28,
  density: "comfortable" as const,
  featureRowHeight: 24,
  maxFeatureRows: 8,
  tracks: ["annotations", "segments", "features"] as TrackKind[],
};

describe("<GenomeTrack />", () => {
  it("states the organism and the exact range in the header", () => {
    render(<GenomeTrack data={DEFAULT_TRACK_DATA} />);

    // Scoped to the header: the same range also appears in the accessible
    // table, and an unscoped query would match both.
    expect(screen.getByTestId(TEST_IDS.title)).toHaveTextContent(
      "fixX · E. coli K-12"
    );
    expect(screen.getByTestId(TEST_IDS.range)).toHaveTextContent(
      "45,462–45,750"
    );
  });

  it("labels the plot for assistive tech", () => {
    render(<GenomeTrack data={DEFAULT_TRACK_DATA} />);

    expect(
      screen.getByRole("img", { name: /Genome track for E\. coli K-12/ })
    ).toBeInTheDocument();
  });

  it("mirrors annotations and segments into an accessible table", () => {
    render(<GenomeTrack data={DEFAULT_TRACK_DATA} />);

    expect(
      screen.getByRole("table", { name: /Reference annotations/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("table", { name: /Predicted segments/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("table", { name: /Top features by activation/ })
    ).toBeInTheDocument();
  });

  it("describes each annotation in the table, including its position", () => {
    render(<GenomeTrack data={DEFAULT_TRACK_DATA} />);

    const first = DEFAULT_TRACK_DATA.annotations?.[0];

    expect(
      screen.getByRole("rowheader", { name: first?.name })
    ).toBeInTheDocument();
  });

  it("says so when an organism has no annotation coverage", () => {
    render(<GenomeTrack data={UNANNOTATED_TRACK_DATA} />);

    expect(screen.getByText(/no annotation coverage/i)).toBeInTheDocument();
    // The row is dropped rather than drawn empty, so there is no table for it.
    expect(
      screen.queryByRole("table", { name: /Reference annotations/ })
    ).not.toBeInTheDocument();
  });

  it("discloses truncation rather than implying it showed everything", () => {
    render(<GenomeTrack data={DEFAULT_TRACK_DATA} />);

    expect(
      screen.getByText(
        new RegExp(
          `Showing ${DEFAULT_TRACK_DATA.features.length} of ${DEFAULT_TRACK_DATA.caps.available_features} features`
        )
      )
    ).toBeInTheDocument();
  });

  it("renders the empty state with no data", () => {
    render(<GenomeTrack data={null} />);

    expect(screen.getByTestId(TEST_IDS.message)).toHaveTextContent(
      "No region loaded."
    );
  });

  it("renders a typed error with copy chosen by its code", () => {
    render(
      <GenomeTrack
        data={null}
        error={{
          code: "dependency_unavailable",
          message: "Cache not loaded.",
        }}
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      /activation cache is not loaded/
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Cache not loaded.");
  });

  it("falls back to the server's message for an unknown error code", () => {
    render(
      <GenomeTrack
        data={null}
        error={{ code: "something_new", message: "Upstream exploded." }}
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Upstream exploded.");
  });

  it("renders the skeleton while loading, and no plot", () => {
    render(<GenomeTrack data={DEFAULT_TRACK_DATA} loading />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("reports the controlled viewport, not the payload window, in the header", () => {
    render(
      <GenomeTrack
        data={DEFAULT_TRACK_DATA}
        viewport={{ end: 45_600, start: 45_500 }}
      />
    );

    expect(screen.getByTestId(TEST_IDS.range)).toHaveTextContent(
      "45,500–45,600"
    );
  });

  /**
   * Zooming a pooled payload magnifies bins rather than sharpening them, and
   * nothing else on screen distinguishes the two. So the header is the only
   * place a user can learn that a 24 bp view is drawn from points 21 bases
   * wide.
   */
  it("states the pooled resolution in the header", () => {
    render(
      <GenomeTrack
        data={POOLED_TRACK_DATA}
        viewport={{ end: 56_951, start: 56_928 }}
      />
    );

    expect(screen.getByTestId(TEST_IDS.range)).toHaveTextContent(
      "56,928–56,951 · 24 bp · 21 bp/point"
    );
  });

  it("says nothing about resolution when the payload is unpooled", () => {
    render(<GenomeTrack data={DEFAULT_TRACK_DATA} />);

    expect(screen.getByTestId(TEST_IDS.range)).not.toHaveTextContent(
      "bp/point"
    );
  });

  /**
   * Feature names are the one row label that cannot go in the gutter — forty
   * characters against ninety-six pixels — so they are drawn inside the plot.
   * They are still DOM text rather than canvas text, which is what keeps them
   * findable by find-in-page and scalable with a reader's font settings.
   */
  it("renders the feature names as real text, not canvas glyphs", () => {
    const { container } = render(
      <GenomeTrack data={DEFAULT_TRACK_DATA} tracks={["features"]} />
    );

    const described = Object.values(DEFAULT_TRACK_DATA.feature_notes)[0];

    expect(container).toHaveTextContent(described.label);
  });

  /**
   * The copy control is the component's only real control, and the one piece a
   * canvas could not have provided: it needs a tab stop, a focus ring and an
   * accessible name.
   */
  describe("the sequence copy control", () => {
    const writeText = vi.fn<(text: string) => Promise<void>>();

    beforeEach(() => {
      writeText.mockReset().mockResolvedValue(undefined);
      Object.assign(navigator, { clipboard: { writeText } });
    });

    it("copies the visible range, not the whole window", async () => {
      render(
        <GenomeTrack
          data={DEFAULT_TRACK_DATA}
          tracks={["sequence"]}
          viewport={{ end: 45_471, start: 45_462 }}
        />
      );

      await userEvent.click(screen.getByTestId(COPY_TEST_ID));

      // Ten bases of the payload's 289, taken from the front of the window.
      expect(writeText).toHaveBeenCalledWith(
        DEFAULT_TRACK_DATA.sequence?.slice(0, 10)
      );
    });

    it("names the range it would copy", () => {
      render(
        <GenomeTrack
          data={DEFAULT_TRACK_DATA}
          tracks={["sequence"]}
          viewport={{ end: 45_600, start: 45_500 }}
        />
      );

      expect(
        screen.getByRole("button", { name: "Copy sequence for 45,500–45,600" })
      ).toBeInTheDocument();
    });

    it("confirms a copy that succeeded", async () => {
      render(<GenomeTrack data={DEFAULT_TRACK_DATA} tracks={["sequence"]} />);

      await userEvent.click(screen.getByTestId(COPY_TEST_ID));

      expect(
        screen.getByRole("button", { name: "Sequence copied" })
      ).toBeInTheDocument();
    });

    it("says nothing when the clipboard write fails", async () => {
      writeText.mockRejectedValue(new Error("not allowed"));

      render(<GenomeTrack data={DEFAULT_TRACK_DATA} tracks={["sequence"]} />);

      await userEvent.click(screen.getByTestId(COPY_TEST_ID));

      // A tick for a copy that did not happen is worse than no feedback.
      expect(
        screen.queryByRole("button", { name: "Sequence copied" })
      ).not.toBeInTheDocument();
    });

    it("does not clear the selection it was clicked over", async () => {
      const onSelectionChange = vi.fn();

      render(
        <GenomeTrack
          data={DEFAULT_TRACK_DATA}
          onSelectionChange={onSelectionChange}
          selection={{ id: "ann_0", kind: "block" }}
          tracks={["sequence", "annotations"]}
        />
      );

      await userEvent.click(screen.getByTestId(COPY_TEST_ID));

      // The plot reads a pointer-up it saw no movement on as a click on empty
      // space and reports `null`. The control has to keep its own events to
      // itself or copying would close whatever the user had open.
      expect(onSelectionChange).not.toHaveBeenCalled();
    });

    it("is absent when the payload carries no sequence", () => {
      render(<GenomeTrack data={POOLED_TRACK_DATA} tracks={["sequence"]} />);

      // A 40 kb window exceeds `caps.max_sequence_window`, so there is no
      // sequence row and nothing to copy.
      expect(screen.queryByTestId(COPY_TEST_ID)).not.toBeInTheDocument();
    });
  });

  it("keeps the features row out of the gutter's label list", () => {
    render(<GenomeTrack data={DEFAULT_TRACK_DATA} tracks={["features"]} />);

    // One "Features" heading for the stack. Eight would be the bug that a
    // per-row gutter label produces.
    expect(screen.getAllByText("Features")).toHaveLength(1);
  });
});

describe("row layout", () => {
  it("drops rows the payload cannot fill", () => {
    const { rows } = layoutRows(UNANNOTATED_TRACK_DATA, ROW_OPTIONS);

    // `annotations` is null, so the row goes entirely rather than being drawn
    // blank. The others were asked for and can be filled.
    expect(new Set(rows.map((row) => row.kind))).toEqual(
      new Set(["segments", "features"])
    );
  });

  it("honours the order of the tracks prop", () => {
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, {
      ...ROW_OPTIONS,
      tracks: ["sequence", "segments", "annotations"],
    });

    expect(rows.map((row) => row.kind)).toEqual([
      "sequence",
      "segments",
      "annotations",
    ]);
  });

  it("stacks rows from the top without overlapping", () => {
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, ROW_OPTIONS);

    // The first row starts flush with the plot: nothing is drawn above it to
    // leave room for.
    expect(rows[0].y).toBe(0);

    rows.slice(1).forEach((row, index) => {
      const previous = rows[index];

      expect(row.y).toBeGreaterThanOrEqual(previous.y + previous.height);
    });
  });

  it("reports a height that contains every row", () => {
    const { height, rows } = layoutRows(DEFAULT_TRACK_DATA, ROW_OPTIONS);
    const last = rows[rows.length - 1];

    expect(height).toBe(last.y + last.height);
  });

  it("draws the minimap from the locus, not from the overview payload", () => {
    // `overview` is null and `caps.overview_available` false in this fixture.
    // The row places the viewport inside the payload's own window, so neither
    // has any bearing on whether it can be drawn.
    expect(DEFAULT_TRACK_DATA.overview).toBeNull();
    expect(DEFAULT_TRACK_DATA.caps.overview_available).toBe(false);

    const { rows } = layoutRows(DEFAULT_TRACK_DATA, {
      ...ROW_OPTIONS,
      tracks: ["minimap", "annotations"],
    });

    expect(rows.map((row) => row.kind)).toEqual(["minimap", "annotations"]);
  });

  it("expands the features row into one sub-row per trace", () => {
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, {
      ...ROW_OPTIONS,
      tracks: ["features"],
    });

    expect(rows).toHaveLength(DEFAULT_TRACK_DATA.features.length);
    expect(rows.map((row) => row.traceIndex)).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
  });

  it("caps the features row at maxFeatureRows", () => {
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, {
      ...ROW_OPTIONS,
      maxFeatureRows: 3,
      tracks: ["features"],
    });

    // The endpoint returns up to 128 features for a segment, which at this row
    // height is three thousand pixels of track.
    expect(rows).toHaveLength(3);
  });

  it("labels the features stack once, and each trace individually", () => {
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, {
      ...ROW_OPTIONS,
      tracks: ["features"],
    });

    // One gutter label for the section, not one per row.
    expect(rows.map((row) => row.label)).toEqual([
      "Features",
      ...Array(rows.length - 1).fill(""),
    ]);
    expect(rows.every((row) => Boolean(row.traceLabel))).toBe(true);
  });

  it("falls back to the feature id when nothing describes it", () => {
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, {
      ...ROW_OPTIONS,
      tracks: ["features"],
    });

    // The fixture describes its first two traces and leaves the rest bare,
    // matching a knowledge base that covers a few percent of features — and a
    // checkpoint whose description pipeline has not run covers none.
    const described = Object.keys(DEFAULT_TRACK_DATA.feature_notes).length;
    const bare = rows.filter((row) =>
      /^Feature \d+$/.test(row.traceLabel ?? "")
    );

    expect(bare).toHaveLength(rows.length - described);
  });

  it("drops the feature names at compact density", () => {
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, {
      ...ROW_OPTIONS,
      density: "compact",
      tracks: ["features"],
    });

    // Forty characters per row does not fit a comparison card, so the names go
    // and the rows keep only their bars.
    expect(rows.every((row) => row.traceLabel === undefined)).toBe(true);
    expect(rows.every((row) => row.labelInset === 0)).toBe(true);
  });

  it("finds the row under a y offset, and nothing in the gaps", () => {
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, ROW_OPTIONS);
    const target = rows[0];

    expect(rowAt(rows, target.y)).toBe(target);
    expect(rowAt(rows, target.y + target.height - 1)).toBe(target);

    // The gap after the first row belongs to no row, so a pointer there has to
    // clear the tooltip rather than keep the last thing it found.
    expect(rowAt(rows, target.y + target.height + 1)).toBeNull();
    expect(rowAt(rows, -1)).toBeNull();
    expect(rowAt(rows, rows[rows.length - 1].y + 1000)).toBeNull();
  });

  it("tightens rows at compact density", () => {
    const comfortable = layoutRows(DEFAULT_TRACK_DATA, ROW_OPTIONS);
    const compact = layoutRows(DEFAULT_TRACK_DATA, {
      ...ROW_OPTIONS,
      density: "compact",
    });

    expect(compact.height).toBeLessThan(comfortable.height);
  });
});

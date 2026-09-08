import { render, screen } from "@testing-library/react";
import {
  DEFAULT_TRACK_DATA,
  UNANNOTATED_TRACK_DATA,
} from "../__storybook__/constants";
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
  activationRowHeight: 64,
  blockRowHeight: 28,
  density: "comfortable" as const,
  rulerHeight: 24,
  tracks: ["annotations", "segments", "activation"] as TrackKind[],
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
});

describe("row layout", () => {
  it("drops rows the payload cannot fill", () => {
    const { rows } = layoutRows(UNANNOTATED_TRACK_DATA, ROW_OPTIONS);

    expect(rows.map((row) => row.kind)).toEqual(["segments", "activation"]);
  });

  it("honours the order of the tracks prop", () => {
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, {
      ...ROW_OPTIONS,
      tracks: ["activation", "annotations", "segments"],
    });

    expect(rows.map((row) => row.kind)).toEqual([
      "activation",
      "annotations",
      "segments",
    ]);
  });

  it("stacks rows below the ruler without overlapping", () => {
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, ROW_OPTIONS);

    expect(rows[0].y).toBeGreaterThanOrEqual(ROW_OPTIONS.rulerHeight);

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

  it("accepts unimplemented row kinds without reserving space for them", () => {
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, {
      ...ROW_OPTIONS,
      tracks: ["minimap", "annotations", "features"],
    });

    // Passing a row the component does not draw yet is not an error: a caller
    // written against the final API keeps working as those rows land.
    expect(rows.map((row) => row.kind)).toEqual(["annotations"]);
  });

  it("finds the row under a y offset, and nothing in the gaps", () => {
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, ROW_OPTIONS);
    const target = rows[0];

    expect(rowAt(rows, target.y)).toBe(target);
    expect(rowAt(rows, target.y + target.height - 1)).toBe(target);
    expect(rowAt(rows, target.y + target.height + 1)).not.toBe(target);
    expect(rowAt(rows, 1)).toBeNull();
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

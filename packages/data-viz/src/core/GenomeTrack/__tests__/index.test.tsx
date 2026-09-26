import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DEFAULT_TRACK_DATA,
  NO_OVERVIEW_TRACK_DATA,
  POOLED_TRACK_DATA,
} from "../__storybook__/constants";
import { makeMockGenomeTrackData } from "../__storybook__/mockGenomeTrackData";
import {
  RANKING_OPTION_TEST_ID,
  RANKING_TEST_ID,
} from "../components/RankingDropdown";
import {
  COPY_FULL_TEST_ID,
  COPY_TEST_ID,
  COPY_VISIBLE_TEST_ID,
} from "../components/SequenceCopyButton";
import { TrackKind } from "../GenomeTrack.types";
import GenomeTrack, { TEST_IDS } from "../index";
import { formatRange } from "../utils/format";
import { seriesId } from "../utils/hitTest";
import {
  ROW_LABEL_HEIGHT,
  TrackRow,
  layoutRows,
  packAnnotationLanes,
  rowAt,
  rowLabelHeight,
} from "../utils/layout";

/**
 * Component tests focus on what a canvas cannot show.
 *
 * jsdom has no 2D context, so nothing here asserts pixels — that is Chromatic's
 * job. What is testable, and what actually protects a user, is the DOM the
 * component renders alongside the canvas: the header's authoritative
 * coordinates, the accessible table, and the states that replace the plot
 * entirely.
 */

/** The header title with nothing selected. Shared by several assertions. */
const TITLE = "fixX · E. coli K-12";

const ROW_OPTIONS = {
  blockRowHeight: 28,
  density: "comfortable" as const,
  featureRowHeight: 24,
  maxAnnotationLanes: 4,
  maxFeatureRows: 8,
  showRowLabels: true,
  tracks: ["annotations", "segments", "features"] as TrackKind[],
};

/** An organism with no annotation coverage: `annotations` is null, not empty. */
const NO_ANNOTATIONS = makeMockGenomeTrackData({ withAnnotations: false });

describe("<GenomeTrack />", () => {
  it("states the organism and the exact range in the header", () => {
    render(<GenomeTrack data={DEFAULT_TRACK_DATA} />);

    // Scoped to the header: the same range also appears in the accessible
    // table, and an unscoped query would match both.
    expect(screen.getByTestId(TEST_IDS.title)).toHaveTextContent(TITLE);
    expect(screen.getByTestId(TEST_IDS.range)).toHaveTextContent(
      "45,462–45,750"
    );
  });

  /**
   * The header is the only place that names the selected feature. The minimap
   * shows its trace, but a trace is a shape — it does not say whose it is, and
   * the row that was clicked looks no different from its neighbours.
   */
  describe("the selected feature in the header", () => {
    const first = DEFAULT_TRACK_DATA.features[0];

    it("names it after the gene and organism", () => {
      render(
        <GenomeTrack
          data={DEFAULT_TRACK_DATA}
          selection={{ id: seriesId(first.feature_id), kind: "series" }}
        />
      );

      const note = DEFAULT_TRACK_DATA.feature_notes[String(first.feature_id)];

      expect(screen.getByTestId(TEST_IDS.title)).toHaveTextContent(
        `${TITLE} · ${note?.label || `Feature ${first.feature_id}`}`
      );
    });

    it("says nothing when no feature is selected", () => {
      render(<GenomeTrack data={DEFAULT_TRACK_DATA} />);

      expect(screen.getByTestId(TEST_IDS.title)).toHaveTextContent(TITLE);
      expect(screen.getByTestId(TEST_IDS.title)).not.toHaveTextContent(
        "Feature"
      );
    });

    it("ignores a block selection, which is not a feature", () => {
      render(
        <GenomeTrack
          data={DEFAULT_TRACK_DATA}
          selection={{ id: "ann_0", kind: "block" }}
        />
      );

      expect(screen.getByTestId(TEST_IDS.title)).toHaveTextContent(TITLE);
    });

    it("names a selected feature the payload no longer carries", () => {
      render(
        <GenomeTrack
          data={DEFAULT_TRACK_DATA}
          selection={{ id: seriesId(999_999), kind: "series" }}
        />
      );

      // A re-fetch re-ranks the features, so panning can drop the selected one
      // while the minimap still draws its trace. Falling back to the id keeps
      // the header and the minimap agreeing about whose signal is on screen.
      expect(screen.getByTestId(TEST_IDS.title)).toHaveTextContent(
        "Feature 999999"
      );
    });
  });

  /**
   * The key for the segment colours. Without it the row is coloured and
   * unreadable — a hue means nothing until something names it.
   */
  describe("the segment category legend", () => {
    it("lists the categories on screen, and only those", () => {
      render(<GenomeTrack data={DEFAULT_TRACK_DATA} />);

      const enumerated = DEFAULT_TRACK_DATA.segment_categories ?? [];
      const present = new Set(
        DEFAULT_TRACK_DATA.segments.map((segment) => segment.category)
      );
      // Scoped to the legend: the accessible table names categories too, and
      // an unscoped query matches both.
      const legend = within(screen.getByTestId(TEST_IDS.legend));

      // The fixture's enum is deliberately wider than any one window, so this
      // is a real distinction rather than a tautology.
      expect(present.size).toBeLessThan(enumerated.length);

      enumerated.forEach((category) => {
        const found = legend.queryByText(category);

        if (present.has(category)) {
          expect(found).toBeInTheDocument();
        } else {
          // A key to colours nothing on screen is using is noise.
          expect(found).not.toBeInTheDocument();
        }
      });
    });

    it("keeps stranded names, so both strands are explained", () => {
      render(<GenomeTrack data={DEFAULT_TRACK_DATA} />);

      const legend = within(screen.getByTestId(TEST_IDS.legend));

      // Colour is the category and the stripe is the strand, so the key has to
      // name both forms — collapsing them would leave the stripes unexplained.
      expect(legend.getByText("+CDS")).toBeInTheDocument();
      expect(legend.getByText("-CDS")).toBeInTheDocument();
    });

    /**
     * The offsets the layout computes are plot-relative, so the key has to be
     * positioned against the plot. Rendered as a sibling of it instead, `top`
     * resolves against the root and the header's height shifts the key up onto
     * the segments row — which is exactly what happened, and what nothing here
     * noticed, because the y value was asserted and its frame of reference was
     * not.
     */
    it("is positioned inside the plot, whose coordinates its top is in", () => {
      render(<GenomeTrack data={DEFAULT_TRACK_DATA} />);

      const plot = screen.getByRole("img", { name: /Genome track/ });

      expect(plot).toContainElement(screen.getByTestId(TEST_IDS.legend));
    });

    it("takes no pointer events, so it cannot block a drag on the plot", () => {
      render(<GenomeTrack data={DEFAULT_TRACK_DATA} />);

      // It lives inside the interactive plot surface, so it has to be inert or
      // it would punch a hole in pan and zoom.
      expect(screen.getByTestId(TEST_IDS.legend)).toHaveStyle({
        pointerEvents: "none",
      });
    });

    it("sits directly under the segments row it explains", () => {
      const { rows, segmentLegendY } = layoutRows(DEFAULT_TRACK_DATA, {
        ...ROW_OPTIONS,
        tracks: ["segments", "features"],
      });
      const segments = rows.find((row) => row.kind === "segments") as TrackRow;

      // Reserved in the layout rather than appended to the track, so the key
      // is beneath the colours rather than at the foot of everything.
      expect(segmentLegendY).toBe(segments.y + segments.height);

      const below = rows.filter((row) => row.y > (segmentLegendY as number));

      expect(below.length).toBeGreaterThan(0);
    });

    it("is absent when no segments row was asked for", () => {
      render(
        <GenomeTrack data={DEFAULT_TRACK_DATA} tracks={["annotations"]} />
      );

      // A key to colours nothing on screen is using explains nothing.
      expect(screen.queryByTestId(TEST_IDS.legend)).not.toBeInTheDocument();
    });

    it("is absent when the window holds no segments", () => {
      render(
        <GenomeTrack
          data={{ ...DEFAULT_TRACK_DATA, segments: [] }}
          tracks={["segments"]}
        />
      );

      expect(screen.queryByTestId(TEST_IDS.legend)).not.toBeInTheDocument();
    });

    it("is absent when the payload carries no enum", () => {
      render(
        <GenomeTrack
          data={{ ...DEFAULT_TRACK_DATA, segment_categories: undefined }}
          tracks={["segments"]}
        />
      );

      expect(screen.queryByTestId(TEST_IDS.legend)).not.toBeInTheDocument();
    });
  });

  /**
   * `rank_by` is a tool parameter, not a view option: it changes which features
   * come back and in what order. So the dropdown reports a request for
   * different data and changes nothing itself.
   */
  describe("the feature ranking dropdown", () => {
    it("shows the current ranking under the design's name for it", () => {
      render(
        <GenomeTrack data={DEFAULT_TRACK_DATA} onRankingChange={vi.fn()} />
      );

      expect(screen.getByTestId(RANKING_TEST_ID)).toHaveTextContent("Z-Score");
    });

    it("calls back with the tool's wire value, not the label", () => {
      const onRankingChange = vi.fn();

      render(
        <GenomeTrack
          data={DEFAULT_TRACK_DATA}
          onRankingChange={onRankingChange}
        />
      );

      return userEvent
        .click(screen.getByTestId(RANKING_TEST_ID))
        .then(() =>
          userEvent.click(screen.getByTestId(RANKING_OPTION_TEST_ID.peak))
        )
        .then(() => {
          // "Raw" is the label; `peak` is what `rank_by` takes. Sending the
          // label would be rejected by the tool.
          expect(onRankingChange).toHaveBeenCalledWith("peak");
        });
    });

    it("does not change the label on its own", async () => {
      const onRankingChange = vi.fn();

      render(
        <GenomeTrack
          data={DEFAULT_TRACK_DATA}
          onRankingChange={onRankingChange}
        />
      );

      await userEvent.click(screen.getByTestId(RANKING_TEST_ID));
      await userEvent.click(screen.getByTestId(RANKING_OPTION_TEST_ID.peak));

      // Controlled with no fallback: the label follows the prop, so it stays
      // until the shell has actually re-fetched. Flipping it locally would
      // claim a ranking the rows do not have.
      expect(screen.getByTestId(RANKING_TEST_ID)).toHaveTextContent("Z-Score");
    });

    it("reflects the ranking it is given", () => {
      render(
        <GenomeTrack
          data={DEFAULT_TRACK_DATA}
          onRankingChange={vi.fn()}
          ranking="peak"
        />
      );

      expect(screen.getByTestId(RANKING_TEST_ID)).toHaveTextContent("Raw");
    });

    it("is absent when nobody is listening", () => {
      render(<GenomeTrack data={DEFAULT_TRACK_DATA} />);

      // A control that does nothing when used is worse than no control.
      expect(screen.queryByTestId(RANKING_TEST_ID)).not.toBeInTheDocument();
    });

    it("is absent when no features row was asked for", () => {
      render(
        <GenomeTrack
          data={DEFAULT_TRACK_DATA}
          onRankingChange={vi.fn()}
          tracks={["annotations"]}
        />
      );

      expect(screen.queryByTestId(RANKING_TEST_ID)).not.toBeInTheDocument();
    });

    /**
     * Whether a control exists must depend on whether a caller is listening,
     * not on a presentation prop.
     *
     * This anchored itself on the features row's `headerHeight`, which
     * `showRowLabels={false}` drives to zero — so the dropdown disappeared in
     * exactly the documented compact configuration, while the copy button
     * beside it survived because it fell back to the row's own height.
     */
    it("is present when section labels are off", () => {
      render(
        <GenomeTrack
          data={DEFAULT_TRACK_DATA}
          onRankingChange={vi.fn()}
          showRowLabels={false}
        />
      );

      expect(screen.getByTestId(RANKING_TEST_ID)).toBeInTheDocument();
    });
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
    render(<GenomeTrack data={NO_ANNOTATIONS} />);

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
   * Feature names are the one label that does not sit on a section's header
   * line — there is one per trace and only one header — so they are drawn
   * inside their own rows. They are still DOM text, which is what keeps them
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

    /** Opens the menu and picks one of its two items. */
    async function chooseCopy(testId: string): Promise<void> {
      await userEvent.click(screen.getByTestId(COPY_TEST_ID));
      await userEvent.click(screen.getByTestId(testId));
    }

    it("copies only the visible range when asked for it", async () => {
      render(
        <GenomeTrack
          data={DEFAULT_TRACK_DATA}
          tracks={["sequence"]}
          viewport={{ end: 45_471, start: 45_462 }}
        />
      );

      await chooseCopy(COPY_VISIBLE_TEST_ID);

      // Ten bases of the payload's 289, taken from the front of the window.
      expect(writeText).toHaveBeenCalledWith(
        DEFAULT_TRACK_DATA.sequence?.slice(0, 10)
      );
    });

    it("copies the whole payload when asked for that instead", async () => {
      render(
        <GenomeTrack
          data={DEFAULT_TRACK_DATA}
          tracks={["sequence"]}
          viewport={{ end: 45_471, start: 45_462 }}
        />
      );

      await chooseCopy(COPY_FULL_TEST_ID);

      // The distinction the menu exists for: a single button had to guess, and
      // either guess is wrong half the time.
      expect(writeText).toHaveBeenCalledWith(DEFAULT_TRACK_DATA.sequence);
    });

    it("names both ranges, so the choice is concrete", async () => {
      render(
        <GenomeTrack
          data={DEFAULT_TRACK_DATA}
          tracks={["sequence"]}
          viewport={{ end: 45_600, start: 45_500 }}
        />
      );

      await userEvent.click(screen.getByTestId(COPY_TEST_ID));

      expect(screen.getByTestId(COPY_VISIBLE_TEST_ID)).toHaveTextContent(
        "Copy Visible Segment (45,500–45,600)"
      );
      expect(screen.getByTestId(COPY_FULL_TEST_ID)).toHaveTextContent(
        "Copy Full Segment (45,462–45,750)"
      );
    });

    it("offers no full copy when the whole payload is already visible", async () => {
      render(<GenomeTrack data={DEFAULT_TRACK_DATA} tracks={["sequence"]} />);

      await userEvent.click(screen.getByTestId(COPY_TEST_ID));

      // Two items that would copy identical text is a choice without a
      // difference, and inviting it suggests there is one.
      expect(screen.getByTestId(COPY_FULL_TEST_ID)).toHaveAttribute(
        "aria-disabled",
        "true"
      );
    });

    it("is a real button that advertises its menu", async () => {
      render(<GenomeTrack data={DEFAULT_TRACK_DATA} tracks={["sequence"]} />);

      const button = screen.getByTestId(COPY_TEST_ID);

      // The states the styling hangs off, and the ones a screen reader needs:
      // `aria-expanded` is also what keeps the icon indigo while the menu is
      // open, so it is load-bearing rather than decorative.
      expect(button.tagName).toBe("BUTTON");
      expect(button).toHaveAttribute("aria-haspopup", "menu");
      expect(button).toHaveAttribute("aria-expanded", "false");

      await userEvent.click(button);

      expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("confirms a copy that succeeded", async () => {
      render(<GenomeTrack data={DEFAULT_TRACK_DATA} tracks={["sequence"]} />);

      await chooseCopy(COPY_VISIBLE_TEST_ID);

      expect(
        screen.getByRole("button", { name: "Sequence copied" })
      ).toBeInTheDocument();
    });

    it("says nothing when the clipboard write fails", async () => {
      writeText.mockRejectedValue(new Error("not allowed"));

      render(<GenomeTrack data={DEFAULT_TRACK_DATA} tracks={["sequence"]} />);

      await chooseCopy(COPY_VISIBLE_TEST_ID);

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

  it("names the features section once, not once per trace", () => {
    render(<GenomeTrack data={DEFAULT_TRACK_DATA} tracks={["features"]} />);

    // One "Features" heading for the stack. Eight would be the bug that a
    // a per-row label would produce.
    expect(screen.getAllByText("Features")).toHaveLength(1);
  });
});

/**
 * Row kinds with consecutive repeats collapsed.
 *
 * Two kinds expand into several rows — features into one per trace,
 * annotations into one per lane — so the raw list of kinds is about packing
 * rather than about order. This is what the `tracks` prop actually promises.
 */
function sectionKinds(rows: TrackRow[]): TrackKind[] {
  return rows
    .map((row) => row.kind)
    .filter((kind, index, all) => kind !== all[index - 1]);
}

/**
 * Re-fetching a finer stride on zoom is a shell concern, but it only works if
 * the component survives having its data replaced under the user. These are the
 * component-side preconditions for it.
 */
describe("re-fetching on zoom", () => {
  /** The plot, which is the element that takes keyboard navigation. */
  const plot = () => screen.getByRole("img", { name: /Genome track/ });

  /**
   * Focuses the plot and zooms all the way out.
   *
   * Twelve notches at the component's own zoom step takes a 289 bp window past
   * a megabase, so the result is whatever the clamp allows rather than a
   * partial zoom — which is the thing under test in every caller.
   */
  async function zoomOutFully(): Promise<void> {
    plot().focus();

    for (let step = 0; step < 12; step += 1) {
      await userEvent.keyboard("{ArrowDown}");
    }
  }

  it("lets the user zoom out past the payload window", async () => {
    const onViewportChange = vi.fn();

    render(
      <GenomeTrack
        data={DEFAULT_TRACK_DATA}
        onViewportChange={onViewportChange}
      />
    );

    // Zooming out repeatedly has to escape the payload's window, or a shell
    // that re-fetched the zoomed range would have trapped the user inside it —
    // each zoom-in permanently narrowing the reachable genome.
    await zoomOutFully();

    const last = onViewportChange.mock.lastCall?.[0];

    expect(last.end - last.start + 1).toBeGreaterThan(
      DEFAULT_TRACK_DATA.locus.end - DEFAULT_TRACK_DATA.locus.start + 1
    );
  });

  it("stops zooming out before the data becomes a sliver", async () => {
    const onViewportChange = vi.fn();

    render(
      <GenomeTrack
        data={DEFAULT_TRACK_DATA}
        onViewportChange={onViewportChange}
      />
    );

    await zoomOutFully();

    const { locus } = DEFAULT_TRACK_DATA;
    const loaded = locus.end - locus.start + 1;
    const last = onViewportChange.mock.lastCall?.[0];
    const visible = last.end - last.start + 1;

    // The regression this guards: with navigation reaching the whole
    // chromosome, twelve notches took a 289 bp payload to a 20 kb view, which
    // drew every row in a 25 px column surrounded by empty plot. The bound
    // keeps the loaded data over a third of the width.
    expect(loaded / visible).toBeGreaterThanOrEqual(1 / 3);
    expect(visible).toBeLessThan(loaded * 3.1);
  });

  it("pins the viewport to the payload at margin zero", async () => {
    const onViewportChange = vi.fn();

    render(
      <GenomeTrack
        data={DEFAULT_TRACK_DATA}
        navigationMargin={0}
        onViewportChange={onViewportChange}
      />
    );

    await zoomOutFully();

    expect(onViewportChange.mock.lastCall?.[0]).toEqual({
      end: DEFAULT_TRACK_DATA.locus.end,
      start: DEFAULT_TRACK_DATA.locus.start,
    });
  });

  it("widens the reachable range as the margin grows", async () => {
    const spans: number[] = [];

    for (const margin of [1, 4]) {
      const onViewportChange = vi.fn();
      const view = render(
        <GenomeTrack
          data={DEFAULT_TRACK_DATA}
          navigationMargin={margin}
          onViewportChange={onViewportChange}
        />
      );

      await zoomOutFully();

      const last = onViewportChange.mock.lastCall?.[0];

      spans.push(last.end - last.start + 1);
      view.unmount();
    }

    expect(spans[1]).toBeGreaterThan(spans[0]);
  });

  it("holds the viewport inside the payload when there is no chromosome", async () => {
    const onViewportChange = vi.fn();

    render(
      <GenomeTrack
        data={NO_OVERVIEW_TRACK_DATA}
        onViewportChange={onViewportChange}
      />
    );

    await zoomOutFully();

    const window = {
      end: NO_OVERVIEW_TRACK_DATA.locus.end,
      start: NO_OVERVIEW_TRACK_DATA.locus.start,
    };
    const last = onViewportChange.mock.lastCall?.[0];

    // Nothing in this payload says what is outside its window, so the track
    // claims nothing: zooming out stops at the data, as it always did.
    expect(last).toEqual(window);
  });

  it("opens at the payload window, not zoomed out to the chromosome", () => {
    render(<GenomeTrack data={DEFAULT_TRACK_DATA} />);

    // The extent is the chromosome but the *viewport* must not be: a caller
    // handing over one window is asking to see that window, not to see it as a
    // sliver of 4.6 Mb.
    expect(screen.getByTestId(TEST_IDS.range)).toHaveTextContent(
      formatRange(DEFAULT_TRACK_DATA.locus.start, DEFAULT_TRACK_DATA.locus.end)
    );
  });

  it("states which part of the viewport is loaded once it leaves the payload", () => {
    const { locus } = DEFAULT_TRACK_DATA;

    render(
      <GenomeTrack
        data={DEFAULT_TRACK_DATA}
        viewport={{ end: locus.end + 5_000, start: locus.start - 5_000 }}
      />
    );

    // The wash and the minimap's outline say this visually, and both are
    // canvas — so without this the fact is unavailable to a screen reader.
    expect(screen.getByTestId(TEST_IDS.range)).toHaveTextContent(
      `${formatRange(locus.start, locus.end)} loaded`
    );
  });

  it("says nothing about loading when the payload covers the view", () => {
    render(<GenomeTrack data={DEFAULT_TRACK_DATA} />);

    expect(screen.getByTestId(TEST_IDS.range)).not.toHaveTextContent("loaded");
  });

  it("keeps the data on screen while a re-fetch is in flight", () => {
    render(<GenomeTrack data={DEFAULT_TRACK_DATA} refreshing />);

    // The distinction from `loading`, which is the whole reason the prop
    // exists: a shell re-fetching on every wheel notch would otherwise blank
    // the plot each time.
    expect(screen.queryByTestId(TEST_IDS.skeleton)).not.toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.progress)).toBeInTheDocument();
    expect(
      screen.getByRole("table", { name: /Reference annotations/ })
    ).toBeInTheDocument();
    expect(plot()).toHaveAttribute("aria-busy", "true");
  });

  it("shows no progress bar when it is not refreshing", () => {
    render(<GenomeTrack data={DEFAULT_TRACK_DATA} />);

    expect(screen.queryByTestId(TEST_IDS.progress)).not.toBeInTheDocument();
    expect(plot()).not.toHaveAttribute("aria-busy");
  });

  it("still prefers the skeleton on a first load", () => {
    render(<GenomeTrack data={null} loading refreshing />);

    // `loading` wins: there is no last good data to keep, so the skeleton is
    // the honest state even though a fetch is also in flight.
    expect(screen.getByTestId(TEST_IDS.skeleton)).toBeInTheDocument();
    expect(screen.queryByTestId(TEST_IDS.progress)).not.toBeInTheDocument();
  });

  it("reports the resolution of the data on screen, not of the pending fetch", () => {
    render(<GenomeTrack data={POOLED_TRACK_DATA} refreshing />);

    // Claiming the finer stride before its data has landed would overstate the
    // precision of what the user is looking at.
    expect(screen.getByTestId(TEST_IDS.range)).toHaveTextContent(
      `${POOLED_TRACK_DATA.bins.stride} bp/point`
    );
  });

  /**
   * What a window re-fetch looks like on the wire: same chromosome, narrower
   * window, and `overview` omitted because the shell sent it once already.
   */
  const refetched = {
    ...DEFAULT_TRACK_DATA,
    caps: { ...DEFAULT_TRACK_DATA.caps, overview_available: true },
    locus: { ...DEFAULT_TRACK_DATA.locus, end: 45_600, start: 45_500 },
    overview: null,
  };

  it("keeps the chromosome overview when a re-fetch omits it", async () => {
    const onViewportChange = vi.fn();
    const { rerender } = render(
      <GenomeTrack
        data={DEFAULT_TRACK_DATA}
        onViewportChange={onViewportChange}
      />
    );

    rerender(
      <GenomeTrack data={refetched} onViewportChange={onViewportChange} />
    );

    onViewportChange.mockClear();
    await zoomOutFully();

    // Still able to zoom out past the re-fetched window, which is only true if
    // the overview survived being omitted. Dropping it would collapse the
    // extent onto the narrow window and trap the user there — the failure the
    // retention contract exists to prevent, and one that would first appear on
    // the user's second zoom rather than at load.
    const last = onViewportChange.mock.lastCall?.[0];

    expect(last.end - last.start + 1).toBeGreaterThan(
      refetched.locus.end - refetched.locus.start + 1
    );
  });

  it("drops a retained overview when the chromosome changes", async () => {
    const onViewportChange = vi.fn();
    const { rerender } = render(
      <GenomeTrack
        data={DEFAULT_TRACK_DATA}
        onViewportChange={onViewportChange}
      />
    );

    // A different chromosome with no overview of its own. Serving the previous
    // one would let the user pan into coordinates this chromosome does not
    // have, so the retention has to be keyed and dropped.
    const elsewhere = {
      ...refetched,
      caps: { ...refetched.caps, overview_available: false },
      locus: { ...refetched.locus, accession: "NC_999999.1", chrom: "chrX" },
    };

    rerender(
      <GenomeTrack data={elsewhere} onViewportChange={onViewportChange} />
    );

    onViewportChange.mockClear();
    await zoomOutFully();

    expect(onViewportChange.mock.lastCall?.[0]).toEqual({
      end: elsewhere.locus.end,
      start: elsewhere.locus.start,
    });
  });
});

describe("section names", () => {
  it("renders one name per section as real text", () => {
    render(
      <GenomeTrack
        data={DEFAULT_TRACK_DATA}
        tracks={["sequence", "annotations", "segments", "features"]}
      />
    );

    ["Sequence", "Annotations", "Predicted", "Features"].forEach((name) => {
      // Exactly one: the annotation lanes and the features stack are several
      // rows sharing a section, and a name per row would read as several
      // sections that happen to be adjacent.
      expect(screen.getAllByText(name)).toHaveLength(1);
    });
  });

  it("drops them when asked, for the compact card", () => {
    render(
      <GenomeTrack
        data={DEFAULT_TRACK_DATA}
        showRowLabels={false}
        tracks={["annotations", "segments"]}
      />
    );

    expect(screen.queryByText("Annotations")).not.toBeInTheDocument();
    expect(screen.queryByText("Predicted")).not.toBeInTheDocument();
  });

  it("reclaims the vertical line when they are off", () => {
    const withLabels = layoutRows(DEFAULT_TRACK_DATA, ROW_OPTIONS);
    const without = layoutRows(DEFAULT_TRACK_DATA, {
      ...ROW_OPTIONS,
      showRowLabels: false,
    });

    // The trade the move makes: the plot gets its width back and pays for it in
    // height, so turning the names off has to actually return the height.
    expect(without.height).toBeLessThan(withLabels.height);
    expect(without.rows[0].y).toBe(0);
  });

  /**
   * Equal bands with centred contents is what makes the gap between a heading
   * and its data the same in every section. Sizing sections individually can
   * only match on one edge.
   *
   * The floor is the rule plus the copy control, whose height SDS fixes at
   * 28 px on `medium` and 24 px on `small` — taller than the text, so the text
   * is not what sizes the band.
   */
  it("uses one band height for every named section, big enough for the control", () => {
    const BUTTON = { comfortable: 28, compact: 24 };

    (["comfortable", "compact"] as const).forEach((density) => {
      const named: TrackKind[] = [
        "sequence",
        "annotations",
        "segments",
        "features",
      ];

      named.forEach((kind) => {
        expect(rowLabelHeight(kind, density, true)).toBe(
          ROW_LABEL_HEIGHT[density]
        );
      });

      // Room for the rule and the button, with clearance either side.
      expect(ROW_LABEL_HEIGHT[density]).toBeGreaterThan(1 + BUTTON[density]);
    });

    // Still tighter in a card than in the standalone view.
    expect(ROW_LABEL_HEIGHT.compact).toBeLessThan(ROW_LABEL_HEIGHT.comfortable);
  });

  it("leaves the same gap above every section's data", () => {
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, {
      ...ROW_OPTIONS,
      tracks: ["sequence", "annotations", "segments", "features"],
    });

    // The property the centring exists for. Each named row's band is the same
    // height and its name is centred in it, so the distance from name to data
    // is identical — including in the sequence section, whose band also holds
    // the copy control.
    const bands = rows
      .filter((row) => row.headerHeight)
      .map((row) => row.headerHeight);

    expect(bands).toHaveLength(4);
    expect(new Set(bands).size).toBe(1);
  });

  it("gives an unnamed section no line at all", () => {
    (["comfortable", "compact"] as const).forEach((density) => {
      expect(rowLabelHeight("minimap", density, true)).toBe(0);
      // And labels off means no line anywhere.
      expect(rowLabelHeight("sequence", density, false)).toBe(0);
    });
  });

  it("leaves the minimap unnamed, and spends no line on it", () => {
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, {
      ...ROW_OPTIONS,
      tracks: ["minimap", "sequence"],
    });
    const [minimap, sequence] = rows;

    // Naming it would restate what the chromosome bar plainly is, and cost a
    // line of height to do so — so the row starts flush with the plot.
    expect(minimap.label).toBe("");
    expect(minimap.headerHeight).toBe(0);
    expect(minimap.y).toBe(0);

    // The sequence section below it still gets its own line.
    expect(sequence.label).toBe("Sequence");
    expect(sequence.headerHeight).toBe(
      rowLabelHeight("sequence", "comfortable", true)
    );
  });

  it("renders no Minimap heading", () => {
    render(
      <GenomeTrack data={DEFAULT_TRACK_DATA} tracks={["minimap", "segments"]} />
    );

    expect(screen.queryByText("Minimap")).not.toBeInTheDocument();
    expect(screen.getByText("Predicted")).toBeInTheDocument();
  });

  it("keeps the copy control on the sequence section's own line", () => {
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, {
      ...ROW_OPTIONS,
      tracks: ["sequence"],
    });
    const [sequence] = rows;

    // The control is positioned from these two numbers, so a header the layout
    // did not reserve would put it on top of the letters.
    expect(sequence.headerHeight).toBeGreaterThan(0);
    expect(sequence.y).toBe(sequence.headerHeight);
  });
});

describe("row layout", () => {
  it("drops rows the payload cannot fill", () => {
    const { rows } = layoutRows(NO_ANNOTATIONS, ROW_OPTIONS);

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

    expect(sectionKinds(rows)).toEqual(["sequence", "segments", "annotations"]);
  });

  it("stacks rows from the top without overlapping", () => {
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, ROW_OPTIONS);

    // The first row starts below its own section name, which is the one thing
    // drawn above it. Flush with the plot would clip the label.
    expect(rows[0].y).toBe(rows[0].headerHeight);
    expect(rows[0].headerHeight).toBeGreaterThan(0);

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

  it("keeps the minimap row with or without a chromosome overview", () => {
    // The row is always drawable: with an overview it spans the chromosome,
    // and without one it falls back to the payload's own window. So neither
    // `overview` nor `caps.overview_available` has any bearing on whether the
    // row exists — only on what it spans.
    expect(NO_OVERVIEW_TRACK_DATA.overview).toBeNull();
    expect(NO_OVERVIEW_TRACK_DATA.caps.overview_available).toBe(false);

    [DEFAULT_TRACK_DATA, NO_OVERVIEW_TRACK_DATA].forEach((data) => {
      const { rows } = layoutRows(data, {
        ...ROW_OPTIONS,
        tracks: ["minimap", "annotations"],
      });

      expect(sectionKinds(rows)).toEqual(["minimap", "annotations"]);
    });
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
      showRowLabels: true,
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

    // One name for the section, not one per row.
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

  it("expands the annotations row into one row per lane", () => {
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, {
      ...ROW_OPTIONS,
      tracks: ["annotations"],
    });

    // The fixture contains a nested tRNA, so it cannot fit in one lane.
    expect(rows.length).toBeGreaterThan(1);
    expect(rows.map((row) => row.laneIndex)).toEqual(
      rows.map((_, index) => index)
    );

    // Every annotation is drawn exactly once, in exactly one lane.
    const drawn = rows.flatMap((row) => row.laneBlocks ?? []);

    expect(new Set(drawn.map((block) => block.id)).size).toBe(
      DEFAULT_TRACK_DATA.annotations?.length
    );
  });

  it("labels only the top annotation lane, so the stack reads as one row", () => {
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, {
      ...ROW_OPTIONS,
      tracks: ["annotations"],
    });

    expect(rows.filter((row) => row.label)).toHaveLength(1);
    expect(rows[0].label).toBe("Annotations");
  });

  it("keeps a single labelled lane when nothing overlaps", () => {
    // The row is as tall as the data needs and no taller: a window without
    // overlaps has to look exactly as it did before lanes existed.
    const annotations = (DEFAULT_TRACK_DATA.annotations ?? []).slice(0, 1);
    const { rows } = layoutRows(
      { ...DEFAULT_TRACK_DATA, annotations },
      { ...ROW_OPTIONS, tracks: ["annotations"] }
    );

    expect(rows).toHaveLength(1);
    expect(rows[0].height).toBe(ROW_OPTIONS.blockRowHeight);
  });

  it("draws an empty annotations row, because [] is not null", () => {
    // `[]` means the organism was annotated and this window has no genes;
    // `null` means nobody looked. The first is a row, the second is not.
    const { rows } = layoutRows(
      { ...DEFAULT_TRACK_DATA, annotations: [] },
      { ...ROW_OPTIONS, tracks: ["annotations"] }
    );

    expect(rows).toHaveLength(1);
    expect(rows[0].laneBlocks).toEqual([]);
  });

  it("counts the annotations the lane cap left undrawn", () => {
    const capped = layoutRows(DEFAULT_TRACK_DATA, {
      ...ROW_OPTIONS,
      maxAnnotationLanes: 1,
      tracks: ["annotations"],
    });

    expect(capped.rows).toHaveLength(1);
    expect(capped.annotationOverflow).toBeGreaterThan(0);

    // Nothing is dropped at the default cap, which is the case that matters:
    // a real payload must not lose a gene to the ceiling.
    expect(layoutRows(DEFAULT_TRACK_DATA, ROW_OPTIONS).annotationOverflow).toBe(
      0
    );
  });
});

/**
 * The packing is what makes the annotations row correct rather than merely
 * prettier: `hitTest` binary-searches a lane on `end`, which is only valid
 * because a lane cannot contain overlapping blocks.
 */
describe("packAnnotationLanes", () => {
  const block = (id: string, start: number, end: number) => ({
    end,
    id,
    kind: "CDS",
    name: id,
    start,
    strand: "+" as const,
  });

  it("keeps non-overlapping blocks in one lane", () => {
    const { lanes, overflow } = packAnnotationLanes(
      [block("a", 1, 100), block("b", 101, 200), block("c", 400, 500)],
      4
    );

    expect(lanes).toHaveLength(1);
    expect(overflow).toBe(0);
  });

  it("pushes a partial overlap to the next lane", () => {
    const { lanes } = packAnnotationLanes(
      [block("a", 1, 100), block("b", 90, 200)],
      4
    );

    expect(lanes.map((lane) => lane.map((entry) => entry.id))).toEqual([
      ["a"],
      ["b"],
    ]);
  });

  it("pushes a nested block to the next lane", () => {
    // The case a flat row hides completely: `inner` is drawn over by `outer`
    // and, before lanes, was unreachable by the pointer as well.
    const { lanes } = packAnnotationLanes(
      [block("outer", 1, 1000), block("inner", 400, 500)],
      4
    );

    expect(lanes.map((lane) => lane.map((entry) => entry.id))).toEqual([
      ["outer"],
      ["inner"],
    ]);
  });

  it("reuses a lane once its last block has ended", () => {
    // Lane reuse is the whole point of packing rather than one lane per block:
    // `c` clears `a`, so it goes back on top instead of opening a third lane.
    const { lanes } = packAnnotationLanes(
      [block("a", 1, 100), block("b", 50, 150), block("c", 200, 300)],
      4
    );

    expect(lanes.map((lane) => lane.map((entry) => entry.id))).toEqual([
      ["a", "c"],
      ["b"],
    ]);
  });

  it("never puts two overlapping blocks in the same lane", () => {
    const { lanes } = packAnnotationLanes(
      DEFAULT_TRACK_DATA.annotations ?? [],
      4
    );

    lanes.forEach((lane) => {
      lane.slice(1).forEach((entry, index) => {
        expect(entry.start).toBeGreaterThan(lane[index].end);
      });
    });
  });

  it("sorts by start rather than trusting the payload's order", () => {
    // An unsorted payload would not draw badly, it would silently pack
    // overlapping blocks together and take the hit-test's binary search with
    // it — so the precondition is established here rather than assumed.
    const { lanes } = packAnnotationLanes(
      [block("late", 400, 500), block("early", 1, 100)],
      4
    );

    expect(lanes).toHaveLength(1);
    expect(lanes[0].map((entry) => entry.id)).toEqual(["early", "late"]);
  });

  it("counts blocks past the cap instead of stacking them into the last lane", () => {
    const { lanes, overflow } = packAnnotationLanes(
      [block("a", 1, 1000), block("b", 2, 900), block("c", 3, 800)],
      2
    );

    expect(lanes).toHaveLength(2);
    expect(overflow).toBe(1);

    // The surviving lanes still hold the invariant. Crammed in, `c` would have
    // broken it.
    expect(lanes.every((lane) => lane.length === 1)).toBe(true);
  });

  it("always leaves room for one lane, however the cap is set", () => {
    expect(packAnnotationLanes([block("a", 1, 100)], 0).lanes).toHaveLength(1);
    expect(packAnnotationLanes([block("a", 1, 100)], -3).lanes).toHaveLength(1);
  });
});

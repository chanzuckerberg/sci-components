import { defaultTheme } from "@czi-sds/components";
import { ThemeProvider } from "@mui/material/styles";
import {
  RenderResult,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { PLASMA_COLOR_SCALE } from "../../../common/colorScales";
import StructureLegend, {
  StructureLegendProps,
} from "../components/StructureLegend";
import type { ChainRef, ResidueReadout } from "../ProteinStructureViewer.types";
import { PLDDT_BAND_COLORS, PLDDT_COLOR_SCALE } from "../utils/plddt";

const MEAN_PLDDT_LABEL = "Mean pLDDT";

/** A readout for one residue, which is the common case in these tests. */
function readout(
  label: string,
  plddt: number | null,
  value: number | null = null,
  residueCount = 1
): ResidueReadout {
  return { label, plddt, residueCount, value };
}

/** Caption an overlay puts on the color key, in place of the pLDDT one. */
const OVERLAY_LABEL = "Feature activation";

/** Accessible name of barnase's visibility toggle in the chain legend. */
const HIDE_BARNASE = "Hide chain A";

const STATS = [
  { label: "Known", value: "62%" },
  { label: "pTM", value: "0.874" },
  { label: MEAN_PLDDT_LABEL, value: "0.781" },
];

function renderLegend(props: Partial<StructureLegendProps> = {}): RenderResult {
  return render(
    <ThemeProvider theme={defaultTheme}>
      <StructureLegend
        scale={PLDDT_COLOR_SCALE}
        scaleLabel="pLDDT"
        showSequenceViewer
        stats={STATS}
        {...props}
      />
    </ThemeProvider>
  );
}

describe("<StructureLegend />", () => {
  it("shows the whole-structure stats when no residue is active", () => {
    renderLegend();

    expect(screen.getByText("Known")).toBeInTheDocument();
    expect(screen.getByText("62%")).toBeInTheDocument();
    expect(screen.getByText("pTM")).toBeInTheDocument();
    expect(screen.getByText(MEAN_PLDDT_LABEL)).toBeInTheDocument();
  });

  it("replaces the stats with the hovered residue's readout", () => {
    renderLegend({
      hoveredResidue: readout("PHE 17", 0.912),
    });

    expect(screen.getByText("Residue")).toBeInTheDocument();
    expect(screen.getByText("PHE 17")).toBeInTheDocument();
    expect(screen.getByText("0.912")).toBeInTheDocument();
    expect(screen.queryByText("Known")).not.toBeInTheDocument();
    expect(screen.queryByText(MEAN_PLDDT_LABEL)).not.toBeInTheDocument();

    // Once as the readout's slot label, once as the color scale caption.
    expect(screen.getAllByText("pLDDT")).toHaveLength(2);
  });

  it("keeps the middle stat when no overlay is active", () => {
    renderLegend({
      hoveredResidue: readout("PHE 17", 0.912),
    });

    expect(screen.getByText("pTM")).toBeInTheDocument();
    expect(screen.getByText("0.874")).toBeInTheDocument();
  });

  it("dashes the overlay slot for a residue the overlay has no value for", () => {
    // The slot is the overlay's while one is set, so falling back to the stat
    // here would read as a value the overlay had reported. The structure
    // paints these residues neutral; the readout says the same thing.
    renderLegend({
      hoveredResidue: readout("PHE 17", 0.912),
      valueLabel: "Activation",
    });

    expect(screen.getByText("Activation")).toBeInTheDocument();
    expect(screen.queryByText("pTM")).not.toBeInTheDocument();

    // The pLDDT score is present, so the overlay slot is the only dash.
    expect(screen.getAllByText("\u2013")).toHaveLength(1);
  });

  it("swaps the middle stat for the overlay value when one is present", () => {
    renderLegend({
      hoveredResidue: readout("PHE 17", 0.912, 1.5),
      valueLabel: "Activation",
    });

    expect(screen.getByText("Activation")).toBeInTheDocument();
    expect(screen.getByText("1.500")).toBeInTheDocument();
    expect(screen.queryByText("pTM")).not.toBeInTheDocument();
  });

  it("renders a dash when the residue has no pLDDT score", () => {
    renderLegend({
      hoveredResidue: readout("PHE 17", null),
    });

    expect(screen.getByText("\u2013")).toBeInTheDocument();
  });

  it("pins the selected residue's readout when nothing is hovered", () => {
    renderLegend({
      selectedResidue: readout("GLY 4", 0.5),
    });

    expect(screen.getByText("GLY 4")).toBeInTheDocument();
  });

  it("lets a hover take priority over the pinned selection", () => {
    renderLegend({
      hoveredResidue: readout("PHE 17", 0.912),
      selectedResidue: readout("GLY 4", 0.5),
    });

    expect(screen.getByText("PHE 17")).toBeInTheDocument();
    expect(screen.queryByText("GLY 4")).not.toBeInTheDocument();
  });

  /**
   * A range or a whole chain has no single score to report, so the slots carry
   * means. The labels have to say so: "pLDDT" over an average of ninety of them
   * reads as one residue's score.
   */
  describe("a readout covering several residues", () => {
    it("labels the numbers as means", () => {
      renderLegend({
        selectedResidue: readout("Chain A", 0.81, 2.4, 110),
        valueLabel: "Depth",
      });

      expect(screen.getByText(MEAN_PLDDT_LABEL)).toBeInTheDocument();
      expect(screen.getByText("Mean Depth")).toBeInTheDocument();
      expect(screen.getByText("0.810")).toBeInTheDocument();
      expect(screen.getByText("2.400")).toBeInTheDocument();
    });

    it("calls the slot a selection rather than a residue", () => {
      renderLegend({ selectedResidue: readout("24 residues", 0.7, null, 24) });

      expect(screen.getByText("Selection")).toBeInTheDocument();
      expect(screen.getByText("24 residues")).toBeInTheDocument();
      expect(screen.queryByText("Residue")).not.toBeInTheDocument();
    });

    it("leaves a single residue reading as one", () => {
      renderLegend({ selectedResidue: readout("GLY 4", 0.5) });

      expect(screen.getByText("Residue")).toBeInTheDocument();
      expect(screen.queryByText(MEAN_PLDDT_LABEL)).not.toBeInTheDocument();
    });

    it("keeps an acronym's casing when it prefixes the label", () => {
      // "pLDDT" must not come back as "Plddt".
      renderLegend({ selectedResidue: readout("Chain A", 0.81, null, 110) });

      expect(screen.getByText(MEAN_PLDDT_LABEL)).toBeInTheDocument();
    });
  });

  describe("the chain legend", () => {
    const CHAINS: ChainRef[] = [
      {
        chainId: "A",
        endIndex: 109,
        label: "A",
        residueCount: 110,
        startIndex: 0,
      },
      {
        chainId: "B",
        endIndex: 198,
        label: "B",
        residueCount: 89,
        startIndex: 110,
      },
    ];

    const CHAIN_HANDLERS = {
      onChainSelect: () => undefined,
      onChainToggle: () => undefined,
    };

    it("lists a chain row per chain of a complex", () => {
      renderLegend({ chains: CHAINS, ...CHAIN_HANDLERS });

      expect(
        screen.getByRole("button", { name: HIDE_BARNASE })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Hide chain B" })
      ).toBeInTheDocument();
    });

    it("offers to show a chain that is hidden", () => {
      renderLegend({
        chains: CHAINS,
        hiddenChains: new Set(["B"]),
        ...CHAIN_HANDLERS,
      });

      expect(
        screen.getByRole("button", { name: "Show chain B" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: HIDE_BARNASE })
      ).toBeInTheDocument();
    });

    it("renders nothing for a single-chain structure", () => {
      // One chain needs no key to tell it from anything, and hiding it would
      // leave an empty canvas.
      renderLegend({ chains: [CHAINS[0] as ChainRef], ...CHAIN_HANDLERS });

      expect(
        screen.queryByRole("button", { name: HIDE_BARNASE })
      ).not.toBeInTheDocument();
    });

    it("reports a chain when its name is clicked", () => {
      const onChainSelect = vi.fn();
      renderLegend({ chains: CHAINS, ...CHAIN_HANDLERS, onChainSelect });

      fireEvent.click(screen.getByRole("button", { name: "Chain B" }));

      expect(onChainSelect).toHaveBeenCalledWith("B");
    });

    /**
     * A hidden chain draws nothing, so there is nothing to select. The name
     * stops being clickable rather than accepting a click that goes nowhere.
     */
    it("disables a hidden chain's name but not its toggle", () => {
      const onChainSelect = vi.fn();
      renderLegend({
        chains: CHAINS,
        hiddenChains: new Set(["B"]),
        ...CHAIN_HANDLERS,
        onChainSelect,
      });

      const hidden = screen.getByRole("button", { name: "Chain B" });
      expect(hidden).toBeDisabled();

      fireEvent.click(hidden);
      expect(onChainSelect).not.toHaveBeenCalled();

      // The chain that is still shown stays selectable, and the way back from
      // hiding stays open.
      expect(screen.getByRole("button", { name: "Chain A" })).toBeEnabled();
      expect(
        screen.getByRole("button", { name: "Show chain B" })
      ).toBeEnabled();
    });

    it("reports a chain when its visibility is toggled", () => {
      const onChainToggle = vi.fn();
      renderLegend({ chains: CHAINS, ...CHAIN_HANDLERS, onChainToggle });

      fireEvent.click(screen.getByRole("button", { name: HIDE_BARNASE }));

      expect(onChainToggle).toHaveBeenCalledWith("A");
    });

    /**
     * Swatches describe the structure only while chain coloring is painting it.
     * Under pLDDT or an overlay the colors belong to a different scale, so the
     * rows keep their labels and toggles and drop the colors.
     */
    /**
     * Under pLDDT no one color stands for a chain, so the swatch carries the
     * whole band key instead - quartered, the same for every chain. That says
     * the chains are colored by confidence rather than pretending to tell them
     * apart.
     */
    describe("under pLDDT coloring", () => {
      const quadrants = (result: RenderResult) =>
        result.container.querySelectorAll('[class*="ChainSwatchQuadrant"]');

      it("quarters each chain's swatch into the four bands", () => {
        const result = renderLegend({
          chainBandColors: PLDDT_BAND_COLORS,
          chainColors: undefined,
          chains: CHAINS,
          ...CHAIN_HANDLERS,
        });

        // Four bands on each of the two chains.
        expect(quadrants(result)).toHaveLength(8);
        expect(
          result.container.querySelectorAll('[class*="ChainSwatchGrid"]')
        ).toHaveLength(2);
      });

      it("paints the quadrants the pLDDT band colors", () => {
        const result = renderLegend({
          chainBandColors: PLDDT_BAND_COLORS,
          chainColors: undefined,
          chains: CHAINS,
          ...CHAIN_HANDLERS,
        });

        const painted = [...quadrants(result)]
          .slice(0, PLDDT_BAND_COLORS.length)
          .map((q) => getComputedStyle(q).backgroundColor);

        // #FF7C45, #FFDB11, #64CBF3, #0053D5, least confident first.
        expect(painted).toEqual([
          "rgb(255, 124, 69)",
          "rgb(255, 219, 17)",
          "rgb(100, 203, 243)",
          "rgb(0, 83, 213)",
        ]);
      });

      it("prefers a chain's own color when there is one", () => {
        // Both supplied should not happen, but chain coloring is the more
        // specific answer, so it wins rather than being doubled up on.
        const result = renderLegend({
          chainBandColors: PLDDT_BAND_COLORS,
          chainColors: new Map([
            ["A", "#0072B2"],
            ["B", "#E69F00"],
          ]),
          chains: CHAINS,
          ...CHAIN_HANDLERS,
        });

        expect(quadrants(result)).toHaveLength(0);
        expect(
          result.container.querySelectorAll('[class*="ChainSwatch"]')
        ).toHaveLength(2);
      });
    });

    it("drops the swatches when chain coloring is not what is shown", () => {
      // Emotion emits the color into a generated class rather than inline, so
      // the swatch elements are what there is to count.
      const swatches = (result: RenderResult) =>
        result.container.querySelectorAll('[class*="ChainSwatch"]');

      const withColors = renderLegend({
        chainColors: new Map([
          ["A", "#0072B2"],
          ["B", "#E69F00"],
        ]),
        chains: CHAINS,
        ...CHAIN_HANDLERS,
      });
      expect(swatches(withColors)).toHaveLength(2);
      expect(
        getComputedStyle(swatches(withColors)[0] as Element).backgroundColor
      ).toBe("rgb(0, 114, 178)");

      withColors.unmount();

      const withoutColors = renderLegend({
        chainColors: undefined,
        chains: CHAINS,
        ...CHAIN_HANDLERS,
      });
      expect(swatches(withoutColors)).toHaveLength(0);

      // The rows themselves stay: a chain can still be named and hidden while
      // something else is coloring the structure.
      expect(
        screen.getByRole("button", { name: HIDE_BARNASE })
      ).toBeInTheDocument();
    });
  });

  it("reserves a column for a null stat without rendering anything in it", () => {
    renderLegend({ stats: [null, STATS[1] as (typeof STATS)[number], null] });

    expect(screen.queryByText("Known")).not.toBeInTheDocument();
    expect(screen.getByText("pTM")).toBeInTheDocument();
  });

  it("shows the stepped scale's boundary ticks but not its top threshold", () => {
    renderLegend();

    expect(screen.getByText("0.5")).toBeInTheDocument();
    expect(screen.getByText("0.7")).toBeInTheDocument();
    expect(screen.getByText("0.9")).toBeInTheDocument();
    expect(screen.queryByText("1.0")).not.toBeInTheDocument();
  });

  it("shows zero and the max as ticks on a continuous scale", () => {
    renderLegend({
      scale: PLASMA_COLOR_SCALE,
      scaleLabel: OVERLAY_LABEL,
      scaleMax: 2.4,
    });

    expect(screen.getByText(OVERLAY_LABEL)).toBeInTheDocument();
    expect(screen.getByText("0.00")).toBeInTheDocument();
    expect(screen.getByText("2.40")).toBeInTheDocument();
  });

  it("ticks a continuous scale from the minimum it is normalized against", () => {
    // Coloring maps min-max onto the bar, so a bar labelled from zero while
    // the values start somewhere else misreads the whole axis.
    renderLegend({
      scale: PLASMA_COLOR_SCALE,
      scaleLabel: OVERLAY_LABEL,
      scaleMax: 2,
      scaleMin: -2,
    });

    expect(screen.getByText("-2.00")).toBeInTheDocument();
    expect(screen.getByText("2.00")).toBeInTheDocument();
    expect(screen.queryByText("0.00")).not.toBeInTheDocument();
  });

  it("drops the color key when no scale describes the coloring", () => {
    // Chain coloring has no per-residue scale behind it, so the key goes
    // rather than describing colors the structure does not carry.
    renderLegend({ scale: null, scaleLabel: undefined });

    expect(screen.queryByText("pLDDT")).not.toBeInTheDocument();
    expect(screen.queryByText("0.5")).not.toBeInTheDocument();

    // The stats are unaffected; only the key alongside them is gone.
    expect(screen.getByText("Known")).toBeInTheDocument();
  });

  it("only renders the help affordance when a tooltip is supplied", () => {
    const { unmount } = render(
      <ThemeProvider theme={defaultTheme}>
        <StructureLegend
          scale={PLDDT_COLOR_SCALE}
          scaleLabel="pLDDT"
          showSequenceViewer
          stats={STATS}
        />
      </ThemeProvider>
    );
    expect(document.querySelector("svg")).not.toBeInTheDocument();
    unmount();

    renderLegend({ scaleTooltip: "What this measures" });
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("shows the help icon when only tooltipProps is supplied", () => {
    renderLegend({
      scaleTooltipProps: { title: "From tooltipProps" },
    });

    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("keeps the help icon in the caption's text flow", () => {
    // A flex caption would park the icon beside the whole wrapped block
    // instead of at the end of the last line.
    renderLegend({
      scaleLabel: OVERLAY_LABEL,
      scaleTooltip: "What this measures",
    });

    const caption = screen.getByText(OVERLAY_LABEL);
    expect(getComputedStyle(caption).display).toBe("block");
  });
});

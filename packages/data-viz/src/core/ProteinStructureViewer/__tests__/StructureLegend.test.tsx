import { defaultTheme } from "@czi-sds/components";
import { ThemeProvider } from "@mui/material/styles";
import { render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import { PLASMA_COLOR_SCALE } from "../../../common/colorScales";
import StructureLegend, {
  StructureLegendProps,
} from "../components/StructureLegend";
import { PLDDT_COLOR_SCALE } from "../utils/plddt";

const MEAN_PLDDT_LABEL = "Mean pLDDT";

/** Caption an overlay puts on the color key, in place of the pLDDT one. */
const OVERLAY_LABEL = "Feature activation";

const STATS = [
  { label: "Known", value: "62%" },
  { label: "pTM", value: "0.874" },
  { label: MEAN_PLDDT_LABEL, value: "0.781" },
];

function renderLegend(props: Partial<StructureLegendProps> = {}): ReactElement {
  const element = (
    <StructureLegend
      scale={PLDDT_COLOR_SCALE}
      scaleLabel="pLDDT"
      showSequenceViewer
      stats={STATS}
      {...props}
    />
  );

  render(<ThemeProvider theme={defaultTheme}>{element}</ThemeProvider>);

  return element;
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
      hoveredResidue: { label: "PHE 17", plddt: 0.912, value: null },
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
      hoveredResidue: { label: "PHE 17", plddt: 0.912, value: null },
    });

    expect(screen.getByText("pTM")).toBeInTheDocument();
    expect(screen.getByText("0.874")).toBeInTheDocument();
  });

  it("dashes the overlay slot for a residue the overlay has no value for", () => {
    // The slot is the overlay's while one is set, so falling back to the stat
    // here would read as a value the overlay had reported. The structure
    // paints these residues neutral; the readout says the same thing.
    renderLegend({
      hoveredResidue: { label: "PHE 17", plddt: 0.912, value: null },
      valueLabel: "Activation",
    });

    expect(screen.getByText("Activation")).toBeInTheDocument();
    expect(screen.queryByText("pTM")).not.toBeInTheDocument();

    // The pLDDT score is present, so the overlay slot is the only dash.
    expect(screen.getAllByText("\u2013")).toHaveLength(1);
  });

  it("swaps the middle stat for the overlay value when one is present", () => {
    renderLegend({
      hoveredResidue: { label: "PHE 17", plddt: 0.912, value: 1.5 },
      valueLabel: "Activation",
    });

    expect(screen.getByText("Activation")).toBeInTheDocument();
    expect(screen.getByText("1.500")).toBeInTheDocument();
    expect(screen.queryByText("pTM")).not.toBeInTheDocument();
  });

  it("renders a dash when the residue has no pLDDT score", () => {
    renderLegend({
      hoveredResidue: { label: "PHE 17", plddt: null, value: null },
    });

    expect(screen.getByText("\u2013")).toBeInTheDocument();
  });

  it("pins the selected residue's readout when nothing is hovered", () => {
    renderLegend({
      selectedResidue: { label: "GLY 4", plddt: 0.5, value: null },
    });

    expect(screen.getByText("GLY 4")).toBeInTheDocument();
  });

  it("lets a hover take priority over the pinned selection", () => {
    renderLegend({
      hoveredResidue: { label: "PHE 17", plddt: 0.912, value: null },
      selectedResidue: { label: "GLY 4", plddt: 0.5, value: null },
    });

    expect(screen.getByText("PHE 17")).toBeInTheDocument();
    expect(screen.queryByText("GLY 4")).not.toBeInTheDocument();
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

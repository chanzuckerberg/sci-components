import { defaultTheme } from "@czi-sds/components";
import { ThemeProvider } from "@mui/material/styles";
import { render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import StructureLegend, {
  StructureLegendProps,
} from "../components/StructureLegend";
import { PLASMA_COLOR_SCALE, PLDDT_COLOR_SCALE } from "../utils/colorScales";

const MEAN_PLDDT_LABEL = "Mean pLDDT";

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

  it("keeps the middle stat when the residue has no overlay value", () => {
    renderLegend({
      hoveredResidue: { label: "PHE 17", plddt: 0.912, value: null },
    });

    expect(screen.getByText("pTM")).toBeInTheDocument();
    expect(screen.getByText("0.874")).toBeInTheDocument();
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
      scaleLabel: "Feature activation",
      scaleMax: 2.4,
    });

    expect(screen.getByText("Feature activation")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("2.40")).toBeInTheDocument();
  });

  it("only renders the help affordance when a scale tooltip is supplied", () => {
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
});

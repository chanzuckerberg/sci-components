import { Theme, defaultTheme, getSemanticColors } from "@czi-sds/components";
import { ThemeProvider } from "@mui/material/styles";
import { act, render, screen, waitFor } from "@testing-library/react";
import { Color } from "molstar/lib/mol-util/color";
import { ReactElement } from "react";
import ProteinStructureViewer from "..";
import { ProteinStructureViewerProps } from "../ProteinStructureViewer.types";
import { parseHexColor } from "../utils/color";
import { lociForSeqId, structureFromPdb } from "./molstarStructure";

/**
 * Mol* draws through WebGL, which jsdom does not implement, so the plugin is
 * stubbed out. These tests cover what the React layer owns: the container, the
 * legend, and the plugin lifecycle (created once, structure loaded, disposed on
 * unmount). Rendering fidelity is checked in Storybook instead.
 */
const createPluginUI = vi.hoisted(() => vi.fn());

vi.mock("molstar/lib/mol-plugin-ui", () => ({ createPluginUI }));

/**
 * Stands in for a Mol* behavior. The handler is typed so a test can pull it
 * back out of `subscribe.mock.calls` and drive it, which is how the hover and
 * click paths are exercised without a canvas.
 */
function subscribable() {
  return {
    subscribe: vi.fn((handler: (event: unknown) => void) => {
      void handler;
      return { unsubscribe: vi.fn() };
    }),
  };
}

function createStubPlugin() {
  const loadedThemes: string[] = [];
  const parsedPdb: string[] = [];

  return {
    behaviors: {
      interaction: { click: subscribable(), hover: subscribable() },
    },
    builders: {
      data: { rawData: vi.fn(async (args: { data: string }) => args.data) },
      structure: {
        hierarchy: { applyPreset: vi.fn(async () => undefined) },
        parseTrajectory: vi.fn(async (data: string) => {
          parsedPdb.push(data);
          return data;
        }),
      },
    },
    canvas3d: {
      didDraw: subscribable(),
      requestCameraReset: vi.fn(),
      setProps: vi.fn(),
    },
    clear: vi.fn(async () => undefined),
    dataTransaction: vi.fn(async (fn: () => Promise<void>) => fn()),
    dispose: vi.fn(),
    loadedThemes,
    managers: {
      interactivity: {
        lociSelects: { deselectAll: vi.fn(), selectOnly: vi.fn() },
      },
      lociLabels: { providers: [], removeProvider: vi.fn() },
      structure: {
        component: {
          updateRepresentationsTheme: vi.fn(
            async (_components: unknown, params: { color: string }) => {
              loadedThemes.push(params.color);
            }
          ),
        },
        focus: {
          behaviors: { current: subscribable() },
          clear: vi.fn(),
        },
        hierarchy: { current: { structures: [{ components: [] }] } },
      },
    },
    parsedPdb,
    representation: {
      structure: { themes: { colorThemeRegistry: { add: vi.fn() } } },
    },
  };
}

/** jsdom reports every element as 0x0; Mol* waits for a laid-out container. */
function giveElementsSize() {
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
    bottom: 400,
    height: 400,
    left: 0,
    right: 600,
    toJSON: () => ({}),
    top: 0,
    width: 600,
    x: 0,
    y: 0,
  });
}

const PDB = `ATOM      1  N   THR A   1      17.047  14.099   3.625  1.00 13.79           N
END`;

function renderViewer(
  props: Partial<ProteinStructureViewerProps> = {}
): ReactElement {
  const element = (
    <ProteinStructureViewer data-testid="viewer" pdb={PDB} {...props} />
  );
  render(<ThemeProvider theme={defaultTheme}>{element}</ThemeProvider>);
  return element;
}

describe("<ProteinStructureViewer />", () => {
  let plugin: ReturnType<typeof createStubPlugin>;

  beforeEach(() => {
    plugin = createStubPlugin();
    createPluginUI.mockResolvedValue(plugin);
    giveElementsSize();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    createPluginUI.mockReset();
  });

  /**
   * Hover fires continuously while the pointer rests on a residue, so the
   * readout only re-renders when the residue changes. Loading a new structure
   * into the same plugin renumbers residues from zero, so "same index" and
   * "same residue" part company exactly there: the readout still holds the old
   * structure's residue, and a guard comparing indices alone keeps its name on
   * screen while the pointer sits on a different residue entirely.
   */
  it("re-labels the readout after a reload puts a new residue at an index", async () => {
    const FIRST =
      "ATOM      1  CA  MET A  10      10.000  10.000  10.000  1.00 50.00           C";
    const SECOND =
      "ATOM      1  CA  ALA B   1      10.000  10.000  10.000  1.00 50.00           C";

    const view = (pdb: string) => (
      <ThemeProvider theme={defaultTheme}>
        <ProteinStructureViewer pdb={pdb} />
      </ThemeProvider>
    );

    const { rerender } = render(view(FIRST));
    await waitFor(() => expect(createPluginUI).toHaveBeenCalledTimes(1));

    const onHover =
      plugin.behaviors.interaction.hover.subscribe.mock.calls[0]?.[0];
    expect(onHover).toBeDefined();

    const first = await structureFromPdb(FIRST);
    const second = await structureFromPdb(SECOND);

    act(() => onHover?.({ current: { loci: lociForSeqId(first, 10) } }));
    expect(await screen.findByText("MET 10")).toBeInTheDocument();

    rerender(view(SECOND));
    await waitFor(() => expect(plugin.parsedPdb).toContain(SECOND));

    // Both residues sit at index 0 of their own structure.
    act(() => onHover?.({ current: { loci: lociForSeqId(second, 1) } }));
    expect(await screen.findByText("ALA 1")).toBeInTheDocument();
  });

  it("renders a container that forwards arbitrary div props", () => {
    renderViewer({ "aria-label": "Crambin structure" });

    const container = screen.getByTestId("viewer");
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute("aria-label", "Crambin structure");
  });

  it("forwards a ref to the container element", () => {
    let captured: HTMLDivElement | null = null;

    render(
      <ThemeProvider theme={defaultTheme}>
        <ProteinStructureViewer
          data-testid="viewer"
          pdb={PDB}
          ref={(el) => {
            captured = el;
          }}
        />
      </ThemeProvider>
    );

    expect(captured).toBe(screen.getByTestId("viewer"));
  });

  it("creates the plugin and loads the structure once mounted", async () => {
    renderViewer();

    await waitFor(() => expect(createPluginUI).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(plugin.builders.structure.parseTrajectory).toHaveBeenCalled()
    );
    expect(plugin.canvas3d.requestCameraReset).toHaveBeenCalled();
  });

  it("disposes the plugin on unmount", async () => {
    const { unmount } = render(
      <ThemeProvider theme={defaultTheme}>
        <ProteinStructureViewer pdb={PDB} />
      </ThemeProvider>
    );

    await waitFor(() => expect(createPluginUI).toHaveBeenCalledTimes(1));
    unmount();

    await waitFor(() => expect(plugin.dispose).toHaveBeenCalled());
  });

  it("colors by pLDDT when scores are supplied", async () => {
    renderViewer({ plddt: [0.94] });

    await waitFor(() => expect(plugin.loadedThemes).toContain("plddt-bfactor"));
  });

  it("falls back to chain coloring when no scores are supplied", async () => {
    renderViewer();

    await waitFor(() => expect(plugin.loadedThemes).toContain("chain-id"));
    expect(plugin.loadedThemes).not.toContain("plddt-bfactor");
  });

  it("switches to the residue value theme when an overlay is set", async () => {
    renderViewer({
      plddt: [0.94],
      residueOverlay: { max: 2.4, values: new Map([[0, 1.2]]) },
    });

    await waitFor(() => expect(plugin.loadedThemes).toContain("residue-value"));
  });

  it("injects pLDDT scores into the B-factor column before parsing", async () => {
    renderViewer({ plddt: [0.94] });

    await waitFor(() => expect(plugin.parsedPdb.length).toBe(1));
    expect((plugin.parsedPdb[0] as string).split("\n")[0]).toContain(" 94.00");
  });

  it("shows the stats and the pLDDT key by default", async () => {
    renderViewer({
      stats: [
        { label: "Known", value: "62%" },
        { label: "pTM", value: "0.874" },
        { label: "Mean pLDDT", value: "0.781" },
      ],
    });

    expect(screen.getByText("Known")).toBeInTheDocument();
    expect(screen.getByText("0.874")).toBeInTheDocument();
    expect(screen.getByText("pLDDT")).toBeInTheDocument();
  });

  it("captions the legend with the overlay label instead", () => {
    renderViewer({
      residueOverlay: {
        label: "Feature activation",
        max: 2.4,
        values: new Map([[0, 1.2]]),
      },
    });

    expect(screen.getByText("Feature activation")).toBeInTheDocument();
    expect(screen.getByText("2.40")).toBeInTheDocument();
    expect(screen.queryByText("pLDDT")).not.toBeInTheDocument();
  });

  it("hides the legend when asked", () => {
    renderViewer({
      showLegend: false,
      stats: [{ label: "Known", value: "62%" }],
    });

    expect(screen.queryByText("Known")).not.toBeInTheDocument();
  });

  it("paints the canvas with the theme's base background", async () => {
    // The canvas is the page behind the structure, so it tracks the SDS
    // background token rather than a color of its own. Asserting against the
    // token instead of a literal is what keeps this from going stale the next
    // time the palette is retuned.
    const painted: unknown[] = [];

    for (const theme of [defaultTheme, Theme("dark")]) {
      createPluginUI.mockClear();
      const { unmount } = render(
        <ThemeProvider theme={theme}>
          <ProteinStructureViewer pdb={PDB} />
        </ThemeProvider>
      );

      await waitFor(() => expect(createPluginUI).toHaveBeenCalled());

      const token = getSemanticColors({ theme })?.base?.backgroundPrimary;
      const background =
        createPluginUI.mock.calls[0]?.[0]?.spec?.canvas3d?.renderer
          ?.backgroundColor;

      expect(background).toBe(parseHexColor(token as string));
      painted.push(background);

      unmount();
    }

    // Whatever the palette says, the two modes cannot collapse onto one canvas.
    expect(painted[0]).not.toBe(painted[1]);
  });

  it("lets a consumer override the canvas background", async () => {
    renderViewer({ backgroundColor: "#ff0000" });

    await waitFor(() => expect(createPluginUI).toHaveBeenCalled());
    expect(
      createPluginUI.mock.calls[0]?.[0]?.spec?.canvas3d?.renderer
        ?.backgroundColor
    ).toBe(Color.fromRgb(255, 0, 0));
  });

  it("pushes theme changes into the plugin instead of rebuilding it", async () => {
    // Mol* renders the viewport and sequence panel in its own React root, so
    // they cannot pick up a theme change from context, and rebuilding the
    // plugin would throw away the camera. The mode has to reach them in place.
    const { rerender } = render(
      <ThemeProvider theme={defaultTheme}>
        <ProteinStructureViewer pdb={PDB} />
      </ThemeProvider>
    );

    await waitFor(() => expect(createPluginUI).toHaveBeenCalledTimes(1));
    plugin.canvas3d.setProps.mockClear();

    rerender(
      <ThemeProvider theme={Theme("dark")}>
        <ProteinStructureViewer pdb={PDB} />
      </ThemeProvider>
    );

    await waitFor(() => expect(plugin.canvas3d.setProps).toHaveBeenCalled());

    // Same plugin, recolored rather than recreated.
    expect(createPluginUI).toHaveBeenCalledTimes(1);
    expect(plugin.dispose).not.toHaveBeenCalled();

    // The canvas picks up the dark background and the dark marking colors.
    const { calls } = plugin.canvas3d.setProps.mock;
    const props = calls[calls.length - 1]?.[0];
    expect(props?.renderer?.backgroundColor).toBeDefined();
    expect(props?.renderer?.highlightColor).toBeDefined();
    expect(props?.marking?.highlightEdgeColor).toBeDefined();
    expect(props?.marking?.selectEdgeColor).toBeDefined();
  });

  it("mounts the plugin outside the element holding the legend", async () => {
    // Mol* takes ownership of its mount node and replaces whatever is inside
    // it, so the legend has to be a sibling of the mount rather than a child.
    // Rendering both into one element silently wipes the legend.
    renderViewer({ stats: [{ label: "Known", value: "62%" }] });

    await waitFor(() => expect(createPluginUI).toHaveBeenCalledTimes(1));

    const mount = createPluginUI.mock.calls[0]?.[0]?.target as HTMLElement;
    const legend = screen.getByText("Known");

    expect(mount).toBeInstanceOf(HTMLElement);
    expect(mount.contains(legend)).toBe(false);
    expect(screen.getByTestId("viewer").contains(mount)).toBe(true);
  });
});

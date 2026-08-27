import { Theme, defaultTheme } from "@czi-sds/components";
import { ThemeProvider } from "@mui/material/styles";
import { render, screen, waitFor } from "@testing-library/react";
import { Color } from "molstar/lib/mol-util/color";
import { ReactElement } from "react";
import MolecularStructureViewer from "..";
import { MolecularStructureViewerProps } from "../MolecularStructureViewer.types";

/**
 * Mol* draws through WebGL, which jsdom does not implement, so the plugin is
 * stubbed out. These tests cover what the React layer owns: the container, the
 * legend, and the plugin lifecycle (created once, structure loaded, disposed on
 * unmount). Rendering fidelity is checked in Storybook instead.
 */
const createPluginUI = vi.hoisted(() => vi.fn());

vi.mock("molstar/lib/mol-plugin-ui", () => ({ createPluginUI }));

function subscribable() {
  return { subscribe: vi.fn(() => ({ unsubscribe: vi.fn() })) };
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
  props: Partial<MolecularStructureViewerProps> = {}
): ReactElement {
  const element = (
    <MolecularStructureViewer data-testid="viewer" pdb={PDB} {...props} />
  );
  render(<ThemeProvider theme={defaultTheme}>{element}</ThemeProvider>);
  return element;
}

describe("<MolecularStructureViewer />", () => {
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
        <MolecularStructureViewer
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
        <MolecularStructureViewer pdb={PDB} />
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
    // background token rather than a color of its own.
    for (const [theme, expected] of [
      [defaultTheme, Color.fromRgb(255, 255, 255)],
      [Theme("dark"), Color.fromRgb(16, 16, 16)],
    ] as const) {
      createPluginUI.mockClear();
      const { unmount } = render(
        <ThemeProvider theme={theme}>
          <MolecularStructureViewer pdb={PDB} />
        </ThemeProvider>
      );

      await waitFor(() => expect(createPluginUI).toHaveBeenCalled());
      expect(
        createPluginUI.mock.calls[0]?.[0]?.spec?.canvas3d?.renderer
          ?.backgroundColor
      ).toBe(expected);

      unmount();
    }
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
        <MolecularStructureViewer pdb={PDB} />
      </ThemeProvider>
    );

    await waitFor(() => expect(createPluginUI).toHaveBeenCalledTimes(1));
    plugin.canvas3d.setProps.mockClear();

    rerender(
      <ThemeProvider theme={Theme("dark")}>
        <MolecularStructureViewer pdb={PDB} />
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

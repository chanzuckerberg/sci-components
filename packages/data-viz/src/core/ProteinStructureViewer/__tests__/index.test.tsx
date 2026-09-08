import { Theme, defaultTheme, getSemanticColors } from "@czi-sds/components";
import { ThemeProvider } from "@mui/material/styles";
import { composeStories } from "@storybook/react-vite";
import { render, screen, waitFor } from "@testing-library/react";
import type { Structure } from "molstar/lib/mol-model/structure";
import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { Color } from "molstar/lib/mol-util/color";
import { ReactElement } from "react";
import { BehaviorSubject } from "rxjs";
import ProteinStructureViewer from "..";
import { CRAMBIN_PDB } from "../__storybook__/constants";
import * as stories from "../__storybook__/index.stories";
import { ProteinStructureViewerProps } from "../ProteinStructureViewer.types";
import { parseHexColor } from "../utils/color";
import { lociForResidueIndex } from "../utils/residueLoci";
import { structureFromPdb } from "./molstarStructure";

/**
 * Mol* draws through WebGL, which jsdom does not implement, so the plugin is
 * stubbed out. These tests cover what the React layer owns: the container, the
 * legend, and the plugin lifecycle (created once, structure loaded, disposed on
 * unmount). Rendering fidelity is checked in Storybook instead.
 */
const createPluginUI = vi.hoisted(() => vi.fn());

vi.mock("molstar/lib/mol-plugin-ui", () => ({ createPluginUI }));

/** A Mol* behavior the tests can also push through, to stand in for a click. */
function subscribable() {
  const handlers: ((value: unknown) => void)[] = [];

  return {
    emit: (value: unknown) => handlers.forEach((handler) => handler(value)),
    subscribe: vi.fn((handler: (value: unknown) => void) => {
      handlers.push(handler);
      return { unsubscribe: vi.fn() };
    }),
  };
}

/**
 * Enough of a camera for the focus path to run. Framing a residue is real
 * geometry work, so what is stubbed is only the camera it is handed.
 */
function stubCamera() {
  return {
    getFocus: vi.fn(() => ({ radius: 1 })),
    getTargetDistance: vi.fn(() => 50),
    setState: vi.fn(),
    state: {
      position: [0, 0, 50],
      radius: 10,
      radiusMax: 100,
      target: [0, 0, 0],
    },
    transition: { inTransition: false },
  };
}

/**
 * `structure` is the parsed structure the viewer would be holding. Passing a
 * real one lets the tests exercise the actual residue-to-loci resolution
 * rather than a stand-in for it.
 */
function createStubPlugin(structure?: Structure) {
  const loadedThemes: string[] = [];
  const parsedPdb: string[] = [];
  const focused = new BehaviorSubject<{ loci: unknown } | undefined>(undefined);

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
      camera: stubCamera(),
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
          behaviors: { current: focused },
          clear: vi.fn(() => focused.next(undefined)),
          setFromLoci: vi.fn((loci: unknown) => focused.next({ loci })),
        },
        hierarchy: {
          current: {
            structures: [
              { cell: { obj: { data: structure } }, components: [] },
            ],
          },
        },
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

/** A second structure, for asserting which one the viewer settles on. */
const OTHER_PDB = `ATOM      1  N   ALA A   1      11.111  22.222   3.333  1.00 13.79           N
END`;

/** Caption an overlay puts on the legend, in place of the pLDDT key. */
const OVERLAY_LABEL = "Feature activation";

/**
 * The story the component ships as its fixture, so what the tests mount is the
 * configuration a reviewer sees in Storybook rather than a second one kept
 * beside it.
 *
 * `generateSnapshots` is not called here as it is elsewhere: every story sets
 * `snapshot: { skip: true }`, since jsdom serves Mol* no WebGL context and it
 * renders a "WebGL does not seem to be available" notice in place of the
 * viewer. A snapshot would pin that notice rather than the component.
 */
const { Test } = composeStories(stories);

const STORY_TEST_ID = "protein-structure-viewer";

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
  let crambin: Structure;

  beforeAll(async () => {
    crambin = await structureFromPdb(CRAMBIN_PDB);
  });

  beforeEach(() => {
    plugin = createStubPlugin(crambin);
    createPluginUI.mockResolvedValue(plugin);
    giveElementsSize();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    createPluginUI.mockReset();
  });

  it("renders the story fixture", async () => {
    render(<Test />);

    expect(screen.getByTestId(STORY_TEST_ID)).toBeInTheDocument();
    await waitFor(() => expect(createPluginUI).toHaveBeenCalledTimes(1));
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

  it("leaves an overlay carrying no values in charge of the coloring", async () => {
    // An app with a feature picked but nothing to show for it yet still has an
    // overlay set. The structure has to answer to it - every residue reading
    // neutral - rather than fall back to confidence coloring that the legend
    // beside it is no longer describing.
    renderViewer({
      plddt: [0.94],
      residueOverlay: {
        label: OVERLAY_LABEL,
        max: 2.4,
        values: new Map(),
      },
    });

    await waitFor(() => expect(plugin.loadedThemes).toContain("residue-value"));
    expect(screen.getByText(OVERLAY_LABEL)).toBeInTheDocument();
  });

  it("injects pLDDT scores into the B-factor column before parsing", async () => {
    renderViewer({ plddt: [0.94] });

    await waitFor(() => expect(plugin.parsedPdb.length).toBe(1));
    expect((plugin.parsedPdb[0] as string).split("\n")[0]).toContain(" 94.00");
  });

  it("shows the stats and the pLDDT key alongside scores", async () => {
    renderViewer({
      plddt: [0.94],
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

  it("drops the color key when the structure falls back to chain coloring", async () => {
    // Nothing supplies a per-residue value here, so Mol* colors by chain and
    // there is no scale that describes what is on screen. A pLDDT key would
    // be labelling colors the structure does not carry.
    renderViewer({ stats: [{ label: "Known", value: "62%" }] });

    await waitFor(() => expect(plugin.loadedThemes).toContain("chain-id"));

    expect(screen.getByText("Known")).toBeInTheDocument();
    expect(screen.queryByText("pLDDT")).not.toBeInTheDocument();
  });

  it("captions the legend with the overlay label instead", () => {
    renderViewer({
      residueOverlay: {
        label: OVERLAY_LABEL,
        max: 2.4,
        values: new Map([[0, 1.2]]),
      },
    });

    expect(screen.getByText(OVERLAY_LABEL)).toBeInTheDocument();
    expect(screen.getByText("2.40")).toBeInTheDocument();
    expect(screen.queryByText("pLDDT")).not.toBeInTheDocument();
  });

  it("ticks the color key from the overlay's own minimum", () => {
    // Coloring normalizes into min-max, so a key ticked from zero would
    // misreport where the bar's colors begin.
    renderViewer({
      residueOverlay: {
        label: OVERLAY_LABEL,
        max: 2,
        min: -2,
        values: new Map([[0, 1.2]]),
      },
    });

    expect(screen.getByText("-2.00")).toBeInTheDocument();
    expect(screen.getByText("2.00")).toBeInTheDocument();
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

  /**
   * Building the plugin takes long enough to outlast a paint or two, and an
   * app that fetches its data renders the viewer before that data arrives. The
   * props it was given at mount are therefore not necessarily the ones it
   * should end up honoring, and nothing re-runs on its own to catch up: the
   * effects that push prop changes in are keyed on those props, which have
   * already changed by the time the plugin can accept them.
   */
  describe("when props change while the plugin is still being built", () => {
    /** Holds createPluginUI open so props can move mid-initialization. */
    function holdPlugin(): (p: unknown) => void {
      let release: (p: unknown) => void = () => undefined;
      createPluginUI.mockReturnValue(
        new Promise((resolve) => {
          release = resolve;
        })
      );
      return release;
    }

    it("loads the structure the props settled on, not the one they started with", async () => {
      const release = holdPlugin();

      const { rerender } = render(
        <ThemeProvider theme={defaultTheme}>
          <ProteinStructureViewer pdb={PDB} />
        </ThemeProvider>
      );
      await waitFor(() => expect(createPluginUI).toHaveBeenCalledTimes(1));

      rerender(
        <ThemeProvider theme={defaultTheme}>
          <ProteinStructureViewer pdb={OTHER_PDB} />
        </ThemeProvider>
      );
      release(plugin);

      await waitFor(() =>
        expect(plugin.parsedPdb[plugin.parsedPdb.length - 1]).toBe(OTHER_PDB)
      );
    });

    it("paints the canvas with the theme it settled on", async () => {
      const release = holdPlugin();

      const { rerender } = render(
        <ThemeProvider theme={defaultTheme}>
          <ProteinStructureViewer pdb={PDB} />
        </ThemeProvider>
      );
      await waitFor(() => expect(createPluginUI).toHaveBeenCalledTimes(1));

      rerender(
        <ThemeProvider theme={Theme("dark")}>
          <ProteinStructureViewer pdb={PDB} />
        </ThemeProvider>
      );
      release(plugin);

      // The canvas was built light, so the dark background can only arrive
      // through the effect replaying once the plugin is up.
      const dark = parseHexColor(
        getSemanticColors({ theme: Theme("dark") })?.base
          ?.backgroundPrimary as string
      );

      // Axes go through setProps too, so pick out the calls that carry a
      // background rather than assuming the colors were pushed last.
      await waitFor(() => {
        const painted = plugin.canvas3d.setProps.mock.calls
          .map((call) => call[0]?.renderer?.backgroundColor)
          .filter((color: unknown) => color !== undefined);

        expect(painted[painted.length - 1]).toBe(dark);
      });
    });
  });

  /**
   * `selectedResidue` is documented as controlling the camera: setting it
   * zooms in on that residue, clearing it zooms back out. That has to hold
   * however the selection was made, not just for the one path where a click
   * happens to have moved the camera on its own beforehand.
   */
  describe("selection driving the camera", () => {
    function selecting(residue: number | null) {
      return (
        <ThemeProvider theme={defaultTheme}>
          <ProteinStructureViewer pdb={CRAMBIN_PDB} selectedResidue={residue} />
        </ThemeProvider>
      );
    }

    /** Camera moves the focus path makes, as opposed to a reset. */
    function focusMoves() {
      return plugin.canvas3d.camera.setState.mock.calls.length;
    }

    it("zooms in on a residue selected before the plugin was ready", async () => {
      render(selecting(12));

      await waitFor(() => expect(focusMoves()).toBeGreaterThan(0));
      expect(plugin.managers.structure.focus.setFromLoci).toHaveBeenCalled();
    });

    it("zooms again when the selection moves from one residue to another", async () => {
      const { rerender } = render(selecting(12));
      await waitFor(() => expect(focusMoves()).toBeGreaterThan(0));

      const before = focusMoves();
      rerender(selecting(30));

      await waitFor(() => expect(focusMoves()).toBeGreaterThan(before));
    });

    it("zooms back out when the selection is cleared", async () => {
      const { rerender } = render(selecting(12));
      await waitFor(() => expect(focusMoves()).toBeGreaterThan(0));

      plugin.canvas3d.requestCameraReset.mockClear();
      rerender(selecting(null));

      await waitFor(() =>
        expect(plugin.canvas3d.requestCameraReset).toHaveBeenCalled()
      );
      expect(plugin.managers.structure.focus.clear).toHaveBeenCalled();
    });

    it("leaves the camera alone for a click the consumer has not accepted", async () => {
      const onResidueClick = vi.fn();
      render(
        <ThemeProvider theme={defaultTheme}>
          <ProteinStructureViewer
            onResidueClick={onResidueClick}
            pdb={CRAMBIN_PDB}
            selectedResidue={null}
          />
        </ThemeProvider>
      );
      await waitFor(() =>
        expect(plugin.behaviors.interaction.click.subscribe).toHaveBeenCalled()
      );

      const loci = lociForResidueIndex(
        plugin as unknown as PluginUIContext,
        12
      );
      plugin.behaviors.interaction.click.emit({ current: { loci } });

      // The click is reported, but the prop it feeds has not come back, so
      // nothing should have moved.
      await waitFor(() =>
        expect(onResidueClick).toHaveBeenCalledWith(12, "PHE")
      );
      expect(focusMoves()).toBe(0);
    });

    it("names the selected residue in the legend without a click", async () => {
      render(selecting(12));

      // Crambin's thirteenth residue, which no click ever named here.
      await waitFor(() =>
        expect(screen.getByText("PHE 13")).toBeInTheDocument()
      );
    });
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

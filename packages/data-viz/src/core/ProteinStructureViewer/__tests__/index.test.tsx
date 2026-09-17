import { Theme, defaultTheme, getSemanticColors } from "@czi-sds/components";
import { ThemeProvider } from "@mui/material/styles";
import { composeStories } from "@storybook/react-vite";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import {
  QueryContext,
  Structure,
  StructureSelection,
} from "molstar/lib/mol-model/structure";
import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { PluginBehaviors } from "molstar/lib/mol-plugin/behavior";
import { PluginConfig } from "molstar/lib/mol-plugin/config";
import type { Expression } from "molstar/lib/mol-script/language/expression";
import { compile } from "molstar/lib/mol-script/runtime/query/compiler";
import { Color } from "molstar/lib/mol-util/color";
import { ReactElement } from "react";
import { BehaviorSubject } from "rxjs";
import ProteinStructureViewer from "..";
import {
  CHAIN_DIM_TRANSPARENCY,
  componentChainId,
} from "../hooks/useChainHighlight";
import { BARNASE_BARSTAR_PDB } from "../__storybook__/barnaseBarstar";
import { CRAMBIN_PDB } from "../__storybook__/constants";
import * as stories from "../__storybook__/index.stories";
import { MYOGLOBIN_PDB } from "../__storybook__/myoglobin";
import { ProteinStructureViewerProps } from "../ProteinStructureViewer.types";
import { parseHexColor } from "../utils/color";
import {
  lociForResidueIndex,
  lociForSelectionInStructure,
} from "../utils/residueLoci";
import { lociForSeqId, structureFromPdb } from "./molstarStructure";

/**
 * Mol* draws through WebGL, which jsdom does not implement, so the plugin is
 * stubbed out. These tests cover what the React layer owns: the container, the
 * legend, and the plugin lifecycle (created once, structure loaded, disposed on
 * unmount). Rendering fidelity is checked in Storybook instead.
 */
const createPluginUI = vi.hoisted(() => vi.fn());

vi.mock("molstar/lib/mol-plugin-ui", () => ({ createPluginUI }));

const setStructureTransparency = vi.hoisted(() => vi.fn(async () => undefined));
const clearStructureTransparency = vi.hoisted(() =>
  vi.fn(async () => undefined)
);

vi.mock("molstar/lib/mol-plugin-state/helpers/structure-transparency", () => ({
  clearStructureTransparency,
  setStructureTransparency,
}));

/**
 * Stands in for a Mol* behavior, which is how the hover and click paths are
 * exercised without a canvas. Handlers are kept so a test can push an event
 * through with `emit`, and `subscribe` is a spy, so one can equally be pulled
 * back out of `subscribe.mock.calls`.
 *
 * Mol*'s behaviors are BehaviorSubjects, so subscribing replays whatever they
 * currently hold. `replay` reproduces that, which is what the viewer has to
 * survive: the click behavior starts out holding an empty click, and reading
 * that as a real one clears the consumer's selection before the viewer is even
 * interactive.
 */
function subscribable(replay?: unknown) {
  const handlers: ((value: unknown) => void)[] = [];

  return {
    emit: (value: unknown) => handlers.forEach((handler) => handler(value)),
    subscribe: vi.fn((handler: (value: unknown) => void) => {
      handlers.push(handler);
      if (replay !== undefined) handler(replay);
      return { unsubscribe: vi.fn() };
    }),
  };
}

/** What Mol*'s click behavior holds before anything has been clicked. */
const EMPTY_CLICK = { current: { loci: { kind: "empty-loci" } } };

/** True when the expression matches no atom of the structure. */
function selectsNothing(structure: Structure, expression: Expression): boolean {
  const selection = compile<StructureSelection>(expression)(
    new QueryContext(structure)
  );

  return StructureSelection.structureCount(selection) === 0;
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
 * Residue-hover marking colors the stub canvas starts with. Arbitrary values
 * distinct from the theme, so a `setProps` restore would be visible as one.
 */
const THEME_HIGHLIGHT_COLOR = Color.fromRgb(1, 2, 3);
const THEME_EDGE_COLOR = Color.fromRgb(4, 5, 6);
const THEME_HIGHLIGHT_STRENGTH = 0.2;

/**
 * The two halves of a chain the load path draws, the component keys it builds
 * for chain A from them, and how the stub refs a component.
 */
const POLYMER_PART = "polymer";
const LIGAND_PART = "ligand";
const POLYMER_A = `${POLYMER_PART}-A`;
const LIGAND_A = `${LIGAND_PART}-A`;
const componentRef = (key: string) => `component-${key}`;

/**
 * A component and one of its representations, shaped the way Mol* hands them
 * to a theme callback.
 *
 * The shapes are the point. Mol* files a component under
 * `structure-component-<key>` rather than under the key it was given, so a
 * stub that passed the key as written would let a check against that key pass
 * here while matching nothing in a browser - which is exactly how every ligand
 * came to be painted with the structure-wide theme. The tag on the
 * representation is what the viewer reads instead, so it is what this carries.
 */
function themeCallbackArgs(part: string) {
  return [
    { key: `structure-component-${part}-A` },
    { cell: { transform: { tags: [part] } } },
  ] as const;
}

/**
 * `structure` is the parsed structure the viewer would be holding. Passing a
 * real one lets the tests exercise the actual residue-to-loci resolution
 * rather than a stand-in for it.
 */
function createStubPlugin(structure?: Structure) {
  const loadedThemes: string[] = [];
  const parsedPdb: string[] = [];
  const parsedFormats: string[] = [];
  const focused = new BehaviorSubject<{ loci: unknown } | undefined>(undefined);

  /** Component keys the load path built, in order. */
  const components: string[] = [];

  /** Representation type built over each component, by component key. */
  const representations = new Map<string, string>();

  /**
   * What `setSubtreeVisibility` ended up writing, by component ref. It is real
   * Mol* code walking the state tree, so the tree below is stood up far enough
   * for it to run rather than the call being mocked out - otherwise the test
   * would assert that the viewer called a function, not that a chain is hidden.
   */
  const visibility = new Map<string, boolean>();
  const transforms = new Map<string, { ref: string }>();

  /**
   * Hierarchy components the load path built. The same array the plugin
   * reports, so a chain hover can find them the way it does in a browser.
   */
  const hierarchyComponents: {
    key: string;
    cell: { transform: { ref: string } };
  }[] = [];

  /** Focus shell settings, one entry per reconfiguration. */
  const focusShells: { components: string[]; expandRadius: number }[] = [];

  return {
    behaviors: {
      interaction: {
        click: subscribable(EMPTY_CLICK),
        hover: subscribable(EMPTY_CLICK),
      },
    },
    builders: {
      data: { rawData: vi.fn(async (args: { data: string }) => args.data) },
      structure: {
        createModel: vi.fn(async (trajectory: string) => trajectory),
        // Structure.Empty stands in for a structure with no chains, which is
        // what the tests that pass none are describing.
        createStructure: vi.fn(async () => ({
          data: structure ?? Structure.Empty,
          ref: "structure",
        })),
        hierarchy: { applyPreset: vi.fn(async () => undefined) },
        parseTrajectory: vi.fn(async (data: string, format?: string) => {
          parsedPdb.push(data);
          parsedFormats.push(format ?? "pdb");
          return data;
        }),
        representation: {
          addRepresentation: vi.fn(
            async (
              component: { ref: string },
              props: { type: string }
            ): Promise<undefined> => {
              representations.set(component.ref, props.type);
              return undefined;
            }
          ),
        },
        /**
         * Returns nothing when the expression selects nothing, as Mol* does.
         * The expression is run for real against the structure, so a chain
         * with no ligands gets no ligand component here either - otherwise
         * every test would see components the viewer would never build.
         */
        tryCreateComponentFromExpression: vi.fn(
          async (
            _structure: unknown,
            expression: Expression,
            key: string
          ): Promise<{ ref: string } | undefined> => {
            if (structure && selectsNothing(structure, expression))
              return undefined;

            const ref = `component-${key}`;
            components.push(key);
            transforms.set(ref, { ref });
            hierarchyComponents.push({
              cell: { transform: { ref } },
              key: `structure-component-${key}`,
            });
            return { ref };
          }
        ),
      },
    },
    canvas3d: {
      camera: stubCamera(),
      didDraw: subscribable(),
      /**
       * Residue-hover marking colors the theme is holding. Real Mol* keeps
       * these current as `setProps` is called; here they stay as the theme
       * left them.
       */
      props: {
        marking: { highlightEdgeColor: THEME_EDGE_COLOR },
        renderer: {
          highlightColor: THEME_HIGHLIGHT_COLOR,
          highlightStrength: THEME_HIGHLIGHT_STRENGTH,
        },
      },
      requestCameraReset: vi.fn(),
      setProps: vi.fn(),
    },
    clear: vi.fn(async () => undefined),
    dataTransaction: vi.fn(async (fn: () => Promise<void>) => fn()),
    dispose: vi.fn(),
    loadedThemes,
    managers: {
      interactivity: {
        lociHighlights: { clearHighlights: vi.fn(), highlightOnly: vi.fn() },
        lociSelects: { deselectAll: vi.fn(), selectOnly: vi.fn() },
      },
      lociLabels: { providers: [], removeProvider: vi.fn() },
      structure: {
        component: {
          // Read by the load path to match the cartoon parameters Mol*'s own
          // presets compute.
          state: {
            options: {
              hydrogens: "all",
              ignoreLight: false,
              visualQuality: "auto",
            },
          },
          /**
           * The viewer passes the per-representation form, so that the
           * heteroatoms can stay on element colors while the polymer takes
           * whatever the props asked for. Asked here for the polymer, which is
           * the theme the tests around this are about.
           */
          updateRepresentationsTheme: vi.fn(
            async (
              _components: unknown,
              params: (...args: ReturnType<typeof themeCallbackArgs>) => {
                color: string;
              }
            ) => {
              loadedThemes.push(
                params(...themeCallbackArgs(POLYMER_PART)).color
              );
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
              {
                cell: { obj: { data: structure } },
                components: hierarchyComponents,
              },
            ],
          },
        },
      },
    },
    parsedFormats,
    parsedPdb,
    representation: {
      structure: { themes: { colorThemeRegistry: { add: vi.fn() } } },
    },
    state: {
      data: {
        transforms,
        tree: { children: new Map(), transforms },
        updateCellState: vi.fn((ref: string, next: { isHidden: boolean }) => {
          visibility.set(ref, next.isHidden);
        }),
      },
      /**
       * How the focus shell is configured. The viewer confines it to the
       * selection for a whole chain, which on a complex would otherwise reach
       * across the interface and draw the partner chain's contact face.
       */
      updateBehavior: vi.fn(
        async (
          _behavior: unknown,
          update: (params: {
            components: string[];
            expandRadius: number;
          }) => void
        ) => {
          const params = { components: [] as string[], expandRadius: -1 };
          update(params);
          focusShells.push(params);
        }
      ),
    },
    stubComponents: components,
    stubFocusShells: focusShells,
    stubRepresentations: representations,
    stubVisibility: visibility,
  };
}

/**
 * What the legend's first stat slot reads, which is where the hovered or
 * selected readout lands.
 *
 * Queried by position rather than by text because the chain legend beside it
 * names its chains the same way - a selected chain B puts "Chain B" both in
 * the readout and on its own row - so matching text alone is ambiguous.
 */
function readoutSlot(): string | undefined {
  return (
    document.querySelectorAll('[class*="StatValue"]')[0]?.textContent ??
    undefined
  );
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

const MMCIF = `data_TEST
#
loop_
_atom_site.group_PDB
_atom_site.id
_atom_site.type_symbol
_atom_site.label_atom_id
_atom_site.label_alt_id
_atom_site.label_comp_id
_atom_site.label_asym_id
_atom_site.label_entity_id
_atom_site.label_seq_id
_atom_site.pdbx_PDB_ins_code
_atom_site.Cartn_x
_atom_site.Cartn_y
_atom_site.Cartn_z
_atom_site.occupancy
_atom_site.B_iso_or_equiv
_atom_site.auth_seq_id
_atom_site.auth_comp_id
_atom_site.auth_asym_id
_atom_site.auth_atom_id
_atom_site.pdbx_PDB_model_num
ATOM 1 N N . THR A 1 1 ? 17.047 14.099 3.625 1.00 13.79 1 THR A N 1
#`;

/** Caption an overlay puts on the legend, in place of the pLDDT key. */
const OVERLAY_LABEL = "Feature activation";

/** The viewer's own per-chain theme, which stands in for Mol*'s chain-id. */
const CHAIN_THEME = "chain-color";

/** Mol*'s B-factor theme, which is the one pLDDT scores are painted through. */
const PLDDT_THEME = "plddt-bfactor";

/** Barstar's polymer component in the stub state tree, and its legend toggle. */
const BARSTAR_REF = componentRef("polymer-B");
const HIDE_BARSTAR = "Hide chain B";

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
    <ProteinStructureViewer data-testid="viewer" structure={PDB} {...props} />
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

    const view = (structure: string) => (
      <ThemeProvider theme={defaultTheme}>
        <ProteinStructureViewer structure={structure} />
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
          structure={PDB}
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
    expect(plugin.parsedFormats[0]).toBe("pdb");
    expect(plugin.canvas3d.requestCameraReset).toHaveBeenCalled();
  });

  it("disposes the plugin on unmount", async () => {
    const { unmount } = render(
      <ThemeProvider theme={defaultTheme}>
        <ProteinStructureViewer structure={PDB} />
      </ThemeProvider>
    );

    await waitFor(() => expect(createPluginUI).toHaveBeenCalledTimes(1));
    unmount();

    await waitFor(() => expect(plugin.dispose).toHaveBeenCalled());
  });

  it("colors by pLDDT when scores are supplied", async () => {
    renderViewer({ plddt: [0.94] });

    await waitFor(() => expect(plugin.loadedThemes).toContain(PLDDT_THEME));
  });

  it("falls back to chain coloring when no scores are supplied", async () => {
    // The viewer's own per-chain theme rather than Mol*'s built-in `chain-id`,
    // so the chain legend's swatches can match what is on screen.
    renderViewer();

    await waitFor(() => expect(plugin.loadedThemes).toContain(CHAIN_THEME));
    expect(plugin.loadedThemes).not.toContain(PLDDT_THEME);
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

  it("parses mmCIF when the structure text is a CIF document", async () => {
    renderViewer({ structure: MMCIF });

    await waitFor(() => expect(plugin.parsedFormats.length).toBe(1));
    expect(plugin.parsedFormats[0]).toBe("mmcif");
  });

  it("injects pLDDT scores into mmCIF B_iso_or_equiv before parsing", async () => {
    renderViewer({ structure: MMCIF, plddt: [0.94] });

    await waitFor(() => expect(plugin.parsedPdb.length).toBe(1));
    expect(plugin.parsedPdb[0]).toContain("94.00");
    expect(plugin.parsedFormats[0]).toBe("mmcif");
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
    // Nothing supplies a per-residue value here, so the structure is colored by
    // chain and there is no scale that describes what is on screen. A pLDDT key
    // would be labelling colors the structure does not carry; the chain legend
    // is what describes chain coloring.
    renderViewer({ stats: [{ label: "Known", value: "62%" }] });

    await waitFor(() => expect(plugin.loadedThemes).toContain(CHAIN_THEME));

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
          <ProteinStructureViewer structure={PDB} />
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
        <ProteinStructureViewer structure={PDB} />
      </ThemeProvider>
    );

    await waitFor(() => expect(createPluginUI).toHaveBeenCalledTimes(1));
    plugin.canvas3d.setProps.mockClear();

    rerender(
      <ThemeProvider theme={Theme("dark")}>
        <ProteinStructureViewer structure={PDB} />
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
          <ProteinStructureViewer structure={PDB} />
        </ThemeProvider>
      );
      await waitFor(() => expect(createPluginUI).toHaveBeenCalledTimes(1));

      rerender(
        <ThemeProvider theme={defaultTheme}>
          <ProteinStructureViewer structure={OTHER_PDB} />
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
          <ProteinStructureViewer structure={PDB} />
        </ThemeProvider>
      );
      await waitFor(() => expect(createPluginUI).toHaveBeenCalledTimes(1));

      rerender(
        <ThemeProvider theme={Theme("dark")}>
          <ProteinStructureViewer structure={PDB} />
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
   * `selection` is documented as controlling the camera: setting it frames what
   * it covers, clearing it zooms back out. That has to hold however the
   * selection was made, not just for the one path where a click happens to have
   * moved the camera on its own beforehand.
   */
  describe("selection driving the camera", () => {
    function selecting(residue: number | null) {
      return (
        <ThemeProvider theme={defaultTheme}>
          <ProteinStructureViewer
            structure={CRAMBIN_PDB}
            selection={residue === null ? null : { residues: [residue] }}
          />
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
            structure={CRAMBIN_PDB}
            selection={null}
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
        expect(onResidueClick).toHaveBeenCalledWith(
          expect.objectContaining({ chainId: "A", compId: "PHE", index: 12 })
        )
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

  /**
   * A chain is the unit Mol* can hide, and the load path is what creates one
   * per chain. Before it did, every polymer chain shared a single component and
   * there was nothing individual to hide or recolor.
   */
  describe("chains", () => {
    let complex: Structure;

    beforeAll(async () => {
      complex = await structureFromPdb(BARNASE_BARSTAR_PDB);
    });

    beforeEach(() => {
      plugin = createStubPlugin(complex);
      createPluginUI.mockResolvedValue(plugin);
    });

    it("draws one cartoon component per chain", async () => {
      renderViewer({ structure: BARNASE_BARSTAR_PDB });

      await waitFor(() =>
        expect(plugin.stubComponents).toEqual([POLYMER_A, "polymer-B"])
      );
      expect(
        plugin.builders.structure.representation.addRepresentation
      ).toHaveBeenCalledTimes(2);
    });

    /**
     * Pointing at a chain's name dims every other chain in the 3D view, which
     * on a complex is how you find out which half of it is which.
     *
     * Mol* transparency draws it, so what is asserted is which components were
     * dimmed and that a leave (or a move to another name) restores them.
     */
    describe("hovering a chain's name", () => {
      /** The chain legend's row for a chain, which is what reports the hover. */
      async function chainRow(label: string): Promise<HTMLElement> {
        const name = await screen.findByRole("button", {
          name: `Chain ${label}`,
        });

        return name.closest("div") as HTMLElement;
      }

      /** Arguments the dim was last called with. */
      function lastDim(): [unknown, unknown[], number] | undefined {
        const { calls } = setStructureTransparency.mock;
        return calls[calls.length - 1] as unknown as
          | [unknown, unknown[], number]
          | undefined;
      }

      /** Chain ids whose components were in the last dim call. */
      function dimmedChainIds(): string[] {
        const components = (lastDim()?.[1] ?? []) as {
          key?: string;
          cell: { transform: { ref: string } };
        }[];

        return components
          .map((component) => componentChainId(component))
          .filter((id): id is string => id !== undefined);
      }

      beforeEach(() => {
        setStructureTransparency.mockClear();
        clearStructureTransparency.mockClear();
      });

      it("dims every other chain, leaving the hovered one opaque", async () => {
        renderViewer({ structure: BARNASE_BARSTAR_PDB });
        fireEvent.mouseEnter(await chainRow("B"));

        await waitFor(() =>
          expect(setStructureTransparency).toHaveBeenCalled()
        );

        expect(new Set(dimmedChainIds())).toEqual(new Set(["A"]));
        expect(lastDim()?.[2]).toBe(CHAIN_DIM_TRANSPARENCY);
      });

      it("restores full opacity when the pointer leaves", async () => {
        renderViewer({ structure: BARNASE_BARSTAR_PDB });
        const row = await chainRow("B");

        fireEvent.mouseEnter(row);
        await waitFor(() =>
          expect(setStructureTransparency).toHaveBeenCalled()
        );

        fireEvent.mouseLeave(row);

        await waitFor(() =>
          expect(clearStructureTransparency.mock.calls.length).toBeGreaterThan(
            1
          )
        );
        expect(setStructureTransparency).toHaveBeenCalledTimes(1);
      });

      it("stays at full opacity when disableChainHighlightOnHover is set", async () => {
        renderViewer({
          disableChainHighlightOnHover: true,
          structure: BARNASE_BARSTAR_PDB,
        });
        fireEvent.mouseEnter(await chainRow("B"));
        fireEvent.mouseLeave(await chainRow("B"));

        expect(setStructureTransparency).not.toHaveBeenCalled();
        expect(clearStructureTransparency).not.toHaveBeenCalled();
      });

      /**
       * Turned off part way through a hover, the dim would otherwise be
       * stranded: no leave follows a prop change, so nothing would take it off.
       */
      it("restores full opacity when hovering is turned off mid-hover", async () => {
        const view = (disable: boolean) => (
          <ThemeProvider theme={defaultTheme}>
            <ProteinStructureViewer
              disableChainHighlightOnHover={disable}
              structure={BARNASE_BARSTAR_PDB}
            />
          </ThemeProvider>
        );

        const { rerender } = render(view(false));
        fireEvent.mouseEnter(await chainRow("B"));
        await waitFor(() =>
          expect(setStructureTransparency).toHaveBeenCalled()
        );
        clearStructureTransparency.mockClear();

        rerender(view(true));

        await waitFor(() =>
          expect(clearStructureTransparency).toHaveBeenCalled()
        );
      });

      /**
       * Moving from one name to the next without leaving the list dims the
       * previous hover's chain and then restores everything on leave. Each
       * hover clears first, so layers cannot stack.
       */
      it("restores full opacity after moving between two chains", async () => {
        renderViewer({ structure: BARNASE_BARSTAR_PDB });
        const barstar = await chainRow("B");

        fireEvent.mouseEnter(await chainRow("A"));
        await waitFor(() =>
          expect(setStructureTransparency).toHaveBeenCalled()
        );
        setStructureTransparency.mockClear();

        fireEvent.mouseEnter(barstar);
        await waitFor(() =>
          expect(setStructureTransparency).toHaveBeenCalled()
        );
        expect(new Set(dimmedChainIds())).toEqual(new Set(["A"]));

        fireEvent.mouseLeave(barstar);
        await waitFor(() =>
          expect(clearStructureTransparency.mock.calls.length).toBeGreaterThan(
            0
          )
        );
        expect(setStructureTransparency).toHaveBeenCalledTimes(1);
      });
    });

    it("reports the chains it found", async () => {
      const onChainsChange = vi.fn();
      renderViewer({ onChainsChange, structure: BARNASE_BARSTAR_PDB });

      await waitFor(() =>
        expect(onChainsChange).toHaveBeenCalledWith([
          expect.objectContaining({
            chainId: "A",
            endIndex: 109,
            residueCount: 110,
            startIndex: 0,
          }),
          expect.objectContaining({
            chainId: "B",
            endIndex: 198,
            residueCount: 89,
            startIndex: 110,
          }),
        ])
      );
    });

    it("hides only the chain named by hiddenChains", async () => {
      renderViewer({ hiddenChains: ["B"], structure: BARNASE_BARSTAR_PDB });

      await waitFor(() =>
        expect(plugin.stubVisibility.get(BARSTAR_REF)).toBe(true)
      );
      expect(plugin.stubVisibility.get(componentRef(POLYMER_A))).toBe(false);
    });

    it("brings a chain back when it leaves hiddenChains", async () => {
      const view = (hidden: string[]) => (
        <ThemeProvider theme={defaultTheme}>
          <ProteinStructureViewer
            hiddenChains={hidden}
            structure={BARNASE_BARSTAR_PDB}
          />
        </ThemeProvider>
      );

      const { rerender } = render(view(["B"]));
      await waitFor(() =>
        expect(plugin.stubVisibility.get(BARSTAR_REF)).toBe(true)
      );

      rerender(view([]));

      await waitFor(() =>
        expect(plugin.stubVisibility.get(BARSTAR_REF)).toBe(false)
      );
    });

    /**
     * Visibility is uncontrolled unless `hiddenChains` is passed, which is what
     * makes the legend's toggles work without the consumer holding any state.
     */
    it("hides a chain from its own toggle when uncontrolled", async () => {
      const onChainVisibilityChange = vi.fn();
      renderViewer({ onChainVisibilityChange, structure: BARNASE_BARSTAR_PDB });

      const toggle = await screen.findByRole("button", {
        name: HIDE_BARSTAR,
      });
      act(() => toggle.click());

      await waitFor(() =>
        expect(plugin.stubVisibility.get(BARSTAR_REF)).toBe(true)
      );
      expect(onChainVisibilityChange).toHaveBeenCalledWith(["B"]);
    });

    /**
     * Passing `hiddenChains` takes visibility over. The toggle still reports,
     * so a consumer can hear about the intent, but acting on it is now theirs.
     */
    it("only reports from the toggle when controlled", async () => {
      const onChainVisibilityChange = vi.fn();
      renderViewer({
        hiddenChains: [],
        onChainVisibilityChange,
        structure: BARNASE_BARSTAR_PDB,
      });

      const toggle = await screen.findByRole("button", {
        name: HIDE_BARSTAR,
      });
      act(() => toggle.click());

      await waitFor(() =>
        expect(onChainVisibilityChange).toHaveBeenCalledWith(["B"])
      );
      expect(plugin.stubVisibility.get(BARSTAR_REF)).toBe(false);
    });

    /**
     * Mol*'s click behavior is a BehaviorSubject holding an empty click before
     * anything has been clicked, and subscribing replays it. Read as a real
     * click it means "the user clicked empty space", which clears the
     * selection - so a consumer mounting the viewer with something already
     * selected had it wiped before the canvas was even interactive.
     */
    it("keeps a selection made before the viewer was interactive", async () => {
      const onSelectionChange = vi.fn();
      renderViewer({
        onSelectionChange,
        structure: BARNASE_BARSTAR_PDB,
        selection: { chains: ["B"] },
      });

      await waitFor(() => expect(readoutSlot()).toBe("Chain B"));
      expect(onSelectionChange).not.toHaveBeenCalled();
    });

    it("still clears the selection when empty space is actually clicked", async () => {
      const onSelectionChange = vi.fn();
      renderViewer({
        onSelectionChange,
        structure: BARNASE_BARSTAR_PDB,
        selection: { chains: ["B"] },
      });
      await waitFor(() =>
        expect(plugin.behaviors.interaction.click.subscribe).toHaveBeenCalled()
      );

      act(() => plugin.behaviors.interaction.click.emit(EMPTY_CLICK));

      expect(onSelectionChange).toHaveBeenCalledWith(null);
    });

    /**
     * Mol* draws a focused selection with a 5A shell of its neighbours in
     * ball-and-stick. Around a residue that shell is the point of looking at
     * it; around a whole chain it reaches across the interface and paints the
     * partner chain's contact face, which reads as the partner being selected
     * too. So a chain is shown on its own and a residue keeps its shell.
     */
    describe("the focus shell", () => {
      /** How the focus shell was last configured. */
      const shell = () => {
        const all = plugin.stubFocusShells;
        return all[all.length - 1];
      };

      const selecting = (
        selection: ProteinStructureViewerProps["selection"]
      ) => (
        <ThemeProvider theme={defaultTheme}>
          <ProteinStructureViewer
            structure={BARNASE_BARSTAR_PDB}
            selection={selection}
          />
        </ThemeProvider>
      );

      it("confines the shell to the selection for a whole chain", async () => {
        render(selecting({ chains: ["B"] }));

        await waitFor(() => expect(shell()?.expandRadius).toBe(0));
      });

      it("keeps drawing surroundings and interactions either way", async () => {
        // Confined, not switched off: the chain still shows its own atoms and
        // its own contacts, just nothing belonging to the chain beside it.
        render(selecting({ chains: ["B"] }));

        await waitFor(() =>
          expect(shell()?.components).toEqual([
            "target",
            "surroundings",
            "interactions",
          ])
        );
      });

      it("reaches 5A around a residue selection", async () => {
        render(selecting({ residues: [12] }));

        await waitFor(() => expect(shell()?.expandRadius).toBe(5));
      });

      it("reaches 5A around a range dragged across residues", async () => {
        render(selecting({ residues: [108, 109, 110, 111] }));

        await waitFor(() => expect(shell()?.expandRadius).toBe(5));
      });

      it("resizes when the selection changes kind", async () => {
        const { rerender } = render(selecting({ residues: [12] }));
        await waitFor(() => expect(shell()?.expandRadius).toBe(5));

        rerender(selecting({ chains: ["B"] }));

        await waitFor(() => expect(shell()?.expandRadius).toBe(0));
      });

      it("does not resize between selections of the same kind", async () => {
        const { rerender } = render(selecting({ chains: ["B"] }));
        await waitFor(() => expect(plugin.stubFocusShells).toHaveLength(1));

        rerender(selecting({ chains: ["A"] }));
        await waitFor(() =>
          expect(plugin.managers.structure.focus.setFromLoci).toHaveBeenCalled()
        );

        // Still one: the shell is already sized for a chain.
        expect(plugin.stubFocusShells).toHaveLength(1);
      });
    });

    /**
     * Mol*'s focus representation draws ball-and-stick from whatever is
     * focused, and it builds that in a part of the state tree the chain
     * component's own visibility does not reach - so hiding a selected chain
     * took its cartoon away and left its atoms behind.
     */
    describe("hiding a selected chain", () => {
      /** The viewer with one chain selected and a given set hidden. */
      const hiding = (hidden: string[], chains = ["B"]) => (
        <ThemeProvider theme={defaultTheme}>
          <ProteinStructureViewer
            hiddenChains={hidden}
            structure={BARNASE_BARSTAR_PDB}
            selection={{ chains }}
          />
        </ThemeProvider>
      );

      const focus = () => plugin.managers.structure.focus;

      it("drops the focus so nothing of the chain is drawn", async () => {
        const { rerender } = render(hiding([]));
        await waitFor(() => expect(focus().setFromLoci).toHaveBeenCalled());

        focus().clear.mockClear();
        rerender(hiding(["B"]));

        await waitFor(() => expect(focus().clear).toHaveBeenCalled());
      });

      it("leaves the camera where it is, since the selection still stands", async () => {
        const { rerender } = render(hiding([]));
        await waitFor(() => expect(focus().setFromLoci).toHaveBeenCalled());

        plugin.canvas3d.requestCameraReset.mockClear();
        rerender(hiding(["B"]));

        await waitFor(() => expect(focus().clear).toHaveBeenCalled());
        expect(plugin.canvas3d.requestCameraReset).not.toHaveBeenCalled();
      });

      it("refocuses on what is left when only part is hidden", async () => {
        const { rerender } = render(hiding([], ["A", "B"]));
        await waitFor(() => expect(focus().setFromLoci).toHaveBeenCalled());

        const before = focus().setFromLoci.mock.calls.length;
        rerender(hiding(["B"], ["A", "B"]));

        // Chain A is still shown, so the focus moves to it rather than going.
        await waitFor(() =>
          expect(focus().setFromLoci.mock.calls.length).toBeGreaterThan(before)
        );
      });

      it("focuses again when the chain is brought back", async () => {
        const { rerender } = render(hiding(["B"]));
        await waitFor(() => expect(createPluginUI).toHaveBeenCalled());

        focus().setFromLoci.mockClear();
        rerender(hiding([]));

        await waitFor(() => expect(focus().setFromLoci).toHaveBeenCalled());
      });
    });

    it("selects a whole chain from its name in the legend", async () => {
      const onSelectionChange = vi.fn();
      renderViewer({ onSelectionChange, structure: BARNASE_BARSTAR_PDB });

      const label = await screen.findByRole("button", { name: "Chain B" });
      act(() => label.click());

      // Reported as the chain it is, not as the 89 indices it stands for.
      expect(onSelectionChange).toHaveBeenCalledWith({ chains: ["B"] });
    });

    /**
     * The chain's name is a toggle, not a one-way switch: clicking the chain
     * that is already selected clears the selection rather than restating it.
     */
    it("clears the selection when the selected chain is clicked again", async () => {
      const onSelectionChange = vi.fn();
      renderViewer({
        onSelectionChange,
        structure: BARNASE_BARSTAR_PDB,
        selection: { chains: ["B"] },
      });

      const label = await screen.findByRole("button", { name: "Chain B" });
      act(() => label.click());

      expect(onSelectionChange).toHaveBeenCalledWith(null);
    });

    it("narrows to a chain rather than clearing when something else is selected", async () => {
      const onSelectionChange = vi.fn();
      renderViewer({
        onSelectionChange,
        structure: BARNASE_BARSTAR_PDB,
        selection: { chains: ["A"] },
      });

      const label = await screen.findByRole("button", { name: "Chain B" });
      act(() => label.click());

      expect(onSelectionChange).toHaveBeenCalledWith({ chains: ["B"] });
    });

    /**
     * Only the legend's row is reachable here: the sequence panel's captions
     * render inside the React root Mol* owns, which the stubbed plugin never
     * creates. Their behaviour is covered in the browser instead.
     */
    it("marks the selected chain as pressed", async () => {
      renderViewer({
        structure: BARNASE_BARSTAR_PDB,
        selection: { chains: ["B"] },
      });

      const selected = await screen.findByRole("button", { name: "Chain B" });
      expect(selected).toHaveAttribute("aria-pressed", "true");

      expect(screen.getByRole("button", { name: "Chain A" })).toHaveAttribute(
        "aria-pressed",
        "false"
      );
    });

    it("frames a whole chain and reports its mean pLDDT", async () => {
      renderViewer({
        structure: BARNASE_BARSTAR_PDB,
        plddt: Array.from({ length: 199 }, (_, i) => (i < 110 ? 0.5 : 0.9)),
        selection: { chains: ["B"] },
      });

      await waitFor(() =>
        expect(plugin.managers.structure.focus.setFromLoci).toHaveBeenCalled()
      );

      // Barstar's residues all score 0.9, and the readout names the chain
      // rather than a residue on it. Read out of the stat slot rather than by
      // text, since the legend's own chain row says "Chain B" as well.
      await waitFor(() => expect(readoutSlot()).toBe("Chain B"));
      expect(screen.getByText("Mean pLDDT")).toBeInTheDocument();
      expect(screen.getByText("0.900")).toBeInTheDocument();
    });

    it("reports every residue a click covers, not just the first", async () => {
      const onSelectionChange = vi.fn();
      renderViewer({ onSelectionChange, structure: BARNASE_BARSTAR_PDB });

      await waitFor(() =>
        expect(plugin.behaviors.interaction.click.subscribe).toHaveBeenCalled()
      );

      // A range spanning the chain break, as a drag across the sequence makes.
      const loci = lociForSelectionInStructure(complex, {
        residues: [108, 109, 110, 111],
      });
      act(() => {
        plugin.behaviors.interaction.click.emit({ current: { loci } });
      });

      expect(onSelectionChange).toHaveBeenCalledWith({
        residues: [108, 109, 110, 111],
      });
    });

    it("hides the chain legend for a single-chain structure", async () => {
      plugin = createStubPlugin(crambin);
      createPluginUI.mockResolvedValue(plugin);
      renderViewer({ structure: CRAMBIN_PDB });

      await waitFor(() => expect(createPluginUI).toHaveBeenCalled());
      expect(
        screen.queryByRole("button", { name: /chain/i })
      ).not.toBeInTheDocument();
    });

    it("drops the chain legend when showChainLegend is off", async () => {
      renderViewer({ structure: BARNASE_BARSTAR_PDB, showChainLegend: false });

      await waitFor(() => expect(plugin.stubComponents).toHaveLength(2));
      expect(
        screen.queryByRole("button", { name: "Hide chain B" })
      ).not.toBeInTheDocument();
    });

    it("paints chains the colors the consumer chose", async () => {
      renderViewer({
        chainColors: { A: "#123456" },
        structure: BARNASE_BARSTAR_PDB,
        plddt: null,
      });

      await waitFor(() => expect(plugin.loadedThemes).toContain(CHAIN_THEME));

      const swatches = document.querySelectorAll('[class*="ChainSwatch"]');
      expect(getComputedStyle(swatches[0] as Element).backgroundColor).toBe(
        "rgb(18, 52, 86)"
      );
    });
  });

  /**
   * Ligands and ions, which a cartoon cannot draw: myoglobin's heme and the
   * hydroxide on its iron are invisible unless something else draws them.
   */
  describe("heteroatoms", () => {
    /** A zinc on a chain of its own, which is how some files name a ligand. */
    const LIGAND_CHAIN_PDB = [
      "ATOM      1  CA  MET A   1      10.000  10.000  10.000  1.00  0.00           C",
      "ATOM      2  CA  SER A   2      13.800  10.000  10.000  1.00  0.00           C",
      "HETATM    3 ZN    ZN B 101      20.000  10.000  10.000  1.00  0.00          ZN",
    ].join("\n");

    /** The theme the last recolor chose for one half of a chain. */
    function themeFor(part: string): string {
      const { calls } =
        plugin.managers.structure.component.updateRepresentationsTheme.mock;
      const params = calls[calls.length - 1]?.[1] as (
        ...args: ReturnType<typeof themeCallbackArgs>
      ) => { color: string };

      return params(...themeCallbackArgs(part)).color;
    }

    beforeEach(async () => {
      plugin = createStubPlugin(await structureFromPdb(MYOGLOBIN_PDB));
      createPluginUI.mockResolvedValue(plugin);
    });

    it("draws them as ball-and-stick beside the polymer's cartoon", async () => {
      renderViewer({ structure: MYOGLOBIN_PDB });

      await waitFor(() =>
        expect(plugin.stubComponents).toEqual([POLYMER_A, LIGAND_A])
      );
      expect([...plugin.stubRepresentations]).toEqual([
        [componentRef(POLYMER_A), "cartoon"],
        [componentRef(LIGAND_A), "ball-and-stick"],
      ]);
    });

    /**
     * A heme reads as a heme because its iron is orange and its nitrogens are
     * blue. Coloring it by the structure-wide theme would throw that away, and
     * under pLDDT would color it by a score a HETATM does not have.
     */
    it("leaves them on element colors while the polymer takes the theme", async () => {
      renderViewer({ structure: MYOGLOBIN_PDB, plddt: [0.94] });

      await waitFor(() => expect(plugin.loadedThemes).toContain(PLDDT_THEME));
      expect(themeFor(POLYMER_PART)).toBe(PLDDT_THEME);
      expect(themeFor(LIGAND_PART)).toBe("element-symbol");
    });

    /**
     * Both halves of the chain, or hiding it would leave a heme floating where
     * its protein used to be.
     */
    it("hides them along with the chain they sit on", async () => {
      renderViewer({ hiddenChains: ["A"], structure: MYOGLOBIN_PDB });

      await waitFor(() =>
        expect(plugin.stubVisibility.get(componentRef(LIGAND_A))).toBe(true)
      );
      expect(plugin.stubVisibility.get(componentRef(POLYMER_A))).toBe(true);
    });

    /**
     * A file can give a ligand a chain of its own, which is a chain with no
     * sequence: absent from `onChainsChange` and from the legend, and still
     * drawn. The load path works from every chain the file names rather than
     * from the ones reported, which is what leaves it on screen.
     */
    it("draws a ligand given a chain of its own", async () => {
      const onChainsChange = vi.fn();
      plugin = createStubPlugin(await structureFromPdb(LIGAND_CHAIN_PDB));
      createPluginUI.mockResolvedValue(plugin);

      renderViewer({ onChainsChange, structure: LIGAND_CHAIN_PDB });

      await waitFor(() =>
        expect(plugin.stubComponents).toEqual([POLYMER_A, "ligand-B"])
      );
      expect(onChainsChange).toHaveBeenCalledWith([
        expect.objectContaining({ chainId: "A" }),
      ]);
    });
  });

  /**
   * The escape hatch onto the rest of Mol*. The viewer builds a spec of its
   * own, and this is how a consumer reaches settings the viewer has no prop
   * for without one being added here for each.
   */
  describe("molstarSpec", () => {
    /** The spec `createPluginUI` was actually handed. */
    const spec = () => createPluginUI.mock.calls[0]?.[0]?.spec;

    it("passes a consumer's canvas3d settings into the plugin", async () => {
      renderViewer({
        molstarSpec: {
          canvas3d: { postprocessing: { occlusion: { name: "off" } } },
        },
      } as Partial<ProteinStructureViewerProps>);

      await waitFor(() => expect(createPluginUI).toHaveBeenCalled());
      expect(spec().canvas3d.postprocessing).toEqual({
        occlusion: { name: "off" },
      });
    });

    it("keeps the viewer's own canvas3d settings alongside them", async () => {
      renderViewer({
        molstarSpec: { canvas3d: { renderer: { colorMarker: false } } },
      } as Partial<ProteinStructureViewerProps>);

      await waitFor(() => expect(createPluginUI).toHaveBeenCalled());

      // Named by the consumer, so theirs wins.
      expect(spec().canvas3d.renderer.colorMarker).toBe(false);
      // Not named, so the viewer's marking colors survive.
      expect(spec().canvas3d.marking.selectEdgeColor).toBeDefined();
    });

    it("appends a consumer's config after the viewer's, so theirs wins", async () => {
      renderViewer({
        molstarSpec: { config: [[PluginConfig.Viewport.ShowExpand, true]] },
      } as Partial<ProteinStructureViewerProps>);

      await waitFor(() => expect(createPluginUI).toHaveBeenCalled());

      const entries = spec().config.filter(
        ([item]: [unknown]) => item === PluginConfig.Viewport.ShowExpand
      );

      // The viewer sets it false; the consumer's true comes after, and Mol*
      // folds the list into a Map in order.
      expect(entries[entries.length - 1][1]).toBe(true);
    });

    it("leaves the camera behavior the viewer removed removed", async () => {
      renderViewer({
        molstarSpec: { canvas3d: {} },
      } as Partial<ProteinStructureViewerProps>);

      await waitFor(() => expect(createPluginUI).toHaveBeenCalled());
      expect(
        spec().behaviors.some(
          (b: { transformer: unknown }) =>
            b.transformer === PluginBehaviors.Camera.FocusLoci
        )
      ).toBe(false);
    });

    it("pushes canvas3d overrides into the live canvas after the viewer's", async () => {
      renderViewer({
        molstarSpec: { canvas3d: { renderer: { colorMarker: false } } },
      } as Partial<ProteinStructureViewerProps>);

      await waitFor(() =>
        expect(plugin.canvas3d.setProps).toHaveBeenCalledWith(
          expect.objectContaining({
            renderer: expect.objectContaining({ colorMarker: false }),
          })
        )
      );
    });

    it("renders without one, which is the common case", async () => {
      renderViewer();

      await waitFor(() => expect(createPluginUI).toHaveBeenCalled());
      expect(spec().canvas3d.renderer.colorMarker).toBe(true);
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

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
import {
  ProteinStructureViewerProps,
  SceneMode,
} from "../ProteinStructureViewer.types";
import { chainsFromStructure } from "../utils/chains";
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
  const state = {
    fov: Math.PI / 4,
    mode: "perspective" as const,
    position: [0, 0, 50],
    radius: 10,
    radiusMax: 100,
    target: [0, 0, 0],
    up: [0, 1, 0],
  };

  return {
    getFocus: vi.fn(() => ({ radius: 1 })),
    getSnapshot: vi.fn(() => ({ ...state })),
    getTargetDistance: vi.fn(() => 50),
    setState: vi.fn(),
    state,
    transition: { inTransition: false },
    viewport: { height: 400, width: 600, x: 0, y: 0 },
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
const HIGHLIGHT_A = "highlight-A";
const HIGHLIGHT_B = "highlight-B";
const componentRef = (key: string) => `component-${key}`;

/**
 * The surface: the `representation` that asks for it, and the key its one
 * component is built under. Mol* names the representation itself
 * `molecular-surface`.
 */
const SURFACE = "surface" as const;
const MOLECULAR_SURFACE = "molecular-surface";

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
function createStubPlugin(
  structure?: Structure,
  options: { failSurface?: boolean } = {}
) {
  const loadedThemes: string[] = [];
  const parsedPdb: string[] = [];
  const parsedFormats: string[] = [];
  const focused = new BehaviorSubject<{ loci: unknown } | undefined>(undefined);

  /** Component keys the load path built, in order. */
  const components: string[] = [];

  /** Component refs deleted from the state tree, in order. */
  const deleted: string[] = [];

  /** The color theme each representation was built with, by component ref. */
  const builtColors = new Map<string, string | undefined>();

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
              props: { type: string; color?: string }
            ): Promise<undefined> => {
              if (options.failSurface && props.type === MOLECULAR_SURFACE) {
                throw new Error("The surface is too large to compute.");
              }
              representations.set(component.ref, props.type);
              builtColors.set(component.ref, props.color);
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
        camera: { mode: "perspective" },
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
        /** How the scene deletes components it has replaced. */
        build: vi.fn(() => {
          const refs: string[] = [];
          const update = {
            commit: vi.fn(async () => {
              deleted.push(...refs);
            }),
            delete: vi.fn((ref: string): unknown => {
              refs.push(ref);
              return update;
            }),
          };
          return update;
        }),
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
    stubBuiltColors: builtColors,
    stubComponents: components,
    stubDeleted: deleted,
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

/** A promise and the handles to settle it from a test. */
function deferred<T = void>() {
  let resolve: (value: T) => void = () => undefined;
  let reject: (error: unknown) => void = () => undefined;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, reject, resolve };
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

/** The viewer's pLDDT theme, which reads the scores by residue. */
const PLDDT_THEME = "plddt";

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

  /**
   * Scores are read by the pLDDT theme, residue by residue, so the text Mol*
   * parses is exactly the text the consumer passed - which is what lets a
   * verified structure stay verified.
   */
  it("parses the structure exactly as given when scores are supplied", async () => {
    renderViewer({ plddt: [0.94] });

    await waitFor(() => expect(plugin.parsedPdb.length).toBe(1));
    expect(plugin.parsedPdb[0]).toBe(PDB);
  });

  it("recolors rather than reloads when scores arrive late", async () => {
    const view = (plddt: number[] | null) => (
      <ThemeProvider theme={defaultTheme}>
        <ProteinStructureViewer plddt={plddt} structure={PDB} />
      </ThemeProvider>
    );

    const { rerender } = render(view(null));
    await waitFor(() => expect(plugin.loadedThemes).toContain(CHAIN_THEME));

    rerender(view([0.94]));

    await waitFor(() => expect(plugin.loadedThemes).toContain(PLDDT_THEME));
    expect(plugin.parsedPdb).toHaveLength(1);
  });

  it("parses mmCIF when the structure text is a CIF document", async () => {
    renderViewer({ structure: MMCIF });

    await waitFor(() => expect(plugin.parsedFormats.length).toBe(1));
    expect(plugin.parsedFormats[0]).toBe("mmcif");
  });

  it("parses mmCIF exactly as given when scores are supplied", async () => {
    renderViewer({ structure: MMCIF, plddt: [0.94] });

    await waitFor(() => expect(plugin.parsedPdb.length).toBe(1));
    expect(plugin.parsedPdb[0]).toBe(MMCIF);
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

    /**
     * Left undefined, `selection` is the viewer's own, which is how the
     * documented examples mount it: nobody is there to echo a click back, so
     * the viewer has to take it up itself or a click would never zoom.
     */
    describe("when nobody controls it", () => {
      function uncontrolled(
        structure = CRAMBIN_PDB,
        onSelectionChange?: ProteinStructureViewerProps["onSelectionChange"]
      ) {
        return (
          <ThemeProvider theme={defaultTheme}>
            <ProteinStructureViewer
              onSelectionChange={onSelectionChange}
              structure={structure}
            />
          </ThemeProvider>
        );
      }

      async function interactive() {
        await waitFor(() =>
          expect(
            plugin.behaviors.interaction.click.subscribe
          ).toHaveBeenCalled()
        );
      }

      /** Clicks a residue the way the 3D view reports one. */
      function clickResidue(index: number) {
        const loci = lociForResidueIndex(
          plugin as unknown as PluginUIContext,
          index
        );
        act(() =>
          plugin.behaviors.interaction.click.emit({ current: { loci } })
        );
      }

      it("zooms in on a clicked residue", async () => {
        const onSelectionChange = vi.fn();
        render(uncontrolled(CRAMBIN_PDB, onSelectionChange));
        await interactive();

        clickResidue(12);

        await waitFor(() => expect(focusMoves()).toBeGreaterThan(0));
        expect(onSelectionChange).toHaveBeenCalledWith({ residues: [12] });
      });

      it("zooms back out when empty space is clicked", async () => {
        const onSelectionChange = vi.fn();
        render(uncontrolled(CRAMBIN_PDB, onSelectionChange));
        await interactive();
        clickResidue(12);
        await waitFor(() => expect(focusMoves()).toBeGreaterThan(0));

        plugin.canvas3d.requestCameraReset.mockClear();
        act(() => plugin.behaviors.interaction.click.emit(EMPTY_CLICK));

        await waitFor(() =>
          expect(plugin.canvas3d.requestCameraReset).toHaveBeenCalled()
        );
        expect(onSelectionChange).toHaveBeenLastCalledWith(null);
      });

      it("zooms in on the same index again once the structure is swapped", async () => {
        // An index names a different residue on the new structure, so a click
        // on it is a new selection rather than a repeat of the old one.
        const { rerender } = render(uncontrolled());
        await interactive();
        clickResidue(12);
        await waitFor(() => expect(focusMoves()).toBeGreaterThan(0));

        plugin.managers.structure.focus.clear.mockClear();
        rerender(uncontrolled(OTHER_PDB));
        await waitFor(() =>
          expect(plugin.managers.structure.focus.clear).toHaveBeenCalled()
        );

        const before = focusMoves();
        clickResidue(12);

        await waitFor(() => expect(focusMoves()).toBeGreaterThan(before));
      });
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

    /**
     * Pointing at a chain's name dims every other chain in the 3D view, which
     * on a complex is how you find out which half of it is which.
     *
     * Mol* transparency draws it, so what is asserted is which components were
     * dimmed and that a leave (or a move to another name) restores them.
     */
    describe("hovering a chain's name", () => {
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

    /**
     * A selected chain is shown the same way a hovered one is, and for the same
     * reason: it is the chain being read, and dimming the others says so
     * without painting anything over the one it is pointing at.
     */
    describe("selecting a chain", () => {
      const selecting = (
        selection: ProteinStructureViewerProps["selection"],
        hidden: string[] = []
      ) => (
        <ThemeProvider theme={defaultTheme}>
          <ProteinStructureViewer
            hiddenChains={hidden}
            structure={BARNASE_BARSTAR_PDB}
            selection={selection}
          />
        </ThemeProvider>
      );

      it("dims the other chains for as long as it stands", async () => {
        render(selecting({ chains: ["B"] }));

        await waitFor(() =>
          expect(setStructureTransparency).toHaveBeenCalled()
        );
        expect(new Set(dimmedChainIds())).toEqual(new Set(["A"]));
      });

      it("selects a chain from its name when nobody controls the selection", async () => {
        renderViewer({ structure: BARNASE_BARSTAR_PDB });

        fireEvent.click(await screen.findByRole("button", { name: "Chain B" }));

        await waitFor(() =>
          expect(setStructureTransparency).toHaveBeenCalled()
        );
        expect(new Set(dimmedChainIds())).toEqual(new Set(["A"]));
      });

      it("still dims when hover highlighting is turned off", async () => {
        // `disableChainHighlightOnHover` turns off what the pointer does, not
        // what the selection does: a selected chain would otherwise have
        // nothing at all to show it.
        render(
          <ThemeProvider theme={defaultTheme}>
            <ProteinStructureViewer
              disableChainHighlightOnHover
              structure={BARNASE_BARSTAR_PDB}
              selection={{ chains: ["B"] }}
            />
          </ThemeProvider>
        );

        await waitFor(() =>
          expect(setStructureTransparency).toHaveBeenCalled()
        );
        expect(new Set(dimmedChainIds())).toEqual(new Set(["A"]));
      });

      it("takes the dim off when the selection is cleared", async () => {
        const { rerender } = render(selecting({ chains: ["B"] }));
        await waitFor(() =>
          expect(setStructureTransparency).toHaveBeenCalled()
        );

        setStructureTransparency.mockClear();
        rerender(selecting(null));

        await waitFor(() =>
          expect(clearStructureTransparency).toHaveBeenCalled()
        );
        expect(setStructureTransparency).not.toHaveBeenCalled();
      });

      it("takes the dim off when the selected chain is hidden", async () => {
        // Everything visible would be dimmed otherwise, leaving the dimming
        // pointing at a chain that is not on the canvas.
        const { rerender } = render(selecting({ chains: ["B"] }));
        await waitFor(() =>
          expect(setStructureTransparency).toHaveBeenCalled()
        );

        setStructureTransparency.mockClear();
        rerender(selecting({ chains: ["B"] }, ["B"]));

        await waitFor(() =>
          expect(clearStructureTransparency).toHaveBeenCalled()
        );
        expect(setStructureTransparency).not.toHaveBeenCalled();
      });

      it("hands the dim back to the selection when a hover ends", async () => {
        render(selecting({ chains: ["B"] }));
        await waitFor(() =>
          expect(setStructureTransparency).toHaveBeenCalled()
        );

        // Barnase hovered: it takes over from barstar while the pointer is on
        // it, so barstar is the one dimmed.
        const barnase = await chainRow("A");
        fireEvent.mouseEnter(barnase);
        await waitFor(() =>
          expect(new Set(dimmedChainIds())).toEqual(new Set(["B"]))
        );

        fireEvent.mouseLeave(barnase);

        await waitFor(() =>
          expect(new Set(dimmedChainIds())).toEqual(new Set(["A"]))
        );
      });

      /**
       * A load rebuilds the state tree the dimming was written into. A parent
       * handing back the structure as a new string is what makes this
       * ordinary: it reloads with the same chains under a standing selection.
       */
      it("dims again after the structure is reloaded", async () => {
        const { rerender } = render(selecting({ chains: ["B"] }));
        await waitFor(() =>
          expect(setStructureTransparency).toHaveBeenCalled()
        );

        setStructureTransparency.mockClear();
        rerender(
          <ThemeProvider theme={defaultTheme}>
            <ProteinStructureViewer
              structure={`${BARNASE_BARSTAR_PDB}\n`}
              selection={{ chains: ["B"] }}
            />
          </ThemeProvider>
        );

        await waitFor(() =>
          expect(setStructureTransparency).toHaveBeenCalled()
        );
        expect(new Set(dimmedChainIds())).toEqual(new Set(["A"]));
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
     * it; around a whole chain there is nothing focused at all, since a chain
     * is shown by dimming the others - so the shell only has a say once a
     * selection names residues, and a chain named beside them confines it.
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

      it("confines the shell to the residues when a chain is named too", async () => {
        render(selecting({ chains: ["B"], residues: [150] }));

        await waitFor(() => expect(shell()?.expandRadius).toBe(0));
      });

      it("keeps drawing surroundings and interactions either way", async () => {
        // Confined, not switched off: the residue still shows its own atoms and
        // its own contacts, just nothing belonging to the chain beside it.
        render(selecting({ chains: ["B"], residues: [150] }));

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

        rerender(selecting({ chains: ["B"], residues: [150] }));

        await waitFor(() => expect(shell()?.expandRadius).toBe(0));
      });

      it("does not resize between selections of the same kind", async () => {
        const { rerender } = render(selecting({ residues: [12] }));
        await waitFor(() => expect(plugin.stubFocusShells).toHaveLength(1));

        const before =
          plugin.managers.structure.focus.setFromLoci.mock.calls.length;
        rerender(selecting({ residues: [13] }));
        await waitFor(() =>
          expect(
            plugin.managers.structure.focus.setFromLoci.mock.calls.length
          ).toBeGreaterThan(before)
        );

        // Still one: the shell is already sized for a residue.
        expect(plugin.stubFocusShells).toHaveLength(1);
      });

      it("focuses nothing at all for a selection of whole chains", async () => {
        render(selecting({ chains: ["B"] }));

        await waitFor(() =>
          expect(plugin.canvas3d.camera.setState).toHaveBeenCalled()
        );

        // No focus means no ball-and-stick over the cartoon and no outline
        // around it, so the chain is drawn exactly as it was.
        expect(
          plugin.managers.structure.focus.setFromLoci
        ).not.toHaveBeenCalled();
        expect(plugin.stubFocusShells).toHaveLength(0);
      });

      it("frames a whole chain without cropping the chains around it", async () => {
        const { camera } = plugin.canvas3d;
        render(selecting({ chains: ["B"] }));

        await waitFor(() => expect(camera.setState).toHaveBeenCalled());

        // The depth clip is left open to the whole scene rather than pulled in
        // around the chain: the chains being dimmed have to stay on screen.
        const { calls } = camera.setState.mock;
        const state = calls[calls.length - 1]?.[0] as { radius: number };
        expect(state.radius).toBe(camera.state.radiusMax);
      });

      it("drops a residue's focus when a whole chain is selected next", async () => {
        const { rerender } = render(selecting({ residues: [150] }));
        await waitFor(() =>
          expect(plugin.managers.structure.focus.setFromLoci).toHaveBeenCalled()
        );

        plugin.managers.structure.focus.clear.mockClear();
        rerender(selecting({ chains: ["B"] }));

        await waitFor(() =>
          expect(plugin.managers.structure.focus.clear).toHaveBeenCalled()
        );
      });
    });

    /**
     * Mol*'s focus representation draws ball-and-stick from whatever is
     * focused, and it builds that in a part of the state tree the chain
     * component's own visibility does not reach - so hiding the chain a
     * selected residue sits on took its cartoon away and left atoms behind.
     */
    describe("hiding the chain a selected residue sits on", () => {
      /** The viewer with residues selected and a given set of chains hidden. */
      const hiding = (hidden: string[], residues = [150]) => (
        <ThemeProvider theme={defaultTheme}>
          <ProteinStructureViewer
            hiddenChains={hidden}
            structure={BARNASE_BARSTAR_PDB}
            selection={{ residues }}
          />
        </ThemeProvider>
      );

      const focus = () => plugin.managers.structure.focus;

      it("drops the focus so nothing of the residue is drawn", async () => {
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
        const { rerender } = render(hiding([], [5, 150]));
        await waitFor(() => expect(focus().setFromLoci).toHaveBeenCalled());

        const before = focus().setFromLoci.mock.calls.length;
        rerender(hiding(["B"], [5, 150]));

        // Residue 5 is on chain A, which is still shown, so the focus moves to
        // it rather than going.
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
        expect(plugin.canvas3d.camera.setState).toHaveBeenCalled()
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

  /**
   * What is drawn and how it is colored, changed in place: a new
   * representation, highlights or coloring replaces only what it has to and
   * leaves the camera where the user left it.
   */
  describe("scene props", () => {
    let complex: Structure;

    beforeAll(async () => {
      complex = await structureFromPdb(BARNASE_BARSTAR_PDB);
    });

    const scene = (props: Partial<ProteinStructureViewerProps> = {}) => (
      <ThemeProvider theme={defaultTheme}>
        <ProteinStructureViewer structure={BARNASE_BARSTAR_PDB} {...props} />
      </ThemeProvider>
    );

    const useComplex = (options?: { failSurface?: boolean }) => {
      plugin = createStubPlugin(complex, options);
      createPluginUI.mockResolvedValue(plugin);
    };

    /** The load has framed the camera, which is the last thing it does. */
    const framed = () =>
      waitFor(() =>
        expect(plugin.canvas3d.requestCameraReset).toHaveBeenCalled()
      );

    describe("representation", () => {
      beforeEach(() => useComplex());

      it("draws one surface over the chains in place of their cartoons", async () => {
        render(scene({ representation: SURFACE }));

        await waitFor(() => expect(plugin.stubComponents).toContain(SURFACE));
        expect(plugin.stubComponents).not.toContain(POLYMER_A);
        expect([...plugin.stubRepresentations.values()]).toContain(
          MOLECULAR_SURFACE
        );
      });

      it("swaps cartoon for surface without refitting the camera", async () => {
        const { rerender } = render(scene());
        await framed();
        const fits = plugin.canvas3d.requestCameraReset.mock.calls.length;

        rerender(scene({ representation: SURFACE }));

        await waitFor(() => expect(plugin.stubComponents).toContain(SURFACE));
        // The cartoons go once the surface exists, so the scene never empties.
        await waitFor(() =>
          expect(plugin.stubDeleted).toEqual([
            componentRef(POLYMER_A),
            componentRef("polymer-B"),
          ])
        );
        expect(plugin.canvas3d.requestCameraReset).toHaveBeenCalledTimes(fits);
      });

      /**
       * Mol* updates the component filed under a key rather than adding a
       * second, so the surface is rebuilt in place: same component, same
       * representation, over a new selection. Replacing it and deleting the
       * old one would delete the new surface along with it.
       */
      it("rebuilds the surface in place over what is left when a chain is hidden", async () => {
        const { rerender } = render(
          scene({ hiddenChains: [], representation: SURFACE })
        );
        await waitFor(() => expect(plugin.stubComponents).toContain(SURFACE));

        rerender(scene({ hiddenChains: ["B"], representation: SURFACE }));

        const surfaceBuilds = () =>
          plugin.builders.structure.tryCreateComponentFromExpression.mock.calls.filter(
            ([, , key]) => key === SURFACE
          );
        await waitFor(() => expect(surfaceBuilds()).toHaveLength(2));

        // Over barnase alone now.
        const expression = surfaceBuilds()[1]?.[1] as Expression;
        const selected = compile<StructureSelection>(expression)(
          new QueryContext(complex)
        );
        expect(
          chainsFromStructure(StructureSelection.unionStructure(selected)).map(
            (chain) => chain.chainId
          )
        ).toEqual(["A"]);

        // Drawn once, and not deleted along the way.
        expect(
          plugin.builders.structure.representation.addRepresentation.mock.calls.filter(
            ([, props]) => props.type === MOLECULAR_SURFACE
          )
        ).toHaveLength(1);
        expect(plugin.stubDeleted).not.toContain(componentRef(SURFACE));
      });

      it("keeps the cartoon, and says so, when the surface cannot be drawn", async () => {
        useComplex({ failSurface: true });
        const onError = vi.fn();

        render(scene({ onError, representation: SURFACE }));

        await waitFor(() =>
          expect(onError).toHaveBeenCalledWith(
            expect.any(Error),
            "representation"
          )
        );
        await waitFor(() => expect(plugin.stubComponents).toContain(POLYMER_A));
      });
    });

    describe("highlights", () => {
      beforeEach(() => useComplex());

      /**
       * Barnase's Lys27 and barstar's Asp39, by the address the file gives.
       * The co-fold numbers barstar on from barnase, so Asp39 is B 149.
       */
      const HIGHLIGHTS = [
        { chainId: "A", seqId: 27 },
        { chainId: "B", color: "#123456", seqId: 149 },
      ];

      it("draws highlighted residues in ball-and-stick on their chains", async () => {
        render(scene({ highlights: HIGHLIGHTS }));

        await waitFor(() =>
          expect(plugin.stubComponents).toEqual(
            expect.arrayContaining([HIGHLIGHT_A, HIGHLIGHT_B])
          )
        );
        expect(plugin.stubRepresentations.get(componentRef(HIGHLIGHT_A))).toBe(
          "ball-and-stick"
        );
        // Painted by the structure-wide theme, which carries their colors.
        expect(plugin.stubBuiltColors.get(componentRef(HIGHLIGHT_A))).toBe(
          CHAIN_THEME
        );
      });

      it("skips a highlight naming a residue the structure lacks", async () => {
        // Barstar's own numbering, which this co-fold does not use.
        render(scene({ highlights: [{ chainId: "B", seqId: 39 }] }));
        await framed();

        expect(plugin.stubComponents).not.toContain(HIGHLIGHT_B);
      });

      it("redraws the highlights, and recolors, when they change", async () => {
        const { rerender } = render(scene({ highlights: [HIGHLIGHTS[0]!] }));
        await waitFor(() =>
          expect(plugin.stubComponents).toContain(HIGHLIGHT_A)
        );
        const recolors = plugin.loadedThemes.length;

        rerender(scene({ highlights: HIGHLIGHTS }));

        await waitFor(() =>
          expect(plugin.stubComponents).toContain(HIGHLIGHT_B)
        );
        await waitFor(() =>
          expect(plugin.loadedThemes.length).toBeGreaterThan(recolors)
        );
        // Chain A's is updated in place rather than replaced.
        expect(plugin.stubDeleted).not.toContain(componentRef(HIGHLIGHT_A));
      });

      it("removes a chain's sticks once it has no highlights left", async () => {
        const { rerender } = render(scene({ highlights: HIGHLIGHTS }));
        await waitFor(() =>
          expect(plugin.stubComponents).toContain(HIGHLIGHT_B)
        );

        rerender(scene({ highlights: [HIGHLIGHTS[0]!] }));

        await waitFor(() =>
          expect(plugin.stubDeleted).toEqual([componentRef(HIGHLIGHT_B)])
        );
      });

      it("leaves the sticks off a surface, which carries the colors itself", async () => {
        render(scene({ highlights: HIGHLIGHTS, representation: SURFACE }));
        await waitFor(() => expect(plugin.stubComponents).toContain(SURFACE));

        expect(plugin.stubComponents).not.toContain(HIGHLIGHT_A);
      });

      it("hides a chain's highlights along with it", async () => {
        render(scene({ hiddenChains: ["B"], highlights: HIGHLIGHTS }));

        await waitFor(() =>
          expect(plugin.stubVisibility.get(componentRef(HIGHLIGHT_B))).toBe(
            true
          )
        );
        expect(plugin.stubVisibility.get(componentRef(HIGHLIGHT_A))).toBe(
          false
        );
      });
    });

    describe("colorBy", () => {
      beforeEach(() => useComplex());

      const SCORES = Array.from({ length: 199 }, () => 0.9);

      it("paints what it names, whatever else is supplied", async () => {
        render(scene({ colorBy: "chain", plddt: SCORES }));

        await waitFor(() => expect(plugin.loadedThemes).toContain(CHAIN_THEME));
        expect(plugin.loadedThemes).not.toContain(PLDDT_THEME);
        // The legend describes chain colors, which have no key.
        expect(screen.queryByText("pLDDT")).not.toBeInTheDocument();
      });

      it("switches between themes in place", async () => {
        const { rerender } = render(scene({ colorBy: "chain", plddt: SCORES }));
        await waitFor(() => expect(plugin.loadedThemes).toContain(CHAIN_THEME));

        rerender(scene({ colorBy: "plddt", plddt: SCORES }));

        await waitFor(() => expect(plugin.loadedThemes).toContain(PLDDT_THEME));
        expect(screen.getByText("pLDDT")).toBeInTheDocument();
        expect(plugin.parsedPdb).toHaveLength(1);
      });

      it("leaves a consumer's own representations uncolored", async () => {
        render(scene());
        await framed();

        const { calls } =
          plugin.managers.structure.component.updateRepresentationsTheme.mock;
        const recolored = calls.flatMap(
          ([components]) => components as { key: string }[]
        );
        expect(
          recolored.every((component) =>
            component.key.startsWith("structure-component-")
          )
        ).toBe(true);
      });
    });

    describe("camera", () => {
      beforeEach(() => useComplex());

      const CAMERA = {
        fov: 0.8,
        position: [10, 20, 30] as [number, number, number],
        projection: "orthographic" as const,
        radius: 12,
        radiusMax: 40,
        target: [1, 2, 3] as [number, number, number],
        up: [0, 1, 0] as [number, number, number],
      };

      it("starts where initialCamera says instead of fitting the structure", async () => {
        render(scene({ initialCamera: CAMERA }));

        await waitFor(() =>
          expect(plugin.canvas3d.requestCameraReset).toHaveBeenCalledWith({
            durationMs: 0,
            snapshot: expect.objectContaining({
              mode: "orthographic",
              radius: 12,
            }),
          })
        );
        expect(plugin.canvas3d.setProps).toHaveBeenCalledWith({
          camera: { mode: "orthographic" },
        });
      });

      it("turns to the highlights when a structure loads with an orientation", async () => {
        render(
          scene({
            highlights: [{ chainId: "A", seqId: 27 }],
            orientation: "facing",
          })
        );

        await waitFor(() =>
          expect(plugin.canvas3d.requestCameraReset).toHaveBeenCalledWith({
            durationMs: 0,
            snapshot: expect.any(Function),
          })
        );
      });

      it("turns the camera when the orientation changes, and only then", async () => {
        const { rerender } = render(scene());
        await framed();
        plugin.canvas3d.requestCameraReset.mockClear();

        rerender(scene({ orientation: "side" }));

        await waitFor(() =>
          expect(plugin.canvas3d.requestCameraReset).toHaveBeenCalledWith({
            durationMs: 250,
            snapshot: expect.any(Function),
          })
        );

        plugin.canvas3d.requestCameraReset.mockClear();
        rerender(
          scene({
            highlights: [{ chainId: "A", seqId: 27 }],
            orientation: "side",
          })
        );
        await act(async () => undefined);
        expect(plugin.canvas3d.requestCameraReset).not.toHaveBeenCalled();
      });

      it("sets the projection", async () => {
        const { rerender } = render(scene());
        await framed();

        rerender(scene({ projection: "orthographic" }));

        await waitFor(() =>
          expect(plugin.canvas3d.setProps).toHaveBeenCalledWith({
            camera: { mode: "orthographic" },
          })
        );
      });

      it("reports the camera once it comes to rest", async () => {
        const onCameraChange = vi.fn();
        render(scene({ onCameraChange }));
        await waitFor(() =>
          expect(plugin.canvas3d.didDraw.subscribe).toHaveBeenCalledTimes(2)
        );

        act(() => plugin.canvas3d.didDraw.emit(undefined));

        await waitFor(() =>
          expect(onCameraChange).toHaveBeenCalledWith(
            expect.objectContaining({
              position: [0, 0, 50],
              projection: "perspective",
              viewport: { height: 400, width: 600 },
            })
          )
        );

        // A redraw that leaves the camera where it was is not reported again.
        act(() => plugin.canvas3d.didDraw.emit(undefined));
        await new Promise((resolve) => setTimeout(resolve, 200));
        expect(onCameraChange).toHaveBeenCalledTimes(1);
      });
    });

    describe("loads and addresses", () => {
      beforeEach(() => useComplex());

      it("reports every load, reloads with the same chains included", async () => {
        const onChainsChange = vi.fn();
        const onStructureLoad = vi.fn();
        const { rerender } = render(scene({ onChainsChange, onStructureLoad }));

        await waitFor(() =>
          expect(onStructureLoad).toHaveBeenCalledWith({
            atomCount: complex.elementCount,
            chains: expect.arrayContaining([
              expect.objectContaining({ chainId: "A" }),
            ]),
            residueCount: 199,
          })
        );
        await waitFor(() =>
          expect(onChainsChange).toHaveBeenLastCalledWith(
            expect.arrayContaining([expect.objectContaining({ chainId: "B" })])
          )
        );
        const chainReports = onChainsChange.mock.calls.length;

        rerender(
          <ThemeProvider theme={defaultTheme}>
            <ProteinStructureViewer
              onChainsChange={onChainsChange}
              onStructureLoad={onStructureLoad}
              structure={`${BARNASE_BARSTAR_PDB}\n`}
            />
          </ThemeProvider>
        );

        await waitFor(() => expect(onStructureLoad).toHaveBeenCalledTimes(2));
        expect(onChainsChange).toHaveBeenCalledTimes(chainReports);
      });

      it("selects a residue by the address the file gives it", async () => {
        render(
          scene({
            selection: { addresses: [{ chainId: "B", seqId: 149 }] },
          })
        );

        await waitFor(() =>
          expect(plugin.managers.structure.focus.setFromLoci).toHaveBeenCalled()
        );
        // Barstar's Asp39, named in the readout as the file numbers it.
        await waitFor(() => expect(readoutSlot()).toBe("ASP 149"));
      });
    });
  });

  /**
   * The plugin is handed to a consumer that draws on it or drives it, and a
   * failure is reported to the consumer rather than logged where nobody sees
   * it. What matters is the order: a scene built in `onReady` has to be in
   * place before the viewer answers a click or applies a color, and nothing
   * may reach a consumer about a plugin that is already gone.
   */
  describe("plugin lifecycle", () => {
    const interactive = () =>
      waitFor(() =>
        expect(plugin.behaviors.interaction.click.subscribe).toHaveBeenCalled()
      );

    const view = (
      props: Partial<ProteinStructureViewerProps> = {},
      structure = PDB
    ) => (
      <ThemeProvider theme={defaultTheme}>
        <ProteinStructureViewer structure={structure} {...props} />
      </ThemeProvider>
    );

    it("hands the plugin and the parsed structure to onReady", async () => {
      const onReady = vi.fn();
      renderViewer({ onReady });

      await waitFor(() => expect(onReady).toHaveBeenCalledTimes(1));
      expect(onReady).toHaveBeenCalledWith(
        plugin,
        expect.objectContaining({
          atomCount: crambin.elementCount,
          chains: [expect.objectContaining({ chainId: "A" })],
          structure: expect.objectContaining({ ref: "structure" }),
        })
      );
    });

    it("draws its own scene first, and waits for onReady before answering clicks", async () => {
      const ready = deferred();
      const onReady = vi.fn(() => ready.promise);
      renderViewer({ onReady });

      await waitFor(() => expect(onReady).toHaveBeenCalled());
      // The viewer's scene is in place, colored, when the consumer gets it.
      expect(plugin.stubComponents).toContain(POLYMER_A);
      expect(plugin.loadedThemes).toContain(CHAIN_THEME);
      expect(
        plugin.behaviors.interaction.click.subscribe
      ).not.toHaveBeenCalled();

      await act(async () => ready.resolve());

      await interactive();
    });

    it("hands over each structure that replaces the first", async () => {
      const onReady = vi.fn();
      const { rerender } = render(view({ onReady }));
      await waitFor(() => expect(onReady).toHaveBeenCalledTimes(1));

      rerender(view({ onReady }, OTHER_PDB));

      await waitFor(() => expect(onReady).toHaveBeenCalledTimes(2));
    });

    it("hands over nothing for a plugin disposed of while it was built", async () => {
      const onDispose = vi.fn();
      const onReady = vi.fn();
      const release = holdPlugin();

      const { unmount } = render(view({ onDispose, onReady }));
      await waitFor(() => expect(createPluginUI).toHaveBeenCalledTimes(1));
      unmount();
      release(plugin);

      await waitFor(() => expect(plugin.dispose).toHaveBeenCalled());
      expect(onReady).not.toHaveBeenCalled();
      expect(onDispose).not.toHaveBeenCalled();
    });

    it("hands over nothing for a structure that finished loading after unmount", async () => {
      const parse = deferred<string>();
      plugin.builders.structure.parseTrajectory.mockImplementationOnce(
        () => parse.promise
      );
      const onReady = vi.fn();

      const { unmount } = render(view({ onReady }));
      await waitFor(() =>
        expect(plugin.builders.structure.parseTrajectory).toHaveBeenCalled()
      );
      unmount();
      parse.resolve(PDB);

      // The parse runs on to the end, and nothing is drawn on or handed over
      // for the plugin it finished on.
      await waitFor(() =>
        expect(plugin.builders.structure.createStructure).toHaveBeenCalled()
      );
      await act(async () => undefined);
      expect(onReady).not.toHaveBeenCalled();
      expect(plugin.stubComponents).toEqual([]);
    });

    it("reports a plugin that could not be created as an init failure", async () => {
      const failure = new Error("WebGL is not available");
      createPluginUI.mockRejectedValue(failure);
      const onError = vi.fn();

      renderViewer({ onError });

      await waitFor(() =>
        expect(onError).toHaveBeenCalledWith(failure, "init")
      );
    });

    it("reports a structure that failed to load, and hands nothing over", async () => {
      const failure = new Error("Unparseable structure");
      plugin.builders.structure.parseTrajectory.mockRejectedValueOnce(failure);
      const onError = vi.fn();
      const onReady = vi.fn();

      renderViewer({ onError, onReady });

      await waitFor(() =>
        expect(onError).toHaveBeenCalledWith(failure, "load")
      );
      expect(onReady).not.toHaveBeenCalled();
      // Still interactive, holding nothing, as a structure with no chains is.
      await interactive();
    });

    it("reports an onReady that rejects as a load failure", async () => {
      const failure = new Error("The consumer's scene could not be built");
      const onError = vi.fn();

      renderViewer({
        onError,
        onReady: async () => {
          throw failure;
        },
      });

      await waitFor(() =>
        expect(onError).toHaveBeenCalledWith(failure, "load")
      );
    });

    it("logs a failure to the console when nobody is listening for it", async () => {
      const failure = new Error("Unparseable structure");
      plugin.builders.structure.parseTrajectory.mockRejectedValueOnce(failure);
      const log = vi
        .spyOn(console, "error")
        .mockImplementation(() => undefined);

      renderViewer();

      await waitFor(() =>
        expect(log).toHaveBeenCalledWith("Failed to load structure:", failure)
      );
    });

    it("calls onDispose before disposing of a plugin it handed over", async () => {
      const onDispose = vi.fn();
      const { unmount } = render(view({ onDispose, onReady: vi.fn() }));
      await interactive();

      unmount();

      expect(onDispose).toHaveBeenCalledTimes(1);
      expect(onDispose.mock.invocationCallOrder[0]).toBeLessThan(
        plugin.dispose.mock.invocationCallOrder[0] as number
      );
    });

    it("calls onDispose for a plugin whose onReady is still running", async () => {
      const onDispose = vi.fn();
      const onReady = vi.fn(() => deferred().promise);
      const { unmount } = render(view({ onDispose, onReady }));
      await waitFor(() => expect(onReady).toHaveBeenCalled());

      unmount();

      expect(onDispose).toHaveBeenCalledTimes(1);
      expect(plugin.dispose).toHaveBeenCalled();
    });

    it("says nothing of an onReady that fails after its plugin is gone", async () => {
      const ready = deferred();
      const onError = vi.fn();
      const onReady = vi.fn(() => ready.promise);
      const { unmount } = render(view({ onError, onReady }));
      await waitFor(() => expect(onReady).toHaveBeenCalled());

      unmount();
      await act(async () => ready.reject(new Error("Too late")));

      expect(onError).not.toHaveBeenCalled();
    });
  });

  /**
   * A consumer drawing its own scene gets the parsed structure and an empty
   * canvas, and the viewer keeps everything that is not drawing: the sequence
   * panel, selection, hover, the legend and the camera controls.
   */
  describe("external scene mode", () => {
    let complex: Structure;

    beforeAll(async () => {
      complex = await structureFromPdb(BARNASE_BARSTAR_PDB);
    });

    beforeEach(() => {
      plugin = createStubPlugin(complex);
      createPluginUI.mockResolvedValue(plugin);
    });

    const external = (props: Partial<ProteinStructureViewerProps> = {}) =>
      renderViewer({
        sceneMode: "external",
        structure: BARNASE_BARSTAR_PDB,
        ...props,
      });

    /** Ready, and the legend drawn from the chains the load found. */
    const settled = async () => {
      await screen.findByRole("button", { name: "Chain B" });
      await act(async () => undefined);
    };

    it("parses the structure without drawing, coloring or framing it", async () => {
      external();
      await settled();

      expect(plugin.builders.structure.parseTrajectory).toHaveBeenCalled();
      expect(
        plugin.builders.structure.tryCreateComponentFromExpression
      ).not.toHaveBeenCalled();
      expect(
        plugin.builders.structure.representation.addRepresentation
      ).not.toHaveBeenCalled();
      expect(
        plugin.managers.structure.component.updateRepresentationsTheme
      ).not.toHaveBeenCalled();
      expect(plugin.canvas3d.requestCameraReset).not.toHaveBeenCalled();
    });

    it("hands the parsed structure over to be drawn on", async () => {
      const onReady = vi.fn();
      external({ onReady });

      await waitFor(() =>
        expect(onReady).toHaveBeenCalledWith(
          plugin,
          expect.objectContaining({
            atomCount: complex.elementCount,
            structure: expect.objectContaining({ ref: "structure" }),
          })
        )
      );
    });

    it("keeps the chain legend, whose toggles report without hiding", async () => {
      const onChainVisibilityChange = vi.fn();
      external({ onChainVisibilityChange });

      const toggle = await screen.findByRole("button", { name: HIDE_BARSTAR });
      act(() => toggle.click());

      await waitFor(() =>
        expect(onChainVisibilityChange).toHaveBeenCalledWith(["B"])
      );
      expect(plugin.stubVisibility.size).toBe(0);
    });

    it("keeps the mode the plugin was created with", async () => {
      const mounted = (sceneMode: SceneMode) => (
        <ThemeProvider theme={defaultTheme}>
          <ProteinStructureViewer
            sceneMode={sceneMode}
            structure={BARNASE_BARSTAR_PDB}
          />
        </ThemeProvider>
      );

      const { rerender } = render(mounted("external"));
      await settled();
      rerender(mounted("managed"));
      await act(async () => undefined);

      expect(createPluginUI).toHaveBeenCalledTimes(1);
      expect(
        plugin.managers.structure.component.updateRepresentationsTheme
      ).not.toHaveBeenCalled();
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

import {
  QueryContext,
  Structure,
  StructureSelection,
} from "molstar/lib/mol-model/structure";
import type { Expression } from "molstar/lib/mol-script/language/expression";
import { compile } from "molstar/lib/mol-script/runtime/query/compiler";
import { Color } from "molstar/lib/mol-util/color";
import { BehaviorSubject } from "rxjs";

/**
 * A stand-in for the Mol* plugin, shared by the tests that drive the viewer
 * and the scene. jsdom has no WebGL, so the plugin is stubbed - but parsing
 * and querying are real, run against the structure it is handed, so which
 * components the scene builds is decided by the actual expressions.
 *
 * Like Mol*, it files components by key: building one again under the same
 * key hands back the same ref, which is what the scene relies on to update a
 * component in place.
 */

/** The stub plugin, as the tests hold it. */
export type StubPlugin = ReturnType<typeof createStubPlugin>;

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
export const EMPTY_CLICK = { current: { loci: { kind: "empty-loci" } } };

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
export const POLYMER_PART = "polymer";
export const LIGAND_PART = "ligand";
export const POLYMER_A = `${POLYMER_PART}-A`;
export const LIGAND_A = `${LIGAND_PART}-A`;
export const HIGHLIGHT_A = "highlight-A";
export const HIGHLIGHT_B = "highlight-B";
export const componentRef = (key: string) => `component-${key}`;

/**
 * The surface: the `representation` that asks for it, and the key its one
 * component is built under. Mol* names the representation itself
 * `molecular-surface`.
 */
export const SURFACE = "surface" as const;
export const MOLECULAR_SURFACE = "molecular-surface";

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
export function themeCallbackArgs(part: string) {
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
export function createStubPlugin(
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

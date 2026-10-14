import { defaultTheme } from "@czi-sds/components";
import { ThemeProvider } from "@mui/material/styles";
import { render, waitFor } from "@testing-library/react";
import type { StructureElement } from "molstar/lib/mol-model/structure";
import { Structure } from "molstar/lib/mol-model/structure";
import type { PluginContext } from "molstar/lib/mol-plugin/context";
import type { Color } from "molstar/lib/mol-util/color";
import ProteinStructureViewer from "..";
import {
  BARNASE_BARSTAR_PDB,
  BARNASE_BARSTAR_PLDDT,
} from "../__storybook__/barnaseBarstar";
import type { StructureSceneOptions } from "../ProteinStructureViewer.types";
import { applyStructureScene } from "../scene";
import { eachResidue, structureFromPdb } from "./molstarStructure";
import { StubPlugin, createStubPlugin } from "./stubPlugin";

/**
 * The viewer and `applyStructureScene` draw one scene, by the same code, and
 * this is what holds them to it: the same options given to each have to build
 * the same components, draw them the same way and paint every residue the
 * same color. An image rendered without the viewer is only worth having if it
 * matches the viewer.
 */

const createPluginUI = vi.hoisted(() => vi.fn());

vi.mock("molstar/lib/mol-plugin-ui", () => ({ createPluginUI }));
vi.mock("molstar/lib/mol-plugin-state/helpers/structure-transparency", () => ({
  clearStructureTransparency: vi.fn(async () => undefined),
  setStructureTransparency: vi.fn(async () => undefined),
}));

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

const INTERFACE = [
  { chainId: "A", seqId: 27 },
  { chainId: "B", color: "#123456", seqId: 149 },
];

const SCORES: (number | null)[] = BARNASE_BARSTAR_PLDDT.map((score, i) =>
  i % 7 === 0 ? null : score
);

type SceneCase = Omit<StructureSceneOptions, "structure">;

const CASES: [string, SceneCase][] = [
  [
    "a cartoon with highlights over chain colors",
    { chainColors: { A: "#FADC24" }, highlights: INTERFACE },
  ],
  [
    "a surface over the one chain left visible",
    { hiddenChains: ["B"], representation: "surface" },
  ],
  [
    "pLDDT with gaps, whatever else is supplied",
    { chainColors: { B: "#000000" }, colorBy: "plddt", plddt: SCORES },
  ],
];

type ColorFn = (location: StructureElement.Location) => Color;

/** What a plugin was asked to build, and the color each residue came out. */
function drawn(plugin: StubPlugin, structure: Structure) {
  const theme = plugin.loadedThemes[0];
  const provider =
    plugin.representation.structure.themes.colorThemeRegistry.add.mock.calls
      .map(
        ([registered]) =>
          registered as { factory(): { color: ColorFn }; name: string }
      )
      .find(({ name }) => name === theme);

  return {
    builtColors: [...plugin.stubBuiltColors],
    colors: provider && eachResidue(structure, provider.factory().color),
    components: plugin.stubComponents,
    representations: [...plugin.stubRepresentations],
    theme,
    visibility: [...plugin.stubVisibility],
  };
}

describe("the viewer and applyStructureScene", () => {
  let complex: Structure;

  beforeAll(async () => {
    complex = await structureFromPdb(BARNASE_BARSTAR_PDB);
  });

  beforeEach(() => giveElementsSize());

  afterEach(() => {
    vi.restoreAllMocks();
    createPluginUI.mockReset();
  });

  it.each(CASES)("draw %s alike", async (_, options) => {
    const viewerPlugin = createStubPlugin(complex);
    createPluginUI.mockResolvedValue(viewerPlugin);

    render(
      <ThemeProvider theme={defaultTheme}>
        <ProteinStructureViewer {...options} structure={BARNASE_BARSTAR_PDB} />
      </ThemeProvider>
    );
    await waitFor(() =>
      expect(
        viewerPlugin.behaviors.interaction.click.subscribe
      ).toHaveBeenCalled()
    );

    const scenePlugin = createStubPlugin(complex);
    await applyStructureScene(scenePlugin as unknown as PluginContext, {
      ...options,
      structure: BARNASE_BARSTAR_PDB,
    });

    const viewer = drawn(viewerPlugin, complex);
    expect(viewer.colors?.size).toBe(199);
    expect(drawn(scenePlugin, complex)).toEqual(viewer);
  });
});

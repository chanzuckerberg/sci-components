import { Structure } from "molstar/lib/mol-model/structure";
import type { PluginContext } from "molstar/lib/mol-plugin/context";
import { BARNASE_BARSTAR_PDB } from "../__storybook__/barnaseBarstar";
import type { StructureSceneOptions } from "../ProteinStructureViewer.types";
import { applyStructureScene } from "../scene";
import { structureFromPdb } from "./molstarStructure";
import {
  POLYMER_A,
  SURFACE,
  StubPlugin,
  componentRef,
  createStubPlugin,
} from "./stubPlugin";

/**
 * The scene on a plugin of the caller's, with no viewer: the same drawing the
 * viewer does, driven by options rather than props.
 */
describe("applyStructureScene", () => {
  let complex: Structure;
  let plugin: StubPlugin;

  beforeAll(async () => {
    complex = await structureFromPdb(BARNASE_BARSTAR_PDB);
  });

  beforeEach(() => {
    plugin = createStubPlugin(complex);
  });

  const apply = (options: Partial<StructureSceneOptions> = {}) =>
    applyStructureScene(plugin as unknown as PluginContext, {
      structure: BARNASE_BARSTAR_PDB,
      ...options,
    });

  it("loads the structure, draws it and fits the camera to it", async () => {
    const scene = await apply();

    expect(plugin.parsedPdb).toEqual([BARNASE_BARSTAR_PDB]);
    expect(plugin.stubComponents).toEqual([POLYMER_A, "polymer-B"]);
    expect(plugin.canvas3d.requestCameraReset).toHaveBeenCalledWith();
    expect(scene.info).toEqual({
      atomCount: complex.elementCount,
      chains: [
        expect.objectContaining({ chainId: "A" }),
        expect.objectContaining({ chainId: "B" }),
      ],
      residueCount: 199,
    });
  });

  it("draws what the options ask for", async () => {
    await apply({ hiddenChains: ["B"], representation: "surface" });

    expect(plugin.stubComponents).toEqual([SURFACE]);
  });

  it("applies new options in place, leaving the camera where it is", async () => {
    const scene = await apply();
    const fits = plugin.canvas3d.requestCameraReset.mock.calls.length;

    await scene.update({ representation: "surface" });

    expect(plugin.stubComponents).toContain(SURFACE);
    expect(plugin.stubDeleted).toEqual([
      componentRef(POLYMER_A),
      componentRef("polymer-B"),
    ]);
    expect(plugin.canvas3d.requestCameraReset).toHaveBeenCalledTimes(fits);
  });

  it("loads a new structure and places the camera on it", async () => {
    const scene = await apply();
    const reloaded = `${BARNASE_BARSTAR_PDB}\n`;

    await scene.update({ structure: reloaded });

    expect(plugin.parsedPdb).toEqual([BARNASE_BARSTAR_PDB, reloaded]);
    expect(plugin.canvas3d.requestCameraReset).toHaveBeenCalledTimes(2);
  });

  it("turns the camera when the orientation changes", async () => {
    const scene = await apply();
    plugin.canvas3d.requestCameraReset.mockClear();

    await scene.update({ orientation: "side" });

    expect(plugin.canvas3d.requestCameraReset).toHaveBeenCalledWith({
      durationMs: 250,
      snapshot: expect.any(Function),
    });
  });

  it("sets the projection", async () => {
    const scene = await apply();

    await scene.update({ projection: "orthographic" });

    expect(plugin.canvas3d.setProps).toHaveBeenCalledWith({
      camera: { mode: "orthographic" },
    });
  });

  it("reads the camera back in the form initialCamera takes", async () => {
    const scene = await apply();

    expect(scene.getCamera()).toEqual(
      expect.objectContaining({
        position: [0, 0, 50],
        projection: "perspective",
        target: [0, 0, 0],
      })
    );
  });

  it("rejects a structure that fails to load", async () => {
    plugin.builders.structure.parseTrajectory.mockRejectedValueOnce(
      new Error("Unparseable structure")
    );

    await expect(apply()).rejects.toThrow("Unparseable structure");
  });

  it("reports a representation it cannot draw, and draws the cartoon", async () => {
    plugin = createStubPlugin(complex, { failSurface: true });
    const onError = vi.fn();

    await apply({ onError, representation: "surface" });

    expect(onError).toHaveBeenCalledWith(expect.any(Error), "representation");
    expect(plugin.stubComponents).toContain(POLYMER_A);
  });

  it("stops touching the plugin once disposed of", async () => {
    const scene = await apply();

    scene.dispose();
    await scene.update({ representation: "surface" });

    expect(plugin.stubComponents).not.toContain(SURFACE);
  });

  it("registers its themes once per plugin, however often it is applied", async () => {
    await apply();
    await apply({ colorBy: "chain" });

    expect(
      plugin.representation.structure.themes.colorThemeRegistry.add
    ).toHaveBeenCalledTimes(3);
  });
});

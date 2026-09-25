import { Structure } from "molstar/lib/mol-model/structure";
import { Color } from "molstar/lib/mol-util/color";
import { BehaviorSubject } from "rxjs";
import { CRAMBIN_PDB } from "../__storybook__/constants";
import { renderStructureImage } from "../scene";
import { structureFromPdb } from "./molstarStructure";
import { POLYMER_A, createStubPlugin } from "./stubPlugin";

/**
 * jsdom has no WebGL, so the plugin the render creates is stood in for. What
 * is checked is the wiring around it: the offscreen canvas, the scene drawn on
 * it with the camera at rest, an image of exactly the size asked for, and the
 * plugin and canvas gone afterwards whatever happened. Rendering fidelity is
 * checked in Storybook, beside the viewer.
 */

const created = vi.hoisted(() => ({ plugin: null as unknown }));

vi.mock("molstar/lib/mol-plugin/context", () => ({
  PluginContext: vi.fn(function PluginContext() {
    return created.plugin;
  }),
}));

/** The eight bytes every PNG opens with, as the helper's data URI carries them. */
const PNG_DATA_URI = "data:image/png;base64,iVBORw0KGgo=";

/** A stub plugin, with what a headless plugin adds once its viewer is up. */
function headlessPlugin(
  structure: Structure,
  options: { webgl?: boolean } = {}
) {
  const plugin = createStubPlugin(structure);
  const values = new BehaviorSubject<Record<string, unknown>>({
    format: { name: "jpeg", params: {} },
    resolution: { name: "viewport", params: {} },
    transparent: false,
  });
  const cropParams = new BehaviorSubject({ auto: true, relativePadding: 0.1 });
  const mounted: {
    canvas: HTMLCanvasElement;
    container: HTMLElement;
    inDocument: boolean;
  }[] = [];
  const webgl = options.webgl ?? true;

  // Like Mol*'s, settled by initializing the viewer - and rejected, as well as
  // initViewerAsync returning false, when there is no WebGL.
  let resolveInit: (() => void) | undefined;
  let rejectInit: ((error: Error) => void) | undefined;
  const canvas3dInitialized = new Promise<void>((resolve, reject) => {
    resolveInit = resolve;
    rejectInit = reject;
  });

  const headless = Object.assign(plugin, {
    canvas3d: { ...plugin.canvas3d, commit: vi.fn() },
    canvas3dInitialized,
    dispose: vi.fn(),
    helpers: {
      viewportScreenshot: {
        behaviors: { cropParams, values },
        getImageDataUri: vi.fn(async () => PNG_DATA_URI),
        resetCrop: vi.fn(),
      },
    },
    init: vi.fn(async () => undefined),
    initViewerAsync: vi.fn(
      async (canvas: HTMLCanvasElement, container: HTMLElement) => {
        mounted.push({
          canvas,
          container,
          inDocument: document.body.contains(container),
        });
        if (webgl) resolveInit?.();
        else
          rejectInit?.(new Error("Could not create a WebGL rendering context"));
        return webgl;
      }
    ),
    mounted,
  });
  created.plugin = headless;

  return headless;
}

/** Elements the render left behind in the document. */
const leftovers = () => document.body.querySelectorAll("[aria-hidden='true']");

describe("renderStructureImage", () => {
  let crambin: Structure;

  beforeAll(async () => {
    crambin = await structureFromPdb(CRAMBIN_PDB);
  });

  it("renders the scene offscreen, at exactly the size asked for", async () => {
    const plugin = headlessPlugin(crambin);

    const image = await renderStructureImage({
      height: 240,
      highlights: [{ chainId: "A", seqId: 13 }],
      structure: CRAMBIN_PDB,
      width: 320,
    });

    expect(image.type).toBe("image/png");
    expect(image.size).toBe(8);

    // A canvas of its own, sized to the image and on the page while it renders.
    const mount = plugin.mounted[0];
    expect(mount?.inDocument).toBe(true);
    expect(mount?.container.contains(mount.canvas)).toBe(true);
    expect(mount?.container.style.width).toBe("320px");
    expect(mount?.container.style.height).toBe("240px");

    // The scene the viewer would draw, with the camera fitted at once.
    expect(plugin.stubComponents).toEqual(
      expect.arrayContaining([POLYMER_A, "highlight-A"])
    );
    expect(plugin.canvas3d.requestCameraReset).toHaveBeenCalledWith({
      durationMs: 0,
    });
    expect(plugin.canvas3d.commit).toHaveBeenCalledWith(true);

    const helper = plugin.helpers.viewportScreenshot;
    expect(helper.behaviors.values.value).toEqual(
      expect.objectContaining({
        format: { name: "png", params: {} },
        resolution: { name: "custom", params: { height: 240, width: 320 } },
        transparent: true,
      })
    );
    expect(helper.behaviors.cropParams.value.auto).toBe(false);
    expect(helper.resetCrop).toHaveBeenCalled();

    expect(plugin.dispose).toHaveBeenCalled();
    expect(leftovers()).toHaveLength(0);
  });

  it("paints the background asked for", async () => {
    const plugin = headlessPlugin(crambin);

    await renderStructureImage({
      backgroundColor: "#102030",
      height: 100,
      structure: CRAMBIN_PDB,
      width: 100,
    });

    expect(plugin.canvas3d.setProps).toHaveBeenCalledWith({
      renderer: { backgroundColor: Color.fromRgb(0x10, 0x20, 0x30) },
    });
    expect(
      plugin.helpers.viewportScreenshot.behaviors.values.value.transparent
    ).toBe(false);
  });

  it("rejects without WebGL, and leaves nothing behind", async () => {
    const plugin = headlessPlugin(crambin, { webgl: false });

    await expect(
      renderStructureImage({ height: 100, structure: CRAMBIN_PDB, width: 100 })
    ).rejects.toThrow("WebGL");

    expect(plugin.dispose).toHaveBeenCalled();
    expect(leftovers()).toHaveLength(0);
  });

  it("rejects a structure that fails to load, and leaves nothing behind", async () => {
    const plugin = headlessPlugin(crambin);
    plugin.builders.structure.parseTrajectory.mockRejectedValueOnce(
      new Error("Unparseable structure")
    );

    await expect(
      renderStructureImage({ height: 100, structure: "nonsense", width: 100 })
    ).rejects.toThrow("Unparseable structure");

    expect(plugin.dispose).toHaveBeenCalled();
    expect(leftovers()).toHaveLength(0);
  });

  it("refuses an image with no size before creating anything", async () => {
    created.plugin = null;

    await expect(
      renderStructureImage({ height: 100, structure: CRAMBIN_PDB, width: 0 })
    ).rejects.toThrow("width and a height");
    expect(leftovers()).toHaveLength(0);
  });
});

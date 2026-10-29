import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { BehaviorSubject } from "rxjs";
import {
  captureStructureImage,
  downloadStructureImage,
  exportStructureImage,
} from "../utils/screenshot";

/**
 * Where an image goes when a consumer renders it but nothing delivers it: the
 * same Mol* helper the stock download ends in.
 */
const saveFile = vi.hoisted(() => vi.fn());

vi.mock("molstar/lib/mol-util/download", () => ({ download: saveFile }));

/**
 * The capture button's plumbing. Mol*'s screenshot helper renders its own pass
 * and carries its own transparency and axes, so most of this is a mapping - but
 * a named background is the exception, and has to be put on the canvas and
 * taken back off again.
 */
const PAINTED = 0xabcdef;

/** The eight bytes every PNG opens with, as the helper's data URI carries them. */
const PNG_DATA_URI = "data:image/png;base64,iVBORw0KGgo=";

/** What Mol* names an image after, from the loaded structure's entry id. */
const DERIVED_FILENAME = "1CRN.png";

const CAPTURE_FAILED = "capture failed";

function stubPlugin(options: { noHelper?: boolean; failing?: boolean } = {}) {
  const values = new BehaviorSubject<Record<string, unknown>>({
    axes: { name: "on", params: {} },
    format: { name: "jpeg", params: { quality: 1 } },
    illumination: {},
    resolution: { name: "viewport", params: {} },
    transparent: false,
  });

  const download = vi.fn(async () => {
    if (options.failing) throw new Error(CAPTURE_FAILED);
  });

  const getImageDataUri = vi.fn(async () => {
    if (options.failing) throw new Error(CAPTURE_FAILED);
    return PNG_DATA_URI;
  });

  const getFilename = vi.fn((extension: string) => `1CRN${extension}`);

  /** Every backgroundColor written to the canvas, in order. */
  const backgrounds: unknown[] = [];

  const plugin = {
    canvas3d: {
      props: { renderer: { backgroundColor: PAINTED } },
      setProps: vi.fn((props: { renderer?: { backgroundColor?: unknown } }) => {
        if (props.renderer?.backgroundColor !== undefined) {
          backgrounds.push(props.renderer.backgroundColor);
        }
      }),
    },
    helpers: {
      viewportScreenshot: options.noHelper
        ? undefined
        : { behaviors: { values }, download, getFilename, getImageDataUri },
    },
  };

  return { backgrounds, download, getImageDataUri, plugin, values };
}

const asPlugin = (plugin: ReturnType<typeof stubPlugin>["plugin"]) =>
  plugin as unknown as PluginUIContext;

const run = (
  plugin: ReturnType<typeof stubPlugin>["plugin"],
  options?: Parameters<typeof downloadStructureImage>[1]
) => downloadStructureImage(plugin as unknown as PluginUIContext, options);

describe("downloadStructureImage", () => {
  it("always asks for a PNG", async () => {
    const { plugin, values } = stubPlugin();
    await run(plugin);

    expect(values.value.format).toEqual({ name: "png", params: {} });
  });

  it.each([
    ["low", "hd"],
    ["medium", "full-hd"],
    ["high", "ultra-hd"],
    ["maximum", "8k-ultra-hd"],
  ] as const)("renders %s at the %s preset", async (resolution, preset) => {
    const { plugin, values } = stubPlugin();
    await run(plugin, { resolution });

    expect(values.value.resolution).toEqual({ name: preset, params: {} });
  });

  it("defaults to medium", async () => {
    const { plugin, values } = stubPlugin();
    await run(plugin);

    expect(values.value.resolution).toEqual({
      name: "full-hd",
      params: {},
    });
  });

  it("defaults to a transparent background", async () => {
    const { backgrounds, plugin, values } = stubPlugin();
    await run(plugin);

    expect(values.value.transparent).toBe(true);
    // Transparency is the screenshot's own; the canvas is left alone.
    expect(backgrounds).toEqual([]);
  });

  it("leaves the axes out by default", async () => {
    const { plugin, values } = stubPlugin();
    await run(plugin);

    expect((values.value.axes as { name: string }).name).toBe("off");
  });

  it("draws the axes when asked", async () => {
    const { plugin, values } = stubPlugin();
    await run(plugin, { showAxes: true });

    expect((values.value.axes as { name: string }).name).toBe("on");
  });

  /**
   * The helper only chooses between transparent and whatever the renderer is
   * painting, so a named background has to go onto the canvas for the capture
   * and come off after - otherwise a figure's background outlives its figure.
   */
  it("paints a named background and restores the canvas after", async () => {
    const { backgrounds, plugin, values } = stubPlugin();
    await run(plugin, { backgroundColor: "#102030" });

    expect(values.value.transparent).toBe(false);
    expect(backgrounds).toHaveLength(2);
    expect(backgrounds[1]).toBe(PAINTED);
    expect(backgrounds[0]).not.toBe(PAINTED);
  });

  it("restores the canvas even when the capture fails", async () => {
    const { backgrounds, plugin } = stubPlugin({ failing: true });

    await expect(run(plugin, { backgroundColor: "#102030" })).rejects.toThrow(
      CAPTURE_FAILED
    );

    expect(backgrounds[backgrounds.length - 1]).toBe(PAINTED);
  });

  it("passes the filename through", async () => {
    const { download, plugin } = stubPlugin();
    await run(plugin, { filename: "barnase-barstar" });

    expect(download).toHaveBeenCalledWith("barnase-barstar");
  });

  it("does nothing when the plugin has no screenshot helper", async () => {
    const { backgrounds, plugin } = stubPlugin({ noHelper: true });

    await expect(
      run(plugin, { backgroundColor: "#102030" })
    ).resolves.toBeUndefined();
    expect(backgrounds).toEqual([]);
  });
});

/**
 * The capture button hands off to `render` and `deliver` when a consumer takes
 * them over: a sandboxed host blocks the download a click would start, and a
 * consumer may need an image the presets do not describe.
 */
describe("exportStructureImage", () => {
  beforeEach(() => saveFile.mockClear());

  it("keeps the stock download when nothing takes it over", async () => {
    const { download, getImageDataUri, plugin } = stubPlugin();

    await exportStructureImage(asPlugin(plugin), { filename: "crambin" });

    expect(download).toHaveBeenCalledWith("crambin");
    expect(getImageDataUri).not.toHaveBeenCalled();
  });

  it("delivers the viewer's own capture in place of a download", async () => {
    const { download, plugin } = stubPlugin();
    const deliver = vi.fn();

    await exportStructureImage(asPlugin(plugin), { deliver });

    expect(download).not.toHaveBeenCalled();
    expect(saveFile).not.toHaveBeenCalled();

    const [image, filename] = deliver.mock.calls[0] as [Blob, string];
    expect(image.type).toBe("image/png");
    // Decoded, not handed over as the text of the data URI.
    expect(image.size).toBe(8);
    expect(filename).toBe(DERIVED_FILENAME);
  });

  it("names a delivered image after filename, extension included", async () => {
    const { plugin } = stubPlugin();
    const deliver = vi.fn();

    await exportStructureImage(asPlugin(plugin), {
      deliver,
      filename: "crambin",
    });

    expect(deliver).toHaveBeenCalledWith(expect.any(Blob), "crambin.png");
  });

  it("captures a delivered image with the settings asked for", async () => {
    const { backgrounds, plugin, values } = stubPlugin();

    await exportStructureImage(asPlugin(plugin), {
      backgroundColor: "#102030",
      deliver: vi.fn(),
      resolution: "high",
    });

    expect(values.value.resolution).toEqual({ name: "ultra-hd", params: {} });
    expect(values.value.transparent).toBe(false);
    expect(backgrounds[backgrounds.length - 1]).toBe(PAINTED);
  });

  it("delivers what render produced in place of the viewer's capture", async () => {
    const { getImageDataUri, plugin } = stubPlugin();
    const rendered = new Blob(["bounded"], { type: "image/png" });
    const render = vi.fn(async () => rendered);
    const deliver = vi.fn();

    await exportStructureImage(asPlugin(plugin), { deliver, render });

    expect(render).toHaveBeenCalledWith(plugin);
    expect(getImageDataUri).not.toHaveBeenCalled();
    expect(deliver).toHaveBeenCalledWith(rendered, DERIVED_FILENAME);
  });

  it("downloads what render produced when nothing delivers it", async () => {
    const { download, plugin } = stubPlugin();
    const rendered = new Blob(["bounded"], { type: "image/png" });

    await exportStructureImage(asPlugin(plugin), {
      filename: "crambin",
      render: async () => rendered,
    });

    expect(download).not.toHaveBeenCalled();
    expect(saveFile).toHaveBeenCalledWith(rendered, "crambin.png");
  });

  it("restores the canvas when a delivered capture fails", async () => {
    const { backgrounds, plugin } = stubPlugin({ failing: true });
    const deliver = vi.fn();

    await expect(
      exportStructureImage(asPlugin(plugin), {
        backgroundColor: "#102030",
        deliver,
      })
    ).rejects.toThrow(CAPTURE_FAILED);

    expect(deliver).not.toHaveBeenCalled();
    expect(backgrounds[backgrounds.length - 1]).toBe(PAINTED);
  });

  it("passes on a failure to deliver", async () => {
    const { plugin } = stubPlugin();

    await expect(
      exportStructureImage(asPlugin(plugin), {
        deliver: async () => {
          throw new Error("The host declined the file");
        },
      })
    ).rejects.toThrow("The host declined the file");
  });
});

describe("captureStructureImage", () => {
  it("refuses a plugin with no screenshot helper to capture with", async () => {
    const { plugin } = stubPlugin({ noHelper: true });

    await expect(captureStructureImage(asPlugin(plugin))).rejects.toThrow(
      "no screenshot helper"
    );
  });
});

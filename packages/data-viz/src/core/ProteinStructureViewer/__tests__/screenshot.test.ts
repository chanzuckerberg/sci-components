import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { BehaviorSubject } from "rxjs";
import { downloadStructureImage } from "../utils/screenshot";

/**
 * The capture button's plumbing. Mol*'s screenshot helper renders its own pass
 * and carries its own transparency and axes, so most of this is a mapping - but
 * a named background is the exception, and has to be put on the canvas and
 * taken back off again.
 */
const PAINTED = 0xabcdef;

function stubPlugin(options: { noHelper?: boolean; failing?: boolean } = {}) {
  const values = new BehaviorSubject<Record<string, unknown>>({
    axes: { name: "on", params: {} },
    format: { name: "jpeg", params: { quality: 1 } },
    illumination: {},
    resolution: { name: "viewport", params: {} },
    transparent: false,
  });

  const download = vi.fn(async () => {
    if (options.failing) throw new Error("capture failed");
  });

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
        : { behaviors: { values }, download },
    },
  };

  return { backgrounds, download, plugin, values };
}

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
      "capture failed"
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

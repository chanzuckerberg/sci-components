import { PluginContext } from "molstar/lib/mol-plugin/context";
import { DefaultPluginSpec } from "molstar/lib/mol-plugin/spec";
import type { RenderStructureImageOptions } from "../ProteinStructureViewer.types";
import { AXES_OFF } from "../utils/axes";
import { themeColor } from "../utils/color";
import { blobFromDataUri } from "../utils/screenshot";
import { applyScene } from "./applyStructureScene";

/** Painted behind the structure when a background is asked for but unreadable. */
const FALLBACK_BACKGROUND = "#ffffff";

/**
 * Renders a structure to a PNG without a viewer on the page, drawn exactly as
 * the viewer would draw it from the same options - the image a caller can show
 * beside the interactive view, or hand to someone who cannot open one.
 *
 * A plugin is created for the one image, offscreen, and disposed of once it is
 * taken, whether or not taking it succeeded. The image is `width` by `height`
 * exactly: rendered at that size rather than scaled, and not cropped to the
 * structure.
 *
 * It needs a DOM and WebGL - a browser, or headless Chromium - and rejects
 * when there is no WebGL to render with.
 */
export async function renderStructureImage(
  options: RenderStructureImageOptions
): Promise<Blob> {
  const { backgroundColor, height, width } = options;

  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width < 1 ||
    height < 1
  ) {
    throw new Error("An image needs a width and a height of at least 1.");
  }

  // Sized exactly, and out of the way: fixed rather than in flow, so a page
  // measuring its own height does not grow while the image is taken.
  const container = document.createElement("div");
  container.setAttribute("aria-hidden", "true");
  container.style.cssText = `position:fixed;left:-10000px;top:0;width:${width}px;height:${height}px;pointer-events:none`;
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "display:block;width:100%;height:100%";
  container.append(canvas);
  document.body.append(container);

  const plugin = new PluginContext(DefaultPluginSpec());
  // Mol* rejects this as well as returning false when WebGL fails, and only its
  // own UI awaits it; the result of initViewerAsync is what reports the failure.
  plugin.canvas3dInitialized.catch(() => undefined);

  try {
    await plugin.init();
    const initialized = await plugin.initViewerAsync(canvas, container);
    const { canvas3d } = plugin;
    const helper = plugin.helpers.viewportScreenshot;
    if (!initialized || !canvas3d || !helper) {
      throw new Error("WebGL is not available to render the structure.");
    }

    if (backgroundColor !== undefined) {
      canvas3d.setProps({
        renderer: {
          backgroundColor: themeColor(backgroundColor, FALLBACK_BACKGROUND),
        },
      });
    }

    await applyScene(plugin, options, 0);

    // Committed now rather than on the next frame, which a hidden page may
    // never paint: this is what settles the camera on the structure.
    canvas3d.commit(true);

    helper.behaviors.cropParams.next({ auto: false, relativePadding: 0 });
    helper.resetCrop();
    helper.behaviors.values.next({
      ...helper.behaviors.values.value,
      axes: AXES_OFF as never,
      format: { name: "png", params: {} },
      resolution: { name: "custom", params: { height, width } } as never,
      transparent: backgroundColor === undefined,
    });

    return blobFromDataUri(await helper.getImageDataUri());
  } finally {
    plugin.dispose();
    container.remove();
  }
}

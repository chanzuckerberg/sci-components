import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import type { ViewportScreenshotHelper } from "molstar/lib/mol-plugin/util/viewport-screenshot";
import { download as saveFile } from "molstar/lib/mol-util/download";
import type {
  DownloadResolution,
  StructureDownload,
} from "../ProteinStructureViewer.types";
import { AXES_OFF, AXES_ON } from "./axes";
import { themeColor } from "./color";

/**
 * Each resolution as the Mol* preset that produces it: 1280x720, 1920x1080,
 * 3840x2160, 7680x4320. Named here rather than given as dimensions so the
 * aspect stays Mol*'s to choose.
 *
 * Mol*'s own `viewport` preset - the canvas at its current size - is left out
 * deliberately: it makes the image depend on how big the viewer happens to be
 * on screen, which is not something a caller asking for "high" is asking for.
 */
const RESOLUTION_PRESETS: Record<DownloadResolution, string> = {
  high: "ultra-hd",
  low: "hd",
  maximum: "8k-ultra-hd",
  medium: "full-hd",
};

/** Painted behind the structure when a background is asked for but unreadable. */
const FALLBACK_BACKGROUND = "#ffffff";

/** Named for a file when neither the caller nor Mol* has a better name. */
const FALLBACK_FILENAME = "structure.png";

/**
 * Runs `capture` with Mol*'s screenshot helper set up the way `options` asks,
 * and resolves undefined when the plugin has no helper to capture with.
 *
 * Mol*'s screenshot helper renders its own pass rather than reading the canvas
 * back, so the image is drawn fresh at the requested size and carries its own
 * transparency and axes settings - none of which disturb the view on screen.
 *
 * A named background is the one exception. The helper only chooses between
 * transparent and whatever the renderer is already painting, so a color has to
 * be put on the canvas for the length of the capture and taken off afterwards.
 * `finally` is what guarantees the second half: leaving a figure's background
 * behind on the viewer would be a worse bug than a failed download.
 */
async function withScreenshotHelper<T>(
  plugin: PluginUIContext,
  options: StructureDownload,
  capture: (helper: ViewportScreenshotHelper) => Promise<T>
): Promise<T | undefined> {
  const helper = plugin.helpers.viewportScreenshot;
  if (!helper) return undefined;

  const { backgroundColor, resolution = "medium", showAxes } = options;
  const transparent = backgroundColor === undefined;

  helper.behaviors.values.next({
    ...helper.behaviors.values.value,
    axes: (showAxes ? AXES_ON : AXES_OFF) as never,
    format: { name: "png", params: {} },
    resolution: {
      name: RESOLUTION_PRESETS[resolution],
      params: {},
    } as never,
    transparent,
  });

  const canvas3d = plugin.canvas3d;
  const painted = canvas3d?.props.renderer.backgroundColor;
  const overrideBackground = !transparent && canvas3d !== undefined;

  if (overrideBackground) {
    canvas3d?.setProps({
      renderer: {
        backgroundColor: themeColor(backgroundColor, FALLBACK_BACKGROUND),
      },
    });
  }

  try {
    return await capture(helper);
  } finally {
    if (overrideBackground && painted !== undefined) {
      canvas3d?.setProps({ renderer: { backgroundColor: painted } });
    }
  }
}

/**
 * Decodes a `data:` URI into a Blob.
 *
 * By hand rather than through `fetch`, which a page's `connect-src` can refuse
 * for `data:` URIs - and the sandboxed hosts that need `deliver` in the first
 * place are exactly the pages that set one.
 */
export function blobFromDataUri(uri: string): Blob {
  const comma = uri.indexOf(",");
  const header = uri.slice(0, comma);
  const body = uri.slice(comma + 1);
  const type = header.slice("data:".length).split(";")[0] || "image/png";

  if (!header.endsWith(";base64")) {
    return new Blob([decodeURIComponent(body)], { type });
  }

  const binary = atob(body);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

  return new Blob([bytes], { type });
}

/** Downloads the structure as a PNG, the capture button's default. */
export async function downloadStructureImage(
  plugin: PluginUIContext,
  options: StructureDownload = {}
): Promise<void> {
  await withScreenshotHelper(plugin, options, (helper) =>
    helper.download(options.filename)
  );
}

/**
 * Renders the structure as a PNG and hands it back rather than downloading it,
 * the same image `downloadStructureImage` would have saved.
 */
export async function captureStructureImage(
  plugin: PluginUIContext,
  options: StructureDownload = {}
): Promise<Blob> {
  const uri = await withScreenshotHelper(plugin, options, (helper) =>
    helper.getImageDataUri()
  );
  if (uri === undefined) {
    throw new Error(
      "This Mol* plugin has no screenshot helper to capture with."
    );
  }

  return blobFromDataUri(uri);
}

/**
 * The name an image is saved or delivered under: the caller's, or else the
 * one Mol* derives from the loaded structure, `.png` included either way.
 */
function imageFilename(plugin: PluginUIContext, filename?: string): string {
  if (filename) return `${filename}.png`;

  // Optional on the method too, since the peer range reaches back to a Mol*
  // this package does not build against.
  return (
    plugin.helpers.viewportScreenshot?.getFilename?.(".png") ??
    FALLBACK_FILENAME
  );
}

/**
 * What the capture button does: produces the image and gets it to the user.
 *
 * Without `render` or `deliver` this is the stock download, unchanged. With
 * them, the image comes from `render` when one is given and from the viewer's
 * own capture otherwise, and goes to `deliver` when one is given and to a
 * browser download otherwise.
 */
export async function exportStructureImage(
  plugin: PluginUIContext,
  download: StructureDownload = {}
): Promise<void> {
  const { deliver, filename, render } = download;

  if (!render && !deliver) {
    await downloadStructureImage(plugin, download);
    return;
  }

  const image = render
    ? await render(plugin)
    : await captureStructureImage(plugin, download);
  const name = imageFilename(plugin, filename);

  if (deliver) await deliver(image, name);
  else saveFile(image, name);
}

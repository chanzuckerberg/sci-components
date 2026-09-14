import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
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

/**
 * Downloads the structure as a PNG.
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
export async function downloadStructureImage(
  plugin: PluginUIContext,
  options: StructureDownload = {}
): Promise<void> {
  const helper = plugin.helpers.viewportScreenshot;
  if (!helper) return;

  const {
    backgroundColor,
    filename,
    resolution = "medium",
    showAxes,
  } = options;
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
    await helper.download(filename);
  } finally {
    if (overrideBackground && painted !== undefined) {
      canvas3d?.setProps({ renderer: { backgroundColor: painted } });
    }
  }
}

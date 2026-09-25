import type { PluginContext } from "molstar/lib/mol-plugin/context";
import type {
  StructureLoadInfo,
  StructureSceneHandle,
  StructureSceneOptions,
  ViewerErrorPhase,
} from "../ProteinStructureViewer.types";
import { ORIENT_DURATION_MS } from "./camera";
import { loadInfo } from "./load";
import { SceneProps, StructureScene } from "./StructureScene";

/** The options as the props the scene draws from. */
function sceneProps(options: StructureSceneOptions): SceneProps {
  return {
    chainColors: options.chainColors,
    colorBy: options.colorBy,
    hiddenChains: new Set(options.hiddenChains ?? []),
    highlights: options.highlights,
    mode: options.mode ?? "light",
    overlay: options.residueOverlay,
    plddt: options.plddt,
    representation: options.representation ?? "cartoon",
  };
}

/**
 * Draws a scene on a plugin and hands back its handle. `fitDurationMs` is how
 * long fitting the camera to each structure animates - none, for an image
 * taken straight after.
 */
export async function applyScene(
  plugin: PluginContext,
  options: StructureSceneOptions,
  fitDurationMs?: number
): Promise<StructureSceneHandle> {
  let current = options;

  const reportError = (error: unknown, phase: ViewerErrorPhase) => {
    if (current.onError) current.onError(error, phase);
    else console.error("Failed to draw the structure:", error);
  };

  const scene = new StructureScene(plugin, {
    draw: true,
    mode: options.mode ?? "light",
    reportError,
  });

  const load = async (next: StructureSceneOptions) => {
    const outcome = await scene.enqueue(() =>
      scene.load(next.structure, sceneProps(next))
    );
    if (!outcome.ok) throw outcome.error;

    scene.frame(next, true, fitDurationMs);
    return loadInfo(outcome.loaded);
  };

  let info: StructureLoadInfo = await load(options);

  return {
    dispose: () => scene.dispose(),
    getCamera: () => scene.camera(),
    get info() {
      return info;
    },
    async update(changes) {
      const previous = current;
      current = { ...current, ...changes };

      if (current.structure !== previous.structure) {
        info = await load(current);
        return;
      }

      await scene.update(sceneProps(current));

      const { canvas3d } = plugin;
      if (current.projection && current.projection !== previous.projection) {
        canvas3d?.setProps({ camera: { mode: current.projection } });
      }
      if (current.orientation && current.orientation !== previous.orientation) {
        scene.orient(
          current.orientation,
          current.highlights,
          ORIENT_DURATION_MS
        );
      }
    },
  };
}

/**
 * Draws a structure on a Mol* plugin of your own, the way the viewer draws it:
 * the same representations, coloring, highlights and camera, from the same
 * options its props take. Works on any plugin - one rendering offscreen, one
 * inside a viewer of your own - and resolves once the structure is drawn and
 * the camera placed on it.
 *
 * The scene clears the plugin's state to load the structure, and keeps what it
 * draws in line with `update` from then on. It adds nothing to the plugin
 * beyond the structure and its representations, and three color themes
 * registered once per plugin.
 */
export function applyStructureScene(
  plugin: PluginContext,
  options: StructureSceneOptions
): Promise<StructureSceneHandle> {
  return applyScene(plugin, options);
}

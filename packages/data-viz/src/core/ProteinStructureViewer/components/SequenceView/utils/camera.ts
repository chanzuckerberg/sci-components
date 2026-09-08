import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { PluginCommands } from "molstar/lib/mol-plugin/commands";
import { CAMERA_RESET_DURATION_MS } from "../constants";

/** Animates the camera back to the default view fitted to the structure. */
export async function resetCamera(plugin: PluginUIContext): Promise<void> {
  await PluginCommands.Camera.Reset(plugin, {
    durationMs: CAMERA_RESET_DURATION_MS,
  });
}

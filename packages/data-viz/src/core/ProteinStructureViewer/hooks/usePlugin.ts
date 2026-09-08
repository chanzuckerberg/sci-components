import { PluginReactContext } from "molstar/lib/mol-plugin-ui/base";
import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { useContext } from "react";

/**
 * The plugin owning the React root this component renders in.
 *
 * Mol* renders its view components inside its own root and provides the plugin
 * through this context, which is what `PluginUIComponent` reads to populate
 * `this.plugin`.
 */
export function usePlugin(): PluginUIContext {
  return useContext(PluginReactContext);
}

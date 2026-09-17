import {
  StructureElement,
  StructureProperties,
} from "molstar/lib/mol-model/structure";
import { Color } from "molstar/lib/mol-util/color";
import { themeColor } from "./color";

/** Mol* color theme name under which per-chain coloring is registered. */
export const CHAIN_COLOR_THEME_NAME = "chain-color";

/** Painted for a chain with no color assigned, or one assigned a bad value. */
const DEFAULT_CHAIN_COLOR_HEX = "#808080";
const DEFAULT_CHAIN_COLOR = Color.fromRgb(128, 128, 128);

/** Chain coloring state the theme reads on every render. */
interface ChainColorState {
  /** Chain id to `#RRGGBB`. */
  colors: Map<string, string>;
  /**
   * Bumped on every update and handed to Mol* as the theme's `contextHash`, so
   * it re-renders instead of serving colors from its per-model property cache.
   */
  version: number;
}

export interface ChainColorTheme {
  /** Provider to register on a plugin's color theme registry. */
  provider: unknown;
  /** Replaces the chain colors and invalidates Mol*'s cache. */
  setState: (colors: Map<string, string>) => void;
}

/**
 * Builds a Mol* color theme that paints each chain its own color.
 *
 * This stands in for Mol*'s built-in `chain-id` theme, which picks its own
 * colors from a palette we cannot read back. Owning the assignment is what
 * lets the chain legend show a swatch that matches the structure, rather than
 * a key for colors it has to guess at.
 *
 * Created per plugin instance, and its state read live inside `color()`, for
 * the same reasons as the residue value theme beside it: several viewers can
 * color chains differently on one page, and recoloring does not rebuild the
 * structure.
 */
export function createChainColorTheme(): ChainColorTheme {
  const state: ChainColorState = { colors: new Map(), version: 0 };

  const provider = {
    category: "chain property",
    defaultValues: {},
    factory() {
      const { colors } = state;
      const parsed = new Map<string, Color>();

      // Parsed once per factory call rather than per element: `color()` runs
      // for every residue drawn, and a consumer's `chainColors` is arbitrary
      // text until it has been checked.
      for (const [chainId, hex] of colors) {
        parsed.set(chainId, themeColor(hex, DEFAULT_CHAIN_COLOR_HEX));
      }

      return {
        color(location: unknown) {
          if (!StructureElement.Location.is(location)) {
            return DEFAULT_CHAIN_COLOR;
          }

          const chainId = StructureProperties.chain.auth_asym_id(location);

          return parsed.get(chainId) ?? DEFAULT_CHAIN_COLOR;
        },
        contextHash: state.version,
        description: "Color residues by the chain they sit on",
        factory: provider.factory,
        granularity: "group" as const,
        props: {},
      };
    },
    getParams: () => ({}),
    isApplicable: () => true,
    label: "Chain Color",
    name: CHAIN_COLOR_THEME_NAME,
  };

  return {
    provider,
    setState(colors) {
      state.colors = colors;
      state.version++;
    },
  };
}

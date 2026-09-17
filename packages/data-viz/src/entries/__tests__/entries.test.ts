import * as barrel from "../../index";
import * as colorScales from "../colorScales";
import * as heatmapChart from "../HeatmapChart";
import * as proteinStructureViewer from "../ProteinStructureViewer";
import * as stackedBarChart from "../StackedBarChart";

/**
 * The subpath entries and the barrel have to agree.
 */

/** Every entry, with the barrel exports each one is responsible for. */
const ENTRIES = [
  { exports: heatmapChart, name: "HeatmapChart" },
  { exports: proteinStructureViewer, name: "ProteinStructureViewer" },
  { exports: stackedBarChart, name: "StackedBarChart" },
] as const;

describe("subpath entries", () => {
  it.each(ENTRIES)(
    "exports $name itself, identical to the barrel's",
    ({ exports, name }) => {
      const component = (exports as Record<string, unknown>)[name];

      expect(component).toBeDefined();
      expect(component).toBe((barrel as Record<string, unknown>)[name]);
    }
  );

  it.each(ENTRIES)(
    "$name's default export is the component",
    ({ exports, name }) => {
      // The barrel has no default export, so the subpath's `default` is the one
      // addition rather than a divergence — and it must not be a separate copy.
      expect(exports.default).toBe((exports as Record<string, unknown>)[name]);
    }
  );

  it.each(ENTRIES)(
    "$name adds nothing the barrel does not have",
    ({ exports }) => {
      // `default` is the documented exception above. Everything else on a
      // subpath must be reachable from the barrel under the same name, or the
      // two surfaces have drifted.
      const extra = Object.keys(exports)
        .filter((key) => key !== "default")
        .filter((key) => !(key in barrel));

      expect(extra).toEqual([]);
    }
  );

  it.each(ENTRIES)(
    "$name's shared exports are the barrel's own values",
    ({ exports }) => {
      // Name agreement is not enough: two copies of a module would satisfy it
      // and still break component identity.
      Object.keys(exports)
        .filter((key) => key !== "default")
        .filter((key) => key in barrel)
        .forEach((key) => {
          expect((exports as Record<string, unknown>)[key]).toBe(
            (barrel as Record<string, unknown>)[key]
          );
        });
    }
  );

  /**
   * Not a component, but on the same contract: these helpers are also exported
   * from the barrel, and they have their own entry so reading a colour ramp
   * does not cost the structure viewer's chunk.
   */
  it("exports the colour scale helpers, identical to the barrel's", () => {
    const names = Object.keys(colorScales);

    expect(names).not.toEqual([]);
    names.forEach((key) => {
      expect(key in barrel).toBe(true);
      expect((colorScales as Record<string, unknown>)[key]).toBe(
        (barrel as Record<string, unknown>)[key]
      );
    });
  });

  /**
   * The inverse direction, which is the one that actually rots.
   *
   * Adding a component to `src/index.ts` without adding its entry is the easy
   * mistake, and every check above would still pass — they only look at what
   * the entries already claim. This fails until the new component has both an
   * entry module and a line in the `exports` map.
   */
  it("covers every component the barrel exports", () => {
    const covered = new Set<string>(ENTRIES.map((entry) => entry.name));
    // Components are the barrel's capitalised function exports; the helpers and
    // constants beside them are covered by the colour-scale case above.
    const components = Object.entries(barrel)
      .filter(([name]) => /^[A-Z][a-z]/.test(name))
      .filter(
        ([, value]) => typeof value === "function" || typeof value === "object"
      )
      .map(([name]) => name);

    expect(components).not.toEqual([]);
    expect(components.filter((name) => !covered.has(name))).toEqual([]);
  });
});

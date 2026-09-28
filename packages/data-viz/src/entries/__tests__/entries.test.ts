import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import * as barrel from "../../index";
import * as colorScales from "../colorScales";
import * as genomeTrack from "../GenomeTrack";
import * as heatmapChart from "../HeatmapChart";
import * as proteinStructureViewer from "../ProteinStructureViewer";
import * as stackedBarChart from "../StackedBarChart";

/**
 * The subpath entries and the barrel have to agree.
 */

/** Every entry, with the barrel exports each one is responsible for. */
const ENTRIES = [
  {
    // `GenomeTrack` re-exports `MIN_SPAN`, `TEST_IDS` and the hit-test id
    // helpers, all of which the barrel also carries.
    exports: genomeTrack,
    name: "GenomeTrack",
  },
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

/**
 * The `exports` map has to list every entry, and point at files the build
 * actually emits.
 *
 * The cases above import from `src/entries` directly, so they prove the source
 * surfaces agree and nothing more. A subpath only exists for a consumer if
 * `package.json` publishes it, and that is a separate file nobody is forced to
 * touch: adding an entry module and wiring the rolldown input while forgetting
 * the `exports` key leaves every check above passing and the subpath
 * unimportable. These read the manifest instead of the modules.
 *
 * Filenames are asserted rather than resolved because `dist` does not exist
 * until the package is built, and a unit test that depends on build output
 * fails for the wrong reason on a clean checkout. What is checkable without
 * building is that the manifest and the entry modules describe the same set,
 * under the naming convention the rolldown config emits.
 */
describe("exports map", () => {
  /** The root entry every existing consumer imports. */
  const ROOT_SUBPATH = ".";
  /** Tooling reads this directly, so the map has to keep letting it through. */
  const MANIFEST_SUBPATH = "./package.json";
  /** Escape hatch for consumers who already deep-imported a built file. */
  const DEEP_IMPORT_SUBPATH = "./dist/*";

  const packageRoot = join(__dirname, "..", "..", "..");
  const manifest = JSON.parse(
    readFileSync(join(packageRoot, "package.json"), "utf8")
  ) as {
    exports: Record<string, unknown>;
  };

  /** Entry modules on disk, which is the set the build turns into subpaths. */
  const entryModules = readdirSync(join(packageRoot, "src", "entries"))
    .filter((name) => name.endsWith(".ts"))
    .map((name) => name.replace(/\.ts$/, ""))
    .sort();

  /** Published subpaths, minus the root, the escape hatch, and the manifest. */
  const subpaths = Object.keys(manifest.exports)
    .filter((key) => key !== ROOT_SUBPATH && key !== MANIFEST_SUBPATH)
    .filter((key) => !key.includes("*"))
    .map((key) => key.replace(/^\.\//, ""))
    .sort();

  it("finds entry modules to check", () => {
    // Guards the two lists below against both being trivially empty, which
    // would make every comparison vacuously true.
    expect(entryModules).not.toEqual([]);
  });

  it("publishes exactly the entry modules, no more and no fewer", () => {
    expect(subpaths).toEqual(entryModules);
  });

  it("keeps the root entry and the deep-import escape hatch", () => {
    // `.` is what existing consumers import; `./dist/*` is what keeps a
    // consumer who already deep-imported a built file working now that an
    // `exports` map restricts resolution.
    expect(manifest.exports[ROOT_SUBPATH]).toBeDefined();
    expect(manifest.exports[DEEP_IMPORT_SUBPATH]).toBe("./dist/*");
    expect(manifest.exports[MANIFEST_SUBPATH]).toBe("./package.json");
  });

  it.each(["import", "require"] as const)(
    "points every %s condition at the file the build emits",
    (condition) => {
      const format = condition === "import" ? "esm" : "cjs";

      subpaths.forEach((name) => {
        const entry = manifest.exports[`./${name}`] as Record<
          string,
          Record<string, string>
        >;

        expect(entry[condition]).toEqual({
          default: `./dist/${name}.${format}.js`,
          types: `./dist/${name}.${format}.d.ts`,
        });
      });
    }
  );
});

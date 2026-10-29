import { CRAMBIN_PDB } from "../__storybook__/constants";
import {
  MAX_SURFACE_GRID_CELLS,
  assertSurfaceBudget,
  isViewerComponent,
} from "../scene/representation";
import { structureFromPdb } from "./molstarStructure";

describe("the surface's grid budget", () => {
  it("lets a small protein through", async () => {
    const crambin = await structureFromPdb(CRAMBIN_PDB);

    expect(() => assertSurfaceBudget(crambin)).not.toThrow();
  });

  /**
   * The grid spans the bounding box, so two atoms far enough apart ask for as
   * much memory as a very large complex - which is what the budget is for.
   */
  it("refuses a structure whose grid would outgrow the budget", async () => {
    const far = await structureFromPdb(
      [
        "ATOM      1  CA  ALA A   1       0.000   0.000   0.000  1.00  0.00           C",
        "ATOM      2  CA  ALA A   2     300.000 300.000 300.000  1.00  0.00           C",
      ].join("\n")
    );

    expect(MAX_SURFACE_GRID_CELLS).toBeLessThan(500 ** 3);
    expect(() => assertSurfaceBudget(far)).toThrow(/too large/);
  });
});

describe("isViewerComponent", () => {
  const keyed = (key: string) => ({ cell: { transform: { ref: "x" } }, key });

  it.each([
    "structure-component-polymer-A",
    "structure-component-ligand-AB",
    "structure-component-highlight-B",
    "structure-component-surface",
  ])("owns %s", (key) => {
    expect(isViewerComponent(keyed(key))).toBe(true);
  });

  it.each([
    "structure-component-static-polymer",
    "structure-component-surface-of-mine",
    "my-own-representation",
  ])("leaves %s to whoever built it", (key) => {
    expect(isViewerComponent(keyed(key))).toBe(false);
  });
});

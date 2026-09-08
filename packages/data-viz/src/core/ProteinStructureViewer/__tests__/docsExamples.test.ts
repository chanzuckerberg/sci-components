import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Structure } from "molstar/lib/mol-model/structure";
import { residueIndices, structureFromPdb } from "./molstarStructure";

/**
 * The documented examples inline their own structure so a reader can copy one
 * out whole, which means nothing typechecks a fixture against the props beside
 * it. Both ways that can go wrong are silent in the browser: a chain too short
 * for the polymer cartoon renders an empty canvas, and per-residue data keyed
 * past the end of the chain renders a structure with no coloring at all.
 *
 * These read the examples as text, which is how the docs display them too, so
 * every example is covered as soon as it inlines a `PDB` constant.
 */

const EXAMPLES_DIR = join(__dirname, "../__storybook__/docs/examples");

const PDB_LITERAL = /const PDB = `([\s\S]*?)`;/;
const PLDDT_LITERAL = /const PLDDT = \[([\s\S]*?)\];/;
const VALUES_LITERAL = /new Map\(\[([\s\S]*?)\]\);/;

const examples = readdirSync(EXAMPLES_DIR)
  .filter((name) => name.endsWith(".tsx"))
  .map((name) => ({
    name,
    pdb: readFileSync(join(EXAMPLES_DIR, name), "utf8").match(PDB_LITERAL),
    source: readFileSync(join(EXAMPLES_DIR, name), "utf8"),
  }))
  .filter((example) => example.pdb !== null);

describe("documented examples", () => {
  it("finds examples to check", () => {
    expect(examples.length).toBeGreaterThan(0);
  });

  describe.each(examples)("$name", ({ pdb, source }) => {
    let structure: Structure;
    let residues: Set<number>;

    beforeAll(async () => {
      structure = await structureFromPdb(
        (pdb as RegExpMatchArray)[1] as string
      );
      residues = residueIndices(structure);
    });

    it("has a polymer long enough for the cartoon to trace", () => {
      expect(structure.polymerResidueCount).toBeGreaterThan(0);
    });

    it("scores every residue when it passes pLDDT", () => {
      const plddt = source.match(PLDDT_LITERAL);
      if (!plddt) return;

      const scores = (plddt[1] as string)
        .split(",")
        .map((score) => score.trim())
        .filter(Boolean);

      expect(scores).toHaveLength(residues.size);
    });

    it("keys every overlay value to a residue that exists", () => {
      const values = source.match(VALUES_LITERAL);
      if (!values) return;

      const keys = [...(values[1] as string).matchAll(/\[\s*(\d+),/g)].map(
        (match) => Number(match[1])
      );

      expect(keys.length).toBeGreaterThan(0);
      expect(keys.filter((key) => !residues.has(key))).toEqual([]);
    });
  });
});

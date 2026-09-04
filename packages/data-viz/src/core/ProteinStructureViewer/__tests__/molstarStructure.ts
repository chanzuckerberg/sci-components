import { OrderedSet } from "molstar/lib/mol-data/int";
import { parsePDB } from "molstar/lib/mol-io/reader/pdb/parser";
import { trajectoryFromPDB } from "molstar/lib/mol-model-formats/structure/pdb";
import type { ElementIndex } from "molstar/lib/mol-model/structure";
import {
  Structure,
  StructureElement,
  StructureProperties,
} from "molstar/lib/mol-model/structure";

/**
 * Test helpers for driving the real Mol* pipeline. The component tests stub the
 * plugin out because jsdom has no WebGL, but parsing and coloring are pure and
 * run headlessly, which is what makes it possible to assert on the colors a
 * structure actually gets.
 */

/** Builds a Mol* structure from PDB text, the way the viewer does. */
export async function structureFromPdb(pdb: string): Promise<Structure> {
  const parsed = await parsePDB(pdb).run();
  if (parsed.isError) throw new Error(parsed.message);

  const trajectory = await trajectoryFromPDB(parsed.result).run();

  // getFrameAtIndex hands back either a model or a task that resolves to one.
  const frame = trajectory.getFrameAtIndex(0);
  const model = "run" in frame ? await frame.run() : frame;

  return Structure.ofModel(model);
}

/**
 * Visits every atom of the structure with a location, keyed by the 0-based
 * residue index the viewer's callbacks and overlays use -- Mol*'s residue key,
 * which counts residues in file order regardless of how they are numbered.
 */
export function eachResidue<T>(
  structure: Structure,
  read: (location: StructureElement.Location) => T
): Map<number, T> {
  const location = StructureElement.Location.create(structure);
  const byResidue = new Map<number, T>();

  for (const unit of structure.units) {
    location.unit = unit;
    for (let i = 0; i < unit.elements.length; i++) {
      location.element = unit.elements[i] as ElementIndex;
      const residue = StructureProperties.residue.key(location);
      byResidue.set(residue, read(location));
    }
  }

  return byResidue;
}

/** 0-based residue indices present in the structure. */
export function residueIndices(structure: Structure): Set<number> {
  return new Set(eachResidue(structure, () => null).keys());
}

/**
 * The loci for the first element of the residue numbered `seqId`, for tests
 * that need to drive a residue-level API the way a click would.
 */
export function lociForSeqId(
  structure: Structure,
  seqId: number
): StructureElement.Loci {
  const location = StructureElement.Location.create(structure);

  for (const unit of structure.units) {
    location.unit = unit;
    for (let i = 0; i < unit.elements.length; i++) {
      location.element = unit.elements[i] as ElementIndex;
      if (StructureProperties.residue.auth_seq_id(location) !== seqId) continue;

      return StructureElement.Loci(structure, [
        {
          indices: OrderedSet.ofSingleton(i as StructureElement.UnitIndex),
          unit,
        },
      ]);
    }
  }

  throw new Error(`no residue numbered ${seqId}`);
}

/** B-factor occupies columns 60-66 (0-indexed 60 up to but not including 66). */
export function bFactorOf(line: string): string {
  return line.substring(60, 66);
}

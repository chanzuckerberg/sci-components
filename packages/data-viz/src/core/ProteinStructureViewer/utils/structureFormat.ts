/**
 * Structure text formats Mol* can parse from the viewer's `structure` prop.
 *
 * `"mmcif"` covers both mmCIF and PDBx; they are the same text format, and
 * that is the name Mol*'s trajectory parser uses. Binary CIF (`.bcif`) is not
 * accepted: the prop is a string.
 */
export type StructureFormat = "pdb" | "mmcif";

/** How much of the file to inspect when guessing the format. */
const DETECT_SAMPLE = 16_384;

/**
 * Infers whether `text` is PDB or mmCIF (PDBx).
 *
 * mmCIF documents start with a `data_` block and name their coordinates
 * `_atom_site.`. PDB never does either, so either marker is enough. A leading
 * comment (`# ...`) before `data_` is still mmCIF.
 */
export function detectStructureFormat(text: string): StructureFormat {
  const sample = text.slice(0, DETECT_SAMPLE);

  if (/(?:^|\n)\s*data_/.test(sample) || /_atom_site\./.test(sample)) {
    return "mmcif";
  }

  return "pdb";
}

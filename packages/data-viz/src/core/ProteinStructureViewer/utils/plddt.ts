import { CustomElementProperty } from "molstar/lib/mol-model-props/common/custom-element-property";
import type { ElementIndex, Model } from "molstar/lib/mol-model/structure";
import { Color } from "molstar/lib/mol-util/color";
import { ColorScale, sampleSteppedScale } from "../../../common/colorScales";

/** Mol* color theme name under which pLDDT coloring is registered. */
export const PLDDT_THEME_NAME = "plddt-bfactor";

/**
 * AlphaFold's pLDDT confidence bands. Thresholds are on the 0-1 scale that
 * `plddt` values use, ascending from lowest to highest confidence.
 */
export const PLDDT_COLOR_SCALE: ColorScale = {
  kind: "stepped",
  stops: [
    { color: "#FF7C45", label: "0.5", threshold: 0.5 },
    { color: "#FFDB11", label: "0.7", threshold: 0.7 },
    { color: "#64CBF3", label: "0.9", threshold: 0.9 },
    { color: "#0053D5", label: "1.0", threshold: 1 },
  ],
};

const PLDDT_BANDS =
  PLDDT_COLOR_SCALE.kind === "stepped" ? PLDDT_COLOR_SCALE.stops : [];

const DEFAULT_PLDDT_COLOR = Color.fromRgb(128, 128, 128);

/**
 * Maps a pLDDT confidence score on the 0-100 B-factor scale to its band color.
 * `PLDDT_COLOR_SCALE` thresholds are on the 0-1 scale, so the score is
 * normalized before it is sampled.
 */
function plddtToColor(value: number): Color {
  const [r, g, b] = sampleSteppedScale(PLDDT_BANDS, value / 100);
  return Color.fromRgb(r, g, b);
}

/**
 * Rewrites a PDB file's B-factor column with pLDDT scores so Mol* can read them
 * off the parsed model. B-factors occupy columns 60-66 of ATOM/HETATM lines;
 * scores arrive on a 0-1 scale and are stored on the conventional 0-100 one.
 * Residues past the end of `plddtValues` fall back to a mid-confidence 50.
 *
 * Scores are handed out in the order the residues appear, so what counts as a
 * residue boundary has to match what Mol* will parse: a change of chain, of
 * residue number, or of insertion code. Missing any of those would shift every
 * score from that point on.
 */
export function injectPlddtIntoPdb(
  pdbData: string,
  plddtValues: number[]
): string {
  const lines = pdbData.split("\n");
  let residueIndex = -1;
  let lastResSeq = "";
  let lastChain = "";
  let lastInsertionCode = "";

  return lines
    .map((line) => {
      if (!line.startsWith("ATOM") && !line.startsWith("HETATM")) return line;

      // Padded before the columns are read, not just before the B-factor is
      // written, so a truncated line reports a blank insertion code rather
      // than an empty one and does not read as a new residue.
      const paddedLine = line.padEnd(66, " ");

      const chainId = paddedLine.substring(21, 22);
      const resSeq = paddedLine.substring(22, 26).trim();
      // A residue's identity includes its insertion code: 42, 42A and 42B are
      // three residues sharing a number, and each takes its own score.
      const insertionCode = paddedLine.substring(26, 27);

      if (
        resSeq !== lastResSeq ||
        chainId !== lastChain ||
        insertionCode !== lastInsertionCode
      ) {
        residueIndex++;
        lastResSeq = resSeq;
        lastChain = chainId;
        lastInsertionCode = insertionCode;
      }

      const plddt =
        residueIndex < plddtValues.length
          ? (plddtValues[residueIndex] ?? 0) * 100
          : 50;
      const bfactorStr = plddt.toFixed(2).padStart(6, " ");

      return (
        paddedLine.substring(0, 60) + bfactorStr + paddedLine.substring(66)
      );
    })
    .join("\n");
}

/**
 * Mol* color theme that reads pLDDT scores out of the B-factor column, paired
 * with `injectPlddtIntoPdb`. Registered per plugin instance.
 */
export const PlddtColoring = CustomElementProperty.create<number>({
  coloring: {
    defaultColor: DEFAULT_PLDDT_COLOR,
    getColor(e: number) {
      return plddtToColor(e);
    },
  },
  getData(model: Model) {
    const map = new Map<ElementIndex, number>();
    const atomCount = model.atomicHierarchy.atoms._rowCount;
    for (let i = 0; i < atomCount; i++) {
      map.set(
        i as ElementIndex,
        model.atomicConformation.B_iso_or_equiv.value(i)
      );
    }
    return { value: map };
  },
  label: "pLDDT",
  name: PLDDT_THEME_NAME,
});

import { CustomElementProperty } from "molstar/lib/mol-model-props/common/custom-element-property";
import type { ElementIndex, Model } from "molstar/lib/mol-model/structure";
import { Color } from "molstar/lib/mol-util/color";
import { PLDDT_COLOR_SCALE, sampleSteppedScale } from "./colorScales";

/** Mol* color theme name under which pLDDT coloring is registered. */
export const PLDDT_THEME_NAME = "plddt-bfactor";

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
 */
export function injectPlddtIntoPdb(
  pdbData: string,
  plddtValues: number[]
): string {
  const lines = pdbData.split("\n");
  let residueIndex = -1;
  let lastResSeq = "";
  let lastChain = "";

  return lines
    .map((line) => {
      if (!line.startsWith("ATOM") && !line.startsWith("HETATM")) return line;

      const chainId = line.substring(21, 22);
      const resSeq = line.substring(22, 26).trim();
      if (resSeq !== lastResSeq || chainId !== lastChain) {
        residueIndex++;
        lastResSeq = resSeq;
        lastChain = chainId;
      }

      const plddt =
        residueIndex < plddtValues.length
          ? (plddtValues[residueIndex] ?? 0) * 100
          : 50;
      const bfactorStr = plddt.toFixed(2).padStart(6, " ");
      const paddedLine = line.padEnd(66, " ");

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

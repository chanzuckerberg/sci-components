import { Structure } from "molstar/lib/mol-model/structure";
import { Color } from "molstar/lib/mol-util/color";
import { BARNASE_BARSTAR_PDB } from "../__storybook__/barnaseBarstar";
import { parseHexColor } from "../utils/color";
import {
  HIGHLIGHT_COLOR_PALETTE,
  highlightsKey,
  resolveHighlights,
} from "../utils/highlights";
import {
  indexResidueAddresses,
  residueAddressKey,
  resolveResidueAddresses,
  resolveSelectionAddresses,
} from "../utils/residueAddress";
import { structureFromPdb } from "./molstarStructure";

/**
 * A caller knows a residue by the chain and number the file gives it; the
 * viewer keys everything by the residue's position. These run the real parser,
 * since the two only part company on the files that matter - a complex
 * numbered across its chains, or a residue with an insertion code.
 */

const ATOM =
  "ATOM      1  CA  ALA A   1      10.000  10.000  10.000  1.00  0.00           C";

/** The atom line, moved to a residue number and insertion code. */
function atResidue(resSeq: string, insertionCode = " "): string {
  return (
    ATOM.substring(0, 22) +
    resSeq.padStart(4, " ") +
    insertionCode +
    ATOM.substring(27)
  );
}

describe("residue addresses", () => {
  let complex: Structure;

  beforeAll(async () => {
    complex = await structureFromPdb(BARNASE_BARSTAR_PDB);
  });

  it("indexes every residue by chain and number", () => {
    const index = indexResidueAddresses(complex);

    expect(index.get(residueAddressKey({ chainId: "A", seqId: 1 }))).toBe(0);
    // The co-fold numbers barstar on from barnase: its first residue is 111.
    expect(index.get(residueAddressKey({ chainId: "B", seqId: 111 }))).toBe(
      110
    );
    expect(index.size).toBe(199);
  });

  it("keeps residues apart that differ only by insertion code", async () => {
    const structure = await structureFromPdb(
      [atResidue("10"), atResidue("10", "A"), atResidue("11")].join("\n")
    );
    const index = indexResidueAddresses(structure);

    expect(
      resolveResidueAddresses(index, [
        { chainId: "A", seqId: 10 },
        { chainId: "A", insCode: "A", seqId: 10 },
        { chainId: "A", seqId: 11 },
      ])
    ).toEqual([0, 1, 2]);
  });

  it("reads a blank insertion code as none", () => {
    expect(residueAddressKey({ chainId: "A", insCode: " ", seqId: 5 })).toBe(
      residueAddressKey({ chainId: "A", seqId: 5 })
    );
  });

  it("skips addresses the structure does not have", () => {
    const index = indexResidueAddresses(complex);

    expect(
      resolveResidueAddresses(index, [
        { chainId: "B", seqId: 39 },
        { chainId: "B", seqId: 149 },
      ])
    ).toEqual([148]);
  });

  describe("in a selection", () => {
    it("joins them to the selection's residues, once each", () => {
      const index = indexResidueAddresses(complex);

      expect(
        resolveSelectionAddresses(
          {
            addresses: [{ chainId: "B", seqId: 149 }],
            chains: ["A"],
            residues: [148, 3],
          },
          index
        )
      ).toEqual({ chains: ["A"], residues: [148, 3] });
    });

    it("hands back a selection naming no addresses as it was", () => {
      const selection = { residues: [1] };

      expect(resolveSelectionAddresses(selection, new Map())).toBe(selection);
      expect(resolveSelectionAddresses(null, new Map())).toBeNull();
    });
  });
});

describe("resolveHighlights", () => {
  let complex: Structure;
  let index: Map<string, number>;

  beforeAll(async () => {
    complex = await structureFromPdb(BARNASE_BARSTAR_PDB);
    index = indexResidueAddresses(complex);
  });

  it("paints each highlight its own color, or the palette's next", () => {
    const { byChain, colors } = resolveHighlights(
      [
        { chainId: "A", seqId: 27 },
        { chainId: "B", color: "#123456", seqId: 149 },
        { chainId: "A", seqId: 30 },
      ],
      index
    );

    expect(colors.get(26)).toBe(parseHexColor(HIGHLIGHT_COLOR_PALETTE[0]));
    expect(colors.get(148)).toBe(Color.fromRgb(0x12, 0x34, 0x56));
    expect(colors.get(29)).toBe(parseHexColor(HIGHLIGHT_COLOR_PALETTE[2]));
    expect(byChain).toEqual(
      new Map([
        ["A", [26, 29]],
        ["B", [148]],
      ])
    );
  });

  it("spends a palette place on a highlight that lands nowhere", () => {
    const { colors } = resolveHighlights(
      [
        { chainId: "Z", seqId: 1 },
        { chainId: "A", seqId: 27 },
      ],
      index
    );

    expect(colors.size).toBe(1);
    expect(colors.get(26)).toBe(parseHexColor(HIGHLIGHT_COLOR_PALETTE[1]));
  });

  it("keys highlights on their addresses and colors", () => {
    const one = [{ chainId: "A", seqId: 27 }];

    expect(highlightsKey(one)).toBe(
      highlightsKey([{ chainId: "A", seqId: 27 }])
    );
    expect(highlightsKey(one)).not.toBe(
      highlightsKey([{ chainId: "A", color: "#000000", seqId: 27 }])
    );
    expect(highlightsKey(undefined)).toBe("");
  });
});

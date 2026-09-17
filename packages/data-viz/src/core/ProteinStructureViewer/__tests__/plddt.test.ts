import {
  CRAMBIN_MMCIF,
  CRAMBIN_PDB,
  CRAMBIN_PLDDT,
} from "../__storybook__/constants";
import {
  injectPlddt,
  injectPlddtIntoMmcif,
  injectPlddtIntoPdb,
} from "../utils/plddt";
import { bFactorOf } from "./molstarStructure";

const ATOM_1 =
  "ATOM      1  N   THR A   1      17.047  14.099   3.625  1.00 13.79           N";
const ATOM_2 =
  "ATOM      2  CA  THR A   1      16.967  12.784   4.338  1.00 10.80           C";
const ATOM_3 =
  "ATOM      3  N   CYS A   2      15.115  11.555   6.914  1.00  9.85           N";

describe("injectPlddtIntoPdb", () => {
  it("writes the score into the B-factor column, scaled to 0-100", () => {
    const [line] = injectPlddtIntoPdb(ATOM_1, [0.94]).split("\n");
    expect(bFactorOf(line as string)).toBe(" 94.00");
  });

  it("keeps every other column untouched", () => {
    const [line] = injectPlddtIntoPdb(ATOM_1, [0.94]).split("\n");
    expect((line as string).substring(0, 60)).toBe(ATOM_1.substring(0, 60));
    expect((line as string).substring(66)).toBe(ATOM_1.substring(66));
  });

  it("gives every atom of a residue the same score", () => {
    const lines = injectPlddtIntoPdb(`${ATOM_1}\n${ATOM_2}`, [0.5]).split("\n");
    expect(bFactorOf(lines[0] as string)).toBe(" 50.00");
    expect(bFactorOf(lines[1] as string)).toBe(" 50.00");
  });

  it("advances to the next score when the residue number changes", () => {
    const lines = injectPlddtIntoPdb(
      `${ATOM_1}\n${ATOM_2}\n${ATOM_3}`,
      [0.5, 0.8]
    ).split("\n");
    expect(bFactorOf(lines[0] as string)).toBe(" 50.00");
    expect(bFactorOf(lines[1] as string)).toBe(" 50.00");
    expect(bFactorOf(lines[2] as string)).toBe(" 80.00");
  });

  it("falls back to mid confidence for residues past the end of the scores", () => {
    const lines = injectPlddtIntoPdb(`${ATOM_1}\n${ATOM_3}`, [0.94]).split(
      "\n"
    );
    expect(bFactorOf(lines[0] as string)).toBe(" 94.00");
    expect(bFactorOf(lines[1] as string)).toBe(" 50.00");
  });

  it("leaves non-coordinate records alone", () => {
    const input = `HEADER    PLANT PROTEIN\n${ATOM_1}\nEND`;
    const lines = injectPlddtIntoPdb(input, [0.94]).split("\n");
    expect(lines[0]).toBe("HEADER    PLANT PROTEIN");
    expect(lines[2]).toBe("END");
  });

  it("processes HETATM records too", () => {
    const hetatm = ATOM_1.replace("ATOM  ", "HETATM");
    const [line] = injectPlddtIntoPdb(hetatm, [0.25]).split("\n");
    expect(bFactorOf(line as string)).toBe(" 25.00");
  });

  it("pads short coordinate lines out to the B-factor column", () => {
    const short = "ATOM      1  N   THR A   1      17.047  14.099   3.625";
    const [line] = injectPlddtIntoPdb(short, [0.94]).split("\n");
    expect(bFactorOf(line as string)).toBe(" 94.00");
  });

  /**
   * Insertion codes let a structure add residues without renumbering the ones
   * after them, so 42, 42A and 42B are three residues sharing a number. Kabat
   * and Chothia antibody numbering leans on them heavily.
   */
  describe("insertion codes", () => {
    /** The same atom line, moved to a residue number and insertion code. */
    function atResidue(resSeq: string, insertionCode = " "): string {
      return (
        ATOM_1.substring(0, 22) +
        resSeq.padStart(4, " ") +
        insertionCode +
        ATOM_1.substring(27)
      );
    }

    it("treats residues differing only by insertion code as separate", () => {
      const lines = injectPlddtIntoPdb(
        [atResidue("42"), atResidue("42", "A"), atResidue("42", "B")].join(
          "\n"
        ),
        [0.1, 0.2, 0.3]
      ).split("\n");

      expect(bFactorOf(lines[0] as string)).toBe(" 10.00");
      expect(bFactorOf(lines[1] as string)).toBe(" 20.00");
      expect(bFactorOf(lines[2] as string)).toBe(" 30.00");
    });

    it("keeps the residues after an insertion on their own scores", () => {
      const lines = injectPlddtIntoPdb(
        [atResidue("42"), atResidue("42", "A"), atResidue("43")].join("\n"),
        [0.1, 0.2, 0.3]
      ).split("\n");

      expect(bFactorOf(lines[2] as string)).toBe(" 30.00");
    });
  });

  it("treats a repeated residue number in a new chain as a new residue", () => {
    const chainB = ATOM_1.substring(0, 21) + "B" + ATOM_1.substring(22);
    const lines = injectPlddtIntoPdb(`${ATOM_1}\n${chainB}`, [0.9, 0.3]).split(
      "\n"
    );
    expect(bFactorOf(lines[0] as string)).toBe(" 90.00");
    expect(bFactorOf(lines[1] as string)).toBe(" 30.00");
  });

  it("hands out one score per residue across a whole structure", () => {
    // Crambin carries no insertion codes, so its 46 residues have to consume
    // exactly the 46 scores: a boundary counted once too often anywhere in the
    // chain would leave the last residue short of its own.
    const lines = injectPlddtIntoPdb(CRAMBIN_PDB, CRAMBIN_PLDDT).split("\n");
    const atoms = lines.filter((line) => line.startsWith("ATOM"));
    const last = CRAMBIN_PLDDT[CRAMBIN_PLDDT.length - 1] as number;

    expect(bFactorOf(atoms[atoms.length - 1] as string)).toBe(
      (last * 100).toFixed(2).padStart(6, " ")
    );
  });
});

const MMCIF_COLUMNS = [
  "group_PDB",
  "id",
  "type_symbol",
  "label_atom_id",
  "label_alt_id",
  "label_comp_id",
  "label_asym_id",
  "label_entity_id",
  "label_seq_id",
  "pdbx_PDB_ins_code",
  "Cartn_x",
  "Cartn_y",
  "Cartn_z",
  "occupancy",
  "B_iso_or_equiv",
  "auth_seq_id",
  "auth_comp_id",
  "auth_asym_id",
  "auth_atom_id",
  "pdbx_PDB_model_num",
];

function atomSiteMmcif(
  rows: string[],
  columns: string[] = MMCIF_COLUMNS,
  extra = ""
): string {
  const headers = columns.map((column) => `_atom_site.${column}`).join("\n");
  return `data_TEST
#
loop_
${headers}
${rows.join("\n")}
#
${extra}`;
}

function atomRow(overrides: {
  atom?: string;
  b?: string;
  chain?: string;
  group?: string;
  id?: number;
  ins?: string;
  seq?: number;
}): string {
  const {
    atom = "N",
    b = "13.79",
    chain = "A",
    group = "ATOM",
    id = 1,
    ins = "?",
    seq = 1,
  } = overrides;

  return [
    group,
    String(id),
    atom === "N" ? "N" : "C",
    atom,
    ".",
    "THR",
    chain,
    "1",
    String(seq),
    ins,
    "17.047",
    "14.099",
    "3.625",
    "1.00",
    b,
    String(seq),
    "THR",
    chain,
    atom,
    "1",
  ].join(" ");
}

function mmcifBFactor(mmcif: string, rowIndex = 0): string {
  const lines = mmcif.split("\n");
  const columns: string[] = [];
  const rows: string[] = [];
  let inAtomSite = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("_atom_site.")) {
      inAtomSite = true;
      columns.push(trimmed.slice("_atom_site.".length));
      continue;
    }
    if (
      inAtomSite &&
      trimmed &&
      !trimmed.startsWith("#") &&
      !trimmed.startsWith("_") &&
      trimmed !== "loop_"
    ) {
      rows.push(trimmed);
    }
  }

  const bIndex = columns.indexOf("B_iso_or_equiv");
  return (rows[rowIndex] as string).split(/\s+/)[bIndex] as string;
}

describe("injectPlddtIntoMmcif", () => {
  const ROW_1 = atomRow({ id: 1, seq: 1 });
  const ROW_2 = atomRow({ atom: "CA", id: 2, seq: 1 });
  const ROW_3 = atomRow({ id: 3, seq: 2 });

  it("writes the score into B_iso_or_equiv, scaled to 0-100", () => {
    expect(
      mmcifBFactor(injectPlddtIntoMmcif(atomSiteMmcif([ROW_1]), [0.94]))
    ).toBe("94.00");
  });

  it("gives every atom of a residue the same score", () => {
    const rewritten = injectPlddtIntoMmcif(
      atomSiteMmcif([ROW_1, ROW_2]),
      [0.5]
    );
    expect(mmcifBFactor(rewritten, 0)).toBe("50.00");
    expect(mmcifBFactor(rewritten, 1)).toBe("50.00");
  });

  it("advances to the next score when the residue number changes", () => {
    const rewritten = injectPlddtIntoMmcif(
      atomSiteMmcif([ROW_1, ROW_2, ROW_3]),
      [0.5, 0.8]
    );
    expect(mmcifBFactor(rewritten, 0)).toBe("50.00");
    expect(mmcifBFactor(rewritten, 1)).toBe("50.00");
    expect(mmcifBFactor(rewritten, 2)).toBe("80.00");
  });

  it("falls back to mid confidence for residues past the end of the scores", () => {
    const rewritten = injectPlddtIntoMmcif(
      atomSiteMmcif([ROW_1, ROW_3]),
      [0.94]
    );
    expect(mmcifBFactor(rewritten, 0)).toBe("94.00");
    expect(mmcifBFactor(rewritten, 1)).toBe("50.00");
  });

  it("leaves non-atom-site loops alone", () => {
    const extra = `loop_
_entity.id
_entity.type
1 polymer
`;
    const rewritten = injectPlddtIntoMmcif(
      atomSiteMmcif([ROW_1], MMCIF_COLUMNS, extra),
      [0.94]
    );
    expect(rewritten).toContain("_entity.id");
    expect(rewritten).toContain("1 polymer");
  });

  it("processes HETATM records too", () => {
    const hetatm = atomRow({ group: "HETATM" });
    expect(
      mmcifBFactor(injectPlddtIntoMmcif(atomSiteMmcif([hetatm]), [0.25]))
    ).toBe("25.00");
  });

  it("appends B_iso_or_equiv when the column is missing", () => {
    const withoutB = MMCIF_COLUMNS.filter(
      (column) => column !== "B_iso_or_equiv"
    );
    const row = [
      "ATOM",
      "1",
      "N",
      "N",
      ".",
      "THR",
      "A",
      "1",
      "1",
      "?",
      "17.047",
      "14.099",
      "3.625",
      "1.00",
      "1",
      "THR",
      "A",
      "N",
      "1",
    ].join(" ");
    const rewritten = injectPlddtIntoMmcif(
      atomSiteMmcif([row], withoutB),
      [0.94]
    );
    expect(rewritten).toContain("_atom_site.B_iso_or_equiv");
    expect(mmcifBFactor(rewritten)).toBe("94.00");
  });

  describe("insertion codes", () => {
    it("treats residues differing only by insertion code as separate", () => {
      const rewritten = injectPlddtIntoMmcif(
        atomSiteMmcif([
          atomRow({ id: 1, ins: "?", seq: 42 }),
          atomRow({ id: 2, ins: "A", seq: 42 }),
          atomRow({ id: 3, ins: "B", seq: 42 }),
        ]),
        [0.1, 0.2, 0.3]
      );

      expect(mmcifBFactor(rewritten, 0)).toBe("10.00");
      expect(mmcifBFactor(rewritten, 1)).toBe("20.00");
      expect(mmcifBFactor(rewritten, 2)).toBe("30.00");
    });

    it("keeps the residues after an insertion on their own scores", () => {
      const rewritten = injectPlddtIntoMmcif(
        atomSiteMmcif([
          atomRow({ id: 1, ins: "?", seq: 42 }),
          atomRow({ id: 2, ins: "A", seq: 42 }),
          atomRow({ id: 3, ins: "?", seq: 43 }),
        ]),
        [0.1, 0.2, 0.3]
      );

      expect(mmcifBFactor(rewritten, 2)).toBe("30.00");
    });
  });

  it("treats a repeated residue number in a new chain as a new residue", () => {
    const rewritten = injectPlddtIntoMmcif(
      atomSiteMmcif([
        atomRow({ chain: "A", id: 1, seq: 1 }),
        atomRow({ chain: "B", id: 2, seq: 1 }),
      ]),
      [0.9, 0.3]
    );
    expect(mmcifBFactor(rewritten, 0)).toBe("90.00");
    expect(mmcifBFactor(rewritten, 1)).toBe("30.00");
  });

  it("hands out one score per residue across a whole structure", () => {
    const rewritten = injectPlddtIntoMmcif(CRAMBIN_MMCIF, CRAMBIN_PLDDT);
    const last = CRAMBIN_PLDDT[CRAMBIN_PLDDT.length - 1] as number;
    const atomRows = rewritten
      .split("\n")
      .filter((line) => line.startsWith("ATOM"));

    expect(mmcifBFactor(rewritten, atomRows.length - 1)).toBe(
      (last * 100).toFixed(2)
    );
  });
});

describe("injectPlddt", () => {
  it("dispatches PDB text to the PDB rewriter", () => {
    const [line] = injectPlddt(ATOM_1, [0.94]).split("\n");
    expect(bFactorOf(line as string)).toBe(" 94.00");
  });

  it("dispatches mmCIF text to the mmCIF rewriter", () => {
    const mmcif = atomSiteMmcif([atomRow({ id: 1, seq: 1 })]);
    expect(mmcifBFactor(injectPlddt(mmcif, [0.94]))).toBe("94.00");
  });

  it("honours an explicit format even when detection would disagree", () => {
    expect(injectPlddt(ATOM_1, [0.94], "mmcif")).toBe(ATOM_1);
  });
});

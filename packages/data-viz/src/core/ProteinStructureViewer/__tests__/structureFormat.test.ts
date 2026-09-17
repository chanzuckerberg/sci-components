import { detectStructureFormat } from "../utils/structureFormat";

describe("detectStructureFormat", () => {
  it("reads PDB coordinate records as pdb", () => {
    expect(
      detectStructureFormat(
        "ATOM      1  N   THR A   1      17.047  14.099   3.625  1.00 13.79           N"
      )
    ).toBe("pdb");
  });

  it("reads a data_ block as mmcif", () => {
    expect(detectStructureFormat("data_1CRN\n_entry.id 1CRN\n")).toBe("mmcif");
  });

  it("reads a leading comment before data_ as mmcif", () => {
    expect(detectStructureFormat("# This is a mmCIF file\ndata_1CRN\n")).toBe(
      "mmcif"
    );
  });

  it("reads an _atom_site. loop as mmcif", () => {
    expect(
      detectStructureFormat(
        "loop_\n_atom_site.group_PDB\nATOM 1 N N . THR A 1 1 ? 1 1 1 1.00 0.00 1 THR A N 1\n"
      )
    ).toBe("mmcif");
  });
});

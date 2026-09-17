import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// \`structure\` accepts mmCIF (PDBx) as well as PDB. The viewer detects the
// format from the text.
//
// The structure below is crambin (PDB 1CRN), trimmed to the backbone atoms the
// polymer cartoon traces. A chain needs enough residues to trace: a single
// residue renders an empty canvas.

import { ProteinStructureViewer } from "@czi-sds/data-viz";

const MMCIF = \`data_1CRN
#
loop_
_atom_site.group_PDB
_atom_site.id
_atom_site.type_symbol
_atom_site.label_atom_id
_atom_site.label_alt_id
_atom_site.label_comp_id
_atom_site.label_asym_id
_atom_site.label_entity_id
_atom_site.label_seq_id
_atom_site.pdbx_PDB_ins_code
_atom_site.Cartn_x
_atom_site.Cartn_y
_atom_site.Cartn_z
_atom_site.occupancy
_atom_site.B_iso_or_equiv
_atom_site.auth_seq_id
_atom_site.auth_comp_id
_atom_site.auth_asym_id
_atom_site.auth_atom_id
_atom_site.pdbx_PDB_model_num
ATOM 1 N N . THR A 1 1 ? 17.047 14.099 3.625 1.00 13.79 1 THR A N 1
ATOM 2 C CA . THR A 1 1 ? 16.967 12.784 4.338 1.00 10.80 1 THR A CA 1
ATOM 3 C C . THR A 1 1 ? 15.685 12.755 5.133 1.00 9.19 1 THR A C 1
ATOM 4 O O . THR A 1 1 ? 15.268 13.825 5.594 1.00 9.85 1 THR A O 1
ATOM 5 N N . THR A 1 2 ? 15.115 11.555 5.265 1.00 7.81 2 THR A N 1
ATOM 6 C CA . THR A 1 2 ? 13.856 11.469 6.066 1.00 8.31 2 THR A CA 1
ATOM 7 C C . THR A 1 2 ? 14.164 10.785 7.379 1.00 5.80 2 THR A C 1
ATOM 8 O O . THR A 1 2 ? 14.993 9.862 7.443 1.00 6.94 2 THR A O 1
ATOM 9 N N . CYS A 1 3 ? 13.488 11.241 8.417 1.00 5.24 3 CYS A N 1
ATOM 10 C CA . CYS A 1 3 ? 13.660 10.707 9.787 1.00 5.39 3 CYS A CA 1
ATOM 11 C C . CYS A 1 3 ? 12.269 10.431 10.323 1.00 4.45 3 CYS A C 1
ATOM 12 O O . CYS A 1 3 ? 11.393 11.308 10.185 1.00 6.54 3 CYS A O 1
ATOM 13 N N . CYS A 1 4 ? 12.019 9.272 10.928 1.00 3.90 4 CYS A N 1
ATOM 14 C CA . CYS A 1 4 ? 10.646 8.991 11.408 1.00 4.24 4 CYS A CA 1
ATOM 15 C C . CYS A 1 4 ? 10.654 8.793 12.919 1.00 3.72 4 CYS A C 1
ATOM 16 O O . CYS A 1 4 ? 11.659 8.296 13.491 1.00 5.30 4 CYS A O 1
ATOM 17 N N . PRO A 1 5 ? 9.561 9.108 13.563 1.00 3.96 5 PRO A N 1
ATOM 18 C CA . PRO A 1 5 ? 9.448 9.034 15.012 1.00 4.25 5 PRO A CA 1
ATOM 19 C C . PRO A 1 5 ? 9.288 7.670 15.606 1.00 4.96 5 PRO A C 1
ATOM 20 O O . PRO A 1 5 ? 9.490 7.519 16.819 1.00 7.44 5 PRO A O 1
ATOM 21 N N . SER A 1 6 ? 8.875 6.686 14.796 1.00 4.83 6 SER A N 1
ATOM 22 C CA . SER A 1 6 ? 8.673 5.314 15.279 1.00 4.45 6 SER A CA 1
ATOM 23 C C . SER A 1 6 ? 8.753 4.376 14.083 1.00 4.99 6 SER A C 1
ATOM 24 O O . SER A 1 6 ? 8.726 4.858 12.923 1.00 4.61 6 SER A O 1
ATOM 25 N N . ILE A 1 7 ? 8.881 3.075 14.358 1.00 4.94 7 ILE A N 1
ATOM 26 C CA . ILE A 1 7 ? 8.912 2.083 13.258 1.00 6.33 7 ILE A CA 1
ATOM 27 C C . ILE A 1 7 ? 7.581 2.090 12.506 1.00 5.32 7 ILE A C 1
ATOM 28 O O . ILE A 1 7 ? 7.670 2.031 11.245 1.00 6.85 7 ILE A O 1
ATOM 29 N N . VAL A 1 8 ? 6.458 2.162 13.159 1.00 5.02 8 VAL A N 1
ATOM 30 C CA . VAL A 1 8 ? 5.145 2.209 12.453 1.00 6.93 8 VAL A CA 1
ATOM 31 C C . VAL A 1 8 ? 5.115 3.379 11.461 1.00 5.39 8 VAL A C 1
ATOM 32 O O . VAL A 1 8 ? 4.664 3.268 10.343 1.00 6.30 8 VAL A O 1
#\`;

const PLDDT = [0.45, 0.515, 0.557, 0.569, 0.567, 0.578, 0.618, 0.681];

function App() {
  return (
    <div className="app" style={{ height: 480 }}>
      <ProteinStructureViewer
        structure={MMCIF}
        plddt={PLDDT}
        stats={[
          { label: "Known", value: "62%" },
          { label: "pTM", value: "0.874" },
          { label: "Mean pLDDT", value: "0.781" },
        ]}
      />
    </div>
  );
}

export default App;
`}))();export{t as default};
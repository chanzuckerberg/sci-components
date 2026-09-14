# ProteinStructureViewer

An interactive 3D protein structure viewer built on [Mol\*](https://molstar.org/), with a sequence panel, confidence coloring, per-residue value overlays, and a stats legend.

> **Ships separately:** ProteinStructureViewer comes from `@czi-sds/data-viz`, not `@czi-sds/components`. It also needs `molstar` as a peer dependency. See the Data Viz overview for installation and peer dependencies.

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/data-viz/src/core/ProteinStructureViewer/index.tsx).

## Import

**React TypeScript**

```tsx
import { ProteinStructureViewer } from "@czi-sds/data-viz";
```

## Sizing

The viewer fills its parent. Mol\* sizes its canvas from the laid-out container, so give the parent a real height - a viewer inside a box with no height will wait for one rather than render.

## Code examples

### **Default ProteinStructureViewer**

Raw PDB text is the only required prop. Supplying per-residue `plddt` scores on a 0-1 scale colors the structure by confidence and puts the pLDDT key in the legend.

**Example: DefaultProteinStructureViewer**

```tsx
// Raw PDB text is the only required prop. Adding per-residue pLDDT scores on a
// 0-1 scale colors the structure by confidence and puts the pLDDT key in the
// legend.
//
// The viewer fills its parent, and Mol* sizes its canvas from the laid-out
// container, so the wrapper needs a real height.
//
// The structure below is crambin (PDB 1CRN), trimmed to the backbone atoms the
// polymer cartoon traces. The viewer draws a polymer, so the chain needs enough
// residues to trace: a single residue renders an empty canvas.

import { ProteinStructureViewer } from "@czi-sds/data-viz";

const PDB = `
ATOM      1  N   THR A   1      17.047  14.099   3.625  1.00 13.79           N
ATOM      2  CA  THR A   1      16.967  12.784   4.338  1.00 10.80           C
ATOM      3  C   THR A   1      15.685  12.755   5.133  1.00  9.19           C
ATOM      4  O   THR A   1      15.268  13.825   5.594  1.00  9.85           O
ATOM      5  N   THR A   2      15.115  11.555   5.265  1.00  7.81           N
ATOM      6  CA  THR A   2      13.856  11.469   6.066  1.00  8.31           C
ATOM      7  C   THR A   2      14.164  10.785   7.379  1.00  5.80           C
ATOM      8  O   THR A   2      14.993   9.862   7.443  1.00  6.94           O
ATOM      9  N   CYS A   3      13.488  11.241   8.417  1.00  5.24           N
ATOM     10  CA  CYS A   3      13.660  10.707   9.787  1.00  5.39           C
ATOM     11  C   CYS A   3      12.269  10.431  10.323  1.00  4.45           C
ATOM     12  O   CYS A   3      11.393  11.308  10.185  1.00  6.54           O
ATOM     13  N   CYS A   4      12.019   9.272  10.928  1.00  3.90           N
ATOM     14  CA  CYS A   4      10.646   8.991  11.408  1.00  4.24           C
ATOM     15  C   CYS A   4      10.654   8.793  12.919  1.00  3.72           C
ATOM     16  O   CYS A   4      11.659   8.296  13.491  1.00  5.30           O
ATOM     17  N   PRO A   5       9.561   9.108  13.563  1.00  3.96           N
ATOM     18  CA  PRO A   5       9.448   9.034  15.012  1.00  4.25           C
ATOM     19  C   PRO A   5       9.288   7.670  15.606  1.00  4.96           C
ATOM     20  O   PRO A   5       9.490   7.519  16.819  1.00  7.44           O
ATOM     21  N   SER A   6       8.875   6.686  14.796  1.00  4.83           N
ATOM     22  CA  SER A   6       8.673   5.314  15.279  1.00  4.45           C
ATOM     23  C   SER A   6       8.753   4.376  14.083  1.00  4.99           C
ATOM     24  O   SER A   6       8.726   4.858  12.923  1.00  4.61           O
ATOM     25  N   ILE A   7       8.881   3.075  14.358  1.00  4.94           N
ATOM     26  CA  ILE A   7       8.912   2.083  13.258  1.00  6.33           C
ATOM     27  C   ILE A   7       7.581   2.090  12.506  1.00  5.32           C
ATOM     28  O   ILE A   7       7.670   2.031  11.245  1.00  6.85           O
ATOM     29  N   VAL A   8       6.458   2.162  13.159  1.00  5.02           N
ATOM     30  CA  VAL A   8       5.145   2.209  12.453  1.00  6.93           C
ATOM     31  C   VAL A   8       5.115   3.379  11.461  1.00  5.39           C
ATOM     32  O   VAL A   8       4.664   3.268  10.343  1.00  6.30           O
ATOM     33  N   ALA A   9       5.606   4.546  11.941  1.00  3.73           N
ATOM     34  CA  ALA A   9       5.598   5.767  11.082  1.00  3.56           C
ATOM     35  C   ALA A   9       6.441   5.527   9.850  1.00  4.13           C
ATOM     36  O   ALA A   9       6.052   5.933   8.744  1.00  4.36           O
ATOM     37  N   ARG A  10       7.647   4.909  10.005  1.00  3.73           N
ATOM     38  CA  ARG A  10       8.496   4.609   8.837  1.00  3.38           C
ATOM     39  C   ARG A  10       7.798   3.609   7.876  1.00  3.47           C
ATOM     40  O   ARG A  10       7.878   3.778   6.651  1.00  4.67           O
ATOM     41  N   SER A  11       7.186   2.582   8.445  1.00  5.19           N
ATOM     42  CA  SER A  11       6.500   1.584   7.565  1.00  4.60           C
ATOM     43  C   SER A  11       5.382   2.313   6.773  1.00  4.84           C
ATOM     44  O   SER A  11       5.213   2.016   5.557  1.00  5.84           O
ATOM     45  N   ASN A  12       4.648   3.182   7.446  1.00  3.54           N
ATOM     46  CA  ASN A  12       3.545   3.935   6.751  1.00  4.57           C
ATOM     47  C   ASN A  12       4.107   4.851   5.691  1.00  4.14           C
ATOM     48  O   ASN A  12       3.536   5.001   4.617  1.00  5.52           O
ATOM     49  N   PHE A  13       5.259   5.498   6.005  1.00  3.43           N
ATOM     50  CA  PHE A  13       5.929   6.358   5.055  1.00  3.49           C
ATOM     51  C   PHE A  13       6.304   5.578   3.799  1.00  3.40           C
ATOM     52  O   PHE A  13       6.136   6.072   2.653  1.00  4.07           O
ATOM     53  N   ASN A  14       6.900   4.390   3.989  1.00  3.64           N
ATOM     54  CA  ASN A  14       7.331   3.607   2.791  1.00  4.31           C
ATOM     55  C   ASN A  14       6.116   3.210   1.915  1.00  3.98           C
ATOM     56  O   ASN A  14       6.240   3.144   0.684  1.00  6.22           O
ATOM     57  N   VAL A  15       4.993   2.927   2.571  1.00  3.76           N
ATOM     58  CA  VAL A  15       3.782   2.599   1.742  1.00  3.98           C
ATOM     59  C   VAL A  15       3.296   3.871   1.004  1.00  3.80           C
ATOM     60  O   VAL A  15       2.947   3.817  -0.189  1.00  4.85           O
ATOM     61  N   CYS A  16       3.321   4.987   1.720  1.00  3.79           N
ATOM     62  CA  CYS A  16       2.890   6.285   1.126  1.00  3.54           C
ATOM     63  C   CYS A  16       3.687   6.597  -0.111  1.00  3.48           C
ATOM     64  O   CYS A  16       3.200   7.147  -1.103  1.00  4.63           O
ATOM     65  N   ARG A  17       4.997   6.227  -0.100  1.00  3.99           N
ATOM     66  CA  ARG A  17       5.895   6.489  -1.213  1.00  3.83           C
ATOM     67  C   ARG A  17       5.738   5.560  -2.409  1.00  3.79           C
ATOM     68  O   ARG A  17       6.228   5.901  -3.507  1.00  5.39           O
ATOM     69  N   LEU A  18       5.051   4.411  -2.204  1.00  4.70           N
ATOM     70  CA  LEU A  18       4.933   3.431  -3.326  1.00  5.46           C
ATOM     71  C   LEU A  18       4.397   4.014  -4.620  1.00  5.13           C
ATOM     72  O   LEU A  18       4.988   3.755  -5.687  1.00  5.55           O
ATOM     73  N   PRO A  19       3.329   4.795  -4.543  1.00  4.28           N
ATOM     74  CA  PRO A  19       2.792   5.376  -5.797  1.00  5.38           C
ATOM     75  C   PRO A  19       3.573   6.540  -6.322  1.00  6.30           C
ATOM     76  O   PRO A  19       3.260   7.045  -7.422  1.00  9.62           O
ATOM     77  N   GLY A  20       4.565   7.047  -5.559  1.00  4.94           N
ATOM     78  CA  GLY A  20       5.366   8.191  -6.018  1.00  5.39           C
ATOM     79  C   GLY A  20       5.007   9.481  -5.280  1.00  5.03           C
ATOM     80  O   GLY A  20       5.535  10.510  -5.730  1.00  7.34           O
ATOM     81  N   THR A  21       4.181   9.438  -4.262  1.00  4.10           N
ATOM     82  CA  THR A  21       3.767  10.609  -3.513  1.00  3.94           C
ATOM     83  C   THR A  21       5.017  11.397  -3.042  1.00  3.96           C
ATOM     84  O   THR A  21       5.947  10.757  -2.523  1.00  5.82           O
ATOM     85  N   PRO A  22       4.971  12.703  -3.176  1.00  5.04           N
ATOM     86  CA  PRO A  22       6.143  13.513  -2.696  1.00  4.69           C
ATOM     87  C   PRO A  22       6.400  13.233  -1.225  1.00  4.19           C
ATOM     88  O   PRO A  22       5.485  13.061  -0.382  1.00  4.47           O
ATOM     89  N   GLU A  23       7.728  13.297  -0.921  1.00  5.16           N
ATOM     90  CA  GLU A  23       8.114  13.103   0.500  1.00  5.31           C
ATOM     91  C   GLU A  23       7.427  14.073   1.410  1.00  4.11           C
ATOM     92  O   GLU A  23       7.036  13.682   2.540  1.00  5.11           O
ATOM     93  N   ALA A  24       7.212  15.334   0.966  1.00  4.56           N
ATOM     94  CA  ALA A  24       6.614  16.317   1.913  1.00  4.49           C
ATOM     95  C   ALA A  24       5.212  15.936   2.350  1.00  4.10           C
ATOM     96  O   ALA A  24       4.782  16.166   3.495  1.00  5.64           O
ATOM     97  N   ILE A  25       4.445  15.318   1.405  1.00  4.37           N
ATOM     98  CA  ILE A  25       3.074  14.894   1.756  1.00  5.44           C
ATOM     99  C   ILE A  25       3.085  13.643   2.645  1.00  4.32           C
ATOM    100  O   ILE A  25       2.315  13.523   3.578  1.00  4.72           O
ATOM    101  N   CYS A  26       4.032  12.764   2.313  1.00  3.92           N
ATOM    102  CA  CYS A  26       4.180  11.549   3.187  1.00  4.37           C
ATOM    103  C   CYS A  26       4.632  11.944   4.596  1.00  3.95           C
ATOM    104  O   CYS A  26       4.227  11.252   5.547  1.00  4.74           O
ATOM    105  N   ALA A  27       5.408  13.012   4.694  1.00  3.89           N
ATOM    106  CA  ALA A  27       5.879  13.502   6.026  1.00  4.43           C
ATOM    107  C   ALA A  27       4.696  13.908   6.882  1.00  4.26           C
ATOM    108  O   ALA A  27       4.528  13.422   8.025  1.00  5.44           O
ATOM    109  N   THR A  28       3.827  14.802   6.358  1.00  4.53           N
ATOM    110  CA  THR A  28       2.691  15.221   7.194  1.00  5.08           C
ATOM    111  C   THR A  28       1.672  14.132   7.434  1.00  4.62           C
ATOM    112  O   THR A  28       0.947  14.112   8.468  1.00  7.80           O
ATOM    113  N   TYR A  29       1.621  13.190   6.511  1.00  5.01           N
ATOM    114  CA  TYR A  29       0.715  12.045   6.657  1.00  6.60           C
ATOM    115  C   TYR A  29       1.125  11.125   7.815  1.00  4.92           C
ATOM    116  O   TYR A  29       0.286  10.632   8.545  1.00  7.13           O
ATOM    117  N   THR A  30       2.470  10.984   7.995  1.00  5.31           N
ATOM    118  CA  THR A  30       2.986   9.994   8.950  1.00  5.70           C
ATOM    119  C   THR A  30       3.609  10.505  10.230  1.00  6.28           C
ATOM    120  O   THR A  30       3.766   9.715  11.186  1.00  8.77           O
ATOM    121  N   GLY A  31       3.984  11.764  10.241  1.00  4.99           N
ATOM    122  CA  GLY A  31       4.769  12.336  11.360  1.00  5.50           C
ATOM    123  C   GLY A  31       6.255  12.243  11.106  1.00  4.19           C
ATOM    124  O   GLY A  31       7.037  12.750  11.954  1.00  6.12           O
ATOM    125  N   CYS A  32       6.710  11.631   9.992  1.00  4.30           N
ATOM    126  CA  CYS A  32       8.140  11.694   9.635  1.00  4.89           C
ATOM    127  C   CYS A  32       8.500  13.141   9.206  1.00  5.50           C
ATOM    128  O   CYS A  32       7.581  13.949   8.944  1.00  5.82           O
ATOM    129  N   ILE A  33       9.793  13.410   9.173  1.00  6.02           N
ATOM    130  CA  ILE A  33      10.280  14.760   8.823  1.00  5.24           C
ATOM    131  C   ILE A  33      11.346  14.658   7.743  1.00  5.16           C
ATOM    132  O   ILE A  33      11.971  13.583   7.552  1.00  7.19           O
ATOM    133  N   ILE A  34      11.490  15.773   7.038  1.00  5.52           N
ATOM    134  CA  ILE A  34      12.552  15.877   6.036  1.00  6.82           C
ATOM    135  C   ILE A  34      13.590  16.917   6.560  1.00  6.92           C
ATOM    136  O   ILE A  34      13.168  18.006   6.945  1.00  9.22           O
ATOM    137  N   ILE A  35      14.856  16.493   6.536  1.00  7.06           N
ATOM    138  CA  ILE A  35      15.930  17.454   6.941  1.00  7.52           C
ATOM    139  C   ILE A  35      16.913  17.550   5.819  1.00  6.63           C
ATOM    140  O   ILE A  35      17.097  16.660   4.970  1.00  7.90           O
ATOM    141  N   PRO A  36      17.664  18.669   5.806  1.00  8.07           N
ATOM    142  CA  PRO A  36      18.635  18.861   4.738  1.00  8.78           C
ATOM    143  C   PRO A  36      19.925  18.042   4.949  1.00  8.31           C
ATOM    144  O   PRO A  36      20.593  17.742   3.945  1.00  9.09           O
ATOM    145  N   GLY A  37      20.172  17.730   6.217  1.00  8.48           N
ATOM    146  CA  GLY A  37      21.452  16.969   6.513  1.00  9.20           C
ATOM    147  C   GLY A  37      21.143  15.478   6.427  1.00 10.41           C
ATOM    148  O   GLY A  37      20.138  15.023   5.878  1.00 12.06           O
ATOM    149  N   ALA A  38      22.055  14.701   7.032  1.00  9.24           N
ATOM    150  CA  ALA A  38      22.019  13.242   7.020  1.00  9.24           C
ATOM    151  C   ALA A  38      21.944  12.628   8.396  1.00  9.60           C
ATOM    152  O   ALA A  38      21.869  11.387   8.435  1.00 13.65           O
ATOM    153  N   THR A  39      21.894  13.435   9.436  1.00  8.70           N
ATOM    154  CA  THR A  39      21.936  12.911  10.809  1.00  9.46           C
ATOM    155  C   THR A  39      20.615  13.191  11.521  1.00  8.32           C
ATOM    156  O   THR A  39      20.357  14.317  11.948  1.00  9.89           O
ATOM    157  N   CYS A  40      19.827  12.110  11.642  1.00  7.64           N
ATOM    158  CA  CYS A  40      18.504  12.312  12.298  1.00  8.05           C
ATOM    159  C   CYS A  40      18.684  12.451  13.784  1.00  7.63           C
ATOM    160  O   CYS A  40      19.533  11.718  14.362  1.00  9.64           O
ATOM    161  N   PRO A  41      17.880  13.266  14.426  1.00  8.00           N
ATOM    162  CA  PRO A  41      17.924  13.421  15.877  1.00  8.96           C
ATOM    163  C   PRO A  41      17.392  12.206  16.594  1.00  9.06           C
ATOM    164  O   PRO A  41      16.652  11.368  16.033  1.00  8.82           O
ATOM    165  N   GLY A  42      17.728  12.124  17.884  1.00  7.55           N
ATOM    166  CA  GLY A  42      17.334  10.956  18.691  1.00  8.00           C
ATOM    167  C   GLY A  42      15.875  10.688  18.871  1.00  7.22           C
ATOM    168  O   GLY A  42      15.434   9.550  19.166  1.00  8.41           O
ATOM    169  N   ASP A  43      15.036  11.747  18.715  1.00  5.54           N
ATOM    170  CA  ASP A  43      13.564  11.573  18.836  1.00  5.85           C
ATOM    171  C   ASP A  43      12.936  11.227  17.470  1.00  5.87           C
ATOM    172  O   ASP A  43      11.720  11.040  17.428  1.00  7.29           O
ATOM    173  N   TYR A  44      13.725  11.174  16.425  1.00  5.22           N
ATOM    174  CA  TYR A  44      13.257  10.745  15.081  1.00  5.56           C
ATOM    175  C   TYR A  44      14.275   9.687  14.612  1.00  4.61           C
ATOM    176  O   TYR A  44      14.930   9.862  13.568  1.00  6.04           O
ATOM    177  N   ALA A  45      14.342   8.640  15.422  1.00  4.76           N
ATOM    178  CA  ALA A  45      15.445   7.667  15.246  1.00  5.89           C
ATOM    179  C   ALA A  45      15.171   6.533  14.280  1.00  6.67           C
ATOM    180  O   ALA A  45      16.093   5.705  14.039  1.00  7.56           O
ATOM    181  N   ASN A  46      13.966   6.502  13.739  1.00  5.80           N
ATOM    182  CA  ASN A  46      13.512   5.395  12.878  1.00  6.15           C
ATOM    183  C   ASN A  46      13.311   5.853  11.455  1.00  6.61           C
ATOM    184  O   ASN A  46      13.733   6.929  11.026  1.00  7.18           O
END`;

// One score per residue, in chain order. Residues past the end of the array
// fall back to mid confidence, so a short array leaves most of the chain
// looking uniformly average.
const PLDDT = [
  0.45, 0.515, 0.557, 0.569, 0.567, 0.578, 0.618, 0.681, 0.742, 0.777, 0.782,
  0.773, 0.776, 0.807, 0.86, 0.909, 0.933, 0.924, 0.902, 0.892, 0.91, 0.947,
  0.98, 0.98, 0.961, 0.92, 0.892, 0.892, 0.911, 0.927, 0.915, 0.873, 0.818,
  0.776, 0.762, 0.769, 0.772, 0.748, 0.694, 0.629, 0.578, 0.556, 0.556, 0.552,
  0.522, 0.463,
];

function App() {
  return (
    <div className="app" style={{ height: 480 }}>
      <ProteinStructureViewer
        pdb={PDB}
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
```

### Residue value overlay

A `residueOverlay` paints arbitrary per-residue values over the structure, taking over from pLDDT coloring while it is set. The `values` map is keyed by 0-based residue index, so the first residue of the chain is `0`. Values are normalized into `min`-`max` and sampled from a color scale; residues at or below `min`, and those missing from the map, render in a neutral gray. The legend switches to the overlay's scale and its `label`, and the per-residue readout reports the value under the cursor. `tooltip` is a string on the help icon next to the caption; `tooltipProps` is the SDS Tooltip API, for a subtitle, a custom body, or a different placement.

**Example: ProteinStructureViewerWithOverlay**

```tsx
// A residueOverlay paints arbitrary per-residue values over the structure,
// taking over from pLDDT coloring while it is set.
//
// Values are keyed by 0-based residue index and normalized into min-max before
// being sampled from the color scale. Residues missing from the map, or at or
// below min, render in a neutral gray rather than at the bottom of the scale,
// so "no value here" reads differently from "a low value here".
//
// label captions the legend, readoutLabel names the slot that reports the value
// under the cursor, and tooltip is the help title on the caption. tooltipProps
// reaches the SDS Tooltip for a subtitle, a custom body, or placement.
//
// The structure below is crambin (PDB 1CRN), trimmed to the backbone atoms the
// polymer cartoon traces. An overlay needs a chain long enough to see it on:
// the values here pick out two short stretches, so the rest of the chain stays
// gray and the painted regions stand out against it.

import { ProteinStructureViewer, PLASMA_COLOR_SCALE } from "@czi-sds/data-viz";

const PDB = `
ATOM      1  N   THR A   1      17.047  14.099   3.625  1.00 13.79           N
ATOM      2  CA  THR A   1      16.967  12.784   4.338  1.00 10.80           C
ATOM      3  C   THR A   1      15.685  12.755   5.133  1.00  9.19           C
ATOM      4  O   THR A   1      15.268  13.825   5.594  1.00  9.85           O
ATOM      5  N   THR A   2      15.115  11.555   5.265  1.00  7.81           N
ATOM      6  CA  THR A   2      13.856  11.469   6.066  1.00  8.31           C
ATOM      7  C   THR A   2      14.164  10.785   7.379  1.00  5.80           C
ATOM      8  O   THR A   2      14.993   9.862   7.443  1.00  6.94           O
ATOM      9  N   CYS A   3      13.488  11.241   8.417  1.00  5.24           N
ATOM     10  CA  CYS A   3      13.660  10.707   9.787  1.00  5.39           C
ATOM     11  C   CYS A   3      12.269  10.431  10.323  1.00  4.45           C
ATOM     12  O   CYS A   3      11.393  11.308  10.185  1.00  6.54           O
ATOM     13  N   CYS A   4      12.019   9.272  10.928  1.00  3.90           N
ATOM     14  CA  CYS A   4      10.646   8.991  11.408  1.00  4.24           C
ATOM     15  C   CYS A   4      10.654   8.793  12.919  1.00  3.72           C
ATOM     16  O   CYS A   4      11.659   8.296  13.491  1.00  5.30           O
ATOM     17  N   PRO A   5       9.561   9.108  13.563  1.00  3.96           N
ATOM     18  CA  PRO A   5       9.448   9.034  15.012  1.00  4.25           C
ATOM     19  C   PRO A   5       9.288   7.670  15.606  1.00  4.96           C
ATOM     20  O   PRO A   5       9.490   7.519  16.819  1.00  7.44           O
ATOM     21  N   SER A   6       8.875   6.686  14.796  1.00  4.83           N
ATOM     22  CA  SER A   6       8.673   5.314  15.279  1.00  4.45           C
ATOM     23  C   SER A   6       8.753   4.376  14.083  1.00  4.99           C
ATOM     24  O   SER A   6       8.726   4.858  12.923  1.00  4.61           O
ATOM     25  N   ILE A   7       8.881   3.075  14.358  1.00  4.94           N
ATOM     26  CA  ILE A   7       8.912   2.083  13.258  1.00  6.33           C
ATOM     27  C   ILE A   7       7.581   2.090  12.506  1.00  5.32           C
ATOM     28  O   ILE A   7       7.670   2.031  11.245  1.00  6.85           O
ATOM     29  N   VAL A   8       6.458   2.162  13.159  1.00  5.02           N
ATOM     30  CA  VAL A   8       5.145   2.209  12.453  1.00  6.93           C
ATOM     31  C   VAL A   8       5.115   3.379  11.461  1.00  5.39           C
ATOM     32  O   VAL A   8       4.664   3.268  10.343  1.00  6.30           O
ATOM     33  N   ALA A   9       5.606   4.546  11.941  1.00  3.73           N
ATOM     34  CA  ALA A   9       5.598   5.767  11.082  1.00  3.56           C
ATOM     35  C   ALA A   9       6.441   5.527   9.850  1.00  4.13           C
ATOM     36  O   ALA A   9       6.052   5.933   8.744  1.00  4.36           O
ATOM     37  N   ARG A  10       7.647   4.909  10.005  1.00  3.73           N
ATOM     38  CA  ARG A  10       8.496   4.609   8.837  1.00  3.38           C
ATOM     39  C   ARG A  10       7.798   3.609   7.876  1.00  3.47           C
ATOM     40  O   ARG A  10       7.878   3.778   6.651  1.00  4.67           O
ATOM     41  N   SER A  11       7.186   2.582   8.445  1.00  5.19           N
ATOM     42  CA  SER A  11       6.500   1.584   7.565  1.00  4.60           C
ATOM     43  C   SER A  11       5.382   2.313   6.773  1.00  4.84           C
ATOM     44  O   SER A  11       5.213   2.016   5.557  1.00  5.84           O
ATOM     45  N   ASN A  12       4.648   3.182   7.446  1.00  3.54           N
ATOM     46  CA  ASN A  12       3.545   3.935   6.751  1.00  4.57           C
ATOM     47  C   ASN A  12       4.107   4.851   5.691  1.00  4.14           C
ATOM     48  O   ASN A  12       3.536   5.001   4.617  1.00  5.52           O
ATOM     49  N   PHE A  13       5.259   5.498   6.005  1.00  3.43           N
ATOM     50  CA  PHE A  13       5.929   6.358   5.055  1.00  3.49           C
ATOM     51  C   PHE A  13       6.304   5.578   3.799  1.00  3.40           C
ATOM     52  O   PHE A  13       6.136   6.072   2.653  1.00  4.07           O
ATOM     53  N   ASN A  14       6.900   4.390   3.989  1.00  3.64           N
ATOM     54  CA  ASN A  14       7.331   3.607   2.791  1.00  4.31           C
ATOM     55  C   ASN A  14       6.116   3.210   1.915  1.00  3.98           C
ATOM     56  O   ASN A  14       6.240   3.144   0.684  1.00  6.22           O
ATOM     57  N   VAL A  15       4.993   2.927   2.571  1.00  3.76           N
ATOM     58  CA  VAL A  15       3.782   2.599   1.742  1.00  3.98           C
ATOM     59  C   VAL A  15       3.296   3.871   1.004  1.00  3.80           C
ATOM     60  O   VAL A  15       2.947   3.817  -0.189  1.00  4.85           O
ATOM     61  N   CYS A  16       3.321   4.987   1.720  1.00  3.79           N
ATOM     62  CA  CYS A  16       2.890   6.285   1.126  1.00  3.54           C
ATOM     63  C   CYS A  16       3.687   6.597  -0.111  1.00  3.48           C
ATOM     64  O   CYS A  16       3.200   7.147  -1.103  1.00  4.63           O
ATOM     65  N   ARG A  17       4.997   6.227  -0.100  1.00  3.99           N
ATOM     66  CA  ARG A  17       5.895   6.489  -1.213  1.00  3.83           C
ATOM     67  C   ARG A  17       5.738   5.560  -2.409  1.00  3.79           C
ATOM     68  O   ARG A  17       6.228   5.901  -3.507  1.00  5.39           O
ATOM     69  N   LEU A  18       5.051   4.411  -2.204  1.00  4.70           N
ATOM     70  CA  LEU A  18       4.933   3.431  -3.326  1.00  5.46           C
ATOM     71  C   LEU A  18       4.397   4.014  -4.620  1.00  5.13           C
ATOM     72  O   LEU A  18       4.988   3.755  -5.687  1.00  5.55           O
ATOM     73  N   PRO A  19       3.329   4.795  -4.543  1.00  4.28           N
ATOM     74  CA  PRO A  19       2.792   5.376  -5.797  1.00  5.38           C
ATOM     75  C   PRO A  19       3.573   6.540  -6.322  1.00  6.30           C
ATOM     76  O   PRO A  19       3.260   7.045  -7.422  1.00  9.62           O
ATOM     77  N   GLY A  20       4.565   7.047  -5.559  1.00  4.94           N
ATOM     78  CA  GLY A  20       5.366   8.191  -6.018  1.00  5.39           C
ATOM     79  C   GLY A  20       5.007   9.481  -5.280  1.00  5.03           C
ATOM     80  O   GLY A  20       5.535  10.510  -5.730  1.00  7.34           O
ATOM     81  N   THR A  21       4.181   9.438  -4.262  1.00  4.10           N
ATOM     82  CA  THR A  21       3.767  10.609  -3.513  1.00  3.94           C
ATOM     83  C   THR A  21       5.017  11.397  -3.042  1.00  3.96           C
ATOM     84  O   THR A  21       5.947  10.757  -2.523  1.00  5.82           O
ATOM     85  N   PRO A  22       4.971  12.703  -3.176  1.00  5.04           N
ATOM     86  CA  PRO A  22       6.143  13.513  -2.696  1.00  4.69           C
ATOM     87  C   PRO A  22       6.400  13.233  -1.225  1.00  4.19           C
ATOM     88  O   PRO A  22       5.485  13.061  -0.382  1.00  4.47           O
ATOM     89  N   GLU A  23       7.728  13.297  -0.921  1.00  5.16           N
ATOM     90  CA  GLU A  23       8.114  13.103   0.500  1.00  5.31           C
ATOM     91  C   GLU A  23       7.427  14.073   1.410  1.00  4.11           C
ATOM     92  O   GLU A  23       7.036  13.682   2.540  1.00  5.11           O
ATOM     93  N   ALA A  24       7.212  15.334   0.966  1.00  4.56           N
ATOM     94  CA  ALA A  24       6.614  16.317   1.913  1.00  4.49           C
ATOM     95  C   ALA A  24       5.212  15.936   2.350  1.00  4.10           C
ATOM     96  O   ALA A  24       4.782  16.166   3.495  1.00  5.64           O
ATOM     97  N   ILE A  25       4.445  15.318   1.405  1.00  4.37           N
ATOM     98  CA  ILE A  25       3.074  14.894   1.756  1.00  5.44           C
ATOM     99  C   ILE A  25       3.085  13.643   2.645  1.00  4.32           C
ATOM    100  O   ILE A  25       2.315  13.523   3.578  1.00  4.72           O
ATOM    101  N   CYS A  26       4.032  12.764   2.313  1.00  3.92           N
ATOM    102  CA  CYS A  26       4.180  11.549   3.187  1.00  4.37           C
ATOM    103  C   CYS A  26       4.632  11.944   4.596  1.00  3.95           C
ATOM    104  O   CYS A  26       4.227  11.252   5.547  1.00  4.74           O
ATOM    105  N   ALA A  27       5.408  13.012   4.694  1.00  3.89           N
ATOM    106  CA  ALA A  27       5.879  13.502   6.026  1.00  4.43           C
ATOM    107  C   ALA A  27       4.696  13.908   6.882  1.00  4.26           C
ATOM    108  O   ALA A  27       4.528  13.422   8.025  1.00  5.44           O
ATOM    109  N   THR A  28       3.827  14.802   6.358  1.00  4.53           N
ATOM    110  CA  THR A  28       2.691  15.221   7.194  1.00  5.08           C
ATOM    111  C   THR A  28       1.672  14.132   7.434  1.00  4.62           C
ATOM    112  O   THR A  28       0.947  14.112   8.468  1.00  7.80           O
ATOM    113  N   TYR A  29       1.621  13.190   6.511  1.00  5.01           N
ATOM    114  CA  TYR A  29       0.715  12.045   6.657  1.00  6.60           C
ATOM    115  C   TYR A  29       1.125  11.125   7.815  1.00  4.92           C
ATOM    116  O   TYR A  29       0.286  10.632   8.545  1.00  7.13           O
ATOM    117  N   THR A  30       2.470  10.984   7.995  1.00  5.31           N
ATOM    118  CA  THR A  30       2.986   9.994   8.950  1.00  5.70           C
ATOM    119  C   THR A  30       3.609  10.505  10.230  1.00  6.28           C
ATOM    120  O   THR A  30       3.766   9.715  11.186  1.00  8.77           O
ATOM    121  N   GLY A  31       3.984  11.764  10.241  1.00  4.99           N
ATOM    122  CA  GLY A  31       4.769  12.336  11.360  1.00  5.50           C
ATOM    123  C   GLY A  31       6.255  12.243  11.106  1.00  4.19           C
ATOM    124  O   GLY A  31       7.037  12.750  11.954  1.00  6.12           O
ATOM    125  N   CYS A  32       6.710  11.631   9.992  1.00  4.30           N
ATOM    126  CA  CYS A  32       8.140  11.694   9.635  1.00  4.89           C
ATOM    127  C   CYS A  32       8.500  13.141   9.206  1.00  5.50           C
ATOM    128  O   CYS A  32       7.581  13.949   8.944  1.00  5.82           O
ATOM    129  N   ILE A  33       9.793  13.410   9.173  1.00  6.02           N
ATOM    130  CA  ILE A  33      10.280  14.760   8.823  1.00  5.24           C
ATOM    131  C   ILE A  33      11.346  14.658   7.743  1.00  5.16           C
ATOM    132  O   ILE A  33      11.971  13.583   7.552  1.00  7.19           O
ATOM    133  N   ILE A  34      11.490  15.773   7.038  1.00  5.52           N
ATOM    134  CA  ILE A  34      12.552  15.877   6.036  1.00  6.82           C
ATOM    135  C   ILE A  34      13.590  16.917   6.560  1.00  6.92           C
ATOM    136  O   ILE A  34      13.168  18.006   6.945  1.00  9.22           O
ATOM    137  N   ILE A  35      14.856  16.493   6.536  1.00  7.06           N
ATOM    138  CA  ILE A  35      15.930  17.454   6.941  1.00  7.52           C
ATOM    139  C   ILE A  35      16.913  17.550   5.819  1.00  6.63           C
ATOM    140  O   ILE A  35      17.097  16.660   4.970  1.00  7.90           O
ATOM    141  N   PRO A  36      17.664  18.669   5.806  1.00  8.07           N
ATOM    142  CA  PRO A  36      18.635  18.861   4.738  1.00  8.78           C
ATOM    143  C   PRO A  36      19.925  18.042   4.949  1.00  8.31           C
ATOM    144  O   PRO A  36      20.593  17.742   3.945  1.00  9.09           O
ATOM    145  N   GLY A  37      20.172  17.730   6.217  1.00  8.48           N
ATOM    146  CA  GLY A  37      21.452  16.969   6.513  1.00  9.20           C
ATOM    147  C   GLY A  37      21.143  15.478   6.427  1.00 10.41           C
ATOM    148  O   GLY A  37      20.138  15.023   5.878  1.00 12.06           O
ATOM    149  N   ALA A  38      22.055  14.701   7.032  1.00  9.24           N
ATOM    150  CA  ALA A  38      22.019  13.242   7.020  1.00  9.24           C
ATOM    151  C   ALA A  38      21.944  12.628   8.396  1.00  9.60           C
ATOM    152  O   ALA A  38      21.869  11.387   8.435  1.00 13.65           O
ATOM    153  N   THR A  39      21.894  13.435   9.436  1.00  8.70           N
ATOM    154  CA  THR A  39      21.936  12.911  10.809  1.00  9.46           C
ATOM    155  C   THR A  39      20.615  13.191  11.521  1.00  8.32           C
ATOM    156  O   THR A  39      20.357  14.317  11.948  1.00  9.89           O
ATOM    157  N   CYS A  40      19.827  12.110  11.642  1.00  7.64           N
ATOM    158  CA  CYS A  40      18.504  12.312  12.298  1.00  8.05           C
ATOM    159  C   CYS A  40      18.684  12.451  13.784  1.00  7.63           C
ATOM    160  O   CYS A  40      19.533  11.718  14.362  1.00  9.64           O
ATOM    161  N   PRO A  41      17.880  13.266  14.426  1.00  8.00           N
ATOM    162  CA  PRO A  41      17.924  13.421  15.877  1.00  8.96           C
ATOM    163  C   PRO A  41      17.392  12.206  16.594  1.00  9.06           C
ATOM    164  O   PRO A  41      16.652  11.368  16.033  1.00  8.82           O
ATOM    165  N   GLY A  42      17.728  12.124  17.884  1.00  7.55           N
ATOM    166  CA  GLY A  42      17.334  10.956  18.691  1.00  8.00           C
ATOM    167  C   GLY A  42      15.875  10.688  18.871  1.00  7.22           C
ATOM    168  O   GLY A  42      15.434   9.550  19.166  1.00  8.41           O
ATOM    169  N   ASP A  43      15.036  11.747  18.715  1.00  5.54           N
ATOM    170  CA  ASP A  43      13.564  11.573  18.836  1.00  5.85           C
ATOM    171  C   ASP A  43      12.936  11.227  17.470  1.00  5.87           C
ATOM    172  O   ASP A  43      11.720  11.040  17.428  1.00  7.29           O
ATOM    173  N   TYR A  44      13.725  11.174  16.425  1.00  5.22           N
ATOM    174  CA  TYR A  44      13.257  10.745  15.081  1.00  5.56           C
ATOM    175  C   TYR A  44      14.275   9.687  14.612  1.00  4.61           C
ATOM    176  O   TYR A  44      14.930   9.862  13.568  1.00  6.04           O
ATOM    177  N   ALA A  45      14.342   8.640  15.422  1.00  4.76           N
ATOM    178  CA  ALA A  45      15.445   7.667  15.246  1.00  5.89           C
ATOM    179  C   ALA A  45      15.171   6.533  14.280  1.00  6.67           C
ATOM    180  O   ALA A  45      16.093   5.705  14.039  1.00  7.56           O
ATOM    181  N   ASN A  46      13.966   6.502  13.739  1.00  5.80           N
ATOM    182  CA  ASN A  46      13.512   5.395  12.878  1.00  6.15           C
ATOM    183  C   ASN A  46      13.311   5.853  11.455  1.00  6.61           C
ATOM    184  O   ASN A  46      13.733   6.929  11.026  1.00  7.18           O
END`;

// Two stretches of the chain carry a value, peaking at 2.4 in the middle of
// each. Residue 8 is the ninth residue of the chain, since the map is 0-based.
const RESIDUE_VALUES = new Map([
  [8, 1.2],
  [9, 1.6],
  [10, 2.0],
  [11, 2.4],
  [12, 2.0],
  [13, 1.6],
  [14, 1.2],
  [28, 0.96],
  [29, 1.44],
  [30, 1.92],
  [31, 2.4],
  [32, 1.92],
  [33, 1.44],
]);

function App() {
  return (
    <div className="app" style={{ height: 480 }}>
      <ProteinStructureViewer
        pdb={PDB}
        residueOverlay={{
          colorScale: PLASMA_COLOR_SCALE,
          label: "Feature activation",
          max: 2.4,
          readoutLabel: "Activation",
          tooltip: "Max activation across all residues for this feature",
          tooltipProps: {
            subtitle: "Residues at or below min stay gray.",
          },
          values: RESIDUE_VALUES,
        }}
      />
    </div>
  );
}

export default App;
```

### Selection and stats

Selection is controlled through one prop. Every way of making one - clicking a residue, dragging across the sequence, clicking a chain's caption - arrives through `onSelectionChange`; echoing it back through `selection` frames it, and setting `null` zooms back out. Clicking empty space calls `onSelectionChange` with `null`.

A `StructureSelection` says what is selected in either of two ways, which combine: `residues` is a list of 0-based indices, and `chains` names whole chains by `chainId`. A drag across the sequence comes back as `residues`, a chain caption as `chains`, so a whole-chain selection survives the round trip at its original size rather than as the hundreds of indices it stands for. The camera frames whatever the selection covers, so a range or a chain is fitted to the view rather than approached as a point.

`onResidueClick` and `onResidueHover` are separate, and still report a single `ResidueRef`: they describe the residue under the pointer, which is a different fact from what the selection covers. Use them for a readout that follows the cursor, and `onSelectionChange` for what the user has actually chosen.

A `ResidueRef` carries the residue in each addressing scheme a caller might need. `index` is the viewer's own key, shared with `plddt` and `residueOverlay`, and counts residues in file order straight through a chain break. `chainId` and `seqId` are what the file says, which is what the sequence panel displays and what the system that produced the structure will recognise. On a single chain numbered from 1 the two agree; on a complex they do not, so map a click back onto your own numbering with `chainId` and `seqId` rather than arithmetic on `index`.

`stats` fills the three legend slots along the bottom. Those slots are replaced in place while a residue is hovered or selected - by the residue label, its overlay value, and its pLDDT - so the columns never shift. Pass `null` for a slot to reserve its column without rendering anything.

**Example: SelectableProteinStructureViewer**

```tsx
// Selection is controlled, so the parent decides what a click means. Here a
// click selects the residue and clicking it again clears it, which is what makes
// the camera zoom in and then back out. Everything the user can select - one
// residue, a range dragged across the sequence, a whole chain - arrives through
// the one onSelectionChange callback.
//
// The stats slots are replaced in place while a residue is hovered or selected,
// so the three columns never shift. A null slot reserves its column without
// rendering anything - useful when a stat is still loading.
//
// The structure below is crambin (PDB 1CRN), trimmed to the backbone atoms the
// polymer cartoon traces. onResidueClick hands back a ResidueRef; its `index`
// is the 0-based position a selection's `residues` takes, while `chainId` and
// `seqId` carry the numbering the file uses.

import { ProteinStructureViewer, StructureSelection } from "@czi-sds/data-viz";
import { useState } from "react";

const PDB = `
ATOM      1  N   THR A   1      17.047  14.099   3.625  1.00 13.79           N
ATOM      2  CA  THR A   1      16.967  12.784   4.338  1.00 10.80           C
ATOM      3  C   THR A   1      15.685  12.755   5.133  1.00  9.19           C
ATOM      4  O   THR A   1      15.268  13.825   5.594  1.00  9.85           O
ATOM      5  N   THR A   2      15.115  11.555   5.265  1.00  7.81           N
ATOM      6  CA  THR A   2      13.856  11.469   6.066  1.00  8.31           C
ATOM      7  C   THR A   2      14.164  10.785   7.379  1.00  5.80           C
ATOM      8  O   THR A   2      14.993   9.862   7.443  1.00  6.94           O
ATOM      9  N   CYS A   3      13.488  11.241   8.417  1.00  5.24           N
ATOM     10  CA  CYS A   3      13.660  10.707   9.787  1.00  5.39           C
ATOM     11  C   CYS A   3      12.269  10.431  10.323  1.00  4.45           C
ATOM     12  O   CYS A   3      11.393  11.308  10.185  1.00  6.54           O
ATOM     13  N   CYS A   4      12.019   9.272  10.928  1.00  3.90           N
ATOM     14  CA  CYS A   4      10.646   8.991  11.408  1.00  4.24           C
ATOM     15  C   CYS A   4      10.654   8.793  12.919  1.00  3.72           C
ATOM     16  O   CYS A   4      11.659   8.296  13.491  1.00  5.30           O
ATOM     17  N   PRO A   5       9.561   9.108  13.563  1.00  3.96           N
ATOM     18  CA  PRO A   5       9.448   9.034  15.012  1.00  4.25           C
ATOM     19  C   PRO A   5       9.288   7.670  15.606  1.00  4.96           C
ATOM     20  O   PRO A   5       9.490   7.519  16.819  1.00  7.44           O
ATOM     21  N   SER A   6       8.875   6.686  14.796  1.00  4.83           N
ATOM     22  CA  SER A   6       8.673   5.314  15.279  1.00  4.45           C
ATOM     23  C   SER A   6       8.753   4.376  14.083  1.00  4.99           C
ATOM     24  O   SER A   6       8.726   4.858  12.923  1.00  4.61           O
ATOM     25  N   ILE A   7       8.881   3.075  14.358  1.00  4.94           N
ATOM     26  CA  ILE A   7       8.912   2.083  13.258  1.00  6.33           C
ATOM     27  C   ILE A   7       7.581   2.090  12.506  1.00  5.32           C
ATOM     28  O   ILE A   7       7.670   2.031  11.245  1.00  6.85           O
ATOM     29  N   VAL A   8       6.458   2.162  13.159  1.00  5.02           N
ATOM     30  CA  VAL A   8       5.145   2.209  12.453  1.00  6.93           C
ATOM     31  C   VAL A   8       5.115   3.379  11.461  1.00  5.39           C
ATOM     32  O   VAL A   8       4.664   3.268  10.343  1.00  6.30           O
ATOM     33  N   ALA A   9       5.606   4.546  11.941  1.00  3.73           N
ATOM     34  CA  ALA A   9       5.598   5.767  11.082  1.00  3.56           C
ATOM     35  C   ALA A   9       6.441   5.527   9.850  1.00  4.13           C
ATOM     36  O   ALA A   9       6.052   5.933   8.744  1.00  4.36           O
ATOM     37  N   ARG A  10       7.647   4.909  10.005  1.00  3.73           N
ATOM     38  CA  ARG A  10       8.496   4.609   8.837  1.00  3.38           C
ATOM     39  C   ARG A  10       7.798   3.609   7.876  1.00  3.47           C
ATOM     40  O   ARG A  10       7.878   3.778   6.651  1.00  4.67           O
ATOM     41  N   SER A  11       7.186   2.582   8.445  1.00  5.19           N
ATOM     42  CA  SER A  11       6.500   1.584   7.565  1.00  4.60           C
ATOM     43  C   SER A  11       5.382   2.313   6.773  1.00  4.84           C
ATOM     44  O   SER A  11       5.213   2.016   5.557  1.00  5.84           O
ATOM     45  N   ASN A  12       4.648   3.182   7.446  1.00  3.54           N
ATOM     46  CA  ASN A  12       3.545   3.935   6.751  1.00  4.57           C
ATOM     47  C   ASN A  12       4.107   4.851   5.691  1.00  4.14           C
ATOM     48  O   ASN A  12       3.536   5.001   4.617  1.00  5.52           O
ATOM     49  N   PHE A  13       5.259   5.498   6.005  1.00  3.43           N
ATOM     50  CA  PHE A  13       5.929   6.358   5.055  1.00  3.49           C
ATOM     51  C   PHE A  13       6.304   5.578   3.799  1.00  3.40           C
ATOM     52  O   PHE A  13       6.136   6.072   2.653  1.00  4.07           O
ATOM     53  N   ASN A  14       6.900   4.390   3.989  1.00  3.64           N
ATOM     54  CA  ASN A  14       7.331   3.607   2.791  1.00  4.31           C
ATOM     55  C   ASN A  14       6.116   3.210   1.915  1.00  3.98           C
ATOM     56  O   ASN A  14       6.240   3.144   0.684  1.00  6.22           O
ATOM     57  N   VAL A  15       4.993   2.927   2.571  1.00  3.76           N
ATOM     58  CA  VAL A  15       3.782   2.599   1.742  1.00  3.98           C
ATOM     59  C   VAL A  15       3.296   3.871   1.004  1.00  3.80           C
ATOM     60  O   VAL A  15       2.947   3.817  -0.189  1.00  4.85           O
ATOM     61  N   CYS A  16       3.321   4.987   1.720  1.00  3.79           N
ATOM     62  CA  CYS A  16       2.890   6.285   1.126  1.00  3.54           C
ATOM     63  C   CYS A  16       3.687   6.597  -0.111  1.00  3.48           C
ATOM     64  O   CYS A  16       3.200   7.147  -1.103  1.00  4.63           O
ATOM     65  N   ARG A  17       4.997   6.227  -0.100  1.00  3.99           N
ATOM     66  CA  ARG A  17       5.895   6.489  -1.213  1.00  3.83           C
ATOM     67  C   ARG A  17       5.738   5.560  -2.409  1.00  3.79           C
ATOM     68  O   ARG A  17       6.228   5.901  -3.507  1.00  5.39           O
ATOM     69  N   LEU A  18       5.051   4.411  -2.204  1.00  4.70           N
ATOM     70  CA  LEU A  18       4.933   3.431  -3.326  1.00  5.46           C
ATOM     71  C   LEU A  18       4.397   4.014  -4.620  1.00  5.13           C
ATOM     72  O   LEU A  18       4.988   3.755  -5.687  1.00  5.55           O
ATOM     73  N   PRO A  19       3.329   4.795  -4.543  1.00  4.28           N
ATOM     74  CA  PRO A  19       2.792   5.376  -5.797  1.00  5.38           C
ATOM     75  C   PRO A  19       3.573   6.540  -6.322  1.00  6.30           C
ATOM     76  O   PRO A  19       3.260   7.045  -7.422  1.00  9.62           O
ATOM     77  N   GLY A  20       4.565   7.047  -5.559  1.00  4.94           N
ATOM     78  CA  GLY A  20       5.366   8.191  -6.018  1.00  5.39           C
ATOM     79  C   GLY A  20       5.007   9.481  -5.280  1.00  5.03           C
ATOM     80  O   GLY A  20       5.535  10.510  -5.730  1.00  7.34           O
ATOM     81  N   THR A  21       4.181   9.438  -4.262  1.00  4.10           N
ATOM     82  CA  THR A  21       3.767  10.609  -3.513  1.00  3.94           C
ATOM     83  C   THR A  21       5.017  11.397  -3.042  1.00  3.96           C
ATOM     84  O   THR A  21       5.947  10.757  -2.523  1.00  5.82           O
ATOM     85  N   PRO A  22       4.971  12.703  -3.176  1.00  5.04           N
ATOM     86  CA  PRO A  22       6.143  13.513  -2.696  1.00  4.69           C
ATOM     87  C   PRO A  22       6.400  13.233  -1.225  1.00  4.19           C
ATOM     88  O   PRO A  22       5.485  13.061  -0.382  1.00  4.47           O
ATOM     89  N   GLU A  23       7.728  13.297  -0.921  1.00  5.16           N
ATOM     90  CA  GLU A  23       8.114  13.103   0.500  1.00  5.31           C
ATOM     91  C   GLU A  23       7.427  14.073   1.410  1.00  4.11           C
ATOM     92  O   GLU A  23       7.036  13.682   2.540  1.00  5.11           O
ATOM     93  N   ALA A  24       7.212  15.334   0.966  1.00  4.56           N
ATOM     94  CA  ALA A  24       6.614  16.317   1.913  1.00  4.49           C
ATOM     95  C   ALA A  24       5.212  15.936   2.350  1.00  4.10           C
ATOM     96  O   ALA A  24       4.782  16.166   3.495  1.00  5.64           O
ATOM     97  N   ILE A  25       4.445  15.318   1.405  1.00  4.37           N
ATOM     98  CA  ILE A  25       3.074  14.894   1.756  1.00  5.44           C
ATOM     99  C   ILE A  25       3.085  13.643   2.645  1.00  4.32           C
ATOM    100  O   ILE A  25       2.315  13.523   3.578  1.00  4.72           O
ATOM    101  N   CYS A  26       4.032  12.764   2.313  1.00  3.92           N
ATOM    102  CA  CYS A  26       4.180  11.549   3.187  1.00  4.37           C
ATOM    103  C   CYS A  26       4.632  11.944   4.596  1.00  3.95           C
ATOM    104  O   CYS A  26       4.227  11.252   5.547  1.00  4.74           O
ATOM    105  N   ALA A  27       5.408  13.012   4.694  1.00  3.89           N
ATOM    106  CA  ALA A  27       5.879  13.502   6.026  1.00  4.43           C
ATOM    107  C   ALA A  27       4.696  13.908   6.882  1.00  4.26           C
ATOM    108  O   ALA A  27       4.528  13.422   8.025  1.00  5.44           O
ATOM    109  N   THR A  28       3.827  14.802   6.358  1.00  4.53           N
ATOM    110  CA  THR A  28       2.691  15.221   7.194  1.00  5.08           C
ATOM    111  C   THR A  28       1.672  14.132   7.434  1.00  4.62           C
ATOM    112  O   THR A  28       0.947  14.112   8.468  1.00  7.80           O
ATOM    113  N   TYR A  29       1.621  13.190   6.511  1.00  5.01           N
ATOM    114  CA  TYR A  29       0.715  12.045   6.657  1.00  6.60           C
ATOM    115  C   TYR A  29       1.125  11.125   7.815  1.00  4.92           C
ATOM    116  O   TYR A  29       0.286  10.632   8.545  1.00  7.13           O
ATOM    117  N   THR A  30       2.470  10.984   7.995  1.00  5.31           N
ATOM    118  CA  THR A  30       2.986   9.994   8.950  1.00  5.70           C
ATOM    119  C   THR A  30       3.609  10.505  10.230  1.00  6.28           C
ATOM    120  O   THR A  30       3.766   9.715  11.186  1.00  8.77           O
ATOM    121  N   GLY A  31       3.984  11.764  10.241  1.00  4.99           N
ATOM    122  CA  GLY A  31       4.769  12.336  11.360  1.00  5.50           C
ATOM    123  C   GLY A  31       6.255  12.243  11.106  1.00  4.19           C
ATOM    124  O   GLY A  31       7.037  12.750  11.954  1.00  6.12           O
ATOM    125  N   CYS A  32       6.710  11.631   9.992  1.00  4.30           N
ATOM    126  CA  CYS A  32       8.140  11.694   9.635  1.00  4.89           C
ATOM    127  C   CYS A  32       8.500  13.141   9.206  1.00  5.50           C
ATOM    128  O   CYS A  32       7.581  13.949   8.944  1.00  5.82           O
ATOM    129  N   ILE A  33       9.793  13.410   9.173  1.00  6.02           N
ATOM    130  CA  ILE A  33      10.280  14.760   8.823  1.00  5.24           C
ATOM    131  C   ILE A  33      11.346  14.658   7.743  1.00  5.16           C
ATOM    132  O   ILE A  33      11.971  13.583   7.552  1.00  7.19           O
ATOM    133  N   ILE A  34      11.490  15.773   7.038  1.00  5.52           N
ATOM    134  CA  ILE A  34      12.552  15.877   6.036  1.00  6.82           C
ATOM    135  C   ILE A  34      13.590  16.917   6.560  1.00  6.92           C
ATOM    136  O   ILE A  34      13.168  18.006   6.945  1.00  9.22           O
ATOM    137  N   ILE A  35      14.856  16.493   6.536  1.00  7.06           N
ATOM    138  CA  ILE A  35      15.930  17.454   6.941  1.00  7.52           C
ATOM    139  C   ILE A  35      16.913  17.550   5.819  1.00  6.63           C
ATOM    140  O   ILE A  35      17.097  16.660   4.970  1.00  7.90           O
ATOM    141  N   PRO A  36      17.664  18.669   5.806  1.00  8.07           N
ATOM    142  CA  PRO A  36      18.635  18.861   4.738  1.00  8.78           C
ATOM    143  C   PRO A  36      19.925  18.042   4.949  1.00  8.31           C
ATOM    144  O   PRO A  36      20.593  17.742   3.945  1.00  9.09           O
ATOM    145  N   GLY A  37      20.172  17.730   6.217  1.00  8.48           N
ATOM    146  CA  GLY A  37      21.452  16.969   6.513  1.00  9.20           C
ATOM    147  C   GLY A  37      21.143  15.478   6.427  1.00 10.41           C
ATOM    148  O   GLY A  37      20.138  15.023   5.878  1.00 12.06           O
ATOM    149  N   ALA A  38      22.055  14.701   7.032  1.00  9.24           N
ATOM    150  CA  ALA A  38      22.019  13.242   7.020  1.00  9.24           C
ATOM    151  C   ALA A  38      21.944  12.628   8.396  1.00  9.60           C
ATOM    152  O   ALA A  38      21.869  11.387   8.435  1.00 13.65           O
ATOM    153  N   THR A  39      21.894  13.435   9.436  1.00  8.70           N
ATOM    154  CA  THR A  39      21.936  12.911  10.809  1.00  9.46           C
ATOM    155  C   THR A  39      20.615  13.191  11.521  1.00  8.32           C
ATOM    156  O   THR A  39      20.357  14.317  11.948  1.00  9.89           O
ATOM    157  N   CYS A  40      19.827  12.110  11.642  1.00  7.64           N
ATOM    158  CA  CYS A  40      18.504  12.312  12.298  1.00  8.05           C
ATOM    159  C   CYS A  40      18.684  12.451  13.784  1.00  7.63           C
ATOM    160  O   CYS A  40      19.533  11.718  14.362  1.00  9.64           O
ATOM    161  N   PRO A  41      17.880  13.266  14.426  1.00  8.00           N
ATOM    162  CA  PRO A  41      17.924  13.421  15.877  1.00  8.96           C
ATOM    163  C   PRO A  41      17.392  12.206  16.594  1.00  9.06           C
ATOM    164  O   PRO A  41      16.652  11.368  16.033  1.00  8.82           O
ATOM    165  N   GLY A  42      17.728  12.124  17.884  1.00  7.55           N
ATOM    166  CA  GLY A  42      17.334  10.956  18.691  1.00  8.00           C
ATOM    167  C   GLY A  42      15.875  10.688  18.871  1.00  7.22           C
ATOM    168  O   GLY A  42      15.434   9.550  19.166  1.00  8.41           O
ATOM    169  N   ASP A  43      15.036  11.747  18.715  1.00  5.54           N
ATOM    170  CA  ASP A  43      13.564  11.573  18.836  1.00  5.85           C
ATOM    171  C   ASP A  43      12.936  11.227  17.470  1.00  5.87           C
ATOM    172  O   ASP A  43      11.720  11.040  17.428  1.00  7.29           O
ATOM    173  N   TYR A  44      13.725  11.174  16.425  1.00  5.22           N
ATOM    174  CA  TYR A  44      13.257  10.745  15.081  1.00  5.56           C
ATOM    175  C   TYR A  44      14.275   9.687  14.612  1.00  4.61           C
ATOM    176  O   TYR A  44      14.930   9.862  13.568  1.00  6.04           O
ATOM    177  N   ALA A  45      14.342   8.640  15.422  1.00  4.76           N
ATOM    178  CA  ALA A  45      15.445   7.667  15.246  1.00  5.89           C
ATOM    179  C   ALA A  45      15.171   6.533  14.280  1.00  6.67           C
ATOM    180  O   ALA A  45      16.093   5.705  14.039  1.00  7.56           O
ATOM    181  N   ASN A  46      13.966   6.502  13.739  1.00  5.80           N
ATOM    182  CA  ASN A  46      13.512   5.395  12.878  1.00  6.15           C
ATOM    183  C   ASN A  46      13.311   5.853  11.455  1.00  6.61           C
ATOM    184  O   ASN A  46      13.733   6.929  11.026  1.00  7.18           O
END`;

const PLDDT = [
  0.45, 0.515, 0.557, 0.569, 0.567, 0.578, 0.618, 0.681, 0.742, 0.777, 0.782,
  0.773, 0.776, 0.807, 0.86, 0.909, 0.933, 0.924, 0.902, 0.892, 0.91, 0.947,
  0.98, 0.98, 0.961, 0.92, 0.892, 0.892, 0.911, 0.927, 0.915, 0.873, 0.818,
  0.776, 0.762, 0.769, 0.772, 0.748, 0.694, 0.629, 0.578, 0.556, 0.556, 0.552,
  0.522, 0.463,
];

function App() {
  const [selection, setSelection] = useState<StructureSelection | null>(null);

  return (
    <div className="app" style={{ height: 480 }}>
      <ProteinStructureViewer
        // Clicking the selected residue again clears it, which is what makes
        // the camera zoom in and then back out. A drag across the sequence
        // arrives here too, as every residue it covered.
        onSelectionChange={(next) =>
          setSelection((prev) =>
            next?.residues?.length === 1 &&
            prev?.residues?.length === 1 &&
            next.residues[0] === prev.residues[0]
              ? null
              : next
          )
        }
        pdb={PDB}
        plddt={PLDDT}
        selection={selection}
        stats={[
          null,
          { label: "pTM", value: "0.874" },
          { label: "Mean pLDDT", value: "0.781" },
        ]}
      />
    </div>
  );
}

export default App;
```

### Complexes and chains

A multi-chain structure needs nothing special: pass the whole complex as one PDB string and the viewer finds the chains itself, reporting them through `onChainsChange` as `ChainRef`s. It draws one cartoon per chain, splits the sequence panel into one grid per chain, and - when neither `plddt` nor `residueOverlay` is coloring the structure - paints each chain its own color and shows a chain legend with a swatch and a visibility toggle for each.

Visibility works out of the box: the toggles own it unless you pass `hiddenChains`, which takes it over and leaves the toggles reporting through `onChainVisibilityChange`. Hiding a chain removes its cartoon, which also takes it out of reach of hover and click; its sequence stays in the panel, dimmed, so the panel does not reflow on every toggle. `chainColors` overrides the palette per chain.

Residue indices run straight through the chain break: on the pair below, barnase occupies 0-109 and barstar 110-198, so `plddt` is one flat array over the whole complex and one `residueOverlay` map spans both chains. Because a file numbers a complex however it likes - barstar here starts at residue 111, not 1 - `index` and `seqId` part company, so map a click back onto your own data with `chainId` and `seqId` rather than arithmetic on `index`.

**Example: MultiChainProteinStructureViewer**

```tsx
import {
  ChainRef,
  ProteinStructureViewer,
  StructureSelection,
} from "@czi-sds/data-viz";
import { useState } from "react";

// A two-chain complex: barnase (chain A) with barstar (chain B) bound to it,
// which is the shape a designed binder arrives in alongside its target. The
// whole complex goes in as one `pdb` string; the viewer finds the chains and
// draws one cartoon per chain.
//
// Trimmed to the first 30 residues of each chain and to backbone atoms, which
// is all the cartoon traces. Barstar keeps the numbering the fold gave it, so
// it starts at residue 111 rather than 1 - which is why `index` and `seqId`
// below disagree, and why a click is mapped back by chain and number rather
// than by arithmetic on the index.

const PDB = `ATOM      1  N   ALA A   1      10.151  -4.550 -26.005  1.00 64.66           N
ATOM      2  CA  ALA A   1      10.557  -5.651 -25.144  1.00 64.66           C
ATOM      3  C   ALA A   1      11.399  -5.213 -23.958  1.00 64.66           C
ATOM      5  O   ALA A   1      11.427  -5.910 -22.944  1.00 64.66           O
ATOM      6  N   GLN A   2      12.088  -4.083 -24.085  1.00 70.39           N
ATOM      7  CA  GLN A   2      12.911  -3.660 -22.963  1.00 70.39           C
ATOM      8  C   GLN A   2      12.041  -3.265 -21.774  1.00 70.39           C
ATOM     10  O   GLN A   2      10.946  -2.731 -21.927  1.00 70.39           O
ATOM     15  N   VAL A   3      12.549  -3.566 -20.593  1.00 93.28           N
ATOM     16  CA  VAL A   3      11.857  -3.233 -19.358  1.00 93.28           C
ATOM     17  C   VAL A   3      12.031  -1.740 -19.078  1.00 93.28           C
ATOM     19  O   VAL A   3      13.148  -1.219 -19.131  1.00 93.28           O
ATOM     22  N   ILE A   4      10.926  -1.072 -18.786  1.00 97.47           N
ATOM     23  CA  ILE A   4      10.944   0.340 -18.413  1.00 97.47           C
ATOM     24  C   ILE A   4      10.462   0.421 -16.972  1.00 97.47           C
ATOM     26  O   ILE A   4       9.279   0.206 -16.698  1.00 97.47           O
ATOM     30  N   ASN A   5      11.389   0.707 -16.047  1.00 96.44           N
ATOM     31  CA  ASN A   5      11.042   0.676 -14.623  1.00 96.44           C
ATOM     32  C   ASN A   5      11.755   1.741 -13.787  1.00 96.44           C
ATOM     34  O   ASN A   5      11.818   1.616 -12.561  1.00 96.44           O
ATOM     38  N   THR A   6      12.276   2.773 -14.438  1.00 98.24           N
ATOM     39  CA  THR A   6      12.919   3.868 -13.722  1.00 98.24           C
ATOM     40  C   THR A   6      11.962   5.044 -13.586  1.00 98.24           C
ATOM     42  O   THR A   6      10.980   5.142 -14.331  1.00 98.24           O
ATOM     45  N   PHE A   7      12.250   5.947 -12.653  1.00 98.78           N
ATOM     46  CA  PHE A   7      11.375   7.106 -12.480  1.00 98.78           C
ATOM     47  C   PHE A   7      11.222   7.904 -13.769  1.00 98.78           C
ATOM     49  O   PHE A   7      10.099   8.178 -14.200  1.00 98.78           O
ATOM     56  N   ASP A   8      12.334   8.261 -14.406  1.00 96.85           N
ATOM     57  CA  ASP A   8      12.223   9.076 -15.611  1.00 96.85           C
ATOM     58  C   ASP A   8      11.624   8.302 -16.775  1.00 96.85           C
ATOM     60  O   ASP A   8      10.836   8.848 -17.545  1.00 96.85           O
ATOM     64  N   GLY A   9      12.003   7.028 -16.913  1.00 98.36           N
ATOM     65  CA  GLY A   9      11.479   6.235 -18.014  1.00 98.36           C
ATOM     66  C   GLY A   9       9.983   6.036 -17.925  1.00 98.36           C
ATOM     67  O   GLY A   9       9.259   6.199 -18.914  1.00 98.36           O
ATOM     68  N   VAL A  10       9.491   5.685 -16.739  1.00 98.66           N
ATOM     69  CA  VAL A  10       8.062   5.459 -16.570  1.00 98.66           C
ATOM     70  C   VAL A  10       7.296   6.774 -16.654  1.00 98.66           C
ATOM     72  O   VAL A  10       6.214   6.828 -17.243  1.00 98.66           O
ATOM     75  N   ALA A  11       7.850   7.848 -16.086  1.00 98.65           N
ATOM     76  CA  ALA A  11       7.172   9.142 -16.164  1.00 98.65           C
ATOM     77  C   ALA A  11       6.997   9.583 -17.615  1.00 98.65           C
ATOM     79  O   ALA A  11       5.914  10.030 -18.013  1.00 98.65           O
ATOM     80  N   ASP A  12       8.052   9.455 -18.412  1.00 97.01           N
ATOM     81  CA  ASP A  12       7.959   9.850 -19.812  1.00 97.01           C
ATOM     82  C   ASP A  12       6.993   8.962 -20.581  1.00 97.01           C
ATOM     84  O   ASP A  12       6.225   9.439 -21.416  1.00 97.01           O
ATOM     88  N   TYR A  13       7.010   7.662 -20.292  1.00 98.01           N
ATOM     89  CA  TYR A  13       6.101   6.732 -20.953  1.00 98.01           C
ATOM     90  C   TYR A  13       4.651   7.063 -20.631  1.00 98.01           C
ATOM     92  O   TYR A  13       3.789   7.081 -21.516  1.00 98.01           O
ATOM    100  N   LEU A  14       4.372   7.337 -19.358  1.00 98.22           N
ATOM    101  CA  LEU A  14       3.014   7.681 -18.945  1.00 98.22           C
ATOM    102  C   LEU A  14       2.513   8.936 -19.642  1.00 98.22           C
ATOM    104  O   LEU A  14       1.368   8.989 -20.094  1.00 98.22           O
ATOM    108  N   GLN A  15       3.361   9.954 -19.735  1.00 94.14           N
ATOM    109  CA  GLN A  15       2.906  11.196 -20.345  1.00 94.14           C
ATOM    110  C   GLN A  15       2.743  11.061 -21.854  1.00 94.14           C
ATOM    112  O   GLN A  15       1.882  11.716 -22.444  1.00 94.14           O
ATOM    117  N   THR A  16       3.536  10.200 -22.475  1.00 97.66           N
ATOM    118  CA  THR A  16       3.440   9.982 -23.912  1.00 97.66           C
ATOM    119  C   THR A  16       2.263   9.080 -24.279  1.00 97.66           C
ATOM    121  O   THR A  16       1.525   9.373 -25.226  1.00 97.66           O
ATOM    124  N   TYR A  17       2.075   7.986 -23.543  1.00 96.97           N
ATOM    125  CA  TYR A  17       1.113   6.961 -23.925  1.00 96.97           C
ATOM    126  C   TYR A  17      -0.106   6.847 -23.013  1.00 96.97           C
ATOM    128  O   TYR A  17      -1.034   6.094 -23.323  1.00 96.97           O
ATOM    136  N   HIS A  18      -0.121   7.568 -21.908  1.00 94.46           N
ATOM    137  CA  HIS A  18      -1.243   7.540 -20.964  1.00 94.46           C
ATOM    138  C   HIS A  18      -1.567   6.131 -20.456  1.00 94.46           C
ATOM    140  O   HIS A  18      -2.728   5.790 -20.203  1.00 94.46           O
ATOM    146  N   LYS A  19      -0.529   5.334 -20.307  1.00 94.34           N
ATOM    147  CA  LYS A  19      -0.635   4.015 -19.690  1.00 94.34           C
ATOM    148  C   LYS A  19       0.755   3.570 -19.265  1.00 94.34           C
ATOM    150  O   LYS A  19       1.758   4.129 -19.713  1.00 94.34           O
ATOM    155  N   LEU A  20       0.799   2.578 -18.389  1.00 97.87           N
ATOM    156  CA  LEU A  20       2.092   2.042 -17.954  1.00 97.87           C
ATOM    157  C   LEU A  20       2.709   1.156 -19.038  1.00 97.87           C
ATOM    159  O   LEU A  20       1.993   0.579 -19.860  1.00 97.87           O
ATOM    163  N   PRO A  21       4.032   1.033 -19.042  1.00 97.78           N
ATOM    164  CA  PRO A  21       4.687   0.065 -19.908  1.00 97.78           C
ATOM    165  C   PRO A  21       4.165  -1.354 -19.674  1.00 97.78           C
ATOM    167  O   PRO A  21       3.638  -1.663 -18.603  1.00 97.78           O
ATOM    170  N   ASP A  22       4.352  -2.226 -20.664  1.00 93.06           N
ATOM    171  CA  ASP A  22       3.815  -3.582 -20.614  1.00 93.06           C
ATOM    172  C   ASP A  22       4.414  -4.464 -19.522  1.00 93.06           C
ATOM    174  O   ASP A  22       3.885  -5.540 -19.247  1.00 93.06           O
ATOM    178  N   ASN A  23       5.507  -4.032 -18.893  1.00 97.00           N
ATOM    179  CA  ASN A  23       6.107  -4.817 -17.815  1.00 97.00           C
ATOM    180  C   ASN A  23       5.436  -4.612 -16.456  1.00 97.00           C
ATOM    182  O   ASN A  23       5.962  -5.073 -15.440  1.00 97.00           O
ATOM    186  N   TYR A  24       4.274  -3.954 -16.421  1.00 98.70           N
ATOM    187  CA  TYR A  24       3.540  -3.744 -15.180  1.00 98.70           C
ATOM    188  C   TYR A  24       2.279  -4.588 -15.121  1.00 98.70           C
ATOM    190  O   TYR A  24       1.556  -4.722 -16.105  1.00 98.70           O
ATOM    198  N   ILE A  25       2.016  -5.160 -13.947  1.00 98.11           N
ATOM    199  CA  ILE A  25       0.749  -5.836 -13.656  1.00 98.11           C
ATOM    200  C   ILE A  25       0.226  -5.340 -12.312  1.00 98.11           C
ATOM    202  O   ILE A  25       1.000  -4.916 -11.446  1.00 98.11           O
ATOM    206  N   THR A  26      -1.087  -5.381 -12.135  1.00 98.67           N
ATOM    207  CA  THR A  26      -1.684  -4.951 -10.871  1.00 98.67           C
ATOM    208  C   THR A  26      -1.485  -6.015  -9.801  1.00 98.67           C
ATOM    210  O   THR A  26      -1.120  -7.163 -10.089  1.00 98.67           O
ATOM    213  N   LYS A  27      -1.757  -5.626  -8.547  1.00 98.16           N
ATOM    214  CA  LYS A  27      -1.654  -6.595  -7.456  1.00 98.16           C
ATOM    215  C   LYS A  27      -2.592  -7.781  -7.658  1.00 98.16           C
ATOM    217  O   LYS A  27      -2.207  -8.926  -7.412  1.00 98.16           O
ATOM    222  N   SER A  28      -3.826  -7.524  -8.114  1.00 95.62           N
ATOM    223  CA  SER A  28      -4.746  -8.639  -8.319  1.00 95.62           C
ATOM    224  C   SER A  28      -4.305  -9.529  -9.477  1.00 95.62           C
ATOM    226  O   SER A  28      -4.444 -10.760  -9.401  1.00 95.62           O
ATOM    228  N   GLU A  29      -3.758  -8.942 -10.539  1.00 96.81           N
ATOM    229  CA  GLU A  29      -3.233  -9.750 -11.636  1.00 96.81           C
ATOM    230  C   GLU A  29      -2.055 -10.602 -11.170  1.00 96.81           C
ATOM    232  O   GLU A  29      -1.929 -11.773 -11.545  1.00 96.81           O
ATOM    237  N   ALA A  30      -1.181 -10.019 -10.334  1.00 98.84           N
ATOM    238  CA  ALA A  30      -0.053 -10.772  -9.803  1.00 98.84           C
ATOM    239  C   ALA A  30      -0.525 -11.930  -8.924  1.00 98.84           C
ATOM    241  O   ALA A  30      -0.003 -13.046  -9.009  1.00 98.84           O
ATOM    878  N   LYS B 111      -1.055 -15.650  11.547  1.00 86.96           N
ATOM    879  CA  LYS B 111      -0.309 -14.525  12.101  1.00 86.96           C
ATOM    880  C   LYS B 111      -1.172 -13.701  13.036  1.00 86.96           C
ATOM    882  O   LYS B 111      -2.288 -13.295  12.671  1.00 86.96           O
ATOM    887  N   LYS B 112      -0.694 -13.464  14.235  1.00 89.37           N
ATOM    888  CA  LYS B 112      -1.419 -12.667  15.214  1.00 89.37           C
ATOM    889  C   LYS B 112      -0.656 -11.401  15.548  1.00 89.37           C
ATOM    891  O   LYS B 112       0.526 -11.443  15.868  1.00 89.37           O
ATOM    896  N   ALA B 113      -1.330 -10.284  15.435  1.00 97.89           N
ATOM    897  CA  ALA B 113      -0.757  -8.987  15.777  1.00 97.89           C
ATOM    898  C   ALA B 113      -1.562  -8.387  16.919  1.00 97.89           C
ATOM    900  O   ALA B 113      -2.790  -8.360  16.874  1.00 97.89           O
ATOM    901  N   VAL B 114      -0.884  -7.911  17.958  1.00 97.10           N
ATOM    902  CA  VAL B 114      -1.548  -7.368  19.145  1.00 97.10           C
ATOM    903  C   VAL B 114      -1.153  -5.911  19.325  1.00 97.10           C
ATOM    905  O   VAL B 114       0.032  -5.572  19.327  1.00 97.10           O
ATOM    908  N   ILE B 115      -2.169  -5.056  19.466  1.00 97.42           N
ATOM    909  CA  ILE B 115      -1.947  -3.662  19.806  1.00 97.42           C
ATOM    910  C   ILE B 115      -2.532  -3.444  21.190  1.00 97.42           C
ATOM    912  O   ILE B 115      -3.726  -3.640  21.401  1.00 97.42           O
ATOM    916  N   ASN B 116      -1.689  -3.046  22.152  1.00 92.64           N
ATOM    917  CA  ASN B 116      -2.154  -2.675  23.482  1.00 92.64           C
ATOM    918  C   ASN B 116      -2.377  -1.166  23.489  1.00 92.64           C
ATOM    920  O   ASN B 116      -1.441  -0.390  23.669  1.00 92.64           O
ATOM    924  N   GLY B 117      -3.627  -0.755  23.256  1.00 95.12           N
ATOM    925  CA  GLY B 117      -3.936   0.644  23.032  1.00 95.12           C
ATOM    926  C   GLY B 117      -3.578   1.583  24.173  1.00 95.12           C
ATOM    927  O   GLY B 117      -3.297   2.756  23.933  1.00 95.12           O
ATOM    928  N   GLU B 118      -3.564   1.077  25.394  1.00 83.80           N
ATOM    929  CA  GLU B 118      -3.211   1.942  26.519  1.00 83.80           C
ATOM    930  C   GLU B 118      -1.731   2.317  26.531  1.00 83.80           C
ATOM    932  O   GLU B 118      -1.347   3.274  27.193  1.00 83.80           O
ATOM    937  N   GLN B 119      -0.911   1.575  25.786  1.00 87.67           N
ATOM    938  CA  GLN B 119       0.519   1.861  25.701  1.00 87.67           C
ATOM    939  C   GLN B 119       0.876   2.748  24.513  1.00 87.67           C
ATOM    941  O   GLN B 119       2.036   3.135  24.357  1.00 87.67           O
ATOM    946  N   ILE B 120      -0.099   3.073  23.694  1.00 93.44           N
ATOM    947  CA  ILE B 120       0.149   3.883  22.500  1.00 93.44           C
ATOM    948  C   ILE B 120       0.075   5.357  22.897  1.00 93.44           C
ATOM    950  O   ILE B 120      -0.967   5.839  23.325  1.00 93.44           O
ATOM    954  N   ARG B 121       1.182   6.064  22.757  1.00 76.49           N
ATOM    955  CA  ARG B 121       1.251   7.456  23.189  1.00 76.49           C
ATOM    956  C   ARG B 121       1.065   8.462  22.053  1.00 76.49           C
ATOM    958  O   ARG B 121       0.861   9.654  22.296  1.00 76.49           O
ATOM    965  N   SER B 122       1.172   8.002  20.836  1.00 96.69           N
ATOM    966  CA  SER B 122       1.099   8.881  19.680  1.00 96.69           C
ATOM    967  C   SER B 122       0.821   8.066  18.432  1.00 96.69           C
ATOM    969  O   SER B 122       0.913   6.827  18.443  1.00 96.69           O
ATOM    971  N   ILE B 123       0.494   8.755  17.332  1.00 95.51           N
ATOM    972  CA  ILE B 123       0.304   8.045  16.072  1.00 95.51           C
ATOM    973  C   ILE B 123       1.605   7.390  15.610  1.00 95.51           C
ATOM    975  O   ILE B 123       1.595   6.310  15.017  1.00 95.51           O
ATOM    979  N   SER B 124       2.745   8.021  15.915  1.00 95.35           N
ATOM    980  CA  SER B 124       4.039   7.409  15.600  1.00 95.35           C
ATOM    981  C   SER B 124       4.237   6.102  16.375  1.00 95.35           C
ATOM    983  O   SER B 124       4.694   5.106  15.812  1.00 95.35           O
ATOM    985  N   ASP B 125       3.876   6.102  17.659  1.00 92.95           N
ATOM    986  CA  ASP B 125       3.952   4.865  18.444  1.00 92.95           C
ATOM    987  C   ASP B 125       3.098   3.764  17.831  1.00 92.95           C
ATOM    989  O   ASP B 125       3.497   2.601  17.805  1.00 92.95           O
ATOM    993  N   LEU B 126       1.913   4.126  17.353  1.00 97.36           N
ATOM    994  CA  LEU B 126       1.032   3.137  16.746  1.00 97.36           C
ATOM    995  C   LEU B 126       1.670   2.517  15.509  1.00 97.36           C
ATOM    997  O   LEU B 126       1.669   1.298  15.341  1.00 97.36           O
ATOM   1001  N   HIS B 127       2.226   3.348  14.628  1.00 97.51           N
ATOM   1002  CA  HIS B 127       2.875   2.816  13.436  1.00 97.51           C
ATOM   1003  C   HIS B 127       4.103   1.975  13.779  1.00 97.51           C
ATOM   1005  O   HIS B 127       4.370   0.972  13.116  1.00 97.51           O
ATOM   1011  N   GLN B 128       4.853   2.366  14.814  1.00 89.84           N
ATOM   1012  CA  GLN B 128       6.000   1.566  15.226  1.00 89.84           C
ATOM   1013  C   GLN B 128       5.566   0.209  15.774  1.00 89.84           C
ATOM   1015  O   GLN B 128       6.215  -0.810  15.522  1.00 89.84           O
ATOM   1020  N   THR B 129       4.452   0.180  16.500  1.00 97.60           N
ATOM   1021  CA  THR B 129       3.900  -1.085  16.983  1.00 97.60           C
ATOM   1022  C   THR B 129       3.462  -1.960  15.814  1.00 97.60           C
ATOM   1024  O   THR B 129       3.722  -3.162  15.787  1.00 97.60           O
ATOM   1027  N   LEU B 130       2.809  -1.360  14.822  1.00 98.12           N
ATOM   1028  CA  LEU B 130       2.401  -2.108  13.634  1.00 98.12           C
ATOM   1029  C   LEU B 130       3.608  -2.660  12.887  1.00 98.12           C
ATOM   1031  O   LEU B 130       3.582  -3.796  12.408  1.00 98.12           O
ATOM   1035  N   LYS B 131       4.657  -1.867  12.770  1.00 97.23           N
ATOM   1036  CA  LYS B 131       5.866  -2.328  12.090  1.00 97.23           C
ATOM   1037  C   LYS B 131       6.394  -3.601  12.737  1.00 97.23           C
ATOM   1039  O   LYS B 131       6.725  -4.570  12.048  1.00 97.23           O
ATOM   1044  N   LYS B 132       6.448  -3.607  14.069  1.00 87.21           N
ATOM   1045  CA  LYS B 132       6.933  -4.777  14.798  1.00 87.21           C
ATOM   1046  C   LYS B 132       5.957  -5.949  14.698  1.00 87.21           C
ATOM   1048  O   LYS B 132       6.351  -7.068  14.352  1.00 87.21           O
ATOM   1053  N   GLU B 133       4.677  -5.706  14.986  1.00 96.98           N
ATOM   1054  CA  GLU B 133       3.706  -6.791  15.072  1.00 96.98           C
ATOM   1055  C   GLU B 133       3.405  -7.441  13.727  1.00 96.98           C
ATOM   1057  O   GLU B 133       3.113  -8.636  13.667  1.00 96.98           O
ATOM   1062  N   LEU B 134       3.482  -6.675  12.648  1.00 97.91           N
ATOM   1063  CA  LEU B 134       3.208  -7.201  11.309  1.00 97.91           C
ATOM   1064  C   LEU B 134       4.485  -7.560  10.549  1.00 97.91           C
ATOM   1066  O   LEU B 134       4.409  -7.941   9.382  1.00 97.91           O
ATOM   1070  N   ALA B 135       5.634  -7.435  11.199  1.00 98.37           N
ATOM   1071  CA  ALA B 135       6.927  -7.728  10.583  1.00 98.37           C
ATOM   1072  C   ALA B 135       7.119  -6.952   9.281  1.00 98.37           C
ATOM   1074  O   ALA B 135       7.461  -7.521   8.239  1.00 98.37           O
ATOM   1075  N   LEU B 136       6.862  -5.650   9.339  1.00 98.10           N
ATOM   1076  CA  LEU B 136       6.971  -4.803   8.163  1.00 98.10           C
ATOM   1077  C   LEU B 136       8.440  -4.533   7.836  1.00 98.10           C
ATOM   1079  O   LEU B 136       9.316  -4.705   8.689  1.00 98.10           O
ATOM   1083  N   PRO B 137       8.718  -4.102   6.609  1.00 98.48           N
ATOM   1084  CA  PRO B 137      10.109  -3.865   6.234  1.00 98.48           C
ATOM   1085  C   PRO B 137      10.711  -2.703   7.019  1.00 98.48           C
ATOM   1087  O   PRO B 137       9.986  -1.840   7.523  1.00 98.48           O
ATOM   1090  N   GLU B 138      12.037  -2.682   7.095  1.00 86.32           N
ATOM   1091  CA  GLU B 138      12.701  -1.585   7.784  1.00 86.32           C
ATOM   1092  C   GLU B 138      12.356  -0.227   7.193  1.00 86.32           C
ATOM   1094  O   GLU B 138      12.357   0.780   7.897  1.00 86.32           O
ATOM   1099  N   TYR B 139      12.025  -0.183   5.908  1.00 98.34           N
ATOM   1100  CA  TYR B 139      11.708   1.077   5.242  1.00 98.34           C
ATOM   1101  C   TYR B 139      10.268   1.552   5.461  1.00 98.34           C
ATOM   1103  O   TYR B 139       9.893   2.604   4.939  1.00 98.34           O
ATOM   1111  N   TYR B 140       9.478   0.819   6.219  1.00 98.87           N
ATOM   1112  CA  TYR B 140       8.058   1.144   6.390  1.00 98.87           C
ATOM   1113  C   TYR B 140       7.864   2.639   6.651  1.00 98.87           C
ATOM   1115  O   TYR B 140       8.484   3.211   7.546  1.00 98.87           O`;

// One score per residue, flat across both chains: barnase takes 0-29 and
// barstar 30-59, with no slot spent on the chain break.
const PLDDT = [
  0.647, 0.704, 0.933, 0.975, 0.964, 0.982, 0.988, 0.969, 0.984, 0.987, 0.987,
  0.97, 0.98, 0.982, 0.941, 0.977, 0.97, 0.945, 0.943, 0.979, 0.978, 0.931,
  0.97, 0.987, 0.981, 0.987, 0.982, 0.956, 0.968, 0.988, 0.87, 0.894, 0.979,
  0.971, 0.974, 0.926, 0.951, 0.838, 0.877, 0.934, 0.765, 0.967, 0.955, 0.954,
  0.929, 0.974, 0.975, 0.898, 0.976, 0.981, 0.972, 0.872, 0.97, 0.979, 0.984,
  0.981, 0.985, 0.863, 0.983, 0.989,
];

export default function App(): JSX.Element {
  const [selection, setSelection] = useState<StructureSelection | null>(null);
  const [chains, setChains] = useState<ChainRef[]>([]);

  return (
    <div style={{ height: 520, width: "100%" }}>
      <ProteinStructureViewer
        onChainsChange={setChains}
        // Every way of selecting - a residue, a drag across the sequence, a
        // chain caption - arrives here, so accepting them all is one line.
        onSelectionChange={setSelection}
        onResidueClick={(residue) =>
          // chainId and seqId are what the file says, and what a system that
          // produced the structure will recognise.
          console.log(residue.chainId, residue.seqId, residue.index)
        }
        pdb={PDB}
        plddt={PLDDT}
        selection={selection}
        stats={[
          { label: "Chains", value: String(chains.length) },
          { label: "Interface pTM", value: "0.968" },
          { label: "Mean pLDDT", value: "0.961" },
        ]}
      />
    </div>
  );
}
```

### Structure only

Three props hide the chrome layered around the 3D view. `showSequenceViewer` drops the sequence panel, `showLegend` drops the stats and the color key, and `showAxes` drops the orientation widget and its reset-camera button. Turn off all three when the surrounding page supplies its own controls.

Hiding the legend does not disable the coloring. The structure below is still colored by pLDDT confidence, only without the key that explains it.

**Example: MinimalProteinStructureViewer**

```tsx
// Three props hide the chrome layered around the 3D view:
// `showSequenceViewer` drops the sequence panel, `showLegend` drops the stats
// and the color key, and `showAxes` drops the orientation widget and its
// reset-camera button. What remains is the structure on its own, for a page
// that supplies its own controls.
//
// Hiding the legend does not disable the coloring: the structure below is still
// colored by pLDDT confidence, only without the key that explains it.
//
// The structure is crambin (PDB 1CRN), trimmed to the backbone atoms the
// polymer cartoon traces.

import { ProteinStructureViewer } from "@czi-sds/data-viz";
import { useTheme } from "@mui/material";

const PDB = `
ATOM      1  N   THR A   1      17.047  14.099   3.625  1.00 13.79           N
ATOM      2  CA  THR A   1      16.967  12.784   4.338  1.00 10.80           C
ATOM      3  C   THR A   1      15.685  12.755   5.133  1.00  9.19           C
ATOM      4  O   THR A   1      15.268  13.825   5.594  1.00  9.85           O
ATOM      5  N   THR A   2      15.115  11.555   5.265  1.00  7.81           N
ATOM      6  CA  THR A   2      13.856  11.469   6.066  1.00  8.31           C
ATOM      7  C   THR A   2      14.164  10.785   7.379  1.00  5.80           C
ATOM      8  O   THR A   2      14.993   9.862   7.443  1.00  6.94           O
ATOM      9  N   CYS A   3      13.488  11.241   8.417  1.00  5.24           N
ATOM     10  CA  CYS A   3      13.660  10.707   9.787  1.00  5.39           C
ATOM     11  C   CYS A   3      12.269  10.431  10.323  1.00  4.45           C
ATOM     12  O   CYS A   3      11.393  11.308  10.185  1.00  6.54           O
ATOM     13  N   CYS A   4      12.019   9.272  10.928  1.00  3.90           N
ATOM     14  CA  CYS A   4      10.646   8.991  11.408  1.00  4.24           C
ATOM     15  C   CYS A   4      10.654   8.793  12.919  1.00  3.72           C
ATOM     16  O   CYS A   4      11.659   8.296  13.491  1.00  5.30           O
ATOM     17  N   PRO A   5       9.561   9.108  13.563  1.00  3.96           N
ATOM     18  CA  PRO A   5       9.448   9.034  15.012  1.00  4.25           C
ATOM     19  C   PRO A   5       9.288   7.670  15.606  1.00  4.96           C
ATOM     20  O   PRO A   5       9.490   7.519  16.819  1.00  7.44           O
ATOM     21  N   SER A   6       8.875   6.686  14.796  1.00  4.83           N
ATOM     22  CA  SER A   6       8.673   5.314  15.279  1.00  4.45           C
ATOM     23  C   SER A   6       8.753   4.376  14.083  1.00  4.99           C
ATOM     24  O   SER A   6       8.726   4.858  12.923  1.00  4.61           O
ATOM     25  N   ILE A   7       8.881   3.075  14.358  1.00  4.94           N
ATOM     26  CA  ILE A   7       8.912   2.083  13.258  1.00  6.33           C
ATOM     27  C   ILE A   7       7.581   2.090  12.506  1.00  5.32           C
ATOM     28  O   ILE A   7       7.670   2.031  11.245  1.00  6.85           O
ATOM     29  N   VAL A   8       6.458   2.162  13.159  1.00  5.02           N
ATOM     30  CA  VAL A   8       5.145   2.209  12.453  1.00  6.93           C
ATOM     31  C   VAL A   8       5.115   3.379  11.461  1.00  5.39           C
ATOM     32  O   VAL A   8       4.664   3.268  10.343  1.00  6.30           O
ATOM     33  N   ALA A   9       5.606   4.546  11.941  1.00  3.73           N
ATOM     34  CA  ALA A   9       5.598   5.767  11.082  1.00  3.56           C
ATOM     35  C   ALA A   9       6.441   5.527   9.850  1.00  4.13           C
ATOM     36  O   ALA A   9       6.052   5.933   8.744  1.00  4.36           O
ATOM     37  N   ARG A  10       7.647   4.909  10.005  1.00  3.73           N
ATOM     38  CA  ARG A  10       8.496   4.609   8.837  1.00  3.38           C
ATOM     39  C   ARG A  10       7.798   3.609   7.876  1.00  3.47           C
ATOM     40  O   ARG A  10       7.878   3.778   6.651  1.00  4.67           O
ATOM     41  N   SER A  11       7.186   2.582   8.445  1.00  5.19           N
ATOM     42  CA  SER A  11       6.500   1.584   7.565  1.00  4.60           C
ATOM     43  C   SER A  11       5.382   2.313   6.773  1.00  4.84           C
ATOM     44  O   SER A  11       5.213   2.016   5.557  1.00  5.84           O
ATOM     45  N   ASN A  12       4.648   3.182   7.446  1.00  3.54           N
ATOM     46  CA  ASN A  12       3.545   3.935   6.751  1.00  4.57           C
ATOM     47  C   ASN A  12       4.107   4.851   5.691  1.00  4.14           C
ATOM     48  O   ASN A  12       3.536   5.001   4.617  1.00  5.52           O
ATOM     49  N   PHE A  13       5.259   5.498   6.005  1.00  3.43           N
ATOM     50  CA  PHE A  13       5.929   6.358   5.055  1.00  3.49           C
ATOM     51  C   PHE A  13       6.304   5.578   3.799  1.00  3.40           C
ATOM     52  O   PHE A  13       6.136   6.072   2.653  1.00  4.07           O
ATOM     53  N   ASN A  14       6.900   4.390   3.989  1.00  3.64           N
ATOM     54  CA  ASN A  14       7.331   3.607   2.791  1.00  4.31           C
ATOM     55  C   ASN A  14       6.116   3.210   1.915  1.00  3.98           C
ATOM     56  O   ASN A  14       6.240   3.144   0.684  1.00  6.22           O
ATOM     57  N   VAL A  15       4.993   2.927   2.571  1.00  3.76           N
ATOM     58  CA  VAL A  15       3.782   2.599   1.742  1.00  3.98           C
ATOM     59  C   VAL A  15       3.296   3.871   1.004  1.00  3.80           C
ATOM     60  O   VAL A  15       2.947   3.817  -0.189  1.00  4.85           O
ATOM     61  N   CYS A  16       3.321   4.987   1.720  1.00  3.79           N
ATOM     62  CA  CYS A  16       2.890   6.285   1.126  1.00  3.54           C
ATOM     63  C   CYS A  16       3.687   6.597  -0.111  1.00  3.48           C
ATOM     64  O   CYS A  16       3.200   7.147  -1.103  1.00  4.63           O
ATOM     65  N   ARG A  17       4.997   6.227  -0.100  1.00  3.99           N
ATOM     66  CA  ARG A  17       5.895   6.489  -1.213  1.00  3.83           C
ATOM     67  C   ARG A  17       5.738   5.560  -2.409  1.00  3.79           C
ATOM     68  O   ARG A  17       6.228   5.901  -3.507  1.00  5.39           O
ATOM     69  N   LEU A  18       5.051   4.411  -2.204  1.00  4.70           N
ATOM     70  CA  LEU A  18       4.933   3.431  -3.326  1.00  5.46           C
ATOM     71  C   LEU A  18       4.397   4.014  -4.620  1.00  5.13           C
ATOM     72  O   LEU A  18       4.988   3.755  -5.687  1.00  5.55           O
ATOM     73  N   PRO A  19       3.329   4.795  -4.543  1.00  4.28           N
ATOM     74  CA  PRO A  19       2.792   5.376  -5.797  1.00  5.38           C
ATOM     75  C   PRO A  19       3.573   6.540  -6.322  1.00  6.30           C
ATOM     76  O   PRO A  19       3.260   7.045  -7.422  1.00  9.62           O
ATOM     77  N   GLY A  20       4.565   7.047  -5.559  1.00  4.94           N
ATOM     78  CA  GLY A  20       5.366   8.191  -6.018  1.00  5.39           C
ATOM     79  C   GLY A  20       5.007   9.481  -5.280  1.00  5.03           C
ATOM     80  O   GLY A  20       5.535  10.510  -5.730  1.00  7.34           O
ATOM     81  N   THR A  21       4.181   9.438  -4.262  1.00  4.10           N
ATOM     82  CA  THR A  21       3.767  10.609  -3.513  1.00  3.94           C
ATOM     83  C   THR A  21       5.017  11.397  -3.042  1.00  3.96           C
ATOM     84  O   THR A  21       5.947  10.757  -2.523  1.00  5.82           O
ATOM     85  N   PRO A  22       4.971  12.703  -3.176  1.00  5.04           N
ATOM     86  CA  PRO A  22       6.143  13.513  -2.696  1.00  4.69           C
ATOM     87  C   PRO A  22       6.400  13.233  -1.225  1.00  4.19           C
ATOM     88  O   PRO A  22       5.485  13.061  -0.382  1.00  4.47           O
ATOM     89  N   GLU A  23       7.728  13.297  -0.921  1.00  5.16           N
ATOM     90  CA  GLU A  23       8.114  13.103   0.500  1.00  5.31           C
ATOM     91  C   GLU A  23       7.427  14.073   1.410  1.00  4.11           C
ATOM     92  O   GLU A  23       7.036  13.682   2.540  1.00  5.11           O
ATOM     93  N   ALA A  24       7.212  15.334   0.966  1.00  4.56           N
ATOM     94  CA  ALA A  24       6.614  16.317   1.913  1.00  4.49           C
ATOM     95  C   ALA A  24       5.212  15.936   2.350  1.00  4.10           C
ATOM     96  O   ALA A  24       4.782  16.166   3.495  1.00  5.64           O
ATOM     97  N   ILE A  25       4.445  15.318   1.405  1.00  4.37           N
ATOM     98  CA  ILE A  25       3.074  14.894   1.756  1.00  5.44           C
ATOM     99  C   ILE A  25       3.085  13.643   2.645  1.00  4.32           C
ATOM    100  O   ILE A  25       2.315  13.523   3.578  1.00  4.72           O
ATOM    101  N   CYS A  26       4.032  12.764   2.313  1.00  3.92           N
ATOM    102  CA  CYS A  26       4.180  11.549   3.187  1.00  4.37           C
ATOM    103  C   CYS A  26       4.632  11.944   4.596  1.00  3.95           C
ATOM    104  O   CYS A  26       4.227  11.252   5.547  1.00  4.74           O
ATOM    105  N   ALA A  27       5.408  13.012   4.694  1.00  3.89           N
ATOM    106  CA  ALA A  27       5.879  13.502   6.026  1.00  4.43           C
ATOM    107  C   ALA A  27       4.696  13.908   6.882  1.00  4.26           C
ATOM    108  O   ALA A  27       4.528  13.422   8.025  1.00  5.44           O
ATOM    109  N   THR A  28       3.827  14.802   6.358  1.00  4.53           N
ATOM    110  CA  THR A  28       2.691  15.221   7.194  1.00  5.08           C
ATOM    111  C   THR A  28       1.672  14.132   7.434  1.00  4.62           C
ATOM    112  O   THR A  28       0.947  14.112   8.468  1.00  7.80           O
ATOM    113  N   TYR A  29       1.621  13.190   6.511  1.00  5.01           N
ATOM    114  CA  TYR A  29       0.715  12.045   6.657  1.00  6.60           C
ATOM    115  C   TYR A  29       1.125  11.125   7.815  1.00  4.92           C
ATOM    116  O   TYR A  29       0.286  10.632   8.545  1.00  7.13           O
ATOM    117  N   THR A  30       2.470  10.984   7.995  1.00  5.31           N
ATOM    118  CA  THR A  30       2.986   9.994   8.950  1.00  5.70           C
ATOM    119  C   THR A  30       3.609  10.505  10.230  1.00  6.28           C
ATOM    120  O   THR A  30       3.766   9.715  11.186  1.00  8.77           O
ATOM    121  N   GLY A  31       3.984  11.764  10.241  1.00  4.99           N
ATOM    122  CA  GLY A  31       4.769  12.336  11.360  1.00  5.50           C
ATOM    123  C   GLY A  31       6.255  12.243  11.106  1.00  4.19           C
ATOM    124  O   GLY A  31       7.037  12.750  11.954  1.00  6.12           O
ATOM    125  N   CYS A  32       6.710  11.631   9.992  1.00  4.30           N
ATOM    126  CA  CYS A  32       8.140  11.694   9.635  1.00  4.89           C
ATOM    127  C   CYS A  32       8.500  13.141   9.206  1.00  5.50           C
ATOM    128  O   CYS A  32       7.581  13.949   8.944  1.00  5.82           O
ATOM    129  N   ILE A  33       9.793  13.410   9.173  1.00  6.02           N
ATOM    130  CA  ILE A  33      10.280  14.760   8.823  1.00  5.24           C
ATOM    131  C   ILE A  33      11.346  14.658   7.743  1.00  5.16           C
ATOM    132  O   ILE A  33      11.971  13.583   7.552  1.00  7.19           O
ATOM    133  N   ILE A  34      11.490  15.773   7.038  1.00  5.52           N
ATOM    134  CA  ILE A  34      12.552  15.877   6.036  1.00  6.82           C
ATOM    135  C   ILE A  34      13.590  16.917   6.560  1.00  6.92           C
ATOM    136  O   ILE A  34      13.168  18.006   6.945  1.00  9.22           O
ATOM    137  N   ILE A  35      14.856  16.493   6.536  1.00  7.06           N
ATOM    138  CA  ILE A  35      15.930  17.454   6.941  1.00  7.52           C
ATOM    139  C   ILE A  35      16.913  17.550   5.819  1.00  6.63           C
ATOM    140  O   ILE A  35      17.097  16.660   4.970  1.00  7.90           O
ATOM    141  N   PRO A  36      17.664  18.669   5.806  1.00  8.07           N
ATOM    142  CA  PRO A  36      18.635  18.861   4.738  1.00  8.78           C
ATOM    143  C   PRO A  36      19.925  18.042   4.949  1.00  8.31           C
ATOM    144  O   PRO A  36      20.593  17.742   3.945  1.00  9.09           O
ATOM    145  N   GLY A  37      20.172  17.730   6.217  1.00  8.48           N
ATOM    146  CA  GLY A  37      21.452  16.969   6.513  1.00  9.20           C
ATOM    147  C   GLY A  37      21.143  15.478   6.427  1.00 10.41           C
ATOM    148  O   GLY A  37      20.138  15.023   5.878  1.00 12.06           O
ATOM    149  N   ALA A  38      22.055  14.701   7.032  1.00  9.24           N
ATOM    150  CA  ALA A  38      22.019  13.242   7.020  1.00  9.24           C
ATOM    151  C   ALA A  38      21.944  12.628   8.396  1.00  9.60           C
ATOM    152  O   ALA A  38      21.869  11.387   8.435  1.00 13.65           O
ATOM    153  N   THR A  39      21.894  13.435   9.436  1.00  8.70           N
ATOM    154  CA  THR A  39      21.936  12.911  10.809  1.00  9.46           C
ATOM    155  C   THR A  39      20.615  13.191  11.521  1.00  8.32           C
ATOM    156  O   THR A  39      20.357  14.317  11.948  1.00  9.89           O
ATOM    157  N   CYS A  40      19.827  12.110  11.642  1.00  7.64           N
ATOM    158  CA  CYS A  40      18.504  12.312  12.298  1.00  8.05           C
ATOM    159  C   CYS A  40      18.684  12.451  13.784  1.00  7.63           C
ATOM    160  O   CYS A  40      19.533  11.718  14.362  1.00  9.64           O
ATOM    161  N   PRO A  41      17.880  13.266  14.426  1.00  8.00           N
ATOM    162  CA  PRO A  41      17.924  13.421  15.877  1.00  8.96           C
ATOM    163  C   PRO A  41      17.392  12.206  16.594  1.00  9.06           C
ATOM    164  O   PRO A  41      16.652  11.368  16.033  1.00  8.82           O
ATOM    165  N   GLY A  42      17.728  12.124  17.884  1.00  7.55           N
ATOM    166  CA  GLY A  42      17.334  10.956  18.691  1.00  8.00           C
ATOM    167  C   GLY A  42      15.875  10.688  18.871  1.00  7.22           C
ATOM    168  O   GLY A  42      15.434   9.550  19.166  1.00  8.41           O
ATOM    169  N   ASP A  43      15.036  11.747  18.715  1.00  5.54           N
ATOM    170  CA  ASP A  43      13.564  11.573  18.836  1.00  5.85           C
ATOM    171  C   ASP A  43      12.936  11.227  17.470  1.00  5.87           C
ATOM    172  O   ASP A  43      11.720  11.040  17.428  1.00  7.29           O
ATOM    173  N   TYR A  44      13.725  11.174  16.425  1.00  5.22           N
ATOM    174  CA  TYR A  44      13.257  10.745  15.081  1.00  5.56           C
ATOM    175  C   TYR A  44      14.275   9.687  14.612  1.00  4.61           C
ATOM    176  O   TYR A  44      14.930   9.862  13.568  1.00  6.04           O
ATOM    177  N   ALA A  45      14.342   8.640  15.422  1.00  4.76           N
ATOM    178  CA  ALA A  45      15.445   7.667  15.246  1.00  5.89           C
ATOM    179  C   ALA A  45      15.171   6.533  14.280  1.00  6.67           C
ATOM    180  O   ALA A  45      16.093   5.705  14.039  1.00  7.56           O
ATOM    181  N   ASN A  46      13.966   6.502  13.739  1.00  5.80           N
ATOM    182  CA  ASN A  46      13.512   5.395  12.878  1.00  6.15           C
ATOM    183  C   ASN A  46      13.311   5.853  11.455  1.00  6.61           C
ATOM    184  O   ASN A  46      13.733   6.929  11.026  1.00  7.18           O
END`;

const PLDDT = [
  0.45, 0.515, 0.557, 0.569, 0.567, 0.578, 0.618, 0.681, 0.742, 0.777, 0.782,
  0.773, 0.776, 0.807, 0.86, 0.909, 0.933, 0.924, 0.902, 0.892, 0.91, 0.947,
  0.98, 0.98, 0.961, 0.92, 0.892, 0.892, 0.911, 0.927, 0.915, 0.873, 0.818,
  0.776, 0.762, 0.769, 0.772, 0.748, 0.694, 0.629, 0.578, 0.556, 0.556, 0.552,
  0.522, 0.463,
];

function App() {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <div className="app" style={{ height: 240 }}>
      <ProteinStructureViewer
        pdb={PDB}
        plddt={PLDDT}
        showAxes={false}
        showLegend={false}
        showSequenceViewer={false}
        backgroundColor={mode === "light" ? "#f8f8f8" : "#1e1e1e"}
      />
    </div>
  );
}

export default App;
```

## Theming

The viewer reads the active SDS theme for its hover and selection colors and for the sequence panel, and picks a light or dark canvas background to match. Two props override those backgrounds independently: `backgroundColor` for the 3D canvas and `sequenceViewerBackgroundColor` for the sequence panel.

The two accept different formats. Mol\* needs the canvas color as a concrete `#RRGGBB` value, so `backgroundColor` is limited to hex. The sequence panel is styled with CSS, so `sequenceViewerBackgroundColor` takes any CSS color. It paints the panel, the fade that masks residues scrolling under the header, and the "no structure available" state, so the panel stays one color throughout.

## Props

The viewer spreads any remaining props onto its root div, so standard HTML attributes such as `className`, `id`, and `data-testid` work as usual.

| Name                            | Type                          | Default      | Description                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------- | ----------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pdb`                           | `string`                      | - (required) | The structure to render, as raw PDB text.                                                                                                                                                                                                                                                                                                    |
| `plddt`                         | `number[] \| null`            | -            | Per-residue pLDDT confidence on a 0-1 scale, in chain order. When supplied, the structure is colored by confidence unless `residueOverlay` takes over. Residues past the end of the array fall back to mid confidence.                                                                                                                       |
| `residueOverlay`                | `ResidueValueOverlay \| null` | -            | Per-residue values painted over the structure, replacing pLDDT coloring while set. See the table below for its shape.                                                                                                                                                                                                                        |
| `selection`                     | `StructureSelection \| null`  | `null`       | What is selected. Controlled: the camera frames whatever it covers, and clearing it zooms back out. See the table below for its shape.                                                                                                                                                                                                       |
| `hiddenChains`                  | `string[]`                    | -            | Chains hidden from the 3D view, by `chainId`. Leave undefined to let the chain legend's toggles own visibility; passing it takes that over, and the toggles then only report through `onChainVisibilityChange`.                                                                                                                              |
| `chainColors`                   | `Record<string, string>`      | -            | Color per chain, by `chainId`, as `#RRGGBB`. Chains left out fall back to the viewer's palette. Only visible while chain coloring is what is on screen, which is when neither `plddt` nor `residueOverlay` is set.                                                                                                                           |
| `showChainLegend`               | `boolean`                     | `true`       | Show the chain legend, which lists each chain with its color and a visibility toggle. Ignored on a single-chain structure, where there is nothing to tell apart or hide.                                                                                                                                                                     |
| `stats`                         | `(StructureStat \| null)[]`   | -            | Up to three whole-structure stats shown along the bottom. A `null` entry reserves its column without rendering anything, so the columns never shift as values come and go.                                                                                                                                                                   |
| `backgroundColor`               | `string`                      | -            | Canvas background, as `#RRGGBB`. Defaults to the SDS theme's base background, so the canvas follows the surrounding page in both modes.                                                                                                                                                                                                      |
| `sequenceViewerBackgroundColor` | `string`                      | -            | Sequence panel background, as any CSS color. Defaults to the SDS theme's primary surface, so the panel follows the surrounding page in both modes.                                                                                                                                                                                           |
| `showAxes`                      | `boolean`                     | `true`       | Show the orientation axes widget and the reset-camera button.                                                                                                                                                                                                                                                                                |
| `showSequenceViewer`            | `boolean`                     | `true`       | Show the sequence panel pinned along the bottom of the viewer.                                                                                                                                                                                                                                                                               |
| `showLegend`                    | `boolean`                     | `true`       | Show the stats and color scale legend overlaid on the viewer.                                                                                                                                                                                                                                                                                |
| `onResidueClick`                | `function`                    | -            | `(residue: ResidueRef) => void`. Called with the residue under the pointer: `index` (0-based, across the whole structure), `compId`, `chainId`, `seqId` and `insCode`. What the click _selected_ comes through `onSelectionChange`, which a drag makes a range.                                                                              |
| `onResidueHover`                | `function`                    | -            | `(residue: ResidueRef \| null) => void`. Called as the pointer moves over residues, and with `null` when it leaves the structure.                                                                                                                                                                                                            |
| `onSelectionChange`             | `function`                    | -            | `(selection: StructureSelection \| null) => void`. Called with the new selection whenever the user makes one - clicking a residue, dragging across the sequence, clicking a chain caption - and with `null` when they click empty space to clear it. A whole-chain selection arrives as `{ chains: [id] }` rather than as every index on it. |
| `onChainsChange`                | `function`                    | -            | `(chains: ChainRef[]) => void`. Called with the chains found in the structure, whenever a structure is loaded. Fires with `[]` when the structure holds none.                                                                                                                                                                                |
| `onChainVisibilityChange`       | `function`                    | -            | `(hiddenChains: string[]) => void`. Called with the chains now hidden when a visibility toggle is used. Fires whether or not `hiddenChains` is controlled, so a consumer can follow the viewer's own state without owning it.                                                                                                                |

### StructureSelection

What is selected, in the two ways a caller might say it. The two combine: `{ chains: ["A"], residues: [150] }` takes all of chain A plus one residue elsewhere. Both fields are optional; `null` in place of the whole object selects nothing.

| Name       | Type       | Default | Description                                                                                                                                                                                                          |
| ---------- | ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `residues` | `number[]` | -       | 0-based residue indices, counting residues in file order across the whole structure - the same index `plddt` and `residueOverlay` are keyed by.                                                                      |
| `chains`   | `string[]` | -       | Whole chains by `chainId`, each standing for every residue on it. Kept as named rather than expanded into indices, so a whole-chain selection survives a round trip through a consumer's state at its original size. |

### ChainRef

A chain the viewer found in the structure it loaded, reported through `onChainsChange`. `chainId` is the file's own name for the chain, the same one `ResidueRef` reports, and the key every chain-keyed prop takes. A chain carrying several symmetry operators appears once, under the first.

| Name           | Type     | Default      | Description                                              |
| -------------- | -------- | ------------ | -------------------------------------------------------- |
| `chainId`      | `string` | - (required) | Chain as named in the file (`auth_asym_id`), e.g. `"A"`. |
| `label`        | `string` | - (required) | Chain as the sequence panel captions it.                 |
| `startIndex`   | `number` | - (required) | Lowest 0-based residue index on the chain.               |
| `endIndex`     | `number` | - (required) | Highest 0-based residue index on the chain.              |
| `residueCount` | `number` | - (required) | Residues the chain holds.                                |

### ResidueValueOverlay

| Name           | Type                                      | Default              | Description                                                                                                                                                                                         |
| -------------- | ----------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `values`       | `Map<number, number>`                     | - (required)         | 0-based residue index to value. Residues absent from the map read as `0`, so they render in the neutral gray rather than at the bottom of the scale.                                                |
| `max`          | `number`                                  | - (required)         | The value mapped to the top of the color scale.                                                                                                                                                     |
| `min`          | `number`                                  | `0`                  | Values at or below this render in a neutral gray rather than on the scale.                                                                                                                          |
| `colorScale`   | `ColorScale`                              | `PLASMA_COLOR_SCALE` | Scale used to color residues and to draw the legend.                                                                                                                                                |
| `label`        | `string`                                  | -                    | Legend caption, for example "Feature activation".                                                                                                                                                   |
| `tooltip`      | `string`                                  | -                    | Help tooltip title on the legend caption. A string is enough for the common case; use `tooltipProps` for a subtitle, a custom body, or placement. Overrides `tooltipProps.title` when both are set. |
| `tooltipProps` | `Partial<Omit<TooltipProps, "children">>` | -                    | Props forwarded to the SDS Tooltip on the legend caption. The trigger is the caption's help icon, so `children` is omitted.                                                                         |
| `readoutLabel` | `string`                                  | `"Value"`            | Label for the per-residue readout that replaces a stat slot on hover.                                                                                                                               |

### StructureStat

| Name    | Type     | Default      | Description                                      |
| ------- | -------- | ------------ | ------------------------------------------------ |
| `value` | `string` | - (required) | The stat's value, already formatted for display. |
| `label` | `string` | - (required) | The caption shown beneath the value.             |

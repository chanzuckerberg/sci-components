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

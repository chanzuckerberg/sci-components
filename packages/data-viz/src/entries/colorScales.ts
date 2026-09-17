/**
 * Subpath entry: `@czi-sds/data-viz/colorScales`.
 *
 * These helpers are used by `ProteinStructureViewer` and by callers who want to
 * colour something themselves, so without an entry of their own they get
 * grouped into whichever chunk already reaches them — which is the structure
 * viewer's, and therefore Mol*'s. Reading a colour ramp would then cost
 * megabytes of WebGL code.
 *
 * Splitting them out puts them in a chunk reached by three entries instead of
 * two, so they land on their own and stay cheap from either direction.
 */

export {
  PLASMA_COLOR_SCALE,
  sampleColorScale,
  toCssGradient,
} from "../common/colorScales";
export type {
  ColorScale,
  ContinuousColorStop,
  SteppedColorStop,
} from "../common/colorScales";

/**
 * Subpath entry: `@czi-sds/data-viz/colorScales`.
 *
 * Not a component, but it needs its own entry for the same reason they do.
 * These helpers are used by `ProteinStructureViewer` and by callers who want to
 * colour something themselves, so without an entry of their own they get
 * grouped into whichever chunk already reaches them — which is the structure
 * viewer's, and therefore Mol*'s. Reading a colour ramp would then cost
 * megabytes of WebGL code.
 *
 * Splitting them out puts them in a chunk reached by three entries instead of
 * two, so they land on their own and stay cheap from either direction.
 */

// Named rather than `export *`, because the module also holds helpers the
// barrel deliberately keeps internal — `hexToRgb`, `sampleContinuousScale`,
// `sampleSteppedScale`. Re-exporting the lot here would publish them through a
// side door and make this subpath a wider API than the barrel it mirrors.
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

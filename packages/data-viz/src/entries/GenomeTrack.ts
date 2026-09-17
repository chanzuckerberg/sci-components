/**
 * Subpath entry: `@czi-sds/data-viz/GenomeTrack`.
 *
 * See `HeatmapChart.ts` for why these exist. This one has the sharpest case
 * for it: the track draws to a 2D canvas and reaches neither Mol* nor ECharts,
 * so importing it from the barrel costs several megabytes of code it never
 * runs — and under the Content-Security-Policy an MCP App resource runs
 * under, that code is fatal rather than merely wasteful, since both packages
 * contain `new Function`.
 *
 * Re-exports exactly what the barrel exposes for this component, plus a default
 * export, so moving an import from the barrel to this subpath is not also an
 * API change. New public exports must be added in both places, and a new
 * component needs an entry of its own plus a line in the `exports` map;
 * `__tests__/entries.test.ts` compares the two surfaces and fails on drift.
 */

export * from "../core/GenomeTrack";
export { default, default as GenomeTrack } from "../core/GenomeTrack";

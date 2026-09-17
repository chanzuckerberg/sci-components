/**
 * Subpath entry: `@czi-sds/data-viz/ProteinStructureViewer`.
 *
 * See `GenomeTrack.ts` for why these exist: the package's main entry is a
 * barrel, so importing one component from it pulls every other component's
 * dependencies in alongside. Importing from here gives the bundler a graph
 * containing only what this component reaches.
 *
 * Re-exports exactly what the barrel exposes for this component, plus a default
 * export, so moving an import from the barrel to this subpath is not also an
 * API change. New public exports must be added in both places, and a new
 * component needs an entry of its own plus a line in the `exports` map;
 * `__tests__/entries.test.ts` compares the two surfaces and fails on drift.
 */

export * from "../core/ProteinStructureViewer";
export {
  default,
  default as ProteinStructureViewer,
} from "../core/ProteinStructureViewer";

import { makeMockGenomeTrackData } from "./mockGenomeTrackData";

/**
 * Fixtures the stories and tests share.
 *
 * Built at module scope rather than inside each story, which is safe because
 * the generator is deterministic: one fixture object, referentially stable, so
 * a story re-render cannot produce a different genome.
 */

/** Box the stories draw into. Tracks fill their container. */
export const STORY_WIDTH = 860;

/**
 * The locus in the designs: `fixX`, a 289 bp window of E. coli K-12. Small
 * enough that the sequence ruler resolves individual bases when zoomed.
 */
export const DEFAULT_TRACK_DATA = makeMockGenomeTrackData();

/**
 * A 40 kb window, which forces server-side pooling: `stride` climbs above 1 and
 * the sequence drops to null. This is the case where bin-to-coordinate
 * arithmetic earns its unit tests.
 */
export const POOLED_TRACK_DATA = makeMockGenomeTrackData({
  end: 85_000,
  featureCount: 8,
  seed: 4242,
  start: 45_000,
});

/**
 * An organism with no annotation coverage: `annotations` is null, not empty.
 * The row is dropped rather than drawn blank, because an empty annotation row
 * reads as "no genes here" — a claim the payload is not making.
 */
export const UNANNOTATED_TRACK_DATA = makeMockGenomeTrackData({
  seed: 77,
  withAnnotations: false,
});

/**
 * A deployment that cannot draw a chromosome overview: `overview` is null and
 * `caps.overview_available` is false.
 *
 * The minimap then falls back to spanning the payload's own window, and the
 * viewport cannot leave it — there is nothing in the payload that says what is
 * out there, so claiming a chromosome would be inventing one. This is the
 * fixture for that fallback, which is also the behaviour every payload had
 * before the overview was wired up.
 */
export const NO_OVERVIEW_TRACK_DATA = makeMockGenomeTrackData({
  seed: 512,
  withOverview: false,
});

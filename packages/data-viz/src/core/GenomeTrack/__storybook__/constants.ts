import { makeMockGenomeTrackData } from "./mockGenomeTrackData";

/**
 * Fixtures the stories and tests share.
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
 * the sequence drops to null.
 */
export const POOLED_TRACK_DATA = makeMockGenomeTrackData({
  end: 85_000,
  featureCount: 8,
  seed: 4242,
  start: 45_000,
});

/**
 * A deployment that cannot draw a chromosome overview: `overview` is null and
 * `caps.overview_available` is false.
 */
export const NO_OVERVIEW_TRACK_DATA = makeMockGenomeTrackData({
  seed: 512,
  withOverview: false,
});

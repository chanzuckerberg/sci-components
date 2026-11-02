import { makeMockGenomeTrackData } from "./mockGenomeTrackData";

export const STORY_WIDTH = 860;

export const DEFAULT_TRACK_DATA = makeMockGenomeTrackData();

export const POOLED_TRACK_DATA = makeMockGenomeTrackData({
  end: 85_000,
  featureCount: 8,
  seed: 4242,
  start: 45_000,
});

export const NO_OVERVIEW_TRACK_DATA = makeMockGenomeTrackData({
  seed: 512,
  withOverview: false,
});

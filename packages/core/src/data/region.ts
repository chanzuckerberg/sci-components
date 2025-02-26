// The semi-closed interval [start, stop).
export type Interval = {
  start: number;
  stop: number;
};

// An index for a specific dimension or axis in a region.
// TODO: add a unit for the index value(s).
// https://github.com/chanzuckerberg/imaging-active-learning/issues/36
export type DimensionalIndex = {
  dimension: string;
  index: Interval | number;
};

// A region of some dimensional space.
export type Region = Array<DimensionalIndex>;

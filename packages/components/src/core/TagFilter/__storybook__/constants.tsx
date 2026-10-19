export const TAG_FILTER_EXCLUDED_CONTROLS = ["label", "sdsStyle"];

export const TAG_FILTER_COLOR_CONTRAST_RULE = "color-contrast";

export const TAG_FILTER_SDS_STYLES = ["solid", "outline"];

export const TAG_FILTER_DEFAULT_STYLES = {
  display: "inline-grid",
  gridColumnGap: 24,
  gridRowGap: 24,
  gridTemplateColumns: "repeat(1, 1fr)",
  gridTemplateRows: "repeat(1, 1fr)",
};

export const TAG_FILTER_PSEUDO_STATES = [
  "default",
  "hover",
  "active",
  "focus-visible",
];

export const TAG_FILTER_GRID_STYLE = {
  alignItems: "center",
  columnGap: 32,
  display: "grid",
  fontFamily: "sans-serif",
  gridTemplateColumns: `max-content repeat(${TAG_FILTER_PSEUDO_STATES.length}, max-content)`,
  rowGap: 16,
};

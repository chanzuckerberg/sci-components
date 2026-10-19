export const CHIP_EXCLUDED_CONTROLS = ["label", "sdsStyle"];

export const CHIP_COLOR_CONTRAST_RULE = "color-contrast";

export const CHIP_SDS_STYLES = ["solid", "outline"];

export const CHIP_DEFAULT_STYLES = {
  display: "inline-grid",
  gridColumnGap: 24,
  gridRowGap: 24,
  gridTemplateColumns: "repeat(1, 1fr)",
  gridTemplateRows: "repeat(1, 1fr)",
};

export const CHIP_PSEUDO_STATES = [
  "default",
  "hover",
  "active",
  "focus-visible",
];

export const CHIP_GRID_STYLE = {
  alignItems: "center",
  columnGap: 32,
  display: "grid",
  fontFamily: "sans-serif",
  gridTemplateColumns: `max-content repeat(${CHIP_PSEUDO_STATES.length}, max-content)`,
  rowGap: 16,
};

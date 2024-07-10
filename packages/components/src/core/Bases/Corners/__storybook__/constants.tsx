import { Corners } from "src/core/styles";

export const CORNERS_USAGE: Record<keyof Corners, string> = {
  l: "Rounded elements (buttons and inputs)",
  m: "Standard, default radius for corners in UI elements (square buttons, form inputs, modals, tooltips, tags, etc.)",
  none: "Corners on backgrounds for hovered dropdown menus and tables.",
  s: "Corners on elements that are smaller than 20px × 20px.",
};

export const CORNERS_TITLE: Record<keyof Corners, string> = {
  l: "Large Corner",
  m: "Medium Corner",
  none: "No Corner",
  s: "Small Corner",
};

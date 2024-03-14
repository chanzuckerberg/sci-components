import { TooltipExtraProps } from "../style";

export const TOOLTIP_EXCLUDED_CONTROLS = [
  "arrow",
  "arrowOffset",
  "placement",
  "sdsStyle",
  "title",
  "width",
];

export const TOOLTIP_LIVE_PREVIEW_STYLES = {
  alignSelf: "self-start",
  display: "grid",
  gridColumnGap: "80px",
  gridTemplateColumns: "repeat(3, 130px)",
  paddingTop: "80px",
};

export const TOOLTIP_PLACEMENT_STYLES = {
  display: "grid",
  gridColumnGap: "50px",
  gridRowGap: "50px",
  gridTemplateColumns: "repeat(3, 130px",
  gridTemplateRows: "repeat(5, 60px)",
  justifyContent: "center",
  padding: "100px",
};

export const TOOLTIP_SDS_STYLES = ["light", "dark"];
export const TOOLTIP_SUBTITLE_OPTIONS = [
  "Lorem ipsum dolor sit amet",
  undefined,
];
export const TOOLTIP_ARROW_OPTIONS = [false, true];
export const TOOLTIP_ARROW_OFFSET_OPTIONS = [undefined, -120, -60, 0, 60, 120];
export const TOOLTIP_WIDTH_OPTIONS: TooltipExtraProps["width"][] = [
  "default",
  "wide",
];

export const TOOLTIP_DISPLAY_CONTENTS: React.CSSProperties = {
  display: "contents",
};
export const TOOLTIP_MID_LABEL: React.CSSProperties = {
  borderStyle: "solid none none none",
  gridColumn: "1 / 3",
  justifySelf: "stretch",
  paddingTop: 10,
};

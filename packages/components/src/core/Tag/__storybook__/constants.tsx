import Icon from "src/core/Icon";
import { ExtraTagProps } from "../style";
import { WbSunny } from "@mui/icons-material";
import CustomSvgIcon from "src/common/storybook/customSvgIcon";

export const TAG_EXCLUDED_CONTROLS = [
  "color",
  "hover",
  "label",
  "sdsSize",
  "sdsStyle",
  "sdsType",
  "icon",
];

export const TAG_ICONS = [
  undefined,
  "CheckCircle",
  "Loading",
  "ExclamationMarkCircle",
  "Person",
  <WbSunny key="WBSunny" />,
  <CustomSvgIcon key="CustomSvgIcon" />,
];

export const TAG_ICONS_LABELS = [
  "No Icon",
  "SDS Check Circle",
  "SDS Loading",
  "SDS Exclamation Mark",
  "SDS Person",
  "MUI Wb Sunny",
  "Custom SVG Icon",
];

export const TAG_SDS_STYLES: ExtraTagProps["sdsStyle"][] = [
  "rounded",
  "square",
];

export const TAG_SDS_TYPES: ExtraTagProps["sdsType"][] = [
  "primary",
  "secondary",
];

export const TAG_COLOR_CONTRAST_RULE = "color-contrast";

export const TAG_PANEL_COLORS: ExtraTagProps["tagColor"][] = [
  "accent",
  "info",
  "positive",
  "notice",
  "negative",
  "beta",
  ["#000000", "#C65FA7", "#FFD400"],
];

export const TAG_SANS_SERIF_STYLE = { fontFamily: "sans-serif" };

// use PANEL_COLORS to generate colors for ScreenshotTest ...
// ... but for now it can't include "success" or "warning" colors because they fail a11y tests due to known design issues
export const TAG_COLORS: ExtraTagProps["tagColor"][] = TAG_PANEL_COLORS.slice(
  0,
  8
).splice(2, 2);

export const TAG_LIVE_PREVIEW_STYLES = {
  display: "inline-grid",
  gridColumnGap: 24,
  gridRowGap: 24,
  gridTemplateColumns: "repeat(6, auto)",
  gridTemplateRows: "repeat(2, auto)",
};

export const TAG_DISPLAY_CONTENTS_STYLES = {
  display: "contents",
};

export const TAG_MID_LABEL_STYLES = {
  borderStyle: "solid none none none",
  gridColumn: "1 / 6",
  justifySelf: "stretch",
  paddingTop: 10,
};

export const TAG_SCREENSHOT_ICON_OPTIONS = [
  undefined,
  <Icon sdsSize="l" sdsIcon="CheckCircle" key="CheckCircle" sdsType="button" />,
];

export const TAG_HOVER_OPTIONS = [true, false];

export const TAG_GRAY_PRIMARY_COLORS: ExtraTagProps["tagColor"][] = ["neutral"];

export const TAG_GRAY_PRIMARY_TYPES: ExtraTagProps["sdsType"][] = ["primary"];

export const TAG_SUCCESS_WARNING_PRIMARY_COLORS: ExtraTagProps["tagColor"][] = [
  "positive",
  "notice",
];

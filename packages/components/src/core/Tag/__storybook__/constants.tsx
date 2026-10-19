import Icon from "@components/src/core/Icon";
import { ExtraTagProps } from "../style";
import { WbSunny } from "@mui/icons-material";
import CustomSvgIcon from "@components/src/common/storybook/svg/customSvgIcon";
import { action } from "storybook/actions";

export const TAG_EXCLUDED_CONTROLS = [
  "color",
  "hover",
  "label",
  "sdsSize",
  "sdsStyle",
  "sdsType",
  "icon",
];

export const TAG_ICONS = {
  none: undefined,
  checkCircle: "CheckCircle",
  loading: "Loading",
  exclamationMarkCircle: "ExclamationMarkCircle",
  person: "Person",
  wbSunny: <WbSunny key="WBSunny" />,
  customSvgIcon: <CustomSvgIcon key="CustomSvgIcon" />,
};

export const TAG_ICONS_LABELS = {
  none: "No Icon",
  checkCircle: "SDS Check Circle",
  loading: "SDS Loading",
  exclamationMarkCircle: "SDS Exclamation Mark",
  person: "SDS Person",
  wbSunny: "MUI Wb Sunny",
  customSvgIcon: "Custom SVG Icon",
};

export const TAG_SDS_STYLES: ExtraTagProps["sdsStyle"][] = [
  "rounded",
  "square",
];

export const TAG_SDS_TYPES: ExtraTagProps["sdsType"][] = [
  "primary",
  "secondary",
];

export const TAG_ON_CLICK_OPTIONS = {
  action: action("onClick"),
  none: undefined,
};

export const TAG_COLOR_CONTRAST_RULE = "color-contrast";

export const TAG_PANEL_COLORS: Record<string, ExtraTagProps["tagColor"]> = {
  info: "info",
  positive: "positive",
  notice: "notice",
  negative: "negative",
  beta: "beta",
  custom: ["#000000", "#C65FA7", "#FFD400"],
};

export const TAG_SANS_SERIF_STYLE = { fontFamily: "sans-serif" };

// use PANEL_COLORS to generate colors for ScreenshotTest ...
// ... but for now it can't include "success" or "warning" colors because they fail a11y tests due to known design issues
export const TAG_COLORS: ExtraTagProps["tagColor"][] = [
  TAG_PANEL_COLORS.notice,
  TAG_PANEL_COLORS.negative,
];

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
  <Icon sdsSize="l" sdsIcon="CheckCircle" key="CheckCircle" />,
];

export const TAG_HOVER_OPTIONS = [true, false];

export const TAG_GRAY_PRIMARY_COLORS: ExtraTagProps["tagColor"][] = ["neutral"];

export const TAG_GRAY_PRIMARY_TYPES: ExtraTagProps["sdsType"][] = ["primary"];

export const TAG_SUCCESS_WARNING_PRIMARY_COLORS: ExtraTagProps["tagColor"][] = [
  "positive",
  "notice",
];

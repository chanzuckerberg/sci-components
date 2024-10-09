import CustomSdsIcon from "src/common/storybook/customSdsIcon";
import CustomSvgIcon from "src/common/storybook/customSvgIcon";

export const BUTTON_TOGGLE_EXCLUDED_CONTROLS = [
  "sdsSize",
  "icon",
  "sdsStage",
  "sdsType",
];

export const BUTTON_TOGGLE_ICON_OPTIONS = [
  "InfoCircle",
  "SlidersHorizontal",
  "Filter",
  "DotsHorizontal",
  "LinesHorizontal3",
  <CustomSdsIcon key="customSdsIcon" />,
  <CustomSvgIcon key="customIcon" />,
];

export const BUTTON_TOGGLE_ICON_LABELS = [
  "SDS Icon: InfoCircle (s/m/l)",
  "SDS Icon: SlidersHorizontal (m/l)",
  "SDS Icon: Filter (s)",
  "SDS Icon: DotsHorizontal (s/m/l)",
  "SDS Icon: LinesHorizontal3 (s/m/l)",
  "Custom SDS Icon (s/m/l)",
  "Custom SVG Icon (s/m/l)",
];

import CustomSdsIcon from "@components/src/common/storybook/svg/customSdsIcon";
import CustomSvgIcon from "@components/src/common/storybook/svg/customSvgIcon";

export const BUTTON_TOGGLE_EXCLUDED_CONTROLS = [
  "sdsSize",
  "icon",
  "sdsStage",
  "sdsType",
];

export const BUTTON_TOGGLE_ICON_OPTIONS = {
  infoCircle: "InfoCircle",
  slidersHorizontal: "SlidersHorizontal",
  filter: "Filter",
  dotsHorizontal: "DotsHorizontal",
  linesHorizontal3: "LinesHorizontal3",
  customSdsIcon: <CustomSdsIcon key="customSdsIcon" />,
  customSvgIcon: <CustomSvgIcon key="customIcon" />,
};

export const BUTTON_TOGGLE_ICON_LABELS = {
  infoCircle: "SDS Icon: InfoCircle (s/m/l)",
  slidersHorizontal: "SDS Icon: SlidersHorizontal (m/l)",
  filter: "SDS Icon: Filter (s)",
  dotsHorizontal: "SDS Icon: DotsHorizontal (s/m/l)",
  linesHorizontal3: "SDS Icon: LinesHorizontal3 (s/m/l)",
  customSdsIcon: "Custom SDS Icon (s/m/l)",
  customSvgIcon: "Custom SVG Icon (s/m/l)",
};

import CustomSdsIcon from "src/common/storybook/svg/customSdsIcon";
import CustomSvgIcon from "src/common/storybook/svg/customSvgIcon";
import { SDSSizes, SDSTypes } from "./types";

export const BUTTON_ICON_EXCLUDED_CONTROLS = [
  "disabled",
  "icon",
  "sdsSize",
  "sdsType",
];

export const BUTTON_ICON_SDS_TYPES: SDSTypes = [
  "primary",
  "secondary",
  "tertiary",
];

export const BUTTON_ICON_SDS_SIZES: SDSSizes = ["large", "medium", "small"];

export const BUTTON_ICON_DISABLED_OPTIONS = [false, true];

export const BUTTON_ICON_PSEUDO_STATES = [
  "default",
  "hover",
  "active",
  "focus",
];

export const BUTTON_ICON_ICON_OPTIONS = [
  "InfoCircle",
  "DotsHorizontal",
  "Virus",
  "XMark",
  <CustomSdsIcon key="customSdsIcon" />,
  <CustomSvgIcon key="customIcon" />,
];

export const BUTTON_ICON_ICON_LABELS = [
  "SDS Icon: InfoCircle",
  "SDS Icon: DotsHorizontal",
  "SDS Icon: Virus",
  "SDS Icon: XMark",
  "Custom SDS Icon",
  "Custom Icon",
];

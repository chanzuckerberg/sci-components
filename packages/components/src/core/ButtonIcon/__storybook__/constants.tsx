import CustomSdsIcon from "@components/src/common/storybook/svg/customSdsIcon";
import CustomSvgIcon from "@components/src/common/storybook/svg/customSvgIcon";
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

export const BUTTON_ICON_ICON_OPTIONS = {
  infoCircle: "InfoCircle",
  dotsHorizontal: "DotsHorizontal",
  virus: "Virus",
  xMark: "XMark",
  customSdsIcon: <CustomSdsIcon key="customSdsIcon" />,
  customSvgIcon: <CustomSvgIcon key="customIcon" />,
};

export const BUTTON_ICON_ICON_LABELS = {
  infoCircle: "SDS Icon: InfoCircle",
  dotsHorizontal: "SDS Icon: DotsHorizontal",
  virus: "SDS Icon: Virus",
  xMark: "SDS Icon: XMark",
  customSdsIcon: "Custom SDS Icon",
  customSvgIcon: "Custom Icon",
};

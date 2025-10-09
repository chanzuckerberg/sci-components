import { action } from "storybook/actions";
import CustomSdsIcon from "src/common/storybook/customSdsIcon";
import CustomSvgIcon from "src/common/storybook/customSvgIcon";

export const BUTTON_DROPDOWN_EXCLUDED_CONTROLS = [
  "disabled",
  "icon",
  "sdsStyle",
  "sdsType",
  "onClick",
];

export const BUTTON_DROPDOWN_TEXT = "Label";

export const BUTTON_DROPDOWN_ACTIONS = {
  onClick: action("onClick"),
};

export const BUTTON_DROPDOWN_ICON_OPTIONS = [
  "Download",
  "Copy",
  "CirclesOverlap2",
  "TrashCan",
  <CustomSdsIcon key="customSdsIcon" sdsSize="s" />,
  <CustomSvgIcon key="customIcon" style={{ height: "16px", width: "16px" }} />,
];

export const BUTTON_DROPDOWN_ICON_LABELS = [
  "SDS Icon: Download",
  "SDS Icon: Copy",
  "SDS Icon: CirclesOverlap2",
  "SDS Icon: TrashCan",
  "Custom SDS Icon",
  "Custom SVG Icon",
];

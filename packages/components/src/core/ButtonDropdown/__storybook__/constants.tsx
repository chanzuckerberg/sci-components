import { action } from "storybook/actions";
import CustomSdsIcon from "src/common/storybook/svg/customSdsIcon";
import CustomSvgIcon from "src/common/storybook/svg/customSvgIcon";
import Icon from "src/core/Icon";

export const BUTTON_DROPDOWN_EXCLUDED_CONTROLS = [
  "disabled",
  "icon",
  "sdsStyle",
  "sdsType",
  "onClick",
  "size",
  "backgroundOnHover",
  "startIcon",
  "children",
  "backgroundAppearance",
];

export const BUTTON_DROPDOWN_ACTIONS = {
  onClick: action("onClick"),
};

export const BUTTON_DROPDOWN_ICON_OPTIONS = [
  <Icon key="download" sdsIcon="Download" sdsSize="s" />,
  <Icon key="copy" sdsIcon="Copy" sdsSize="s" />,
  <Icon key="circlesOverlap2" sdsIcon="CirclesOverlap2" sdsSize="s" />,
  <Icon key="trashCan" sdsIcon="TrashCan" sdsSize="s" />,
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

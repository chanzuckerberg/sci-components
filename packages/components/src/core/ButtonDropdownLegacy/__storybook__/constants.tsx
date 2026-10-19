import { action } from "storybook/actions";
import CustomSdsIcon from "@components/src/common/storybook/svg/customSdsIcon";
import CustomSvgIcon from "@components/src/common/storybook/svg/customSvgIcon";

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

export const BUTTON_DROPDOWN_ICON_OPTIONS = {
  download: "Download",
  copy: "Copy",
  circlesOverlap2: "CirclesOverlap2",
  trashCan: "TrashCan",
  customSdsIcon: <CustomSdsIcon key="customSdsIcon" sdsSize="s" />,
  customSvgIcon: (
    <CustomSvgIcon key="customIcon" style={{ height: "16px", width: "16px" }} />
  ),
};

export const BUTTON_DROPDOWN_ICON_LABELS = {
  download: "SDS Icon: Download",
  copy: "SDS Icon: Copy",
  circlesOverlap2: "SDS Icon: CirclesOverlap2",
  trashCan: "SDS Icon: TrashCan",
  customSdsIcon: "Custom SDS Icon",
  customSvgIcon: "Custom SVG Icon",
};

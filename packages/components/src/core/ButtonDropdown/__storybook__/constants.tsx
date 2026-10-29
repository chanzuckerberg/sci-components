import { action } from "storybook/actions";
import CustomSdsIcon from "@components/src/common/storybook/svg/customSdsIcon";
import CustomSvgIcon from "@components/src/common/storybook/svg/customSvgIcon";
import Icon from "@components/src/core/Icon";

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

export const BUTTON_DROPDOWN_ICON_OPTIONS = {
  download: <Icon key="download" sdsIcon="Download" sdsSize="s" />,
  copy: <Icon key="copy" sdsIcon="Copy" sdsSize="s" />,
  circlesOverlap2: (
    <Icon key="circlesOverlap2" sdsIcon="CirclesOverlap2" sdsSize="s" />
  ),
  trashCan: <Icon key="trashCan" sdsIcon="TrashCan" sdsSize="s" />,
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

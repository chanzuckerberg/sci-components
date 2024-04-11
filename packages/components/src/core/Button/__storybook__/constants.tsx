import { action } from "@storybook/addon-actions";
import CustomSdsIcon from "src/common/storybook/customSdsIcon";
import CustomSvgIcon from "src/common/storybook/customSvgIcon";
import Icon from "src/core/Icon";

export const BUTTON_EXCLUDED_CONTROLS = [
  "endIcon",
  "startIcon",
  "onClick",
  "sdsStyle",
  "sdsType",
  "text",
  "label",
  "disabled",
  "sdsSize",
  "icon",
  "sdsIconProps",
];

export const BUTTON_SDS_STYLES = ["rounded", "square", "minimal", "icon"];

export const BUTTON_SDS_SIZE = ["small", "medium", "large"];

export const BUTTON_SDS_TYPES = ["primary", "secondary", "tertiary"];

export const BUTTON_TEXT = "Label";

export const BUTTON_ICON_OPTIONS_2 = [
  undefined,
  <Icon key="download" sdsSize="l" sdsIcon="Download" sdsType="button" />,
];

export const BUTTON_DISABLED_OPTIONS = [false, true];

export const BUTTON_PSEUDO_STATES = [
  "default",
  "hover",
  "active",
  "focus-visible",
];

export const BUTTON_ACTIONS = {
  onClick: action("onClick"),
};

export const BUTTON_ICON_OPTIONS = [
  undefined,
  "XMark",
  "Download",
  "Copy",
  "DotsHorizontal",
  "Cube",
  <CustomSdsIcon key="customSdsIcon" />,
  <CustomSvgIcon key="customIcon" />,
];

export const BUTTON_ICON_LABELS = [
  "No Icon",
  "SDS Icon: XMark",
  "SDS Icon: Download",
  "SDS Icon: Copy",
  "SDS Icon: DotsHorizontal",
  "SDS Icon: Cube",
  "Custom SDS Icon",
  "Custom SVG Icon",
];

export const DEFAULT_PLACEMENT_STYLES: React.CSSProperties = {
  display: "grid",
  gridColumnGap: "10px",
  gridRowGap: "0px",
  gridTemplateColumns: "repeat(6, 120px)",
  gridTemplateRows: "1fr",
};

export const MINIMAL_PLACEMENT_STYLES: React.CSSProperties = {
  display: "grid",
  gridColumnGap: "24px",
  gridRowGap: "0px",
  gridTemplateColumns: "repeat(3, min-content)",
  gridTemplateRows: "1fr",
};

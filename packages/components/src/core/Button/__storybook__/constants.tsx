import { action } from "storybook/actions";
import CustomSdsIcon from "@components/src/common/storybook/svg/customSdsIcon";
import CustomSvgIcon from "@components/src/common/storybook/svg/customSvgIcon";
import {
  SDSSizes,
  SDSTypes,
} from "@components/src/core/ButtonIcon/__storybook__/types";
import Icon from "@components/src/core/Icon";

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
  "isAllCaps",
  "backgroundOnHover",
  "size",
  "children",
  "backgroundAppearance",
];

export const BUTTON_SDS_STYLES = ["solid", "outline", "minimal"];

export const BUTTON_SDS_SIZE = ["small", "medium", "large"];

export const BUTTON_SDS_TYPES = ["primary", "secondary", "destructive"];

export const BUTTON_TEXT = "Label";

export const BUTTON_ICON_OPTIONS = {
  none: undefined,
  xMark: <Icon key="xmark" sdsIcon="XMark" sdsSize="s" />,
  download: <Icon key="download" sdsIcon="Download" sdsSize="s" />,
  copy: <Icon key="copy" sdsIcon="Copy" sdsSize="s" />,
  dotsHorizontal: (
    <Icon key="dotsHorizontal" sdsIcon="DotsHorizontal" sdsSize="s" />
  ),
  cube: <Icon key="cube" sdsIcon="Cube" sdsSize="s" />,
  customSdsIcon: <CustomSdsIcon key="customSdsIcon" sdsSize="s" />,
  customSvgIcon: (
    <CustomSvgIcon key="customIcon" style={{ height: "16px", width: "16px" }} />
  ),
};

export const BUTTON_ICON_LABELS = {
  none: "No Icon",
  xMark: "SDS Icon: XMark",
  download: "SDS Icon: Download",
  copy: "SDS Icon: Copy",
  dotsHorizontal: "SDS Icon: DotsHorizontal",
  cube: "SDS Icon: Cube",
  customSdsIcon: "Custom SDS Icon",
  customSvgIcon: "Custom SVG Icon",
};

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

export const SCREENSHOT_BUTTON_ICON_OPTIONS = [undefined, "Download"];

export const SCREENSHOT_BUTTON_SDS_STYLES = ["rounded", "square", "minimal"];

export const SCREENSHOT_BUTTON_SDS_SIZE = ["small", "medium", "large"];

export const SCREENSHOT_BUTTON_SDS_TYPES = [
  "primary",
  "secondary",
  "destructive",
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
  "focus-visible",
];

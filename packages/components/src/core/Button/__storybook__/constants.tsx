import { SparklesIcon } from "@czi-sds/icons";
import {
  CopyIcon,
  CubeIcon,
  DotsThreeIcon,
  DownloadSimpleIcon,
  XIcon,
} from "@phosphor-icons/react";
import { action } from "storybook/actions";
import CustomSvgIcon from "@components/src/common/storybook/svg/customSvgIcon";
import {
  SDSSizes,
  SDSTypes,
} from "@components/src/core/ButtonIcon/__storybook__/types";

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
  x: <XIcon key="x" weight="bold" />,
  download: <DownloadSimpleIcon key="download" weight="bold" />,
  copy: <CopyIcon key="copy" weight="bold" />,
  dotsThree: <DotsThreeIcon key="dotsThree" weight="bold" />,
  cube: <CubeIcon key="cube" weight="bold" />,
  sparkles: <SparklesIcon key="sparkles" weight="bold" />,
  customSvgIcon: (
    <CustomSvgIcon key="customIcon" style={{ height: "16px", width: "16px" }} />
  ),
};

export const BUTTON_ICON_LABELS = {
  none: "No Icon",
  x: "Phosphor X",
  download: "Phosphor DownloadSimple",
  copy: "Phosphor Copy",
  dotsThree: "Phosphor DotsThree",
  cube: "Phosphor Cube",
  sparkles: "@czi-sds/icons Sparkles",
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

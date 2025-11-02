import CustomSdsIcon from "src/common/storybook/svg/customSdsIcon";
import CustomSvgIcon from "src/common/storybook/svg/customSvgIcon";

export const BANNER_EXCLUDED_CONTROLS = [
  "dismissed",
  "dismissible",
  "icon",
  "intent",
  "sdsIconProps",
  "sdsType",
  "textChild",
];

export const BANNER_TEXT = "Banner text lorem ipsum dolor mit";

export const BANNER_ICON_OPTIONS = [
  "CheckCircle",
  "InfoCircle",
  <CustomSdsIcon key="customSdsIcon" sdsSize="s" />,
  <CustomSvgIcon key="customSvgIcon" style={{ height: 16, width: 16 }} />,
];

import CustomSdsIcon from "src/common/storybook/customSdsIcon";
import CustomSvgIcon from "src/common/storybook/customSvgIcon";

export const BANNER_EXCLUDED_CONTROLS = [
  "dismissed",
  "dismissible",
  "icon",
  "sdsIconProps",
  "sdsType",
  "textChild",
];

export const BANNER_TEXT = "Banner text lorem ipsum dolor mit";

export const BANNER_ICON_OPTIONS = [
  "CheckCircle",
  "InfoCircle",
  <CustomSdsIcon key="customSdsIcon" sdsSize="l" />,
  <CustomSvgIcon key="customSvgIcon" />,
];

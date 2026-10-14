import { action } from "storybook/actions";
import CustomSdsIcon from "@components/src/common/storybook/svg/customSdsIcon";
import CustomSvgIcon from "@components/src/common/storybook/svg/customSvgIcon";

export const BANNER_ACTIONS = {
  onClose: action("onClose"),
};

export const BANNER_EXCLUDED_CONTROLS = [
  "children",
  "dismissed",
  "dismissible",
  "icon",
  "intent",
  "sdsIconProps",
  "sdsType",
];

export const BANNER_TEXT = "Banner text lorem ipsum dolor mit";

export const BANNER_ICON_OPTIONS = [
  "CheckCircle",
  "InfoCircle",
  <CustomSdsIcon key="customSdsIcon" sdsSize="s" />,
  <CustomSvgIcon key="customSvgIcon" style={{ height: 16, width: 16 }} />,
];

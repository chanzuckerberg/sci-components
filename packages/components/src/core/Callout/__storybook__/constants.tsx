import { action } from "@storybook/addon-actions";
import CustomSdsIcon from "src/common/storybook/customSdsIcon";
import CustomSvgIcon from "src/common/storybook/customSvgIcon";

export const CALLOUT_EXCLUDED_CONTROLS = [
  "autoDismiss",
  "expandable",
  "icon",
  "intent",
  "onClose",
];

export const CALLOUT_ICON_OPTIONS = [
  <CustomSvgIcon key="customSdsIcon" />,
  <CustomSdsIcon key="customSvgIcon" />,
  "Book",
  "CheckCircle",
];

export const CALLOUT_ON_CLOSE_OPTIONS = [action("onClick"), undefined];

import { action } from "@storybook/addon-actions";
import CustomSdsIcon from "src/common/storybook/customSdsIcon";
import CustomSvgIcon from "src/common/storybook/customSvgIcon";
import { NotificationProps } from "..";

export const NOTIFICATION_EXCLUDED_CONTROLS = [
  "autoDismiss",
  "buttonOnClick",
  "buttonPosition",
  "extraContent",
  "icon",
  "intent",
  "onClose",
  "sdsIconProps",
  "slideDirection",
  "label",
];

export const NOTIFICATION_ICON_OPTIONS = [
  <CustomSvgIcon key="customSdsIcon" />,
  <CustomSdsIcon key="customSvgIcon" />,
  "Book",
  "CheckCircle",
];
export const NOTIFICATION_BUTTON_ON_CLICK_OPTIONS = [
  action("onClick"),
  undefined,
];
export const NOTIFICATION_ON_CLICK_OPTIONS = [action("onClick"), undefined];

export const NOTIFICATION_INTENT_OPTIONS: NotificationProps["intent"][] = [
  "info",
  "negative",
  "positive",
  "notice",
];

export const NOTIFICATION_EXTRA_CONTENT_OPTIONS = [false, true];

export const NOTIFICATION_SCREENSHOT_BUTTON_ON_CLICK_OPTIONS: NotificationProps["buttonOnClick"][] =
  [undefined, action("onClick")];

export const NOTIFICATION_LIVE_PREVIEW_ROW_STYLES = {
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "row",
  gap: "20px",
};

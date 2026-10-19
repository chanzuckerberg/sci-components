import { action } from "storybook/actions";
import CustomSdsIcon from "@components/src/common/storybook/svg/customSdsIcon";
import CustomSvgIcon from "@components/src/common/storybook/svg/customSvgIcon";
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

export const NOTIFICATION_ICON_OPTIONS = {
  customSvgIcon: <CustomSvgIcon key="customSdsIcon" />,
  customSdsIcon: <CustomSdsIcon key="customSvgIcon" />,
  book: "Book",
  checkCircle: "CheckCircle",
};
export const NOTIFICATION_BUTTON_ON_CLICK_OPTIONS = {
  action: action("onClick"),
  none: undefined,
};
export const NOTIFICATION_ON_CLICK_OPTIONS = {
  action: action("onClick"),
  none: undefined,
};

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

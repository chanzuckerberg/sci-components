import CustomSdsIcon from "src/common/storybook/customSdsIcon";
import CustomSvgIcon from "src/common/storybook/customSvgIcon";

export const CALLOUT_EXCLUDED_CONTROLS = [
  "autoDismiss",
  "icon",
  "intent",
  "onClose",
  "sdsStyle",
  "hideTitle",
  "hideBody",
  "title",
  "body",
];

export const CALLOUT_ICON_OPTIONS = [
  <CustomSvgIcon key="customSdsIcon" />,
  <CustomSdsIcon key="customSvgIcon" />,
  "Book",
  "CheckCircle",
];

export const CALLOUT_SDS_STYLE_OPTIONS = [
  "persistent",
  "expandable",
  "dismissible",
];

import CustomSdsIcon from "@components/src/common/storybook/svg/customSdsIcon";
import CustomSvgIcon from "@components/src/common/storybook/svg/customSvgIcon";

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

export const CALLOUT_ICON_OPTIONS = {
  customSvgIcon: <CustomSvgIcon key="customSdsIcon" />,
  customSdsIcon: <CustomSdsIcon key="customSvgIcon" />,
  book: "Book",
  checkCircle: "CheckCircle",
};

export const CALLOUT_SDS_STYLE_OPTIONS = [
  "persistent",
  "expandable",
  "dismissible",
];

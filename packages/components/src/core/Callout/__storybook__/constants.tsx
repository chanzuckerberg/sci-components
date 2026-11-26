import { SparklesIcon } from "@czi-sds/icons";
import { BookIcon, CheckCircleIcon } from "@phosphor-icons/react";
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
  customSvgIcon: <CustomSvgIcon key="customSvgIcon" />,
  sparkles: <SparklesIcon key="sparkles" weight="bold" />,
  book: <BookIcon key="book" weight="bold" />,
  checkCircle: <CheckCircleIcon key="checkCircle" weight="bold" />,
};

export const CALLOUT_SDS_STYLE_OPTIONS = [
  "persistent",
  "expandable",
  "dismissible",
];

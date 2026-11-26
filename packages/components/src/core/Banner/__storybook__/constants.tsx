import { SparklesIcon } from "@czi-sds/icons";
import { CheckCircleIcon, InfoIcon } from "@phosphor-icons/react";
import { action } from "storybook/actions";
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
  "sdsType",
];

export const BANNER_TEXT = "Banner text lorem ipsum dolor mit";

export const BANNER_ICON_OPTIONS = {
  checkCircle: <CheckCircleIcon key="checkCircle" weight="bold" />,
  infoCircle: <InfoIcon key="infoCircle" weight="bold" />,
  sparkles: <SparklesIcon key="sparkles" weight="bold" />,
  customSvgIcon: (
    <CustomSvgIcon key="customSvgIcon" style={{ height: 16, width: 16 }} />
  ),
};

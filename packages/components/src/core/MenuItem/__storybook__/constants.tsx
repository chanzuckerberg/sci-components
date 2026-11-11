import { SparklesIcon } from "@czi-sds/icons";
import { GearIcon } from "@phosphor-icons/react";
import CustomSvgIcon from "@components/src/common/storybook/svg/customSvgIcon";

export const MENU_ITEM_EXCLUDED_CONTROLS = [
  "name",
  "column",
  "disabled",
  "isMultiSelect",
  "icon",
  "sdsStyle",
  "selected",
];

export const MENU_ITEM_ICON_OPTIONS = {
  gear: <GearIcon key="gear" weight="bold" />,
  sparkles: <SparklesIcon key="sparkles" weight="bold" />,
  customSvgIcon: (
    <CustomSvgIcon key="customSvgIcon" sx={{ height: 14, width: 14 }} />
  ),
};

export const MENU_ITEM_MULTI_SELECT_OPTIONS = [false, true];
export const MENU_ITEM_SDS_STYLE_OPTIONS = ["determinate", "indeterminate"];
export const MENU_ITEM_COLUMN_OPTIONS = [undefined, "123"];
export const MENU_ITEM_SCREENSHOT_ICON_OPTIONS = [
  undefined,
  <GearIcon key="gear" weight="bold" />,
];
export const MENU_ITEM_SELECTED_OPTIONS = [false, true];
export const MENU_ITEM_DISABLED_OPTIONS = [false, true];
export const MENU_ITEM_PSEUDO_STATES = ["default", "hover", "active", "focus"];

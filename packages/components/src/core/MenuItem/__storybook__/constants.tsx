import CustomSdsIcon from "src/common/storybook/customSdsIcon";
import CustomSvgIcon from "src/common/storybook/customSvgIcon";

export const MENU_ITEM_EXCLUDED_CONTROLS = [
  "name",
  "column",
  "disabled",
  "isMultiSelect",
  "icon",
  "sdsIconProps",
  "sdsStyle",
  "selected",
];

export const MENU_ITEM_ICON_OPTIONS = [
  "Gear",
  <CustomSdsIcon key="customSdsIcon" sdsSize="s" />,
  <CustomSvgIcon key="customSvgIcon" sx={{ height: 14, width: 14 }} />,
];

export const MENU_ITEM_MULTI_SELECT_OPTIONS = [false, true];
export const MENU_ITEM_SDS_STYLE_OPTIONS = ["determinate", "indeterminate"];
export const MENU_ITEM_COLUMN_OPTIONS = [undefined, "Column"];
/**
 * (thuang): Add `as const` to make sure the type is not widened to `string`
 * and cause type error in <RawMenuItem />
 */
export const MENU_ITEM_SCREENSHOT_ICON_OPTIONS = [undefined, "Gear"] as const;
export const MENU_ITEM_SELECTED_OPTIONS = [false, true];
export const MENU_ITEM_DISABLED_OPTIONS = [false, true];
export const MENU_ITEM_PSEUDO_STATES = ["default", "hover", "active", "focus"];

import Icon from "src/core/Icon";

export const CELL_BASIC_EXCLUDED_CONTROLS = [
  "icon",
  "iconVerticalAlign",
  "primaryText",
  "primaryTextWrapLineCount",
  "secondaryText",
  "secondaryTextWrapLineCount",
  "tertiaryText",
  "tertiaryTextWrapLineCount",
  "shouldShowTooltipOnHover",
  "shouldTextWrap",
  "tooltipProps",
  "horizontalAlign",
  "verticalAlign",
];

export const CELL_BASIC_ICON_OPTIONS = [
  undefined,
  <Icon sdsSize="xs" sdsIcon="Download" key="download" sdsType="static" />,
  <Icon sdsSize="s" sdsIcon="LightBulb" key="lightBulb" sdsType="static" />,
  <Icon sdsSize="l" sdsIcon="Bacteria" key="bacteria" sdsType="static" />,
  <Icon sdsSize="xl" sdsIcon="Flask" key="flask" sdsType="static" />,
];

export const CELL_BASIC_ICON_LABELS = [
  "No Icon",
  "XS Download",
  "S Light bulb",
  "L Bacteria",
  "XL Flask",
];

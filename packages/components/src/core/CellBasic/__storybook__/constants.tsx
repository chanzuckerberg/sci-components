import Icon from "src/core/Icon";
import Tag from "src/core/Tag";
import {
  ButtonIconsGroupBottom,
  ButtonIconsGroupRight,
  EmptySlotBottom,
  EmptySlotRight,
  StyledButton,
} from "./style";

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
  "primaryTextComponentSlotBottom",
  "primaryTextComponentSlotRight",
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

export const CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_RIGHT_OPTIONS = [
  undefined,
  <EmptySlotRight key="componentSlotRight-0">Empty Slot</EmptySlotRight>,
  <Tag
    label="lorem ipsum"
    hover={false}
    sdsStyle="rounded"
    sdsType="secondary"
    style={{ margin: 0 }}
    key="componentSlotRight-1"
  />,
  <ButtonIconsGroupRight key="componentSlotRight-2">
    <StyledButton
      aria-label="Bar Chart Vertical 4"
      icon="BarChartVertical4"
      sdsSize="small"
      sdsType="primary"
      sdsStyle="icon"
    />
    <StyledButton
      aria-label="Copy"
      icon="Copy"
      sdsSize="small"
      sdsType="primary"
      sdsStyle="icon"
    />
    <StyledButton
      aria-label="Search Lines Horizontal 3"
      icon="SearchLinesHorizontal3"
      sdsSize="small"
      sdsType="primary"
      sdsStyle="icon"
    />
    <StyledButton
      aria-label="Download"
      icon="Download"
      sdsSize="small"
      sdsType="primary"
      sdsStyle="icon"
    />
  </ButtonIconsGroupRight>,
];

export const CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_RIGHT_LABELS = [
  "No Component",
  "Empty Slot",
  "Tag",
  "Icon Group",
];

export const CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_OPTIONS = [
  undefined,
  <EmptySlotBottom key="componentSlotBottom-0">Empty Slot</EmptySlotBottom>,
  <div key="componentSlotBottom-1">
    <Tag
      label="lorem ipsum"
      hover={false}
      sdsStyle="rounded"
      sdsType="secondary"
    />
    <Tag label="dollor" hover={false} sdsStyle="rounded" sdsType="secondary" />
    <Tag
      label="sit amet"
      hover={false}
      sdsStyle="rounded"
      sdsType="secondary"
    />
  </div>,
  <ButtonIconsGroupBottom key="componentSlotBottom-2">
    <StyledButton
      aria-label="Bar Chart Vertical 4"
      icon="BarChartVertical4"
      sdsSize="small"
      sdsType="tertiary"
      sdsStyle="icon"
    />
    <StyledButton
      aria-label="Copy"
      icon="Copy"
      sdsSize="small"
      sdsType="tertiary"
      sdsStyle="icon"
    />
    <StyledButton
      aria-label="Search Lines Horizontal 3"
      icon="SearchLinesHorizontal3"
      sdsSize="small"
      sdsType="tertiary"
      sdsStyle="icon"
    />
    <StyledButton
      aria-label="Tree Horizontal"
      icon="TreeHorizontal"
      sdsSize="small"
      sdsType="tertiary"
      sdsStyle="icon"
    />
    <StyledButton
      aria-label="Download"
      icon="Download"
      sdsSize="small"
      sdsType="tertiary"
      sdsStyle="icon"
    />
  </ButtonIconsGroupBottom>,
];

export const CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_LABELS = [
  "No Component",
  "Empty Slot",
  "Tag Group",
  "Icon Group",
];

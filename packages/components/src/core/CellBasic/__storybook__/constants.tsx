import Icon from "src/core/Icon";
import Tag from "src/core/Tag";
import ButtonV2 from "src/core/ButtonV2";
import {
  ButtonIconsGroupBottom,
  ButtonIconsGroupRight,
  EmptySlotBottom,
  EmptySlotRight,
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
  "width",
];

export const CELL_BASIC_ICON_OPTIONS = [
  undefined,
  <Icon sdsSize="xs" sdsIcon="Download" key="download" />,
  <Icon sdsSize="s" sdsIcon="LightBulb" key="lightBulb" />,
  <Icon sdsSize="l" sdsIcon="Bacteria" key="bacteria" />,
  <Icon sdsSize="xl" sdsIcon="Flask" key="flask" />,
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
    <ButtonV2
      aria-label="Bar Chart Vertical 4"
      size="large"
      sdsType="primary"
      sdsStyle="minimal"
    >
      <Icon sdsIcon="BarChartVertical4" sdsSize="s" />
    </ButtonV2>
    <ButtonV2
      aria-label="Copy"
      sdsType="primary"
      sdsStyle="minimal"
      size="large"
    >
      <Icon sdsIcon="Copy" sdsSize="s" />
    </ButtonV2>
    <ButtonV2
      aria-label="Search Lines Horizontal 3"
      size="large"
      sdsType="primary"
      sdsStyle="minimal"
    >
      <Icon sdsIcon="SearchLinesHorizontal3" sdsSize="s" />
    </ButtonV2>
    <ButtonV2
      aria-label="Download"
      size="large"
      sdsType="primary"
      sdsStyle="minimal"
    >
      <Icon sdsIcon="Download" sdsSize="s" />
    </ButtonV2>
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
  <div key="componentSlotBottom-1" style={{ display: "flex", gap: "4px" }}>
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
  <ButtonIconsGroupBottom
    key="componentSlotBottom-2"
    style={{ display: "flex", gap: "4px" }}
  >
    <ButtonV2
      aria-label="Bar Chart Vertical 4"
      size="large"
      sdsType="secondary"
      sdsStyle="minimal"
      backgroundOnHover={false}
    >
      <Icon sdsIcon="BarChartVertical4" sdsSize="s" />
    </ButtonV2>
    <ButtonV2
      aria-label="Copy"
      size="large"
      sdsType="secondary"
      sdsStyle="minimal"
      backgroundOnHover={false}
    >
      <Icon sdsIcon="Copy" sdsSize="s" />
    </ButtonV2>
    <ButtonV2
      aria-label="Search Lines Horizontal 3"
      size="large"
      sdsType="secondary"
      sdsStyle="minimal"
      backgroundOnHover={false}
    >
      <Icon sdsIcon="SearchLinesHorizontal3" sdsSize="s" />
    </ButtonV2>
    <ButtonV2
      aria-label="Tree Horizontal"
      size="large"
      sdsType="secondary"
      sdsStyle="minimal"
      backgroundOnHover={false}
    >
      <Icon sdsIcon="TreeHorizontal" sdsSize="s" />
    </ButtonV2>
    <ButtonV2
      aria-label="Download"
      size="large"
      sdsType="secondary"
      sdsStyle="minimal"
      backgroundOnHover={false}
    >
      <Icon sdsIcon="Download" sdsSize="s" />
    </ButtonV2>
  </ButtonIconsGroupBottom>,
];

export const CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_LABELS = [
  "No Component",
  "Empty Slot",
  "Tag Group",
  "Icon Group",
];

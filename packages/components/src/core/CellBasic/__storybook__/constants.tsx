import Icon from "@components/src/core/Icon";
import Tag from "@components/src/core/Tag";
import Button from "@components/src/core/Button";
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

export const CELL_BASIC_ICON_OPTIONS = {
  none: undefined,
  download: <Icon sdsSize="xs" sdsIcon="Download" key="download" />,
  lightBulb: <Icon sdsSize="s" sdsIcon="LightBulb" key="lightBulb" />,
  bacteria: <Icon sdsSize="l" sdsIcon="Bacteria" key="bacteria" />,
  flask: <Icon sdsSize="xl" sdsIcon="Flask" key="flask" />,
};

export const CELL_BASIC_ICON_LABELS = {
  none: "No Icon",
  download: "XS Download",
  lightBulb: "S Light bulb",
  bacteria: "L Bacteria",
  flask: "XL Flask",
};

export const CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_RIGHT_OPTIONS = {
  none: undefined,
  emptySlot: (
    <EmptySlotRight key="componentSlotRight-0">Empty Slot</EmptySlotRight>
  ),
  tag: (
    <Tag
      label="lorem ipsum"
      hover={false}
      sdsStyle="rounded"
      sdsType="secondary"
      style={{ margin: 0 }}
      key="componentSlotRight-1"
    />
  ),
  iconGroup: (
    <ButtonIconsGroupRight key="componentSlotRight-2">
      <Button
        aria-label="Bar Chart Vertical 4"
        size="large"
        sdsType="primary"
        sdsStyle="minimal"
      >
        <Icon sdsIcon="BarChartVertical4" sdsSize="s" />
      </Button>
      <Button
        aria-label="Copy"
        sdsType="primary"
        sdsStyle="minimal"
        size="large"
      >
        <Icon sdsIcon="Copy" sdsSize="s" />
      </Button>
      <Button
        aria-label="Search Lines Horizontal 3"
        size="large"
        sdsType="primary"
        sdsStyle="minimal"
      >
        <Icon sdsIcon="SearchLinesHorizontal3" sdsSize="s" />
      </Button>
      <Button
        aria-label="Download"
        size="large"
        sdsType="primary"
        sdsStyle="minimal"
      >
        <Icon sdsIcon="Download" sdsSize="s" />
      </Button>
    </ButtonIconsGroupRight>
  ),
};

export const CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_RIGHT_LABELS = {
  none: "No Component",
  emptySlot: "Empty Slot",
  tag: "Tag",
  iconGroup: "Icon Group",
};

export const CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_OPTIONS = {
  none: undefined,
  emptySlot: (
    <EmptySlotBottom key="componentSlotBottom-0">Empty Slot</EmptySlotBottom>
  ),
  tagGroup: (
    <div key="componentSlotBottom-1" style={{ display: "flex", gap: "4px" }}>
      <Tag
        label="lorem ipsum"
        hover={false}
        sdsStyle="rounded"
        sdsType="secondary"
      />
      <Tag
        label="dollor"
        hover={false}
        sdsStyle="rounded"
        sdsType="secondary"
      />
      <Tag
        label="sit amet"
        hover={false}
        sdsStyle="rounded"
        sdsType="secondary"
      />
    </div>
  ),
  iconGroup: (
    <ButtonIconsGroupBottom
      key="componentSlotBottom-2"
      style={{ display: "flex", gap: "4px" }}
    >
      <Button
        aria-label="Bar Chart Vertical 4"
        size="large"
        sdsType="secondary"
        sdsStyle="minimal"
        backgroundOnHover={false}
      >
        <Icon sdsIcon="BarChartVertical4" sdsSize="s" />
      </Button>
      <Button
        aria-label="Copy"
        size="large"
        sdsType="secondary"
        sdsStyle="minimal"
        backgroundOnHover={false}
      >
        <Icon sdsIcon="Copy" sdsSize="s" />
      </Button>
      <Button
        aria-label="Search Lines Horizontal 3"
        size="large"
        sdsType="secondary"
        sdsStyle="minimal"
        backgroundOnHover={false}
      >
        <Icon sdsIcon="SearchLinesHorizontal3" sdsSize="s" />
      </Button>
      <Button
        aria-label="Tree Horizontal"
        size="large"
        sdsType="secondary"
        sdsStyle="minimal"
        backgroundOnHover={false}
      >
        <Icon sdsIcon="TreeHorizontal" sdsSize="s" />
      </Button>
      <Button
        aria-label="Download"
        size="large"
        sdsType="secondary"
        sdsStyle="minimal"
        backgroundOnHover={false}
      >
        <Icon sdsIcon="Download" sdsSize="s" />
      </Button>
    </ButtonIconsGroupBottom>
  ),
};

export const CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_LABELS = {
  none: "No Component",
  emptySlot: "Empty Slot",
  tagGroup: "Tag Group",
  iconGroup: "Icon Group",
};

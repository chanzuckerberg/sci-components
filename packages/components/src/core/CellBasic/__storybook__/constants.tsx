import {
  ChartBarIcon,
  CopyIcon,
  DownloadSimpleIcon,
  FlaskIcon,
  LightbulbIcon,
  ListMagnifyingGlassIcon,
  TreeStructureIcon,
  VirusIcon,
} from "@phosphor-icons/react";
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
  download: <DownloadSimpleIcon weight="bold" size={12} key="download" />,
  lightBulb: <LightbulbIcon weight="bold" size={16} key="lightBulb" />,
  bacteria: <VirusIcon weight="bold" size={24} key="bacteria" />,
  flask: <FlaskIcon weight="bold" size={32} key="flask" />,
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
      sdsStyle="outline"
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
        <ChartBarIcon weight="bold" />
      </Button>
      <Button
        aria-label="Copy"
        sdsType="primary"
        sdsStyle="minimal"
        size="large"
      >
        <CopyIcon weight="bold" />
      </Button>
      <Button
        aria-label="Search Lines Horizontal 3"
        size="large"
        sdsType="primary"
        sdsStyle="minimal"
      >
        <ListMagnifyingGlassIcon weight="bold" />
      </Button>
      <Button
        aria-label="Download"
        size="large"
        sdsType="primary"
        sdsStyle="minimal"
      >
        <DownloadSimpleIcon weight="bold" />
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
      <Tag label="lorem ipsum" sdsStyle="outline" />
      <Tag label="dollor" sdsStyle="outline" />
      <Tag label="sit amet" sdsStyle="outline" />
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
        <ChartBarIcon weight="bold" />
      </Button>
      <Button
        aria-label="Copy"
        size="large"
        sdsType="secondary"
        sdsStyle="minimal"
        backgroundOnHover={false}
      >
        <CopyIcon weight="bold" />
      </Button>
      <Button
        aria-label="Search Lines Horizontal 3"
        size="large"
        sdsType="secondary"
        sdsStyle="minimal"
        backgroundOnHover={false}
      >
        <ListMagnifyingGlassIcon weight="bold" />
      </Button>
      <Button
        aria-label="Tree Horizontal"
        size="large"
        sdsType="secondary"
        sdsStyle="minimal"
        backgroundOnHover={false}
      >
        <TreeStructureIcon weight="bold" />
      </Button>
      <Button
        aria-label="Download"
        size="large"
        sdsType="secondary"
        sdsStyle="minimal"
        backgroundOnHover={false}
      >
        <DownloadSimpleIcon weight="bold" />
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

/* eslint-disable no-use-before-define */
import { Args, Meta } from "@storybook/react-webpack5";
import { CellBasic } from "./stories/default";
import {
  CELL_BASIC_EXCLUDED_CONTROLS,
  CELL_BASIC_ICON_LABELS,
  CELL_BASIC_ICON_OPTIONS,
  CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_LABELS,
  CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_OPTIONS,
  CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_RIGHT_LABELS,
  CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_RIGHT_OPTIONS,
} from "./constants";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    horizontalAlign: {
      control: { type: "select" },
      defaultValue: { summary: "left" },
      description: "Horizontal alignment of the cell",
      options: ["left", "right"],
    },
    icon: {
      control: {
        labels: CELL_BASIC_ICON_LABELS,
        type: "select",
      },
      defaultValue: { summary: "null" },
      description: "Icon to be displayed",
      mapping: CELL_BASIC_ICON_OPTIONS,
      options: Object.keys(CELL_BASIC_ICON_OPTIONS),
    },
    iconVerticalAlign: {
      control: { type: "select" },
      defaultValue: { summary: "top" },
      description: "Vertical alignment of the icon",
      options: ["top", "center", "bottom"],
    },
    primaryText: {
      control: { type: "text" },
      description: "Primary text to be displayed",
    },
    primaryTextComponentSlotBottom: {
      control: {
        labels: CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_LABELS,
        type: "select",
      },
      defaultValue: { summary: "null" },
      description: `Component slot below primary text. This will only show if 
        there is no secondary or tertiary text. Remove the default values of 
        secondary and tertiary text to see this in action.`,
      mapping: CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_OPTIONS,
      options: Object.keys(
        CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_OPTIONS
      ),
    },
    primaryTextComponentSlotRight: {
      control: {
        labels: CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_RIGHT_LABELS,
        type: "select",
      },
      defaultValue: { summary: "null" },
      description: "Component slot to the right of primary text",
      mapping: CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_RIGHT_OPTIONS,
      options: Object.keys(
        CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_RIGHT_OPTIONS
      ),
    },
    primaryTextWrapLineCount: {
      control: { type: "number" },
      defaultValue: { summary: "3" },
      description: "Number of lines to wrap the primary text",
    },
    secondaryText: {
      control: { type: "text" },
      description: "Secondary text to be displayed",
    },
    secondaryTextWrapLineCount: {
      control: { type: "number" },
      defaultValue: { summary: "1" },
      description: "Number of lines to wrap the secondary text",
    },
    shouldShowTooltipOnHover: {
      control: { type: "boolean" },
      defaultValue: { summary: "true" },
      description: "Show tooltip on hover",
    },
    shouldTextWrap: {
      control: { type: "boolean" },
      defaultValue: { summary: "true" },
      description: "Wrap text",
    },
    tabularNums: {
      control: { type: "boolean" },
      defaultValue: { summary: "true" },
      description: "Whether to display the primary text in tabular numbers",
    },
    tertiaryText: {
      control: { type: "text" },
      defaultValue: { summary: "null" },
      description: "Tertiary text to be displayed",
    },
    tertiaryTextWrapLineCount: {
      control: { type: "number" },
      defaultValue: { summary: "1" },
      description: "Number of lines to wrap the tertiary text",
    },
    tooltipProps: {
      control: { type: "object" },
      defaultValue: { summary: "null" },
      description: "Props for the tooltip",
    },
    verticalAlign: {
      control: { type: "select" },
      defaultValue: { summary: "top" },
      description: "Vertical alignment of the cell",
      options: ["top", "center", "bottom"],
    },
    width: {
      control: { type: "text" },
      defaultValue: { summary: "auto" },
      description: "Width of the cell",
    },
  },
  component: CellBasic,
  parameters: {
    controls: {
      expanded: true,
    },
  },
  title: "Components/Table/CellBasic",
} as Meta;

// Default

export const Default = {
  args: {
    primaryText: "Primary Text",
    primaryTextWrapLineCount: 3,
    secondaryText: "Secondary Text",
    secondaryTextWrapLineCount: 1,
    shouldShowTooltipOnHover: true,
    shouldTextWrap: true,
    tabularNums: false,
    tertiaryText: "Tertiary Text",
    tertiaryTextWrapLineCount: 1,
    tooltipProps: { sdsStyle: "dark" },
    width: "300px",
  },
};

// Test

export const Test = {
  args: {
    primaryText: "Primary text",
    secondaryText: "Secondary Text",
  },
  parameters: {
    controls: {
      exclude: CELL_BASIC_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};

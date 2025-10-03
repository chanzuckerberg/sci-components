/* eslint-disable no-use-before-define */
import { Args, Meta } from "@storybook/react-webpack5";
import { TableRow } from "./stories/default";
import { TABLE_ROW_EXCLUDED_CONTROLS } from "./constants";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    hover: {
      control: { type: "boolean" },
    },
    rowHeight: {
      control: { type: "number" },
    },
    selected: {
      control: { type: "boolean" },
    },
    shouldShowTooltipOnHover: {
      control: { type: "boolean" },
    },
    tooltipProps: {
      control: { type: "object" },
    },
    tooltipSubtitle: {
      control: { type: "text" },
    },
    tooltipText: {
      control: { type: "text" },
    },
    useDivider: {
      control: { type: "boolean" },
    },
  },
  component: TableRow,
  title: "Components/Table/TableRow",
} as Meta;

// Default

export const Default = {
  args: {
    disabled: false,
    hover: true,
    selected: false,
    shouldShowTooltipOnHover: true,
    tooltipProps: { sdsStyle: "dark" },
    tooltipText: "This is a TableRow component",
    useDivider: true,
  },
};

// Test

export const Test = {
  parameters: {
    controls: {
      exclude: TABLE_ROW_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} data-testid="table-row" />,
};

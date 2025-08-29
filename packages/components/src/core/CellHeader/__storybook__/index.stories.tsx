import { Args, Meta } from "@storybook/react-webpack5";
import { CELL_HEADER_EXCLUDED_CONTROLS } from "./constants";
import { TestDemo } from "./stories/test";
import { CellHeader } from "./stories/default";

export default {
  argTypes: {
    active: {
      control: { type: "boolean" },
    },
    direction: {
      control: { type: "select" },
      options: ["asc", "desc"],
    },
    hideSortIcon: {
      control: { type: "boolean" },
    },
    horizontalAlign: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
    hover: {
      control: { type: "boolean" },
    },
    shouldShowTooltipOnHover: {
      control: { type: "boolean" },
    },
    tooltipProps: {
      control: { type: "object" },
    },
    tooltipText: {
      control: { type: "text" },
    },
    width: {
      control: { type: "text" },
    },
  },
  component: CellHeader,
  title: "Components/Table/CellHeader",
} as Meta;

// Default

export const Default = {
  args: {
    active: false,
    direction: "desc",
    hideSortIcon: false,
    hover: false,
    shouldShowTooltipOnHover: true,
    tooltipProps: { sdsStyle: "dark" },
    tooltipText: "This is a header cell",
  },
};

// Test

export const Test = {
  parameters: {
    controls: {
      exclude: CELL_HEADER_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};

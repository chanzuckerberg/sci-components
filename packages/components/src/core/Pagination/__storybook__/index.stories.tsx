import { Args, Meta } from "@storybook/react-webpack5";
import { PAGINATION_EXCLUDED_CONTROLS } from "./constants";
import { Pagination } from "./stories/default";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    pageSize: {
      control: { type: "number" },
    },
    sdsStyle: {
      control: { type: "select" },
      options: ["round", "square"],
    },
    siblingCount: {
      control: { type: "number" },
    },
    totalCount: {
      control: { type: "number" },
    },
    truncateDropdown: {
      control: { type: "boolean" },
    },
  },
  component: Pagination,
  title: "Components/Table/Pagination",
} as Meta;

// Default

export const Default = {
  args: {
    pageSize: 5,
    siblingCount: 1,
    totalCount: 100,
  },
};

// Test

export const Test = {
  parameters: {
    controls: {
      exclude: PAGINATION_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};

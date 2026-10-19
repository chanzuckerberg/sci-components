import { Args, Meta } from "@storybook/react-vite";
import { PAGINATION_EXCLUDED_CONTROLS } from "./constants";
import { Pagination } from "./stories/default";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    pageSize: {
      control: { type: "number" },
      description:
        "Required. How many items fit on a page, which together with totalCount gives the number of pages. Must be at least 1; a smaller value throws.",
    },
    sdsStyle: {
      control: { type: "select" },
      description:
        "Whether the page and chevron targets are circles or rounded squares.",
      options: ["round", "square"],
      table: {
        defaultValue: { summary: "round" },
      },
    },
    siblingCount: {
      control: { type: "number" },
      description:
        "How many page numbers to keep on each side of the current page before the rest collapse into an ellipsis.",
      table: {
        defaultValue: { summary: "1" },
      },
    },
    totalCount: {
      control: { type: "number" },
      description:
        "Required. Total number of items being paged through: the whole set, not the current page.",
    },
    truncateDropdown: {
      control: { type: "boolean" },
      description:
        "When true the ellipsis is a menu of the pages it stands for. When false it is a disabled placeholder, and those pages can only be reached by stepping through with the chevrons.",
      table: {
        defaultValue: { summary: "true" },
      },
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

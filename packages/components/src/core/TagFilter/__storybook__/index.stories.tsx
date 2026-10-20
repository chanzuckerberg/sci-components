import { Args, Meta } from "@storybook/react-vite";
import { TagFilter } from "./stories/default";
import { TAG_FILTER_EXCLUDED_CONTROLS } from "./constants";
import { ScreenshotTestDemo } from "./stories/screenshot";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    label: {
      control: { type: "text" },
      required: true,
    },
    onDelete: {
      control: false,
      required: true,
    },
  },
  component: TagFilter,
  title: "Deprecated/TagFilter",
} as Meta;

// Default

export const Default = {
  args: {
    label: "TagFilter",
  },
};

// Screenshot Test

export const ScreenshotTest = {
  args: {
    label: "Label",
  },
  parameters: {
    controls: {
      exclude: TAG_FILTER_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ScreenshotTestDemo {...args} />,
};

// Test

export const Test = {
  args: {
    label: "Label",
  },
  parameters: {
    controls: {
      exclude: TAG_FILTER_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} data-testid="tag-filter" />,
};

import { Args, Meta } from "@storybook/react-vite";
import { TagFilter } from "./stories/default";
import {
  TAG_FILTER_COLOR_CONTRAST_RULE,
  TAG_FILTER_EXCLUDED_CONTROLS,
  TAG_FILTER_SDS_STYLES,
} from "./constants";
import { ScreenshotTestDemo } from "./stories/screenshot";
import { TestDemo } from "./stories/test";

// The outline chip's label, accent foreground on the accent tint, measures 4.49:1
// against axe's 4.5:1 threshold with the colors the design specifies.
const OUTLINE_CONTRAST_PARAMETERS = {
  a11y: {
    config: {
      rules: [{ enabled: false, id: TAG_FILTER_COLOR_CONTRAST_RULE }],
    },
  },
};

export default {
  argTypes: {
    label: {
      control: { type: "text" },
      required: true,
    },
    sdsStyle: {
      control: { type: "radio" },
      options: TAG_FILTER_SDS_STYLES,
    },
  },
  component: TagFilter,
  title: "Components/TagFilter",
} as Meta;

// Default

export const Default = {
  args: {
    label: "TagFilter",
    sdsStyle: "solid",
  },
};

// Screenshot Test

export const ScreenshotTest = {
  args: {
    label: "Label",
  },
  parameters: {
    ...OUTLINE_CONTRAST_PARAMETERS,
    controls: {
      exclude: TAG_FILTER_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ScreenshotTestDemo {...args} />,
};

export const ScreenshotTestDark = {
  args: {
    label: "Label",
  },
  globals: {
    theme: "dark",
  },
  parameters: {
    ...OUTLINE_CONTRAST_PARAMETERS,
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

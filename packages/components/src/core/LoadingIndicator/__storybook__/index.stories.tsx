import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { LoadingIndicator } from "./stories/default";
import { LIST_EXCLUDED_CONTROLS } from "./constants";
import { LivePreviewDemo } from "./stories/livePreview";
import { ScreenReaderDemo } from "./stories/screenReader";

export default {
  argTypes: {
    sdsStyle: {
      control: { type: "select" },
      options: ["minimal", "tag"],
    },
  },
  component: LoadingIndicator,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/LoadingIndicator",
} as Meta;

// Default

export const Default = {
  args: {
    sdsStyle: "minimal",
  },
};

// Custom Aria Label

export const CustomAriaLabel = {
  args: {
    "aria-label": "Loading cats list...",
    sdsStyle: "minimal",
  },
  parameters: {
    controls: {
      exclude: LIST_EXCLUDED_CONTROLS,
    },
  },
};

// Screen Reader Demo

export const ScreenReaderTest = {
  parameters: {
    controls: {
      exclude: LIST_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ScreenReaderDemo {...args} />,
};

// Test

export const Test = {
  parameters: {
    controls: {
      exclude: LIST_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { LoadingIndicator } from "./stories/default";
import { LIST_EXCLUDED_CONTROLS } from "./constants";
import { LivePreviewDemo } from "./stories/livePreview";

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

// Live Preview

export const LivePreview = {
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

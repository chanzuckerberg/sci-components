import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { SegmentedControl } from "./stories/default";
import { SEGMENTED_CONTROL_EXCLUDED_CONTROLS } from "./constants";
import { LivePreviewDemo } from "./stories/livePreview";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    buttonDefinition: {
      control: {
        type: "object",
      },
    },
  },
  component: SegmentedControl,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/SegmentedControl",
} as Meta;

// Default

export const Default = {
  args: {
    buttonDefinition: [
      { icon: "List", tooltipText: "List A", value: "A" },
      { icon: "List", tooltipText: "List B", value: "B" },
      { icon: "List", tooltipText: "List C", value: "C" },
      { icon: "List", tooltipText: "List D", value: "D" },
    ],
  },
  render: SegmentedControl,
};

// Live Preview

export const LivePreview = {
  parameters: {
    controls: {
      exclude: SEGMENTED_CONTROL_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Test

export const Test = {
  args: {
    buttonDefinition: [
      { icon: "List", tooltipText: "List A", value: "A" },
      { icon: "List", tooltipText: "List B", value: "B" },
      { icon: "Table", tooltipText: "Table", value: "Table" },
      { icon: "People", tooltipText: "People", value: "People" },
    ],
  },
  parameters: {
    controls: {
      exclude: SEGMENTED_CONTROL_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};

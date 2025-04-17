import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import {
  TOOLTIP_TABLE_DATA,
  TOOLTIP_TABLE_EXCLUDED_CONTROLS,
} from "./constants";
import { TooltipTableContent } from "./stories/default";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    contentAlert: {
      control: { type: "select" },
      options: ["String", "Element", "None"],
    },
    itemAlign: {
      control: { type: "radio" },
      options: ["right", "left"],
    },
    showSectionHeader: {
      control: { type: "boolean" },
    },
  },
  component: TooltipTableContent,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/TooltipTable",
} as Meta;

// Default

export const Default = {
  args: {
    contentAlert: "None",
    data: TOOLTIP_TABLE_DATA,
    itemAlign: "right",
    showSectionHeader: true,
  },
};

// Test

export const Test = {
  parameters: {
    controls: {
      exclude: TOOLTIP_TABLE_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};

import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { TooltipCondensed } from "./stories/default";
import { TOOLTIP_CONDENSED_EXCLUDED_CONTROLS } from "./constants";

export default {
  argTypes: {
    hasInvertedStyle: {
      control: { type: "boolean" },
    },
    indicator: {
      control: { type: "boolean" },
    },
    indicatorColor: {
      control: { type: "color" },
    },
  },
  component: TooltipCondensed,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/TooltipCondensed",
} as Meta;

// Default

export const Default = {
  args: {
    hasInvertedStyle: false,
    title: "Label",
  },
};

// Test

export const Test = {
  args: {
    title: "Test",
  },
  parameters: {
    controls: {
      exclude: TOOLTIP_CONDENSED_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => (
    <TooltipCondensed {...args} data-testid="tooltip-condensed" />
  ),
};

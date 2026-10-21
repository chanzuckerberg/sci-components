import { Args, Meta } from "@storybook/react-vite";
import { TooltipCondensed } from "./stories/default";
import { TOOLTIP_CONDENSED_EXCLUDED_CONTROLS } from "./constants";

export default {
  argTypes: {
    indicator: {
      control: { type: "boolean" },
      description: "Draws a 12px round dot before the text.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    indicatorColor: {
      control: { type: "color" },
      description:
        "The dot's colour, as a CSS colour. Without it the dot occupies its space but cannot be seen.",
    },
    title: {
      control: { type: "text" },
      description:
        "The label to show. Pass null when the content is coming through componentSlot instead.",
    },
  },
  component: TooltipCondensed,
  title: "Components/TooltipCondensed",
} as Meta;

// Default

export const Default = {
  args: {
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

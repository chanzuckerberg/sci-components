import { Args, Meta } from "@storybook/react-vite";
import {
  TOOLTIP_TABLE_DATA,
  TOOLTIP_TABLE_EXCLUDED_CONTROLS,
} from "./constants";
import { TooltipTableContent } from "./stories/default";
import { TestDemo } from "./stories/test";
import { WithinTooltipDemo } from "./stories/withTooltip";

export default {
  argTypes: {
    contentAlert: {
      control: { type: "select" },
      description:
        "A note above the whole table, for a caveat about the numbers. Takes an element, so it can hold a link. The story switches between a sample string, a sample element and none.",
      options: ["String", "Element", "None"],
    },
    data: {
      control: { type: "object" },
      description:
        "The sections, drawn in order and separated by dividers. A section's label heads it, its dataRows fill it, and disabled greys the whole block.",
    },
    itemAlign: {
      control: { type: "radio" },
      description:
        "Which side of its column each value sits on. Right lines numbers up with each other.",
      options: ["right", "left"],
      table: {
        defaultValue: { summary: "right" },
      },
    },
    showSectionHeader: {
      control: { type: "boolean" },
      description:
        "Whether section labels are drawn. False hides all of them; the dividers between sections stay.",
      table: {
        defaultValue: { summary: "true" },
      },
    },
  },
  component: TooltipTableContent,
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

// Within Tooltip

export const WithinTooltip = {
  args: {
    contentAlert: "None",
    data: TOOLTIP_TABLE_DATA,
    itemAlign: "right",
    showSectionHeader: true,
  },
  render: (args: Args) => <WithinTooltipDemo {...args} />,
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

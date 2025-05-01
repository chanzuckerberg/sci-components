import { Meta } from "@storybook/react";
import { BARCHART_TOOLTIP_OPTIONS } from "./constants";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { BarChart } from "./stories/default";

export default {
  argTypes: {
    echartsRendererMode: {
      control: {
        labels: ["Canvas", "SVG"],
        type: "select",
      },
      options: ["canvas", "svg"],
    },
    tooltip: {
      control: {
        labels: ["No tooltip", "Show Tooltip"],
        type: "select",
      },
      mapping: BARCHART_TOOLTIP_OPTIONS,
      options: Object.keys(BARCHART_TOOLTIP_OPTIONS),
    },
  },
  component: BarChart,
  parameters: {
    badges: [BADGE.BETA],
    chromatic: {
      disableSnapshot: true,
    },
    snapshot: {
      skip: true,
    },
  },
  title: "Data Viz/BarChart [beta]",
} as Meta;

// Default

export const Default = {
  args: {
    echartsRendererMode: "svg",
    tooltip: BARCHART_TOOLTIP_OPTIONS[1],
  },
  parameters: {},
};

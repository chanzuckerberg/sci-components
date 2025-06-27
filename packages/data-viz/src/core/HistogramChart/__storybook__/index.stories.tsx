import { Meta } from "@storybook/react";
import { HISTOGRAM_TOOLTIP_OPTIONS } from "./constants";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { HistogramChart } from "./stories/default";

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
      mapping: HISTOGRAM_TOOLTIP_OPTIONS,
      options: Object.keys(HISTOGRAM_TOOLTIP_OPTIONS),
    },
  },
  component: HistogramChart,
  parameters: {
    badges: [BADGE.BETA],
    chromatic: {
      disableSnapshot: true,
    },
    snapshot: {
      skip: true,
    },
  },
  title: "Data Viz/HistogramChart [beta]",
} as Meta;

// Default

export const Default = {
  args: {
    echartsRendererMode: "svg",
    tooltip: HISTOGRAM_TOOLTIP_OPTIONS[1],
  },
  parameters: {},
};

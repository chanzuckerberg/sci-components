import { Meta } from "@storybook/react-webpack5";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { ScatterPlot } from "./stories/default";
import { SCATTERPLOT_TOOLTIP_OPTIONS } from "./constants";

export default {
  argTypes: {
    echartsRendererMode: {
      control: {
        labels: ["Canvas", "SVG"],
        type: "select",
      },
      options: ["canvas", "svg"],
    },
    symbol: {
      control: {
        labels: ["Circle", "Rectangle", "Round Rectangle"],
        type: "select",
      },
      options: ["circle", "rect", "roundRect"],
    },
    tooltip: {
      control: {
        labels: ["No tooltip", "Show Tooltip"],
        type: "select",
      },
      mapping: SCATTERPLOT_TOOLTIP_OPTIONS,
      options: Object.keys(SCATTERPLOT_TOOLTIP_OPTIONS),
    },
  },
  component: ScatterPlot,
  parameters: {
    badges: [BADGE.BETA],
    chromatic: {
      disableSnapshot: true,
    },
    snapshot: {
      skip: true,
    },
  },
  title: "Data Viz/ScatterPlot [beta]",
} as Meta;

// Default

export const Default = {
  args: {
    echartsRendererMode: "svg",
    symbol: "circle",
    tooltip: SCATTERPLOT_TOOLTIP_OPTIONS[1],
  },
  parameters: {},
};

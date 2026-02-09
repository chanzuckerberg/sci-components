import { Meta } from "@storybook/react-webpack5";
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
    barCategoryGap: {
      control: { type: "text" },
      description: "Gap between bar categories (e.g., '0%', '20%')",
    },
    barGap: {
      control: { type: "text" },
      description: "Gap between bars in same category",
    },
    barWidth: {
      control: { type: "text" },
      description: "Width of bars (e.g., '80%', 20)",
    },
    barColor: {
      control: { type: "color" },
      description: "Color of the bars",
    },
    showTitle: {
      control: { type: "boolean" },
      description: "Whether to show the chart title",
    },
    width: {
      control: { type: "number" },
      description: "Chart width in pixels",
    },
    height: {
      control: { type: "number" },
      description: "Chart height in pixels",
    },
    showYAxisGrid: {
      control: { type: "boolean" },
      description: "Show horizontal grid lines from Y-axis ticks",
    },
    showXAxisGrid: {
      control: { type: "boolean" },
      description: "Show vertical grid lines from X-axis ticks",
    },
    referenceColor: {
      control: { type: "color" },
      description: "Color of reference distribution bars",
    },
    showReference: {
      control: { type: "boolean" },
      description: "Whether to show the reference distribution or not",
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
    barCategoryGap: "0%",
    barGap: "0%",
    showTitle: true,
    width: 800,
    height: 400,
    showYAxisGrid: false,
    showXAxisGrid: false,
    showReference: false,
    referenceColor: "rgba(128, 128, 128, 0.4)",
  },
  parameters: {},
};

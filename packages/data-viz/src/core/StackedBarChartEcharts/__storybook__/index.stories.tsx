import { Meta } from "@storybook/react-webpack5";
import { StackedBarChart } from "./stories/default";
import WithSelectionStory from "./stories/withSelection";
import { ORGANISM_DATA } from "./constants";

export default {
  argTypes: {
    badge: {
      control: {
        type: "text",
      },
      description:
        "Badge text to display next to the title as an SDS Tag (sdsStyle='rounded', sdsType='secondary')",
    },
    barHeight: {
      control: {
        type: "number",
      },
      description: "Height of the bar segments in pixels",
    },
    data: {
      control: {
        type: "object",
      },
      description: "Array of data items with name, value, and color properties",
    },
    echartsRendererMode: {
      control: {
        labels: ["Canvas", "SVG"],
        type: "select",
      },
      description: "Rendering mode for ECharts",
      options: ["canvas", "svg"],
    },
    height: {
      control: {
        type: "number",
      },
      description: "Total height of the chart container in pixels",
    },
    showLegend: {
      control: {
        type: "boolean",
      },
      description: "Show/hide the legend at the bottom",
    },
    showLegendValues: {
      control: {
        type: "boolean",
      },
      description:
        "Show values in the custom legend (only applies when useCustomLegend is true)",
    },
    title: {
      control: {
        type: "text",
      },
      description: "Title to display above the chart",
    },
    useCustomLegend: {
      control: {
        type: "boolean",
      },
      description:
        "Use custom SDS Legend component instead of ECharts built-in legend",
    },
    width: {
      control: {
        type: "number",
      },
      description: "Width of the chart in pixels",
    },
  },
  component: StackedBarChart,
  tags: ["beta"],
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    snapshot: {
      skip: true,
    },
  },
  title: "Data Viz/StackedBarChart",
} as Meta;

// Default story showcasing all features with custom SDS Legend
export const Default = {
  args: {
    badge: "8 Organisms",
    barHeight: 16,
    data: ORGANISM_DATA,
    echartsRendererMode: "svg",
    height: 120,
    showLegend: true,
    showLegendValues: true,
    title: "Organism Distribution",
    useCustomLegend: true,
    width: 600,
  },
};

export const WithSelection = {
  render: WithSelectionStory,
  args: {
    badge: "8 Organisms",
    barHeight: 16,
    data: ORGANISM_DATA,
    echartsRendererMode: "svg",
    height: 120,
    showLegend: true,
    showLegendValues: true,
    title: "Organism Distribution",
    useCustomLegend: true,
    width: 600,
  },
};

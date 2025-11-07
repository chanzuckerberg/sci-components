import { Meta } from "@storybook/react-webpack5";
import { StackedBarChart } from "./stories/default";
import WithSelectionStory from "./stories/withSelection";
import { DOMAIN_DATA, ORGANISM_DATA, TISSUE_DATA } from "./constants";

export default {
  argTypes: {
    badge: {
      control: {
        type: "text",
      },
      description: "Badge text to display next to the title",
    },
    barHeight: {
      control: {
        type: "number",
      },
      description: "Height of the bar in pixels",
    },
    data: {
      control: {
        type: "object",
      },
      description: "Array of data items with name, value, and color properties",
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
      description: "Show percentage values in the custom legend",
    },
    title: {
      control: {
        type: "text",
      },
      description: "Title to display above the chart",
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

// Default story showcasing all features
export const Default = {
  args: {
    badge: "5",
    barHeight: 16,
    data: DOMAIN_DATA,
    showLegend: true,
    showLegendValues: true,
    title: "Domain",
    width: 240,
  },
};

// With many items (organisms)
export const WithManyItems = {
  args: {
    badge: "8 Organisms",
    barHeight: 16,
    data: ORGANISM_DATA,
    showLegend: true,
    showLegendValues: true,
    title: "Organism Distribution",
    width: 600,
  },
};

// Without title or badge
export const WithoutTitle = {
  args: {
    barHeight: 16,
    data: TISSUE_DATA,
    showLegend: true,
    showLegendValues: true,
    width: 400,
  },
};

// Without legend
export const WithoutLegend = {
  args: {
    badge: "4",
    barHeight: 16,
    data: TISSUE_DATA,
    showLegend: false,
    title: "Tissue Types",
    width: 400,
  },
};

// With selection functionality
export const WithSelection = {
  render: WithSelectionStory,
  args: {
    badge: "5",
    barHeight: 16,
    data: DOMAIN_DATA,
    showLegend: true,
    showLegendValues: true,
    title: "Domain Distribution",
    width: 240,
  },
};

import { Meta } from "@storybook/react-webpack5";
import { StackedBarChart } from "./stories/default";
import WithSelectionStory from "./stories/withSelection";
import WithDynamicDataStory from "./stories/withDynamicData";
import { STACKED_BAR_CHART_DATA } from "./constants";

export default {
  argTypes: {
    badge: {
      control: {
        type: "text",
      },
      description:
        "Badge text to display next to the title. If not provided, shows dynamic count based on selection",
    },
    hideBadge: {
      control: {
        type: "boolean",
      },
      description: "Hide the badge when true",
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
    maxAmount: {
      control: {
        type: "number",
      },
      description:
        "Maximum amount for the bar (used only in 'cumulative' mode). If not provided, defaults to sum of all values",
    },
    mode: {
      control: {
        type: "select",
      },
      description:
        "Chart mode: 'porportional' (segments fill entire bar) or 'cumulative' (segments sized based on maxAmount)",
      options: ["porportional", "cumulative"],
    },
    remainingLabel: {
      control: {
        type: "text",
      },
      description: "Label for the remaining/unknown segment in cumulative mode",
    },
    remainingUnit: {
      control: {
        type: "text",
      },
      description:
        "Unit to display with the remaining segment value. If not provided, uses the unit from the first data item",
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
    legendValueFormat: {
      control: {
        type: "select",
      },
      description:
        "Format for legend values: 'percentage' shows percentage of the item in the bar chart (e.g., '20%'), 'count' shows the count from the data object with the unit defined by the unit prop",
      options: ["percentage", "count"],
    },
    title: {
      control: {
        type: "text",
      },
      description: "Title to display above the chart",
    },
    unit: {
      control: {
        type: "text",
      },
      description:
        "Global unit to display with values in cumulative mode. Individual data items can override this with their own unit property",
    },
    width: {
      control: {
        type: "text",
      },
      description:
        "Width of the chart - accepts any CSS width value (e.g., '100%', '20vw', '300px', or number for pixels)",
    },
    colorGeneratorOptions: {
      control: {
        type: "object",
      },
      description: "Options for the color generator",
    },
  },
  component: StackedBarChart,
  tags: ["beta"],
  parameters: {
    controls: {
      expanded: true,
    },
  },
  title: "Data Viz/StackedBarChart",
} as Meta;

const DEFAULT_COLOR_GENERATOR_OPTIONS = {
  start: 250,
  lightness: [0.4, 0.7],
  correctLightness: true,
  rotations: 0.85,
  gamma: 0.7,
};

export const Default = {
  args: {
    data: STACKED_BAR_CHART_DATA,
    title: "Domain",
    width: "360px",
    colorGeneratorOptions: {
      ...DEFAULT_COLOR_GENERATOR_OPTIONS,
    },
  },
};

export const WithSelection = {
  render: WithSelectionStory,
  args: {
    barHeight: 16,
    data: STACKED_BAR_CHART_DATA,
    mode: "porportional",
    showLegend: true,
    showLegendValues: true,
    title: "Domain",
    width: "360px",
    colorGeneratorOptions: {
      ...DEFAULT_COLOR_GENERATOR_OPTIONS,
    },
  },
};

export const AmountBasedWithSelection = {
  render: WithSelectionStory,
  args: {
    barHeight: 16,
    data: STACKED_BAR_CHART_DATA,
    mode: "cumulative",
    unit: "datasets",
    showLegend: true,
    showLegendValues: true,
    title: "Domain",
    width: "360px",
    maxAmount: 700,
    colorGeneratorOptions: {
      ...DEFAULT_COLOR_GENERATOR_OPTIONS,
    },
  },
};

export const WithExitAnimations = {
  render: WithDynamicDataStory,
  args: {
    barHeight: 16,
    data: STACKED_BAR_CHART_DATA,
    mode: "cumulative",
    maxAmount: 700,
    showLegend: true,
    showLegendValues: true,
    title: "With exit animations",
    width: "360px",
    colorGeneratorOptions: {
      ...DEFAULT_COLOR_GENERATOR_OPTIONS,
    },
  },
};

// Test

export const Test = {
  args: {
    data: STACKED_BAR_CHART_DATA,
    title: "Domain",
    width: 360,
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (props: Parameters<typeof StackedBarChart>[0]) => (
    <StackedBarChart {...props} data-testid="stacked-bar-chart" />
  ),
};

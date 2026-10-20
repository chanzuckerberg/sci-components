import { Meta } from "@storybook/react-vite";
import { StackedBarChart } from "./stories/default";
import WithSelectionStory from "./stories/withSelection";
import WithMouseEventsStory from "./stories/withMouseEvents";
import {
  STACKED_BAR_CHART_DATA,
  STACKED_BAR_CHART_DATA_FEWER_CATEGORIES,
  STACKED_BAR_CHART_DATA_MORE_CATEGORIES,
  STACKED_BAR_CHART_DATA_UPDATED_VALUES,
} from "./constants";

/**
 * Named datasets for the `data` select control. Switching datasets in the
 * Controls panel swaps the `data` prop on the mounted chart, which exercises
 * the segment animations (resize, enter, exit).
 */
const DATA_OPTIONS = {
  default: STACKED_BAR_CHART_DATA,
  default2: STACKED_BAR_CHART_DATA_UPDATED_VALUES,
  fewerCategories: STACKED_BAR_CHART_DATA_FEWER_CATEGORIES,
  moreCategories: STACKED_BAR_CHART_DATA_MORE_CATEGORIES,
};

export default {
  argTypes: {
    badge: {
      control: {
        type: "text",
      },
      description:
        "Badge text to display next to the title. If not provided, shows dynamic count based on selection",
      table: {
        defaultValue: { summary: 'the selection count, e.g. "3 of 7"' },
      },
    },
    hideBadge: {
      control: {
        type: "boolean",
      },
      description: "Hide the badge when true",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    barHeight: {
      control: {
        type: "number",
      },
      description: "Height of the bar in pixels",
      table: {
        defaultValue: { summary: "16" },
      },
    },
    data: {
      control: {
        type: "select",
      },
      description:
        "Array of data items with name, value, and color properties. Switch datasets to test the segment animations",
      mapping: DATA_OPTIONS,
      options: Object.keys(DATA_OPTIONS),
    },
    maxAmount: {
      control: {
        type: "number",
      },
      description:
        "Maximum amount for the bar (used only in 'cumulative' mode). If not provided, defaults to sum of all values",
      table: {
        defaultValue: { summary: "sum of all values" },
      },
    },
    mode: {
      control: {
        type: "select",
      },
      description:
        "Chart mode: 'proportional' (segments fill entire bar) or 'cumulative' (segments sized based on maxAmount)",
      options: ["proportional", "cumulative"],
      table: {
        defaultValue: { summary: "proportional" },
      },
    },
    legendValueFormat: {
      control: {
        type: "select",
      },
      description:
        "Format for legend values: 'percentage' shows percentage of the item in the bar chart (e.g., '20%'), 'count' shows the count from the data object with the unit defined by the unit prop",
      options: ["percentage", "count"],
      table: {
        defaultValue: { summary: "percentage" },
      },
    },
    selectionBehavior: {
      control: {
        type: "select",
      },
      description:
        "Behavior to apply when items are selected: 'dim' makes non-selected segments semi-transparent (20% opacity), 'hide' removes non-selected segments from the bar chart",
      options: ["dim", "hide"],
      table: {
        defaultValue: { summary: "dim" },
      },
    },
    remainingLabel: {
      control: {
        type: "text",
      },
      description: "Label for the remaining/unknown segment in cumulative mode",
      table: {
        defaultValue: { summary: "Remaining" },
      },
    },
    remainingUnit: {
      control: {
        type: "text",
      },
      description:
        "Unit to display with the remaining segment value. If not provided, uses the chart's unit prop; a unit set on an individual data item is never used here",
      table: {
        defaultValue: { summary: "unit" },
      },
    },
    showLegend: {
      control: {
        type: "boolean",
      },
      description: "Show/hide the legend at the bottom",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    showLegendValues: {
      control: {
        type: "boolean",
      },
      description: "Show percentage values in the custom legend",
      table: {
        defaultValue: { summary: "true" },
      },
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
      table: {
        defaultValue: { summary: "100%" },
      },
    },
    colorGeneratorOptions: {
      control: {
        type: "object",
      },
      description: "Options for the color generator",
    },
  },
  component: StackedBarChart,
  title: "Data Viz/StackedBarChart",
} as Meta;

const DEFAULT_COLOR_GENERATOR_OPTIONS = {
  start: 240,
  lightness: [0.4, 0.7],
  correctLightness: true,
  rotations: 0.85,
  gamma: 1,
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

export const ProportionalWithSelectionDimBehavior = {
  render: WithSelectionStory,
  args: {
    barHeight: 16,
    data: STACKED_BAR_CHART_DATA,
    mode: "proportional",
    showLegend: true,
    showLegendValues: true,
    title: "Domain",
    width: "360px",
    colorGeneratorOptions: {
      ...DEFAULT_COLOR_GENERATOR_OPTIONS,
    },
  },
};

export const CumulativeWithSelectionDimBehavior = {
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
    legendValueFormat: "count",
    colorGeneratorOptions: {
      ...DEFAULT_COLOR_GENERATOR_OPTIONS,
    },
  },
};

export const ProportionalWithSelectionHideBehavior = {
  render: WithSelectionStory,
  args: {
    barHeight: 16,
    data: STACKED_BAR_CHART_DATA,
    mode: "proportional",
    showLegend: true,
    showLegendValues: true,
    selectionBehavior: "hide",
    title: "Domain",
    width: "360px",
    colorGeneratorOptions: {
      ...DEFAULT_COLOR_GENERATOR_OPTIONS,
    },
  },
};

export const CumulativeWithSelectionHideBehavior = {
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
    legendValueFormat: "count",
    selectionBehavior: "hide",
    colorGeneratorOptions: {
      ...DEFAULT_COLOR_GENERATOR_OPTIONS,
    },
  },
};

export const WithMouseEvents = {
  render: WithMouseEventsStory,
  args: {
    barHeight: 16,
    data: STACKED_BAR_CHART_DATA,
    showLegend: true,
    showLegendValues: true,
    title: "Mouse Events Demo",
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

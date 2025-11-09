import { Meta } from "@storybook/react-webpack5";
import { StackedBarChart } from "./stories/default";
import WithSelectionStory from "./stories/withSelection";
import { AmountBasedStory } from "./stories/amountBased";
import {
  DOMAIN_DATA,
  DOMAIN_DATA_AMOUNT,
  ORGANISM_DATA,
  TISSUE_DATA,
  BUDGET_DATA,
  STORAGE_DATA,
  MIXED_UNIT_DATA,
} from "./constants";

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
    maxAmount: {
      control: {
        type: "number",
      },
      description:
        "Maximum amount for the bar (used only in 'amount' mode). If not provided, defaults to sum of all values",
    },
    mode: {
      control: {
        type: "select",
      },
      description:
        "Chart mode: 'percentage' (segments fill entire bar) or 'amount' (segments sized based on maxAmount)",
      options: ["percentage", "amount"],
    },
    remainingLabel: {
      control: {
        type: "text",
      },
      description: "Label for the remaining/unknown segment in amount mode",
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
        "Global unit to display with values in amount mode. Individual data items can override this with their own unit property",
    },
    width: {
      control: {
        type: "text",
      },
      description:
        "Width of the chart - accepts any CSS width value (e.g., '100%', '20vw', '300px', or number for pixels)",
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

// Default story showcasing all features (percentage mode)
export const Default = {
  args: {
    badge: "5",
    barHeight: 16,
    data: DOMAIN_DATA,
    mode: "percentage",
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
    mode: "percentage",
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
    mode: "percentage",
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
    mode: "percentage",
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
    mode: "percentage",
    showLegend: true,
    showLegendValues: true,
    title: "Domain",
    width: "360px",
  },
};

// Amount-based mode matching Figma design (with global unit)
export const AmountBasedWithDatasets = {
  render: AmountBasedStory,
  args: {
    badge: "5",
    barHeight: 16,
    data: DOMAIN_DATA_AMOUNT,
    mode: "amount",
    unit: "datasets", // Global unit applied to all items
    showLegend: true,
    showLegendValues: true,
    title: "Domain",
    width: 240,
  },
};

// Amount-based mode with remaining segment (budget)
export const AmountBased = {
  render: AmountBasedStory,
  args: {
    badge: "$1200K",
    barHeight: 16,
    data: BUDGET_DATA,
    maxAmount: 1200,
    mode: "amount",
    remainingLabel: "Unallocated",
    remainingUnit: "K",
    showLegend: true,
    showLegendValues: true,
    title: "Budget Allocation",
    width: 400,
  },
};

// Amount-based mode with remaining segment (storage)
export const AmountBasedWithRemaining = {
  render: AmountBasedStory,
  args: {
    badge: "1000 GB",
    barHeight: 16,
    data: STORAGE_DATA,
    maxAmount: 1000, // Total is 750, so 250 GB remaining
    mode: "amount",
    remainingLabel: "Available",
    remainingUnit: "GB",
    showLegend: true,
    showLegendValues: true,
    title: "Storage Usage",
    width: 400,
  },
};

// Amount-based mode with mixed units (global + individual overrides)
export const AmountBasedMixedUnits = {
  render: AmountBasedStory,
  args: {
    badge: "3 Types",
    barHeight: 16,
    data: MIXED_UNIT_DATA,
    mode: "amount",
    unit: "GB", // Global unit - most items use this
    showLegend: true,
    showLegendValues: true,
    title: "File Storage",
    width: 400,
  },
};

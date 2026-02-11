import { Args, Meta } from "@storybook/react-webpack5";
import { SegmentedControl } from "./stories/default";
import { SEGMENTED_CONTROL_EXCLUDED_CONTROLS } from "./constants";
import { TestDemo } from "./stories/test";
import { ControlledSegmentedControlDemo } from "./stories/controlledSegmentedControl";

export default {
  argTypes: {
    buttonDefinition: {
      control: {
        type: "object",
      },
    },
  },
  component: SegmentedControl,
  title: "Components/SegmentedControl",
} as Meta;

// Default

export const Default = {
  args: {
    buttonDefinition: [
      {
        icon: "List",
        tooltipText: "List A",
        value: "A",
      },
      {
        icon: "List",
        tooltipText: "List B",
        value: "B",
      },
      {
        icon: "List",
        tooltipText: "List C",
        value: "C",
      },
      {
        icon: "List",
        tooltipText: "List D",
        value: "D",
      },
    ],
  },
  render: SegmentedControl,
};

// Disabled Buttons

export const WithDisabledButton = {
  args: {
    buttonDefinition: [
      {
        icon: "LinesHorizontal3",
        tooltipText: "List A",
        value: "A",
      },
      {
        disabled: true,
        icon: "LinesHorizontal3",
        tooltipText: "List B",
        value: "B",
      },
      {
        icon: "LinesHorizontal3",
        tooltipText: "List C",
        value: "C",
      },
      {
        icon: "LinesHorizontal3",
        tooltipText: "List D",
        value: "D",
      },
    ],
  },
  render: SegmentedControl,
};

// Label Only

export const LabelOnly = {
  args: {
    buttonDefinition: [
      {
        label: "Explorer",
        value: "explorer",
      },
      {
        label: "All Data",
        value: "all-data",
      },
    ],
  },
  render: SegmentedControl,
};

// Label Only With Disabled

export const LabelOnlyWithDisabledButton = {
  args: {
    buttonDefinition: [
      {
        label: "Explorer",
        value: "explorer",
      },
      {
        disabled: true,
        label: "All Data",
        value: "all-data",
      },
      {
        label: "Summary",
        value: "summary",
      },
    ],
  },
  render: SegmentedControl,
};

// Tooltip Hidden

export const WithTooltipHidden = {
  args: {
    buttonDefinition: [
      {
        icon: "List",
        shouldShowTooltip: false,
        value: "A",
      },
      {
        icon: "Table",
        shouldShowTooltip: false,
        value: "B",
      },
      {
        icon: "People",
        value: "C",
      },
    ],
  },
  render: SegmentedControl,
};

// Custom Tooltip Props

export const WithCustomTooltipProps = {
  args: {
    buttonDefinition: [
      {
        icon: "List",
        tooltipProps: {
          subtitle: "View items as a list",
          title: "List View",
        },
        value: "A",
      },
      {
        icon: "Table",
        tooltipProps: {
          subtitle: "View items in a table",
          title: "Table View",
        },
        value: "B",
      },
      {
        icon: "People",
        tooltipText: "People View",
        tooltipProps: {
          subtitle: "tooltipText overrides tooltipProps.title",
          title: "This title is overridden",
        },
        value: "C",
      },
    ],
  },
  render: SegmentedControl,
};

// Controlled

export const ControlledSegmentedControl = {
  args: {
    buttonDefinition: [
      {
        icon: "List",
        tooltipText: "List A",
        value: "A",
      },
      {
        icon: "List",
        tooltipText: "List B",
        value: "B",
      },
      {
        icon: "List",
        tooltipText: "List C",
        value: "C",
      },
      {
        icon: "List",
        tooltipText: "List D",
        value: "D",
      },
    ],
  },
  render: ControlledSegmentedControlDemo,
};

// Test

export const Test = {
  args: {
    buttonDefinition: [
      { icon: "List", tooltipText: "List A", value: "A" },
      { icon: "List", tooltipText: "List B", value: "B" },
      { icon: "Table", tooltipText: "Table", value: "Table" },
      { icon: "People", tooltipText: "People", value: "People" },
    ],
  },
  parameters: {
    controls: {
      exclude: SEGMENTED_CONTROL_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};

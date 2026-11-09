import {
  ListBulletsIcon,
  ListIcon,
  TableIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { Args, Meta } from "@storybook/react-vite";
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
      description:
        "One entry per segment, in the order they appear. Each entry needs a `value`, and can take an `icon`, a `label`, `tooltipProps` and `disabled`.",
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
        icon: <ListBulletsIcon weight="bold" />,
        tooltipText: "List A",
        value: "A",
      },
      {
        icon: <ListBulletsIcon weight="bold" />,
        tooltipText: "List B",
        value: "B",
      },
      {
        icon: <ListBulletsIcon weight="bold" />,
        tooltipText: "List C",
        value: "C",
      },
      {
        icon: <ListBulletsIcon weight="bold" />,
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
        icon: <ListIcon weight="bold" />,
        tooltipText: "List A",
        value: "A",
      },
      {
        disabled: true,
        icon: <ListIcon weight="bold" />,
        tooltipText: "List B",
        value: "B",
      },
      {
        icon: <ListIcon weight="bold" />,
        tooltipText: "List C",
        value: "C",
      },
      {
        icon: <ListIcon weight="bold" />,
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
        icon: <ListBulletsIcon weight="bold" />,
        shouldShowTooltip: false,
        value: "A",
      },
      {
        icon: <TableIcon weight="bold" />,
        shouldShowTooltip: false,
        value: "B",
      },
      {
        icon: <UsersIcon weight="bold" />,
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
        icon: <ListBulletsIcon weight="bold" />,
        tooltipProps: {
          subtitle: "View items as a list",
          title: "List View",
        },
        value: "A",
      },
      {
        icon: <TableIcon weight="bold" />,
        tooltipProps: {
          subtitle: "View items in a table",
          title: "Table View",
        },
        value: "B",
      },
      {
        icon: <UsersIcon weight="bold" />,
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
        icon: <ListBulletsIcon weight="bold" />,
        tooltipText: "List A",
        value: "A",
      },
      {
        icon: <ListBulletsIcon weight="bold" />,
        tooltipText: "List B",
        value: "B",
      },
      {
        icon: <ListBulletsIcon weight="bold" />,
        tooltipText: "List C",
        value: "C",
      },
      {
        icon: <ListBulletsIcon weight="bold" />,
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
      {
        icon: <ListBulletsIcon weight="bold" />,
        tooltipText: "List A",
        value: "A",
      },
      {
        icon: <ListBulletsIcon weight="bold" />,
        tooltipText: "List B",
        value: "B",
      },
      {
        icon: <TableIcon weight="bold" />,
        tooltipText: "Table",
        value: "Table",
      },
      {
        icon: <UsersIcon weight="bold" />,
        tooltipText: "People",
        value: "People",
      },
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

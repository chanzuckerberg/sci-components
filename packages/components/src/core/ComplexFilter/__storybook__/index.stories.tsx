import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import {
  COMPLEX_FILTER_EXCLUDED_CONTROLS,
  COMPLEX_FILTER_ON_CHANGE_OPTIONS,
} from "./constants";
import { ComplexFilter } from "./stories/default";
import { TestDemo } from "./stories/test";
import { AUTOCOMPLETE_DATA_OPTIONS } from "src/core/Autocomplete/__storybook__/constants";

export default {
  argTypes: {
    DropdownMenuProps: {
      control: {
        type: "object",
      },
      description: "Props to pass to the underlying DropdownMenu component",
    },
    InputDropdownProps: {
      control: {
        type: "object",
      },
      description: "Props to pass to the underlying InputDropdown component",
    },
    isTriggerChangeOnOptionClick: {
      control: {
        type: "boolean",
      },
    },
    label: {
      control: {
        type: "text",
      },
    },
    multiple: {
      control: {
        type: "boolean",
      },
    },
    onChange: {
      control: {
        labels: ["Noop", "console.log(value)"],
        type: "select",
      },
      mapping: COMPLEX_FILTER_ON_CHANGE_OPTIONS,
      options: Object.keys(COMPLEX_FILTER_ON_CHANGE_OPTIONS),
    },
    options: {
      control: {
        labels: ["One Column", "Two Columns", "Three Columns"],
        type: "select",
      },
      mapping: AUTOCOMPLETE_DATA_OPTIONS,
      options: Object.keys(AUTOCOMPLETE_DATA_OPTIONS),
    },
    search: {
      control: {
        type: "boolean",
      },
    },
  },
  component: ComplexFilter,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/Dropdowns/ComplexFilter",
} as Meta;

// Default

export const Default = {
  args: {
    DropdownMenuProps: {
      PopperPlacement: "bottom-start",
      title: "Complex Filter Title",
      width: 250,
    },
    InputDropdownProps: {
      sdsStyle: "square",
      width: 250,
    },
    isTriggerChangeOnOptionClick: false,
    label: "Click Target",
    multiple: true,
    onChange: COMPLEX_FILTER_ON_CHANGE_OPTIONS[1],
    search: true,
  },
};

// Test

export const Test = {
  parameters: {
    controls: {
      exclude: COMPLEX_FILTER_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} data-testid="complex-filter" />,
};

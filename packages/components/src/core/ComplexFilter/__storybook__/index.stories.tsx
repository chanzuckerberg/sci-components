import { Args, Meta } from "@storybook/react-vite";
import {
  COMPLEX_FILTER_EXCLUDED_CONTROLS,
  COMPLEX_FILTER_ON_CHANGE_OPTIONS,
} from "./constants";
import { ComplexFilter } from "./stories/default";
import { TestDemo } from "./stories/test";
import { AUTOCOMPLETE_DATA_OPTIONS } from "@components/src/core/Autocomplete/__storybook__/constants";
import { DROPDOWN_BUTTON_POSITION_OPTIONS } from "@components/src/core/Dropdown/__storybook__/constants";

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
      description:
        "Passed straight to the InputDropdown that opens the filter. Note that supplying it replaces the default, so a filter that should stay minimal needs sdsStyle passed again alongside whatever else it sets.",
      table: {
        defaultValue: { summary: '{ sdsStyle: "minimal" }' },
      },
    },
    isTriggerChangeOnOptionClick: {
      control: {
        type: "boolean",
      },
      description:
        "Determines whether changes are triggered in real-time upon clicking an option.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: {
        type: "text",
      },
      description:
        "Sets the label of the filter, shown both when closed and open.",
    },
    multiple: {
      control: {
        type: "boolean",
      },
      description:
        "Defines whether multiple selections can be made from the filter simultaneously, or only one.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    onChange: {
      control: {
        labels: { noop: "Noop", log: "console.log(value)" },
        type: "select",
      },
      description:
        "Function to set what happens when a new value is set via the filter.",
      mapping: COMPLEX_FILTER_ON_CHANGE_OPTIONS,
      options: Object.keys(COMPLEX_FILTER_ON_CHANGE_OPTIONS),
    },
    options: {
      control: {
        labels: {
          oneColumn: "One Column",
          twoColumns: "Two Columns",
          threeColumns: "Three Columns",
        },
        type: "select",
      },
      description:
        "The items to filter by. Passing the multi-column shape lays the menu out in named columns instead of one list.",
      mapping: AUTOCOMPLETE_DATA_OPTIONS,
      options: Object.keys(AUTOCOMPLETE_DATA_OPTIONS),
    },
    search: {
      control: {
        type: "boolean",
      },
      description:
        "Provides a search bar at the top of the filter from which users can narrow the list of menu items.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    buttonPosition: {
      control: { type: "select" },
      description:
        "Which side of the menu footer the Apply and Cancel buttons sit on. It only applies alongside buttons.",
      options: DROPDOWN_BUTTON_POSITION_OPTIONS,
      table: {
        defaultValue: { summary: "right" },
      },
    },
    buttons: {
      control: {
        type: "boolean",
      },
      description:
        "Puts Apply and Cancel buttons at the foot of the menu, so selections take effect only once Apply is pressed.",
      table: {
        defaultValue: { summary: "true" },
      },
    },
  },
  component: ComplexFilter,
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
    onChange: COMPLEX_FILTER_ON_CHANGE_OPTIONS.log,
    search: true,
    buttonPosition: "left",
    buttons: false,
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

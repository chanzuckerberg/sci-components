import { Args, Meta } from "@storybook/react-vite";
import LoadingIndicator from "@components/src/core/LoadingIndicator";
import { Dropdown } from "./stories/default";
import {
  DROPDOWN_BUTTON_POSITION_OPTIONS,
  DROPDOWN_DATA_OPTIONS,
  DROPDOWN_EXCLUDED_CONTROLS,
  DROPDOWN_LABEL,
  DROPDOWN_ON_CHANGE_OPTIONS,
  DROPDOWN_ON_CLOSE_OPTIONS,
} from "./constants";
import { ControlledDropdownDemo } from "./stories/controlledDropdown";
import { TestDemo } from "./stories/test";
import { InsideModalDemo } from "./stories/insideModal";
import { PopperPlacementDemo } from "./stories/popperPlacement";
import { AUTOCOMPLETE_ACTION_TYPE_OPTIONS } from "@components/src/common/storybook/AUTOCOMPLETE_ACTION_TYPE_OPTIONS";

export default {
  argTypes: {
    DropdownMenuProps: {
      control: {
        type: "object",
      },
      description:
        "These props are directly passed to the underlying DropdownMenu component, customizing its behavior. It is also the way to reach the menu's PopperComponent, PaperComponent and placement.",
    },
    InputDropdownProps: {
      control: {
        type: "object",
      },
      description:
        "These props are directly passed to the underlying InputDropdown component, customizing its behavior.",
    },
    buttonPosition: {
      control: { type: "select" },
      description:
        "Specifies the position of the Apply/Cancel buttons at the Dropdown footer.",
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
        "When set to true, a set of Apply/Cancel buttons will be displayed at the Dropdown footer.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    closeOnBlur: {
      control: {
        type: "boolean",
      },
      description:
        "When set to true, the Dropdown will automatically close when a click occurs outside of it. It defaults to false when buttons is true, because closing on blur discards the selections that have not been applied.",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
      description: "If `true`, the component is disabled.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    isSearchAutoFocus: {
      control: {
        type: "boolean",
      },
      description:
        "Puts the cursor in the search input as the menu opens. It only applies alongside search.",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    isTriggerChangeOnOptionClick: {
      control: {
        type: "boolean",
      },
      description:
        "When set to true, changes in Dropdown selections are applied in real-time to the react state.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: {
        type: "text",
      },
      description: "The label of the Dropdown.",
    },
    multiple: {
      control: {
        type: "boolean",
      },
      description:
        "If `true`, `value` must be an array and the menu will support multiple selections.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    onChange: {
      control: {
        labels: { noop: "NOOP", log: "Log value on change" },
        type: "select",
      },
      description: "Callback fired when the value changes.",
      mapping: DROPDOWN_ON_CHANGE_OPTIONS,
      options: Object.keys(DROPDOWN_ON_CHANGE_OPTIONS),
    },
    onClose: {
      control: {
        labels: { noop: "NOOP", log: "console.log('Closed!')" },
        type: "select",
      },
      description: "Callback fired when the popup requests to be closed.",
      mapping: DROPDOWN_ON_CLOSE_OPTIONS,
      options: Object.keys(DROPDOWN_ON_CLOSE_OPTIONS),
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
        "An array of options to be displayed as MenuItems within the Dropdown.",
      mapping: DROPDOWN_DATA_OPTIONS,
      options: Object.keys(DROPDOWN_DATA_OPTIONS),
    },
    search: {
      control: {
        type: "boolean",
      },
      description:
        "When set to true, a search input is displayed at the top of the Dropdown for filtering options.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    title: {
      control: {
        type: "text",
      },
      description: "A heading shown at the top of the menu.",
    },
  },
  component: Dropdown,
  title: "Components/Dropdowns/Dropdown",
} as Meta;

// Default

export const Default = {
  args: {
    DropdownMenuProps: {
      PopperPlacement: "bottom-start",
    },
    buttonPosition: "left",
    buttons: false,
    closeOnBlur: true,
    disabled: false,
    isSearchAutoFocus: true,
    isTriggerChangeOnOptionClick: false,
    label: DROPDOWN_LABEL,
    multiple: true,
    options: DROPDOWN_DATA_OPTIONS.oneColumn,
    search: true,
    title: "Dropdown Title",
  },
};

// Multi Column

export const MultiColumnWithButtons = {
  args: {
    buttonPosition: "left",
    buttons: true,
    closeOnBlur: true,
    disabled: false,
    isTriggerChangeOnOptionClick: false,
    label: DROPDOWN_LABEL,
    multiple: true,
    options: DROPDOWN_DATA_OPTIONS.threeColumns,
    search: true,
    title: "Multi-Column Dropdown Title",
  },
  parameters: {
    controls: {
      exclude: DROPDOWN_EXCLUDED_CONTROLS,
    },
  },
  render: (args: Args) => <Dropdown {...args} />,
};

// Loading Indicator

export const LoadingResultsIndicator = {
  args: {
    DropdownMenuProps: {
      loading: true,
      loadingText: <LoadingIndicator sdsStyle="minimal" />,
    },
    label: DROPDOWN_LABEL,
    options: [],
  },
  parameters: {
    controls: {
      exclude: DROPDOWN_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
};

// Action Type Menu Items

export const ActionTypeMenuItems = {
  args: {
    DropdownMenuProps: {
      width: 200,
    },
    InputDropdownProps: {
      width: 200,
    },
    options: AUTOCOMPLETE_ACTION_TYPE_OPTIONS,
  },
  parameters: {
    a11y: {
      config: { rules: [{ enabled: false, id: "aria-dialog-name" }] },
    },
    controls: {
      exclude: DROPDOWN_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
};

// Inside Modal

export const InsideModal = {
  parameters: {
    a11y: {
      config: { rules: [{ enabled: false, id: "aria-dialog-name" }] },
    },
    controls: {
      exclude: DROPDOWN_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <InsideModalDemo {...args} />,
};

// Controlled Dropdown

export const ControlledDropdown = {
  args: {
    label: DROPDOWN_LABEL,
  },
  parameters: {
    controls: {
      exclude: DROPDOWN_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ControlledDropdownDemo {...args} />,
};

// Popper Placement

export const PopperPlacement = {
  args: {
    label: DROPDOWN_LABEL,
  },
  parameters: {
    controls: {
      exclude: DROPDOWN_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <PopperPlacementDemo {...args} />,
};

// Test

export const Test = {
  args: {
    buttonPosition: "left",
    label: DROPDOWN_LABEL,
  },
  parameters: {
    controls: {
      exclude: DROPDOWN_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};

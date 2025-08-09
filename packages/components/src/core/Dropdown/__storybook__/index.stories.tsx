import { Args, Meta } from "@storybook/react";
import LoadingIndicator from "src/core/LoadingIndicator";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
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
import { AUTOCOMPLETE_ACTION_TYPE_OPTIONS } from "src/common/storybook/AUTOCOMPLETE_ACTION_TYPE_OPTIONS";

export default {
  argTypes: {
    DropdownMenuProps: {
      control: {
        type: "object",
      },
    },
    InputDropdownProps: {
      control: {
        type: "object",
      },
    },
    buttonPosition: {
      control: {
        labels: ["left", "right"],
        type: "select",
      },
      mapping: DROPDOWN_BUTTON_POSITION_OPTIONS,
      options: Object.keys(DROPDOWN_BUTTON_POSITION_OPTIONS),
    },
    buttons: {
      control: {
        type: "boolean",
      },
    },
    closeOnBlur: {
      control: {
        type: "boolean",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    isSearchAutoFocus: {
      control: {
        type: "boolean",
      },
      defaultValue: true,
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
        labels: ["NOOP", "Log value on change"],
        type: "select",
      },
      mapping: DROPDOWN_ON_CHANGE_OPTIONS,
      options: Object.keys(DROPDOWN_ON_CHANGE_OPTIONS),
    },
    onClose: {
      control: {
        labels: ["NOOP", "console.log('Closed!')"],
        type: "select",
      },
      mapping: DROPDOWN_ON_CLOSE_OPTIONS,
      options: Object.keys(DROPDOWN_ON_CLOSE_OPTIONS),
    },
    options: {
      control: {
        labels: ["One Column", "Two Columns", "Three Columns"],
        type: "select",
      },
      mapping: DROPDOWN_DATA_OPTIONS,
      options: Object.keys(DROPDOWN_DATA_OPTIONS),
    },
    search: {
      control: {
        type: "boolean",
      },
      defaultValue: true,
    },
    title: {
      control: {
        type: "text",
      },
    },
  },
  component: Dropdown,
  parameters: {
    badges: [BADGE.STABLE],
  },
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
    options: DROPDOWN_DATA_OPTIONS[0],
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
    options: DROPDOWN_DATA_OPTIONS[2],
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
    axe: {
      disabledRules: ["aria-dialog-name"],
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
    axe: {
      disabledRules: ["aria-dialog-name"],
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

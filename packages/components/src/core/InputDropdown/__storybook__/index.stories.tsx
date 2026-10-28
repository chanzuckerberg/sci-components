import { Args, Meta } from "@storybook/react-vite";
import { InputDropdown } from "./stories/default";
import { INPUT_DROPDOWN_EXCLUDED_CONTROLS } from "./constants";
import { INLINE_RADIO } from "@components/src/common/utils";
import {
  BUTTON_DROPDOWN_ICON_LABELS,
  BUTTON_DROPDOWN_ICON_OPTIONS,
} from "@components/src/core/ButtonDropdown/__storybook__/constants";

export default {
  argTypes: {
    counter: {
      control: {
        type: "number",
      },
      description:
        "If multiple set to true, this number shows the number of selected menu items.",
    },
    classes: {
      control: { type: "object" },
      description:
        "A class name for each part of the input, for styling one of them without reaching through the DOM: root, label, labelDetailsWrapper, contentWrapper, details, counter, iconWrapper, chevronIcon and minimalDetails.",
    },
    disabled: {
      control: {
        type: "boolean",
      },
      description: "If true, the component is disabled.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    intent: {
      control: {
        type: INLINE_RADIO,
      },
      description: "Alters the border color and visual intent of the input.",
      options: ["default", "negative", "notice", "positive"],
      table: {
        defaultValue: { summary: "default" },
      },
    },
    label: {
      control: {
        type: "text",
      },
      description: "The label of the Input Button.",
    },
    multiple: {
      control: {
        type: "boolean",
      },
      description:
        "Allows users to select multiple menu items. multiple=true cannot be used with the minimal variant.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    sdsStyle: {
      control: {
        type: "select",
      },
      description: "The visual appearance of the component.",
      options: ["square", "rounded", "minimal"],
      table: {
        defaultValue: { summary: "square" },
      },
    },
    sdsType: {
      control: {
        type: INLINE_RADIO,
      },
      description:
        "The label variant includes the label within the input field and showcases the selected menu item as additional details or sets the counter when in multi-select mode. The value variant replaces the label with the selected value directly within the input field. The detailed information is then displayed in a separate section dedicated to displaying additional details. However, it's important to note that the value variant cannot be used in conjunction with multi-select mode.",
      options: ["label", "value"],
      table: {
        defaultValue: { summary: "label" },
      },
    },
    shouldPutAColonAfterLabel: {
      control: {
        type: "boolean",
      },
      description:
        "If true, a colon (:) will be added after the label or value.",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    shouldTruncateMinimalDetails: {
      control: {
        type: "boolean",
      },
      description:
        "If true, the details section of the minimal variant displays a truncated one-liner with an ellipsis (...), if false the details section expands to multiple lines for a comprehensive display.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    startIcon: {
      control: {
        labels: BUTTON_DROPDOWN_ICON_LABELS,
        type: "select",
      },
      description:
        "An element placed before the label, passed straight through to the underlying MUI Button.",
      mapping: BUTTON_DROPDOWN_ICON_OPTIONS,
      options: Object.keys(BUTTON_DROPDOWN_ICON_OPTIONS),
    },
    style: {
      control: {
        type: "object",
      },
      description: "Inline styles for the input's root element.",
    },
    width: {
      control: {
        type: "text",
      },
      description:
        'How wide the input is. A bare number is read as pixels, so "240" means 240px, and any other value is used as the CSS width, such as "100%" or "20rem". Values below 90px are ignored, since the input keeps that as its minimum. Left unset, the input is as wide as its content, or as wide as its container if MUI\'s fullWidth is set.',
    },
  },
  component: InputDropdown,
  title: "Components/Inputs/InputDropdown",
} as Meta;

// Default

export const Default = {
  args: {
    disabled: false,
    label: "Label",
    sdsStyle: "square",
    classes: {
      root: "",
      contentWrapper: "",
      labelDetailsWrapper: "",
      label: "",
      details: "",
      counter: "",
      iconWrapper: "",
      chevronIcon: "",
      minimalDetails: "",
    },
  },
};

// Test

export const Test = {
  args: {
    disabled: false,
    label: "Label",
    multiple: false,
    sdsStyle: "square",
  },
  parameters: {
    controls: {
      exclude: INPUT_DROPDOWN_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <InputDropdown {...args} />,
};

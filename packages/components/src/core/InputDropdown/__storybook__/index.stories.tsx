import { Args, Meta } from "@storybook/react-webpack5";
import { InputDropdown } from "./stories/default";
import { INPUT_DROPDOWN_EXCLUDED_CONTROLS } from "./constants";
import { INLINE_RADIO } from "src/common/utils";

export default {
  argTypes: {
    counter: {
      control: {
        type: "number",
      },
    },
    classes: {
      control: { type: "object" },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    intent: {
      control: {
        type: INLINE_RADIO,
      },
      options: ["default", "negative", "notice", "positive"],
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
    sdsStyle: {
      control: {
        type: "select",
      },
      options: ["square", "rounded", "minimal"],
    },
    sdsType: {
      control: {
        type: INLINE_RADIO,
      },
      options: ["label", "value"],
    },
    shouldPutAColonAfterLabel: {
      control: {
        type: "boolean",
      },
    },
    shouldTruncateMinimalDetails: {
      control: {
        type: "boolean",
      },
    },
    style: {
      control: {
        type: "object",
      },
    },
    width: {
      control: {
        type: "text",
      },
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

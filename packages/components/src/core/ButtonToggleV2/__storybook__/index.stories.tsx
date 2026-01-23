/* eslint-disable sonarjs/no-duplicate-string */
import { Args, Meta } from "@storybook/react-webpack5";
import { ButtonToggleV2 } from "./stories/default";
import { BUTTON_TOGGLE_EXCLUDED_CONTROLS } from "./constants";
import { TestDemo } from "./stories/test";
import {
  BUTTON_DROPDOWN_ICON_LABELS,
  BUTTON_DROPDOWN_ICON_OPTIONS,
} from "src/core/ButtonDropdownV2/__storybook__/constants";

export default {
  argTypes: {
    backgroundOnHover: {
      control: {
        type: "boolean",
      },
    },
    children: {
      control: {
        type: "text",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    startIcon: {
      control: {
        labels: BUTTON_DROPDOWN_ICON_LABELS,
        type: "select",
      },
      mapping: BUTTON_DROPDOWN_ICON_OPTIONS,
      options: Object.keys(BUTTON_DROPDOWN_ICON_OPTIONS),
    },
    size: {
      control: {
        type: "inline-radio",
      },
      options: ["small", "medium", "large"],
    },
    sdsType: {
      control: {
        type: "inline-radio",
      },
      options: ["primary", "secondary"],
    },
    sdsStyle: {
      control: { type: "inline-radio" },
      options: ["outline", "minimal"],
    },
    sdsStage: {
      control: { type: "inline-radio" },
      options: ["on", "off"],
    },
  },
  component: ButtonToggleV2,
  tags: ["beta"],
  title: "Components/Buttons/ButtonToggleV2",
} as Meta;

// Default

export const Default = {
  args: {
    children: "Label",
    disabled: false,
    startIcon: BUTTON_DROPDOWN_ICON_OPTIONS[0],
    size: "medium",
    sdsType: "primary",
    sdsStyle: "outline",
    backgroundOnHover: true,
    sdsStage: "off",
  },
};

// Test

export const Test = {
  parameters: {
    controls: {
      exclude: BUTTON_TOGGLE_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo startIcon="InfoCircle" {...args} />,
};

/* eslint-disable sonarjs/no-duplicate-string */
import { Args, Meta } from "@storybook/react-webpack5";
import { ButtonToggle } from "./stories/default";
import { BUTTON_TOGGLE_EXCLUDED_CONTROLS } from "./constants";
import { TestDemo } from "./stories/test";
import {
  BUTTON_DROPDOWN_ICON_LABELS,
  BUTTON_DROPDOWN_ICON_OPTIONS,
} from "src/core/ButtonDropdown/__storybook__/constants";
import { INLINE_RADIO } from "src/common/utils";

export default {
  argTypes: {
    backgroundAppearance: {
      control: { type: INLINE_RADIO },
      options: ["matchBackground", "dark"],
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
        type: INLINE_RADIO,
      },
      options: ["small", "medium", "large"],
    },
    sdsType: {
      control: {
        type: INLINE_RADIO,
      },
      options: ["primary", "secondary"],
    },
    sdsStyle: {
      control: { type: INLINE_RADIO },
      options: ["outline", "minimal"],
    },
    sdsStage: {
      control: { type: INLINE_RADIO },
      options: ["on", "off"],
    },
  },
  component: ButtonToggle,
  tags: ["beta"],
  title: "Components/Buttons/ButtonToggle",
} as Meta;

// Default

export const Default = {
  args: {
    children: "Label",
    backgroundAppearance: "matchBackground",
    disabled: false,
    startIcon: BUTTON_DROPDOWN_ICON_OPTIONS[0],
    size: "large",
    sdsType: "primary",
    sdsStyle: "outline",
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

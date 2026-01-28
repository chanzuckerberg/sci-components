import { Args, Meta } from "@storybook/react-webpack5";
import { ButtonToggleLegacy } from "./stories/default";
import {
  BUTTON_TOGGLE_EXCLUDED_CONTROLS,
  BUTTON_TOGGLE_ICON_LABELS,
  BUTTON_TOGGLE_ICON_OPTIONS,
} from "./constants";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    disabled: {
      control: {
        type: "boolean",
      },
    },
    icon: {
      control: {
        labels: BUTTON_TOGGLE_ICON_LABELS,
        type: "select",
      },
      mapping: BUTTON_TOGGLE_ICON_OPTIONS,
      options: Object.keys(BUTTON_TOGGLE_ICON_OPTIONS),
    },
    sdsSize: {
      control: {
        type: "select",
      },
      options: ["small", "medium", "large"],
    },
    sdsStage: {
      control: {
        type: "radio",
      },
      options: ["on", "off"],
    },
    sdsType: {
      control: {
        type: "radio",
      },
      options: ["primary", "secondary"],
    },
  },
  component: ButtonToggleLegacy,
  tags: ["deprecated"],
  title: "Deprecated/ButtonToggleLegacy",
} as Meta;

// Default

export const Default = {
  args: {
    disabled: false,
    icon: "InfoCircle",
    sdsSize: "medium",
    sdsStage: "off",
    sdsType: "primary",
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
  render: (args: Args) => <TestDemo icon="InfoCircle" {...args} />,
};

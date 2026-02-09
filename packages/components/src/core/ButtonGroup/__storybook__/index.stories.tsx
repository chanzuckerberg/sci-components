import { Args, Meta } from "@storybook/react-webpack5";
import {
  BUTTON_GROUP_EXCLUDED_CONTROLS,
  BUTTON_GROUP_SDS_SIZE,
  BUTTON_GROUP_SDS_TYPES,
  BUTTON_GROUP_ORIENTATIONS,
} from "./constants";
import { ButtonGroup } from "./stories/default";
import { ButtonGroupIconOnly } from "./stories/iconOnly";
import { ButtonGroupDisabledButton } from "./stories/disabledButton";
import { ButtonGroupButtonToggles } from "./stories/buttonToggles";
import { TestDemo } from "./stories/test";
import { INLINE_RADIO } from "src/common/utils";

export default {
  argTypes: {
    backgroundAppearance: {
      control: {
        type: INLINE_RADIO,
      },
      options: ["matchBackground", "dark"],
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    orientation: {
      control: {
        type: INLINE_RADIO,
      },
      options: BUTTON_GROUP_ORIENTATIONS,
    },
    size: {
      control: {
        type: INLINE_RADIO,
      },
      options: BUTTON_GROUP_SDS_SIZE,
    },
    sdsType: {
      control: {
        type: INLINE_RADIO,
      },
      options: BUTTON_GROUP_SDS_TYPES,
    },
  },
  component: ButtonGroup,
  tags: ["beta"],
  title: "Components/Buttons/ButtonGroup",
} as Meta;

// Default

export const Default = {
  args: {
    backgroundAppearance: "matchBackground",
    disabled: false,
    orientation: "horizontal",
    size: "large",
    sdsType: "primary",
  },
};

// Icon Only

export const IconOnly = {
  args: {
    backgroundAppearance: "matchBackground",
    disabled: false,
    orientation: "horizontal",
    size: "large",
    sdsType: "primary",
  },
  render: (args: Args) => <ButtonGroupIconOnly {...args} />,
};

// Disabled Button

export const DisabledButtons = {
  args: {
    backgroundAppearance: "matchBackground",
    orientation: "horizontal",
    size: "large",
    sdsType: "primary",
  },
  render: (args: Args) => <ButtonGroupDisabledButton {...args} />,
};

// Button Toggles

export const ButtonToggles = {
  args: {
    backgroundAppearance: "matchBackground",
    disabled: false,
    orientation: "horizontal",
    size: "large",
    sdsType: "primary",
  },
  render: (args: Args) => <ButtonGroupButtonToggles {...args} />,
};

// Test

export const Test = {
  args: {
    backgroundAppearance: "matchBackground",
    disabled: false,
    orientation: "horizontal",
    size: "large",
    sdsType: "primary",
  },
  parameters: {
    controls: {
      exclude: BUTTON_GROUP_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};

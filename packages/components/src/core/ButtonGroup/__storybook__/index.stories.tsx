import { Args, Meta } from "@storybook/react-vite";
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
import { INLINE_RADIO } from "@components/src/common/utils";

export default {
  argTypes: {
    backgroundAppearance: {
      control: {
        type: INLINE_RADIO,
      },
      description:
        "Tells the group which surface it sits on so it can pick colors with enough contrast.",
      options: ["matchBackground", "dark"],
      table: {
        defaultValue: { summary: "matchBackground" },
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
    orientation: {
      control: {
        type: INLINE_RADIO,
      },
      description:
        "The component orientation (layout flow direction). Vertical is only available when every button in the group is icon-only.",
      options: BUTTON_GROUP_ORIENTATIONS,
      table: {
        defaultValue: { summary: "horizontal" },
      },
    },
    size: {
      control: {
        type: INLINE_RADIO,
      },
      description:
        "Size of the group. It is injected into each Button and ButtonToggle child, so setting size on an individual button has no effect.",
      options: BUTTON_GROUP_SDS_SIZE,
      table: {
        defaultValue: { summary: "large" },
      },
    },
    sdsType: {
      control: {
        type: INLINE_RADIO,
      },
      description: "Color scheme applied to every button in the group.",
      options: BUTTON_GROUP_SDS_TYPES,
      table: {
        defaultValue: { summary: "primary" },
      },
    },
  },
  component: ButtonGroup,
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

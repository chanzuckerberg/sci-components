import { Args, Meta } from "@storybook/react-webpack5";
import {
  BUTTON_GROUP_EXCLUDED_CONTROLS,
  BUTTON_GROUP_SDS_SIZE,
  BUTTON_GROUP_SDS_TYPES,
  BUTTON_GROUP_ORIENTATIONS,
} from "./constants";
import {
  ButtonGroup,
  ButtonGroupDisabledButton,
  ButtonGroupIconOnly,
} from "./stories/default";
import { TestDemo } from "./stories/test";
import { INLINE_RADIO } from "src/common/utils";

export default {
  argTypes: {
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
    disabled: false,
    orientation: "horizontal",
    size: "medium",
    sdsType: "primary",
  },
};

// Icon Only

export const IconOnly = {
  args: {
    disabled: false,
    orientation: "horizontal",
    size: "medium",
    sdsType: "primary",
  },
  render: (args: Args) => <ButtonGroupIconOnly {...args} />,
};

// Disabled Button

export const DisabledButtons = {
  args: {
    orientation: "horizontal",
    size: "medium",
    sdsType: "primary",
  },
  render: (args: Args) => <ButtonGroupDisabledButton {...args} />,
};

// Test

export const Test = {
  args: {
    disabled: false,
    orientation: "horizontal",
    size: "medium",
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

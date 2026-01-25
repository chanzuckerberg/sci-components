import { Args, Meta } from "@storybook/react-webpack5";
import {
  BUTTON_GROUP_EXCLUDED_CONTROLS,
  BUTTON_GROUP_SDS_SIZE,
  BUTTON_GROUP_SDS_TYPES,
  BUTTON_GROUP_ORIENTATIONS,
} from "./constants";
import {
  ButtonGroupV2,
  ButtonGroupV2DisabledButton,
  ButtonGroupV2IconOnly,
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
  component: ButtonGroupV2,
  tags: ["beta"],
  title: "Components/Buttons/ButtonGroupV2",
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
  render: (args: Args) => <ButtonGroupV2IconOnly {...args} />,
};

// Disabled Button

export const DisabledButtons = {
  args: {
    orientation: "horizontal",
    size: "medium",
    sdsType: "primary",
  },
  render: (args: Args) => <ButtonGroupV2DisabledButton {...args} />,
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

import { Args, Meta } from "@storybook/react-webpack5";
import { ScreenshotTestDemo } from "./stories/screenshot";
import {
  BUTTON_ACTIONS,
  BUTTON_EXCLUDED_CONTROLS,
  BUTTON_SDS_STYLES,
  BUTTON_SDS_TYPES,
  BUTTON_SDS_SIZE,
  BUTTON_ICON_LABELS,
  BUTTON_ICON_OPTIONS,
} from "./constants";
import { Button } from "./stories/default";

export default {
  argTypes: {
    endIcon: {
      control: {
        labels: BUTTON_ICON_LABELS,
        type: "select",
      },
      if: { arg: "sdsStyle", neq: "icon" },
      mapping: BUTTON_ICON_OPTIONS,
      options: Object.keys(BUTTON_ICON_OPTIONS),
    },
    icon: {
      control: {
        labels: BUTTON_ICON_LABELS,
        type: "select",
      },
      if: { arg: "sdsStyle", eq: "icon" },
      mapping: BUTTON_ICON_OPTIONS,
      options: Object.keys(BUTTON_ICON_OPTIONS),
    },
    isAllCaps: {
      control: { type: "boolean" },
    },
    onClick: { action: BUTTON_ACTIONS.onClick },
    sdsSize: {
      control: {
        labels: BUTTON_SDS_SIZE,
        type: "select",
      },
      if: { arg: "sdsStyle", eq: "icon" },
      mapping: BUTTON_SDS_SIZE,
      options: Object.keys(BUTTON_SDS_SIZE),
    },
    sdsStyle: {
      control: { type: "select" },
      options: BUTTON_SDS_STYLES,
    },
    sdsType: {
      control: { type: "select" },
      options: BUTTON_SDS_TYPES,
    },
    startIcon: {
      control: {
        labels: BUTTON_ICON_LABELS,
        type: "select",
      },
      if: { arg: "sdsStyle", neq: "icon" },
      mapping: BUTTON_ICON_OPTIONS,
      options: Object.keys(BUTTON_ICON_OPTIONS),
    },
    text: {
      control: {
        type: "text",
      },
      if: { arg: "sdsStyle", neq: "icon" },
    },
  },
  component: Button,
  title: "Components/Buttons/Button",
} as Meta;

// Default

export const Default = {
  args: {
    disabled: false,
    icon: "Cube",
    sdsSize: "medium",
    sdsStyle: "rounded",
    sdsType: "primary",
    text: "Label",
  },
};

// Screenshot Test

export const ScreenshotTest = {
  args: {
    label: "Label",
  },
  parameters: {
    controls: {
      exclude: BUTTON_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ScreenshotTestDemo {...args} />,
};

// Test

export const Test = {
  args: {
    disabled: false,
    sdsStyle: "rounded",
    sdsType: "primary",
    text: "Label",
  },
  parameters: {
    controls: {
      exclude: BUTTON_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (props: Args) => <Button {...props} data-testid="button" />,
};

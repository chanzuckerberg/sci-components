/* eslint-disable sonarjs/no-duplicate-string */
import { Args, Meta } from "@storybook/react-webpack5";
import { Notification } from "./stories/default";
import {
  NOTIFICATION_BUTTON_ON_CLICK_OPTIONS,
  NOTIFICATION_EXCLUDED_CONTROLS,
  NOTIFICATION_ICON_OPTIONS,
  NOTIFICATION_ON_CLICK_OPTIONS,
} from "./constants";
import { ScreenshotTestDemo } from "./stories/screenshot";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    autoDismiss: {
      control: { type: "select" },
      options: [true, false, 4000, 12000, 20000],
    },
    buttonOnClick: {
      control: {
        labels: ["() => {}", "undefined"],
        type: "select",
      },
      mapping: NOTIFICATION_BUTTON_ON_CLICK_OPTIONS,
      options: Object.keys(NOTIFICATION_BUTTON_ON_CLICK_OPTIONS),
    },
    buttonPosition: {
      control: { type: "inline-radio" },
      options: ["left", "right"],
    },
    extraContent: {
      control: { type: "boolean" },
    },
    icon: {
      control: {
        labels: [
          "Custom SVG Icon",
          "Custom SDS Icon",
          "SDS Icon: Book",
          "SDS Icon: Check Circle",
        ],
        type: "select",
      },
      mapping: NOTIFICATION_ICON_OPTIONS,
      options: Object.keys(NOTIFICATION_ICON_OPTIONS),
    },
    intent: {
      control: { type: "inline-radio" },
      options: ["info", "negative", "positive", "notice"],
    },
    onClose: {
      control: {
        labels: ["() => {}", "undefined"],
        type: "select",
      },
      mapping: NOTIFICATION_ON_CLICK_OPTIONS,
      options: Object.keys(NOTIFICATION_ON_CLICK_OPTIONS),
    },
    sdsIconProps: {
      control: { type: "object" },
    },
    slideDirection: {
      control: { type: "inline-radio" },
      options: ["left", "right"],
    },
  },
  component: Notification,
  title: "Components/Notification",
} as Meta;

// Default

export const Default = {
  args: {
    autoDismiss: false,
    buttonPosition: "right",
    buttonText: "Click me",
    extraContent: false,
    slideDirection: "left",
  },
};

// Screenshot test

export const ScreenshotTest = {
  args: {
    label: "Label",
  },
  parameters: {
    controls: {
      exclude: NOTIFICATION_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ScreenshotTestDemo {...args} />,
};

// Test

export const Test = {
  parameters: {
    controls: {
      exclude: NOTIFICATION_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};

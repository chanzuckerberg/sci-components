/* eslint-disable sonarjs/no-duplicate-string */
import { Args, Meta } from "@storybook/react-vite";
import { Notification } from "./stories/default";
import {
  NOTIFICATION_BUTTON_ON_CLICK_OPTIONS,
  NOTIFICATION_EXCLUDED_CONTROLS,
  NOTIFICATION_ICON_OPTIONS,
  NOTIFICATION_ON_CLICK_OPTIONS,
} from "./constants";
import { ScreenshotTestDemo } from "./stories/screenshot";
import { TestDemo } from "./stories/test";
import { INLINE_RADIO } from "@components/src/common/utils";

export default {
  argTypes: {
    autoDismiss: {
      control: { type: "select" },
      description:
        "Dismisses the Notification on a timer. A number sets the delay in milliseconds, and true uses 8000. Leave it unset to keep the Notification visible until it is dismissed another way.",
      options: [true, false, 4000, 12000, 20000],
      table: {
        defaultValue: { summary: "false" },
      },
    },
    buttonOnClick: {
      control: {
        labels: { action: "() => {}", none: "undefined" },
        type: "select",
      },
      description:
        "Callback fired when the action button is clicked. Passing it is what renders the button, and the Notification does nothing else in response, so dismissing it is up to this handler.",
      mapping: NOTIFICATION_BUTTON_ON_CLICK_OPTIONS,
      options: Object.keys(NOTIFICATION_BUTTON_ON_CLICK_OPTIONS),
    },
    buttonPosition: {
      control: { type: INLINE_RADIO },
      description: "Which side of the Notification the action button sits on.",
      options: ["left", "right"],
      table: {
        defaultValue: { summary: "right" },
      },
    },
    buttonText: {
      control: { type: "text" },
      description:
        "The label of the action button shown beneath the content. It only renders alongside buttonOnClick.",
    },
    extraContent: {
      control: { type: "boolean" },
      description:
        "Story-only: adds a paragraph and a small table beneath the message, to show how the Notification grows with its content.",
    },
    icon: {
      control: {
        labels: {
          customSvgIcon: "Custom SVG Icon",
          customSdsIcon: "Custom SDS Icon",
          book: "SDS Icon: Book",
          checkCircle: "SDS Icon: Check Circle",
        },
        type: "select",
      },
      description:
        "Override the icon displayed before the children. Unless provided, the icon follows the intent. Set to `false` to remove the icon.",
      mapping: NOTIFICATION_ICON_OPTIONS,
      options: Object.keys(NOTIFICATION_ICON_OPTIONS),
    },
    intent: {
      control: { type: INLINE_RADIO },
      description:
        "Required. Sets both the color of the component and the icon it defaults to.",
      options: ["accent", "info", "negative", "positive", "notice"],
      table: {
        defaultValue: { summary: "info" },
      },
    },
    onClose: {
      control: {
        labels: { action: "() => {}", none: "undefined" },
        type: "select",
      },
      description:
        "Callback fired when the component requests to be closed. When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.",
      mapping: NOTIFICATION_ON_CLICK_OPTIONS,
      options: Object.keys(NOTIFICATION_ON_CLICK_OPTIONS),
    },
    sdsIconProps: {
      control: { type: "object" },
      description:
        "Props forwarded to the Icon component when icon is given as a name.",
    },
    slideDirection: {
      control: { type: INLINE_RADIO },
      description:
        'Required. The side the Notification slides in from and back out towards. The component falls back to "left", but the prop is not optional, so pass it explicitly.',
      options: ["left", "right"],
      table: {
        defaultValue: { summary: "left" },
      },
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
    a11y: {
      config: { rules: [{ enabled: false, id: "color-contrast" }] },
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

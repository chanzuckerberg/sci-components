import { Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { CALLOUT_ICON_OPTIONS, CALLOUT_ON_CLOSE_OPTIONS } from "./constants";
import { Callout } from "./stories/default";

export default {
  argTypes: {
    autoDismiss: {
      control: { type: "select" },
      options: [true, false, 4000, 12000, 20000],
    },
    expandable: {
      control: {
        type: "boolean",
      },
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
      mapping: CALLOUT_ICON_OPTIONS,
      options: Object.keys(CALLOUT_ICON_OPTIONS),
    },
    intent: {
      control: { type: "radio" },
      options: ["info", "negative", "positive", "notice"],
    },
    onClose: {
      control: {
        labels: ["() => {}", "undefined"],
        type: "select",
      },
      mapping: CALLOUT_ON_CLOSE_OPTIONS,
      options: Object.keys(CALLOUT_ON_CLOSE_OPTIONS),
    },
  },
  component: Callout,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/Callout",
} as Meta;

// Default

export const Default = {
  args: {
    autoDismiss: false,
    calloutTitle: "Callout title.",
    onClose: false,
  },
};

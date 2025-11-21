import { Args, Meta } from "@storybook/react-webpack5";
import {
  BANNER_EXCLUDED_CONTROLS,
  BANNER_ICON_OPTIONS,
  BANNER_TEXT,
} from "./constants";
import { Banner } from "./stories/default";

export default {
  argTypes: {
    dismissed: {
      control: { type: "boolean" },
    },
    dismissible: {
      control: { type: "boolean" },
    },
    icon: {
      control: {
        labels: [
          "SDS Icon: Check Circle",
          "SDS Icon: Info Circle",
          "Custom SDS Icon",
          "Custom SVG Icon",
        ],
        type: "select",
      },
      mapping: BANNER_ICON_OPTIONS,
      options: Object.keys(BANNER_ICON_OPTIONS),
    },
    intent: {
      control: { type: "inline-radio" },
      options: ["accent", "info", "negative", "positive", "notice"],
    },
    sdsIconProps: {
      control: {
        type: "object",
      },
    },
    sdsType: {
      control: { type: "inline-radio" },
      options: ["primary", "secondary"],
      required: true,
    },
    textChild: {
      control: { type: "text" },
      required: true,
    },
  },
  component: Banner,
  parameters: {
    layout: "fullscreen",
    axe: {
      disabledRules: ["landmark-no-duplicate-banner", "landmark-unique"],
    },
  },
  title: "Components/Banner",
} as Meta<Args>;

// Default

export const Default = {
  args: {
    dismissed: false,
    dismissible: true,
    intent: "info",
    sdsType: "primary",
    textChild: BANNER_TEXT,
  },
};

// Test

export const Test = {
  args: {
    dismissible: true,
    intent: "info",
    sdsType: "primary",
    textChild: "test text",
  },
  parameters: {
    controls: {
      exclude: BANNER_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (props: Args): JSX.Element => (
    <Banner {...props} data-testid="banner" />
  ),
};

import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
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
    sdsIconProps: {
      control: {
        type: "object",
      },
    },
    sdsType: {
      control: { type: "radio" },
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
    axe: {
      disabledRules: ["landmark-no-duplicate-banner", "landmark-unique"],
    },
    badges: [BADGE.STABLE],
  },
  title: "Components/Banner",
} as Meta<Args>;

// Default

export const Default = {
  args: {
    dismissed: false,
    dismissible: true,
    sdsType: "primary",
    textChild: BANNER_TEXT,
  },
};

// Test

export const Test = {
  args: {
    dismissible: true,
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

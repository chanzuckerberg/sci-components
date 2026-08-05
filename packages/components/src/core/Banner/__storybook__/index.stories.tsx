import { Args, Meta } from "@storybook/react-vite";
import {
  BANNER_ACTIONS,
  BANNER_EXCLUDED_CONTROLS,
  BANNER_ICON_OPTIONS,
  BANNER_TEXT,
} from "./constants";
import { Banner } from "./stories/default";
import { INLINE_RADIO } from "@components/src/common/utils";

export default {
  argTypes: {
    children: {
      control: { type: "text" },
      required: true,
    },
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
      control: { type: INLINE_RADIO },
      options: ["accent", "info", "negative", "positive", "notice"],
    },
    onClose: { action: BANNER_ACTIONS.onClose },
    sdsIconProps: {
      control: {
        type: "object",
      },
    },
    sdsType: {
      control: { type: INLINE_RADIO },
      options: ["primary", "secondary"],
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
    children: BANNER_TEXT,
    dismissed: false,
    dismissible: true,
    intent: "info",
    sdsType: "primary",
  },
};

// Test

export const Test = {
  args: {
    children: "test text",
    dismissible: true,
    intent: "info",
    sdsType: "primary",
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

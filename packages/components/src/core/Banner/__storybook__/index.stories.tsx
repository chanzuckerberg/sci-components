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
      description:
        "Required. The content of the Banner, laid out beside the icon and centered in the space left by the close button.",
      required: true,
    },
    dismissed: {
      control: { type: "boolean" },
      description:
        "If true, the banner has been dismissed and renders nothing. Leave this unset to let the Banner keep track of its own dismissed state. Passing any value, false included, takes that over: the close button then only fires onClose, and the Banner closes when you set dismissed to true.",
    },
    dismissible: {
      control: { type: "boolean" },
      description:
        "If true, the banner can be dismissed by the user. This is what controls whether the close button is rendered.",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    icon: {
      control: {
        labels: {
          checkCircle: "SDS Icon: Check Circle",
          infoCircle: "SDS Icon: Info Circle",
          customSdsIcon: "Custom SDS Icon",
          customSvgIcon: "Custom SVG Icon",
        },
        type: "select",
      },
      description:
        'The name of an SDS icon, or a custom SVG element, shown in place of the icon the intent would pick. Without it, "positive" shows "CheckCircle", "negative" and "notice" show "ExclamationMarkCircle", and every other intent shows "InfoCircle".',
      mapping: BANNER_ICON_OPTIONS,
      options: Object.keys(BANNER_ICON_OPTIONS),
    },
    intent: {
      control: { type: INLINE_RADIO },
      description:
        "The intent color of the Banner component, which also selects the default icon.",
      options: ["accent", "info", "negative", "positive", "notice"],
      table: {
        defaultValue: { summary: "info" },
      },
    },
    onClose: { action: BANNER_ACTIONS.onClose },
    sdsIconProps: {
      control: {
        type: "object",
      },
      description: "Additional props to be passed to the icon component.",
    },
    sdsType: {
      control: { type: INLINE_RADIO },
      description:
        "Required. The primary variant fills the Banner with the intent's primary surface color and uses the on-fill text color. The secondary variant uses the intent's secondary surface color with the standard primary text color.",
      options: ["primary", "secondary"],
      required: true,
    },
  },
  component: Banner,
  parameters: {
    layout: "fullscreen",
    a11y: {
      config: {
        rules: [
          { enabled: false, id: "landmark-no-duplicate-banner" },
          { enabled: false, id: "landmark-unique" },
        ],
      },
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

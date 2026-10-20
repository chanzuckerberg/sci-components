import { Args, Meta } from "@storybook/react-vite";
import {
  TAG_COLORS,
  TAG_COLOR_CONTRAST_RULE,
  TAG_EXCLUDED_CONTROLS,
  TAG_HOVER_OPTIONS,
  TAG_ICONS,
  TAG_ICONS_LABELS,
  TAG_ON_CLICK_OPTIONS,
  TAG_PANEL_COLORS,
  TAG_SDS_STYLES,
  TAG_SDS_TYPES,
} from "./constants";
import { Tag } from "./stories/default";
import { ScreenshotTestDemo } from "./stories/mainScreenshot";
import { GrayPrimaryScreenshotTestDemo } from "./stories/grayPrimaryScreenshot";
import { SuccessWarningScreenshotTestDemo } from "./stories/successWarningScreenshot";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    color: {
      control: {
        labels: { custom: "Custom colors for Label, Background, Icon" },
        type: "select",
      },
      description:
        "The tag's intent, given either as one of the six names or as CSS colors: `[label color, background color]`, which keeps the icon white, or `[label color, background color, icon color]`.",
      mapping: TAG_PANEL_COLORS,
      options: Object.keys(TAG_PANEL_COLORS),
      table: {
        defaultValue: { summary: "neutral" },
      },
    },
    hover: {
      control: { type: "boolean" },
      description:
        "Whether the tag responds to the pointer with a darker fill and a pointer cursor. False removes the tag from pointer events altogether, which also keeps a surrounding Tooltip from opening.",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    icon: {
      control: {
        labels: TAG_ICONS_LABELS,
        type: "select",
      },
      description: "Icon element.",
      mapping: TAG_ICONS,
      options: Object.keys(TAG_ICONS),
    },
    label: {
      control: { type: "text" },
      description:
        "The tag's text, and its accessible name. It is cut off with an ellipsis rather than wrapped, so keep it to a word or two.",
      required: true,
    },
    onClick: {
      control: {
        labels: { action: "() => {}", none: "undefined" },
        type: "select",
      },
      description:
        "MUI's prop. Makes the tag a button: a tab stop that answers Enter and Space.",
      mapping: TAG_ON_CLICK_OPTIONS,
      options: Object.keys(TAG_ON_CLICK_OPTIONS),
    },
    sdsSize: {
      control: { type: "radio" },
      description:
        "The size of the tag: an 11px label with a 12px icon, or a 13px label with a 24px icon. A large tag has to have an icon.",
      options: ["s", "l"],
      table: {
        defaultValue: { summary: "s" },
      },
    },
    sdsStyle: {
      control: { type: "radio" },
      description:
        "The shape of the tag. The design guidance treats rounded as the default for the system, so it is usually worth passing.",
      options: ["rounded", "square"],
      table: {
        defaultValue: { summary: "square" },
      },
    },
    sdsType: {
      control: { type: "radio" },
      description:
        "primary fills the tag with the intent color and sets the label white. secondary tints the fill and keeps the label and a 1px border in the intent color.",
      options: ["primary", "secondary"],
      table: {
        defaultValue: { summary: "primary" },
      },
    },
  },
  component: Tag,
  parameters: {
    a11y: {
      config: { rules: [{ enabled: false, id: TAG_COLOR_CONTRAST_RULE }] },
    },
  },
  title: "Components/Tag",
} as Meta;

// Default

export const Default = {
  args: {
    hover: true,
    label: "Label",
    sdsSize: "s",
    sdsStyle: "square",
    sdsType: "primary",
  },
};

// Screenshot tests

export const ScreenshotTest = {
  args: {
    color: TAG_COLORS[0],
    hover: TAG_HOVER_OPTIONS[0],
    label: "Label",
    sdsStyle: TAG_SDS_STYLES[0],
    sdsType: TAG_SDS_TYPES[0],
  },
  parameters: {
    controls: {
      exclude: TAG_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },

  render: (props: Args): JSX.Element => <ScreenshotTestDemo {...props} />,
};

export const GrayPrimaryScreenshotTest = {
  args: {
    color: TAG_COLORS[0],
    hover: TAG_HOVER_OPTIONS[0],
    label: "Label",
    sdsStyle: TAG_SDS_STYLES[0],
    sdsType: TAG_SDS_TYPES[0],
  },
  parameters: {
    a11y: {
      // `color-contrast` is disabled for this test because design tested it with
      // APCA and determined these colors pass, our test just isn't able to use APCA
      // yet; this color was pulled into its own story so the remaining colors can be
      // tested separately
      config: { rules: [{ enabled: false, id: TAG_COLOR_CONTRAST_RULE }] },
    },
    controls: {
      exclude: TAG_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },

  render: (props: Args): JSX.Element => (
    <GrayPrimaryScreenshotTestDemo {...props} />
  ),
};

export const SuccessWarningScreenshotTest = {
  args: {
    color: TAG_COLORS[0],
    hover: TAG_HOVER_OPTIONS[0],
    label: "Label",
    sdsStyle: TAG_SDS_STYLES[0],
    sdsType: TAG_SDS_TYPES[0],
  },
  parameters: {
    a11y: {
      // `color-contrast` is disabled for this test because it is now a known
      // issue and design will work on adjusting the colors so that they pass;
      // these colors were pulled into their own story so the remaining colors
      // can be tested separately
      config: { rules: [{ enabled: false, id: TAG_COLOR_CONTRAST_RULE }] },
    },
    controls: {
      exclude: TAG_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },

  render: (props: Args): JSX.Element => (
    <SuccessWarningScreenshotTestDemo {...props} />
  ),
};

// Test

export const Test = {
  args: {
    label: "Label",
  },
  parameters: {
    controls: {
      exclude: TAG_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};

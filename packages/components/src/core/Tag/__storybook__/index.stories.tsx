import { Args, Meta } from "@storybook/react-vite";
import {
  TAG_COLOR_CONTRAST_RULE,
  TAG_EXCLUDED_CONTROLS,
  TAG_HREF_LABELS,
  TAG_HREF_OPTIONS,
  TAG_ICON_LABELS,
  TAG_ICONS,
  TAG_ON_CLICK_LABELS,
  TAG_ON_CLICK_OPTIONS,
  TAG_PANEL_COLOR_LABELS,
  TAG_PANEL_COLORS,
  TAG_SDS_STYLES,
  TAG_SIZES,
} from "./constants";
import { Tag } from "./stories/default";
import { ScreenshotTestDemo } from "./stories/screenshot";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    color: {
      control: {
        labels: TAG_PANEL_COLOR_LABELS,
        type: "select",
      },
      description:
        "One of the seven intents, or CSS colors for a tag the intents do not cover: `[label, background]` or `[label, background, icon]`. The icon takes the label color when the third value is left out.",
      mapping: TAG_PANEL_COLORS,
      options: Object.keys(TAG_PANEL_COLORS),
      table: {
        defaultValue: { summary: "neutral" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description:
        "Greys the tag out. On a clickable tag or a link it also takes the tag out of the tab order.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    href: {
      control: {
        labels: TAG_HREF_LABELS,
        type: "select",
      },
      description:
        "Turns the tag into a link. It renders as an `<a>` unless `component` says otherwise, as with a router's link component.",
      mapping: TAG_HREF_OPTIONS,
      options: Object.keys(TAG_HREF_OPTIONS),
    },
    icon: {
      control: {
        labels: TAG_ICON_LABELS,
        type: "select",
      },
      description:
        "An icon on the leading edge, usually a Phosphor or `@czi-sds/icons` icon. The tag draws it at its own icon size and color.",
      mapping: TAG_ICONS,
      options: Object.keys(TAG_ICONS),
    },
    iconOnly: {
      control: { type: "boolean" },
      description:
        "Draws only the icon, in a square tag. The label is hidden from view but stays the tag's accessible name. Has no effect without an icon.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: { type: "text" },
      description:
        "The tag's text, and its accessible name. It is cut off with an ellipsis rather than wrapped, so keep it to a word or two. An icon-only tag still needs it: the text is hidden from view but read by screen readers.",
      required: true,
    },
    onClick: {
      control: {
        labels: TAG_ON_CLICK_LABELS,
        type: "select",
      },
      description:
        "MUI's prop. Makes the tag a button: a tab stop that answers Enter and Space, with hover and pressed states.",
      mapping: TAG_ON_CLICK_OPTIONS,
      options: Object.keys(TAG_ON_CLICK_OPTIONS),
    },
    sdsStyle: {
      control: { type: "radio" },
      description:
        "`solid` fills the tag with the intent color. `outline` tints the fill and draws the label, the icons and a 1px border in the intent color.",
      options: TAG_SDS_STYLES,
      table: {
        defaultValue: { summary: "solid" },
      },
    },
    showLinkIcon: {
      control: { type: "boolean" },
      description:
        "Adds an arrow after the label to say the tag leads somewhere. Usually paired with `href`, though a tag can be a link without it.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    size: {
      control: { type: "radio" },
      description:
        "`medium` is 24px tall with a 13px label and 12px icons, `small` is 20px tall with a 10px label and 10px icons.",
      options: TAG_SIZES,
      table: {
        defaultValue: { summary: "medium" },
      },
    },
  },
  component: Tag,
  parameters: {
    a11y: {
      // Several intents, and the disabled state, measure under axe's 4.5:1
      // contrast threshold with the colors the design specifies.
      config: { rules: [{ enabled: false, id: TAG_COLOR_CONTRAST_RULE }] },
    },
  },
  title: "Components/Tag",
} as Meta;

// Default

export const Default = {
  args: {
    disabled: false,
    iconOnly: false,
    label: "Label",
    sdsStyle: "solid",
    showLinkIcon: false,
    size: "medium",
  },
};

// Screenshot tests

export const ScreenshotTest = {
  parameters: {
    controls: {
      exclude: TAG_EXCLUDED_CONTROLS,
    },
  },
  render: (): JSX.Element => <ScreenshotTestDemo />,
};

export const ScreenshotTestDark = {
  globals: {
    theme: "dark",
  },
  parameters: {
    controls: {
      exclude: TAG_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (): JSX.Element => <ScreenshotTestDemo />,
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

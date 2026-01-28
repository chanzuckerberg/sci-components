import { Args, Meta } from "@storybook/react-webpack5";
import { ContentCard } from "./stories/default";
import {
  CONTENT_CARD_BUTTONS_LABELS,
  CONTENT_CARD_BUTTONS_OPTIONS,
  CONTENT_CARD_EXCLUDED_CONTROLS,
  CONTENT_CARD_ICON_LABELS,
  CONTENT_CARD_ICON_OPTIONS,
  CONTENT_CARD_IMAGE_LABELS,
  CONTENT_CARD_IMAGE_OPTIONS,
} from "./constants";
import { TestDemo } from "./stories/test";
import { INLINE_RADIO } from "src/common/utils";

export default {
  argTypes: {
    boundingBox: {
      control: {
        type: "boolean",
      },
      description:
        "If true, the card will include a bounding box; otherwise, it will not.",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    buttons: {
      control: {
        labels: CONTENT_CARD_BUTTONS_LABELS,
        type: "multi-select",
      },
      description:
        "Select the buttons to display. This is a multi-select field, and you can hold the Cmd (Mac) or Ctrl (Windows) key to select multiple options.",
      mapping: CONTENT_CARD_BUTTONS_OPTIONS,
      options: Object.keys(CONTENT_CARD_BUTTONS_OPTIONS),
      table: {
        type: { summary: "ReactNode" },
      },
    },
    buttonsPosition: {
      control: {
        type: INLINE_RADIO,
      },
      description: "Defines the position of the buttons.",
      options: ["left", "right"],
      table: {
        defaultValue: { summary: "left" },
      },
    },
    classes: {
      control: {
        type: "object",
      },
      description:
        "Defines the css classes to be applied to the card components.",
      table: {
        type: { summary: "Experimental" },
      },
    },
    clickableCard: {
      control: {
        type: "boolean",
      },
      description:
        "If set to true, the entire card becomes a clickable button. Note that enabling this prop automatically sets boundingBox to true, and only the first button in the action area will be visible.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    clickableCardProps: {
      control: {
        type: "object",
      },
      description:
        "If clickableCard is set to true, this prop accepts a ButtonProps object to be passed to the button.",
      table: {
        type: { summary: "ButtonProps" },
      },
    },
    decorativeBorder: {
      control: {
        type: "boolean",
      },
      description:
        "If true, and imagePadding is also true, the card will display a decorative border on the left for wide cards and on the top for narrow cards.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    icon: {
      control: {
        labels: CONTENT_CARD_ICON_LABELS,
        type: "select",
      },
      description:
        "If visualElementType is set to `icon`, this prop accepts an icon to be displayed in the card’s media section.",
      if: { arg: "visualElementType", eq: "icon" },
      mapping: CONTENT_CARD_ICON_OPTIONS,
      options: Object.keys(CONTENT_CARD_ICON_OPTIONS),
      table: {
        type: { summary: "ReactNode" },
      },
    },
    image: {
      control: {
        labels: CONTENT_CARD_IMAGE_LABELS,
        type: "select",
      },
      description:
        "If visualElementType is set to `image`, this prop accepts an image to be displayed in the card’s media section.",
      if: { arg: "visualElementType", eq: "image" },
      mapping: CONTENT_CARD_IMAGE_OPTIONS,
      options: Object.keys(CONTENT_CARD_IMAGE_OPTIONS),
      table: {
        type: { summary: "ReactNode" },
      },
    },
    imagePadding: {
      control: {
        type: "boolean",
      },
      description:
        "If true, the card will include a padding to the image; otherwise, it will not.",
      if: { arg: "visualElementType", eq: "image" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    imagePosition: {
      control: {
        type: INLINE_RADIO,
      },
      description:
        "Defines the position of the image. If the image is not set, this prop will have no effect.",
      if: { arg: "visualElementType", eq: "image" },
      options: ["left", "right"],
      table: {
        defaultValue: { summary: "left" },
      },
    },
    imageSize: {
      control: {
        type: "number",
      },
      description:
        "Defines the size of the image in pixels, serving as the maximum and minimum boundary for the visual element.",
      if: { arg: "visualElementType", eq: "image" },
      table: {
        defaultValue: { summary: "300" },
      },
    },
    metadataText: {
      control: {
        type: "text",
      },
      description:
        "The text to display in the metadata section of the card title.",
    },
    overlineText: {
      control: {
        type: "text",
      },
      description:
        "The text to display in the overline section of the card title.",
    },
    sdsType: {
      control: {
        type: INLINE_RADIO,
      },
      description: "Defines the type of card to display.",
      options: ["wide", "narrow"],
      table: {
        defaultValue: { summary: "wide" },
      },
    },
    subtitleText: {
      control: {
        type: "text",
      },
      description:
        "The text to display in the subtitle section of the card title.",
    },
    titleText: {
      control: {
        type: "text",
      },
      description: "The text to display in the title section of the card.",
    },
    visualElementType: {
      control: {
        type: INLINE_RADIO,
      },
      description: "The type of media to display in the card.",
      options: ["image", "icon", "none"],
      table: {
        defaultValue: { summary: "none" },
      },
    },
  },
  component: ContentCard,
  title: "Components/ContentCard",
} as Meta;

// Default

export const Default = {
  args: {
    boundingBox: true,
    buttons: [CONTENT_CARD_BUTTONS_OPTIONS[0], CONTENT_CARD_BUTTONS_OPTIONS[2]],
    buttonsPosition: "left",
    clickableCard: false,
    clickableCardProps: {
      component: "a",
      href: "https://chanzuckerberg.com",
    },
    decorativeBorder: false,
    icon: CONTENT_CARD_ICON_OPTIONS[1],
    image: CONTENT_CARD_IMAGE_OPTIONS[4],
    imagePadding: false,
    imagePosition: "left",
    metadataText: "Metadata Text",
    overlineText: "Overline Text",
    sdsType: "wide",
    subtitleText: "Subtitle Text",
    titleText: "Title Text",
    visualElementType: "image",
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

// Test

export const Test = {
  parameters: {
    controls: {
      exclude: CONTENT_CARD_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};

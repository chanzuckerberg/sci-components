import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { ContentCard } from "./stories/default";
import {
  CONTENT_CARD_BUTTONS_LABELS,
  CONTENT_CARD_BUTTONS_OPTIONS,
  CONTENT_CARD_ICON_LABELS,
  CONTENT_CARD_ICON_OPTIONS,
  CONTENT_CARD_IMAGE_LABELS,
  CONTENT_CARD_IMAGE_OPTIONS,
  PANEL_EXCLUDED_CONTROLS,
} from "./constants";
import { TestDemo } from "./stories/test";

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
        type: "radio",
      },
      description: "Defines the position of the buttons.",
      options: ["left", "right"],
      table: {
        defaultValue: { summary: "left" },
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
      table: {
        defaultValue: { summary: "false" },
      },
    },
    imagePosition: {
      control: {
        type: "radio",
      },
      description:
        "Defines the position of the image. If the image is not set, this prop will have no effect.",
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
        type: "radio",
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
        type: "select",
      },
      description: "The type of media to display in the card.",
      options: ["image", "icon", "none"],
      table: {
        defaultValue: { summary: "none" },
      },
    },
  },
  component: ContentCard,
  parameters: {
    badges: [BADGE.BETA],
  },
  title: "Components/ContentCard [beta]",
} as Meta;

// Default

export const Default = {
  args: {
    boundingBox: true,
    buttons: [CONTENT_CARD_BUTTONS_OPTIONS[2], CONTENT_CARD_BUTTONS_OPTIONS[5]],
    buttonsPosition: "left",
    clickableCard: false,
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
      exclude: PANEL_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};

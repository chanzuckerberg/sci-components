import { Args, Meta } from "@storybook/react-webpack5";
import { Hero } from "./stories/default";
import {
  HERO_BACKGROUND_FILL_LABELS,
  HERO_BACKGROUND_FILL_OPTIONS,
  HERO_EXCLUDED_CONTROLS,
  HERO_OVERLAY_MEDIA_LABELS,
  HERO_OVERLAY_MEDIA_OPTIONS,
} from "./constants";
import { TestDemo } from "./stories/test";
import { FullFeaturedDemo } from "./stories/fullFeatured";

export default {
  argTypes: {
    backgroundFill: {
      control: {
        labels: HERO_BACKGROUND_FILL_LABELS,
        type: "select",
      },
      mapping: HERO_BACKGROUND_FILL_OPTIONS,
      options: Object.keys(HERO_BACKGROUND_FILL_OPTIONS),
      table: {
        type: { summary: "ReactNode" },
      },
      description: "The background fill of the hero",
    },
    captionText: {
      control: {
        type: "text",
      },
      description: "Optional caption text that appears below the header",
    },
    darkeningMask: {
      control: {
        type: "boolean",
      },
      description: "Whether to display the darkening mask",
    },
    darkeningMaskColor: {
      control: {
        type: "color",
        defaultValue: "#000",
      },
      description: "The color of the darkening mask",
    },
    darkeningMaskOpacity: {
      control: {
        type: "number",
        defaultValue: 0,
      },
      description: "The opacity of the darkening mask",
    },
    darkeningVignette: {
      control: {
        type: "boolean",
      },
      description: "Whether to display the darkening vignette",
    },
    hasInvertTextColor: {
      control: {
        type: "boolean",
      },
      description: "Whether to invert the text color",
    },
    headerFontSize: {
      control: {
        type: "select",
      },
      options: ["s", "m", "l"],
      description: "The font size of the header text",
    },
    headerText: {
      control: {
        type: "text",
      },
      description:
        "The main header text displayed prominently in the hero section",
    },
    heroHeight: {
      control: {
        type: "text",
      },
      description: "The height of the hero container",
    },
    overlayContainerMinMargin: {
      control: {
        type: "object",
      },
      description:
        "The margin of the hero container, supports an object with small, medium, and large values",
    },
    overlayContentWidth: {
      control: {
        type: "text",
      },
      description: "The width of the overlay content",
    },
    overlayContentPosition: {
      control: {
        type: "select",
      },
      options: [
        "top-left",
        "top",
        "top-right",
        "left",
        "center",
        "right",
        "bottom-left",
        "bottom",
        "bottom-right",
      ],
      description: "The position of the overlay content",
    },
    overlayMedia: {
      control: {
        labels: HERO_OVERLAY_MEDIA_LABELS,
        type: "select",
      },
      description: "The Overlay Media",
      mapping: HERO_OVERLAY_MEDIA_OPTIONS,
      options: Object.keys(HERO_OVERLAY_MEDIA_OPTIONS),
      table: {
        type: { summary: "ReactNode" },
      },
    },
    overlayMediaPosition: {
      control: {
        type: "select",
      },
      options: [
        "top-left",
        "top",
        "top-right",
        "left",
        "center",
        "right",
        "bottom-left",
        "bottom",
        "bottom-right",
      ],
      description: "The position of the overlay media",
    },
    overlayMediaMaxHeight: {
      control: {
        type: "text",
      },
      description: "The maximum height of the overlay media",
    },
    overlayMediaMaxWidth: {
      control: {
        type: "text",
      },
      description: "The maximum width of the overlay media",
    },
    overlayMediaMargin: {
      control: {
        type: "object",
      },
      description:
        "The margin of the overlay media, supports a single string or an object with small, medium, and large values",
    },
    textAlignment: {
      control: {
        type: "select",
      },
      options: ["left", "center", "right"],
      description: "The text alignment of the header text",
    },
  },
  tags: ["beta"],
  component: Hero,
  title: "Components/Hero",
} as Meta;

// Default

export const Default = {
  args: {
    headerText: "Header Text",
    captionText:
      "Caption text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    darkeningMask: true,
    darkeningMaskColor: "#000000",
    darkeningMaskOpacity: 0,
    darkeningVignette: false,
    overlayMediaMargin: {
      small: "0px",
      medium: "0px",
      large: "0px",
    },
    overlayContainerMinMargin: {
      small: "24px",
      medium: "40px",
      large: "120px",
    },
  },
  parameters: {
    layout: "fullscreen",
  },
};

// With Children

export const FullFeatured = {
  args: {
    backgroundFill: HERO_BACKGROUND_FILL_OPTIONS[4],
    darkeningMask: true,
    darkeningMaskColor: "#000000",
    darkeningMaskOpacity: 0.5,
    darkeningVignette: true,
    overlayMediaMargin: {
      small: "24px",
      medium: "40px",
      large: "120px",
    },
    hasInvertTextColor: true,
    headerFontSize: "l",
    headerText: "Header Text",
    heroHeight: "400px",
    overlayContainerMinMargin: {
      small: "24px",
      medium: "40px",
      large: "120px",
    },
    captionText:
      "Caption text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    overlayContentWidth: "50%",
    overlayContentPosition: "left",
    textAlignment: "left",
    overlayMedia: HERO_OVERLAY_MEDIA_OPTIONS[1],
    overlayMediaPosition: "right",
    overlayMediaMaxHeight: "200px",
    overlayMediaMaxWidth: "400px",
  },
  parameters: {
    layout: "fullscreen",
  },
  render: (args: Args) => <FullFeaturedDemo {...args} />,
};

// Test

export const Test = {
  parameters: {
    controls: {
      exclude: HERO_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
    layout: "fullscreen",
  },
  render: (args: Args) => <TestDemo {...args} />,
};

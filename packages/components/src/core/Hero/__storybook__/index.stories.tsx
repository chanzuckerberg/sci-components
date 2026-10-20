import { Args, Meta } from "@storybook/react-vite";
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
      table: {
        defaultValue: { summary: "false" },
      },
    },
    darkeningMaskColor: {
      control: {
        type: "color",
      },
      description: "The color of the darkening mask",
      table: {
        defaultValue: { summary: "#000000" },
      },
    },
    darkeningMaskOpacity: {
      control: {
        type: "number",
      },
      description: "The opacity of the darkening mask, from 0 to 1",
      table: {
        defaultValue: { summary: "0" },
      },
    },
    darkeningVignette: {
      control: {
        type: "boolean",
      },
      description: "Whether to display the darkening vignette",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    hasInvertTextColor: {
      control: {
        type: "boolean",
      },
      description:
        "Whether to set the text in the light color, for a dark backdrop",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    headerFontSize: {
      control: {
        type: "select",
      },
      options: ["s", "m", "l"],
      description: "The font size of the header text",
      table: {
        defaultValue: { summary: "m" },
      },
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
      table: {
        defaultValue: { summary: "fit-content" },
      },
    },
    overlayContainerMinMargin: {
      control: {
        type: "object",
      },
      description:
        "The margin of the hero container, supports an object with small, medium, and large values",
      table: {
        defaultValue: {
          summary: '{ small: "24px", medium: "40px", large: "120px" }',
        },
      },
    },
    overlayContentWidth: {
      control: {
        type: "text",
      },
      description: "The width of the overlay content",
      table: {
        defaultValue: { summary: "100%" },
      },
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
      table: {
        defaultValue: { summary: "center" },
      },
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
      table: {
        defaultValue: { summary: "center" },
      },
    },
    overlayMediaMaxHeight: {
      control: {
        type: "text",
      },
      description:
        "Sets the height of the overlay media layer outright rather than a maximum, despite the name.",
    },
    overlayMediaMaxWidth: {
      control: {
        type: "text",
      },
      description:
        "Sets the width of the overlay media layer outright rather than a maximum, despite the name. Without it the layer has no width.",
    },
    overlayMediaMargin: {
      control: {
        type: "object",
      },
      description:
        "The margin of the overlay media, supports a single string or an object with small, medium, and large values",
      table: {
        defaultValue: { summary: "0" },
      },
    },
    textAlignment: {
      control: {
        type: "select",
      },
      options: ["left", "center", "right"],
      description: "The text alignment of the header text",
    },
  },
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
    backgroundFill: HERO_BACKGROUND_FILL_OPTIONS.image,
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
    overlayMedia: HERO_OVERLAY_MEDIA_OPTIONS.image,
    overlayMediaPosition: "right",
    overlayMediaMaxHeight: "200px",
    overlayMediaMaxWidth: "400px",
  },
  parameters: {
    layout: "fullscreen",
    snapshot: {
      skip: true,
    },
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

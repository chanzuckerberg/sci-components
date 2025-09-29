import { Args, Meta } from "@storybook/react-webpack5";
import { Hero } from "./stories/default";
import { HERO_EXCLUDED_CONTROLS } from "./constants";
import { TestDemo } from "./stories/test";
import { ResponsiveDemo } from "./stories/responsive";

export default {
  argTypes: {
    backgroundFill: {
      control: {
        type: "text",
      },
      description:
        "Background fill that can be either a color string or an image object",
    },
    height: {
      control: {
        type: "text",
      },
      description: "The height of the hero container",
    },
    maxWidth: {
      control: {
        type: "select",
      },
      options: ["small", "medium", "large"],
      description: "Controls the maximum width of the hero container",
    },
    useContainerMargin: {
      control: {
        type: "boolean",
      },
      description: "Whether to apply responsive container margins",
    },
    headerText: {
      control: {
        type: "text",
      },
      description:
        "The main header text displayed prominently in the hero section",
    },
    captionText: {
      control: {
        type: "text",
      },
      description: "Optional caption text that appears below the header",
    },
  },
  component: Hero,
  title: "Components/Hero",
} as Meta;

// Default

export const Default = {
  args: {
    maxWidth: "large",
    useContainerMargin: true,
    headerText: "Header Text",
    captionText:
      "Caption text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
  },
};

// Responsive Behavior

export const ResponsiveBehavior = {
  parameters: {
    controls: {
      exclude: HERO_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ResponsiveDemo {...args} />,
};

// Without Caption

export const WithoutCaption = {
  args: {
    maxWidth: "large",
    useContainerMargin: true,
    headerText: "Header Text Only",
  },
};

// No Container Margins

export const NoContainerMargins = {
  args: {
    maxWidth: "large",
    useContainerMargin: false,
    headerText: "Full Width Hero",
    captionText:
      "This hero extends to the full width without container margins.",
  },
};

// Small Width

export const SmallWidth = {
  args: {
    maxWidth: "small",
    useContainerMargin: true,
    headerText: "Compact Hero",
    captionText: "A more compact hero design for focused layouts.",
  },
};

// Background Fill with Color

export const BackgroundFillColor = {
  args: {
    maxWidth: "large",
    useContainerMargin: true,
    headerText: "Hero with Color Background",
    captionText:
      "This hero uses a color background fill instead of the default background color.",
    backgroundFill: "#4f46e5",
    height: "400px",
  },
};

// Background Fill with Image

export const BackgroundFillImage = {
  args: {
    maxWidth: "large",
    useContainerMargin: true,
    headerText: "Hero with Image Background",
    captionText:
      "This hero uses an image background that stretches to cover the entire component.",
    backgroundFill: {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Mountain landscape background",
    },
    height: "500px",
  },
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
  },
  render: (args: Args) => <TestDemo {...args} />,
};

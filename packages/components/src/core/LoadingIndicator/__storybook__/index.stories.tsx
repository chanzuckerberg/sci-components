/* eslint-disable sonarjs/no-duplicate-string */
import { Args, Meta } from "@storybook/react-vite";
import { LoadingIndicator } from "./stories/default";
import { LIST_EXCLUDED_CONTROLS } from "./constants";
import { LivePreviewDemo } from "./stories/livePreview";
import { ScreenReaderDemo } from "./stories/screenReader";

export default {
  argTypes: {
    "aria-label": {
      control: { type: "text" },
      description:
        'Replaces what a screen reader announces for the status region, for example "Loading cell types". The visible text still reads "Loading". Without it, assistive technology announces the visible word.',
    },
    sdsStyle: {
      control: { type: "select" },
      description:
        "Chooses between the minimal and tag variants. It has no default: leaving it out is a type error, and an indicator built without it renders unstyled.",
      options: ["minimal", "tag"],
    },
  },
  component: LoadingIndicator,
  title: "Components/LoadingIndicator",
} as Meta;

// Default

export const Default = {
  args: {
    sdsStyle: "minimal",
  },
};

// Custom Aria Label

export const CustomAriaLabel = {
  args: {
    "aria-label": "Loading cats list...",
    sdsStyle: "minimal",
  },
  parameters: {
    a11y: {
      config: { rules: [{ enabled: false, id: "color-contrast" }] },
    },
    controls: {
      exclude: LIST_EXCLUDED_CONTROLS,
    },
  },
};

// Screen Reader Demo

export const ScreenReaderTest = {
  parameters: {
    a11y: {
      config: { rules: [{ enabled: false, id: "color-contrast" }] },
    },
    controls: {
      exclude: LIST_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ScreenReaderDemo {...args} />,
};

// Test

export const Test = {
  parameters: {
    a11y: {
      config: { rules: [{ enabled: false, id: "color-contrast" }] },
    },
    controls: {
      exclude: LIST_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

import { Args, Meta } from "@storybook/react-vite";
import { Panel } from "./stories/default";
import { PANEL_EXCLUDED_CONTROLS } from "./constants";
import { TestDemo } from "./stories/test";
import { CustomHeaderAndCloseButtonDemo } from "./stories/customCloseButton";
import { ScrollBehaviorDemo } from "./stories/scrollBehavior";

export default {
  argTypes: {
    isBackdropClickEnabled: {
      control: {
        type: "boolean",
      },
      description:
        "If true, clicking on the backdrop will close the panel. Only applies to overlay panels.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    position: {
      control: {
        type: "select",
      },
      description:
        'Which edge the panel is attached to. A basic panel takes "left" or "right"; an overlay adds "bottom".',
      options: ["left", "right", "bottom"],
      table: {
        defaultValue: { summary: "left" },
      },
    },
    sdsType: {
      control: {
        type: "select",
      },
      description:
        '"basic" sits in the page and stays until you close it; "overlay" floats over the page with a header and close button. It also decides which other props apply, so TypeScript needs it spelled out even though the component falls back to "basic".',
      options: ["basic", "overlay"],
      table: {
        defaultValue: { summary: "basic" },
      },
    },
    transitionDuration: {
      control: {
        type: "number",
      },
      description:
        "How long the Panel takes to slide in and out, in milliseconds. Accepts a single number or `{ enter, exit }`. Defaults to 225ms in and 195ms out; `0` removes the animation.",
      table: {
        defaultValue: { summary: "{ enter: 225, exit: 195 }" },
      },
    },
    width: {
      control: {
        type: "text",
      },
      description:
        "How wide the panel is, or how tall it is when positioned along the bottom. Numbers are read as pixels. Values below the default are ignored, since the panel keeps that as its minimum in both directions.",
      table: {
        defaultValue: { summary: "240 (basic), 320 (overlay)" },
      },
    },
  },
  component: Panel,
  title: "Components/Panel",
} as Meta;

// Default

export const Default = {
  args: {
    position: "left",
    sdsType: "basic",
    width: "320px",
  },
};

// With Custom Close Button and Header

export const ScrollBehavior = {
  parameters: {
    // TODO: Fix accessibility (a11y) issues once the MUI team resolves the problem
    // with the 'disableEnforceFocus' prop in the Modal component.
    a11y: {
      config: { rules: [{ enabled: false, id: "aria-hidden-focus" }] },
    },
    controls: {
      exclude: PANEL_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ScrollBehaviorDemo {...args} />,
};

// With Custom Close Button and Header

export const CustomHeaderAndCloseButton = {
  parameters: {
    // TODO: Fix accessibility (a11y) issues once the MUI team resolves the problem
    // with the 'disableEnforceFocus' prop in the Modal component.
    a11y: {
      config: { rules: [{ enabled: false, id: "aria-hidden-focus" }] },
    },
    controls: {
      exclude: PANEL_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <CustomHeaderAndCloseButtonDemo {...args} />,
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

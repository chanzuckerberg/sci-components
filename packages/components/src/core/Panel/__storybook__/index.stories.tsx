import { Args, Meta } from "@storybook/react-webpack5";
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
    },
    position: {
      control: {
        type: "select",
      },
      options: ["left", "right", "bottom"],
    },
    sdsType: {
      control: {
        type: "select",
      },
      options: ["basic", "overlay"],
    },
    width: {
      control: {
        type: "text",
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
    axe: {
      disabledRules: ["aria-hidden-focus"],
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
    axe: {
      disabledRules: ["aria-hidden-focus"],
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

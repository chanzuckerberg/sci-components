import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { InputDropdown } from "./stories/default";
import { INPUT_DROPDOWN_EXCLUDED_CONTROLS } from "./constants";
import { LivePreviewDemo } from "./stories/livePreview";
import { MinimalLivePreviewDemo } from "./stories/minimal";

export default {
  argTypes: {
    counter: {
      control: {
        type: "number",
      },
    },
    details: {
      control: {
        type: "text",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    intent: {
      control: {
        type: "radio",
      },
      options: ["default", "error", "warning"],
    },
    label: {
      control: {
        type: "text",
      },
    },
    multiple: {
      control: {
        type: "boolean",
      },
    },
    sdsStage: {
      control: {
        type: "radio",
      },
      options: ["default", "userInput"],
    },
    sdsStyle: {
      control: {
        type: "select",
      },
      options: ["square", "rounded", "minimal"],
    },
    sdsType: {
      control: {
        type: "radio",
      },
      options: ["label", "value"],
    },
    shouldPutAColonAfterLabel: {
      control: {
        type: "boolean",
      },
    },
    shouldTruncateMinimalDetails: {
      control: {
        type: "boolean",
      },
    },
    width: {
      control: {
        type: "number",
      },
    },
  },
  component: InputDropdown,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/Inputs/InputDropdown",
} as Meta;

// Default

export const Default = {
  args: {
    disabled: false,
    label: "Label",
    sdsStyle: "square",
  },
};

// Rounded Live Preview

export const RoundLivePreview = {
  args: {
    fullWidth: true,
    sdsStyle: "rounded",
  },
  parameters: {
    controls: {
      exclude: INPUT_DROPDOWN_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Square Live Preview

export const SquareLivePreview = {
  args: {
    fullWidth: true,
    sdsStyle: "square",
  },
  parameters: {
    controls: {
      exclude: INPUT_DROPDOWN_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Minimal Live Preview

export const MinimalLivePreview = {
  args: {
    sdsStyle: "minimal",
  },
  parameters: {
    controls: {
      exclude: INPUT_DROPDOWN_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <MinimalLivePreviewDemo {...args} />,
};

// Test

export const Test = {
  args: {
    disabled: false,
    label: "Label",
    multiple: false,
    sdsStyle: "square",
  },
  parameters: {
    controls: {
      exclude: INPUT_DROPDOWN_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <InputDropdown {...args} />,
};

import { Args, Meta } from "@storybook/react-vite";
import { Dialog } from "./stories/default";
import { DIALOG_EXCLUDED_CONTROLS } from "./constants";
import { TestDemo } from "./stories/test";
import { TestNoTitleOnCloseDemo } from "./stories/testNoTitleOnClose";
import { TestButtonPositionLeftDemo } from "./stories/testButtonPositionLeft";
import { INLINE_RADIO } from "@components/src/common/utils";

export default {
  argTypes: {
    buttonPosition: {
      control: {
        type: INLINE_RADIO,
      },
      description:
        'Set on DialogActions. Aligns the action buttons in the footer. Order the buttons so the primary action sits on the outside: last for "right", first for "left".',
      options: ["left", "right"],
      table: {
        defaultValue: { summary: "right" },
      },
    },
    canClickOutsideClose: {
      control: {
        type: "boolean",
      },
      description:
        "When false, onClose is not called for a backdrop click or the Esc key, which makes the Dialog persistent. Give those Dialogs an action button that closes them.",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    longContent: {
      control: {
        type: "boolean",
      },
      description:
        "Story-only: fills the dialog body with a long passage of text, to show how the content scrolls.",
    },
    sdsSize: {
      control: {
        type: INLINE_RADIO,
      },
      description:
        "The size of the dialog. It is also passed to DialogTitle and DialogActions, so their spacing matches the dialog.",
      options: ["xs", "s", "m", "l"],
      table: {
        defaultValue: { summary: "m" },
      },
    },
    titleOnClose: {
      control: {
        type: "boolean",
      },
      description:
        "Story-only: passes an onClose handler to DialogTitle, which is what makes it show a close button.",
    },
  },
  component: Dialog,
  title: "Components/Dialog",
} as Meta;

// Default

export const Default = {
  args: {
    buttonPosition: "right",
    longContent: true,
    sdsSize: "m",
    titleOnClose: false,
  },
};

// Test

export const Test = {
  parameters: {
    controls: {
      exclude: DIALOG_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};

// Test No Title On Close

export const TestNoTitleOnClose = {
  parameters: {
    controls: {
      exclude: DIALOG_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestNoTitleOnCloseDemo {...args} />,
};

// Test Button Position Left

export const TestButtonPositionLeft = {
  parameters: {
    controls: {
      exclude: DIALOG_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestButtonPositionLeftDemo {...args} />,
};

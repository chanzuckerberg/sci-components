/* eslint-disable sonarjs/no-duplicate-string */
import { Args, Meta } from "@storybook/react-vite";
import {
  BUTTON_ACTIONS,
  BUTTON_EXCLUDED_CONTROLS,
  BUTTON_SDS_STYLES,
  BUTTON_SDS_TYPES,
  BUTTON_SDS_SIZE,
  BUTTON_ICON_LABELS,
  BUTTON_ICON_OPTIONS,
} from "./constants";
import { Button } from "./stories/default";
import { INLINE_RADIO } from "@components/src/common/utils";

export default {
  argTypes: {
    backgroundOnHover: {
      control: {
        type: "boolean",
      },
      description:
        'Only applies when sdsStyle is "minimal". When false, the button drops its padding and renders no background on hover or press, so it sits flush with surrounding text.',
      table: {
        defaultValue: { summary: "true" },
      },
    },
    backgroundAppearance: {
      control: {
        type: INLINE_RADIO,
      },
      description:
        'Tells the button which surface it sits on so it can pick colors with enough contrast. Set it to "dark" when the button is placed on a dark background in light mode.',
      options: ["matchBackground", "dark"],
      table: {
        defaultValue: { summary: "matchBackground" },
      },
    },
    children: {
      control: {
        type: "text",
      },
      description: "The content of the button, usually its label.",
    },
    disabled: {
      control: {
        type: "boolean",
      },
      description: "If `true`, the component is disabled.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    endIcon: {
      control: {
        labels: BUTTON_ICON_LABELS,
        type: "select",
      },
      description: "Element placed after the children.",
      mapping: BUTTON_ICON_OPTIONS,
      options: Object.keys(BUTTON_ICON_OPTIONS),
    },
    onClick: { action: BUTTON_ACTIONS.onClick },
    size: {
      control: { type: INLINE_RADIO },
      description:
        "The size of the component. `small` is equivalent to the dense button styling.",
      options: BUTTON_SDS_SIZE,
      table: {
        defaultValue: { summary: "large" },
      },
    },
    sdsStyle: {
      control: { type: INLINE_RADIO },
      description:
        "Style of the button, in descending order of emphasis. Solid is filled, outline draws a 1px border over a transparent background, and minimal is text only.",
      options: BUTTON_SDS_STYLES,
      table: {
        defaultValue: { summary: "solid" },
      },
    },
    sdsType: {
      control: { type: INLINE_RADIO },
      description:
        "Color scheme of the button within the chosen style. Primary uses the accent color, secondary is neutral, and destructive signals an irreversible action.",
      options: BUTTON_SDS_TYPES,
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    startIcon: {
      control: {
        labels: BUTTON_ICON_LABELS,
        type: "select",
      },
      description: "Element placed before the children.",
      mapping: BUTTON_ICON_OPTIONS,
      options: Object.keys(BUTTON_ICON_OPTIONS),
    },
  },
  component: Button,
  title: "Components/Buttons/Button",
} as Meta;

// Default

export const Default = {
  args: {
    disabled: false,
    size: "large",
    sdsStyle: "rounded",
    sdsType: "primary",
    children: "Label",
    backgroundOnHover: true,
    backgroundAppearance: "matchBackground",
  },
};

// Test

export const Test = {
  args: {
    disabled: false,
    sdsStyle: "rounded",
    sdsType: "primary",
    children: "Label",
    size: "large",
  },
  parameters: {
    controls: {
      exclude: BUTTON_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (props: Args) => <Button {...props} data-testid="button" />,
};

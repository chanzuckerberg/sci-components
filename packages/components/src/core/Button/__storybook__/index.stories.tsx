/* eslint-disable sonarjs/no-duplicate-string */
import { Args, Meta } from "@storybook/react-webpack5";
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
import { INLINE_RADIO } from "src/common/utils";

export default {
  argTypes: {
    backgroundOnHover: {
      control: {
        type: "boolean",
      },
    },
    backgroundAppearance: {
      control: {
        type: INLINE_RADIO,
      },
      options: ["matchBackground", "dark"],
    },
    children: {
      control: {
        type: "text",
      },
    },
    endIcon: {
      control: {
        labels: BUTTON_ICON_LABELS,
        type: "select",
      },
      mapping: BUTTON_ICON_OPTIONS,
      options: Object.keys(BUTTON_ICON_OPTIONS),
    },
    onClick: { action: BUTTON_ACTIONS.onClick },
    size: {
      control: {
        labels: BUTTON_SDS_SIZE,
        type: INLINE_RADIO,
      },
      mapping: BUTTON_SDS_SIZE,
      options: Object.keys(BUTTON_SDS_SIZE),
    },
    sdsStyle: {
      control: { type: INLINE_RADIO },
      options: BUTTON_SDS_STYLES,
    },
    sdsType: {
      control: { type: INLINE_RADIO },
      options: BUTTON_SDS_TYPES,
    },
    startIcon: {
      control: {
        labels: BUTTON_ICON_LABELS,
        type: "select",
      },
      mapping: BUTTON_ICON_OPTIONS,
      options: Object.keys(BUTTON_ICON_OPTIONS),
    },
  },
  component: Button,
  tags: ["beta"],
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

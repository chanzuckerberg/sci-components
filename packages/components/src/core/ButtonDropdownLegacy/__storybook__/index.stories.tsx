import { Args, Meta } from "@storybook/react-webpack5";
import Icon from "src/core/Icon";
import {
  BUTTON_DROPDOWN_ACTIONS,
  BUTTON_DROPDOWN_EXCLUDED_CONTROLS,
  BUTTON_DROPDOWN_ICON_LABELS,
  BUTTON_DROPDOWN_ICON_OPTIONS,
  BUTTON_DROPDOWN_TEXT,
} from "./constants";
import { ButtonDropdownLegacy } from "./stories/default";

export default {
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    icon: {
      control: {
        labels: BUTTON_DROPDOWN_ICON_LABELS,
        type: "select",
      },
      mapping: BUTTON_DROPDOWN_ICON_OPTIONS,
      options: Object.keys(BUTTON_DROPDOWN_ICON_OPTIONS),
    },
    sdsSize: {
      control: {
        type: "radio",
      },
      if: { arg: "sdsStyle", eq: "icon" },
      options: ["small", "medium", "large"],
    },
    sdsStyle: {
      control: { type: "radio" },
      options: ["rounded", "square", "icon"],
      required: true,
    },
    sdsType: {
      control: { type: "radio" },
      options: ["primary", "secondary", "tertiary", "destructive"],
      required: true,
    },
  },
  component: ButtonDropdownLegacy,
  tags: ["deprecated"],
  title: "Deprecated/ButtonDropdownLegacy",
} as Meta;

// Default

export const Default = {
  args: {
    disabled: false,
    icon: "Download",
    onClick: BUTTON_DROPDOWN_ACTIONS.onClick,
    sdsSize: "medium",
    sdsStyle: "square",
    sdsType: "primary",
  },
};

// Test

export const Test = {
  args: {
    disabled: false,
    icon: <Icon sdsIcon="Download" sdsSize="s" />,
    onClick: BUTTON_DROPDOWN_ACTIONS.onClick,
    sdsStyle: "rounded",
    sdsType: "primary",
  },
  parameters: {
    controls: {
      exclude: BUTTON_DROPDOWN_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (props: Args): JSX.Element => {
    return (
      <ButtonDropdownLegacy data-testid="button-dropdown" {...props}>
        {BUTTON_DROPDOWN_TEXT}
      </ButtonDropdownLegacy>
    );
  },
};

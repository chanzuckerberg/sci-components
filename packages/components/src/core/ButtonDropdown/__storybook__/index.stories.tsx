import { Args, Meta } from "@storybook/react";
import Icon from "src/core/Icon";
import {
  BUTTON_DROPDOWN_ACTIONS,
  BUTTON_DROPDOWN_EXCLUDED_CONTROLS,
  BUTTON_DROPDOWN_ICON_LABELS,
  BUTTON_DROPDOWN_ICON_OPTIONS,
  BUTTON_DROPDOWN_TEXT,
} from "./constants";
import { ButtonDropdown } from "./stories/default";
import { BADGE } from "src/common/storybook/storybookBadges";

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
      options: ["primary", "secondary"],
      required: true,
    },
  },
  component: ButtonDropdown,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/ButtonDropdown",
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
    icon: <Icon sdsIcon="Download" sdsSize="l" sdsType="button" />,
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
      <ButtonDropdown data-testid="button-dropdown" {...props}>
        {BUTTON_DROPDOWN_TEXT}
      </ButtonDropdown>
    );
  },
};

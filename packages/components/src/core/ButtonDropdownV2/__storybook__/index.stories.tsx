import { Args, Meta } from "@storybook/react-webpack5";
import Icon from "src/core/Icon";
import {
  BUTTON_DROPDOWN_ACTIONS,
  BUTTON_DROPDOWN_EXCLUDED_CONTROLS,
  BUTTON_DROPDOWN_ICON_LABELS,
  BUTTON_DROPDOWN_ICON_OPTIONS,
} from "./constants";
import { ButtonDropdownV2 } from "./stories/default";

export default {
  argTypes: {
    backgroundOnHover: {
      control: { type: "boolean" },
    },
    children: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    startIcon: {
      control: {
        labels: BUTTON_DROPDOWN_ICON_LABELS,
        type: "select",
      },
      mapping: BUTTON_DROPDOWN_ICON_OPTIONS,
      options: Object.keys(BUTTON_DROPDOWN_ICON_OPTIONS),
    },
    size: {
      control: {
        type: "radio",
      },
      options: ["small", "medium", "large"],
    },
    sdsStyle: {
      control: { type: "radio" },
      options: ["solid", "outline", "minimal"],
      required: true,
    },
    sdsType: {
      control: { type: "radio" },
      options: ["primary", "secondary"],
      required: true,
    },
  },
  component: ButtonDropdownV2,
  tags: ["beta"],
  title: "Components/Buttons/ButtonDropdownV2",
} as Meta;

// Default

export const Default = {
  args: {
    backgroundOnHover: true,
    children: "Label",
    disabled: false,
    startIcon: BUTTON_DROPDOWN_ICON_OPTIONS[0],
    onClick: BUTTON_DROPDOWN_ACTIONS.onClick,
    size: "medium",
    sdsStyle: "solid",
    sdsType: "primary",
  },
};

// Test

export const Test = {
  args: {
    disabled: false,
    startIcon: <Icon sdsIcon="Download" sdsSize="s" />,
    onClick: BUTTON_DROPDOWN_ACTIONS.onClick,
    sdsStyle: "solid",
    size: "medium",
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
    return <ButtonDropdownV2 data-testid="button-dropdown" {...props} />;
  },
};

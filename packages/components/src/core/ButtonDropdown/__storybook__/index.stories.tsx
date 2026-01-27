import { Args, Meta } from "@storybook/react-webpack5";
import Icon from "src/core/Icon";
import {
  BUTTON_DROPDOWN_ACTIONS,
  BUTTON_DROPDOWN_EXCLUDED_CONTROLS,
  BUTTON_DROPDOWN_ICON_LABELS,
  BUTTON_DROPDOWN_ICON_OPTIONS,
} from "./constants";
import { ButtonDropdown } from "./stories/default";
import { INLINE_RADIO } from "src/common/utils";

export default {
  argTypes: {
    backgroundAppearance: {
      control: { type: INLINE_RADIO },
      options: ["matchBackground", "dark"],
    },
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
        type: INLINE_RADIO,
      },
      options: ["small", "medium", "large"],
    },
    sdsStyle: {
      control: { type: INLINE_RADIO },
      options: ["solid", "outline", "minimal"],
      required: true,
    },
    sdsType: {
      control: { type: INLINE_RADIO },
      options: ["primary", "secondary"],
      required: true,
    },
  },
  component: ButtonDropdown,
  tags: ["beta"],
  title: "Components/Buttons/ButtonDropdown",
} as Meta;

// Default

export const Default = {
  args: {
    backgroundAppearance: "matchBackground",
    backgroundOnHover: true,
    children: "Label",
    disabled: false,
    startIcon: BUTTON_DROPDOWN_ICON_OPTIONS[0],
    onClick: BUTTON_DROPDOWN_ACTIONS.onClick,
    size: "large",
    sdsStyle: "solid",
    sdsType: "primary",
  },
};

// Test

export const Test = {
  args: {
    backgroundAppearance: "matchBackground",
    disabled: false,
    startIcon: <Icon sdsIcon="Download" sdsSize="s" />,
    onClick: BUTTON_DROPDOWN_ACTIONS.onClick,
    sdsStyle: "solid",
    size: "large",
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
      <ButtonDropdown
        {...props}
        aria-label="button-dropdown"
        data-testid="button-dropdown"
      />
    );
  },
};

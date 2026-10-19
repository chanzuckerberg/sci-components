import { Args, Meta } from "@storybook/react-vite";
import Icon from "@components/src/core/Icon";
import {
  BUTTON_DROPDOWN_ACTIONS,
  BUTTON_DROPDOWN_EXCLUDED_CONTROLS,
  BUTTON_DROPDOWN_ICON_LABELS,
  BUTTON_DROPDOWN_ICON_OPTIONS,
} from "./constants";
import { ButtonDropdown } from "./stories/default";
import { INLINE_RADIO } from "@components/src/common/utils";

export default {
  argTypes: {
    backgroundAppearance: {
      control: { type: INLINE_RADIO },
      description:
        'Tells the button which surface it sits on so it can pick colors with enough contrast. Set it to "dark" when the button is placed on a dark background in light mode.',
      options: ["matchBackground", "dark"],
      table: {
        defaultValue: { summary: "matchBackground" },
      },
    },
    backgroundOnHover: {
      control: { type: "boolean" },
      description:
        'Only applies when sdsStyle is "minimal". When false, the button drops its padding and renders no background on hover or press, so it sits flush with surrounding text.',
      table: {
        defaultValue: { summary: "true" },
      },
    },
    children: {
      control: { type: "text" },
      description:
        "The button label. The trailing chevron is only rendered when a label is present.",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disables the button when set to true.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    startIcon: {
      control: {
        labels: BUTTON_DROPDOWN_ICON_LABELS,
        type: "select",
      },
      description:
        'An optional icon placed before the label. Pass the SDS Icon component, for example `<Icon sdsIcon="Download" sdsSize="s" />`.',
      mapping: BUTTON_DROPDOWN_ICON_OPTIONS,
      options: Object.keys(BUTTON_DROPDOWN_ICON_OPTIONS),
    },
    size: {
      control: {
        type: INLINE_RADIO,
      },
      description:
        "Size of the button. Also sets the size of the trailing chevron.",
      options: ["small", "medium", "large"],
      table: {
        defaultValue: { summary: "large" },
      },
    },
    sdsStyle: {
      control: { type: INLINE_RADIO },
      description: "Style of the button. Same values as Button.",
      options: ["solid", "outline", "minimal"],
      required: true,
      table: {
        defaultValue: { summary: "solid" },
      },
    },
    sdsType: {
      control: { type: INLINE_RADIO },
      description:
        'Color scheme of the button. Unlike Button, "destructive" is not supported.',
      options: ["primary", "secondary"],
      required: true,
      table: {
        defaultValue: { summary: "primary" },
      },
    },
  },
  component: ButtonDropdown,
  title: "Components/Buttons/ButtonDropdown",
} as Meta;

// Default

export const Default = {
  args: {
    backgroundAppearance: "matchBackground",
    backgroundOnHover: true,
    children: "Label",
    disabled: false,
    startIcon: BUTTON_DROPDOWN_ICON_OPTIONS.download,
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

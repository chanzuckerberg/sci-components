/* eslint-disable sonarjs/no-duplicate-string */
import { Args, Meta } from "@storybook/react-vite";
import { ButtonToggle } from "./stories/default";
import { BUTTON_TOGGLE_EXCLUDED_CONTROLS } from "./constants";
import { TestDemo } from "./stories/test";
import {
  BUTTON_DROPDOWN_ICON_LABELS,
  BUTTON_DROPDOWN_ICON_OPTIONS,
} from "@components/src/core/ButtonDropdown/__storybook__/constants";
import { INLINE_RADIO } from "@components/src/common/utils";

export default {
  argTypes: {
    backgroundAppearance: {
      control: { type: INLINE_RADIO },
      description:
        "Button's prop, telling the toggle which surface it sits on so it can pick colors with enough contrast.",
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
    startIcon: {
      control: {
        labels: BUTTON_DROPDOWN_ICON_LABELS,
        type: "select",
      },
      description:
        'Required. The icon displayed within the component. Pass the SDS Icon component, for example `<Icon sdsIcon="Search" sdsSize="s" />`.',
      mapping: BUTTON_DROPDOWN_ICON_OPTIONS,
      options: Object.keys(BUTTON_DROPDOWN_ICON_OPTIONS),
    },
    size: {
      control: {
        type: INLINE_RADIO,
      },
      description:
        "The size of the component. `small` is equivalent to the dense button styling.",
      options: ["small", "medium", "large"],
      table: {
        defaultValue: { summary: "large" },
      },
    },
    sdsType: {
      control: {
        type: INLINE_RADIO,
      },
      description:
        'Color scheme of the button. Primary uses the accent color in the on stage, secondary stays neutral. Set it explicitly: the on stage resolves its colors before Button applies this default, so an omitted value draws the neutral treatment over a button that is otherwise primary. Button\'s "destructive" is inherited by the type but has no on-stage treatment, so it should not be used here.',
      options: ["primary", "secondary"],
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    sdsStyle: {
      control: { type: INLINE_RADIO },
      description:
        'Style of the button. ButtonToggle inherits Button\'s default of "solid", but toggles are designed around "outline" and "minimal", so set one of those explicitly.',
      options: ["outline", "minimal"],
      table: {
        defaultValue: { summary: "solid" },
      },
    },
    sdsStage: {
      control: { type: INLINE_RADIO },
      description:
        "Controls the toggle stage. The component is fully controlled, so keep this value in state and update it from onClick.",
      options: ["on", "off"],
      table: {
        defaultValue: { summary: "off" },
      },
    },
  },
  component: ButtonToggle,
  title: "Components/Buttons/ButtonToggle",
} as Meta;

// Default

export const Default = {
  args: {
    children: "Label",
    backgroundAppearance: "matchBackground",
    disabled: false,
    startIcon: BUTTON_DROPDOWN_ICON_OPTIONS.download,
    size: "large",
    sdsType: "primary",
    sdsStyle: "outline",
    sdsStage: "off",
  },
};

// Test

export const Test = {
  parameters: {
    controls: {
      exclude: BUTTON_TOGGLE_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo startIcon="InfoCircle" {...args} />,
};

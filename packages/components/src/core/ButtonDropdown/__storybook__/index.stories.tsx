import { Args, Meta } from "@storybook/react";
import Icon from "src/core/Icon";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import {
  BUTTON_DROPDOWN_ACTIONS,
  BUTTON_DROPDOWN_EXCLUDED_CONTROLS,
  BUTTON_DROPDOWN_ICON_OPTIONS,
  BUTTON_DROPDOWN_TEXT,
} from "./constants";
import { ButtonDropdown } from "./stories/default";
import { LivePreviewDemo } from "./stories/livePreview";

export default {
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    icon: {
      control: {
        labels: ["Download Icon", "Copy Icon", "Bacteria Icon"],
        type: "select",
      },
      mapping: BUTTON_DROPDOWN_ICON_OPTIONS,
      options: Object.keys(BUTTON_DROPDOWN_ICON_OPTIONS),
    },
    sdsStyle: {
      control: { type: "radio" },
      options: ["rounded", "square"],
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
    badges: [BADGE.NEEDS_REVISION],
  },
  title: "Components/ButtonDropdown [wip]",
} as Meta;

// Default

export const Default = {
  args: {
    disabled: false,
    icon: <Icon sdsIcon="Download" sdsSize="l" sdsType="button" />,
    onClick: BUTTON_DROPDOWN_ACTIONS.onClick,
    sdsStyle: "square",
    sdsType: "primary",
  },
};

// LivePreview

export const LivePreview = {
  parameters: {
    controls: {
      exclude: BUTTON_DROPDOWN_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
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

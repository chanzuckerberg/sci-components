/* eslint-disable no-use-before-define */
import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { CellBasic } from "./stories/default";
import {
  CELL_BASIC_EXCLUDED_CONTROLS,
  CELL_BASIC_ICON_LABELS,
  CELL_BASIC_ICON_OPTIONS,
} from "./constants";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    horizontalAlign: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
    icon: {
      control: {
        labels: CELL_BASIC_ICON_LABELS,
        type: "select",
      },
      mapping: CELL_BASIC_ICON_OPTIONS,
      options: Object.keys(CELL_BASIC_ICON_OPTIONS),
    },
    iconVerticalAlign: {
      control: { type: "select" },
      options: ["top", "center", "bottom"],
    },
    primaryText: {
      control: { type: "text" },
    },
    primaryTextWrapLineCount: {
      control: { type: "number" },
    },
    secondaryText: {
      control: { type: "text" },
    },
    secondaryTextWrapLineCount: {
      control: { type: "number" },
    },
    shouldShowTooltipOnHover: {
      control: { type: "boolean" },
    },
    shouldTextWrap: {
      control: { type: "boolean" },
    },
    tertiaryText: {
      control: { type: "text" },
    },
    tertiaryTextWrapLineCount: {
      control: { type: "number" },
    },
    tooltipProps: {
      control: { type: "object" },
    },
    verticalAlign: {
      control: { type: "select" },
      options: ["top", "center", "bottom"],
    },
  },
  component: CellBasic,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/Table/CellBasic",
} as Meta;

// Default

export const Default = {
  args: {
    primaryText: "Primary Text",
    primaryTextWrapLineCount: 3,
    secondaryText: "Secondary Text",
    secondaryTextWrapLineCount: 1,
    shouldShowTooltipOnHover: true,
    shouldTextWrap: true,
    tertiaryText: "Tertiary Text",
    tertiaryTextWrapLineCount: 1,
    tooltipProps: { sdsStyle: "dark" },
  },
};

// Test

export const Test = {
  args: {
    primaryText: "Primary text",
    secondaryText: "Secondary Text",
  },
  parameters: {
    controls: {
      exclude: CELL_BASIC_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};

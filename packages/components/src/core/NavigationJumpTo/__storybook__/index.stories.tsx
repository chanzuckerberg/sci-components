import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { NavigationJumpTo } from "./stories/default";
import {
  NAVIGATION_JUMP_TO_ARIA_VALID_ATTR_VALUE,
  NAVIGATION_JUMP_TO_EXCLUDED_CONTROLS,
} from "./constants";
import { NavigationJumpToDemo } from "./stories/demo";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    items: {
      control: { require: true, type: "object" },
      defaultValue: { summary: "-" },
      description:
        "An array of object containing a title for the Navigation Tab and a ref to the section div.",
    },
    offsetTop: {
      control: { description: "wew", type: "number" },
      defaultValue: { summary: "0" },
      description:
        "To apply the offsetTop to the component, please refresh the page.",
    },
  },
  component: NavigationJumpTo,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/NavigationJumpTo",
} as Meta;

// Default

export const Default = {
  args: {
    items: [
      { elementRef: { current: null }, title: "Item 1" },
      { elementRef: { current: null }, title: "Item 2" },
      { elementRef: { current: null }, title: "Item 3" },
      { elementRef: { current: null }, title: "Item 4" },
      { elementRef: { current: null }, title: "Item 5" },
    ],
    offsetTop: 0,
  },
  parameters: {
    axe: {
      disabledRules: [NAVIGATION_JUMP_TO_ARIA_VALID_ATTR_VALUE],
    },
    controls: { expanded: true },
  },
  render: (args: Args) => <NavigationJumpTo {...args} />,
};

// Demo

export const JumpToNavDemo = {
  args: {
    items: [],
    offsetTop: 0,
  },
  parameters: {
    axe: {
      disabledRules: [NAVIGATION_JUMP_TO_ARIA_VALID_ATTR_VALUE],
    },
    controls: {
      exclude: ["items"],
      expanded: true,
    },
  },
  render: (args: Args) => <NavigationJumpToDemo {...args} />,
};

// Test

export const Test = {
  args: {
    items: [
      { elementRef: { current: null }, title: "Item 1" },
      { elementRef: { current: null }, title: "Item 2" },
      { elementRef: { current: null }, title: "Item 3" },
      { elementRef: { current: null }, title: "Item 4" },
      { elementRef: { current: null }, title: "Item 5" },
    ],
  },
  parameters: {
    axe: {
      disabledRules: [NAVIGATION_JUMP_TO_ARIA_VALID_ATTR_VALUE],
    },
    controls: {
      exclude: NAVIGATION_JUMP_TO_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};

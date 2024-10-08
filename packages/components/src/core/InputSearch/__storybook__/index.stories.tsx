import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { INPUT_SEARCH_EXCLUDED_CONTROLS } from "./constants";
import { InputSearch } from "./stories/default";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    id: {
      control: { type: "text" },
      required: true,
    },
    intent: {
      control: { type: "radio" },
      options: ["default", "negative", "notice", "positive"],
    },
    label: {
      control: { type: "text" },
      required: true,
    },
    placeholder: {
      control: { type: "text" },
    },
    sdsStyle: {
      control: { type: "radio" },
      options: ["rounded", "square"],
    },
  },
  component: InputSearch,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/Inputs/InputSearch",
} as Meta;

// Default

export const Default = {
  args: {
    disabled: false,
    id: "Test",
    label: "Search",
    placeholder: "Search",
  },
};

// Test

export const Test = {
  parameters: {
    controls: {
      exclude: INPUT_SEARCH_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};

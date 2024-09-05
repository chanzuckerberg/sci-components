import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { Accordion } from "./stories/default";
import { ACCORDION_EXCLUDED_CONTROLS } from "./constants";

export default {
  argTypes: {
    defaultExpanded: {
      control: { type: "boolean" },
    },
    id: {
      control: { type: "text" },
      required: true,
    },
    subtitle: {
      control: { type: "text" },
    },
    togglePosition: {
      control: { type: "select" },
      options: ["right", "left"],
    },
    useDivider: {
      control: { type: "boolean" },
    },
  },
  component: Accordion,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/Accordion",
} as Meta;

// Default

export const Default = {
  args: {
    togglePosition: "right",
  },
};

// Test

export const Test = {
  args: {
    id: "test-story",
    togglePosition: "right",
  },
  parameters: {
    controls: {
      exclude: ACCORDION_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (props: Args): JSX.Element => (
    <Accordion {...props} data-testid="accordion" />
  ),
};

import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";

const DesignTokens = (props: Args): JSX.Element => {
  return <p {...props}>Design Tokens go here</p>;
};

export default {
  argTypes: {
    id: {
      control: { type: "text" },
      required: true,
    },
  },
  component: DesignTokens,
  parameters: {
    badges: [BADGE.EXPERIMENTAL],
  },
  title: "Foundations/Colors",
} as Meta;

// Default

export const Default = {
  args: {
    id: "right",
  },
};

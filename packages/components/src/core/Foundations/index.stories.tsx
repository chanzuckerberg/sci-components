import { Args, Meta } from "@storybook/react";
import { BADGE } from "../../common/SDSBadges";

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
    badges: [BADGE.WIP],
  },
  title: "Foundations/Colors [wip]",
} as Meta;

// Default

export const Default = {
  args: {
    id: "right",
  },
};

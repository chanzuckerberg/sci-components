import { Args, Meta } from "@storybook/react";
import { BADGE } from "../../common/SDSBadges";
import { StyledDiv, StyledSpan } from "./style";

const DesignTokens = (props: Args): JSX.Element => {
  return (
    <StyledDiv {...props}>
      <span>Design Tokens go here</span>
      <StyledSpan>12343430032</StyledSpan>
    </StyledDiv>
  );
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
    axe: {
      disabledRules: ["color-contrast"],
    },
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

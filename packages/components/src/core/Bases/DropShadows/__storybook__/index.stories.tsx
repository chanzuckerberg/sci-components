import { Meta } from "@storybook/react";
import { BADGE } from "src/common/storybook/storybookBadges";
import { StyledShadowsWrapper } from "./style";
import { Template } from "./stories/default";

export default {
  parameters: {
    badges: [BADGE.WIP],
  },
  title: "Bases/Drop Shadows",
} as Meta;

// Drop Shadows

export const Default = {
  render: () => (
    <>
      <StyledShadowsWrapper>
        <Template />
      </StyledShadowsWrapper>
    </>
  ),
};

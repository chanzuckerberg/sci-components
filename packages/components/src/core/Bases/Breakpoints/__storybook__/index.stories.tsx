import { Meta } from "@storybook/react";
import { BADGE } from "src/common/storybook/storybookBadges";
import { StyledBreakpointsWrapper } from "./style";
import { Template } from "./stories/default";

export default {
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Bases/Breakpoints",
} as Meta;

// Breakpoints

export const Default = {
  render: () => (
    <>
      <StyledBreakpointsWrapper>
        <Template />
      </StyledBreakpointsWrapper>
    </>
  ),
};

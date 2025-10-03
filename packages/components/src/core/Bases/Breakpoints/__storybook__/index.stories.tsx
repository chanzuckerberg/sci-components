import { Meta } from "@storybook/react-webpack5";
import { StyledBreakpointsWrapper } from "./style";
import { Template } from "./stories/default";

export default {
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

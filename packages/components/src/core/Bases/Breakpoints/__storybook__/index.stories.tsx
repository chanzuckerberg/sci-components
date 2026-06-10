import { Meta } from "@storybook/react-vite";
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

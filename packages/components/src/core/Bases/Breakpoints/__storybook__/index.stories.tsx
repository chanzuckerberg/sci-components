import { Meta } from "@storybook/react-vite";
import { StyledBreakpointsWrapper } from "./style";
import { Template } from "./stories/default";

export default {
  title: "Bases/Breakpoints",
} as Meta;

// Breakpoints

export const Default = {
  // Kept out of the sidebar: the Documentation page renders this table in
  // place. It remains a story for Chromatic and the a11y run.
  tags: ["!dev"],
  render: () => (
    <>
      <StyledBreakpointsWrapper>
        <Template />
      </StyledBreakpointsWrapper>
    </>
  ),
};

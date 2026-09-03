import { Meta } from "@storybook/react-vite";
import { StyledShadowsWrapper } from "./style";
import { Template } from "./stories/default";

export default {
  parameters: {
    /**
     * A Bases story is documentation — a table of design tokens the page
     * renders in place — and the accessibility suite is for the components,
     * which answer for themselves in their own stories.
     */
    a11y: { test: "off" },
  },
  title: "Bases/Drop Shadows",
} as Meta;

// Drop Shadows

export const Default = {
  // Kept out of the sidebar: the Documentation page renders this table in
  // place. It remains a story for Chromatic.
  tags: ["!dev"],
  render: () => (
    <>
      <StyledShadowsWrapper>
        <Template />
      </StyledShadowsWrapper>
    </>
  ),
};

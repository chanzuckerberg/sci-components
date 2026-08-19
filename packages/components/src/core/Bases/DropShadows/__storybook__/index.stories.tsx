import { Meta } from "@storybook/react-vite";
import { StyledShadowsWrapper } from "./style";
import { Template } from "./stories/default";

export default {
  parameters: {
    /**
     * A Bases story is documentation — a table of design tokens the page
     * renders in place — and the accessibility suite is for the components,
     * which answer for themselves in their own stories. Two keys because there
     * are two suites: `a11y` is addon-a11y's, `axe` is axe-storybook-testing's.
     */
    a11y: { test: "off" },
    axe: { skip: true },
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

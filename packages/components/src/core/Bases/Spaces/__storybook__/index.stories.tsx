import { Meta } from "@storybook/react-vite";
import { StyledSpacingWrapper } from "./style";
import { Template } from "./stories/default";

export default {
  parameters: {
    axe: {
      disabledRules: ["color-contrast"],
    },
  },
  title: "Bases/Spaces",
} as Meta;

// Spaces

export const Default = {
  // Kept out of the sidebar: the Documentation page renders this table in
  // place. It remains a story for Chromatic and the a11y run.
  tags: ["!dev"],
  render: () => (
    <>
      <StyledSpacingWrapper>
        <Template />
      </StyledSpacingWrapper>
    </>
  ),
};

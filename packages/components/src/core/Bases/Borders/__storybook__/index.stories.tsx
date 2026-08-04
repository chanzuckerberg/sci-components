import { Meta } from "@storybook/react-vite";
import { StyledBordersWrapper } from "./style";
import { Template } from "./stories/default";

export default {
  title: "Bases/Borders",
} as Meta;

// Borders

export const Default = {
  // Kept out of the sidebar: the Documentation page renders this table in
  // place. It remains a story for Chromatic and the a11y run.
  tags: ["!dev"],
  render: () => (
    <>
      <StyledBordersWrapper>
        <Template />
      </StyledBordersWrapper>
    </>
  ),
};

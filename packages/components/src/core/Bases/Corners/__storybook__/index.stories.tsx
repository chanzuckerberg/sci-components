import { Meta } from "@storybook/react-vite";
import { StyledCornersWrapper } from "./style";
import { Template } from "./stories/default";

export default {
  title: "Bases/Corners",
} as Meta;

// Corners

export const Default = {
  // Kept out of the sidebar: the Documentation page renders this table in
  // place. It remains a story for Chromatic and the a11y run.
  tags: ["!dev"],
  render: () => (
    <>
      <StyledCornersWrapper>
        <Template />
      </StyledCornersWrapper>
    </>
  ),
};

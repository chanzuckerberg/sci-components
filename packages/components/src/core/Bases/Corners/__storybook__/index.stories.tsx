import { Meta } from "@storybook/react-vite";
import { StyledCornersWrapper } from "./style";
import { Template } from "./stories/default";

export default {
  title: "Bases/Corners",
} as Meta;

// Corners

export const Default = {
  render: () => (
    <>
      <StyledCornersWrapper>
        <Template />
      </StyledCornersWrapper>
    </>
  ),
};

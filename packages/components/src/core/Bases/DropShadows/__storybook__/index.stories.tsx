import { Meta } from "@storybook/react-webpack5";
import { StyledShadowsWrapper } from "./style";
import { Template } from "./stories/default";

export default {
  title: "Bases/Drop Shadows",
} as Meta;

// Drop Shadows

export const Default = {
  render: () => (
    <>
      <StyledShadowsWrapper>
        <Template />
      </StyledShadowsWrapper>
    </>
  ),
};

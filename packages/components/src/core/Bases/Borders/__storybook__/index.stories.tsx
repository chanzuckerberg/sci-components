import { Meta } from "@storybook/react-vite";
import { StyledBordersWrapper } from "./style";
import { Template } from "./stories/default";

export default {
  title: "Bases/Borders",
} as Meta;

// Borders

export const Default = {
  render: () => (
    <>
      <StyledBordersWrapper>
        <Template />
      </StyledBordersWrapper>
    </>
  ),
};

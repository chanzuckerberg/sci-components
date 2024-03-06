import { Meta } from "@storybook/react";
import { BADGE } from "src/common/storybook/storybookBadges";
import { StyledBordersWrapper } from "./style";
import { Template } from "./stories/default";

export default {
  parameters: {
    badges: [BADGE.WIP],
  },
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

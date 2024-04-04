import { Meta } from "@storybook/react";
import { BADGE } from "src/common/storybook/storybookBadges";
import { StyledCornersWrapper } from "./style";
import { Template } from "./stories/default";

export default {
  parameters: {
    badges: [BADGE.WIP],
  },
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

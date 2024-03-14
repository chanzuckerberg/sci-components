import { Meta } from "@storybook/react";
import { BADGE } from "src/common/storybook/storybookBadges";
import { StyledSpacingWrapper } from "./style";
import { Template } from "./stories/default";

export default {
  parameters: {
    axe: {
      disabledRules: ["color-contrast"],
    },
    badges: [BADGE.WIP],
  },
  title: "Bases/Spaces",
} as Meta;

// Spaces

export const Default = {
  render: () => (
    <>
      <StyledSpacingWrapper>
        <Template />
      </StyledSpacingWrapper>
    </>
  ),
};

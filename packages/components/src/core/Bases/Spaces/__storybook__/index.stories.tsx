import { Meta } from "@storybook/react-webpack5";
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
  render: () => (
    <>
      <StyledSpacingWrapper>
        <Template />
      </StyledSpacingWrapper>
    </>
  ),
};

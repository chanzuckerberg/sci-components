import { Meta } from "@storybook/react";
import { BADGE } from "src/common/storybook/storybookBadges";
import { PrimitiveColorsTemplate } from "./stories/primitiveColors";
import { SemanticColorsTemplate } from "./stories/semanticColors";

export default {
  parameters: {
    axe: {
      disabledRules: ["color-contrast"],
    },
    badges: [BADGE.STABLE],
  },
  title: "Bases/Colors",
} as Meta;

// Primitive

export const PrimitiveColors = {
  render: () => <PrimitiveColorsTemplate />,
};

// Semantic Colors

export const SemanticColors = {
  render: () => <SemanticColorsTemplate />,
};

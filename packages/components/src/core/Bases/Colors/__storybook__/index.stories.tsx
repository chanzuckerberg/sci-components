import { Meta } from "@storybook/react";
import { BADGE } from "src/common/storybook/storybookBadges";
import { PrimitiveColorsTemplate } from "./stories/primitiveColors";
import { SemanticComponentColorsTemplate } from "./stories/semanticComponentColors";
import { SemanticTextColorsTemplate } from "./stories/semanticTextColors";

export default {
  parameters: {
    axe: {
      disabledRules: ["color-contrast"],
    },
    badges: [BADGE.WIP],
  },
  title: "Bases/Colors",
} as Meta;

// Primitive

export const PrimitiveColors = {
  render: () => <PrimitiveColorsTemplate />,
};

// Semantic Component Colors

export const SemanticComponentColors = {
  render: () => <SemanticComponentColorsTemplate />,
};

// Semantic Text Colors

export const SemanticTextColors = {
  render: () => <SemanticTextColorsTemplate />,
};

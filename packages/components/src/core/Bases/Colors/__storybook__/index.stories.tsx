import { Meta } from "@storybook/react-webpack5";
import { PrimitiveColorsTemplate } from "./stories/primitiveColors";
import { SemanticColorsTemplate } from "./stories/semanticColors";

export default {
  parameters: {
    axe: {
      disabledRules: ["color-contrast"],
    },
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

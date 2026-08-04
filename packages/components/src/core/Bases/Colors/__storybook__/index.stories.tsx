import { Meta } from "@storybook/react-vite";
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
  // Kept out of the sidebar: the Documentation page renders these swatches in
  // place. They remain stories for Chromatic and the a11y run.
  tags: ["!dev"],
  render: () => <PrimitiveColorsTemplate />,
};

// Semantic Colors

export const SemanticColors = {
  tags: ["!dev"],
  render: () => <SemanticColorsTemplate />,
};

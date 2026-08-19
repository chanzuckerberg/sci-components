import { Meta } from "@storybook/react-vite";
import { PrimitiveColorsTemplate } from "./stories/primitiveColors";
import { SemanticColorsTemplate } from "./stories/semanticColors";

export default {
  parameters: {
    /**
     * A Bases story is documentation — a table of design tokens the page
     * renders in place — and the accessibility suite is for the components,
     * which answer for themselves in their own stories. Two keys because there
     * are two suites: `a11y` is addon-a11y's, `axe` is axe-storybook-testing's.
     */
    a11y: { test: "off" },
    axe: { skip: true },
  },
  title: "Bases/Colors",
} as Meta;

// Primitive

export const PrimitiveColors = {
  // Kept out of the sidebar: the Documentation page renders these swatches in
  // place. They remain stories for Chromatic.
  tags: ["!dev"],
  render: () => <PrimitiveColorsTemplate />,
};

// Semantic Colors

export const SemanticColors = {
  tags: ["!dev"],
  render: () => <SemanticColorsTemplate />,
};

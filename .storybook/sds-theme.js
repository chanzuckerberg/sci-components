// .storybook/YourTheme.js

import { create } from "storybook/theming";
import logo from "./logo.png";

/**
 * The typeface SDS sets everything in, as the `sds.font.inter-font` token has
 * it minus the `--font-inter` variable, which only exists in an app that loads
 * Inter through Next.js. Storybook's chrome and its documentation pages are
 * themed separately, so both read this.
 */
export const FONT_BASE =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif';

export default create({
  base: "light",

  colorPrimary: "black",
  colorSecondary: "silver",

  // UI
  appBg: "white",
  appContentBg: "white",
  appBorderRadius: 0,

  // Typography
  fontBase: FONT_BASE,
  fontCode: "monospace",

  // Text colors
  textColor: "black",
  textInverseColor: "rgba(255,255,255,0.9)",

  // Toolbar default and active colors
  barTextColor: "silver",
  barSelectedColor: "black",
  barBg: "white",

  // Form colors
  inputBg: "white",
  inputBorder: "silver",
  inputTextColor: "black",
  inputBorderRadius: 4,

  brandTitle: "Science Design System",
  brandUrl: "https://chanzuckerberg.github.io/sci-components/",
  brandImage: logo,
  brandTarget: "_blank",
});

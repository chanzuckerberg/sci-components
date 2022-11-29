// .storybook/YourTheme.js

import { create } from "@storybook/theming";
import logo from "./logo.png";

export default create({
  base: "light",

  colorPrimary: "black",
  colorSecondary: "silver",

  // UI
  appBg: "white",
  appContentBg: "white",
  appBorderColor: "white",
  appBorderRadius: 0,

  // Typography
  fontBase: '"Open Sans", sans-serif',
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
  brandUrl:
    "https://zeroheight.com/009eaf17b/v/latest/p/349f6a-science-design-system",
  brandImage: logo,
  brandTarget: "_blank",
});

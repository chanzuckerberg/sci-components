import { createTheme, PaletteMode } from "@mui/material";
import { SDSChooseTheme } from "./SDSAppTheme";
import { makeThemeOptions } from "./makeThemeOptions";

/**
 * Theme adaptor with light/dark mode support.
 *
 * @param t The theme to use. Currently supports a light and dark variant.
 * @returns The selected theme object to be used in the ThemeProvider
 */
export const Theme = (t: PaletteMode) =>
  createTheme(makeThemeOptions(SDSChooseTheme(t), t));

/**
 * Default theme, uses light mode with no option to change it.
 *
 * Use the `theme` export to get a flexible light/dark mode theme function
 */
export const defaultTheme = Theme("light");

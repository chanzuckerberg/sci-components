// Preview provider for claude.ai/design.
//
// The SDS is Material UI v5 + Emotion: components read design tokens from MUI's
// ThemeContext, so a preview with no ThemeProvider renders unthemed (or throws).
// The repo's storybook wraps every story in `.storybook/preview.jsx`'s decorator
// (ThemeProvider + CssBaseline), but that decorator is bundled as a SEPARATE
// esbuild pass whose MUI ThemeContext instance does not match the components in
// _ds_bundle.js — so it cannot supply context to them, and its CssBaseline also
// resolves undefined under esbuild's MUI ESM interop.
//
// This module is merged into _ds_bundle.js via cfg.extraEntries, so its
// ThemeProvider shares the exact MUI module instance the components use — the
// theme context reaches them. cfg.provider wraps every preview mount in it.
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "../packages/components/dist/index.esm.js";

const lightTheme = Theme("light");

export function SDSPreviewProvider(props) {
  return React.createElement(ThemeProvider, { theme: lightTheme }, props.children);
}

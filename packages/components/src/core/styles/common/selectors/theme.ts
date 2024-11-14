import { Breakpoints, PaletteOptions } from "@mui/material/styles";
import {
  Borders,
  Colors,
  Corners,
  FontWeights,
  IconSizes,
  SDSPalette,
  SDSTheme,
  Shadows,
  Spaces,
  Typography,
} from "../types";

// (thuang): Somehow this namespace needs to be globally unique to prevent
// namespace collisions.
// Might be related to using `rollup-plugin-ts`, which does code splitting?
export interface CommonThemeProps {
  theme?: SDSTheme;
}

export const getSpaces = ({ theme }: CommonThemeProps): Spaces | null => {
  return theme?.app?.spacing || null;
};

/**
 * @deprecated getSpacings() is deprecated and may be removed in a future release. Please use getSpaces()
 */
export const getSpacings = ({ theme }: CommonThemeProps): Spaces | null => {
  console.warn(
    "getSpacings() is deprecated and may be removed in a future release. Please use getSpaces()"
  );
  return theme?.app?.spacing || null;
};

export const getTypography = ({
  theme,
}: CommonThemeProps): Typography | null => {
  return theme?.app?.typography || null;
};

export const getMode = ({ theme }: CommonThemeProps): "light" | "dark" => {
  return theme?.palette?.mode || "light";
};

export const getPalette = ({ theme }: CommonThemeProps): PaletteOptions => {
  return theme?.palette as PaletteOptions;
};

export const getColors = ({ theme }: CommonThemeProps): Colors | null => {
  return theme?.app?.colors || null;
};

export const getSemanticColors = ({
  theme,
}: CommonThemeProps): SDSPalette | null => {
  return theme?.palette?.sds || null;
};

export const getShadows = ({ theme }: CommonThemeProps): Shadows | null => {
  return theme?.app?.shadows || null;
};

export const getCorners = ({ theme }: CommonThemeProps): Corners | null => {
  return theme?.app?.corners || null;
};

export const getFontWeights = ({
  theme,
}: CommonThemeProps): FontWeights | null => {
  return theme?.app?.fontWeights || null;
};

export const getIconSizes = ({ theme }: CommonThemeProps): IconSizes | null => {
  return theme?.app?.iconSizes || null;
};

export const getBorders = ({ theme }: CommonThemeProps): Borders | null => {
  return theme?.app?.borders || null;
};

export const getBreakpoints = ({
  theme,
}: CommonThemeProps): Breakpoints | null => {
  return theme?.breakpoints || null;
};

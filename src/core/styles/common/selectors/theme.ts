import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import {
  AppThemeOptions,
  Borders,
  Colors,
  Corners,
  FontWeights,
  IconSizes,
  Shadows,
  Spaces,
  Spacings,
  Typography,
} from "src/core/styles/common/defaultTheme";

export interface Props {
  theme?: AppThemeOptions;
}

export const getSpaces = ({ theme }: Props): Spaces | null => {
  return theme?.app?.spacing || null;
};

export const getSpacings = ({ theme }: Props): Spacings | null => {
  console.warn(
    "getSpacings() is deprecated and may be removed in a future release. Please use getSpaces()"
  );
  return theme?.app?.spacing || null;
};

export const getTypography = ({ theme }: Props): Typography | null => {
  return theme?.app?.typography || null;
};

export const getPalette = ({ theme }: Props): PaletteOptions => {
  return theme?.palette as PaletteOptions;
};

export const getColors = ({ theme }: Props): Colors | null => {
  return theme?.app?.colors || null;
};

export const getShadows = ({ theme }: Props): Shadows | null => {
  return theme?.app?.shadows || null;
};

export const getCorners = ({ theme }: Props): Corners | null => {
  return theme?.app?.corners || null;
};

export const getFontWeights = ({ theme }: Props): FontWeights | null => {
  return theme?.app?.fontWeights || null;
};

export const getIconSizes = ({ theme }: Props): IconSizes | null => {
  return theme?.app?.iconSizes || null;
};

export const getBorders = ({ theme }: Props): Borders | null => {
  return theme?.app?.borders || null;
};

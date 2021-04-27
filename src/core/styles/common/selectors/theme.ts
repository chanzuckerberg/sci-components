import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import {
  AppThemeOptions,
  Colors,
  Corners,
  Shadows,
  Spacings,
  Typography,
} from "src/core/styles/common/defaultTheme";

export interface Props {
  theme?: AppThemeOptions;
}

export const getSpacings = ({ theme }: Props): Spacings | null => {
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

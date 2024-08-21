import { Theme, ThemeOptions, TypographyStyle } from "@mui/material/styles";
import { CSSProperties } from "react";

export interface AccentColor {
  surfacePrimary: string;
  surfaceSecondary: string;
  textAction: string;
  textActionHover: string;
  textActionPressed: string;
  fillHover: string;
  fillPressed: string;
  fillPrimary: string;
  border: string;
  borderHover: string;
  borderPressed: string;
  borderOpen: string;
  borderFocus: string;
  borderSelected: string;
  icon: string;
  iconHover: string;
  iconPressed: string;
  iconOpen: string;
  iconFocus: string;
  iconSelected: string;
}

export interface BaseColor {
  surfaceBackground: string;
  surfacePrimary: string;
  surfaceSecondary: string;
  surfaceTertiary: string;
  surfacePrimaryInverse: string;
  textPrimary: string;
  textPrimaryInverse: string;
  textSecondary: string;
  textSecondaryInverse: string;
  textDisabled: string;
  fillHover: string;
  fillPressed: string;
  fillPrimary: string;
  fillOpen: string;
  fillSelected: string;
  fillDisabled: string;
  divider: string;
  border: string;
  borderHover: string;
  borderPressed: string;
  borderDisabled: string;
  borderTable: string;
  iconPrimary: string;
  iconPrimaryHover: string;
  iconPrimaryPressed: string;
  iconSecondary: string;
  iconPrimaryInverse: string;
  iconPrimaryInverseHover: string;
  iconPrimaryInversePressed: string;
  iconDisabled: string;
}

export interface IntentColor {
  surfacePrimary: string;
  surfaceSecondary: string;
  text: string;
  fillPrimary: string;
  fillSecondary: string;
  fillHover: string;
  fillPressed: string;
  border: string;
  ornament: string;
}

/**
 * (masoudmanson): The SDSPalette is a custom palette based on
 * the semantic design tokens for the SDS components.
 */
export interface SDSPalette {
  accent: AccentColor;
  base: BaseColor;
  beta: IntentColor;
  info: IntentColor;
  negative: IntentColor;
  notice: IntentColor;
  neutral: IntentColor;
  positive: IntentColor;
}

/**
 * (masoudmanson): Using module augmentation to extend the MUI Palette
 * https://mui.com/material-ui/customization/palette/#typescript
 */
declare module "@mui/material/styles" {
  // (masoudmanson): Extends the MUI Palette to include the SDSPalette and the SDSTextPalette
  export interface Palette {
    sds: SDSPalette;
  }

  export interface PaletteOptions {
    sds?: SDSPalette;
  }
}

export interface SDSTheme extends Theme {
  app?: AppTheme;
}

export interface SDSThemeOptions extends ThemeOptions {
  app?: AppTheme;
}

export interface AppTheme {
  borders?: Borders;
  colors: Colors;
  corners: Corners;
  fontWeights: FontWeights;
  iconSizes: IconSizes;
  shadows: Shadows;
  spacing: Spaces;
  typography: Typography;
}

export interface Shadows {
  none: "none";
  s: string;
  m: string;
  l: string;
}

export interface Typography {
  fontFamily: {
    body: CSSProperties["fontFamily"];
    caps?: CSSProperties["fontFamily"];
    code?: CSSProperties["fontFamily"];
    header?: CSSProperties["fontFamily"];
    tabular?: CSSProperties["fontFamily"];
  };
  styles: {
    body: {
      regular: {
        button: TypographyStyle;
        l: TypographyStyle;
        m: TypographyStyle;
        s: TypographyStyle;
        xs: TypographyStyle;
        xxs: TypographyStyle;
        xxxs: TypographyStyle;
      };
      semibold: {
        button: TypographyStyle;
        l: TypographyStyle;
        m: TypographyStyle;
        s: TypographyStyle;
        xs: TypographyStyle;
        xxs: TypographyStyle;
        xxxs: TypographyStyle;
      };
    };
    caps: {
      semibold: {
        xxs: TypographyStyle;
        xxxs: TypographyStyle;
        xxxxs: TypographyStyle;
      };
    };
    code: {
      regular: {
        s: TypographyStyle;
        xs: TypographyStyle;
      };
      semibold: {
        s: TypographyStyle;
        xs: TypographyStyle;
      };
    };
    header: {
      semibold: {
        xxl: TypographyStyle;
        xl: TypographyStyle;
        l: TypographyStyle;
        m: TypographyStyle;
        s: TypographyStyle;
        xs: TypographyStyle;
        xxs: TypographyStyle;
        xxxs: TypographyStyle;
      };
    };
    tabular: {
      regular: {
        s: TypographyStyle;
        xs: TypographyStyle;
      };
      semibold: {
        s: TypographyStyle;
        xs: TypographyStyle;
      };
    };
  };
}

export interface FontWeights {
  bold: number;
  light: number;
  medium: number;
  regular: number;
  semibold: number;
}

export interface Corners {
  none: number;
  s: number;
  m: number;
  l: number;
}

export interface Spaces {
  default: number;
  xxxs: number;
  xxs: number;
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
}

/**
 * @deprecated
 *
 * (masoudmanson): The Spacings type is an alias for the Spaces type and
 * is deprecated. It is recommended to use the Spaces type instead.
 */
export type Spacings = Spaces;

export interface Color {
  900?: string;
  800: string;
  700: string;
  600: string;
  500: string;
  400: string;
  300: string;
  200: string;
  100: string;
  75?: string;
  50?: string;
}

export interface Colors {
  blue: Color;
  gray: Color;
  green: Color;
  purple: Color;
  red: Color;
  yellow: Color;
}

export interface IconSize {
  height: number;
  width: number;
}

export interface IconSizes {
  xs: IconSize;
  s: IconSize;
  l: IconSize;
  xl: IconSize;
  input: IconSize;
}

export interface Border {
  default?: string;
  divider?: string;
  black?: string;
  solid?: string;
  dashed?: string;
  hover?: string;
  disabled?: string;
  table?: string;
  pressed?: string;
  open?: string;
  focused?: string;
  selected?: string;
}

export interface Borders {
  accent: Border;
  base: Border;
  beta: Border;
  info: Border;
  link: Border;
  negative: Border;
  neutral: Border;
  none: string;
  notice: Border;
  positive: Border;
}

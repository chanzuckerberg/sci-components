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
  ornament: string;
  ornamentHover: string;
  ornamentPressed: string;
  ornamentOpen: string;
  ornamentFocus: string;
  ornamentSelected: string;
}

export interface BaseColor {
  backgroundPrimary: string;
  backgroundPrimaryDark: string;
  backgroundPrimaryInverse: string;
  backgroundSecondary: string;
  backgroundSecondaryOnDark: string;
  backgroundSecondaryInverse: string;
  backgroundTertiary: string;
  surface: string;
  surfaceOnDark: string;
  surfaceInverse: string;
  textPrimary: string;
  textPrimaryOnDark: string;
  textPrimaryInverse: string;
  textSecondary: string;
  textSecondaryOnDark: string;
  textSecondaryInverse: string;
  textTertiary: string;
  textTertiaryOnDark: string;
  textTertiaryInverse: string;
  textDisabled: string;
  textDisabledOnDark: string;
  textDisabledInverse: string;
  textOnFill: string;
  fillHover: string;
  fillHoverOnDark: string;
  fillHoverInverse: string;
  fillPressed: string;
  fillPressedOnDark: string;
  fillPressedInverse: string;
  fillPrimary: string;
  fillOpen: string;
  fillOpenOnDark: string;
  fillOpenInverse: string;
  fillSelected: string;
  fillDisabled: string;
  divider: string;
  dividerOnDark: string;
  dividerInverse: string;
  borderPrimary: string;
  borderPrimaryOnDark: string;
  borderPrimaryInverse: string;
  borderSecondary: string;
  borderPrimaryHover: string;
  borderPrimaryHoverOnDark: string;
  borderPrimaryHoverInverse: string;
  borderOnFill: string;
  borderPrimaryPressed: string;
  borderPrimaryPressedOnDark: string;
  borderPrimaryPressedInverse: string;
  borderPrimaryDisabled: string;
  borderPrimaryDisabledOnDark: string;
  borderPrimaryDisabledInverse: string;
  ornamentDisabled: string;
  ornamentDisabledOnDark: string;
  ornamentDisabledInverse: string;
  ornamentOnFill: string;
  ornamentPrimary: string;
  ornamentPrimaryOnDark: string;
  ornamentPrimaryInverse: string;
  ornamentSecondary: string;
  ornamentSecondaryOnDark: string;
  ornamentSecondaryInverse: string;
  ornamentSecondaryHover: string;
  ornamentSecondaryHoverOnDark: string;
  ornamentSecondaryHoverInverse: string;
  ornamentSecondaryPressed: string;
  ornamentSecondaryPressedOnDark: string;
  ornamentSecondaryPressedInverse: string;
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

  /**
   * @see https://mui.com/material-ui/customization/breakpoints/#custom-breakpoints
   * (masoudmanson): ModuleAugmentation is required for TypeScript to recognize the
   * custom breakpoints added to the theme.
   */
  export interface BreakpointOverrides {
    // remove the xs and xl breakpoints since SDS does not support them
    xs: false;
    sm: true;
    md: true;
    lg: true;
    xl: false;
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

export interface TypographyStyles {
  body: {
    regular: {
      l: TypographyStyle;
      m: TypographyStyle;
      s: TypographyStyle;
      xs: TypographyStyle;
      xxs: TypographyStyle;
      xxxs: TypographyStyle;
      xxxxs: TypographyStyle;
    };
    medium: {
      l: TypographyStyle;
      m: TypographyStyle;
      s: TypographyStyle;
      xs: TypographyStyle;
      xxs: TypographyStyle;
      xxxs: TypographyStyle;
      xxxxs: TypographyStyle;
    };
    semibold: {
      l: TypographyStyle;
      m: TypographyStyle;
      s: TypographyStyle;
      xs: TypographyStyle;
      xxs: TypographyStyle;
      xxxs: TypographyStyle;
      xxxxs: TypographyStyle;
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
    medium: {
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
  link: {
    regular: {
      l: TypographyStyle;
      m: TypographyStyle;
      s: TypographyStyle;
      xs: TypographyStyle;
      xxs: TypographyStyle;
      xxxs: TypographyStyle;
      xxxxs: TypographyStyle;
    };
    medium: {
      l: TypographyStyle;
      m: TypographyStyle;
      s: TypographyStyle;
      xs: TypographyStyle;
      xxs: TypographyStyle;
      xxxs: TypographyStyle;
      xxxxs: TypographyStyle;
    };
    semibold: {
      l: TypographyStyle;
      m: TypographyStyle;
      s: TypographyStyle;
      xs: TypographyStyle;
      xxs: TypographyStyle;
      xxxs: TypographyStyle;
      xxxxs: TypographyStyle;
    };
  };
  tabular: {
    regular: {
      s: TypographyStyle;
      xs: TypographyStyle;
      xxs: TypographyStyle;
      xxxs: TypographyStyle;
      xxxxs: TypographyStyle;
    };
    medium: {
      s: TypographyStyle;
      xs: TypographyStyle;
      xxs: TypographyStyle;
      xxxs: TypographyStyle;
      xxxxs: TypographyStyle;
    };
    semibold: {
      s: TypographyStyle;
      xs: TypographyStyle;
      xxs: TypographyStyle;
      xxxs: TypographyStyle;
      xxxxs: TypographyStyle;
    };
  };
  title: {
    bold: {
      s: TypographyStyle;
      m: TypographyStyle;
      l: TypographyStyle;
    };
  };
}

export interface Typography {
  fontFamily: {
    body: CSSProperties["fontFamily"];
    caps?: CSSProperties["fontFamily"];
    code?: CSSProperties["fontFamily"];
    header?: CSSProperties["fontFamily"];
    link?: CSSProperties["fontFamily"];
    tabular?: CSSProperties["fontFamily"];
    title?: CSSProperties["fontFamily"];
  };
  wideStyles: TypographyStyles;
  narrowStyles: TypographyStyles;
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
  xl: number;
  rounded: number;
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
  xxxl: number;
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
  indigo: Color;
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
  dividerInverse?: string;
  black?: string;
  solid?: string;
  dashed?: string;
  hover?: string;
  inverse?: string;
  disabled?: string;
  table?: string;
  pressed?: string;
  open?: string;
  focused?: string;
  selected?: string;
  thick?: string;
  extraThick?: string;
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

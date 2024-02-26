import { Theme, ThemeOptions, TypographyStyle } from "@mui/material/styles";
import { CSSProperties } from "react";

/**
 * (masoudmanson): The SDSComponentPalette is a custom palette based on
 * the semantic design tokens for the SDS components.
 */
export interface SDSComponentPalette {
  base: {
    fill: string;
    fillHover: string;
    fillPressed: string;
    fillOpen: string;
    fillSelected: string;
    fillDisabled: string;
    onFillDisabled: string;
    surface: string;
    surfacePrimary: string;
    surfaceSecondary: string;
    surfaceTertiary: string;
    divider: string;
    border: string;
    borderHover: string;
    borderDisabled: string;
    icon: string;
    iconHover: string;
    iconPressed: string;
    iconDisabled: string;
  };
  accent: {
    fill: string;
    fillHover: string;
    fillPressed: string;
    fillOnFill: string;
    fillDisabled: string;
    surface: string;
    border: string;
    borderHover: string;
    borderOpen: string;
    borderFocus: string;
    borderSelected: string;
    borderDisabled: string;
    icon: string;
  };
  beta: {
    fill: string;
    fillHover: string;
    fillPressed: string;
    fillOnFill: string;
    surface: string;
    border: string;
    icon: string;
  };
  info: {
    fill: string;
    fillHover: string;
    fillPressed: string;
    fillOnFill: string;
    surface: string;
    border: string;
    icon: string;
  };
  negative: {
    fill: string;
    fillHover: string;
    fillPressed: string;
    fillOnFill: string;
    surface: string;
    border: string;
    icon: string;
  };
  neutral: {
    fill: string;
    fillHover: string;
    fillPressed: string;
    fillOnFill: string;
    surface: string;
    border: string;
    icon: string;
  };
  notice: {
    fill: string;
    fillHover: string;
    fillPressed: string;
    fillOnFill: string;
    surface: string;
    border: string;
    icon: string;
  };
  positive: {
    fill: string;
    fillHover: string;
    fillPressed: string;
    fillOnFill: string;
    surface: string;
    border: string;
    icon: string;
  };
}

/**
 * (masoudmanson): The SDSTextPalette is a custom palette based on the
 * semantic design tokens for the SDS text based components.
 */
export interface SDSTextPalette {
  base: {
    primary: string;
    secondary: string;
    disabled: string;
    onFill: string;
    onFillDisabled: string;
    accent: string;
  };
  action: {
    default: string;
    hover: string;
    pressed: string;
  };
  beta: string;
  info: string;
  negative: string;
  notice: string;
  positive: string;
}

/**
 * (masoudmanson): Using module augmentation to extend the MUI Palette
 * https://mui.com/material-ui/customization/palette/#typescript
 */
declare module "@mui/material/styles" {
  // (masoudmanson): Extends the MUI TypeText to include the SDSTextPalette
  // export interface TypeText extends SDSTextPalette {}

  // (masoudmanson): Extends the MUI Palette to include the SDSComponentPalette and the SDSTextPalette
  export interface Palette {
    sds: {
      component: SDSComponentPalette;
      text: SDSTextPalette;
    };
    // component: SDSComponentPalette;
    // text: TypeText;
  }

  export interface PaletteOptions {
    sds?: {
      component?: SDSComponentPalette;
      text?: SDSTextPalette;
    };
    // component?: SDSComponentPalette;
    // text?: Partial<TypeText>;
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
  spacing: spaces;
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
 * (masoudmanson): The spaces type is an alias for the Spaces type and
 * is deprecated. It is recommended to use the Spaces type instead.
 */
export type spaces = Spaces;

export interface Color {
  600: string;
  500: string;
  400: string;
  300: string;
  200: string;
  100: string;
}

export interface Colors {
  common: {
    white: string;
    black: string;
  };
  blue: Color;
  gray: Color;
  green: Color;
  purple: Color;
  red: Color;
  yellow: Color;
}

export interface AccentColor {
  border: string;
  borderDisabled: string;
  borderFocus: string;
  borderHover: string;
  borderOpen: string;
  borderSelected: string;
  fill: string;
  fillDisabled: string;
  fillHover: string;
  fillOnFill: string;
  fillPressed: string;
  icon: string;
  surface: string;
}

export interface BaseColor {
  border: string;
  borderDisabled: string;
  borderHover: string;
  divider: string;
  fill: string;
  fillDisabled: string;
  fillHover: string;
  fillOpen: string;
  fillPressed: string;
  fillSelected: string;
  icon: string;
  iconDisabled: string;
  iconHover: string;
  iconPressed: string;
  onFillDisabled: string;
  surface: string;
  surfacePrimary: string;
  surfaceSecondary: string;
  surfaceTertiary: string;
}

export interface BetaColor {
  border: string;
  fill: string;
  fillHover: string;
  fillOnFill: string;
  fillPressed: string;
  icon: string;
  surface: string;
}

export interface InfoColor {
  border: string;
  fill: string;
  fillHover: string;
  fillOnFill: string;
  fillPressed: string;
  icon: string;
  surface: string;
}

export interface NegativeColor {
  border: string;
  fill: string;
  fillHover: string;
  fillOnFill: string;
  fillPressed: string;
  icon: string;
  surface: string;
}

export interface NeutralColor {
  border: string;
  fill: string;
  fillHover: string;
  fillOnFill: string;
  fillPressed: string;
  icon: string;
  surface: string;
}

export interface NoticeColor {
  border: string;
  fill: string;
  fillHover: string;
  fillOnFill: string;
  fillPressed: string;
  icon: string;
  surface: string;
}

export interface PositiveColor {
  border: string;
  fill: string;
  fillHover: string;
  fillOnFill: string;
  fillPressed: string;
  icon: string;
  surface: string;
}

export interface SemanticComponentColors {
  accent: AccentColor;
  base: BaseColor;
  beta: BetaColor;
  info: InfoColor;
  negative: NegativeColor;
  notice: NoticeColor;
  neutral: NeutralColor;
  positive: PositiveColor;
}

export interface SemanticTextColors {
  action: {
    default?: string;
    hover?: string;
    pressed?: string;
  };
  base: {
    accent?: string;
    disabled?: string;
    onFill?: string;
    onFillDisabled?: string;
    primary?: string;
    secondary?: string;
  };
  beta: string;
  info: string;
  negative: string;
  notice: string;
  positive: string;
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
  600?: string;
  500?: string;
  400?: string;
  300?: string;
  200?: string;
  100?: string;
  black?: string;
  dashed?: string;
  solid?: string;
}

export interface Borders {
  accent: Border;
  base: Border;
  beta: Border;
  info: Border;
  link: Border;
  negative: Border;
  none: string;
  notice: Border;
  positive: Border;
}

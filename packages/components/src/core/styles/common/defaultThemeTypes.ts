import { Theme, ThemeOptions, TypographyStyle } from "@mui/material/styles";

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
  spacing: Spacings;
  typography: Typography;
}

export interface Shadows {
  none: "none";
  s: string;
  m: string;
  l: string;
}

export interface Typography {
  styles: {
    header: {
      xxl: TypographyStyle;
      xl: TypographyStyle;
      l: TypographyStyle;
      m: TypographyStyle;
      s: TypographyStyle;
      xs: TypographyStyle;
      xxs: TypographyStyle;
      xxxs: TypographyStyle;
    };
    body: {
      button: TypographyStyle;
      l: TypographyStyle;
      m: TypographyStyle;
      s: TypographyStyle;
      xs: TypographyStyle;
      xxs: TypographyStyle;
      xxxs: TypographyStyle;
    };
    body2: {
      button: TypographyStyle;
      l: TypographyStyle;
      m: TypographyStyle;
      s: TypographyStyle;
      xs: TypographyStyle;
      xxs: TypographyStyle;
      xxxs: TypographyStyle;
    };
    caps: {
      xxs: TypographyStyle;
      xxxs: TypographyStyle;
      xxxxs: TypographyStyle;
    };
    code: {
      s: TypographyStyle;
      xs: TypographyStyle;
    };
    code2: {
      s: TypographyStyle;
      xs: TypographyStyle;
    };
    tabular: {
      s: TypographyStyle;
      xs: TypographyStyle;
    };
    tabular2: {
      s: TypographyStyle;
      xs: TypographyStyle;
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
export type Spacings = Spaces;

export interface Color {
  600?: string;
  500?: string;
  400: string;
  300?: string;
  200?: string;
  100?: string;
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
  600?: string;
  500?: string;
  400?: string;
  300?: string;
  200?: string;
  100?: string;
  dashed?: string;
  solid?: string;
}

export interface Borders {
  error: Border;
  gray: Border;
  link: Border;
  primary: Border;
  success: Border;
  warning: Border;
}

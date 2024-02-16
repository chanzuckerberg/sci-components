import { css, SerializedStyles } from "@emotion/react";
import { TypographyStyle } from "@mui/material";
import { Typography } from "../defaultThemeTypes";
import { CommonThemeProps, getTypography } from "../selectors/theme";

// Font Body

type FontBodySize = keyof Typography["styles"]["body"];

export const fontBody = (fontSize: FontBodySize) => {
  return (props: CommonThemeProps): SerializedStyles | null => {
    const typography = getTypography(props);

    if (!typography) return null;

    const {
      styles: { body },
    } = typography;

    return themeToCss(body[fontSize]);
  };
};

export const fontBodyL = fontBody("l");
export const fontBodyM = fontBody("m");
export const fontBodyS = fontBody("s");
export const fontBodyXs = fontBody("xs");
export const fontBodyXxs = fontBody("xxs");
export const fontBodyXxxs = fontBody("xxxs");

// Font Caps

type FontCapsSize = keyof Typography["styles"]["caps"];

export const fontCaps = (fontSize: FontCapsSize) => {
  return (props: CommonThemeProps): SerializedStyles | null => {
    const typography = getTypography(props);

    if (!typography) return null;

    const {
      styles: { caps },
    } = typography;

    return css`
      ${themeToCss(caps[fontSize])}
      text-transform: uppercase;
    `;
  };
};

export const fontCapsXxs = fontCaps("xxs");
export const fontCapsXxxs = fontCaps("xxxs");
export const fontCapsXxxxs = fontCaps("xxxxs");

// Font Header

type FontHeaderSize = keyof Typography["styles"]["header"];

export const fontHeader = (fontSize: FontHeaderSize) => {
  return (props: CommonThemeProps): SerializedStyles | null => {
    const typography = getTypography(props);

    if (!typography) return null;

    const {
      styles: { header },
    } = typography;

    return themeToCss(header[fontSize]);
  };
};

export const fontHeaderXxl = fontHeader("xxl");
export const fontHeaderXl = fontHeader("xl");
export const fontHeaderL = fontHeader("l");
export const fontHeaderM = fontHeader("m");
export const fontHeaderS = fontHeader("s");
export const fontHeaderXs = fontHeader("xs");
export const fontHeaderXxs = fontHeader("xxs");
export const fontHeaderXxxs = fontHeader("xxxs");

// Font Code

type FontCodeSize = keyof Typography["styles"]["code"];

export const fontCode = (fontSize: FontCodeSize) => {
  return (props: CommonThemeProps): SerializedStyles | null => {
    const typography = getTypography(props);

    if (!typography) return null;

    const {
      styles: { code },
    } = typography;

    return css`
      ${themeToCss(code[fontSize])}
    `;
  };
};

export const fontCodeXs = fontCode("xs");
export const fontCodeS = fontCode("s");

// Font Tabular

type FontTabularSize = keyof Typography["styles"]["tabular"];

export const fontTabular = (fontSize: FontTabularSize) => {
  return (props: CommonThemeProps): SerializedStyles | null => {
    const typography = getTypography(props);

    if (!typography) return null;

    const {
      styles: { tabular },
    } = typography;

    return css`
      ${themeToCss(tabular[fontSize])}
      font-variant-numeric: "tabular-nums",
    `;
  };
};

export const fontTabularXs = fontTabular("xs");
export const fontTabularS = fontTabular("s");

function themeToCss(fontTheme: TypographyStyle) {
  return css`
    font-size: ${fontTheme.fontSize}px;
    line-height: ${fontTheme.lineHeight};
    letter-spacing: ${fontTheme.letterSpacing};
    font-weight: ${fontTheme.fontWeight};
    text-transform: ${fontTheme.textTransform};
  `;
}

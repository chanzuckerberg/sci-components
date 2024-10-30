import { css, SerializedStyles } from "@emotion/react";
import { TypographyStyle } from "@mui/material";
import { Typography } from "../types";
import { CommonThemeProps, getTypography } from "../selectors/theme";

type FontBodyWeight = keyof Typography["styles"]["body"];
type FontBodySize<T extends FontBodyWeight> =
  keyof Typography["styles"]["body"][T];

export const fontBody = (
  fontSize: FontBodySize<FontBodyWeight>,
  fontWeight: FontBodyWeight = "regular",
  isMobile: boolean = false
) => {
  return (props: CommonThemeProps): SerializedStyles | null => {
    const typography = getTypography(props);

    if (!typography) return null;

    const {
      styles: { body },
      mobileStyles: { body: mobileBody },
      fontFamily: { body: bodyFontFamily },
    } = typography;

    if (isMobile) {
      return css`
        ${props.theme?.breakpoints.down("md")} {
          ${themeToCss(mobileBody[fontWeight][fontSize], bodyFontFamily)}
        }
      `;
    }

    return themeToCss(body[fontWeight][fontSize], bodyFontFamily);
  };
};

export const fontBodyL = fontBody("l", "regular");
export const fontBodyM = fontBody("m", "regular");
export const fontBodyS = fontBody("s", "regular");
export const fontBodyXs = fontBody("xs", "regular");
export const fontBodyXxs = fontBody("xxs", "regular");
export const fontBodyXxxs = fontBody("xxxs", "regular");
export const fontBodySemiboldL = fontBody("l", "semibold");
export const fontBodySemiboldM = fontBody("m", "semibold");
export const fontBodySemiboldS = fontBody("s", "semibold");
export const fontBodySemiboldXs = fontBody("xs", "semibold");
export const fontBodySemiboldXxs = fontBody("xxs", "semibold");
export const fontBodySemiboldXxxs = fontBody("xxxs", "semibold");

// Font Caps

type FontCapsSize = keyof Typography["styles"]["caps"]["semibold"];

export const fontCaps = (fontSize: FontCapsSize, isMobile: boolean = false) => {
  return (props: CommonThemeProps): SerializedStyles | null => {
    const typography = getTypography(props);

    if (!typography) return null;

    const {
      styles: { caps },
      mobileStyles: { caps: mobileCaps },
      fontFamily: { caps: capsFontFamily },
    } = typography;

    return css`
      text-transform: uppercase;

      ${isMobile
        ? css`
            ${props.theme?.breakpoints.down("md")} {
              ${themeToCss(mobileCaps.semibold[fontSize], capsFontFamily)}
            }
          `
        : themeToCss(caps.semibold[fontSize], capsFontFamily)}
    `;
  };
};

export const fontCapsXxs = fontCaps("xxs");
export const fontCapsXxxs = fontCaps("xxxs");
export const fontCapsXxxxs = fontCaps("xxxxs");

// Font Header

type FontHeaderSize = keyof Typography["styles"]["header"]["semibold"];

export const fontHeader = (
  fontSize: FontHeaderSize,
  isMobile: boolean = false
) => {
  return (props: CommonThemeProps): SerializedStyles | null => {
    const typography = getTypography(props);

    if (!typography) return null;

    const {
      styles: { header },
      mobileStyles: { header: mobileHeader },
      fontFamily: { header: headerFontFamily },
    } = typography;

    if (isMobile) {
      return css`
        ${props.theme?.breakpoints.down("md")} {
          ${themeToCss(mobileHeader.semibold[fontSize], headerFontFamily)}
        }
      `;
    }

    return themeToCss(header.semibold[fontSize], headerFontFamily);
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

type FontCodeWeight = keyof Typography["styles"]["code"];
type FontCodeSize<T extends FontCodeWeight> =
  keyof Typography["styles"]["code"][T];

export const fontCode = (
  fontSize: FontCodeSize<FontCodeWeight>,
  fontWeight: FontCodeWeight = "regular",
  isMobile: boolean = false
) => {
  return (props: CommonThemeProps): SerializedStyles | null => {
    const typography = getTypography(props);

    if (!typography) return null;

    const {
      styles: { code },
      mobileStyles: { code: mobileCode },
      fontFamily: { code: codeFontFamily },
    } = typography;

    if (isMobile) {
      return css`
        ${props.theme?.breakpoints.down("md")} {
          ${themeToCss(mobileCode[fontWeight][fontSize], codeFontFamily)}
        }
      `;
    }

    return themeToCss(code[fontWeight][fontSize], codeFontFamily);
  };
};

export const fontCodeXs = fontCode("xs", "regular");
export const fontCodeS = fontCode("s", "regular");
export const fontCodeSemiboldXs = fontCode("xs", "semibold");
export const fontCodeSemiboldS = fontCode("s", "semibold");

// Font Tabular

type FontTabularWeight = keyof Typography["styles"]["tabular"];
type FontTabularSize<T extends FontTabularWeight> =
  keyof Typography["styles"]["tabular"][T];

export const fontTabular = (
  fontSize: FontTabularSize<FontTabularWeight>,
  fontWeight: FontTabularWeight = "regular",
  isMobile: boolean = false
) => {
  return (props: CommonThemeProps): SerializedStyles | null => {
    const typography = getTypography(props);

    if (!typography) return null;

    const {
      styles: { tabular },
      mobileStyles: { tabular: mobileTabular },
      fontFamily: { tabular: tabularFontFamily },
    } = typography;

    return css`
      font-variant-numeric: tabular-nums;

      ${isMobile
        ? css`
            ${props.theme?.breakpoints.down("md")} {
              ${themeToCss(
                mobileTabular[fontWeight][fontSize],
                tabularFontFamily
              )}
            }
          `
        : themeToCss(tabular[fontWeight][fontSize], tabularFontFamily)}
    `;
  };
};

export const fontTabularXs = fontTabular("xs", "regular");
export const fontTabularS = fontTabular("s", "regular");
export const fontTabularSemiboldXs = fontTabular("xs", "semibold");
export const fontTabularSemiboldS = fontTabular("s", "semibold");

function themeToCss(
  fontTheme: TypographyStyle,
  fontFamily: React.CSSProperties["fontFamily"] = "inherit"
) {
  return css`
    font-family: ${fontFamily};
    font-size: ${fontTheme.fontSize}px;
    line-height: ${fontTheme.lineHeight};
    letter-spacing: ${fontTheme.letterSpacing};
    font-weight: ${fontTheme.fontWeight};
    text-transform: ${fontTheme.textTransform};
  `;
}

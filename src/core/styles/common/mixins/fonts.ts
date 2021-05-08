import { css, SerializedStyles } from "@emotion/react";
import { TypographyStyle } from "@material-ui/core";
import { Typography } from "../defaultTheme";
import { getTypography, Props } from "../selectors/theme";

type FontBodySize = keyof Typography["styles"]["body"];

export const fontBody = (fontSize: FontBodySize) => {
  return (props: Props): SerializedStyles | null => {
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

type FontCapsSize = keyof Typography["styles"]["caps"];

export const fontCaps = (fontSize: FontCapsSize) => {
  return (props: Props): SerializedStyles | null => {
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

type FontHeaderSize = keyof Typography["styles"]["header"];

export const fontHeader = (fontSize: FontHeaderSize) => {
  return (props: Props): SerializedStyles | null => {
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

function themeToCss(fontTheme: TypographyStyle) {
  return css`
    font-size: ${fontTheme.fontSize}px;
    line-height: ${fontTheme.lineHeight};
    letter-spacing: ${fontTheme.letterSpacing};
    font-weight: ${fontTheme.fontWeight};
  `;
}

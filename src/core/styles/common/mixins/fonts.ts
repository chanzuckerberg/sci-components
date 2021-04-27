import { css, SerializedStyles } from "@emotion/react";
import { TypographyStyle } from "@material-ui/core";
import { getTypography, Props } from "../selectors/theme";

export const fontBodyXs = (props: Props): SerializedStyles | null => {
  const typography = getTypography(props);

  if (!typography) return null;

  const {
    styles: {
      body: { xs },
    },
  } = typography;

  return themeToCss(xs);
};

export const fontBodyM = (props: Props): SerializedStyles | null => {
  const typography = getTypography(props);

  if (!typography) return null;

  const {
    styles: {
      body: { m },
    },
  } = typography;

  return themeToCss(m);
};

export const fontBodyS = (props: Props): SerializedStyles | null => {
  const typography = getTypography(props);

  if (!typography) return null;

  const {
    styles: {
      body: { s },
    },
  } = typography;

  return themeToCss(s);
};

export const fontHeaderXxl = (props: Props): SerializedStyles | null => {
  const typography = getTypography(props);

  if (!typography) return null;

  const {
    styles: {
      header: { xxl },
    },
  } = typography;

  return themeToCss(xxl);
};

function themeToCss(fontTheme: TypographyStyle) {
  return css`
    font-size: ${fontTheme.fontSize}px;
    line-height: ${fontTheme.lineHeight};
    letter-spacing: ${fontTheme.letterSpacing};
    font-weight: ${fontTheme.fontWeight};
  `;
}

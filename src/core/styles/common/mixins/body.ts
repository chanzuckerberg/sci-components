import { css, SerializedStyles } from "@emotion/react";
import { getTypography, Props } from "../selectors/theme";

export const fontXs = (props: Props): SerializedStyles | null => {
  const typography = getTypography(props);

  if (!typography) return null;

  const {
    styles: {
      body: { xs },
    },
  } = typography;

  return css`
    font-size: ${xs.fontSize}px;
    line-height: ${xs.lineHeight};
    letter-spacing: ${xs.letterSpacing};
    font-weight: ${xs.fontWeight};
  `;
};

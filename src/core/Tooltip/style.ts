import { css } from "@emotion/css";
import {
  AppThemeOptions,
  fontBodyXs,
  getColors,
  getShadows,
  getSpacings,
} from "../styles";

export const tooltipCss = (
  { inverted = false },
  theme: AppThemeOptions
): string => {
  const props = { theme };
  const colors = getColors(props);
  const shadows = getShadows(props);
  const spacings = getSpacings(props);

  return css`
    ${fontBodyXs(props)}

    background-color: ${inverted ? "black" : "white"};
    border: 1px solid ${colors?.gray["300"]};
    box-shadow: ${shadows?.m};
    color: ${inverted ? "white" : "black"};
    padding: ${spacings?.l}px;
  `;
};

export const arrowCss = (
  { inverted = false },
  theme: AppThemeOptions
): string => {
  const props = { theme };
  const colors = getColors(props);

  return css`
    color: ${inverted ? "black" : "white"};
    &:before {
      border: 1px solid ${colors?.gray[300]};
    }
  `;
};

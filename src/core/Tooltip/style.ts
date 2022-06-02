import { css } from "@emotion/css";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyXs,
  fontHeaderXs,
  fontHeaderXxs,
  getBorders,
  getColors,
  getShadows,
  getSpaces,
} from "../styles";

export interface TooltipExtraProps extends CommonThemeProps {
  // TODO(185930): remove custom `followCursor` prop when we upgrade to MUIv5
  arrowOffset?: number;
  followCursor?: boolean;
  inverted?: boolean;
  sdsStyle?: "dark" | "light";
  subtitle?: string;
  width?: "default" | "wide";
}

const dark = (props: TooltipExtraProps): string => {
  const spacings = getSpaces(props);

  return css`
    ${fontHeaderXs(props)}
    background-color: black;
    color: white;
    text-align: center;
    max-width: 250px;
    padding: ${spacings?.s}px ${spacings?.l}px;
  `;
};

const light = (props: TooltipExtraProps): string => {
  const spacings = getSpaces(props);

  return css`
    ${fontBodyXs(props)}
    background-color: white;
    color: black;
    text-align: left;
    max-width: 250px;
    padding: ${spacings?.xs}px ${spacings?.l}px;
  `;
};

const wide = (): string => {
  return css`
    max-width: 550px;
  `;
};

const tableStyles = (props: TooltipExtraProps): string => {
  const spacings = getSpaces(props);

  return css`
    padding: ${spacings?.m}px;
  `;
};

export const Subtitle = styled("div")`
  ${fontHeaderXxs}

  ${(props: TooltipExtraProps) => {
    const colors = getColors(props);

    return `
      color: ${colors?.gray["400"]};
    `;
  }}
`;

export const tooltipCss = (props: TooltipExtraProps): string => {
  const { inverted, sdsStyle, width, followCursor } = props;

  const borders = getBorders(props);
  const shadows = getShadows(props);

  return css`
    &.MuiTooltip-tooltip {
      ${sdsStyle === "dark" || inverted ? dark(props) : light(props)}
      ${width === "wide" && sdsStyle === "light" && wide()}

      ${followCursor === true && tableStyles(props)}

      border: ${borders?.gray["300"]};
      box-shadow: ${shadows?.m};
    }
  `;
};

export const arrowCss = (props: TooltipExtraProps): string => {
  const { inverted, sdsStyle, arrowOffset } = props;

  const borders = getBorders(props);

  return css`
    &.MuiTooltip-arrow {
      /* (bethbertozzi): !important is needed to fight inline style */
      left: ${arrowOffset}px !important;
      color: ${inverted || sdsStyle === "dark" ? "black" : "white"};
      &:before {
        border: ${inverted || sdsStyle === "dark"
          ? null
          : borders?.gray["300"]};
        box-sizing: border-box;
      }
    }
  `;
};

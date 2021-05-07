import { css } from "@emotion/css";
import {
  fontBodyXs,
  getColors,
  getShadows,
  getSpacings,
  Props,
} from "../styles";

export interface ExtraProps extends Props {
  inverted?: boolean;
}

export const tooltipCss = (props: ExtraProps): string => {
  const { inverted } = props;

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

export const arrowCss = (props: ExtraProps): string => {
  const { inverted } = props;

  const colors = getColors(props);

  return css`
    color: ${inverted ? "black" : "white"};

    &:before {
      border: 1px solid ${colors?.gray[300]};
    }
  `;
};

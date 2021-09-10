import { css } from "@emotion/css";
import {
  fontBodyXs,
  getBorders,
  getShadows,
  getSpacings,
  Props,
} from "../styles";

export interface ExtraProps extends Props {
  inverted?: boolean;
}

export const tooltipCss = (props: ExtraProps): string => {
  const { inverted } = props;

  const shadows = getShadows(props);
  const spacings = getSpacings(props);
  const borders = getBorders(props);

  return css`
    ${fontBodyXs(props)}

    background-color: ${inverted ? "black" : "white"};
    border: ${borders?.gray["300"]};
    box-shadow: ${shadows?.m};
    color: ${inverted ? "white" : "black"};
    padding: ${spacings?.l}px;
  `;
};

export const arrowCss = (props: ExtraProps): string => {
  const { inverted } = props;

  const borders = getBorders(props);

  return css`
    color: ${inverted ? "black" : "white"};

    &:before {
      border: ${borders?.gray[300]};
    }
  `;
};

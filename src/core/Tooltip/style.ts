import { css } from "@emotion/css";
import styled from "@emotion/styled";
import {
  fontBodyXs,
  fontHeaderXs,
  fontHeaderXxs,
  getBorders,
  getColors,
  getShadows,
  getSpaces,
  Props,
} from "../styles";

export interface ExtraProps extends Props {
  inverted?: boolean;
  sdsStyle?: "dark" | "light";
  subtitle?: string;
  width?: "wide";
}

const dark = (props: ExtraProps): string => {
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

const light = (props: ExtraProps): string => {
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

export const Subtitle = styled.div`
  ${fontHeaderXxs}

  ${(props: ExtraProps) => {
    const colors = getColors(props);

    return `
      color: ${colors?.gray["400"]};
    `;
  }}
`;

export const tooltipCss = (props: ExtraProps): string => {
  const { inverted, sdsStyle, width } = props;

  const borders = getBorders(props);
  const shadows = getShadows(props);

  return css`
    ${sdsStyle === "dark" || inverted ? dark(props) : light(props)}
    ${width === "wide" && wide()}

    border: ${borders?.gray["300"]};
    box-shadow: ${shadows?.m};
  `;
};

export const arrowCss = (props: ExtraProps): string => {
  const { inverted, sdsStyle } = props;

  const borders = getBorders(props);

  return css`
    color: ${inverted || sdsStyle === "dark" ? "black" : "white"};

    &:before {
      border: ${inverted || sdsStyle === "dark" ? null : borders?.gray["300"]};
    }
  `;
};

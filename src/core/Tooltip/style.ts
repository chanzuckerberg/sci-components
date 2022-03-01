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
  // TODO(185930): remove custom `followCursor` prop when we upgrade to MUIv5
  followCursor?: boolean;
  inverted?: boolean;
  sdsStyle?: "dark" | "light";
  subtitle?: string;
  width?: "default" | "wide";
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

const tableStyles = (props: ExtraProps): string => {
  const spacings = getSpaces(props);

  return css`
    padding: ${spacings?.m}px;
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
  const { inverted, sdsStyle, width, followCursor } = props;

  const borders = getBorders(props);
  const shadows = getShadows(props);

  return css`
    ${sdsStyle === "dark" || inverted ? dark(props) : light(props)}
    ${width === "wide" && sdsStyle === "light" && wide()}
    
    ${followCursor === true && tableStyles(props)}

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
      box-sizing: border-box;
    }
  `;
};

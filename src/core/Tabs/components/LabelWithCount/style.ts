import styled from "@emotion/styled";
import {
  CommonThemeProps as StyleProps,
  fontBodyS,
  fontBodyXs,
  fontBodyXxs,
  getColors,
  getFontWeights,
  getSpaces,
} from "src/core/styles";
import { SdsSize } from "../common";

export const Wrapper = styled.span`
  ${(props) => {
    const colors = getColors(props);

    return `
      &:active {
        color: black;
      }

      &:disabled {
        color: ${colors?.gray[200]};
      }
    `;
  }}
`;

interface Props extends StyleProps {
  sdsSize: SdsSize;
}

export const Label = styled.span`
  ${(props: Props) => {
    const { sdsSize } = props;

    const isLarge = sdsSize === "large";

    return isLarge ? fontBodyS(props) : fontBodyXs(props);
  }}

  ${(props: Props) => {
    const fontWeights = getFontWeights(props);
    const spaces = getSpaces(props);

    const { sdsSize } = props;

    const isLarge = sdsSize === "large";

    return `
      margin-right: ${isLarge ? spaces?.l : spaces?.m}px;
      font-weight: ${fontWeights?.semibold};
  `;
  }}
`;

export const Count = styled.span`
  ${(props: Props) => {
    const { sdsSize } = props;

    const isLarge = sdsSize === "large";

    return isLarge ? fontBodyXs(props) : fontBodyXxs(props);
  }}

  ${(props: Props) => {
    const colors = getColors(props);

    return `
      color: ${colors?.gray[500]};
    `;
  }}
`;

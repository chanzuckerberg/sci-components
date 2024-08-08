"use client";

import { styled } from "@mui/material/styles";
import {
  CommonThemeProps as StyleProps,
  fontBodySemiboldS,
  fontBodySemiboldXs,
  fontBodyXs,
  fontBodyXxs,
  getSemanticTextColors,
  getSpaces,
} from "src/core/styles";
import { SdsSize } from "../common";

export const Wrapper = styled("span")`
  ${(props) => {
    const semanticTextColors = getSemanticTextColors(props);

    return `
      &:active {
        color: ${semanticTextColors?.base?.primary};
      }

      &:disabled {
        color: ${semanticTextColors?.base?.disabled};
      }
    `;
  }}
`;

interface Props extends StyleProps {
  sdsSize: SdsSize;
}

const LABEL_DO_NOT_FORWARD_PROPS = ["sdsSize"];

export const Label = styled("span", {
  shouldForwardProp: (prop) =>
    !LABEL_DO_NOT_FORWARD_PROPS.includes(String(prop)),
})<Props>`
  ${(props: Props) => {
    const { sdsSize } = props;

    const isLarge = sdsSize === "large";

    return isLarge ? fontBodySemiboldS(props) : fontBodySemiboldXs(props);
  }}

  ${(props: Props) => {
    const spaces = getSpaces(props);

    const { sdsSize } = props;

    const isLarge = sdsSize === "large";

    return `
      margin-right: ${isLarge ? spaces?.l : spaces?.m}px;
  `;
  }}
`;

const COUNT_DO_NOT_FORWARD_PROPS = ["sdsSize"];

export const Count = styled("span", {
  shouldForwardProp: (prop) =>
    !COUNT_DO_NOT_FORWARD_PROPS.includes(String(prop)),
})`
  ${(props: Props) => {
    const { sdsSize } = props;

    const isLarge = sdsSize === "large";

    return isLarge ? fontBodyXs(props) : fontBodyXxs(props);
  }}

  ${(props: Props) => {
    const semanticTextColors = getSemanticTextColors(props);
    const spaces = getSpaces(props);

    return `
      color: ${semanticTextColors?.base?.secondary};

      .MuiChip-root {
        margin: 0 0 ${spaces?.xxxs}px 0;
      }
    `;
  }}
`;

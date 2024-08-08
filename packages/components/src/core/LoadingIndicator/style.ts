"use client";

import { css, SerializedStyles } from "@emotion/react";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyS,
  fontCapsXxxxs,
  getCorners,
  getIconSizes,
  getSemanticComponentColors,
  getSemanticTextColors,
  getSpaces,
} from "src/core/styles";

export interface LoadingIndicatorProps extends CommonThemeProps {
  sdsStyle: "minimal" | "tag";
}

export const StyledText = styled("span")`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      margin: 0 ${spaces?.xs}px;
    `;
  }}
`;

const minimal = (props: CommonThemeProps): SerializedStyles => {
  const iconSizes = getIconSizes(props);
  const semanticComponentColors = getSemanticComponentColors(props);
  const semanticTextColors = getSemanticTextColors(props);

  return css`
    ${fontBodyS(props)}

    color: ${semanticTextColors?.base?.secondary};

    svg {
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;

      path {
        fill: ${semanticComponentColors?.base?.icon};
      }
    }
  `;
};

const tag = (props: CommonThemeProps): SerializedStyles => {
  const corners = getCorners(props);
  const semanticComponentColors = getSemanticComponentColors(props);
  const semanticTextColors = getSemanticTextColors(props);

  return css`
    ${fontCapsXxxxs(props)}

    background-color: ${semanticComponentColors?.accent?.surface};
    border-radius: ${corners?.l}px;
    color: ${semanticTextColors?.base?.accent};

    svg {
      path {
        fill: ${semanticComponentColors?.accent?.icon};
      }
    }
  `;
};

const doNotForwardProps = ["sdsStyle"];

export const StyledLoadingIndicator = styled("div", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: LoadingIndicatorProps) => {
    const { sdsStyle } = props;
    const spaces = getSpaces(props);

    const style = css`
      display: inline-flex;
      align-items: center;
      padding: ${spaces?.xxs}px;
    `;

    return css`
      ${style}
      ${sdsStyle === "minimal" && minimal(props)}
      ${sdsStyle === "tag" && tag(props)}
    `;
  }}
`;

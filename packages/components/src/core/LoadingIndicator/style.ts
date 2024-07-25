import { css, SerializedStyles } from "@emotion/react";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyS,
  fontCapsXxxxs,
  getCorners,
  getIconSizes,
  getSemanticColors,
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
  const semanticColors = getSemanticColors(props);

  return css`
    ${fontBodyS(props)}

    color: ${semanticColors?.base?.textSecondary};

    svg {
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;

      path {
        fill: ${semanticColors?.base?.iconPrimary};
      }
    }
  `;
};

const tag = (props: CommonThemeProps): SerializedStyles => {
  const corners = getCorners(props);
  const semanticColors = getSemanticColors(props);

  return css`
    ${fontCapsXxxxs(props)}

    background-color: ${semanticColors?.accent?.surfacePrimary};
    border-radius: ${corners?.l}px;
    color: ${semanticColors?.accent?.textAction};

    svg {
      path {
        fill: ${semanticColors?.accent?.icon};
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

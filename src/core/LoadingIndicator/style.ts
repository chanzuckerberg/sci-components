import { css, SerializedStyles } from "@emotion/react";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBody,
  fontCapsXxxxs,
  getColors,
  getCorners,
  getIconSizes,
  getSpaces,
  getTypography,
} from "../styles";

export interface LoadingIndicatorProps extends CommonThemeProps {
  sdsStyle: "minimal" | "tag";
}

const fontBodyS = fontBody("s");

export const StyledText = styled("span")`
  ${(props) => {
    const spacings = getSpaces(props);
    const typography = getTypography(props);

    return `
      margin: 0 ${spacings?.xs}px;
      font-family: ${typography?.fontFamily};
    `;
  }}
`;

const minimal = (props: CommonThemeProps): SerializedStyles => {
  const colors = getColors(props);
  const iconSizes = getIconSizes(props);

  return css`
    ${fontBodyS(props)}

    color: ${colors?.gray[500]};

    svg {
      height: ${iconSizes?.s.height}px;
      width: ${iconSizes?.s.width}px;

      path {
        fill: ${colors?.gray[500]};
      }
    }
  `;
};

const tag = (props: CommonThemeProps): SerializedStyles => {
  const colors = getColors(props);
  const corners = getCorners(props);

  return css`
    ${fontCapsXxxxs(props)}

    background-color: ${colors?.info[200]};
    border-radius: ${corners?.l}px;
    color: ${colors?.info[600]};

    svg {
      path {
        fill: ${colors?.info[400]};
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
    const spacings = getSpaces(props);

    const style = css`
      display: inline-flex;
      align-items: center;
      padding: ${spacings?.xxs}px;
    `;

    return css`
      ${style}
      ${sdsStyle === "minimal" && minimal(props)}
      ${sdsStyle === "tag" && tag(props)}
    `;
  }}
`;

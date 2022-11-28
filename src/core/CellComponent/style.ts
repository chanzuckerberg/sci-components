import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyS,
  fontBodyXxs,
  fontHeaderS,
  getColors,
  getSpaces,
  getTypography,
} from "../styles";

export interface CellComponentExtraProps extends CommonThemeProps {
  horizontalAlign?: "left" | "center" | "right";
  verticalAlign?: "top" | "center" | "bottom";
}

const doNotForwardProps = ["horizontalAlign", "verticalAlign"];

export const StyledCellComponentData = styled("td", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontBodyS}

  ${(props: CellComponentExtraProps) => {
    const spacings = getSpaces(props);
    const { horizontalAlign = "left", verticalAlign = "top" } = props;
    const typography = getTypography(props);

    return `
        font-family: ${typography?.fontFamily};
        align-items: center;
        text-align: ${horizontalAlign};
        vertical-align: ${verticalAlign};
        overflow: hidden;
        padding: ${spacings?.l}px ${spacings?.s}px;
    `;
  }}
`;
export const StyledStoryHeading = styled("span", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontHeaderS}
  ${(props) => {
    const typography = getTypography(props);

    return `
        line-height: 24px;
        font-family: ${typography?.fontFamily};
        display: block;
       
    `;
  }}
`;

export const StyledStoryBody = styled("span", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontBodyXxs}
  ${(props) => {
    const typography = getTypography(props);
    const colors = getColors(props);

    return `
          font-family: ${typography?.fontFamily};
          display: block;
          color: ${colors?.gray[600]}
      `;
  }}
`;

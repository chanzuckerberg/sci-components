import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyXxs,
  fontHeaderS,
  getColors,
  getSpaces,
  getTypography,
} from "../styles";

const contentPositionMapping = {
  center: "center",
  left: "flex-start",
  right: "flex-end",
};
export interface CellComponentExtraProps extends CommonThemeProps {
  contentPosition?: "left" | "center" | "right";
}

export const StyledCellComponentData = styled("td")`
  ${(props: CellComponentExtraProps) => {
    const spacings = getSpaces(props);
    return `
        align-items: center;
        border: dashed 1px #ddd;
        display: flex;
        justify-content: ${
          props.contentPosition
            ? contentPositionMapping[props.contentPosition]
            : "center"
        };
        max-width: 100%;
        min-width: 96px;
        overflow: hidden;
        padding: ${spacings?.l}px ${spacings?.s}px;
    `;
  }}
`;
export const StyledStoryHeading = styled("span", {})`
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

export const StyledStoryBody = styled("span", {})`
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

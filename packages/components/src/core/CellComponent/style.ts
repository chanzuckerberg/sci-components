import { styled } from "@mui/material/styles";
import { CommonThemeProps, fontBodyS, getSpaces } from "src/core/styles";

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
    const spaces = getSpaces(props);
    const { horizontalAlign = "left", verticalAlign = "top" } = props;

    return `
      align-items: center;
      text-align: ${horizontalAlign};
      vertical-align: ${verticalAlign};
      overflow: hidden;
      padding: ${spaces?.l}px ${spaces?.m}px;
    `;
  }}
`;

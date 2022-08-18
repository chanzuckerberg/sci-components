import { styled } from "@mui/material/styles";
import { CommonThemeProps, getSpaces } from "../styles";

export interface ComponentCellExtraProps extends CommonThemeProps {
  contentPosition?: "left" | "center" | "right";
}

export const StyledTableData = styled("td", {
  //shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: ComponentCellExtraProps) => {
    const spacings = getSpaces(props);
    return `
        padding: ${spacings?.l}px ${spacings?.s}px;
        justify-content: ${props.contentPosition};
        vertical-align: middle;
        min-width: 96px;
        width: 180px;
        overflow: hidden;
        max-width: 100%;
        display: "block";
        border: dashed 1px #ddd;
    `;
  }}
`;

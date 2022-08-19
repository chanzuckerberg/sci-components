import { styled } from "@mui/material/styles";
import { CommonThemeProps, getSpaces } from "../styles";

const contentPositionMapping = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};
export interface ComponentCellExtraProps extends CommonThemeProps {
  contentPosition?: "left" | "center" | "right";
}

export const StyledTableData = styled("td")`
  ${(props: ComponentCellExtraProps) => {
    const spacings = getSpaces(props);
    return `
        padding: ${spacings?.l}px ${spacings?.s}px;
        justify-content: ${
          props.contentPosition
            ? contentPositionMapping[props.contentPosition]
            : "center"
        };
        align-items: center;
        min-width: 96px;
        overflow: hidden;
        max-width: 100%;
        display: flex;
        border: dashed 1px #ddd;
    `;
  }}
`;

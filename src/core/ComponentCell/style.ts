import { styled } from "@mui/material/styles";
import { CommonThemeProps, getSpaces } from "../styles";

const contentPositionMapping = {
  center: "center",
  left: "flex-start",
  right: "flex-end",
};
export interface ComponentCellExtraProps extends CommonThemeProps {
  contentPosition?: "left" | "center" | "right";
}

export const StyledTableData = styled("td")`
  ${(props: ComponentCellExtraProps) => {
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

import styled from "@emotion/styled";
import { CommonThemeProps, fontBodyS, getSpaces } from "src/core/styles";

export interface CellComponentExtraProps extends CommonThemeProps {
  horizontalAlign?: "left" | "center" | "right";
  verticalAlign?: "top" | "center" | "bottom";
}

export const StyledCellComponentData = styled.div`
  ${fontBodyS}

  ${(props: CellComponentExtraProps) => {
    const spaces = getSpaces(props);
    const { horizontalAlign = "left", verticalAlign = "top" } = props;

    return `
      outline: none;
      align-items: center;
      text-align: ${horizontalAlign};
      vertical-align: ${verticalAlign};
      overflow: hidden;
      padding: ${spaces?.m}px !important;
    `;
  }}
`;

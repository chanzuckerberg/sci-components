import styled from "@emotion/styled";
import {
  CommonThemeProps,
  focusVisibleA11yStyle,
  fontBodyS,
  getSpaces,
} from "src/core/styles";

export interface CellComponentExtraProps extends CommonThemeProps {
  horizontalAlign?: "left" | "center" | "right";
  verticalAlign?: "top" | "center" | "bottom";
}

export const StyledCellComponentData = styled.div`
  ${fontBodyS}
  ${focusVisibleA11yStyle}

  ${(props: CellComponentExtraProps) => {
    const spaces = getSpaces(props);
    const { horizontalAlign = "left", verticalAlign = "top" } = props;

    return `
      align-items: center;
      text-align: ${horizontalAlign};
      vertical-align: ${verticalAlign};
      overflow: hidden;
      padding: ${spaces?.m}px;
    `;
  }}
`;

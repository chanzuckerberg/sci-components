import styled from "@emotion/styled";
import { CommonThemeProps, getSemanticColors } from "src/core/styles";

export const StyledTableHeader = styled("thead")`
  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      border-bottom: solid 2px ${semanticColors?.base?.borderTable};
    `;
  }}
`;

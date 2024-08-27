import { styled } from "@mui/material/styles";
import { getSemanticColors } from "src/core/styles";

export const StyledTableHeader = styled("thead")`
  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      border-bottom: solid 2px ${semanticColors?.base?.borderTable};
    `;
  }}
`;

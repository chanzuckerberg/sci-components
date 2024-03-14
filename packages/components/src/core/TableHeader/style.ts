import { styled } from "@mui/material/styles";
import { getColors } from "src/core/styles";

export const StyledTableHeader = styled("thead")`
  ${(props) => {
    const colors = getColors(props);

    return `
      border-bottom: solid 2px ${colors?.gray[300]};
    `;
  }}
`;

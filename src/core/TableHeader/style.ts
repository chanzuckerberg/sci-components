import { styled } from "@mui/material/styles";
import { getColors } from "../styles";

export const StyledTableHeader = styled("thead")`
  ${(props) => {
    const colors = getColors(props);

    return `
      display: flex;
      align-items: center;
      border-bottom: solid 2px ${colors?.gray[300]};
    `;
  }}
`;

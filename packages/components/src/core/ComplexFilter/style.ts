import { styled } from "@mui/material/styles";
import { getSpaces } from "../styles";

export const Wrapper = styled("div")`
  min-width: 150px;
`;

export const StyledChipsWrapper = styled("div")`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      margin-top: ${spaces?.s}px;
    `;
  }}
`;

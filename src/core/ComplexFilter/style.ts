import { styled } from "@mui/material/styles";
import { getSpaces } from "../styles";

export const Wrapper = styled("div")`
  width: 150px;
`;

export const StyledChipsWrapper = styled("div")`
  ${(props) => {
    const spacings = getSpaces(props);

    return `
      margin-top: ${spacings?.s}px;
    `;
  }}
`;

import { styled } from "@mui/material/styles";
import Button from "../Button";
import { getSpaces } from "../styles";

export const Wrapper = styled("div")`
  width: 150px;
`;

export const StyledButton = styled(Button)`
  ${(props) => {
    const spacings = getSpaces(props);

    return `
      margin-top: ${spacings?.l}px;
      margin-bottom: ${spacings?.s}px;

      &:first-of-type {
        margin-left: ${spacings?.s}px;
        margin-right: ${spacings?.m}px;
      }

      &:last-child {
        margin-left: 0;
        margin-right: ${spacings?.s}px;
      }
    `;
  }}
`;

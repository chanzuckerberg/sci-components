import { styled } from "@mui/material/styles";
import Button from "src/core/Button";
import { getSpaces } from "src/core/styles";

export const StyledButton = styled(Button)`
  position: absolute;

  ${(props) => {
    const spaces = getSpaces(props);

    return `
      right: ${spaces?.xxl}px;
    `;
  }}
`;

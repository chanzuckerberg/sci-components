import { styled } from "@mui/material/styles";
import ButtonIcon from "src/core/ButtonIcon";
import { getSpaces } from "src/core/styles";

export const StyledButtonIcon = styled(ButtonIcon)`
  position: absolute;

  ${(props) => {
    const spaces = getSpaces(props);

    return `
      right: ${spaces?.xxl}px;
    `;
  }}
`;

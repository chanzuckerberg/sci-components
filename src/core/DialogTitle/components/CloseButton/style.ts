import { styled } from "@mui/material/styles";
import ButtonIcon from "src/core/ButtonIcon";
import { getSpaces } from "src/core/styles";

export const StyledButtonIcon = styled(ButtonIcon)`
  position: absolute;

  ${(props) => {
    const spaces = getSpaces(props);

    return `
      top: ${spaces?.xl || 0}px;
      right: ${spaces?.xl || 0}px;
    `;
  }}
`;

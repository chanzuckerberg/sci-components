import styled from "@emotion/styled";
import IconButton from "src/core/IconButton";
import { getSpaces } from "src/core/styles";

export const StyledIconButton = styled(IconButton)`
  position: absolute;

  ${(props) => {
    const spaces = getSpaces(props);

    return `
      top: ${spaces?.xl || 0}px;
      right: ${spaces?.xl || 0}px;
    `;
  }}
`;

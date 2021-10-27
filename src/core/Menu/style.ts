import styled from "@emotion/styled";
import { Menu } from "@material-ui/core";
import { getSpaces } from "../styles";

export const StyledMenu = styled(Menu)`
  .MuiMenu-paper {
    ${(props) => {
      const spacings = getSpaces(props);

      return `
        padding: ${spacings?.xs}px;
      `;
    }}
  }

  .MuiList-padding {
    padding: 0;
  }
`;

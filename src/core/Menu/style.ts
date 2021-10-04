import styled from "@emotion/styled";
import { Menu } from "@material-ui/core";
import { getSpacings } from "../styles";

export const StyledMenu = styled(Menu)`
  .MuiMenu-paper {
    ${(props) => {
      const spacings = getSpacings(props);

      return `
        padding: ${spacings?.xs}px;
      `;
    }}
  }

  .MuiList-padding {
    padding: 0;
  }
`;

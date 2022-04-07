import { Menu } from "@mui/material";
import { styled } from "@mui/material/styles";
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

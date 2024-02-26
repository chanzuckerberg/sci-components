import { Menu, menuClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getSpaces } from "../styles";

export const StyledMenu = styled(Menu)`
  & {
    .${menuClasses.paper} {
      ${(props) => {
        const spaces = getSpaces(props);

        return `
          padding: ${spaces?.xs}px;
        `;
      }}
    }

    .MuiList-padding {
      padding: 0;
    }
  }
`;

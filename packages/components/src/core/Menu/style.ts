import { Menu, menuClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getSemanticColors, getSpaces } from "src/core/styles";

export const StyledMenu = styled(Menu)`
  & {
    .${menuClasses.paper} {
      ${(props) => {
        const spaces = getSpaces(props);
        const semanticColors = getSemanticColors(props);

        return `
          background-color: ${semanticColors?.base?.surfacePrimary};
          background-image: none;
          padding: ${spaces?.xs}px;
        `;
      }}
    }

    .MuiList-padding {
      padding: 0;
    }
  }
`;

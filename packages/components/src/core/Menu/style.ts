import { Menu, menuClasses } from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  getCorners,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";

export const StyledMenu = styled(Menu)`
  & {
    .${menuClasses.paper} {
      ${(props: CommonThemeProps) => {
        const spaces = getSpaces(props);
        const corners = getCorners(props);
        const semanticColors = getSemanticColors(props);

        return `
          background-color: ${semanticColors?.base?.surfacePrimary};
          background-image: none;
          padding: ${spaces?.xs}px;
          border-radius: ${corners?.l}px;
        `;
      }}
    }

    .MuiList-padding {
      padding: 0;
    }
  }
`;

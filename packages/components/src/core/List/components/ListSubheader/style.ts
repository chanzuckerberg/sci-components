import { ListSubheader } from "@mui/material";
import { styled } from "@mui/material/styles";
import { fontHeader, getSpaces } from "src/core/styles";

const fontHeaderM = fontHeader("m");

export const StyledListSubheader = styled(ListSubheader)`
  &.MuiListSubheader-root {
    ${fontHeaderM}

    line-height: unset;
    color: unset;

    ${(props) => {
      const spaces = getSpaces(props);

      return `
        margin-bottom: ${spaces?.l}px;
      `;
    }}
  }
`;

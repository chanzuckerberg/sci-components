import styled from "@emotion/styled";
import { ListSubheader } from "@material-ui/core";
import { fontHeader, getSpaces } from "../styles";

const fontHeaderM = fontHeader("m");

export const StyledListSubheader = styled(ListSubheader)`
  &.MuiListSubheader-root {
    ${fontHeaderM}

    line-height: unset;
    color: unset;

    ${(props) => {
      const spacings = getSpaces(props);

      return `
        margin-bottom: ${spacings?.l}px;
      `;
    }}
  }
`;

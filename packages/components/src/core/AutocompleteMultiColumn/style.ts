import { Paper, Popper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactElement } from "react";
import InputSearch from "../InputSearch";
import {
  CommonThemeProps,
  getBorders,
  getColors,
  getCorners,
  getShadows,
  getSpaces,
} from "../styles";

export interface StyleProps extends CommonThemeProps {
  count?: number;
  icon?: ReactElement;
  search?: boolean;
  title?: string;
  columnWidth?: number;
}

const doNotForwardProps = [
  "anchorEl",
  "count",
  "keepSearchOnSelect",
  "search",
  "InputBaseProps",
  "title",
  "PopperBaseProps",
  "onClickAway",
  "ClickAwayListenerProps",
];

export const StyledPopper = styled(Popper, {
  shouldForwardProp: (prop: string) =>
    !doNotForwardProps.includes(prop) || prop === "anchorEl",
})`
  width: auto !important;

  .MuiAutocomplete-popperDisablePortal {
    position: relative;
    width: 100% !important;
    box-shadow: none;
    padding: 0;
    border: none;
  }

  ${(props) => {
    const borders = getBorders(props);
    const corners = getCorners(props);
    const shadows = getShadows(props);
    const spacings = getSpaces(props);

    return `
      background-color: white;
      border: ${borders?.gray[100]};
      border-radius: ${corners?.m}px;
      box-shadow: ${shadows?.m};
      padding: ${spacings?.xs}px;
      box-sizing: border-box;
      z-index: 1400;
    `;
  }}
`;

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  box-shadow: none;
  margin: 0;
  border-radius: 0;
  padding-top: 0;
  padding-bottom: 0;
`;

export const StyledAutocompletePopper = styled(Popper)`
  position: relative !important;
  transform: none !important;
  width: 100% !important;
  box-shadow: none;
  padding: 0;
  border: none;
`;

export const StyledAutocomplesWrapper = styled("div")`
  display: flex;
`;

export const StyledColumn = styled("div")`
  ${(props: StyleProps) => {
    const { columnWidth = 260 } = props;

    const colors = getColors(props);
    const spacings = getSpaces(props);

    return `
      width: ${columnWidth}px;
      &:not(:last-child) {
        border-right: solid 1px ${colors?.gray[200]};
        margin-right: ${spacings?.xs}px;
      }
    `;
  }}
`;

export const StyledAutocompleteInput = styled(InputSearch, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})<{ search: boolean }>`
  margin: 0;
  .MuiInputBase-root {
    width: 100%;
  }
  /* (thuang): Works with attribute inputMode: "none" to hide mobile keyboard */
  caret-color: ${({ search }) => (search ? "auto" : "transparent")};
`;

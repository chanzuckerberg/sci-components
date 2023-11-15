import { Paper, Popper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactElement } from "react";
import InputSearch from "../../../InputSearch";
import {
  CommonThemeProps,
  fontCapsXxxxs,
  getBorders,
  getColors,
  getCorners,
  getShadows,
  getSpaces,
  getTypography,
} from "../../../styles";

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
  ${(props: StyleProps) => {
    const borders = getBorders(props);
    const corners = getCorners(props);
    const shadows = getShadows(props);
    const spacings = getSpaces(props);

    return `
      background-color: white;
      border: ${borders?.gray[100]};
      border-radius: ${corners?.m}px;
      box-shadow: ${shadows?.m};
      padding-top: ${spacings?.l}px;
      padding-bottom: 0;
      padding-right: calc(${spacings?.l}px - ${spacings?.m}px);
      padding-left: ${spacings?.l}px;
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
  ${(props: StyleProps) => {
    const spacings = getSpaces(props);

    return `
      position: relative !important;
      transform: none !important;
      width: 100% !important;
      box-shadow: none;
      padding: 0;
      border: none;
    
      && .MuiPaper-root .MuiAutocomplete-listbox {
        padding: 0 ${spacings?.m}px ${spacings?.l}px 0;
      }
    `;
  }}
`;

export const StyledAutocompleteGroupWrapper = styled("div")`
  display: flex;
`;

export const StyledColumn = styled("div")`
  ${(props: StyleProps) => {
    const { columnWidth = 280 } = props;

    const colors = getColors(props);
    const spacings = getSpaces(props);

    return `
      position: relative;
      width: ${columnWidth}px;

      &:not(:last-child) {
        border-right: solid 1px ${colors?.gray[200]};
        margin-right: ${spacings?.m}px;
      }

      // (masoudmanson): This code hides the relation icon of the last column
      &:last-of-type {
        .SdsAutocompleteMultiColumn-column-relation-icon {
          display: none;
        }
      }

      .MuiAutocomplete-noOptions {
        padding: ${spacings?.xs}px ${spacings?.s}px;
        margin-bottom: ${spacings?.l}px;
      }
    `;
  }}
`;

export const StyledColumnTitle = styled("p")`
  ${fontCapsXxxxs}
  ${(props: StyleProps) => {
    const spacings = getSpaces(props);
    const colors = getColors(props);
    const typography = getTypography(props);

    return `
      color: ${colors?.gray[500]};
      font-family: ${typography?.fontFamily};
      margin: 0;
      padding: 0 ${spacings?.s}px ${spacings?.xxs}px;
    `;
  }}
`;

export const StyledColumnIcon = styled("span")`
  ${(props: StyleProps) => {
    const spacings = getSpaces(props);
    const colors = getColors(props);

    return `
      background-color: white;
      position: absolute;
      right: -${spacings?.xs}px;
      top: -2px;
      padding-bottom: 2px;

      svg {
        color: ${colors?.gray[500]};
      }
    `;
  }}
`;

export const StyledAutocompleteInput = styled(InputSearch, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})<{ search: boolean }>`
  ${({ search }) => !search && "height: 0; display: none;"}

  margin: 0;
  .MuiInputBase-root {
    width: 100%;
  }
  /* (thuang): Works with attribute inputMode: "none" to hide mobile keyboard */
  caret-color: ${({ search }) => (search ? "auto" : "transparent")};
`;

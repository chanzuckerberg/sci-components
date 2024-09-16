import { autocompleteClasses, Paper, Popper } from "@mui/material";
import styled from "@emotion/styled";
import { ReactElement } from "react";
import InputSearch from "src/core/InputSearch";
import {
  CommonThemeProps,
  getBorders,
  getCorners,
  getSemanticColors,
  getShadows,
  getSpaces,
} from "src/core/styles";

export interface StyleProps extends CommonThemeProps {
  count?: number;
  icon?: ReactElement;
  search?: boolean;
  title?: string;
  width?: number;
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
    const corners = getCorners(props);
    const shadows = getShadows(props);
    const spaces = getSpaces(props);
    const borders = getBorders(props);
    const semanticColors = getSemanticColors(props);

    return `
      background-color: ${semanticColors?.base?.surfacePrimary};
      background-image: none;
      border: ${borders?.none};
      border-radius: ${corners?.m}px;
      box-shadow: ${shadows?.m};
      padding: ${spaces?.l}px ${spaces?.xxs}px ${spaces?.l}px ${spaces?.l}px;
      box-sizing: border-box;
      z-index: 1400;

      .${autocompleteClasses.popper}.${autocompleteClasses.popperDisablePortal} {
        position: relative !important;
        transform: none !important;
      
        .MuiPaper-root .${autocompleteClasses.listbox} {
          padding: 0 ${spaces?.m}px 0 0;
        }
      }
    `;
  }}
`;

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: StyleProps) => {
    const shadows = getShadows(props);
    const semanticColors = getSemanticColors(props);

    return `
      background-color: ${semanticColors?.base?.surfacePrimary};
      background-image: none;
      box-shadow: ${shadows?.none};
      margin: 0;
      border-radius: 0;
      padding-top: 0;
      padding-bottom: 0;
    `;
  }}
`;

export const StyledAutocompleteGroupWrapper = styled("div")`
  display: flex;
`;

export const StyledAutocompleteInput = styled(InputSearch, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})<{ search: boolean }>`
  ${({ search }) =>
    !search && "height: 0; display: none; margin: 0 !important;"}

  margin: 0;
  .MuiInputBase-root {
    width: 100%;
  }
  /* (thuang): Works with attribute inputMode: "none" to hide mobile keyboard */
  caret-color: ${({ search }) => (search ? "auto" : "transparent")};
`;

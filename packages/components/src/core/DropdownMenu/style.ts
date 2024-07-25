import { autocompleteClasses, Paper, Popper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactElement } from "react";
import {
  CommonThemeProps,
  fontHeaderXs,
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
  isMultiColumn?: boolean;
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
  "forceOpen",
  "isMultiColumn",
];

export const StyledHeaderTitle = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})<{ search: boolean }>`
  ${fontHeaderXs}

  ${(props) => {
    const { search } = props;

    const spaces = getSpaces(props);

    return `
      padding-right: ${spaces?.m}px;
      margin-bottom: ${search ? spaces?.s : spaces?.m}px;
    `;
  }}
`;

export const StyledDropdownMenuAutocompleteWrapper = styled("div")`
  & .${autocompleteClasses.popper}, & .MuiPopper-root,
  .base-Popper-root {
    position: relative !important;
    transform: none !important;
    width: 100% !important;
    box-shadow: none;
    padding: 0;
    border: none;

    .${autocompleteClasses.paper}, .MuiPaper-root {
      box-shadow: none !important;
      border: none !important;
      border-radius: 0;
      margin: 0;
      padding: 0;
    }
  }
`;

export const StyledPopper = styled(Popper, {
  shouldForwardProp: (prop: string) =>
    !doNotForwardProps.includes(prop) || prop === "anchorEl",
})`
  ${(props) => {
    const borders = getBorders(props);
    const corners = getCorners(props);
    const shadows = getShadows(props);
    const semanticColors = getSemanticColors(props);

    return `
      background-color: ${semanticColors?.base?.surfacePrimary};
      border: ${borders?.none};
      border-radius: ${corners?.m}px;
      box-shadow: ${shadows?.m};
      box-sizing: border-box;
      z-index: 1400;
    `;
  }}
`;

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: StyleProps) => {
    const spaces = getSpaces(props);
    const borders = getBorders(props);
    const shadows = getShadows(props);

    return `
      box-shadow: ${shadows?.none} !important;
      border: ${borders?.none};
      margin: 0;
      padding: ${spaces?.l}px ${spaces?.xxs}px ${spaces?.l}px ${spaces?.l}px;

      .MuiAutocomplete-root,
      .MuiFormControl-root.MuiTextField-root {
        margin-bottom: ${spaces?.m}px;
        margin-right: ${spaces?.m}px;
      }

      // (masoudmanson): Remove margin-right and margin-bottom for the single column autocomplete
      // as it has been added to the parent container
      .MuiAutocomplete-root .MuiFormControl-root.MuiTextField-root {
        margin-right: 0;
        margin-bottom: 0;  
      }
    `;
  }}
`;

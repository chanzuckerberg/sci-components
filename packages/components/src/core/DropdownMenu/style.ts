import { autocompleteClasses, Paper, Popper } from "@mui/material";
import styled from "@emotion/styled";
import { ReactElement } from "react";
import {
  CommonThemeProps,
  fontBodyMediumXs,
  getBorders,
  getCorners,
  getSemanticColors,
  getShadows,
  getSpaces,
} from "src/core/styles";
import { addOpacityToHex } from "../styles/common/utils/opacity";

export interface StyleProps extends CommonThemeProps {
  count?: number;
  icon?: ReactElement;
  search?: boolean;
  isSearchAutoFocus?: boolean;
  title?: React.ReactNode;
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
  "titleValue",
];

export const StyledHeaderTitle = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${fontBodyMediumXs}

  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textPrimary};
      padding-right: ${spaces?.m}px;
    `;
  }}
`;

interface StyledDropdownMenuAutocompleteWrapperProps extends CommonThemeProps {
  search?: boolean;
  titleValue?: boolean;
  children?: React.ReactNode;
}

export const StyledDropdownMenuAutocompleteWrapper = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: StyledDropdownMenuAutocompleteWrapperProps) => {
    const { search, titleValue } = props;
    const spaces = getSpaces(props);

    return `
      & .SdsAutocompleteMultiColumn-wrapper {
        padding: 0 ${spaces?.xs}px;
      }

      & .${autocompleteClasses.popper}, & .MuiPopper-root,
      .base-Popper-root {
        position: relative !important;
        transform: none !important;
        width: 100% !important;
        box-shadow: none;
        padding: ${!search && !titleValue ? spaces?.xs : 0}px 0 0;
        border: none;
        outline: none !important;

        .MuiAutocomplete-listbox {
          outline: none !important;
        }

        .${autocompleteClasses.paper}, .MuiPaper-root {
          box-shadow: none !important;
          border: none !important;
          border-radius: 0;
          margin: 0;
          padding: 0;
          outline: none !important;
        }
      }
    `;
  }}
`;

export const StyledPopper = styled(Popper, {
  shouldForwardProp: (prop: string) =>
    !doNotForwardProps.includes(prop) || prop === "anchorEl",
})`
  ${(props: CommonThemeProps) => {
    const borders = getBorders(props);
    const corners = getCorners(props);
    const shadows = getShadows(props);
    const semanticColors = getSemanticColors(props);

    return `
      background-color: ${semanticColors?.base?.surface};
      background-image: none;
      border: ${borders?.none};
      border-radius: ${corners?.l}px;
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
    const shadows = getShadows(props);
    const semanticColors = getSemanticColors(props);
    const corners = getCorners(props);

    return `
      box-shadow: ${shadows?.none} !important;
      border: none !important;
      outline: 1px solid ${addOpacityToHex(semanticColors?.base?.borderSecondary || "#000000", 15)};
      border-radius: ${corners?.l}px;
      background-color: ${semanticColors?.base?.surface};
      background-image: none;
      margin: 0;
      padding: 0 0 ${spaces?.xs}px 0;
      overflow: hidden;

      .MuiAutocomplete-root,
      .MuiFormControl-root.MuiTextField-root {
        margin-bottom: ${spaces?.s}px;

        & .MuiInputBase-root.MuiOutlinedInput-root {
          border-radius: 0;
        }

        & fieldset {
          border-left: none !important;
          border-right: none !important;
          border-top: none !important;
          border-bottom: 1px solid ${semanticColors?.base?.divider};
          border-color: ${semanticColors?.base?.divider} !important;
          border-radius: 0;
        }
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

interface StyledDropdownMenuHeaderProps extends CommonThemeProps {
  search: boolean;
}

export const StyledDropdownMenuHeader = styled("div")`
  ${(props: StyledDropdownMenuHeaderProps) => {
    const { search } = props;
    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: ${spaces?.xs}px ${spaces?.m}px ${search ? spaces?.xs : spaces?.s}px;
      ${search && `border-bottom: solid 1px ${semanticColors?.base?.divider};`}
    `;
  }}
`;

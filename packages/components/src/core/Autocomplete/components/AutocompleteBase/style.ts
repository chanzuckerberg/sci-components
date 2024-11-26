import { Autocomplete, autocompleteClasses, Paper } from "@mui/material";
import styled from "@emotion/styled";
import { ReactElement } from "react";
import InputSearch from "src/core/InputSearch";
import {
  CommonThemeProps,
  fontBodyXxs,
  fontCapsXxxxs,
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
}

const doNotForwardProps = [
  "count",
  "keepSearchOnSelect",
  "search",
  "InputBaseProps",
  "PopperBaseProps",
  "onClickAway",
];

export const StyledAutocompleteBase = styled(Autocomplete, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  + .${autocompleteClasses.popper}
    > .${autocompleteClasses.paper}
    .${autocompleteClasses.groupLabel} {
    ${fontCapsXxxxs}
  }

  ${(props: StyleProps) => {
    const { search } = props;
    const spaces = getSpaces(props);
    const borders = getBorders(props);
    const semanticColors = getSemanticColors(props);

    return `
      ${!search && `height: 0; margin: 0 !important;`};
      
      // (masoudmanson): We need to apply the focus styles to the input element
      // when the user is tabbing through the options. To find out more, take a
      // look at the useDetectUserTabbing hook.
      &[data-user-is-tabbing="true"]:focus-within {
        border-radius: 4px;
        outline: 2px solid ${semanticColors?.base?.borderHover};
        outline-offset: 1px;
      }

      .MuiFormControl-root {
        outline: none;
      }

      .MuiOutlinedInput-root.MuiInputBase-formControl.MuiInputBase-adornedEnd {
        padding: 0 ${spaces?.m}px;

        .MuiAutocomplete-input {
          padding: ${spaces?.xs}px ${spaces?.s}px;
        }
      }

      & + .${autocompleteClasses.popper} > .${autocompleteClasses.paper} {
        .${autocompleteClasses.listbox} {
          max-height: 40vh;
          padding: 0 ${spaces?.m}px 0 0;

          .${autocompleteClasses.option} {
            min-height: unset;

            &.${autocompleteClasses.focused} {
              background-color: ${semanticColors?.base?.fillHover};
            }

            &[aria-selected="true"] {
              background-color: ${semanticColors?.base?.surface};
            }

            &[aria-disabled="true"] {
              opacity: 1;
            }

            &[aria-selected="true"].${autocompleteClasses.focused} {
              background-color: ${semanticColors?.base?.fillHover};
            }
          }

          & > li:last-child .${autocompleteClasses.groupUl} {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
        }

        .${autocompleteClasses.groupLabel} {
          top: 0;
          color: ${semanticColors?.base?.textSecondary};
          background-color: ${semanticColors?.base?.surface};
          padding: ${spaces?.xxs}px ${spaces?.s}px;
        }

        .${autocompleteClasses.groupUl} {
          position: relative;
          margin: 0 0 ${spaces?.m}px;
          border-bottom: ${borders?.base?.divider};
          padding-bottom: ${spaces?.xxs}px;

          & li:last-of-type {
            position: relative;
          }
        }

        .${autocompleteClasses.noOptions} {
          padding: ${spaces?.xs}px ${spaces?.s}px;
          margin-right: ${spaces?.l}px;
        }

        .${autocompleteClasses.loading} {
          padding: 0 ${spaces?.m}px 0 0;
        }
      }
    `;
  }}
` as typeof Autocomplete;

export const InputBaseWrapper = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: StyleProps) => {
    const { search } = props;

    if (!search) {
      // (thuang): We cannot use `display: none;` here, since
      // the component needs to be in the DOM to handle backdrop
      // click to close the menu
      return `
        border: 0;
        padding: 0;
        white-space: nowrap;
        clip-path: inset(100%);
        clip: rect(0 0 0 0);
        overflow: hidden;
        margin: 0;
        speak: none;
      `;
    }
  }}
`;

export const StyledMenuInputSearch = styled(InputSearch, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})<{ search: boolean }>`
  margin: 0;
  .MuiInputBase-root {
    width: 100%;
  }
  /* (thuang): Works with attribute inputMode: "none" to hide mobile keyboard */
  caret-color: ${({ search }) => (search ? "auto" : "transparent")};
`;

export const StyledPaper = styled(Paper)`
  ${(props: CommonThemeProps) => {
    const spaces = getSpaces(props);
    const corners = getCorners(props);
    const shadows = getShadows(props);
    const borders = getBorders(props);
    const semanticColors = getSemanticColors(props);

    return `
      background-image: none;
      padding: ${spaces?.l}px ${spaces?.xxs}px ${spaces?.l}px ${spaces?.l}px ;
      background-color: ${semanticColors?.base?.surface};
      border: ${borders?.none};
      border-radius: ${corners?.m}px;
      box-shadow: ${shadows?.m};
      box-sizing: border-box;
    `;
  }}
`;

export const StyledMenuItemDetails = styled("div")`
  ${fontBodyXxs}
  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      white-space: pre-wrap;
    `;
  }}
`;

export const StyledMenuItemText = styled("div")`
  display: flex;
  flex-direction: column;
`;

import { Autocomplete, autocompleteClasses, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactElement } from "react";
import InputSearch from "src/core/InputSearch";
import {
  CommonThemeProps,
  fontBodyXxs,
  fontCapsXxxxs,
  getBorders,
  getCorners,
  getSemanticComponentColors,
  getSemanticTextColors,
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
    const semanticTextColors = getSemanticTextColors(props);
    const semanticComponentColors = getSemanticComponentColors(props);

    return `
      ${!search && `height: 0`};

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
              background-color: ${semanticComponentColors?.base?.surfaceSecondary};
            }

            &[aria-selected="true"] {
              background-color: ${semanticComponentColors?.base?.surfacePrimary};
            }

            &[aria-disabled="true"] {
              opacity: 1;
            }

            &[aria-selected="true"].${autocompleteClasses.focused} {
              background-color: ${semanticComponentColors?.base?.surfaceSecondary};
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
          color: ${semanticTextColors?.base?.secondary};
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
  ${(props) => {
    const spaces = getSpaces(props);
    const corners = getCorners(props);
    const shadows = getShadows(props);
    const borders = getBorders(props);
    const semanticComponentColors = getSemanticComponentColors(props);

    return `
      padding: ${spaces?.l}px ${spaces?.xxs}px ${spaces?.l}px ${spaces?.l}px ;
      background-color: ${semanticComponentColors?.base?.surfacePrimary};
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
    const semanticTextColors = getSemanticTextColors(props);

    return `
      color: ${semanticTextColors?.base?.secondary};
      white-space: pre-wrap;
    `;
  }}
`;

export const StyledMenuItemText = styled("div")`
  display: flex;
  flex-direction: column;
`;

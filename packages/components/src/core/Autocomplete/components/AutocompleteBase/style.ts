import { Autocomplete, autocompleteClasses, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactElement } from "react";
import InputSearch from "../../../InputSearch";
import {
  CommonThemeProps,
  fontBodyXxs,
  fontCapsXxxs,
  getBorders,
  getColors,
  getCorners,
  getShadows,
  getSpaces,
} from "../../../styles";

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
    ${fontCapsXxxs}
  }

  ${(props: StyleProps) => {
    const { search } = props;
    const spacings = getSpaces(props);
    const colors = getColors(props);
    const borders = getBorders(props);

    return `
      ${!search && `height: 0`};

      .MuiOutlinedInput-root.MuiInputBase-formControl.MuiInputBase-adornedEnd {
        padding: 0 ${spacings?.l}px 0 0;

        .MuiAutocomplete-input {
          padding: ${spacings?.xs}px ${spacings?.l}px;
        }
      }

      & + .${autocompleteClasses.popper} > .${autocompleteClasses.paper} {
        .${autocompleteClasses.listbox} {
          max-height: 40vh;
          padding: 0 ${spacings?.m}px 0 0;

          .${autocompleteClasses.option} {
            min-height: unset;

            &.${autocompleteClasses.focused} {
              background-color: ${colors?.gray[100]};
            }

            &[aria-selected="true"] {
              background-color: white;
            }

            &[aria-disabled="true"] {
              opacity: 1;
            }

            &[aria-selected="true"].${autocompleteClasses.focused} {
              background-color: ${colors?.gray[100]};
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
          color: ${colors?.gray[500]};
          padding: ${spacings?.xxs}px ${spacings?.s}px;
        }

        .${autocompleteClasses.groupUl} {
          position: relative;
          margin: 0 0 ${spacings?.m}px;
          border-bottom: ${borders?.gray[200]};
          padding-bottom: ${spacings?.xxs}px;

          & li:last-of-type {
            position: relative;
          }
        }

        .${autocompleteClasses.noOptions} {
          padding: ${spacings?.xs}px ${spacings?.s}px;
          margin-right: ${spacings?.l}px;
        }

        .${autocompleteClasses.loading} {
          padding: 0 ${spacings?.m}px 0 0;
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
    const spacings = getSpaces(props);
    const borders = getBorders(props);
    const corners = getCorners(props);
    const shadows = getShadows(props);

    return `
      padding: ${spacings?.l}px ${spacings?.xxs}px ${spacings?.l}px ${spacings?.l}px ;
      background-color: white;
      border: ${borders?.gray[100]};
      border-radius: ${corners?.m}px;
      box-shadow: ${shadows?.m};
      box-sizing: border-box;
    `;
  }}
`;

export const StyledMenuItemDetails = styled("div")`
  ${fontBodyXxs}
  ${(props) => {
    const colors = getColors(props);

    return `
      color: ${colors?.gray[500]};
      white-space: pre-wrap;
    `;
  }}
`;

export const StyledMenuItemText = styled("div")`
  display: flex;
  flex-direction: column;
`;

import { Autocomplete, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactElement } from "react";
import InputSearch from "../InputSearch";
import {
  CommonThemeProps,
  fontBodyXxs,
  fontCapsXxxxs,
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
  + .MuiAutocomplete-popper
    > .MuiAutocomplete-paper
    .MuiAutocomplete-groupLabel {
    ${fontCapsXxxxs}
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

      & + .MuiAutocomplete-popper > .MuiAutocomplete-paper {
        .MuiAutocomplete-listbox {
          max-height: 40vh;
          padding: 0 ${spacings?.xs}px ${spacings?.xs}px;

          .MuiAutocomplete-option {
            min-height: unset;
          }

          .MuiAutocomplete-option.Mui-focused {
            background-color: ${colors?.gray[100]};
          }

          .MuiAutocomplete-option[aria-selected="true"] {
            background-color: white;
          }

          .MuiAutocomplete-option[aria-disabled="true"] {
            opacity: 1;
          }

          .MuiAutocomplete-option[aria-selected="true"].Mui-focused {
            background-color: ${colors?.gray[100]};
          }

          & > li:last-child .MuiAutocomplete-groupUl {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
        }

        .MuiAutocomplete-groupLabel {
          top: 0;
          color: ${colors?.gray[500]};
          padding: ${spacings?.xxs}px 0 ${spacings?.xxs}px 0;
        }

        .MuiAutocomplete-groupUl {
          margin-bottom: ${spacings?.m}px;
          position: relative;
          border-bottom: ${borders?.gray[200]};
          padding-bottom: ${spacings?.xxs}px;

          & li:last-of-type {
            position: relative;
          }
        }

        .MuiAutocomplete-noOptions {
          padding: ${spacings?.xs}px ${spacings?.s}px;
          margin-bottom: ${spacings?.l}px;
        }

        .MuiAutocomplete-loading {
          margin-bottom: ${spacings?.xs}px;
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
      padding-top: ${spacings?.xs}px;
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

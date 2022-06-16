import styled from "@emotion/styled";
import { Autocomplete } from "@material-ui/lab";
import InputSearch from "../InputSearch";
import MenuItem from "../MenuItem";
import {
  CommonThemeProps,
  fontBodyXs,
  fontBodyXxs,
  fontCapsXxxxs,
  getBorders,
  getColors,
  getSpaces,
} from "../styles";

export const StyledMenuItem = styled(MenuItem)`
  width: 100%;
  padding: 0;
  min-height: unset;
  white-space: pre-wrap;

  ${(props: StyleProps) => {
    const { count } = props;

    if (count) {
      return `
        & .primary-text {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
      `;
    }
  }}
`;

export const StyledMenuItemDetails = styled("div")`
  ${fontBodyXxs}
  ${(props: StyleProps) => {
    const colors = getColors(props);

    return `
      color: ${colors?.gray[500]};
      white-space: pre-wrap;
    `;
  }}
`;

export const StyledMenuItemCount = styled("span")`
  ${fontBodyXs}
  text-align: right;
  color: black;

  ${(props: StyleProps) => {
    const spacings = getSpaces(props);

    return `
      margin-left: ${spacings?.m}px;
    `;
  }}
`;
export interface StyleProps extends CommonThemeProps {
  search?: boolean;
  title?: boolean;
  hasSections?: boolean;
  count?: string;
}

const doNotForwardProps = [
  "count",
  "keepSearchOnSelect",
  "search",
  "InputBaseProps",
  "hasSections",
  "title",
];

export const StyledAutocomplete = styled(Autocomplete, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  + .MuiAutocomplete-popper
    > .MuiAutocomplete-paper
    .MuiAutocomplete-groupLabel {
    ${fontCapsXxxxs}
  }

  ${(props: StyleProps) => {
    const { search, title, hasSections } = props;
    const spacings = getSpaces(props);
    const colors = getColors(props);
    const borders = getBorders(props);

    return `
      ${!search && `height: 0`};

      & + .MuiAutocomplete-popper {
        position: relative;
        width: 100% !important;
      }

      & + .MuiAutocomplete-popper > .MuiAutocomplete-paper {
        box-shadow: none;
        margin: 0;
        border-radius: 0;
        padding-top: 0;
        padding-bottom: 0;
        ${
          search || title || hasSections
            ? `padding-left: ${spacings?.s}px;`
            : ""
        }

        .MuiAutocomplete-listbox {
          max-height: 40vh;
          padding-top: 0;
          padding-bottom: 0;
          ${
            search || title || hasSections
              ? `padding-right: ${spacings?.s}px;`
              : ""
          }

          & > li:last-child .MuiAutocomplete-groupUl {
            border-bottom: none;
            margin-bottom: 0;
          }
        }

        .MuiAutocomplete-option {
          padding: 0;
          min-height: unset;
        }

        .MuiMenuItem-root {
          padding: ${spacings?.xs}px ${spacings?.s}px;
        }

        .MuiAutocomplete-groupLabel {
          top: 0;
          color: ${colors?.gray[500]};
          padding: ${spacings?.xxs}px 0 ${spacings?.xxs}px 0;
        }

        .MuiAutocomplete-groupUl {
          margin-bottom: ${spacings?.m}px;
          position: relative;
          padding: 0 0 ${spacings?.xs}px 0 0;
          border-bottom: ${borders?.gray[200]};

          & li:last-of-type {
            position: relative;
            margin-bottom: ${spacings?.xxs}px;
          }
        }
      }
    `;
  }}
` as typeof Autocomplete;

export const InputBaseWrapper = styled.div`
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

    const spacings = getSpaces(props);

    return `
      margin: ${spacings?.s}px;
    `;
  }}
`;

export const StyledMenuInputSearch = styled(InputSearch, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})<{ search: boolean }>`
  margin: 0;
  .MuiInputBase-root {
    width: 100%;
  }
  /* (thuang): Works with attribute inputMode: "none" to hide mobile keyboard */
  caret-color: ${({ search }) => (search ? "auto" : "transparent")};
`;

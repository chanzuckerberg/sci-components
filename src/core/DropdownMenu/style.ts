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

  ${(props: StyleProps) => {
    const { count } = props;

    if (count) {
      return `
        > span > span {
          display: flex;
          justify-content: space-between;
        }
      `;
    }
  }};
`;

export const StyledMenuItemDetails = styled("div")`
  ${fontBodyXxs}
  ${(props: StyleProps) => {
    const colors = getColors(props);

    return `
      color: ${colors?.gray[500]};
    `;
  }}
`;

export const StyledMenuItemCount = styled("span")`
  ${fontBodyXs}
  text-align: right;
  color: #000;

  ${(props: StyleProps) => {
    const spacings = getSpaces(props);

    return `
      margin-left: ${spacings?.m}px;
    `;
  }}
`;

export interface StyleProps extends CommonThemeProps {
  search?: boolean;
  count?: string;
}

const doNotForwardProps = ["count", "search", "InputBaseProps"];

// (thuang): Casting the type to `Autocomplete`
//  per https://github.com/mui-org/material-ui/issues/21727#issuecomment-880263271
export const StyledAutocomplete = styled(Autocomplete, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  + .MuiAutocomplete-popper
    > .MuiAutocomplete-paper
    .MuiAutocomplete-groupLabel {
    ${fontCapsXxxxs};
  }

  ${(props: StyleProps) => {
    const { search } = props;
    const spacings = getSpaces(props);
    const colors = getColors(props);
    const borders = getBorders(props);

    return `
      ${!search && `height: 0`};

      & + .MuiAutocomplete-popper > .MuiAutocomplete-paper {
        padding: ${spacings?.xs}px;

        .MuiAutocomplete-option {
          padding-top: ${spacings?.xs}px;
          padding-bottom: ${spacings?.xs}px;
          padding-left: ${spacings?.s}px;
          padding-right: ${spacings?.s}px;
        }

        .MuiAutocomplete-groupLabel {
          color: ${colors?.gray[500]};
          margin-bottom: ${spacings?.xxs}px;
          padding-left: ${spacings?.s}px;
        }

        .MuiAutocomplete-groupUl {
          border-bottom: ${borders?.gray[200]};
          margin-bottom: ${spacings?.m}px;

          &:last-of-type {
            border-bottom: none;
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

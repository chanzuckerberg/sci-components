import { Autocomplete, inputBaseClasses, Popper } from "@mui/material";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import InputSearch from "../InputSearch";
import MenuItem from "../MenuItem";
import { CommonThemeProps, getSpaces } from "../styles";

export const StyledMenuItem = styled(MenuItem)`
  //first child of tooltip
  & {
    ${(props) => {
      const spacings = getSpaces(props);

      return `
      
      width: 100%;
    

      & > span {
        padding-right: ${spacings?.l}px;
        padding-left: ${spacings?.l}px;
        padding-top: ${spacings?.xs}px;
        padding-bottom: ${spacings?.xs}px;
      }
    `;
    }}
  }
`;

export interface StyleProps extends CommonThemeProps {
  search?: boolean;
}

const doNotForwardProps = ["search", "InputBaseProps"];

// (thuang): Casting the type to `Autocomplete`
//  per https://github.com/mui-org/material-ui/issues/21727#issuecomment-880263271
export const StyledAutocomplete = styled(Autocomplete, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  & {
    ${({ search }: StyleProps) => {
      return `

      ${!search ? "" : "height: 0"}
      //color: cyan !important;
      background-color: cyan !important;
      width: 300px;
      color: #586069;
      width: 300px;
      border: none;
      z-index: 1;
      font-size: 13px;

      .MuiAutocomplete-root {
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 25%) !important;
        color: red !important;
      }

      `;
    }}
  }
` as typeof Autocomplete;

export const InputBaseWrapper = styled("div", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
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

    const spacings = getSpaces(props);

    return `
      margin: ${spacings?.s}px;
    `;
  }}
`;

export const StyledMenuInputSearch = styled(InputSearch, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})<{ search: boolean }>`
  && {
    margin: 0;
    transform: none !important;

    .${inputBaseClasses.root} {
      width: 100%;
      padding: 0;
      padding-right: 14px !important;
    }

    /* (thuang): Works with attribute inputMode: "none" to hide mobile keyboard */
    caret-color: ${({ search }) => (search ? "auto" : "transparent")};
  }
`;

export const StyledPopper = styled(Popper)`
  //tooltip
  & {
    transform: translate3d(5px, 5px, 0px) !important;
    position: inherit !important;
    border: 1px;
    width: 300px;
    padding-top: 10px;
    background-color: cyan;

    .${autocompleteClasses.popperDisablePortal} {
      position: relative !important;
      background-color: cyan;
    }

    .MuiAutocomplete-popper {
      //second child of tooltip
      transform: none !important;
      width: auto;

      .MuiPaper-root {
        box-shadow: none;
        background-color: cyan;
      }
    }
  }
`;

import { Autocomplete, inputBaseClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputSearch from "src/core/InputSearch";
import MenuItem from "src/core/MenuItem";
import { CommonThemeProps, getSpaces } from "src/core/styles";

export const StyledMenuItem = styled(MenuItem)`
  width: 100%;
`;

export interface StyleProps extends CommonThemeProps {
  search?: boolean;
}

const doNotForwardProps = ["search", "InputBaseProps", "keepSearchOnSelect"];

// (thuang): Casting the type to `Autocomplete`
//  per https://github.com/mui-org/material-ui/issues/21727#issuecomment-880263271
export const StyledAutocomplete = styled(Autocomplete, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${({ search }: StyleProps) => !search && "height: 0; margin: 0 !important;"}
  width: 100%;
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

    const spaces = getSpaces(props);

    return `
      margin: ${spaces?.s}px;
    `;
  }}
`;

export const StyledMenuInputSearch = styled(InputSearch, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})<{ search: boolean }>`
  && {
    margin: 0;

    .${inputBaseClasses.root} {
      width: 100%;
      padding: 0;
      padding-right: 14px !important;
    }

    /* (thuang): Works with attribute inputMode: "none" to hide mobile keyboard */
    caret-color: ${({ search }) => (search ? "auto" : "transparent")};
  }
`;

import styled from "@emotion/styled";
import { InputBase } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import MenuItem from "../MenuItem";
import { CommonThemeProps, getColors, getCorners, getSpaces } from "../styles";

export const StyledMenuItem = styled(MenuItem)`
  width: 100%;
`;

export interface StyleProps extends CommonThemeProps {
  search?: boolean;
}

const doNotForwardProps = ["search"];

// (thuang): Casting the type to `Autocomplete`
//  per https://github.com/mui-org/material-ui/issues/21727#issuecomment-880263271
export const StyledAutocomplete = styled(Autocomplete, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${({ search }: StyleProps) => !search && "height: 0;"}
` as typeof Autocomplete;

export const InputBaseWrapper = styled.div`
  ${(props: StyleProps) => {
    const { search } = props;

    if (!search) {
      // (thuang): We cannot use `display: none;` here, since
      // the component needs to be in the DOM to handle backdrop
      // click to close the menu
      return `
        margin: 0;
      `;
    }

    const spacings = getSpaces(props);
    const corners = getCorners(props);
    const colors = getColors(props);

    return `
      padding: ${spacings?.xxs}px ${spacings?.m}px;
      margin: ${spacings?.s}px;
      border: ${colors?.gray["300"]} solid 1px;
      border-radius: ${corners?.m}px;
    `;
  }}
`;

export const StyledInputBase = styled(InputBase, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})<{ search: boolean }>`
  width: 100%;
  /* (thuang): Works with attribute inputMode: "none" to hide mobile keyboard */
  caret-color: ${({ search }) => (search ? "auto" : "transparent")};
`;

export const StyledSearchIcon = styled(Search)`
  ${(props) => {
    const colors = getColors(props);

    return `
      color: ${colors?.gray["500"]};
    `;
  }}
`;

import styled from "@emotion/styled";
import { InputBase } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import MenuItem from "../MenuItem";
import { getColors, getCorners, getSpacings } from "../styles";

export const StyledMenuItem = styled(MenuItem)`
  width: 100%;
`;

export interface StyleProps {
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
  ${(props) => {
    const spacings = getSpacings(props);
    const corners = getCorners(props);
    const colors = getColors(props);

    return `
      padding: ${spacings?.s}px ${spacings?.l}px;
      margin: ${spacings?.l}px ${spacings?.l}px 0 ${spacings?.l}px;
      border: ${colors?.gray["300"]} solid 1px;
      border-radius: ${corners?.m}px;
    `;
  }}
`;

export const StyledInputBase = styled(InputBase)`
  width: 100%;
`;

export const StyledSearchIcon = styled(Search)`
  ${(props) => {
    const colors = getColors(props);

    return `
      color: ${colors?.gray["500"]};
    `;
  }}
`;

import { Paper, Popper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactElement } from "react";
import {
  CommonThemeProps,
  fontHeaderXs,
  getBorders,
  getCorners,
  getShadows,
  getSpaces,
  getTypography,
} from "../styles";

export interface StyleProps extends CommonThemeProps {
  count?: number;
  icon?: ReactElement;
  search?: boolean;
  title?: string;
}

const doNotForwardProps = [
  "anchorEl",
  "count",
  "keepSearchOnSelect",
  "search",
  "InputBaseProps",
  "title",
  "PopperBaseProps",
  "onClickAway",
  "ClickAwayListenerProps",
];

// export const StyledAutocomplete = styled(Autocomplete, {
//   shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
// })`
//   ${(props: StyleProps) => {
//     const spacings = getSpaces(props);

//     return `
//     `;
//   }}
// ` as typeof Autocomplete;

export const StyledHeaderTitle = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})<{ search: boolean }>`
  ${fontHeaderXs}

  ${(props) => {
    const { search } = props;

    const typography = getTypography(props);
    const spacings = getSpaces(props);

    return `
      font-family: ${typography?.fontFamily};
      color: black;
      padding-top: ${spacings?.xxs}px;
      padding-right: ${spacings?.s}px;
      padding-left: ${spacings?.s}px;
      ${search ? `padding-bottom: 0px;` : `padding-bottom: ${spacings?.xs}px;`}
    `;
  }}
`;

export const StyledPopper = styled(Popper, {
  shouldForwardProp: (prop: string) =>
    !doNotForwardProps.includes(prop) || prop === "anchorEl",
})`
  .MuiAutocomplete-popperDisablePortal {
    position: relative;
    width: 100% !important;
    box-shadow: none;
    padding: 0;
    border: none;
  }

  ${(props) => {
    const borders = getBorders(props);
    const corners = getCorners(props);
    const shadows = getShadows(props);
    const spacings = getSpaces(props);

    return `
      background-color: white;
      border: ${borders?.gray[100]};
      border-radius: ${corners?.m}px;
      box-shadow: ${shadows?.m};
      padding: ${spacings?.xs}px;
      box-sizing: border-box;
      z-index: 1400;
    `;
  }}
`;

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: StyleProps) => {
    const { title } = props;
    const spacings = getSpaces(props);

    return `
      box-shadow: none;
      margin: 0;
      border-radius: 0;
      padding-top: 0;
      padding-bottom: 0;
      ${title ? `padding-left: ${spacings?.s}px !important;` : ``}
    `;
  }}
`;

export const StyledAutocompletePopper = styled(Popper)`
  position: relative !important;
  transform: none !important;
  width: auto !important;
  box-shadow: none;
  padding: 0;
  border: none;
`;

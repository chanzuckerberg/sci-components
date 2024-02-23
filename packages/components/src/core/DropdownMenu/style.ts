import { autocompleteClasses, Paper, Popper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactElement } from "react";
import {
  CommonThemeProps,
  fontHeaderXs,
  getBorders,
  getCorners,
  getSemanticComponentColors,
  getShadows,
  getSpaces,
} from "../styles";

export interface StyleProps extends CommonThemeProps {
  count?: number;
  icon?: ReactElement;
  search?: boolean;
  title?: string;
  isMultiColumn?: boolean;
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
  "forceOpen",
  "isMultiColumn",
];

export const StyledHeaderTitle = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})<{ search: boolean }>`
  ${fontHeaderXs}

  ${(props) => {
    const { search } = props;

    const spacings = getSpaces(props);

    return `
      padding-right: ${spacings?.m}px;
      margin-bottom: ${search ? spacings?.s : spacings?.m}px;
    `;
  }}
`;

export const StyledDropdownMenuAutocompleteWrapper = styled("div")`
  & .${autocompleteClasses.popper}, & .MuiPopper-root,
  .base-Popper-root {
    position: relative !important;
    transform: none !important;
    width: 100% !important;
    box-shadow: none;
    padding: 0;
    border: none;

    .${autocompleteClasses.paper}, .MuiPaper-root {
      box-shadow: none !important;
      border: none !important;
      border-radius: 0;
      margin: 0;
      padding: 0;
    }
  }
`;

export const StyledPopper = styled(Popper, {
  shouldForwardProp: (prop: string) =>
    !doNotForwardProps.includes(prop) || prop === "anchorEl",
})`
  ${(props) => {
    const borders = getBorders(props);
    const corners = getCorners(props);
    const shadows = getShadows(props);
    const semanticComponentColors = getSemanticComponentColors(props);

    return `
      background-color: ${semanticComponentColors?.base?.surface};
      border: ${borders?.base[100]};
      border-radius: ${corners?.m}px;
      box-shadow: ${shadows?.m};
      box-sizing: border-box;
      z-index: 1400;
    `;
  }}
`;

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: StyleProps) => {
    const spacings = getSpaces(props);
    const borders = getBorders(props);
    const shadows = getShadows(props);

    return `
      box-shadow: ${shadows?.none} !important;
      border: ${borders?.none} !important;
      border-radius: 0;
      margin: 0;
      padding: ${spacings?.l}px ${spacings?.xxs}px ${spacings?.l}px ${spacings?.l}px;

      .MuiFormControl-root.MuiTextField-root {
        margin-bottom: ${spacings?.m}px;
        margin-right: ${spacings?.m}px;
      }
    `;
  }}
`;

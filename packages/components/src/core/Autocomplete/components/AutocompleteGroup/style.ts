import { styled } from "@mui/material/styles";
import { ReactElement } from "react";
import {
  CommonThemeProps,
  fontCapsXxxxs,
  getColors,
  getSpaces,
  getTypography,
} from "../../../styles";

export interface StyleProps extends CommonThemeProps {
  count?: number;
  icon?: ReactElement;
  search?: boolean;
  title?: string;
  columnWidth?: number;
}

export const StyledColumn = styled("div")`
  ${(props: StyleProps) => {
    const { columnWidth = 280 } = props;

    const colors = getColors(props);
    const spacings = getSpaces(props);

    return `
      position: relative;
      width: ${columnWidth}px;

      &:not(:last-child) {
        border-right: solid 1px ${colors?.gray[200]};
        margin-right: ${spacings?.m}px;
      }

      // (masoudmanson): This code hides the relation icon of the last column
      &:last-of-type {
        .SdsAutocompleteMultiColumn-column-relation-icon {
          display: none;
        }

        .MuiPaper-root .MuiAutocomplete-listbox {
          padding: 0 !important;
        }
      }

      .MuiAutocomplete-noOptions {
        padding: ${spacings?.xs}px ${spacings?.s}px;
        margin-bottom: ${spacings?.l}px;
      }
    `;
  }}
`;

export const StyledColumnTitle = styled("p")`
  ${fontCapsXxxxs}
  ${(props: StyleProps) => {
    const spacings = getSpaces(props);
    const colors = getColors(props);
    const typography = getTypography(props);

    return `
      color: ${colors?.gray[500]};
      font-family: ${typography?.fontFamily};
      margin: 0;
      padding: 0 ${spacings?.s}px ${spacings?.xxs}px;
    `;
  }}
`;

export const StyledColumnIcon = styled("span")`
  ${(props: StyleProps) => {
    const spacings = getSpaces(props);
    const colors = getColors(props);

    return `
      background-color: white;
      position: absolute;
      right: -${spacings?.xs}px;
      top: -2px;
      padding-bottom: 2px;

      svg {
        color: ${colors?.gray[500]};
      }
    `;
  }}
`;

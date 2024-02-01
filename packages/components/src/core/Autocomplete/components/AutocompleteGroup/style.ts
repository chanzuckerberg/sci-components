import { styled } from "@mui/material/styles";
import { ReactElement } from "react";
import {
  CommonThemeProps,
  fontCapsXxxs,
  getColors,
  getIconSizes,
  getSpaces,
  getTypography,
} from "../../../styles";

export interface StyleProps extends CommonThemeProps {
  count?: number;
  icon?: ReactElement;
  search?: boolean;
  title?: string;
  width?: number;
}

export const StyledColumn = styled("div")`
  ${(props: StyleProps) => {
    const { width = 280 } = props;

    const colors = getColors(props);
    const spacings = getSpaces(props);

    return `
      position: relative;
      width: ${width}px;

      &:not(:last-child) {
        border-right: solid 1px ${colors?.gray[200]};
        margin-right: ${spacings?.m}px;
      }

      // (masoudmanson): This code hides the relation icon of the last column
      &:last-of-type {
        .SdsAutocompleteMultiColumn-column-relation-icon {
          display: none;
        }
      }
    `;
  }}
`;

export const StyledColumnTitle = styled("p")`
  ${fontCapsXxxs}
  ${(props: StyleProps) => {
    const spacings = getSpaces(props);
    const colors = getColors(props);
    const typography = getTypography(props);
    return `
      font-family: ${typography?.fontFamily};
      color: ${colors?.gray[500]};
      padding: 0 ${spacings?.s}px ${spacings?.xxs}px;
      margin: 0;
    `;
  }}
`;

export const StyledColumnIcon = styled("span")`
  ${(props: StyleProps) => {
    const spacings = getSpaces(props);
    const colors = getColors(props);
    const iconSizes = getIconSizes(props);

    return `
      background-color: white;
      position: absolute;
      right: -${spacings?.xs}px;
      top: -2px;
      padding-bottom: 2px;

      svg {
        color: ${colors?.gray[500]};
        width: ${iconSizes?.xs.width}px;
        height: ${iconSizes?.xs.height}px;
      }
    `;
  }}
`;

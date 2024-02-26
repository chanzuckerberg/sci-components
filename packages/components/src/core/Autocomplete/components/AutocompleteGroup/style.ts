import { styled } from "@mui/material/styles";
import { ReactElement } from "react";
import {
  CommonThemeProps,
  fontCapsXxxs,
  getBorders,
  getIconSizes,
  getSemanticComponentColors,
  getSemanticTextColors,
  getSpaces,
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

    const spaces = getSpaces(props);
    const borders = getBorders(props);

    return `
      position: relative;
      width: ${width}px;

      &:not(:last-child) {
        border-right: ${borders?.base[200]};
        margin-right: ${spaces?.m}px;
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
    const spaces = getSpaces(props);
    const semanticTextColors = getSemanticTextColors(props);

    return `
      color: ${semanticTextColors?.base?.secondary};
      padding: 0 ${spaces?.s}px ${spaces?.xxs}px;
      margin: 0;
    `;
  }}
`;

export const StyledColumnIcon = styled("span")`
  ${(props: StyleProps) => {
    const spaces = getSpaces(props);
    const iconSizes = getIconSizes(props);
    const semanticComponentColors = getSemanticComponentColors(props);

    return `
      background-color: ${semanticComponentColors?.base?.surfacePrimary};
      position: absolute;
      right: -${spaces?.xs}px;
      top: -2px;
      padding-bottom: 2px;

      svg {
        color: ${semanticComponentColors?.base?.icon};
        width: ${iconSizes?.xs.width}px;
        height: ${iconSizes?.xs.height}px;
      }
    `;
  }}
`;

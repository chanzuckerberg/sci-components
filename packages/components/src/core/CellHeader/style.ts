import styled from "@emotion/styled";
import {
  CommonThemeProps,
  focusVisibleA11yStyle,
  fontHeaderS,
  getSemanticColors,
  getSpaces,
} from "src/core/styles";
import Icon from "src/core/Icon";

export interface CellHeaderExtraProps extends CommonThemeProps {
  active?: boolean;
  hideSortIcon?: boolean;
  horizontalAlign?: "left" | "center" | "right";
}

const contentPositionMapping = {
  center: "center",
  left: "flex-start",
  right: "flex-end",
};

const doNotForwardProps = [
  "active",
  "horizontalAlign",
  "shouldShowTooltipOnHover",
  "tooltipProps",
  "tooltipText",
  "hideSortIcon",
];

export const StyledSortingIcon = styled(Icon, {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: CellHeaderExtraProps) => {
    const { active = false, hideSortIcon } = props;

    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      margin-left: ${spaces?.s}px;
      margin-bottom: ${spaces?.xxs}px;
      color: ${active ? semanticColors?.accent?.ornament : "transparent"};
      display: ${hideSortIcon ? (active ? "block" : "none") : "block"};
      outline: none !important;
    `;
  }}
`;

export const StyledTableHeader = styled("th", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontHeaderS}
  ${focusVisibleA11yStyle}

  ${(props: CellHeaderExtraProps) => {
    const { active = false, horizontalAlign = "left" } = props;

    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    return `
      color: ${active ? semanticColors?.accent?.textAction : semanticColors?.base?.textSecondary};
      padding: ${spaces?.l}px ${spaces?.m}px;
      text-align: ${horizontalAlign};
      min-width: 96px;
      cursor: pointer;
      vertical-align: bottom;

      & .MuiButtonBase-root {
        outline: none;
      }

      &:hover {
        color: ${active ? semanticColors?.accent?.textActionHover : semanticColors?.base?.textPrimary};

        & .MuiButtonBase-root {
          color: ${active ? semanticColors?.accent?.textActionHover : semanticColors?.base?.textPrimary};
          opacity: 1;
        }

        & svg {
          color: ${active ? semanticColors?.accent?.ornamentHover : semanticColors?.base?.ornamentSecondaryHover};
        }
      }
    `;
  }}
`;

export const StyledCellHeaderContainer = styled("div", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${(props: CellHeaderExtraProps) => {
    const { horizontalAlign = "left" } = props;
    return `
      align-items: flex-end;
      width: 100%;
      display: flex;
      justify-content: ${
        horizontalAlign ? contentPositionMapping[horizontalAlign] : "flex-start"
      };
    `;
  }}
`;

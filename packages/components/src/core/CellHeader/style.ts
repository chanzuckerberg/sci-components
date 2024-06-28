import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  focusVisibleA11yStyle,
  fontHeaderS,
  getSemanticComponentColors,
  getSemanticTextColors,
  getSpaces,
} from "src/core/styles";
import Icon from "src/core/Icon";

export interface CellHeaderExtraProps extends CommonThemeProps {
  active?: boolean;
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
    const { active = false } = props;

    const spaces = getSpaces(props);
    const semanticComponentColors = getSemanticComponentColors(props);

    return `
      margin-left: ${spaces?.s}px;
      margin-bottom: ${spaces?.xxs}px;
      color: ${active ? semanticComponentColors?.accent?.icon : semanticComponentColors?.base?.icon};
      opacity: ${active ? 1 : 0};
      outline: none !important;
    `;
  }}
`;

export const StyledTableHeader = styled("th", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontHeaderS}
  ${focusVisibleA11yStyle()}

  ${(props: CellHeaderExtraProps) => {
    const { active = false, horizontalAlign = "left" } = props;

    const spaces = getSpaces(props);
    const semanticComponentColors = getSemanticComponentColors(props);
    const semanticTextColors = getSemanticTextColors(props);

    return `
      color: ${active ? semanticComponentColors?.accent?.fill : semanticTextColors?.base?.secondary};
      padding: ${spaces?.l}px ${spaces?.m}px;
      text-align: ${horizontalAlign};
      min-width: 96px;
      width: 96px;
      cursor: pointer;
      vertical-align: bottom;

      & .MuiButtonBase-root {
        outline: none;
      }

      &:hover {
        color: ${active ? semanticComponentColors?.accent?.fillHover : semanticTextColors?.base?.primary};

        & .MuiButtonBase-root {
          color: ${active ? semanticComponentColors?.accent?.fillHover : semanticComponentColors?.base?.iconHover};
          opacity: 1;
        }

        & svg {
          color: ${active ? semanticComponentColors?.accent?.fillHover : semanticTextColors?.base?.primary};
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

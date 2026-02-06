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
  hover?: boolean;
  shouldTruncate?: boolean;
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
  "hover",
  "shouldTruncate",
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
      color: ${active ? semanticColors?.accent?.foreground : "transparent"};
      display: ${hideSortIcon ? (active ? "block" : "none") : "block"};
      outline: none !important;
    `;
  }}
`;

const ShouldTruncate = () => {
  return `
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    word-break: break-all;
  `;
};

export const StyledTableHeader = styled.div`
  ${fontHeaderS}
  ${focusVisibleA11yStyle}

  ${(props: CellHeaderExtraProps) => {
    const { active = false, horizontalAlign = "left", hover = true } = props;

    const spaces = getSpaces(props);
    const semanticColors = getSemanticColors(props);

    const defaultColor = active
      ? semanticColors?.accent?.foreground
      : semanticColors?.base?.textSecondary;

    const hoverColor = active
      ? semanticColors?.accent?.foregroundInteraction
      : semanticColors?.base?.textPrimary;

    return `
      color: ${defaultColor};
      padding: ${spaces?.m}px !important;
      text-align: ${horizontalAlign};
      cursor: ${hover ? "pointer" : "default"};
      vertical-align: bottom;

      & .MuiButtonBase-root {
        outline: none;
      }

      &:hover {
        color: ${hover ? hoverColor : defaultColor};

        & .MuiButtonBase-root {
          color: ${hoverColor};
          opacity: 1;
        }

        & svg {
          color: ${active ? semanticColors?.accent?.foregroundInteraction : semanticColors?.base?.ornamentSecondaryInteraction};
        }
      }
    `;
  }}
`;

export const StyledCellHeaderText = styled("div", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontHeaderS}
  ${(props: CellHeaderExtraProps) => {
    const { shouldTruncate = false } = props;

    return `
      ${shouldTruncate && ShouldTruncate()}
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

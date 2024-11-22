import styled from "@emotion/styled";
import React from "react";
import {
  CommonThemeProps,
  focusVisibleA11yStyle,
  fontHeaderS,
  getBorders,
  getMode,
  getSemanticColors,
} from "src/core/styles";

export interface RowExtraProps
  extends CommonThemeProps,
    Omit<React.HTMLProps<HTMLTableRowElement>, "as" | "rev"> {
  rowHeight?: number;
  useDivider?: boolean;
  selected?: boolean;
  disabled?: boolean;
  hover?: boolean;
}

const doNotForwardProps = [
  "rowHeight",
  "useDivider",
  "shouldShowTooltipOnHover",
  "tooltipProps",
  "tooltipSubtitle",
  "tooltipText",
  "hover",
];

const disabledStyled = (props: RowExtraProps) => {
  const semanticColors = getSemanticColors(props);
  const mode = getMode(props);

  return `
    // eslint-disable-next-line sonarjs/no-all-duplicated-branches
    background-color: ${mode === "light" ? semanticColors?.base?.surfaceSecondary : semanticColors?.base?.surfacePrimary};
    color: ${semanticColors?.base?.textDisabled};
    user-select: none;

    &:hover {
      background-color: ${mode === "light" ? semanticColors?.base?.surfaceSecondary : semanticColors?.base?.surfacePrimary};
      color: ${semanticColors?.base?.textDisabled};
    }

    & span, & div {
      color: ${semanticColors?.base?.textDisabled};
    }

    .cell-component {
      color: ${semanticColors?.base?.textDisabled};
      pointer-events: none;
      user-select: none;
      & span, & div {
        color: ${semanticColors?.base?.textDisabled};
        background-color: ${mode === "light" ? semanticColors?.base?.surfaceSecondary : semanticColors?.base?.surfacePrimary};
      }

      svg {
        fill: ${semanticColors?.base?.ornamentDisabled};
      }

      filter: grayscale(100%);
    }
  `;
};

const hoverStyled = (props: RowExtraProps) => {
  const semanticColors = getSemanticColors(props);

  return `
    &:hover {
      background-color: ${semanticColors?.base?.fillHover};
    }
  `;
};

export const StyledTableRow = styled("tr", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontHeaderS}
  ${focusVisibleA11yStyle}

  ${(props: RowExtraProps) => {
    const {
      rowHeight,
      useDivider = true,
      selected = false,
      disabled = false,
      hover = true,
    } = props;

    const semanticColors = getSemanticColors(props);
    const borders = getBorders(props);

    return `
      align-items: center;
      border-bottom: ${useDivider ? borders?.base?.table : borders?.none};

      ${rowHeight ? `max-height: ${rowHeight}px;` : ""}

      ${selected ? `background-color: ${semanticColors?.accent?.surfacePrimary};` : ""}

      ${hover && hoverStyled(props)};

      ${disabled && disabledStyled(props)}
    `;
  }}
`;

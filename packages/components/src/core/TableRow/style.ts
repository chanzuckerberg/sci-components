import styled from "@emotion/styled";
import React from "react";
import {
  CommonThemeProps,
  focusVisibleA11yStyle,
  fontHeaderS,
  getBorders,
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

  return `
    background-color: ${semanticColors?.base?.backgroundSecondary};
    color: ${semanticColors?.base?.textDisabled};
    user-select: none;

    &:hover {
      background-color: ${semanticColors?.base?.backgroundSecondary};
      color: ${semanticColors?.base?.textDisabled};
    }

    & span, & div {
      color: ${semanticColors?.base?.textDisabled};
    }

    .cell-component {
      color: ${semanticColors?.base?.textDisabled};
      pointer-events: none;
      user-select: none;
      & div {
        color: ${semanticColors?.base?.textDisabled};
        background-color: ${semanticColors?.base?.backgroundSecondary};
      }

      & .MuiChip-root {
        background-color: ${semanticColors?.base?.fillDisabled};

        & span {
          color: ${semanticColors?.base?.textDisabled} !important;
        }
      }

      svg {
        fill: ${semanticColors?.base?.ornamentDisabled};
      }

      filter: grayscale(100%);
    }
  `;
};

const hoverStyled = (props: RowExtraProps) => {
  const { selected } = props;
  const semanticColors = getSemanticColors(props);

  return `
    &:hover {
      td, th {
        position: relative;
        background-color: ${selected ? semanticColors?.accent?.surfaceSecondary : semanticColors?.base?.backgroundPrimary};

        &:before {
          background-color: ${semanticColors?.base?.fillHover};
        }
      }
    }
  `;
};

const selectedStyled = (props: RowExtraProps) => {
  const semanticColors = getSemanticColors(props);

  return `
    td, th {
      &:before {
        background-color: ${semanticColors?.accent?.surfaceSecondary};
      }

      background-color: ${semanticColors?.accent?.surfaceSecondary};
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
      position: relative;

      td, th {
        position: sticky !important;
        background-color: ${semanticColors?.base?.backgroundPrimary};

        &:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          background-color: ${semanticColors?.base?.backgroundPrimary};
        }
      }

      ${rowHeight ? `max-height: ${rowHeight}px;` : ""}
      ${hover && hoverStyled(props)};
      ${selected && selectedStyled(props)};
      ${disabled && disabledStyled(props)}
    `;
  }}
`;

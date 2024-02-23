import { styled } from "@mui/material/styles";
import React from "react";
import {
  CommonThemeProps,
  fontHeaderS,
  getBorders,
  getSemanticComponentColors,
  getSemanticTextColors,
} from "../styles";

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
  const semanticComponentColors = getSemanticComponentColors(props);
  const semanticTextColors = getSemanticTextColors(props);

  return `
    background-color: ${semanticComponentColors?.base?.surfaceSecondary};
    color: ${semanticTextColors?.base?.disabled};
    user-select: none;

    & span, & div {
      color: ${semanticTextColors?.base?.disabled};
    }

    .cell-component {
      color: black;
      pointer-events: none;
      user-select: none;
      & span, & div {
        color: black;
      }

      svg {
        fill: black;
      }

      filter: grayscale(100%);
      opacity: 0.2;
    }
  `;
};

const hoverStyled = (props: RowExtraProps) => {
  const semanticComponentColors = getSemanticComponentColors(props);

  return `
    &:hover {
      background-color: ${semanticComponentColors?.base?.fillHover};
    }
  `;
};

export const StyledTableRow = styled("tr", {
  shouldForwardProp: (prop) => !doNotForwardProps.includes(prop as string),
})`
  ${fontHeaderS}

  ${(props: RowExtraProps) => {
    const {
      rowHeight,
      useDivider = true,
      selected = false,
      disabled = false,
      hover = true,
    } = props;

    const semanticComponentColors = getSemanticComponentColors(props);
    const borders = getBorders(props);

    return `
      align-items: center;
      border-bottom: ${useDivider ? borders?.base[300] : borders?.none};

      ${rowHeight ? `max-height: ${rowHeight}px;` : ""}

      ${selected ? `background-color: ${semanticComponentColors?.accent?.surface};` : ""}

      ${hover && hoverStyled(props)};

      ${disabled && disabledStyled(props)}
    `;
  }}
`;

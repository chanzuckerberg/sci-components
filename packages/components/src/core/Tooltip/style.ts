import { css } from "@emotion/css";
import { Popper } from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBodyMediumXs,
  fontBodyXs,
  fontBodyXxs,
  getCorners,
  getSemanticColors,
  getShadows,
  getSpaces,
} from "@components/src/core/styles";
import { addOpacityToHex } from "../styles/common/utils/opacity";

export interface TooltipExtraProps extends CommonThemeProps {
  // TODO(185930): remove custom `followCursor` prop when we upgrade to MUIv5
  arrowOffset?: number;
  followCursor?: boolean;
  /**
   * @deprecated Tooltips follow the theme mode and no longer have an inverted
   * style. This prop is ignored and will be removed in a future release.
   */
  inverted?: boolean;
  /**
   * @deprecated Tooltips follow the theme mode and no longer have an inverted
   * style. This prop is ignored and will be removed in a future release.
   */
  sdsStyle?: "dark" | "light";
  /**
   * @deprecated Tooltips follow the theme mode and no longer have an inverted
   * style. This prop is ignored and will be removed in a future release.
   */
  hasInvertedStyle?: boolean;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  width?: "default" | "wide";
  textAlign?: "left" | "center" | "right";
  componentSlot?: React.ReactNode;
  /**
   * The popper the tooltip renders into, carrying the arrow's shape and
   * placement.
   *
   * (v9): MUI removed the Tooltip `PopperComponent` prop in favor of
   * `slots.popper`. We keep `PopperComponent` as an SDS prop for backward
   * compatibility and map it to `slots.popper` internally.
   */
  PopperComponent?: React.ElementType;
}

const surface = (props: TooltipExtraProps): string => {
  const spaces = getSpaces(props);
  const semanticColors = getSemanticColors(props);

  return css`
    ${fontBodyXs(props)}
    background-color: ${semanticColors?.base?.surfacePrimary};
    color: ${semanticColors?.base?.textPrimary};
    padding: ${spaces?.s}px ${spaces?.m}px;
  `;
};

const tableStyles = (props: TooltipExtraProps): string => {
  const spaces = getSpaces(props);

  return css`
    padding: ${spaces?.m}px;
  `;
};

const doNotForwardProps = ["textAlign"];

export const StyledTitle = styled("p", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${fontBodyMediumXs}

  ${(props: TooltipExtraProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      margin: 0;
      color: ${semanticColors?.base?.textPrimary};
    `;
  }}
`;

export const StyledSubtitle = styled("p", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${fontBodyXxs}

  ${(props: TooltipExtraProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      margin: 0;
      color: ${semanticColors?.base?.textSecondary};
    `;
  }}
`;

export const tooltipCss = (props: TooltipExtraProps): string => {
  const { width, followCursor, textAlign } = props;
  const shadows = getShadows(props);
  const corners = getCorners(props);
  const semanticColors = getSemanticColors(props);

  return css`
    &.MuiTooltip-tooltip {
      border-radius: ${corners?.l}px;
      box-shadow: ${shadows?.m};
      max-width: ${width === "wide" ? "550px" : "250px"} !important;
      outline: 1px solid
        ${addOpacityToHex(
          semanticColors?.base?.borderSecondary || "#000000",
          15
        )};
      text-align: ${textAlign
        ? textAlign
        : width === "wide"
          ? "left"
          : "center"} !important;

      ${surface(props)}

      ${followCursor === true && tableStyles(props)}
    }
  `;
};

export const arrowCss = (props: TooltipExtraProps): string => {
  const { arrowOffset } = props;

  const semanticColors = getSemanticColors(props);

  return css`
    &.MuiTooltip-arrow {
      /* (bethbertozzi): !important is needed to fight inline style */
      ${arrowOffset !== undefined ? `left: ${arrowOffset}px !important;` : ""}
      color: ${semanticColors?.base?.surfacePrimary};
      &:before {
        box-sizing: border-box;
        width: 12px;
        height: 12px;
      }
    }
  `;
};

/*
 * (masoudmanson): !important is needed to override arrow's
 * default placement which is calculated by javascript
 */
export const StyledPopper = styled(Popper)`
  /*
   * (v9): MUI v9 keeps the tooltip popper's base styles (z-index and
   * pointer-events) inside its internal "Popper" slot. Because SDS replaces
   * the popper slot with this component, those styles are lost. Without
   * pointer-events: none, a non-interactive popper (e.g. followCursor) sits
   * under the cursor/trigger and steals hover, making the tooltip flicker on
   * and off. We re-apply them here and only enable pointer-events for
   * interactive tooltips.
   */
  z-index: ${(props: TooltipExtraProps) =>
    props?.theme?.zIndex?.tooltip ?? 1500};
  pointer-events: none;

  &.MuiTooltip-popperInteractive {
    pointer-events: auto;
  }

  &[data-popper-placement*="top"] .MuiTooltip-arrow {
    top: auto !important;
    bottom: 0 !important;
    width: 24px !important;
    height: 12px !important;
    margin-bottom: -12px !important;
    margin-left: -2px !important;
    &:before {
      transform-origin: center;
      transform: rotate(45deg) translate(-5px, -7px);
      border-bottom-right-radius: 2px;
      box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1);
    }
  }

  &[data-popper-placement*="bottom"] .MuiTooltip-arrow {
    top: 0 !important;
    bottom: auto !important;
    width: 24px !important;
    height: 12px !important;
    margin-top: -12px !important;
    margin-left: -2px !important;
    &:before {
      transform-origin: center;
      transform: rotate(45deg) translate(6px, 4px);
      border-top-left-radius: 2px;
      box-shadow: 0 0 2px 0px rgba(0, 0, 0, 0.1);
    }
  }

  &[data-popper-placement*="left"] .MuiTooltip-arrow {
    left: auto !important;
    right: 0 !important;
    width: 12px !important;
    height: 24px !important;
    margin-right: -12px !important;
    margin-top: 4px !important;
    &:before {
      transform-origin: center;
      transform: rotate(45deg) translate(-3px, 6px);
      border-top-right-radius: 2px;
      box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.1);
    }
  }

  &[data-popper-placement*="right"] .MuiTooltip-arrow {
    left: 0 !important;
    right: auto !important;
    width: 12px !important;
    height: 24px !important;
    margin-left: -12px !important;
    margin-top: 2px !important;
    &:before {
      transform-origin: center;
      transform: rotate(45deg) translate(9px, 0px);
      border-bottom-left-radius: 2px;
      box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.1);
    }
  }
`;

export const StyledComponentSlotWrapper = styled("div")`
  ${(props: TooltipExtraProps & { shouldAddMargin: boolean }) => {
    const { shouldAddMargin } = props;
    const spaces = getSpaces(props);
    return `
      margin-top: ${shouldAddMargin ? spaces?.s : 0}px;
    `;
  }}
`;

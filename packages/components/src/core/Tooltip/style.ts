import { css } from "@emotion/css";
import { Popper } from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBodyMediumXs,
  fontBodyXs,
  fontBodyXxs,
  fontHeaderXs,
  getCorners,
  getSemanticColors,
  getShadows,
  getSpaces,
} from "src/core/styles";
import { addOpacityToHex } from "../styles/common/utils/opacity";

export interface TooltipExtraProps extends CommonThemeProps {
  // TODO(185930): remove custom `followCursor` prop when we upgrade to MUIv5
  arrowOffset?: number;
  followCursor?: boolean;
  // @deprecated Use `hasInvertedStyle` instead
  inverted?: boolean;
  // @deprecated Use `hasInvertedStyle` instead
  sdsStyle?: "dark" | "light";
  hasInvertedStyle?: boolean;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  width?: "default" | "wide";
  textAlign?: "left" | "center" | "right";
  componentSlot?: React.ReactNode;
}

const dark = (props: TooltipExtraProps): string => {
  const spaces = getSpaces(props);
  const semanticColors = getSemanticColors(props);

  return css`
    ${fontHeaderXs(props)}
    background-color: ${semanticColors?.base?.surfacePrimaryDark};
    color: ${semanticColors?.base?.textPrimaryOnDark};
    padding: ${spaces?.s}px ${spaces?.m}px;
  `;
};

const light = (props: TooltipExtraProps): string => {
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

const doNotForwardProps = ["hasInvertedStyle", "textAlign"];

export const StyledTitle = styled("p", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${fontBodyMediumXs}

  ${(props: TooltipExtraProps) => {
    const { hasInvertedStyle } = props;

    const semanticColors = getSemanticColors(props);

    return `
      margin: 0;
      color: ${hasInvertedStyle ? semanticColors?.base?.textPrimaryOnDark : semanticColors?.base?.textPrimary};
    `;
  }}
`;

export const StyledSubtitle = styled("p", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${fontBodyXxs}

  ${(props: TooltipExtraProps) => {
    const { hasInvertedStyle } = props;

    const semanticColors = getSemanticColors(props);

    return `
      margin: 0;
      color: ${hasInvertedStyle ? semanticColors?.base?.textSecondaryOnDark : semanticColors?.base?.textSecondary};
    `;
  }}
`;

export const tooltipCss = (props: TooltipExtraProps): string => {
  const {
    hasInvertedStyle = true,
    inverted,
    sdsStyle,
    width,
    followCursor,
    textAlign,
  } = props;
  const shadows = getShadows(props);
  const corners = getCorners(props);
  const semanticColors = getSemanticColors(props);

  return css`
    &.MuiTooltip-tooltip {
      border-radius: ${corners?.l}px;
      box-shadow: ${shadows?.m};
      max-width: ${width === "wide" ? "550px" : "250px"} !important;
      text-align: ${textAlign
        ? textAlign
        : width === "wide"
          ? "left"
          : "center"} !important;

      ${!hasInvertedStyle &&
      `outline: 1px solid ${addOpacityToHex(semanticColors?.base?.borderSecondary || "#000000", 15)};`}

      ${sdsStyle === "dark" || inverted || hasInvertedStyle
        ? dark(props)
        : light(props)}

      ${followCursor === true && tableStyles(props)}
    }
  `;
};

export const arrowCss = (props: TooltipExtraProps): string => {
  const { hasInvertedStyle, inverted, sdsStyle, arrowOffset } = props;

  const semanticColors = getSemanticColors(props);

  return css`
    &.MuiTooltip-arrow {
      /* (bethbertozzi): !important is needed to fight inline style */
      ${arrowOffset !== undefined ? `left: ${arrowOffset}px !important;` : ""}
      color: ${hasInvertedStyle || inverted || sdsStyle === "dark"
        ? semanticColors?.base?.surfacePrimaryDark
        : semanticColors?.base?.surfacePrimary};
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
  &[data-popper-placement*="top"] .MuiTooltip-arrow {
    width: 24px !important;
    height: 12px !important;
    margin-bottom: -12px !important;
    &:before {
      transform: rotate(45deg) translate(0px, -2px);
      border-bottom-right-radius: 2px;
      box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1);
    }
  }

  &[data-popper-placement*="bottom"] .MuiTooltip-arrow {
    width: 24px !important;
    height: 12px !important;
    margin-top: -12px !important;
    &:before {
      transform: rotate(45deg) translate(-1px, 2px);
      border-top-left-radius: 2px;
      box-shadow: 0 0 2px 0px rgba(0, 0, 0, 0.1);
    }
  }

  &[data-popper-placement*="left"] .MuiTooltip-arrow {
    width: 12px !important;
    height: 16px !important;
    margin-right: -12px !important;
    &:before {
      transform: rotate(45deg) translate(-1px, 1px);
      border-top-right-radius: 2px;
      box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.1);
    }
  }

  &[data-popper-placement*="right"] .MuiTooltip-arrow {
    width: 12px !important;
    height: 16px !important;
    margin-left: -12px !important;
    &:before {
      transform: rotate(45deg) translate(4px, 2px);
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

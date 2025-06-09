import { css } from "@emotion/css";
import { Popper } from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  fontBodyXs,
  fontBodyXxs,
  fontHeaderXs,
  getSemanticColors,
  getShadows,
  getSpaces,
} from "src/core/styles";

export interface TooltipExtraProps extends CommonThemeProps {
  // TODO(185930): remove custom `followCursor` prop when we upgrade to MUIv5
  arrowOffset?: number;
  followCursor?: boolean;
  // @deprecated Use `hasInvertedStyle` instead
  inverted?: boolean;
  // @deprecated Use `hasInvertedStyle` instead
  sdsStyle?: "dark" | "light";
  hasInvertedStyle?: boolean;
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
    background-color: ${semanticColors?.base?.surfaceInverse};
    color: ${semanticColors?.base?.textPrimaryInverse};
    padding: ${spaces?.s}px ${spaces?.l}px;
  `;
};

const light = (props: TooltipExtraProps): string => {
  const spaces = getSpaces(props);
  const semanticColors = getSemanticColors(props);

  return css`
    ${fontBodyXs(props)}
    background-color: ${semanticColors?.base?.surface};
    color: ${semanticColors?.base?.textPrimary};
    padding: ${spaces?.s}px ${spaces?.l}px;
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
  ${fontHeaderXs}

  ${(props: TooltipExtraProps) => {
    const { hasInvertedStyle } = props;

    const semanticColors = getSemanticColors(props);

    return `
      margin: 0;
      color: ${hasInvertedStyle ? semanticColors?.base?.textPrimaryInverse : semanticColors?.base?.textPrimary};
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
      color: ${hasInvertedStyle ? semanticColors?.base?.textSecondaryInverse : semanticColors?.base?.textSecondary};
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

  return css`
    &.MuiTooltip-tooltip {
      box-shadow: ${shadows?.m};
      max-width: ${width === "wide" ? "550px" : "250px"} !important;
      text-align: ${textAlign
        ? textAlign
        : width === "wide"
          ? "left"
          : "center"} !important;

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
      left: ${arrowOffset}px !important;
      color: ${hasInvertedStyle || inverted || sdsStyle === "dark"
        ? semanticColors?.base?.surfaceInverse
        : semanticColors?.base?.surface};
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
  ${(props: TooltipExtraProps) => {
    const spaces = getSpaces(props);
    return `
      margin-top: ${spaces?.m}px;
      margin-bottom: ${spaces?.xxxs}px;
    `;
  }}
`;

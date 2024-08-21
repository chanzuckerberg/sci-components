import { css } from "@emotion/css";
import { Popper } from "@mui/material";
import { styled } from "@mui/material/styles";
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
  inverted?: boolean;
  sdsStyle?: "dark" | "light";
  subtitle?: string;
  width?: "default" | "wide";
}

const dark = (props: TooltipExtraProps): string => {
  const spaces = getSpaces(props);
  const semanticColors = getSemanticColors(props);

  return css`
    ${fontHeaderXs(props)}
    background-color: ${semanticColors?.base?.surfacePrimaryInverse};
    color: ${semanticColors?.base?.textPrimaryInverse};
    text-align: center;
    max-width: 250px;
    padding: ${spaces?.s}px ${spaces?.l}px;
  `;
};

const light = (props: TooltipExtraProps): string => {
  const spaces = getSpaces(props);
  const semanticColors = getSemanticColors(props);

  return css`
    ${fontBodyXs(props)}
    background-color: ${semanticColors?.base?.surfacePrimary};
    color: ${semanticColors?.base?.textPrimary};
    text-align: left;
    max-width: 250px;
    padding: ${spaces?.s}px ${spaces?.l}px;
  `;
};

const wide = (): string => {
  return css`
    max-width: 550px;
  `;
};

const tableStyles = (props: TooltipExtraProps): string => {
  const spaces = getSpaces(props);

  return css`
    padding: ${spaces?.m}px;
  `;
};

export const Subtitle = styled("div")`
  ${fontBodyXxs}

  ${(props: TooltipExtraProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textSecondaryInverse};
    `;
  }}
`;

export const tooltipCss = (props: TooltipExtraProps): string => {
  const { inverted, sdsStyle, width, followCursor } = props;

  const shadows = getShadows(props);

  return css`
    &.MuiTooltip-tooltip {
      ${sdsStyle === "dark" || inverted ? dark(props) : light(props)}
      ${width === "wide" && sdsStyle === "light" && wide()}

      ${followCursor === true && tableStyles(props)}

      box-shadow: ${shadows?.m};
    }
  `;
};

export const arrowCss = (props: TooltipExtraProps): string => {
  const { inverted, sdsStyle, arrowOffset } = props;

  const semanticColors = getSemanticColors(props);

  return css`
    &.MuiTooltip-arrow {
      /* (bethbertozzi): !important is needed to fight inline style */
      left: ${arrowOffset}px !important;
      color: ${inverted || sdsStyle === "dark"
        ? semanticColors?.base?.surfacePrimaryInverse
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

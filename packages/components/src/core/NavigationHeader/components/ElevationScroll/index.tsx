import { AppBarProps, css, useScrollTrigger, useTheme } from "@mui/material";
import React from "react";
import { CommonThemeProps } from "src/core/styles";

interface ElevationScrollProps extends CommonThemeProps, AppBarProps {
  window?: () => Window;
  children?: React.ReactElement;
  shouldElevate?: boolean;
}

function ElevationScroll(elevationProps: ElevationScrollProps) {
  const { children, window, shouldElevate = true } = elevationProps;
  const theme = useTheme();
  const mode = theme.palette.mode;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    target: window ? window() : undefined,
    threshold: 0,
  });

  const darkModeStyles = css`
    border-bottom: 1px solid ${theme.palette?.sds?.base?.borderSecondary};
  `;

  /**
   * (masoudmanson): Elevation is set to 10 when the user scrolls and 0 otherwise.
   * MUI's elevation range is 0-24, but in the SDS theme, we have mapped:
   * - shadow.none to 0
   * - shadow.S to values 1-8
   * - shadow.M to values 9-16
   * - shadow.L to values 17-24
   *
   * Since the navigation requires a shadow.M drop shadow based on the design system,
   * any elevation value between 9 and 16 will produce the same effect.
   */
  return children
    ? React.cloneElement(children, {
        elevation: trigger && shouldElevate ? 14 : 0,
        sx:
          trigger && shouldElevate
            ? {
                ...(elevationProps.sx || {}),
                ...(mode === "dark" && darkModeStyles),
              }
            : undefined,
      })
    : null;
}

export default ElevationScroll;

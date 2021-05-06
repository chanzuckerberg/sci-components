import { useTheme } from "@emotion/react";
import { Tooltip as RawTooltip, TooltipProps } from "@material-ui/core";
import React from "react";
import { arrowCss, tooltipCss } from "./style";

export { TooltipProps };

const TooltipInfo = (props: TooltipProps): JSX.Element => {
  const theme = useTheme();
  const tooltip = tooltipCss(theme);
  const arrow = arrowCss(theme);

  return <RawTooltip arrow classes={{ arrow, tooltip }} {...props} />;
};

export default TooltipInfo;

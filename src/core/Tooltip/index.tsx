import { useTheme } from "@emotion/react";
import {
  Tooltip as RawTooltip,
  TooltipProps as RawTooltipProps,
} from "@material-ui/core";
import React from "react";
import { arrowCss, tooltipCss } from "./style";

interface ExtraProps {
  inverted?: boolean;
}

type TooltipProps = ExtraProps & RawTooltipProps;
export { TooltipProps };

const Tooltip = (props: TooltipProps): JSX.Element => {
  const theme = useTheme();
  const tooltip = tooltipCss({ ...props }, theme);
  const arrow = arrowCss({ ...props }, theme);

  return <RawTooltip arrow classes={{ arrow, tooltip }} {...props} />;
};

Tooltip.defaultProps = {
  inverted: false,
};

export default Tooltip;

import { useTheme } from "@emotion/react";
import {
  Tooltip as RawTooltip,
  TooltipProps as RawTooltipProps,
} from "@material-ui/core";
import React from "react";
import { arrowCss, ExtraProps, tooltipCss } from "./style";

type TooltipProps = ExtraProps & RawTooltipProps;

export { TooltipProps };

const Tooltip = (props: TooltipProps): JSX.Element => {
  const { inverted, ...rest } = props;

  const theme = useTheme();

  const extraProps = {
    /* stylelint-disable property-no-unknown -- false positive */
    inverted,
    theme,
    /* stylelint-enable property-no-unknown -- false positive */
  };

  const tooltip = tooltipCss(extraProps);
  const arrow = arrowCss(extraProps);

  return <RawTooltip arrow classes={{ arrow, tooltip }} {...rest} />;
};

Tooltip.defaultProps = {
  inverted: false,
};

export default Tooltip;

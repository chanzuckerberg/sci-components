import { useTheme } from "@emotion/react";
import {
  Tooltip as RawTooltip,
  TooltipClassKey,
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

  const tooltip = mergeClass({
    className: tooltipCss(extraProps),
    key: "tooltip",
    props,
  });

  const arrow = mergeClass({
    className: arrowCss(extraProps),
    key: "arrow",
    props,
  });

  return (
    <RawTooltip arrow classes={{ arrow, tooltip }} interactive {...rest} />
  );
};

function mergeClass({
  props,
  className,
  key,
}: {
  props: TooltipProps;
  className: string;
  key: TooltipClassKey;
}) {
  const { classes } = props;

  if (!classes) return className;

  const propClassName = classes[key];

  return propClassName ? `${propClassName} ${className}` : className;
}

Tooltip.defaultProps = {
  inverted: false,
};

export default Tooltip;

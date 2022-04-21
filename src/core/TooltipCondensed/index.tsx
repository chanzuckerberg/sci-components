import { TooltipClassKey } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { forwardRef } from "react";
import Tooltip, { TooltipProps } from "../Tooltip";
import { condensedCSS, ExtraProps } from "./style";

export type TooltipCondesnedProps = TooltipProps & ExtraProps;

const TooltipCondensed = forwardRef(function TooltipCondensed(
  props: TooltipCondesnedProps,
  ref
): JSX.Element {
  const { children, title, indicator, indicatorColor } = props;

  const theme = useTheme();

  const extraProps = {
    /* stylelint-disable property-no-unknown -- false positive */
    indicator,
    indicatorColor,
    theme,
    /* stylelint-enable property-no-unknown -- false positive */
  };

  const tooltip = mergeClass({
    className: condensedCSS(extraProps),
    key: "tooltip",
    props,
  });

  return (
    <Tooltip
      followCursor
      placement="right-end"
      enterDelay={50}
      leaveDelay={50}
      title={title}
      ref={ref}
      classes={{ tooltip }}
    >
      {children}
    </Tooltip>
  );
});

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

export default TooltipCondensed;

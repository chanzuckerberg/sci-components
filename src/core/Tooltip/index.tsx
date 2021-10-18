import { useTheme } from "@emotion/react";
import {
  Tooltip as RawTooltip,
  TooltipClassKey,
  TooltipProps as RawTooltipProps,
} from "@material-ui/core";
import React from "react";
import { arrowCss, ExtraProps, Subtitle, tooltipCss } from "./style";

type TooltipProps = ExtraProps & RawTooltipProps;

export { TooltipProps };

const Tooltip = (props: TooltipProps): JSX.Element => {
  const {
    classes,
    inverted,
    sdsStyle = "light",
    subtitle,
    title,
    width,
    ...rest
  } = props;

  if (inverted) {
    // eslint-disable-next-line no-console
    console.warn(
      "Warning: Tooltips using the inverted prop will be deprecated. Please use sdsStyle: 'dark' | 'light' instead."
    );
  }

  const theme = useTheme();

  const extraProps = {
    /* stylelint-disable property-no-unknown -- false positive */
    classes,
    inverted,
    sdsStyle,
    theme,
    width,
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

  const content = (
    <>
      {title}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </>
  );

  const leaveDelay = inverted || sdsStyle === "dark" ? 0 : 500;

  return (
    <RawTooltip
      classes={{ arrow, tooltip }}
      leaveDelay={leaveDelay}
      interactive
      title={content}
      {...rest}
    />
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

export default Tooltip;

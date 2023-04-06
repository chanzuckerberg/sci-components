import {
  Tooltip as RawTooltip,
  TooltipClassKey,
  TooltipProps as RawTooltipProps,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { forwardRef } from "react";
import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "src/common/warnings";
import {
  arrowCss,
  StyledPopper,
  Subtitle,
  tooltipCss,
  TooltipExtraProps,
} from "./style";

type TooltipProps = TooltipExtraProps & RawTooltipProps;

export type { TooltipProps };

/**
 * @see https://mui.com/material-ui/react-tooltip/
 *
 * @warning If the tooltip wraps a disabled component, please make sure to
 * wrap the children in a `<span>` tag.
 * https://mui.com/components/tooltips/#disabled-elements
 */
const Tooltip = forwardRef(function Tooltip(
  props: TooltipProps,
  ref
): JSX.Element | null {
  const {
    arrowOffset,
    classes,
    inverted,
    sdsStyle = "light",
    subtitle,
    title,
    width = "default",
    PopperComponent = StyledPopper,
    ...rest
  } = props;

  const { children } = rest;

  if (inverted) {
    showWarningIfFirstOccurence(SDSWarningTypes.TooltipInverted);
  }

  if (width === "wide" && sdsStyle === "dark") {
    showWarningIfFirstOccurence(SDSWarningTypes.TooltipWidth);
  }

  if (subtitle && sdsStyle === "light") {
    showWarningIfFirstOccurence(SDSWarningTypes.TooltipSubtitle);
  }

  const theme = useTheme();

  const extraProps = {
    /* stylelint-disable property-no-unknown -- false positive */
    arrowOffset,
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

  // (mlila) if no content is passed into the tooltip, don't render
  // a tooltip. this matches with the native MUI behavior.
  if (!title && !subtitle) return <>{children}</>;

  const content = (
    <>
      {title}
      {sdsStyle === "dark" && subtitle && <Subtitle>{subtitle}</Subtitle>}
    </>
  );

  const leaveDelay = inverted || sdsStyle === "dark" ? 0 : 500;

  return (
    <RawTooltip
      classes={{ arrow, tooltip }}
      leaveDelay={leaveDelay}
      title={content}
      PopperComponent={PopperComponent}
      ref={ref}
      {...rest}
    />
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

export default Tooltip;

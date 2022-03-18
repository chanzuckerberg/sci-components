import { useTheme } from "@emotion/react";
import {
  Tooltip as RawTooltip,
  TooltipClassKey,
  TooltipProps as RawTooltipProps,
} from "@material-ui/core";
import React, { forwardRef } from "react";
import { arrowCss, ExtraProps, Subtitle, tooltipCss } from "./style";

type TooltipProps = ExtraProps & RawTooltipProps;

export type { TooltipProps };

/**
 * @warning If the tooltip wraps a disabled component, please make sure to
 * wrap the children in a `<span>` tag.
 * https://mui.com/components/tooltips/#disabled-elements
 */
const Tooltip = forwardRef(function Tooltip(
  props: TooltipProps,
  ref
): JSX.Element | null {
  const {
    classes,
    // TODO(185930): remove custom `followCursor` prop when we upgrade to MUIv5
    followCursor = false,
    inverted,
    sdsStyle = "light",
    subtitle,
    title,
    width = "default",
    ...rest
  } = props;

  if (inverted) {
    // eslint-disable-next-line no-console
    console.warn(
      "Warning: Tooltips using the inverted prop will be deprecated. Please use sdsStyle: 'dark' | 'light' instead."
    );
  }

  if (width === "wide" && sdsStyle === "dark") {
    // eslint-disable-next-line no-console
    console.warn(
      "Warning: The 'wide' width is only available for light tooltips."
    );
  }

  const theme = useTheme();

  const extraProps = {
    /* stylelint-disable property-no-unknown -- false positive */
    classes,
    followCursor,
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
  // anything. this matches with the native MUI behavior.
  if (!title && !subtitle) return null;

  const content = (
    <>
      {title}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </>
  );

  const leaveDelay = inverted || sdsStyle === "dark" ? 0 : 500;

  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  return (
    <RawTooltip
      classes={{ arrow, tooltip }}
      leaveDelay={leaveDelay}
      interactive
      title={content}
      ref={ref}
      onMouseMove={
        followCursor
          ? (e) => setPosition({ x: e.pageX, y: e.pageY })
          : undefined
      }
      placement={followCursor ? "right-end" : undefined}
      PopperProps={
        followCursor
          ? {
              anchorEl: {
                clientHeight: 0,
                clientWidth: 0,
                getBoundingClientRect: () => ({
                  bottom: position.y,
                  height: 0,
                  left: position.x,
                  right: position.x,
                  toJSON: () => {},
                  top: position.y,
                  width: 0,
                  x: position.x,
                  y: position.y,
                }),
              },
            }
          : undefined
      }
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

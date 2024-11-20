import {
  Tooltip as RawTooltip,
  TooltipProps as RawTooltipProps,
  TooltipClassKey,
  useTheme,
} from "@mui/material";
import { forwardRef } from "react";
import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "src/common/warnings";
import {
  StyledPopper,
  Subtitle,
  TooltipExtraProps,
  arrowCss,
  tooltipCss,
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
    hasInvertedStyle,
    inverted,
    sdsStyle = "dark",
    subtitle,
    title,
    width = "default",
    PopperComponent = StyledPopper,
    ...rest
  } = props;

  const { children } = rest;

  if (inverted || sdsStyle) {
    showWarningIfFirstOccurence(SDSWarningTypes.TooltipInvertStyle);
  }

  if (width === "wide" && (sdsStyle === "dark" || hasInvertedStyle)) {
    showWarningIfFirstOccurence(SDSWarningTypes.TooltipWidth);
  }

  if (subtitle && (sdsStyle === "light" || !hasInvertedStyle)) {
    showWarningIfFirstOccurence(SDSWarningTypes.TooltipSubtitle);
  }

  const theme = useTheme();

  const extraProps = {
    /* stylelint-disable property-no-unknown -- false positive */
    arrowOffset,
    classes,
    hasInvertedStyle: invertStyleValue(inverted, sdsStyle, hasInvertedStyle),
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
      {hasInvertedStyle && subtitle && <Subtitle>{subtitle}</Subtitle>}
    </>
  );

  const leaveDelay =
    hasInvertedStyle || inverted || sdsStyle === "dark" ? 0 : 500;

  return (
    <RawTooltip
      classes={{ arrow, tooltip }}
      leaveDelay={leaveDelay}
      title={content}
      PopperComponent={PopperComponent}
      // (masoudmanson): Setting tabIndex to 0 makes the tooltip component
      // focusable and allows keyboard navigation.
      tabIndex={0}
      ref={ref}
      // (masoudmanson): SDS Tooltips should always have an arrow
      // and by setting the arrow prop to true, we ensure that
      // the arrow is always rendered.
      arrow={true}
      {...rest}
    />
  );
});

/**
 * (masoudmanson): Temporary function to handle the inversion of the tooltip
 * based on the sdsStyle, invert and hasInvertedStyle props.
 * Once the sdsStyle and invert props are completely removed,
 * this function will be removed as well.
 */
function invertStyleValue(
  inverted: boolean | undefined,
  sdsStyle: "light" | "dark" | undefined,
  hasInvertedStyle: boolean | undefined
) {
  return hasInvertedStyle !== undefined
    ? hasInvertedStyle
    : sdsStyle === "dark"
      ? true
      : sdsStyle === "light"
        ? false
        : inverted;
}

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

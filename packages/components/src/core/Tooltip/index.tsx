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
} from "@components/src/common/warnings";
import {
  StyledComponentSlotWrapper,
  StyledPopper,
  StyledSubtitle,
  StyledTitle,
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
    sdsStyle,
    subtitle,
    title,
    width = "default",
    PopperComponent = StyledPopper,
    textAlign,
    componentSlot,
    ...rest
  } = props;

  const { children } = rest;

  if (
    hasInvertedStyle !== undefined ||
    inverted !== undefined ||
    sdsStyle !== undefined
  ) {
    showWarningIfFirstOccurence(SDSWarningTypes.TooltipInvertStyle);
  }

  const theme = useTheme();

  const extraProps = {
    /* stylelint-disable property-no-unknown -- false positive */
    arrowOffset,
    classes,
    textAlign,
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
  if (!title && !subtitle && !componentSlot) return <>{children}</>;

  const content = (
    <div>
      {title && <StyledTitle>{title}</StyledTitle>}
      {subtitle && <StyledSubtitle>{subtitle}</StyledSubtitle>}

      {componentSlot && (
        <StyledComponentSlotWrapper shouldAddMargin={!!title || !!subtitle}>
          {componentSlot}
        </StyledComponentSlotWrapper>
      )}
    </div>
  );

  return (
    <RawTooltip
      classes={{ arrow, tooltip }}
      title={content}
      // (masoudmanson): Setting tabIndex to 0 makes the tooltip component
      // focusable and allows keyboard navigation.
      tabIndex={0}
      ref={ref}
      // (masoudmanson): SDS Tooltips should always have an arrow
      // and by setting the arrow prop to true, we ensure that
      // the arrow is always rendered.
      arrow={true}
      {...rest}
      slots={{
        popper: PopperComponent,
      }}
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

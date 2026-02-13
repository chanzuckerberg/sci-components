import { ToggleButtonGroupProps } from "@mui/material";
import React from "react";
import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "src/common/warnings";
import Icon, { IconNameToSizes } from "src/core/Icon";
import Tooltip, { TooltipProps } from "src/core/Tooltip";
import {
  StyledSegmentedControl,
  StyledToggleButton,
  StyledToggleButtonIcon,
  StyledToggleButtonLabel,
} from "./style";

// one prop is array of objects: with icon name and tooltip text. They need to make
// first item in array first button, etc
export interface SingleButtonDefinition {
  disabled?: boolean;
  icon?: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
  label?: string;
  shouldShowTooltip?: boolean;
  tooltipProps?: Partial<Omit<TooltipProps, "children">>;
  /**
   * @deprecated Use `tooltipProps` instead.
   * Example: `{ tooltipProps: { title: "My tooltip" } }`
   */
  tooltipText?: string;
  value: string;
}

export interface SegmentedControlProps extends ToggleButtonGroupProps {
  buttonDefinition: SingleButtonDefinition[];
}

/**
 * @see https://mui.com/material-ui/react-toggle-button/
 */

const SegmentedControl = (props: SegmentedControlProps) => {
  const {
    buttonDefinition,
    value: valueProp,
    onChange: onChangeProp,
    ...restProps
  } = props;

  const initialValue =
    buttonDefinition.find((button) => !button.disabled)?.value || null;

  const [active, setActive] = React.useState<string | null>(initialValue);

  // (masoudmanson): Add Controlled/Uncontrolled Component pattern
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : active;

  const handleActive = (
    event: React.MouseEvent<HTMLElement>,
    newActive: string | null
  ) => {
    if (!isControlled) {
      setActive(newActive);
    }
    if (onChangeProp) {
      onChangeProp(event, newActive);
    }
  };

  return (
    <StyledSegmentedControl
      aria-label="Segmented Control"
      size="small"
      value={value}
      exclusive
      onChange={handleActive}
      {...restProps}
    >
      {buttonDefinition.map((button: SingleButtonDefinition) => {
        const {
          icon,
          label,
          shouldShowTooltip = true,
          tooltipProps,
          tooltipText,
          value: buttonValue,
          disabled = false,
        } = button;

        if (tooltipText) {
          showWarningIfFirstOccurence(
            SDSWarningTypes.SegmentedControlTooltipTextDeprecated
          );
        }

        if (!icon && !label) {
          showWarningIfFirstOccurence(
            SDSWarningTypes.SegmentedControlMissingIconOrLabel
          );
        }

        if (icon && label) {
          showWarningIfFirstOccurence(
            SDSWarningTypes.SegmentedControlIconAndLabelConflict
          );
        }

        const iconItem = icon ? (
          typeof icon !== "string" ? (
            icon
          ) : (
            <Icon sdsIcon={icon} sdsSize="s" />
          )
        ) : null;

        const buttonContent = label ? (
          <StyledToggleButtonLabel>{label}</StyledToggleButtonLabel>
        ) : (
          <StyledToggleButtonIcon>{iconItem}</StyledToggleButtonIcon>
        );

        const toggleButton = (
          <StyledToggleButton
            aria-label={tooltipText ?? label ?? buttonValue}
            value={buttonValue}
            disabled={disabled}
            key={buttonValue}
          >
            <span tabIndex={-1}>{buttonContent}</span>
          </StyledToggleButton>
        );

        // Resolve the tooltip title: tooltipText takes priority,
        // then tooltipProps.title, then label, then falls back to buttonValue.
        const resolvedTitle =
          tooltipText ?? tooltipProps?.title ?? label ?? buttonValue;

        // (masoudmanson): If the button is disabled or shouldShowTooltip
        // is false, we don't render the tooltip.
        return disabled || !shouldShowTooltip ? (
          toggleButton
        ) : (
          <Tooltip
            arrow
            {...tooltipProps}
            title={resolvedTitle}
            key={buttonValue}
          >
            {toggleButton}
          </Tooltip>
        );
      })}
    </StyledSegmentedControl>
  );
};

export default SegmentedControl;

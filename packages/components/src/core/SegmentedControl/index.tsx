import { ToggleButton, ToggleButtonGroupProps } from "@mui/material";
import React from "react";
import Icon, { IconNameToSizes } from "src/core/Icon";
import Tooltip from "src/core/Tooltip";
import { StyledSegmentedControl } from "./style";

// one prop is array of objects: with icon name and tooltip text. They need to make
// first item in array first button, etc
export interface SingleButtonDefinition {
  disabled?: boolean;
  icon: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
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
    if (newActive !== null) {
      if (!isControlled) {
        setActive(newActive);
      }
      if (onChangeProp) {
        onChangeProp(event, newActive);
      }
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
          tooltipText,
          value: buttonValue,
          disabled = false,
        } = button;

        const iconItem = icon ? (
          typeof icon !== "string" ? (
            icon
          ) : (
            <Icon sdsIcon={icon} sdsSize="s" sdsType="button" />
          )
        ) : null;

        const toggleButton = (
          <ToggleButton
            aria-label={tooltipText ?? buttonValue}
            value={buttonValue}
            disabled={disabled}
            key={buttonValue}
          >
            <span tabIndex={-1}>{iconItem}</span>
          </ToggleButton>
        );

        // (masoudmanson): If the button is disabled, we don't want to show the tooltip.
        return disabled ? (
          toggleButton
        ) : (
          <Tooltip
            title={tooltipText ?? buttonValue}
            sdsStyle="dark"
            arrow
            key={buttonValue}
          >
            {toggleButton}
          </Tooltip>
        );
      })}
      ;
    </StyledSegmentedControl>
  );
};

export default SegmentedControl;

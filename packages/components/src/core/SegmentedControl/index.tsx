"use client";

import { ToggleButton, ToggleButtonGroupProps } from "@mui/material";
import React from "react";
import Icon, { IconNameToSizes } from "src/core/Icon";
import Tooltip from "src/core/Tooltip";
import { StyledSegmentedControl } from "./style";
// one prop is array of objects: with icon name and tooltip text. They need to make
// first item in array first button, etc
export interface SingleButtonDefinition {
  icon: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
  tooltipText?: string;
  value: string;
}

interface SegmentedControlExtraProps extends ToggleButtonGroupProps {
  buttonDefinition: SingleButtonDefinition[];
}

/**
 * @see https://mui.com/material-ui/react-toggle-button/
 */
export type SegmentedControlProps = SegmentedControlExtraProps &
  ToggleButtonGroupProps;

const SegmentedControl = (props: SegmentedControlProps) => {
  const { buttonDefinition } = props;
  const leftmost = buttonDefinition[0]?.value;
  const [active, setActive] = React.useState<string | null>(leftmost);

  const handleActive = (
    event: React.MouseEvent<HTMLElement>,
    newActive: string | null
  ) => {
    if (newActive !== null) {
      setActive(newActive);
    }
  };

  return (
    <StyledSegmentedControl
      aria-label="Segmented Control"
      size="small"
      value={active}
      exclusive
      onChange={handleActive}
      {...props}
    >
      {buttonDefinition.map((button: SingleButtonDefinition) => {
        const { icon, tooltipText, value } = button;

        const iconItem = () => {
          if (icon) {
            if (typeof icon !== "string") {
              return icon;
            } else {
              return <Icon sdsIcon={icon} sdsSize="s" sdsType="button" />;
            }
          }
        };

        return (
          <Tooltip
            title={tooltipText ?? value}
            sdsStyle="dark"
            arrow
            key={value}
          >
            <ToggleButton aria-label={tooltipText} value={value}>
              <span tabIndex={-1}>{iconItem()}</span>
            </ToggleButton>
          </Tooltip>
        );
      })}
      ;
    </StyledSegmentedControl>
  );
};

export default SegmentedControl;

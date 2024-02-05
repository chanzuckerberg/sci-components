import { ToggleButton, ToggleButtonGroupProps } from "@mui/material";
import React from "react";
import Icon, { IconNameToSizes } from "../Icon";
import Tooltip from "../Tooltip";
import { StyledSegmentedControl } from "./style";
// one prop is array of objects: with icon name and tooltip text. They need to make
// first item in array first button, etc
export interface SingleButtonDefinition {
  icon: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
  tooltipText: string;
}

interface SegmentedControlExtraProps
  extends Omit<ToggleButtonGroupProps, "color"> {
  buttonDefinition: SingleButtonDefinition[];
  color?:
    | "primary"
    | "secondary"
    | "standard"
    | "success"
    | "error"
    | "info"
    | "warning"
    | undefined;
}

/**
 * @see https://mui.com/material-ui/react-toggle-button/
 */
export type SegmentedControlProps = SegmentedControlExtraProps &
  ToggleButtonGroupProps;

const SegmentedControl = (props: SegmentedControlProps) => {
  const { buttonDefinition } = props;
  const leftmost = buttonDefinition[0]?.tooltipText;
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
      color="primary"
      size="small"
      value={active}
      exclusive
      onChange={handleActive}
      {...props}
    >
      {(buttonDefinition as SingleButtonDefinition[]).map((button) => {
        const { icon, tooltipText } = button;

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
          <ToggleButton
            aria-label={tooltipText}
            disableRipple
            value={tooltipText}
            key={tooltipText}
          >
            <Tooltip title={tooltipText} sdsStyle="dark" arrow>
              <span>{iconItem()}</span>
            </Tooltip>
          </ToggleButton>
        );
      })}
      ;
    </StyledSegmentedControl>
  );
};

export default SegmentedControl;

import ToggleButton from "@material-ui/lab/ToggleButton";
import { ToggleButtonGroupProps } from "@material-ui/lab/ToggleButtonGroup";
import React from "react";
import Icon, { IconNameToSizes } from "../Icon";
import Tooltip from "../Tooltip";
import { StyledSegmentedControl } from "./style";
// one prop is array of objects: with icon name and tooltip text. They need to make
// first item in array first button, etc
interface SingleButtonDefinition {
  iconName: string;
  tooltipText: string;
}

interface ExtraProps {
  buttonDefinition: SingleButtonDefinition[];
}

export type SegmentedControlProps = ExtraProps & ToggleButtonGroupProps;

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
      size="small"
      value={active}
      exclusive
      onChange={handleActive}
      color="primary"
      {...props}
    >
      {(buttonDefinition as SingleButtonDefinition[]).map((button) => {
        const { iconName, tooltipText } = button;
        return (
          <ToggleButton disableRipple value={tooltipText} key={tooltipText}>
            <Tooltip title={tooltipText} sdsStyle="dark" arrow>
              <span>
                <Icon
                  sdsIcon={iconName as keyof IconNameToSizes}
                  sdsSize="s"
                  sdsType="button"
                />
              </span>
            </Tooltip>
          </ToggleButton>
        );
      })}
      ;
    </StyledSegmentedControl>
  );
};

export default SegmentedControl;

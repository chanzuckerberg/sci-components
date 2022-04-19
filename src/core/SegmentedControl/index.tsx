import {
  ButtonGroupProps,
  IconButtonProps as RawIconButtonProps,
} from "@material-ui/core";
import { ToggleButton } from "@mui/material";
import React from "react";
import Icon, { IconNameToSizes } from "../Icon";
import Tooltip from "../Tooltip";
import { StyledSegmentedControl } from "./style";
// one prop is array of objects: with icon name and tooltip text. They need to make
// first item in array first button, etc
interface singleButtonDefinition {
  iconName: string;
  tooltipText: string;
}

interface ExtraProps {
  buttonDefinition: singleButtonDefinition[];
}

export type SegmentedControlProps = ButtonGroupProps &
  ExtraProps &
  RawIconButtonProps;

//function(event: React.MouseEvent<HTMLElement>, value: any) => void

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
    >
      {(buttonDefinition as singleButtonDefinition[]).map((button) => {
        const { iconName, tooltipText } = button;
        return (
          <ToggleButton disableRipple value={tooltipText} key={tooltipText}>
            <Tooltip title={tooltipText} sdsStyle="dark" arrow>
              {/* <span> */}
              <Icon
                sdsIcon={iconName as keyof IconNameToSizes}
                sdsSize="s"
                sdsType="iconButton"
              />
              {/* </span> */}
            </Tooltip>
          </ToggleButton>
        );
      })}
      ;
    </StyledSegmentedControl>
  );
};

export default SegmentedControl;

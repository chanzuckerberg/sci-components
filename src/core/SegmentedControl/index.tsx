import {
  ButtonGroupProps,
  IconButtonProps as RawIconButtonProps,
} from "@material-ui/core";
import React from "react";
import Icon, { IconNameToSizes } from "../Icon";
import IconButton from "../IconButton";
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

function ButtonGroupIconButton(props: SegmentedControlProps) {
  // intercept props only implemented by `Button`
  const { disableElevation, fullWidth, variant, ...iconButtonProps } = props;
  return <IconButton sdsSize="small" sdsType="primary" {...iconButtonProps} />;
}

const SegmentedControl = (props: SegmentedControlProps) => {
  const { buttonDefinition } = props;

  return (
    <StyledSegmentedControl size="small" variant="outlined">
      {(buttonDefinition as singleButtonDefinition[]).map((button) => {
        const { iconName, tooltipText } = button;
        return (
          <Tooltip title={tooltipText} sdsStyle="dark" arrow key={tooltipText}>
            <ButtonGroupIconButton {...props}>
              <Icon
                sdsIcon={iconName as keyof IconNameToSizes}
                sdsSize="s"
                sdsType="iconButton"
              />
            </ButtonGroupIconButton>
            {/* <Button>
                            <IconButton sdsSize="small" sdsType = "primary">
                                <Icon sdsIcon={iconName as keyof IconNameToSizes} sdsSize="s" sdsType="iconButton" />
                            </IconButton>
                        </Button> */}
          </Tooltip>
        );
      })}
      {/* <Tooltip title="placeholder" sdsStyle="dark" arrow>
                <Button>button 1</Button>
            </Tooltip>
            <Tooltip title="placeholder" sdsStyle="dark" arrow>
                <Button>button 2</Button>
            </Tooltip>
            <Tooltip title="placeholder" sdsStyle="dark" arrow>
                <Button>button 3</Button>
            </Tooltip> */}
    </StyledSegmentedControl>
  );
};

export default SegmentedControl;

import React from "react";
import { ButtonToggleV2Props } from "./ButtonToggleV2.types";
import { StyledButtonToggleV2 } from "./style";

export type { ButtonToggleV2Props };

/**
 * @see https://mui.com/material-ui/react-button/
 */

const ButtonToggle = React.forwardRef<HTMLButtonElement, ButtonToggleV2Props>(
  (props, ref) => {
    const { startIcon, ...rest } = props;

    return (
      <StyledButtonToggleV2
        {...rest}
        startIcon={startIcon}
        endIcon={null}
        ref={ref}
      />
    );
  }
);

export default ButtonToggle;

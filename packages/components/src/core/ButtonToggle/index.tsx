import React from "react";
import { ButtonToggleProps } from "./ButtonToggle.types";
import { StyledButtonToggle } from "./style";

export type { ButtonToggleProps };

/**
 * @see https://mui.com/material-ui/react-button/
 */

const ButtonToggle = React.forwardRef<HTMLButtonElement, ButtonToggleProps>(
  (props, ref) => {
    const { startIcon, ...rest } = props;

    return (
      <StyledButtonToggle
        {...rest}
        startIcon={startIcon}
        endIcon={null}
        backgroundOnHover
        ref={ref}
      />
    );
  }
);

export default ButtonToggle;

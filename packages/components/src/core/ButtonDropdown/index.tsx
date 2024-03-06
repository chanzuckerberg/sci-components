import { ButtonProps as RawButtonProps } from "@mui/material";
import React, { ForwardedRef } from "react";
import Button from "src/core/Button";
import Icon from "src/core/Icon";

interface SdsProps {
  icon?: JSX.Element;
  sdsStyle?: "rounded" | "square";
  sdsType?: "primary" | "secondary";
}

export type ButtonDropdownProps<C extends React.ElementType = "button"> =
  RawButtonProps<C, { component?: C }> & SdsProps;

/**
 * @see https://mui.com/material-ui/react-button/
 */
const ButtonDropdown = React.forwardRef(
  <C extends React.ElementType>(
    props: ButtonDropdownProps<C>,
    ref: ForwardedRef<HTMLButtonElement>
  ): JSX.Element | null => {
    const icon = props?.icon;
    const sdsStyle = props?.sdsStyle;
    const sdsType = props?.sdsType;

    return (
      <Button
        {...props}
        endIcon={<Icon sdsIcon="ChevronDown" sdsSize="xs" sdsType="button" />}
        sdsStyle={sdsStyle}
        ref={ref}
        sdsType={sdsType}
        startIcon={icon}
      />
    );
  }
);

export default ButtonDropdown;

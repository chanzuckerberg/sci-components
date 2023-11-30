import { ButtonProps as RawButtonProps } from "@mui/material";
import React, { FC, ForwardedRef } from "react";
import Button from "../Button";
import Icon from "../Icon";

interface SdsProps {
  icon?: JSX.Element;
  isRounded?: boolean;
  sdsStyle?: "rounded" | "square";
  sdsType?: "primary" | "secondary";
}

export type ButtonDropdownProps<C extends React.ElementType = "button"> = Omit<
  RawButtonProps<C, { component?: C }>,
  "nonce" | "rev" | "rel" | "autoFocus" | "content"
> &
  SdsProps & { svgIcon?: FC<CustomSVGProps> };

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
        endIcon={<Icon icon="chevronDown" sdsSize="s" sdsType="button" />}
        sdsStyle={sdsStyle}
        ref={ref}
        sdsType={sdsType}
        startIcon={props.svgIcon ?? icon}
      />
    );
  }
);

export default ButtonDropdown;

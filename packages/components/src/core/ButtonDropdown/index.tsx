import React, { ForwardedRef } from "react";
import Button from "src/core/Button";
import Icon from "../Icon";
import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "src/common/warnings";
import { ButtonDropdownProps } from "./ButtonDropdown.types";

export type { ButtonDropdownProps };

/**
 * @see https://mui.com/material-ui/react-button/
 */
const ButtonDropdown = React.forwardRef(
  (
    props: ButtonDropdownProps,
    ref: ForwardedRef<HTMLButtonElement>
  ): JSX.Element | null => {
    const { size = "large", sdsType, children, ...rest } = props;

    // Runtime check for destructive type (in case TypeScript is bypassed)
    if ((sdsType as string) === "destructive") {
      showWarningIfFirstOccurence(SDSWarningTypes.ButtonDropdownV2Destructive);
      return null;
    }

    const endIcon = children ? (
      <Icon
        sdsIcon="ChevronDown"
        sdsSize={size === "large" ? "s" : size === "medium" ? "xs" : "xxs"}
      />
    ) : null;

    return (
      <Button
        {...rest}
        sdsType={sdsType}
        endIcon={endIcon}
        size={size}
        ref={ref}
      >
        {children}
      </Button>
    );
  }
);

export default ButtonDropdown;

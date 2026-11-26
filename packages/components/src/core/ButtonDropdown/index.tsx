import { CaretDownIcon } from "@phosphor-icons/react";
import React, { ForwardedRef } from "react";
import { INTERNAL_ICON_PROPS } from "@components/src/common/utils";
import Button from "@components/src/core/Button";
import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "@components/src/common/warnings";
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
      <CaretDownIcon
        {...INTERNAL_ICON_PROPS}
        size={size === "large" ? 16 : size === "medium" ? 12 : 10}
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

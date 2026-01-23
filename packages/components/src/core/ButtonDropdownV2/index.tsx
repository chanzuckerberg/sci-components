import React, { ForwardedRef } from "react";
import ButtonV2 from "src/core/ButtonV2";
import Icon from "../Icon";
import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "src/common/warnings";
import { ButtonDropdownV2Props } from "./ButtonDropdownV2.types";

export type { ButtonDropdownV2Props };

/**
 * @see https://mui.com/material-ui/react-button/
 */
const ButtonDropdownV2 = React.forwardRef(
  (
    props: ButtonDropdownV2Props,
    ref: ForwardedRef<HTMLButtonElement>
  ): JSX.Element | null => {
    const { size = "medium", sdsType, children, ...rest } = props;

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
      <ButtonV2
        {...rest}
        sdsType={sdsType}
        endIcon={endIcon}
        size={size}
        ref={ref}
      >
        {children}
      </ButtonV2>
    );
  }
);

export default ButtonDropdownV2;

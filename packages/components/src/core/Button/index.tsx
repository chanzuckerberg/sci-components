import { ButtonProps as MuiButtonProps } from "@mui/material";
import React, { ForwardedRef } from "react";
import { isIconOnlyChild, StyledButton, StyledChildren } from "./style";
import { ButtonProps } from "./Button.types";

export type { ButtonProps };

// (masoudmanson): The MUI variant prop is determined by the sdsStyle prop.
const MUI_VARIANT_MAP: {
  [key in Exclude<
    ButtonProps["sdsStyle"],
    undefined
  >]: MuiButtonProps["variant"];
} = {
  solid: "contained",
  outline: "outlined",
  minimal: "text",
};

/**
 * @see https://mui.com/material-ui/react-button/
 */
const Button = React.forwardRef(
  (
    props: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ): JSX.Element | null => {
    const {
      sdsStyle = "solid",
      sdsType = "primary",
      size = "medium",
      variant = "contained",
      children,
      ...rest
    } = props;

    // Check if the only child is an Icon component (before wrapping in StyledChildren)
    const iconOnlyChild = isIconOnlyChild(children);

    return (
      <StyledButton
        variant={MUI_VARIANT_MAP[sdsStyle] || variant}
        sdsType={sdsType}
        size={size}
        iconOnlyChild={iconOnlyChild}
        ref={ref}
        {...rest}
      >
        {children ? (
          <StyledChildren size={size}>{children}</StyledChildren>
        ) : null}
      </StyledButton>
    );
  }
);

export default Button;

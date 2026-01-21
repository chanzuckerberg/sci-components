import { ButtonProps } from "@mui/material";
import React, { ForwardedRef } from "react";
import { StyledButton } from "./style";
import { ButtonNewProps } from "./ButtonNew.types";

export type { ButtonNewProps };

// (masoudmanson): The MUI variant prop is determined by the sdsStyle prop.
const MUI_VARIANT_MAP: {
  [key in Exclude<
    ButtonNewProps["sdsStyle"],
    undefined
  >]: ButtonProps["variant"];
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
    props: ButtonNewProps,
    ref: ForwardedRef<HTMLButtonElement>
  ): JSX.Element | null => {
    const {
      sdsStyle = "solid",
      sdsType = "primary",
      variant = "contained",
      ...rest
    } = props;

    return (
      <StyledButton
        variant={MUI_VARIANT_MAP[sdsStyle] || variant}
        sdsType={sdsType}
        {...rest}
        ref={ref}
      />
    );
  }
);

export default Button;

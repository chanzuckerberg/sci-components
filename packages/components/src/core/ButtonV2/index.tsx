import { ButtonProps } from "@mui/material";
import React, { ForwardedRef } from "react";
import { StyledButton } from "./style";
import { ButtonV2Props } from "./ButtonV2.types";

export type { ButtonV2Props };

// (masoudmanson): The MUI variant prop is determined by the sdsStyle prop.
const MUI_VARIANT_MAP: {
  [key in Exclude<
    ButtonV2Props["sdsStyle"],
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
const ButtonV2 = React.forwardRef(
  (
    props: ButtonV2Props,
    ref: ForwardedRef<HTMLButtonElement>
  ): JSX.Element | null => {
    const {
      sdsStyle = "solid",
      sdsType = "primary",
      variant = "contained",
      children,
      ...rest
    } = props;

    return (
      <StyledButton
        variant={MUI_VARIANT_MAP[sdsStyle] || variant}
        sdsType={sdsType}
        ref={ref}
        {...rest}
      >
        {children ? <span>{children}</span> : null}
      </StyledButton>
    );
  }
);

export default ButtonV2;

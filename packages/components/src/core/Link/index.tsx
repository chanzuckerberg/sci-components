import { LinkProps as RawLinkProps } from "@mui/material";
import React, { ForwardedRef, forwardRef } from "react";
import { StyledLink } from "./style";

export type LinkProps<C extends React.ElementType = "a"> = RawLinkProps<C> & {
  fontWeight?: "normal" | "bold";
  sdsSize?: "xs" | "s";
  sdsStyle?: "default" | "dashed";
};

/**
 * @see https://mui.com/material-ui/react-link/
 */
const Link = forwardRef(
  <C extends React.ElementType>(
    props: LinkProps<C>,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    const { sdsStyle = "default", ...rest } = props;
    // const resolvedSdsStyle = sdsStyle ?? "default";

    return (
      <StyledLink
        {...rest}
        sdsStyle={sdsStyle}
        underline={sdsStyle === "default" ? "hover" : "always"}
        ref={ref}
      />
    );
  }
);

export default Link;

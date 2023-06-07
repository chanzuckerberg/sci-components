import React, { ForwardedRef, forwardRef } from "react";
import { LinkProps as RawLinkProps, StyledLink } from "./style";

export type LinkProps<C extends React.ElementType = "a"> = Omit<
  RawLinkProps<C>,
  "nonce" | "rev" | "rel" | "autoFocus" | "content"
>;

/**
 * @see https://mui.com/material-ui/react-link/
 */
const Link = forwardRef(
  <C extends React.ElementType>(
    props: LinkProps<C>,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    const { sdsStyle } = props;
    let underline: LinkProps["underline"];

    if (sdsStyle === "default") {
      underline = "none";
    }

    return <StyledLink {...props} underline={underline} ref={ref} />;
  }
);

export default Link;

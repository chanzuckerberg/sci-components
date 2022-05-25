import React, { ForwardedRef, forwardRef } from "react";
import { LinkProps, StyledLink } from "./style";

/**
 * @see https://v4.mui.com/components/links/
 */
const Link = forwardRef(
  (props: LinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
    const { sdsStyle } = props;
    let underline: LinkProps["underline"];

    if (sdsStyle === "default") {
      underline = "none";
    }

    return <StyledLink {...props} underline={underline} ref={ref} />;
  }
);

export type { LinkProps };

export default Link;

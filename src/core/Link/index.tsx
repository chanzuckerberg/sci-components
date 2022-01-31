import React, { ForwardedRef, forwardRef } from "react";
import { LinkProps, StyledLink } from "./style";

const Link = (props: LinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { sdsStyle } = props;
  let underline: LinkProps["underline"];

  if (sdsStyle === "default") {
    underline = "none";
  }

  return <StyledLink {...props} underline={underline} ref={ref} />;
};

export { LinkProps };

export default forwardRef(Link);

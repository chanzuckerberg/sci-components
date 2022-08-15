import { Link as RawLink } from "@mui/material";
import React, { ForwardedRef, forwardRef } from "react";
import { LinkProps, StyledLink } from "./style";

/**
 * @see https://mui.com/material-ui/react-link/
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
) as typeof RawLink;

export type { LinkProps };

export default Link;

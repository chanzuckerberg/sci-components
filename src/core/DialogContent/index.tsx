import { DialogContentProps } from "@material-ui/core";
import React, { forwardRef } from "react";
import { StyledDialogContent } from "./style";

export { DialogContentProps };

export default forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent(props, ref) {
    return <StyledDialogContent ref={ref} {...props} />;
  }
);

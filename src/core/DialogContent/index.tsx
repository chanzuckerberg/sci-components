import { DialogContentProps } from "@mui/material";
import React, { forwardRef } from "react";
import { StyledDialogContent } from "./style";

export type { DialogContentProps };

export default forwardRef<HTMLDivElement, DialogContentProps>(
  /**
   * @see https://v4.mui.com/components/dialogs/
   */
  function DialogContent(props, ref) {
    return <StyledDialogContent ref={ref} {...props} />;
  }
);
